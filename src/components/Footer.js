import Link from 'next/link';
import styles from './Footer.module.css';
import { Instagram, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            Decor Dream <span>DIY</span>
                        </div>
                        <p className={styles.tagline}>
                            Your daily sanctuary for home inspiration, DIY wisdom,
                            and the art of intentional living with Decor Dream DIY.
                        </p>
                        <div className={styles.socials}>
                            <Link href="#"><Instagram size={20} /></Link>
                            <Link href="#"><Twitter size={20} /></Link>
                            <Link href="#"><Mail size={20} /></Link>
                        </div>
                    </div>

                    <div className={styles.linkCol}>
                        <h4>Explore</h4>
                        <Link href="/">Home</Link>
                        <Link href="/pins">Decor Feed</Link>
                        <Link href="/diy">DIY Projects</Link>
                        <Link href="/trending">Trending</Link>
                    </div>

                    <div className={styles.linkCol}>
                        <h4>Rooms</h4>
                        <Link href="/category/living-room">Living Room</Link>
                        <Link href="/category/kitchen">Kitchen & Dining</Link>
                        <Link href="/category/bedroom">Bedroom Sanctuary</Link>
                        <Link href="/category/outdoor">Outdoor Living</Link>
                    </div>

                    <div className={styles.serviceCol}>
                        <h4>Community</h4>
                        <p>Join 15K+ decorators who receive our weekly "Decor Dream" digest.</p>
                        <div className={styles.miniForm}>
                            <input type="email" placeholder="Your email..." />
                            <button>Join</button>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copy}>
                        &copy; {new Date().getFullYear()} Decor Dream DIY. Made with <Heart size={14} fill="currentColor" /> for beautiful homes.
                    </div>
                    <div className={styles.legals}>
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
