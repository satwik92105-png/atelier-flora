// ==========================================================================
// ATELIER FLORA - BOTANICAL ART & HANDMADE CRAFTS APPLICATION ENGINE
// Compliant with DPDP Act, Cookie Consent, Real-Time Checkout & Currency
// ==========================================================================

const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  INR: { symbol: "₹", rate: 83.5, label: "INR (₹)" }
};

// Application State
const state = {
  currency: "USD",
  products: [],
  cart: [],
  wishlist: new Set(),
  activeCategory: "All Creations",
  searchQuery: "",
  sortBy: "featured",
  discountPercent: 0,
  discountCode: "",
  isGiftWrap: false,
  orders: [],
  currentModalProduct: null,
  checkoutStep: 1,
  checkoutData: {
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "India",
    zip: "",
    shippingMethod: "standard",
    paymentMethod: "card"
  }
};

// Legal & Policy Text Content (DPDP Act, T&C, Refund, Cookies)
const LEGAL_POLICIES = {
  privacy: {
    title: "Privacy Policy (DPDP Act 2023 Compliant)",
    html: `
      <h3>1. Commitment to Data Privacy</h3>
      <p>Atelier Flora Studio ("we", "our", or "us") respects your personal data. This policy is formulated in strict accordance with India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and international privacy standards.</p>
      
      <h3>2. Data Fiduciary Details</h3>
      <p><strong>Entity Name:</strong> Atelier Flora Crafts & Botanical Studio<br>
      <strong>Registered Address:</strong> Studio 4, Bloomery Lane, Heritage Craft Enclave, Bengaluru, KA 560038, India<br>
      <strong>Data Protection / Grievance Officer:</strong> Grievance Redressal Cell (<a href="mailto:grievance@atelierflora.com" class="text-[#C96872] underline">grievance@atelierflora.com</a>)</p>

      <h3>3. Purpose of Processing (Only Necessary Data)</h3>
      <p>We collect and process your personal data strictly for specified, lawful purposes:</p>
      <ul>
        <li><strong>Fulfillment of Orders:</strong> Name, shipping address, and phone number to courier your handmade botanical items.</li>
        <li><strong>Customer Communication:</strong> Email address to transmit invoice receipts, tracking links, and custom craft updates.</li>
        <li><strong>Payment Processing:</strong> Transactions are handled directly via PCI-DSS compliant payment gateways. We never store raw credit card numbers or banking passwords.</li>
      </ul>

      <h3>4. Your Rights under the DPDP Act</h3>
      <p>As a Data Principal, you possess the following statutory rights:</p>
      <ul>
        <li><strong>Right to Access Information:</strong> Request a summary of personal data being processed.</li>
        <li><strong>Right to Correction & Erasure:</strong> Ask us to rectify incorrect details or completely delete your information once your order is fulfilled.</li>
        <li><strong>Right of Grievance Redressal:</strong> Contact our Grievance Officer for prompt resolution within 7 working days.</li>
        <li><strong>Right to Withdraw Consent:</strong> You may revoke newsletter or communication consent at any moment.</li>
      </ul>

      <h3>5. Zero Third-Party Data Selling</h3>
      <p>We do not sell, rent, monetize, or broker your personal information to any advertising networks or third-party data brokers. Ever.</p>
    `
  },
  terms: {
    title: "Terms & Conditions",
    html: `
      <h3>1. Nature of Handmade Botanical Crafts</h3>
      <p>Every piece at Atelier Flora is crafted by hand using natural foraged wildflowers, real botanicals, organic cotton, and eco-resins. <strong>Organic nuances, slight variations in petal hue, and subtle placement differences are inherent hallmarks of handmade artisan craftsmanship, not manufacturing flaws.</strong></p>

      <h3>2. Pricing & Currency</h3>
      <p>All prices are transparently displayed in your selected currency (USD, EUR, GBP, INR). Applicable taxes and shipping costs are calculated clearly prior to order authorization.</p>

      <h3>3. Intellectual Property & Image Copyright</h3>
      <p>All floral photographs, product designs, website motifs, and botanical illustrations on this site are the exclusive copyrighted property of Atelier Flora Studio. Any unauthorized commercial duplication or redistribution is strictly prohibited.</p>

      <h3>4. Custom & Commissioned Orders</h3>
      <p>For custom bridal bouquet preservation or personalized embroidery, work commences once the craft request is reviewed and confirmed. Because materials are permanently set, personalized custom pieces cannot be canceled after crafting begins.</p>
    `
  },
  refund: {
    title: "Refund, Return & Safe Transit Policy",
    html: `
      <h3>1. 7-Day Safe Transit Guarantee</h3>
      <p>We pack every botanical piece in reinforced, multi-layer shockproof boxes. In the unlikely event that your handmade item arrives damaged in transit:</p>
      <ul>
        <li>Please contact us via email (<a href="mailto:artisan@atelierflora.com" class="text-[#C96872] underline">artisan@atelierflora.com</a>) or WhatsApp (+91 98765 43210) within <strong>48 hours of delivery</strong>.</li>
        <li>Share 2 clear photographs of the damaged shipping box and the item.</li>
        <li>We will immediately dispatch a <strong>complimentary replacement</strong> or issue a <strong>100% full refund</strong> to your original payment method.</li>
      </ul>

      <h3>2. Standard Non-Custom Craft Returns</h3>
      <p>If you are not enchanted with an un-customized catalog item, you may request an exchange or return within <strong>7 days of delivery</strong> in its original, undamaged packaging.</p>

      <h3>3. Refund Processing Time</h3>
      <p>Approved refunds are processed within 3 to 5 business days back to your original source of payment (Credit Card, UPI, or PayPal).</p>
    `
  },
  cookies: {
    title: "Cookies & Local Storage Policy",
    html: `
      <h3>1. What We Store Locally</h3>
      <p>Atelier Flora uses minimal local browser cookies and local storage strictly to ensure our handmade shop operates smoothly:</p>
      <ul>
        <li><strong>Bag & Wishlist Persistence:</strong> Remembering the craft pieces you reserved in your cart.</li>
        <li><strong>Currency Preference:</strong> Storing whether you prefer browsing in USD, EUR, GBP, or INR.</li>
        <li><strong>Cookie Preference:</strong> Storing whether you accepted or declined non-essential cookies.</li>
      </ul>

      <h3>2. No Third-Party Cross-Site Trackers</h3>
      <p>We do not deploy invasive third-party ad tracking pixels or behavioral profile cookies across other websites.</p>

      <h3>3. How to Manage Cookies</h3>
      <p>You can adjust your cookie choices anytime using the "Manage Cookie Consent" link in our website footer or by clearing your browser cache.</p>
    `
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  renderProducts();
  setupEventListeners();
  updateCartUI();
  updateWishlistCount();
  setupInteractiveCard();
  initCookieConsent();
});

