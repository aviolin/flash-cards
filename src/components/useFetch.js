import React, { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setCache(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    doFetch();
  }, []);

  return { response, error, loading, cache };
}

export default useFetch;