# ๕. การตรวจสอบ

หัวข้อนี้แยกข้อมูลออกเป็นสองกลุ่มอย่างชัดเจน

- ✅ **ยืนยันแล้ว** — ตรวจจากระบบจริง ได้ผลแล้ว
- ❓ **ยังไม่ได้ตรวจ** — ยังต้องทดสอบ ไม่ควรนำไปอ้าง

::: warning กฎของครอบครัว
**ห้ามเดา** — ถ้ายังไม่ได้ตรวจ ให้เขียนว่ายังไม่ได้ตรวจ ไม่ใช่เดาแล้วเขียนเป็นข้อเท็จจริง
หน้านี้จึงมี ✅ และ ❓ ปนกัน โดยตั้งใจ
:::

## ตรวจจากระบบจริงแล้ว

### เครื่องมือที่จะใช้

| เครื่องมือ | รุ่น | ตำแหน่ง | หมายเหตุ |
|---|---|---|---|
| `kiro-cli` | 2.26.0 | `/home/devg/.local/bin/kiro-cli` | login แล้ว · ใช้ชื่อ `kiro-cli` ไม่ใช่ `kiro` |
| `opencode` | 1.18.33 | `/usr/local/bin/opencode` | มี `opencode acp` |
| `agy` | 1.2.14 | `/home/devg/.local/bin/agy` | รองรับ stream-json |
| `copilot` | 1.0.88 | `/usr/local/bin/copilot` | ยังไม่มีผลลัพธ์แบบอ่านด้วยเครื่อง |

### ความสามารถของเครื่องมือ

| ความสามารถ | สถานะ | หมายเหตุ |
|---|---|---|
| Kiro CLI เป็น backend ของ Crew | ✅ | รองรับโดยตรง |
| OpenCode เป็น backend ของ Crew | ✅ | มี `opencode acp` |
| เลือก backend แยกต่อ session | ✅ | backend ถูกเลือกตอนเริ่ม session |
| `agy` รับ/ส่ง stream-json | ✅ | หนึ่ง turn ต่อบรรทัด |
| Copilot สั่งงานไม่โต้ตอบ | ✅ | มี `-p` และ `-r` |
| Copilot ผลลัพธ์อ่านด้วยเครื่อง | ❓ | ยังไม่พบช่องทางที่ยืนยัน |
| `agy`/`copilot` เป็น backend ของ Crew | ❓ | ยังไม่มี ต้องเขียนตัวเชื่อม |

### ความสามารถของ Kiro Crew

| ความสามารถ | สถานะ |
|---|---|
| ยืนยันตัวตนด้วยโทเคน | ✅ |
| sandbox ปิดการเข้าถึง | ✅ | ใช้งานได้จริงแล้วหลังติดตั้ง profile — ดูข้อ ๙.๑ |
| คำสั่งต้องห้าม | ✅ |
| ปิดบังข้อมูลอ่อนไหวในผลลัพธ์ | ✅ |
| บันทึกเหตุการณ์ความปลอดภัย | ✅ |
| เลือก backend ต่อ session | ✅ |
| ส่งข้อความข้าม session | ✅ |
| ตัวควบคุมแตกงานและตรวจผล | ✅ |
| Workflow แบบ Python | ✅ |
| Autopilot **ไม่** ข้ามคำสั่งต้องห้าม | ✅ |

### ความปลอดภัยที่มีในตัว

- ตรวจการยึดหลักก่อนอนุญาต
- คำสั่งต้องห้าม
- sandbox ระดับระบบ
- ปิดบังข้อมูลอ่อนไหวในผลลัพธ์
- บันทึกประวัติแบบตรวจสอบย้อนหลังได้

### ช่องทางสื่อสาร

