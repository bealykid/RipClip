import { useState, useEffect } from 'react';
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
  XCircle,
  Clock,
  Zap,
  Target,
  Award,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus,
  FileText,
  Calendar,
  Filter,
  SortDesc,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './App.css';
import './css/ripclip-theme.css';
import './css/timeline-sync.css';
import ripclipLogo from './assets/ripclip-logo.png';
import reportsMockData from './data/reportsMock.json';
import { ReportsBoundary } from './components/ReportsBoundary.jsx';

// Enhanced mock data with all latest features
const mockData = {
  totalClips: 47,
  avgRipScore: 82,
  totalViews: 125400,
  engagement: 8.7,
  weeklyGrowth: 15.3,
  viralPotential: 73,
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
      metrics: { hook: 95, pacing: 88, captions: 93, audio: 89 },
      viralScore: 87,
      trend: "up"
    },
    {
      id: 2,
      title: "BirdDance.mov",
      platform: "Instagram",
      duration: "1:23",
      views: 8900,
      score: 78,
      engagement: 9.2,
      date: "Yesterday 11:22a",
      thumbnail: "🐦",
      isHot: false,
      metrics: { hook: 82, pacing: 75, captions: 80, audio: 76 },
      viralScore: 65,
      trend: "stable"
    },
    {
      id: 3,
      title: "CookingHack.mp4",
      platform: "YouTube",
      duration: "2:15",
      views: 23100,
      score: 85,
      engagement: 11.8,
      date: "2 days ago",
      thumbnail: "👨‍🍳",
      isHot: true,
      metrics: { hook: 88, pacing: 83, captions: 87, audio: 82 },
      viralScore: 79,
      trend: "up"
    },
    {
      id: 4,
      title: "DanceChallenge.mp4",
      platform: "TikTok",
      duration: "0:28",
      views: 22100,
      score: 88,
      engagement: 15.2,
      date: "Aug 23",
      thumbnail: "💃",
      isHot: true,
      metrics: { hook: 91, pacing: 85, captions: 89, audio: 84 },
      viralScore: 82,
      trend: "up"
    }
  ],
  trendingInsights: [
    { type: "hook", message: "Strong openings increase retention by 34%", impact: "high" },
    { type: "pacing", message: "Quick cuts work best for 15-30s content", impact: "medium" },
    { type: "audio", message: "Trending sounds boost discovery by 28%", impact: "high" }
  ]
};

// Enhanced timeline data for Reports
const timelineData = {
  duration: 30,
  moments: [
    {
      id: 1,
      time: 2,
      title: "Hook Opening",
      description: "Strong visual hook but could be tighter. Consider cutting 2 seconds from the opening sequence.",
      score: 78,
      type: "hook",
      track: "video",
      priority: "high"
    },
    {
      id: 2,
      time: 8,
      title: "Pacing Slow",
      description: "Energy dips here. The transition feels sluggish and could benefit from faster cuts.",
      score: 45,
      type: "pacing",
      track: "video",
      priority: "medium"
    },
    {
      id: 3,
      time: 15,
      title: "Strong Engagement",
      description: "Excellent storytelling moment. The visual and audio sync perfectly here.",
      score: 92,
      type: "engagement",
      track: "both",
      priority: "low"
    },
    {
      id: 4,
      time: 22,
      title: "Audio Levels",
      description: "Audio levels drop slightly. Consider boosting by 3dB for consistency.",
      score: 67,
      type: "audio",
      track: "audio",
      priority: "medium"
    },
    {
      id: 5,
      time: 28,
      title: "CTA Timing",
      description: "Call-to-action comes too quickly. Add 1 second pause before final message.",
      score: 73,
      type: "cta",
      track: "video",
      priority: "high"
    }
  ]
};

// Utility functions
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const frames = Math.floor((seconds % 1) * 30); // 30fps
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
};

