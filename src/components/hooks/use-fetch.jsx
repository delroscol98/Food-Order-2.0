import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const useFetch = (url, requestConfig) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dataFetch = useCallback(
    async (dataBody) => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: dataBody ? JSON.stringify(dataBody) : null,
        });

        console.log(response);

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    },
    [url, requestConfig]
  );

  useEffect(() => {
    if (
      (requestConfig &&
        (requestConfig.method === "GET" || !requestConfig.method)) ||
      !requestConfig
    ) {
      dataFetch();
    }
  }, [dataFetch]);

  return {
    isLoading,
    error,
    dataFetch,
    data,
  };
};

export default useFetch;
