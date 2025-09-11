"use client";

import { useState } from "react";
import css from "./NotesPage.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/api";

interface NoteProps{
  tag: string | undefined
}

function Notes({tag}: NoteProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); 
  }, 500);

    const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage, tag }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && <Pagination pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        <Link href="/notes/action/create"  className={css.button}>Create note +</Link>
      </header>
      {isSuccess && (
        <>
          {notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <div className={css.emptyResults}>
              {searchQuery ? (
                <p>No notes found for your search {searchQuery}</p>
              ) : (
                <p>No notes available. Create your first note!</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Notes