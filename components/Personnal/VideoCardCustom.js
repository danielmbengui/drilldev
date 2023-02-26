import React from "react";
import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import styles from "../../styles/VideoCard.module.css";

export default function VideoCardCustom(props) {
const {isMobile} = props;
    return (
        <Card css={{
            width:isMobile ? '100%' : '50%',
            bg:'transparent',
        }}>
                <Grid.Container justify="center" css={{
            //width:'100%',
            //height:'100%'
            //width:isMobile ? '100%' : '50%',
        }}>
            <Grid justify="center" css={{
                //bg:'transparent',
                //width:isMobile ? '100%' : '50%',
                //height:isMobile ? '100%' : '50%',
            }}>
            <video width={'100%'} height={'100%'} className={styles['video']} controls>
  <source src="https://pictures.drilldev.com/videos/tutorial-fr.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video>
            </Grid>
        </Grid.Container>
        <Card.Footer
          isBlurred
          css={{
            //position: "absolute",
            //bg:'$accents0',
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row >
            <Col 
            css={{mx:5}}
            >
              <Row justify='flex-end'>
                <Button
                as='a'
                href="https://discord.com/"
                target="_blank"
                  flat
                  auto
                  rounded
                  css={{ color: "$primary", bgBlur: "var(--primary-opacity)",  }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Discord
                  </Text>
                </Button>
              </Row>
            </Col>
            <Col 
            css={{mx:5}}
            >
              <Row justify="flex-start">
                <Button
                as='a'
                href="https://discord.com/invite/midjourney"
                target="_blank"
                  flat
                  auto
                  rounded
                  css={{ color: "$primary", bgBlur: "var(--primary-opacity)",  }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Midjourney
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      )
}
