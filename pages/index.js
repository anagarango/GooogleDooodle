import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Home() {
  const [year, setYear] = useState()
  const r = useRouter()

  const SearchYear = (e) => {
    if (e.key == "Enter"){
      r.replace({
        pathname: "/search",
        query:{
          year
        }
    },"/search")
  }
}

  
  return (
    <>
      <Head>
        <title>Google Doodles</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/google.svg" />
      </Head>
      <header className='flex fixed top-0 w-full'>
        <p>About</p>
        <p>Store</p>
      </header>
      <main className={styles.main} style={{marginTop:"calc(100px + 10%)"}}>
        <Image id='google' alt='google-logo' className='max-w-full' src="/google.svg" unoptimized styles={{width:"350px", height:"250px"}} width={350} height={250}></Image>
        <div className='flex rounded-3xl w-[40rem] max-w-full border-solid border border-gray-300 pl-2 py-2 items-center mt-12 mb-2 hover:shadow-[0px_1px_5px_0px_rgba(85,85,85,0.4)] focus-within:shadow-[0px_1px_5px_0px_rgba(85,85,85,0.4)]'>
          <Image src="/search.png" className='w-4 h-4 ml-2 mr-4' unoptimized width={10} height={10}></Image>
          <input placeholder="1999 - 2023" type="number" value={year} onChange={(e)=>{setYear(e.target.value)}} onKeyDown={SearchYear} className='w-10/12' pattern="[0-9]" maxLength={4} minLength={4} min="1999" max="2022"></input>
        </div>
        <p className='mb-12 text-gray-400'>*Insert a number between 1999 - 2023 to search Google Doodles that existed in that year</p>
        <div>
          <button className='bg-gray-100 p-2 mr-3 hover:shadow-[0px_0px_2px_1px_rgba(85,85,85,0.4)]'>Google Search</button>
          <button className='bg-gray-100 p-2 hover:shadow-[0px_0px_2px_1px_rgba(85,85,85,0.4)]'>I'm Feeling Lucky</button>
        </div>
      </main>
      <footer className='fixed bottom-0 w-full bg-gray-100'>
        <p className='px-3 py-1'>Canada</p>
        <div className='flex w-[40rem] w-full border-solid border border-gray-300 p-3 items-center justify-between'>
          <div id="footerP" className='flex'>
            <p>Advertising</p>
            <p>Business</p>
            <p>How Search Works</p>
          </div>
          <div id="footerP" className='flex'>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Settings</p>
          </div>
        </div>
      </footer>
    </>
  )
}
