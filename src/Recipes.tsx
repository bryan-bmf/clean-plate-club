import {
	SimpleGrid
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	return (
		<SimpleGrid
			spacing={4}
			templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
		>
			<RecipeCard />
            <RecipeCard />
            <RecipeCard />
		</SimpleGrid>
	);
};

export default Recipes;
