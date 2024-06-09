import { MongoClient } from "mongodb";
import { PassThrough } from "stream";

let changeStream;

async function connectToDatabase() {
  try {
    const client = new MongoClient(
      "mongodb+srv://mokhateeb74:dIDvfFQE2UYZp0fe@todo.nwmg2bz.mongodb.net/?retryWrites=true&w=majority&appName=todo",
      {
        useNewUrlParser: true,
      }
    );
    await client.connect();
    return client.db("todo");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const stream = new PassThrough();

    if (!changeStream) {
      const db = await connectToDatabase();
      const collection = db.collection("Todo");
      changeStream = collection.watch();

      // Fetch the entire collection at the entry point
      const initialData = await collection.find({}).toArray();
      stream.write(`data: ${JSON.stringify(initialData)}\n\n`);

      // Setting up the change stream for real-time updates
      changeStream.on("change", (next) => {
        stream.write(`data: ${JSON.stringify(next)}\n\n`);
      });
    }

    const responseInit = {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    };

    return new Response(stream, responseInit);
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
