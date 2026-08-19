import React, { useState } from 'react';
import { CameraNode } from '../types';

interface CameraFleetViewProps {
  cameras: CameraNode[];
  searchQuery: string;
  onOpenLiveFeed: (camera: CameraNode) => void;
}

export const CameraFleetView: React.FC<CameraFleetViewProps> = ({
  cameras,
  searchQuery,
  onOpenLiveFeed
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All Zones');
  const [offlineOnly, setOfflineOnly] = useState<boolean>(false);

  // Filter cameras
  const filteredCameras = cameras.filter((cam) => {
    if (selectedZone !== 'All Zones') {
      if (selectedZone === 'Perimeter' && cam.zoneCategory !== 'Perimeter') return false;
      if (selectedZone === 'Warehouse A' && cam.zoneCategory !== 'Warehouse A') return false;
      if (selectedZone === 'Loading Dock' && cam.zoneCategory !== 'Loading Dock') return false;
      if (selectedZone === 'Server Room' && cam.zoneCategory !== 'Server Room') return false;
    }
    if (offlineOnly && cam.status !== 'OFFLINE') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        cam.code.toLowerCase().includes(q) ||
        cam.zone.toLowerCase().includes(q) ||
        cam.status.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <main className="md:ml-64 pt-16 p-margin-page flex-1 overflow-y-auto overscroll-contain bg-background flex flex-col gap-6">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline-variant pb-4 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            Camera Fleet Health
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Monitoring 1,402 active nodes across 12 zones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Zone Selector */}
          <div className="relative">
            <select
              id="select-camera-zone"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] text-on-surface rounded py-1.5 pl-3 pr-8 font-body-sm text-body-sm focus:border-primary focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All Zones">All Zones</option>
              <option value="Perimeter">Perimeter</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Loading Dock">Loading Dock</option>
              <option value="Server Room">Server Room</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[16px]">
              expand_more
            </span>
          </div>

          {/* Offline Only Toggle */}
          <button
            id="btn-offline-only-toggle"
            onClick={() => setOfflineOnly(!offlineOnly)}
            className={`tech-border rounded px-4 py-1.5 font-body-sm text-body-sm transition-colors flex items-center gap-2 cursor-pointer ${
              offlineOnly
                ? 'bg-error/20 border-error text-error font-bold shadow-[0_0_8px_rgba(255,180,171,0.2)]'
                : 'bg-[#0F172A] text-on-surface hover:border-[#fca5a5] hover:text-[#fca5a5]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">warning</span>
            Offline Only
          </button>
        </div>
      </div>

      {/* Fleet Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-container-gap">
        {/* KPI 1: Total Nodes */}
        <div
          id="stat-total-nodes"
          className="bg-[#1E293B] tech-border p-4 rounded flex flex-col gap-1 shadow-sm"
        >
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Total Nodes
          </span>
          <span className="font-data-mono text-data-mono text-on-surface text-xl font-bold">
            1,402
          </span>
        </div>

        {/* KPI 2: Global Ingest */}
        <div
          id="stat-global-ingest"
          className="bg-[#1E293B] tech-border p-4 rounded flex flex-col gap-1 shadow-sm"
        >
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Global Ingest
          </span>
          <span className="font-data-mono text-data-mono text-on-surface text-xl font-bold">
            24.5 Gbps
          </span>
        </div>

        {/* KPI 3: Avg Processing Latency */}
        <div
          id="stat-avg-latency"
          className="bg-[#1E293B] tech-border p-4 rounded flex flex-col gap-1 shadow-sm"
        >
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Avg Processing Latency
          </span>
          <span className="font-data-mono text-data-mono text-on-surface text-xl font-bold">
            112ms
          </span>
        </div>

        {/* KPI 4: Critical Alerts */}
        <div
          id="stat-critical-alerts"
          className="bg-[#1E293B] tech-border border-[#fca5a5] p-4 rounded flex flex-col gap-1 relative overflow-hidden shadow-sm"
        >
          <div className="absolute inset-0 bg-[#fca5a5] opacity-5 pointer-events-none" />
          <span className="font-label-caps text-label-caps text-[#fca5a5] uppercase font-bold">
            Critical Alerts
          </span>
          <span className="font-data-mono text-data-mono text-[#fca5a5] text-xl font-bold">
            3
          </span>
        </div>
      </div>

      {/* Grid of Camera Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-container-gap pb-12">
        {filteredCameras.length === 0 ? (
          <div className="col-span-full py-16 text-center text-on-surface-variant font-body-md border border-outline-variant rounded bg-[#1E293B]">
            No camera nodes found for selected zone filter.
          </div>
        ) : (
          filteredCameras.map((cam) => {
            const isOnline = cam.status === 'ONLINE';
            const isOffline = cam.status === 'OFFLINE';
            const isDegraded = cam.status === 'DEGRADED';

            return (
              <div
                key={cam.id}
                id={`camera-node-${cam.code.toLowerCase()}`}
                onClick={() => onOpenLiveFeed(cam)}
                className={`bg-[#1E293B] tech-border rounded p-4 flex flex-col gap-4 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] hover:border-primary group relative ${
                  isOffline ? 'border-[#fca5a5] shadow-[0_0_8px_rgba(252,165,165,0.15)]' : ''
                }`}
              >
                {/* Offline Red Accent bar */}
                {isOffline && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fca5a5] rounded-l" />
                )}

                <div className={`flex justify-between items-start ${isOffline ? 'pl-2' : ''}`}>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {cam.code}
                    </h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {cam.zone}
                    </span>
                  </div>
                  <span
                    className={`font-label-caps text-label-caps px-2 py-0.5 rounded uppercase font-bold ${
                      isOnline
                        ? 'status-online'
                        : isOffline
                        ? 'status-offline'
                        : 'status-degraded'
                    }`}
                  >
                    {cam.status}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-2 gap-x-4 gap-y-2 font-data-mono text-data-mono text-on-surface-variant mt-2 ${
                    isOffline ? 'pl-2' : ''
                  }`}
                >
                  <div className={`flex justify-between border-b border-[#334155] pb-1 ${isOffline ? 'opacity-50' : ''}`}>
                    <span>Streams</span>
                    <span className="text-on-surface">{cam.streams}</span>
                  </div>

                  <div
                    className={`flex justify-between border-b border-[#334155] pb-1 ${
                      isOffline ? 'opacity-50' : isDegraded ? 'text-[#fcd34d] font-bold' : ''
                    }`}
                  >
                    <span>Load</span>
                    <span className={isDegraded ? 'text-[#fcd34d]' : 'text-on-surface'}>
                      {cam.load !== null ? `${cam.load}%` : '--'}
                    </span>
                  </div>

                  <div className={`flex justify-between border-b border-[#334155] pb-1 ${isOffline ? 'opacity-50' : ''}`}>
                    <span>Ingest</span>
                    <span className="text-on-surface">
                      {cam.ingest !== null ? `${cam.ingest} Mbps` : '--'}
                    </span>
                  </div>

                  <div
                    className={`flex justify-between border-b border-[#334155] pb-1 ${
                      isOffline ? 'opacity-50' : isDegraded ? 'text-[#fcd34d] font-bold' : ''
                    }`}
                  >
                    <span>Latency</span>
                    <span className={isDegraded ? 'text-[#fcd34d]' : 'text-on-surface'}>
                      {cam.latency !== null ? `${cam.latency}ms` : '--'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#334155]/60 flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span className="font-data-mono">{cam.resolution}</span>
                  <span className="text-primary group-hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">videocam</span> View Stream →
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};
