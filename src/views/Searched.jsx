import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid } from "../components/styled/Grid.styled";
import { CuisineCard } from "../components/styled/Cuisine-card.styled";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const cardElements = searchedRecipes.map((recipe) => {
    return (
      <CuisineCard key={recipe.id}>
        <Link to={"/recipe/" + recipe.id}>
          <img src={recipe.image} alt={recipe.title} />
          <h4>{recipe.title}</h4>
        </Link>
      </CuisineCard>
    );
  });

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cardElements}
    </Grid>
  );
}

export default Searched;
