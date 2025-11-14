export async function POST(req) {
  const body = await req.json();

  // Simulasi transaksi sukses
  return new Response(
    JSON.stringify({
      success: true,
      message: "Payment successful",
      transactionId: "TX-" + Math.floor(Math.random() * 1000000),
      receivedData: body,
    }),
    { status: 200 }
  );
}
