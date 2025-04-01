import React, { useEffect, useState } from 'react';
import { getDocumentTheme } from '@nextui-org/react';
import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { lightTheme, darkTheme } from '@/styles/theme';
import { DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, NAMESPACE_LANGAGE_COMMON, STORAGE_LANGAGE, STORAGE_SCREEN_MODE, TAB_NAMEPACES } from '@/constants';
import { useMediaQuery } from "@/styles/useMediaQuery";
import { getLangageStorage } from '@/lib/storage/UserStorageFunctions';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import DeviceModeProvider from '@/contexts/DeviceModeProvider';
import ThemeModeProvider from '@/contexts/ThemeModeProvider';
import { SSRProvider } from '@react-aria/ssr';
import { useSSR } from '@nextui-org/react';
import { useRouter } from 'next/router';
import 'moment/locale/fr';
import LangageProvider from '@/contexts/LangageProvider';

const MyApp = ({ Component, pageProps }) => {
  //const {t} = useTranslation();
  const router = useRouter();
  const { isBrowser } = useSSR();
  const isMobile = useMediaQuery(650);
  const isTablet = useMediaQuery(960);
  const isLaptop = useMediaQuery(1280);
  const [isDark, setIsDark] = useState();
  const [lang, setLang] = useState(DEFAULT_LANGAGE);
  const [screenMode, setScreenMode] = useState(DEFAULT_SCREEN_MODE);

  const mobile = useMediaQuery(599);
  const tablet = useMediaQuery(904);
  const laptop = useMediaQuery(1240);
  const desktop = useMediaQuery(1440);
  const tv = useMediaQuery(5000);
  const sizes = {
    mobile: mobile,
    tablet: tablet,
    laptop: laptop,
    desktop: desktop,
    tv: tv,
  }

  const onChangeLanguage = (language) => {
    setLang(language);
  };

  useEffect(() => {
    /*
    let _lang = getLangageStorage();
    setLang(_lang);
    //i18n.changeLanguage(_lang);
    document.documentElement.setAttribute('lang', _lang);
*/
    let lang = DEFAULT_LANGAGE;

    if (!window.localStorage.getItem(STORAGE_LANGAGE)) {
      window.localStorage.setItem(STORAGE_LANGAGE, DEFAULT_LANGAGE);
    } else {
      lang = window.localStorage.getItem(STORAGE_LANGAGE);
    }
    setLang(lang);
    //console.log("LAAANG MAIN", _lang)
  }, [])

  useEffect(() => {
    // you can use any storage
    let theme = window.localStorage.getItem(STORAGE_SCREEN_MODE);

    setIsDark(theme === 'dark');
    setScreenMode(theme);
    document.documentElement.setAttribute('data-theme', theme)
    const observer = new MutationObserver(() => {
      let newTheme = getDocumentTheme(document?.documentElement);

      //document.documentElement.setAttribute('data-theme', newTheme)
      setIsDark(newTheme === 'dark');
      setScreenMode(theme);
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function adjustIframeLayout(isOpen) {
      const widgetIframe = document.getElementById("xeko-ai-widget");
      if (!widgetIframe) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.top = 0;
          widgetIframe.style.bottom = 0;
          widgetIframe.style.left = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.width = "100%";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = "auto";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "200px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "";
        }
      } else {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = 0;
          //widgetIframe.style.left = "auto";
          widgetIframe.style.width = "450px";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          //widgetIframe.style.right = "0";
          widgetIframe.style.top = "auto";
          //widgetIframe.style.bottom = "0";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "210px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "translateY(-50%)";

          widgetIframe.style.right = 0;
          widgetIframe.style.bottom = 0;
          //widgetIframe.style.border= '5px solid cyan';
          //widgetIframe.style.width= '210px';
          //widgetIframe.style.maxWidth: '250px';
        }
      }
    }

    const handleResize = () => {
      const currentState = window.xekoWidgetState !== undefined ? window.xekoWidgetState : false;
      adjustIframeLayout(currentState);
    };

    const handleMessage = (event) => {
      if (event.data?.type === "resize_widget") {
        window.xekoWidgetState = event.data.isOpen;
        adjustIframeLayout(event.data.isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("message", handleMessage);

    adjustIframeLayout(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    isBrowser && <SSRProvider>
      <ThemeModeProvider screenMode={screenMode}>
        <Head>
          <meta name="description" content={'Drill Dev'} />
          <meta name="twitter:description" content={"Taan & Daan"} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <DeviceModeProvider>
          <LangageProvider langageMode={lang}>
          <iframe
            id="xeko-ai-widget"
            src="https://assistant.xeko.ai?assistant_id=67ec4bd73d81dc6b55905a46"
            style={{
              position: 'fixed',
              right: 0, bottom: 0,
              border: 'none',
              //margin: 0, padding: 0, 
              zIndex: 9999
            }}
            scrolling="no"></iframe>
            <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
              <Component
                {...pageProps}
                langage={lang} setLangage={onChangeLanguage}
                lang={lang}
                setLang={onChangeLanguage}
                sizes={sizes}
                isMobile={isMobile}
                isTablet={isTablet}
                isLaptop={isLaptop}
              />
            </NextUIProvider>
          </LangageProvider>
        </DeviceModeProvider>
      </ThemeModeProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
