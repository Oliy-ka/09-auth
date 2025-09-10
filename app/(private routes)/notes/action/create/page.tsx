import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/Home.module.css"
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Create Note | Notes App",
  description: "Page for creating a new note in your list.",
  openGraph: {
    title: "Create a New Note",
    description: "Create a new note and save your ideas in the Notes App.",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
  },
};


export default function CreateNotePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
}