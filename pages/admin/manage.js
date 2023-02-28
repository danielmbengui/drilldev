import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Text, useSSR, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManagePage(props) {
  const {isDark} = useTheme();
  const {t} = useTranslation(TAB_NAMEPACES);

  const router = useRouter();

  useEffect(() => {
  })
  return (
    <>
    {`general: OK`}
    </>
  )
}

  export async function getStaticProps({ locale, params }) {

    return {
        props: {
          //tabPrice: response,
          //id:params.id,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
