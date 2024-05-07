import { Box, HStack } from "@chakra-ui/react";

const Filters = () => {
	return (
		<HStack sx={sx.filtersRow} justify="center">
			<Box sx={sx.filters}>
				<select>
					<option value="option1">Cuisine</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</select>
			</Box>
            <Box sx={sx.filters}>
				<select>
					<option value="option1">Protein</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</select>
			</Box>
            <Box sx={sx.filters}>
				<select>
					<option value="option1">Cooking Type</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</select>
			</Box>
		</HStack>
	);
};

const sx = {
	filtersRow: {
		padding: 4,
		// w: "500px",
	},
	filters: {
		padding: 2,
	},
};

export default Filters;
