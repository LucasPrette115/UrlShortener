
import { UrlForm } from "../../features/url-shortener/components/UrlForm";
import { UrlTable } from "../UrlTable";
import styles from "./styles.module.css";


export function MainForm() {
    return (
        <div className={styles.mainForm}>
            <UrlForm>
            </UrlForm>
            <UrlTable>
            </UrlTable>    
        </div>

    );
}