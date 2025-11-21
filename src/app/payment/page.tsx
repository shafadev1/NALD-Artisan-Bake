"use client";
// deklarasi global agar window.snap dikenali
declare global {
  interface Window {
    snap: any;
  }
}

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./payment.module.scss";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  // DATA PRODUK
  const name = searchParams.get("name") || "Produk Tidak Ditemukan";
  const rawPrice = searchParams.get("price") || "0";
  const price = parseInt(rawPrice.replace(/\D/g, "")) || 0;
  const image = searchParams.get("image") || "/placeholder.jpg";

  const [method, setMethod] = useState("delivery");
  const [qty, setQty] = useState(1);

  const totalPrice = qty * price;

  // ---------------------------
  // LOAD MIDTRANS SNAP SCRIPT
  // ---------------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    );
    document.body.appendChild(script);
  }, []);

  // ---------------------------
  // HANDLE PAYMENT MIDTRANS
  // ---------------------------
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-midtrans-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          qty,
          total: totalPrice,
          customerName: "Customer",
          customerPhone: "08123456789",
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log("Midtrans response:", data);

      if (!data.token) {
        alert("Gagal mendapatkan token Midtrans!");
        return;
      }

      // Tampilkan popup MIDTRANS
      window.snap.pay(data.token, {
        onSuccess: () => alert("Pembayaran berhasil!"),
        onPending: () => alert("Menunggu pembayaran..."),
        onError: () => alert("Pembayaran gagal!"),
        onClose: () => alert("Anda menutup popup pembayaran"),
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

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
            <p className={styles.price}>Rp {price.toLocaleString("id-ID")}</p>
          </div>
        </div>

        {/* QUANTITY */}
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

        {/* BUTTON PAY */}
        <button className={styles.payBtn} onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </main>
  );
}
