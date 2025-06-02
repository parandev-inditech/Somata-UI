"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import CircularProgress from "@mui/material/CircularProgress"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import RemoveIcon from "@mui/icons-material/Remove"
import MapBox from "../../components/MapBox"
import {
  fetchMetricData,
  fetchLocationMetrics,
  fetchTimeSeriesData,
  fetchMapData,
  metricApiKeys,
  type MetricData,
  type LocationMetric,
  type TimeSeriesData,
  type MapPoint,
} from "../../services/api"
import mapSettings from "../../utils/mapSettings"
import LocationBarChart from "../charts/LocationBarChart"
import TimeSeriesChart from "../charts/TimeSeriesChart"
import { useSelector } from "react-redux"
import { selectFilterParams } from "../../store/slices/filterSlice"
import { RootState } from "../../store/store"
import chartTitles from "../../constants/mapData"
import useDocumentTitle from "../../hooks/useDocumentTitle"

// Define the available metrics
const metrics = [
  { id: "dailyTrafficVolumes", label: "Daily Traffic Volumes" },
  { id: "throughput", label: "Throughput" },
  { id: "arrivalsOnGreen", label: "Arrivals on Green" },
  { id: "progressionRatio", label: "Progression Ratio" },
  { id: "spillbackRatio", label: "Spillback Ratio" },
  { id: "peakPeriodSplitFailures", label: "Peak Period Split Failures" },
  { id: "offPeakSplitFailures", label: "Off-Peak Split Failures" },
  { id: "travelTimeIndex", label: "Travel Time Index" },
  { id: "planningTimeIndex", label: "Planning Time Index" },
]

