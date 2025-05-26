// Sample product data for development purposes
export const dummyProducts = [
  {
    id: "1",
    name: "Organic Hemp Fiber",
    description: "100% organic hemp fiber for sustainable textile production. Our hemp is grown without pesticides and requires minimal water.",
    price: 29.99,
    category: "raw-materials",
    stock: 50,
    image: "https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller1",
    sellerName: "Green Textiles Co.",
    isSustainable: true,
    sustainabilityInfo: "Grown using organic farming methods with 50% less water than conventional cotton. Biodegradable and compostable.",
    status: "approved",
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Biodiesel Starter Kit",
    description: "Everything you need to start producing your own biodiesel from vegetable oil waste. Perfect for small-scale operations.",
    price: 199.99,
    category: "biofuel",
    stock: 15,
    image: "https://images.pexels.com/photos/9875431/pexels-photo-9875431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller2",
    sellerName: "EcoFuel Solutions",
    isSustainable: true,
    sustainabilityInfo: "Reduces carbon emissions by up to 78% compared to petroleum diesel. Made from recycled materials.",
    status: "approved",
    createdAt: "2025-01-20T14:45:00Z"
  },
  {
    id: "3",
    name: "Solar Panel Kit - 500W",
    description: "Complete 500W solar panel kit with high-efficiency monocrystalline panels, inverter, and mounting hardware.",
    price: 649.99,
    category: "renewable-energy",
    stock: 8,
    image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller1",
    sellerName: "Green Textiles Co.",
    isSustainable: true,
    sustainabilityInfo: "Panels manufactured using recycled silicon and low-impact production methods. 25-year lifespan with 95% recyclability.",
    status: "approved",
    createdAt: "2025-01-25T09:15:00Z"
  },
  {
    id: "4",
    name: "Bamboo Cutlery Set",
    description: "Reusable bamboo cutlery set with knife, fork, spoon, and carrying case. Perfect for reducing plastic waste.",
    price: 14.99,
    category: "eco-friendly",
    stock: 100,
    image: "https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller3",
    sellerName: "EcoLife Products",
    isSustainable: true,
    sustainabilityInfo: "Made from rapidly renewable bamboo. Biodegradable and compostable at end of life. Replaces hundreds of plastic utensils.",
    status: "approved",
    createdAt: "2025-01-30T16:20:00Z"
  },
  {
    id: "5",
    name: "Algae Biofuel Starter Culture",
    description: "Live algae culture for biofuel production. Includes everything needed to start growing your own sustainable fuel source.",
    price: 89.99,
    category: "biofuel",
    stock: 20,
    image: "https://images.pexels.com/photos/3735202/pexels-photo-3735202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller2",
    sellerName: "EcoFuel Solutions",
    isSustainable: true,
    sustainabilityInfo: "Produces oxygen while growing and captures carbon. Creates renewable fuel with minimal land use requirements.",
    status: "approved",
    createdAt: "2025-02-05T11:30:00Z"
  },
  {
    id: "6",
    name: "Recycled Plastic Pellets - 10kg",
    description: "High-quality recycled HDPE plastic pellets for manufacturing. Perfect for creating new sustainable products.",
    price: 45.99,
    category: "raw-materials",
    stock: 35,
    image: "https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    sellerId: "seller4",
    sellerName: "RecycleTech Industries",
    isSustainable: true,
    sustainabilityInfo: "Made from 100% post-consumer plastic waste. Diverts plastic from landfills and oceans. 60% lower carbon footprint than virgin plastic.",
    status: "approved",
    createdAt: "2025-02-10T13:45:00Z"
  }
];

// Function to initialize dummy data
export const initializeDummyData = () => {
  // Check if products exist in localStorage
  const existingProducts = localStorage.getItem('products');
  
  // Only initialize if no products exist
  if (!existingProducts || JSON.parse(existingProducts).length === 0) {
    localStorage.setItem('products', JSON.stringify(dummyProducts));
  }
};