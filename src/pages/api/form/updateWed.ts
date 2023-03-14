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
  const databaseId = process.env.NOTION_DATABASE_WED_ID || "";

  const {
    nom = "",
    prenom = "",
    email = null,
    telephone = null,
    nb_personnes = null,
    allergies = "",
    commentaires = "",
    mairie = undefined,
    reception = false,
    brunch = false,
    omnivore = null,
    vegetarien = null,
    "pesco-vegetarien": pescoVegetarien = null,
    vegetalien = null,
    navette = undefined,
    plus1 = "",
    plus2 = "",
    plus3 = "",
    plus4 = "",
    plus5 = "",
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
      nb_personnes: {
        number: nb_personnes,
      },
      ...(mairie && {
        mairie: {
          select: {
            name: mairie,
          },
        },
      }),

      reception: {
        checkbox: reception,
      },
      brunch: {
        checkbox: brunch,
      },
      omnivore: {
        number: omnivore,
      },
      vegetarien: {
        number: vegetarien,
      },
      "pesco-vegetarien": {
        number: pescoVegetarien,
      },
      vegetalien: {
        number: vegetalien,
      },
      ...(navette && {
        navette: {
          select: {
            name: navette,
          },
        },
      }),
      allergies: {
        rich_text: [
          {
            text: {
              content: allergies,
            },
          },
        ],
      },
      commentaires: {
        rich_text: [
          {
            text: {
              content: commentaires,
            },
          },
        ],
      },
      invité: {
        rich_text: [
          {
            text: {
              content: prenom + " " + nom,
            },
          },
        ],
      },
      "+1": {
        rich_text: [
          {
            text: {
              content: plus1,
            },
          },
        ],
      },
      "+2": {
        rich_text: [
          {
            text: {
              content: plus2,
            },
          },
        ],
      },
      "+3": {
        rich_text: [
          {
            text: {
              content: plus3,
            },
          },
        ],
      },
      "+4": {
        rich_text: [
          {
            text: {
              content: plus4,
            },
          },
        ],
      },
      "+5": {
        rich_text: [
          {
            text: {
              content: plus5,
            },
          },
        ],
      },
    },
  });

  console.log("Success! Entry added.");

  res.status(200).json({ data: response });
}