| ช่องทาง | สถานะ | หมายเหตุ |
|---|---|---|
| Discord | ✅ | รองรับแบบติดตั้งจริง ไม่ต้องเปิด URL สาธารณะ |
| LINE | ❌ | **ไม่มีในตัว** ต้องทำสะพานเชื่อมเพิ่ม |
| Slack, Telegram, Teams | ✅ | มีในตัว แต่ยังไม่ได้เลือกใช้ |

### ความสามารถเฉพาะ Discord

| ความสามารถ | สถานะ |
|---|---|
| แยก session ต่อ DM | ✅ |
| อนุญาตเฉพาะรายชื่อที่กำหนด (ปฏิเสธเป็นค่าเริ่มต้น) | ✅ |
| อนุมัติ/ปฏิเสธในแชทได้ | ✅ |
| คำสั่งหยุดฉุกเฉิน | ✅ |
| เชื่อมต่อออกเอง ไม่ต้องเปิดพอร์ตรับเข้า | ✅ |

### สภาพเครื่อง `sv`

| รายการ | ผลที่ตรวจได้ |
|---|---|
| ระบบปฏิบัติการ | Ubuntu Server |
| สถาปัตยกรรม | `x86_64` |
| glibc | 2.43 |
| RAM ทั้งหมด | 30 GiB |
| RAM ว่าง | 25 GiB |
| พื้นที่ดิสก์ว่าง | 51 GB |
| พอร์ตที่จะใช้ `5476` | ว่าง |

### เครือข่ายและระบบ

| รายการ | ผลที่ตรวจได้ |
|---|---|
| เชื่อมต่อ Discord | ตอบกลับ `HTTP 200` |
| `discord.com` | ตอบกลับ `HTTP 301` |
| ผนังกั้นเพลิง | ไม่ได้ติดตั้ง |
| Tailscale | รุ่น 1.102.4 |
| route เดิม | `:8443` → `127.0.0.1:3001` |
| service เดิม | `sv-opencode-serve.service` ใช้พอร์ต `4096` |
| สิทธิ์อ่าน route | ✅ |
| Mosquitto | ทำงานอยู่ บน `0.0.0.0:1883` |
| systemd ระดับระบบ | ✅ ใช้จริงแล้ว — `kirocrew.service` ที่ `/etc/systemd/system/` |
| systemd ระดับผู้ใช้ | ไม่ได้ใช้ — `/home/devg/.config/systemd/user/` ไม่มีอยู่ |

### เครื่องมือช่วยเหลือบนเครื่อง

| รายการ | สถานะ |
|---|---|
| `~/python-tools/sv.py` | ✅ มีอยู่ |
| ช่องทางรหัสผ่าน | ✅ ทดสอบแล้วว่าใช้ได้จริง (ได้สิทธิ์ root) |
| การคงอยู่หลังออกจากระบบ | ไม่จำเป็น — เป็น system service ที่เปิดพร้อม boot |

### บันทึกจากทางการ

| เรื่อง | ผล |
|---|---|
| ช่องทางสื่อสารที่รองรับ | ยืนยันจากดัชนีเอกสารทางการ |
| รายละเอียด Discord | ยืนยันจากหน้าเอกสารทางการ |
| ตัวควบคุมและการส่งข้าม session | ยืนยันจากหน้าเอกสารทางการ |

---

## ยังไม่ได้ตรวจ

ข้อเหล่านี้ห้ามนำไปอ้างว่าใช้ได้จริงจนกว่าจะทดสอบ

### ต้องทดสอบหลังติดตั้ง (ยังค้างทั้งหมด)

