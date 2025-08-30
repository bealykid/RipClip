import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { 
  BarChart3, Upload, Video, FileText, Settings, Search, Bell, User,
  TrendingUp, Share, CheckCircle, AlertTriangle, XCircle, Play, Pause
} from 'lucide-react';

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/', description: 'Overview & analytics' },
    { icon: Upload, label: 'Upload', path: '/upload', description: 'Analyze new clips' },
    { icon: Video, label: 'My Clips', path: '/clips', description: 'Manage your library' },
    { icon: FileText, label: 'Reports', path: '/reports', description: 'Detailed insights' },
    { icon: Settings, label: 'Settings', path: '/settings', description: 'Account & preferences' }
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="p-6 sidebar-border">
        <div className="ripclip-logo">RipClip</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="nav-item-description">{item.description}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="user-profile">
        <div className="flex items-center space-x-3">
          <div className="user-avatar">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="user-name">Steve Creator</div>
            <div className="user-plan">Pro Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="header-title">Dashboard</h1>
          <p className="header-subtitle">Good morning, Steve — Ready to rip?</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Demo Report CTA */}
          <Link
            to="/reports?clipId=demo-clip-001"
            className="demo-cta"
          >
            View Demo Report
          </Link>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search clips..."
              className="search-input"
            />
          </div>
          
          {/* Notifications */}
          <button className="icon-button">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* Profile */}
          <button className="icon-button">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with Demo CTA */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to RipClip</h1>
            <p className="text-muted-foreground">AI-powered video analysis for content creators</p>
          </div>
          <Link
            to="/reports?clipId=demo-clip-001"
            className="demo-cta text-lg px-6 py-3"
          >
            🎯 View Demo Report
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Total Clips</h3>
          <p className="text-3xl font-bold text-primary">24</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Avg RipScore</h3>
          <p className="text-3xl font-bold text-primary">87</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">This Week</h3>
          <p className="text-3xl font-bold text-primary">+12</p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="card">
        <h2 className="card-subtitle">What RipClip Analyzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-semibold mb-2">🎯 Performance Timeline</h3>
            <p className="text-sm text-muted-foreground">Interactive timeline with diamond markers showing strong moments, areas needing attention, and critical issues.</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-semibold mb-2">📊 8-Metric Analysis</h3>
            <p className="text-sm text-muted-foreground">Hook, Pacing, Captions, Audio, Virality, Retention, Platform Fit, and Structure scoring.</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-semibold mb-2">🤖 AI Summary</h3>
            <p className="text-sm text-muted-foreground">One-liner insights and top 3 actionable fixes with RipScore impact predictions.</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-semibold mb-2">📄 Export & Share</h3>
            <p className="text-sm text-muted-foreground">Generate PDF reports, copy notes, and share analysis with collaborators.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Upload Component
const UploadPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload & Analyze</h1>
      <div className="card">
        <h2 className="card-subtitle">Upload New Clip</h2>
        <p className="text-muted-foreground">Upload functionality coming soon...</p>
      </div>
    </div>
  );
};

// Clips Component
const ClipsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Clips</h1>
      <div className="card">
        <h2 className="card-subtitle">Clip Library</h2>
        <p className="text-muted-foreground">Clip management coming soon...</p>
      </div>
    </div>
  );
};

