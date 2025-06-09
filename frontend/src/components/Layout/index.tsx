"use client"

import type React from "react"

import { useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Header from "../Header";
import SideNav from "../SideNav"
import FilterSidebar from "../FilterSidebar"
import IconButton from "@mui/material/IconButton"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useLocation } from "react-router-dom";

const expandedDrawerWidth = 240
const collapsedDrawerWidth = 65
const filterWidth = 300

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "sideNavWidth" && prop !== "filterOpen" })<{
  sideNavWidth?: number
  filterOpen?: boolean
}>(({ theme, sideNavWidth, filterOpen }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  marginRight: 0,
  ...(sideNavWidth && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: `${sideNavWidth}px`,
  }),
  // ...(filterOpen && {
  //   marginRight: `${filterWidth}px`,
  // }),
}))

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sideNavExpanded, setSideNavExpanded] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const location = useLocation();

  const hideFilterPath = ["/watchdog", "/health-metrics", "/signal-info", "/reports", "/about"];
  const shouldShowFilter = !hideFilterPath.some(path => location.pathname.includes(path));

  const handleSideNavToggle = () => {
    setSideNavExpanded(!sideNavExpanded)
  }

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen)
  }

  const sideNavWidth = sideNavExpanded ? expandedDrawerWidth : collapsedDrawerWidth

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "auto" }}>
      <Header sideNavOpen={sideNavExpanded} onSideNavToggle={handleSideNavToggle} onFilterToggle={handleFilterToggle} />
      <SideNav open={true} expanded={sideNavExpanded} width={sideNavWidth} />
      <Main sideNavWidth={sideNavWidth} filterOpen={filterOpen}>
        <Box sx={{ pt: 8, height: "calc(100vh - 64px)", overflowY: "auto", overflowX: "auto" }}>
          {/* Filter Button - Absolutely positioned in top right corner */}
          {shouldShowFilter && (
          <Box sx={{ 
            position: 'absolute', 
            top: '70px', 
            right: filterOpen ? `${filterWidth + 16}px` : '16px', 
            zIndex: 1100,
            transition: (theme) => theme.transitions.create(['right'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}>
            <IconButton 
              color="primary" 
              onClick={handleFilterToggle}
              sx={{ 
                bgcolor: 'white', 
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'white',
                  opacity: 0.9,
                } 
              }}
              size="large"
              aria-label="open filters"
            >
              <FilterAltIcon />
            </IconButton>
          </Box>)}
          {children}
        </Box>
      </Main>
      {shouldShowFilter && <FilterSidebar open={filterOpen} width={filterWidth} onClose={handleFilterToggle} />}
    </Box>
  )
}
