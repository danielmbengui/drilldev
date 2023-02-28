import React, { useEffect, useState } from "react";
import { Layout } from "../Containers/Layout.js";
import NavbarComponent from "../Navbar/NavbarComponent.js";
import { Container, Card, Row, Text, Link, Grid, Avatar, useTheme } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Modal, Input, Checkbox, Button, Badge, Tooltip } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomArrow from "../Personnal/CustomArrow.js";
import ContainerPageComponent from "../Containers/ContainerPageComponent.js";
import { useTranslation } from "next-i18next";
import { NAMESPACE_LANGAGE_HOME } from "@/constants.js";
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


export default function TutorialComponent(props) {
  const {t} = useTranslation();
  const {lang} = props;
  const { isDark } = useTheme();
  const [variant, setVariant] = useState("static");
  const [srcModal, setSrcModal] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [typesModal, setTypesModal] = useState([]);
  const [picture, setPicture] = useState(null);
  const [pictures, setPictures] = useState(PICTURES);

  const variants = ["static", "floating", "sticky"];
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const ComponentMidJourney = () => {
    const sentenceMidjourney = t('paragraph_5', {ns:NAMESPACE_LANGAGE_HOME});
const start = sentenceMidjourney.indexOf("Midjourney");
const end = start >= 0 ? start + "Midjourney".length : 0;
if(end - start > 0) {
  const beforeMid = sentenceMidjourney.slice(0, start);
  const mid = sentenceMidjourney.slice(start, end);
  const afterMid = sentenceMidjourney.slice(end);
  return (<Text h3>
    {beforeMid}
    <Link href="https://www.midjourney.com/app/" isExternal underline target={"_blank"}>
      {mid}
    </Link>
    {afterMid}
  </Text>)
}
return (<></>);
  }
  useEffect(() => {
setPictures(getRandomSortPictures());
  }, [])

  const closeHandler = () => {
    setPicture(null);
    setTitleModal("");
    setTypesModal([]);
    setVisible(false);
    console.log("closed");
  };

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
    <Container lg >
        <Container css={{ textAlign: 'center' }}>


        <Grid.Container gap={1} css={{
            my: 20
          }}>
            {
              pictures.map((picture, index) => {
                if (index < 4) {
                  return (
                    <Grid
                    key={`${picture.title} - ${index}`}
                    xs={6} sm={3}
                    shadow={"true"}
                  >
                     <Link href="/gallery" >
                    <Image
                      showSkeleton
                      css={{
                        cursor:'pointer',
                        borderRadius:10
                      }}
                      //maxDelay={10000}
                      //autoResize={true}
                      width={150}
                      height={150}
                      src={picture.src}
                      alt="Default Image"
                      //objectFit="cover"
                      objectFit="cover"
                    />
                     </Link>
                  </Grid>
                  )
                }
              })
            }
          </Grid.Container>
          <Container justify="center">
            <Text h3 css={{ textAlign: 'center' }}>
              {t('paragraph_1', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
            <Text h3>
            {t('paragraph_2', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
          </Container>
          <Grid.Container gap={1} css={{
            my: 20
          }}>
            {
              pictures.map((picture, index) => {
                if (index >= 4 && index < 8) {
                  return (
                    <Grid
                      key={`${picture.title} - ${index}`}
                      xs={6} sm={3}
                      shadow={"true"}
                    >
                       <Link href="/gallery" >
                      <Image
                        showSkeleton
                        css={{
                          cursor:'pointer',
                          borderRadius:10
                        }}
                        //maxDelay={10000}
                        //autoResize={true}
                        width={150}
                        height={150}
                        src={picture.src}
                        alt="Default Image"
                        //objectFit="cover"
                        objectFit="cover"
                      />
                       </Link>
                    </Grid>
                  )
                }
              })
            }
          </Grid.Container>

          <Container justify="center">
            <Text h3 css={{ textAlign: 'center' }}>
              {t('paragraph_3', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>

          </Container>
          <Grid.Container gap={1} css={{
            my: 20
          }}>
            {
              pictures.map((picture, index) => {
                if (index >= 8 && index < 12) {
                  return (
                    <Grid
                    key={`${picture.title} - ${index}`}
                    xs={6} sm={3}
                    shadow={"true"}
                  >
                     <Link href="/gallery" >
                    <Image
                      showSkeleton
                      css={{
                        cursor:'pointer',
                        borderRadius:10
                      }}
                      //maxDelay={10000}
                      //autoResize={true}
                      width={150}
                      height={150}
                      src={picture.src}
                      alt="Default Image"
                      //objectFit="cover"
                      objectFit="cover"
                    />
                     </Link>
                  </Grid>
                  )
                }
              })
            }
          </Grid.Container>
          <Container css={{ textAlign: 'center' }}>
          <Text h3>
            {t('paragraph_4', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
            <ComponentMidJourney />
            <Container justify="center">
          </Container>
          </Container>

          <Image
                        showSkeleton
                        css={{
                          cursor:'pointer',
                          my:30
                        }}
                        //maxDelay={10000}
                        //autoResize={true}
                        width={"100%"}
                        height={"auto"}
                        src={"/images/screenshots/midjourney-website.png"}
                        alt="Default Image"
                        //objectFit="cover"
                        objectFit="cover"
                      />
          <Container css={{ textAlign: 'center' }}>
            <Text h3>
              {t('paragraph_6', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
          </Container>
          <Grid.Container gap={1} css={{
            my: 20
          }}>
            {
              pictures.map((picture, index) => {
                if (index >= 12 && index < 16) {
                  return (
                   
                    <Grid
                      key={`${picture.title} - ${index}`}
                      xs={6} sm={3}
                      shadow={"true"}
                    >
                       <Link href="/gallery" >
                      <Image
                        showSkeleton
                        css={{
                          cursor:'pointer',
                          borderRadius:10

                        }}
                        //maxDelay={10000}
                        //autoResize={true}
                        width={150}
                        height={150}
                        src={picture.src}
                        alt="Default Image"
                        //objectFit="cover"
                        objectFit="cover"
                      />
                       </Link>
                    </Grid>
                   
                  )
                }
              })
            }
          </Grid.Container>
          <Container justify="center">
            <Text h3 css={{ textAlign: 'center' }}>
              {t('paragraph_7', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
          </Container>

          <Grid.Container gap={1} css={{
            my: 20
          }}>
            {
              pictures.map((picture, index) => {
                if (index >= 16 && index < 20) {
                  return (
                    <Grid
                    key={`${picture.title} - ${index}`}
                    xs={6} sm={3}
                    shadow={"true"}
                  >
                     <Link href="/gallery" >
                    <Image
                      showSkeleton
                      css={{
                        cursor:'pointer',
                        borderRadius:10
                      }}
                      //maxDelay={10000}
                      //autoResize={true}
                      width={150}
                      height={150}
                      src={picture.src}
                      alt="Default Image"
                      //objectFit="cover"
                      objectFit="cover"
                    />
                     </Link>
                  </Grid>
                  )
                }
              })
            }
          </Grid.Container>

          <Container justify="center">
            <Text h3>
            {t('paragraph_8', {ns:NAMESPACE_LANGAGE_HOME})}
            </Text>
          </Container>
        </Container>
        <Container css={{
          textAlign: 'center',
          display:'none'
        }}>
          <Text h3 color="$text">
            {"J'ai choisi des images piquées au hasard sur internet et j'ai utilisé une intelligence artificielle "}
            <Link href="https://www.midjourney.com/app/" underline target={"_blank"}>
              {"Midjourney"}
            </Link>
            {" pour les transformer de différentes manières."}
          </Text>
          <Text h3>
            {"Cela m'a permis de générer des versions variées de ces images, chacune avec des caractéristiques uniques."}

          </Text>
          <Text h3 color="$text">{"C'était intéressant de voir comment l'IA pouvait interpréter et altérer mon image de différentes manières."}</Text>
          <Text h3 color="$text">{"Je suis impressionné par les résultats obtenus et je suis impatient de découvrir d'autres utilisations de l'IA dans le traitement d'images."}</Text>
        </Container>
        <Container css={{ my: 50, display: 'none' }}>
          <Image
            showSkeleton
            //maxDelay={10000}
            //autoResize={true}
            width={150}
            height={150}
            src="/images/mid-journey/base-pic.jpg"
            alt="Default Image"
            objectFit="cover"
          />
        </Container>

        <Modal
          closeButton
          //width={{xs:"90%", sm:"50%"}}
          width="600px"
          //fullWidth
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          justify="center"
          aria-label="modal image"
          css={{
            backgroundColor: "$accents0",
          }}
        >
          <Modal.Header justify="center">
            <Text id="modal-title" h2 b css={{ textAlign: 'center', }}>{`${picture ? picture.title : ''} `}</Text>
          </Modal.Header>
          <Modal.Body>
            <Image
              showSkeleton
              //maxDelay={10000}
              //autoResize={true}
              width={"100%"}
              height={"100%"}
              src={srcModal}
              alt="Default Image"
              objectFit="cover"
            />
            <Grid.Container gap={1} justify="space-between" css={{
              display: "inline-flex",
              wrap: 'wrap',
              height: '50%'
            }}>
              <Grid xs={12} justify="center" gap={0.5}>
                {
                  typesModal.map((type, index) => {
                    return ({
                      "title": "OneMoonOneEgg",
                      "types": ["realistic 4k", "4k resolution"],
                      "src": "/images/mid-journey/moon/one-moon-one-man-0.png",
                      "srcBase": "",
                      "dimensions": "1024 x 1024",
                      "prompt": "a man with a foot on the moon and the other foot on an egg, hyper realistic 4k resolution"
                    },
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

            <Grid.Container css={{ display: 'none' }} gap={1} justify="space-between" alignItems="flex-start">
              <Grid>
                <Tooltip
                  placement="top"
                  content={"Developers love Next.js"}
                  rounded
                  color="primary"
                  css={{
                    zIndex: 10000
                  }}
                >
                  <Button icon={<CalendarMonthIcon fontSize="small" />} color="primary" flat>
                    {"Date"}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid>
                <Tooltip
                  placement="top"
                  content={"Developers love Next.js"}
                  rounded
                  color="primary"
                  css={{
                    zIndex: 10000
                  }}
                >
                  <Button icon={<AspectRatioIcon fontSize="small" />} color="primary" flat>
                    {"954 x 1023"}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid.Container>
            <Input
              css={{ display: 'none' }}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<Mail fill="currentColor" />}
            />
            <Input
              css={{ display: 'none' }}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
            />
            <Row justify="space-between" css={{ display: 'none' }}>
              <Checkbox>
                <Text size={14}>{"Remember me"}</Text>
              </Checkbox>
              <Text size={14}>{"Forgot password?"}</Text>
            </Row>
          </Modal.Body>
          <Modal.Footer css={{ display: 'none' }}>
            <Button auto flat color="error" onPress={closeHandler}>
              {"Close"}
            </Button>
            <Button auto onPress={closeHandler}>
              {"Sign in"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  )
}
