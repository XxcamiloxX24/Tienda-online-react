
import { useEffect, useState } from "react"
import axios from 'axios'

function useFetch(url) {
    const [information, setInformation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(url)
          .then(json => {console.log(json.data)
            setInformation(json.data)
            })
          .catch(err => setError(err))
          .finally(() => setLoading(false));
    }, [url]);

    return { information, loading, error };
}

export default useFetch