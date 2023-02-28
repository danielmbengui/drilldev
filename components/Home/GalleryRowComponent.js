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
import { Fade } from 'react-awesome-reveal';

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


export default function GalleryRowComponent(props) {
  const {pictures, indexStart, indexStop, } = props;


  return (
    <Fade triggerOnce={true}>
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
  </Fade>
  )
}
