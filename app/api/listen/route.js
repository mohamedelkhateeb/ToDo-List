"use server";
const WebSocket = require("ws");
const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://mokhateeb74:dIDvfFQE2UYZp0fe@todo.nwmg2bz.mongodb.net/?retryWrites=true&w=majority&appName=todo",
  {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("todo");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

const wss = new WebSocket.Server({ port: 4000 });

wss.on("listening", () => {
  console.log("WebSocket server is listening on port 3000");
});

wss.on("connection", async (ws) => {
  console.log("New client connected");

  try {
    const db = await connectToDatabase();
    const collection = db.collection("Todo");

    // Send the entire collection at the entry point
    const initialData = await collection.find({}).toArray();
    console.log({ initialData });
    ws.send(JSON.stringify({ type: "initial", data: initialData }));

    // Set up the change stream for real-time updates
    const changeStream = collection.watch();
    changeStream.on("change", (next) => {
      ws.send(JSON.stringify({ type: "change", data: next }));
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      changeStream.close();
    });
  } catch (err) {
    console.error("Failed to set up WebSocket connection", err);
    ws.close();
  }
});
