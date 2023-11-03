import Head from 'next/head'
import { Inter } from '@next/font/google';
import GalleryComponent from '@/components/Gallery/GalleryComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LANGAGE, GALLERY_MAX_PICTURES_PER_PAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Text, useTheme } from '@nextui-org/react';
import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';
import axios from 'axios';
import LayoutPageComponent from '@/components/Layouts/LayoutPageComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import DownloadsComponent from '@/components/Downloads/DownloadsComponent';

export default function DownloadsPage(props) {
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
      <DownloadsComponent />
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
