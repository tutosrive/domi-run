import { CiCoffeeCup, CiIceCream, CiPizza, CiGrid41 } from "react-icons/ci";
import { FaFish, FaHamburger } from "react-icons/fa";

export const headerLinks = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Menu", to: "/menu" },
  { id: 3, title: "About US", to: "/about" },
];

export const loginFormData = [
  { id: 1, title: "Email", name: "email", type: "text" },
  { id: 2, title: "Password", name: "password", type: "password" },
];

export const sliderImages = []; // Put home images

export const categoryData = [
  { id: 1, title: "All", category: "all", qty: 1, icon: CiGrid41 },
  { id: 2, title: "Burger", category: "burger", qty: 1, icon: FaHamburger },
  { id: 3, title: "Pizza", category: "pizza", qty: 1, icon: CiPizza },
  { id: 4, title: "Fish", category: "fish", qty: 1, icon: FaFish },
  { id: 5, title: "Ice Cream", category: "iceCream", qty: 1, icon: CiIceCream },
  { id: 6, title: "Drinks", category: "drink", qty: 1, icon: CiCoffeeCup },
];

export const ourTeamData = [
  { id: 1, image: teamImage1, name: "William Smith", title: "Manager" },
  { id: 2, image: teamImage2, name: "John Doe", title: "Chef" },
  { id: 3, image: teamImage3, name: "Bradd  L.", title: "Chef" },
];

export const ClientsData = [
  { id: 1, description: "“Forget the trendy pizza shops, This hidden spot makes the best New York-style pizza slice in naples”", name: "Stephen Tindle", image: clientImage1 },
  { id: 2, description: "“I would be lost without restaurant. I would like to personally thank you for your outstanding product.”", name: "John Doe", image: clientImage2 },
  { id: 3, description: "“I am completely blown away. I would also like to say thank you to all your staff. It's really wonderful.”", name: "Clara", image: clientImage3 },
  { id: 4, description: "“Forget the trendy pizza shops, This hidden spot makes the best New York-style pizza slice in naples”", name: "Nina Margaret", image: clientImage4 },
];
