"use client";
import { useEffect, useState } from "react";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

const RealTimeComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("/api/listen");

    eventSource.onmessage = function (event) {
      const parsedData = JSON.parse(event?.data);
      console.log(parsedData);

      if (Array.isArray(parsedData)) {
        setData(parsedData);
      }

      if (parsedData.operationType === "insert") {
        setData((prevData) => [parsedData.fullDocument, ...prevData]);
      }

      if (parsedData.operationType === "update") {
        const { documentKey, updateDescription } = parsedData;
        const { updatedFields } = updateDescription;

        setData((prevData) => prevData.map((item) => (item._id === documentKey._id ? { ...item, ...updatedFields } : item)));
      }
      if (parsedData.operationType === "delete") {
        setData((prevData) => prevData.filter((item) => item._id !== parsedData.documentKey._id));
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
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default RealTimeComponent;
