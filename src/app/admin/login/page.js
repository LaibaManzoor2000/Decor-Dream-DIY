"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Home, UserPlus } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push("/admin");
            }
        };
        checkUser();
    }, [router]);

    const handleAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            if (isSignUp) {
                const { data, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/admin`,
                    }
                });
                if (authError) throw authError;
                setSuccess("Success! Please check your email for a confirmation link (or just try logging in if email confirmation is disabled).");
            } else {
                const { data, error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (authError) throw authError;
                if (data.session) {
                    router.push("/admin");
                    router.refresh();
                }
            }
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <div className={styles.logoGroup}>
                        {isSignUp ? <UserPlus className={styles.lockIcon} size={24} /> : <Lock className={styles.lockIcon} size={24} />}
                        <h1>{isSignUp ? "Create Admin" : "Admin Access"}</h1>
                    </div>
                    <p>{isSignUp ? "Sign up to start managing Decor Dream DIY." : "Enter your credentials to manage Decor Dream DIY."}</p>
                </div>

                {error && <div className={styles.errorAlert}>{error}</div>}
                {success && <div className={styles.successAlert} style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{success}</div>}

                <form onSubmit={handleAction} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={loading}>
                        {loading ? "Processing..." : (
                            <>
                                {isSignUp ? "Sign Up" : "Sign In"} <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <button 
                        onClick={() => setIsSignUp(!isSignUp)} 
                        className={styles.toggleBtn}
                        style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem' }}
                    >
                        {isSignUp ? "Already have an account? Sign In" : "Need an account? Create one"}
                    </button>
                    <br />
                    <Link href="/" className={styles.backLink}>
                        <Home size={16} /> Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
