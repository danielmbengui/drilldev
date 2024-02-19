import React, { useEffect, useState } from "react";
import {Card,  Text, Link, useTheme, } from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { NAMESPACE_LANGAGE_HOME, WEBSITE_PICTURES_ADDRESS } from "@/constants.js";
import { Container, Grid } from "@mui/material";
import { _PICTURES_HOME_, _PICTURE_HEADER_HOME_ } from "@/__mocks__/home/_pictures_home_.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import ParagraphRowComponent from "./ParagraphRowComponent.js";
import GalleryRowComponent from "./GalleryRowComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import CardTeamComponent from "./CardTeamComponent.js";
//import { _TAAN_INFOS_, _DAAN_INFOS_ } from "@/__mocks__/team/_team_members_.js";
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
  const _TAAN_INFOS_ = {
    welcome:t('taan_infos.welcome', {ns:NAMESPACE_LANGAGE_HOME}), 
    iam:t('taan_infos.iam', {ns:NAMESPACE_LANGAGE_HOME}), 
    name:t('taan_infos.name', {ns:NAMESPACE_LANGAGE_HOME}), 
    firstname:t('taan_infos.firstname', {ns:NAMESPACE_LANGAGE_HOME}),
    //qualities:['creative', 'curious'],
    job:t('taan_infos.job', {ns:NAMESPACE_LANGAGE_HOME}),
    qualities_home:t('taan_infos.qualities_home', {ns:NAMESPACE_LANGAGE_HOME}),
    src_video_home_light:`${WEBSITE_PICTURES_ADDRESS}/${t('taan_infos.src_video_home_light', {ns:NAMESPACE_LANGAGE_HOME})}`,
    src_video_home_dark:`${WEBSITE_PICTURES_ADDRESS}/${t('taan_infos.src_video_home_dark', {ns:NAMESPACE_LANGAGE_HOME})}`,
    src_pic:`${WEBSITE_PICTURES_ADDRESS}/${t('taan_infos.src_pic', {ns:NAMESPACE_LANGAGE_HOME})}`,
  };

  const _DAAN_INFOS_ = {
    welcome:t('daan_infos.welcome', {ns:NAMESPACE_LANGAGE_HOME}), 
    iam:t('daan_infos.iam', {ns:NAMESPACE_LANGAGE_HOME}), 
    name:t('daan_infos.name', {ns:NAMESPACE_LANGAGE_HOME}), 
    firstname:t('daan_infos.firstname', {ns:NAMESPACE_LANGAGE_HOME}),
    //qualities:['creative', 'curious'],
    job:t('daan_infos.job', {ns:NAMESPACE_LANGAGE_HOME}),
    qualities_home:t('daan_infos.qualities_home', {ns:NAMESPACE_LANGAGE_HOME}),
    src_video_home_light:`${WEBSITE_PICTURES_ADDRESS}/${t('daan_infos.src_video_home_light', {ns:NAMESPACE_LANGAGE_HOME})}`,
    src_video_home_dark:`${WEBSITE_PICTURES_ADDRESS}/${t('daan_infos.src_video_home_dark', {ns:NAMESPACE_LANGAGE_HOME})}`,
    src_pic:`${WEBSITE_PICTURES_ADDRESS}/${t('daan_infos.src_pic', {ns:NAMESPACE_LANGAGE_HOME})}`,
  };
/*
  const _TAAN_INFOS_ = {
    name:"Emoji", 
    firstname:"Taan",
    qualities:['creative', 'curious'],
    job:"Digital Designer",
    qualities_home:"Créative & Curieuse",
    src_video_home_light:"https://pictures.dandela.com/videos/home/taan-light.mp4",
    src_video_home_dark:"https://pictures.dandela.com/videos/home/taan-dark.mp4",
    src_pic:`${WEBSITE_PICTURES_ADDRESS}/images/midjourney/PNG/home/1.png`,
  };
  
  const _DAAN_INFOS_ = {
    name:"Emoji", 
    firstname:"Daan",
    qualities:['innovative', 'solution-oriented'],
    job:"Web Developer",
    qualities_home:"Innovatif & Axé solution",
    src_video_home_light:"https://pictures.dandela.com/videos/home/daan-light.mp4",
    src_video_home_dark:"https://pictures.dandela.com/videos/home/daan-dark.mp4",
    src_pic:`${WEBSITE_PICTURES_ADDRESS}/images/midjourney/PNG/home/1.png`,
  };
  */


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
    <CardTeamComponent userInfos={_TAAN_INFOS_} />

    </Grid>
    <Grid item xs={12} sm={5}>
        <CardLinkToPageComponent src={`/images/home/link-gallery-${isDark ? 'dark' : 'light'}.jpg`} userInfos={_TAAN_INFOS_}  />
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
        <CardLinkToPageComponent src={`/images/home/link-downloads.png`} userInfos={_TAAN_INFOS_}  />
    </Grid>
    <Grid item xs={12} sm={5}>
    <CardTeamComponent userInfos={_DAAN_INFOS_} />

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
      </Container>
</>
  )
}
