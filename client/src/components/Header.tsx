import { Center, Heading } from "@chakra-ui/react";
import "../App.css";

const Header = () => {
	return (
		<Center sx={sx.headerParent}>
			<Heading as="h1" size="4xl" noOfLines={1} sx={sx.header}>
				Clean Plate Club
			</Heading>
		</Center>
	);
};

export default Header;

const sx = {
	header: {
		borderBottom: "1px solid black",
		width: "90%",
		textAlign: "center",
        fontFamily: "Motterdam",
        padding: "6"
	},
	headerParent: {
		paddingBottom: "25px",
	},
};
