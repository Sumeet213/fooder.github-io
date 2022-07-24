//this function fetches the meal id passed as query param and renders it
function getMealItem() {
    var xhrRequest = new XMLHttpRequest(); 
    let url = window.location.href; 
    let id = ""; 
    let idFlag = false;
    for (let i = 0; i < url.length; i++) {
        if (idFlag) {
            id += url.charAt(i);
        }
        if (url.charAt(i) == '?') {
            idFlag = true;
        }

    }
    id = id.substr(3, url.length); 
    xhrRequest.onload = function () {
        let res = JSON.parse(xhrRequest.response).meals[0]; 
        createFoodItem(res); 
    }
    //creating a get api call to fetch meal with given id
    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, true);
    //sending the request
    xhrRequest.send();
}

function createFoodItem(res) {
    //HTML code for the food item
    let foodItem = `<div id="meal-image">
                        <img src="${res.strMealThumb}">
                    </div>
                    <div id="meal-details">
                        <div id="meal-name">${res.strMeal} Recipie</div>
                        <div id="meal-recipie">${res.strInstructions}</div>
                    </div>`
    //appending the result to the root 'meal-box' div
    let outer = document.getElementById('meal-box');
    outer.innerHTML = foodItem;
}

getMealItem(); //calling the getMealIte function