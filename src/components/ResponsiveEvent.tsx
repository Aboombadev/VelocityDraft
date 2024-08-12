import { Typography, useTheme } from "@mui/material";
import { CalendarEvent } from "../utils/types";

export default function ResponsiveEvent({ event }: { event: CalendarEvent }) {
  return (
    <Typography variant="h6" sx={{ paddingTop: "2px" }}>
      {event.title}
    </Typography>
  );
}