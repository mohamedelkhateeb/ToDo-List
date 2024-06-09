// app/api/stream/route.ts
import clientPromise from "@/lib/mongodb";
import pusher from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";
let changeStreamStarted = false;

async function startChangeStream() {
  const client = await clientPromise;
  const db = client.db("todo");
  const collection = db.collection("Todo");

  const changeStream = collection.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newData = change.fullDocument;
      await pusher.trigger("my-channel", "my-event", {
        data: newData,
      });
    }
  });
}

export async function GET(req: NextRequest) {
  if (!changeStreamStarted) {
    await startChangeStream();
    changeStreamStarted = true;
  }
  return NextResponse.json({ message: "Change stream started" });
}
