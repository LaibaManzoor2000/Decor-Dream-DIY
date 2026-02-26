import styles from "./page.module.css";
import Link from "next/link";
import { supabase } from "../utils/supabase/client";
import { Sofa, Hammer, ChefHat, Ruler, Lightbulb, Sparkles, Heart, ChevronRight } from "lucide-react";
import { getSafeImg } from "../utils/images";

export const revalidate = 0; // Disable caching to fetch live pins

export default async function Home() {
  const { data: pins, error } = await supabase
    .from('pins')
    .select(`*, profiles:author_id ( username, avatar_url )`)
    .order('created_at', { ascending: false });

  const heroPin = pins?.[0];
  const diyProjects = pins?.filter(p => p.category?.toLowerCase().includes('diy'))?.slice(0, 3) || [];
  const decorFeed = pins?.slice(0, 12) || [];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Decor Dream DIY",
            "description": "Premium High-End Home Decor & DIY Living Inspiration",
            "url": "https://decordreamdiy.com"
          })
        }}
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className={`${styles.kicker} animate-up`}>
                <Sparkles size={14} /> <span>Decor Dream DIY 2026</span>
              </div>
              <h1 className={`${styles.heroTitle} animate-up`}>
                Create Your <span>Dream</span> <br /> Home with Ease.
              </h1>
              <p className={`${styles.heroSubtitle} animate-up`}>
                Master professional DIY projects and discover curated interior design inspiration for every corner of your home.
              </p>
              <div className={`${styles.heroActions} animate-up`}>
                <Link href="/pins" className="btn btn-primary">Browse Ideas</Link>
                <Link href="/diy" className="btn btn-outline">Master DIY Guides</Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.mainImageFrame}>
                <img src="https://images.unsplash.com/photo-1616486341353-c583320f7881?q=80&w=2000&auto=format&fit=crop" alt="Premium Living Room Decor" className={styles.floatingImg} />
                <div className={styles.glassCard}>
                  <p>“Turning every house into a dream home.”</p>
                  <span>— Decor Dream DIY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav (Small Pro Icons) */}
      <section className={styles.quickNav}>
        <div className="container">
          <div className={styles.navGrid}>
            <Link href="/category/living-room" className={styles.navItem}>
              <div className={styles.circleIcon}><Sofa size={18} /></div>
              <span>Living Room</span>
            </Link>
            <Link href="/category/diy" className={styles.navItem}>
              <div className={styles.circleIcon}><Hammer size={18} /></div>
              <span>DIY Projects</span>
            </Link>
            <Link href="/category/kitchen" className={styles.navItem}>
              <div className={styles.circleIcon}><ChefHat size={18} /></div>
              <span>Kitchen Decor</span>
            </Link>
            <Link href="/category/lighting" className={styles.navItem}>
              <div className={styles.circleIcon}><Lightbulb size={18} /></div>
              <span>Lighting Ideas</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DIY Section (Standardized Grids) */}
      <section className={styles.diySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.serifTitle}>Practical DIY Guides</h2>
              <p>Step-by-step tutorials from the Decor Dream DIY experts.</p>
            </div>
            <Link href="/diy" className={styles.viewMore}>See All <ChevronRight size={16} /></Link>
          </div>

          <div className={styles.diyGrid}>
            {(diyProjects.length > 0 ? diyProjects : [1, 2, 3]).map((p, i) => (
              <article key={p.id || i} className={styles.diyCard}>
                <div className={styles.cardImageFixed}>
                  <img src={getSafeImg(p, i + 50)} alt={p.title || "Home DIY Project"} loading="lazy" />
                  <div className={styles.difficulty}>Intermediate</div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <Ruler size={13} /> <span>3 Hours</span>
                    <span className={styles.separator}>•</span>
                    <span>$$ Budget Friendly</span>
                  </div>
                  <Link href={p.id ? `/pin/${p.id}` : "#"}>
                    <h4>{p.title || `DIY Project Series ${i + 1}`}</h4>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Feed (2-Column Mobile Masonry Style) */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.centerHeader}>
            <h2 className={styles.serifTitle}>Visual Inspiration Feed</h2>
            <div className={styles.categoryPills}>
              <span className={styles.activePill}>All Rooms</span>
              <span>Minimalist</span>
              <span>Modern DIY</span>
              <span>Boho Living</span>
            </div>
          </div>

          <div className={styles.equalGrid}>
            {decorFeed.map((pin, i) => (
              <div key={pin.id || i} className={styles.equalItem}>
                <Link href={pin.id ? `/pin/${pin.id}` : "#"}>
                  <div className={styles.pinWrapper}>
                    <img src={getSafeImg(pin, i + 200)} alt="Decor Idea" loading="lazy" />
                    <div className={styles.pinOverlay}>
                      <button className={styles.heartBtn}><Heart size={18} /></button>
                      <span className={styles.saveBadge}>Save Idea</span>
                    </div>
                  </div>
                  <div className={styles.pinText}>
                    <h4>{pin.title || `Inspiration ${i + 1}`}</h4>
                    <div className={styles.authorGroup}>
                      <div className={styles.avatarMini}>D</div>
                      <span>Decor Dream DIY</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <h2>Ready for a Home Makeover?</h2>
              <p>Get our exclusive "Decor Dream" lists and DIY tutorials delivered every Friday.</p>
              <form className={styles.proForm}>
                <input type="email" placeholder="Email Address..." required />
                <button type="submit">Join Decor Dream DIY</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
