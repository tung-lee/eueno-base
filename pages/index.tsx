import { Inter } from 'next/font/google'
import { useSession,signOut } from "next-auth/react"
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <>
      Home
    </>
  )
}
Home.getLayout = (page: ReactNode) => {
  return <div>{page}</div>;
};
