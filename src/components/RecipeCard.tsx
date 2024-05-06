import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	Center,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";

import data from "../data";

const RecipeCard = () => {
	const recipes: any = data;
	console.log(recipes);

	return (
		<Card maxW="xs">
			<CardBody>
				<Image src={recipes.image} borderRadius="lg" />
				<Stack mt="6" spacing="3">
					<Heading size="md">{recipes.title}</Heading>
					<Text>Cuisine: {recipes.cuisine}</Text>
					<Text>Time: {recipes.time}</Text>
					<Center>
						<Stack direction="row" spacing="3">
							{recipes.tags.map((tag:any) => (
								<Badge colorScheme="orange">{tag}</Badge>
							))}
						</Stack>
					</Center>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<Button variant="solid" colorScheme="blue">
					View recipe
				</Button>
			</CardFooter>
		</Card>
	);
};

export default RecipeCard;
