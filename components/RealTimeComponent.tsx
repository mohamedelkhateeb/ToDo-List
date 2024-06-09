// components/RealTimeComponent.tsx
"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

interface DataItem {
  _id: string;
  [key: string]: any;
}

const RealTimeComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (newData: { data: any }) {
      console.log("New data received:", newData.data);

      setData((prevData) => [...prevData, newData.data]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);
  console.log( process.env.NEXT_PUBLIC_PUSHER_KEY);
  
  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{JSON.stringify(item._id)}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComponent;
