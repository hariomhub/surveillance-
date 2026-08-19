import React, { useState } from 'react';
import { AlertItem, AlertSeverity, AlertStatus } from '../types';

interface LiveAlertsViewProps {
  alerts: AlertItem[];
  searchQuery: string;
  onSelectAlert: (alert: AlertItem) => void;
  onNavigateToInvestigation: () => void;
  onUpdateAlertStatus: (alertId: string, newStatus: AlertStatus) => void;
}

export const LiveAlertsView: React.FC<LiveAlertsViewProps> = ({
  alerts,
  searchQuery,
  onSelectAlert,
  onNavigateToInvestigation,
  onUpdateAlertStatus
}) => {
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'all'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedAlertForDetail, setSelectedAlertForDetail] = useState<AlertItem | null>(null);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        alert.alertTitle.toLowerCase().includes(q) ||
        alert.location.toLowerCase().includes(q) ||
        alert.cameraCode.toLowerCase().includes(q) ||
        alert.status.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const openAlertsCount = alerts.filter((a) => a.status === 'NEW').length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Severity,Title,Location,Time,Status,CameraCode']
        .concat(
          filteredAlerts.map(
            (a) =>
              `"${a.id}","${a.severity}","${a.alertTitle}","${a.location}","${a.timestamp}","${a.status}","${a.cameraCode}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentinel_alerts_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="mt-16 p-margin-page flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col gap-gutter bg-background">
      {/* Page Title & Status Indicator */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline-md text-headline-md text-on-surface">Live Alerts Dashboard</h2>
        <div className="font-data-mono text-data-mono text-on-surface-variant flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          System Online - Syncing
        </div>
      </div>

      {/* KPI Tiles Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* KPI 1: Active Cameras */}
        <div
          id="kpi-active-cameras"
          className="bg-surface-container border border-outline-variant rounded p-3 flex flex-col justify-between h-24 hover:border-primary transition-colors cursor-default"
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-body-sm text-body-sm font-medium">Active Cameras</span>
            <span className="material-symbols-outlined text-[16px]">videocam</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="font-headline-md text-headline-md font-data-mono text-on-surface">142</span>
            <span className="font-data-mono text-data-mono text-on-surface-variant pb-1">/ 144</span>
          </div>
        </div>

        {/* KPI 2: Open Alerts (Red outline with glow overlay) */}
        <div
          id="kpi-open-alerts"
          className="bg-surface-container border border-error rounded p-3 flex flex-col justify-between h-24 relative overflow-hidden cursor-pointer hover:border-error/80 active:border-error/80 active:scale-[0.99] transition-all"
          onClick={() => {
            setStatusFilter(statusFilter === 'NEW' ? 'all' : 'NEW');
          }}
          title="Click to filter by NEW open alerts"
        >
          <div className="absolute inset-0 bg-error/5 pointer-events-none"></div>
          <div className="flex items-center justify-between text-on-surface-variant relative z-10">
            <span className="font-body-sm text-body-sm font-medium">Open Alerts</span>
            <span className="material-symbols-outlined text-[16px] text-error">warning</span>
          </div>
          <div className="font-headline-md text-headline-md font-data-mono text-error relative z-10">
            {openAlertsCount}
          </div>
        </div>

        {/* KPI 3: Entities Tracked */}
        <div
          id="kpi-entities-tracked"
          className="bg-surface-container border border-outline-variant rounded p-3 flex flex-col justify-between h-24 hover:border-primary transition-colors cursor-default"
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-body-sm text-body-sm font-medium">Entities Tracked</span>
            <span className="material-symbols-outlined text-[16px]">radar</span>
          </div>
          <div className="font-headline-md text-headline-md font-data-mono text-on-surface">
            842
          </div>
        </div>

        {/* KPI 4: Correlation Flags */}
        <div
          id="kpi-correlation-flags"
          onClick={onNavigateToInvestigation}
          className="bg-surface-container border border-outline-variant rounded p-3 flex flex-col justify-between h-24 hover:border-tertiary active:border-tertiary active:scale-[0.99] transition-all cursor-pointer group"
          title="Click to view Active Correlation Investigation"
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-body-sm text-body-sm font-medium group-hover:text-tertiary transition-colors">
              Correlation Flags
            </span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">hub</span>
          </div>
          <div className="font-headline-md text-headline-md font-data-mono text-tertiary flex items-center justify-between">
            <span>5</span>
            <span className="text-[11px] font-sans font-normal text-on-surface-variant group-hover:text-tertiary transition-colors">
              View Case →
            </span>
          </div>
        </div>
      </div>

      {/* Dense Alert Feed Table */}
      <div className="flex-1 bg-surface-container border border-outline-variant rounded flex flex-col min-h-[420px] shadow-sm">
        {/* Table Toolbar */}
        <div className="px-4 py-2 border-b border-outline-variant bg-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Priority Feed
            </span>
            {(severityFilter !== 'all' || statusFilter !== 'all') && (
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-data-mono flex items-center gap-1">
                Filter: {severityFilter !== 'all' ? severityFilter : ''} {statusFilter !== 'all' ? statusFilter : ''}
                <button
                  onClick={() => {
                    setSeverityFilter('all');
                    setStatusFilter('all');
                  }}
                  className="hover:text-white ml-1"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 relative">
            {/* Filter Button */}
            <button
              id="btn-filter-alerts"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`px-3 py-1 border rounded font-body-sm text-body-sm transition-colors flex items-center gap-1 cursor-pointer ${
                showFilterDropdown || severityFilter !== 'all' || statusFilter !== 'all'
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">filter_list</span> Filter
            </button>

            {/* Filter Dropdown Menu */}
            {showFilterDropdown && (
              <div
                id="alerts-filter-dropdown"
                className="absolute right-24 top-9 w-60 bg-surface-container-highest border border-outline-variant rounded shadow-2xl p-3 z-30"
              >
                <div className="mb-3">
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase block mb-1.5 font-bold">
                    Severity Level
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(['all', 'critical', 'warning', 'info'] as const).map((sev) => (
                      <button
                        key={sev}
                        onClick={() => setSeverityFilter(sev)}
                        className={`px-2 py-1 rounded text-[11px] font-medium uppercase transition-colors cursor-pointer ${
                          severityFilter === sev
                            ? 'bg-primary text-on-primary font-bold'
                            : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase block mb-1.5 font-bold">
                    Alert Status
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(['all', 'NEW', 'ACKNOWLEDGED', 'RESOLVED'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-2 py-1 rounded text-[11px] font-medium uppercase transition-colors cursor-pointer ${
                          statusFilter === st
                            ? 'bg-primary text-on-primary font-bold'
                            : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            <button
              id="btn-export-alerts"
              onClick={handleExport}
              className="px-3 py-1 border border-outline-variant rounded font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:border-on-surface-variant transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">download</span> Export
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-surface-container z-10 shadow-[0_1px_0_0_#424754]">
              <tr>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase w-10">
                  Sev
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase w-16">
                  Feed
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase w-10">
                  Ent
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Alert Title
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Location
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Time
                </th>
                <th className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md divide-y divide-outline-variant/50">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-on-surface-variant font-body-sm">
                    No alerts found matching the current search and filter parameters.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    onClick={() => {
                      if (alert.correlationId) {
                        onNavigateToInvestigation();
                      } else {
                        setSelectedAlertForDetail(alert);
                      }
                    }}
                    className="hover:bg-surface-variant active:bg-surface-variant transition-colors group relative cursor-pointer"
                  >
                    {/* Severity Dot */}
                    <td className="px-4 py-2 align-middle">
                      {alert.severity === 'critical' ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_8px_rgba(255,180,171,0.6)] animate-pulse" />
                      ) : alert.severity === 'warning' ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(255,183,134,0.4)]" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </td>

                    {/* Feed Thumbnail */}
                    <td className="px-4 py-2 align-middle">
                      <div className="w-12 h-8 rounded-sm overflow-hidden border border-outline-variant relative bg-black">
                        {alert.severity === 'critical' && (
                          <div className="absolute inset-0 bg-error/10 mix-blend-overlay z-10 pointer-events-none" />
                        )}
                        <img
                          src={alert.feedThumbnail}
                          alt={alert.feedAlt}
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                        />
                      </div>
                    </td>

                    {/* Entity Icon */}
                    <td className="px-4 py-2 align-middle text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">
                        {alert.entityIcon}
                      </span>
                    </td>

                    {/* Alert Title */}
                    <td className="px-4 py-2 align-middle font-medium text-on-surface">
                      <div className="flex items-center gap-2">
                        <span>{alert.alertTitle}</span>
                        {alert.correlationId && (
                          <span className="text-[10px] font-data-mono px-1.5 py-0.2 rounded bg-tertiary/10 text-tertiary border border-tertiary/30">
                            {alert.correlationId}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-2 align-middle text-on-surface-variant">
                      {alert.location}
                    </td>

                    {/* Time */}
                    <td className="px-4 py-2 align-middle font-data-mono text-data-mono text-on-surface-variant">
                      {alert.timestamp}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-2 align-middle text-right">
                      {alert.status === 'NEW' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm border border-error bg-error-container text-on-error-container font-label-caps text-label-caps uppercase">
                          New
                        </span>
                      ) : alert.status === 'ACKNOWLEDGED' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm border border-tertiary bg-tertiary/10 text-tertiary font-label-caps text-label-caps uppercase">
                          Acknowledged
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm border border-outline-variant bg-surface-variant text-on-surface-variant font-label-caps text-label-caps uppercase">
                          Resolved
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Detail Modal Drawer */}
      {selectedAlertForDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container border border-outline-variant rounded-lg max-w-lg w-full p-4 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-caps text-primary uppercase text-[11px]">
                  Alert Inspection • {selectedAlertForDetail.cameraCode}
                </span>
                <h3 className="font-headline-sm text-on-surface font-bold mt-1">
                  {selectedAlertForDetail.alertTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAlertForDetail(null)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-48 rounded overflow-hidden border border-outline-variant">
              <img
                src={selectedAlertForDetail.feedThumbnail}
                alt={selectedAlertForDetail.feedAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-white font-data-mono text-[11px]">
                {selectedAlertForDetail.cameraCode} • {selectedAlertForDetail.timestamp}
              </div>
            </div>

            <p className="font-body-sm text-on-surface-variant">
              {selectedAlertForDetail.description || 'Surveillance sensor anomaly recorded.'}
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2 border-t border-outline-variant">
              <div className="flex flex-wrap gap-2">
                {selectedAlertForDetail.status !== 'RESOLVED' && (
                  <button
                    onClick={() => {
                      onUpdateAlertStatus(selectedAlertForDetail.id, 'RESOLVED');
                      setSelectedAlertForDetail(null);
                    }}
                    className="px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-variant text-on-surface font-body-sm"
                  >
                    Mark Resolved
                  </button>
                )}
                {selectedAlertForDetail.status === 'NEW' && (
                  <button
                    onClick={() => {
                      onUpdateAlertStatus(selectedAlertForDetail.id, 'ACKNOWLEDGED');
                      setSelectedAlertForDetail(null);
                    }}
                    className="px-3 py-1.5 rounded border border-tertiary bg-tertiary/10 text-tertiary font-body-sm"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
              <button
                onClick={onNavigateToInvestigation}
                className="px-4 py-1.5 rounded bg-primary text-on-primary font-body-sm font-bold hover:bg-primary-fixed"
              >
                Open Investigation →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
