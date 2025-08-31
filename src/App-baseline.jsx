import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Bell, User } from 'lucide-react';
import './css/ripclip-theme.css';
import './css/timeline-sync.css';
import './css/cards-visibility.css';
import './css/reports-cards.css';
import ReportsBoundary from './components/ReportsBoundary';

// Mock data for consistent rendering
const timelineData = {
  markers: [
    { id: 1, time: 2, type: 'Hook', title: 'Logo Introduction', score: 78, note: 'Strong brand presence but logo hold is too long. Consider trimming to 2-3s for better pacing.' },
    { id: 2, time: 5, type: 'Engagement', title: 'Hook Engagement', score: 95, note: 'Perfect hook timing with excellent visual impact. This moment captures attention effectively.' },
    { id: 3, time: 12, type: 'Pacing', title: 'Pacing Transition', score: 82, note: 'Good narrative flow but cuts feel slightly rushed. Consider extending by 0.5s for smoother transition.' },
    { id: 4, time: 18, type: 'Engagement', title: 'Peak Engagement', score: 98, note: 'Excellent moment with perfect timing. This is where the clip shines - great visual storytelling.' },
    { id: 5, time: 25, type: 'Audio', title: 'Audio Quality Issue', score: 45, note: 'Major engagement drop due to unclear dialogue under music. Boost dialogue +3dB for clarity.' },
    { id: 6, time: 28, type: 'CTA', title: 'Recovery Attempt', score: 72, note: 'Good visual recovery but audio issues persist. Consider cutting dead air from 0:26-0:28.' }
  ]
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/my-clips" element={<MyClips />} />
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
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', subtitle: 'Overview & Insights', icon: '📊' },
    { path: '/upload', label: 'Upload Clip', subtitle: 'Add new content', icon: '📤' },
    { path: '/my-clips', label: 'My Clips', subtitle: 'Manage library', icon: '📚' },
    { path: '/reports', label: 'Reports', subtitle: 'Detailed analysis', icon: '📋' },
    { path: '/settings', label: 'Settings', subtitle: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/src/assets/ripclip-logo.png" alt="RipClip" className="logo" />
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <div className="nav-text">
              <div className="nav-label">{item.label}</div>
              <div className="nav-subtitle">{item.subtitle}</div>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search clips, insights..." 
            className="search-input"
          />
        </div>
        <div className="header-actions">
          <button className="header-btn">
            <Bell size={16} />
            <span className="notification-badge">1</span>
          </button>
          <button className="header-btn">
            <User size={16} />
            <span>Steve</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview & Insights</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card green">
          <div className="metric-value">85</div>
          <div className="metric-label">Hook Strength</div>
        </div>
        <div className="metric-card orange">
          <div className="metric-value">78</div>
          <div className="metric-label">Pacing Score</div>
        </div>
        <div className="metric-card cyan">
          <div className="metric-value">92</div>
          <div className="metric-label">Caption Quality</div>
        </div>
        <div className="metric-card red">
          <div className="metric-value">67</div>
          <div className="metric-label">Audio Issues</div>
        </div>
      </div>
    </div>
  );
}

function Upload() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Upload Clip</h1>
        <p>Add new content</p>
      </div>
      <div className="upload-area">
        <p>Drag and drop your video files here</p>
      </div>
    </div>
  );
}

function MyClips() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Clips</h1>
        <p>Manage library</p>
      </div>
      <div className="clips-grid">
        <p>Your clips will appear here</p>
      </div>
    </div>
  );
}