// MetricsGrid Component with Full Tooltips & Polish
const MetricsGrid = ({ metricsData, activeMetricId, onMetricClick, onClearFilter }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  // Metric definitions for tooltips
  const metricDefinitions = {
    hook: "Effectiveness of the first 3-5 seconds in capturing viewer attention. Measures visual impact, audio clarity, and engagement triggers.",
    pacing: "Analysis of cut frequency, rhythm, and visual flow. Optimal pacing keeps viewers engaged without overwhelming them.",
    captions: "Quality assessment of text readability, timing accuracy, and coverage. Good captions improve accessibility and retention.",
    audio: "Balance and clarity of dialog, music, and sound effects. Poor audio is the #1 reason viewers abandon videos.",
    virality: "Potential for viral spread based on novelty, clarity, and call-to-action strength. Combines uniqueness with shareability factors.",
    retention: "Predicted percentage of viewers who will still be watching at the 10-second mark. Critical metric for algorithm performance.",
    platform: "How well the video matches platform-specific best practices for aspect ratio, length, style, and optimization.",
    structure: "Overall narrative flow and logical progression. Good structure guides viewers through a clear beginning, middle, and end."
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };
  const getMetricTileClass = (score) => {
    if (score >= 85) return 'metric-tile-green';
    if (score >= 70) return 'metric-tile-yellow';
    return 'metric-tile-red';
  };  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const getTrendColor = (direction) => {
    switch (direction) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      TrendingUp: TrendingUp,
      Zap: () => <div className="w-5 h-5 bg-yellow-400 rounded rotate-45 shadow-sm"></div>,
      Activity: () => <div className="w-5 h-5 border-2 border-current rounded-sm"><div className="w-1 h-1 bg-current rounded-full m-1"></div></div>,
      Type: () => <div className="w-5 h-5 border-2 border-current rounded text-xs flex items-center justify-center font-bold">T</div>,
      Volume2: () => <div className="w-5 h-5 relative"><div className="w-2 h-3 bg-current rounded-l"></div><div className="absolute top-1 right-1 w-2 h-1 border border-current rounded-full"></div></div>,
      Share2: Share,
      Users: User,
      Target: () => <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-current rounded-full"></div></div>
    };
    
    const IconComponent = iconMap[iconName] || TrendingUp;
    return <IconComponent className="w-5 h-5" />;
  };

  // Handle tooltip positioning
  const handleMouseEnter = (e, metricId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredMetric(metricId);
  };

  const handleMouseLeave = () => {
    setHoveredMetric(null);
  };

  return (
    <div className="card relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="card-title">Performance Metrics</h3>
        {activeMetricId && (
          <button
            onClick={onClearFilter}
            className="text-sm bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full hover:bg-blue-500/20 transition-all duration-200 hover:scale-105"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Responsive 2x4 Grid: Desktop 4 cols, Tablet 2 cols, Mobile 1 col */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="grid"
        aria-label="Performance metrics grid"
      >
        {metricsData.map((metric, index) => (
          <button
            key={metric.id}
            onClick={() => onMetricClick(metric.id)}
            onMouseEnter={(e) => handleMouseEnter(e, metric.id)}
            onMouseLeave={handleMouseLeave}
            className={`metric-tile ${getMetricTileClass(metric.score)} ${
              activeMetricId === metric.id ? 'active' : ''
            }`}
            aria-pressed={activeMetricId === metric.id}
            aria-label={`${metric.label}: ${metric.score}/100, ${metric.trend.label}`}
            aria-describedby={hoveredMetric === metric.id ? `tooltip-${metric.id}` : undefined}
            role="gridcell"
          >
            {/* Header: Icon + Label */}
            <div className="metric-header">
              <div className="metric-icon-label">
                <div className={`${getScoreColor(metric.score)} transition-all duration-200`}>
                  {getIconComponent(metric.icon)}
                </div>
                <span className="metric-label">{metric.label}</span>
              </div>
              
              {/* Score Badge */}
              <div className={`metric-score-badge ${getScoreColor(metric.score)}`}>
                {metric.score}
              </div>
            </div>

            {/* Trend */}
            <div className={`metric-trend ${getTrendColor(metric.trend.direction)}`}>
              <span className="metric-trend-icon">{getTrendIcon(metric.trend.direction)}</span>
              <span className="truncate">{metric.trend.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredMetric && (
        <div
          id={`tooltip-${hoveredMetric}`}
          className="fixed z-50 max-w-xs p-3 bg-black/90 text-white text-sm rounded-lg shadow-xl border border-white/10 backdrop-blur-sm pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-semibold mb-1">
            {metricsData.find(m => m.id === hoveredMetric)?.label}
          </div>
          <div className="text-xs text-white/80 leading-relaxed">
            {metricDefinitions[hoveredMetric]}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </div>
      )}
    </div>
  );
};

// Timeline component - Enhanced Premiere-style with Draggable Playhead & Keyboard Controls
const Timeline = ({ durationMs, markers, playheadMs, onMarkerClick, pulsingMarkers = new Set() }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const timelineRef = useRef(null);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toPct = (ms, totalMs) => `${(ms / totalMs) * 100}%`;

  const handleDragStart = (e) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    const rect = timelineRef.current.getBoundingClientRect();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const newTime = Math.max(0, Math.min(durationMs, ((clientX - rect.left) / rect.width) * durationMs));
    
    setDragTime(newTime);
    setDragPosition({ x: clientX, y: e.type === 'touchstart' ? e.touches[0].clientY : e.clientY });
    
    const handleDragMove = (e) => {
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      const newTime = Math.max(0, Math.min(durationMs, ((clientX - rect.left) / rect.width) * durationMs));
      
      setDragTime(newTime);
      setDragPosition({ x: clientX, y: clientY });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      
      // Snap to nearest marker within 0.5s
      const snapThreshold = 500; // 0.5s in ms
      const nearestMarker = markers.find(marker => 
        Math.abs(marker.t * 1000 - dragTime) < snapThreshold
      );
      
      if (nearestMarker) {
        onMarkerClick(nearestMarker.t);
      } else {
        // Just update playhead position
        // onPlayheadChange(dragTime); // We'd need this prop
      }
      
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  };

  return (
    <div 
      className={`premiere-timeline ${isFocused ? 'ring-2 ring-blue-500/50' : ''}`}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="slider"
      aria-label="Timeline scrubber"
      aria-valuemin={0}
      aria-valuemax={durationMs}
      aria-valuenow={playheadMs}
      aria-valuetext={formatTime(playheadMs)}
    >
      {/* Keyboard instructions overlay */}
      {isFocused && (
        <div className="absolute -top-8 left-0 text-xs text-blue-400 bg-black/60 px-2 py-1 rounded whitespace-nowrap z-30">
          ← → ±0.5s | Shift+← → ±2s
        </div>
      )}

      {/* Draggable Track */}
      <div 
        ref={timelineRef}
        className="timeline-track"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      ></div>
      
      {/* Time ticks - Enhanced with major/minor ticks */}
      <div className="absolute inset-x-0 -bottom-6 h-4">
        {/* Major ticks every 5s */}
        {Array.from({ length: Math.floor(durationMs / 5000) + 1 }, (_, i) => {
          const timeMs = i * 5000;
          const leftPct = (timeMs / durationMs) * 100;
          return (
            <div key={`major-${i}`} className="absolute" style={{ left: `${leftPct}%` }}>
              <div className="w-px h-3 bg-white/40 transform -translate-x-1/2"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-mono">
                {formatTime(timeMs)}
              </div>
            </div>
          );
        })}
        
        {/* Minor ticks every 1s */}
        {Array.from({ length: Math.floor(durationMs / 1000) + 1 }, (_, i) => {
          const timeMs = i * 1000;
          if (timeMs % 5000 === 0) return null; // Skip major tick positions
          const leftPct = (timeMs / durationMs) * 100;
          return (
            <div key={`minor-${i}`} className="absolute" style={{ left: `${leftPct}%` }}>
              <div className="w-px h-1 bg-white/20 transform -translate-x-1/2"></div>
            </div>
          );
        })}
      </div>
      
      {/* Master clock - top right */}
      <div className="absolute top-0 right-0 text-sm font-mono text-muted-foreground bg-black/20 px-2 py-1 rounded">
        {formatTime(playheadMs)}
      </div>
      
      {/* Draggable Playhead */}
      <div 
        className={`timeline-playhead ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ left: toPct(playheadMs, durationMs) }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* Playhead handle */}
        <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-sm shadow-sm transition-all ${isDragging ? 'scale-125' : ''}`}></div>
      </div>

      {/* Floating timestamp badge while dragging */}
      {isDragging && (
        <div 
          className="fixed z-50 bg-black text-white text-sm font-mono px-3 py-1 rounded-lg shadow-lg pointer-events-none"
          style={{ 
            left: dragPosition.x - 25, 
            top: dragPosition.y - 40,
            transform: 'translateX(-50%)'
          }}
        >
          {formatTime(dragTime)}
        </div>
      )}
      
      {/* Diamond Keyframe Markers */}
      {markers.map(marker => {
        const markerColorClasses = {
          strong: 'timeline-marker-green',
          attention: 'timeline-marker-yellow', 
          critical: 'timeline-marker-red'
        };
        
        const isPulsing = pulsingMarkers.has(marker.t);
        
        return (
          <button
            key={`${marker.t}-${marker.severity}`}
            className={`timeline-marker ${markerColorClasses[marker.severity]} ${isPulsing ? 'pulsing' : ''}`}
            style={{ left: toPct(marker.t * 1000, durationMs) }}
            onClick={() => onMarkerClick(marker.t)}
            aria-label={`${marker.title} @ ${formatTime(marker.t * 1000)}`}
          >
            {/* Tooltip */}
            <div className="timeline-tooltip">
              <div className="timeline-tooltip-time">{formatTime(marker.t * 1000)}</div>
              <div>{marker.title}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// PDF Report Component
const ReportPDF = ({ reportData }) => {
  const { clipId, ripScore, durationSec, metrics, timelineMarkers, aiSummary } = reportData;
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 20,
      borderBottom: '1px solid #333',
      paddingBottom: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00d4ff',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
      marginBottom: 10,
    },
    ripScore: {
      fontSize: 18,
      fontWeight: 'bold',
      color: ripScore >= 85 ? '#22c55e' : ripScore >= 70 ? '#eab308' : '#ef4444',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#00d4ff',
    },
    summaryBox: {
      backgroundColor: '#1a1a1a',
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
      border: '1px solid #333',
    },
    summaryText: {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: 10,
    },
    fixItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#2a2a2a',
      marginBottom: 5,
      borderRadius: 4,
    },
    fixText: {
      fontSize: 12,
      flex: 1,
    },
    fixImpact: {
      fontSize: 12,
      color: '#22c55e',
      fontWeight: 'bold',
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    metricItem: {
      width: '23%',
      backgroundColor: '#1a1a1a',
      padding: 10,
      marginBottom: 10,
      borderRadius: 6,
      border: '1px solid #333',
    },
    metricLabel: {
      fontSize: 10,
      color: '#888',
      marginBottom: 5,
    },
    metricScore: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: '#1a1a1a',
      marginBottom: 4,
      borderRadius: 4,
    },
    timestamp: {
      fontSize: 10,
      fontFamily: 'Courier',
      width: 50,
      marginRight: 10,
    },
    markerTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      flex: 1,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 30,
      right: 30,
      textAlign: 'center',
      fontSize: 10,
      color: '#666',
      borderTop: '1px solid #333',
      paddingTop: 10,
    },
  });

  const groupedMarkers = {
    strong: timelineMarkers.filter(m => m.severity === 'strong'),
    attention: timelineMarkers.filter(m => m.severity === 'attention'),
    critical: timelineMarkers.filter(m => m.severity === 'critical'),
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RipClip Report</Text>
          <Text style={styles.subtitle}>Clip: {clipId}</Text>
          <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.ripScore}>RipScore: {ripScore}/100</Text>
        </View>

        {/* AI Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Summary</Text>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{aiSummary.oneLiner}</Text>
            <Text style={[styles.sectionTitle, { fontSize: 12, marginBottom: 8 }]}>Top Fixes</Text>
            {aiSummary.topFixes.map((fix, index) => (
              <View key={index} style={styles.fixItem}>
                <Text style={styles.fixText}>
                  {Math.floor(fix.t / 60)}:{(fix.t % 60).toFixed(1).padStart(4, '0')} - {fix.action}
                </Text>
                <Text style={styles.fixImpact}>{fix.impact}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Metrics Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metrics Overview</Text>
          <View style={styles.metricsGrid}>
            {metrics.map((metric) => (
              <View key={metric.id} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={[styles.metricScore, {
                  color: metric.score >= 85 ? '#22c55e' : metric.score >= 70 ? '#eab308' : '#ef4444'
                }]}>{metric.score}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Timeline Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline Insights</Text>
          
          {groupedMarkers.strong.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.sectionTitle, { fontSize: 12, color: '#22c55e' }]}>Strong Moments</Text>
              {groupedMarkers.strong.map((marker, index) => (
                <View key={index} style={styles.timelineItem}>
                  <Text style={[styles.timestamp, { color: '#22c55e' }]}>
                    {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                  </Text>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                </View>
              ))}
            </View>
          )}

          {groupedMarkers.attention.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.sectionTitle, { fontSize: 12, color: '#eab308' }]}>Needs Attention</Text>
              {groupedMarkers.attention.map((marker, index) => (
                <View key={index} style={styles.timelineItem}>
                  <Text style={[styles.timestamp, { color: '#eab308' }]}>
                    {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                  </Text>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                </View>
              ))}
            </View>
          )}

          {groupedMarkers.critical.length > 0 && (
            <View>
              <Text style={[styles.sectionTitle, { fontSize: 12, color: '#ef4444' }]}>Critical Issues</Text>
              {groupedMarkers.critical.map((marker, index) => (
                <View key={index} style={styles.timelineItem}>
                  <Text style={[styles.timestamp, { color: '#ef4444' }]}>
                    {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                  </Text>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by RipClip — AI-powered video analysis tool for creators.
        </Text>
      </Page>
    </Document>
  );
};

// ReportsPage Component - Now with API Integration
const ReportsPage = () => {
  const [activeMetricId, setActiveMetricId] = useState(null);
  const [playheadMs, setPlayheadMs] = useState(0);
  const [highlightedListItem, setHighlightedListItem] = useState(null);
  const [pulsingMarkers, setPulsingMarkers] = useState(new Set());
  
  // API state
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Export handlers
  const handleExportPDF = async () => {
    try {
      if (!reportData) return;
      
      setExportLoading(true);
      showToast('Generating PDF...', 'info');
      
      const blob = await pdf(<ReportPDF reportData={reportData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RipClip-Report-${reportData.clipId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      showToast('PDF exported successfully!', 'success');
    } catch (error) {
      console.error('PDF export failed:', error);
      showToast('Export failed — try again', 'error');
    } finally {
      setExportLoading(false);
    }
  };

  const handleCopyNotes = async () => {
    try {
      if (!reportData) return;
      
      const { clipId, ripScore, aiSummary } = reportData;
      const notesText = `RipClip Report — ${clipId} RipScore: ${ripScore}/100 Summary: ${aiSummary.oneLiner} Top Fixes: ${aiSummary.topFixes.map((fix, index) => 
        `- [${Math.floor(fix.t / 60)}:${(fix.t % 60).toFixed(1).padStart(4, '0')}] ${fix.action} (${fix.impact})`
      ).join(' ')}`;
      
      await navigator.clipboard.writeText(notesText);
      showToast('Notes copied to clipboard!', 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      showToast('Copy failed — try again', 'error');
    }
  };

  const handleShareReport = () => {
    if (!reportData) return;
    
    const shareUrl = `${window.location.origin}/share/${reportData.clipId}`;
    window.open(shareUrl, '_blank');
    showToast('Report opened in new tab', 'info');
  };

  // Fetch report data from API with fallback
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/reports/demo-clip-001');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('API failed, using fallback demo data:', err);
        try {
          // Fallback to bundled demo JSON
          const fallbackModule = await import('./demo/sample_expected_report.json');
          const fallbackData = fallbackModule.default;
          setReportData(fallbackData);
          setError(null);
          showToast('Using demo data (API offline)', 'info');
        } catch (fallbackErr) {
          console.error('Failed to load fallback data:', fallbackErr);
          setError('Failed to load report data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
            <div className="h-12 bg-muted rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Failed to Load Report</h2>
          <p className="text-red-300 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!reportData) {
    return (
      <div className="p-6">
        <div className="bg-muted/10 border border-muted/30 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-muted-foreground mb-2">No Report Data</h2>
          <p className="text-muted-foreground">Report data is not available.</p>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const { clipId, durationSec, ripScore, metrics, timelineMarkers, aiSummary } = reportData;
  const durationMs = durationSec * 1000;

  // Convert API metrics to the format expected by MetricsGrid
  const metricsData = metrics.map(metric => {
    // Map API metric IDs to our UI format
    const metricConfig = {
      hook: { icon: 'Zap', trend: { direction: 'up', label: '+2 this week' } },
      pacing: { icon: 'Activity', trend: { direction: 'down', label: '-1 this week' } },
      captions: { icon: 'Type', trend: { direction: 'neutral', label: 'No change' } },
      audio: { icon: 'Volume2', trend: { direction: 'up', label: '+3 this week' } },
      virality: { icon: 'Share2', trend: { direction: 'up', label: '+6 this week' } },
      retention: { icon: 'Users', trend: { direction: 'down', label: '-2 this week' } },
      platform: { icon: 'Target', trend: { direction: 'up', label: '+1 this week' } },
      structure: { icon: 'TrendingUp', trend: { direction: 'up', label: '+1 this week' } }
    };

    const config = metricConfig[metric.id] || { icon: 'TrendingUp', trend: { direction: 'neutral', label: 'No change' } };
    
    return {
      id: metric.id,
      label: metric.label,
      score: metric.score,
      icon: config.icon,
      trend: config.trend
    };
  });

  // Group timeline markers by severity for the lists
  const groupedMarkers = {
    strong: timelineMarkers.filter(m => m.severity === 'strong'),
    attention: timelineMarkers.filter(m => m.severity === 'attention'),
    critical: timelineMarkers.filter(m => m.severity === 'critical')
  };

  const handleMetricClick = (metricId) => {
    if (activeMetricId === metricId) {
      setActiveMetricId(null);
      setPulsingMarkers(new Set());
    } else {
      setActiveMetricId(metricId);
      
      // Find markers related to this metric and pulse them
      const relatedMarkers = timelineMarkers
        .filter(marker => marker.metric === metricId)
        .map(marker => marker.t);
      
      setPulsingMarkers(new Set(relatedMarkers));
      
      // Clear pulsing after animation
      setTimeout(() => {
        setPulsingMarkers(new Set());
      }, 600);
    }
  };

  const handleClearFilter = () => {
    setActiveMetricId(null);
    setPulsingMarkers(new Set());
  };

  const handleMarkerClick = (markerTime) => {
    setPlayheadMs(markerTime * 1000);
    
    // Find and highlight the corresponding list item
    const marker = timelineMarkers.find(m => m.t === markerTime);
    if (marker) {
      const listItemId = `${marker.severity}-${markerTime}`;
      setHighlightedListItem(listItemId);
      
      // Clear highlight after animation
      setTimeout(() => {
        setHighlightedListItem(null);
      }, 1500);
    }
  };

  const handleListItemClick = (markerTime) => {
    setPlayheadMs(markerTime * 1000);
    
    // Pulse the corresponding marker
    setPulsingMarkers(new Set([markerTime]));
    
    // Clear pulsing after animation
    setTimeout(() => {
      setPulsingMarkers(new Set());
    }, 600);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Reports - Clip Doctor Report</h1>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-muted-foreground">Analyzing: {clipId}</h2>
            <p className="text-sm text-muted-foreground">Click markers on timeline or items in lists to see linkage</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-ripclip-cyan">RipScore: {ripScore}</div>
            <div className="text-sm text-muted-foreground">Duration: {durationSec}s</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <h3 className="card-subtitle">Performance Timeline</h3>
        <Timeline 
          durationMs={durationMs}
          markers={timelineMarkers}
          playheadMs={playheadMs}
          onMarkerClick={handleMarkerClick}
          pulsingMarkers={pulsingMarkers}
        />
        
        {/* Legend */}
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded rotate-45"></div>
            <span>Strong moments ({groupedMarkers.strong.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded rotate-45"></div>
            <span>Needs attention ({groupedMarkers.attention.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded rotate-45"></div>
            <span>Critical issues ({groupedMarkers.critical.length})</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid 
        metricsData={metricsData}
        activeMetricId={activeMetricId}
        onMetricClick={handleMetricClick}
        onClearFilter={handleClearFilter}
      />

      {/* Analysis Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strong Moments */}
        <div className="card">
          <h4 className="card-subtitle flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded rotate-45"></div>
            <span>Strong Moments</span>
            <span className="text-sm text-muted-foreground">({groupedMarkers.strong.length})</span>
          </h4>
          <div className="insights-list">
            {groupedMarkers.strong.map((marker) => {
              const listItemId = `strong-${marker.t}`;
              const isHighlighted = highlightedListItem === listItemId;
              return (
                <button
                  key={marker.t}
                  onClick={() => handleListItemClick(marker.t)}
                  className={`list-item ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="list-timestamp text-green-400">
                      {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="list-title">{marker.title}</div>
                  <div className="text-xs text-muted-foreground">{marker.note}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="card">
          <h4 className="card-subtitle flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded rotate-45"></div>
            <span>Needs Attention</span>
            <span className="text-sm text-muted-foreground">({groupedMarkers.attention.length})</span>
          </h4>
          <div className="insights-list">
            {groupedMarkers.attention.map((marker) => {
              const listItemId = `attention-${marker.t}`;
              const isHighlighted = highlightedListItem === listItemId;
              return (
                <button
                  key={marker.t}
                  onClick={() => handleListItemClick(marker.t)}
                  className={`list-item ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="list-timestamp text-yellow-400">
                      {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                    </span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="list-title">{marker.title}</div>
                  <div className="text-xs text-muted-foreground">{marker.note}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Critical Issues */}
        <div className="card">
          <h4 className="card-subtitle flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded rotate-45"></div>
            <span>Critical Issues</span>
            <span className="text-sm text-muted-foreground">({groupedMarkers.critical.length})</span>
          </h4>
          <div className="insights-list">
            {groupedMarkers.critical.map((marker) => {
              const listItemId = `critical-${marker.t}`;
              const isHighlighted = highlightedListItem === listItemId;
              return (
                <button
                  key={marker.t}
                  onClick={() => handleListItemClick(marker.t)}
                  className={`list-item ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="list-timestamp text-red-400">
                      {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                    </span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="list-title">{marker.title}</div>
                  <div className="text-xs text-muted-foreground">{marker.note}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      {aiSummary && (
        <div className="ai-summary">
          <h3 className="ai-summary-title flex items-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-r from-ripclip-cyan to-ripclip-purple rounded"></div>
            <span>AI Summary</span>
          </h3>
          
          {/* One-liner */}
          <div className="ai-summary-text">
            <p className="text-lg font-medium">{aiSummary.oneLiner}</p>
          </div>

          {/* Top Fixes */}
          <div>
            <h4 className="ai-fixes-title">Top 3 Fixes</h4>
            <div className="space-y-3">
              {aiSummary.topFixes.map((fix, index) => (
                <div key={index} className="ai-fix-item">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-ripclip-cyan/20 text-ripclip-cyan rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="ai-fix-text">{fix.action}</div>
                      <div className="text-sm text-muted-foreground">
                        At {Math.floor(fix.t / 60)}:{(fix.t % 60).toFixed(1).padStart(4, '0')}
                      </div>
                    </div>
                  </div>
                  <div className="ai-fix-impact">{fix.impact}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Export Buttons */}
          <div className="export-buttons">
            <button
              onClick={handleExportPDF}
              disabled={exportLoading}
              className={`export-btn export-btn-cyan ${exportLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {exportLoading ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              <span>{exportLoading ? 'Generating...' : 'Export PDF'}</span>
            </button>
            
            <button
              onClick={handleCopyNotes}
              className="export-btn export-btn-gray"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Notes</span>
            </button>
            
            <button
              onClick={handleShareReport}
              className="export-btn export-btn-purple"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share Report</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
          toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
          'bg-blue-500/10 border-blue-500/20 text-blue-400'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Demo Instructions */}
      <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
        <h4 className="font-semibold mb-2 text-blue-400">🎯 Demo Instructions</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>Click diamond markers</strong> on timeline → moves playhead & highlights list item</li>
          <li>• <strong>Click list items</strong> → moves playhead & pulses corresponding marker</li>
          <li>• <strong>Hover markers</strong> → shows tooltip with timestamp & title</li>
          <li>• <strong>One-to-one linkage</strong> → every marker maps to exactly one list item</li>
          <li>• <strong>API-powered</strong> → All data now comes from Flask backend!</li>
        </ul>
      </div>
    </div>
  );
};

// ShareReport Component - Read-only version for public sharing
const ShareReport = () => {
  const { clipId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch report data from API with fallback
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/reports/${clipId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error('API failed, using fallback demo data:', error);
        try {
          // Fallback to bundled demo JSON
          const fallbackModule = await import('./demo/sample_expected_report.json');
          const fallbackData = fallbackModule.default;
          setReportData(fallbackData);
          setError(null);
        } catch (fallbackErr) {
          console.error('Failed to load fallback data:', fallbackErr);
          setError('Failed to load report data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (clipId) {
      fetchReportData();
    }
  }, [clipId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ripclip-cyan mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading shared report...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
          <p className="text-muted-foreground mb-4">The shared report could not be loaded.</p>
          <p className="text-sm text-muted-foreground">Error: {error}</p>
        </div>
      </div>
    );
  }

  const { ripScore, durationSec, metrics, timelineMarkers, aiSummary } = reportData;

  // Group markers by severity
  const groupedMarkers = {
    strong: timelineMarkers.filter(m => m.severity === 'strong'),
    attention: timelineMarkers.filter(m => m.severity === 'attention'),
    critical: timelineMarkers.filter(m => m.severity === 'critical'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-center space-x-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-yellow-500 font-medium">🔒 Demo Mode — public link not secure</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">RipClip Report</h1>
              <p className="text-muted-foreground mt-1">Shared Analysis for {clipId}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-ripclip-cyan">RipScore: {ripScore}</div>
              <div className="text-sm text-muted-foreground">Duration: {durationSec}s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* AI Summary */}
        {aiSummary && (
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-ripclip-cyan to-ripclip-purple rounded"></div>
              <span>AI Summary</span>
            </h3>
            
            {/* One-liner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-ripclip-cyan/10 to-ripclip-purple/10 rounded-lg border border-ripclip-cyan/20">
              <p className="text-lg font-medium">{aiSummary.oneLiner}</p>
            </div>

            {/* Top Fixes */}
            <div>
              <h4 className="font-semibold mb-3">Top 3 Fixes</h4>
              <div className="space-y-3">
                {aiSummary.topFixes.map((fix, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-ripclip-cyan/20 text-ripclip-cyan rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{fix.action}</div>
                        <div className="text-sm text-muted-foreground">
                          At {Math.floor(fix.t / 60)}:{(fix.t % 60).toFixed(1).padStart(4, '0')}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-400">{fix.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-muted/10 p-4 rounded-lg border border-muted/20">
                <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                <div className={`text-2xl font-bold ${
                  metric.score >= 85 ? 'text-green-400' : 
                  metric.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metric.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Insights */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6">Timeline Insights</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Strong Moments */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded rotate-45"></div>
                <span>Strong Moments</span>
                <span className="text-sm text-muted-foreground">({groupedMarkers.strong.length})</span>
              </h4>
              <div className="space-y-3">
                {groupedMarkers.strong.map((marker) => (
                  <div key={marker.t} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-green-400">
                        {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="font-medium text-sm mb-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground">{marker.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs Attention */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded rotate-45"></div>
                <span>Needs Attention</span>
                <span className="text-sm text-muted-foreground">({groupedMarkers.attention.length})</span>
              </h4>
              <div className="space-y-3">
                {groupedMarkers.attention.map((marker) => (
                  <div key={marker.t} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-yellow-400">
                        {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                      </span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="font-medium text-sm mb-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground">{marker.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Issues */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded rotate-45"></div>
                <span>Critical Issues</span>
                <span className="text-sm text-muted-foreground">({groupedMarkers.critical.length})</span>
              </h4>
              <div className="space-y-3">
                {groupedMarkers.critical.map((marker) => (
                  <div key={marker.t} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-red-400">
                        {Math.floor(marker.t / 60)}:{(marker.t % 60).toFixed(1).padStart(4, '0')}
                      </span>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="font-medium text-sm mb-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground">{marker.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            Generated by <span className="text-ripclip-cyan font-semibold">RipClip</span> — AI-powered video analysis tool for creators
          </p>
        </div>
      </div>
    </div>
  );
};

// Settings Component
const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground">Settings page coming soon...</p>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/clips" element={<ClipsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/share/:clipId" element={<ShareReport />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

