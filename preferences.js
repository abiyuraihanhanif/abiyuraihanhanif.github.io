(() => {
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let language = read('portfolio-language') === 'en' ? 'en' : 'id';
  let theme = read('portfolio-theme');
  if (!['light', 'dark'].includes(theme)) theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  const translations = {
    'Lewati navigasi':'Skip navigation','Tentang':'About','Proyek':'Projects','Pengalaman':'Experience','Mari terhubung':'Let’s connect',
    'Di balik data,':'Behind the data,','ada':'there is a','cerita.':'story.','Dan keputusan':'And better','yang lebih baik':'decisions',
    'Saya Abiyu Raihan Hanif. Menghubungkan data, riset, dan konteks bisnis menjadi insight yang bisa ditindaklanjuti.':'I’m Abiyu Raihan Hanif. Connecting data, research, and business context to turn insights into action.',
    'Jelajahi proyek':'Explore projects','Kenali saya':'Get to know me','RASA INGIN TAHU. ANALISIS. DAMPAK.':'CURIOSITY. ANALYSIS. IMPACT.','SCROLL UNTUK EKSPLORASI ↓':'SCROLL TO EXPLORE ↓',
    '01 — TENTANG SAYA':'01 — ABOUT ME','Analitis dalam berpikir.':'An analytical mind.','Jelas dalam bercerita.':'A clear storyteller.',
    'Latar belakang Administrasi Publik membentuk cara saya melihat data: setiap angka punya konteks, setiap temuan perlu dikomunikasikan.':'My background in Public Administration shapes how I see data: every number has context, and every finding deserves a clear explanation.',
    'Saya mengolah data dengan Python, SQL, dan Excel, membangun dashboard KPI, serta menyampaikan rekomendasi kepada stakeholder. Pengalaman saya menjangkau bisnis, evaluasi kinerja pemerintah, dan riset strategis.':'I process data with Python, SQL, and Excel, build KPI dashboards, and communicate recommendations to stakeholders. My experience spans business, government performance evaluation, and strategic research.',
    'Sarjana Ilmu Sosial · Administrasi Publik':'Bachelor of Social Sciences · Public Administration','IPK 3.68 / 4.00':'GPA 3.68 / 4.00',
    '02 — PROYEK PILIHAN':'02 — SELECTED PROJECTS','Dari pertanyaan,':'From questions','menjadi':'to','pemahaman.':'understanding.','Dua konteks berbeda.':'Two different contexts.','Satu pendekatan: keputusan berbasis data.':'One approach: data-informed decisions.',
    'Semua proyek':'All projects','Operasional':'Operations','Kinerja institusi':'Institutional performance','Mengevaluasi performa armada tambang dan peluang perbaikan proses operasional.':'Evaluating mining fleet performance and opportunities to improve operational processes.',
    'Mengubah data performa institusi menjadi dashboard analitik dan rekomendasi strategis.':'Turning institutional performance data into analytical dashboards and strategic recommendations.','Buka studi kasus':'View case study','Lihat portfolio lengkap':'View full portfolio',
    '03 — PERJALANAN':'03 — MY JOURNEY','Pengalaman yang':'Experience that','membentuk':'shapes','perspektif.':'perspective.','Klik setiap peran untuk melihat kontribusinya.':'Select a role to explore my contributions.',
    'JUL 2026 — SEKARANG':'JUL 2026 — PRESENT','Klien individu · Freelance / Remote':'Individual client · Freelance / Remote',
    'Mengekstrak data PDF dengan OCR, Excel, dan AI tools; memvalidasi dan memperbarui data dengan tingkat akurasi 90% serta tenggat yang konsisten.':'Extracted PDF data using OCR, Excel, and AI tools; validated and updated records with 90% accuracy while consistently meeting deadlines.',
    'Mengumpulkan dan menganalisis data dengan SQL dan Python. Insight berkontribusi pada peningkatan penjualan tiket 15%. Menyusun dashboard serta mempresentasikan rekomendasi kepada stakeholder.':'Collected and analyzed data using SQL and Python. Insights contributed to a 15% increase in ticket sales. Built dashboards and presented recommendations to stakeholders.',
    'OKT 2020 — DES 2022':'OCT 2020 — DEC 2022','Asisten Dosen':'Teaching Assistant',
    'Mendukung penyusunan dokumen perencanaan pembangunan (RKPD) dan pengelolaan data riset untuk unit riset fakultas (KPPMF).':'Supported regional development planning documents (RKPD) and managed research data for the faculty research unit (KPPMF).',
    'JUL — AGU 2021':'JUL — AUG 2021','Intern · Pemerintahan & SDM':'Intern · Government & HR Development',
    'Mengolah dan menganalisis data KPI dari lebih dari 10 instansi pemerintah untuk evaluasi kinerja program.':'Processed and analyzed KPI data from more than 10 government agencies to evaluate program performance.',
    '04 — KEAHLIAN & PEMBELAJARAN':'04 — SKILLS & LEARNING','Perangkat yang tepat.':'The right tools.','Pertanyaan yang tajam.':'The right questions.',
    'Pengolahan & analisis':'Processing & analysis','Visualisasi & dashboard':'Visualization & dashboards','Dashboard KPI · Analisis tren':'KPI dashboards · Trend analysis','Riset & storytelling':'Research & storytelling',
    'Desain riset · Analisis strategis':'Research design · Strategic analysis','Data storytelling · Penulisan laporan':'Data storytelling · Report writing','Presentasi · Kolaborasi lintas tim':'Presentations · Cross-functional collaboration',
    'Lebih jauh: riset, kepemimpinan & konferensi':'More: research, leadership & conferences',
    'Kepala Divisi Analisis Strategis LDK Kerohanian Islam UNS (2020–2021): memimpin 10+ kajian dan mempresentasikan hasil di 3+ forum dengan jangkauan 100+ mahasiswa.':'Head of Strategic Analysis, LDK Kerohanian Islam UNS (2020–2021): led 10+ studies and presented findings at 3+ forums reaching 100+ students.',
    'Staff Analisis Strategis BEM UNS (2018–2019): meriset 10+ isu, menyusun 5+ laporan, dan menyajikan hasil di forum dengan 200+ peserta.':'Strategic Analysis Staff, BEM UNS (2018–2019): researched 10+ issues, prepared 5+ reports, and presented findings at forums with 200+ participants.',
    'Penulis dan pembicara International Conference on Sustainable Innovation 2021 dan Konferensi Nasional Sosiologi Perkotaan 2020; terpilih sebagai 1 dari 30 peserta INDEF School of Political Economy 2019.':'Author and speaker at the International Conference on Sustainable Innovation 2021 and the National Conference on Urban Sociology 2020; selected as 1 of 30 participants in the INDEF School of Political Economy 2019.',
    'MULAI PERCAKAPAN':'START A CONVERSATION','Punya data.':'Have data.','Punya pertanyaan.':'Have questions.','Mari kita hubungkan.':'Let’s connect the dots.',
    'Salin email ⧉':'Copy email ⧉','KENALI PENGALAMAN SAYA LEBIH LENGKAP':'EXPLORE MY EXPERIENCE IN MORE DETAIL','CV Indonesia ↓':'Indonesian CV ↓','CV English ↓':'English CV ↓','Kembali ke atas ↑':'Back to top ↑',
    'Pertanyaan utama':'The key question','Pendekatan':'The approach','Hasil pekerjaan':'The outcome','Kunjungi portfolio lengkap ↗':'Visit full portfolio ↗',
    'Bagaimana performa produksi armada tambang dibandingkan dengan rencana operasi?':'How does mining fleet production performance compare with the operational plan?',
    'Menganalisis data cycle-time excavator dan truk menggunakan Python dan Pandas, serta memvisualisasikan hasil dengan Matplotlib untuk mengidentifikasi peluang perbaikan proses.':'Analyzed excavator and truck cycle-time data using Python and Pandas, and visualized results with Matplotlib to identify opportunities for process improvement.',
    'Dashboard dan insight actionable untuk mendukung perencanaan dan pengambilan keputusan tim dispatch.':'A dashboard and actionable insights to support planning and decision-making for the dispatch team.',
    'Bagaimana data performa institusi dapat membantu manajemen menentukan langkah strategis?':'How can institutional performance data help management identify strategic next steps?',
    'Menganalisis data performa institusi dalam studi kasus technical test rekrutmen Data Analyst. Mengembangkan dashboard analitik dengan Metabase dan menyusun laporan analisis untuk manajemen.':'Analyzed institutional performance data in a Data Analyst recruitment technical test. Developed an analytical dashboard with Metabase and prepared an analysis report for management.',
    'Dashboard analitik dan insight strategis untuk membantu memahami performa institusi.':'An analytical dashboard and strategic insights to help understand institutional performance.',
    'Ringkasan berdasarkan CV. Visual pada kartu adalah ilustrasi topik, bukan dashboard atau data proyek asli.':'Summary based on my CV. Card visuals illustrate the subject; they are not original project dashboards or data.',
    'Email tersalin!':'Email copied!','Pilih dan salin alamat email di atas.':'Select and copy the email address above.',
    'Navigasi utama':'Main navigation','Perangkat analisis':'Analytics toolkit','Filter proyek':'Filter projects','Tutup studi kasus':'Close case study','Potret Abiyu Raihan Hanif mengenakan jas navy':'Portrait of Abiyu Raihan Hanif wearing a navy suit'
  };
  Object.assign(translations,{"Beragam tantangan data.": "A range of data challenges.", "Bisnis & pemasaran": "Business & marketing", "Riset & kinerja": "Research & performance", "Ringkasan proyek": "Project overview", "Tools & metode": "Tools & methods", "Lihat studi kasus asli ↗": "View original case study ↗", "Buka dashboard ↗": "Open dashboard ↗", "Buka workbook ↗": "Open workbook ↗", "Lihat laporan ↗": "View report ↗", "Ringkasan berdasarkan portfolio. Visual kartu merupakan ilustrasi, bukan hasil analisis proyek.": "Summary based on my portfolio. Card visuals are illustrations, not project analysis results.", "Kontribusi insight terhadap": "Insights contributing to", "peningkatan penjualan tiket": "an increase in ticket sales", "Instansi pemerintah dalam": "Government agencies in", "analisis data KPI": "KPI data analysis", "Menganalisis titik drop-off pada funnel e-commerce dan menguji apakah kampanye iklan meningkatkan konversi melalui SQL, Python, pengujian statistik, dan dashboard Tableau interaktif.": "Diagnoses drop-off points in an e-commerce funnel and tests whether an ad campaign improves conversions through SQL, Python, statistical testing, and an interactive Tableau dashboard.", "Menganalisis cycle-time excavator dan truk untuk mengevaluasi produksi terhadap rencana operasi serta menghasilkan insight bagi tim dispatch dan manajemen armada.": "Analyzes excavator and truck cycle times to evaluate production against the operating plan and generate insights for dispatch and fleet management.", "Mengeksplorasi tren gaji data science global, pola kerja, karakteristik perusahaan, dan tingkat pengalaman menggunakan Python, PostgreSQL, serta Metabase.": "Explores global data science salary trends, work arrangements, company characteristics, and experience levels using Python, PostgreSQL, and Metabase.", "Menganalisis penjualan e-commerce 2022–2024 untuk mengidentifikasi tren penjualan, kinerja kategori, kontribusi wilayah, profitabilitas produk, dan distribusi pendapatan.": "Analyzes e-commerce sales from 2022–2024 to identify sales trends, category performance, regional contributions, product profitability, and revenue distribution.", "Studi kasus mandiri dari technical test Data Analyst untuk menganalisis performa institusi. Nama institusi dan detail identitas disamarkan untuk menjaga kerahasiaan proses rekrutmen.": "An independently completed Data Analyst recruitment technical test analyzing institutional performance. The institution and identifying details are anonymized to respect recruitment confidentiality.", "Alur analitik dari web scraping daftar perusahaan terbesar AS berdasarkan pendapatan di Wikipedia, dilanjutkan pembersihan data, penyimpanan database, dan visualisasi dashboard.": "An analytics workflow from scraping Wikipedia’s list of the largest US companies by revenue through data cleaning, database storage, and dashboard visualization.", "Menganalisis tren kemiskinan Indonesia 2019–2022 dan perubahan sebelum serta sesudah pandemi COVID-19 melalui analisis Excel dan visualisasi dashboard.": "Analyzes Indonesian poverty trends from 2019–2022 and changes before and after the COVID-19 pandemic through Excel analysis and dashboard visualization.", "Menganalisis pertumbuhan dan strategi konten Netflix 2008–2021, mencakup tren, komposisi konten, genre, serta negara produksi menggunakan Excel dan dashboard.": "Analyzes Netflix content growth and strategy from 2008–2021, covering trends, content composition, genres, and production countries using Excel and dashboards.", "Menganalisis transaksi pelanggan ritel untuk memahami perilaku, tren transaksi, dan segmentasi nilai pelanggan. Alur kerja mencakup pembersihan data Python, analisis SQL, dan visualisasi Tableau.": "Analyzes retail transactions to understand customer behavior, transaction trends, and customer value segmentation through Python data cleaning, SQL analysis, and Tableau visualization.", "Mengidentifikasi tren dan pola pada dataset bisnis, lalu mengubah data mentah menjadi informasi yang jelas melalui grafik dan visualisasi yang informatif.": "Identifies trends and patterns in business data and transforms raw data into clear information through charts and informative visualizations."});
  Object.assign(translations,{"Scroll untuk menjelajahi":"Scroll to explore","Ilustrasi visual · bukan data proyek":"Visual illustration · not project data","Proyek sebelumnya":"Previous project","Proyek berikutnya":"Next project"});
  const originals = new WeakMap();
  function translated(value) { const key=value.trim(); return language==='en' && translations[key] ? value.replace(key,translations[key]) : value; }
  window.translatePage = () => {
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const node=walker.currentNode;
      if(node.parentElement.closest('script,style,.preferences')) continue;
      const record=originals.get(node);
      const original=record && node.nodeValue===record.last ? record.original : node.nodeValue;
      node.nodeValue=translated(original); originals.set(node,{original,last:node.nodeValue});
    }
    document.querySelectorAll('[data-original-label],[aria-label]:not(.preferences *),img[alt]').forEach(el=>{
      const attr=el.hasAttribute('alt')?'alt':'aria-label';
      const key='original'+(attr==='alt'?'Alt':'Label');
      const original=el.dataset[key] ?? el.getAttribute(attr);el.dataset[key]=original;el.setAttribute(attr,translated(original));
    });
    document.documentElement.lang=language;
    document.querySelector('meta[name="description"]').content=language==='en'?'Portfolio of Abiyu Raihan Hanif — Data Analyst in Surakarta. Python, SQL, dashboards, research, and data storytelling.':'Portfolio Abiyu Raihan Hanif — Data Analyst di Surakarta. Python, SQL, dashboard, riset, dan data storytelling.';
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
    updateTheme();
  };
  function updateTheme(){
    document.documentElement.dataset.theme=theme;
    document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#101b1b':'#f8f8f2';
    const b=document.querySelector('#theme-toggle');if(!b)return;
    b.setAttribute('aria-pressed',String(theme==='dark'));
    b.setAttribute('aria-label',language==='en'?'Dark theme':'Tema gelap');
    b.title=language==='en'?'Switch light / dark theme':'Ganti tema terang / gelap';
    b.textContent=(theme==='dark'?'☾ ':'☼ ')+(language==='en'?(theme==='dark'?'Dark':'Light'):(theme==='dark'?'Gelap':'Terang'));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const controls=document.createElement('div');controls.className='preferences';
    controls.innerHTML='<div class="language-switch" role="group" aria-label="Bahasa / Language"><button type="button" data-language="id" aria-label="Bahasa Indonesia">ID</button><button type="button" data-language="en" aria-label="English">EN</button></div><button type="button" id="theme-toggle"></button>';
    document.querySelector('header').insertBefore(controls,document.querySelector('.contact-nav'));
    controls.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.language;save('portfolio-language',language);document.querySelector('#copy-status').textContent='';window.translatePage()}));
    document.querySelector('#theme-toggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';save('portfolio-theme',theme);updateTheme()});
    window.translatePage();
  });
})();
