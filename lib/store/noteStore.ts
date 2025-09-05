import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

type NoteStore = {
  draft: typeof initialDraft;
  setDraft: (note: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", 
    }
  )
);
