"use client";

import styles from "./page.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";



export default function Home() {
  const products = [
    { id: 1, name: "Cake Slice", price: "Rp 85.000", image: "/uploads/cakeslice.jpg" },
    { id: 2, name: "Macaroon", price: "Rp 70.000", image: "/uploads/macaroon.jpg" },
    { id: 3, name: "Croissant", price: "Rp 90.000", image: "/uploads/croissant.jpg" },
    { id: 4, name: "hampers", price: "Rp 75.000", image: "/uploads/hampers.jpg" },
  ];

  useEffect(() => {
    const handleSmoothScroll = (e: any) => {
      if (e.target.tagName === "A" && e.target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = e.target.getAttribute("href")!.substring(1);
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <main className={styles.container}>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>NALD Artisan Bake</div>
        <div className={styles.navLinks}>
          <a href="#hero">Home</a>
          <a href="#products">Katalog</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero} id="hero">
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Every Bake, A Story.</h1>
          
          <p>
            Crafted with care and character — pastries that evoke warmth, memory,
            and delight in every bite.
          </p>
  
        </motion.div>
      </section>

      {/* Product Section */}
    <section className={styles.products} id="products">
  <h2>Our Signature Collection</h2>
  <p className={styles.subText}>A curation of our favorite creations — crafted to savor.</p>

  <div className={styles.grid}>
    {products.map((product) => (
      <div className={styles.card} key={product.id}>
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={350}
          className={styles.image}
        />
        <h3>{product.name}</h3>
      </div>
    ))}
  </div>

  <Link href="/katalog" className={styles.katalogBtn}>
  Our Katalog →
  </Link>

</section>


      {/* ✅ NEW — ABOUT US SECTION */}
      <section className={styles.about} id="about">
        <h2>About Us</h2>
        <p>
          At NALD Artisan Bake, we believe pastries should do more than taste good — they should tell a story.
          Each creation is handcrafted with intentional detail, using thoughtfully selected ingredients to evoke
          warmth, memory, and delight. Our kitchen is guided by patience, curiosity, and a genuine love for the craft.
        </p>
      </section>

      {/* Testimonials */}
<section className={styles.testimonials} id="reviews">
  <h2>What They Say</h2>

  <div className={styles.reviewWrapper}>
    {[
      { name: "Ava", review: "The croissants are heavenly — warm, flaky, and beautifully layered." },
      { name: "Julian", review: "Each pastry feels thoughtfully crafted. You can taste the care." },
      { name: "Mila", review: "The sourdough is a favorite! Perfect balance of flavor and texture." },
      { name: "Theo", review: "Not just delicious — memorable. Everything feels personal." },
    ].map((r, i) => (
      <div key={i} className={styles.reviewCard}>
        <h4>{r.name}</h4>
        <p className={styles.stars}>★★★★★</p>
        <p>{r.review}</p>
      </div>
    ))}
  </div>
</section>

     {/* Contact */}
<section className={styles.contact} id="contact">
  <h2>Contact Us</h2>
  <p className={styles.contactText}>
    For pre-orders, custom cakes, or collaboration inquiries — we’d love to connect.
  </p>

  <div className={styles.socials}>
    <a href="https://instagram.com/naldartisanbake" target="_blank" rel="noopener noreferrer" className={styles.igBtn}>
      Instagram
    </a>
    <a href="mailto:hello@naldartisanbake.com" className={styles.emailBtn}>
      Email
    </a>
    <a
      href="https://wa.me/6285791176331"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.waBtn}
    >
      WhatsApp
    </a>
  </div>
</section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} NALD Artisan Bake · Every Bake, A Story.
      </footer>
    </main>
  );
}
