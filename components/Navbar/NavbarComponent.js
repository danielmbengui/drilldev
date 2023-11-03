import React, { useState, useEffect, useRef, createRef, useMemo } from "react";
import { Navbar, Button, Link, Text, Grid, Input, Container, Dropdown, Collapse, } from "@nextui-org/react";
import { AcmeLogo } from "../Containers/AcmeLogo.js";
import { Switch, changeTheme, useTheme } from '@nextui-org/react'
import { SunIcon } from "../Personnal/SunIcon.js";
import { MoonIcon } from "../Personnal/MoonIcon.js";
import DropdownCustom from "../Personnal/Dropdown.js";
import { SearchIcon } from "../Personnal/SearchIcon.js";
import { useMediaQuery } from "../../styles/useMediaQuery";
import Image from "next/image.js";
import { useTranslation } from "next-i18next";
import { updateLangageStorage } from "@/lib/storage/UserStorageFunctions.js";
import { NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_TUTORIAL_MIDJOURNEY, PAGE_LINK_GALLERY, PAGE_LINK_HOME, PAGE_LINK_TUTORIAL, PAGE_LINK_TUTORIAL_DRILL_DEV, PAGE_LINK_TUTORIAL_MIDJOURNEY, STORAGE_SCREEN_MODE, WEBSITE_NAME } from "@/constants.js";
import { useRouter } from "next/router.js";
import { ChevronDownIcon, icons } from "../Personnal/Icons.js";
import { myLoader } from "@/lib/ImageLoader.js";
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import DropdownLangageComponent from "../Customs/DropdownLangage.js";
//const logoLightTheme = "/images/logos/logo_black_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_white_dark_complete_no_back.png";
//const logoLightTheme = "/images/logos/logo_original_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_original_dark_complete_no_back.png";
const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoMobileTheme = "/images/logos/logo_orange_pic_no_back.png";

