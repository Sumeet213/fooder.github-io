const searchBar = document.getElementById('meal-search-bar'); //the input form where food name is enteredmeal-fav

/*--------------THIS PART HANDLES THE DYNAMIC SEARCH RESULTS--------------*/

//adding keydown event listener to searchBar
searchBar.addEventListener('keydown', (event) => {
    let searchValue = searchBar.value; //fetching the value entered

    if (searchValue == '') {
        //if value is empty clear all search results
        document.getElementById('recipie-list').innerHTML = '';
        return;
    }

    let xhrRequest = new XMLHttpRequest(); //creating a new XMLHttpRequest

    xhrRequest.onload = function () {
        document.getElementById('recipie-list').innerHTML = ''; 
        let res = JSON.parse(xhrRequest.response).meals;
        for (let i = 0; i < res.length; i++) {
            createFood(res[i]); 
        }
    }

    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`, true);

    xhrRequest.send();

});

//this function adds the each search result to the DOM by creating a new element
function createFood(res) {
    //HTML code for the individual search result/food item
    let foodItem = `<div class="food-item">
                        <div class="food-image">
                            <img src="${res.strMealThumb}" alt="">
                        </div>
                        <div class="food-name">${res.strMeal}</div>
                        <div class="action-buttons">
                            <div class="get-recipie">
                                <a href="meal_details.html?id=${res.idMeal}" value="${res.idMeal}">Get Recipie</a>
                            </div>
                            <div class="favourite-button" id="${res.idMeal}">
                                Add favourite
                            </div>
                        </div>
                    </div>`;
    //appending the result to the root 'recipie-list' div
    let recipieList = document.getElementById('recipie-list');
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
}


/*--------------THIS PART HANDLES THE PERSISTENT FAVOURITES LIST--------------*/


//if browser dosen't have 'meal-favurites' in local storage we create one
let fav = window.localStorage.getItem('meal-favurites');
if (!fav) {
    window.localStorage.setItem('meal-favurites', '');
}


document.body.addEventListener('click', function (event) {

    if (event.target.getAttribute('class') == 'favourite-button') {
        let items = window.localStorage.getItem('meal-favurites');
        let item = items.split(/(\s+)/);
        item.filter(function (e) {
            return e.trim().length > 0;
        });
        let id = event.target.getAttribute('id');
        if (item.includes(id)) {
            window.alert("Already added to favourites!");
            return;
        }
        items = items + ' ' + id;
        window.localStorage.setItem('meal-favurites', items);
        window.alert("Item added to favourites");
    }
});