// Load state from localStorage or defaults
function loadSavedState() {
  const savedProducts = localStorage.getItem("flora_products");
  if (savedProducts) {
    try {
      state.products = JSON.parse(savedProducts);
    } catch (e) {
      state.products = [...window.INITIAL_PRODUCTS];
    }
  } else {
    state.products = [...window.INITIAL_PRODUCTS];
  }

  const savedCart = localStorage.getItem("flora_cart");
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (e) {
      state.cart = [];
    }
  }

  const savedWishlist = localStorage.getItem("flora_wishlist");
  if (savedWishlist) {
    try {
      state.wishlist = new Set(JSON.parse(savedWishlist));
    } catch (e) {
      state.wishlist = new Set();
    }
  }

  const savedOrders = localStorage.getItem("flora_orders");
  if (savedOrders) {
    try {
      state.orders = JSON.parse(savedOrders);
    } catch (e) {
      state.orders = [];
    }
  }

  const savedCurrency = localStorage.getItem("flora_currency");
  if (savedCurrency && CURRENCIES[savedCurrency]) {
    state.currency = savedCurrency;
    const select = document.getElementById("currencySelector");
    if (select) select.value = savedCurrency;
  }
}

// Format Price with Currency
function formatPrice(amountUSD) {
  const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
  const converted = Math.round(amountUSD * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
}

// Render Products Grid (100% Non-Clothing Crafts)
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  let filtered = state.products.filter(p => {
    const matchesCat = state.activeCategory === "All Creations" || p.category === state.activeCategory;
    const matchesSearch = !state.searchQuery || 
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (state.sortBy === "price-low") {
    filtered.sort((a, b) => a.priceUSD - b.priceUSD);
  } else if (state.sortBy === "price-high") {
    filtered.sort((a, b) => b.priceUSD - a.priceUSD);
  } else if (state.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500">
        <span class="text-4xl block mb-2">🌸</span>
        <p class="font-serif text-2xl mb-1 text-stone-800">No creations found</p>
        <p class="text-xs">Try selecting another craft category or clearing your search term.</p>
        <button onclick="resetFilters()" class="mt-4 btn-secondary text-xs">Clear Search Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.has(product.id);
    const secondaryImg = product.images[1] || product.images[0];
    return `
      <article class="product-card group" data-id="${product.id}">
        <div class="product-image-wrap">
          <span class="badge-tag">${product.badge || 'Handmade'}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="toggleWishlist('${product.id}', event)" 
                  title="Save to Wishlist" 
                  aria-label="Save ${product.name} to Wishlist">
            <svg class="w-4 h-4 text-stone-700 transition" fill="${isWishlisted ? '#C96872' : 'none'}" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
          
          <img src="${product.images[0]}" alt="${product.name} - Handmade botanical creation" class="img-primary" loading="lazy" />
          <img src="${secondaryImg}" alt="${product.name} detail view" class="img-secondary" loading="lazy" />

          <div class="quick-view-overlay">
            <button onclick="openProductModal('${product.id}')" class="flex-1 py-2 bg-white/95 text-stone-900 font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#C96872] hover:text-white transition">
              Quick View
            </button>
            <button onclick="quickAddToCart('${product.id}')" class="px-3 py-2 bg-[#C96872] text-white font-bold rounded hover:bg-[#B54E5B] transition flex items-center justify-center" title="Quick Add to Bag" aria-label="Add ${product.name} directly to bag">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-5 flex flex-col flex-1 justify-between bg-white">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span class="text-[11px] font-medium text-stone-600">${product.category}</span>
              <span class="flex items-center gap-1 text-[#C96872] font-semibold text-[11px]">
                ★ ${product.rating.toFixed(1)} <span class="text-stone-400">(${product.reviewsCount})</span>
              </span>
            </div>
            <h3 class="font-serif text-lg font-semibold text-stone-900 group-hover:text-[#C96872] transition cursor-pointer" onclick="openProductModal('${product.id}')">
              ${product.name}
            </h3>
            <p class="text-xs text-stone-500 line-clamp-1 mt-1 font-light italic">${product.subtitle || product.material}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-[#F2E8E7] flex items-center justify-between">
            <div>
              <span class="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">Handmade Price</span>
              <span class="font-serif text-xl font-bold text-stone-900">${formatPrice(product.priceUSD)}</span>
            </div>
            <span class="text-[10px] font-medium text-[#A84954] bg-[#FDF0EE] px-2.5 py-1 rounded-full border border-[#F2D6D8]">
              ${product.artisanHours}
            </span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Reset Filters
function resetFilters() {
  state.activeCategory = "All Creations";
  state.searchQuery = "";
  state.sortBy = "featured";
  
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  
  document.querySelectorAll(".category-tab-btn").forEach(btn => {
    btn.classList.toggle("active-cat", btn.dataset.category === "All Creations");
  });
  
  renderProducts();
}

// Toggle Wishlist
function toggleWishlist(productId, e) {
  if (e) e.stopPropagation();
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast("Removed from Wishlist");
  } else {
    state.wishlist.add(productId);
    showToast("Added to your Wishlist ❤️");
  }
  localStorage.setItem("flora_wishlist", JSON.stringify([...state.wishlist]));
  updateWishlistCount();
  renderProducts();
}

function updateWishlistCount() {
  const el = document.getElementById("wishlistCount");
  if (el) {
    el.textContent = state.wishlist.size;
    el.classList.toggle("hidden", state.wishlist.size === 0);
  }
}

// Quick Add to Cart
function quickAddToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const defaultOption = (product.options && product.options[0]) || "Standard Craft";
  addToCart(product, defaultOption, 1);
  openCartDrawer();
}

// Add to Cart
function addToCart(product, option, quantity = 1, customNote = "") {
  const existingIndex = state.cart.findIndex(item => 
    item.id === product.id && 
    item.option === option && 
    item.customNote === customNote
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      priceUSD: product.priceUSD,
      image: product.images[0],
      option: option,
      customNote: customNote,
      artisanHours: product.artisanHours,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to Bag 🌸`);
}

function saveCart() {
  localStorage.setItem("flora_cart", JSON.stringify(state.cart));
}

// Update Cart Drawer UI
function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) {
    countEl.textContent = totalItems;
    countEl.classList.toggle("hidden", totalItems === 0);
  }

  const itemsContainer = document.getElementById("cartItemsContainer");
  const emptyState = document.getElementById("cartEmptyState");
  const checkoutFooter = document.getElementById("cartCheckoutFooter");

  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    if (checkoutFooter) checkoutFooter.classList.add("hidden");
    updateFreeShippingMeter(0);
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  if (checkoutFooter) checkoutFooter.classList.remove("hidden");

  const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountUSD = Math.round(subtotalUSD * (state.discountPercent / 100));
  const giftWrapCostUSD = state.isGiftWrap ? 8 : 0;
  const isFreeShipping = subtotalUSD >= 150;
  const shippingUSD = isFreeShipping ? 0 : 15;
  const grandTotalUSD = Math.max(0, subtotalUSD - discountUSD + giftWrapCostUSD + shippingUSD);

  updateFreeShippingMeter(subtotalUSD);

  itemsContainer.innerHTML = state.cart.map((item, index) => `
    <div class="flex gap-4 p-4 border-b border-[#F0DADA] items-start bg-white">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-stone-100 flex-shrink-0 border border-[#F0DADA]" />
      <div class="flex-1 min-w-0">
        <h4 class="font-serif font-medium text-stone-900 truncate">${item.name}</h4>
        <div class="text-xs text-stone-500 mt-0.5">
          <span>Style: <strong class="text-stone-800">${item.option}</strong></span>
          ${item.customNote ? `
            <span class="block text-[10px] text-[#A84954] bg-[#FDF0EE] px-1.5 py-0.5 rounded mt-1">
              Note: "${item.customNote}"
            </span>
          ` : ''}
        </div>
        <div class="text-xs font-semibold text-stone-900 mt-2">
          ${formatPrice(item.priceUSD)}
        </div>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center border border-stone-200 rounded">
            <button onclick="changeCartQty(${index}, -1)" class="px-2 py-0.5 text-stone-600 hover:bg-stone-100" aria-label="Decrease quantity">-</button>
            <span class="px-2 text-xs font-medium text-stone-800">${item.quantity}</span>
            <button onclick="changeCartQty(${index}, 1)" class="px-2 py-0.5 text-stone-600 hover:bg-stone-100" aria-label="Increase quantity">+</button>
          </div>
          <button onclick="removeCartItem(${index})" class="text-xs text-stone-400 hover:text-red-600 transition">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  document.getElementById("cartSubtotal").textContent = formatPrice(subtotalUSD);
  document.getElementById("cartTotal").textContent = formatPrice(grandTotalUSD);

  const discountRow = document.getElementById("cartDiscountRow");
  if (discountRow) {
    if (discountUSD > 0) {
      discountRow.classList.remove("hidden");
      document.getElementById("cartDiscountAmount").textContent = `-${formatPrice(discountUSD)} (${state.discountCode})`;
    } else {
      discountRow.classList.add("hidden");
    }
  }

  const giftWrapRow = document.getElementById("cartGiftWrapRow");
  if (giftWrapRow) {
    giftWrapRow.classList.toggle("hidden", !state.isGiftWrap);
    if (state.isGiftWrap) {
      document.getElementById("cartGiftWrapAmount").textContent = formatPrice(giftWrapCostUSD);
    }
  }

  const shippingEl = document.getElementById("cartShippingAmount");
  if (shippingEl) {
    shippingEl.textContent = isFreeShipping ? "FREE" : formatPrice(shippingUSD);
    shippingEl.className = isFreeShipping ? "text-emerald-700 font-semibold" : "text-stone-800 font-medium";
  }
}

// Free Shipping Progress Meter ($150 threshold)
function updateFreeShippingMeter(currentUSD) {
  const goalUSD = 150;
  const progressEl = document.getElementById("freeShippingProgress");
  const textEl = document.getElementById("freeShippingText");
  if (!progressEl || !textEl) return;

  const pct = Math.min(100, Math.round((currentUSD / goalUSD) * 100));
  progressEl.style.width = `${pct}%`;

  if (currentUSD >= goalUSD) {
    textEl.innerHTML = `<span class="text-emerald-700 font-semibold">✨ You unlocked FREE Insured Artisan Shipping!</span>`;
  } else {
    const diffUSD = goalUSD - currentUSD;
    textEl.innerHTML = `Add <strong>${formatPrice(diffUSD)}</strong> more for <strong>FREE Insured Courier</strong>`;
  }
}

function changeCartQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast("Item removed from bag");
}

// Promo Code Application
function applyPromoCode() {
  const input = document.getElementById("promoCodeInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === "FLORA10" || code === "MAISON10") {
    state.discountPercent = 10;
    state.discountCode = code;
    showToast("🌸 10% Botanical Discount applied!");
  } else if (code === "HANDMADE15") {
    state.discountPercent = 15;
    state.discountCode = "HANDMADE15";
    showToast("✨ 15% Artisan Discount applied!");
  } else if (code === "SISTERLOVE") {
    state.discountPercent = 20;
    state.discountCode = "SISTERLOVE";
    showToast("❤️ 20% Special Sister Discount applied!");
  } else {
    showToast("Invalid code. Try FLORA10 or HANDMADE15");
    return;
  }
  updateCartUI();
}

function toggleGiftWrap(checkbox) {
  state.isGiftWrap = checkbox.checked;
  updateCartUI();
}

// Product Quick View Modal
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  state.currentModalProduct = product;

  const modal = document.getElementById("productDetailModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (!modal || !backdrop) return;

  document.getElementById("modalProdName").textContent = product.name;
  document.getElementById("modalProdSubtitle").textContent = product.subtitle;
  document.getElementById("modalProdPrice").textContent = formatPrice(product.priceUSD);
  document.getElementById("modalProdRating").textContent = `★ ${product.rating} (${product.reviewsCount} reviews)`;
  document.getElementById("modalProdBadge").textContent = product.badge;
  document.getElementById("modalProdHours").textContent = product.artisanHours;
  document.getElementById("modalProdMaterial").textContent = product.material;
  document.getElementById("modalProdDimensions").textContent = product.dimensions;
  document.getElementById("modalProdColor").textContent = product.color;
  document.getElementById("modalProdDesc").textContent = product.description;
  document.getElementById("modalProdCare").textContent = product.care;

  // Gallery
  const mainImg = document.getElementById("modalMainImg");
  mainImg.src = product.images[0];
  mainImg.alt = `${product.name} handmade creation`;

  const thumbsContainer = document.getElementById("modalThumbnails");
  thumbsContainer.innerHTML = product.images.map((img, i) => `
    <button onclick="setModalMainImage('${img}')" class="w-16 h-16 rounded-lg border border-[#F0DADA] overflow-hidden hover:border-[#C96872] transition" aria-label="View photo ${i+1}">
      <img src="${img}" class="w-full h-full object-cover" alt="Thumbnail ${i+1}" />
    </button>
  `).join("");

  // Craftsmanship list
  const craftList = document.getElementById("modalCraftsmanship");
  craftList.innerHTML = product.craftsmanship.map(item => `
    <li class="flex items-start gap-2 text-xs text-stone-600">
      <span class="text-[#C96872] font-bold">✓</span>
      <span>${item}</span>
    </li>
  `).join("");

  // Style / Options buttons
  const optionsContainer = document.getElementById("modalProductOptions");
  const options = product.options || ["Standard Edition"];
  optionsContainer.innerHTML = options.map((opt, idx) => `
    <label class="cursor-pointer">
      <input type="radio" name="modal_option" value="${opt}" ${idx === 0 ? 'checked' : ''} class="peer sr-only" />
      <span class="px-3 py-1.5 border border-[#EADBDA] rounded-lg text-xs font-medium text-stone-700 peer-checked:border-[#C96872] peer-checked:bg-[#FDF0EE] peer-checked:text-[#A84954] transition block text-center">
        ${opt}
      </span>
    </label>
  `).join("");

  const engravingInput = document.getElementById("customCraftEngraving");
  if (engravingInput) engravingInput.value = "";

  backdrop.classList.add("active");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function setModalMainImage(url) {
  const mainImg = document.getElementById("modalMainImg");
  if (mainImg) mainImg.src = url;
}

function addCurrentModalToCart() {
  if (!state.currentModalProduct) return;
  const selectedOptionEl = document.querySelector('input[name="modal_option"]:checked');
  const option = selectedOptionEl ? selectedOptionEl.value : "Standard Edition";
  const qtyInput = document.getElementById("modalQty");
  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
  const customNote = document.getElementById("customCraftEngraving")?.value.trim() || "";

  addToCart(state.currentModalProduct, option, qty, customNote);
  closeProductModal();
  openCartDrawer();
}

function closeProductModal() {
  const modal = document.getElementById("productDetailModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (modal) modal.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// Drawer Controls
function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// LEGAL & POLICY MODALS (DPDP ACT, T&C, REFUNDS, COOKIES)
// ==========================================================================
function openPolicyModal(type) {
  const modal = document.getElementById("policyModal");
  const backdrop = document.getElementById("modalBackdrop");
  const titleEl = document.getElementById("policyModalTitle");
  const contentEl = document.getElementById("policyModalContent");

  const policy = LEGAL_POLICIES[type] || LEGAL_POLICIES.privacy;
  if (titleEl) titleEl.textContent = policy.title;
  if (contentEl) contentEl.innerHTML = policy.html;

  if (modal && backdrop) {
    backdrop.classList.add("active");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closePolicyModal() {
  const modal = document.getElementById("policyModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (modal) modal.classList.remove("active");
  if (backdrop && !document.getElementById("checkoutModal")?.classList.contains("active")) {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// COOKIE CONSENT BANNER (INTERACTIVE & SAVED)
// ==========================================================================
function initCookieConsent() {
  const consent = localStorage.getItem("flora_cookie_consent");
  const banner = document.getElementById("cookieConsentBanner");
  if (!consent && banner) {
    setTimeout(() => {
      banner.classList.add("visible");
    }, 800);
  }
}

function handleCookieChoice(choice) {
  localStorage.setItem("flora_cookie_consent", choice);
  const banner = document.getElementById("cookieConsentBanner");
  if (banner) banner.classList.remove("visible");
  showToast(choice === 'accepted' ? "Preferences saved. Thank you! 🍪" : "Essential cookies only stored. 🔒");
}

function resetCookieConsent() {
  localStorage.removeItem("flora_cookie_consent");
  const banner = document.getElementById("cookieConsentBanner");
  if (banner) banner.classList.add("visible");
  showToast("Cookie preferences opened.");
}

// ==========================================================================
// CHECKOUT & PAYMENT INTEGRATION LOGIC
// ==========================================================================
function startCheckout() {
  if (state.cart.length === 0) {
    showToast("Your shopping bag is empty");
    return;
  }
  closeCartDrawer();
  const checkoutModal = document.getElementById("checkoutModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (!checkoutModal || !backdrop) return;

  state.checkoutStep = 1;
  showCheckoutStep(1);
  updateCheckoutSummary();

  backdrop.classList.add("active");
  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById("checkoutModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (checkoutModal) checkoutModal.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function showCheckoutStep(step) {
  state.checkoutStep = step;

  for (let i = 1; i <= 3; i++) {
    const pill = document.getElementById(`stepPill${i}`);
    const section = document.getElementById(`checkoutStep${i}`);
    if (pill) {
      pill.classList.remove("active", "completed");
      if (i < step) pill.classList.add("completed");
      else if (i === step) pill.classList.add("active");
    }
    if (section) {
      section.classList.toggle("hidden", i !== step);
    }
  }

  const prevBtn = document.getElementById("checkoutBackBtn");
  const nextBtn = document.getElementById("checkoutNextBtn");
  const payBtn = document.getElementById("checkoutPayBtn");

  if (prevBtn) prevBtn.classList.toggle("hidden", step === 1);
  if (nextBtn) nextBtn.classList.toggle("hidden", step === 3);
  if (payBtn) payBtn.classList.toggle("hidden", step !== 3);
}

function nextCheckoutStep() {
  if (state.checkoutStep === 1) {
    const name = document.getElementById("shipName").value.trim();
    const email = document.getElementById("shipEmail").value.trim();
    const address = document.getElementById("shipAddress").value.trim();
    const city = document.getElementById("shipCity").value.trim();
    const zip = document.getElementById("shipZip").value.trim();
    const phone = document.getElementById("shipPhone").value.trim();

    if (!name || !email || !address || !city || !zip || !phone) {
      showToast("Please fill in all necessary shipping details");
      return;
    }

    state.checkoutData.customerName = name;
    state.checkoutData.email = email;
    state.checkoutData.address = address;
    state.checkoutData.city = city;
    state.checkoutData.zip = zip;
    state.checkoutData.country = document.getElementById("shipCountry")?.value || "India";
    state.checkoutData.phone = phone;

    showCheckoutStep(2);
  } else if (state.checkoutStep === 2) {
    const courierRadio = document.querySelector('input[name="shipping_method"]:checked');
    state.checkoutData.shippingMethod = courierRadio ? courierRadio.value : "standard";
    updateCheckoutSummary();
    showCheckoutStep(3);
  }
}

function prevCheckoutStep() {
  if (state.checkoutStep > 1) {
    showCheckoutStep(state.checkoutStep - 1);
  }
}

function updateCheckoutSummary() {
  const summaryEl = document.getElementById("checkoutItemsSummary");
  if (!summaryEl) return;

  const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountUSD = Math.round(subtotalUSD * (state.discountPercent / 100));
  const giftWrapCostUSD = state.isGiftWrap ? 8 : 0;
  const isFreeShipping = subtotalUSD >= 150 || state.checkoutData.shippingMethod === "standard";
  const shippingCost = state.checkoutData.shippingMethod === "express" ? 15 : (isFreeShipping ? 0 : 15);
  const grandTotalUSD = Math.max(0, subtotalUSD - discountUSD + giftWrapCostUSD + shippingCost);

  summaryEl.innerHTML = `
    <div class="space-y-2 mb-3 max-h-36 overflow-y-auto pr-1">
      ${state.cart.map(item => `
        <div class="flex justify-between items-center text-xs">
          <div class="truncate pr-2">
            <span class="font-medium text-stone-800">${item.name}</span>
            <span class="text-stone-400"> × ${item.quantity} (${item.option})</span>
          </div>
          <span class="font-semibold text-stone-900">${formatPrice(item.priceUSD * item.quantity)}</span>
        </div>
      `).join("")}
    </div>
    <div class="border-t border-[#F0DADA] pt-2 space-y-1 text-xs text-stone-600">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>${formatPrice(subtotalUSD)}</span>
      </div>
      ${discountUSD > 0 ? `
        <div class="flex justify-between text-[#C96872] font-semibold">
          <span>Floral Discount</span>
          <span>-${formatPrice(discountUSD)}</span>
        </div>
      ` : ''}
      <div class="flex justify-between">
        <span>Courier</span>
        <span>${shippingCost === 0 ? 'Complimentary Safe Transit' : formatPrice(shippingCost)}</span>
      </div>
      <div class="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-[#F0DADA]">
        <span>Total Due</span>
        <span class="text-[#A84954]">${formatPrice(grandTotalUSD)}</span>
      </div>
    </div>
  `;

  const btnTotal = document.getElementById("checkoutPayBtnAmount");
  if (btnTotal) btnTotal.textContent = formatPrice(grandTotalUSD);
}

function selectPaymentMethod(method) {
  state.checkoutData.paymentMethod = method;

  document.querySelectorAll(".payment-method-tab").forEach(tab => {
    tab.classList.toggle("border-stone-900", tab.dataset.method === method);
    tab.classList.toggle("bg-[#FFF9F8]", tab.dataset.method === method);
  });

  document.getElementById("cardPaymentFields").classList.toggle("hidden", method !== "card");
  document.getElementById("upiPaymentFields").classList.toggle("hidden", method !== "upi");
  document.getElementById("paypalPaymentFields").classList.toggle("hidden", method !== "paypal");
}

function setupInteractiveCard() {
  const numInput = document.getElementById("ccNumber");
  const nameInput = document.getElementById("ccName");
  const expInput = document.getElementById("ccExpiry");

  if (numInput) {
    numInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
      e.target.value = formatted;
      document.getElementById("cardDisplayNum").textContent = formatted || "•••• •••• •••• ••••";
    });
  }

  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      document.getElementById("cardDisplayName").textContent = e.target.value.toUpperCase() || "NAME ON CARD";
    });
  }

  if (expInput) {
    expInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
      e.target.value = val;
      document.getElementById("cardDisplayExp").textContent = val || "MM/YY";
    });
  }
}

// Process Payment Simulation with Verification & DPDP Compliance
function processPayment() {
  // Check legal consent checkbox
  const consentBox = document.getElementById("checkoutConsent");
  if (consentBox && !consentBox.checked) {
    showToast("Please agree to the Terms & Conditions and Refund Policy to proceed.");
    consentBox.focus();
    return;
  }

  const method = state.checkoutData.paymentMethod;

  if (method === "card") {
    const cardNum = document.getElementById("ccNumber")?.value.replace(/\s/g, "");
    const cardName = document.getElementById("ccName")?.value.trim();
    const cardExp = document.getElementById("ccExpiry")?.value.trim();
    const cardCvv = document.getElementById("ccCvv")?.value.trim();

    if (!cardNum || cardNum.length < 15 || !cardName || !cardExp || !cardCvv) {
      showToast("Please enter complete card details");
      return;
    }
  }

  const processingOverlay = document.getElementById("paymentProcessingOverlay");
  const statusText = document.getElementById("paymentProcessingStatus");
  if (processingOverlay) processingOverlay.classList.remove("hidden");

  const steps = [
    "Establishing 256-Bit SSL Encrypted Handshake...",
    "Authorizing with Botanical Studio Payment Gateway...",
    "Verifying Fraud & DPDP Data Protection Protocols...",
    "Recording Handcrafted Studio Order..."
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    if (currentStep < steps.length) {
      if (statusText) statusText.textContent = steps[currentStep];
    } else {
      clearInterval(interval);
      finalizeOrderSuccess();
    }
  }, 800);
}

function finalizeOrderSuccess() {
  const processingOverlay = document.getElementById("paymentProcessingOverlay");
  if (processingOverlay) processingOverlay.classList.add("hidden");
  closeCheckoutModal();

  const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountUSD = Math.round(subtotalUSD * (state.discountPercent / 100));
  const giftWrapCostUSD = state.isGiftWrap ? 8 : 0;
  const shippingCost = state.checkoutData.shippingMethod === "express" ? 15 : (subtotalUSD >= 150 ? 0 : 15);
  const grandTotalUSD = Math.max(0, subtotalUSD - discountUSD + giftWrapCostUSD + shippingCost);

  const orderNumber = "FLORA-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const deliveryEst = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const orderRecord = {
    orderNumber,
    date: orderDate,
    customer: state.checkoutData.customerName,
    email: state.checkoutData.email,
    phone: state.checkoutData.phone,
    shippingAddress: `${state.checkoutData.address}, ${state.checkoutData.city}, ${state.checkoutData.zip}, ${state.checkoutData.country}`,
    items: [...state.cart],
    totalUSD: grandTotalUSD,
    paymentMethod: state.checkoutData.paymentMethod.toUpperCase(),
    status: "Handcrafting in Progress"
  };

  // Save to sister's order book
  state.orders.unshift(orderRecord);
  localStorage.setItem("flora_orders", JSON.stringify(state.orders));

  // Sync to Python SQLite backend if running on Python server
  try {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderRecord)
    }).catch(() => {});
  } catch(e) {}

  renderReceiptModal(orderRecord, deliveryEst);

  // Clear cart
  state.cart = [];
  state.discountPercent = 0;
  state.discountCode = "";
  state.isGiftWrap = false;
  saveCart();
  updateCartUI();

  showToast(`Order ${orderNumber} placed successfully! 🌸`);
}

function renderReceiptModal(order, deliveryEst) {
  const receiptModal = document.getElementById("receiptModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (!receiptModal || !backdrop) return;

  document.getElementById("receiptOrderNum").textContent = order.orderNumber;
  document.getElementById("receiptDate").textContent = order.date;
  document.getElementById("receiptCustomer").textContent = order.customer;
  document.getElementById("receiptEmail").textContent = order.email;
  document.getElementById("receiptAddress").textContent = order.shippingAddress;
  document.getElementById("receiptDeliveryEst").textContent = deliveryEst;
  document.getElementById("receiptMethod").textContent = order.paymentMethod;
  document.getElementById("receiptTotal").textContent = formatPrice(order.totalUSD);

  const itemsContainer = document.getElementById("receiptItems");
  itemsContainer.innerHTML = order.items.map(item => `
    <div class="flex justify-between py-2 border-b border-[#F0DADA] text-xs">
      <div>
        <span class="font-medium text-stone-900">${item.name}</span>
        <span class="text-stone-400"> × ${item.quantity} (${item.option})</span>
        ${item.customNote ? `
          <div class="text-[10px] text-stone-500 italic">Customization: "${item.customNote}"</div>
        ` : ''}
      </div>
      <span class="font-semibold text-stone-900">${formatPrice(item.priceUSD * item.quantity)}</span>
    </div>
  `).join("");

  backdrop.classList.add("active");
  receiptModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReceiptModal() {
  const receiptModal = document.getElementById("receiptModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (receiptModal) receiptModal.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function printReceipt() {
  window.print();
}

// ==========================================================================
// BESPOKE COMMISSIONS & NEWSLETTER
// ==========================================================================
function submitBespokeInquiry(e) {
  e.preventDefault();
  const name = document.getElementById("bespokeName").value.trim();
  const email = document.getElementById("bespokeEmail").value.trim();
  const occasion = document.getElementById("bespokeOccasion").value;
  const budget = document.getElementById("bespokeBudget").value;
  const notes = document.getElementById("bespokeNotes")?.value || "";
  const consent = document.getElementById("bespokeConsent")?.checked;

  if (!consent) {
    showToast("Please check the consent box to proceed.");
    return;
  }

  try {
    fetch('/api/bespoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, occasion, budget, notes })
    }).catch(() => {});
  } catch(e) {}

  showToast(`Thank you, ${name}! Your custom craft request has been sent to the artisan 🌸`);
  e.target.reset();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value.trim();
  const consent = document.getElementById("newsletterConsent")?.checked;

  if (!consent) {
    showToast("Please check the consent box to receive emails.");
    return;
  }

  showToast(`Welcome to the Floral Studio! Use code FLORA10 for 10% off ✨`);
  e.target.reset();
}

// ==========================================================================
// SISTER'S DESIGNER STUDIO ADMIN CONTROLLER
// ==========================================================================
function openDesignerStudio() {
  const modal = document.getElementById("designerStudioModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (!modal || !backdrop) return;

  renderDesignerOrdersList();
  backdrop.classList.add("active");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDesignerStudio() {
  const modal = document.getElementById("designerStudioModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (modal) modal.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function renderDesignerOrdersList() {
  const container = document.getElementById("designerOrdersList");
  if (!container) return;

  if (state.orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-stone-400 text-xs">
        No orders recorded yet. Add items to bag and complete a test checkout to see orders appear here!
      </div>
    `;
    return;
  }

  container.innerHTML = state.orders.map(o => `
    <div class="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1">
      <div class="flex justify-between font-semibold text-stone-900">
        <span>Order #${o.orderNumber}</span>
        <span class="text-[#C96872] font-bold">${formatPrice(o.totalUSD)}</span>
      </div>
      <div class="text-stone-600">Client: <strong>${o.customer}</strong> (${o.email} • ${o.phone || 'No phone'})</div>
      <div class="text-stone-500 text-[11px]">Address: ${o.shippingAddress}</div>
      <div class="text-stone-500">Status: <span class="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[10px]">${o.status}</span></div>
      <div class="text-stone-400 text-[11px]">Pieces: ${o.items.map(i => `${i.name} (${i.option || 'Standard'}) × ${i.quantity}`).join(", ")}</div>
    </div>
  `).join("");
}

