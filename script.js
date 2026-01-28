/******************************
 * 1. IMAGE SLIDER
 ******************************/
const images = [
  "images/img/perfume1-main.png",
  "images/img/thumb1.jpg",
  "images/img/thumb2.jpg",
  "images/img/thumb3.jpg"
];

let index = 0;
const currentImage = document.getElementById("currentImage");

function nextImage() {
  index = (index + 1) % images.length;
  currentImage.src = images[index];
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  currentImage.src = images[index];
}

function changeImage(img) {
  currentImage.src = img.src;
}

/******************************
 * 2. ACCORDION (ONE OPEN AT A TIME)
 ******************************/
document.querySelectorAll(".accordion").forEach(acc => {
  acc.addEventListener("click", () => {
    document.querySelectorAll(".accordion").forEach(a => {
      a.classList.remove("active");
      a.querySelector(".icon").textContent = "+";
    });

    acc.classList.add("active");
    acc.querySelector(".icon").textContent = "−";
  });
});

/******************************
 * 3. CART SYSTEM (LOCAL STORAGE)
 ******************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

updateCartCount();

const cartBtn = document.querySelector(".cart-btn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cart.push({
      name: "GTG Perfume",
      price: 99.99
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("Item added to cart 🛒");
  });
}

/******************************
 * 4. TOAST NOTIFICATION
 ******************************/
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    toast.remove();
  }, 3000);
}

/******************************
 * 5. NEWSLETTER SUBSCRIBE
 ******************************/
function subscribe() {
  const email = document.getElementById("emailInput").value;

  if (!email.includes("@")) {
    showToast("Please enter a valid email ❌");
    return;
  }

  showToast("Subscribed successfully ✅");
}

/******************************
 * 6. SEARCH BOX TOGGLE + SEARCH
 ******************************/
const searchBtn = document.querySelector(".search");
const searchBox = document.getElementById("searchBox");

if (searchBtn && searchBox) {
  searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    searchBox.focus();
  });

  searchBox.addEventListener("keyup", () => {
    const value = searchBox.value.toLowerCase();

    document.querySelectorAll("section").forEach(section => {
      section.style.display =
        section.innerText.toLowerCase().includes(value)
          ? "block"
          : "none";
    });
  });
}

/******************************
 * 7. SCROLL ANIMATION (FADE-IN)
 ******************************/
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-section").forEach(section => {
  observer.observe(section);
});


const darkToggle = document.getElementById("darkToggle");

if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkToggle.textContent = "☀️";
    localStorage.setItem("darkMode", "on");
  } else {
    darkToggle.textContent = "🌙";
    localStorage.setItem("darkMode", "off");
  }
});
