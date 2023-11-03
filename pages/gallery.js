import Head from 'next/head'
import { Inter } from '@next/font/google';
import GalleryComponent from '@/components/Gallery/GalleryComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_GALLERY, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Text, useTheme } from '@nextui-org/react';
import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';
import axios from 'axios';
import LayoutPageComponent from '@/components/Layouts/LayoutPageComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';

export default function GalleryPage(props) {
  const { lang, setLang, } = props;
  const { t } = useTranslation(TAB_NAMEPACES);
  return (
    <LayoutPageComponent
    lang={lang} setLang={setLang}
    >
      <Head>
        <title>{`${t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_GALLERY})} />
      </Head>
      <GalleryComponent />
    </LayoutPageComponent>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      //picturesFetch: data,
      //pictures:pictures,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
      // Will be passed to the page component as props
    },
  }
}
