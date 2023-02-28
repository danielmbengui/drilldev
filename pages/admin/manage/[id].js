import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_COMMON, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Text, useSSR, useTheme } from '@nextui-org/react';
import ManageComponent from '@/components/All/ManageComponent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManagePage(props) {
  const {isDark} = useTheme();
    const {lang, setLang, isMobile, isTablet, isLaptop} = props;
  const {t} = useTranslation(TAB_NAMEPACES);

  const router = useRouter();
  const { id } = router.query
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    console.log("IIIIIID", id)
  })
  return (
    <ContainerPageComponent
    isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
        title={
          <Text h1 size={45} b css={{
            textGradient: `45deg, $${isDark ? 'white' : 'black'} -20%, $orange600 100%, $orange600 100%`,
          }}>
    {`En parcourant la galerie, vous pourrez découvrir les différentes créations réalisées par nos soins`}
        </Text>}
    lang={lang} setLang={setLang}
    >
      <Head>
        <title>{`${t('menuGallery', {ns:NAMESPACE_LANGAGE_COMMON})}`}</title>
        <meta name="description" content="Bienvenue sur notre site consacré à la démonstration d'illustrations générées par intelligence artificielle. Nous vous montrons les dernières tendances et techniques de génération d'images à l'aide de l'IA. Vous découvrirez les meilleures plateformes et outils pour créer vos propres illustrations de qualité, ainsi que les mots clés à utiliser pour optimiser les résultats. Suivez notre guide étape par étape pour créer vos propres illustrations surprenantes avec l'IA. Rejoignez notre communauté pour partager vos créations et découvrir celles des autres utilisateurs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {content}
<ManageComponent lang={lang} isMobile={isMobile} />
    </ContainerPageComponent>
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
