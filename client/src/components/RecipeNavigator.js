import React from 'react'

const RecipeNavigator = (props) => {
    return props.recipes.map(recipe => <li className={recipe.id === props.selected.id ? "seclected" : undefined }>{recipe.name}</li>)
}

const RecipeListItem = (name, isSelected) => {
    return <li className={isSelected ? "seclected" : undefined }>{name}</li>
}