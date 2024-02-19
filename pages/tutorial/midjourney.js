import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME, NAMESPACE_LANGAGE_TUTORIAL_MIDJOURNEY, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Button, Card, Collapse, Grid, Link, Modal, Text, useTheme } from '@nextui-org/react';
import TutorialComponent from '@/components/All/TutorialComponent';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Script from 'next/script';
import { Pagination } from "@nextui-org/react";
import MidjourneyComponent from '@/components/Tutorial/MidjourneyComponent';
import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';






//const fetcher = (...args) => fetch(...args).then((res) => res.json())
const fetcher = url => axios.get(url).then(res => res.data)

export default function MidjourneyPage(props) {
    //const { data, error } = useSWR('/api/drafts?action=get_all', fetcher)

    const { isDark } = useTheme();
    const { lang, setLang, langage, setLangage, isMobile, isTablet, isLaptop } = props;
    const { t } = useTranslation(TAB_NAMEPACES);


    return (
      <ContainerPageWithoutHeaderComponent
      isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
      title={
          <Text h1 size={45} b css={{
              textGradient: `45deg, $${isDark ? 'white' : 'black'} -20%, $orange600 100%, $${isDark ? 'white' : 'black'} 80%`,
          }}>
              {t('menuTutorialMidjourney', {ns:NAMESPACE_LANGAGE_COMMON})}
          </Text>}
      lang={lang} setLang={setLang}
      langage={langage} setLangage={setLangage}
      >
        <Head>
        <title>{`${t('menuTutorialMidjourney', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
    </Head>
        <MidjourneyComponent
lang={lang}
setLang={setLang}
langage={langage} setLangage={setLangage}
isMobile={isMobile}
isTablet={isTablet}
isLaptop={isLaptop}
        />
      </ContainerPageWithoutHeaderComponent>
    )
}


export async function getStaticProps({ locale }) {


    return {
        props: {
          //tabPrice: response,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
