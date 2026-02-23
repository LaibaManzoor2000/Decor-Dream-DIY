import styles from "../page.module.css";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";
import { Hammer, Ruler, ChevronRight, Clock, Banknote } from "lucide-react";
import { getSafeImg } from "../../utils/images";

export const metadata = {
    title: "DIY Project Guides | Master the Art of Home Decor",
    description: "Step-by-step professional DIY tutorials for your home. From furniture flips to wall art, learn how to create a beautiful home on a budget with Decor Dream DIY.",
};

export default async function DIYPage() {
    const { data: pins, error } = await supabase
        .from('pins')
        .select(`*, profiles:author_id ( username, avatar_url )`)
        .ilike('category', '%diy%')
        .order('created_at', { ascending: false });

    // Fallback if no specific DIY pins are found
    const displayPins = pins?.length > 0 ? pins : Array.from({ length: 6 });

    return (
        <div className={styles.page}>
            <div className="container" style={{ paddingTop: '8rem' }}>
                <div className={styles.centerHeader} style={{ marginBottom: '5rem' }}>
                    <div className={styles.kicker} style={{ margin: '0 auto 1rem' }}>
                        <Hammer size={14} /> <span>Master Your Craft</span>
                    </div>
                    <h1 className={styles.serifTitle} style={{ fontSize: '3.5rem' }}>Practical DIY Guides</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        High-end home transformations you can actually achieve. Our experts break down complex projects into simple, actionable steps.
                    </p>
                </div>

                <div className={styles.diyGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                    {displayPins.map((p, i) => (
                        <article key={p?.id || i} className={styles.diyCard} style={{ background: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', transition: 'var(--transition-smooth)' }}>
                            <div className={styles.cardImageFixed} style={{ height: '300px', position: 'relative' }}>
                                <img
                                    src={getSafeImg(p, i + 100)}
                                    alt={p?.title || "Home DIY Project"}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <div className={styles.difficulty} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600', color: 'var(--niche-accent)' }}>
                                    {['Beginner', 'Intermediate', 'Advanced'][i % 3]}
                                </div>
                            </div>
                            <div className={styles.cardBody} style={{ padding: '2rem' }}>
                                <div className={styles.cardMeta} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {2 + (i % 5)} Hours</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Banknote size={14} /> ${20 * (i + 1)}+ Budget</span>
                                </div>
                                <Link href={p?.id ? `/pin/${p.id}` : "#"}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>{p?.title || `Transformative DIY Project ${i + 1}`}</h3>
                                </Link>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {p?.description || "Learn the professional techniques to execute this stunning home upgrade without the designer price tag."}
                                </p>
                                <Link href={p?.id ? `/pin/${p.id}` : "#"} className={styles.viewMore} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--brand-primary)' }}>
                                    Read Full Guide <ChevronRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter CTA for DIY */}
                <div style={{ marginTop: '8rem', padding: '6rem 4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                    <h2 className={styles.serifTitle} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Never Miss a Project</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', color: 'var(--text-secondary)' }}>
                        Join 15,000+ home enthusiasts and get our latest DIY guides, shopping lists, and decor trends delivered to your inbox every Sunday.
                    </p>
                    <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-medium)', outline: 'none' }}
                            required
                        />
                        <button className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
