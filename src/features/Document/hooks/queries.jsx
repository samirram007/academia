import { useQuery } from "@tanstack/react-query"

import { useCallback, useState } from "react";
import { fetchDocuments } from "../services/apis";

 const useDocumentQuery=()=> {




  const [selectedFilter, setSelectedFilter] = useState(localStorage.imageFilter ? localStorage.imageFilter : 'all');
  const filterCallbackFn = useCallback(
      (docs) => {

          if (!selectedFilter) return docs.data;
          if (selectedFilter.toLowerCase() === 'all') {
              return docs.data;
          }

          return docs.data.filter(

              (doc) => doc.document_type === selectedFilter.toLowerCase()
          );
      },
      [selectedFilter]
  );

  const documents = useQuery({
      queryKey: ['documents'],
      queryFn: fetchDocuments,
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1000 * 60,
      enabled: !!selectedFilter,
      select: filterCallbackFn

  });

 const handleFilter = (filter) => {
        setSelectedFilter(filter);
    }
  return {documents,handleFilter}

}
export  {useDocumentQuery};