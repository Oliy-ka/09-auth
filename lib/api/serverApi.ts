import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = cookies();

  const res = await nextServer.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { search = "", page = 1, perPage = 12, tag } = params;
  const cookieStore = cookies();

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage,
      tag
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const cookieStore = cookies();

  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};
