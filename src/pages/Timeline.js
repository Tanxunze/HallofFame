import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import React from "react";

function CustomTimeline({ events }) {
  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{event.date}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              {event.title}
            </Typography>
            <Typography>{event.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default CustomTimeline;