function addNewCreation(e) {
  e.preventDefault();
  const name = document.getElementById("newProdName").value.trim();
  const cat = document.getElementById("newProdCat").value;
  const price = parseFloat(document.getElementById("newProdPrice").value) || 35;
  const material = document.getElementById("newProdMaterial").value.trim();
  const hours = document.getElementById("newProdHours").value.trim() || "10 Hours Handcrafting";
  const imgUrl = document.getElementById("newProdImg").value.trim() || "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80";
  const desc = document.getElementById("newProdDesc").value.trim() || "Handcrafted with natural botanical flora.";

  const newProduct = {
    id: "craft-" + Date.now(),
    name: name,
    subtitle: material,
    category: cat,
    priceUSD: price,
    rating: 5.0,
    reviewsCount: 1,
    badge: "New Creation",
    artisanHours: hours,
    material: material,
    color: "Natural Palette",
    dimensions: "Standard Artisan Size",
    options: ["Standard Edition", "Personalized Gift Box"],
    inStock: 4,
    images: [imgUrl, imgUrl],
    description: desc,
    craftsmanship: [
      "100% hand-crafted by artisan",
      "Sustainable botanical materials",
      "Carefully cured and finished"
    ],
    care: "Wipe with soft cloth. Avoid extreme boiling heat."
  };

  state.products.unshift(newProduct);
  localStorage.setItem("flora_products", JSON.stringify(state.products));
  renderProducts();
  showToast(`Added "${name}" to your shop! 🌸`);
  e.target.reset();
  closeDesignerStudio();
}

