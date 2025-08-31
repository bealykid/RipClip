<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RipClip Clip Doctor - Premiere Pro Style</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1e1e1e;
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .app-container {
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            width: 200px;
            background: linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%);
            border-right: 1px solid #3a3a3a;
            padding: 20px 0;
            position: fixed;
            height: 100vh;
            z-index: 100;
        }

        .logo-container {
            padding: 0 20px 30px;
            border-bottom: 1px solid #3a3a3a;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo {
            width: 120px;
            height: auto;
            max-width: 100%;
        }

        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: #8892b0;
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
            position: relative;
        }

        .nav-item:hover {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
            border-left-color: #00d4ff;
        }

        .nav-item.active {
            background: linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%);
            color: #00d4ff;
            border-left-color: #00d4ff;
        }

        .nav-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            background: currentColor;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
        }

        .nav-badge {
            background: #7c3aed;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            margin-left: auto;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            margin-left: 200px;
            padding: 20px;
            background: #1e1e1e;
        }

        /* Status Bar */
        .status-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 100%);
            border: 1px solid #4a4a4a;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .status-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .clip-name {
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #8892b0;
            font-size: 14px;
        }

        .status-value {
            color: #00d4ff;
            font-weight: 600;
        }

        /* Performance Metrics */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .metric-card {
            background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
            border: 1px solid #4a4a4a;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-color);
        }

        .metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .metric-value {
            font-size: 32px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 8px;
        }

        .metric-label {
            color: #8892b0;
            font-size: 14px;
            font-weight: 500;
        }

        .metric-card.hook { --accent-color: #10b981; }
        .metric-card.pacing { --accent-color: #f59e0b; }
        .metric-card.captions { --accent-color: #10b981; }
        .metric-card.audio { --accent-color: #ef4444; }

        /* Timeline Section */
        .timeline-section {
            background: #1e1e1e;
            border: 1px solid #3a3a3a;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .timeline-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 10px 15px;
            background: #2a2a2a;
            border-radius: 8px;
        }

        .timeline-title {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
        }

        .timeline-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        /* Master Clock - Premiere Style */
        .master-clock {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 0.5px;
            min-width: 120px;
            text-align: center;
        }

        .playback-controls {
            display: flex;
            gap: 8px;
        }

        .control-btn {
            width: 32px;
            height: 32px;
            background: #3a3a3a;
            border: 1px solid #4a4a4a;
            border-radius: 4px;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .control-btn:hover {
            background: #4a4a4a;
        }

        .frame-counter {
            color: #8892b0;
            font-size: 12px;
            font-family: 'Courier New', monospace;
            margin-left: auto;
        }

        .zoom-controls {
            display: flex;
            gap: 4px;
        }

        .zoom-btn {
            width: 24px;
            height: 24px;
            background: #3a3a3a;
            border: 1px solid #4a4a4a;
            border-radius: 3px;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            transition: all 0.2s ease;
        }

        .zoom-btn:hover {
            background: #4a4a4a;
        }

        /* Timeline Container */
        .timeline-container {
            background: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 6px;
            position: relative;
            overflow: hidden;
        }

        /* Timeline Header with Ruler */
        .timeline-ruler-header {
            height: 40px;
            background: #2a2a2a;
            border-bottom: 1px solid #3a3a3a;
            position: relative;
            display: flex;
            align-items: center;
        }

        .in-out-markers {
            position: absolute;
            top: 5px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            z-index: 10;
        }

        .in-marker, .out-marker {
            background: #00d4ff;
            color: #000;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }

        .out-marker {
            background: #ef4444;
            color: white;
        }

        /* Time Ruler */
        .time-ruler {
            position: absolute;
            top: 20px;
            left: 60px;
            right: 10px;
            height: 20px;
        }

        .time-tick {
            position: absolute;
            top: 0;
            width: 1px;
            background: #4a4a4a;
            color: #8892b0;
            font-size: 10px;
            text-align: center;
        }

        .time-tick.major {
            height: 15px;
            background: #6a6a6a;
        }

        .time-tick.minor {
            height: 8px;
        }

        .time-label {
            position: absolute;
            top: 16px;
            transform: translateX(-50%);
            font-family: 'Courier New', monospace;
            font-size: 9px;
            color: #8892b0;
            white-space: nowrap;
        }

        /* Tracks Container */
        .tracks-container {
            position: relative;
            display: flex;
            flex-direction: column;
        }

        /* Track */
        .track {
            display: flex;
            border-bottom: 1px solid #2a2a2a;
            position: relative;
        }

        .track:last-child {
            border-bottom: none;
        }

        /* Track Header - Premiere Style */
        .track-header {
            width: 60px;
            background: #2a2a2a;
            border-right: 1px solid #3a3a3a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 8px 4px;
            gap: 4px;
        }

        .track-label {
            font-size: 11px;
            font-weight: bold;
            color: #ffffff;
        }

        .track-controls {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .track-control {
            width: 16px;
            height: 12px;
            background: #3a3a3a;
            border: 1px solid #4a4a4a;
            border-radius: 2px;
            font-size: 8px;
            color: #8892b0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .track-control:hover {
            background: #4a4a4a;
        }

        .track-content {
            flex: 1;
            position: relative;
            overflow: hidden;
        }

        /* Video Track - Premiere Orange */
        .video-track {
            height: 60px;
        }

        .video-track .track-content {
            background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%);
        }

        .video-clip {
            position: absolute;
            top: 8px;
            bottom: 8px;
            left: 10px;
            right: 10px;
            background: linear-gradient(135deg, #d4851a 0%, #b8721a 100%);
            border: 1px solid #e6941a;
            border-radius: 3px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            color: #000;
            font-size: 11px;
            font-weight: 500;
        }

        /* Audio Track - Premiere Green/Blue */
        .audio-track {
            height: 80px;
        }

        .audio-track .track-content {
            background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%);
            position: relative;
        }

        .audio-clip {
            position: absolute;
            top: 8px;
            bottom: 8px;
            left: 10px;
            right: 10px;
            background: linear-gradient(135deg, #1a7a5a 0%, #0d5a3a 100%);
            border: 1px solid #2a8a6a;
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }

        /* Waveform */
        .waveform-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .waveform-overlay {
            width: 100%;
            height: 100%;
            background-image: url('/home/ubuntu/upload/WhiteTransparentWaveform.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.8;
        }

        /* Playhead - Premiere Style */
        .playhead {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #00d4ff;
            z-index: 50;
            cursor: ew-resize;
            transition: left 0.3s ease;
            box-shadow: 0 0 4px rgba(0, 212, 255, 0.5);
        }

        .playhead::before {
            content: '';
            position: absolute;
            top: -8px;
            left: -6px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #00d4ff;
        }

        .playhead.scrubbing {
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.8);
        }

        /* Timeline Markers - Diamond Shape */
        .timeline-marker {
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 10px;
            height: 10px;
            border-radius: 1px;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 40;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .timeline-marker::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%) rotate(-45deg);
            width: 1px;
            height: 6px;
            background: currentColor;
        }

        .timeline-marker:hover {
            transform: translateY(-50%) rotate(45deg) scale(1.2);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .timeline-marker.strong {
            background: #10b981;
            color: #10b981;
        }

        .timeline-marker.attention {
            background: #f59e0b;
            color: #f59e0b;
        }

        .timeline-marker.critical {
            background: #ef4444;
            color: #ef4444;
        }

        /* Tooltip */
        .tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) rotate(-45deg);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 11px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 100;
            margin-bottom: 8px;
        }

        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: rgba(0, 0, 0, 0.9);
        }

        .timeline-marker:hover .tooltip {
            opacity: 1;
        }

        /* Grid Lines */
        .grid-lines {
            position: absolute;
            top: 0;
            left: 60px;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }

        .grid-line {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background: rgba(74, 74, 74, 0.3);
        }

        /* Moment Cards */
        .analysis-section {
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 20px;
        }

        .moment-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }

        .moment-card {
            background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
            border: 1px solid #4a4a4a;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .moment-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-color);
        }

        .moment-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            border-color: var(--accent-color);
        }

        .moment-card.highlighted {
            border-color: var(--accent-color);
            box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.3);
        }

        .moment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .moment-time {
            background: var(--accent-color);
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: bold;
        }

        .moment-score {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
        }

        .moment-title {
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }

        .moment-description {
            color: #8892b0;
            font-size: 14px;
            line-height: 1.5;
        }

        /* AI Editorial Notes */
        .editorial-section {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
        }

        .editorial-notes {
            background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
            border: 1px solid #4a4a4a;
            border-radius: 12px;
            padding: 25px;
        }

        .editorial-title {
            color: #10b981;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .editorial-content {
            color: #e2e8f0;
            line-height: 1.6;
            font-size: 14px;
        }

        .priority-fixes {
            background: linear-gradient(135deg, #3a3a2a 0%, #4a4a3a 100%);
            border: 1px solid #5a5a4a;
            border-radius: 12px;
            padding: 25px;
        }

        .priority-title {
            color: #f59e0b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .fix-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 15px;
            padding: 12px;
            background: rgba(245, 158, 11, 0.1);
            border-radius: 8px;
            border-left: 3px solid #f59e0b;
        }

        .fix-number {
            background: #f59e0b;
            color: #000;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
        }

        .fix-content {
            color: #e2e8f0;
            font-size: 14px;
            line-height: 1.5;
        }

        .optimal-cut {
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #1a3a2a 0%, #2a4a3a 100%);
            border: 1px solid #3a5a4a;
            border-radius: 8px;
        }

        .optimal-label {
            color: #10b981;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .optimal-value {
            color: #10b981;
            font-size: 24px;
            font-weight: bold;
        }

        .optimal-subtitle {
            color: #8892b0;
            font-size: 12px;
            margin-top: 5px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            
            .main-content {
                margin-left: 0;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .editorial-section {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Sidebar -->
        <nav class="sidebar">
            <div class="logo-container">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InJpcGNsaXBHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBkNGZmO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwOTljYztzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojN2MzYWVkO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjx0ZXh0IHg9IjEwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0idXJsKCNyaXBjbGlwR3JhZGllbnQpIj5SaXBDbGlwPC90ZXh0Pgo8cGF0aCBkPSJNMTUgNzVMMTkwIDc1IiBzdHJva2U9InVybCgjcmlwY2xpcEdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0xNzAgNzBMMTkwIDc1TDE3MCA4MFoiIGZpbGw9InVybCgjcmlwY2xpcEdyYWRpZW50KSIvPgo8L3N2Zz4=" alt="RipClip" class="logo">
            </div>
            <a href="#" class="nav-item">
                <div class="nav-icon" style="mask-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22><path d=%22M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z%22/></svg>');"></div>
                <span>Dashboard</span>
                <span class="nav-badge">1</span>
            </a>
            <a href="#" class="nav-item">
                <div class="nav-icon" style="mask-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22><path d=%22M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z%22/></svg>');"></div>
                <span>Upload</span>
                <span class="nav-badge">2</span>
            </a>
            <a href="#" class="nav-item">
                <div class="nav-icon" style="mask-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22><path d=%22M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z%22/></svg>');"></div>
                <span>My Clips</span>
                <span class="nav-badge">3</span>
            </a>
            <a href="#" class="nav-item active">
                <div class="nav-icon" style="mask-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22><path d=%22M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z%22/></svg>');"></div>
                <span>Clip Doctor</span>
                <span class="nav-badge">4</span>
            </a>
            <a href="#" class="nav-item">
                <div class="nav-icon" style="mask-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22><path d=%22M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.98C19.47,12.66 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11.02L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11.02C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.66 4.57,12.98L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.98Z%22/></svg>');"></div>
                <span>Settings</span>
                <span class="nav-badge">5</span>
            </a>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Status Bar -->
            <div class="status-bar">
                <div class="status-left">
                    <div class="clip-name">demo-clip-001</div>
                    <div class="status-item">
                        <span>RipScore:</span>
                        <span class="status-value">90</span>
                    </div>
                    <div class="status-item">
                        <span class="status-value">30s</span>
                    </div>
                    <div class="status-item">
                        <span class="status-value">1080p</span>
                    </div>
                </div>
            </div>

            <!-- Performance Metrics -->
            <div class="metrics-grid">
                <div class="metric-card hook">
                    <div class="metric-value">95</div>
                    <div class="metric-label">Hook</div>
                </div>
                <div class="metric-card pacing">
                    <div class="metric-value">78</div>
                    <div class="metric-label">Pacing</div>
                </div>
                <div class="metric-card captions">
                    <div class="metric-value">92</div>
                    <div class="metric-label">Captions</div>
                </div>
                <div class="metric-card audio">
                    <div class="metric-value">65</div>
                    <div class="metric-label">Audio</div>
                </div>
            </div>

            <!-- Premiere-Style Timeline -->
            <div class="timeline-section">
                <div class="timeline-header">
                    <h2 class="timeline-title">Professional Timeline</h2>
                    <div class="timeline-controls">
                        <div class="master-clock" id="masterClock">00:00:00:00</div>
                        <div class="playback-controls">
                            <button class="control-btn" title="Play">▶</button>
                            <button class="control-btn" title="Pause">⏸</button>
                        </div>
                        <div class="frame-counter">Frame 750 of 900</div>
                        <div class="zoom-controls">
                            <button class="zoom-btn">−</button>
                            <button class="zoom-btn">+</button>
                        </div>
                    </div>
                </div>

                <div class="timeline-container">
                    <!-- Timeline Header with Ruler -->
                    <div class="timeline-ruler-header">
                        <!-- In/Out Markers -->
                        <div class="in-out-markers">
                            <div class="in-marker">IN</div>
                            <div class="out-marker">OUT</div>
                        </div>

                        <!-- Time Ruler -->
                        <div class="time-ruler" id="timeRuler">
                            <!-- Time ticks will be generated by JavaScript -->
                        </div>
                    </div>

                    <!-- Grid Lines -->
                    <div class="grid-lines" id="gridLines">
                        <!-- Grid lines will be generated by JavaScript -->
                    </div>

                    <!-- Tracks -->
                    <div class="tracks-container">
                        <!-- Video Track -->
                        <div class="track video-track">
                            <div class="track-header">
                                <div class="track-label">V1</div>
                                <div class="track-controls">
                                    <div class="track-control">M</div>
                                    <div class="track-control">S</div>
                                    <div class="track-control">🔒</div>
                                </div>
                            </div>
                            <div class="track-content" id="videoTrack">
                                <div class="video-clip">demo-clip-001</div>
                                <!-- Video markers will be placed here -->
                            </div>
                        </div>

                        <!-- Audio Track -->
                        <div class="track audio-track">
                            <div class="track-header">
                                <div class="track-label">A1</div>
                                <div class="track-controls">
                                    <div class="track-control">M</div>
                                    <div class="track-control">S</div>
                                    <div class="track-control">🔒</div>
                                </div>
                            </div>
                            <div class="track-content" id="audioTrack">
                                <div class="audio-clip">
                                    <div class="waveform-container">
                                        <div class="waveform-overlay"></div>
                                    </div>
                                </div>
                                <!-- Audio markers will be placed here -->
                            </div>
                        </div>

                        <!-- Playhead -->
                        <div class="playhead" id="playhead"></div>
                    </div>
                </div>
            </div>

            <!-- Moment-by-Moment Analysis -->
            <div class="analysis-section">
                <h2 class="section-title">Moment-by-Moment Analysis</h2>
                <div class="moment-cards" id="momentCards">
                    <!-- Moment cards will be generated by JavaScript -->
                </div>
            </div>

            <!-- AI Editorial Notes -->
            <div class="analysis-section">
                <h2 class="section-title">AI Editorial Notes</h2>
                <div class="editorial-section">
                    <div class="editorial-notes">
                        <h3 class="editorial-title">Editorial Notes</h3>
                        <div class="editorial-content">
                            This clip has strong bones but needs tightening. Hook works but logo holds too long (0:02-0:05). Peak engagement at 0:18 is excellent - the transition here is perfectly timed. Main issue: 40% drop-off at 0:25 where dialogue becomes unclear under music. The visual storytelling is compelling throughout, but audio mixing needs attention. Consider the pacing around 0:12-0:15 where cuts feel rushed. Overall structure is solid with good narrative flow.
                        </div>
                    </div>

                    <div class="priority-fixes">
                        <h3 class="priority-title">Priority Fixes</h3>
                        
                        <div class="fix-item">
                            <div class="fix-number">1</div>
                            <div class="fix-content">
                                <strong>Trim logo hold to 2.5s</strong> (saves 0.8s) - currently too long at 0:02-0:05
                            </div>
                        </div>

                        <div class="fix-item">
                            <div class="fix-number">2</div>
                            <div class="fix-content">
                                <strong>Cut dead air at 0:25–0:28</strong> where dialogue drops and engagement falls
                            </div>
                        </div>

                        <div class="fix-item">
                            <div class="fix-number">3</div>
                            <div class="fix-content">
                                <strong>Boost dialogue +2db</strong> under music around 0:25 for clarity
                            </div>
                        </div>

                        <div class="optimal-cut">
                            <div class="optimal-label">Optimal Cut</div>
                            <div class="optimal-value">22s</div>
                            <div class="optimal-subtitle">from current 30s</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Timeline data
        const timelineDuration = 30; // 30 seconds
        const timelineWidth = 800; // pixels

        // Moment data with track assignments
        const moments = [
            {
                id: 1,
                time: 2,
                title: "Logo Introduction",
                description: "Strong brand presence but logo hold is too long. Consider trimming to 2.5s for better pacing.",
                score: 78,
                type: "attention",
                track: "video"
            },
            {
                id: 2,
                time: 5,
                title: "Hook Engagement",
                description: "Perfect hook timing with excellent visual impact. This moment captures attention effectively.",
                score: 95,
                type: "strong",
                track: "video"
            },
            {
                id: 3,
                time: 12,
                title: "Pacing Transition",
                description: "Good narrative flow but cuts feel slightly rushed. Consider extending by 0.2s for smoother transition.",
                score: 82,
                type: "attention",
                track: "video"
            },
            {
                id: 4,
                time: 18,
                title: "Peak Engagement",
                description: "Excellent moment with perfect timing. This is where the clip shines - great visual storytelling.",
                score: 98,
                type: "strong",
                track: "video"
            },
            {
                id: 5,
                time: 25,
                title: "Audio Quality Issue",
                description: "Major engagement drop due to unclear dialogue under music. Boost dialogue +2db for clarity.",
                score: 45,
                type: "critical",
                track: "audio"
            },
            {
                id: 6,
                time: 28,
                title: "Recovery Attempt",
                description: "Good visual recovery but audio issues persist. Consider cutting dead air from 0:25-0:28.",
                score: 72,
                type: "attention",
                track: "audio"
            }
        ];

        let currentTime = 0;
        let isDragging = false;

        // Initialize timeline
        function initTimeline() {
            generateTimeRuler();
            generateGridLines();
            generateMarkers();
            generateMomentCards();
            setupPlayheadInteraction();
        }

        // Generate time ruler
        function generateTimeRuler() {
            const ruler = document.getElementById('timeRuler');
            ruler.innerHTML = '';

            for (let i = 0; i <= timelineDuration; i++) {
                const tick = document.createElement('div');
                tick.className = i % 5 === 0 ? 'time-tick major' : 'time-tick minor';
                tick.style.left = `${(i / timelineDuration) * 100}%`;

                if (i % 5 === 0) {
                    const label = document.createElement('div');
                    label.className = 'time-label';
                    label.textContent = formatTimeCode(i);
                    tick.appendChild(label);
                }

                ruler.appendChild(tick);
            }
        }

        // Generate grid lines
        function generateGridLines() {
            const gridContainer = document.getElementById('gridLines');
            gridContainer.innerHTML = '';

            for (let i = 5; i <= timelineDuration; i += 5) {
                const gridLine = document.createElement('div');
                gridLine.className = 'grid-line';
                gridLine.style.left = `${(i / timelineDuration) * 100}%`;
                gridContainer.appendChild(gridLine);
            }
        }

        // Generate timeline markers
        function generateMarkers() {
            const videoTrack = document.getElementById('videoTrack');
            const audioTrack = document.getElementById('audioTrack');

            moments.forEach(moment => {
                const marker = document.createElement('div');
                marker.className = `timeline-marker ${moment.type}`;
                marker.style.left = `${(moment.time / timelineDuration) * 100}%`;
                marker.dataset.momentId = moment.id;

                // Add tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = `${formatTimeCode(moment.time)} - ${moment.title}`;
                marker.appendChild(tooltip);

                // Add click handler
                marker.addEventListener('click', () => {
                    jumpToTime(moment.time);
                    highlightMomentCard(moment.id);
                });

                // Place marker on correct track
                if (moment.track === 'video') {
                    videoTrack.appendChild(marker);
                } else {
                    audioTrack.appendChild(marker);
                }
            });
        }

        // Generate moment cards
        function generateMomentCards() {
            const container = document.getElementById('momentCards');
            container.innerHTML = '';

            moments.forEach(moment => {
                const card = document.createElement('div');
                card.className = 'moment-card';
                card.style.setProperty('--accent-color', getAccentColor(moment.type));
                card.style.setProperty('--accent-rgb', getAccentColorRGB(moment.type));
                card.dataset.momentId = moment.id;

                card.innerHTML = `
                    <div class="moment-header">
                        <div class="moment-time">${formatTimeCode(moment.time)}</div>
                        <div class="moment-score">${moment.score}</div>
                    </div>
                    <div class="moment-title">${moment.title}</div>
                    <div class="moment-description">${moment.description}</div>
                `;

                card.addEventListener('click', () => {
                    jumpToTime(moment.time);
                    highlightMomentCard(moment.id);
                });

                container.appendChild(card);
            });
        }

        // Setup playhead interaction
        function setupPlayheadInteraction() {
            const playhead = document.getElementById('playhead');
            const timelineContainer = document.querySelector('.timeline-container');

            playhead.addEventListener('mousedown', startDragging);
            timelineContainer.addEventListener('click', handleTimelineClick);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', stopDragging);
        }

        function startDragging(e) {
            isDragging = true;
            document.getElementById('playhead').classList.add('scrubbing');
            e.preventDefault();
        }

        function handleDrag(e) {
            if (!isDragging) return;

            const timelineContainer = document.querySelector('.tracks-container');
            const rect = timelineContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - 60; // Account for track header width
            const percentage = Math.max(0, Math.min(100, (x / (rect.width - 60)) * 100));
            
            currentTime = (percentage / 100) * timelineDuration;
            updatePlayhead();
            updateMasterClock();
        }

        function stopDragging() {
            isDragging = false;
            document.getElementById('playhead').classList.remove('scrubbing');
        }

        function handleTimelineClick(e) {
            if (isDragging) return;

            const timelineContainer = document.querySelector('.tracks-container');
            const rect = timelineContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - 60; // Account for track header width
            const percentage = (x / (rect.width - 60)) * 100;
            
            currentTime = (percentage / 100) * timelineDuration;
            updatePlayhead();
            updateMasterClock();
        }

        // Jump to specific time
        function jumpToTime(time) {
            currentTime = time;
            updatePlayhead();
            updateMasterClock();
        }

        // Update playhead position
        function updatePlayhead() {
            const playhead = document.getElementById('playhead');
            const percentage = (currentTime / timelineDuration) * 100;
            playhead.style.left = `calc(60px + ${percentage}% * (100% - 60px) / 100%)`;
        }

        // Update master clock
        function updateMasterClock() {
            const clock = document.getElementById('masterClock');
            clock.textContent = formatTimeCode(currentTime);
        }

        // Highlight moment card
        function highlightMomentCard(momentId) {
            // Remove previous highlights
            document.querySelectorAll('.moment-card').forEach(card => {
                card.classList.remove('highlighted');
            });

            // Add highlight to selected card
            const card = document.querySelector(`[data-moment-id="${momentId}"]`);
            if (card) {
                card.classList.add('highlighted');
            }
        }

        // Utility functions
        function formatTimeCode(seconds) {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            const frames = Math.floor((seconds % 1) * 30); // Assuming 30fps
            
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
        }

        function getAccentColor(type) {
            switch (type) {
                case 'strong': return '#10b981';
                case 'attention': return '#f59e0b';
                case 'critical': return '#ef4444';
                default: return '#8892b0';
            }
        }

        function getAccentColorRGB(type) {
            switch (type) {
                case 'strong': return '16, 185, 129';
                case 'attention': return '245, 158, 11';
                case 'critical': return '239, 68, 68';
                default: return '136, 146, 176';
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', initTimeline);
    </script>
</body>
</html>

