import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Divider from "@mui/material/Divider"
import useDocumentTitle from "../../hooks/useDocumentTitle"

export default function About() {
  useDocumentTitle();
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const content = (text: string[]) => text.map((t, i) => <Typography key={i} paragraph>{t}</Typography>)

  const sectionContent: { [key: string]: JSX.Element } = {
    "Throughput": (
      <>
        {content([
          "Throughput is a measure of efficiency. It is meant to represent the maximum number of vehicles served on all phases at an intersection.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "It is calculated as the highest 15-minute volume in a day at an intersection, converted to an hourly volume. Volumes come from high-resolution event logs from the controller, which are stored in the ATSPM database. All detectors used for volume counts are used in the throughput calculation for an intersection. It includes Tuesdays, Wednesdays and Thursdays only.",
          "Detectors used for volume counts are selected based on a hierarchy, as there may be more than one detector in a given lane. For each lane, the detector with the highest count priority is selected for the count-based metrics. The priority scale is as follows:"
        ])}
        <ul>
          <li><Typography>Exit</Typography></li>
          <li><Typography>Advanced Count</Typography></li>
          <li><Typography>Lane-by-lane Count</Typography></li>
        </ul>
      </>
    ),
    "Arrivals on Green": (
      <>
        {content([
          "Arrivals on Green (AOG) is a measure of coordination. A high percentage of arrivals on green would be the result of good offsets and should be correlated with fewer stops and less delay.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "AOG is calculated as the total number of vehicles arriving on green light divided by the total number of arrivals. It is based on primary street through-phases, limited to peak periods (6am-10am, 3pm-7pm) on Tuesdays, Wednesdays and Thursdays.",
          "The calculation uses detector data from Advance Count detectors, as configured in ATSPM. For advance detectors, the time of arrival at the intersection is adjusted for the setback distance and speed limit, both of which are configured in ATSPM."
        ])}
      </>
    ),
    "Progression Ratio": (
      <>
        {content([
          "The percent of vehicles arriving during green is correlated very strongly with the amount of green time given to each phase. For phases with a high proportion of green time per cycle, there will naturally tend to be more arrivals on green, regardless of the arrival pattern.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "Progression Ratio addresses this fact by controlling for the amount of green time per cycle on each phase. It is calculated as the arrival on green percentage divided by the percentage of green time (g/C) for that phase. It can be considered the quality of progression.",
          "The Highway Capacity Manual (HCM) gives a range of values progression ratio and their interpretation (HCM Exhibit 15-4). A value less than one is poor progression. A value of 1 is equivalent to random arrivals. A value greater than one is desirable."
        ])}
      </>
    ),
    "Queue Spillback Rate": (
      <>
        {content([
          "Queue Spillback Rate is an experimental measure of effectiveness. It is a measure of unmet demand in a cycle as measured by setback detectors. When vehicle dwell times on setback detectors exceed a threshold above what is typical for setback detectors under freely flowing conditions, that is interpreted as standing or slowed traffic over that detector, meaning the queue has reached the setback detector.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "Specifically, under freely flowing conditions, the time between subsequent detector on and off events is typically around 0.1 seconds for setback detectors. When the 95th percentile detector occupancy duration increases above 3 seconds in a cycle, it will be assumed there is standing traffic on the setback detector and a spillback event will be flagged for that phase in that cycle.",
          "If any lane on a phase registers high dwell time over a setback detector, that phase is considered to be spilled back for that cycle. The spillback rate for an intersection is the number of phases with a spillback condition (which could be more than one per cycle) divided by the number of phases multiplied by the number of cycles."
        ])}
      </>
    ),
    "Split Failures": (
      <>
        {content([
          "Split failure is another measure of unmet demand. It identifies cycles where a phase has unserved demand. A phase is flagged for split failure when the average occupancy of the stop bar detectors on the phase are greater than 80% during the green phase and greater than 80% during the first five seconds of the red phase, which means there was demand at the stop bar both before and after the green interval. The intersection is flagged as a split failure on that cycle if at least one phase meets the criteria for split failure during that phase.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "This metrics only uses Stop Bar Presence detection, and is only run for side street and left turn phases, i.e., all phases other than main street through phases. Peak periods are defined as 6 - 10 AM and 3 - 8 PM."
        ])}
      </>
    ),
    "Travel Time Index": (
      <>
        {content([
          "Travel Time Index (TTI) is a measure of delay on the corridor. It is the ratio of travel time to free flow travel time.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "Hourly travel time data comes from HERE as queried from RITIS. Free flow travel times are based on the 'reference speed' value from HERE for each segment. Travel time and free flow travel time are calculated for each corridor by summing over all segments in the corridor for every hour in the month.",
          "An hourly Travel Time Index is then calculated for each corridor as the average travel time for that hour of the day divided by the free flow travel time for the corridor, i.e., each of the 24 hours of the day has its own measure for the month. The TTI for each hour is the average for each hour over the Tuesdays, Wednesdays and Thursdays in the month, divided by the free flow travel time for the corridor. The TTI for the day is the calculated as the average hourly travel time weighted by the hourly volume for the corridor, which is the hourly volume averaged over all signals in the corridor. This gives more weight to peak periods than off-peak periods)."
        ])}
      </>
    ),
    "Planning Time Index": (
      <>
        {content([
          "The Planning Time Index (PTI) calculation uses the same data as the Travel Time Index. However, instead of taking the average travel time for each hour in the month, it takes the 90th percentile of the day over the Tuesdays, Wednesdays and Thursdays for each hour. These 90th percentile travel times are then averaged over the day, weighted by the average hourly volume from the main street through phases (from ATSPM) to get a PTI for the month (this gives more weight to peak periods than off-peak periods).",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "Daily Volume": (
      <>
        {content([
          "Volume is a measure of demand on a corridor. Total volume on main street through phases are summed over each Tuesday, Wednesday and Thursday, and then averaged over all days in the month",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "Pedestrians": (
      <>
        {content([
          "Pedestrian activity is the total number of pedestrian pushbutton events recorded by hour and by day. It is calculated over Tuesdays, Wednesdays and Thursdays.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "Detector Uptime": (
      <>
        {content([
        "Detector Uptime is a measure of state-of-good-repair, which may be correlated to other performance measures since failed detectors may negatively affect performance.",
        "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor",
        "Based on hourly volumes by detector, detector is evaluated according to three criteria:",
        ])}
        <ul>
        <li><Typography>Volume too high</Typography></li>
        <li><Typography>Volume erratic (too much change from one hour to the next)</Typography></li>
        <li><Typography>Volume flatlined (no change in volume between successive time periods.</Typography></li>
      </ul>
          {content([
            "Each detector is evaluated over each day. A detector is considered if failed for the day if any of the following conditions apply:"
          ])}
          <ul>
        <li><Typography>There is a streak of at least 5 hours where the volume does not change, disregarding the hours before 5am.</Typography></li>
        <li><Typography>At least 5 hours in the day have a volume exceeding 2000 vehicles
        </Typography></li>
        <li><Typography>The mean absolute deviation (average magnitude difference between successive hours) is greater than 500.</Typography></li>
      </ul>
      </>
    ),

    "Pedestrian Pushbutton Uptime": (
      <>
        {content([
          "Pedestrian Pushbutton Uptime is the percentage of pedestrian inputs likely to be operational. It is based on the historical distribution of the daily number of pedestrian actuations. Currently, when the number of consecutive days without an input yields a probability of failure based on the historical distribution for that input, it is flagged as failed. This measure is still experimental and the distributions and thresholds are a work in progress.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor.",
          "In the past, this measure was based on manual testing of pedestrian push buttons and was self-reported by the engineers responsible for the corridor. While labor-intensive, This had some benefits over the current automated approach. The first is that multiple push buttons are often physically wired into the same detector input, making it impossible from the controller inputs to determine whether both push buttons are working, or just one. The second is due to the relatively infrequent calls, we have to rely upon a probabilistic approach to determining whether an input is failed because for some push buttons, there is so little demand it can be difficult to say with certainty from the data whether that the push button is indeed failed.",
        ])}
      </>
    ),
    "CCTV Uptime": (
      <>
        {content([
          "Through December 2017, CCTV Uptime was reported by Corridor Managers in their monthly reports. In January, 2018, it came from TSOS based on a manual check of each camera during the month and reporting whether it returns an image and whether it can be controlled (pan-tilt-zoom).",
          "As of February 2018, CCTV Uptime is calculated based on the image returned from the Georgia 511 website. If there is a live image, it will considered working as of its last modified timestamp from the website.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "Communications Uptime": (
      <>
        {content([
          "This is calculated from gaps in the ATSPM high resolution data. Any gaps in subsequent events greater than 15 minutes are considered to be due to communication loss. The sum of these gaps converted to a percent is the daily communication uptime for that controller. If comms are lost for all intersections, it is considered a system failure and that time is excluded from the uptime calculation.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "Events Reported, Resolved, Outstanding": (
      <>
        {content([
          "Activity measures come from TEAMS reports from data as entered by corridor managers. TEAMS is GDOT's ticketing and tracking system for signal equipment and incident-related activity.",
          "All events reported in the month are counted, as are the number of events resolved in the month. The number of outstanding events is the cumulative sum of reported events less the cumulative sum of resolved events.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    ),
    "RTOP Activity Logs": (
      <>
        {content([
          "These are the monthly reports produced monthly by RTOP Corridor Managers detailing key activities, maintenance tasks and action items for the month.",
          "The number shown for the average is an average of all the individual signals based on the current filter. The charts display an average of every signal in the respective corridor."
        ])}
      </>
    )
  }

  const performanceTitles = Object.keys(sectionContent).filter(key => [
    "Throughput",
    "Arrivals on Green",
    "Progression Ratio",
    "Queue Spillback Rate",
    "Split Failures",
    "Travel Time Index",
    "Planning Time Index",
    "Daily Volume",
    "Pedestrians"
  ].includes(key))

  const volumeTitles = Object.keys(sectionContent).filter(key => !performanceTitles.includes(key))

  return (
    <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      About SigOps Metrics
    </Typography>
  
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Box sx={{ flex: 1, minWidth: 400 }}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
          Performance
        </Typography>
        <Divider />
        {performanceTitles.map((title) => (
          <AccordionItem
            key={title}
            title={title}
            content={
              <Box sx={{ textAlign: 'justify' }}>{sectionContent[title]}</Box>
            }
            expanded={expanded === title}
            onChange={handleChange(title)}
          />
        ))}
      </Box>
  
      <Box sx={{ flex: 1, minWidth: 400 }}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
          Volume & Equipment
        </Typography>
        <Divider />
        {volumeTitles.map((title) => (
          <AccordionItem
            key={title}
            title={title}
            content={
              <Box sx={{ textAlign: 'justify' }}>{sectionContent[title]}</Box>
            }
            expanded={expanded === title}
            onChange={handleChange(title)}
          />
        ))}
      </Box>
    </Box>
  </Box>
  )
}

function AccordionItem({ title, content, expanded, onChange }) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      disableGutters
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />} 
        aria-controls={`${title}-content`} 
        id={`${title}-header`} 
        sx={{
          flexDirection: "row-reverse",
          minHeight: "48px",
          "& .MuiAccordionSummary-content": { margin: "12px 0" },
          "&.Mui-expanded": { minHeight: "48px" },
        }}
      >
        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "medium" }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>{content}</AccordionDetails>
    </Accordion>
  )
}