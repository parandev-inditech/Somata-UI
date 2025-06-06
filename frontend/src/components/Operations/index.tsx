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

import MapBox from "../../components/MapBox"
import mapSettings from "../../utils/mapSettings"
import LocationBarChart from "../charts/LocationBarChart"
import TimeSeriesChart from "../charts/TimeSeriesChart"
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { 
  fetchStraightAverage,
  fetchAllSignals,
  fetchMetricsFilter,
  fetchMetricsAverage,
  fetchSignalsFilterAverage
} from '../../store/slices/metricsSlice'
import { MetricsFilterRequest } from '../../types/api.types'
import { useSelector } from "react-redux"
import { selectFilterParams } from "../../store/slices/filterSlice"
import { RootState } from "../../store/store"
import { chartTitles } from "../../constants/mapData"
import useDocumentTitle from "../../hooks/useDocumentTitle"

// Define the available metrics
const metrics = [
  { id: "dailyTrafficVolumes", label: "Daily Traffic Volumes", key: "vpd" },
  { id: "throughput", label: "Throughput", key: "tp" },
  { id: "arrivalsOnGreen", label: "Arrivals on Green", key: "aogd" },
  { id: "progressionRatio", label: "Progression Ratio", key: "prd" },
  { id: "spillbackRatio", label: "Spillback Ratio", key: "qsd" },
  { id: "peakPeriodSplitFailures", label: "Peak Period Split Failures", key: "sfd" },
  { id: "offPeakSplitFailures", label: "Off-Peak Split Failures", key: "sfo" },
  { id: "travelTimeIndex", label: "Travel Time Index", key: "tti" },
  { id: "planningTimeIndex", label: "Planning Time Index", key: "pti" },
]

// Types for component-specific data
interface LocationMetric {
  location: string;
  value: number;
}

interface TimeSeriesData {
  date: string;
  value: number;
  location: string;
}

interface MapPoint {
  lat: number;
  lon: number;
  value: number;
  name: string;
  signalID?: string;
  mainStreet?: string;
  sideStreet?: string;
}



const metricValueKeys: Record<string, string> = {
  dailyTrafficVolumes: "vpd",
  throughput: "vph",
  arrivalsOnGreen: "aog",
  progressionRatio: "pr", 
  spillbackRatio: "qs_freq",
  peakPeriodSplitFailures: "sf_freq",
  offPeakSplitFailures: "sf_freq",
  travelTimeIndex: "tti",
  planningTimeIndex: "pti"
};

