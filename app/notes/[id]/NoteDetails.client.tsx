"use client"

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css"

export default function NoteDetailsClient() {
    const params = useParams();
    const id = params.id as string;

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["notes", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id
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