"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./katalog.module.scss";

export default function Katalog() {
  const categories = [
    "Cake Slice",
    "Macaroon",
    "Croissant",
    "Hampers",
    "Bread",
    "Cake",
    "Pudding",
  ];

  const products = [
    // Cake Slice
    {
      name: "Strawberry Cheesecake Slice",
      price: "Rp 32.000",
      category: "Cake Slice",
      image: "/uploads/cakeslice1.jpg",
    },
    {
      name: "Blueberry Cheesecake Slice",
      price: "Rp 32.000",
      category: "Cake Slice",
      image: "/uploads/cakeslice2.jpg",
    },
    {
      name: "blackforest cake slice",
      price: "Rp 30.000",
      category: "Cake Slice",
      image: "/uploads/cakeslice3.jpg",
    },

    // Macaroon
    {
      name: "Matcha Macaroon",
      price: "Rp 15.000",
      category: "Macaroon",
      image: "/uploads/macaroon1.jpg",
    },
    {
      name: "Hampers Macaroon",
      price: "Rp 270.000",
      category: "Macaroon",
      image: "/uploads/macaroon2.jpg",
    },
    {
      name: "Chocolate Macaroon",
      price: "Rp 15.000",
      category: "Macaroon",
      image: "/uploads/macaroon3.jpg",
    },

    // Pastry
    {
      name: "Classic Butter Croissant",
      price: "Rp 20.000",
      category: "Croissant",
      image: "/uploads/croissant1.jpg",
    },
    {
      name: "Cromboloni Kunafa",
      price: "Rp 22.000",
      category: "Croissant",
      image: "/uploads/croissant2.jpg",
    },
    {
      name: "Almond Croissant",
      price: "Rp 25.000",
      category: "Croissant",
      image: "/uploads/croissant3.jpg",
    },

    // Hampers
    {
      name: "Premium Hampers Set",
      price: "Rp 280.000",
      category: "Hampers",
      image: "/uploads/hampers1.jpg",
    },
    {
      name: "Elegant Hampers Box",
      price: "Rp 350.000",
      category: "Hampers",
      image: "/uploads/hampers2.jpg",
    },
    {
      name: "Christmas Hampers Box",
      price: "Rp 350.000",
      category: "Hampers",
      image: "/uploads/hampers3.jpg",
    },

    // Bread
    {
      name: "Sourdough Bread",
      price: "Rp 55.000",
      category: "Bread",
      image: "/uploads/bread1.jpg",
    },
    {
      name: "Soft Milk Bread",
      price: "Rp 25.000",
      category: "Bread",
      image: "/uploads/bread2.jpg",
    },
    {
      name: "Bagel",
      price: "Rp 25.000",
      category: "Bread",
      image: "/uploads/bread3.jpg",
    },

    // Cake
    {
      name: "Matilda Cake",
      price: "Rp 160.000",
      category: "Cake",
      image: "/uploads/cake1.jpg",
    },
    {
      name: "Red Velvet Cake",
      price: "Rp 170.000",
      category: "Cake",
      image: "/uploads/cake3.jpg",
    },
    {
      name: "Tiramissu Cake",
      price: "Rp 170.000",
      category: "Cake",
      image: "/uploads/cake4.jpg",
    },

    // Pudding
    {
      name: "Japanese Caramel Pudding",
      price: "Rp 65.000",
      category: "Pudding",
      image: "/uploads/pudding1.jpg",
    },
    {
      name: "Coconut Pudding",
      price: "Rp 65.000",
      category: "Pudding",
      image: "/uploads/pudding2.jpg",
    },
     {
      name: "Manggo Pudding",
      price: "Rp 65.000",
      category: "Pudding",
      image: "/uploads/pudding3.jpg",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Cake Slice");

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src="/uploads/headkatalog.png"
          alt="Hero Banner"
          fill
          priority
          className={styles.heroImage}
        />
      </section>

      {/* CATEGORY TABS */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <section className={styles.products}>
        {filteredProducts.map((product, index) => (
          <div className={styles.card} key={index}>
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={320}
              className={styles.image}
            />
            <h3>{product.name}</h3>
            <p className={styles.price}>{product.price}</p>

            {/* ORDER NOW BUTTON */}
            <Link
              href={{
                pathname: "/payment",
                query: {
                  name: product.name,
                  price: product.price,
                  image: product.image,
                },
              }}
              className={styles.orderBtn}
            >
              Order Now
            </Link>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} NALD Artisan Bake · Every Bake, A Story.
      </footer>
    </main>
  );
}
