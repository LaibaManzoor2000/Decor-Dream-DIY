import styles from "../page.module.css";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";
import { TrendingUp, Heart, Share2, MessageCircle } from "lucide-react";
import { getSafeImg } from "../../utils/images";

export const metadata = {
    title: "Trending Decor Ideas | What's Hot in Interior Design",
    description: "Explore the most popular home decor trends, viral DIY projects, and seasonal styles that are taking the design world by storm.",
};

export default async function TrendingPage() {
    const { data: pins, error } = await supabase
        .from('pins')
        .select(`*, profiles:author_id ( username, avatar_url )`)
        .order('created_at', { ascending: false })
        .limit(10);

    const displayPins = pins?.length > 0 ? pins : Array.from({ length: 8 });

    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '8rem' }}>
                <div className={styles.centerHeader} style={{ marginBottom: '5rem' }}>
                    <div className={styles.kicker} style={{ margin: '0 auto 1rem' }}>
                        <TrendingUp size={14} /> <span>What's Popular Now</span>
                    </div>
                    <h1 className={styles.serifTitle} style={{ fontSize: '3.5rem' }}>Trending Design</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        The most loved spaces, clever hacks, and aesthetic finds currently inspiring the Decor Dream DIY community.
                    </p>
                </div>

                <div className={styles.equalGrid}>
                    {displayPins.map((pin, i) => (
                        <div key={pin?.id || i} className={styles.equalItem}>
                            <Link href={pin?.id ? `/pin/${pin.id}` : "#"}>
                                <div className={styles.pinWrapper}>
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, background: 'rgba(230, 0, 35, 0.9)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '0.8rem' }}>
                                        #{i + 1} Trending
                                    </div>
                                    <img
                                        src={getSafeImg(pin, i + 400)}
                                        alt={pin?.title || "Trending Home Decor"}
                                        loading="lazy"
                                    />
                                    <div className={styles.pinOverlay}>
                                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                                            <button className={styles.heartBtn} style={{ background: 'white', color: 'var(--brand-primary)' }}><Heart size={20} fill="var(--brand-primary)" /></button>
                                            <button className={styles.heartBtn} style={{ background: 'white', color: 'var(--text-primary)' }}><Share2 size={20} /></button>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageCircle size={16} /> {12 + i * 5}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Heart size={16} fill="white" /> {120 + i * 25}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.pinText}>
                                    <div style={{ color: 'var(--brand-primary)', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                                        {pin?.category || "INTERIOR DESIGN"}
                                    </div>
                                    <h4 style={{ fontSize: '1.4rem' }}>{pin?.title || `Most Loved Decor Concept ${i + 1}`}</h4>
                                    <div className={styles.authorGroup} style={{ marginTop: '1rem' }}>
                                        <div className={styles.avatarMini}>D</div>
                                        <span style={{ fontWeight: '500' }}>{pin?.profiles?.username || "Decor Dream DIY"}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
