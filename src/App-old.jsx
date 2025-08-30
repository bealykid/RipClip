import React, { useState } from 'react';
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
      metrics: { hook: 72, pacing: 81, captions: 82 }
    },
    {
      id: 3,
      title: "EpicFailClip.mp4",
      platform: "YouTube",
      duration: "1:12",
      views: 3400,
      score: 65,
      engagement: 5.8,
      date: "Aug 24",
      thumbnail: "🎬",
      metrics: { hook: 58, pacing: 68, captions: 72 }
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
      thumbnail: "🎬",
      isHot: true,
      metrics: { hook: 91, pacing: 85, captions: 89 }
    }
  ]
};

// Utility to get dynamic greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', description: 'Overview & analytics' },
    { icon: Upload, label: 'Upload', path: '/upload', description: 'Analyze new clips' },
    { icon: Video, label: 'My Clips', path: '/clips', description: 'Manage your library' },
    { icon: BarChart3, label: 'Reports', path: '/reports', description: 'Detailed insights' },
    { icon: Settings, label: 'Settings', path: '/settings', description: 'Account & preferences' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link to="/" className="flex items-center space-x-3">
            <img src={ripclipLogo} alt="RipClip" className="w-10 h-10" />
            <span className="ripclip-logo text-xl">RipClip</span>
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-accent rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'}`} />
                <div className="flex-1">
                  <div className={`font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-ripclip rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Steve Creator</div>
              <div className="text-xs text-muted-foreground">Pro Plan • Connect YouTube</div>
            </div>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </>
  );
};

// Header Component
const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const greeting = getGreeting();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/upload': return 'Upload';
      case '/clips': return 'My Clips';
      case '/reports': return 'Reports';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };
  
  const getPageSubtitle = () => {
    switch (location.pathname) {
      case '/': return `${greeting}, Steve — Ready to rip?`;
      case '/upload': return 'Analyze new clips';
      case '/clips': return 'Manage your library';
      case '/reports': return 'Detailed insights';
      case '/settings': return 'Account & preferences';
      default: return `${greeting}, Steve — Ready to rip?`;
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            <p className="text-sm text-muted-foreground">{getPageSubtitle()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search clips..." 
              className="pl-10 pr-4 py-2 bg-accent rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <button className="p-2 hover:bg-accent rounded-md relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 hover:bg-accent rounded-md">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

// Score Ring Component
const ScoreRing = ({ score, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--ripclip-cyan)';
    if (score >= 60) return 'var(--ripclip-sunrise)';
    return 'var(--ripclip-magenta)';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{score}</span>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false); // Simulate connection status
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-gradient-ripclip p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect Your YouTube Channel</h3>
              <p className="text-white/80 mb-4">Get real analytics and performance insights for your content.</p>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Connect YouTube
              </button>
            </div>
            <div className="text-6xl opacity-50">📊</div>
          </div>
        </div>
      )}

      {/* Hero Metrics - Only show if connected */}
      {isConnected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border card-hover animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clips</p>
                <p className="text-2xl font-bold">{mockData.totalClips}</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% this month
                </p>
              </div>
              <Video className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border card-hover animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg RipScore</p>
                <p className="text-2xl font-bold">{mockData.avgRipScore}/100</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% this week
                </p>
              </div>
              <ScoreRing score={mockData.avgRipScore} size={50} strokeWidth={4} />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border card-hover animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{(mockData.totalViews / 1000).toFixed(1)}K</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +24% this week
                </p>
              </div>
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border card-hover animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">{mockData.engagement}%</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1% this week
                </p>
              </div>
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card p-8 rounded-xl border border-border text-center">
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="text-lg font-semibold mb-2">Start Analyzing Your Content</h3>
          <p className="text-muted-foreground mb-4">Upload your first clip to get AI-powered insights and coaching.</p>
          <Link to="/upload" className="bg-gradient-ripclip text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity inline-block btn-premium">
            Upload Your First Clip
          </Link>
        </div>
      )}

      {/* Performance Trend - Only show if connected */}
      {isConnected && (
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
          <p className="text-muted-foreground mb-4">Your content performance over time</p>
          <div className="h-64 bg-gradient-ripclip-subtle rounded-lg relative overflow-hidden">
            {/* Mock Chart Data */}
            <div className="absolute inset-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Performance line */}
                <path
                  d="M 20 160 Q 80 140 120 120 T 200 100 T 280 80 T 360 60"
                  fill="none"
                  stroke="var(--ripclip-cyan)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Data points */}
                {[
                  { x: 20, y: 160, score: 65 },
                  { x: 80, y: 140, score: 72 },
                  { x: 140, y: 120, score: 78 },
                  { x: 200, y: 100, score: 82 },
                  { x: 260, y: 80, score: 88 },
                  { x: 320, y: 60, score: 92 }
                ].map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="var(--ripclip-cyan)"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                    <text
                      x={point.x}
                      y={point.y - 10}
                      textAnchor="middle"
                      className="text-xs fill-current opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {point.score}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Chart labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>6 weeks ago</span>
                <span>4 weeks ago</span>
                <span>2 weeks ago</span>
                <span>This week</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
              </div>
            </div>
            
            {/* Trend indicator */}
            <div className="absolute top-4 right-4 bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              ↗ +27% improvement
            </div>
          </div>
        </div>
      )}

      {/* Recent Clips */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Clips</h3>
          <Link to="/clips" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        
        <div className="space-y-4">
          {mockData.recentClips.map((clip) => (
            <div key={clip.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-ripclip-subtle rounded-lg flex items-center justify-center text-2xl">
                  {clip.thumbnail}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-card border border-border rounded px-1 text-xs">
                  {clip.duration}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium truncate">{clip.title}</h4>
                  {clip.isHot && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Hot</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{clip.date}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {(clip.views / 1000).toFixed(1)}K
                  </span>
                  <span>{clip.engagement}% engagement</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">{clip.platform}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <ScoreRing score={clip.score} size={60} strokeWidth={4} />
                <div className="space-y-1 text-xs min-w-0">
                  <div className="flex items-center justify-between">
                    <span>Hook</span>
                    <span className="font-medium">{clip.metrics.hook}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pacing</span>
                    <span className="font-medium">{clip.metrics.pacing}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Captions</span>
                    <span className="font-medium">{clip.metrics.captions}/100</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Upload Component
const UploadPage = () => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  const onMockUpload = (f) => {
    setFile(f);
    setProgress(0);
    const id = setInterval(() => setProgress((p) => {
      if (p >= 100) { clearInterval(id); return 100; }
      return p + 10;
    }), 200);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upload New Clip</h2>
        <div className="bg-card p-8 rounded-xl border border-border border-dashed">
          <div className="text-center">
            {!file && progress === 0 && (
              <>
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Drop your video here</h3>
                <p className="text-muted-foreground mb-4">Or click to browse files</p>
                <button 
                  onClick={() => onMockUpload({ name: "Uploaded_Clip.mp4" })}
                  className="bg-gradient-ripclip text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Choose File
                </button>
              </>
            )}

            {progress > 0 && progress < 100 && (
              <div className="w-full">
                <div className="mb-2 text-sm text-muted-foreground text-left">Analyzing… {progress}%</div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-gradient-ripclip h-2.5 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {progress === 100 && (
              <div className="text-muted-foreground">
                Upload complete — <Link to="/reports" className="text-primary hover:underline">view report</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// My Clips Component
const ClipsPage = () => {
  const [filterPlatform, setFilterPlatform] = useState('All Platforms');
  const [filterScore, setFilterScore] = useState('Any Score');

  const filteredClips = mockData.recentClips.filter(clip => {
    const platformMatch = filterPlatform === 'All Platforms' || clip.platform === filterPlatform;
    const scoreMatch = filterScore === 'Any Score' || 
                       (filterScore === '80+' && clip.score >= 80) ||
                       (filterScore === '60-79' && clip.score >= 60 && clip.score <= 79) ||
                       (filterScore === '<60' && clip.score < 60);
    return platformMatch && scoreMatch;
  });

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Clips</h2>
        <div className="flex gap-2">
          <select 
            className="bg-accent border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option>All Platforms</option>
            <option>TikTok</option>
            <option>Instagram</option>
            <option>YouTube</option>
          </select>
          <select 
            className="bg-accent border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value)}
          >
            <option>Any Score</option>
            <option>80+</option>
            <option>60-79</option>
            <option>&lt;60</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClips.length > 0 ? (
          filteredClips.map((clip) => (
            <div key={clip.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-ripclip-subtle rounded-lg flex items-center justify-center text-2xl">
                  {clip.thumbnail}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-card border border-border rounded px-1 text-xs">
                  {clip.duration}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{clip.title}</h4>
                  {clip.isHot && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Hot</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{clip.date}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {(clip.views / 1000).toFixed(1)}K
                  </span>
                  <span>{clip.engagement}% engagement</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">{clip.platform}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <ScoreRing score={clip.score} size={60} strokeWidth={4} />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Hook</span>
                    <span>{clip.metrics.hook}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pacing</span>
                    <span>{clip.metrics.pacing}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Captions</span>
                    <span>{clip.metrics.captions}/100</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">No clips found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

// Enhanced Reports Component
const ReportsPage = () => {
  const [selectedClip, setSelectedClip] = useState(mockData.recentClips[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed analysis data
  const detailedAnalysis = {
    timeline: [
      { time: 0, type: 'success', note: 'Strong motion blur entry', detail: 'Perfect opening - motion immediately grabs attention' },
      { time: 1.2, type: 'warning', note: 'Logo hold 0.5s too long', detail: 'Trim to 00:02.12 for sharper impact' },
      { time: 3, type: 'error', note: 'Dead frame before action', detail: 'Cut opens 2 frames late - trim to hand movement' },
      { time: 5.5, type: 'success', note: 'Perfect pacing transition', detail: 'Beat sync creates natural flow' },
      { time: 8, type: 'warning', note: 'Audio dip needs boost', detail: 'Music overpowers dialogue, reduce -3db' },
      { time: 12, type: 'error', note: 'Viewer drop-off point', detail: '40% of viewers leave here - critical fix needed' },
      { time: 15, type: 'success', note: 'Strong hook recovery', detail: 'Text overlay saves engagement' }
    ],
    platformSpecific: {
      tiktok: [
        'Add text overlay at 00:04 - TikTok viewers expect immediate context',
        'Vertical crop losing key action in corners - reframe for 9:16',
        'Hook needs to be under 3 seconds for TikTok algorithm'
      ],
      youtube: [
        'Thumbnail doesn\'t match 00:05 frame - sync them for consistency',
        'Add end screen elements at 00:25 for better retention',
        'Consider longer intro for YouTube\'s algorithm preference'
      ],
      instagram: [
        'Square crop losing key action in corners - adjust framing',
        'Add Instagram-style text animations for better engagement',
        'Story version should be under 15 seconds'
      ]
    },
    editorNotes: {
      hook: {
        score: 95,
        breakdown: [
          { time: '00:00-00:01', status: 'success', note: '✓ Motion blur entry works perfectly', detail: 'Immediate visual interest established' },
          { time: '00:01-00:03', status: 'warning', note: '⚠ Logo hold 0.5s too long (trim to 00:02.12)', detail: 'Static elements lose viewer attention quickly' },
          { time: '00:03-00:04', status: 'error', note: '✗ Dead frame before action (cut earlier or add motion)', detail: 'Frame 72-74 have no movement - delete these' }
        ],
        fixes: [
          'Replace static logo with animated version',
          'Add 2-frame flash transition at 00:03',
          'Boost audio +3db on opening beat',
          'DELETE: Remove frames 72-74 (dead space)'
        ]
      },
      pacing: {
        score: 88,
        breakdown: [
          { time: '00:04-00:08', status: 'success', note: '✓ Excellent rhythm matches music', detail: 'Cut timing perfectly synced to beat' },
          { time: '00:08-00:12', status: 'warning', note: '⚠ Slowdown detected - consider cutting 2s', detail: 'Energy dips here, tighten the edit' },
          { time: '00:12-00:15', status: 'error', note: '✗ Major drop-off point - 40% viewers leave here', detail: 'Critical issue - needs immediate attention' }
        ],
        fixes: [
          'Cut 2 seconds from 00:08-00:12 segment',
          'Add motion graphics at 00:12 to retain viewers',
          'Consider splitting into two separate clips',
          'DELETE: Remove slow-motion section at 00:10'
        ]
      },
      captions: {
        score: 93,
        breakdown: [
          { time: '00:00-00:05', status: 'success', note: '✓ Clean, readable font choice', detail: 'High contrast ensures mobile readability' },
          { time: '00:05-00:10', status: 'success', note: '✓ Good contrast and positioning', detail: 'Text placement doesn\'t obstruct key visuals' },
          { time: '00:10-00:15', status: 'warning', note: '⚠ Animate keyword "WOW" for emphasis', detail: 'Static text misses engagement opportunity' }
        ],
        fixes: [
          'Add bounce animation to "WOW" at 00:12',
          'Increase font size by 10% for mobile',
          'Add subtle drop shadow for better readability',
          'DELETE: Remove redundant text at 00:08'
        ]
      },
      audio: {
        score: 76,
        breakdown: [
          { time: '00:00-00:03', status: 'warning', note: '⚠ Music overpowers dialogue, reduce -3db', detail: 'Dialogue clarity is crucial for engagement' },
          { time: '00:08-00:10', status: 'error', note: '✗ Audio dip creates dead space', detail: 'Silence kills momentum - add audio bridge' },
          { time: '00:12-00:15', status: 'success', note: '✓ Perfect sync with visual beats', detail: 'Audio-visual harmony enhances impact' }
        ],
        fixes: [
          'Reduce background music by 3db throughout',
          'Add audio riser into punchline at 00:15',
          'Normalize dialogue levels for consistency',
          'DELETE: Remove audio gap at 00:09'
        ]
      },
      virality: {
        score: 84,
        breakdown: [
          { time: '00:00-00:03', status: 'success', note: '✓ Hook follows viral pattern', detail: 'Immediate payoff drives shares' },
          { time: '00:03-00:08', status: 'warning', note: '⚠ Missing surprise element', detail: 'Viral content needs unexpected moments' },
          { time: '00:08-00:15', status: 'success', note: '✓ Strong emotional peak', detail: 'Reaction-worthy moment drives engagement' }
        ],
        fixes: [
          'Add unexpected visual at 00:05',
          'Enhance emotional peak with sound effect',
          'Consider adding text overlay for shareability'
        ]
      }
    },
    comparison: {
      topPerformer: 'Similar clips scoring 90+ start with motion in first 0.5s. Yours starts at 1.2s.',
      suggestion: 'Move your action sequence 0.7s earlier for immediate impact.',
      frameComparison: 'Top performers show key action in frame 1. Your key action appears in frame 36.'
    },
    recut: {
      optimal15s: ['00:03-00:06', '00:12-00:15', '00:21-00:24', '00:28-00:34'],
      reasoning: 'This edit removes dead time and maintains peak energy throughout.',
      edl: [
        'V1: 00:03:00 - 00:06:00 (3s)',
        'V1: 00:12:00 - 00:15:00 (3s)', 
        'V1: 00:21:00 - 00:24:00 (3s)',
        'V1: 00:28:00 - 00:34:00 (6s)'
      ]
    }
  };

  const TimelineMarker = ({ marker, onClick }) => {
    const colors = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500'
    };
    
    return (
      <div 
        className={`absolute w-3 h-3 rounded-full ${colors[marker.type]} cursor-pointer transform -translate-x-1/2 hover:scale-125 transition-transform group timeline-marker`}
        style={{ left: `${(marker.time / 30) * 100}%` }}
        onClick={() => onClick(marker)}
      >
        {/* Tooltip */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          <div className="font-semibold">00:{String(Math.floor(marker.time)).padStart(2, '0')}</div>
          <div>{marker.note}</div>
          <div className="text-gray-300 text-xs">{marker.detail}</div>
        </div>
      </div>
    );
  };

  const StatusIcon = ({ status }) => {
    const icons = {
      success: <CheckCircle className="w-4 h-4 text-green-500" />,
      warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      error: <XCircle className="w-4 h-4 text-red-500" />
    };
    return icons[status];
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Clip Selector */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-xl font-semibold mb-4">Clip Doctor Report</h2>
        <div className="flex items-center space-x-4">
          <select 
            className="bg-accent border border-border rounded-lg px-4 py-2"
            value={selectedClip.id}
            onChange={(e) => setSelectedClip(mockData.recentClips.find(c => c.id === e.target.value))}
          >
            {mockData.recentClips.map(clip => (
              <option key={clip.id} value={clip.id}>{clip.title}</option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <ScoreRing score={selectedClip.score} size={40} strokeWidth={3} />
            <span className="font-semibold">{selectedClip.score}/100 RipScore</span>
          </div>
        </div>
      </div>

      {/* Timeline Scrubber */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4">Performance Timeline</h3>
        <div className="relative">
          {/* Timeline bar */}
          <div className="h-12 bg-gradient-ripclip-subtle rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-red-500/20"></div>
            
            {/* Timeline markers */}
            {detailedAnalysis.timeline.map((marker, index) => (
              <TimelineMarker 
                key={index} 
                marker={marker} 
                onClick={(m) => setCurrentTime(m.time)}
              />
            ))}
            
            {/* Playhead */}
            <div 
              className="absolute w-0.5 h-full bg-white shadow-lg"
              style={{ left: `${(currentTime / 30) * 100}%` }}
            />
          </div>
          
          {/* Time labels */}
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0:00</span>
            <span>0:15</span>
            <span>0:30</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Strong moments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Needs attention</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Critical issues</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'hook', label: 'Hook Analysis' },
              { id: 'pacing', label: 'Pacing' },
              { id: 'captions', label: 'Captions' },
              { id: 'audio', label: 'Audio' },
              { id: 'virality', label: 'Virality' },
              { id: 'platform', label: 'Platform Specific' },
              { id: 'recut', label: 'Recut Suggestions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(detailedAnalysis.editorNotes).map(([key, data]) => (
                  <div key={key} className="bg-accent/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{key}</span>
                      <ScoreRing score={data.score} size={30} strokeWidth={3} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {data.fixes.length} fixes suggested
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Issues */}
              <div>
                <h4 className="font-semibold mb-3">Critical Issues to Fix</h4>
                <div className="space-y-3">
                  {detailedAnalysis.timeline
                    .filter(item => item.type === 'error')
                    .map((issue, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <div className="font-medium">00:{String(Math.floor(issue.time)).padStart(2, '0')}</div>
                          <div className="text-sm text-muted-foreground">{issue.note}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Comparison Intelligence */}
              <div className="bg-gradient-ripclip/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Top Performer Comparison
                </h4>
                <p className="text-sm mb-2">{detailedAnalysis.comparison.topPerformer}</p>
                <p className="text-sm font-medium text-primary">{detailedAnalysis.comparison.suggestion}</p>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'recut' && activeTab !== 'virality' && activeTab !== 'platform' && detailedAnalysis.editorNotes[activeTab] && (
            <div className="space-y-6">
              {/* Score and Summary */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold capitalize">{activeTab} Analysis</h3>
                  <p className="text-muted-foreground">Frame-by-frame editorial feedback</p>
                </div>
                <div className="flex items-center space-x-3">
                  <ScoreRing score={detailedAnalysis.editorNotes[activeTab].score} size={60} strokeWidth={4} />
                  <div>
                    <div className="font-semibold">{detailedAnalysis.editorNotes[activeTab].score}/100</div>
                    <div className="text-sm text-muted-foreground">Current Score</div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div>
                <h4 className="font-semibold mb-3">Timestamp Breakdown</h4>
                <div className="space-y-3">
                  {detailedAnalysis.editorNotes[activeTab].breakdown.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <StatusIcon status={item.status} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm bg-accent px-2 py-1 rounded">{item.time}</span>
                        </div>
                        <p className="text-sm">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixes That Would Add Points */}
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">
                  Fixes That Would Add +5 Points
                </h4>
                <ul className="space-y-2">
                  {detailedAnalysis.editorNotes[activeTab].fixes.map((fix, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'virality' && (
            <div className="space-y-6">
              {/* Score and Summary */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Virality Analysis</h3>
                  <p className="text-muted-foreground">Viral potential and shareability factors</p>
                </div>
                <div className="flex items-center space-x-3">
                  <ScoreRing score={detailedAnalysis.editorNotes.virality.score} size={60} strokeWidth={4} />
                  <div>
                    <div className="font-semibold">{detailedAnalysis.editorNotes.virality.score}/100</div>
                    <div className="text-sm text-muted-foreground">Viral Score</div>
                  </div>
                </div>
              </div>

              {/* Viral Elements Breakdown */}
              <div>
                <h4 className="font-semibold mb-3">Viral Elements Analysis</h4>
                <div className="space-y-3">
                  {detailedAnalysis.editorNotes.virality.breakdown.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <StatusIcon status={item.status} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm bg-accent px-2 py-1 rounded">{item.time}</span>
                        </div>
                        <p className="text-sm font-medium">{item.note}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Viral Optimization Fixes */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">
                  Viral Optimization Fixes
                </h4>
                <ul className="space-y-2">
                  {detailedAnalysis.editorNotes.virality.fixes.map((fix, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'platform' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Platform-Specific Optimization</h3>
                <p className="text-muted-foreground">Tailored recommendations for each platform</p>
              </div>

              {/* Platform Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(detailedAnalysis.platformSpecific).map(([platform, recommendations]) => (
                  <div key={platform} className="bg-accent/50 p-4 rounded-lg border border-border">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        platform === 'tiktok' ? 'bg-pink-500' : 
                        platform === 'youtube' ? 'bg-red-500' : 'bg-purple-500'
                      }`}></div>
                      <h4 className="font-semibold capitalize">{platform}</h4>
                    </div>
                    <ul className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Frame Comparison */}
              <div className="bg-gradient-ripclip/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Frame-Level Comparison
                </h4>
                <p className="text-sm">{detailedAnalysis.comparison.frameComparison}</p>
              </div>
            </div>
          )}

          {activeTab === 'recut' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Optimal 15-Second Version</h3>
                <p className="text-muted-foreground mb-4">AI-generated edit decision list for maximum impact</p>
              </div>

              {/* Edit Decision List */}
              <div className="bg-accent/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Recommended Cuts</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {detailedAnalysis.recut.optimal15s.map((cut, index) => (
                    <div key={index} className="bg-card p-3 rounded border border-border text-center">
                      <div className="font-mono text-sm">{cut}</div>
                      <div className="text-xs text-muted-foreground mt-1">Segment {index + 1}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">{detailedAnalysis.recut.reasoning}</p>
              </div>

              {/* Professional EDL */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-3">Edit Decision List (EDL)</h4>
                <div className="bg-black text-green-400 p-4 rounded font-mono text-sm space-y-1">
                  {detailedAnalysis.recut.edl.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Copy this EDL into your editing software for precise cuts
                </p>
              </div>

              {/* Export Options */}
              <div className="flex space-x-4">
                <button className="bg-gradient-ripclip text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Export to Premiere Pro
                </button>
                <button className="bg-accent text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/80 transition-colors">
                  Export to Final Cut Pro
                </button>
                <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
                  Download as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Settings Component (Placeholder for now)
const SettingsPage = () => (
  <div className="p-6 animate-fade-in">
    <h2 className="text-2xl font-bold mb-6">Settings</h2>
    <p className="text-muted-foreground">Account and preferences.</p>
    <p className="text-muted-foreground mt-4">Integration settings for YouTube, TikTok, and Instagram will be configured here.</p>
  </div>
);

// Main App Component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground dark">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-1 lg:ml-0">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            
            <main className="min-h-[calc(100vh-80px)]">
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
