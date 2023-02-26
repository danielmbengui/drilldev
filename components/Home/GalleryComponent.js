import React, { useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Card, Text, Link, Avatar, useTheme, Input, Pagination } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import ImageMasonry from "../Personnal/ImageMasonry.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid } from "@mui/material";
import axios from 'axios';
import useSWR from 'swr';
import { GALLERY_MAX_PICTURES_PER_PAGE, NAMESPACE_LANGAGE_GALLERY, PAGE_LINK_API_PICTURES, QUERY_ACTION_GET_LIST_PICTURES, QUERY_SEARCH } from "@/constants.js";
import { useTranslation } from "next-i18next";


const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
//const logoLightTheme = "/images/logos/logo_original_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_original_dark_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_original_dark_complete_no_back.png";

//const logoLightTheme = "/images/logos/logo_black_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_white_dark_complete_no_back.png";
//const PICTURES = require("../../public/collections/data-pictures.json");

function getRandomSortPictures(_pictures = []) {
  const randomOrder = [];
  const randomPictures = [];
  const min = 0;
  const max = _pictures.length;
  for (let i = 0; i < max; i++) {
    let random = Math.floor(Math.random() * (max - min) + min);
    while (randomOrder.includes(random)) {
      random = Math.floor(Math.random() * (max - min) + min);
    }
    const element = _pictures[random];
    randomOrder.push(random);
    randomPictures.push(element);
  }

  return randomPictures; // The maximum is exclusive and the minimum is inclusive
}

const fetcherListPictures = params => axios.get(`${PAGE_LINK_API_PICTURES}`, params).then(res => res.data);


export default function GalleryComponent(props) {
  const {t} = useTranslation(NAMESPACE_LANGAGE_GALLERY);
  const { isMobile } = props;

  const [manager, setManager] = useState({
    search: '',
    page: 1,
    per_page: GALLERY_MAX_PICTURES_PER_PAGE,
    next_page: 0,
    total_page: 0,
    length: 0,
    total_length: 0,
    list: [],
  });
  const { data, error, isLoading, isValidating } = useSWR({
    params: {
      action: QUERY_ACTION_GET_LIST_PICTURES,
      search: manager.search,
      page: manager.page,
      per_page: manager.per_page,
    }
  }, fetcherListPictures);

  useEffect(() => {
    console.log("MANAGE loading", isLoading)
    console.log("MANAGE validate", isValidating)
    console.log("MANAGE data", data)
    console.log("MANAGER DATA search", manager.search)
  })

  const [filteredList, setFilteredList] = useState([]);
  const { isDark } = useTheme();
  const [variant, setVariant] = useState("static");
  const [srcModal, setSrcModal] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [typesModal, setTypesModal] = useState([]);
  const [picture, setPicture] = useState(null);

  const handleChangeState = (field, value) => {
    setManager((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangeEvent = (field) => {
    return (e) => {
      setManager((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    };
  };

  useEffect(() => {
    if (data) {
      console.log("GALLLLEEERY", data);
      handleChangeState("total_length", data.result.total_length);
      handleChangeState("total_page", data.result.total_page);
      handleChangeState("page", data.result.page);
      handleChangeState("next_page", data.result.next_page);
      handleChangeState("list", data.result.list);
      
    }
    //handleChangeState("search", search);
    console.log("CHANGE SEARCH", manager.search);
    //handleChangeState("total_length", data.result.total_length);
    //handleChangeState("search", data.result.search);
    /*
    page: pictures.page,
        per_page: pictures.per_page,
        next_page: pictures.next_page,
        total_page: pictures.total_page,
        length: pictures.length,
        total_length: pictures.total_length,
        pictures: pictures.list,
    */
    //setFilteredList(manager.pictures);
  }, [data])


  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid container justifyContent={'center'} sx={{ mb: 3 }}>
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
                    onChange={handleChangeEvent("search")}
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
      </Grid>

      <ImageMasonry
        isMobile={isMobile}
        pictures={filteredList}
        manager={manager}
        handleChangeState={handleChangeState}
      />
    </Grid>
  )
}
