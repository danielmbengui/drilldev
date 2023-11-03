import React, {useState, useEffect} from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DIR_MIDJOURNEY_DATA_FILE, TAB_LANGAGES, TAB_NAMEPACES } from '@/constants';
import { Button, Input, Text, Textarea, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import axios from 'axios';
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
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { fileSave } from 'browser-fs-access';
import CustomCheckBox from '@/components/Customs/CustomCheckBox';
import { myLoader } from '@/lib/ImageLoader';
import UndownloadableImage from '@/components/Customs/UndownloadableImage';

const fetcherListPictures = params => axios.get(`/api/pictures`, params).then(res => res.data);

export default function GetpicturePage({/*picture,*/ firstId, secondId, beforeLastId, lastId}) {
  const router = useRouter();

  const [index, setIndex] = useState(-1);
const {isTablet} = useDeviceMode();

  const [manager, setManager] = useState({
    id: parseInt(picture.id),
    src: picture.src,
    title: picture.title,
    description: picture.description,
    types: picture.types,
    first_id:parseInt(firstId),
    second_id:parseInt(secondId),
    before_last_id:parseInt(beforeLastId),
    last_id:parseInt(lastId),
  });

  //router.push('/?counter=10', undefined, { shallow: true })
  /*
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
*/

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

  useEffect(() => {
    console.log("first id : " + firstId)
  })

  /*
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
      //const index = getIndexById(data.id);
      //setIndex(index);
      console.log("INDEX", picture)
      handleChangeState("src", data.src);
      handleChangeState("title", data.title);
      handleChangeState("description", data.description);
      handleChangeState("types", data.types);
      //setSelected("types", data.types);
    }
  }, [data])
  */
  return (
<>
{
  /*
<Grid container justifyContent={'center'} spacing={{xs:0, sm:1}} py={3}>
<Grid item xs={10}>
    <Grid container justifyContent={'center'} spacing={3}>
        <Grid item>
        <Stack spacing={1} direction='row'>
        <Button 
    as='a'
    href={`/admin/pictures/getpicture/${manager.first_id}`}
    disabled={manager.id <= manager.second_id}
    auto
    aria-label='button-go-first' 
    icon={<KeyboardDoubleArrowLeftIcon />}
    />
    <Button 
    //size="xl"
    as='a'
    href={`/admin/pictures/getpicture/${manager.id - 1}`}
    disabled={manager.id <= manager.first_id}
    auto
    aria-label='button-go-back' 
    icon={<KeyboardArrowLeftIcon />}
    />

    </Stack>
        </Grid>
        <Grid item>
        <Stack spacing={1} direction='row'>
        <Button 
    //size="xl"
    as='a'
    href={`/admin/pictures/getpicture/${manager.id + 1}`}
    disabled={manager.id >= manager.last_id}
    auto
    aria-label='button-go-next' 
    icon={<KeyboardArrowRightIcon />}
    />
      <Button 
    //size="xl"
    as='a'
    href={`/admin/pictures/getpicture/${manager.last_id}`}
    disabled={manager.id >= manager.before_last_id}
    auto
    aria-label='button-go-last' 
    icon={<KeyboardDoubleArrowRightIcon />}
    />
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
<UndownloadableImage
src={manager.src}
width={100}
height={100}
alt='photo editing'
loader={myLoader}
priority
//loading={'lazy'}
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
                <Grid container sx={{
                    width:'100%'
                }}>
                {
                    _TYPES_PICTURES_ && _TYPES_PICTURES_.sort((type1, type2) => type1.label.localeCompare(type2.label))
                    .map((type, index) => {
                        return(
                            <CustomCheckBox 
                            key={`${type.value}-${index}`}
                    value={type.value}
                    checked={manager.types && manager.types.includes(type.value)}
                    onChange={(e) => {
                        console.log("TAB : ", e.target.value);
                        //setSelected(tab);
                        const value = e.target.value;
                        const types = manager.types;
                        if (!e.target.checked) {
                            const index = types.indexOf(value);
                            types.slice(index, 1);
                        } else {
                            const index = types.indexOf(value);
                            if (index === -1) {
                                types.push(value);
                            }
                        }
                        handleChangeState("types", types)
                                }}
//defaultValue={true}
/>
                        )
                    })
                }
                </Grid>
        </Grid>
    <Grid item xs={12} sx={{textAlign:'center'}}>
<Button css={{mx:'auto'}} auto flat onPress={async () => {
    await axios.get(`/api/pictures/${manager.id}`, {
        params :{
            action:'edit_one',
            //id:manager.id,
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
  */
}
</>
  )
}

export async function getStaticPaths({ locales }) {
    const array = require(`@/public/images/midjourney/datas/data.json`);  
  const _paths = [];
  //paths.push({params: { id: '1' }});
  array.map((item) => {
    for (let i = 0; i < locales.length; i++) {
        const lang = locales[i];
        _paths.push({params: { id: item.id.toString() }, locale: lang});
        }
  })


     // { fallback: false } means other routes should 404
     return {
        paths: _paths,
        fallback: false, // can also be true or 'blocking'
      }
  }

  export async function getStaticProps({ locale, params }) {
    /*
    const array = require(`@/public/images/midjourney/datas/data.json`);
    var firstId = 0;
    var secondId = 0;
    var beforeLastId = 0;
    var lastId = 0;
  //paths.push({params: { id: '1' }});
  array.map((item) => {
    const id = parseInt(item.id);
    if (id <= firstId) {
        firstId = id;
        secondId = id + 1;
    }
    
    if (id > firstId && id <= secondId) {
        secondId = id;
    }

    if (id >= lastId) {
        lastId = id;
        beforeLastId = id - 1;
    }

    if (id < lastId && id >= beforeLastId) {
        beforeLastId = id;
    }
  })
  */
    /*
    const array = await axios.get(`${process.env.domain}/api/pictures?action=get_ids`)
    .then((res) => {
        return(res.data);
    })
    */
/*
    const _picture = await axios.get(`${process.env.domain}/api/pictures/${params.id}?action=get_one`)
    .then((res) => {
        return(res.data);
    })
    */
    

    //console.log("params", _picture)
    return {
        props: {
          //tabPrice: response,
          firstId:firstId,
          secondId:secondId,
          //picture:_picture,
          beforeLastId:beforeLastId,
          lastId:lastId,
          //id:params.id,
          //ids:array,
          //id:params.id,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }
