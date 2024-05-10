import {
    Button,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
} from "@chakra-ui/react";
import data from "../data";

const RecipeForm = () => {
	return (
		<Container maxW="xl" sx={sx.container}>
			<FormControl>
				<FormLabel>Recipe Name</FormLabel>
				<Input sx={sx.field} type="text" />

				<FormLabel>Cuisine</FormLabel>
				<Select sx={sx.field} placeholder="Select a cuisine">
					{data.filterData.cuisine.map((cuisine: string) => (
						<option value={cuisine}>{cuisine}</option>
					))}
				</Select>

				<FormLabel>Time to cook</FormLabel>
				<Input sx={sx.field} type="text" />

				<FormLabel>Protein</FormLabel>
				<Select sx={sx.field} placeholder="Select a protein">
					{data.filterData.protein.map((protein: string) => (
						<option value={protein}>{protein}</option>
					))}
				</Select>

				<FormLabel>Cooking Type</FormLabel>
				<Select sx={sx.field} placeholder="Select a cooking type">
					{data.filterData.cookingType.map((type: string) => (
						<option value={type}>{type}</option>
					))}
				</Select>

				<FormLabel>Image</FormLabel>
				<Input sx={sx.field} type="url" />

				<FormLabel>Source</FormLabel>
				<Input sx={sx.field} type="url" />

				<HStack justify="center" sx={sx.buttons}>
					<Button
						colorScheme="red"
					>
						Cancel
					</Button>
					<Button
						colorScheme="blue"
					>
						Submit
					</Button>
				</HStack>
			</FormControl>
		</Container>
	);
};

const sx = {
	field: {
		mb: 4,
	},
	container: {
		padding: 4,
	},
    buttons: {
        mt: 4
    }
};

export default RecipeForm;

/*

recipe name

cuisine

time

protein

cooking type

image (link)

source (link, youtube, libro)

*/
