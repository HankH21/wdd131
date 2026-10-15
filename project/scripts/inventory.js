// Sample vehicle data and inventory interactions for Hank's Auto.

const cars = [
    {
        id: 1,
        make: "Honda",
        model: "Civic",
        year: 2021,
        price: 18900,
        mileage: 38200,
        type: "Sedan",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/honda-civic.webp",
        imageAlt: "Silver sedan parked outdoors",
        description: "A practical compact sedan for commuting and everyday driving."
    },
    {
        id: 2,
        make: "Toyota",
        model: "RAV4",
        year: 2020,
        price: 22900,
        mileage: 52400,
        type: "SUV",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/toyota-rav4.webp",
        imageAlt: "Sport utility vehicle photographed on a road",
        description: "A versatile SUV with room for passengers and weekend gear."
    },
    {
        id: 3,
        make: "Mazda",
        model: "3 Hatchback",
        year: 2022,
        price: 20500,
        mileage: 29100,
        type: "Hatchback",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/mazda-3.webp",
        imageAlt: "Modern car viewed from the front side",
        description: "A compact hatchback with a useful cargo area and easy city handling."
    },
    {
        id: 4,
        make: "Ford",
        model: "F-150",
        year: 2019,
        price: 24800,
        mileage: 74800,
        type: "Truck",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/ford-f150.webp",
        imageAlt: "Pickup truck parked outdoors",
        description: "A pickup truck sample listing for drivers who need a larger vehicle."
    },
    {
        id: 5,
        make: "Hyundai",
        model: "Elantra",
        year: 2018,
        price: 11900,
        mileage: 68400,
        type: "Sedan",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/hyundai-elantra.webp",
        imageAlt: "Blue sports sedan on a road",
        description: "A budget-conscious sedan sample with everyday comfort and useful space."
    },
    {
        id: 6,
        make: "Subaru",
        model: "Forester",
        year: 2022,
        price: 23900,
        mileage: 34600,
        type: "SUV",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "images/subaru-forester.webp",
        imageAlt: "Dark vehicle shown in a scenic outdoor setting",
        description: "A roomy SUV sample for daily travel and outdoor activities."
    }
];

const favoriteStorageKey = "hanksAutoFavorites";

function getFavoriteIds() {
    const savedFavorites = localStorage.getItem(favoriteStorageKey);
    if (savedFavorites) {
        return JSON.parse(savedFavorites);
    }
    return [];
}

function saveFavoriteIds(favoriteIds) {
    localStorage.setItem(favoriteStorageKey, JSON.stringify(favoriteIds));
}

function createCarCard(car, favoriteIds) {
    const isFavorite = favoriteIds.includes(car.id);

    return `
        <article class="car-card">
            <img
                class="car-card-image"
                src="${car.image}"
                alt="${car.imageAlt}"
                width="900"
                height="600"
                loading="lazy">
            <div class="car-card-content">
                <h3 class="car-card-title">${car.year} ${car.make} ${car.model}</h3>
                <p class="car-price">$${car.price}</p>
                <div class="car-details">
                    <span class="car-detail">Mileage: ${car.mileage} mi</span>
                    <span class="car-detail">Type: ${car.type}</span>
                    <span class="car-detail">Fuel: ${car.fuel}</span>
                    <span class="car-detail">Transmission: ${car.transmission}</span>
                </div>
                <p>${car.description}</p>
                <div class="car-card-actions">
                    <a class="button button-outline" href="contact.html">Ask About This Car</a>
                    <button
                        class="favorite-button"
                        type="button"
                        data-favorite-id="${car.id}"
                        aria-pressed="${isFavorite}">${isFavorite ? "♥" : "♡"}</button>
                </div>
            </div>
        </article>
    `;
}

function displayCars(carList, container) {
    if (!container) {
        return;
    }

    const favoriteIds = getFavoriteIds();
    let carCardsHTML = "";

    carList.forEach(function (car) {
        carCardsHTML += createCarCard(car, favoriteIds);
    });

    container.innerHTML = carCardsHTML;

    addFavoriteButtonListeners(container);
}

