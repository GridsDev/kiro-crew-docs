# Handoff — Kiro Crew บน `sv`

**Saved to:** `services/vite/kiro-crew-docs/HANDOFF.md` (เก็บใน repo ไว้ให้ session หน้าอ่านต่อได้เลย)
**เขียนเมื่อ:** 3 ต.ค. 2569 (2026-10-03) · งานระยะที่ ๕ เสร็จแล้ว
**Redaction check:** ไม่มี secret/token/PII ในไฟล์นี้ — `[REDACTED]` ทุกจุดที่เคยอ้างถึง `DISCORD_BOT_TOKEN` / `CHANNEL_ACCESS_TOKEN`

## Goal

ติดตั้ง Kiro Crew 0.7.2 บนเซิร์ฟเวอร์ `sv` ให้ใช้งานได้จริงด้วย strict sandbox
และทำเอกสารแผน (VitePress, 12 หน้า) ให้ตรงกับผลจริงทุกจุด

**ตอนนี้อยู่ระหว่าง:** ระยะที่ ๕ ปิดแล้ว · ยังไม่เริ่มระยะที่ ๖

## Artifacts

โปรเจกต์นี้ **ยังไม่ใช่ git repo** (`git rev-parse` → `fatal: not a git repository`) — ยังไม่มี commit/MR/branch ให้อ้างอิง

| สิ่งที่ต้องรู้สถานะสด | คำสั่งตรวจ |
|---|---|
| service บน `sv` | `ssh devg@192.168.1.200 'systemctl is-enabled kirocrew; systemctl is-active kirocrew'` |
| AppArmor ของ process จริง | `ssh devg@192.168.1.200 'PID=$(systemctl show kirocrew -p MainPID --value); cat /proc/$PID/attr/current'` |
| สิทธิ์ `~/.kiro` | `ssh devg@192.168.1.200 'stat -c "%a %n" /home/devg/.kiro'` → ต้องเป็น `750` |
| sandbox probe | `ssh devg@192.168.1.200 'unshare -U true && echo OK'` |
| changelog สองฝั่งตรงกันไหม | `md5sum ~/.config/opencode/skills/sv-changelog/SKILL.md` เทียบกับผลบน `sv` |
| billing route ยังปกติไหม | `ssh devg@192.168.1.200 'tailscale serve status'` → ต้องยังมี `:8443 → 127.0.0.1:3001` |

ทุกคำสั่งที่ต้องใช้สิทธิ์ root บน `sv` ต้องผ่านช่องทางนี้เท่านั้น
(`SV_SUDO_PASSWORD` อยู่ใน `.env` ฝั่ง `sv` — ห้ามพิมพ์ค่าออกมา):

```bash
ssh devg@192.168.1.200 'python3 ~/python-tools/sv.py "<คำสั่งที่ต้องใช้ sudo>"'
```

## Done / Current state

ติดตั้งจริงเสร็จแล้ว ยืนยันจาก `sv` เมื่อ 3 ต.ค. 2569:

| ตรวจ | ผล |
|---|---|
| unit | `/etc/systemd/system/kirocrew.service` — **system-level** ไม่ใช่ user-level |
| สถานะ | `enabled` / `active` · เริ่ม `Sat 2026-10-03 21:10:13 +07` · PID `611086` |
| process | `kirocrew gateway --no-open` |
| AppArmor | `/etc/apparmor.d/kirocrew-userns` → ผูกกับ `/home/devg/.kiro/crew-venv/bin/kirocrew` |
| `/proc/PID/attr/current` | `kirocrew-userns (unconfined)` |
| `unshare -U true` | ผ่าน (ก่อนแก้ได้ EPERM) |
| `SandboxUnavailableError` | `0` ครั้งหลังติดตั้ง (เคยเจอ 2 ครั้งตอน 21:03:20 ก่อนแก้) |
| `agent.sandbox` | ยังเป็นค่าเดิม `auto` — เครื่องรองรับแล้วจึงเลือก strict เอง |
| `/home/devg/.kiro` | `0750` (เดิม `0775`) |
| linger | **ไม่ต้องเปิด** และไม่ได้รัน `loginctl enable-linger devg` |
| Billing `:8443 → 127.0.0.1:3001` | ยังทำงานปกติ ไม่ถูกแตะ |

