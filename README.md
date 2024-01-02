This project is a starter to create a web application using [Next.js](https://nextjs.org/) and [Notion](https://www.notion.so) as a database. The connexion to Notion is made with [Notion API](https://developers.notion.com/docs/getting-started).

## Setup

1. You need a Notion account, if you don't have one, create yours on [https://www.notion.so/login](https://www.notion.so/login)

2. [Create an integration](https://www.notion.so/my-integrations). We'll name it YOUR_INTEGRATION for the example, and copy the secret that will be YOUR_NOTION_KEY

3. In notion, create a database with the following fields (if you want to match the actual code):

- **email** with _email_ type,
- **telephone** with _phone_number_ type,
- **favorite_number** with _number_ type,
- **weather** with _select_ type
- **commentaires** with _text_ type

4. In the settings of this database, go to add connections and select YOUR_INTEGRATION.

5. Create an .env.local or .env file at the root of this projet with:

```
NOTION_KEY="YOUR_NOTION_KEY"
NOTION_DATABASE_ID="YOUR_NOTION_DATABASE_ID"
```

- `YOUR_NOTION_KEY`: you can find it in [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations), go check YOUR_INTEGRATION and its secret

- `YOUR_NOTION_DATABASE_ID`: get the link of your database and copy the id https://www.notion.so/[NOTION_DATABASE_ID]?v=xxxxx

Your database is now connected with your integration. You will be able to interract with this database using the Notion API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Troubleshooting

When you move pages folder to src/ folder, you will need to delete the .next folder and restart the app to remove the cache.
