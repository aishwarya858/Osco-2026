export const artisans = [
  {
    id: 1,
    name: "Lakshmi Hiremath",
    craft: "Kasuti Embroidery",
    village: "Dharwad",
    image: "/images/kasuti_border.jpg",
    story:
      "Lakshmi learned Kasuti from her grandmother at age 12. She counts every thread by hand, with no tracing or drawn pattern.",
  },
  {
    id: 2,
    name: "Ramesh Naik",
    craft: "Beedu Craft",
    village: "Udupi",
    image: "/images/beedu.jpg",
    story:
      "Ramesh is a third-generation Beedu craftsperson. He makes his pieces from locally sourced materials using techniques passed down in his family.",
  },
  {
    id: 3,
    name: "Sumesh Shetty",
    craft: "Natural Fibre Craft",
    village: "Kundapura",
    image: "/images/natural_fibre.jpg",
    story:
      "Sumesh weaves baskets and decor from locally harvested natural fibres, a skill he learned from his family.",
  },
  {
    id: 4,
    name: "Somesh Achar",
    craft: "Traditional Wooden Crafts",
    village: "Sirsi",
    image: "/images/wooded_craft.jpg",
    story:
      "Somesh carves and turns wood by hand in his workshop, continuing a craft that has been in his family for generations.",
  },
  {
    id: 5,
    name: "Savitha Bhat",
    craft: "Traditional Textiles",
    village: "Udupi",
    image: "/images/traditional_textiles.jpg",
    story:
      "Savitha weaves traditional textiles on a handloom, using patterns passed down through her family.",
  },
  {
    id: 6,
    name: "Kasuti Cushion Cover",
    description: "Cotton cushion cover with a peacock motif.",
    image: "/images/pillow_cover.jpg",
    craft_story:
      "Takes about 4 days of handwork. The peacock is a classic Kasuti motif that symbolises grace.",
    price: 850,
  }
];

export const products = [
  {
    id: 1,
    artisan_id: 1,
    name: "Kasuti Silk Saree Border",
    description: "Hand-embroidered border in traditional gopura motifs.",
    image: "/images/kasuti_border.jpg",
    craft_story:
      "Each border takes about 18 days. Kasuti stitches such as gavanti and murgi are counted thread by thread, so both sides look identical.",
    price: 3500,
  },
  {
    id: 2,
    artisan_id: 1,
    name: "Kasuti Cushion Cover",
    description: "Cotton cushion cover with a peacock motif.",
    image: "/images/pillow_cover.jpg",
    craft_story:
      "Takes about 4 days of handwork. The peacock is a classic Kasuti motif that symbolises grace.",
    price: 850,
  },
  {
    id: 3,
    artisan_id: 2,
    name: "Beedu Decorative Piece",
    description: "Handcrafted Beedu decorative item.",
    image: "/images/beedu.jpg",
    craft_story:
      "Made entirely by hand in Ramesh's workshop. Fair pricing keeps this family craft alive.",
    price: 1200,
  },
  {
    id: 4,
    artisan_id: 3,
    name: "Natural fibre items",
    description: "Natural fibre decorative item.",
    image: "/images/natural_fibre.jpg",
    craft_story:
      "Made entirely by hand in Sumesh's workshop. Fair pricing keeps this family craft alive.",
    price: 1500,
  },
  {
    id: 5,
    artisan_id: 4,
    name: "Traditional Wooden Crafts",
    description: "Handcrafted wooden item.",
    image: "/images/wooded_craft.jpg",
    craft_story:
      "Made entirely by hand in Somesh's workshop. Fair pricing keeps this family craft alive.",
    price: 2200,
  },
  {
    id: 6,
    artisan_id: 5,
    name: "Traditional Textiles",
    description: "Handcrafted traditional textile item.",
    image: "/images/traditional_textiles.jpg",
    craft_story:
      "Made entirely by hand in Savitha's workshop.",
    price: 3000,
  }
];