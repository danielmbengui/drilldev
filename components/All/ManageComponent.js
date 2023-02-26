import React, { useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Container, Card, Text, Link, Grid, Avatar, useTheme, Input, Button } from "@nextui-org/react";
import ImageMasonry from "../Personnal/ImageMasonry.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image.js";
import { myLoader } from "@/lib/ImageLoader.js";
import axios from "axios";
import fs from 'fs';
const PATH_PICTURES = `/datas/images/`;

const logoLightTheme = "/images/logos/logo_orange_complete_no_back.png";
const logoDarkTheme = "/images/logos/logo_orange_complete_no_back.png";
//const logoLightTheme = "/images/logos/logo_original_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_original_dark_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_original_dark_complete_no_back.png";

//const logoLightTheme = "/images/logos/logo_black_light_complete_no_back.png";
//const logoDarkTheme = "/images/logos/logo_white_dark_complete_no_back.png";
const PICTURES = require("../../public/collections/data-pictures.json");

function getRandomSortPictures() {
  const randomOrder = [];
  const randomPictures = [];
  const min = 0;
  const max = PICTURES.length;
  for (let i = 0; i < max; i++) {
    let random = Math.floor(Math.random() * (max - min) + min);
    while (randomOrder.includes(random)) {
      random = Math.floor(Math.random() * (max - min) + min);
    }
    const element = PICTURES[random];
    randomOrder.push(random);
    randomPictures.push(element);
  }

  return randomPictures; // The maximum is exclusive and the minimum is inclusive
}


export default function ManageComponent(props) {
  const {lang, isMobile} = props;
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState([]);
  const [src, setSrc] = useState('aaa');
  const [link, setLink] = useState('okay');
  const [srcBase, setSrcBase] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);

  const selectImage = () => {
    const input = document.querySelector('#fileInput');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      console.log("START read");
      reader.onload = function(e) {
        // Récupérer l'image sélectionnée en utilisant la propriété result de reader
        const selectedImage = e.target.result;
        // Faire ce que vous voulez avec l'image
        console.log("READ OKKKKK");
        console.log("image", selectedImage);
        setSrc(selectedImage)
      };
      reader.readAsDataURL(input.files[0]);
      setLink(input.files[0])
      //setLink(reader.readAsDataURL(input.files[0].src));
      //console.log("SRC image", src)
    }
  }

  return (
    <Container lg css={{ textAlign: 'center' }}>

<Grid.Container gap={1} justify={'center'}>
        <Grid justify="center">
          <Input
          label="Title"
          status="primary"
          bordered
          aria-label="title input"
            clearable
            contentRightStyling={false}
            placeholder="type a title for the image"
            contentRight={
              <SearchIcon />
            }
          />
        </Grid>
        </Grid.Container>

        <Grid.Container gap={1} justify={'center'}>
        <Grid justify="center">
          <Input
          label="Prompt"
          status="primary"
          bordered
          aria-label="prompt input"
            clearable
            contentRightStyling={false}
            placeholder="type a Midjourney prompt for the image"
            contentRight={
              <SearchIcon />
            }
          />
        </Grid>
        </Grid.Container>

        <Grid.Container gap={2} justify="center">
            <Grid>
                <Image 
                id="imageOK"
                src={src}
                width={100}
                height={100}
                alt={'image to add'}
                loader={myLoader}
                quality={100}
                priority
                />
            </Grid>
            <Grid>
            <Input 
            
            label="Upload Single File"
            onChange={selectImage} type="file" id="fileInput" aria-label="imageOK" />
            </Grid>
        </Grid.Container>
<Grid.Container justify="center">
<Button onPress={async () => {
    const input = document.querySelector('#fileInput');
    console.log("SRC", PATH_PICTURES)
    console.log("LINK", input.files[0])
    const formData = new FormData();
             formData.append("image", src);
    //fs.mkdir(PATH_PICTURES, { recursive: true });
    //fs.mkdirSync(PATH_PICTURES, { recursive: true });
    //fs.mkdir()
    await axios.post(`/api/add`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
    }).then((response) =>{
        console.log("RES", response.data)
    } ).catch((error) => {
        if (error.response){
            console.log("Error response", )

            //do something
            
            }else if(error.request){
                console.log("Error request", )

            //do something else
            
            }else if(error.message){
                console.log("Error message", )

            //do something other than the other two
            
            }
    });
    
    
}}>Add image</Button>
</Grid.Container>
  </Container>
  )
}
