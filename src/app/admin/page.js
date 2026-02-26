"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase/client";
import styles from "./Admin.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, PlusCircle, CheckCircle } from "lucide-react";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "Home Decor",
        image_url: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    router.push("/admin/login");
                } else {
                    setUser(session.user);

                    // Sync profile
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('id')
                        .eq('id', session.user.id)
                        .single();

                    if (!profile) {
                        await supabase.from('profiles').insert([{
                            id: session.user.id,
                            username: session.user.email.split('@')[0],
                            avatar_url: null
                        }]);
                    }
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                router.push("/admin/login");
            } finally {
                setInitializing(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

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
                    image_url: formData.image_url || null,
                    height: randomHeight,
                    author_id: user.id
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

    if (initializing) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fdfaf7' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Verifying Admin Session...</p>
            </div>
        );
    }

    return (
        <div className={styles.adminContainer}>
            <nav className={styles.navBar} style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/" className={styles.backLink}>← Back to Website</Link>
                    <h1 className={styles.navTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <LayoutDashboard size={20} /> Decor Dream DIY Publisher
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        Logged in as: <strong style={{ color: 'var(--text-primary)' }}>{user?.email}</strong>
                    </span>
                    <button onClick={handleLogout} className={styles.backLink} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            <div className={styles.mainArea}>
                <div className={styles.card} style={{ border: 'none', boxShadow: 'var(--shadow-premium)' }}>
                    <div className={styles.cardHeader}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <PlusCircle className={styles.lockIcon} size={28} style={{ color: 'var(--brand-primary)' }} />
                            Publish New Content
                        </h2>
                        <p>Create professional, SEO-optimized articles and Pinterest cards from your admin dashboard.</p>
                    </div>

                    {message.text && (
                        <div className={`${styles.alert} ${styles[message.type]}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '12px' }}>
                            {message.type === 'success' && <CheckCircle size={20} />}
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
                                    <option>Kitchen</option>
                                    <option>Living Room</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Image URL (Unsplash or Canva)</label>
                            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Short Description (Meta/Pinterest Card)</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Catchy Pinterest-friendly description..."></textarea>
                        </div>

                        <div className={styles.inputGroup} style={{ height: '400px', marginBottom: '3rem' }}>
                            <label>Full Blog Article (Gutenberg/Rich Text supported)</label>
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(val) => setFormData({ ...formData, content: val })}
                                placeholder="Write your professional blog article here..."
                                style={{ height: '300px' }}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.publishBtn} disabled={loading} style={{ background: 'var(--brand-primary)', padding: '1rem 3rem', borderRadius: 'var(--radius-full)' }}>
                                {loading ? "Publishing..." : "Publish to Feed"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
