import React, { useState, useEffect } from 'react';
import { ViewTab, AlertItem, AlertStatus, CameraNode, SurveillanceRule, RelationshipPairing } from './types';
import {
  INITIAL_ALERTS,
  INITIAL_INVESTIGATION,
  INITIAL_CAMERAS,
  INITIAL_RULES,
  INITIAL_RELATIONSHIPS
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { LiveAlertsView } from './components/LiveAlertsView';
import { InvestigationView } from './components/InvestigationView';
import { CameraFleetView } from './components/CameraFleetView';
import { RuleBuilderView } from './components/RuleBuilderView';
import { RelationshipsView } from './components/RelationshipsView';
import { LiveCameraModal } from './components/LiveCameraModal';
import { NewRuleModal } from './components/NewRuleModal';
import { SettingsModal } from './components/SettingsModal';
import { SupportModal } from './components/SupportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('alerts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Domain states
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [investigation, setInvestigation] = useState(INITIAL_INVESTIGATION);
  const [cameras, setCameras] = useState<CameraNode[]>(INITIAL_CAMERAS);
  const [rules, setRules] = useState<SurveillanceRule[]>(INITIAL_RULES);
  const [relationships, setRelationships] = useState<RelationshipPairing[]>(INITIAL_RELATIONSHIPS);

  // Modals state
  const [selectedLiveCamera, setSelectedLiveCamera] = useState<CameraNode | null>(null);
  const [isNewRuleOpen, setIsNewRuleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input / textarea / select
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === '1') setCurrentTab('alerts');
      if (e.key === '2') setCurrentTab('fleet');
      if (e.key === '3') setCurrentTab('investigation');
      if (e.key === '4') setCurrentTab('rules');
      if (e.key === '5') setCurrentTab('relationships');
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Alert Actions
  const handleUpdateAlertStatus = (alertId: string, newStatus: AlertStatus) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    );
  };

  const handleSelectAlert = (alert: AlertItem) => {
    if (alert.correlationId) {
      setCurrentTab('investigation');
    } else {
      const matchedCam = cameras.find((c) => c.code === alert.cameraCode);
      if (matchedCam) {
        setSelectedLiveCamera(matchedCam);
      } else {
        setSelectedLiveCamera({
          id: alert.id,
          code: alert.cameraCode,
          zone: alert.location,
          zoneCategory: 'Perimeter',
          status: 'ONLINE',
          streams: '1',
          load: 45,
          ingest: 18.2,
          latency: 110,
          resolution: '1080p',
          fps: 30,
          feedUrl: alert.feedThumbnail
        });
      }
    }
  };

  // Rule Actions
  const handleToggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleSaveRule = (updatedRule: SurveillanceRule) => {
    setRules((prev) =>
      prev.map((r) => (r.id === updatedRule.id ? updatedRule : r))
    );
  };

  const handleAddRule = (newRule: SurveillanceRule) => {
    setRules((prev) => [newRule, ...prev]);
    setCurrentTab('rules');
  };

  // Relationship Actions
  const handleAddPairing = (
    newPairing: Omit<RelationshipPairing, 'id' | 'registeredDate' | 'authorizedBy'>
  ) => {
    const pairing: RelationshipPairing = {
      ...newPairing,
      id: `rel-${Date.now()}`,
      registeredDate: new Date().toISOString().slice(0, 10),
      authorizedBy: 'SecOps Administrator'
    };
    setRelationships((prev) => [pairing, ...prev]);
  };

  const handleDeletePairing = (id: string) => {
    setRelationships((prev) => prev.filter((r) => r.id !== id));
  };

  // Investigation Actions
  const handleOpenLiveFeedForCode = (cameraCode: string) => {
    const matched = cameras.find((c) => c.code.toLowerCase() === cameraCode.toLowerCase());
    if (matched) {
      setSelectedLiveCamera(matched);
    } else {
      setSelectedLiveCamera({
        id: cameraCode,
        code: cameraCode,
        zone: 'Monitored Sector',
        zoneCategory: 'Perimeter',
        status: 'ONLINE',
        streams: '1',
        load: 50,
        ingest: 20.0,
        latency: 105,
        resolution: '4K',
        fps: 30,
        feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZdQaRPqIVZH6yTSH9nsBqoWxFLi6h4tozp68TkdBG2Tgr9JRcZETEwq9HrOKw5fFEkHeD9x9H4cksVddSCZr5XJtw8lhGjFC4s3K-som92VkVMREEMp6lCp6lWRvksknxMrbw3EsX6McUk4vhoZ8mzINxNdIeaW-tRWAYgVdv4KvdOn5ERJbhadH97BftAg6dxXfKMLio8L67fIoq3rsNO75zrq6w0vBSk4Vii9lp0woi1b2rk853Q'
      });
    }
  };

  const openAlertsCount = alerts.filter((a) => a.status === 'NEW').length;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setSearchQuery('');
          setIsMobileNavOpen(false);
        }}
        onOpenNewRule={() => {
          setIsNewRuleOpen(true);
          setIsMobileNavOpen(false);
        }}
        onOpenSettings={() => {
          setIsSettingsOpen(true);
          setIsMobileNavOpen(false);
        }}
        onOpenSupport={() => {
          setIsSupportOpen(true);
          setIsMobileNavOpen(false);
        }}
        openAlertsCount={openAlertsCount}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          currentTab={currentTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          alerts={alerts}
          onSelectAlert={handleSelectAlert}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />

        {/* View Switching */}
        {currentTab === 'alerts' && (
          <div className="md:ml-64 flex-1 flex flex-col min-w-0">
            <LiveAlertsView
              alerts={alerts}
              searchQuery={searchQuery}
              onSelectAlert={handleSelectAlert}
              onNavigateToInvestigation={() => setCurrentTab('investigation')}
              onUpdateAlertStatus={handleUpdateAlertStatus}
            />
          </div>
        )}

        {currentTab === 'fleet' && (
          <CameraFleetView
            cameras={cameras}
            searchQuery={searchQuery}
            onOpenLiveFeed={(cam) => setSelectedLiveCamera(cam)}
          />
        )}

        {currentTab === 'investigation' && (
          <InvestigationView
            investigation={investigation}
            onEscalate={() => {
              // mark alert as acknowledged
              handleUpdateAlertStatus('ALT-10492', 'ACKNOWLEDGED');
            }}
            onDismiss={() => {
              handleUpdateAlertStatus('ALT-10492', 'RESOLVED');
            }}
            onMarkKnownRelationship={() => {
              handleAddPairing({
                entityAName: 'Person A (Investigated)',
                entityAInitials: 'PA',
                entityBLabel: 'MH01-CV-2023',
                entityBIcon: 'directions_car',
                type: 'Contractor Access',
                notes: 'Validated following investigation CR-8841 rendezvous review.'
              });
              setCurrentTab('relationships');
            }}
            onOpenLiveFeed={handleOpenLiveFeedForCode}
          />
        )}

        {currentTab === 'rules' && (
          <RuleBuilderView
            rules={rules}
            onToggleRule={handleToggleRule}
            onSaveRule={handleSaveRule}
          />
        )}

        {currentTab === 'relationships' && (
          <RelationshipsView
            relationships={relationships}
            searchQuery={searchQuery}
            onAddPairing={handleAddPairing}
            onDeletePairing={handleDeletePairing}
          />
        )}
      </div>

      {/* Global Modals */}
      {selectedLiveCamera && (
        <LiveCameraModal
          camera={selectedLiveCamera}
          onClose={() => setSelectedLiveCamera(null)}
        />
      )}

      {isNewRuleOpen && (
        <NewRuleModal
          onClose={() => setIsNewRuleOpen(false)}
          onAddRule={handleAddRule}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

      {isSupportOpen && (
        <SupportModal onClose={() => setIsSupportOpen(false)} />
      )}
    </div>
  );
}
