import Midtrans from "midtrans-client";

export async function POST(request) {
  try {
    const body = await request.json();

    const snap = new Midtrans.Snap({
      isProduction: false, // Ubah ke true jika sudah live
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: body.total, // total harga masuk dari frontend
      },
      item_details: [
        {
          id: "product-001",
          price: body.price,
          quantity: body.qty,
          name: body.name,
        },
      ],
      customer_details: {
        first_name: body.customerName || "Customer",
        phone: body.customerPhone || "",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return Response.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return Response.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}
