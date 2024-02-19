import React, { useState, useEffect,} from "react";
import { Navbar, Link, Grid, Dropdown, } from "@nextui-org/react";
import { useMediaQuery } from "../../styles/useMediaQuery";
import Image from "next/image.js";
import { useTranslation } from "next-i18next";
import { updateLangageStorage } from "@/lib/storage/UserStorageFunctions.js";
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_TUTORIAL_MIDJOURNEY, PAGE_LINK_ABOUT, PAGE_LINK_CONTACT, PAGE_LINK_DOWNLOADS, PAGE_LINK_GALLERY, PAGE_LINK_HOME, PAGE_LINK_TUTORIAL, PAGE_LINK_TUTORIAL_DRILL_DEV, PAGE_LINK_TUTORIAL_MIDJOURNEY, STORAGE_SCREEN_MODE, WEBSITE_NAME } from "@/constants.js";
import { useRouter } from "next/router.js";
import { ChevronDownIcon, icons } from "../Personnal/Icons.js";
import { myLoader } from "@/lib/ImageLoader.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import DropdownLangageComponent from "./DropdownLangageComponent.js";
import SwitchThemeComponent from "./SwitchThemeComponent.js";
import { useDeviceMode } from "@/contexts/DeviceModeProvider";
const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoMobileTheme = "/images/logos/logo_orange_pic_no_back.png";

const activeColorContent="primary";
const variantContent="highlight-rounded";

export default function MenuComponent(props) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { lang, setLang, langage, setLangage} = props;
  
  const isXs = useMediaQuery(650);

  const {isMobile, isTablet, isLaptop} = useDeviceMode();

  const [subtitleSelected, setSubtitleSelected] = useState(new Set([router.asPath]));

  const menuItems = [
    {
      name: t('menuHome', { ns: NAMESPACE_LANGAGE_COMMON }),
      href: PAGE_LINK_HOME,
    },
    {
        name: t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON }),
        href: PAGE_LINK_GALLERY,
      },
      /*
      {
        name: t('menuDownloads', { ns: NAMESPACE_LANGAGE_COMMON }),
        href: PAGE_LINK_DOWNLOADS,
      },
      */
      
    {
      name: t('menuTutorial', { ns: NAMESPACE_LANGAGE_COMMON }),
      href: PAGE_LINK_TUTORIAL_MIDJOURNEY,
    },
      /*
    {
        name: t('menuAbout', { ns: NAMESPACE_LANGAGE_COMMON }),
        href: PAGE_LINK_ABOUT,
      },
      {
        name: t('menuContact', { ns: NAMESPACE_LANGAGE_COMMON }),
        href: PAGE_LINK_CONTACT,
      },
      */

  ];

  return (
    <Navbar
      //isCompact={sizes.laptop ? true : false}
      maxWidth={'fluid'}
      //height={sizes.laptop ? '150px' : '74px'}
      isCompact={isTablet}
      isBordered="true"
      variant={'floating'}
      //disableShadow
      disableBlur
      containerCss={{
        background:'$accents2',
        //bgBlur:'green'
      }}
      css={{
        position: 'fixed',
        background: '$background',

        zIndex: 1000,
        //marginBottom:50
      }}
      shouldHideOnScroll={false}
      aria-label="navbar"
    >
      <Navbar.Brand aria-label="brand navigation">
        <Navbar.Toggle showIn={"xs"} aria-label="toggle navigation" />
        {
          !isTablet && <div style={{
            marginLeft: { xs: 10, sm: 0 },
            //display: isTablet ? 'none' : 'flex'
          }}>
            <UndownloadableImage
              //showSkeleton
              //maxDelay={10000}
              //autoResize={true}
              width={50}
              height={50}
              src={logoMobileTheme}
              alt="logo pic Image"
            //objectFit="cover"
            />
          </div>
        }
      </Navbar.Brand>
      <Navbar.Content aria-label="content navigation" activeColor={activeColorContent} hideIn="xs" variant={variantContent}>
        
        {
          menuItems.map((item, index) => {
            return (
                <Navbar.Link 
                aria-label={"home" + index} 
                key={'home' + index} 
                id={'home' + index} 
                isActive={router.asPath === item.href} 
                href={item.href}>
                    {item.name}
                </Navbar.Link>
            )
          })
        }
      </Navbar.Content>
      <Navbar.Content>
        <Grid.Container gap={1} justify="center" alignItems="center">
          <Grid >
            <SwitchThemeComponent />
          </Grid>
          <Grid>
            <DropdownLangageComponent 
            lang={langage} 
            setLang={setLangage} 
            langage={lang} setLangage={setLangage}
            />
          </Grid>
        </Grid.Container>
      </Navbar.Content>



      <Navbar.Collapse id="collapse mobile" aria-labelledby="toggle navigation">
        {
          menuItems.map((item, index) => {
            return (
              <Navbar.CollapseItem
                key={`${item.name} - ${index}`}
                id={`${item.name} - ${index}`}
                activeColor="primary"
                color="$text"
                css={{
                  //color: index === 0 ? "$primary" : "$text",
                }}
                isActive={router.asPath.includes(item.href)}
              >
                <Grid.Container>
                <Grid xs={12} alignItems={'center'}>
                {
                  !item.subtitle ? <Link
                  color="inherit"
                  css={{
                    //minWidth: "100%",
                    mr:10,
                  }}
                  href={item.href}
                >
                {item.name}
                </Link> : <>
                <Link
                  color="inherit"
                  css={{
                    //minWidth: "100%",
                    mr:10,
                  }}
                  //href={item.href}
                >
                {item.name}
                </Link>
                <ChevronDownIcon size={24} fill="currentColor" />
                </>
                }
                
                </Grid>
               {
                item.subtitle && item.subtitle.map((item, index) => {
                  return (
                    <Grid 
                    xs={12}
                    key={`${item.name} - ${index}`}
                id={`${item.name} - ${index}`}
                >
                      <Link href={item.href}
                  css={{
                    ml:20,
                    fontWeight:'$normal',
                    color:router.asPath === item.href ? '$primary' : '$text',
                    minWidth: "100%",
                  }}>{item.name}</Link>
                    </Grid>
                  )
                })
               }
                </Grid.Container>
              </Navbar.CollapseItem>
            )
          })
        }
      </Navbar.Collapse>
    </Navbar>
  )
}
