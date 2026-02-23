"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabase/client";
import styles from "./Admin.module.css";
import Link from "next/link";

export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "Home Decor",
        image_url: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const heights = ['short', 'medium', 'tall'];
            const randomHeight = heights[Math.floor(Math.random() * heights.length)];

            const { data, error } = await supabase.from('pins').insert([
                {
                    title: formData.title,
                    description: formData.description,
                    content: formData.content,
                    category: formData.category,
                    image_url: formData.image_url || `seed/picsum/${Math.floor(Math.random() * 1000)}/400/600`,
                    height: randomHeight,
                }
            ]);

            if (error) throw error;

            setMessage({ text: "Pin published successfully! Your feed is updated.", type: "success" });
            setFormData({
                title: "",
                description: "",
                content: "",
                category: "Home Decor",
                image_url: "",
            });
        } catch (err) {
            console.error(err);
            setMessage({ text: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.adminContainer}>
            <nav className={styles.navBar}>
                <Link href="/" className={styles.backLink}>← Back to Home</Link>
                <h1 className={styles.navTitle}>Decor Dream DIY Publisher</h1>
            </nav>

            <div className={styles.mainArea}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Publish New Content</h2>
                        <p>Paste your ChatGPT-generated SEO article and Canva pin design here. It will immediately publish to your website.</p>
                    </div>

                    {message.text && (
                        <div className={`${styles.alert} ${styles[message.type]}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Pin Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Minimalist Bedroom 2026" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option>Home Decor</option>
                                    <option>DIY Projects</option>
                                    <option>Architecture</option>
                                    <option>Design</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Canva Image URL</label>
                            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="e.g. https://your-canva-export-url.jpeg (leave blank for random image)" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Short Description (For Pin Card)</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Catchy Pinterest-friendly description..."></textarea>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Full Blog Article (3000 Words SEO)</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} rows="12" required placeholder="Paste your generated article here. Paragraphs separated by blank lines will be rendered automatically."></textarea>
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.publishBtn} disabled={loading}>
                                {loading ? "Publishing..." : "Publish to Feed"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
