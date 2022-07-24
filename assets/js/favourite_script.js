
//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem('meal-favurites').split(/(\s+)/);

item.filter(function (e) {
    return e.trim().length > 0;
});
for (let id of item) {
    getMealItem(id);
}


//this function fetches a meal with a specific id
function getMealItem(id) {

    var xhrRequest = new XMLHttpRequest(); 
    xhrRequest.onload = function () {
        let res = JSON.parse(xhrRequest.response).meals[0]; //parsing resultant food item retrned
        createFood(res); //creating the new item's HTML
    }
    //creating a get api call to fetch meal with given id
    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, true);
    //sending the request
    xhrRequest.send();
}

//this function adds the each search result to the DOM by creating a new element
function createFood(res) {

    var foodItem = `<div class="food-item">
                        <div class="food-image">
                            <img src="${res.strMealThumb}" alt="">
                        </div>
                        <div class="food-name">${res.strMeal}</div>
                        <div class="action-buttons">
                            <div class="get-recipie">
                                <a href="meal_details.html?id=${res.idMeal}" value="${res.idMeal}">Get Recipie</a>
                            </div>
                            <div class="fav-button" id="${res.idMeal}">
                                Remove Favourite
                            </div>
                        </div>
                    </div>`;
    let recipieList = document.getElementById('recipie-list');
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
}

/*--------------THIS PART HANDLES THE PERSISTENT FAVOURITES LIST--------------*/


document.body.addEventListener('click', function (event) {
    
    if (event.target.getAttribute('class') == 'fav-button') {
        let id = event.target.getAttribute('id');
        let index = item.indexOf(id);
        item.splice(index, 1);
        let items = '';
        for (let i of item) {
            items = items + ' ' + i;
        }
      
        window.localStorage.setItem('meal-favurites', items);
     
        location.reload();
    }
});
