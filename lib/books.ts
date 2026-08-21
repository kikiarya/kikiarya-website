export type BookStatus = "reading" | "read" | "next";

export type Book = {
  title: string;
  author: string;
  status: BookStatus;
  note?: string; // one short line, in your own words
  year?: string; // when you read it (optional)
  tag?: string; // e.g. "systems", "fiction", "essays"
};

// ⚠ Placeholder entries — replace with your actual shelf.
// Edit this file only; the page renders whatever is here.
export const books: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    tag: "systems",
    note: "Reading slowly, one chapter at a time. Everything I built in the microservices project makes more sense now.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    status: "read",
    year: "2025",
    tag: "craft",
    note: "The chapter on tracer bullets changed how I start projects.",
  },
  {
    title: "活着 · To Live",
    author: "余华 Yu Hua",
    status: "read",
    year: "2024",
    tag: "fiction",
    note: "Read it on the flight to Sydney. Wrong choice for a plane; right choice for that year.",
  },
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    status: "next",
    tag: "ideas",
    note: "Everyone in AI says to read it. On the shelf, waiting for a long break.",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    status: "next",
    tag: "design",
  },
];

export const getBooksByStatus = (status: BookStatus) =>
  books.filter((book) => book.status === status);
