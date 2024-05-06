import { SimpleGrid } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	return (
		<SimpleGrid
			spacing={4}
			minChildWidth='200px'
		>
			<RecipeCard />
			<RecipeCard />
			<RecipeCard />
			<RecipeCard />
			<RecipeCard />
			<RecipeCard />
			<RecipeCard />

		</SimpleGrid>
	);
};

export default Recipes;
