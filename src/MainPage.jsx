import { useState } from "react";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { useGlobalContext } from "./Context";

const MainPage = () => {
  const [link, setLink] = useState("");
  const [data, setData] = useState();
  const { dark, darkMode } = useGlobalContext();

  let url = "https://url-shortner-abid.netlify.app/.netlify/functions/server";

  const fetchLink = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(url, {
      url: link,
    });
    setLink("");
    setData([data]);
  };

  const setLinks = (e) => {
    const link = e.currentTarget.value;
    setLink(link);
  };
  return (
    <>
      <section className={`${dark ? "middle dark-middle" : "middle "}`}>
        <h2 className="heading">URL Shortner</h2>
        <p className={`${dark ? "content dark-content" : "content "}`}>
          Most link shorteners do too much.
          <br />
          This one just makes your links shorter.
        </p>
        <article className="input-section">
          <form onSubmit={fetchLink}>
            <input
              value={link}
              onChange={setLinks}
              placeholder="Paste your link here..."
              type="text"
            />
            <button type="submit" className="btn drop-btn">
              Drop!
            </button>
          </form>
        </article>
        {data && data[0].status && (
          <article className="links dark-links">
            <a target="_blank" href={data[0].url} className="link">
              {data[0].url}
            </a>
            <h2 className="hits link">{data[0].data[0].hits}</h2>
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(data[0].url);
                alert("Link Copied");
              }}
              className="icon copy"
            />
          </article>
        )}
        {data && data[0].status === false && (
          <h2 className="error">Please enter a valid link</h2>
        )}
      </section>
    </>
  );
};

export default MainPage;
