import styles from "../page.module.css";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service | Decor Dream DIY",
    description: "Read the terms and conditions for using the Decor Dream DIY website and community features.",
};

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '10rem', paddingBottom: '10rem', maxWidth: '800px' }}>
                <h1 className={styles.serifTitle} style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>Terms of Service</h1>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '2rem' }}>Last Updated: February 23, 2026</p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>1. Terms</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        By accessing the website at <strong>Decor Dream DIY</strong>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>2. Use License</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Decor Dream DIY's website for personal, non-commercial transitory viewing only.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Decor Dream DIY at any time.</p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>3. Disclaimer</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        The materials on Decor Dream DIY's website are provided on an 'as is' basis. Decor Dream DIY makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>4. Limitations</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        In no event shall Decor Dream DIY or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Decor Dream DIY's website.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>5. Accuracy of Materials</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        The materials appearing on Decor Dream DIY's website could include technical, typographical, or photographic errors. Decor Dream DIY does not warrant that any of the materials on its website are accurate, complete or current.
                    </p>

                    <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem' }}>
                        <p>By using this website, you signify your acceptance of these terms. If you do not agree to these terms, please do not use our site.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
