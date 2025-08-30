import React, { useState, useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { 
  BarChart3, Upload, Video, FileText, Settings, Search, Bell, User,
  TrendingUp, Share, CheckCircle, AlertTriangle, XCircle, Play, Pause
} from 'lucide-react';

// Simple Navigation Component (no routing)
const SimpleNav = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', description: 'Overview & analytics' },
    { id: 'upload', icon: Upload, label: 'Upload', description: 'Analyze new clips' },
    { id: 'clips', icon: Video, label: 'My Clips', description: 'Manage your library' },
    { id: 'reports', icon: FileText, label: 'Reports', description: 'Detailed insights' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'Account & preferences' }
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
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="nav-item-description">{item.description}</div>
                  </div>
                </button>
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

// Simple Header Component
const SimpleHeader = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="header-title">
            {currentPage === 'dashboard' && 'Dashboard'}
            {currentPage === 'reports' && 'Reports'}
            {currentPage === 'upload' && 'Upload'}
            {currentPage === 'clips' && 'My Clips'}
            {currentPage === 'settings' && 'Settings'}
          </h1>
          <p className="header-subtitle">
            {currentPage === 'dashboard' && 'Good morning, Steve — Ready to rip?'}
            {currentPage === 'reports' && 'AI-powered video analysis results'}
            {currentPage !== 'dashboard' && currentPage !== 'reports' && 'Coming soon...'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Demo Report CTA */}
          <button
            onClick={() => setCurrentPage('reports')}
            className="demo-cta"
          >
            View Demo Report
          </button>
          
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

// Timeline Component
const Timeline = ({ durationMs, markers, playheadMs, onMarkerClick, pulsingMarkers }) => {
  const timelineRef = useRef(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getMarkerColor = (severity) => {
    switch (severity) {
      case 'strong': return 'timeline-marker-green';
      case 'attention': return 'timeline-marker-yellow';
      case 'critical': return 'timeline-marker-red';
      default: return 'timeline-marker-green';
    }
  };

  const handleMarkerHover = (marker, event) => {
    setHoveredMarker(marker);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMarkerLeave = () => {
    setHoveredMarker(null);
  };

  return (
    <div className="premiere-timeline" ref={timelineRef}>
      {/* Timeline Track */}
      <div className="timeline-track">
        {/* Playhead */}
        <div 
          className="timeline-playhead"
          style={{ left: `${(playheadMs / durationMs) * 100}%` }}
        />
        
        {/* Markers */}
        {markers.map((marker) => {
          const position = (marker.t * 1000 / durationMs) * 100;
          const isPulsing = pulsingMarkers.has(marker.t);
          
          return (
            <button
              key={marker.t}
              className={`timeline-marker ${getMarkerColor(marker.severity)} ${isPulsing ? 'pulsing' : ''}`}
              style={{ left: `${position}%` }}
              onClick={() => onMarkerClick(marker.t)}
              onMouseEnter={(e) => handleMarkerHover(marker, e)}
              onMouseLeave={handleMarkerLeave}
            >
              <span className="sr-only">{marker.title}</span>
            </button>
          );
        })}
      </div>

      {/* Time Labels */}
      <div className="timeline-labels">
        <span>0:00</span>
        <span>{Math.floor(durationMs / 60000)}:{((durationMs % 60000) / 1000).toFixed(0).padStart(2, '0')}</span>
      </div>

      {/* Tooltip */}
      {hoveredMarker && (
        <div 
          className="timeline-tooltip"
          style={{
            position: 'fixed',
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%) translateY(-100%)',
            zIndex: 1000
          }}
        >
          <div className="timeline-tooltip-content">
            <div className="font-mono text-xs">
              {Math.floor(hoveredMarker.t / 60)}:{(hoveredMarker.t % 60).toFixed(1).padStart(4, '0')}
            </div>
            <div className="font-medium">{hoveredMarker.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// MetricsGrid Component
const MetricsGrid = ({ metricsData, activeMetricId, onMetricClick, onClearFilter }) => {
  const getMetricTileClass = (score) => {
    if (score >= 85) return 'metric-tile-green';
    if (score >= 70) return 'metric-tile-yellow';
    return 'metric-tile-red';
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="card-subtitle">Performance Metrics</h3>
        {activeMetricId && (
          <button
            onClick={onClearFilter}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear Filter
          </button>
        )}
      </div>
      
      <div className="metrics-grid">
        {metricsData.map((metric) => {
          const isActive = activeMetricId === metric.id;
          return (
            <button
              key={metric.id}
              onClick={() => onMetricClick(metric.id)}
              className={`metric-tile ${getMetricTileClass(metric.score)} ${isActive ? 'active' : ''}`}
            >
              <div className="metric-header">
                <span className="metric-label">{metric.label}</span>
                <span className="metric-score">{metric.score}</span>
              </div>
              <div className="metric-trend">
                <span className="metric-trend-icon">{getTrendIcon(metric.trend.direction)}</span>
                <span className="metric-trend-text">{metric.trend.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ setCurrentPage }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with Demo CTA */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to RipClip</h1>
            <p className="text-muted-foreground">AI-powered video analysis for content creators</p>
          </div>
          <button
            onClick={() => setCurrentPage('reports')}
            className="demo-cta text-lg px-6 py-3"
          >
            🎯 View Demo Report
          </button>
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

// Reports Page Component
const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [playheadMs, setPlayheadMs] = useState(0);
  const [activeMetricId, setActiveMetricId] = useState(null);
  const [pulsingMarkers, setPulsingMarkers] = useState(new Set());
  const [highlightedListItem, setHighlightedListItem] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Load demo data
  useEffect(() => {
    const loadDemoData = async () => {
      try {
        setLoading(true);
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use embedded demo data
        const demoData = {
          clipId: "demo-clip-001",
          ripScore: 90,
          durationSec: 30,
          metrics: [
            { id: "hook", label: "Hook", score: 95 },
            { id: "pacing", label: "Pacing", score: 86 },
            { id: "captions", label: "Captions", score: 92 },
            { id: "audio", label: "Audio", score: 78 },
            { id: "virality", label: "Virality", score: 84 },
            { id: "retention", label: "Retention @10s", score: 80 },
            { id: "platform", label: "Platform Fit", score: 89 },
            { id: "structure", label: "Structure", score: 87 }
          ],
          timelineMarkers: [
            { t: 0.6, severity: "strong", title: "Instant motion & premise", note: "Hook lands in first second; clear promise", metric: "hook" },
            { t: 4.0, severity: "critical", title: "Logo freeze", note: "Trim ~0.5s at 0:04 to keep momentum", metric: "pacing" },
            { t: 8.0, severity: "strong", title: "Beat-synced cut", note: "Cut aligns with beat — keep", metric: "pacing" },
            { t: 10.2, severity: "attention", title: "Silence gap", note: "Fill with room tone or tighten cut", metric: "audio" },
            { t: 12.1, severity: "attention", title: "VO under music", note: "Raise VO +2 dB from 0:12–0:13", metric: "audio" },
            { t: 25.0, severity: "critical", title: "Drop‑off risk", note: "Move CTA before 0:22 to retain viewers", metric: "retention" }
          ],
          aiSummary: {
            oneLiner: "Strong hook & captions; trim logo freeze and fix VO dip to push into 90+.",
            topFixes: [
              { action: "Trim logo by ~0.5s", t: 4.0, impact: "+2 RipScore" },
              { action: "Raise VO +2 dB for 1s", t: 12.1, impact: "+1 RipScore" },
              { action: "Insert CTA at ~0:20–0:22", t: 25.0, impact: "+2 RipScore" }
            ]
          }
        };
        
        setReportData(demoData);
        setError(null);
      } catch (err) {
        console.error('Failed to load demo data:', err);
        setError('Failed to load report data');
      } finally {
        setLoading(false);
      }
    };

    loadDemoData();
  }, []);

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

  if (error || !reportData) {
    return (
      <div className="p-6">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Error Loading Report</h1>
          <p className="text-muted-foreground">{error || 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  const { clipId, ripScore, durationSec, metrics, timelineMarkers, aiSummary } = reportData;
  const durationMs = durationSec * 1000;

  // Process metrics data
  const metricConfig = {
    hook: { icon: 'TrendingUp', trend: { direction: 'up', label: '+2 this week' } },
    pacing: { icon: 'Zap', trend: { direction: 'down', label: '-1 this week' } },
    captions: { icon: 'Type', trend: { direction: 'neutral', label: 'No change' } },
    audio: { icon: 'Volume2', trend: { direction: 'up', label: '+3 this week' } },
    virality: { icon: 'Share2', trend: { direction: 'up', label: '+6 this week' } },
    retention: { icon: 'Users', trend: { direction: 'down', label: '-2 this week' } },
    platform: { icon: 'Target', trend: { direction: 'up', label: '+1 this week' } },
    structure: { icon: 'TrendingUp', trend: { direction: 'up', label: '+1 this week' } }
  };

  const metricsData = metrics.map(metric => {
    const config = metricConfig[metric.id] || { icon: 'TrendingUp', trend: { direction: 'neutral', label: 'No change' } };
    return {
      id: metric.id,
      label: metric.label,
      score: metric.score,
      icon: config.icon,
      trend: config.trend
    };
  });

  // Group timeline markers by severity
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
      const relatedMarkers = timelineMarkers
        .filter(marker => marker.metric === metricId)
        .map(marker => marker.t);
      setPulsingMarkers(new Set(relatedMarkers));
      setTimeout(() => setPulsingMarkers(new Set()), 600);
    }
  };

  const handleClearFilter = () => {
    setActiveMetricId(null);
    setPulsingMarkers(new Set());
  };

  const handleMarkerClick = (markerTime) => {
    setPlayheadMs(markerTime * 1000);
    const marker = timelineMarkers.find(m => m.t === markerTime);
    if (marker) {
      const listItemId = `${marker.severity}-${markerTime}`;
      setHighlightedListItem(listItemId);
      setTimeout(() => setHighlightedListItem(null), 1500);
    }
  };

  const handleListItemClick = (markerTime) => {
    setPlayheadMs(markerTime * 1000);
    setPulsingMarkers(new Set([markerTime]));
    setTimeout(() => setPulsingMarkers(new Set()), 600);
  };

  const handleExportPDF = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
      alert('PDF export feature coming soon!');
    }, 2000);
  };

  const handleCopyNotes = () => {
    const notes = timelineMarkers.map(m => `${Math.floor(m.t / 60)}:${(m.t % 60).toFixed(1).padStart(4, '0')} - ${m.title}: ${m.note}`).join('\n');
    navigator.clipboard.writeText(notes);
    alert('Notes copied to clipboard!');
  };

  const handleShareReport = () => {
    alert('Share feature coming soon!');
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

      {/* Demo Instructions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span className="text-2xl">🎯</span>
          <span>Demo Instructions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-2"><strong>• Click diamond markers</strong> on timeline → moves playhead & highlights list item</p>
            <p className="mb-2"><strong>• Click list items</strong> → moves playhead & pulses corresponding marker</p>
          </div>
          <div>
            <p className="mb-2"><strong>• Hover markers</strong> → shows tooltip with timestamp & title</p>
            <p className="mb-2"><strong>• One-to-one linkage</strong> → every marker maps to exactly one list item</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Using demo data (API offline)</strong> — All data now comes from embedded demo content!
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Page Component
const SimplePage = ({ title, children }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="card">
        {children}
      </div>
    </div>
  );
};

// Main App Component (No Router)
function App() {
  const [currentPage, setCurrentPage] = useState('reports'); // Start with reports to show demo

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'reports':
        return <ReportsPage />;
      case 'upload':
        return <SimplePage title="Upload & Analyze"><p className="text-muted-foreground">Upload functionality coming soon...</p></SimplePage>;
      case 'clips':
        return <SimplePage title="My Clips"><p className="text-muted-foreground">Clip management coming soon...</p></SimplePage>;
      case 'settings':
        return <SimplePage title="Settings"><p className="text-muted-foreground">Settings page coming soon...</p></SimplePage>;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <SimpleNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col">
          <SimpleHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

