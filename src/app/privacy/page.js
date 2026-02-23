import styles from "../page.module.css";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Decor Dream DIY",
    description: "Learn how Decor Dream DIY protects your personal information and respects your privacy.",
};

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '10rem', paddingBottom: '10rem', maxWidth: '800px' }}>
                <h1 className={styles.serifTitle} style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>Privacy Policy</h1>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '2rem' }}>Last Updated: February 23, 2026</p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>1. Introduction</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Welcome to <strong>Decor Dream DIY</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>2. The Data We Collect</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>3. How We Use Your Data</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                        <li>To provide the services you requested.</li>
                        <li>To improve our website and user experience.</li>
                        <li>To send you our newsletter (if you have opted in).</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '3rem' }}>4. Data Security</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.
                    </p>

                    <div style={{ marginTop: '5rem', padding: '3rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Questions?</h3>
                        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                        <p style={{ fontWeight: '600', marginTop: '1rem' }}>hello@decordreamdiy.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
