import styles from "../../page.module.css";
import Link from "next/link";
import { supabase } from "../../../utils/supabase/client";
import { Heart, ChevronLeft } from "lucide-react";
import { getSafeImg } from "../../../utils/images";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        title: `${title} Decor Ideas & DIY Guides | Decor Dream DIY`,
        description: `Explore the best ${title} design inspiration, professional tips, and DIY projects for a beautiful home.`,
    };
}

export const revalidate = 0;

export default async function CategoryPage({ params }) {
    const { slug } = params;
    const categoryTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const { data: pins, error } = await supabase
        .from('pins')
        .select(`*, profiles:author_id ( username, avatar_url )`)
        .ilike('category', `%${slug.replace('-', ' ')}%`)
        .order('created_at', { ascending: false });

    // For categories, if no pins exist, we show some generic ones but warn if needed
    // However, for this app, we'll just show the grid with placeholder content if empty
    const displayPins = pins?.length > 0 ? pins : Array.from({ length: 9 });

    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '8rem' }}>
                <Link href="/pins" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    <ChevronLeft size={16} /> Back to All Pins
                </Link>

                <div className={styles.centerHeader} style={{ marginBottom: '5rem', textAlign: 'left' }}>
                    <div className={styles.kicker} style={{ marginBottom: '1rem' }}>
                        <span>Room Inspiration</span>
                    </div>
                    <h1 className={styles.serifTitle} style={{ fontSize: '4rem' }}>{categoryTitle}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px' }}>
                        Transform your {categoryTitle.toLowerCase()} with our curated selection of high-end decor ideas and master-level DIY projects.
                    </p>
                </div>

                <div className={styles.equalGrid}>
                    {displayPins.map((pin, i) => (
                        <div key={pin?.id || i} className={styles.equalItem}>
                            <Link href={pin?.id ? `/pin/${pin.id}` : "#"}>
                                <div className={styles.pinWrapper}>
                                    <img
                                        src={getSafeImg(pin, i + 500)}
                                        alt={pin?.title || `${categoryTitle} Inspiration`}
                                        loading="lazy"
                                    />
                                    <div className={styles.pinOverlay}>
                                        <button className={styles.heartBtn}><Heart size={20} /></button>
                                        <span className={styles.saveBadge}>Save</span>
                                    </div>
                                </div>
                                <div className={styles.pinText}>
                                    <h4 style={{ fontSize: '1.4rem' }}>{pin?.title || `${categoryTitle} Concept ${i + 1}`}</h4>
                                    <div className={styles.authorGroup} style={{ marginTop: '0.8rem' }}>
                                        <div className={styles.avatarMini}>D</div>
                                        <span>Decor Dream DIY</span>
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
