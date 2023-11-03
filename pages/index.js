import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Text, useTheme } from '@nextui-org/react';
import { _PICTURE_HEADER_HOME_ } from '@/__mocks__/home/_pictures_home_';
import { useContext, useEffect } from 'react';
import HomeComponent from '@/components/Home/HomeComponent';
import LayoutPageComponent from '@/components/Layouts/LayoutPageComponent';


export default function HomePage(props) {
  const {isDark} = useTheme();
  const {lang, setLang, sizes, isTablet, isMobile, isLaptop} = props;
  const {t} = useTranslation(TAB_NAMEPACES);

  return (
    <LayoutPageComponent
    lang={lang} setLang={setLang}
    >
      <Head>
        <title>{`${t('menuHome', {ns:NAMESPACE_LANGAGE_COMMON})}`}</title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_HOME})} />
      </Head>
<HomeComponent sizes={sizes} />
    </LayoutPageComponent>
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
