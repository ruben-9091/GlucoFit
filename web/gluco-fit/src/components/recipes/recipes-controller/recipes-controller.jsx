import RecipesCategory from "../recipes-category/recipes-category";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as RecipesService from "../../../services/recipes-service/recipes-service"; 
//implementar loader si da tiempo


export function AllRecipesController() {
    const [recipes, setRecipes] = useState(null); 
    const { category } = useParams(); 

    useEffect(()=> {
        async function fetchRecipes() {
            try {
                const data = await RecipesService.listRecipes(category); 
                setRecipes(data);

            } catch (error) {
                console.error("No se han encontrado recetas", error)
            }
        }
        fetchRecipes(); 
    }, [category]); 

    if (!recipes){
        return <p>Cargando recetas...</p>; 
    } else {
        return (
            <RecipesCategory/>
        )
    }
}; 

export default AllRecipesController; 