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
    // get filter from req query
    case "GET":
      if (req.query.id) {
        const { data, error } = await supabase
          .from("Collections")
          .select("*")
          .eq("created_by", req.query.id)
          .order("created_at", { ascending: false });
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(data);
        }
        return;
      }
      const { data, error } = await supabase
        .from("Collections")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(data);
      }

      break;
    case "POST":
      const body = JSON.parse(req.body);
      console.log({ body });
      // Update or create data in your database
      const { data: collection, error: collectionError } = await supabase
        .from("Collections")
        .insert([
          {
            name: body.name,
            description: body.description,
            website: body.website,
            type: body.type,
            max_supply: body.maxSupply,
            cid: body.cid,
            mint_price_sats: body.mintPriceSats,
            end_time_ms: body.endTime,
            created_by: body.createdBy,
            thumbnail: body.thumbnail,
          },
        ])
        .single();
      if (collectionError) {
        res.status(500).json({ error: collectionError.message });
      } else {
        res.status(200).json(collection);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
