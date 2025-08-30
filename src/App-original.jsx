import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Video,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  TrendingUp,
  Eye,
  Heart,
  Play,
  Share,
  Download,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import './App.css';
import ripclipLogo from './assets/ripclip-logo.png';

// Mock data for the dashboard
const mockData = {
  totalClips: 47,
  avgRipScore: 82,
  totalViews: 125400,
  engagement: 8.7,
  recentClips: [
    {
      id: 1,
      title: "MyFunnyShort.mp4",
      platform: "TikTok",
      duration: "0:45",
      views: 15200,
      score: 92,
      engagement: 12.4,
      date: "Today 3:14p",
      thumbnail: "🎬",
      isHot: true,
      metrics: { hook: 95, pacing: 88, captions: 93 }
    },
    {
      id: 2,
      title: "BirdDance.mov",
      platform: "Instagram",
      duration: "0:32",
      views: 8900,
      score: 78,
      engagement: 9.1,
      date: "Yesterday",
      thumbnail: "🎬",
      isHot: false,
      metrics: { hook: 72, pacing: 81, captions: 82 }
    }
  ]
};

// Score Ring Component
const ScoreRing = ({ score, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
  
  const getColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 70) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">{score}</span>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', description: 'Overview & analytics' },
    { icon: Upload, label: 'Upload', path: '/upload', description: 'Analyze new clips' },
    { icon: Video, label: 'My Clips', path: '/clips', description: 'Manage your library' },
    { icon: BarChart3, label: 'Reports', path: '/reports', description: 'Detailed insights' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3">
          <img src={ripclipLogo} alt="RipClip" className="w-8 h-8" />
          <span className="text-xl font-bold">RipClip</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-ripclip rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Steve Creator</div>
            <div className="text-xs text-muted-foreground">Pro Plan</div>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Good morning, Steve — Ready to rip?</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search clips..."
              className="pl-10 pr-4 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="p-2 hover:bg-accent rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg">
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
      {/* YouTube Connection */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Connect Your YouTube Channel</h2>
            <p className="opacity-90">Get real analytics and performance insights for your content.</p>
          </div>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Connect YouTube
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-card p-8 rounded-xl border border-border text-center">
        <div className="w-16 h-16 bg-gradient-ripclip rounded-full flex items-center justify-center mx-auto mb-4">
          <Video className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Start Analyzing Your Content</h3>
        <p className="text-muted-foreground mb-6">Upload your first clip to get AI-powered insights and coaching.</p>
        <Link to="/upload" className="bg-gradient-ripclip text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Upload Your First Clip
        </Link>
      </div>

      {/* Recent Clips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Clips</h3>
          <Link to="/clips" className="text-primary hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.recentClips.map((clip) => (
            <div key={clip.id} className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{clip.thumbnail}</div>
                  <div>
                    <div className="font-medium">{clip.title}</div>
                    <div className="text-sm text-muted-foreground">{clip.date}</div>
                  </div>
                </div>
                {clip.isHot && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Hot</span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>{clip.duration}</span>
                <span>{clip.views.toLocaleString()}</span>
                <span>{clip.engagement}% engagement</span>
                <span>{clip.platform}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <ScoreRing score={clip.score} size={40} strokeWidth={3} />
                <div className="flex space-x-2">
                  <div className="text-xs bg-accent px-2 py-1 rounded">
                    Hook<br/>{clip.metrics.hook}/100
                  </div>
                  <div className="text-xs bg-accent px-2 py-1 rounded">
                    Pacing<br/>{clip.metrics.pacing}/100
                  </div>
                  <div className="text-xs bg-accent px-2 py-1 rounded">
                    Captions<br/>{clip.metrics.captions}/100
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Upload Page
const UploadPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload</h1>
      <div className="bg-card p-6 rounded-xl border border-border">
        <p className="text-muted-foreground">Upload functionality coming soon...</p>
      </div>
    </div>
  );
};

// Clips Page
const ClipsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Clips</h1>
      <div className="bg-card p-6 rounded-xl border border-border">
        <p className="text-muted-foreground">Clips management coming soon...</p>
      </div>
    </div>
  );
};

// Enhanced Reports Component with Marker-to-List Linkage & Metrics Grid
const ReportsPage = () => {
  const [selectedClip] = useState(mockData.recentClips[0]);
  const [playheadMs, setPlayheadMs] = useState(0);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [activeMetricId, setActiveMetricId] = useState(null);

  // Sample marker data for demonstration
  const reportData = {
    clipId: selectedClip.id,
    durationMs: 30000, // 30 seconds
    markers: [
      // Strong moments (green)
      { id: 'strong-1', tMs: 2000, category: 'strong', title: 'Perfect hook opening', detail: 'Motion blur entry grabs attention immediately', tags: ['hook', 'virality'] },
      { id: 'strong-2', tMs: 8000, category: 'strong', title: 'Beat sync transition', detail: 'Music perfectly matches visual cut', tags: ['pacing', 'audio'] },
      { id: 'strong-3', tMs: 18000, category: 'strong', title: 'Emotional peak', detail: 'Facial expression drives engagement', tags: ['retention10s', 'virality'] },
      
      // Needs attention (yellow)
      { id: 'attention-1', tMs: 5000, category: 'attention', title: 'Logo hold too long', detail: 'Trim by 0.5s for better pacing', tags: ['pacing', 'platformFit'] },
      { id: 'attention-2', tMs: 12000, category: 'attention', title: 'Audio dip', detail: 'Boost dialogue by +2db', tags: ['audio', 'captions'] },
      
      // Critical issues (red)
      { id: 'critical-1', tMs: 15000, category: 'critical', title: 'Dead frame', detail: 'Cut opens 2 frames late - kills momentum', tags: ['pacing', 'retention10s'] },
      { id: 'critical-2', tMs: 25000, category: 'critical', title: 'Drop-off point', detail: '40% of viewers leave here - critical fix needed', tags: ['retention10s', 'hook'] }
    ]
  };

  // Metrics data
  const metricsData = [
    { id: 'ripscore', label: 'RipScore', score: 82, trend: { value: 4, direction: 'up', label: '+4 this week' }, icon: 'TrendingUp', relatedTags: ['hook', 'pacing', 'retention10s'] },
    { id: 'hook', label: 'Hook', score: 95, trend: { value: 2, direction: 'up', label: '+2 this week' }, icon: 'Zap', relatedTags: ['hook'] },
    { id: 'pacing', label: 'Pacing', score: 78, trend: { value: 1, direction: 'down', label: '-1 this week' }, icon: 'Activity', relatedTags: ['pacing'] },
    { id: 'captions', label: 'Captions', score: 88, trend: { value: 0, direction: 'flat', label: 'No change' }, icon: 'Type', relatedTags: ['captions'] },
    { id: 'audio', label: 'Audio', score: 72, trend: { value: 3, direction: 'up', label: '+3 this week' }, icon: 'Volume2', relatedTags: ['audio'] },
    { id: 'virality', label: 'Virality Potential', score: 89, trend: { value: 6, direction: 'up', label: '+6 this week' }, icon: 'Share2', relatedTags: ['virality'] },
    { id: 'retention10s', label: 'Retention @10s', score: 65, trend: { value: 2, direction: 'down', label: '-2 this week' }, icon: 'Users', relatedTags: ['retention10s'] },
    { id: 'platformFit', label: 'Platform Fit', score: 91, trend: { value: 1, direction: 'up', label: '+1 this week' }, icon: 'Target', relatedTags: ['platformFit'] }
  ];

  // Helper functions
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toPct = (timeMs, durationMs) => `${(timeMs / durationMs) * 100}%`;

  // Group markers by category
  const markersByCategory = {
    strong: reportData.markers.filter(m => m.category === 'strong'),
    attention: reportData.markers.filter(m => m.category === 'attention'),
    critical: reportData.markers.filter(m => m.category === 'critical')
  };

  // Handle metric interactions
  const handleMetricClick = (metricId) => {
    setActiveMetricId(activeMetricId === metricId ? null : metricId);
    
    // Pulse related timeline markers
    const metric = metricsData.find(m => m.id === metricId);
    if (metric) {
      metric.relatedTags.forEach(tag => {
        const relatedMarkers = reportData.markers.filter(marker => 
          marker.tags && marker.tags.includes(tag)
        );
        relatedMarkers.forEach(marker => {
          const markerElement = document.getElementById(`marker-${marker.id}`);
          if (markerElement) {
            markerElement.classList.add('pulse-marker');
            setTimeout(() => markerElement.classList.remove('pulse-marker'), 600);
          }
        });
      });
    }
  };

  const handleClearFilter = () => {
    setActiveMetricId(null);
  };
  const handleMarkerClick = (markerId) => {
    const marker = reportData.markers.find(m => m.id === markerId);
    if (marker) {
      setPlayheadMs(marker.tMs);
      setSelectedMarkerId(markerId);
      // Scroll to corresponding list item
      setTimeout(() => {
        const listItem = document.getElementById(`list-item-${markerId}`);
        if (listItem) {
          listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          listItem.classList.add('highlight-flash');
          setTimeout(() => listItem.classList.remove('highlight-flash'), 1500);
        }
      }, 100);
    }
  };

  const handleListItemClick = (markerId) => {
    const marker = reportData.markers.find(m => m.id === markerId);
    if (marker) {
      setPlayheadMs(marker.tMs);
      setSelectedMarkerId(markerId);
      // Pulse the corresponding marker
      const markerElement = document.getElementById(`marker-${markerId}`);
      if (markerElement) {
        markerElement.classList.add('pulse-marker');
        setTimeout(() => markerElement.classList.remove('pulse-marker'), 600);
      }
    }
  };

  // MetricsGrid Component with Full Tooltips & Polish
  const MetricsGrid = ({ activeMetricId, onMetricClick, onClearFilter }) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
    const [hoveredMetric, setHoveredMetric] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const gridRef = useRef(null);

    // Metric definitions for tooltips
    const metricDefinitions = {
      ripscore: "Overall performance score combining all metrics. Higher scores indicate better video performance across all dimensions.",
      hook: "Effectiveness of the first 3-5 seconds in capturing viewer attention. Measures visual impact, audio clarity, and engagement triggers.",
      pacing: "Analysis of cut frequency, rhythm, and visual flow. Optimal pacing keeps viewers engaged without overwhelming them.",
      captions: "Quality assessment of text readability, timing accuracy, and coverage. Good captions improve accessibility and retention.",
      audio: "Balance and clarity of dialog, music, and sound effects. Poor audio is the #1 reason viewers abandon videos.",
      virality: "Potential for viral spread based on novelty, clarity, and call-to-action strength. Combines uniqueness with shareability factors.",
      retention10s: "Predicted percentage of viewers who will still be watching at the 10-second mark. Critical metric for algorithm performance.",
      platformFit: "How well the video matches platform-specific best practices for aspect ratio, length, style, and optimization."
    };

    const getScoreColor = (score) => {
      if (score >= 85) return 'text-green-400';
      if (score >= 70) return 'text-yellow-400';
      return 'text-red-400';
    };

    const getScoreBgColor = (score) => {
      if (score >= 85) return 'bg-green-500/10 border-green-500/30';
      if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/30';
      return 'bg-red-500/10 border-red-500/30';
    };

    const getTrendIcon = (direction) => {
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

    // Keyboard navigation handler
    const handleKeyDown = (e) => {
      if (!isKeyboardNavigation) return;

      const gridCols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1;
      const totalItems = metricsData.length;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, totalItems - 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + gridCols, totalItems - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - gridCols, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onMetricClick(metricsData[focusedIndex].id);
          break;
        case 'Escape':
          e.preventDefault();
          onClearFilter();
          setIsKeyboardNavigation(false);
          break;
        case 'Tab':
          if (!e.shiftKey && focusedIndex === totalItems - 1) {
            setIsKeyboardNavigation(false);
          } else if (e.shiftKey && focusedIndex === 0) {
            setIsKeyboardNavigation(false);
          } else {
            e.preventDefault();
            setFocusedIndex((prev) => e.shiftKey ? Math.max(prev - 1, 0) : Math.min(prev + 1, totalItems - 1));
          }
          break;
        default:
          break;
      }
    };

    // Set up keyboard event listeners
    useEffect(() => {
      if (isKeyboardNavigation) {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [isKeyboardNavigation, focusedIndex]);

    // Focus management
    useEffect(() => {
      if (isKeyboardNavigation && gridRef.current) {
        const buttons = gridRef.current.querySelectorAll('.metric-tile');
        if (buttons[focusedIndex]) {
          buttons[focusedIndex].focus();
        }
      }
    }, [focusedIndex, isKeyboardNavigation]);

    return (
      <div className="bg-card p-6 rounded-xl border border-border relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Performance Metrics</h3>
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
              onFocus={() => {
                setIsKeyboardNavigation(true);
                setFocusedIndex(index);
              }}
              onBlur={() => {
                // Only disable keyboard navigation if focus is leaving the grid entirely
                setTimeout(() => {
                  if (!gridRef.current?.contains(document.activeElement)) {
                    setIsKeyboardNavigation(false);
                  }
                }, 0);
              }}
              className={`metric-tile p-4 rounded-lg border transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                activeMetricId === metric.id 
                  ? 'ring-2 ring-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10' 
                  : 'hover:border-border-hover hover:shadow-md'
              } ${getScoreBgColor(metric.score)} ${
                isKeyboardNavigation && focusedIndex === index 
                  ? 'ring-2 ring-white/50' 
                  : ''
              }`}
              aria-pressed={activeMetricId === metric.id}
              aria-label={`${metric.label}: ${metric.score}/100, ${metric.trend.label}`}
              aria-describedby={hoveredMetric === metric.id ? `tooltip-${metric.id}` : undefined}
              role="gridcell"
              tabIndex={isKeyboardNavigation && focusedIndex === index ? 0 : -1}
            >
              {/* Header: Icon + Label */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`${getScoreColor(metric.score)} transition-all duration-200`}>
                    {getIconComponent(metric.icon)}
                  </div>
                  <span className="font-medium text-sm truncate">{metric.label}</span>
                </div>
                
                {/* Score Badge */}
                <div className={`px-2 py-1 rounded text-sm font-bold ${getScoreColor(metric.score)} bg-current/10 min-w-[2.5rem] text-center`}>
                  {metric.score}
                </div>
              </div>

              {/* Trend */}
              <div className={`text-xs ${getTrendColor(metric.trend.direction)} flex items-center space-x-1`}>
                <span className="text-base leading-none">{getTrendIcon(metric.trend.direction)}</span>
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

        {/* Keyboard navigation help */}
        {isKeyboardNavigation && (
          <div className="mt-4 text-xs text-muted-foreground bg-black/20 px-3 py-2 rounded-lg border border-white/5">
            <span className="font-medium text-blue-400">Keyboard Navigation:</span> Arrow keys to move, Enter/Space to select, Escape to clear, Tab to exit
          </div>
        )}
      </div>
    );
  };

  // Timeline component - Enhanced Premiere-style with Draggable Playhead & Keyboard Controls
  const Timeline = ({ durationMs, markers, playheadMs, onMarkerClick }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragTime, setDragTime] = useState(0);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isFocused, setIsFocused] = useState(false);
    const timelineRef = useRef(null);

    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Convert pixel position to time
    const pixelToTime = (pixelX, rect) => {
      const relativeX = Math.max(0, Math.min(pixelX - rect.left, rect.width));
      return (relativeX / rect.width) * durationMs;
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (!isFocused) return;
      
      let timeStep = 0;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          timeStep = e.shiftKey ? -2000 : -500; // Shift: -2s, Normal: -0.5s
          break;
        case 'ArrowRight':
          e.preventDefault();
          timeStep = e.shiftKey ? 2000 : 500; // Shift: +2s, Normal: +0.5s
          break;
        default:
          return;
      }
      
      const newTime = Math.max(0, Math.min(playheadMs + timeStep, durationMs));
      setPlayheadMs(newTime);
      
      // Check if we're close to a marker and highlight it
      const snapThreshold = 500;
      const nearestMarker = markers.find(marker => 
        Math.abs(marker.tMs - newTime) <= snapThreshold
      );
      
      if (nearestMarker && Math.abs(marker.tMs - newTime) < 100) {
        onMarkerClick(nearestMarker.id);
      }
    };

    // Handle drag start
    const handleDragStart = (e) => {
      if (!timelineRef.current) return;
      
      setIsDragging(true);
      const rect = timelineRef.current.getBoundingClientRect();
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      const newTime = pixelToTime(clientX, rect);
      setDragTime(newTime);
      setDragPosition({ x: clientX, y: clientY });
      setPlayheadMs(newTime);
      
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    // Handle drag move
    const handleDragMove = (e) => {
      if (!isDragging || !timelineRef.current) return;
      
      e.preventDefault();
      const rect = timelineRef.current.getBoundingClientRect();
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      const newTime = pixelToTime(clientX, rect);
      setDragTime(newTime);
      setDragPosition({ x: clientX, y: clientY });
      setPlayheadMs(newTime);
    };

    // Handle drag end
    const handleDragEnd = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Snap to marker if within 0.5s
      const snapThreshold = 500; // 0.5s in ms
      const nearestMarker = markers.find(marker => 
        Math.abs(marker.tMs - dragTime) <= snapThreshold
      );
      
      if (nearestMarker) {
        setPlayheadMs(nearestMarker.tMs);
        onMarkerClick(nearestMarker.id);
      }
    };

    // Set up drag event listeners
    useEffect(() => {
      if (isDragging) {
        const handleMouseMove = (e) => handleDragMove(e);
        const handleMouseUp = () => handleDragEnd();
        const handleTouchMove = (e) => handleDragMove(e);
        const handleTouchEnd = () => handleDragEnd();

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, [isDragging, dragTime, markers, onMarkerClick]);

    // Set up keyboard event listeners
    useEffect(() => {
      if (isFocused) {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [isFocused, playheadMs, markers, onMarkerClick]);

    return (
      <div 
        className={`premiere-timeline relative h-12 mb-6 outline-none ${isFocused ? 'ring-2 ring-blue-500/50' : ''}`}
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
          className="track absolute inset-x-0 top-3 bottom-3 bg-white/6 rounded-lg cursor-pointer"
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
          className={`playhead absolute top-0 bottom-0 w-0.5 bg-white/80 transition-all duration-150 ease-out z-20 shadow-sm ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
          const markerColors = {
            strong: '#1FDB6A',
            attention: '#FFC857', 
            critical: '#FF4D4D'
          };
          
          return (
            <button
              key={marker.id}
              id={`marker-${marker.id}`}
              className="keyframe-marker absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent cursor-pointer z-10 group"
              style={{ left: toPct(marker.tMs, durationMs) }}
              onClick={() => onMarkerClick(marker.id)}
              aria-label={`${marker.title} @ ${formatTime(marker.tMs)}`}
            >
              {/* Diamond keyframe */}
              <div 
                className="keyframe-diamond w-2.5 h-2.5 transform rotate-45 transition-all duration-[120ms] ease-out border border-white/30 group-hover:w-3 group-hover:h-3 group-active:scale-[1.15]"
                style={{ 
                  backgroundColor: markerColors[marker.category],
                  boxShadow: selectedMarkerId === marker.id 
                    ? `0 0 6px ${markerColors[marker.category]}66, 0 0 0 1px rgba(255,255,255,0.5)` 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = `0 0 6px ${markerColors[marker.category]}59`;
                }}
                onMouseLeave={(e) => {
                  if (selectedMarkerId !== marker.id) {
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                <div className="font-semibold font-mono">{formatTime(marker.tMs)}</div>
                <div>{marker.title}</div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports - Clip Doctor Report</h1>
      
      {/* Clip Info */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="font-semibold">Analyzing: {selectedClip.title}</h3>
        <p className="text-sm text-muted-foreground">Click markers on timeline or items in lists to see linkage</p>
      </div>

      {/* Timeline */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4">Performance Timeline</h3>
        
        <Timeline 
          durationMs={reportData.durationMs}
          markers={reportData.markers}
          playheadMs={playheadMs}
          onMarkerClick={handleMarkerClick}
        />
        
        {/* Legend */}
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm rotate-45"></div>
            <span>Strong moments ({markersByCategory.strong.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm rotate-45"></div>
            <span>Needs attention ({markersByCategory.attention.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm rotate-45"></div>
            <span>Critical issues ({markersByCategory.critical.length})</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid 
        activeMetricId={activeMetricId}
        onMetricClick={handleMetricClick}
        onClearFilter={handleClearFilter}
      />

      {/* Three Explicit Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strong Moments */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-sm rotate-45"></div>
            <h4 className="font-semibold text-green-400">Strong Moments</h4>
            <span className="text-sm text-muted-foreground">({markersByCategory.strong.length})</span>
          </div>
          <div className="space-y-3">
            {markersByCategory.strong.map(marker => (
              <div 
                key={marker.id}
                id={`list-item-${marker.id}`}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                  selectedMarkerId === marker.id ? 'bg-green-500/10 ring-1 ring-green-500/30' : 'bg-accent/20'
                }`}
                onClick={() => handleListItemClick(marker.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-green-400">{formatTime(marker.tMs)}</div>
                    <div className="text-sm font-medium mt-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{marker.detail}</div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm rotate-45"></div>
            <h4 className="font-semibold text-yellow-400">Needs Attention</h4>
            <span className="text-sm text-muted-foreground">({markersByCategory.attention.length})</span>
          </div>
          <div className="space-y-3">
            {markersByCategory.attention.map(marker => (
              <div 
                key={marker.id}
                id={`list-item-${marker.id}`}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                  selectedMarkerId === marker.id ? 'bg-yellow-500/10 ring-1 ring-yellow-500/30' : 'bg-accent/20'
                }`}
                onClick={() => handleListItemClick(marker.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-yellow-400">{formatTime(marker.tMs)}</div>
                    <div className="text-sm font-medium mt-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{marker.detail}</div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Issues */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-sm rotate-45"></div>
            <h4 className="font-semibold text-red-400">Critical Issues</h4>
            <span className="text-sm text-muted-foreground">({markersByCategory.critical.length})</span>
          </div>
          <div className="space-y-3">
            {markersByCategory.critical.map(marker => (
              <div 
                key={marker.id}
                id={`list-item-${marker.id}`}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                  selectedMarkerId === marker.id ? 'bg-red-500/10 ring-1 ring-red-500/30' : 'bg-accent/20'
                }`}
                onClick={() => handleListItemClick(marker.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-red-400">{formatTime(marker.tMs)}</div>
                    <div className="text-sm font-medium mt-1">{marker.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{marker.detail}</div>
                  </div>
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="bg-accent/50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">🎯 Demo Instructions</h4>
        <ul className="text-sm space-y-1">
          <li>• <strong>Click diamond markers</strong> on timeline → moves playhead & highlights list item</li>
          <li>• <strong>Click list items</strong> → moves playhead & pulses corresponding marker</li>
          <li>• <strong>Hover markers</strong> → shows tooltip with timestamp & title</li>
          <li>• <strong>One-to-one linkage</strong> → every marker maps to exactly one list item</li>
        </ul>
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
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