function addFavoriteButtonListeners(container) {
    const favoriteButtons = container.querySelectorAll("[data-favorite-id]");

    favoriteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleFavorite(Number(button.dataset.favoriteId));
        });
    });
}

function toggleFavorite(carId) {
    let favoriteIds = getFavoriteIds();

    if (favoriteIds.includes(carId)) {
        favoriteIds = favoriteIds.filter(function (favoriteId) {
            return favoriteId !== carId;
        });
    } else {
        favoriteIds.push(carId);
    }

    saveFavoriteIds(favoriteIds);
    updateCarDisplays();
}

function getFilteredCars() {
    const searchInput = document.querySelector("#search-input");
    const vehicleType = document.querySelector("#vehicle-type");
    const maxPrice = document.querySelector("#max-price");
    const minYear = document.querySelector("#min-year");
    const maxMileage = document.querySelector("#max-mileage");
    const favoritesOnly = document.querySelector("#favorites-only");

    let searchText = "";
    if (searchInput) {
        searchText = searchInput.value.toLowerCase();
    }

    let selectedType = "all";
    if (vehicleType) {
        selectedType = vehicleType.value;
    }

    let selectedMaxPrice = "all";
    if (maxPrice) {
        selectedMaxPrice = maxPrice.value;
    }

    let selectedMinYear = "all";
    if (minYear) {
        selectedMinYear = minYear.value;
    }

    let selectedMaxMileage = "all";
    if (maxMileage) {
        selectedMaxMileage = maxMileage.value;
    }

    let showFavoritesOnly = false;
    if (favoritesOnly) {
        showFavoritesOnly = favoritesOnly.checked;
    }

    const favoriteIds = getFavoriteIds();

    return cars.filter(function (car) {
        const matchesSearch = (car.make + " " + car.model).toLowerCase().includes(searchText);
        const matchesType = selectedType === "all" || car.type === selectedType;
        const matchesPrice = selectedMaxPrice === "all" || car.price <= Number(selectedMaxPrice);
        const matchesYear = selectedMinYear === "all" || car.year >= Number(selectedMinYear);
        const matchesMileage = selectedMaxMileage === "all" || car.mileage <= Number(selectedMaxMileage);
        const matchesFavorite = !showFavoritesOnly || favoriteIds.includes(car.id);

        return matchesSearch && matchesType && matchesPrice && matchesYear && matchesMileage && matchesFavorite;
    });
}

function updateResultsCount(count) {
    const resultsCount = document.querySelector("#results-count");
    const emptyMessage = document.querySelector("#empty-message");

    if (resultsCount) {
        resultsCount.textContent = count + " cars found";
    }

    if (emptyMessage) {
        emptyMessage.hidden = count !== 0;
    }
}

function updateCarDisplays() {
    const inventoryContainer = document.querySelector("#inventory-cars");
    const featuredContainer = document.querySelector("#featured-cars");

    if (inventoryContainer) {
        const filteredCars = getFilteredCars();
        displayCars(filteredCars, inventoryContainer);
        updateResultsCount(filteredCars.length);
    }

    if (featuredContainer) {
        displayCars(cars.slice(0, 3), featuredContainer);
    }
}

const filterForm = document.querySelector("#filter-form");
const favoritesOnly = document.querySelector("#favorites-only");
const searchInput = document.querySelector("#search-input");

if (filterForm) {
    filterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateCarDisplays();
    });

    filterForm.addEventListener("change", updateCarDisplays);

    filterForm.addEventListener("reset", function () {
        updateCarDisplays();
    });
}

if (favoritesOnly) {
    favoritesOnly.addEventListener("change", updateCarDisplays);
}

if (searchInput) {
    searchInput.addEventListener("input", updateCarDisplays);
}

updateCarDisplays();