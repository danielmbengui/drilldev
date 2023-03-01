import React, {useState, useEffect} from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGAGE_ENGLISH, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Button, Input, Text, Textarea, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWR from 'swr';
import { Grid, Stack } from '@mui/material';
import { Checkbox, Spacer } from "@nextui-org/react";
import { _TYPES_PICTURES_ } from '@/__mocks__/types/_types_pictures_';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import Image from 'next/image';
import { myLoader } from '@/lib/ImageLoader';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';

const fetcherListPictures = params => axios.get(`/api/pictures`, params).then(res => res.data);

export default function GetpicturePage({ids, id, picture}) {
  const {isDark} = useTheme();
  const {t} = useTranslation(TAB_NAMEPACES);
  //get_one

  const router = useRouter();

  const [index, setIndex] = useState(-1);
const {isTablet} = useDeviceMode();

  const [manager, setManager] = useState({
    id: router.query.id ? router.query.id : '',
    src: picture.src,
    title: picture.title,
    description: picture.description,
    types: picture.types,
    first_id:-1,
    last_id:-1,
  });

  //router.push('/?counter=10', undefined, { shallow: true })
function getIndexById(id) {
    if (ids && ids.length) {
        for (let i = 0; i < ids.length; i++) {
            const element = ids[i];
            if (parseInt(id) === parseInt(element)) {
                return (i);
            }
        }
    }
    return (-1);
}

/*
  useEffect(() => {
if (router.isReady && ids){
    const id = router.query.id;
    if (id) {
        //handleChangeState("id", id);
    }
}
  }, [router.isReady])

  useEffect(() => {
    const id = router.query.id;
    if (id) {
        //handleChangeState("id", id);
        //setIndex(getIndexById(id));
    }
}, [router.query.id])
*/

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
      console.log("MANAAAAGE", data.types);
      //handleChangeState("total_length", data.result.total_length);
      const index = getIndexById(data.id);
      setIndex(index);
      console.log("INDEX", picture)
      handleChangeState("src", data.src);
      handleChangeState("title", data.title);
      handleChangeState("description", data.description);
      handleChangeState("types", data.types);
      //setSelected("types", data.types);
    }
  }, [data])
  return (
<Grid container justifyContent={'center'} spacing={{xs:0, sm:1}} py={3}>
<Grid item xs={10}>
    <Grid container justifyContent={'center'} spacing={3}>
        <Grid item>
        <Stack spacing={1} direction='row'>
    <Link     
    href={{
        pathname: `/admin/pictures/getpicture/${index >= 0 ? parseInt(ids[0]) : ''}`,
        //query: { id: index >= 0 ? parseInt(ids[0]) : '' },
      }}>
    <Button 
    disabled={router.query.id && index >= 0 && parseInt(router.query.id) <= parseInt(ids[0]) + 1}
    auto
    aria-label='button-go-first' 
    icon={<KeyboardDoubleArrowLeftIcon />}
    />
    </Link>
    <Link     
    href={{
        //pathname: '/admin/pictures/getpicture',
        pathname: `/admin/pictures/getpicture/${index > 0 ? parseInt(ids[index - 1]) : ''}`,
        //query: { id: index > 0 ? parseInt(ids[index - 1]) : '' },
      }}>
    <Button 
    //size="xl"
    disabled={router.query.id && index >= 0 && parseInt(router.query.id) <= parseInt(ids[0])}
    auto
    aria-label='button-go-back' 
    icon={<KeyboardArrowLeftIcon />}
    />
      </Link>

    </Stack>
        </Grid>
        <Grid item>
        <Stack spacing={1} direction='row'>
        <Link     
    href={{
        //pathname: '/admin/pictures/getpicture',
        pathname: `/admin/pictures/getpicture/${index < ids.length - 2 ? parseInt(ids[index + 1]) : ''}`,
        //query: { id: index < ids.length - 2 ? parseInt(ids[index + 1]) : '' },
      }}>
        <Button 
    //size="xl"
    disabled={router.query.id && ids.length > 0 && parseInt(router.query.id) >= parseInt(ids[ids.length  - 1])}
    auto
    aria-label='button-go-next' 
    icon={<KeyboardArrowRightIcon />}
    />
      </Link>

         <Link     
    href={{
        pathname: `/admin/pictures/getpicture/${index < ids.length - 1 ? parseInt(ids[ids.length  - 1]) : ''}`,
        //pathname: '/admin/pictures/getpicture',
        //query: { id: index < ids.length - 1 ? parseInt(ids[ids.length  - 1]) : '' },
      }}>
    <Button 
    //size="xl"
    disabled={router.query.id && ids.length > 0 && parseInt(router.query.id) >= parseInt(ids[ids.length  - 2])}
    auto
    aria-label='button-go-last' 
    icon={<KeyboardDoubleArrowRightIcon />}
    />
      </Link>
    </Stack>
        </Grid>
    </Grid>
</Grid>

<Grid item xs={12} sm={8}>
<Grid container sx={{
        textAlign:'center',
        //background:'red',
        //mx:'auto',
        width:'100%',
        my:{xs:1, sm:0},
    }} p={1} justifyContent={'center'} alignItems={'center'} orientation='column'>
        <Grid item xs={12}>
<Text>{`ID : ${manager.id}`}</Text>
        </Grid>

<Grid item xs={12}>
<Image
src={manager.src}
width={100}
height={100}
alt='photo editing'
//loader={myLoader}
loading={'lazy'}
/>
</Grid>

        <Grid item xs={12} sx={{
            //background:'green'
            }}>
        <Input 
    aria-label={`title`}
    label={"title"}
    placeholder="title"
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
        <Grid item xs={12}>
        <Textarea
        id='id-textarea-description'
        aria-label={`description`}
        label={"description"}
          placeholder="Max rows (10), Min rows (1), write something large.."
          value={manager.description}
          onChange={(e) => {
            console.log("DESCRIPTION: ", e.target.value)
            const description = e.target.value;
            handleChangeState("description", description);
        }}
          minRows={5}
          maxRows={10}
          css={{
            width:'100%'
        }}
        />
        </Grid>

        <Grid item xs={12} sx={{
            background:'green',
            width:'100%'
            }} my={3}>
        <Stack sx={{
            background:'green',
            width:'100%'
            }}>
        <Checkbox.Group
        justify={'center'}
        css={{
            maxWidth:'100%',
        }}
        id="checkbox-types"
        //label="Types"
        aria-label="Types"
        value={manager.types}
        orientation={isTablet ? 'vertical' : 'horizontal'}
        //defaultValue={manager.types}
        onChange={(tab) => {
console.log("TAB : ", tab);
//setSelected(tab);
handleChangeState("types", tab)
        }}
      >
        {
            _TYPES_PICTURES_ && _TYPES_PICTURES_.map((item, index) => <Checkbox key={`${item}-${index}`} value={item}>{item}</Checkbox>)
        }
      </Checkbox.Group>
        </Stack>
      <Spacer y={1} />
        </Grid>
    <Grid item xs={12} sx={{textAlign:'center'}}>
<Button css={{mx:'auto'}} auto flat onPress={async () => {
    await axios.get("/api/pictures", {
        params :{
            action:'edit_one',
            id:manager.id,
            title:manager.title,
            description:manager.description,
            types:JSON.stringify(manager.types),
        }
    })
}}>{`Modifier`}</Button>
    </Grid>
    </Grid>
</Grid>
</Grid>
  )
}

export async function getStaticPaths() {
  const array = await axios.get(`${process.env.domain}/api/pictures`, {
    params :{
        action: "get_ids"
    }
    }).then((res) => {
        return(res.data);
    })

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = [];
  array.map((_id) => {
    for (let i = 0; i < TAB_LANGAGES.length; i++) {
        const lang = TAB_LANGAGES[i];
        paths.push({params: { id: _id.toString() },locale: lang});
    }
  })

     // { fallback: false } means other routes should 404
  return { paths, fallback: false }
  }

  export async function getStaticProps({ locale, params }) {
    const array = await axios.get(`${process.env.domain}/api/pictures`, {
        params :{
            action: "get_ids"
        }
    }).then((res) => {
        return(res.data);
    })

    const _picture = await axios.get(`${process.env.domain}/api/pictures`, {
        params :{
            action: "get_one",
            id:params.id
        }
    }).then((res) => {
        return(res.data);
    })

    console.log("params", params)
    return {
        props: {
          //tabPrice: response,
          picture:_picture,
          id:params.id,
          ids:array,
          //id:params.id,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
