import React, { useEffect, useState } from "react";
import { Layout } from "./Layout.js";
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
import MenuMobile from "../Navbar/MenuMobile.js";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image.js";
import { myLoader } from "@/lib/ImageLoader.js";
import FooterComponent from "../All/FooterComponent.js";
import MenuComponent from "../Menu/MenuComponent.js";
const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoMobileTheme = "/images/logos/logo_orange_pic_no_back.png";

const PICTURES = require("../../public/collections/data-pictures.json");

function getRandomPicture(_pictures) {
  const random = getRandomNumber(0, _pictures.length);
  return (_pictures[random]);
}

export default function ContainerPageWithoutHeaderComponent(props) {
  const { children, pages, lang, setLang, sizes,  } = props;


  return (
    <Layout padding={15} lang={lang} setLang={setLang}  >
      
      <Container>
      {children}
      </Container>
    </Layout>
  )
}
