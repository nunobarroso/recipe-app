import { useEffect, useState } from "react";
import { Wrapper, Card, Gradient } from "./styled/Card.styled";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const localStorageData = localStorage.getItem("veggie");

    if (localStorageData) {
      setVeggie(JSON.parse(localStorageData));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await response.json();
      setVeggie(data.recipes);
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
    }
  };

  const veggieElements = veggie.map((recipe) => {
    return (
      <SplideSlide key={recipe.id}>
        <Card>
          <Link to={"/recipe/" + recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            <Gradient />
          </Link>
        </Card>
      </SplideSlide>
    );
  });

  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
        }}
      >
        {veggieElements}
      </Splide>
    </Wrapper>
  );
}

export default Veggie;
