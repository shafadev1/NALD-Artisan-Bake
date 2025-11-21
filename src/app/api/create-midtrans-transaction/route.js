import Midtrans from "midtrans-client";

export async function POST(request) {
  console.log("SERVER KEY DI SERVER:", process.env.MIDTRANS_SERVER_KEY);
  try {
    const body = await request.json();

    const snap = new Midtrans.Snap({
      isProduction: false, // Sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: body.total,
      },
      item_details: [
        {
          id: "PRODUCT-" + Date.now(),
          price: body.price,
          quantity: body.qty,
          name: body.name,
        },
      ],
      customer_details: {
        first_name: body.customerName || "Customer",
        phone: body.customerPhone || "",
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return Response.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return Response.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
