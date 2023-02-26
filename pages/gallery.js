import Head from 'next/head'
import { Inter } from '@next/font/google';
import GalleryComponent from '@/components/All/GalleryComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LANGAGE, GALLERY_MAX_PICTURES_PER_PAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Text, useTheme } from '@nextui-org/react';
import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';
import axios from 'axios';

export default function GalleryPage(props) {
  const { isDark } = useTheme();
  const { pictures, picturesFetch, lang, setLang, isMobile, isTablet, isLaptop } = props;
  const { t } = useTranslation(TAB_NAMEPACES);
  return (
    <ContainerPageWithoutHeaderComponent
      isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
      /*
      title={
        <Text h1 size={45} b css={{
          textGradient: `45deg, $${isDark ? 'white' : 'black'} -20%, $orange600 100%, $orange600 100%`,
        }}>
  {`En parcourant la galerie, vous pourrez découvrir les différentes créations réalisées par nos soins`}
      </Text>}
      */
      lang={lang} setLang={setLang}
    >
      <Head>
        <title>{`${t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_GALLERY})} />
      </Head>
      <GalleryComponent lang={lang} isMobile={isMobile} />
    </ContainerPageWithoutHeaderComponent>
  )
}

export async function getStaticProps({ locale }) {
  //const data = require("../public/pictures/datas/data.json");
  /*
  const pictures = await axios.get(`${process.env.domain}${PAGE_LINK_API_PICTURES}`, {
    params :{
      action:QUERY_ACTION_GET_LIST_PICTURES,
      search:'',
      page:1,
      per_page:GALLERY_MAX_PICTURES_PER_PAGE,
    }
  }).then((response) => {
    //console.log("RESP", response.data.result.length);
    return (response.data.result);
  }).catch(() => {
    //console.log("ERROR", error)
    return ([]);
  })
  */
  return {
    props: {
      //picturesFetch: data,
      //pictures:pictures,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
      // Will be passed to the page component as props
    },
  }
}
