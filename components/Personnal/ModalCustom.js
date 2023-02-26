import React, { useEffect, useState } from "react";
import { Container, Card, Row, Text, Link, Grid, Avatar, useTheme } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Modal, Input, Checkbox, Button, Badge, Tooltip } from "@nextui-org/react";
import CustomArrow from "./CustomArrow";
//import { useMediaQuery } from "@/styles/useMediaQuery";
//import { useMediaQuery } from "../../styles/useMediaQuery";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import path from "path";

export default function ModalCustom(props) {
    const {isMobile, visible, setVisible, picture} = props;
    const {isDark} = useTheme();
    //const isMobile = useMediaQuery(650);
    const handleClose = () => {
        setVisible(false);
        console.log("IS MOBILE", isMobile)
    }

    return(
        <Modal
        closeButton
        //width="600px"
          //width={{xs:"90%", sm:"50%"}}
          width="600px"
          fullWidth
          fullScreen={isMobile}
          blur
          aria-label="modal image"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible}
          onClose={handleClose}
          justify="center"
          css={{
            backgroundColor: "$accents0",
            zIndex:10000,
          }}
        >
        {
            picture && <>
            <Modal.Header justify="center">
            <Text id="modal-title" h2 b css={{ textAlign: 'center', }}>{`${picture.title} `}</Text>
              </Modal.Header>
              <Modal.Body>
              <ImageListItem>
              <Image
                  showSkeleton
                  //maxDelay={10000}
                  //autoResize={true}
                  width={"100%"}
                  height={"100%"}
                  src={picture.src}
                  alt="Default Image"
                  objectFit="cover"
                />
                <ImageListItemBar
            //title={picture.title}
            sx={{fontWeight:'bold', textAlign:'start'}}
            //subtitle={picture.prompt}
            actionIcon={
              <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${picture.title}`}
              href={picture.src}
              download={`${picture.title.toString().replaceAll("/", "-").toLowerCase()}${path.extname(picture.src)}`}
            >
              <FileDownloadIcon sx={{
                color:'white',
          ":hover": {
            color:'var(--primary)'
            //backgroundColor:'secondary.main'
        }
        }} />
            </IconButton>
            }
          />
                </ImageListItem>
                            <Grid.Container maxWidth="xl" xs={12} gap={1} justify="space-between" css={{
              display: "inline-flex",
              wrap: 'wrap',
              height: '50%'
            }}>
              <Grid xs={12} justify="center" gap={0.5}>
                {
                  picture.types.map((type, index) => {
                    return (
                      <Grid key={`${type} - ${index}`}>
                        <Badge isSquared flat color="primary" css={{
                          borderColor: isDark ? '$white' : '$black'
                        }}>{`#${type}`}</Badge>
                      </Grid>
                    )
                  })
                }
              </Grid>

              <Grid xs={12}>
              <CustomArrow picture={picture} />
              </Grid>
              <Grid css={{ display: 'none' }}>
                <Tooltip
                  placement="top"
                  content={"Dimensions"}
                  rounded
                  color="primary"
                  css={{
                    zIndex: 10000
                  }}
                >
                  <Button icon={<AspectRatioIcon fontSize="small" />} color="primary" rounded flat>
                    {"954 x 1023"}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid.Container>
              </Modal.Body>
            </>
        }
        </Modal>
    )
}