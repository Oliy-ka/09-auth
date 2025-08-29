"use client"

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css"

export default function NotePreviewClient() {
    const { id } = useParams <{id: string}> ();
    const router = useRouter();

    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", { id }],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    });

    const handleClose = () => {router.back()};

    if (isLoading) {
        return <Modal onClose={handleClose}>Loading...</Modal>
    }

    if (isError || !note) {
        return <Modal onClose={handleClose}>Something went wrong.</Modal>
    }

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                        <p className={css.tag}>{note.tag}</p>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{`Created: ${new Date(note.createdAt).toLocaleString()}`}</p>
                    <button className={css.backBtn} onClick={handleClose}>Back</button>
                </div>
            </div>
        </Modal>
    );
}