
import { UrlForm } from "../../features/url-shortener/components/UrlForm";
import styles from "./styles.module.css";


export function MainForm() {
    return (
        <div className={styles.mainForm}>
            <UrlForm>
            </UrlForm>    
        </div>

    );
}