import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserEntryPage from "./features/userEntry/UserEntryPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserEntryPage />
    </QueryClientProvider>
  );
}
