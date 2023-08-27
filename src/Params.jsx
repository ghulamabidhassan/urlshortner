import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Params = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let url = `https://url-shortner-abid.netlify.app/.netlify/functions/server/stats/${id}`;

  const fetchUrl = async () => {
    const { data } = await axios.get(url);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  if (loading) {
    return <div className="params">{<h2>redirecting</h2>}</div>;
  } else if (data.status === false) {
    return (
      <div className="params">
        <h2>It seems that the link is broken</h2>;
      </div>
    );
  }
  return window.location.replace(data.result[0].url);
};

export default Params;