คำสั่งที่ติดตั้งจริง: `kirocrew service install` — คำสั่งเดียวได้ทั้ง systemd unit และ AppArmor profile

**ข้อค้นพบสำคัญ 2 เรื่อง** (บันทึกใน `decisions.md` แล้ว)

1. ต้อง `chmod 750 /home/devg/.kiro` ก่อน — Crew ปฏิเสธ profile เพราะโฟลเดอร์เขียนได้โดยกลุ่ม
   ก่อนลดสิทธิ์ต้องรัน `getent group devg` (ได้ `devg:x:1000:` = ไม่มีสมาชิกอื่น) ถ้าวันหน้ามีสมาชิกเพิ่ม ต้องคุยพี่ฆังใหม่ ห้ามลดเอง
2. `kirocrew sandbox status` ขึ้น ❌ แม้ทุกอย่างปกติ — คำสั่งนั้นเช็ก profile ของ **launcher process ที่กำลังรัน**
   ไม่ใช่ systemd service จึงไม่มี profile ติดตัวเมื่อรันผ่าน SSH · `unconfined` ใน `/proc/PID/attr/current` เป็น**ตั้งใจ**
   เพราะโปรไฟล์คือ `flags=(unconfined) { userns,` ซึ่งให้สิทธิ์ `userns` อย่างเดียว (รูปแบบเดียวกับ `chrome`/`brave` ในเครื่อง)
   ตัวที่แยก agent ออกจากเครื่องคือ sandbox ของ Crew (user + mount namespace แล้ว over-mount `~/.ssh` `~/.aws`)

เอกสารแก้ 7 หน้าแล้ว build ผ่าน (`pnpm run build` → `vitepress build docs` ✓ 4.77s):
`work-plan.md` · `verification.md` · `decisions.md` · `delivery.md` · `improvements.md` · `testing.md` · `architecture.md`

changelog อัปเดตเป็น v1.68.0 และ sync สองฝั่งตรงกันแล้ว (MD5 `252df5a11ade4311ba325b35d81052b4`)

## Next steps

ยังไม่เริ่ม — ทำตามลำดับนี้

1. **R8 — reboot จริง** ค้างอยู่ เป็นรายการเดียวที่บล็อกการอ้างว่า service ทำงานถาวร
   ต้องเปิดเครื่องใหม่จริง แล้วตรวจว่า `kirocrew.service` กลับมา `active` เอง แล้วบันทึกผลลง `testing.md`
   → **ต้องขออนุมัติพี่ฆังก่อน reboot เครื่อง**
2. **ทดสอบ R1–R7, R9–R16** ตาม `docs/testing.md` — ยังไม่ได้ทำสักข้อ
3. **พิสูจน์ว่า sandbox คุ้มครองจริง** ตอนนี้รู้แค่ว่า "ทำงานได้" ยังไม่รู้ว่า "คุ้มครองได้"
   ยังไม่ได้สร้าง consent file สำหรับ Git SSH
4. **`agent.approval_mode` ยังเป็น `auto`** — เอกสารเดิมระบุ default = `interactive` ต้องตัดสินใจตามค่าจริง
   (ดูข้อ ๔ ใน `decisions.md`)
5. **Discord** — รอ `[REDACTED]` bot token + allowed user IDs จากพี่ฆัง (`docs/discord-setup.md`)
6. **เอกสาร 5 หน้าที่ยังไม่ได้ตรวจ**: `index.md` · `goals.md` · `problems.md` · `security.md` · `discord-setup.md`
   ยังไม่ได้ตรวจว่ามี stale claim หรือไม่ (รอบก่อนแก้เฉพาะ 7 หน้าที่มีข้อมูลคลาดเคลื่อนชัดเจน)
7. **commit เอกสาร** — โปรเจกต์ยังไม่มี git repo ถ้าพี่ฆังต้องการเก็บประวัติ ต้อง `git init` + remote ก่อน

## Open questions

