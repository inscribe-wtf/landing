import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
const supabaseUrl = "https://wxkuupskzfjcajqdstaz.supabase.co";
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_KEY as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.query.collectionId) {
        const { data, error } = await supabase
          .from("Inscriptions")
          .select("*")
          .eq("collection", req.query.collectionId)
          .order("created_at", { ascending: false })
          .limit(6);
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(data);
        }
        return;
      }
      if (req.query.userId) {
        const { data, error } = await supabase
          .from("Inscriptions")
          .select("*")
          .eq("user", req.query.userId)
          .order("created_at", { ascending: false });
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(data);
        }
        return;
      }
      const { data, error } = await supabase
        .from("Inscriptions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(data);
      }

      break;
    case "POST":
      console.log({
        paymentRequest: req.body.paymentRequest,
      });
      const res2 = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/inscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentRequest: req.body.paymentRequest,
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