function Reports() {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMoment, setSelectedMoment] = useState(null);
  
  // Safe data access
  const safe = (obj, fallback = {}) => obj || fallback;
  const markers = safe(timelineData?.markers, []);
  
  const formatTime = (seconds) => {
    try {
      const totalFrames = Math.floor(seconds * 30); // 30fps
      const hrs = Math.floor(totalFrames / (30 * 60 * 60));
      const mins = Math.floor((totalFrames % (30 * 60 * 60)) / (30 * 60));
      const secs = Math.floor((totalFrames % (30 * 60)) / 30);
      const frames = totalFrames % 30;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
    } catch (error) {
      return '00:00:00:00';
    }
  };

  const navigateToMarker = (direction) => {
    try {
      const currentIndex = markers.findIndex(m => Math.abs((m?.time || 0) - currentTime) < 0.5);
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : markers.length - 1;
      } else {
        newIndex = currentIndex < markers.length - 1 ? currentIndex + 1 : 0;
      }
      
      if (markers[newIndex]) {
        setCurrentTime(markers[newIndex].time || 0);
      }
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <h1>Clip Doctor - Waveform Integrated</h1>
        <p>demo-clip-001.mp4 • RipScore: 90 • Duration: 30s • Resolution: 1080p</p>
      </div>

      {/* Metrics Grid - EXACT from good screenshot */}
      <div className="metrics-grid-baseline">
        <div className="metric-card-baseline green">
          <div className="metric-value-baseline">85</div>
          <div className="metric-label-baseline">Hook Strength</div>
        </div>
        <div className="metric-card-baseline orange">
          <div className="metric-value-baseline">78</div>
          <div className="metric-label-baseline">Pacing Score</div>
        </div>
        <div className="metric-card-baseline cyan">
          <div className="metric-value-baseline">92</div>
          <div className="metric-label-baseline">Caption Quality</div>
        </div>
        <div className="metric-card-baseline red">
          <div className="metric-value-baseline">67</div>
          <div className="metric-label-baseline">Audio Issues</div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section-baseline">
        <div className="timeline-header-baseline">
          <h2>Professional Timeline</h2>
          <div className="timeline-controls-baseline">
            <div className="master-clock-baseline">{formatTime(currentTime)}</div>
            <div className="timeline-nav-baseline">
              <button onClick={() => navigateToMarker('prev')} className="nav-btn-baseline">
                <ChevronLeft size={16} />
                Prev
              </button>
              <button onClick={() => navigateToMarker('next')} className="nav-btn-baseline">
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="timeline-container-baseline">
          {/* Ruler */}
          <div className="ruler-baseline">
            {[0, 5, 10, 15, 20, 25, 30].map(time => (
              <div key={time} className="ruler-tick-baseline" style={{left: `${(time/30)*100}%`}}>
                <div className="tick-mark-baseline"></div>
                <div className="tick-label-baseline">{time}s</div>
              </div>
            ))}
            
            {/* Markers */}
            {markers.map((marker) => (
              <div 
                key={marker.id}
                className={`marker-baseline ${marker.type.toLowerCase()}`}
                style={{left: `${((marker.time || 0)/30)*100}%`}}
                onClick={() => setCurrentTime(marker.time || 0)}
                title={`${marker.title} - ${marker.score}`}
              >
                <div className="marker-diamond-baseline"></div>
              </div>
            ))}
            
            {/* Playhead */}
            <div 
              className="playhead-baseline" 
              style={{left: `${(currentTime/30)*100}%`}}
            ></div>
          </div>

          {/* Tracks */}
          <div className="tracks-baseline">
            {/* V1 Video Track */}
            <div className="track-baseline video">
              <div className="track-label-baseline">V1</div>
              <div className="clip-baseline v1">
                <span className="clip-name-baseline">demo-clip-001.mp4</span>
              </div>
            </div>

            {/* A1 Audio Track */}
            <div className="track-baseline audio">
              <div className="track-label-baseline">A1</div>
              <div className="clip-baseline a1">
                <span className="clip-name-baseline">demo-clip-001.wav</span>
                <div className="waveform-baseline"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moment-by-Moment Analysis - EXACT 2x3 Grid from good screenshot */}
      <div className="moment-analysis-baseline">
        <h3>Moment-by-Moment Analysis</h3>
        <div className="moment-cards-baseline">
          {markers.map((marker) => (
            <div 
              key={marker.id} 
              className="moment-card-baseline"
              onClick={() => setCurrentTime(marker.time || 0)}
            >
              <div className="moment-header-baseline">
                <div className="moment-time-baseline">{formatTime(marker.time || 0)}</div>
                <div className={`moment-score-baseline ${
                  (marker.score || 0) >= 80 ? 'high' : 
                  (marker.score || 0) >= 60 ? 'medium' : 'low'
                }`}>
                  {marker.score || 0}
                </div>
              </div>
              <div className="moment-title-baseline">{marker.title}</div>
              <div className="moment-note-baseline">{marker.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Editorial Notes */}
      <div className="card-baseline">
        <h3>AI Editorial Notes</h3>
        <p>Your hook shows strong potential with compelling visual storytelling, but the pacing could benefit from tighter editing in the first 8 seconds. The narrative arc builds effectively, though some transitions feel rushed around the 15-second mark. Consider extending key moments for better emotional impact while maintaining the overall energy that makes this content engaging.</p>
        
        <div className="optimal-cut-baseline">
          <h4>Optimal Cut</h4>
          <p>22s from current 30s</p>
        </div>
      </div>

      {/* Priority Fixes */}
      <div className="card-baseline">
        <h3>Priority Fixes</h3>
        <div className="priority-list-baseline">
          <div className="priority-item-baseline high">
            <span className="priority-icon-baseline">🔴</span>
            <div className="priority-content-baseline">
              <div className="priority-title-baseline">Tighten hook opening by 2 seconds</div>
              <div className="priority-time-baseline">00:03 → 00:01</div>
            </div>
            <div className="priority-effort-baseline">low effort</div>
          </div>
          
          <div className="priority-item-baseline medium">
            <span className="priority-icon-baseline">🟡</span>
            <div className="priority-content-baseline">
              <div className="priority-title-baseline">Smooth transition at 00:15 with 0.5s crossfade</div>
              <div className="priority-time-baseline">00:15</div>
            </div>
            <div className="priority-effort-baseline">medium effort</div>
          </div>
          
          <div className="priority-item-baseline low">
            <span className="priority-icon-baseline">🟡</span>
            <div className="priority-content-baseline">
              <div className="priority-title-baseline">Boost audio levels by 3dB</div>
              <div className="priority-time-baseline">00:08-00:12</div>
            </div>
            <div className="priority-effort-baseline">low effort</div>
          </div>
          
          <div className="priority-item-baseline high">
            <span className="priority-icon-baseline">🔴</span>
            <div className="priority-content-baseline">
              <div className="priority-title-baseline">Add 1s pause before final CTA</div>
              <div className="priority-time-baseline">00:28</div>
            </div>
            <div className="priority-effort-baseline">low effort</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Preferences</p>
      </div>
      <div className="card-baseline">
        <p>Settings options will appear here</p>
      </div>
    </div>
  );
}

export default App;