export default function Operations() {
  // State for filters
  const [dateRange, setDateRange] = useState("priorYear")
  const [dateAggregation, setDateAggregation] = useState("monthly")
  const [region, setRegion] = useState("Central Metro")

  // State for selected metric
  const [selectedMetric, setSelectedMetric] = useState("dailyTrafficVolumes")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // State for data
  const [loading, setLoading] = useState(true)
  const [metricData, setMetricData] = useState<MetricData | null>(null)
  const [locationMetrics, setLocationMetrics] = useState<LocationMetric[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [mapData, setMapData] = useState<MapPoint[]>([])
  const commonFilterParams = useSelector(selectFilterParams);
  const filtersApplied = useSelector((state: RootState) => state.filter.filtersApplied);
  const currentMetric = metrics.find(m => m.id === selectedMetric);
  useDocumentTitle({
    route: 'Operations',
    tab: currentMetric?.label
  });

  // Plotly's default color palette
  const getLocationColor = (index: number) => {
    const colors = [
      '#1f77b4', // blue
      '#ff7f0e', // orange
      '#2ca02c', // green
      '#d62728', // red
      '#9467bd', // purple
      '#8c564b', // brown
      '#e377c2', // pink
      '#7f7f7f', // gray
      '#bcbd22', // yellow-green
      '#17becf'  // cyan
    ];
    return colors[index % colors.length];
  };

  // Create a mapping of locations to colors that will be consistent between charts
  const getLocationColors = () => {
    const uniqueLocations = Array.from(new Set(locationMetrics.map(item => item.location)));
    return Object.fromEntries(uniqueLocations.map((location, index) => [location, getLocationColor(index)]));
  };

  const locationColors = getLocationColors();

  // Fetch data when filters or selected metric changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [metricResult, locationsResult, timeSeriesResult, mapResult] = await Promise.all([
          fetchMetricData(selectedMetric, commonFilterParams),
          fetchLocationMetrics(selectedMetric, commonFilterParams),
          fetchTimeSeriesData(selectedMetric, commonFilterParams),
          fetchMapData(selectedMetric, commonFilterParams),
        ]);

        setMetricData(metricResult);
        setLocationMetrics(locationsResult || []);
        setTimeSeriesData(timeSeriesResult || []);
        setMapData(mapResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set empty data on error
        setMetricData(null);
        setLocationMetrics([]);
        setTimeSeriesData([]);
        setMapData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMetric, filtersApplied]);

  // Handle metric tab change
  const handleMetricChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedMetric(newValue)
  }

  // Format the metric value for display
  const formatMetricValue = (value: number | string, unit?: string) => {
    console.log('formatMetricValue', value);
    if (typeof value === "number") {
      // Format based on the metric type
      if (
        selectedMetric === "arrivalsOnGreen" ||
        selectedMetric === "spillbackRatio" ||
        selectedMetric === "peakPeriodSplitFailures" ||
        selectedMetric === "offPeakSplitFailures"
      ) {
        return `${(value * 100).toFixed(1)}%`
      } else if (
        selectedMetric === "progressionRatio" ||
        selectedMetric === "travelTimeIndex" ||
        selectedMetric === "planningTimeIndex"
      ) {
        return value.toFixed(2)
      } else {
        return Math.round(value).toLocaleString()
      }
    }
    return value
  }

  // Prepare data for the location bar chart
  const isPercentMetric = ["arrivalsOnGreen", "spillbackRatio", "peakPeriodSplitFailures", "offPeakSplitFailures"].includes(selectedMetric);
  
  const locationBarData = {
    y: locationMetrics.map((item) => item.location),
    x: locationMetrics.map((item) => {
      // For percentage metrics, ensure values are in decimal format for proper display
      return isPercentMetric && item.value > 1 ? item.value / 100 : item.value;
    }),
    type: "bar",
    orientation: "h",
    marker: {
      color: locationMetrics.map(item => locationColors[item.location]),
      opacity: locationMetrics.map(item => 
        selectedLocation ? (item.location === selectedLocation ? 1 : 0.5) : 1
      )
    },
    hovertemplate: isPercentMetric
      ? '<b>%{y}</b><br>Value: %{x:.1%}<extra></extra>'
      : '<b>%{y}</b><br>Value: %{x}<extra></extra>',
  }

  // Handle bar click in location chart
  const handleLocationClick = (location: string) => {
    setSelectedLocation(location === selectedLocation ? null : location);
  };

  // Prepare data for the time series chart
  const timeSeriesChartData = () => {
    // Group by location
    const locationGroups: { [key: string]: { x: string[]; y: number[] } } = {}
    
    timeSeriesData.forEach((item) => {
      // If a location is selected, only process data for that location
      if (selectedLocation && item.location !== selectedLocation) {
        return;
      }

      if (!locationGroups[item.location]) {
        locationGroups[item.location] = { x: [], y: [] }
      }
      locationGroups[item.location].x.push(item.date)
      
      // For percentage metrics, ensure values are in decimal format for proper display
      const value = isPercentMetric && item.value > 1 ? item.value / 100 : item.value;
      locationGroups[item.location].y.push(value)
    })

    // Convert to Plotly format
    return Object.keys(locationGroups).map((location) => ({
      x: locationGroups[location].x,
      y: locationGroups[location].y,
      type: "scatter",
      mode: "lines",
      name: location,
      line: { 
        width: 2,
        color: locationColors[location]
      },
      hovertemplate: isPercentMetric
        ? '<b>%{text}</b><br>Date: %{x}<br>Value: %{y:.1%}<extra></extra>'
        : '<b>%{text}</b><br>Date: %{x}<br>Value: %{y}<extra></extra>',
      text: Array(locationGroups[location].x.length).fill(location),
    }))
  }

  // Map metric IDs to mapSettings keys
  const metricToSettingsMap: Record<string, string> = {
    dailyTrafficVolumes: "dailyTrafficVolume",
    throughput: "throughput",
    arrivalsOnGreen: "arrivalsOnGreen",
    progressionRatio: "progressionRate",
    spillbackRatio: "spillbackRate",
    peakPeriodSplitFailures: "peakPeriodSplitFailures",
    offPeakSplitFailures: "offPeakSplitFailures",
    travelTimeIndex: "",  // No map settings for this metric
    planningTimeIndex: "",  // No map settings for this metric
  };

  // Prepare map data
  const mapPlotData = mapData.length === 0 ? 
  {
    type: "scattermapbox",
    lat: [33.789], // Default center point for Atlanta
    lon: [-84.388],
    mode: "markers",
    marker: {
      size: 0, // Invisible marker
      opacity: 0
    },
    text: ["No data available"],
    hoverinfo: "none",
  } : 
  {
    type: "scattermapbox",
    lat: mapData.filter(point => point.value !== 0).map((point) => point.lat),
    lon: mapData.filter(point => point.value !== 0).map((point) => point.lon),
    mode: "markers",
    marker: {
      size: 6,
      color: mapData.filter(point => point.value !== 0).map((point) => {
        // Color based on value using mapSettings
        const settingsKey = metricToSettingsMap[selectedMetric];
        const settings = settingsKey ? mapSettings[settingsKey] : null;
        
        if (settings) {
          const value = point.value;
          
          // Handle unavailable data
          if (value === -1) {
            return settings.legendColors[0]; // First color is for unavailable data
          }
          
          // Find which range the value falls into, starting from index 1 to skip the unavailable range
          for (let i = 1; i < settings.ranges.length; i++) {
            const [min, max] = settings.ranges[i];
            if (value >= min && value <= max) {
              return settings.legendColors[i];
            }
          }
          // Default to last color if outside all ranges
          return settings.legendColors[settings.legendColors.length - 1];
        }
        
        // Fallback to default blue if no settings found
        return "#3b82f6";
      }),
      opacity: 0.8,
    },
    text: mapData.filter(point => point.value !== 0).map((point) => {
      const apiKey = metricApiKeys[selectedMetric];
      // Check if data is unavailable
      if (point.value === -1) {
        return `${point.signalID}<br>${point.name}<br>No data available`;
      }
      return `${point.signalID}<br>${point.name}<br>${selectedMetric}: ${formatMetricValue(point.value)}`;
    }),
    hoverinfo: "text",
  };
  console.log('mapPlotData', mapPlotData);

  const mapLayout = {
    autosize: true,
    hovermode: "closest",
    mapbox: {
      style: "carto-positron",
      center: { lat: 33.789, lon: -84.388 },
      zoom: 8,
    },
    margin: { r: 0, t: 0, b: 0, l: 0 },
  }

  // Get the appropriate legend for the map based on the selected metric
  const getMapLegend = () => {
    const settingsKey = metricToSettingsMap[selectedMetric];
    const settings = settingsKey ? mapSettings[settingsKey] : null;

    if (settings) {
      return (
        <>
          {/* <Typography variant="subtitle2" gutterBottom>
            {settings.label}
          </Typography> */}
          {settings.ranges.map((range, index) => (
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }} key={index}>
              <Box sx={{ width: 8, height: 8, bgcolor: settings.legendColors[index], mr: 1, borderRadius: 4 }} />
              <Typography variant="caption">{settings.legendLabels[index]}</Typography>
            </Box>
          ))}
        </>
      );
    } else {
      // Fallback for metrics without map settings
      return (
        <Typography variant="subtitle2" gutterBottom>
          No legend available for this metric
        </Typography>
      );
    }
  };

  // Get the title for the time series chart
  const getTimeSeriesTitle = () => {
    return chartTitles[selectedMetric as keyof typeof chartTitles]["bottomChartTitle"]
  }

  // Get the subtitle for the metric display
  const getMetricSubtitle = () => {
    return chartTitles[selectedMetric as keyof typeof chartTitles]["metricCardTitle"]
  }

  console.log('metricData', metricData);

  return (
    <Box sx={{ p: 2 }}>
      {/* Metric Tabs */}
      <Tabs
        value={selectedMetric}
        onChange={handleMetricChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            textTransform: "none",
            minWidth: "auto",
            px: 2,
          },
        }}
      >
        {metrics.map((metric) => (
          <Tab key={metric.id} label={metric.label} value={metric.id} />
        ))}
      </Tabs>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Main Content */}
          <Grid container spacing={2}>
            {/* Metric Display */}
            <Grid size={{xs: 12, md: 4}}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                height: '100%'
              }}>
                {/* Metric Card */}
                <Paper sx={{ 
                  p: 3, 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center",
                  flex: 1,
                  minHeight: "130px"
                }}>
                  <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: '500', fontSize: '24px' }}>
                    {metricData && formatMetricValue(metricData.value, metricData.unit)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {getMetricSubtitle()}
                  </Typography>
                </Paper>

                {/* Trend Indicator Card */}
                <Paper sx={{ 
                  p: 3, 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center",
                  flex: 1,
                  minHeight: "130px"
                }}>
                  {metricData && metricData.change !== undefined && (
                    <>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color:
                            metricData.change > 0
                              ? "success.main"
                              : metricData.change < 0
                                ? "error.main"
                                : "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: '500',
                          fontSize: '24px'
                        }}
                      >
                        {Math.abs(metricData.change).toFixed(1)}%
                        {metricData.change > 0 ? (
                          <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                        ) : metricData.change < 0 ? (
                          <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                        ) : (
                          <RemoveIcon fontSize="small" sx={{ ml: 0.5 }} />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {metricData?.changeLabel}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Box>
            </Grid>

            {/* Map */}
            <Grid size={{xs: 12, md: 8}}>
              <Paper sx={{ 
                p: 2, 
                height: "100%", 
                display: "flex", 
                flexDirection: "column"
              }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  width: "100%", 
                  position: "relative", 
                  minHeight: { xs: "350px", md: "284px" } /* 2*130px (cards) + 2*12px (gap) */
                }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : selectedMetric === "travelTimeIndex" || selectedMetric === "planningTimeIndex" ? (
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '100%',
                      textAlign: 'center'
                    }}>
                      {/* <Typography variant="h6" color="text.secondary">
                        Map view is not available for {selectedMetric === "travelTimeIndex" ? "Travel Time Index" : "Planning Time Index"}
                      </Typography> */}
                    </Box>
                  ) : (
                    <>
                      <MapBox 
                        data={mapData.length > 0 ? [mapPlotData as any] : []}
                        isRawTraces={true}
                        loading={false}
                        height="100%"
                        zoom={11}
                        renderLegend={getMapLegend}
                      />
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Bottom Charts */}
            <Grid size={{xs: 12}}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                  {getTimeSeriesTitle()}
                </Typography>
                <Grid container spacing={2}>
                  {/* Location Bar Chart */}
                  <Grid size={{xs: 12, md: 4}}>
                    <Box sx={{ 
                      height: "500px", 
                      display: "flex", 
                      flexDirection: "column"
                    }}>
                      <LocationBarChart 
                        data={locationBarData}
                        selectedMetric={selectedMetric}
                        selectedLocation={selectedLocation}
                        onLocationClick={handleLocationClick}
                        height={Math.max(500, locationMetrics.length * 10)} // Adjust height based on number of locations
                      />
                    </Box>
                  </Grid>

                  {/* Time Series Chart */}
                  <Grid size={{xs: 12, md: 8}}>
                    <TimeSeriesChart 
                      data={timeSeriesChartData()}
                      selectedMetric={selectedMetric}
                      // showLegend={!selectedLocation}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}
