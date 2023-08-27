import axios from "axios";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useGlobalContext } from "./Context";

const Stats = () => {
  const [shortID, setShortID] = useState("");
  const [data, setData] = useState();

  const { dark } = useGlobalContext();

  let url = `http://localhost:8888/.netlify/functions/server/stats/${shortID}`;

  const setID = (e) => {
    let value = e.currentTarget.value;
    setShortID(value);
  };

  const fetchLink = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(url);
    setData([data]);
    setShortID("");
  };

  return (
    <div className={`${dark ? "stats-container" : ""}`}>
      <div className={`${dark ? "stats dark-stats" : "stats "}`}>
        <h2 className="heading">Enter URL ID</h2>
        <p className={`${dark ? "content dark-content" : "content "}`}>
          Enter the correct shortID
        </p>

        <article className="input-section">
          <form onSubmit={fetchLink}>
            <input
              value={shortID}
              onChange={setID}
              type="text"
              placeholder="ShortID"
            />
            <button className="btn">Click Me</button>
          </form>
        </article>

        {data && data[0].status && (
          <article className="links stats-link dark-links">
            <a target="_blank" href={data[0].result[0].url} className="link">
              {data[0].result[0].url}
            </a>
            <h2 className="hits link">{data[0].result[0].hits}</h2>
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(data[0].result[0].url);
                alert("Link Copied");
              }}
              className="icon copy"
            />
          </article>
        )}

        {data && data[0].status === false && (
          <h2 className="error">please enter the correct ID</h2>
        )}
      </div>
    </div>
  );
};

export default Stats;
