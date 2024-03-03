import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserEntryPage from "./features/userEntry/UserEntryPage";
import UserEntriesPage from "./features/userEntries/UserEntriesPage";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./config/reactQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserEntriesPage />,
  },
  {
    path: "/createUser",
    element: <UserEntryPage />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-black text-white",
        }}
      />
    </QueryClientProvider>
  );
}
