import Link from "next/link";
import css from "./SidebarNotes.module.css"

type SidebarNotesProps = {
  tags: string[];
};

export default function SidebarNotes({tags}: SidebarNotesProps) {
    return (
        <ul className={css.menuList}>
            <li>
                <Link href={`/notes/filter/all`} className={css.menuLink}>All notes</Link>
            </li>
            {tags.map(tag => {
                return (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                            {tag}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
    
}