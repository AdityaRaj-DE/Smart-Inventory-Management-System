import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

          <ReactQueryProvider>
            <Toaster position="top-right" />
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}