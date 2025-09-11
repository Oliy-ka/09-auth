
import { cookies } from "next/headers";
import { nextServer } from "./api";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getNotes = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};