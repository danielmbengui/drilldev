import Head from 'next/head'
import { Inter } from '@next/font/google';
import GalleryComponent from '@/components/Gallery/GalleryComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Text, useTheme } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import { DEFAULT_LANGAGE, GALLERY_MAX_PICTURES_PER_PAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
/*
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';

import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';
import axios from 'axios';
import AdminGalleryComponent from '@/components/Admin/Pictures/AdminGalleryComponent';
*/
export default function AdminGalleryPage(props) {
  const { isDark } = useTheme();
  const { pictures, picturesFetch, lang, setLang, isMobile, isTablet, isLaptop } = props;
  const { t } = useTranslation(TAB_NAMEPACES);
  return (
<>
{
  /*
    <ContainerPageWithoutHeaderComponent
      isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
      lang={lang} setLang={setLang}
    >
      <Head>
        <title>{`${t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_GALLERY})} />
      </Head>
      <AdminGalleryComponent lang={lang} setLang={setLang} isMobile={isMobile} />
    </ContainerPageWithoutHeaderComponent>
  */
}
</>
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
