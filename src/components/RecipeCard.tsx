import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";


const RecipeCard = (props: any) => {
    const {title, image, cuisine, time, tags} = props.data; 

	return (
		<Card maxW="250px" maxH="lg">
			<CardBody>
				<Image src={image} borderRadius="lg" boxSize="200px" />
				<Stack mt="6" spacing="3">
					<Heading size="md">{title}</Heading>
					<Text>Cuisine: {cuisine}</Text>
					<Text>Time: {time}</Text>
					<Stack direction="row" spacing="3" justify="center">
						{tags.map((tag: string) => (
							<Badge colorScheme="orange">{tag}</Badge>
						))}
					</Stack>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter justify="center">
				<Button variant="solid" colorScheme="blue">
					View recipe
				</Button>
			</CardFooter>
		</Card>
	);
};

export default RecipeCard;
