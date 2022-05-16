import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/styled/Button.styled";
import { DetailWrapper } from "../components/styled/DetailWrapper.styled";
import { Info } from "../components/styled/Info.styled";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({extendedIngredients: []});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {

    const fetchDetails = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setDetails(data);
    };

    fetchDetails();

  }, [params.name]);

  const ingredientsList = details.extendedIngredients.map(ingredient => {
    return (
      <li key={ingredient.id}>
        {ingredient.original}
      </li>
    )
  });

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' ?
          <div>
            {/*set html markup as text*/}
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        :
          <ul>
            {ingredientsList}
          </ul>
        }
      </Info>
    </DetailWrapper>
  );
}

export default Recipe;
