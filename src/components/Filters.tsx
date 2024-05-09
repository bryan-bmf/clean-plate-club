import { HStack } from "@chakra-ui/react";
import { v4 as uuid } from 'uuid';
import data from "../data";

const Filters = () => {
	const filterData: any = data.filterData;

	return (
		<HStack sx={sx.filtersRow} justify="center">
			<select style={sx.filters}>
				<option value="">Cuisine</option>
				{filterData.cuisine.map((cuisine: string) => (
					<option value={cuisine} key={uuid()}>{cuisine}</option>
				))}
			</select>
			<select style={sx.filters}>
				<option value="">Protein</option>
				{filterData.protein.map((protein: string) => (
					<option value={protein} key={uuid()}>{protein}</option>
				))}
			</select>
			<select style={sx.filters}>
				<option value="">Cooking Type</option>
				{filterData.cookingType.map((cookingType: string) => (
					<option value={cookingType} key={uuid()}>{cookingType}</option>
				))}
			</select>
		</HStack>
	);
};

const sx = {
	filtersRow: {
		padding: 4,
	},
	filters: {
		padding: 7,
		borderRadius: "5px",
	},
};

export default Filters;
