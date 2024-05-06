import { SimpleGrid } from "@chakra-ui/react";
import data from "../data";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	const recipes: any = data;

	return (
		<SimpleGrid spacing={4} minChildWidth="200px">
			{recipes.map((recipe: any) => (
				<RecipeCard data={recipe} />
			))}
		</SimpleGrid>
	);
};

export default Recipes;
