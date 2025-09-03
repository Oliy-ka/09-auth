import css from "@/app/Home.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "The page you are looking for does not exist. Return to NoteHub and continue taking notes.",
  openGraph: {
      title: "404 - Page Not Found | NoteHub",
      description: "Oops! This page could not be found. Go back to NoteHub.",
      url: `https://notehub.com/notes/not-found`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub 404",
        },
      ],
    },
};

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
}