/* Sample data shown inside the recreated app screens. */

export const N = (v) => "₦" + Number(v).toLocaleString("en-NG");

export const MENU = [
  {
    name: "Jollof Rice & Chicken",
    cat: "Mains",
    price: 4500,
    icon: "rice",
    tone: "#FDE7D6",
    ink: "#C2410C",
    station: "Grill",
  },
  {
    name: "Pounded Yam & Egusi",
    cat: "Mains",
    price: 4800,
    icon: "soup",
    tone: "#E6F4EA",
    ink: "#2F7D46",
    station: "Main kitchen",
  },
  {
    name: "Goat Pepper Soup",
    cat: "Soups",
    price: 3800,
    icon: "soup",
    tone: "#FDE2E1",
    ink: "#B42318",
    station: "Main kitchen",
  },
  { name: "Suya Platter", cat: "Grills", price: 6000, icon: "beef", tone: "#F9E3D3", ink: "#9A3412", station: "Grill" },
  {
    name: "Grilled Croaker Fish",
    cat: "Grills",
    price: 9500,
    icon: "fish",
    tone: "#DDEBFB",
    ink: "#1E4FB8",
    station: "Grill",
  },
  {
    name: "Small Chops",
    cat: "Starters",
    price: 4000,
    icon: "chops",
    tone: "#FEF3C7",
    ink: "#A16207",
    station: "Main kitchen",
  },
  {
    name: "Chicken Shawarma",
    cat: "Starters",
    price: 3200,
    icon: "wrap",
    tone: "#FCE9D9",
    ink: "#B45309",
    station: "Grill",
  },
  { name: "Chapman", cat: "Drinks", price: 2200, icon: "glass", tone: "#FDE2E4", ink: "#BE123C", station: "Bar" },
  { name: "Zobo", cat: "Drinks", price: 1200, icon: "cup", tone: "#F3E1EC", ink: "#9D174D", station: "Bar" },
  {
    name: "Cappuccino",
    cat: "Coffee",
    price: 3000,
    icon: "coffee",
    tone: "#EFE6DD",
    ink: "#7C4A21",
    station: "Barista",
  },
  { name: "Star Lager", cat: "Drinks", price: 1500, icon: "beer", tone: "#FEF6D8", ink: "#A16207", station: "Bar" },
  { name: "Asun", cat: "Grills", price: 3500, icon: "beef", tone: "#FBE4D6", ink: "#9A3412", station: "Grill" },
];

export const CART = [
  { name: "Jollof Rice & Chicken", qty: 2, price: 4500 },
  { name: "Suya Platter", qty: 1, price: 6000 },
  { name: "Chapman", qty: 2, price: 2200 },
  { name: "Zobo", qty: 1, price: 1200 },
];
