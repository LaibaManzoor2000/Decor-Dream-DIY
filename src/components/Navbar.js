"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { Search, Plus, TrendingUp, Compass, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname && pathname.startsWith("/admin")) return null;

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <div className={styles.logoGroup}>
                    <Link href="/" className={styles.logo}>
                        Decor Dream <span>DIY</span>
                    </Link>
                    <div className={styles.divider} />
                    <div className={styles.navLinks}>
                        <Link href="/" className={styles.link}><Home size={18} /> <span>Home</span></Link>
                        <Link href="/pins" className={styles.link}><Compass size={18} /> <span>Explore</span></Link>
                        <Link href="/trending" className={styles.link}><TrendingUp size={18} /> <span>Trends</span></Link>
                    </div>
                </div>

                <div className={styles.searchBar}>
                    <Search size={18} className={styles.searchIcon} />
                    <input type="text" placeholder="Search for DIY ideas, decor, art..." />
                </div>

                <div className={styles.actions}>
                    <Link href="/admin" className={styles.plusBtn}>
                        <Plus size={20} />
                        <span>Create</span>
                    </Link>
                    <div className={styles.profileBtn}>H</div>
                </div>
            </div>
        </nav>
    );
}
