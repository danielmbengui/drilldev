import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Button, changeTheme, Popover, Switch, Text, useTheme, TriggerTypes, Card } from "@nextui-org/react";
import { getRandomNumber } from "@/lib/func/func.js";
import { Container, Grid, MenuItem } from "@mui/material";
import ResponsiveAppBar from "../Navbar/ResponsiveAppBar.js";
import { SunIcon } from "../Personnal/SunIcon.js";
import { MoonIcon } from "../Personnal/MoonIcon.js";
import { updateLangageStorage } from "@/lib/storage/UserStorageFunctions.js";
import { useTranslation } from "next-i18next";
import DropdownCustom from "../Personnal/Dropdown.js";
import { NAMESPACE_LANGAGE_COMMON, PAGE_LINK_GALLERY, PAGE_LINK_HOME, PAGE_LINK_TUTORIAL } from "@/constants.js";
import { useRouter } from "next/router.js";

import { myLoader } from "@/lib/ImageLoader.js";
import FooterComponent from "../All/FooterComponent.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import MenuComponent from "../Menu/MenuComponent.js";
const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoMobileTheme = "/images/logos/logo_orange_pic_no_back.png";

const PICTURES = require("../../public/collections/data-pictures.json");

function getRandomPicture(_pictures) {
  const random = getRandomNumber(0, _pictures.length);
  return (_pictures[random]);
}

export default function LayoutPageComponent(props) {
  const {t, i18n,} = useTranslation();
  const router = useRouter()
  const { isDark } = useTheme();
  const { children, title, picturesTitle, lang, setLang, } = props;
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (picturesTitle && picturesTitle.length > 0) {
      setSrc(getRandomPicture(picturesTitle));
    } else {
      setSrc(getRandomPicture(PICTURES).src)
    }

  }, [])

  return (
    <Grid
    container
    //xl
    //fixed
    maxWidth="5000px"
      sx={{
        zIndex:0,
        //background: `url(${randomSrc}) repeat center fixed`,
        //backgroundSize:'cover',
        backgroundColor: 'var(--background-color)',
      }}
      //aria-label="Layout general"
    >
           <Container>
     <MenuComponent
        lang={lang} setLang={setLang}
        activeColorContent={"primary"}
        variantContent={"highlight-rounded"}    
      />
     </Container>
     <Grid sx={{
        //background:'red',
        width:'100%',
        zIndex:11,
        position:'relative',
        //py:padding,
      }}>
      <Container>
      {children}
      </Container>
      </Grid>
      <Container sx={{mt:5}}>
        <FooterComponent />
      </Container>
    </Grid>
  )
}