| ข้อ | ทำไมสำคัญ | ถ้าไม่ผ่าน |
|---|---|---|
| ✅ ~~`kirocrew service install` + AppArmor profile~~ | **ผ่านแล้ว** ดู [ข้อ ๙.๑](#๙๑-sandbox-แบบ-strict-ใช้งานได้แล้ว-แก้โดย-service-install) | — |
| ✅ ~~`loginctl enable-linger devg`~~ | **ไม่จำเป็น** เป็น system service จึงไม่ต้องเปิด linger | — |
| ตั้ง `agent.approval_mode = interactive` | ปัจจุบันยังเป็น `auto` | งานที่มีผลทำได้เอง |
| `kirocrew tailnet up` | ต้องรู้ว่ากระทบ Billing หรือไม่ | ใช้ทาง SSH tunnel แทน |
| ผลตรวจหลังตั้งค่า sandbox | ❓ ตรวจแล้วว่า sandbox ทำงาน แต่ยังไม่ได้พิสูจน์ว่าคุ้มครองจริงในงานจริง | งดใช้งานจริง |
| backend ของ OpenCode ทำงานจริง | ยืนยันการเชื่อมต่อ | อาจต้องเขียนตัวเชื่อม |
| `kiro-cli acp --help` | คำสั่งหลักไม่แสดง `acp` | อาจต้องเขียนตัวเชื่อม |
| โหมดสิทธิ์ที่ Crew ต้องการ | ถ้าผิดจะใช้งานไม่ได้ | ต้องปรับ config |
| การส่งต่อ SSH ใน strict sandbox | กระทบการ push โค้ด | ใช้ consent file |
| การอนุมัติผ่าน Discord | ต้องใช้งานได้จริง | ใช้ dashboard แทน |
| ทำงานหลัง reboot จริง | เกณฑ์ขาด | ต้องแก้ lifecycle |
| ใช้ทรัพยากรจริง | ยืนยันว่าพอ | ลดงานพร้อมกัน |

### เชิงธุรกิจ

| ข้อ | สถานะ |
|---|---|
| ราคาและสิทธิ์ใช้งาน | ❓ ยังไม่ยืนยัน |
| จำนวนเครดิตที่ใช้จริง | ❓ ยังไม่ยืนยัน — เอกสารเคยระบุ 50 เครดิต/เดือนสำหรับระดับฟรี แต่ยังไม่ยืนยันกับบัญชีจริง |

::: warning สิ่งที่ไม่ควรพึ่ง
ตัวเลขเครดิตใด ๆ ที่เคยเห็น **ไม่ควรถูกใช้ในการวางแผนงานจริง** จนกว่าจะตรวจกับบัญชีและรุ่นที่ใช้จริง
:::

---

## สิ่งที่พบจากการตรวจ

ข้อค้นพบที่กระทบการออกแบบ

### ๑. `kiro` ใช้ไม่ได้ ต้องใช้ `kiro-cli`

คำสั่ง `kiro --help` ล้มเหลว เพราะไบนารีชื่อ `kiro-cli` ต้องแก้ในเอกสารและสคริปต์ให้ตรงกัน

### ๒. `kiro-cli --help` ไม่แสดง `acp` และ `serve`

แม้ Crew จะรองรับโดยตรง แต่ตัวคลิมากไม่ได้ประกาศในคำสั่งหลัก ต้องทดสอบตรง ๆ ถึงจะรู้ว่าใช้ได้จริงไหม

### ๓. เอกสารทางการไม่มีหน้า `features/messaging-channels.md`

ที่อ้างอิงอยู่ได้ 404 หน้าที่ถูกต้องคือ **`interfaces/discord.md`** — ถ้าอ้างอิง URL ผิดจะทำให้ตรวจสอบยาก

### ๔. ต้องใช้ user-level systemd — แต่ของจริงเป็น system-level

ข้อค้นพบเดิม (3 ต.ค. 2569 ก่อนติดตั้ง): การติดตั้ง service ตามปกติต้องใส่รหัสผ่านระดับระบบ จึงวางแผนจะเลี่ยงมาด้วย service ระดับผู้ใช้

**สถานะจริงหลังแก้ sandbox:** คำสั่งทางการ `kirocrew service install` สร้างเป็น **system-level** ที่ `/etc/systemd/system/kirocrew.service` ไม่ใช่ user-level

| จุดที่ต่าง | ตามแผนเดิม | ของจริง |
|---|---|---|
| ตำแหน่ง unit | `~/.config/systemd/user/` | `/etc/systemd/system/` |
| เรียกด้วย | `systemctl --user` | `systemctl` |
| ต้องเปิด linger | ต้อง | **ไม่ต้อง** |
| ต้องการ sudo ตอนรัน | ไม่ต้อง | ต้อง (ตอนติดตั้ง) |

ก่อนติดตั้งยืนยันแล้วว่า `/home/devg/.config/systemd/user/` **ไม่มีอยู่** และ `sv-opencode-serve.service` เดิมเป็น system-level ที่ `/etc/systemd/system/` — **ไม่ชนกัน**

### ๕. พอร์ต `4096` ถูกใช้แล้ว

ต้องเลี่ยบ และต้องไม่แตะ route ที่ผูกกับพอร์ตนี้

### ๖. URL ติดตั้งในเอกสารเดิมติดตั้งไม่ครบ

`curl -fsSL https://download.kiro.dev/cli.sh | sh` ติดตั้ง **เฉพาะ `kiro-cli`** ไม่ใช่ Kiro Crew

ติดตั้งจริงแล้วด้วย `kiro-cli crew -y -- --help` ได้ `kirocrew 0.7.2` ที่
`/home/devg/.local/bin/kirocrew`

::: danger ถ้าทำตามเอกสารเดิมจะเข้าใจผิดว่าติดตั้งครบ
คำสั่งจะจบด้วยการมีแค่ `kiro-cli` แล้วรัน `kirocrew` ไม่ได้ — ต้องตรวจ `kirocrew --version` ทุกครั้ง
:::

### ๗. ค่าเริ่มต้น approval คือ `auto` ไม่ใช่ `interactive`

`kirocrew doctor` บน sv รายงาน `approval: auto` ซึ่งมาจาก `defaults.json` ที่ติดมากับ Crew
ค่านี้ทำให้งานที่มีผลทำงานได้โดยไม่รอคนอนุมัติ ซึ่งต่างจากที่เอกสารและแผนระบุ

ต้องตั้ง `agent.approval_mode = interactive` เอง — สถานะปัจจุบัน **ยังไม่ได้ตั้ง**

### ๗.๑ `config.json` ยังไม่เคยถูกสร้าง — ค่าที่อ่านได้ทั้งหมดคือค่าเริ่มต้น

ข้อนี้สำคัญมากเพราะทำให้เข้าใจผิดว่า "ตั้งค่าไว้แล้ว" ทั้งที่ยังไม่ได้แตะเลย

```
$ ls ~/.kiro/crew/
agent_model_state.json  agent_model_state.json.lock  channel  crew-log/
gateway.log  logs/  python-mode  run/  security_events.jsonl  trust/
```

ตรวจทีละไฟล์แล้ว **ไม่มีจริงทุกไฟล์**

| ไฟล์ | สถานะ |
|---|---|
| `config.json` | ❌ ไม่มี |
| `.env` | ❌ ไม่มี |
| `security_policy.json` | ❌ ไม่มี |
| `profiles/` | ❌ ไม่มี |
| `ssh_auth_sock_consent.json` | ❌ ไม่มี |

`kirocrew config get` ยังตอบได้ครบ เพราะมันอ่านจาก `defaults.json` ที่ติดมากับ Crew
ตรวจเส้นทางที่ระบบจะเขียนจริงได้จากตัวโค้ดใน venv (`/home/devg/.kiro/crew-venv`)

```bash
source /home/devg/.kiro/crew-venv/bin/activate && python -c "
from kiro_crew.config import loader
print(loader.config_path())   # → /home/devg/.kiro/crew/config.json
print(loader.config_dir())    # → /home/devg/.kiro/crew
"
```

สรุปค่าจริงที่อ่านได้ตอนนี้ — ทั้งหมดคือ **ค่าเริ่มต้น ไม่ใช่สิ่งที่เราตั้ง**

| คีย์ | ค่าจริง | หมายเหตุ |
|---|---|---|
| `agent.provider` | `acp` | ค่าเริ่มต้น |
| `agent.approval_mode` | `auto` | ❌ ยังไม่ได้ตั้งเป็น `interactive` |
| `agent.sandbox` | `auto` | ค่าเริ่มต้น และเลือก `strict` ให้เองได้แล้ว — ดูข้อ ๙.๑ |
| `agent.tool_approval_timeout_secs` | `600` | 10 นาที |
| `agent.default_agent` | `""` | ทำให้เตือน `Agent workspace 'default' not found` |
| `member_acp_backend` | `kas` | |
| `acp_backend` | `""` | ยังไม่ได้เลือก |
| `discord.enabled` | `false` | |
| `discord.bot_token` | `""` | |
| `discord.allowed_user_ids` | `[]` | **ไม่ใช่** `allowed_users` |
| `discord.allowed_channel_ids` | `[]` | |
| `discord.allowed_thread_ids` | `[]` | |

::: danger ข้อนี้แก้ความเข้าใจผิดที่สำคัญที่สุด
`kirocrew config get` อ่านค่าออกมาได้เสมอ แม้จะยังไม่ได้ตั้งอะไรเลย
ดังนั้น **เห็นค่าออกมา ≠ ตั้งไว้แล้ว** — ต้องตรวจว่าไฟล์มีอยู่จริงด้วยเสมอ
:::

### ๗.๒ `Command: kiro` ใน log ไม่ใช่ binary ที่หายไป

ตรวจจริงแล้ว **ไม่มี binary ชื่อ `kiro` บนเครื่อง และไม่จำเป็นต้องมี**

```
$ command -v kiro   → ไม่พบ
$ find ~ -name 'kiro*' -type f   → เจอแค่ kiro-cli, kiro-cli-chat, kiro-cli-term, kirocrew
gateway.log → SECURITY: ... spawning a first-party fixed-argv Kiro Crew helper UNCONFINED ... Command: kiro
```

`Command: kiro` คือ **ชื่อ helper ภายในแพ็กเกจ** ที่ Crew ระบุไว้ในข้อความเตือน ไม่ใช่ชื่อ executable ที่ต้องติดตั้งเพิ่ม

ตัว executable ที่ติดตั้งจริงคือ `kirocrew` (`/home/devg/.local/bin/kirocrew` → symlink ไป `/home/devg/.kiro/crew-venv/bin/kirocrew`)
และ `kiro-cli` เวอร์ชัน 2.26.0

### ๗.๓ `--path` ของ AppArmor profile ชี้ไปที่ `kirocrew` เอง

ตรวจจาก `--help` ของคำสั่งจริง

```
--path PATH   Executable to attach the profile to. Defaults to $APPIMAGE.
              Refused for world-writable locations (/tmp and friends) and for
              shared interpreters such as /usr/bin/python3, which would over-grant.
```

ค่าจริงบนเครื่องนี้

```
APPIMAGE = <unset>                      # ติดตั้งแบบ venv/pip ไม่ใช่ AppImage
kirocrew sandbox status
→ ❌ no launcher profile is installed, and $APPIMAGE is not set so this is not an
  AppImage launch. Use `kirocrew service install` to confine the gateway as a systemd unit.
```

ดังนั้น **ไม่ต้องรอหา binary ชื่อ `kiro`** และไม่ควรชี้ `--path` ไปที่ `kiro` — ถ้าจะผูก profile เองต้องชี้ไปที่ตัว `kirocrew`

```bash
kirocrew sandbox install-profile --path /home/devg/.local/bin/kirocrew
```

แต่ **ทางที่ Crew แนะนำและที่ใช้จริงแล้ว** สำหรับเครื่องที่ไม่ใช่ AppImage คือ
`kirocrew service install` ซึ่งทำได้ทั้ง systemd unit และ AppArmor profile ในคำสั่งเดียว
→ รายละเอียดและหลักฐาน: [ข้อ ๙.๑](#๙๑-sandbox-แบบ-strict-ใช้งานได้แล้ว-แก้โดย-service-install)

### ๘. Crew มี `kirocrew tailnet` จัดการ Tailscale เอง

คำสั่ง `kirocrew tailnet up/down/status` มีอยู่จริงใน 0.7.2

```
👻 Tailnet dashboard access
   Trust:      disabled (dashboard.tailscale.enabled)
   Name:       sv.tail7b4d4a.ts.net
   Published:  no — Serve is configured for other ports only; nothing is on port 443.
```

ผลนี้ขัดกับแผนเดิมสองข้อ:

1. Crew จะ publish บน **port 443** ไม่ใช่ `8444` ที่แผนเดิมระบุ
2. การเขียน `tailscale serve` เองจะชนกับสิ่งที่ Crew คาดว่าจะจัดการ

ต้องใช้ `kirocrew tailnet up` และยังไม่ทดสอบว่าจะกระทบ route `:8443 → 127.0.0.1:3001` ของ Billing หรือไม่

### ๙. sandbox แบบ strict — แก้แล้ว ใช้งานได้

> **อัปเดต 3 ต.ค. 2569 (21:10)** — ข้อ ๙ เดิมบันทึกว่า strict ใช้ไม่ได้
> **ตอนนี้ผ่านแล้ว** รายละเอียดสถานะจริงอยู่ใน [ข้อ ๙.๑](#๙๑-sandbox-แบบ-strict-ใช้งานได้แล้ว-แก้โดย-service-install)

### ๙.๑ sandbox แบบ strict ใช้งานได้แล้ว (แก้โดย `service install`)

แก้ได้ด้วยคำสั่งทางการของ Crew เอง โดยพี่ฆังอนุมัติ และรันผ่านช่องทาง `~/python-tools/sv.py`

**ต้องแก้สิทธิ์ก่อน 1 ขั้น — ไม่ได้อยู่ในแผนเดิม**

| ขั้น | ผล |
|---|---|
| `getent group devg` | `devg:x:1000:` — ไม่มีสมาชิกอื่น |
| user ที่ login ได้ | มีแค่ `devg` (uid 1000) |
| ใครอ้างถึง `~/.kiro` | มีแค่ `kirocrew.service` |

`/home/devg/.kiro` เดิมเป็น `0775` ทำให้ Crew **ปฏิเสธ** ติดตั้ง profile เพราะกลุ่มมีสิทธิ์เขียน
แก้เป็น `0750` แล้วจึงติดตั้งสำเร็จ

```bash
chmod 750 /home/devg/.kiro     # 775 → 750
kirocrew service install
```

ผลรวมจากคำสั่งทางการ

```
✅ kirocrew service installed and started.
   unit: /etc/systemd/system/kirocrew.service
   AppArmor profile installed at /etc/apparmor.d/kirocrew-userns ... enforcement is confirmed
```

**หลักฐานว่าใช้งานได้จริง**

| ตรวจ | ผล |
|---|---|
| `unshare -U true` (เคยล้ม EPERM) | ✅ ผ่าน |
| `SandboxUnavailableError` หลังติดตั้ง profile | ✅ **0 ครั้ง** |
| service | ✅ `enabled` / `active` |
| AppArmor ที่ process gateway | ✅ `kirocrew-userns` |
| dashboard | ✅ ฟังที่ `127.0.0.1:5476` |

error 2 ครั้งที่เคยเจอเกิดเวลา `21:03:20` ก่อนติดตั้ง profile
หลังติดตั้ง (service restart เวลา `21:10:13`) ไม่มี error เพิ่มอีกเลย

::: warning `unconfined` ใน `/proc/PID/attr/current` ไม่ใช่ข้อผิดพลาด
`/proc/<PID>/attr/current` ขึ้น `kirocrew-userns (unconfined)` — ตรวจเนื้อโปรไฟล์จริงแล้วตั้งใจเป็นแบบนี้

```
profile kirocrew-userns "/home/devg/.kiro/crew-venv/bin/kirocrew" flags=(unconfined) {
  userns,
```

โปรไฟล์นี้ให้สิทธิ์ `userns` **อย่างเดียว** ไม่เพิ่มการจำกัดอะไร — เป็นรูปแบบเดียวกับที่ Ubuntu ใช้กับ
`/etc/apparmor.d/chrome` และ `/etc/apparmor.d/brave` (ตรวจแล้วมีอยู่จริงในเครื่อง)

**สรุปสั้น ๆ:** ตัวที่ทำให้ agent แยกจากเครื่องคือ **sandbox ของ Crew**
(เข้า user + mount namespace แล้ว over-mount `~/.ssh` `~/.aws`) — AppArmor เป็นแค่ผู้เปิดสิทธิ์ให้เข้า namespace ได้
:::

### ๙.๒ กับดักตอนตรวจ: `sandbox status` ขึ้น ❌ แม้ทุกอย่างปกติ

```
$ kirocrew sandbox status
→ ❌ no launcher profile is installed, and $APPIMAGE is not set ...
```

คำสั่งนี้เช็ก **profile ของ process ที่กำลังรันอยู่** (launcher) ไม่ใช่ของ systemd service
รันผ่าน SSH shell จึงไม่มี profile ติดตัว — **ไม่ใช่ความล้มเหลว**

วิธีตรวจที่ถูกต้องสำหรับ service

```bash
PID=$(systemctl show kirocrew -p MainPID --value)
cat /proc/$PID/attr/current        # ต้องเป็น kirocrew-userns
```

ผลตรวจ **ก่อนแก้** (เวลา `21:03:20`) คือ

```
unshare(CLONE_NEWMS) failed with errno 1 (EPERM)
AppArmor profile 'kirocrew-userns' is not installed
```

และเตือนว่า first-party fixed-argv helper ถูก spawn แบบ unconfined

ตอนนั้น strict sandbox **ยังไม่ให้ความคุ้มครองจริง** จึงแก้ด้วยคำสั่งทางการของ Crew
โดย**ไม่ถอด sandbox** — ผลหลังแก้อยู่ใน [ข้อ ๙.๑](#๙๑-sandbox-แบบ-strict-ใช้งานได้แล้ว-แก้โดย-service-install)

ยืนยันสาเหตุเพิ่มเติมจาก kernel และจากคำสั่งของ Crew เอง

```
kernel.unprivileged_userns_clone               = 1
kernel.apparmor_restrict_unprivileged_userns   = 1   ← สาเหตุ
user.max_user_namespaces                       = 123527

kirocrew sandbox status
→ no launcher profile ... use service install to confine the gateway (systemd)
```

คำสั่งที่ Crew รองเคียง (ทั้งหมดต้องใช้ sudo และต้องได้รับอนุมัติ — **แต่ไม่จำเป็นแล้ว**)

```bash
# ✅ ทางที่ใช้จริงแล้ว 3 ต.ค. 2569 ผ่าน ~/python-tools/sv.py
#    ต้องลดสิทธิ์ /home/devg/.kiro เป็น 750 ก่อน
chmod 750 /home/devg/.kiro
kirocrew service install

# ❌ ไม่ได้ใช้ — ทางเลือกที่ไม่จำเป็นเพราะข้างบนแก้ครบแล้ว
kirocrew sandbox install-profile --path /home/devg/.local/bin/kirocrew

# ❌ ไม่ได้ใช้ — เป็น system service จึงไม่ต้องเปิด linger
loginctl enable-linger devg
```

::: tip แก้ความเข้าใจผิดเรื่อง `Command: kiro`
`--path` ต้องชี้ไปที่ **ตัว `kirocrew`** ไม่ใช่ binary ชื่อ `kiro`
และ `Command: kiro` ใน `gateway.log` เป็นชื่อ helper ภายในแพ็กเกจ ไม่ใช่สิ่งที่หายไป
รายละเอียดและหลักฐานอยู่ในข้อ ๗.๒–๗.๓
:::

### ๑๐. user linger — ไม่จำเป็นแล้ว เพราะเป็น system service

ข้อ ๑๐ เดิมบันทึกว่า linger ปิดอยู่ **แต่ไม่ต้องแก้แล้ว**

`kirocrew service install` สร้าง unit ที่ `/etc/systemd/system/kirocrew.service`
ซึ่งเป็น **system service** — เปิดพร้อม boot และทำงานโดยไม่ผูกกับ session ของผู้ใช้
จึงไม่ต้องเปิด linger และ**ไม่ได้รัน `loginctl enable-linger devg`**

```bash
systemctl is-enabled kirocrew     # enabled
systemctl is-active  kirocrew     # active
systemctl show kirocrew -p ActiveEnterTimestamp --value
# → Sat 2026-10-03 21:10:13 +07
```

::: warning ข้อนี้ต่างจากแผนเดิม — ดูข้อ ๙.๑
แผนเดิมวางไว้ว่าจะเขียน user-level service ที่ `~/.config/systemd/user/kirocrew.service`
แต่คำสั่งทางการของ Crew สร้างเป็น system-level แทน ผลคือสิทธิ์และการคงอยู่ต่างจากเดิม
:::


### ๑๑. ยังไม่มี policy/profile บนเครื่อง

```
kirocrew policy validate
→ Policy: none (editable secure-defaults) — nothing to validate. (no profiles directory)
→ Central policy distribution: not configured (this host uses a local policy).
```

ยืนยันว่า `security_policy.json` และ `profiles/` ยังไม่มี — การอ้างถึง "นโยบายสองชั้น" เป็นแผนที่ต้องสร้าง ไม่ใช่สถานะปัจจุบัน

### ๑๒. ส่วนเสริมยังไม่ครบ (ไม่กระทบการติดตั้ง)

| ส่วน | สถานะ | ผลต่อ doctor |
|---|---|---|
| STT | ไม่มี `boto3`, `amazon-transcribe`, `pywhispercpp` | optional · ทำให้ overall ไม่ผ่าน |
| `ffmpeg` | ไม่พบใน PATH | optional |
| `claude-acp` | ไม่พบ | optional |
| MCP `@kirocrew-computer` | ไม่ถูก project ใน `kiro`, `claude`, `codex` | ควรตรวจว่าจำเป็นไหม |

---

## วิธีตรวจสอบว่าข้อมูลยังจริง

เอกสารนี้ถูกเขียน ณ วันที่ **3 ตุลาคม 2569**

ถ้าอ่านภายหลังแล้วข้อมูลไม่ตรง ให้ถือว่าเครื่องเปลี่ยนไปแล้ว

```bash
# ตรวจว่าเครื่องมือยังเป็นรุ่นที่บันทึกไว้
kiro-cli --version
opencode --version
agy --version
copilot --version

# ตรวจพอร์ตที่ใช้งานอยู่
ss -tlnp
systemctl status kirocrew

# ตรวจว่า process gateway อยู่ใต้ AppArmor profile
PID=$(systemctl show kirocrew -p MainPID --value)
cat /proc/$PID/attr/current        # ต้องเป็น kirocrew-userns

# ตรวจว่า route ยังเหมือนเดิม
tailscale serve status
```

::: tip หลักการ
เอกสารนี้เป็น**บันทึก ณ เวลานั้น** ไม่ใช่ความจริงที่เปลี่ยนไม่ได้ ถ้าตรวจแล้วไม่ตรง ให้แก้เอกสาร ไม่ใช่แก้ความจริง
:::

หน้าถัดไป: [๖. ความปลอดภัย](/security)
