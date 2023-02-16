import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const paymentRequest = req.query.paymentRequest;
      if (!paymentRequest)
        return res.status(400).json({ error: "No payment request" });
      const response = await fetch(
        `http://localhost:5001/getInvoiceStatus?paymentRequest=${paymentRequest}`
      );
      const res1 = await response.json();
      return res.status(200).json(res1);
    case "POST":
      console.log({
        mint: req.body.mints,
        address: req.body.address,
        amount: req.body.amount,
      });
      const res2 = await (
        await fetch("http://localhost:5001/generateInvoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numberOfInscriptions: req.body.mints,
            address: req.body.address,
            totalAmountInSats: req.body.amount,
            collectionId: req.body.collectionId,
            userId: req.body.userId,
          }),
        })
      ).json();
      return res.status(200).json(res2);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
