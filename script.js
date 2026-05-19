/* ===========================
   LENS STUDIO — script.js
   =========================== */

// --- Product Data (10 items) ---
// category: 'camera' | 'lens' | 'accessories'
const products = [
  {
    id: 1,
    name: "Canon EOS R6",
    category: "ກ້ອງ Mirrorless",
    filterGroup: "camera",
    price: 2499,
    desc: "Full-frame CMOS, 20fps, 4K video, Dual DIGIC X processor.",
    image: "https://media.sweetwater.com/m/products/image/844182bccbKwigodmHKX1H3uXwz27MJcqvn2IARj.jpg?ha=844182bccbda21016c89cfc2fb935f9c3e183dcb&quality=82&width=750"
  },
  {
    id: 2,
    name: "Sony A7 IV",
    category: "ກ້ອງ Mirrorless",
    filterGroup: "camera",
    price: 2799,
    desc: "33MP BSI sensor, 4K 60p, real-time eye AF, 10fps continuous.",
    image: "https://www.cined.com/content/uploads/2021/10/Sony-a7-IV-1.jpg"
  },
  {
    id: 3,
    name: "DJI RS4 Gimbal",
    category: "ອຸປະກອນຄວາມໝັ້ນຄົງ",
    filterGroup: "accessories",
    price: 379,
    desc: "3-axis stabilization, 3kg payload, 12hr battery, OLED touchscreen.",
    image: "https://m.media-amazon.com/images/I/51+9vmZgtVL._AC_UF894,1000_QL80_.jpg"
  },
  {
    id: 4,
    name: "Sigma 24-70mm f/2.8",
    category: "ເລນກ້ອງ",
    filterGroup: "lens",
    price: 1299,
    desc: "DG DN Art lens, fast AF, 9-blade aperture, dust/splash resistant.",
    image: "https://www.cined.com/content/uploads/2024/05/07_PPhoto_24_70_28_dgdn_ii_a024_Lmt_horizontal2-1-1300x750.jpg"
  },
  {
    id: 5,
    name: "Rode VideoMic Pro",
    category: "ອຸປະກອນສຽງ",
    filterGroup: "accessories",
    price: 249,
    desc: "Directional condenser, ultra-low noise, Rycote Lyre suspension.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrmgRkeAzE-6QRcg2Awn3uuY-fXPFEfsZI1g&s"
  },
  {
    id: 6,
    name: "Godox Softbox Kit",
    category: "ໄຟສະຕູດິໂອ",
    filterGroup: "accessories",
    price: 189,
    desc: "60×90cm softbox, 200W daylight LED, Bowens mount, portable.",
    image: "https://m.media-amazon.com/images/I/51btzsrOErL.jpg"
  },
  {
    id: 7,
    name: "Sony FE 85mm f/1.4",
    category: "ເລນກ້ອງ",
    filterGroup: "lens",
    price: 1799,
    desc: "Portrait prime lens, GM optical design, bokeh, fast precise AF.",
    image: "https://www.sony.ca/image/97853a17952f240620b83732595b0e87?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
  },
  {
    id: 8,
    name: "DJI Mini 4 Pro",
    category: "ໂດຣນ",
    filterGroup: "camera",
    price: 759,
    desc: "4K/60fps drone, omnidirectional obstacle sensing, 34min flight time.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80"
  },
  {
    id: 9,
    name: "SanDisk 1TB SSD",
    category: "ອຸປະກອນເກັບຂໍ້ມູນ",
    filterGroup: "accessories",
    price: 129,
    desc: "Portable NVMe SSD, 2000MB/s read speed, USB-C, rugged design.",
    image: "https://www.powerbuy.co.th/_next/image?url=https%3A%2F%2Fpim.powerbuy.co.th%2FPWBPIM%2Fweb%2FThumbnail%2FImage%2F0303%2F291083.jpg&w=640&q=75"
  },
  {
    id: 10,
    name: "Manfrotto Tripod 055",
    category: "ຂາຕັ້ງກ້ອງ",
    filterGroup: "accessories",
    price: 349,
    desc: "Aluminium 3-section tripod, 90° centre column, 9kg load, ball head.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPGky-1J0ZiKBra6VyA4fF0RuQhoYsZpUCUA&s"
  },
  {
    id: 11,
    name: "Canon RF 50mm f/1.2",
    category: "ເລນກ້ອງ",
    filterGroup: "lens",
    price: 2299,
    desc: "Ultra-fast prime, stunning bokeh, weather-sealed, L-series glass.",
    image: "https://th.canon/media/image/2018/09/05/04f92fafc7944b94a1f30d38920ee421_RF50mm+f1.2L+USM.png"
  },
  {
    id: 12,
    name: "Elgato Key Light",
    category: "ໄຟສະຕູດິໂອ",
    filterGroup: "accessories",
    price: 199,
    desc: "80W professional LED, app-controlled, 2800-7000K, desk mount.",
    image: "https://res.cloudinary.com/elgato-pwa/image/upload/w_400,h_400,c_lfill,q_auto:best/Bundles/Desktop/Key%20Light%20Bundle/key-light-01-desktop.jpg"
  }
];

