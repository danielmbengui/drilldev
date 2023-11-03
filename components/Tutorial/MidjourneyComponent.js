import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME, TAB_LANGAGES, TAB_NAMEPACES, WEBSITE_NAME, WEBSITE_PICTURES_ADDRESS } from '@/constants';
import { useTranslation } from 'next-i18next';
import ContainerPageComponent from '@/components/Containers/ContainerPageComponent';
import { Button, Card, Collapse, Link, Modal, Text, useTheme } from '@nextui-org/react';
import TutorialComponent from '@/components/All/TutorialComponent';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Script from 'next/script';
import ContainerPageWithoutHeaderComponent from '@/components/Containers/ContainerPageWithoutHeaderComponent';
import { Pagination } from "@nextui-org/react";
import { myLoader } from '@/lib/ImageLoader';
import VideoCardCustom from '../Personnal/VideoCardCustom';
import { Grid } from '@mui/material';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import UndownloadableVideo from '../Customs/UndownloadableVideo';






//const fetcher = (...args) => fetch(...args).then((res) => res.json())
const fetcher = url => axios.get(url).then(res => res.data)

export default function MidjourneyComponent(props) {
  //const { data, error } = useSWR('/api/drafts?action=get_all', fetcher)

  const { isDark } = useTheme();
  const { lang, setLang, isTablet, isLaptop } = props;
  const {isMobile} = useDeviceMode();
  const { t } = useTranslation(TAB_NAMEPACES);
  const [visible, setVisible] = useState(false);
  const [picture, setPicture] = useState(null);

  const [step, setStep] = useState(1);

  const handleClose = () => {
    setPicture(null);
    setVisible(false);
  }

  return (
    <Grid container justifyContent='center' alignItems='center' direction='column' >
      <Grid item xs={12} sx={{textAlign:'center'}}>
<Text h1 size={45} b css={{
      textGradient: `45deg, $${isDark ? 'white' : 'black'} -20%, $orange600 100%, $${isDark ? 'white' : 'black'} 80%`,
    }}>
{`${t('menuTutorial', {ns:NAMESPACE_LANGAGE_COMMON})}`}
  </Text>
</Grid>

<Grid item xs={12}>
<p>{`Bienvenue sur notre page de Tutoriel sur la génération d'images en intelligence artificielle avec Midjourney. Nous sommes ravis de pouvoir partager avec vous notre expertise en matière d'IA et de vous aider à acquérir de nouvelles compétences passionnantes. `}</p>
<p> Nous offrons un tutoriel détaillé sur la génération d'images à l'aide de la plateforme Midjourney. Vous apprendrez à créer des images réalistes à partir de modèles prédéfinis, en utilisant les dernières techniques d'apprentissage automatique et d'IA. Ce tutoriel est conçu pour tous les niveaux, des débutants aux experts en IA. </p>
{
  /*
<p> Cependant, veuillez noter que l'accès à ce tutoriel est réservé aux utilisateurs disposant d'un compte payant. Pour un petit prix, vous pourrez accéder au tutoriel complet et bénéficier de nombreux avantages, tels que des conseils personnalisés, des mises à jour régulières, et un support technique de qualité. </p>
<p> Nous sommes convaincus que notre tutoriel vous permettra de développer des compétences précieuses en IA et de créer des images incroyables. N'hésitez pas à nous contacter si vous avez des questions ou des commentaires sur nos services. </p>
  */
}
</Grid>
      <Grid mt={3} item xs={12} sm={8} sx={{
        width:{xs:'100%', md:'50%'}
      }} justifyContent='center'>
      {
        TAB_LANGAGES.map((_lang, index) => {
          return (
            lang === _lang && <div key={`${_lang}-${index}`}>
              <VideoCardCustom lang={lang} isMobile={isMobile} />
            </div>
          )
        })
      }
      
      </Grid>


{
/*
      <Grid.Container css={{ mb: 10,}} justify="center">
        <Grid xs={12} sm={4} justify="center" alignItems="center" >
        <Card css={{ width: 'fit-content', background:'$accents0', opacity:0.9}}>
          <Card.Body >
          <Grid.Container xs={12} justify="center" gap={1} css={{mb:10}}>
                <Grid justify="center" >
                <Image
                    src='/images/logos/others/midjourney.png'
                    alt={`logo Drill Dev`}
                    width={100}
                    height={100}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    loader={myLoader}
                    priority
                    quality={100}
                  />
                </Grid>
              </Grid.Container>
            <Grid.Container justify="center" alignItems='center' css={{textAlign:'center'}}>
              <Grid xs={12} justify='center' alignItems='center'>
                  <Text as='span' h4 b>{`Données fournies par Midjourney.`}</Text>
              </Grid>
              <Grid xs={12} justify='center'>
                <Text b h4>
                <Link href='https://docs.midjourney.com/docs' target={'_blank'} isExternal>{`Explorer la documentation.`}</Link>
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>

        </Grid>
      </Grid.Container>
      
      <Grid xs={12} sm={6} justify='center' alignItems='center' css={{
        mx: 'auto',
      }}>
        <Collapse.Group splitted accordion={false} css={{
          //maxWidth:'max-content'
          //background:'$accents0'
        }}>
          <Collapse css={{
        background:'$accents0',
        opacity:0.95
          }} title="Les règles" subtitle="Tout ce qui concerne les droits d'auteurs de vos créations">
          <Grid.Container xs={12} justify="center" alignItems="center" css={{
        mx: 'auto',
        //bg:'red'
      }}>
       <Grid>
       <Card css={{ 
        mx: 'auto',
        bg:'$accents0',
        //opacity:0.95
        }}>
          <Card.Body css={{
            textAlign: 'center',
          }}>
            <Text>
              <Text as={'span'}>
                {`En ce qui concerne les droits d'auteur des photos générées, si elles proviennent du `}
              </Text>
              <Link href='https://discord.gg/vfTQAQPWwp' target={'_blank'} isExternal>
                {`Serveur Drill Dev`}
              </Link>
              <Text as={'span'}>
                {` , celles-ci vous appartiennent.`}
              </Text>
              <Text as={'span'}>
              {` Toutes les infos trouvées sur ce tutoriel proviennent du site internet officiel de `}
              <Link target={'_blank'} isExternal href={`https://docs.midjourney.com/docs`}>{`Midjourney`}</Link>
            </Text>

            <Text as={'span'}>
              {`Nous ne sommes en aucun cas affilié, partenaire commercial, ni toute autre relation avec Midjourney.`}
            </Text>
            <Text as={'span'}>
              {`Si vous décidez de générer vos créations par le biais du serveur de Midjourney, veuillez vous référez à leurs `}
              <Link href='https://docs.midjourney.com/docs/terms-of-service' isExternal target={'_blank'}>{`termes de services`}</Link>
            </Text>
            </Text>
          </Card.Body>
        </Card>
       </Grid>
      </Grid.Container>

          </Collapse>
          <Collapse title="Discord" subtitle="Se connecter/Créer un compte">
            <Text>
              {"Pour pouvoir générer des images gratuitement et simplement, vous devez d'abord posséder un compte discord."}
              {"Indispensable pour la suite du tutoriel !"}
            </Text>
            <Text>
              {"Si vous vouler vous inscrire sur discord, veuillez cliquer sur le bouton "} <Link css={{
                tt: 'uppercase'
              }} isExternal target={'_blank'} href='https://discord.com/' flat>{`ici`}</Link>
            </Text>
            <Text>
              <Link target={'_blank'} href={`https://support.discord.com/hc/${lang}/articles/360033931551-Getting-Started`} isExternal>{`comment créer un compte ? `}</Link>
            </Text>
          </Collapse>
          <Collapse title="Salons" subtitle={
            <>
              {`Venez rejoindre `} <Text b>{`la communauté !`}</Text>
            </>
          }
          >
            <Text>
              {`Vous voulez générer des images en intelligence artificielle, rejoingez le `}
              <Link as={'a'} isExternal target={'_blank'} href='https://discord.gg/vfTQAQPWwp' flat>{`Serveur DrillDev`}</Link>

            </Text>
            <Text>
              {`Vous pourrez égalment vous inspirer des commandes des autres participants du groupe. Pas mal non ?`}
            </Text>
            <Text>
              {`Le salon possède 5 salons disponibles à la génération gratuites d'images !`}
            </Text>
            <Grid xs={12} justify='center'>
              <Button as={'a'} target={'_blank'} href='https://discord.gg/vfTQAQPWwp' flat>{`Serveur DrillDev`}</Button>
            </Grid>
          </Collapse>
          <Collapse title="Générer des images"
            subtitle={
              <>
                {`Ça y'est vous pouvez `} <Text b>{`commencer`}</Text>
              </>
            }
          >
            <Text color='error'>
              {`2 mots exentielles à retenir !`}
            </Text>
            <Text>
              imagine ET prompt
            </Text>
            <Text>
              imagine ET prompt
            </Text>
            <Text>
              {`Je le répète 2 fois, car ces 2 mots sont vraiment essentiels pour la suite !`}
            </Text>
            <Grid xs={12} justify='center'>
              <Button as={'a'} target={'_blank'} href='https://discord.gg/vfTQAQPWwp' flat>{`Image quelquun qui tape le mot image et prompt, répété, gif ou mp4`}</Button>
            </Grid>
            <Text>
              {`Comme sur l'illustartion ci dessus, les deux mots clés qui servent à générer des images sont donc imagine et prompt.`}
            </Text>
            <Text>
              {`- '/imagine' : se définit par une commande sur Discord (précédé d'un '/')`}
            </Text>
            <Text>
              {`- 'prompt' : se définit par 'trouver le nom jai oublié' sur Discord (en surbrillance)`}
            </Text>
            <Text>
              {`- '/imagine prompt "laissez parler votre imagination"' : permet de générer une image en moins de 2 minutes`}
            </Text>
            <Text b>
              {`PAR EXEMPLE: '/imagine prompt a beautiful website design about digital art'`}
            </Text>
            <Grid xs={12} justify='center'>
              <Button as={'a'} target={'_blank'} href='https://discord.gg/vfTQAQPWwp' flat>{`Montrer le avant et le après`}</Button>
            </Grid>
          </Collapse>
          <Collapse title="Les jointures" subtitle="Créer une génération à partir d'une ou plusieurs photos">
            <Text>
              {"Pour pouvoir générer des images gratuitement et simplement, vous devez d'abord posséder un compte discord."}
              {"Indispensable pour la suite du tutoriel !"}
            </Text>
            <Text>
              {"Si vous vouler vous inscrire sur discord, veuillez cliquer sur le bouton "} <Link css={{
                tt: 'uppercase'
              }} isExternal target={'_blank'} href='https://discord.com/' flat>{`ici`}</Link>
            </Text>
            <Text>
              <Link target={'_blank'} href={`https://support.discord.com/hc/${lang}/articles/360033931551-Getting-Started`} isExternal>{`comment créer un compte ? `}</Link>
            </Text>
          </Collapse>
          <Collapse title="Les styles" subtitle="Pour créer des illustrations stylisées">
            <Text>
              {"Pour pouvoir générer des images gratuitement et simplement, vous devez d'abord posséder un compte discord."}
              {"Indispensable pour la suite du tutoriel !"}
            </Text>
            <Text>
              {"Si vous vouler vous inscrire sur discord, veuillez cliquer sur le bouton "} <Link css={{
                tt: 'uppercase'
              }} isExternal target={'_blank'} href='https://discord.com/' flat>{`ici`}</Link>
            </Text>
            <Text>
              <Link target={'_blank'} href={`https://support.discord.com/hc/${lang}/articles/360033931551-Getting-Started`} isExternal>{`comment créer un compte ? `}</Link>
            </Text>
          </Collapse>
          <Collapse title="Les paramètres" subtitle="Pour optimiser vos illustrations">
            <Text>
              {"Pour pouvoir générer des images gratuitement et simplement, vous devez d'abord posséder un compte discord."}
              {"Indispensable pour la suite du tutoriel !"}
            </Text>
            <Text>
              {"Si vous vouler vous inscrire sur discord, veuillez cliquer sur le bouton "} <Link css={{
                tt: 'uppercase'
              }} isExternal target={'_blank'} href='https://discord.com/' flat>{`ici`}</Link>
            </Text>
            <Text>
              <Link target={'_blank'} href={`https://support.discord.com/hc/${lang}/articles/360033931551-Getting-Started`} isExternal>{`comment créer un compte ? `}</Link>
            </Text>
          </Collapse>
          <Collapse title="Les DrillDev prompts" subtitle="Nos mots cléfs pour les générations du site interneet">
            <Text>
              {"Pour pouvoir générer des images gratuitement et simplement, vous devez d'abord posséder un compte discord."}
              {"Indispensable pour la suite du tutoriel !"}
            </Text>
            <Text>
              {"Si vous vouler vous inscrire sur discord, veuillez cliquer sur le bouton "} <Link css={{
                tt: 'uppercase'
              }} isExternal target={'_blank'} href='https://discord.com/' flat>{`ici`}</Link>
            </Text>
            <Text>
              <Link target={'_blank'} href={`https://support.discord.com/hc/${lang}/articles/360033931551-Getting-Started`} isExternal>{`comment créer un compte ? `}</Link>
            </Text>
          </Collapse>
        </Collapse.Group>
      </Grid>
*/

}



    </Grid>
  )
}