const getScoreColor = (score) => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // yellow
  return '#ef4444'; // red
};

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
    case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
    default: return <Minus className="w-4 h-4 text-gray-500" />;
  }
};

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', desc: 'Overview & insights' },
    { icon: Upload, label: 'Upload Clip', path: '/upload', desc: 'Add new content' },
    { icon: Video, label: 'My Clips', path: '/clips', desc: 'Manage library' },
    { icon: BarChart3, label: 'Reports', path: '/reports', desc: 'Detailed analysis' },
    { icon: Settings, label: 'Settings', path: '/settings', desc: 'Preferences' }
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      <div className={`fixed left-0 top-0 h-full w-80 rc-sidebar transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center justify-between p-6" style={{borderBottom: '1px solid var(--border)'}}>
          <div className="flex items-center space-x-3">
            <img src={ripclipLogo} alt="RipClip" className="w-8 h-8" />
            <span className="text-xl font-bold" style={{color: 'var(--text)'}}>RipClip</span>
          </div>
          <button onClick={onClose} className="lg:hidden" style={{color: 'var(--muted)'}} onMouseOver={e => e.target.style.color = 'var(--text)'} onMouseOut={e => e.target.style.color = 'var(--muted)'}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`rc-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm opacity-75">{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

// Header Component
const Header = ({ onMenuClick }) => {
  return (
    <header className="rc-header px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden rc-btn-ghost"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--muted)'}} />
            <input
              type="text"
              placeholder="Search clips, insights..."
              className="rc-input pl-10 pr-4 py-2 w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative rc-btn-ghost">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{background: 'var(--marker-red)'}}>3</span>
          </button>
          <button className="flex items-center space-x-2 rc-btn-ghost">
            <User className="w-6 h-6" />
            <span className="hidden md:block">Steve</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Enhanced Dashboard Component with Premium Features
const Dashboard = () => {
  return (
    <div className="rc-main p-6 space-y-6">
      {/* Premium Hero Section */}
      <div className="rc-hero p-8 text-white relative overflow-hidden">
        <div className="rc-hero-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{getGreeting()}, Steve!</h1>
              <p className="text-xl mb-6 opacity-90">
                Your content is performing exceptionally well. Here's your latest pulse.
              </p>
              <div className="flex space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockData.avgRipScore}</div>
                  <div className="text-sm opacity-80">Avg RipScore</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">+{mockData.weeklyGrowth}%</div>
                  <div className="text-sm opacity-80">Weekly Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockData.viralPotential}%</div>
                  <div className="text-sm opacity-80">Viral Potential</div>
                </div>
              </div>
            </div>
            <div className="rc-card-glass p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Pulse</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hook Strength</span>
                  <div className="flex items-center space-x-2">
                    <div className="rc-progress">
                      <div className="rc-progress-bar green" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pacing Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="rc-progress">
                      <div className="rc-progress-bar yellow" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Caption Quality</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-white bg-opacity-20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clips</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.totalClips}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg RipScore</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.avgRipScore}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.totalViews.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.engagement}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Trending Insights</h2>
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="space-y-4">
          {mockData.trendingInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                insight.impact === 'high' ? 'bg-red-100 text-red-600' :
                insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{insight.message}</p>
                <p className="text-sm text-gray-600 capitalize">{insight.impact} impact</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Clips */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Clips</h2>
          <Link to="/clips" className="text-blue-600 hover:text-blue-700 font-medium">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {mockData.recentClips.map((clip) => (
            <div key={clip.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-2xl">{clip.thumbnail}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{clip.title}</h3>
                  {clip.isHot && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      🔥 Hot
                    </span>
                  )}
                  {getTrendIcon(clip.trend)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span>{clip.platform}</span>
                  <span>{clip.duration}</span>
                  <span>{clip.views.toLocaleString()} views</span>
                  <span>{clip.date}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{color: getScoreColor(clip.score)}}>
                  {clip.score}
                </div>
                <div className="text-sm text-gray-600">RipScore</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bulletproof Reports Component - Always Renders with Mock Data
const Reports = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMoment, setSelectedMoment] = useState(null);

  // Safe data accessor with fallbacks
  const safe = (value, fallback) => (value ?? fallback);

  // Use embedded mock data with defensive guards - no network calls, no dependencies
  const clipData = safe(reportsMockData?.clipMeta, {
    filename: "demo-clip-001.mp4",
    ripScore: 90,
    duration: "30s",
    resolution: "1080p"
  });

  const metrics = safe(reportsMockData?.metrics, {
    hookStrength: 85,
    pacingScore: 78,
    captionQuality: 92,
    audioIssues: 67
  });

  const timelineData = safe(reportsMockData?.timeline, {
    duration: 30,
    markers: []
  });

  // Ensure markers is always an array
  const markers = Array.isArray(timelineData?.markers) ? timelineData.markers : [];

  const editorialNotes = safe(reportsMockData?.editorialNotes, {
    summary: "Analysis loading...",
    optimalCut: "—",
    keyInsights: []
  });

  const priorityFixes = Array.isArray(reportsMockData?.priorityFixes) 
    ? reportsMockData.priorityFixes 
    : [];

  // Safe formatTime function with null guards
  const formatTime = (seconds) => {
    try {
      const safeSeconds = Number(seconds) || 0;
      const totalFrames = Math.floor(safeSeconds * 30); // 30fps
      const hrs = Math.floor(safeSeconds / 3600);
      const mins = Math.floor((safeSeconds % 3600) / 60);
      const secs = Math.floor(safeSeconds % 60);
      const frames = totalFrames % 30;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
    } catch (error) {
      console.warn('formatTime error:', error);
      return '00:00:00:00';
    }
  };

  const handleTimelineClick = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = Math.round(percentage * (timelineData?.duration || 30));
      setCurrentTime(Math.max(0, Math.min(time, timelineData?.duration || 30)));
    } catch (error) {
      console.warn('Timeline click error:', error);
    }
  };

  const handleMarkerClick = (moment) => {
    try {
      setCurrentTime(moment?.time || 0);
      setSelectedMoment(moment);
    } catch (error) {
      console.warn('Marker click error:', error);
    }
  };

  const navigateToMarker = (direction) => {
    try {
      const sortedMarkers = [...markers].sort((a, b) => (a?.time || 0) - (b?.time || 0));
      const currentIndex = sortedMarkers.findIndex(m => Math.abs((m?.time || 0) - currentTime) < 0.5);
      
      if (direction === 'prev' && currentIndex > 0) {
        const prevMoment = sortedMarkers[currentIndex - 1];
        setCurrentTime(prevMoment?.time || 0);
        setSelectedMoment(prevMoment);
      } else if (direction === 'next' && currentIndex < sortedMarkers.length - 1) {
        const nextMoment = sortedMarkers[currentIndex + 1];
        setCurrentTime(nextMoment?.time || 0);
        setSelectedMoment(nextMoment);
      }
    } catch (error) {
      console.warn('Navigate to marker error:', error);
    }
  };

  return (
    <div className="rc-main p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{color: 'var(--text)'}}>Clip Doctor - Waveform Integrated</h1>
          <p className="text-muted">{clipData.filename} • RipScore: {clipData.ripScore} • Duration: {clipData.duration} • Resolution: {clipData.resolution}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="rc-card p-6">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{color: 'var(--marker-green)'}}>{metrics.hookStrength}</div>
            <div className="text-small text-muted font-medium">Hook Strength</div>
          </div>
        </div>
        <div className="rc-card p-6">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{color: 'var(--marker-amber)'}}>{metrics.pacingScore}</div>
            <div className="text-small text-muted font-medium">Pacing Score</div>
          </div>
        </div>
        <div className="rc-card p-6">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{color: 'var(--marker-green)'}}>{metrics.captionQuality}</div>
            <div className="text-small text-muted font-medium">Caption Quality</div>
          </div>
        </div>
        <div className="rc-card p-6">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{color: 'var(--marker-red)'}}>{metrics.audioIssues}</div>
            <div className="text-small text-muted font-medium">Audio Issues</div>
          </div>
        </div>
      </div>

      {/* Professional Timeline - UI Sync Exact Specifications */}
      <div className="timeline" data-testid="timeline">
        {/* Master Clock */}
        <div className="master-clock">
          {formatTime(currentTime)}
        </div>

        {/* Timeline Navigation */}
        <div className="timeline-nav">
          <button 
            className="nav-btn"
            onClick={() => navigateToMarker('prev')}
          >
            ⟵ Prev
          </button>
          <button 
            className="nav-btn"
            onClick={() => navigateToMarker('next')}
          >
            Next ⟶
          </button>
        </div>

        {/* Ruler with Markers */}
        <div className="ruler" onClick={handleTimelineClick}>
          {/* Timeline Ticks */}
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i}>
              <div 
                className={`tick ${i % 5 === 0 ? 'major' : 'minor'}`}
                style={{ left: `${(i / 30) * 100}%` }}
              />
              {i % 5 === 0 && (
                <div 
                  className="label"
                  style={{ left: `${(i / 30) * 100}%` }}
                >
                  00:{i.toString().padStart(2, '0')}
                </div>
              )}
            </div>
          ))}

          {/* Timeline Markers */}
          {(timelineData.moments || []).map((moment) => (
            <div
              key={moment.id}
              className={`marker ${
                moment.priority === 'high' ? 'red' : 
                moment.priority === 'medium' ? 'amber' : 
                'green'
              }`}
              style={{ left: `${((moment.time || 0) / (timelineData.duration || 30)) * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTime(moment.time || 0);
                setSelectedMoment(moment);
              }}
            >
              <div className="tooltip">
                {formatTime(moment.time || 0)} - {moment.title || 'Moment'}
              </div>
            </div>
          ))}

          {/* Playhead */}
          <div 
            className="playhead" 
            style={{ left: `${(currentTime / (timelineData.duration || 30)) * 100}%` }}
          />
        </div>

        {/* Tracks Container */}
        <div className="tracks">
          {/* Video Track */}
          <div className="relative">
            <div className="track-label">V1</div>
            <div className="clip v1" onClick={handleTimelineClick}>
              <span className="font-medium text-sm">{clipData.filename}</span>
            </div>
          </div>

          {/* Audio Track with Waveform */}
          <div className="relative">
            <div className="track-label">A1</div>
            <div className="clip a1" onClick={handleTimelineClick}>
              <div className="waveform"></div>
              <span className="font-medium text-sm relative z-10">{clipData.filename.replace('.mp4', '.wav')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Moment Cards - New Section */}
      <div className="moment-cards-section">
        <h3 className="text-lg font-bold mb-4">Moment Analysis</h3>
        <div className="moment-cards-grid">
          {markers.map((marker) => (
            <div 
              key={marker?.id || Math.random()} 
              className="moment-card"
              onClick={() => {
                try {
                  setCurrentTime(marker?.time || 0);
                  setSelectedMoment(marker);
                } catch (error) {
                  console.warn('Moment card click error:', error);
                }
              }}
            >
              <div className="moment-card-header">
                <span className="moment-timestamp">{formatTime(marker?.time || 0)}</span>
                <span className={`moment-type ${(marker?.type || 'unknown').toLowerCase()}`}>{marker?.type || 'Unknown'}</span>
              </div>
              <div className="moment-score-row">
                <span className="moment-score-label">Score</span>
                <div className="moment-score-chip">
                  <div 
                    className={`score-indicator ${
                      (marker?.score || 0) >= 85 ? 'high' : 
                      (marker?.score || 0) >= 70 ? 'medium' : 'low'
                    }`}
                  ></div>
                  <span className="score-value">{marker?.score || 0}</span>
                </div>
              </div>
              <p className="moment-note">{marker?.note || `${marker?.type || 'Moment'} analysis for optimal editing decisions.`}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Moment Analysis */}
      {selectedMoment && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Selected Moment Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{selectedMoment.title}</h4>
              <p className="muted text-sm">{formatTime(selectedMoment.time || 0)} - {selectedMoment.type}</p>
            </div>
            <p className="muted">{selectedMoment.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm muted">Score:</span>
              <span className="font-bold" style={{color: getScoreColor(selectedMoment.score || 0)}}>{selectedMoment.score || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Editorial Notes */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">AI Editorial Notes</h3>
        <p className="muted mb-4">{editorialNotes.summary}</p>
        
        <div className="card p-4">
          <h4 className="font-medium mb-2">Optimal Cut</h4>
          <p className="text-2xl font-bold" style={{color: 'var(--marker-green)'}}>{editorialNotes.optimalCut}</p>
        </div>
      </div>

      {/* Priority Fixes */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Priority Fixes</h3>
        <div className="space-y-3">
          {priorityFixes.map((fix) => (
            <div key={fix.id} className="flex items-center space-x-3 p-3 rounded-lg card">
              <div className={`w-2 h-2 rounded-full ${
                fix.impact === 'high' ? 'bg-red-500' : 
                fix.impact === 'medium' ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium">{fix.title}</p>
                <p className="text-small muted">{fix.timeRange}</p>
              </div>
              <div className="text-small muted">{fix.effort} effort</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// UploadPage Component
const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      }
    }, 200);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Clip</h1>
        <p className="text-gray-600">
          Drop your video file here and get instant AI-powered analysis
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">Uploading...</p>
              <div className="w-64 mx-auto mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drag and drop your video file here
              </p>
              <p className="text-gray-600">or click to browse</p>
            </div>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="video/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Instant Analysis</h3>
          <p className="text-sm text-gray-600">
            Get AI-powered insights within seconds of upload
          </p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Frame-Accurate</h3>
          <p className="text-sm text-gray-600">
            Precise feedback down to individual frames
          </p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">RipScore</h3>
          <p className="text-sm text-gray-600">
            Comprehensive scoring across all metrics
          </p>
        </div>
      </div>
    </div>
  );
};

// My Clips Component
const MyClips = () => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Clips</h1>
          <p className="text-gray-600">{mockData.totalClips} clips in your library</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Platforms</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Score</option>
            <option value="views">Sort by Views</option>
            <option value="engagement">Sort by Engagement</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.recentClips.map((clip) => (
          <div key={clip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
              {clip.thumbnail}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate flex-1">{clip.title}</h3>
                {clip.isHot && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                    🔥 Hot
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>{clip.platform}</span>
                <span>{clip.duration}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-lg font-bold" style={{ color: getScoreColor(clip.score) }}>
                    {clip.score}
                  </div>
                  <div className="text-xs text-gray-600">RipScore</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{clip.views.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">views</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{clip.date}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// SettingsPage Component
const SettingsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Steve"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="steve@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive updates about your clips</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Auto-Analysis</div>
                <div className="text-sm text-gray-600">Automatically analyze uploaded clips</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen" style={{background: 'var(--bg)'}} data-testid="app-shell">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="rc-main flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/clips" element={<MyClips />} />
              <Route path="/reports" element={
                <ReportsBoundary>
                  <Reports />
                </ReportsBoundary>
              } />
              <Route path="/reports-demo" element={
                <ReportsBoundary>
                  <Reports />
                </ReportsBoundary>
              } />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

