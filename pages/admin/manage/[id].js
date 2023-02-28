import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Text, useSSR, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManagePage({id}) {
  //const router = useRouter();
  //const { id } = router.query

  useEffect(() => {
    console.log("IIIIIID", id)
  })
  return (
    <>
    {`_IIIIIIID: ${id}`}
    </>
  )
}


// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    
  const res = await axios.get(`${process.env.domain}/api/pictures?action=get_datas`).then((result) => {
        console.log("Result fetch", result.data.array)
        return(result.data.array);
  })
  
  
//  const posts = await res.json()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  
  const paths = res.map((item) => ({
    params: { id: item.toString() },
  }))
  

  // { fallback: false } means other routes should 404
  return { 
    paths, fallback: false
    //paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    //fallback: false, // can also be true or 'blocking'
}
  }

  export async function getStaticProps({ locale, params }) {

    console.log("PARAMS", params.id)
    return {
        props: {
          //tabPrice: response,
          id:params.id,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
