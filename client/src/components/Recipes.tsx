import {
	Box,
	Button,
	Center,
	Container,
	HStack,
	Heading,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import sarten from "../assets/sarten.gif";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
	const [recipes, setRecipes] = useState<Array<any>>();
	const [filterData, setFilterData] = useState<Array<any>>();
	const [filteredRecipes, setFilteredRecipes] = useState<Array<any>>();
	const [cuisine, setCuisine] = useState("");
	const [protein, setProtein] = useState("");
	const [cookingType, setCookingType] = useState("");
	const [loading, setLoading] = useState<boolean>(true);

	const handleRecipeFilter = () => {
		//perform all filters at the same time
		let temp =
			recipes &&
			recipes.filter((recipe) => {
				return (
					(!cuisine || cuisine === recipe.cuisine) &&
					(!protein || protein === recipe.protein) &&
					(!cookingType || cookingType === recipe.cooking_type)
				);
			});

		setFilteredRecipes(temp);
	};

	const handleClearFilters = () => {
		setCuisine("");
		setProtein("");
		setCookingType("");
	};

	const fetchData = async () => {
		setLoading(true);
		const resp = await fetch("http://127.0.0.1:5000/get_recipes");
		const respData = await resp.json();

		setRecipes(respData[0][0]);
		setFilteredRecipes(respData[0][0]);

		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const fetchFilterData = async () => {
		setLoading(true);
		const resp = await fetch("http://127.0.0.1:5000/get_filters");
		const respData = await resp.json();

		setFilterData(respData);

		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	// handle filters
	useEffect(() => {
		handleRecipeFilter();
	}, [cuisine, protein, cookingType]);

	// initial fetch
	useEffect(() => {
		fetchData();
		fetchFilterData();
	}, []);

	return (
		<Center p="4">
			{loading ? (
				<Image
					boxSize="500px"
					src={sarten}
					role="img"
					objectFit="contain"
				/>
			) : (
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
							{filterData &&
								filterData[1][1].split(",").map((cuisine: string) => (
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
							{filterData &&
								filterData[0][1].split(",").map((protein: string) => (
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
							{filterData &&
								filterData[2][1]
									.split(",")
									.map((cookingType: string) => (
										<option
											id="cookingType"
											value={cookingType}
											key={uuid()}
										>
											{cookingType}
										</option>
									))}
						</select>
					</HStack>
					{/* RECIPES */}
					<SimpleGrid spacing={4} minChildWidth="200px">
						{filteredRecipes && filteredRecipes.length > 0 ? (
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
								<Button
									sx={sx.clearFilters}
									colorScheme="blue"
									onClick={handleClearFilters}
								>
									Clear filters
								</Button>
							</Box>
						)}
					</SimpleGrid>
				</Container>
			)}
		</Center>
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
		textAlign: "center",
	},
};

export default Recipes;
