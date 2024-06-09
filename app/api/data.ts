// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
import pusher from "@/lib/pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("todo");
  const collection = db.collection("Todo");
  if (req.method === "POST") {
    const data = req.body;

    // Insert data into MongoDB
    const result = await collection.insertOne(data);
    // Trigger Pusher event
    await pusher.trigger("my-channel", "my-event", {
      message: "New data inserted",
      data: result.ops[0],
    });
    res.status(200).json({ success: true, data: result.ops[0] });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