function resetAllDemoData() {
  if (confirm("Reset all products and orders to original default botanical crafts?")) {
    localStorage.removeItem("flora_products");
    localStorage.removeItem("flora_orders");
    localStorage.removeItem("flora_cart");
    localStorage.removeItem("flora_wishlist");
    state.products = [...window.INITIAL_PRODUCTS];
    state.orders = [];
    state.cart = [];
    state.wishlist = new Set();
    saveCart();
    renderProducts();
    updateCartUI();
    updateWishlistCount();
    renderDesignerOrdersList();
    showToast("Reset to clean default botanical catalog.");
  }
}

// Toast Alert System
function showToast(msg) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <span class="text-[#C96872]">🌸</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Event Listeners
function setupEventListeners() {
  const currSelect = document.getElementById("currencySelector");
  if (currSelect) {
    currSelect.addEventListener("change", (e) => {
      state.currency = e.target.value;
      localStorage.setItem("flora_currency", state.currency);
      renderProducts();
      updateCartUI();
      if (state.currentModalProduct) {
        document.getElementById("modalProdPrice").textContent = formatPrice(state.currentModalProduct.priceUSD);
      }
      showToast(`Currency changed to ${CURRENCIES[state.currency].label}`);
    });
  }

  document.querySelectorAll(".category-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active-cat"));
      btn.classList.add("active-cat");
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById("sortSelector");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}
