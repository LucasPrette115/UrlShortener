import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import styles from "./styles.module.css";

export function UrlForm() {
    const [url, setUrl] = useState<string>("");

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        console.log("URL to shorten:", url);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setUrl(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1 className={styles.title}>URL Shortener</h1>

            <label htmlFor="url-input" className={styles.label}>
                Enter your URL
            </label>

            <input
                id="url-input"
                type="text"
                className={styles.input}
                placeholder="https://example.com"
                value={url}
                onChange={handleChange}
            />

            <button type="submit" className={styles.submitButton}>
                Shorten URL
            </button>
        </form>
    );
}
