import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

const getPathVertices = (shortestPath) => {
  return shortestPath
    .toString()
    .split(",")
    .map((filepath, index) => {
      return (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{filepath}</TimelineContent>
        </TimelineItem>
      );
    });
};

export default function PathsTextareaAutosize({ shortestPath }) {
  const divStyle = { fontSize: "25px" };
  return (
    <Timeline
      align="alternate"
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineContent></TimelineContent>
      </TimelineItem>
      {getPathVertices(shortestPath)}
    </Timeline>
  );
}