// --- Coupon Codes ---
const COUPONS = { 'LAO2024': 5, 'STUDIO10': 10 };

// --- State ---
let basket = [];
let appliedCoupon = null;
let discountPercent = 0;
let selectedShipping = { name: 'ອານຸສິດ', price: 0 };
let activeFilter = 'all';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateFilterCounts();
  renderUI();
});

// --- Update filter count badges ---
function updateFilterCounts() {
  document.getElementById('count-all').textContent = products.length;
  document.getElementById('count-camera').textContent = products.filter(p => p.filterGroup === 'camera').length;
  document.getElementById('count-lens').textContent = products.filter(p => p.filterGroup === 'lens').length;
  document.getElementById('count-accessories').textContent = products.filter(p => p.filterGroup === 'accessories').length;
}

// --- Category Filter ---
function filterCategory(group, btn) {
  activeFilter = group;
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const cardGroup = card.dataset.group;
    const show = (group === 'all') || (cardGroup === group);
    if (show) {
      card.classList.remove('hidden');
      card.classList.remove('fade-in');
      void card.offsetWidth; // reflow
      card.classList.add('fade-in');
    } else {
      card.classList.add('hidden');
    }
  });
}

// --- Render Products Grid ---
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p => `
    <div class="product-card fade-in" data-id="${p.id}" data-group="${p.filterGroup}">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price.toLocaleString()}</span>
          <button class="btn-add" onclick="addToCart(${p.id})">+ ເພີ່ມລົງກະຕ່າ</button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Select Shipping ---
function selectShipping(labelEl, name, price) {
  document.querySelectorAll('.shipping-option').forEach(el => el.classList.remove('selected'));
  labelEl.classList.add('selected');
  selectedShipping = { name, price };
  renderUI();
}

// --- Add to Cart ---
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = basket.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    basket.push({ ...product, qty: 1 });
  }

  renderUI();
  showToast(`✓ ${product.name} ເພີ່ມລົງກະຕ່າແລ້ວ`);
}

// --- Remove from Cart ---
function removeFromCart(id) {
  basket = basket.filter(item => item.id !== id);
  renderUI();
}

// --- Calculate Total ---
function getSubtotal() {
  return basket.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function getTotal() {
  const sub = getSubtotal();
  const afterDiscount = discountPercent > 0 ? sub * (1 - discountPercent / 100) : sub;
  // Convert shipping kip to USD approx (or treat as separate line, keep in kip display)
  return afterDiscount;
}

// --- Apply Coupon ---
function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msgEl = document.getElementById('couponMsg');
  if (COUPONS[code]) {
    appliedCoupon = code;
    discountPercent = COUPONS[code];
    msgEl.textContent = `✓ ໃຊ້ໂຄດ ${code} ຫຼຸດ ${discountPercent}% ສຳເລັດ!`;
    msgEl.className = 'coupon-msg success';
    showToast(`🎉 ສ່ວນຫຼຸດ ${discountPercent}% ຖືກນຳໃຊ້ແລ້ວ`);
  } else {
    appliedCoupon = null;
    discountPercent = 0;
    msgEl.textContent = '✕ ລະຫັດບໍ່ຖືກຕ້ອງ ກະລຸນາລອງໃໝ່';
    msgEl.className = 'coupon-msg error';
  }
  renderUI();
}

// --- Render UI (cart + order summary) ---
function renderUI() {
  renderCartSidebar();
  renderOrderSummary();
  updateCartCount();
}

function renderCartSidebar() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (basket.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">ກະຕ່າຊື້ເຄື່ອງຫວ່າງ</p>';
    cartFooter.style.display = 'none';
    return;
  }

  cartItems.innerHTML = basket.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}"/>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</p>
        <p class="cart-item-qty">ຈຳນວນ: ${item.qty}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="ລຶບ">✕</button>
    </div>
  `).join('');

  const sub = getSubtotal();
  const disc = discountPercent > 0 ? `<div class="cart-discount">ສ່ວນຫຼຸດ (${discountPercent}%) <span>-$${(sub * discountPercent / 100).toFixed(2)}</span></div>` : '';
  cartTotal.innerHTML = `${disc}<strong>$${getTotal().toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</strong>`;
  cartFooter.style.display = 'block';
}

