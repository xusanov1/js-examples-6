const addBtn = document.querySelector('#add-btn');
const showBtn = document.querySelector("#show-btn");
const searchBtn = document.querySelector('#search-btn');
const deleteBtn = document.querySelector("#delete-btn");
const sortBtn = document.querySelector('#sort-btn');
const priceFilterBtn = document.querySelector('#price-filter-btn');

function NewFood(fd, price, h, m, s, t) {
    this.id = (Math.floor(Math.random() * 100000) + 1).toString().padStart(6, "0")
    this.name = fd
    this.price = price
    this.hours = h,
        this.minut = m,
        this.sekund = s,
        this.time = t
}


const ALL_FOODS = JSON.parse(localStorage.getItem("menu")) || [];

const addNewFood = function () {
    let newFoodName = prompt("Please enter a name for this food");
    let newFoodPrice = prompt("Please enter a price for this food");
    if (newFoodName && newFoodName.trim() !== "" && newFoodPrice && newFoodPrice.trim() !== "" ) {
        let date = new Date();
        let hours = date.getHours();
        let minut = date.getMinutes();
        let sekund = date.getSeconds();
        let time = date.getTime()

        let newFood = new NewFood(newFoodName, newFoodPrice, hours, minut, sekund, time);

        ALL_FOODS.push(newFood);
        localStorage.setItem("menu", JSON.stringify(ALL_FOODS));
    }
    else {
        alert("Please enter a name for this food");
    }
}

let sorted = false;

const sortMenu = function () {
    if (sorted === false) {
        sorted = true;
        ALL_FOODS.sort((a, b) => {
            if (a.time > b.time) {
                return -1
            }
            else {
                return 1
            }
        })
    }
    else{
        sorted = false;
        ALL_FOODS.sort((a, b) => {
            if(a.time > b.time){
                return 1
            }
            else{
                return -1
            }
        })
    }

    showFoods()
}

const showFoods = function(){
    result.innerHTML = ""
    ALL_FOODS.forEach(food => {
        result.innerHTML += `
        <div class="container">
            <div class="food-item">
                <span id="one"> id :${food.id}</span>
                <h2>${food.name}</h2>
                <h2>${food.price}</h2>
                <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
            </div>
        </div>
        `
    })
}

const deleteFood = function(){
    let deleteId = prompt("Enter food id: ");

    if(deleteId){
        let indexOfDeletedElement = ALL_FOODS.findIndex(element => element.id === deleteId);
        ALL_FOODS.splice(indexOfDeletedElement, 1);
        localStorage.setItem("menu", JSON.stringify(ALL_FOODS));
    }

    alert("Deleted please refresh")
}


const searchFoods = function () {
    let searchText = prompt("Qidirilayotgan ovqat nomini kiriting");
    if (searchText && searchText.trim() !== "") {
        let searchResults = ALL_FOODS.filter(food => {
            return food.name.toLowerCase().includes(searchText.toLowerCase());
        });

        if (searchResults.length > 0) {
            result.innerHTML = "";
            searchResults.forEach(food => {
                result.innerHTML += `
                <div class="container">
                    <div class="food-item">
                        <span> id :${food.id}</span>
                        <h2>${food.name}</h2>
                        <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
                    </div>
                </div>
                `;
            });
        } else {
            result.innerHTML = "<p>Ovqat topilmadi</p>";
        }
    } else {
        alert("Iltimos, qidirilayotgan ovqat nomini kiriting");
    }
}


const filterByPrice = function () {
    let minPrice = prompt("Please enter the minimum price");
    let maxPrice = prompt("Please enter the maximum price");

    if (minPrice && maxPrice) {
        let filteredFoods = ALL_FOODS.filter(food => {
            return food.price >= minPrice && food.price <= maxPrice;
        });

        result.innerHTML = "";
        filteredFoods.forEach(food => {
            result.innerHTML += `
            <div class="container">
                <div class="food-item">
                    <span> id :${food.id}</span>
                    <h2>${food.name}</h2>
                    <h2>${food.price}</h2>
                    <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
                </div>
            </div>
            `;
        });
    } else {
        alert("Please enter valid prices");
    }
}









addBtn.addEventListener("click", addNewFood);
showBtn.addEventListener("click", showFoods);
sortBtn.addEventListener("click", sortMenu);
searchBtn.addEventListener("click", searchFoods);
priceFilterBtn.addEventListener("click", filterByPrice);
deleteBtn.addEventListener("click", deleteFood);
