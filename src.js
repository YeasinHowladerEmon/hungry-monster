//part of 1!  click , function
document.getElementById("src-btn").addEventListener("click", function () {
  const inputValue = document.getElementById("input-typ");
  mealDetail(inputValue.value);
});

function mealDetail (meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
    .catch(error => foundError(error))
  
}

const displayMeals = meals => {
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "";

  meals.forEach( meal => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    const mealInfo = `
        <div onclick="getIngridDetail(${meal.idMeal})" class="card col-md-3 mt-5" style="width: 18rem;">
           <img src="${meal.strMealThumb}" class="card-img-top">
           <div class="card-body">
              <h3>${meal.strMeal}</h3>
              </div>
          </div>
            `;
    mealDiv.innerHTML = mealInfo;
    mealsDiv.appendChild(mealDiv);
  });
};

 //part of 2! , indgridDeatails
const getIngridDetail = idMeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then(res => res.json())
    .then(data => IngridDetail(data.meals[0]));
};

const IngridDetail = idMeals => {
  const IngridDetail = document.getElementById("display-Ing-details");
  IngridDetail.innerHTML = `
      <div class="card col-md-3 "  style="width: 18rem;">
            <img src="${idMeals.strMealThumb}" class="card-img-top">
            <div class="card-body">
                <h3>${idMeals.strMeal}</h3>
                <h5>Ingredients</h5>
                  <ul >
                    <li>${idMeals.strIngredient1}</li>
                    <li>${idMeals.strIngredient2}</li>
                    <li>${idMeals.strIngredient3}</li>
                    <li>${idMeals.strIngredient4}</li>
                    <li>${idMeals.strIngredient5}</li>
                    <li>${idMeals.strIngredient6}</li>
                    <li>${idMeals.strIngredient7}</li>
                    <li>${idMeals.strIngredient8}</li>
                    <li>${idMeals.strIngredient9}</li>
                    <li>${idMeals.strIngredient10}</li>
                  </ul>
                </div>
            </div>`;
};
 //part of 3, bonuspart
const foundError = error => {
  const notFoundError = document.getElementById('not-found-error');
  notFoundError.innerText = "Sorry!We don't find any meal..!!";
}
