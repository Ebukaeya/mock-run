/*
 * Demo page (/demo): the videos and customer quotes, in one place.
 *
 * Videos: paste the YouTube video id (the part after "watch?v=" in the link,
 * e.g. https://www.youtube.com/watch?v=MkI9ssmnR5g -> "MkI9ssmnR5g").
 * category must match an id in `categories`. A category with no videos is hidden.
 */

/* The big video at the top of the page */
export const featuredVideo = {
  youtubeId: "LF2JI-w97YA",
  title: "StoreLense: your store inventory manager",
  description: "A quick tour of selling, stock and reports in StoreLense.",
  duration: "1:41",
  poster: "https://res.cloudinary.com/ebuka1122/image/upload/v1754337726/static%20images%20storelens/bdd4ae94-94a5-4983-9706-9699ea2c062f.png",
};

export const categories = [
  { id: "all", label: "All videos" },
  { id: "getting-started", label: "Getting started" },
  { id: "features", label: "Features" },
  { id: "success-stories", label: "Success stories" },
];

export const videos = [
  {
    id: "1",
    title: "Getting started: how to sign up",
    description: "Set up your account and get ready to sell in under 5 minutes.",
    youtubeId: "MkI9ssmnR5g",
    duration: "0:53",
    category: "getting-started",
  },
  {
    id: "10",
    title: "How to create a store on StoreLense",
    description: "Create your store and manage it from StoreLense's simple dashboard.",
    youtubeId: "XHoRR66OXDI",
    duration: "1:12",
    category: "getting-started",
  },
  {
    id: "11",
    title: "How to choose a user plan",
    description: "See the plans available and pick the right one for your business.",
    youtubeId: "WzvC2267Fjw",
    duration: "1:12",
    category: "getting-started",
  },
  {
    id: "2",
    title: "How to sell a product on StoreLense",
    description: "Ring up a sale on the StoreLense POS, from cart to receipt.",
    youtubeId: "K1tU-8UtPPc",
    duration: "1:23",
    category: "features",
  },
  {
    id: "3",
    title: "How to register a part payment",
    description: "Record part payments and track what each customer still owes.",
    youtubeId: "bwWqxkKHCG0",
    duration: "1:45",
    category: "features",
  },
  {
    id: "12",
    title: "How to manage your product inventory",
    description: "Keep track of stock levels and manage your products with ease.",
    youtubeId: "C-1sbWtm-R4",
    duration: "1:45",
    category: "features",
  },
  {
    id: "4",
    title: "Navigating StoreLense Admin: a guide",
    description: "Find your way around the admin dashboard and its main features.",
    youtubeId: "yt8i7O0KmoQ",
    duration: "1:14",
    category: "features",
  },
];

/* What customers say */
export const testimonials = [
  {
    name: "Mrs Eucharia",
    role: "Manager, Chy Chy Global Co.",
    avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752509951/Ihub/6f4bf1a3-6545-44cb-b758-794607088adb_qfeya9.png",
    content: "This platform transformed how we handle our workflows. The demo videos made onboarding incredibly smooth for our entire team.",
    rating: 5,
  },
  {
    name: "Michael",
    role: "Shop Owner, Alaba Int. Market",
    avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752510159/Ihub/bae19d07-d35c-486b-a42a-666a12de6eab_v17ckw.png",
    content: "The comprehensive video tutorials helped us implement advanced features we never knew existed. ROI was visible within the first month.",
    rating: 5,
  },
  {
    name: "Abiola Adeyemi",
    role: "Sales Manager, Tech Solutions Ltd.",
    avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752510400/Ihub/25aab000-43c4-40de-adb3-0903bf813323_gtetee.png",
    content: "Outstanding platform with excellent documentation. The demo videos are professionally made and incredibly helpful for training new team members.",
    rating: 5,
  },
];
