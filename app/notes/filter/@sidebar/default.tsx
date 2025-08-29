import Link from "next/link";
import css from "./SidebarNotes.module.css"

const NotesSidebar = async () => {
    const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
    return(
      <aside>
        <ul className={css.menuList}>
            <li>
                <Link href={`/notes/filter/All`} className={css.menuLink}>All notes</Link>
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
    </aside>
    );
};

export default NotesSidebar;