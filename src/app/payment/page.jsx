"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./payment.module.scss";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  // ----------------------------
  // GET DATA DARI URL PARAMS
  // ----------------------------

  const name = searchParams.get("name") || "Produk Tidak Ditemukan";

  // FIX UTAMA: konversi "Rp 32.000" menjadi angka 32000
  const rawPrice = searchParams.get("price") || "0";
  const price = parseInt(rawPrice.replace(/\D/g, "")) || 0;

  const image = searchParams.get("image") || "/placeholder.jpg";

  const [method, setMethod] = useState("delivery");
  const [qty, setQty] = useState(1);

  const totalPrice = qty * price;

  return (
    <main className={styles.container}>
      {/* PRODUCT CARD */}
      <div className={styles.card}>
        <h1 className={styles.title}>Order Summary</h1>

        <div className={styles.productInfo}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className={styles.productImage}
          />

          <div className={styles.details}>
            <h2>{name}</h2>
            <p className={styles.price}>
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* QUANTITY SELECT */}
        <div className={styles.qtyBox}>
          <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        {/* TOTAL */}
        <div className={styles.totalBox}>
          <p>Total Harga</p>
          <h3>Rp {totalPrice.toLocaleString("id-ID")}</h3>
        </div>
      </div>

      {/* FORM */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Delivery Details</h2>

        <div className={styles.methodButtons}>
          <button
            className={method === "delivery" ? styles.active : ""}
            onClick={() => setMethod("delivery")}
          >
            Delivery
          </button>

          <button
            className={method === "pickup" ? styles.active : ""}
            onClick={() => setMethod("pickup")}
          >
            Pick Up
          </button>
        </div>

        {/* FORM FIELDS */}
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nama Penerima</label>
            <input type="text" placeholder="Nama lengkap" />
          </div>

          <div className={styles.inputGroup}>
            <label>Nomor Telepon</label>
            <input type="text" placeholder="0812xxxxxxx" />
          </div>

          {method === "delivery" && (
            <>
              <div className={styles.inputGroup}>
                <label>Alamat Lengkap</label>
                <textarea placeholder="Masukkan alamat lengkap"></textarea>
              </div>

              <div className={styles.inputGroup}>
                <label>Catatan (opsional)</label>
                <input type="text" placeholder="Contoh: rumah cat coklat" />
              </div>
            </>
          )}

          {method === "pickup" && (
            <>
              <div className={styles.inputGroup}>
                <label>Hari</label>
                <input type="text" placeholder="Contoh: Senin" />
              </div>

              <div className={styles.inputGroup}>
                <label>Tanggal</label>
                <input type="date" />
              </div>

              <div className={styles.inputGroup}>
                <label>Jam Pickup</label>
                <input type="time" />
              </div>
            </>
          )}
        </div>

        <button className={styles.payBtn}>Proceed to Payment</button>
      </div>
    </main>
  );
}
