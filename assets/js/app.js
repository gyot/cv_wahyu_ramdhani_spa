const { createApp, ref, computed, onMounted, onUnmounted, nextTick, h } = Vue;
const { createRouter, createWebHistory, useRouter, useRoute } = VueRouter;

const profileData = {
  name: "Wahyu Ramdhani",
  role: "Web Manager · Web Developer · Digital Transformation",
  organization: "Balai Penjaminan Mutu Pendidikan Provinsi Nusa Tenggara Barat",
  shortOrg: "BPMP Provinsi NTB",
  location: "Nusa Tenggara Barat, Indonesia",
  since: "2018",
  description: "Web Manager dan praktisi teknologi informasi yang menggabungkan software development, digital transformation, system administration, multimedia, dan content management untuk membangun solusi digital yang benar-benar digunakan."
};

function useSeo(title, description) {
  const fullTitle = `${title} · ${profileData.name}`;
  document.title = fullTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", fullTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", fullTitle);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", window.location.href);
}

const Beranda = {
  template: `
    <section class="page hero">
      <div class="hero-left">
        <div class="hero-eyebrow">Portfolio · Curriculum Vitae</div>
        <h1>Wahyu<br><strong>Ramdhani</strong></h1>
        <p class="hero-lead">{{ profile.description }}</p>
        <div class="hero-actions">
          <router-link class="btn btn-primary" to="/proyek">Lihat Proyek →</router-link>
          <router-link class="btn btn-outline" to="/kontak">Hubungi Saya</router-link>
        </div>
      </div>
      <div>
        <div class="tiles-grid">
          <div class="tile tile-dark tile-wide" @click="showModal = true" style="background:url('assets/foto_profil.JPG') center/cover no-repeat;min-height:160px;cursor:pointer">
            <div style="background:linear-gradient(to top,rgba(0,0,0,.7),transparent);margin:-20px;padding:40px 20px 20px">
              <div class="tile-label">Wahyu Ramdhani</div>
              <div class="tile-title">Web Manager · Web Developer</div>
            </div>
          </div>
          <div class="tile tile-blue">
            <div>
              <div class="tile-label">Current Role</div>
              <div class="tile-title">Web Manager</div>
              <div class="tile-desc">BPMP Provinsi NTB</div>
            </div>
          </div>
          <div class="tile tile-teal">
            <div>
              <div class="tile-label">Lokasi</div>
              <div class="tile-title">NTB</div>
              <div class="tile-desc">Indonesia</div>
            </div>
          </div>
          <div class="tile tile-wide tile-dark">
            <div>
              <div class="tile-label">Motto</div>
              <div class="tile-desc">Membangun jembatan antara kebutuhan organisasi dan solusi teknologi.</div>
            </div>
          </div>
          <div class="tile tile-purple">
            <div>
              <div class="tile-stat">2018+</div>
              <div class="tile-label">Pengalaman</div>
            </div>
          </div>
          <div class="tile tile-orange">
            <div>
              <div class="tile-stat">10+</div>
              <div class="tile-label">Proyek Digital</div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-modal-overlay" :class="{ active: showModal }" @click.self="showModal = false">
        <div class="profile-modal">
          <button class="profile-modal-close" @click="showModal = false">✕</button>
          <div class="profile-modal-content">
            <h2>Wahyu <strong>Ramdhani</strong></h2>
            <div class="profile-modal-role">{{ profile.role }}</div>
            <div class="profile-modal-info">
              <div><small>Organisasi</small><span>{{ profile.shortOrg }}</span></div>
              <div><small>Lokasi</small><span>Nusa Tenggara Barat</span></div>
              <div><small>Pengalaman</small><span>Sejak {{ profile.since }}</span></div>
              <div><small>Fokus</small><span>Web & Digital</span></div>
            </div>
            <div class="profile-modal-desc">{{ profile.description }}</div>
            <div class="profile-modal-actions">
              <router-link class="btn btn-primary" to="/profil" @click="showModal = false">Lihat Profil →</router-link>
              <router-link class="btn btn-outline" to="/kontak" @click="showModal = false" style="color:#fff;border-color:rgba(255,255,255,.2)">Hubungi</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const showModal = ref(false);
    useSeo("Beranda", profileData.description);
    return { profile: profileData, showModal };
  }
};

const Profil = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">02 · Profil</div>
        <h1>Profil Profesional</h1>
        <p>Profesional teknologi informasi dengan pengalaman lintas bidang antara pengembangan software, pengelolaan infrastruktur, digitalisasi proses kerja, dan produksi konten digital.</p>
      </header>
      <div class="content-grid">
        <div class="content-tile"><h3>Siapa Saya?</h3><p>Saya Wahyu Ramdhani, bekerja sebagai Web Manager di BPMP Provinsi NTB. Saya terbiasa menerjemahkan kebutuhan organisasi menjadi aplikasi, website, workflow, dan konten digital yang praktis.</p></div>
        <div class="content-tile"><h3>Cara Bekerja</h3><p>Berorientasi pada solusi, implementasi, efisiensi, maintainability, dan pengalaman pengguna. Saya terbiasa belajar teknologi baru ketika dibutuhkan oleh proyek.</p></div>
        <div class="content-tile"><h3>Fokus Profesional</h3><p>Web development, digital transformation, system administration, database, API integration, SEO, multimedia, dan content management.</p></div>
        <div class="content-tile"><h3>Prinsip</h3><p>Jika suatu proses bisa dibuat lebih sederhana, terintegrasi, dan otomatis, maka sebaiknya dibuatkan sistem.</p></div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Profil", "Profil profesional Wahyu Ramdhani — Web Manager di BPMP Provinsi NTB dengan fokus pada web development, digital transformation, dan system administration.");
  }
};

const Pengalaman = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">03 · Pengalaman</div>
        <h1>Pengalaman Profesional</h1>
        <p>Pengalaman sejak 2018 dalam pengelolaan website, pengembangan sistem informasi, digitalisasi proses kerja, infrastruktur, dan multimedia.</p>
      </header>
      <div class="metro-timeline">
        <div class="timeline-block">
          <div class="timeline-period">2018 — Sekarang</div>
          <h3>Web Manager / Pengelola Teknologi Informasi</h3>
          <div class="timeline-org">Balai Penjaminan Mutu Pendidikan Provinsi Nusa Tenggara Barat</div>
          <ul>
            <li>Mengelola dan mengembangkan website organisasi.</li>
            <li>Mengembangkan sistem informasi dan aplikasi internal.</li>
            <li>Melakukan maintenance, troubleshooting, optimasi SEO, dan keamanan website.</li>
            <li>Mengelola database, API, server, hosting, dan deployment.</li>
            <li>Mendukung publikasi, dokumentasi foto/video, dan kebutuhan multimedia.</li>
            <li>Berkolaborasi lintas unit untuk menerjemahkan kebutuhan kerja menjadi solusi digital.</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Pengalaman", "Pengalaman profesional Wahyu Ramdhani sejak 2018 — Web Manager, pengembangan sistem informasi, digitalisasi proses kerja, infrastruktur, dan multimedia di BPMP NTB.");
  }
};

const Proyek = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">04 · Proyek</div>
        <h1>Selected Projects</h1>
        <p>Beberapa sistem dan platform yang pernah dikembangkan atau ditangani.</p>
      </header>
      <div class="tiles-grid">
        <div v-for="p in projects" :key="p.id" class="tile" :class="p.color">
          <div>
            <div class="tile-label">{{ p.code }}</div>
            <div class="tile-title">{{ p.title }}</div>
            <div class="tile-desc">{{ p.desc }}</div>
          </div>
          <div style="text-align:right;font-size:42px;font-weight:300;opacity:.3;margin-top:8px">{{ p.id }}</div>
        </div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Proyek", "Proyek-proyek digital Wahyu Ramdhani: SIMAIK, E-Sertifikat, ULT, SILAK PEMUDIK, Registration, Peminjaman, Website BPMP NTB, dan Statistik.");
    const projects = [
      { id: "01", code: "SIMAIK", title: "Sistem Informasi Administrasi Manajemen Kegiatan", desc: "Manajemen kegiatan, peserta, penugasan, sertifikat, formulir, statistik, dan pelaporan.", color: "tile-blue" },
      { id: "02", code: "E-SERTIFIKAT", title: "Digital Certificate System", desc: "Batch sertifikat, peserta, template DOCX, generate otomatis, PDF, dan validasi.", color: "tile-green" },
      { id: "03", code: "ULT", title: "Unit Layanan Terpadu", desc: "Sistem web untuk mendukung layanan Unit Layanan Terpadu.", color: "tile-teal" },
      { id: "04", code: "SILAK PEMUDIK", title: "Digital Service", desc: "Aplikasi digital untuk mendukung kebutuhan layanan dan informasi pemudik.", color: "tile-purple" },
      { id: "05", code: "REGISTRATION", title: "Participant Management", desc: "Formulir online, validasi, pengelolaan peserta, ekspor, dan integrasi data.", color: "tile-orange" },
      { id: "06", code: "PEMINJAMAN", title: "Asrama & Aula", desc: "Pengelolaan permohonan, jadwal, peminjam, fasilitas, dan administrasi.", color: "tile-red" },
      { id: "07", code: "WEBSITE", title: "BPMP NTB & PPID", desc: "Pengelolaan website, content management, SEO, keamanan, dan pengembangan fitur.", color: "tile-indigo" },
      { id: "08", code: "STATISTIK", title: "Activity Analytics", desc: "API dan dashboard statistik kegiatan untuk mendukung pengambilan keputusan.", color: "tile-pink" }
    ];
    return { projects };
  }
};

const Keahlian = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">05 · Keahlian</div>
        <h1>Core Competencies</h1>
        <p>Kombinasi kompetensi teknis dan non-teknis untuk mengubah kebutuhan menjadi produk digital.</p>
      </header>
      <div class="content-grid">
        <div v-for="s in skills" :key="s.name" class="content-tile">
          <h3>{{ s.name }}</h3>
          <p>{{ s.desc }}</p>
          <div class="skill-tile" style="background:transparent;padding:12px 0 0;margin-top:12px">
            <div class="skill-bar"><div class="skill-fill" :style="{ width: s.level + '%' }"></div></div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Keahlian", "Keahlian inti Wahyu Ramdhani: Digital Transformation, Software Development, System Administration, Project Development, Multimedia, SEO & Content.");
    const skills = [
      { name: "Digital Transformation", desc: "Menganalisis proses kerja dan mengubah proses manual menjadi sistem digital yang terintegrasi.", level: 90 },
      { name: "Software Development", desc: "Mengembangkan aplikasi web dari analisis kebutuhan, database, backend, frontend, testing hingga deployment.", level: 88 },
      { name: "System Administration", desc: "Mengelola server, hosting, web server, PHP, Node.js, database, storage, SSL, dan troubleshooting.", level: 85 },
      { name: "Project Development", desc: "Menerjemahkan kebutuhan organisasi menjadi workflow, arsitektur, fitur, dan implementasi yang maintainable.", level: 87 },
      { name: "Multimedia", desc: "Fotografi, videografi, editing, dokumentasi kegiatan, video testimonial, dan konten digital.", level: 80 },
      { name: "SEO & Content", desc: "Content management, SEO on-page/technical, metadata, struktur halaman, dan optimasi konten.", level: 82 }
    ];
    return { skills };
  }
};

const Teknologi = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">06 · Teknologi</div>
        <h1>Technology Stack</h1>
        <p>Ekosistem teknologi yang pernah digunakan dalam pengembangan aplikasi, server, dokumen, dan integrasi.</p>
      </header>
      <div class="tiles-grid">
        <div v-for="t in tech" :key="t.cat" class="tile" :class="t.color">
          <div>
            <div class="tile-label">{{ t.cat }}</div>
            <div class="tile-desc" style="font-size:13px;opacity:.9">{{ t.items }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Teknologi", "Technology stack Wahyu Ramdhani: PHP, Laravel, Vue.js, MySQL, Ubuntu, Node.js, Flutter, Cloudflare, dan lainnya.");
    const tech = [
      { cat: "Backend", items: "PHP · Laravel 11 · REST API · Authentication · MVC", color: "tile-blue" },
      { cat: "Frontend", items: "Vue.js · Vue Router · Pinia · Vite · Tailwind CSS · Bootstrap · AdminLTE", color: "tile-teal" },
      { cat: "Database", items: "MySQL · MariaDB · Migration · Relationship · Backup/Restore", color: "tile-green" },
      { cat: "Server", items: "Ubuntu · aaPanel · cPanel · Apache · Nginx · PHP-FPM · PM2", color: "tile-purple" },
      { cat: "Node.js", items: "Node.js · Express · Axios · Puppeteer · WhatsApp Web.js", color: "tile-orange" },
      { cat: "Documents", items: "Excel · DOCX · PDF · CSV · Maatwebsite Excel · DomPDF · PHPWord · LibreOffice", color: "tile-indigo" },
      { cat: "Mobile", items: "Ionic · Capacitor · Flutter · API-based mobile architecture", color: "tile-pink" },
      { cat: "Infrastructure", items: "Cloudflare · Cloudflare Tunnel · RAID · mdadm · ext4 · Nextcloud", color: "tile-red" }
    ];
    return { tech };
  }
};

const Multimedia = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">07 · Multimedia</div>
        <h1>Multimedia & Content</h1>
        <p>Teknologi bukan satu-satunya fokus. Dokumentasi visual dan komunikasi digital menjadi bagian penting dari pekerjaan.</p>
      </header>
      <div class="media-grid">
        <div v-for="item in media" :key="item" class="media-tile">
          <h3>{{ item }}</h3>
        </div>
      </div>
      <div class="content-tile" style="margin-top:4px">
        <h3>Dokumentasi Program Pendidikan</h3>
        <p>Berpengalaman menyiapkan konsep dan dokumentasi video testimonial program revitalisasi sekolah dengan narasumber kepala sekolah, guru, murid, serta masyarakat/wali murid.</p>
      </div>
    </section>
  `,
  setup() {
    useSeo("Multimedia", "Portofolio multimedia Wahyu Ramdhani: fotografi, videografi, video editing, dokumentasi, YouTube content, flyer, dan infografis.");
    const media = ["Fotografi","Videografi","Video Editing","Video Dokumenter","Video Testimonial","YouTube Content","Instagram Content","Flyer & Poster","Infografis"];
    return { media };
  }
};

