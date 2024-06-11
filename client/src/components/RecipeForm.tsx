import {
	Button,
	Center,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Image,
	Input,
	Radio,
	RadioGroup,
	Select,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import sarten from "../assets/sarten.gif";
import data from "../seed";
import { AnyObject } from "../types";

const RecipeForm = () => {
	const [formData, setFormData] = useState<AnyObject>({
		name: "",
		cuisine: "",
		time: "",
		protein: "",
		cooking_type: "",
		source_type: "",
		page: 0,
		image: "",
		source: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [cuisine, setCuisine] = useState<string>();
	const [protein, setProtein] = useState<string>();
	const [cooking_type, setCookingType] = useState<string>();
	const toast = useToast();

	const handleFormData = (e: any) => {
		// radio button doesn't bring back an event
		if (e === "link" || e === "youtube" || e === "book") {
			setFormData({ ...formData, source_type: e });
		} else setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const createRecipe = async (recipe: AnyObject) => {
		setLoading(true);

		const resp = await fetch("http://127.0.0.1:5000/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(recipe),
		});

		let msg = "";
		if (resp.ok) {
			msg = "Success! Recipe added.";
			toastMsg(msg);
			setTimeout(() => window.location.reload(), 1000);
		} else {
			msg = "Error! Something went wrong.";
			toastMsg(msg);
			setLoading(false);
			return;
		}
	};

	const toastMsg = (msg: string) => {
		return toast({
			title: msg,
			position: "top",
			status: msg.charAt(0) === "S" ? "success" : "error",
			isClosable: true,
		});
	};

	const handleSubmit = () => {
		const recipe = formatForm();
		createRecipe(recipe);
	};

	// format form data for backend
	const formatForm = () => {
		let temp = { ...formData };

		if (formData.source_type === "link")
			temp.source = { link: temp.source, image: temp.image };
		else if (formData.source_type === "youtube") {
			let ytId = temp.source.split("=")[1];
			temp.source = {
				link: temp.source,
				image: "https://i.ytimg.com/vi/" + ytId + "/sddefault.jpg",
			};
		}

		delete temp.image;

		return { ...temp, id: uuid() };
	};

	const fetchFilterData = async () => {
		try {
			const resp = await fetch("http://127.0.0.1:5000/get_filters");
			const respData = await resp.json();

			// use seed data if empty db
			if (respData[0][0] === null) {
				setCuisine(data.filterData[0][1]);
				setProtein(data.filterData[1][1]);
				setCookingType(data.filterData[2][1]);
			} else {
				for (let i = 0; i < respData.length; i++) {
					if (respData[i][0] === "cuisine") {
						setCuisine(respData[i][1]);
					} else if (respData[i][0] === "protein") {
						setProtein(respData[i][1]);
					}
					// cooking type
					else {
						setCookingType(respData[i][1]);
					}
				}
			}
		} catch (error) {
			alert('Error with DB. Please try again.')
		}
	};

	// initial fetch
	useEffect(() => {
		fetchFilterData();
	}, []);

	return (
		<Center>
			{loading ? (
				<Image
					boxSize="500px"
					src={sarten}
					role="img"
					objectFit="contain"
				/>
			) : (
				<VStack sx={sx.form}>
					<Heading>Add new recipe</Heading>
					<FormControl>
						<FormLabel sx={sx.label}>Recipe Name</FormLabel>
						<Input
							name="name"
							type="text"
							value={formData.name}
							onChange={handleFormData}
						/>

						<FormLabel sx={sx.label}>Cuisine</FormLabel>
						<Select
							name="cuisine"
							placeholder="Select a cuisine"
							value={formData.cuisine}
							onChange={handleFormData}
						>
							{cuisine &&
								cuisine.split(",").map((cuisine: string) => (
									<option id="cuisine" value={cuisine} key={uuid()}>
										{cuisine}
									</option>
								))}
						</Select>

						<FormLabel sx={sx.label}>Time to cook</FormLabel>
						<Input
							name="time"
							type="text"
							value={formData.time}
							onChange={handleFormData}
						/>

						<FormLabel sx={sx.label}>Protein</FormLabel>
						<Select
							name="protein"
							placeholder="Select a protein"
							value={formData.protein}
							onChange={handleFormData}
						>
							{protein &&
								protein.split(",").map((protein: string) => (
									<option id="protein" value={protein} key={uuid()}>
										{protein}
									</option>
								))}
						</Select>

						<FormLabel sx={sx.label}>Cooking Type</FormLabel>
						<Select
							name="cooking_type"
							placeholder="Select a cooking type"
							value={formData.cooking_type}
							onChange={handleFormData}
						>
							{cooking_type &&
								cooking_type.split(",").map((cookingType: string) => (
									<option
										id="cookingType"
										value={cookingType}
										key={uuid()}
									>
										{cookingType}
									</option>
								))}
						</Select>

						<FormLabel sx={sx.label}>Source Type</FormLabel>
						<RadioGroup
							name="source_type"
							sx={sx.radio}
							value={formData.source_type}
							onChange={handleFormData}
						>
							<HStack spacing="12px">
								<Radio value="link">Link</Radio>
								<Radio value="youtube">YouTube</Radio>
								<Radio value="book">Book</Radio>
							</HStack>
						</RadioGroup>
						{/* Only show label for YT and book types */}
						{formData.source_type !== "link" &&
						formData.source_type.length > 0 ? (
							<FormLabel sx={sx.label}>
								{formData.source_type === "youtube"
									? "Youtube Link"
									: "Title"}
							</FormLabel>
						) : null}
						<Input
							name="source"
							type="url"
							value={formData.source}
							disabled={formData.source_type.length === 0}
							onChange={handleFormData}
						/>
						{/* Only show if it's a book */}
						{formData.source_type === "book" && (
							<>
								<FormLabel sx={sx.label}>Page Number</FormLabel>
								<Input
									name="page"
									type="number"
									value={formData.page}
									onChange={handleFormData}
									w="100px"
								/>
							</>
						)}

						{/* Only show if it's a link. An API call will populate the others */}
						{formData.source_type === "link" && (
							<>
								<FormLabel sx={sx.label}>Image</FormLabel>
								<Input
									name="image"
									type="url"
									value={formData.image}
									onChange={handleFormData}
								/>
							</>
						)}

						<HStack justify="center" sx={sx.buttons}>
							<Button colorScheme="red">Cancel</Button>
							<Button colorScheme="blue" onClick={handleSubmit}>
								Submit
							</Button>
						</HStack>
					</FormControl>
				</VStack>
			)}
		</Center>
	);
};

const sx = {
	label: {
		mt: 4,
	},
	buttons: {
		p: 4,
	},
	radio: {
		mb: 2,
	},
	form: {
		width: "40%",
	},
	loading: {
		background: "rgba(0, 0, 0, 0.4)",
		width: "100%",
		height: "100%",
		position: "absolute",
	},
};

export default RecipeForm;
