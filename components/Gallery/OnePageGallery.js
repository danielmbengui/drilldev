import React, { useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Card, Text, Link, Avatar, useTheme, Input, Pagination, } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import ImageMasonry from "../Personnal/ImageMasonry.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid, Stack } from "@mui/material";
import axios from 'axios';
import useSWR from 'swr';
import { GALLERY_MAX_PICTURES_PER_PAGE, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, QUERY_SEARCH } from "@/constants.js";
import { useTranslation } from "next-i18next";

import Masonry from '@mui/lab/Masonry';
import UndownloadableImage from "../Customs/UndownloadableImage.js";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useDeviceMode } from "@/contexts/DeviceModeProvider.js";
import CustomCheckBox from "../Customs/CustomCheckBox.js";
import { _TYPES_PICTURES_ } from "@/__mocks__/types/_types_pictures_.js";
import CustomRadioGroup from "../Customs/CustomRadioGroup.js";


const fetcherListPictures = params => axios.get(`${PAGE_LINK_API_PICTURES}`, params).then(res => res.data);

export default function OnePageGallery (props) {
  const {isMobile, isTablet, isLaptop} = useDeviceMode();

    const {t} = useTranslation(NAMESPACE_LANGAGE_GALLERY);
  const [manager, setManager] = useState({
    type: 'all',
    search: '',
    page: 1,
    per_page: GALLERY_MAX_PICTURES_PER_PAGE,
    next_page: 0,
    total_page: 0,
    length: 0,
    total_length: 0,
    list: [],
    indexPicture: -1,
  });
  const handleChangeState = (field, value) => {
    setManager((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const { data } = useSWR({
    params: {
      action: QUERY_ACTION_GET_LIST_PICTURES,
      type: manager.type,
      search: manager.search,
      page: manager.page,
      per_page: GALLERY_MAX_PICTURES_PER_PAGE,
    }
  }, fetcherListPictures);

  useEffect(() => {
    if (data) {
      console.log("GALLLLEEERY", data);
      handleChangeState("total_length", data.result.total_length);
      handleChangeState("total_page", data.result.total_page);
      handleChangeState("page", data.result.page);
      handleChangeState("next_page", data.result.next_page);
      handleChangeState("list", data.result.list);
    }
  }, [data])
  
  return(
    <Grid container sx={{ minHeight: 500, width:'100%',}} justifyContent='center'>
        <Grid item xs={12} sm={8}>
          <Card css={{
            background: '$accents0',
            color: 'white',
            //pb:20
          }}>
            <Card.Body>
              <Grid container direction={'column'} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sx={{
                  width:'100%',textAlign:'center',
                //background:'red'
                }}>
                  <Input
                    color="primary"
                    width={isMobile ? "100%" : '70%'}
                    css={{
                      color: '$primary',
                      //background:'$accents0'
                      //width: '100%',
                    }}
                    value={manager.search}
                    initialValue={manager.search}
                    //labelLeft="search" 
                    onChange={(e) => {
                        handleChangeState("search", e.target.value)
                    }}
                    label={t('search_image', {ns:NAMESPACE_LANGAGE_GALLERY})}
                    status="primary"
                    bordered
                    aria-label="search bar"
                    clearable
                    contentRightStyling={false}
                    placeholder={t('search_place_holder', {ns:NAMESPACE_LANGAGE_GALLERY})}
                    //helperColor={helper.color}
                    helperText={`${t('search_results', {ns:NAMESPACE_LANGAGE_GALLERY})} : ${manager.total_length}`}
                    contentRight={
                      <SearchIcon color="primary" />
                    }
                  />
                </Grid>

                <Grid item  xs={12}py={3} sx={{
                  textAlign:'center',
                  //background:'red'
                }}>
                <Stack alignItems={'center'}>
                <CustomRadioGroup
                  array={_TYPES_PICTURES_}
                  type={manager.type}
                  handleChangeState={handleChangeState}
                  />
                </Stack>
                </Grid>

              </Grid>
            </Card.Body>
          </Card>
        </Grid>
                    <Grid item xs={12} justifyContent='center' sx={{
              my:3,
              //maxWidth:'fit-content',
              //background:'green',
              textAlign:'center'
            }}>
            <Pagination 
            onChange={(page) => {
              handleChangeState("page", page)
            }}
        boundaries={isMobile ? 0 : isTablet ? 3 : 5} //3
        siblings={isMobile ? 1 : isTablet ? 4 : 6} //2
      noMargin
      page={manager.page}
      size={'md'}
      css={{
        //width:'100%',
        //mx:'auto'
      }}
      total={manager.total_page}
      />
            </Grid>
            <Grid item xs={12} justifyContent='center'>
      <Masonry 
      columns={{xs:4, sm:6, md:10}}
      >
        {
            manager.list.map((item, index) => <div key={`${item.title}-${index}`} style={{
                cursor:'pointer'
              }}>
                <UndownloadableImage
       onClick={() => {
        handleChangeState("indexPicture", index);
      }}
        src={`${item.src}`}
        srcSet={`${item.src}`}
        alt={item.title}
        width={500}
        height={500}
        borderRadius={10}
      />
                </div>
                )
        }
        </Masonry>
        </Grid>
        <Grid item xs={12} justifyContent='center' sx={{
              my:3,
              //maxWidth:'fit-content',
              //background:'green',
              textAlign:'center'
            }}>
            <Pagination 
            onChange={(page) => {
              handleChangeState("page", page)
            }}
        boundaries={isMobile ? 0 : isTablet ? 3 : 5} //3
        siblings={isMobile ? 1 : isTablet ? 4 : 6} //2
      noMargin
      page={manager.page}
      size={'md'}
      css={{
        //width:'100%',
        //mx:'auto'
      }}
      total={manager.total_page}
      />
            </Grid>
            <Lightbox
      //sx={{backgroundColor:'red'}}
      title={'Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom'}
        open={manager.indexPicture >= 0}
        close={() => handleChangeState("indexPicture", -1)}
        slides={manager.list}
        plugins={[Zoom, Fullscreen, Thumbnails, Captions /* , Video, Slideshow*/]}
        index={manager.indexPicture}
        render={{
            slide:(slide) => <UndownloadableImage
            src={`${slide.src}`}
            alt={slide.title}
            widthAuto={true}
            />,
            thumbnail:(slide) => <UndownloadableImage
            src={`${slide.slide.src}`}
            alt={slide.slide.title}
            widthAuto={true}
            />
        }}
      />
    </Grid>
  )
}