const Minat = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">08 · Minat</div>
        <h1>Interests</h1>
        <p>Beberapa bidang yang saya eksplorasi di luar pekerjaan utama.</p>
      </header>
      <div class="interest-grid">
        <div v-for="i in interests" :key="i.name" class="interest-tile" :class="i.color">
          <h3>{{ i.name }}</h3>
          <p>{{ i.desc }}</p>
        </div>
      </div>
    </section>
  `,
  setup() {
    useSeo("Minat", "Minat dan eksplorasi Wahyu Ramdhani: teknologi, elektronik, fotografi, videografi, alam, memancing, kopi, baking, digital government.");
    const interests = [
      { name: "Teknologi", desc: "AI, software, automation, self-hosted infrastructure", color: "tile-blue" },
      { name: "Elektronik", desc: "ESP32, Arduino, relay, sensor, baterai, DIY", color: "tile-green" },
      { name: "Fotografi", desc: "Visual storytelling dan dokumentasi", color: "tile-teal" },
      { name: "Videografi", desc: "Vlog, dokumenter, editing, produksi konten", color: "tile-purple" },
      { name: "Alam", desc: "Pendakian, touring, eksplorasi alam", color: "tile-orange" },
      { name: "Memancing", desc: "Casting, jigging, dan aktivitas outdoor", color: "tile-red" },
      { name: "Kopi", desc: "Eksplorasi kopi dan V60", color: "tile-pink" },
      { name: "Baking", desc: "Sourdough dan eksperimen baking", color: "tile-yellow" },
      { name: "Digital Government", desc: "Transformasi digital layanan publik", color: "tile-indigo" }
    ];
    return { interests };
  }
};

const Kontak = {
  template: `
    <section class="page">
      <header class="page-head">
        <div class="page-eyebrow">09 · Kontak</div>
        <h1>Mari Berkolaborasi</h1>
        <p>Halaman ini siap diisi dengan kontak profesional, sosial media, GitHub, LinkedIn, atau link portofolio ketika datanya sudah ditentukan.</p>
      </header>
      <div class="contact-grid">
        <div class="contact-tile"><small>Nama</small><strong>Wahyu Ramdhani</strong></div>
        <div class="contact-tile"><small>Lokasi</small><strong>Nusa Tenggara Barat, Indonesia</strong></div>
        <div class="contact-tile"><small>Role</small><strong>Web Manager · Web Developer</strong></div>
        <div class="contact-tile"><small>Organisasi</small><strong>BPMP Provinsi NTB</strong></div>
      </div>
      <div class="content-tile" style="margin-top:4px">
        <h3>Link Profesional</h3>
        <p style="margin-bottom:14px">Tambahkan email, WhatsApp, LinkedIn, GitHub, YouTube, atau website pribadi di sini.</p>
        <router-link to="/" class="btn btn-primary">Kembali ke Beranda</router-link>
      </div>
    </section>
  `,
  setup() {
    useSeo("Kontak", "Hubungi Wahyu Ramdhani — Web Manager & Web Developer di BPMP Provinsi Nusa Tenggara Barat.");
  }
};

const NotFound = {
  template: `
    <section class="page" style="display:flex;align-items:center;justify-content:center;min-height:80vh;text-align:center">
      <div>
        <div style="font-size:96px;font-weight:300;opacity:.3;margin-bottom:16px">404</div>
        <h1 style="font-size:28px;font-weight:300;margin-bottom:20px">Halaman Tidak Ditemukan</h1>
        <router-link to="/" class="btn btn-primary">Kembali ke Beranda</router-link>
      </div>
    </section>
  `,
  setup() {
    useSeo("404", "Halaman tidak ditemukan.");
  }
};

const routes = [
  { path: "/", component: Beranda },
  { path: "/profil", component: Profil },
  { path: "/pengalaman", component: Pengalaman },
  { path: "/proyek", component: Proyek },
  { path: "/keahlian", component: Keahlian },
  { path: "/teknologi", component: Teknologi },
  { path: "/multimedia", component: Multimedia },
  { path: "/minat", component: Minat },
  { path: "/kontak", component: Kontak },
  { path: "/:pathMatch(.*)*", component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

const app = createApp({
  template: `
    <div class="sidebar" :class="{ open: sidebarOpen }" id="sidebar">
      <div class="sidebar-brand">
        <div>
          <span class="brand-name">Wahyu Ramdhani</span>
          <span class="brand-sub">Digital Portfolio</span>
        </div>
      </div>
      <div class="sidebar-nav">
        <router-link to="/" class="nav-link" @click="closeSidebar"><span class="nav-num">01</span> Beranda</router-link>
        <router-link to="/profil" class="nav-link" @click="closeSidebar"><span class="nav-num">02</span> Profil</router-link>
        <router-link to="/pengalaman" class="nav-link" @click="closeSidebar"><span class="nav-num">03</span> Pengalaman</router-link>
        <router-link to="/proyek" class="nav-link" @click="closeSidebar"><span class="nav-num">04</span> Proyek</router-link>
        <router-link to="/keahlian" class="nav-link" @click="closeSidebar"><span class="nav-num">05</span> Keahlian</router-link>
        <router-link to="/teknologi" class="nav-link" @click="closeSidebar"><span class="nav-num">06</span> Teknologi</router-link>
        <router-link to="/multimedia" class="nav-link" @click="closeSidebar"><span class="nav-num">07</span> Multimedia</router-link>
        <router-link to="/minat" class="nav-link" @click="closeSidebar"><span class="nav-num">08</span> Minat</router-link>
        <router-link to="/kontak" class="nav-link" @click="closeSidebar"><span class="nav-num">09</span> Kontak</router-link>
      </div>
      <div class="sidebar-footer">
        <div class="availability-badge"><span class="dot"></span> Open to collaboration</div>
        <button class="theme-toggle" @click="toggleTheme" type="button">
          ☀ <span>Mode Tampilan</span>
        </button>
      </div>
    </div>

    <div class="mobile-topbar">
      <div class="topbar-inner">
        <div class="topbar-brand">
          <div class="brand-avatar-sm">WR</div>
          <strong>Wahyu Ramdhani</strong>
        </div>
        <button @click="sidebarOpen = !sidebarOpen" aria-label="Buka menu">☰</button>
      </div>
    </div>

    <div class="pusher">
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <div class="footer">© {{ year }} Wahyu Ramdhani. Portfolio & CV.</div>
      </main>
    </div>

    <button class="voice-btn" :class="{ listening: isListening, active: voiceSupported }" @click="toggleVoice" :title="isListening ? 'Berhenti mendengarkan' : 'Klik untuk memberi perintah suara'">
      <span v-if="isListening" class="voice-pulse"></span>
      <span class="voice-icon">🎤</span>
    </button>

    <transition name="voice-toast">
      <div v-if="voiceText" class="voice-toast">
        <div class="voice-toast-label">{{ voiceLabel }}</div>
        <div class="voice-toast-text">"{{ voiceText }}"</div>
      </div>
    </transition>


  `,
  setup() {
    const sidebarOpen = ref(false);
    const year = new Date().getFullYear();
    const isListening = ref(false);
    const voiceText = ref("");
    const voiceLabel = ref("");
    const voiceSupported = ref(false);
    let recognition = null;
    let toastTimer = null;

    const chatOpen = ref(false);
    const chatSettings = ref(false);
    const chatApiKey = ref("");
    const chatApiKeyInput = ref("");
    const chatMessages = ref([]);
    const chatInput = ref("");
    const chatLoading = ref(false);
    const chatStreaming = ref(false);
    const chatMessagesRef = ref(null);
    const chatError = ref("");

    const configKey = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.OPENROUTER_API_KEY) ? APP_CONFIG.OPENROUTER_API_KEY : "";
    const savedKey = localStorage.getItem("mimo-api-key");
    const initialKey = configKey || savedKey || "";
    if (initialKey) {
      chatApiKey.value = initialKey;
      chatApiKeyInput.value = initialKey;
      if (configKey && configKey !== savedKey) {
        localStorage.setItem("mimo-api-key", configKey);
      }
    }

    const apiBaseUrl = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.API_BASE_URL) ? APP_CONFIG.API_BASE_URL : "https://openrouter.ai/api/v1";
    const apiModel = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.MODEL) ? APP_CONFIG.MODEL : "xiaomi/mimo-v2.5-pro";

    const voiceRoutes = {
      "beranda": "/",
      "home": "/",
      "profil": "/profil",
      "profile": "/profil",
      "pengalaman": "/pengalaman",
      "experience": "/pengalaman",
      "proyek": "/proyek",
      "project": "/proyek",
      "projects": "/proyek",
      "keahlian": "/keahlian",
      "skill": "/keahlian",
      "skills": "/keahlian",
      "teknologi": "/teknologi",
      "technology": "/teknologi",
      "tech": "/teknologi",
      "multimedia": "/multimedia",
      "minat": "/minat",
      "interest": "/minat",
      "interests": "/minat",
      "hobi": "/minat",
      "kontak": "/kontak",
      "contact": "/kontak",
      "hubungi": "/kontak"
    };

    function showVoiceToast(label, text) {
      voiceLabel.value = label;
      voiceText.value = text;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        voiceText.value = "";
        voiceLabel.value = "";
      }, 3000);
    }

    function processCommand(transcript) {
      const text = transcript.toLowerCase().trim();
      for (const [keyword, path] of Object.entries(voiceRoutes)) {
        if (text.includes(keyword)) {
          showVoiceToast("Navigasi", keyword);
          router.push(path);
          return;
        }
      }
      showVoiceToast("Tidak dikenal", transcript);
    }

    function toggleVoice() {
      if (!voiceSupported.value) {
        showVoiceToast("Error", "Browser tidak mendukung voice recognition");
        return;
      }
      if (isListening.value) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          showVoiceToast("Error", "Gagal memulai voice recognition");
        }
      }
    }

    function toggleChat() {
      chatOpen.value = !chatOpen.value;
      if (chatOpen.value) {
        nextTick(scrollChatBottom);
      }
    }

    function saveApiKey() {
      const key = chatApiKeyInput.value.trim();
      if (key) {
        chatApiKey.value = key;
        localStorage.setItem("mimo-api-key", key);
        chatSettings.value = false;
        chatError.value = "";
      }
    }

    function clearChat() {
      chatMessages.value = [];
      chatError.value = "";
    }

    function scrollChatBottom() {
      nextTick(() => {
        if (chatMessagesRef.value) {
          chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
        }
      });
    }

    async function sendChatMessage() {
      const text = chatInput.value.trim();
      if (!text || chatLoading.value) return;

      if (!chatApiKey.value) {
        chatSettings.value = true;
        chatError.value = "Masukkan API Key terlebih dahulu.";
        return;
      }

      chatMessages.value.push({ role: "user", content: text });
      chatInput.value = "";
      chatLoading.value = true;
      chatError.value = "";
      scrollChatBottom();

      const systemPrompt = "Anda adalah asisten AI bernama MiMo yang terintegrasi di website portfolio Wahyu Ramdhani. Jawab pertanyaan dengan ramah, singkat, dan informatif dalam Bahasa Indonesia. Jika ditanya tentang Wahyu Ramdhani, gunakan informasi: Web Manager di BPMP Provinsi NTB, pengalaman sejak 2018, fokus pada web development, digital transformation, system administration, multimedia.";

      const historyForApi = chatMessages.value.map(m => ({ role: m.role, content: m.content }));
      const apiMessages = [{ role: "system", content: systemPrompt }, ...historyForApi];

      const assistantMsg = { role: "assistant", content: "" };
      chatMessages.value.push(assistantMsg);

      try {
        chatStreaming.value = true;

        const apiUrl = apiBaseUrl.includes('.php') ? apiBaseUrl : apiBaseUrl + "/chat/completions";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + chatApiKey.value,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Wahyu Ramdhani Portfolio - MiMo Chatbot"
          },
          body: JSON.stringify({
            model: apiModel,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 1024,
            stream: true
          })
        });

        if (!response.ok) {
          let errMsg = "HTTP " + response.status;
          try {
            const errData = await response.json();
            errMsg = errData.error?.message || errData.message || errMsg;
          } catch (e) {}
          throw new Error(errMsg);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") break;
            try {
              const json = JSON.parse(data);
              if (json.error) {
                assistantMsg.content = "Error: " + json.error;
                break;
              }
              const content = json.choices?.[0]?.delta?.content || json.content;
              if (content) {
                assistantMsg.content += content;
                scrollChatBottom();
              }
            } catch (e) {}
          }
        }

        if (!assistantMsg.content) {
          assistantMsg.content = "Tidak ada respons dari AI. Periksa API Key Anda.";
        }
      } catch (err) {
        console.error("Chat error:", err);
        assistantMsg.content = "Error: " + err.message;
        chatError.value = err.message;
      } finally {
        chatLoading.value = false;
        chatStreaming.value = false;
        scrollChatBottom();
      }
    }

    function closeSidebar() {
      sidebarOpen.value = false;
    }

    function toggleTheme() {
      document.body.classList.toggle("light");
      localStorage.setItem("wr-theme", document.body.classList.contains("light") ? "light" : "dark");
    }

    onMounted(() => {
      if (localStorage.getItem("wr-theme") === "light") {
        document.body.classList.add("light");
      }
      if (chatApiKey.value) {
        chatApiKeyInput.value = chatApiKey.value;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        voiceSupported.value = true;
        recognition = new SpeechRecognition();
        recognition.lang = "id-ID";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          isListening.value = true;
          showVoiceToast("Mendengarkan", "Ucapkan nama halaman...");
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          processCommand(transcript);
        };

        recognition.onerror = (event) => {
          isListening.value = false;
          if (event.error === "no-speech") {
            showVoiceToast("Info", "Tidak ada suara terdeteksi");
          } else if (event.error !== "aborted") {
            showVoiceToast("Error", event.error);
          }
        };

        recognition.onend = () => {
          isListening.value = false;
        };
      }
    });

    onUnmounted(() => {
      if (recognition) recognition.abort();
      clearTimeout(toastTimer);
    });

    return { sidebarOpen, year, closeSidebar, toggleTheme, isListening, voiceText, voiceLabel, voiceSupported, toggleVoice, chatOpen, chatSettings, chatApiKey, chatApiKeyInput, chatMessages, chatInput, chatLoading, chatStreaming, chatMessagesRef, chatError, toggleChat, saveApiKey, clearChat, sendChatMessage };
  }
});

app.use(router);
app.mount("#app");