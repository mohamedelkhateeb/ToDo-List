import Form from "@/components/Form";
import { getData } from "@/actions/todoActions";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
const Home = async () => {
  const data: any = await getData();
  return (
    <>
      <Form />
      <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex justify-center flex-col items-center w-[1000px] ">
          <div className=" flex flex-col gap-5 items-center justify-center mt-10 w-full">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
