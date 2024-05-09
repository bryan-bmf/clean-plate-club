import { Center, SimpleGrid } from "@chakra-ui/react";
import { v4 as uuid } from 'uuid';
import data from "../data";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	const recipes: any = data.data;

	return (
		<SimpleGrid spacing={4} minChildWidth="200px">
			{recipes.map((recipe: any) => (
				<Center key={uuid()}>
					<RecipeCard data={recipe} />
				</Center>
			))}
		</SimpleGrid>
	);
};

export default Recipes;
