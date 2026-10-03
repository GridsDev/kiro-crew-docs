import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Kiro Crew on sv',
  description: 'แผนติดตั้ง Kiro Crew บนเซิร์ฟเวอร์ sv — multi-agent, Discord, Tailscale-only, โดย ฌอน',
  lang: 'th',
  base: '/',
  head: [['meta', { name: 'theme-color', content: '#7c3aed' }]],
  themeConfig: {
    nav: [
      { text: 'หน้าแรก', link: '/' },
      { text: 'แผนงาน', link: '/work-plan' },
      { text: 'ความปลอดภัย', link: '/security' },
      { text: 'ตั้งค่า Discord', link: '/discord-setup' },
      { text: 'ผลตรวจสอบ', link: '/verification' },
    ],
    sidebar: {
      '/': [
        {
          text: 'เริ่มต้น',
          items: [
            { text: '๑. นำเสนอโครงการ', link: '/' },
            { text: '๒. แก้ปัญหาอะไรให้ผู้ใช้', link: '/problems' },
            { text: '๓. เป้าหมายและผลสำเร็จ', link: '/goals' },
          ],
        },
        {
          text: 'การดำเนินงาน',
          items: [
            { text: '๔. แผนการทำงาน', link: '/work-plan' },
            { text: '๕. การตรวจสอบ', link: '/verification' },
            { text: '๙. ส่งงาน', link: '/delivery' },
          ],
        },
        {
          text: 'คุณภาพ',
          items: [
            { text: '๖. ความปลอดภัย', link: '/security' },
            { text: '๗. การทดสอบ', link: '/testing' },
            { text: '๘. ปรับปรุงแก้ไข', link: '/improvements' },
          ],
        },
        {
          text: 'ภาคผนวก',
          items: [
            { text: 'ตั้งค่า Discord (ทำเอง 6 ขั้น)', link: '/discord-setup' },
            { text: 'สถาปัตยกรรม Multi-Agent', link: '/architecture' },
            { text: 'บันทึกการตัดสินใจ', link: '/decisions' },
          ],
        },
      ],
    },
    outline: 'deep',
    search: { provider: 'local' },
    docFooter: { prev: 'หน้าก่อนหน้า', next: 'หน้าถัดไป' },
    lastUpdated: true,
  },
})
