import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import { updateUserEntry } from "../userEntriesService";
import { queryClient } from "../../../config/reactQuery";

export type User = {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  address: string;
  panNumber: string;
  aadhaarNumber: string;
  certificatePath: string;
  photoPath: string;
  status: "ACTIVE" | "INACTIVE";
  uploadedDateTime: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "panNumber",
    header: "PAN Number",
  },
  {
    accessorKey: "aadhaarNumber",
    header: "Aadhaar ID",
  },
  {
    accessorKey: "uploadedDateTime",
    header: "Uploaded On",
    cell: ({ row }) => {
      const { uploadedDateTime } = row.original;
      return <span>{new Date(uploadedDateTime).toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <span
          className={`font-bold ${
            status === "ACTIVE" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, certificatePath, photoPath, status } = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate: updateUserEntryMutation } = useMutation({
        mutationFn: (id: string) => updateUserEntry(id),
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({ queryKey: ["userEntry"] });
        },
        onError: () => {
          toast.error("Status update failed");
        },
      });

      const statusUpdateHandler = () => {
        if (status === "ACTIVE") {
          toast("Status has already been updated!");
          return;
        }
        updateUserEntryMutation(id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Link to={certificatePath} target="_verify">
                View Certificate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link to={photoPath} target="_verify">
                View Photo
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={statusUpdateHandler}
            >
              Update Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
