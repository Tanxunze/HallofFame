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

    const shouldReplaceTitleWithImage = (title) => {
      return title === "Arcaea ptt reached 13.00"; // 替换成你想匹配的标题
    };

    const replacementImageUrl =
      "https://cfr2.mionet.top/mionet-a/2024/11/23/6740cf58af622.png";

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
            {shouldReplaceTitleWithImage(event.title) ? (
              <img
                src={replacementImageUrl}
                alt="3 star"
                style={{
                  width: "100%",
                  maxHeight: "100px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="h6" component="span">
                {event.title}
              </Typography>
            )}
            <Typography>{event.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default CustomTimeline;
