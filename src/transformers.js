const Recipe =  require("./model/Recipe");

const transformRecipeResponse = (response) => {
    if(response !== undefined && response.meals !== undefined && Array.isArray(response.meals)) {
        return response.meals.map(recipe => transformRecipeObject(recipe))
    }
}

const transformRecipeObject = (recipe) => {
    const id = recipe.idMeal;
    const name = recipe.strMeal
    const directions = recipe.strInstructions
    const ingredients = filterKeysBySubString(recipe,"strIngredient")
    const measures = filterKeysBySubString(recipe, "strMeasure")
    const concatenateIngredientAndMeasure = (ingredient,index) => {
        const isMeasureAvailable = measures.length > index;
        return isMeasureAvailable ? `${measures[index]} ${ingredient}` : ingredient
    }
    const ingredientsAndMeasures = ingredients.map(concatenateIngredientAndMeasure)

    return new Recipe(id, name, ingredientsAndMeasures, directions)
}

const filterKeysBySubString = (object, substring) => {
    return Object.keys(object)
        .filter(key => key.includes(substring))
        .reduce((array, key) => {
            if(object[key] !== "") {
                array.push(object[key])
            }
            return array
        }, []);
}

module.exports = transformRecipeResponse