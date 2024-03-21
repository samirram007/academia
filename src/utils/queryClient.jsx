import { QueryCache, QueryClient } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify-modernize";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry:2,
        retryDelay: (attempt) => Math.pow(2, attempt)*1000, // exponential backoff
        onError: (e, key, context) => {
          console.error(`[Query Error]: ${key}`, e);
          if (!context?.pause) {
            toast.error("An error occurred while fetching data");
          }
        },

      },
    },
  })
// export const queryClient = new QueryClient({
//     queryCache: new QueryCache({
//       onError: (error, query) => {
//         // 🎉 only show error toasts if we already have data in the cache
//         // which indicates a failed background update
//         if (query.state.data !== undefined) {
//           toast.error(`Something went wrong: ${error.message}`,{transition:Flip} )
//         //   toast.error(error.response.data.message ,{transition:Flip}  )
//         }
//       },
//     }),
//   })