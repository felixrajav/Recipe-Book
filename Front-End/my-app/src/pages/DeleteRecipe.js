import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();


  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
      alert("Recipe deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      <p>Are you sure you want to delete {recipe.name}?</p>
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default DeleteRecipe;
