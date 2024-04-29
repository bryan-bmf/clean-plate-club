import { Center, Heading } from "@chakra-ui/react";

const Header = () => {
    return (
        <Center>
			<Heading as="h1" size="4xl" noOfLines={1} sx={sx.header}>
				Clean Plate Club
			</Heading>
		</Center>
    )
}

export default Header;

const sx = {
    header: {
        borderBottom: "1px solid black",
        paddingBottom: "10px",
        width: "90%",
        textAlign: "center"
    }
}