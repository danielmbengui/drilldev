import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import {Card, Row, Text, Link, Avatar, useTheme, Col, Button } from "@nextui-org/react";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomArrow from "../Personnal/CustomArrow.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import { useTranslation } from "next-i18next";
import { NAMESPACE_LANGAGE_HOME } from "@/constants.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CollectionsIcon from '@mui/icons-material/Collections';
import DownloadIcon from '@mui/icons-material/Download';
import CustomImageList from "../Personnal/CustomImageList.js";
import { Container, Grid } from "@mui/material";
import Image from "next/image.js";
import { myLoader } from "@/lib/ImageLoader.js";
import { _PICTURES_HOME_, _PICTURE_HEADER_HOME_ } from "@/__mocks__/home/_pictures_home_.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import { DeviceModeProviderContext, useDeviceMode } from "@/contexts/DeviceModeProvider.js";
import ParagraphRowComponent from "./ParagraphRowComponent.js";
import GalleryRowComponent from "./GalleryRowComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import CardTeamComponent from "./CardTeamComponent.js";
import { _ARIEL_INFOS_, _TIAGO_INFOS_ } from "@/__mocks__/team/_team_members_.js";
import CardLinkToPageComponent from "./CardLinkToPgeComponent.js";

const logoLightTheme = "/images/logos/logo_black_pic_no_back.png";
const logoDarkTheme = "/images/logos/logo_white_pic_no_back.png";

function getRandomSortPictures() {
  const randomOrder = [];
  const randomPictures = [];
  const min = 0;
  const max = _PICTURES_HOME_.length;
  for (let i = 0; i < max; i++) {
    let random = Math.floor(Math.random() * (max - min) + min);
    while (randomOrder.includes(random)) {
      random = Math.floor(Math.random() * (max - min) + min);
    }
    const element = _PICTURES_HOME_[random];
    randomOrder.push(random);
    randomPictures.push(element);
  }

  return randomPictures; // The maximum is exclusive and the minimum is inclusive
}


