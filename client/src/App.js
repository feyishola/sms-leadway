import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
