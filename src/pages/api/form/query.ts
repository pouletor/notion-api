import https from "https";

import { Client } from "@notionhq/client";

import type { NextApiRequest, NextApiResponse } from "next";

const agent = new https.Agent({
  rejectUnauthorized: false,
});
const notion = new Client({ auth: process.env.NOTION_KEY, agent });

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const databaseId = process.env.NOTION_DATABASE_ID || "";

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  res.status(200).json({ data: response });
}
