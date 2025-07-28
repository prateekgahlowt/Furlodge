This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Environment Setup

Before running the project, you need to set up your environment variables.

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```
   > On Windows, you can use:  
   > `copy .env.example .env`

2. Open `.env` in your code editor and fill in the required values:
   - `MONGODB_URI` – Your MongoDB connection string
   - `DATABASE_URL` – (If using Postgres/Prisma) Your database connection string
   - `JWT_SECRET` – A strong secret for JWT signing
   - `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` – Your email provider credentials
   - `NEXTAUTH_URL`, `NEXTAUTH_SECRET` – (If using NextAuth) Your app URL and secret

3. Never commit your real `.env` file or secrets to GitHub!
   Only `.env.example` is tracked for reference.

---

That’s it! You’re ready to run the project.

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
