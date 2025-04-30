import { Categories } from "../utils/categories";

export interface productProps {
  name: string;
  price: number;
  description: string;
  image: string;
  category: typeof Categories[number]["name"]; // Clothes | Shoes | Bags | Accessories | Electronics | Beauty
  rating: number;
  id: string;
}

export const fakeProducts: productProps[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 19000,
    description: "Comfortable and stylish white t-shirt made from 100% cotton.",
    image: "https://images.pexels.com/photos/8148576/pexels-photo-8148576.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Clothes",
    rating: 4.3
  },
  {
    id: "2",
    name: "Running Sneakers",
    price: 58000,
    description: "Lightweight sneakers designed for maximum performance.",
    image: "https://images.pexels.com/photos/7880010/pexels-photo-7880010.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Shoes",
    rating: 4.6
  },
  {
    id: "3",
    name: "Leather Shoulder Bag",
    price: 87000,
    description: "Elegant leather bag perfect for everyday use.",
    image: "https://images.pexels.com/photos/15059375/pexels-photo-15059375/free-photo-of-hand-of-unrecognizable-person-putting-laptop-in-leather-bag-on-a-beige-background.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Bags",
    rating: 4.5
  },
  {
    id: "4",
    name: "Smart Watch X",
    price: 125000,
    description: "Track your fitness and notifications with this smart watch.",
    image: "https://images.pexels.com/photos/14691508/pexels-photo-14691508.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    rating: 4.2
  },
  {
    id: "5",
    name: "Red Lipstick Matte",
    price: 14500,
    description: "Long-lasting matte lipstick for a bold look.",
    image: "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Beauty",
    rating: 4.7
  },
  {
    id: "6",
    name: "Gold Hoop Earrings",
    price: 23000,
    description: "Timeless hoop earrings for any occasion.",
    image: "https://images.pexels.com/photos/12144803/pexels-photo-12144803.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories",
    rating: 4.8
  },
  {
    id: "7",
    name: "Wireless Earbuds",
    price: 47000,
    description: "High-quality sound with noise cancellation.",
    image: "https://images.pexels.com/photos/5081399/pexels-photo-5081399.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    rating: 4.4
  },
  {
    id: "8",
    name: "Denim Jacket",
    price: 71000,
    description: "Stylish denim jacket for any season.",
    image: "https://i.pinimg.com/474x/d2/93/21/d29321e5f167df4a05968e6bad5964f1.jpg",
    category: "Clothes",
    rating: 4.1
  },
  {
    id: "9",
    name: "Sports Watch",
    price: 41000,
    description: "Durable sports watch with water resistance.",
    image: "https://i.pinimg.com/474x/24/3f/5a/243f5ad4a2bd3dcd065486fc2a63a083.jpg",
    category: "Accessories",
    rating: 4.0
  },
  {
    id: "10",
    name: "Moisturizing Face Cream",
    price: 21000,
    description: "Hydrates and smooths your skin daily.",
    image: "https://i.pinimg.com/474x/ca/b5/96/cab596c0a69f977b62071985ae18f01c.jpg",
    category: "Beauty",
    rating: 4.6
  },
  {
    id: "11",
    name: "Silk Scarf",
    price: 18000,
    description: "Elegant silk scarf with a vibrant print.",
    image: "https://i.pinimg.com/474x/94/ca/eb/94caeb1ad863c1cdc993b3b1c4b34f90.jpg",
    category: "Accessories",
    rating: 4.3
  },
  {
    id: "12",
    name: "Casual Canvas Shoes",
    price: 36000,
    description: "Perfect everyday canvas shoes in neutral colors.",
    image: "https://i.pinimg.com/474x/3d/60/fb/3d60fb40096b590f859fa51d9be1393a.jpg",
    category: "Shoes",
    rating: 4.5
  },
  {
    id: "13",
    name: "Compact Mirrorless Camera",
    price: 280000,
    description: "Take stunning photos with this lightweight camera.",
    image: "https://i.pinimg.com/474x/2b/d5/86/2bd5864efcb238d25314775cfca05565.jpg",
    category: "Electronics",
    rating: 4.7
  },
  {
    id: "14",
    name: "Compact Crossbody Bag",
    price: 55000,
    description: "Small, chic crossbody bag for daily use.",
    image: "https://i.pinimg.com/474x/39/91/1b/39911bdc1e475795e0715b2d22dfee65.jpg",
    category: "Bags",
    rating: 4.2
  },
  {
    id: "15",
    name: "Floral Dress",
    price: 68000,
    description: "A lightweight floral dress perfect for summer.",
    image: "https://i.pinimg.com/474x/7f/00/f9/7f00f911f25dd1c834cae1c5ad61d3b4.jpg",
    category: "Clothes",
    rating: 4.6
  },
  {
    id: "16",
    name: "Bluetooth Speaker",
    price: 43000,
    description: "Portable speaker with strong bass and Bluetooth 5.0.",
    image: "https://i.pinimg.com/474x/34/4a/1f/344a1fcbcbce709a29f22445536e120b.jpg",
    category: "Electronics",
    rating: 4.5
  },
  {
    id: "17",
    name: "Hydrating Lip Balm",
    price: 8500,
    description: "Nourishing balm to keep your lips soft and smooth.",
    image: "https://i.pinimg.com/474x/36/1b/ed/361bedc3b047b6ae726510bed8776584.jpg",
    category: "Beauty",
    rating: 4.3
  },
  {
    id: "18",
    name: "Ladies Sunglasses",
    price: 20000,
    description: "Stylish UV-protective sunglasses for sunny days.",
    image: "https://i.pinimg.com/474x/1b/fb/d2/1bfbd2ac252b6e9c1f379dad45479cd6.jpg",
    category: "Accessories",
    rating: 4.4
  },
  {
    id: "19",
    name: "Leather Boots",
    price: 99000,
    description: "Rugged and fashionable leather boots.",
    image: "https://i.pinimg.com/474x/20/42/2d/20422d6178b39383fca0f55e627e743f.jpg",
    category: "Shoes",
    rating: 4.8
  },
  {
    id: "20",
    name: "Backpack Explorer",
    price: 67000,
    description: "Durable backpack great for travel and adventure.",
    image: "https://i.pinimg.com/474x/9e/46/bf/9e46bf48872532c97a6f080fff1f7289.jpg",
    category: "Bags",
    rating: 4.7
  },
  {
    id: "21",
    name: "Men’s Casual Shirt",
    price: 34000,
    description: "Classic button-down shirt for any event.",
    image: "https://i.pinimg.com/474x/4e/42/e3/4e42e3962525feab4869c670b3fc8288.jpg",
    category: "Clothes",
    rating: 4.2
  },
  {
    id: "22",
    name: "Nail Polish Set",
    price: 12000,
    description: "Vibrant colors and long-lasting shine.",
    image: "https://i.pinimg.com/474x/57/08/cd/5708cdf26fa81cd09a2997cc7f3217ea.jpg",
    category: "Beauty",
    rating: 4.6
  },
  {
    id: "23",
    name: "Pearl Necklace",
    price: 38000,
    description: "Elegant pearls to elevate your outfit.",
    image: "https://i.pinimg.com/474x/68/c4/09/68c409616aa66b92e81ee044a8fdfaf2.jpg",
    category: "Accessories",
    rating: 4.9
  },
  {
    id: "24",
    name: "Slip-On Loafers",
    price: 49000,
    description: "Effortless comfort meets formal style.",
    image: "https://i.pinimg.com/474x/e8/eb/46/e8eb465899c921f0ce99bb7d6132cc61.jpg",
    category: "Shoes",
    rating: 4.3
  },
  {
    id: "25",
    name: "Compact Makeup Kit",
    price: 29000,
    description: "All-in-one makeup set for on-the-go touchups.",
    image: "https://i.pinimg.com/474x/b9/80/f3/b980f3f20c635a673d1f699074b5ddcc.jpg",
    category: "Beauty",
    rating: 4.5
  },
  {
    id: "26",
    name: "Smartphone Stand",
    price: 8000,
    description: "Perfect for hands-free viewing and video calls.",
    image: "https://i.pinimg.com/474x/d0/18/f1/d018f1d1a63b3fecbeaaed9dee7d2a45.jpg",
    category: "Electronics",
    rating: 4.2
  },
  {
    id: "27",
    name: "Patterned Tote Bag",
    price: 33000,
    description: "Trendy and practical tote bag.",
    image: "https://i.pinimg.com/474x/36/d6/09/36d60939d419cc5cf048c4e22ef7f7e4.jpg",
    category: "Bags",
    rating: 4.3
  },
  {
    id: "28",
    name: "Summer Sandals",
    price: 29000,
    description: "Stay cool and stylish in the summer heat.",
    image: "https://i.pinimg.com/474x/4f/f6/4a/4ff64a3cf65d40442a648fab61a0f890.jpg",
    category: "Shoes",
    rating: 4.5
  },
  {
    id: "29",
    name: "Casual Hoodie",
    price: 46000,
    description: "Warm hoodie for lounging or going out.",
    image: "https://i.pinimg.com/474x/b3/68/52/b36852c8340d7bcf1588ebfa86974540.jpg",
    category: "Clothes",
    rating: 4.4
  },
  {
    id: "30",
    name: "Cleansing Foam",
    price: 13500,
    description: "Gentle foaming cleanser for daily use.",
    image: "https://i.pinimg.com/474x/98/b9/69/98b9694f15136355b144260e1a79f215.jpg",
    category: "Beauty",
    rating: 4.3
  },
  {
    id: "31",
    name: "Fitness Tracker Band",
    price: 38000,
    description: "Monitor your steps, heart rate, and sleep.",
    image: "https://i.pinimg.com/474x/08/0c/af/080caf8a45ef0c43a577873d6dec47be.jpg",
    category: "Electronics",
    rating: 4.5
  },
  {
    id: "32",
    name: "Charm Bracelet",
    price: 21000,
    description: "Personalized bracelet with adorable charms.",
    image: "https://i.pinimg.com/474x/10/d5/ba/10d5ba777c32cd5f4ba855da178fe7b3.jpg",
    category: "Accessories",
    rating: 4.6
  },
  {
    id: "33",
    name: "Cotton Pants",
    price: 39000,
    description: "Relaxed fit cotton pants for casual wear.",
    image: "https://i.pinimg.com/474x/46/84/76/46847659f4e8c04f93c22fa5a611dc3b.jpg",
    category: "Clothes",
    rating: 4.1
  },
  {
    id: "34",
    name: "Mini Crossbody Bag",
    price: 51000,
    description: "Minimalist crossbody bag with gold accents.",
    image: "https://i.pinimg.com/474x/4a/53/ef/4a53efb39c0165f8fdba79f1513f235e.jpg",
    category: "Bags",
    rating: 4.4
  },
  {
    id: "35",
    name: "Hair Styling Kit",
    price: 31000,
    description: "Complete kit for all your hair needs.",
    image: "https://i.pinimg.com/474x/14/2c/8e/142c8e297241034b9ae2fa0a4b7ac601.jpg",
    category: "Beauty",
    rating: 4.5
  }
];