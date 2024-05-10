import {
    Button,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import data from "../data";
import { AnyObject } from "../types";

const RecipeForm = () => {
	const [formData, setFormData] = useState<AnyObject>({
		title: "",
		cuisine: "",
		time: "",
		protein: "",
		cookingType: "",
		sourceType: "",
		source: "",
		image: "",
		pageNumber: 0,
	});

	const handleFormData = (e: any) => {
		// radio button doesn't bring back an event
		if (e === "link" || e === "youtube" || e === "book") {
			setFormData({ ...formData, sourceType: e });
		} else setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Container maxW="xl" sx={sx.container}>
			<FormControl>
				<FormLabel>Recipe Name</FormLabel>
				<Input
					name="title"
					sx={sx.field}
					type="text"
					value={formData.title}
					onChange={handleFormData}
				/>

				<FormLabel>Cuisine</FormLabel>
				<Select
					name="cuisine"
					sx={sx.field}
					placeholder="Select a cuisine"
					value={formData.cuisine}
					onChange={handleFormData}
				>
					{data.filterData.cuisine.map((cuisine: string) => (
						<option key={uuid()} value={cuisine}>
							{cuisine}
						</option>
					))}
				</Select>

				<FormLabel>Time to cook</FormLabel>
				<Input
					name="time"
					sx={sx.field}
					type="text"
					value={formData.time}
					onChange={handleFormData}
				/>

				<FormLabel>Protein</FormLabel>
				<Select
					name="protein"
					sx={sx.field}
					placeholder="Select a protein"
					value={formData.protein}
					onChange={handleFormData}
				>
					{data.filterData.protein.map((protein: string) => (
						<option key={uuid()} value={protein}>
							{protein}
						</option>
					))}
				</Select>

				<FormLabel>Cooking Type</FormLabel>
				<Select
					name="cookingType"
					sx={sx.field}
					placeholder="Select a cooking type"
					value={formData.cookingType}
					onChange={handleFormData}
				>
					{data.filterData.cookingType.map((type: string) => (
						<option key={uuid()} value={type}>
							{type}
						</option>
					))}
				</Select>

				<FormLabel>Source Type</FormLabel>
				<RadioGroup
					name="sourceType"
					sx={sx.radio}
					value={formData.sourceType}
					onChange={handleFormData}
				>
					<HStack spacing="12px">
						<Radio value="link">Link</Radio>
						<Radio value="youtube">YouTube</Radio>
						<Radio value="book">Book</Radio>
					</HStack>
				</RadioGroup>
                {/* Only show label for YT and book types */}
				{formData.sourceType !== "link" &&
				formData.sourceType.length > 0 ? (
					<FormLabel>
						{formData.sourceType === "youtube" ? "Youtube Link" : "Title"}
					</FormLabel>
				) : null}
				<Input
					name="source"
					sx={sx.field}
					type="url"
					value={formData.source}
					disabled={formData.sourceType.length === 0}
					onChange={handleFormData}
				/>
				{/* Only show if it's a book */}
				{formData.sourceType === "book" && (
					<>
						<FormLabel>Page Number</FormLabel>
						<Input
							name="pageNumber"
							sx={sx.field}
							type="number"
							value={formData.pageNumber}
							onChange={handleFormData}
							w="100px"
						/>
					</>
				)}

				{/* Only show if it's a link. An API call will populate the others */}
				{formData.sourceType === "link" && (
					<>
						<FormLabel>Image</FormLabel>
						<Input
							name="image"
							sx={sx.field}
							type="url"
							value={formData.image}
							onChange={handleFormData}
						/>
					</>
				)}

				<HStack justify="center" sx={sx.buttons}>
					<Button colorScheme="red">Cancel</Button>
					<Button colorScheme="blue">Submit</Button>
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
		mt: 4,
	},
	radio: {
		mb: 2,
	},
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
