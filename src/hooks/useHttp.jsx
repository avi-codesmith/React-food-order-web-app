import { useCallback, useEffect, useState } from "react";

async function handleHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(error.message || "Something went wrong, please try again!");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const handleHttp = useCallback(
    async function handleHttp(data) {
      setLoading(true);
      try {
        const resData = await handleHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong, please try again!");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config)
      handleHttp();
  }, [handleHttp, config]);

  return {
    data,
    error,
    loading,
    handleHttp,
    clearData,
  };
}
