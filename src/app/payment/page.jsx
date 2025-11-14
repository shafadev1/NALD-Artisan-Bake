"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./payment.module.scss";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Unknown Product";
  const price = searchParams.get("price") || "Rp 0";
  const image = searchParams.get("image") || "/uploads/default.jpg";

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Order Summary</h1>

        <div className={styles.productInfo}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className={styles.productImage}
              priority
            />
          </div>

          <div className={styles.details}>
            <h2>{name}</h2>
            <p className={styles.price}>{price}</p>
          </div>
        </div>

        <button className={styles.payBtn}>Proceed to Payment</button>
      </div>
    </main>
  );
}
