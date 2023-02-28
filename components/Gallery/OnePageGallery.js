import React, { useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Card, Text, Link, Avatar, useTheme, Input, Pagination, } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import ImageMasonry from "../Personnal/ImageMasonry.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid } from "@mui/material";
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

const fetcherListPictures = params => axios.get(`${PAGE_LINK_API_PICTURES}`, params).then(res => res.data);

export default function OnePageGallery (props) {
  const {isMobile} = useDeviceMode();

    const {t} = useTranslation(NAMESPACE_LANGAGE_GALLERY);
  const [manager, setManager] = useState({
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
    <Grid container sx={{ minHeight: 500, width:'100%',}}>
        <Grid item>
          <Card css={{
            background: '$accents0',
            color: 'white',
            pb:20
          }}>
            <Card.Body>
              <Grid container direction={'column'} alignItems='center'>
                <Grid item >
                  <Input
                    color="primary"
                    css={{
                      color: '$primary',
                      //background:'$accents0'
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
                      <SearchIcon />
                    }
                  />
                </Grid>
                <Grid item xs={12} sx={{display:'none'}}>
                  <Text h5>
                    <Text b>{`actual page : `}</Text>
                    <Text as={'span'}>{manager.page}</Text>
                  </Text>
                </Grid>

                <Grid item xs={12} sx={{display:'none'}}>
                  <Text h5>
                    <Text b>{`total pages : `}</Text>
                    <Text as={'span'}>{manager.total_page}</Text>
                  </Text>
                </Grid>

                <Grid item xs={12} sx={{display:'none'}}>
                  <Text h5>
                    <Text b>{`length pictures page : `}</Text>
                    <Text as={'span'}>{manager.length}</Text>
                  </Text>
                </Grid>

                <Grid item xs={12} sx={{display:'none'}}>
                  <Text h5>
                    <Text b>{`Nb total : `}</Text>
                    <Text as={'span'}>{manager.total_length}</Text>
                  </Text>
                </Grid>
              </Grid>
            </Card.Body>
          </Card>
        </Grid>
                    <Grid xs={12} justify='center' css={{
              mb:30,
              maxWidth:'fit-content'
            }}>
            <Pagination 
            onChange={(page) => {
              handleChangeState("page", page)
            }}
        boundaries={0}
        siblings={1}
      noMargin
      page={manager.page}
      size={'md'}
      css={{maxWidth:'100%'}}
      total={manager.total_page}
      />
            </Grid>
            <Grid xs={12} justify='center'>
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
         <Grid xs={12} justify='center' css={{
              mb:30,
              maxWidth:'fit-content'
            }}>
            <Pagination 
            onChange={(page) => {
              handleChangeState("page", page)
            }}
        boundaries={0}
        siblings={1}
      noMargin
      page={manager.page}
      size={'md'}
      css={{maxWidth:'100%'}}
      total={manager.total_page}
      />
            </Grid>
            <Lightbox
      sx={{backgroundColor:'red'}}
      title={'Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom'}
        open={manager.indexPicture >= 0}
        close={() => handleChangeState("indexPicture", -1)}
        slides={manager.list}
        plugins={[Zoom, Fullscreen, Thumbnails, /* Captions, Video, Slideshow*/]}
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