"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './styles.css';

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

// API Error Display Component
export interface ApiErrorDisplayProps {
  error: string | null
  onRetry?: () => void
  retrying?: boolean
  title?: string
  compact?: boolean
}

export const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({
  error,
  onRetry,
  retrying = false,
  title = "Unable to Load Data",
  compact = false
}) => {
  if (!error) return null

  const getErrorIcon = () => {
    if (error.includes('Network error') || error.includes('connection')) {
      return <WifiOffIcon />
    }
    if (error.includes('timeout') || error.includes('timed out')) {
      return <AccessTimeIcon />
    }
    return <ErrorOutlineIcon />
  }

  const getErrorSeverity = (): 'error' | 'warning' => {
    if (error.includes('Network error') || error.includes('timeout')) {
      return 'warning'
    }
    return 'error'
  }

  if (compact) {
    return (
      <Alert 
        severity={getErrorSeverity()} 
        icon={getErrorIcon()}
        action={
          onRetry && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onRetry}
              disabled={retrying}
              startIcon={<RefreshIcon />}
            >
              {retrying ? 'Retrying...' : 'Retry'}
            </Button>
          )
        }
        sx={{ mb: 1 }}
      >
        {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100%',
      minHeight: 200,
      p: 3,
      textAlign: 'center'
    }}>
      <Alert 
        severity={getErrorSeverity()} 
        icon={getErrorIcon()}
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
        {onRetry && (
          <Button 
            variant="outlined" 
            color="inherit"
            onClick={onRetry}
            disabled={retrying}
            startIcon={<RefreshIcon />}
            sx={{ mt: 1 }}
          >
            {retrying ? 'Retrying...' : 'Try Again'}
          </Button>
        )}
      </Alert>
    </Box>
  )
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <ApiErrorDisplay 
          error={this.state.error?.message || 'Something went wrong'}
          onRetry={this.handleReset}
          title="Application Error"
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 