// DATA TIM DAN BENDERA CUSTOM (Bisa kamu ganti sesuka hati)
const daftarNegaraAwal = [
    { name: "Indonesia", flag: "https://flagcdn.com/id.svg" },
    { name: "Argentina", flag: "https://flagcdn.com/ar.svg" },
    { name: "Prancis", flag: "https://flagcdn.com/fr.svg" },
    { name: "Brasil", flag: "https://flagcdn.com/br.svg" },
    { name: "Jepang", flag: "https://flagcdn.com/jp.svg" },
    { name: "Jerman", flag: "https://flagcdn.com/de.svg" },
    { name: "Inggris", flag: "https://flagcdn.com/gb-eng.svg" },
    { name: "Belanda", flag: "https://flagcdn.com/nl.svg" },
    { name: "Maroko", flag: "https://flagcdn.com/ma.svg" },
    { name: "Portugal", flag: "https://flagcdn.com/pt.svg" },
    { name: "Spanyol", flag: "https://flagcdn.com/es.svg" },
    { name: "Arab Saudi", flag: "https://flagcdn.com/sa.svg" },
    { name: "Korea Selatan", flag: "https://flagcdn.com/kr.svg" },
    { name: "Kroasia", flag: "https://flagcdn.com/hr.svg" },
    { name: "Uruguay", flag: "https://flagcdn.com/uy.svg" },
    { name: "Senegal", flag: "https://flagcdn.com/sn.svg" }
];

let pools = [...daftarNegaraAwal];
let groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
let groupOrder = ['A', 'B', 'C', 'D'];
let currentGroupIndex = 0;

// Render sisa tim di Pot
function renderPot() {
    const potContainer = document.getElementById("pot-teams");
    potContainer.innerHTML = "";
    pools.forEach(team => {
        const span = document.createElement("span");
        span.className = "team-badge";
        span.innerHTML = `<img src="${team.flag}" class="flag-img" alt="${team.name}"> ${team.name}`;
        potContainer.appendChild(span);
    });
}

// Fungsi Mengocok Tim
function kocokTim() {
    if (pools.length === 0) {
        alert("Semua tim sudah masuk grup!");
        return;
    }

    // Mengambil tim acak dari pot
    const randomIndex = Math.floor(Math.random() * pools.length);
    const selectedTeam = pools.splice(randomIndex, 1)[0];

    // Tentukan masuk grup mana (A -> B -> C -> D secara berurutan)
    const currentGroupLetter = groupOrder[currentGroupIndex];
    groups[currentGroupLetter].push(selectedTeam);

    // Tampilkan di papan grup
    const groupUl = document.querySelector(`#group-${currentGroupLetter} .team-list`);
    const li = document.createElement("li");
    li.className = "team-item";
    li.innerHTML = `
        <span>${groups[currentGroupLetter].length}.</span>
        <img src="${selectedTeam.flag}" class="flag-img" alt="${selectedTeam.name}">
        <span>${selectedTeam.name}</span>
    `;
    groupUl.appendChild(li);

    // Refresh sisa tim di pot
    renderPot();

    // Lanjut ke grup berikutnya
    currentGroupIndex = (currentGroupIndex + 1) % 4;
}

// Fungsi Reset
function resetDraw() {
    pools = [...daftarNegaraAwal];
    groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
    currentGroupIndex = 0;
    
    groupOrder.forEach(letter => {
        document.querySelector(`#group-${letter} .team-list`).innerHTML = "";
    });
    
    renderPot();
}

// Inisialisasi awal
renderPot();
