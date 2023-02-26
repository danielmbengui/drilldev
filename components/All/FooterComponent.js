import React, { useEffect, useState } from "react";
import { Button, changeTheme, Popover, Switch, Text, useTheme, TriggerTypes, Card, Grid, Link } from "@nextui-org/react";
import { getRandomNumber } from "@/lib/func/func.js";
import { Container, MenuItem } from "@mui/material";
import { updateLangageStorage } from "@/lib/storage/UserStorageFunctions.js";
import { useTranslation } from "next-i18next";
import DropdownCustom from "../Personnal/Dropdown.js";
import { NAMESPACE_LANGAGE_COMMON, PAGE_LINK_GALLERY, PAGE_LINK_HOME, PAGE_LINK_TUTORIAL, WEBSITE_NAME } from "@/constants.js";
import { useRouter } from "next/router.js";
import { Layout } from "../Containers/Layout.js";
import Image from "next/image.js";
import { myLoader } from "@/lib/ImageLoader.js";
const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoMobileTheme = "/images/logos/logo_orange_pic_no_back.png";

const PICTURES = require("../../public/collections/data-pictures.json");

function getRandomPicture(_pictures) {
  const random = getRandomNumber(0, _pictures.length);
  return (_pictures[random]);
}

export default function FooterComponent(props) {
  const { t, i18n, } = useTranslation();
  const router = useRouter()
  const { isDark } = useTheme();
  const { picturesTitle, } = props;
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (picturesTitle && picturesTitle.length > 0) {
      setSrc(getRandomPicture(picturesTitle).src);
    } else {
      setSrc(getRandomPicture(PICTURES).src)
    }

  }, [])


  return (
    <Container maxWidth={'5000px'} sx={{
      //p:30,
      mb: 5,
      //mt:20,
      width: '100%',
      textAlign: 'center',
      background:'transparent',
      //p:30,
      mt: { xs: 5, md: 10 },
    }}>
      <Grid.Container justify="center">
        <Grid xs={12} sm={4} justify="center" alignItems="center" >
        <Card css={{ width: 'fit-content', background:'$accents0', opacity:0.9}}>
          <Card.Body >
            <Grid.Container justify="center" css={{textAlign:'center', display:'none', mb:70}}>
              <Grid xs={12} justify='center'>
                  <Text h3>{`Rejoins la communauté`}</Text>
                </Grid>
                <Grid xs={12} justify='center' css={{mb:5}}>
                  <Text h3>{`${WEBSITE_NAME}`}</Text>
                </Grid>
              <Grid.Container xs={12} justify="center" gap={1}>
                <Grid justify="center" >
                  <Link target={'_blank'} href={`https://tiktok.com`}>
                  <Image
                    src='/images/logos/others/tik-tok.png'
                    alt={`logo Drill Dev`}
                    width={50}
                    height={50}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    loader={myLoader}
                    priority
                    quality={100}
                  />
                  </Link>
                </Grid>
                <Grid justify="center" >
                  <Link target={'_blank'} href={`https://instagram.com`}>
                  <Image
                    src='/images/logos/others/instagram.png'
                    alt={`logo Drill Dev`}
                    width={50}
                    height={50}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    loader={myLoader}
                    priority
                    quality={100}
                  />
                  </Link>
                </Grid>
                <Grid justify="center">
                  <Link target={'_blank'} href={`https://twitter.com`}>
                  <Image
                    src='/images/logos/others/twitter.png'
                    alt={`logo Drill Dev`}
                    width={50}
                    height={50}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    loader={myLoader}
                    priority
                    quality={100}
                  />
                  </Link>
                </Grid>
                <Grid justify="center">
                  <Link target={'_blank'} href={`https://youtube.com`}>
                  <Image
                    src='/images/logos/others/youtube.png'
                    alt={`logo Drill Dev`}
                    width={50}
                    height={50}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    loader={myLoader}
                    priority
                    quality={100}
                  />
                  </Link>
                </Grid>

              </Grid.Container>
            </Grid.Container>
            <Grid.Container justify="center">
        <Grid xs={12} justify='center'>
          <Text>{`©${new Date().getFullYear()} ${WEBSITE_NAME}`}</Text>
        </Grid>
        <Grid xs={12} justify='center'>
          <Text>{t('all_rights_reserved', {ns:NAMESPACE_LANGAGE_COMMON})}</Text>
        </Grid>
      </Grid.Container>
          </Card.Body>
        </Card>
        </Grid>
      </Grid.Container>

    </Container>
  )
}
