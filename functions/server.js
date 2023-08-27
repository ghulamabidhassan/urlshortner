import express from "express";
import serverless from "serverless-http";
import { nanoid } from "nanoid";
import cors from "cors";

import { makeShortUrl, urlRedirect, getUrl } from "./functions";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/.netlify/functions/server", router);

router.get("/", async (req, res) => {
  const id = nanoid(8);
  res.json({ id });
});

router.get("/:shortID", async (req, res) => {
  let result = await urlRedirect(req, res);
  return result;
});

router.get("/stats/:shortID", async (req, res) => {
  let { shortID } = req.params;
  let result = await getUrl(shortID);
  if (result.length > 0) {
    res.json({ status: true, result });
  } else {
    res.json({ status: false, result });
  }
});

router.post("/", async (req, res) => {
  let result = await makeShortUrl(req, res);
  return result;
});

export const handler = serverless(app);
