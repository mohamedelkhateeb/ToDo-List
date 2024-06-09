"use client";
// components/RealTimeComponent.tsx
import { useEffect, useState } from "react";

const RealTimeComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("/api/listen");

    eventSource.onmessage = function (event) {
      const parsedData = JSON.parse(event.data);
      if (Array.isArray(parsedData)) {
        // Initial data
        setData(parsedData);
      } else {
        // Handle the change stream data
        setData((prevData) => {
          // Process the change stream event and update state accordingly
          // This is a simplistic example. You may need to handle different types of change events (insert, update, delete)
          return [...prevData, parsedData.fullDocument];
        });
      }
    };

    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data.map((item , index) => (
          <li key={item._id}>{index}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComponent;
