import css from "./Footer.module.css";

function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                <p>Developer: Olga Khurtenko</p>
                <p>
                    Contact us:
                    <a href="mailto:olja.x.06@gmail.com"> olja.x.06@gmail.com</a>
                </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;