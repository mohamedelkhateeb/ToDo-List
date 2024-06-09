import RealTimeComponent from "@/components/RealTimeComponent";
const fetchData = async () => {
  try {
    const start = await fetch("/api/stream", {
      method: "GET",
    });
  } catch (err) {
    console.log(err);
  }
};
const Home = async () => {
  const res = await fetchData();
  console.log({res});
  
  return (
    <>
      <RealTimeComponent />
    </>
  );
};

export default Home;
