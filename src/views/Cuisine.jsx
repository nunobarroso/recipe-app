import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid } from "../components/styled/Grid.styled";
import { CuisineCard } from "../components/styled/Cuisine-card.styled";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  const cardElements = cuisine.map((recipe) => {
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

export default Cuisine;
