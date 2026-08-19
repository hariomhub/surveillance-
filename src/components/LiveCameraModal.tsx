import React, { useState } from 'react';
import { CameraNode } from '../types';

interface LiveCameraModalProps {
  camera: CameraNode;
  onClose: () => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({ camera, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [nightVision, setNightVision] = useState(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <div
      id="live-camera-modal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-surface-container border border-outline-variant rounded-lg max-w-4xl w-full flex flex-col overflow-hidden shadow-2xl animate-fade-in max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                camera.status === 'ONLINE'
                  ? 'bg-primary animate-pulse'
                  : camera.status === 'DEGRADED'
                  ? 'bg-tertiary'
                  : 'bg-error'
              }`}
            />
            <div>
              <h3 className="font-headline-sm text-on-surface font-bold text-[16px]">
                {camera.code}
              </h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                {camera.zone} • {camera.resolution} @ {camera.fps}fps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-data-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-outline-variant text-on-surface-variant">
              LATENCY: {camera.latency !== null ? `${camera.latency}ms` : 'N/A'}
            </span>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
          {/* Main Feed Image */}
          {camera.feedUrl ? (
            <img
              src={camera.feedUrl}
              alt={`Live feed from ${camera.code}`}
              className={`w-full h-full object-cover transition-all duration-300 ${
                nightVision ? 'hue-rotate-90 contrast-125 brightness-90 saturate-50' : ''
              }`}
              style={{ transform: `scale(${zoomLevel})` }}
            />
          ) : (
            <div className="flex flex-col items-center text-error space-y-2">
              <span className="material-symbols-outlined text-4xl">videocam_off</span>
              <span className="font-data-mono text-sm">NO SIGNAL - FEED OFFLINE</span>
            </div>
          )}

          {/* AI Bounding Boxes Overlay */}
          {showBoundingBoxes && camera.status !== 'OFFLINE' && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Box 1: Vehicle / Object */}
              <div className="absolute top-[32%] left-[28%] w-[24%] h-[38%] border-2 border-secondary/80 bg-secondary/10">
                <span className="absolute -top-5 left-0 bg-secondary text-[#00325b] font-data-mono text-[9px] font-bold px-1 py-0.2 rounded-xs">
                  VEHICLE [96%] LPR: MH01-CV-2023
                </span>
              </div>

              {/* Box 2: Person */}
              <div className="absolute top-[36%] left-[62%] w-[12%] h-[42%] border-2 border-primary/80 bg-primary/10">
                <span className="absolute -top-5 left-0 bg-primary text-[#002f66] font-data-mono text-[9px] font-bold px-1 py-0.2 rounded-xs">
                  PERSON [91%] UNVERIFIED
                </span>
              </div>
            </div>
          )}

          {/* Snapshot Flash Feedback */}
          {snapshotTaken && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center animate-ping pointer-events-none">
              <span className="font-data-mono text-black font-bold text-lg bg-white/90 px-4 py-2 rounded">
                SNAPSHOT SAVED
              </span>
            </div>
          )}

          {/* OSD Telemetry Watermark */}
          <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-white font-data-mono text-[11px] backdrop-blur-xs flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            <span>LIVE INGEST: {camera.ingest || '0.0'} Mbps</span>
          </div>

          <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-white font-data-mono text-[11px] backdrop-blur-xs border border-white/10">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stream Controls Toolbar */}
        <div className="p-3 bg-surface-container border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-on-surface-variant text-[11px] uppercase">
              Optical Zoom:
            </span>
            <button
              onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
              className="w-7 h-7 rounded border border-outline-variant bg-surface hover:bg-surface-variant flex items-center justify-center text-on-surface cursor-pointer"
            >
              -
            </button>
            <span className="font-data-mono text-[11px] text-primary w-8 text-center">
              {zoomLevel.toFixed(2)}x
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
              className="w-7 h-7 rounded border border-outline-variant bg-surface hover:bg-surface-variant flex items-center justify-center text-on-surface cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Feature Toggles */}
          <div className="flex items-center gap-2">
            {/* AI Bounding Boxes Toggle */}
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-3 py-1 rounded border text-xs font-body-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
                showBoundingBoxes
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">select_all</span>
              AI Overlays
            </button>

            {/* Night Vision IR Toggle */}
            <button
              onClick={() => setNightVision(!nightVision)}
              className={`px-3 py-1 rounded border text-xs font-body-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
                nightVision
                  ? 'border-secondary bg-secondary/10 text-secondary font-semibold'
                  : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">nightlight</span>
              IR Filter
            </button>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSnapshot}
              className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-variant text-on-surface font-body-sm text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              Snapshot
            </button>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-3 py-1 rounded border text-xs font-body-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                isRecording
                  ? 'bg-error text-on-error border-error animate-pulse font-bold'
                  : 'border-outline-variant text-on-surface hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">fiber_manual_record</span>
              {isRecording ? 'Recording...' : 'Record Clip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
