import { Collapse, Text, Grid, Image, Button, Link, Container } from '@nextui-org/react';
//import { SunIcon } from './SunIcon';
//import { MoonIcon } from './MoonIcon';
//import { AnchorIcon } from './AnchorIcon';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImageIcon from '@mui/icons-material/Image';
import CustomTimeline from './CustomTimeline';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

export default function CustomArrow(props) {
    const { picture } = props;

    return (
        <Collapse.Group splitted accordion={false} css={{
            maxWidth:'100%'
        }}>
        <Collapse bordered
            title="Commande"
            subtitle={`/imagine prompt: ${process.env.domain}${picture.srcBase} ${picture.prompt}`}
            arrowIcon={<KeyboardCommandKeyIcon />}
        >

            <Grid.Container gap={1}>
                <Grid>
                    <Image
                        showSkeleton
                        //maxDelay={10000}
                        //autoResize={true}
                        width={"100%"}
                        height={"100%"}
                        src={"/images/examples/example-prompt.png"}
                        alt="Default Image"
                        objectFit="cover"
                    />
                </Grid>
                <Grid xs={12}>
                    <CustomTimeline picture={picture} />
                </Grid>
            </Grid.Container>
        </Collapse>
        <Collapse title="Dimensions" subtitle={`${picture.dimensions}`} arrowIcon={<AspectRatioIcon />} />
        <Collapse title="Parent" arrowIcon={<ImageIcon />}>
            <Text>
                {" L'image de laquelle on est partie... s'il y'en a une..."}
            </Text>
            {
                picture && <Image
                    showSkeleton
                    //maxDelay={10000}
                    //autoResize={true}
                    width={"30%"}
                    height={"30%"}
                    css={{
                        maxWidth: 1000,
                        maxHeight: 1000
                    }}
                    src={picture.srcBase}
                    alt="Default Image"
                    //objectFit="cover"
                    objectFit="contain"
                />
            }
        </Collapse>
    </Collapse.Group>
    );
}