export default function HomeComponent(props) {
  const {t} = useTranslation();
  const {lang, sizes} = props;
  const { isDark } = useTheme();
  const [variant, setVariant] = useState("static");
  const [srcModal, setSrcModal] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [typesModal, setTypesModal] = useState([]);
  const [picture, setPicture] = useState(null);
  const [pictures, setPictures] = useState(_PICTURES_HOME_);

  const variants = ["static", "floating", "sticky"];
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);


  const ComponentMidJourney = () => {
    const sentenceMidjourney = t('paragraph_5', {ns:NAMESPACE_LANGAGE_HOME});
const start = sentenceMidjourney.indexOf("Midjourney");
const end = start >= 0 ? start + "Midjourney".length : 0;
if(end - start > 0) {
  const beforeMid = sentenceMidjourney.slice(0, start);
  const mid = sentenceMidjourney.slice(start, end);
  const afterMid = sentenceMidjourney.slice(end);
  return (<Text h3>
    {beforeMid}
    <Link href="https://www.midjourney.com/app/" isExternal underline target={"_blank"}>
      {mid}
    </Link>
    {afterMid}
  </Text>)
}
return (<></>);
  }

  useEffect(() => {

setPictures(getRandomSortPictures());

  }, [])

  const closeHandler = () => {
    setPicture(null);
    setTitleModal("");
    setTypesModal([]);
    setVisible(false);
    console.log("closed");
  };

  const MockItem = ({indexStart, indexStop, textComponent }) => {
    return (
      <>
      <Grid 
            container 
            justifyContent={'center'}
            alignItems={'center'}
            spacing={1}
            sx={{
              //background: 'purple',
              textAlign:'center',
              my:3,
            }}
            >
            {
              pictures.map((picture, index) => {
                if (index >= indexStart && index < indexStop) {
                  return (
                    <Grid
                    item
                    justifyContent={'center'}
                      key={`${picture.title} - ${index}`}
                     xs={4}
                      sm={4}
                     md={2}
                    >
                       <UndownloadableImage
                        //showSkeleton
                        borderRadius={10}
                        width={1024}
                        height={1024}
                        src={picture.src}
                        alt={`${picture.src} - ${index}`}
                        //objectFit="cover"
                      />
                    </Grid>
                  )
                }
              })
            }
          </Grid>
        <Card css={{
            background:'$accents0',
            opacity:0.9
          }}>
          <Card.Body >
          {textComponent}
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
<>
<HeaderComponent />


    <Container sx={{mb:10}} fixed>
    <ParagraphRowComponent
        arrayText={[
            t('paragraph_1', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />

    <GalleryRowComponent
pictures={pictures}
indexStart={0}
indexStop={6}
/>

<ParagraphRowComponent
        arrayText={[
            t('paragraph_2', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />
        
<Grid container spacing={1} justifyContent='center' my={3}>
    <Grid item xs={12} sm={5}>
    <CardTeamComponent userInfos={_ARIEL_INFOS_} />

    </Grid>
    <Grid item xs={12} sm={5}>
        <CardLinkToPageComponent src={`/images/home/link-gallery-${isDark ? 'dark' : 'light'}.jpg`} userInfos={_ARIEL_INFOS_}  />
    </Grid>
</Grid>

<ParagraphRowComponent
        arrayText={[
            t('paragraph_3', {ns:NAMESPACE_LANGAGE_HOME}),
            t('paragraph_4', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />

<ParagraphRowComponent
        arrayText={[
            t('paragraph_5', {ns:NAMESPACE_LANGAGE_HOME}),
            t('paragraph_6', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />

<GalleryRowComponent
pictures={pictures}
indexStart={6}
indexStop={12}
/>

<ParagraphRowComponent
        arrayText={[
            t('paragraph_7', {ns:NAMESPACE_LANGAGE_HOME}),
            t('paragraph_8', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />

<Grid container spacing={1} justifyContent='center' my={3}>
    <Grid item xs={12} sm={5}>
        <CardLinkToPageComponent src={`/images/home/link-downloads.png`} userInfos={_ARIEL_INFOS_}  />
    </Grid>
    <Grid item xs={12} sm={5}>
    <CardTeamComponent userInfos={_TIAGO_INFOS_} />

    </Grid>
</Grid>

<ParagraphRowComponent
        arrayText={[
            t('paragraph_9', {ns:NAMESPACE_LANGAGE_HOME}),
            t('paragraph_10', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />

<GalleryRowComponent
pictures={pictures}
indexStart={12}
indexStop={18}
/>

<ParagraphRowComponent
        arrayText={[
            t('paragraph_11', {ns:NAMESPACE_LANGAGE_HOME}),
            t('paragraph_12', {ns:NAMESPACE_LANGAGE_HOME}),
        ]} />





<GalleryRowComponent
pictures={pictures}
indexStart={18}
indexStop={24}
/>



<GalleryRowComponent
pictures={pictures}
indexStart={24}
indexStop={30}
/>



<GalleryRowComponent
pictures={pictures}
indexStart={30}
indexStop={36}
/>


        <Container sx={{
          textAlign: 'center',
          display:'none'
        }}>
          <Text h3 color="$text">
            {"J'ai choisi des images piquées au hasard sur internet et j'ai utilisé une intelligence artificielle "}
            <Link href="https://www.midjourney.com/app/" underline target={"_blank"}>
              {"Midjourney"}
            </Link>
            {" pour les transformer de différentes manières."}
          </Text>
          <Text h3>
            {"Cela m'a permis de générer des versions variées de ces images, chacune avec des caractéristiques uniques."}
          </Text>
          <Text h3 color="$text">{"C'était intéressant de voir comment l'IA pouvait interpréter et altérer mon image de différentes manières."}</Text>
          <Text h3 color="$text">{"Je suis impressionné par les résultats obtenus et je suis impatient de découvrir d'autres utilisations de l'IA dans le traitement d'images."}</Text>
        </Container>
        <Container sx={{ my: 50, display: 'none' }}>
          <Image
            //showSkeleton
            //maxDelay={10000}
            //autoResize={true}
            width={150}
            height={150}
            src=""
            alt="Default Image"
            //objectFit="cover"
          />
        </Container>
      </Container>
</>
  )
}
