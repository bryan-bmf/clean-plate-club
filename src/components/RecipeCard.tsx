import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Flex,
	Heading,
	Image,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const RecipeCard = (props: any) => {
	const {
		title,
		image,
		cuisine,
		time,
		tags,
		type,
		source,
		author,
		pageNumber,
		bookTitle,
	} = props.data;
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Button for links
	const typeLink = (
		<Link href={source} isExternal>
			<Button variant="solid" colorScheme="blue">
				View recipe
			</Button>
		</Link>
	);

	// Button for videos and books
	const typeOther = (
		<Button variant="solid" colorScheme="blue" onClick={onOpen}>
			View recipe
		</Button>
	);

	const bookModal = (
		<>
			<ModalHeader></ModalHeader>
			<ModalBody>
				<Flex>
					<Image src="https://books.google.com/books/content?id=P4gzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
					<Spacer />
					<Box ml="5px">
						<Heading>{bookTitle}</Heading>
						<Text fontSize="xl">{author}</Text>
						<Text fontSize="md">Page {pageNumber}</Text>
					</Box>
				</Flex>
			</ModalBody>
			<ModalFooter>
				<Button colorScheme="blue" mr={3} onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</>
	);

	const videoModal = (
		<Box ml="-175px">
			<iframe
				width="854"
				height="480"
				src={source}
			></iframe>
		</Box>
	);

	return (
		<>
			{/* CARD */}
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
			{/* MODAL */}
			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay backdropFilter="auto" backdropBlur="2px" />
				<ModalContent>
					{type === "book" ? bookModal : videoModal}
				</ModalContent>
			</Modal>
		</>
	);
};

export default RecipeCard;
