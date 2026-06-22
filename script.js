// 1. Kumpulan Bendera Dunia yang tersedia untuk dikocok
const bankBendera = [
    { negara: "Indonesia", url: "https://flagcdn.com/id.svg" },
    { negara: "Argentina", url: "https://flagcdn.com/ar.svg" },
    { negara: "Prancis", url: "https://flagcdn.com/fr.svg" },
    { url: "https://flagcdn.com/br.svg" }, // Brasil
    { url: "https://flagcdn.com/jp.svg" }, // Jepang
    { url: "https://flagcdn.com/de.svg" }, // Jerman
    { url: "https://flagcdn.com/gb-eng.svg" }, // Inggris
    { url: "https://flagcdn.com/nl.svg" }, // Belanda
    { url: "https://flagcdn.com/ma.svg" }, // Maroko
    { url: "https://flagcdn.com/pt.svg" }, // Portugal
    { url: "https://flagcdn.com/es.svg" }, // Spanyol
    { url: "https://flagcdn.com/sa.svg" }, // Arab Saudi
    { url: "https://flagcdn.com/kr.svg" }, // Korea Selatan
    { url: "https://flagcdn.com/hr.svg" }, // Kroasia
    { url: "https://flagcdn.com/uy.svg" }, // Uruguay
    { url: "https://flagcdn.com/sn.svg" }  // Senegal
];

// 2. Daftar Peserta Default (Bisa kamu hapus/ganti atau tambah lewat input web nanti)
const daftarPesertaAwal = ["Fernandi", "Budi", "Siti", "Roni", "Agus", "Dewi", "Eko", "Putri"];

let benderas = [...bankBendera];
let pesertas = [...daftarPesertaAwal];
let groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
let groupOrder = ['A', 'B', 'C', 'D'];
let currentGroupIndex = 0;

// Menampilkan daftar nama peserta yang ada di Pot
function renderPot() {
    const potContainer = document.getElementById("pot-teams");
    potContainer.innerHTML = "";
    
    if (pesertas.length === 0) {
        potContainer.innerHTML = "<span style='color: #64748b; font-style: italic;'>Pot Kosong. Silakan tambah peserta di atas!</span>";
        return;
    }

    pesertas.forEach(nama => {
        const span = document.createElement("span");
        span.className = "team-badge";
        span.innerText = nama;
        potContainer.appendChild(span);
    });
}

// Fungsi Menambah Nama Peserta dari Input Box
function tambahPeserta() {
    const input = document.getElementById("input-peserta");
    const nama = input.value.trim();
    
    if (nama === "") {
        alert("Ketik namanya dulu bro!");
        return;
    }
    
    pesertas.push(nama);
    input.value = ""; // bersihkan kolom input
    renderPot();
}

// Fungsi Utama: Kocok Nama + Bendera Sekaligus
function kocokSatuPeserta() {
    if (pesertas.length === 0) {
        alert("Tidak ada peserta tersisa di pot!");
        return;
    }
    if (benderas.length === 0) {
        alert("Stock bendera habis! Tambahkan lebih banyak bendera di script.js");
        return;
    }

    // 1. Acak & ambil 1 Nama Peserta
    const indexPeserta = Math.floor(Math.random() * pesertas.length);
    const namaTerpilih = pesertas.splice(indexPeserta, 1)[0];

    // 2. Acak & ambil 1 Bendera Negara
    const indexBendera = Math.floor(Math.random() * benderas.length);
    const benderaTerpilih = benderas.splice(indexBendera, 1)[0];

    // Tentukan grup tujuan (A -> B -> C -> D)
    const currentGroupLetter = groupOrder[currentGroupIndex];
    groups[currentGroupLetter].push({ nama: namaTerpilih, flag: benderaTerpilih.url });

    // Tampilkan hasilnya ke papan grup HTML
    const groupUl = document.querySelector(`#group-${currentGroupLetter} .team-list`);
    const li = document.createElement("li");
    li.className = "team-item";
    li.innerHTML = `
        <span>${groups[currentGroupLetter].length}.</span>
        <img src="${benderaTerpilih.url}" class="flag-img" alt="flag">
        <span style="font-weight: bold; color: #f59e0b;">${namaTerpilih}</span>
    `;
    groupUl.appendChild(li);

    // Perbarui sisa peserta di pot
    renderPot();

    // Geser giliran grup berikutnya
    currentGroupIndex = (currentGroupIndex + 1) % 4;
}

// Fungsi Reset Ulang Game
function resetDraw() {
    benderas = [...bankBendera];
    pesertas = [...daftarPesertaAwal];
    groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
    currentGroupIndex = 0;
    
    groupOrder.forEach(letter => {
        document.querySelector(`#group-${letter} .team-list`).innerHTML = "";
    });
    
    renderPot();
}

// Jalankan saat web pertama kali dimuat
renderPot();
