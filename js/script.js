const products = [
  {id:1, name:"Serum Wajah", price:75000, category:"skincare", img:"images/serum.jpg", desc:"Serum ini membuat wajah glowing"},
  {id:2, name:"Toner Mawar", price:45000, category:"skincare", img:"images/toner.jpg", desc:"Toner segar untuk kulit sehat"},
  {id:3, name:"Lipstik Matte", price:75000, category:"makeup", img:"images/lipstick.jpg", desc:"Lipstik matte tahan lama"},
  {id:4, name:"Bedak Halus", price:60000, category:"makeup", img:"images/bedak.jpg", desc:"Bedak ringan dan halus"},
  {id:5, name:"Sunscreen", price:50000, category:"skincare", img:"images/sunscreen.jpg", desc:"Melindungi kulit dari sinar UV"}
];

let cart = [];
let currentCategory = "all";

function displayProducts() {
  const grid = document.querySelector(".product-grid");
  grid.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();

  products.forEach(p => {
    if ((currentCategory === "all" || p.category === currentCategory) && p.name.toLowerCase().includes(search)) {
      grid.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>Rp ${p.price}</p>
        <p>${p.category}</p>
        <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
        <button onclick="speak('${p.desc}, harga Rp ${p.price}')">🔊 Dengar</button>
      </div>`;
    }
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  displayProducts();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cartCount").innerText = cart.length;
  showCart();
}

function showCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((p,i) => {
    total += p.price;
    cartDiv.innerHTML += `<p>${p.name} - Rp ${p.price} <button onclick="remove(${i})">❌</button></p>`;
  });

  document.getElementById("totalPrice").innerText = total;
}

function remove(i) {
  cart.splice(i,1);
  showCart();
  document.getElementById("cartCount").innerText = cart.length;
}

function showCheckout() {
  document.getElementById("checkout").scrollIntoView();
}

function confirmOrder() {
  if(name.value=="" || address.value=="" || email.value=="" || phone.value==""){
    speak("Mohon lengkapi data");
    alert("Lengkapi data!");
    return;
  }
  alert("Pesanan berhasil! Terima kasih 💖");
}

function speak(text){
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "id-ID";
  speechSynthesis.speak(msg);
}

document.getElementById("searchInput").addEventListener("input", displayProducts);
displayProducts();
