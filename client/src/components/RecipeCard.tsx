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
	Stack,
	Text,
	useDisclosure
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const RecipeCard = (props: any) => {
	const {
		name,
		image,
		cuisine,
		time,
		protein,
		cooking_type,
		author,
		page,
		title,
		cover_image,
		link
	} = props.data;
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Button for links
	const typeLink = (
		<Link href={link} isExternal>
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
					<Image src={cover_image} />
					<Box ml="5px" p="4">
						<Heading size="lg">{title}</Heading>
						<Text fontSize="xl">{author}</Text>
						<Text fontSize="md">Page {page}</Text>
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
			<iframe width="854" height="480" src={link}></iframe>
		</Box>
	);

	return (
		<>
			{/* CARD */}
			<Card maxW="250px" maxH="lg" minH="lg">
				<CardBody>
				{image && <Image src={image} borderRadius="lg" boxSize="200px" />}
				{cover_image && <Image src={cover_image} borderRadius="lg" boxSize="200px" />}					
					<Stack mt="6" spacing="3">
						<Heading size="md" noOfLines={2}>{name}</Heading>
						<Text>Cuisine: {cuisine}</Text>
						<Text>Time: {time}</Text>
						<Stack direction="row" spacing="3" justify="center">
							<Badge colorScheme="orange" key={uuid()}>
								{protein}
							</Badge>
							<Badge colorScheme="orange" key={uuid()}>
								{cooking_type}
							</Badge>
						</Stack>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter justify="center">
					{image !== null ? typeLink : typeOther}
				</CardFooter>
			</Card>
			{/* MODAL */}
			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay backdropFilter="auto" backdropBlur="2px" />
				<ModalContent>
					{author !== null ? bookModal : videoModal}
				</ModalContent>
			</Modal>
		</>
	);
};

export default RecipeCard;
