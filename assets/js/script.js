/* ==================================================================
   MOCK DATA
================================================================== */
const mockGuru = [
    { nip: "198001012005011001", nama: "Budi Santoso, S.Pd", jk: "Laki-laki", mapel: "Matematika", jabatan: "Guru Tetap", status: "Aktif" },
    { nip: "198202022006022002", nama: "Siti Aminah, M.Pd", jk: "Perempuan", mapel: "Bahasa Indonesia", jabatan: "Wakil Kepala Sekolah", status: "Aktif" },
    { nip: "198503032010031003", nama: "Agus Salim, S.Kom", jk: "Laki-laki", mapel: "TIK", jabatan: "Guru Tetap", status: "Aktif" }
];

const mockSiswa = [
    { nis: "21001", nama: "Andi Saputra", jk: "Laki-laki", kelas: "X-1", jurusan: "IPA", status: "Aktif" },
    { nis: "21002", nama: "Rina Melati", jk: "Perempuan", kelas: "X-2", jurusan: "IPS", status: "Aktif" },
    { nis: "20001", nama: "Dodi Hermansyah", jk: "Laki-laki", kelas: "XI-1", jurusan: "IPA", status: "Aktif" },
    { nis: "19001", nama: "Citra Kirana", jk: "Perempuan", kelas: "XII-1", jurusan: "IPA", status: "Lulus" }
];

const mockBerita = [
    { id: 1, judul: "Juara Umum Olimpiade Sains 2026", kategori: "Prestasi", penulis: "Admin", tanggal: "2026-09-01", status: "Published" },
    { id: 2, judul: "Penerimaan Siswa Baru Dibuka", kategori: "Pengumuman", penulis: "Humas", tanggal: "2026-09-05", status: "Published" },
    { id: 3, judul: "Persiapan Ujian Nasional", kategori: "Akademik", penulis: "Admin", tanggal: "2026-09-10", status: "Draft" }
];

const mockPrestasi = [
    { id: 1, nama: "Juara 1 Lomba Pidato Bahasa Inggris", kategori: "Akademik", tingkat: "Provinsi", tahun: "2026", siswa: "Andi Saputra", keterangan: "Meraih piala gubernur" }
];

const mockPengumuman = [
    { id: 1, judul: "Libur Semester Ganjil", isi: "Libur semester ganjil dimulai dari 15 Desember - 2 Januari", tanggal: "2026-12-01", status: "Aktif" }
];

const mockGaleri = [
    { id: 1, judul: "Kegiatan Pramuka", tanggal: "2026-08-14", img: "https://via.placeholder.com/300x200.png?text=Pramuka" },
    { id: 2, judul: "Upacara Bendera", tanggal: "2026-08-17", img: "https://via.placeholder.com/300x200.png?text=Upacara" }
];

const profilSekolah = {
    nama: "SMA Negeri 1 Antigravity",
    npsn: "10293847",
    alamat: "Jl. Pendidikan No. 123, Kota Cerdas",
    email: "info@sman1antigravity.sch.id",
    telepon: "021-98765432",
    website: "www.sman1antigravity.sch.id",
    kepsek: "Drs. H. Ahmad Dahlan, M.Pd",
    deskripsi: "Sekolah berwawasan global dengan mengedepankan teknologi dan akhlak mulia.",
    visi: "Menjadi sekolah unggul di tingkat nasional.",
    misi: "1. Meningkatkan kualitas akademik\n2. Menerapkan teknologi dalam pembelajaran"
};

/* ==================================================================
   GLOBAL FUNCTIONS & AUTH
================================================================== */

// Check Auth Status (Simple Simulation)
function checkAuth() {
    const isLogin = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const user = localStorage.getItem('adminUser');
    
    if (!user && !isLogin) {
        window.location.href = '../index.html'; // Redirect to login
    }
    if (user && isLogin) {
        window.location.href = 'pages/dashboard.html'; // Redirect to dashboard
    }
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const err = document.getElementById('login-error');
    
    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('adminUser', 'admin');
        window.location.href = 'pages/dashboard.html';
    } else {
        err.style.display = 'block';
        err.textContent = 'Username atau Password salah!';
    }
}

