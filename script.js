
const WHATSAPP_NUMBER = "923100055801";

const cars = [
    
    {
    id: 1,
    name: "Toyota Corolla",
    category: "Sedan",
    image: "images1.png",
    extraImages: ["images1back.png", "images1inter.png"],
    description: "Comfortable family sedan."
},
{
    id: 2,
    name: "Toyota Yaris",
    category: "Sedan",
    image: "images2.png",
    extraImages: ["images2back.png", "images2inter.png"],
    description: "Stylish and economical car."
},
{
    id: 3,
    name: "Toyota Fortuner",
    category: "SUV",
    image: "images3.png",
    extraImages: ["images3back.png", "images3inter.png"],
    description: "Powerful luxury SUV."
},
{
    id: 4,
    name: "Toyota Land Cruiser",
    category: "SUV",
    image: "images4.png",
    extraImages: ["images4back.png", "images4inter.png"],
    description: "Premium off-road SUV."
},
{
    id: 5,
    name: "Toyota Hilux Revo",
    category: "Pickup",
    image: "images5.png",
    extraImages: ["images5back.png", "images5inter.png"],
    description: "Strong and reliable pickup."
},
{
    id: 6,
    name: "Toyota Aqua",
    category: "Hatchback",
    image: "images6.png",
    extraImages: ["images6back.png", "images6inter.png"],
    description: "Compact hybrid vehicle."
},
{
    id: 7,
    name: "Toyota Corolla Cross",
    category: "SUV",
    image: "images7.png",
    extraImages: ["images7back.png", "images7inter.png"],
    description: "Stylish and family-friendly SUV."
},
{
    id: 8,
    name: "Toyota Prado",
    category: "Luxury SUV",
    image: "images8.png",
    extraImages: ["images8back.png", "images8inter.png"],
    description: "Premium comfort and off-road power."
},
{
    id: 9,
    name: "Toyota Hiace",
    category: "Van",
    image: "images9.png",
    extraImages: ["images9back.png", "images9inter.png"],
    description: "Spacious and comfortable passenger van."
},
{
    id: 10,
    name: "Toyota Coaster",
    category: "Mini Bus",
    image: "images10.png",
    extraImages: ["images10back.png", "images10inter.png"],
    description: "Comfortable group transportation."
},
{
    id: 11,
    name: "Toyota Hilux",
    category: "Pickup",
    image: "images11.png",
    extraImages: ["images11back.png", "images11inter.png"],
    description: "Durable and powerful work vehicle."
},
{
    id: 12,
    name: "Toyota Prius Hybrid",
    category: "Hybrid Hatchback",
    image: "images12.png",
    extraImages: ["images12back.png", "images12inter.png"],
    description: "Smart and eco-friendly driving."
}
];
// Home Page Moving Cars
const homeCarTrack = document.getElementById("homeCarTrack");

if (homeCarTrack) {
    const carHTML = cars.map(car => `
        <div class="home-car-item">
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
        </div>
    `).join("");

    // Duplicate for continuous scrolling
    homeCarTrack.innerHTML = carHTML + carHTML;
}
let cart = [];

const container = document.getElementById("carContainer");
function displayCars(list) {
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No vehicles found.</p>";
        return;
    }

    list.forEach(car => {
        container.innerHTML += `
            <div class="car-card">

                <div class="car-gallery">

                    <img
                        src="${car.image}"
                        class="car-photo"
                        data-index="0"
                        alt="${car.name}"
                        onerror="this.src='https://placehold.co/500x300?text=Add+Car+Photo'">

                    <button class="gallery-btn prev"
                        onclick="changeCarImage(this, -1, ${car.id})">
                        &#10094;
                    </button>

                    <button class="gallery-btn next"
                        onclick="changeCarImage(this, 1, ${car.id})">
                        &#10095;
                    </button>

                    <div class="photo-count">1 / 3</div>

                </div>

                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p>${car.description}</p>
                    <p>Category: ${car.category}</p>
                    <b>Price: On Request</b>

                    <button onclick="addToCart(${car.id})">
                        Add to Order
                    </button>
                </div>

            </div>
        `;
    });
}

function addToCart(id) {
    if (!cart.some(car => car.id === id)) {
        const car = cars.find(car => car.id === id);
        cart.push(car);
    }

    updateCart();
    openCart();
}

function removeCar(id) {
    cart = cart.filter(car => car.id !== id);
    updateCart();
}

function updateCart() {
    document.getElementById("count").innerText = cart.length;

    const items = document.getElementById("cartItems");

    if (cart.length === 0) {
        items.innerHTML = "<p>Your order is empty.</p>";
        return;
    }

    items.innerHTML = "";

    cart.forEach(car => {
        items.innerHTML += `
            <div class="cart-item">
                <div>
                    <b>${car.name}</b>
                    <p>${car.category}</p>
                </div>
                <button onclick="removeCar(${car.id})">
                    Remove
                </button>
            </div>
        `;
    });
}

function openCart() {
    document.getElementById("cart").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeCart() {
    document.getElementById("cart").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

// Search

document.getElementById("search").addEventListener("input", filterCars);

document.getElementById("filter").addEventListener("change", filterCars);

function filterCars() {
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("filter").value;

    const filtered = cars.filter(car => {
        return car.name.toLowerCase().includes(search) &&
            (category === "All" || car.category === category);
    });

    displayCars(filtered);
}

// WhatsApp Order

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Please select a Toyota vehicle first!");
        return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const message = document.getElementById("message").value;

    const selectedCars = cart.map(car => car.name).join(", ");

    const text = `
New Toyota Order

Customer: ${name}
Phone: ${phone}
City: ${city}

Selected Vehicles: ${selectedCars}

Message: ${message || "Please share price and availability."}
    `;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
});

document.getElementById("contactWhatsApp").href =
    `https://wa.me/${WHATSAPP_NUMBER}`;

displayCars(cars);
updateCart();
function changeCarImage(button, direction, carId) {

    const car = cars.find(c => c.id === carId);

    const gallery = button.closest(".car-gallery");

    const img = gallery.querySelector(".car-photo");

    const images = [car.image, ...car.extraImages];

    let index = Number(img.dataset.index);

    index = (index + direction + images.length) % images.length;

    img.src = images[index];

    img.dataset.index = index;

    gallery.querySelector(".photo-count").textContent =
        `${index + 1} / ${images.length}`;
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const btn = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}