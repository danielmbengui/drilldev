import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import {Card, Row, Text, Link, Avatar, useTheme, Col, Button } from "@nextui-org/react";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomArrow from "../Personnal/CustomArrow.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import { useTranslation } from "next-i18next";
import { NAMESPACE_LANGAGE_HOME, WEBSITE_NAME } from "@/constants.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CollectionsIcon from '@mui/icons-material/Collections';
import DownloadIcon from '@mui/icons-material/Download';
import CustomImageList from "../Personnal/CustomImageList.js";
import { Container, Grid, Stack } from "@mui/material";
import Image from "next/image.js";
import { myLoader } from "@/lib/ImageLoader.js";
import { _PICTURES_HOME_, _PICTURE_HEADER_HOME_ } from "@/__mocks__/home/_pictures_home_.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import { DeviceModeProviderContext, useDeviceMode } from "@/contexts/DeviceModeProvider.js";
import ParagraphRowComponent from "./ParagraphRowComponent.js";
import GalleryRowComponent from "./GalleryRowComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import UndownloadableVideo from "../Customs/UndownloadableVideo.js";
import { getFirstLetterUpperCase } from "@/pages/api/constants.js";
import { GalleryIcon } from "../Icons/GalleryIcon.js";

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


export default function CardLinkToPageComponent(props) {
    const {userInfos, src} = props;
  const {t} = useTranslation();
  const { isDark } = useTheme();
const {isMobile} = useDeviceMode();
  return (
    <Card variant="flat" css={{ w: "100%", h: "400px", background:'transparent' }}>
    <Card.Body css={{ p: 0 }}>
    <UndownloadableImage 
        src={`/images/home/link-gallery-${isDark ? 'dark' : 'light'}.jpg`}
    />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "var(--white-blur)",
        //background: "var(--white-blur)",
        //borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
        //textAlign:'center'
      }}
    >
      <Grid container justifyContent={'center'}>
      <Grid item>
      <Button
              flat
              auto
              rounded
              css={{ color: "$black", bg: "$primary" }}
              iconRight={<GalleryIcon color={'black'} />}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                {`consulter la gallerie`}
              </Text>
            </Button>
      </Grid>
      </Grid>
    </Card.Footer>
  </Card>

  )
}
