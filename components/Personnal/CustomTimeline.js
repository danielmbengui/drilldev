import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';

  import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import { Link, Text } from '@nextui-org/react';
import HttpIcon from '@mui/icons-material/Http';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import SettingsIcon from '@mui/icons-material/Settings';

export default function CustomTimeline(props) {
    const {picture} = props;
  return (
    <Timeline sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}>
        <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'error.main' }} />
          <TimelineDot color="error" variant="filled">
            <KeyboardIcon fontSize='small' />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'error.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Text blockquote b padding="0px">{"/imagine prompt:"}</Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'green' }} />
          <TimelineDot color="success" variant="filled">
            <HttpIcon  sx={{
                color:'white',
            }} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'success.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Text blockquote><Link href={`${process.env.domain}${picture.srcBase}`} target="_blank">{`${picture.srcBase}`}</Link></Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary" variant="filled">
            <TagIcon sx={{
                color:'white',
                //background:'green'
            }} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Text blockquote>{`${picture.prompt}`}</Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'warning.main' }} />
          <TimelineDot color="warning" variant="filled">
            <SettingsIcon sx={{
                color:'white',
                //background:'green'
            }} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'warning.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Text blockquote>{``}</Text>
        </TimelineContent>
      </TimelineItem>



    </Timeline>
  );
}