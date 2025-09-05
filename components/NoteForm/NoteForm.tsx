"use client"

import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { NoteTag, useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
        clearDraft(); 
        router.push("/notes/filter/All");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(draft);
    };


    return (
            <form
            className={css.form}
            onSubmit={handleSubmit}
            >
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input value={draft.title} id="title" type="text" name="title" className={css.input}  onChange={(e) => setDraft({ title: e.target.value })}/>
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea value={draft.content} id="content" name="content" rows={8} className={css.textarea} onChange={(e) => setDraft({ content: e.target.value })} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <select value={draft.tag} id="tag" name="tag" className={css.select} onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}>
                    <option value="">Select a tag</option>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={() => router.push("/notes/filter/All")}>
                    Cancel
                    </button>
                    <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
                        {mutation.isPending ? "Creating note..." : "Create"}
                    </button>
                </div>
            </form>
        );
}