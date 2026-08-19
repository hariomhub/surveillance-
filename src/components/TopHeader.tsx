import React, { useState } from 'react';
import { AlertItem, ViewTab } from '../types';

interface TopHeaderProps {
  currentTab: ViewTab;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  alerts: AlertItem[];
  onSelectAlert: (alert: AlertItem) => void;
  onOpenSettings: () => void;
  onOpenMobileNav: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  searchQuery,
  onSearchChange,
  alerts,
  onSelectAlert,
  onOpenSettings,
  onOpenMobileNav
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadAlerts = alerts.filter((a) => a.status === 'NEW');

  const getPlaceholder = () => {
    switch (currentTab) {
      case 'alerts':
        return 'Search cameras, entities, or alerts...';
      case 'fleet':
        return 'Search cameras, zones...';
      case 'investigation':
        return 'Search telemetry, entities, timestamps...';
      case 'rules':
        return 'Search rules, actions, conditions...';
      case 'relationships':
        return 'Search records, personnel, assets...';
      default:
        return 'Search Sentinel platform...';
    }
  };

  return (
    <header
      id="sentinel-top-header"
      className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-surface border-b border-outline-variant flex items-center justify-between gap-3 px-4 md:px-margin-page z-40"
    >
      {/* Left side: Mobile nav toggle + Context badge or Search input */}
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
        <button
          id="btn-open-mobile-nav"
          onClick={onOpenMobileNav}
          className="md:hidden text-on-surface-variant hover:text-on-surface p-1.5 -ml-1.5 rounded hover:bg-surface-container-high transition-colors cursor-pointer shrink-0"
          title="Open menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
        {currentTab === 'investigation' ? (
          <div className="flex items-center space-x-3 min-w-0">
            <span className="hidden sm:inline font-headline-md text-[20px] font-bold text-primary shrink-0">Sentinel</span>
            <div className="hidden sm:block h-5 w-[1px] bg-outline-variant mx-1 shrink-0"></div>
            <span className="font-headline-sm text-[16px] text-on-surface font-semibold truncate">
              Investigation: CR-8841
            </span>
          </div>
        ) : currentTab === 'rules' ? (
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:inline font-headline-md text-[20px] font-bold text-primary shrink-0">Sentinel</span>
            <span className="text-on-surface-variant font-body-sm text-[12px] px-2 py-0.5 bg-surface-container rounded-sm border border-outline-variant truncate">
              Rule Builder
            </span>
          </div>
        ) : (
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full bg-background border border-outline-variant rounded py-1.5 pl-10 pr-4 font-body-sm text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-[14px]"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-2 sm:gap-4 relative shrink-0">
        {/* Notifications Button */}
        <div className="relative">
          <button
            id="btn-top-notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded hover:bg-surface-container-high transition-colors relative cursor-pointer"
            title="Alert Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-80 bg-surface-container border border-outline-variant rounded shadow-xl py-2 z-50 overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-outline-variant flex items-center justify-between">
                <span className="font-label-caps text-[11px] text-on-surface uppercase tracking-wider font-bold">
                  Live Notifications ({unreadAlerts.length} Unresolved)
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/40">
                {alerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      onSelectAlert(alert);
                      setShowNotifications(false);
                    }}
                    className="p-3 hover:bg-surface-variant transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        alert.severity === 'critical'
                          ? 'bg-error'
                          : alert.severity === 'warning'
                          ? 'bg-tertiary'
                          : 'bg-primary'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-body-sm font-semibold text-on-surface truncate">
                          {alert.alertTitle}
                        </p>
                        <span className="font-data-mono text-[11px] text-on-surface-variant">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                        {alert.location} • {alert.cameraCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI System Settings Suggest Button */}
        <button
          id="btn-top-settings-suggest"
          onClick={onOpenSettings}
          className="text-on-surface-variant hover:text-on-surface p-1.5 rounded hover:bg-surface-container-high transition-colors cursor-pointer"
          title="System Engine & Thresholds"
        >
          <span className="material-symbols-outlined text-[22px]">settings_suggest</span>
        </button>

        {/* Administrator Avatar / Profile */}
        <div className="relative">
          <button
            id="btn-top-profile"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden cursor-pointer hover:border-primary transition-colors flex items-center justify-center bg-surface-container-high"
            title="Administrator Profile"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQx6a8NQTgeGtJnDHmpVwOeRE_aOZocKdL_XdTlYKujLvnEij4HeUI2V-90WESl7JWoqWzfumW3sZoGmmOxL5hpwZSdW8xzNjdHdpd_Z1-5OlBSLUfo7QB1zZktXCWvBnBZvg_K0H-L8AzDuERGPG-K5WjhMAXRiHIKsfwpoyUWcdJHQjZoSqdXgcKviNYjh2YaIDyAqRviDc-FpU-aKju-Gqz3Abq883AndGIJZmLBJz7ofvLzmtFuQ"
              alt="Administrator Icon"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div
              id="profile-dropdown"
              className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-64 bg-surface-container border border-outline-variant rounded shadow-xl p-3 z-50"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-outline-variant">
                <div className="w-10 h-10 rounded-full border border-primary/40 bg-surface-container-high flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-primary">security</span>
                </div>
                <div>
                  <h4 className="font-body-md font-semibold text-on-surface">SecOps Admin</h4>
                  <p className="font-data-mono text-[11px] text-on-surface-variant">Tier-3 Clearance</p>
                </div>
              </div>
              <div className="py-2 space-y-1 text-[13px]">
                <div className="flex justify-between py-1 text-on-surface-variant font-data-mono text-[11px]">
                  <span>NODE ID</span>
                  <span className="text-primary font-bold">SEC-ALPHA-9</span>
                </div>
                <div className="flex justify-between py-1 text-on-surface-variant font-data-mono text-[11px]">
                  <span>AI INGEST</span>
                  <span className="text-secondary">24.5 Gbps Active</span>
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant flex justify-end">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-data-mono">
                  Online Syncing
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
