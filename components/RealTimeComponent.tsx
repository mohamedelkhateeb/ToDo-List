"use client"
// components/RealTimeComponent.tsx
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

interface DataItem {
  _id: string;
  [key: string]: any;
}

const RealTimeComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

    if (!pusherKey || !pusherCluster) {
      console.error('Pusher key or cluster is not defined');
      return;
    }

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (newData: { data: DataItem }) {
      setData((prevData) => [...prevData, newData.data]);
    });

    return () => {
      pusher.unsubscribe('my-channel');
    };
  }, []);
console.log(data);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComponent;