function handleLogout() {
    localStorage.removeItem('adminUser');
    window.location.href = '../index.html';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Set active menu based on URL
function setActiveMenu() {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.sidebar-menu .menu-item');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Show/Hide Modal
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}
function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

/* ==================================================================
   PAGE INITIALIZATION
================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Bind Sidebar Toggle
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
    
    // Bind Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    // Bind Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    // Bind Modal Closers
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });
    
    // Set Active Menu
    setActiveMenu();

    // Init specific pages
    initDashboard();
    initDataGuru();
    initDataSiswa();
    initDataBerita();
    initProfilSekolah();
    initLaporan();
});

/* ==================================================================
   DASHBOARD LOGIC
================================================================== */
function initDashboard() {
    const dashCanvas = document.getElementById('dashboardChart');
    if (!dashCanvas) return;
    
    // Set Summary Counts
    document.getElementById('totalGuru').innerText = mockGuru.length;
    document.getElementById('totalSiswa').innerText = mockSiswa.length;
    document.getElementById('totalBerita').innerText = mockBerita.length;
    document.getElementById('totalPrestasi').innerText = mockPrestasi.length;
    
    // Init Chart
    new Chart(dashCanvas, {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Jumlah Siswa Baru',
                data: [120, 150, 140, 160, 180],
                backgroundColor: '#1976D2',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Statistik Pendaftaran Siswa' }
            }
        }
    });

    // Populate Recent News
    const tableBody = document.getElementById('recentNewsTable');
    if(tableBody) {
        mockBerita.slice(0,3).forEach(b => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${b.judul}</td>
                <td><span class="badge badge-primary">${b.kategori}</span></td>
                <td>${b.tanggal}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

/* ==================================================================
   CRUD GURU
================================================================== */
function initDataGuru() {
    const tableBody = document.getElementById('tableGuruBody');
    if (!tableBody) return;
    
    function renderGuru(data) {
        tableBody.innerHTML = '';
        if(data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Data tidak ditemukan</td></tr>`;
            return;
        }
        data.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nip}</td>
                <td>${item.nama}</td>
                <td>${item.jk}</td>
                <td>${item.mapel}</td>
                <td>${item.jabatan}</td>
                <td><span class="badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-danger'}">${item.status}</span></td>
                <td>
                    <button class="btn btn-icon btn-primary" onclick="alert('Fungsi Edit untuk NIP ${item.nip}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('guru', ${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    renderGuru(mockGuru);
    
    // Search
    const searchInput = document.getElementById('searchGuru');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = mockGuru.filter(g => g.nama.toLowerCase().includes(val) || g.nip.includes(val));
            renderGuru(filtered);
        });
    }
}

/* ==================================================================
   CRUD SISWA
================================================================== */
function initDataSiswa() {
    const tableBody = document.getElementById('tableSiswaBody');
    if (!tableBody) return;
    
    function renderSiswa(data) {
        tableBody.innerHTML = '';
        if(data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Data tidak ditemukan</td></tr>`;
            return;
        }
        data.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nis}</td>
                <td>${item.nama}</td>
                <td>${item.jk}</td>
                <td>${item.kelas}</td>
                <td>${item.jurusan}</td>
                <td><span class="badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-danger'}">${item.status}</span></td>
                <td>
                    <button class="btn btn-icon btn-primary" onclick="alert('Fungsi Edit untuk NIS ${item.nis}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('siswa', ${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    renderSiswa(mockSiswa);
    
    // Search
    const searchInput = document.getElementById('searchSiswa');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = mockSiswa.filter(s => s.nama.toLowerCase().includes(val) || s.nis.includes(val));
            renderSiswa(filtered);
        });
    }
}

/* ==================================================================
   CRUD BERITA
================================================================== */
function initDataBerita() {
    const tableBody = document.getElementById('tableBeritaBody');
    if (!tableBody) return;
    
    function renderBerita(data) {
        tableBody.innerHTML = '';
        if(data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Data tidak ditemukan</td></tr>`;
            return;
        }
        data.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.judul}</td>
                <td>${item.kategori}</td>
                <td>${item.penulis}</td>
                <td>${item.tanggal}</td>
                <td><span class="badge ${item.status === 'Published' ? 'badge-success' : 'badge-warning'}">${item.status}</span></td>
                <td>
                    <a href="form-berita.html" class="btn btn-icon btn-primary"><i class="fas fa-edit"></i></a>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('berita', ${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    renderBerita(mockBerita);
}

/* ==================================================================
   PROFIL SEKOLAH
================================================================== */
function initProfilSekolah() {
    const form = document.getElementById('formProfilSekolah');
    if (!form) return;
    
    // Populate form
    document.getElementById('namaSekolah').value = profilSekolah.nama;
    document.getElementById('npsn').value = profilSekolah.npsn;
    document.getElementById('alamat').value = profilSekolah.alamat;
    document.getElementById('email').value = profilSekolah.email;
    document.getElementById('telepon').value = profilSekolah.telepon;
    document.getElementById('website').value = profilSekolah.website;
    document.getElementById('kepsek').value = profilSekolah.kepsek;
    document.getElementById('deskripsi').value = profilSekolah.deskripsi;
    document.getElementById('visi').value = profilSekolah.visi;
    document.getElementById('misi').value = profilSekolah.misi;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Data Profil Sekolah berhasil disimpan! (Simulasi)');
    });
}

/* ==================================================================
   LAPORAN & OTHERS
================================================================== */
function initLaporan() {
    const btnCetak = document.getElementById('btnCetak');
    if(btnCetak) {
        btnCetak.addEventListener('click', () => {
            window.print();
        });
        
        // Populate stats for report
        document.getElementById('lapTotalGuru').innerText = mockGuru.length;
        document.getElementById('lapTotalSiswa').innerText = mockSiswa.length;
        document.getElementById('lapTotalBerita').innerText = mockBerita.length;
        document.getElementById('lapTotalPrestasi').innerText = mockPrestasi.length;
    }
}

// Global Delete Simulation
let itemToDelete = null;
let typeToDelete = null;

function confirmDelete(type, index) {
    typeToDelete = type;
    itemToDelete = index;
    showModal('deleteModal');
}

function processDelete() {
    if (typeToDelete === 'guru') {
        mockGuru.splice(itemToDelete, 1);
        initDataGuru();
    } else if (typeToDelete === 'siswa') {
        mockSiswa.splice(itemToDelete, 1);
        initDataSiswa();
    } else if (typeToDelete === 'berita') {
        mockBerita.splice(itemToDelete, 1);
        initDataBerita();
    }
    hideModal('deleteModal');
    // Notification could be added here
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert("Data berhasil disimpan! (Simulasi Client-Side)");
    hideModal('tambahModal');
}
