"use client"

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

type TagsMenuProps = {
  tags: string[];
};

export default function TagsMenu({tags}: TagsMenuProps) {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && <ul className={css.menuList}>
                <li className={css.menuItem}>
                    <Link href={`/notes/filter/all`} onClick={toggle} className={css.menuLink}>
                    All notes
                    </Link>
                </li>
                {tags.map((tag) => {
                    return (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                            {tag}
                        </Link>
                    </li>
                    )
                })}
            </ul>}
        </div>
    );
}