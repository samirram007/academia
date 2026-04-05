import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: (attempt) => Math.pow(2, attempt) * 1000, // exponential backoff
      onError: (e, key, context) => {
        // console.error(`[Query Error]: ${key}`, e);
        if (!context?.pause) {
          toast.error("An error occurred while fetching data");
        }
      },

    },
    mutations: {
      onError: (e) => {
        // toast.error("An error occurred while updating data");
      },
    },
  },
})
