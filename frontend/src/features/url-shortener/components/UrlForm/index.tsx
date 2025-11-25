/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import { useUrlShortener } from "../../hooks/useUrlShortener";

export function UrlForm() {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const { shortenUrl } = useUrlShortener();

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const result = await shortenUrl(url);
            setShortenedUrl(result.shortUrl);            
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
        finally{
            setLoading(false);
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setUrl(e.target.value);
    }

    return (
        <>
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

            <button disabled={loading} type="submit" className={styles.submitButton}>
                {loading ? "Shortening..." : "Shorten URL"}
            </button>
        </form>

        {error && <p className={styles.errorText}>Error: {error}</p>}

        {shortenedUrl && (
            <p>
                Short URL: {" "}
                <a href={shortenedUrl} target="_blank">
                    {shortenedUrl}
                </a>
            </p>
        )}
        </>
        
    );
}
