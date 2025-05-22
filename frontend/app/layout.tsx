import './globals.css';
import type { Metadata } from 'next';
import { Syne  } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})


export const metadata: Metadata = {
  title: 'Memora - AI Meeting Assistant',
  description: 'Transcribe, summarize, and index your meetings with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={syne.variable}>
      <body className={`${syne.className} bg-background text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}