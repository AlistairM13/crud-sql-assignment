import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "./userEntriesService";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { Navbar } from "../../components/ui/navbar";
import { LoadingSpinner } from "../../components/ui/loadingSpinner";

const UserEntriesPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userEntry"],
    queryFn: () => fetchAllUsers(),
  });

  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 md:p-8">
      <div className="pb-6 md:pb-8">
        <Navbar title="Users list" />
      </div>
      {isPending && (
        <div className="h-screen flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <LoadingSpinner />
        </div>
      )}
      {!error ? (
        <DataTable
          searchKey="name"
          searchPlaceholder="Search name..."
          columns={columns}
          data={data}
        />
      ) : (
        <div className="flex justify-center items-center">
          An error has occurred:
        </div>
      )}
    </div>
  );
};

export default UserEntriesPage;
