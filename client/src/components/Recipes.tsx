import {
	Box,
	Button,
	Center,
	Container,
	HStack,
	Heading,
	SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import data from "../data";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	const filterData: any = data.filterData;

	const [recipes, setRecipes] = useState<Array<any>>(data.data);
	const [filteredRecipes, setFilteredRecipes] = useState<Array<any>>(
		data.data
	);
	const [cuisine, setCuisine] = useState("");
	const [protein, setProtein] = useState("");
	const [cookingType, setCookingType] = useState("");

	const handleRecipeFilter = () => {
		//perform all filters at the same time
		let temp = recipes.filter((recipe) => {
			return (
				(!cuisine || cuisine === recipe.cuisine) &&
				(!protein || protein === recipe.tags[0]) &&
				(!cookingType || cookingType === recipe.tags[1])
			);
		});

		setFilteredRecipes(temp);
	};

	const handleClearFilters = () => {
		setCuisine("");
		setProtein("");
		setCookingType("");
	}

	const fetchData = async () => {
		const resp = await fetch("http://127.0.0.1:5000");
		console.log(await resp.text())

	};

	useEffect(() => {
		fetchData()
		handleRecipeFilter();
	}, [cuisine, protein, cookingType]);

	return (
		<Container sx={sx.container}>
			{/* FILTERS */}
			<HStack sx={sx.filtersRow} justify="center">
				<select
					name="cuisine"
					style={sx.filters}
					onChange={(e: any) => setCuisine(e.target.value)}
					value={cuisine}
				>
					<option id="cuisine" value="">
						Cuisine
					</option>
					{filterData.cuisine.map((cuisine: string) => (
						<option id="cuisine" value={cuisine} key={uuid()}>
							{cuisine}
						</option>
					))}
				</select>
				<select
					name="protein"
					style={sx.filters}
					onChange={(e: any) => setProtein(e.target.value)}
					value={protein}
				>
					<option id="protein" value="">
						Protein
					</option>
					{filterData.protein.map((protein: string) => (
						<option id="protein" value={protein} key={uuid()}>
							{protein}
						</option>
					))}
				</select>
				<select
					name="cookingType"
					style={sx.filters}
					onChange={(e: any) => setCookingType(e.target.value)}
					value={cookingType}
				>
					<option id="cookingType" value="">
						Cooking Type
					</option>
					{filterData.cookingType.map((cookingType: string) => (
						<option id="cookingType" value={cookingType} key={uuid()}>
							{cookingType}
						</option>
					))}
				</select>
			</HStack>
			{/* RECIPES */}
			<SimpleGrid spacing={4} minChildWidth="200px">
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((recipe: any) => (
						<Center key={uuid()}>
							<RecipeCard data={recipe} />
						</Center>
					))
				) : (
					<Box>
						<Heading>
							No recipes match this criteria. Try again!!!
						</Heading>
						<Button sx={sx.clearFilters} colorScheme="blue" onClick={handleClearFilters}>Clear filters</Button>
					</Box>
				)}
			</SimpleGrid>
		</Container>
	);
};

const sx = {
	filtersRow: {
		padding: 4,
	},
	filters: {
		padding: 7,
		borderRadius: "5px",
	},
	clearFilters: {
		mt: "20px",
	},
	container: {
		maxW: "5xl",
		textAlign: "center"
	}
};

export default Recipes;
