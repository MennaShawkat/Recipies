const model = document.getElementById("model");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const links = document.querySelectorAll(".nav-link");
const input1 = document.getElementById("input1");
const searchWords = document.getElementById("searchWords");
const error = document.getElementById("error");
const rowData = document.getElementById("data").querySelector(".row");

const foods = [
    "carrot",
    "broccoli",
    "asparagus",
    "cauliflower",
    "corn",
    "cucumber",
    "green pepper",
    "lettuce",
    "mushrooms",
    "onion",
    "potato",
    "pumpkin",
    "red pepper",
    "tomato",
    "beetroot",
    "brussel sprouts",
    "peas",
    "zucchini",
    "radish",
    "sweet potato",
    "artichoke",
    "leek",
    "cabbage",
    "celery",
    "chili",
    "garlic",
    "basil",
    "coriander",
    "parsley",
    "dill",
    "rosemary",
    "oregano",
    "cinnamon",
    "saffron",
    "green bean",
    "bean",
    "chickpea",
    "lentil",
    "apple",
    "apricot",
    "avocado",
    "banana",
    "blackberry",
    "blackcurrant",
    "blueberry",
    "boysenberry",
    "cherry",
    "coconut",
    "fig",
    "grape",
    "grapefruit",
    "kiwifruit",
    "lemon",
    "lime",
    "lychee",
    "mandarin",
    "mango",
    "melon",
    "nectarine",
    "orange",
    "papaya",
    "passion fruit",
    "peach",
    "pear",
    "pineapple",
    "plum",
    "pomegranate",
    "quince",
    "raspberry",
    "strawberry",
    "watermelon",
    "salad",
    "pizza",
    "pasta",
    "popcorn",
    "lobster",
    "steak",
    "bbq",
    "pudding",
    "hamburger",
    "pie",
    "cake",
    "sausage",
    "tacos",
    "kebab",
    "poutine",
    "seafood",
    "chips",
    "fries",
    "masala",
    "paella",
    "som tam",
    "chicken",
    "toast",
    "marzipan",
    "tofu",
    "ketchup",
    "hummus",
    "chili",
    "maple syrup",
    "parma ham",
    "fajitas",
    "champ",
    "lasagna",
    "poke",
    "chocolate",
    "croissant",
    "arepas",
    "bunny chow",
    "pierogi",
    "donuts",
    "rendang",
    "sushi",
    "ice cream",
    "duck",
    "curry",
    "beef",
    "goat",
    "lamb",
    "turkey",
    "pork",
    "fish",
    "crab",
    "bacon",
    "ham",
    "pepperoni",
    "salami",
    "ribs"
];

let allRecipes;
let singleRecipe;

async function getAllRecipes(food) {
    try {
        let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${food}`)
        console.log(response)
        let data = await response.json()
        console.log(data)
        if (data.recipes && data.recipes.length > 0) {
            allRecipes = data.recipes;
            console.log(allRecipes)
            diplayAllRecipes()
        }
    }
    catch (error) {
        console.log(`error fetching recipes ${error}`)
        rowData.innerHTML = '<p class="text-center text-danger my-3">Failed to load recipes plz try again later</p>'
    }
}

function diplayAllRecipes() {
    let data = ''
    for (let i = 0; i < allRecipes.length; i++) {
        data += `
        <div class="col-md-4 col-sm-12">
         <div class="card">
            <img src="${allRecipes[i].image_url}" class="w-100" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleRecipe('${allRecipes[i].recipe_id}')">
            <div class="card-body">
                <h5 class="card-title">${allRecipes[i].title}</h5>
                <p class="card-text text-muted mb-0">${allRecipes[i].publisher}</p>
            </div>
        </div>
        </div>
        
        `
    }
    rowData.innerHTML = data
}

links.forEach((link) => {
    console.log(link)
    link.addEventListener('click', function (eventInfo) {
        console.log(eventInfo.target.innerHTML)
        getAllRecipes(eventInfo.target.innerHTML)

    })
})

//default displayed page
window.addEventListener('DOMContentLoaded', function () {
    getAllRecipes('pizza')

})

async function getSingleRecipe(id) {
    try {
        let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
        let data = await response.json()
        console.log(data)
        if (data.recipe) {
            singleRecipe = data.recipe
            console.log(singleRecipe)
            displaySingleRecipe()
        }
        else {
            rowData.innerHTML = '<p class="text-center text-danger my-3">No Recipe Found, plz try again later</p>'
        }
    }
    catch (error) {
        console.log(`error fetching recipes ${error}`)
        rowData.innerHTML = '<p class="text-center text-danger my-3">Failed to load recipes plz try again later</p>'

    }
}

function displaySingleRecipe() {
    exampleModalLabel.innerHTML = singleRecipe.title
    let ingredientsList = ''
    for (let i = 0; i < singleRecipe.ingredients.length; i++) {
        ingredientsList += `
         <li>${singleRecipe.ingredients[i]}</li>
        `
    }
    model.innerHTML = `
      <img src="${singleRecipe.image_url}" class="w-80">
      <h2>ingredients</h2>
      <ul>
        ${ingredientsList}
      </ul>
    
    `
}

function search(word) {
    let data = ''
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].toLowerCase().includes(word.toLowerCase())) {
            data += `
               <li onclick="getAllRecipes('${foods[i]}')">${foods[i].replace(word, `<span class="span">${word}</span>`)}</li>
            `
        }
    }
    searchWords.innerHTML = data
    if (data.length == 0) {
        error.classList.remove("d-none")
    }
    else {
        error.classList.add("d-none")
        searchWords.classList.remove('d-none')

    }
}

input1.addEventListener("keyup", function () {
    search(input1.value)
})