import Head from 'next/head'
import { Inter } from '@next/font/google'
import HomeComponent from '../components/All/HomeComponent';

const inter = Inter({ subsets: ['latin'] })

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <>
      
      {
 "Apprenez à créer de belles images, quelle que soit votre expérience en matière de conception artistique."     
}</>
<HomeComponent />
    </>
  )
}
