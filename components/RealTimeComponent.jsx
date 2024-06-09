"use client";
// components/RealTimeComponent.tsx
import { useEffect, useState } from "react";

const RealTimeComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000 ");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = function (event) {
      console.log("WebSocket message received:", event.data);
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "initial") {
        // Initial data
        setData(parsedData.data);
      } else if (parsedData.type === "change") {
        // Handle the change stream data
        setData((prevData) => {
          // Process the change stream event and update state accordingly
          return [...prevData, parsedData.data.fullDocument];
        });
      }
    };

    ws.onerror = function (err) {
      console.error("WebSocket error:", err);
    };

    ws.onclose = function () {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={item._id}>{index}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComponent;
