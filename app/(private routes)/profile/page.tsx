import Link from "next/link";
import css from "./ProfilePage.module.css"
import Image from "next/image";
import { getProfile } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile | NoteHub",
    description: "View and manage your profile in NoteHub",
        openGraph: {
        title:"Profile | NoteHub",
        description: "View and manage your profile in NoteHub",
        url: "/notes/action/create",
        images: [
        {
            url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Profile | Note",
        },
        ],
    },
};

export default async function Profile() {
    const user = await getProfile();
    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <div className={css.header}>
                        <h1 className={css.formTitle}>Profile Page</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
                            Edit Profile
                        </Link>
                    </div>
                    <div className={css.avatarWrapper}>
                    <Image
                        src={user?.avatar || "Avatar"}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                    </div>
                    <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username}
                    </p>
                    <p>
                        Email: {user?.email}
                    </p>
                    </div>
                </div>
            </main>
        </>
    );
}