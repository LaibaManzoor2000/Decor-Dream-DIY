import { supabase } from "../../../utils/supabase/client";
import Link from "next/link";
import styles from "./PinDetail.module.css";
import { notFound } from "next/navigation";
import { getSafeImg } from "../../../utils/images";
import { ChevronLeft, Share2, Heart, MessageCircle, Calendar, User } from "lucide-react";

export async function generateMetadata({ params }) {
    const { id } = params;
    const { data: pin } = await supabase.from('pins').select('title, description').eq('id', id).single();

    return {
        title: pin ? `${pin.title} | Decor Dream DIY` : "Decor Idea",
        description: pin?.description || "High-end home decor inspiration and professional DIY guides from Decor Dream DIY.",
    };
}

export default async function PinDetail({ params }) {
    const { id } = params;

    const { data: pin, error } = await supabase
        .from('pins')
        .select(`
            *,
            profiles:author_id ( username, avatar_url )
        `)
        .eq('id', id)
        .single();

    if (error || !pin) {
        return notFound();
    }

    const authorName = pin.profiles?.username || "Decor Dream DIY";

    return (
        <div className={styles.pageWrapper}>
            <article className={styles.container}>
                <div className={styles.topNav}>
                    <Link href="/pins" className={styles.backBtn}>
                        <ChevronLeft size={18} /> Back to Feed
                    </Link>
                </div>

                <div className={styles.mainWrapper}>
                    <header className={styles.articleHeader}>
                        <div className={styles.badge}>{pin.category || "Design Inspiration"}</div>
                        <h1 className={styles.title}>{pin.title}</h1>
                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <User size={14} />
                                <span>{authorName}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Calendar size={14} />
                                <span>{new Date(pin.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </header>

                    <div className={styles.heroImageWrapper}>
                        <img
                            src={getSafeImg(pin, 500)}
                            alt={pin.title}
                            className={styles.heroImage}
                        />
                        <div className={styles.imageActions}>
                            <button className={styles.actionBtn}><Heart size={20} /> Save</button>
                            <button className={styles.actionBtn}><Share2 size={20} /> Share</button>
                        </div>
                    </div>

                    <div className={styles.contentBody}>
                        <div className={styles.introCard}>
                            <p className={styles.leadText}>{pin.description || "Discover how to transform your living space with this curated design concept from the Decor Dream DIY collection."}</p>
                        </div>

                        {pin.content ? (
                            <div
                                className={styles.richTextContent}
                                dangerouslySetInnerHTML={{ __html: pin.content }}
                            />
                        ) : (
                            <div className={styles.defaultContent}>
                                <h2>Professional Design Insights</h2>
                                <p>This space exemplifies the core philosophy of <strong>Decor Dream DIY</strong>: that beauty and functionality should coexist in every corner of the home. By prioritizing high-quality materials and a cohesive color palette, we've created a sanctuary that is both sophisticated and approachable.</p>

                                <div className={styles.curatedTip}>
                                    <h3>Pro Decorator Tip</h3>
                                    <p>When working with this style, always consider the "Rule of Three." Group your accessories in odd numbers to create visual interest and a more balanced look that feels professionally styled.</p>
                                </div>

                                <h2>Material & Texture Palette</h2>
                                <p>The selection of textures in this design is intentional. We've balanced hard surfaces like stone and wood with the soft invitation of velvet and linen. This contrast is what gives high-end designs their depth and character.</p>

                                <ul>
                                    <li><strong>Sustainable Woods:</strong> Bringing warmth and organic structure.</li>
                                    <li><strong>Tactile Fabrics:</strong> Enhancing the sensory experience of the room.</li>
                                    <li><strong>Artisanal Accents:</strong> One-of-a-kind pieces that tell a story.</li>
                                </ul>

                                <p>Whether you're planning a full renovation or a weekend refresh, these elements will ensure your project achieves that "Decor Dream" finish.</p>
                            </div>
                        )}

                        <div className={styles.articleFooter}>
                            <div className={styles.tags}>
                                <span>#HomeDecor</span>
                                <span>#DIYProjects</span>
                                <span>#InteriorDesign</span>
                                <span>#DecorDreamDIY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Newsletter CTA */}
            <section className={styles.relatedSection}>
                <div className={styles.newsletterPrompt}>
                    <h2>Love this style?</h2>
                    <p>Join our newsletter for weekly "Decor Dream" design boards and exclusive DIY guides.</p>
                    <form className={styles.inlineForm}>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Join Community</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
