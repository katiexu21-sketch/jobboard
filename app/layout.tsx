import type React from "react"
import type { Metadata } from "next"
import { Inter, Karla, Source_Serif_4 } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
})

export const metadata: Metadata = {
  title: "CreatorCareers - Jobs in the Creator Economy",
  description:
    "Find your next opportunity in the creator economy. Connect with leading creator businesses and advance your career as a video editor, content creator, social media manager, or creative professional.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${karla.variable} ${sourceSerif.variable} theme-red-rose antialiased`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
