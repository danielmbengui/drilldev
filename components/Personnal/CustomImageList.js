import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid } from '@nextui-org/react';

function srcset(image, size, rows = 1, cols = 1, center) {
  if (!center) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=contain&auto=format&dpr=2 2x`,
    };
  } else {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=contain&auto=format&dpr=2 2x`,
    };
  }
}

export default function CustomImageList() {
  return (
    <ImageList
      //sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={5}
      rows={4}
      rowHeight={121}
      //sx={{background:'green'}} 
      //sx={{ width: 500, height: 450 }}
    >
      {itemData.map((item) => (
        <ImageListItem 
        sx={{
          background:'cyan',
          height:121
        }}
        key={item.img}
        cols={item.cols || 1}
        rows={item.rows || 1}
        >
                      <Grid css={{
                        width:'100%',
                        //height:'100%',
                        background:'yellow'
                      }} xs={12} alignItems={'center'} justify='center'>
                      <img
            {...srcset(item.img, 121, item.rows, item.cols, item.center)}
            alt={item.title}
            loading="lazy"
            height={item.center ? 370 : 121}
          />
                      </Grid>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
//Second row
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    rows: 1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    rows: 3,
    cols: 3,
    center:true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    rows: 1,
    cols: 1,
  },
//Third row
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    rows:1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    rows:1,
    cols: 1,
  },


  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    rows:1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    rows:1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    rows:1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    rows:1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    rows:1,
    cols: 1,
  },



  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];