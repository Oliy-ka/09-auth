"use client"

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css"
import { fetchNoteById } from "@/lib/api/api";

interface NoteDetailsClientProps{
    id: string
}

export default function NoteDetailsClient({id} : NoteDetailsClientProps ) {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["notes", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
        refetchOnMount: false
    });

    if (isLoading) {
    return <p>Loading, please wait...</p>;
    }

    if (isError) {
        return <p>Something went wrong. {error.message}</p>;
    }

    if (!data) {
        return <p>Note not found.</p>;
    }

    return (
        <div className={css.container}>
            <div className={css.item}>
            <div className={css.header}>
                    <h2>{data?.title}</h2>
            </div>
                <p className={css.content}>{ data?.content}</p>
                <p className={css.date}>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};