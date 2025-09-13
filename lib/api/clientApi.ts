import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note } from "@/types/note";

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

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateUser = async (data: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};