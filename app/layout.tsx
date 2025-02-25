import "./globals.css";
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>CRUD app with Next.js</title>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}