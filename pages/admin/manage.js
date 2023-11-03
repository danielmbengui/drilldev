import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import axios from 'axios';
/*
import { useTranslation } from 'next-i18next';
import { Input, Text, useSSR, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSWRConfig } from 'swr';
import useSWR from 'swr';
import { Grid } from '@mui/material';
*/
const fetcherListPictures = params => axios.get(`/api/pictures/${params.id}`, params).then(res => res.data);

export default function ManagePage(props) {
  /*
  const {isDark} = useTheme();
  const {t} = useTranslation(TAB_NAMEPACES);
  //get_one

  const router = useRouter();
  const [manager, setManager] = useState({
    id: router.query.id ? router.query.id : '',
    title: '',
  });

  useEffect(() => {
if (router.isReady){
    if (router.query.id) {
        handleChangeState("id", router.query.id);
    }
}

  }, [router.isReady])

  const handleChangeState = (field, value) => {
    setManager((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const { data } = useSWR({
    params: {
      action: 'get_one',
      id: manager.id,
    }
  }, fetcherListPictures);

  useEffect(() => {
    if (data) {
      console.log("MANAAAAGE", data);
      //handleChangeState("total_length", data.result.total_length);
      handleChangeState("title", data.title);
    }
  }, [data])
  */
  return (
 <>
 {
  /*
   <Grid container>
    <Grid item xs={12}>
    <Input
    aria-label={`title`}
    label={"title"}
    placeholder="Next UI"
    clearable
    value={manager.title}
    onChange={(e) => {
        console.log("TITLE: ", e.target.value)
        const title = e.target.value;
        handleChangeState("title", title);
    }}
    //size="lg" 
    css={{
        width:'100%'
    }}
    />
    </Grid>
    {`general: OK : ${router.query.id ? router.query.id : ''}` }
    </Grid>
  */
 }
 </>
  )
}

  export async function getStaticProps({ locale, params }) {

    return {
        props: {
          //tabPrice: response,
          //id:params.id,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
