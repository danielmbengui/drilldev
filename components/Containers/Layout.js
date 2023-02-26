import { Content } from "./Content.js"
import { Box } from "./Box.js";
import { useTheme } from "@nextui-org/react";
import { getRandomNumber } from "@/lib/func/func.js";
import { Container, Grid } from "@mui/material";
import FooterComponent from "../All/FooterComponent.js";

export const Layout = ({ children, padding=0 }) => {
  const { isDark } = useTheme();
  const tabLight = [
    "/images/home/backgrounds/light-1.png",
    "/images/home/backgrounds/light-2.png",
    "/images/home/backgrounds/light-3.png",
    "/images/home/backgrounds/light-4.png",
    "/images/home/backgrounds/light-5.png",
   // "/images/tutorial/backgrounds/back.png",
  ]
  const tabDark = [
    "/images/home/backgrounds/dark-1.png",
    "/images/home/backgrounds/dark-2.png",
    "/images/home/backgrounds/dark-3.png",
    "/images/home/backgrounds/dark-4.png",
    "/images/home/backgrounds/dark-5.png",
    //"/images/tutorial/backgrounds/back.png",
  ]
  const randomIndex = isDark ? getRandomNumber(0, tabDark.length) : getRandomNumber(0, tabLight.length);
  const randomSrc = isDark ? tabDark[randomIndex] : tabLight[randomIndex];
  return (
    <Grid
    container
    //xl
    //fixed
    maxWidth="5000px"
      sx={{
        zIndex:0,
        //background:'green',
        //p:0,
        //width:'100%',
        //background:'red',
        //position:'absolute',
        //left:'0px',
        //top:'0px',
        //bottom:'0px',
        //right:'0px',
        //zIndex:10,
        //maxW: "100%",
        //background: "$text",
        //py:padding,
       // backgroundImage: "linear-gradient(to bottom right, rgb(255,0,0,0.1), $primary)",
        //backgroundImage: `url("/images/mid-journey/people/victor-0.png") no-repeat center fixed`,
        background: `url(${randomSrc}) repeat center fixed`,
        ////background-color: #cccccc;
        backgroundSize:'cover',
        //backgroundColor: "rgba(0,0,0,0)",
        //opacity:0.6
        //backgroundPosition: "left top, right bottom",
        //backgroundRepeat: "no-repeat, repeat",
      }}
      aria-label="layout general"
    >
     
      <Grid justify="center" sx={{
        //background:'red',
        position:'absolute',
        left:'0px',
        top:'0px',
        bottom:'0px',
        right:'0px',
        zIndex:10,
        opacity:0.6
      }}>
  
      </Grid>
      <Grid sx={{
        //background:'red',
        width:'100%',
        zIndex:11,
        position:'relative',
        py:padding,
      }}>
      {children}
      </Grid>
      <Container sx={{mt:5}}>
        <FooterComponent />
      </Container>
    </Grid>
  )
}