export default function Operations() {
  // State for selected metric
  const [selectedMetric, setSelectedMetric] = useState("dailyTrafficVolumes")
  const [selectedMetricKey, setSelectedMetricKey] = useState("vpd")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Local state for component-specific data
  const [locationMetrics, setLocationMetrics] = useState<LocationMetric[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [mapData, setMapData] = useState<MapPoint[]>([])

  const commonFilterParams = useSelector(selectFilterParams);
  const filtersApplied = useSelector((state: RootState) => state.filter.filtersApplied);
  
  // Redux state
  const dispatch = useAppDispatch();
  const { 
    signals,
    straightAverage,
    metricsFilter,
    metricsAverage,
    signalsFilterAverage
  } = useAppSelector(state => state.metrics);
  
  const loading = straightAverage.loading || 
                  metricsFilter.loading || 
                  metricsAverage.loading || 
                  signalsFilterAverage.loading;

  const currentMetric = metrics.find(m => m.id === selectedMetric);
  useDocumentTitle({
    route: 'Operations',
    tab: currentMetric?.label
  });

  // Create a mapping of locations to colors that will be consistent between charts
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

  const getLocationColors = () => {
    const uniqueLocations = Array.from(new Set(locationMetrics.map(item => item.location)));
    return Object.fromEntries(uniqueLocations.map((location, index) => [location, getLocationColor(index)]));
  };

  const locationColors = getLocationColors();

  // Find the metric key for the selected metric
  useEffect(() => {
    const metric = metrics.find(m => m.id === selectedMetric);
    if (metric) {
      setSelectedMetricKey(metric.key);
    }
  }, [selectedMetric]);

  // Fetch data when filters or selected metric changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create common params object
        const params: MetricsFilterRequest = {
          source: "main",
          measure: selectedMetricKey
        };
        
        // Dispatch actions to fetch data
        dispatch(fetchStraightAverage({ params, filterParams: commonFilterParams }));
        dispatch(fetchAllSignals());
        dispatch(fetchSignalsFilterAverage({ params, filterParams: commonFilterParams }));
        dispatch(fetchMetricsAverage({ 
          params: { ...params, dashboard: false }, 
          filterParams: commonFilterParams 
        }));
        dispatch(fetchMetricsFilter({ params, filterParams: commonFilterParams }));
      } catch (error) {
        console.error("Error dispatching Redux actions:", error);
      }
    };

    fetchData();
  }, [selectedMetricKey, filtersApplied]);

  // Process location metrics from Redux state
  useEffect(() => {
    if (metricsAverage.data && Array.isArray(metricsAverage.data)) {
      const sortedMetrics = metricsAverage.data.map((item: { label: string; avg: number }) => ({
        location: item.label,
        value: item.avg || 0
      })).sort((a: LocationMetric, b: LocationMetric) => a.value - b.value);
      setLocationMetrics(sortedMetrics);
    }
  }, [metricsAverage.data]);

  // Process time series data from Redux state
  useEffect(() => {
    if (metricsFilter.data && Array.isArray(metricsFilter.data)) {
      const processedTimeSeriesData = metricsFilter.data.map((item: Record<string, string | number>) => {
        const metricValue = item[metricValueKeys[selectedMetric]] || 0;
        return {
          date: formatDate((item.month as string) || ''),
          value: parseFloat(String(metricValue)),
          location: (item.corridor as string) || 'Unknown'
        };
      });
      setTimeSeriesData(processedTimeSeriesData);
    }
  }, [metricsFilter.data, selectedMetric]);

  // Process map data from Redux state
  useEffect(() => {
    if (signals.length > 0 && signalsFilterAverage.data && Array.isArray(signalsFilterAverage.data)) {
      // Create a map of signal IDs to metric values
      const metricMap = new Map<string, number>();
      signalsFilterAverage.data.forEach((item: { label: string; avg: number }) => {
        metricMap.set(item.label, item.avg);
      });
      
      // Map signals to map points
      const mapPoints = signals
        .filter((signal) => signal.latitude && signal.longitude && signal.signalID)
        .map((signal) => {
          const value = metricMap.get(signal.signalID!) || 0;
          
          return {
            lat: signal.latitude,
            lon: signal.longitude,
            value,
            name: signal.mainStreetName ? (signal.sideStreetName ? 
              `${signal.mainStreetName} @ ${signal.sideStreetName}` : 
              signal.mainStreetName) : 
              `Signal ${signal.signalID}`,
            signalID: signal.signalID!,
            mainStreet: signal.mainStreetName,
            sideStreet: signal.sideStreetName
          };
        });

      setMapData(mapPoints);
    }
  }, [signals, signalsFilterAverage.data]);

  // Format date string
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateString;
    }
  };

  // Handle metric tab change
  const handleMetricChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedMetric(newValue)
  }

  // Format the metric value for display
  const formatMetricValue = (value: number | string) => {
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
      // Check if data is unavailable
      if (point.value === -1) {
        return `${point.signalID}<br>${point.name}<br>No data available`;
      }
      return `${point.signalID}<br>${point.name}<br>${selectedMetric}: ${formatMetricValue(point.value)}`;
    }),
    hoverinfo: "text",
  };

  // Get the appropriate legend for the map based on the selected metric
  const getMapLegend = () => {
    const settingsKey = metricToSettingsMap[selectedMetric];
    const settings = settingsKey ? mapSettings[settingsKey] : null;

    if (settings) {
      return (
        <>
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

  const metricData = straightAverage.data;
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
                    {metricData && formatMetricValue(metricData.avg)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {getMetricSubtitle()}
                  </Typography>
                </Paper>

                {/* Trend Indicator Card - Placeholder */}
                <Paper sx={{ 
                  p: 3, 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center",
                  flex: 1,
                  minHeight: "130px"
                }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: '500', fontSize: '24px' }}>
                  {metricData && Math.abs(metricData.delta * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Change from prior period
                  </Typography>
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
