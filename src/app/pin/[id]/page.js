import { supabase } from "../../../utils/supabase/client";
import Link from "next/link";
import styles from "./PinDetail.module.css";
import { notFound } from "next/navigation";
import { getSafeImg } from "../../../utils/images";

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
        <article className={styles.container}>
            <div className={styles.mainWrapper}>
                <header className={styles.articleHeader}>
                    <span className={styles.category}>{pin.category || "Home Decor"}</span>
                    <h1 className={styles.title}>{pin.title}</h1>
                    <div className={styles.meta}>
                        <div className={styles.authorImg}>
                            {authorName.charAt(0)}
                        </div>
                        <span>By {authorName}</span>
                        <span>•</span>
                        <span>{new Date(pin.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </header>

                <div className={styles.heroImageWrapper}>
                    <img
                        src={getSafeImg(pin, 500)}
                        alt={pin.title}
                        className={styles.heroImage}
                    />
                </div>

                <div className={styles.contentBody}>
                    {pin.content ? (
                        pin.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() && <p key={idx}>{paragraph}</p>
                        ))
                    ) : (
                        <>
                            <p>Welcome to our detailed exploration of <strong>{pin.title}</strong>. This project represents the pinnacle of modern design, blending functionality with an unmatched aesthetic appeal.</p>

                            <div className={styles.adBox}>
                                Google AdSense Placement
                            </div>

                            <h2>A Vision for Change</h2>
                            <p>Every home tells a story, and this particular design is a testament to the power of intentional living. We focused on neutral tones that allow natural light to play across every surface, creating a dynamic environment that changes throughout the day.</p>

                            <h3>Key Design Elements</h3>
                            <ul>
                                <li><strong>Minimalism:</strong> Less is more. We selected only the most impactful pieces.</li>
                                <li><strong>Texture:</strong> Combining rough wood with smooth linen for sensory contrast.</li>
                                <li><strong>Sustainability:</strong> Using materials that stand the test of time.</li>
                            </ul>

                            <p>To recreate this look, we suggest starting with the foundation—the color palette. Choose three primary tones and stick to them strictly across all furniture and accessories.</p>

                            <div className={styles.adBox}>
                                Monetag / Recommendation Widget
                            </div>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}
