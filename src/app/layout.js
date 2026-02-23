import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "Decor Dream DIY | Premium Home Decor Ideas & DIY Tutorials",
    template: "%s | Decor Dream DIY"
  },
  description: "Discover curated home decor inspiration, professional DIY project guides, and interior design trends. Join our community of home decor enthusiasts at Decor Dream DIY.",
  metadataBase: new URL('https://decordreamdiy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://decordreamdiy.com",
    siteName: "Decor Dream DIY",
    title: "Decor Dream DIY | Soulful Home Inspiration",
    description: "Curated decor projects and DIY tutorials for beautiful living.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
