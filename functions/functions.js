import mysql from "mysql2";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

// const pool = mysql
//   .createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "abid",
//     waitForConnections: true,
//     connectionLimit: 10,
//   })
//   .promise();

const pool = mysql.createPool(process.env.DATABASE_URL).promise();

const insertResult = async (shortID, url, hits) => {
  let data = await pool.query(
    `insert into urlshortner (shortID, url, hits)
  values (?, ?, ?)`,
    [shortID, url, hits]
  );
  return data;
};

const getUrl = async (shortID) => {
  let [data] = await pool.query(
    `select * from urlshortner where shortID = ? `,
    [shortID]
  );
  return data;
};

const updateHits = async (shortID) => {
  let hits = await pool.query(
    `update urlshortner set hits = hits + 1 where shortID = ?`,
    [shortID]
  );
  return hits;
};

const makeShortUrl = async (req, res) => {
  const url = req.body.url;
  if (url === "") {
    res.json({ status: false });
  } else {
    const hits = 0;
    const shortID = nanoid(6);
    const myUrl = "http://localhost:5173";
    const shortUrl = `${myUrl}/r/${shortID}`;
    const insertInto = await insertResult(shortID, url, hits);
    const data = await getUrl(shortID);
    res.json({ status: true, url: shortUrl, data });
  }
};

const urlRedirect = async (req, res) => {
  let { shortID } = await req.params;
  let hits = await updateHits(shortID);
  let data = await getUrl(shortID);

  if (data.length > 0) {
    res.json({ status: true, data });
  } else {
    res.json({ status: false, data });
  }
};

export { makeShortUrl, urlRedirect, getUrl };
