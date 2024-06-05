const data = [
	{
		title: 'Arroz con pollo',
		cuisine: 'Criollo',
		time: '1 hour',
		image: 'https://www.elsabor.com.ec/wp-content/uploads/2022/02/arroz-pollo-700x525.jpg',
		tags: ['Pollo', 'Stovetop'],
        type: 'book',
        bookAuthor: 'Babby',
        pageNumber: 25,
        bookTitle: 'Basics with Babish',
        bookImage: 'https://books.google.com/books/content?id=P4gzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
	},
	{
		title: 'Shrimp Scampi',
		cuisine: 'Italian',
		time: '45 minutes',
		image: 'https://static01.nyt.com/images/2022/06/02/dining/ShrimpScampi_thumb/ShrimpScampi_thumb-square640.jpg',
		tags: ['Shrimp', 'Stovetop'],
        type: 'link',
        source: 'https://cooking.nytimes.com/recipes/9101-classic-shrimp-scampi'
	},
	{
		title: 'Kimchi Fried Rice',
		cuisine: 'Asian',
		time: '30 minutes',
		image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2023-12-kimchi-fried-rice%2Fkimchi-fried-rice-197',
		tags: ['Veggie', 'Stir-fry'],
        type: 'youtube',
        source: 'https://www.youtube.com/embed/tgbNymZ7vqY'
	},
	{
		title: 'Cochinita Pibil',
		cuisine: 'Mexican',
		time: '3 hours',
		image: 'https://greenhealthycooking.com/wp-content/uploads/2021/04/Cochinita-Pibil-Closeup.jpg',
		tags: ['Horno', 'Cerdo'],
	},
	{
		title: 'Beef Burgundy',
		cuisine: 'French',
		time: '3 hours',
		image: 'https://www.thespruceeats.com/thmb/gEH_GL4ianQny5H8tfa_dBbF6qc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-classic-beef-bourguignon-recipe-7498352-hero-A-f3d470b196ee4c97acb778bc068eec13.jpg',
		tags: ['Carne', 'Guisado'],
	},
];

const filterData = {
    cuisine: ['Asian', 'Criollo', 'French', 'Italian', 'Mexican'],
    protein: ['Beef', 'Chicken', 'Pork', 'Seafood', 'Turkey', 'Veggie'], 
    cookingType: ['Air fryer', 'Horno', 'Guisado', 'Stir-fry', 'Stovetop']
}

export default {data, filterData}; 
