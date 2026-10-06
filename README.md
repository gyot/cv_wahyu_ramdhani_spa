# CV / Portfolio Wahyu Ramdhani — SPA

Website portfolio/CV single-page application berbasis Vue.js 3 dengan Vue Router (history mode).

## Fitur
- SPA tanpa reload halaman (Vue.js 3 + Vue Router 4)
- Clean URL tanpa `#/` (HTML5 History Mode)
- Meta tag SEO dinamis per halaman (title, description, Open Graph, Twitter Card)
- Setiap bagian CV memiliki route/page sendiri
- Responsive desktop/tablet/mobile
- Sidebar navigation
- Dark/light mode
- Windows 8 Metro style design
- Profile photo modal
- Tanpa build step — langsung buka di browser

## Route
- `/` — Beranda
- `/profil` — Profil
- `/pengalaman` — Pengalaman
- `/proyek` — Proyek
- `/keahlian` — Keahlian
- `/teknologi` — Teknologi
- `/multimedia` — Multimedia
- `/minat` — Minat
- `/kontak` — Kontak

## SEO
Setiap halaman memiliki:
- `<title>` dinamis
- `<meta name="description">` dinamis
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Canonical URL

## Hosting
Karena menggunakan HTML5 History Mode, server harus di-redirect semua request ke `index.html`.

File konfigurasi sudah disediakan:
- `.htaccess` — Apache
- `netlify.toml` — Netlify
- `vercel.json` — Vercel
- `_redirects` — Netlify (alternatif)

Cukup upload seluruh folder ke hosting.

## Lokal
Buka `index.html` di browser. Untuk testing routing lokal, gunakan server lokal:
```bash
npx serve .
# atau
python -m http.server 8000
```

## Catatan
Bagian Kontak sengaja dibuat placeholder karena email, WhatsApp, GitHub, LinkedIn, dan URL portfolio belum ditentukan.