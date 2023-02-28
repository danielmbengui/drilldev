import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { _PICTURES_HOME_, _PICTURE_HEADER_HOME_ } from "@/__mocks__/home/_pictures_home_.js";

const logoLightTheme = "/images/logos/logo_black_pic_no_back.png";
const logoDarkTheme = "/images/logos/logo_white_pic_no_back.png";

function getRandomSortPictures() {
  const randomOrder = [];
  const randomPictures = [];
  const min = 0;
  const max = _PICTURES_HOME_.length;
  for (let i = 0; i < max; i++) {
    let random = Math.floor(Math.random() * (max - min) + min);
    while (randomOrder.includes(random)) {
      random = Math.floor(Math.random() * (max - min) + min);
    }
    const element = _PICTURES_HOME_[random];
    randomOrder.push(random);
    randomPictures.push(element);
  }

  return randomPictures; // The maximum is exclusive and the minimum is inclusive
}


export default function UndownloadableVideo(props) {
    const { src, controls=true, autoPlay=false, loop=false, muted = false} = props;
  return (
    <video onContextMenu={(e) => {
        e.preventDefault();
      }} controls={controls} autoPlay={autoPlay} loop={loop} muted={muted} style={{
        objectFit:'contain',
        width:'100%',
        height:'100%'
      }} >
  <source src={src} type="video/mp4" />
  Your browser does not support the video tag.
</video>
  )
}
