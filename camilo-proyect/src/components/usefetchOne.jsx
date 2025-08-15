import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchOne(url,id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch(url + id)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((e) => {
      setError(true);
      setLoading(false);
    });
}, [id]);

  return { data, error, loading };
}

export default useFetchOne;
