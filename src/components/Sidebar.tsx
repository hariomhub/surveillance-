import React from 'react';
import { ViewTab } from '../types';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenNewRule: () => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  openAlertsCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewRule,
  onOpenSettings,
  onOpenSupport,
  openAlertsCount,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="sentinel-sidebar"
        className={`h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant flex flex-col py-4 px-3 z-50 select-none transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
      {/* Brand Header */}
      <div className="flex items-center justify-between gap-3 px-3 mb-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('alerts')}>
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined fill text-[20px]">security</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-[18px] font-bold text-primary leading-tight tracking-tight">
              Sentinel
            </h1>
            <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
              AI Surveillance
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer"
          title="Close menu"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="flex-1 flex flex-col gap-1">
        {/* Tab 1: Live Alerts */}
        <button
          id="nav-tab-live-alerts"
          onClick={() => onSelectTab('alerts')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all active:scale-[0.98] cursor-pointer ${
            currentTab === 'alerts'
              ? 'text-primary bg-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentTab === 'alerts' ? 'fill' : ''
              }`}
            >
              notifications_active
            </span>
            <span className="font-body-md text-[14px]">Live Alerts</span>
          </div>
          {openAlertsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-sm bg-error/20 text-error font-data-mono text-[11px] font-bold border border-error/30">
              {openAlertsCount}
            </span>
          )}
        </button>

        {/* Tab 2: Camera Fleet */}
        <button
          id="nav-tab-camera-fleet"
          onClick={() => onSelectTab('fleet')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all active:scale-[0.98] cursor-pointer ${
            currentTab === 'fleet'
              ? 'text-primary bg-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              currentTab === 'fleet' ? 'fill' : ''
            }`}
          >
            videocam
          </span>
          <span className="font-body-md text-[14px]">Camera Fleet</span>
        </button>

        {/* Tab 3: Investigation */}
        <button
          id="nav-tab-investigation"
          onClick={() => onSelectTab('investigation')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all active:scale-[0.98] cursor-pointer ${
            currentTab === 'investigation'
              ? 'text-primary bg-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentTab === 'investigation' ? 'fill' : ''
              }`}
            >
              search_check
            </span>
            <span className="font-body-md text-[14px]">Investigation</span>
          </div>
          <span className="px-1.5 py-0.2 rounded-sm bg-tertiary/10 text-tertiary font-data-mono text-[10px] border border-tertiary/20">
            CR-8841
          </span>
        </button>

        {/* Tab 4: Rule Builder */}
        <button
          id="nav-tab-rule-builder"
          onClick={() => onSelectTab('rules')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all active:scale-[0.98] cursor-pointer ${
            currentTab === 'rules'
              ? 'text-primary bg-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              currentTab === 'rules' ? 'fill' : ''
            }`}
          >
            rule
          </span>
          <span className="font-body-md text-[14px]">Rule Builder</span>
        </button>

        {/* Tab 5: Relationships */}
        <button
          id="nav-tab-relationships"
          onClick={() => onSelectTab('relationships')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all active:scale-[0.98] cursor-pointer ${
            currentTab === 'relationships'
              ? 'text-primary bg-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              currentTab === 'relationships' ? 'fill' : ''
            }`}
          >
            hub
          </span>
          <span className="font-body-md text-[14px]">Relationships</span>
        </button>
      </nav>

      {/* CTA Button: New Rule */}
      <div className="mt-4 mb-6 px-1">
        <button
          id="btn-sidebar-new-rule"
          onClick={onOpenNewRule}
          className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-2 rounded font-body-md font-semibold hover:bg-primary-fixed transition-colors shadow-sm cursor-pointer active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Rule
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col gap-1 border-t border-outline-variant pt-4">
        <button
          id="btn-sidebar-settings"
          onClick={onOpenSettings}
          className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-[0.98] cursor-pointer text-left"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="font-body-md text-[14px]">Settings</span>
        </button>
        <button
          id="btn-sidebar-support"
          onClick={onOpenSupport}
          className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-[0.98] cursor-pointer text-left"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
          <span className="font-body-md text-[14px]">Support</span>
        </button>
      </div>
      </aside>
    </>
  );
};
