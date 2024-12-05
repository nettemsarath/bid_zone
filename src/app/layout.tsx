import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from './_components/Header'
import Footer from './_components/Footer'

// Load variable fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap', // Use swap for better loading experience
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap', // Use swap for better loading experience
})

// Metadata for the application
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}