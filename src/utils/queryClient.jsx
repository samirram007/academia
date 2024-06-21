import { QueryCache, QueryClient } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify-modernize";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry:2,
        retryDelay: (attempt) => Math.pow(2, attempt)*1000, // exponential backoff
        onError: (e, key, context) => {
         // console.error(`[Query Error]: ${key}`, e);
          if (!context?.pause) {
            toast.error("An error occurred while fetching data");
          }
        },

      },
    },
  })
