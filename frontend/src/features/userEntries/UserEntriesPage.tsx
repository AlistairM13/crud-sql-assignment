import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "./userEntriesService";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { Navbar } from "../../components/ui/navbar";

const UserEntriesPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userEntry"],
    queryFn: () => fetchAllUsers(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-6 md:p-8">
      <div className="pb-6 md:pb-8">
        <Navbar title="Users list" />
      </div>
      <DataTable
        searchKey="name"
        searchPlaceholder="Search name..."
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default UserEntriesPage;
