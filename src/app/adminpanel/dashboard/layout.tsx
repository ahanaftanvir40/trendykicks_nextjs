import { Inter } from "next/font/google";
import NavBar from "../../components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="relative w-full flex justify-center items-center">
          <NavBar />
        </div>

        {children}
      </body>
    </html>
  );
}