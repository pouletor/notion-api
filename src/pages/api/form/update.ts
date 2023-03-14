import https from "https";

import { Client } from "@notionhq/client";

import type { NextApiRequest, NextApiResponse } from "next";

const agent = new https.Agent({
  rejectUnauthorized: false,
});
const notion = new Client({ auth: process.env.NOTION_KEY, agent });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const databaseId = process.env.NOTION_DATABASE_ID || "";

  const {
    nom = "",
    prenom = "",
    email = null,
    telephone = null,
    favorite_number = null,
    commentaires = "",
    weather = undefined,
  } = req.body;

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: prenom + " " + nom,
            },
          },
        ],
      },
      email: {
        email: email,
      },
      telephone: {
        phone_number: telephone,
      },
      favorite_number: {
        number: favorite_number ? Number(favorite_number) : favorite_number,
      },
      ...(weather && {
        weather: {
          select: {
            name: weather,
          },
        },
      }),
      commentaires: {
        rich_text: [
          {
            text: {
              content: commentaires,
            },
          },
        ],
      },
    },
  });

  console.log("Success! Entry added.");

  res.status(200).json({ data: response });
}