function renderOrderSummary() {
  const summary = document.getElementById('orderSummary');

  if (basket.length === 0) {
    summary.innerHTML = '<p class="empty-order">ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ</p>';
    return;
  }

  const sub = getSubtotal();
  const discHTML = discountPercent > 0
    ? `<div class="summary-item discount-row"><span class="summary-item-name">ສ່ວນຫຼຸດ ${discountPercent}% (${appliedCoupon})</span><span class="summary-item-price disc">-$${(sub * discountPercent / 100).toFixed(2)}</span></div>`
    : '';

  const shippingLabel = selectedShipping.price === 0
    ? `<span class="summary-item-price" style="color:#7ecf7e">ຟຣີ</span>`
    : `<span class="summary-item-price">₭${selectedShipping.price.toLocaleString()}</span>`;

  const itemsHTML = basket.map(item => `
    <div class="summary-item">
      <span class="summary-item-name">${item.name} × ${item.qty}</span>
      <span class="summary-item-price">$${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');

  summary.innerHTML = `
    ${itemsHTML}
    ${discHTML}
    <div class="summary-item">
      <span class="summary-item-name">ຄ່າຈັດສົ່ງ (${selectedShipping.name})</span>
      ${shippingLabel}
    </div>
    <div class="summary-total">
      <span>ຍອດລວມທັງໝົດ</span>
      <span>$${getTotal().toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
    </div>
  `;
}

function updateCartCount() {
  const count = basket.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartCount');
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

// --- Cart Sidebar Toggle ---
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

// --- Confirm Order ---
function confirmOrder() {
  const name    = document.getElementById('custName').value.trim();
  const phone   = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('⚠️ ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ');
    return;
  }

  if (basket.length === 0) {
    showToast('⚠️ ກະຕ່າຊື້ເຄື່ອງຫວ່າງ ກະລຸນາເພີ່ມສິນຄ້າ');
    return;
  }

  const sub = getSubtotal();
  const order = {
    customer: { name, phone, address },
    items: basket,
    subtotal: sub,
    discountPercent,
    appliedCoupon,
    total: getTotal(),
    shipping: selectedShipping,
    date: new Date().toLocaleString('lo-LA', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    orderId: 'LS-' + Date.now().toString().slice(-8)
  };

  localStorage.setItem('lensStudioOrder', JSON.stringify(order));
  window.location.href = 'receipt.html';
}

// --- Toast Notification ---
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">◉</span> ${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}