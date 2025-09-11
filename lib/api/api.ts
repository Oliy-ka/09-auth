import axios from "axios";
import type { Note } from "@/types/note"

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, 
});

export interface FetchNotesParams {
  search: string;
  page: number;
  perPage?: number;
  tag?: string
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ search, page, perPage = 12, tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
    const res = await nextServer.get<FetchNotesResponse>("/notes", {
      params: {
        search,
        page,
        perPage,
        tag
      },
    });
    return res.data;
}

export const fetchNoteById = async (noteId: Note["id"]) => {
  const res = await nextServer.get<Note>(`/notes/${noteId}`);
  return res.data
}

interface createNoteParams {
  title: string;
  content?: string;
  tag: Note["tag"];
}

export const createNote = async (noteData: createNoteParams) => {
    const res = await nextServer.post<Note>("/notes", noteData);
    return res.data;
}

export const deleteNote = async (noteId: Note["id"] ) => {
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data;
}