- **reboot `sv` เมื่อไหร่** — ต้องการหน้าต่างที่ยังทำงานอยู่ พี่ฆังต้องอนุมัติ
- **approval = `auto` หรือ `interactive`** — ค่าจริงเป็น `auto` แต่เอกสารเดิมเขียน `interactive` ยังไม่ตัดสินใจว่าจะปรับตามค่าจริงหรือตั้งเป็น `interactive`
- **consent file สำหรับ Git SSH** — ยังไม่สร้าง ต้องรู้ก่อนว่าจะอนุญาต path ไหนบ้าง
- **เปิด tailnet หรือไม่** — ยังไม่เปิด `kirocrew tailnet up` ต้องตรวจผลกระทบ Billing `:8443` ก่อนและต้องได้รับอนุมัติ
- **git remote ของโปรเจกต์เอกสาร** — ยังไม่มี จะเก็บไว้ที่ไหน

ข้อห้ามที่ยังมีผลบังคับ:

- **ห้ามใช้** `agent.sandbox_allow_unsandboxed_exec=true` — เราแก้ที่ profile ทางการแทน
- **ห้ามแตะ** Billing route `:8443 → 127.0.0.1:3001`
- **ห้ามอ่าน/พิมพ์** `~/.kiro/crew/.env` ด้วยคำสั่งที่แสดงค่าออกมา — secret อยู่ที่นั่นที่เดียว
- **ห้ามรัน** `loginctl enable-linger devg` (ไม่จำเป็นกับ system service)
- **ไม่ต้องใช้** `kirocrew sandbox install-profile --path ...` — ติดตั้ง profile ผ่าน `service install` ไปแล้ว

## Key files

เอกสาร (source อยู่ `docs/` — `dist/` เป็น generated ห้ามแก้):

| ไฟล์ | เนื้อหา |
|---|---|
| `docs/work-plan.md` | ลำดับระยะ ๑–๙ + สถานะจริงระยะที่ ๕ |
| `docs/verification.md` | ผลยืนยันทุกข้อ · แยก `✅ ยืนยันแล้ว` กับ `❓ ยังไม่ได้ตรวจ` |
| `docs/testing.md` | R1–R16 · **R8 ยังไม่ผ่าน** |
| `docs/decisions.md` | ข้อสรุปเรื่อง service, strict profile, `chmod 750` |
| `docs/security.md` | ข้อกำหนด sandbox/AppArmor · รอตรวจ stale claim |
| `docs/delivery.md` | ขอบเขตส่งมอบ |
| `docs/improvements.md` | ปัญหาที่แก้แล้ว + งานรอบถัดไป |
| `docs/architecture.md` | ค่า `auto` vs ผลลัพธ์ strict |
| `docs/discord-setup.md` | ขั้นตอนเปิด Discord · รอ token |

บนเครื่อง `sv`:

| path | หมายเหตุ |
|---|---|
| `/etc/systemd/system/kirocrew.service` | unit ที่ติดตั้งจริง |
| `/etc/apparmor.d/kirocrew-userns` | official strict profile |
| `/home/devg/.kiro/crew-venv/bin/kirocrew` | launcher ที่ profile ผูก |
| `/home/devg/.kiro` | ต้องเป็น `0750` · ห้ามลดสิทธิ์ซ้ำโดยไม่ตรวจ group |
| `/home/devg/.kiro/agents/kirocrew.json` | agent config |
| `/home/devg/.kiro/crew/config.json` | `discord.enabled` |
| `/home/devg/.kiro/crew/.env` | **มี secret — ห้ามอ่านออกมา** |
| `/home/devg/python-tools/sv.py` | ช่องทาง sudo ที่อนุมัติ |
| `/etc/systemd/system/sv-opencode-serve.service` | service เดิม · ตรวจแล้วว่าไม่ชน |

changelog (สองฝั่งต้องตรงกันเสมอ + bump `version` ทุกครั้งที่ทำอะไรกับ `sv` สำเร็จ):

- workspace: `/home/neon13/.config/opencode/skills/sv-changelog/SKILL.md`
- sv: `/home/devg/.config/opencode/skills/sv-changelog/SKILL.md`

## Suggested skills

- `kiro-cli` — เอกสารอ้างอิง Kiro Crew ทั้งหมด (อ่านก่อนตัดสินใจเรื่อง Crew)
- `sv-changelog` — ต้องอัปเดตทุกครั้งที่แตะ `sv` และ sync สองฝั่ง
- `handoff` — ใช้อีกครั้งเมื่อจบระยะถัดไป
