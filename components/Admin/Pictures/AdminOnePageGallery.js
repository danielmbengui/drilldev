import React, { useEffect, useState } from "react";
import { Card, Text, Link, Avatar, useTheme, Input, Pagination, Button, } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, Container, FormLabel, Grid, Stack } from "@mui/material";
import axios from 'axios';
import useSWR from 'swr';
import { ADMIN_GALLERY_MAX_PICTURES_PER_PAGE, GALLERY_MAX_PICTURES_PER_PAGE, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, QUERY_SEARCH } from "@/constants.js";
import { useTranslation } from "next-i18next";

import Masonry from '@mui/lab/Masonry';
import UndownloadableImage from "@/components/Customs/UndownloadableImage.js";
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
import { _TYPES_PICTURES_ } from "@/__mocks__/types/_types_pictures_.js";
import CustomRadioGroup from "@/components/Customs/CustomRadioGroup.js";
import CustomCheckBox from "@/components/Customs/CustomCheckBox";


const fetcherListPictures = params => axios.get(`${PAGE_LINK_API_PICTURES}`, params).then(res => res.data);

//edit_multiple_types

export default function AdminOnePageGallery(props) {
  const { isMobile, isTablet, isLaptop } = useDeviceMode();

  const { t } = useTranslation(NAMESPACE_LANGAGE_GALLERY);
  const [manager, setManager] = useState({
    type: 'all',
    types: [],
    indexesTypes: [],
    search: '',
    page: 1,
    per_page: ADMIN_GALLERY_MAX_PICTURES_PER_PAGE,
    next_page: 0,
    total_page: 0,
    length: 0,
    total_length: 0,
    list: [],
    indexPicture: -1,
    ids: [],
    indexesIds: [],
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
      per_page: ADMIN_GALLERY_MAX_PICTURES_PER_PAGE,
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
      handleChangeState("indexesTypes", _TYPES_PICTURES_.map(() => false));
      handleChangeState("indexesIds", data.result.list.map(() => false));
    }
  }, [data])

  return (
    <Grid container sx={{ minHeight: 500, width: '100%', }} justifyContent='center'>

            <Grid item xs={12} sm={8}>
              <Card css={{
                background: '$accents0',
                color: 'white',
                //pb:20
              }}>
                <Card.Body>
                  <Grid container direction={'column'} justifyContent='center' alignItems='center'>
                    <Grid item xs={12} sx={{
                      width: '100%', textAlign: 'center',
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
                        label={t('search_image', { ns: NAMESPACE_LANGAGE_GALLERY })}
                        status="primary"
                        bordered
                        aria-label="search bar"
                        clearable
                        contentRightStyling={false}
                        placeholder={t('search_place_holder', { ns: NAMESPACE_LANGAGE_GALLERY })}
                        //helperColor={helper.color}
                        helperText={`${t('search_results', { ns: NAMESPACE_LANGAGE_GALLERY })} : ${manager.total_length}`}
                        contentRight={
                          <SearchIcon color="primary" />
                        }
                      />
                    </Grid>

                    <Grid item xs={12} py={3} sx={{
                      textAlign: 'center',
                      display: 'none'
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

                    <Grid item xs={12} sx={{
                      //background:'green',
                      width: '100%'
                    }} my={3}>
                      <Grid container justifyContent={'center'} sx={{
                        width: '100%',
                        textAlign: 'center'
                      }}>
                        <Grid item xs={12}>
                          <FormLabel id="demo-customized-radios" color='primary' sx={{
                            //color:'var(--text-color)'
                          }}><Text color='$text' b css={{ tt: 'uppercase' }}>{`Types`}</Text></FormLabel>
                        </Grid>
                        {
                          _TYPES_PICTURES_ && _TYPES_PICTURES_.sort((type1, type2) => type1.label.localeCompare(type2.label))
                            .map((type, index) => {
                              return (
                                <CustomCheckBox
                                  key={`${type.value}-${index}`}
                                  value={type.value}
                                  checked={manager.indexesTypes.length > 0 && manager.indexesTypes[index]}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const types = manager.types;
                                    if (!e.target.checked) {
                                      manager.indexesTypes[index] = false;
                                      const _indexPic = types.indexOf(value);
                                      types.splice(_indexPic, 1);
                                    } else {
                                      manager.indexesTypes[index] = true;
                                      const _indexPic = types.indexOf(value);
                                      if (_indexPic === -1) {
                                        types.push(value);
                                      }
                                    }
                                    handleChangeState("types", types);
                                    console.log("TYPES TAB : ", types);
                                  }}
                                />
                              )
                            })
                        }
                      </Grid>
                    </Grid>


                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Button css={{ mx: 'auto' }} auto flat onPress={async () => {

                        await axios.get("/api/pictures", {
                          params: {
                            action: 'edit_multiple_types',
                            ids: JSON.stringify(manager.ids),
                            types: JSON.stringify(manager.types),
                          }
                        })

                        handleChangeState("ids", []);
                        handleChangeState("types", []);
                        handleChangeState("indexesIds", manager.list.map(() => false));
                        handleChangeState("indexesTypes", _TYPES_PICTURES_.map(() => false));
                        //console.log(`types: ${manager.types}, ids: ${manager.ids}`)
                      }}>{`Modifier`}</Button>
                    </Grid>

                    <Grid item xs={12}>
                      <CustomCheckBox
                        value={'all_ids'}
                        checked={manager.ids.length === manager.list.length}
                        //checked={manager.indexesIds.length > 0 && manager.indexesIds[index]}
                        //defaultChecked={false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const ids = [];
                          handleChangeState("indexesIds", manager.list.map(() => checked));
                          if (checked) {
                            manager.list.map((item) => {
                              ids.push(item.id.toString());
                            })
                          }
                          handleChangeState("ids", ids);
                          console.log("IDS tab : ", ids);
                          console.log("MUL: ", parseInt(14 / 15));
                        }}
                      //defaultChecked={false}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{
                      width: '100%'
                    }}>
                      <Text>{`Nb IDS selected : ${manager.ids.length}`}</Text>
                      <Text>{`IDS selected : ${manager.ids}`}</Text>
                      <Text>{`Types selected : ${manager.types}`}</Text>
                    </Grid>

                  </Grid>
                </Card.Body>
              </Card>
            </Grid>
            <Grid item xs={12} justifyContent='center' sx={{
              my: 3,
              //maxWidth:'fit-content',
              //background:'green',
              textAlign: 'center'
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
                columns={{ xs: 6, sm: 10, md: 15 }}
              >
                {
                  manager.list.map((item, index) => {
                    const numRow = parseInt(index / 15);
                    const firstValueRow = 15 * numRow;
                    const lastValueRow = (15 * (numRow + 1)) - 1;

                    return (
                      <Stack key={`${item.title}-${index}`} style={{
                        //cursor:'pointer'
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
                          //loading={'lazy'}
                          priority
                        />
                        <CustomCheckBox
                          value={item.id}
                          checked={manager.indexesIds.length > 0 && manager.indexesIds[index]}
                          //defaultChecked={false}
                          onChange={(e) => {


                            //setSelected(tab);
                            const value = e.target.value;
                            const ids = manager.ids;
                            if (!e.target.checked) {
                              manager.indexesIds[index] = false;
                              const _indexPic = ids.indexOf(value.toString());
                              ids.splice(_indexPic, 1);
                            } else {
                              manager.indexesIds[index] = true;
                              const _indexPic = ids.indexOf(value);
                              if (_indexPic === -1) {
                                ids.push(value.toString());
                              }
                            }
                            handleChangeState("ids", ids);
                            console.log("IDS tab : ", ids);
                          }}
                        //defaultChecked={false}
                        />
                        {
                          index === lastValueRow && <p>{`Row ${numRow}: ${firstValueRow} - ${lastValueRow}`}</p>
                        }
                      </Stack>
                    )
                  })
                }
              </Masonry>
            </Grid>
            <Grid item xs={12} justifyContent='center' sx={{
              my: 3,
              //maxWidth:'fit-content',
              //background:'green',
              textAlign: 'center'
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
              //open={manager.indexPicture >= 0}
              close={() => handleChangeState("indexPicture", -1)}
              slides={manager.list}
              plugins={[Zoom, Fullscreen, Thumbnails, Captions /* , Video, Slideshow*/]}
              index={manager.indexPicture}
              render={{
                slide: (slide) => <UndownloadableImage
                  src={`${slide.src}`}
                  alt={slide.title}
                  widthAuto={true}
                />,
                thumbnail: (slide) => <UndownloadableImage
                  src={`${slide.slide.src}`}
                  alt={slide.slide.title}
                  widthAuto={true}
                />
              }}
            />
          </Grid>
          )
}