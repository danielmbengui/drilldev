import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import {Card, Row, Text, Link, Avatar, useTheme, Col } from "@nextui-org/react";
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

const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";

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


export default function HeaderComponent(props) {
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
<Container maxWidth={'5000px'} sx={{
        //p:30,
        mb: 5,
        width:'100%',
        textAlign:'center',
        //p:30,
        mt:{xs:13, md:15},
      }}>
        <Grid 
        container
        sx={{
         // background:'green',
          marginLeft:'auto',
          marginRight:'auto'
        }} justifyContent={'center'}>
         <Grid item xs={12} sm={12} md={10}>
          <Card css={{
            background:'$accents0',
            opacity:0.9
          }}>
            <Card.Body>
              <Grid container
              justifyContent={'center'}
        spacing={1}>
              <Grid item xs={12} sm={6} md={5} lg={6} justify="center" alignItems="center" sx={{
            textAlign:'center',
            display:{xs:'none', sm:'flex'}
          }}>
            {
              _PICTURE_HEADER_HOME_ && <UndownloadableImage
                width={500}
                height={500}
                src={_PICTURE_HEADER_HOME_}
                alt="image header"
                loader={myLoader}
                borderRadius={10}              
              />
            }
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{
            textAlign:'center',
          }} alignItems={'center'} justify={'center'}>
            <Grid container justifyContent={'center'} alignItems={'center'} sx={{
              height:'100%',
            }}>
              <Grid item >
                <UndownloadableImage
                  width={320}
                  height={120}
                  src={isDark ? logoDarkTheme : logoLightTheme}
                  alt="logo drill-dev"
                  //objectFit="contain"
                  
                />
              </Grid>
              <Grid item xs={12}>
              <Text h1 size={45} b css={{
      textGradient: `45deg, $${isDark ? 'white' : 'black'} -20%, $orange600 100%, $${isDark ? 'white' : 'black'} 80%`,
    }}>
{`${t('title_page', {ns:NAMESPACE_LANGAGE_HOME})}`}
  </Text>
              </Grid>
            </Grid>
          </Grid>
              </Grid>
            </Card.Body>
          </Card>
         </Grid>

        </Grid>
      </Container>
  )
}
