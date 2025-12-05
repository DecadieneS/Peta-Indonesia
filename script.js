const markers = {
  rajaAmpat: document.getElementById("marker-rajaampat"),
  danautoba: document.getElementById("marker-danautoba"),
  borobudur: document.getElementById("marker-borobudur"),
  bromo: document.getElementById("marker-bromo"),
  purabali: document.getElementById("marker-purabali"),
  labuanbajo: document.getElementById("marker-labuanbajo"),
};

const data = {
  rajaAmpat: {
    name: "Raja Ampat",
    location: "Papua Barat Daya",
    image: "https://cdn.divessi.com/cached/Indonesia_Raja_Ampat_iStock-MariusLtu.jpg/1200.jpg",
    descShort: "Surga bawah laut nomor satu di dunia.",
    descFull: "Raja Ampat memiliki lebih dari 1.500 pulau kecil dengan keanekaragaman hayati laut tertinggi di bumi. Cocok untuk diving & snorkeling dengan terumbu karang yang masih sangat alami."
  },
  borobudur: {
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    image: "https://images.pexels.com/photos/34495903/pexels-photo-34495903.jpeg",
    descShort: "Candi Buddha terbesar di dunia.",
    descFull: "Borobudur adalah mahakarya arsitektur kuno dari abad ke-8, dengan lebih dari 2.600 panel relief dan 504 arca Buddha. Menjadi salah satu situs warisan dunia UNESCO paling terkenal."
  },
  purabali: {
    name: "Pura Ulun Danu",
    location: "Bali",
    image: "https://www.kintamani.id/wp-content/uploads/tips-liburan-ke-pura-di-Bali-3.jpg",
    descShort: "Pura indah di tepi danau.",
    descFull: "Pura Ulun Danu berdiri megah di tepi Danau Beratan Bedugul, dikelilingi pegunungan sejuk dan pemandangan kabut pagi yang ikonik. Tempat wisata religi sekaligus panorama alam."
  },
  bromo: {
    name: "Gunung Bromo",
    location: "Jawa Timur",
    image: "https://assets.telkomsel.com/public/2024-10/4594.png",
    descShort: "Gunung berapi aktif dengan sunrise spektakuler.",
    descFull: "Gunung Bromo terkenal sebagai spot matahari terbit terbaik di Indonesia dengan lautan pasir luas, kawah aktif, dan Bukit Teletubbies. Primadona wisata Jawa Timur sepanjang tahun."
  },
  labuanbajo: {
    name: "Labuan Bajo",
    location: "Nusa Tenggara Timur",
    image: "https://static.uc.ac.id/htb/2019/01/maxresdefault-768x432.jpg",
    descShort: "Gerbang menuju Pulau Komodo.",
    descFull: "Labuan Bajo menawarkan pesona pantai eksotis, tebing berbatu, sunset pink, hingga tur satwa purba Komodo. Salah satu destinasi yang paling diminati wisatawan mancanegara."
  },
  danautoba: {
    name: "Danau Toba",
    location: "Sumatera Utara",
    image: "https://asset-2.tribunnews.com/travel/foto/bank/images/pemandangan-danau-toba-dari-pulau-samosir.jpg",
    descShort: "Danau vulkanik terbesar di dunia.",
    descFull: "Danau Toba terbentuk dari letusan supervolcano 74.000 tahun lalu. Di tengah danau terdapat Pulau Samosir dengan budaya Batak yang masih kuat dan keindahan alam pegunungan."
  }
};
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupLocation = document.getElementById("popup-location");
const popupDesc = document.getElementById("popup-desc");
const popupClose = document.getElementById("popup-close");

function showPopup(key) {
  const item = data[key];
  popupImg.src = item.image;
  popupTitle.textContent = item.name;
  popupLocation.textContent = item.location;
  popupDesc.textContent = item.descFull;
  popup.classList.add("show");
}

popupClose.addEventListener("click", () => popup.classList.remove("show"));
popup.addEventListener("click", e => { if (e.target === popup) popup.classList.remove("show"); });

Object.keys(markers).forEach(k => markers[k].addEventListener("click", () => showPopup(k)));
document.getElementById("table-body").innerHTML =
  Object.keys(data).map(k => `
    <tr>
      <td>${data[k].name}</td>
      <td>${data[k].location}</td>
      <td>${data[k].descShort}</td>
      <td><button class="btn-detail" onclick="showPopup('${k}')">Lihat Detail</button></td>
    </tr>
  `).join("");
const mapContainer = document.getElementById("map-container");
const mapInner = document.getElementById("map-inner");

let scale = 1;
let tx = 0;
let ty = 0;
const maxScale = 4;
const minScale = 1;
mapContainer.addEventListener("wheel", (e) => {
  e.preventDefault();

  const rect = mapContainer.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const oldScale = scale;

  if (e.deltaY < 0) {
    scale = Math.min(maxScale, scale * 1.15);
  } else {
    scale = Math.max(minScale, scale / 1.15);
  }
  if (scale === 1) {
    tx = 0;
    ty = 0;
    mapInner.style.transform = `translate(0px, 0px) scale(1)`;
    return;
  }

  const ratio = scale / oldScale;
  tx = mx - ratio * (mx - tx);
  ty = my - ratio * (my - ty);

  mapInner.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
}, { passive: false });
let drag = false, startX = 0, startY = 0, startTx = 0, startTy = 0;

mapContainer.addEventListener("mousedown", e => {
  if (scale === 1) return;
  drag = true;
  startX = e.clientX;
  startY = e.clientY;
  startTx = tx;
  startTy = ty;
  document.body.style.cursor = "grabbing";
});

window.addEventListener("mousemove", e => {
  if (!drag) return;
  tx = startTx + (e.clientX - startX);
  ty = startTy + (e.clientY - startY);
  mapInner.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
});

window.addEventListener("mouseup", () => {
  drag = false;
  document.body.style.cursor = "";
});
const form = document.getElementById("contact-form");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const pesan = document.getElementById("pesan");
const formMsg = document.getElementById("form-msg");


const btnIsiLagi = document.createElement("button");
btnIsiLagi.textContent = "Isi Lagi";
btnIsiLagi.style.display = "none";
btnIsiLagi.style.marginTop = "12px";
btnIsiLagi.style.padding = "10px 18px";
btnIsiLagi.style.border = "none";
btnIsiLagi.style.borderRadius = "6px";
btnIsiLagi.style.cursor = "pointer";
btnIsiLagi.style.fontWeight = "600";
btnIsiLagi.style.background = "var(--button-grad)";
btnIsiLagi.style.color = "black";


document.getElementById("kontak").appendChild(btnIsiLagi);

form.addEventListener("submit", (e) => {
  e.preventDefault();


  if (!nama.value.trim() || !email.value.trim() || !pesan.value.trim()) {
    formMsg.textContent = "Semua kolom wajib diisi!";
    formMsg.className = "error";
    return;
  }


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    formMsg.textContent = "Email tidak valid. Gunakan format nama@gmail.com";
    formMsg.className = "error";
    return;
  }

  formMsg.textContent = "Terima kasih sudah memberi kritik dan saran kepada kami";
  formMsg.className = "success";

  form.style.display = "none";     
  btnIsiLagi.style.display = "block";
});

btnIsiLagi.addEventListener("click", () => {
  nama.value = "";
  email.value = "";
  pesan.value = "";

  formMsg.textContent = "";       
  form.style.display = "flex";      
  btnIsiLagi.style.display = "none";
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("alert-btn").addEventListener("click", () => {
  alert("Selamat datang! Klik marker atau tabel untuk melihat detail destinasi.");
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});