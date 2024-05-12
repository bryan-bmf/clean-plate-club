import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const RecipeCard = (props: any) => {
	const { title, image, cuisine, time, tags, type, link } = props.data;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const typeLink = (
		<Link href={link} isExternal>
			<Button variant="solid" colorScheme="blue">
				View recipe
			</Button>
		</Link>
	);

	const typeOther = (
		<Button variant="solid" colorScheme="blue" onClick={onOpen}>
			View recipe
		</Button>
	);

	return (
		<>
			<Card maxW="250px" maxH="lg">
				<CardBody>
					<Image src={image} borderRadius="lg" boxSize="200px" />
					<Stack mt="6" spacing="3">
						<Heading size="md">{title}</Heading>
						<Text>Cuisine: {cuisine}</Text>
						<Text>Time: {time}</Text>
						<Stack direction="row" spacing="3" justify="center">
							{tags.map((tag: string) => (
								<Badge colorScheme="orange" key={uuid()}>
									{tag}
								</Badge>
							))}
						</Stack>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter justify="center">
					{type === "link" ? typeLink : typeOther}
				</CardFooter>
			</Card>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>dfjkenfkjewn</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default RecipeCard;