export default function NavbarComponent(props) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { type, isDark } = useTheme();
  const { lang, setLang, variant, activeColorContent, variantContent, sizes } = props;
  const isXs = useMediaQuery(650);
  const [subtitleSelected, setSubtitleSelected] = useState(new Set([router.asPath]));
  const [selected, setSelected] = useState(new Set([router.asPath]));

  const refSubtitle = createRef();

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem(STORAGE_SCREEN_MODE, nextTheme); // you can use any storage
    changeTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  useEffect(() => {
    if (subtitleSelected) {
      //setSubtitleSelected(router.asPath);
    }
  }, [subtitleSelected])

  const onChangeLanguage = (_lang) => {
    setLang(_lang);
    i18n.changeLanguage(_lang);
    updateLangageStorage(_lang);
    document.documentElement.setAttribute('lang', _lang);
    //handleClose();
    //console.log("onChangeLanguage NavbarComponent", _lang)
  };
  //const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];
  const menuItems = [
    {
      name: t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON }),
      href: PAGE_LINK_GALLERY,
    },
    
    {
      name: t('menuTutorial', { ns: NAMESPACE_LANGAGE_COMMON }),
      href: PAGE_LINK_TUTORIAL,
      subtitle: [
        /*
        {
          name: WEBSITE_NAME,
          description:"Découvrez les outils utilisés pour créer le site internet",
          href: PAGE_LINK_TUTORIAL_DRILL_DEV,
          icon: <Image 
            src={`/images/logos/logo_${isDark ? 'white' : 'black'}_pic_no_back.png`}
            alt={`icon ${WEBSITE_NAME}`}
            width={40}
            height={40}
            loader={myLoader}
            priority
            quality={100}
          />,
        },
        */
        {
          name: 'Midjourney',
          description:t('subtitle_midjourney', {ns:NAMESPACE_LANGAGE_TUTORIAL_MIDJOURNEY}),
          href: PAGE_LINK_TUTORIAL_MIDJOURNEY,
          icon: <Image 
            src={`/images/logos/others/midjourney.png`}
            alt={`icon ${WEBSITE_NAME}`}
            width={35}
            height={35}
            loader={myLoader}
            priority
            quality={100}
          />,
        }
      ]
    }
    
  ];

  const collapseItems = [
    `${t('menuHome', { ns: NAMESPACE_LANGAGE_COMMON })}`,
    `${t('menuGallery', { ns: NAMESPACE_LANGAGE_COMMON })}`,
    "Prompt",
    "F.A.Q",
    //"Collections",
    //"FAQ",
    //"Login",
    //"Sign Up",
  ];

  const handleSubtitle = (e) => {
    const value = e.values().next().value;
    console.log("LIIINK", e.values().next().value)
    //setSubtitleSelected(e);
    if (value) {
      setSubtitleSelected(e);
      router.push(value);
    }
  }


  const MenuItemComponent = (props) => {
    const { menu, index } = props;
    
    if (menu.subtitle) {
      return (
      <Dropdown isBordered
        >
        <Navbar.Item>
          <Dropdown.Button
         // b
          //as={'text'}
            auto
            light={!router.asPath.includes(menu.href)}
            css={{
              px: 0,
              dflex: "center",
              svg: { pe: "none" },
              //fontWeight: router.asPath.includes(menu.href) ? '$bold' : '$normal'
            }}
            rounded
            //flat
            iconRight={icons.chevron}
            //ripple={false}
            //isActive={router.asPath.includes(menu.href)}
          >
           {menu.name}
          </Dropdown.Button>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label={menu.name}
          //selectedKeys={menu.subtitle}
          selectionMode="single"
          selectedKeys={subtitleSelected}
          onSelectionChange={handleSubtitle}
          color="primary"
          css={{
            $$dropdownMenuWidth: "340px",
            $$dropdownItemHeight: "70px",
            "& .nextui-dropdown-item": {
              py: "$4",
              // dropdown item left icon
              svg: {
                color: "$text",
                mr: "$4",
              },
              // dropdown item title
              "& .nextui-dropdown-item-content": {
                w: "100%",
                fontWeight: "$semibold",
              },
            },
          }}
        >
          {
            menu.subtitle.map((item, index) => {
              return (
                <Dropdown.Item
                  id={item.name + index}
                  key={item.href}
                  //ref={refSubtitle}
                  showFullDescription
                  description={item.description}
                  icon={item.icon}
                  isActive={true}
                  as={`a`}
                  href={`/`}
                  onPress={() => {
                    console.log("On press midjourney")
                  }}
                  css={{
                    bg: router.asPath.includes(item.href) ? '$primary' : '',
                  }}
                >
                  {item.name}
                </Dropdown.Item>
              )
            })
          }
        </Dropdown.Menu>
      </Dropdown>)
    }
    

    return (
      <Navbar.Link
        aria-label={`${menu.name} - ${index}`}
        key={`${menu.name} - ${index}`}
        id={`${menu.name} - ${index}`}
        isActive={router.asPath.includes(menu.href)}
        href={menu.href}>
        {`${menu.name}`}
      </Navbar.Link>
    )
  }

  return (
    <Navbar
      //isCompact={sizes.laptop ? true : false}
      maxWidth={'fluid'}
      //height={sizes.laptop ? '150px' : '74px'}
      isBordered="true"
      variant={'floating'}
      disableShadow
      disableBlur
      containerCss={{
        background:'$accents2',
        //bgBlur:'green'
      }}
      css={{
        position: 'fixed',
        //background: 'red',

        zIndex: 1000,
        //marginBottom:50
      }}
      shouldHideOnScroll={false}
      aria-label="navbar"
    >
      <Navbar.Brand aria-label="brand navigation">
        <Navbar.Toggle showIn={"xs"} aria-label="toggle navigation" />
        <div style={{
          marginLeft: { xs: 10, sm: 0 },
          display: isXs ? 'none' : 'flex'
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
      </Navbar.Brand>
      <Navbar.Content aria-label="content navigation" activeColor={activeColorContent} hideIn="xs" variant={variantContent}>

        <Navbar.Link aria-label="home" key={'home'} id={'home'} isActive={router.asPath === PAGE_LINK_HOME} href={PAGE_LINK_HOME}>{t('menuHome', { ns: NAMESPACE_LANGAGE_COMMON })}</Navbar.Link>
        {
          menuItems.map((item, index) => {
            return (
              <MenuItemComponent
              aria-label={`${item.name} - ${index}`}
              key={`${item.name} - ${index}`}
              id={`${item.name} - ${index}`}
                menu={item}
                index={index}
              />
            )
          })
        }
  {
    /*
      <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: "center",
                svg: { pe: "none" },
              }}
              iconRight={icons.chevron}
              ripple={false}
            >
              {t('menuTutorial', { ns: NAMESPACE_LANGAGE_COMMON })}
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="ACME features"
            css={{
              $$dropdownMenuWidth: "340px",
              $$dropdownItemHeight: "70px",
              "& .nextui-dropdown-item": {
                py: "$4",
                // dropdown item left icon
                svg: {
                  color: "$secondary",
                  mr: "$4",
                },
                // dropdown item title
                "& .nextui-dropdown-item-content": {
                  w: "100%",
                  fontWeight: "$semibold",
                },
              },
            }}
          >

            <Dropdown.Item
              key="autoscaling"
              showFullDescription
              description="ACME scales apps to meet user demand, automagically, based on load."
              icon={icons.scale}
              isActive={true}
              css={{
                bg: 'red'
              }}
            >
              Midjourney
            </Dropdown.Item>
            <Dropdown.Item
              key="usage_metrics"
              showFullDescription
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              icon={icons.activity}
            >
              Chat GPT
            </Dropdown.Item>
            <Dropdown.Item
              key="production_ready"
              showFullDescription
              description="ACME runs on ACME, join us and others serving requests at web scale."
              icon={icons.flash}
            >
              Next UI
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    */
  }

        {
          /**
           *    <Navbar.Link aria-label="prompt" key={'prompt'} id={'prompt'} isActive={false} href="/">Prompt</Navbar.Link>
        <Navbar.Link aria-label="faq" key={'faq'} id={'faq'} isActive={false} href="/">F.A.Q</Navbar.Link>
  
           <Navbar.Link aria-label="collections" key={'collections'} isActive={pages.collections} href="/collections">Collections</Navbar.Link>
        <Navbar.Link aria-label="faq" key={'faq'} href="#">FAQ</Navbar.Link>
           */
        }
        {
          /*
          <Navbar.Link key={'company'} href="#">Company</Navbar.Link>
          */
        }
      </Navbar.Content>
      <Navbar.Content>
        <Grid.Container gap={1} justify="center" alignItems="center">
          <Grid >
            <Switch
              aria-label="content navigation"
              aria-labelledby="content navigation"
              checked={isDark}
              size="xl"
              //shadow
              bordered
              iconOn={<SunIcon filled />}
              iconOff={<MoonIcon filled />}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <DropdownLangageComponent lang={lang} setLang={onChangeLanguage} />
          </Grid>
        </Grid.Container>

      </Navbar.Content>



      <Navbar.Collapse id="collapse mobile" aria-labelledby="collapse mobile">


        <Navbar.CollapseItem
          key={'home'}
          id={'home'}
          activeColor="primary"
          color="$text"
          css={{
            //color: index === 0 ? "$primary" : "$text",
          }}
          isActive={router.asPath === PAGE_LINK_HOME}
        >
                    <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href={PAGE_LINK_HOME}
          >
          {t('menuHome', { ns: NAMESPACE_LANGAGE_COMMON })}
          </Link>
        </Navbar.CollapseItem>
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
