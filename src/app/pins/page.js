import styles from "../page.module.css";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";
import { Heart } from "lucide-react";
import { getSafeImg } from "../../utils/images";

export const revalidate = 0;

export default async function PinsPage() {
    const { data: pins, error } = await supabase
        .from('pins')
        .select(`*, profiles:author_id ( username, avatar_url )`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching pins:", error);
    }

    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '8rem' }}>
                <div className={styles.centerHeader} style={{ marginBottom: '4rem' }}>
                    <h1 className={styles.serifTitle}>Decor & DIY Inspiration</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Browse our curated gallery of interior designs and professional DIY project guides.
                    </p>

                    <div className={styles.categoryPills} style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
                        <span className={styles.activePill}>All Ideas</span>
                        <span>Modern</span>
                        <span>Boho</span>
                        <span>Minimalist</span>
                        <span>DIY Guides</span>
                    </div>
                </div>

                <div className={styles.equalGrid}>
                    {(pins?.length > 0 ? pins : Array.from({ length: 12 })).map((pin, i) => (
                        <div key={pin?.id || i} className={styles.equalItem}>
                            <Link href={pin?.id ? `/pin/${pin.id}` : "#"}>
                                <div className={styles.pinWrapper}>
                                    <img
                                        src={getSafeImg(pin, i + 300)}
                                        alt={pin?.title || "Home Decor Inspiration"}
                                        loading="lazy"
                                    />
                                    <div className={styles.pinOverlay}>
                                        <button className={styles.heartBtn}><Heart size={20} /></button>
                                        <span className={styles.saveBadge}>Save</span>
                                    </div>
                                </div>
                                <div className={styles.pinText}>
                                    <h4>{pin?.title || `Dream Decor Concept ${i + 1}`}</h4>
                                    <div className={styles.authorGroup}>
                                        <div className={styles.avatarMini}>D</div>
                                        <span>{pin?.profiles?.username || "Decor Dream DIY"}</span>
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
