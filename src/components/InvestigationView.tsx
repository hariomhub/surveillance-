import React, { useState } from 'react';
import { InvestigationCase, InvolvedEntity } from '../types';

interface InvestigationViewProps {
  investigation: InvestigationCase;
  onEscalate: () => void;
  onDismiss: () => void;
  onMarkKnownRelationship: () => void;
  onOpenLiveFeed?: (cameraCode: string) => void;
}

export const InvestigationView: React.FC<InvestigationViewProps> = ({
  investigation,
  onEscalate,
  onDismiss,
  onMarkKnownRelationship,
  onOpenLiveFeed
}) => {
  const [selectedEntity, setSelectedEntity] = useState<InvolvedEntity | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number | null>(null);

  const showToast = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  return (
    <main className="md:ml-64 mt-16 p-margin-page flex-1 overflow-y-auto lg:overflow-hidden bg-background flex flex-col lg:flex-row gap-gutter lg:h-[calc(100vh-4rem)]">
      {/* Toast notification banner */}
      {actionFeedback && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-8 z-50 bg-surface-container border border-primary text-on-surface px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-primary">verified_user</span>
          <span className="font-body-sm font-medium">{actionFeedback}</span>
        </div>
      )}

      {/* Left Column: Summary & Timeline */}
      <div className="flex-1 flex flex-col gap-gutter min-w-0">
        {/* Summary Header */}
        <section className="bg-surface-container rounded-lg border border-outline-variant p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                Correlation ID
              </span>
              <span className="font-data-mono text-data-mono text-primary font-bold">
                {investigation.id}
              </span>
              {investigation.isFlagged && (
                <div className="px-2 py-0.5 rounded border border-error bg-error/10 text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  <span className="font-label-caps text-label-caps font-bold">Flagged</span>
                </div>
              )}
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {investigation.title}
            </h2>
          </div>

          <div className="flex items-center gap-6 bg-surface-container-low p-3 rounded border border-outline-variant shrink-0">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Confidence
              </p>
              <p className="font-headline-lg text-headline-lg font-bold text-primary text-right">
                {investigation.confidence}%
              </p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center relative">
              <span className="material-symbols-outlined text-primary text-[24px]">
                model_training
              </span>
            </div>
          </div>
        </section>

        {/* Timeline Flow */}
        <section className="bg-surface-container rounded-lg border border-outline-variant p-4 sm:p-6 lg:flex-1 flex flex-col overflow-visible lg:overflow-hidden shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Event Timeline
            </h3>
            <span className="font-data-mono text-[12px] text-on-surface-variant">
              3 Chronological Anchors Detected
            </span>
          </div>

          <div className="relative lg:flex-1 overflow-visible lg:overflow-y-auto pr-0 lg:pr-2">
            {/* Timeline Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-outline-variant" />

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="relative flex gap-4 items-start group">
                <div className="w-14 h-14 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center z-10 shrink-0 group-hover:border-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    directions_car
                  </span>
                </div>
                <div className="bg-surface-container-low border border-outline-variant rounded p-4 flex-1 hover:border-outline transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-label-caps text-label-caps text-primary uppercase">
                        Step 1 • Initial Detection
                      </p>
                      <p className="font-body-lg text-body-lg text-on-surface font-semibold">
                        North Gate Entry
                      </p>
                    </div>
                    <span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container p-1 rounded border border-outline-variant">
                      10:05:22
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      onClick={() => onOpenLiveFeed && onOpenLiveFeed('CAM-N01')}
                      className="relative w-48 h-32 rounded bg-background border border-outline-variant overflow-hidden shrink-0 cursor-pointer group/img"
                      title="Click to view live sensor telemetry"
                    >
                      <div className="absolute top-0 left-0 right-0 bg-black/60 p-1 flex justify-between z-10 backdrop-blur-xs">
                        <span className="font-data-mono text-[10px] text-white">CAM-N01</span>
                        <span className="font-data-mono text-[10px] text-error flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1 animate-ping" />
                          REC
                        </span>
                      </div>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvZdQaRPqIVZH6yTSH9nsBqoWxFLi6h4tozp68TkdBG2Tgr9JRcZETEwq9HrOKw5fFEkHeD9x9H4cksVddSCZr5XJtw8lhGjFC4s3K-som92VkVMREEMp6lCp6lWRvksknxMrbw3EsX6McUk4vhoZ8mzINxNdIeaW-tRWAYgVdv4KvdOn5ERJbhadH97BftAg6dxXfKMLio8L67fIoq3rsNO75zrq6w0vBSk4Vii9lp0woi1b2rk853Q"
                        alt="North Gate Entry Snapshot"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-16">
                          Entity:
                        </span>
                        <span className="font-body-md text-body-md text-on-surface">
                          Vehicle 1
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-16">
                          LPR:
                        </span>
                        <span className="font-data-mono text-data-mono text-secondary px-2 py-0.5 bg-secondary-container/50 rounded border border-secondary-container">
                          MH01-CV-2023
                        </span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">
                        Black SUV entered facility perimeter heading towards parking sector B.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4 items-start group">
                <div className="w-14 h-14 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center z-10 shrink-0 group-hover:border-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    local_parking
                  </span>
                </div>
                <div className="bg-surface-container-low border border-outline-variant rounded p-4 flex-1 hover:border-outline transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-label-caps text-label-caps text-primary uppercase">
                        Step 2 • Tracked Movement
                      </p>
                      <p className="font-body-lg text-body-lg text-on-surface font-semibold">
                        Staff Parking Area B
                      </p>
                    </div>
                    <span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container p-1 rounded border border-outline-variant">
                      10:08:45
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      onClick={() => onOpenLiveFeed && onOpenLiveFeed('CAM-P04')}
                      className="relative w-48 h-32 rounded bg-background border border-outline-variant overflow-hidden shrink-0 cursor-pointer group/img"
                      title="Click to view live sensor telemetry"
                    >
                      <div className="absolute top-0 left-0 right-0 bg-black/60 p-1 flex justify-between z-10 backdrop-blur-xs">
                        <span className="font-data-mono text-[10px] text-white">CAM-P04</span>
                        <span className="font-data-mono text-[10px] text-error flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1 animate-ping" />
                          REC
                        </span>
                      </div>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz7W8bJV_wCYKtCFV5lQ8pUjqBy0XkQUNUp77kKxlW0PhwGaIaoNZSctimChNUW0BJVxrXmSfzioMkki-wM-oMzqKsffeG6nyzpj0Vq2uD0gUKL3zrjY79_8NdGfvxqOUO21h1PDDALE3TaTE5_bKHh9rdgsJjh0ntJLsmHu2EkRCsDFafnzN1Rdx7O0kIwBV71pESPzpVoxetYrmqlGiZpq9h60Cmk2rhbB9ZaOso2tNV5dmeQZuwlg"
                        alt="Parking Lot Snapshot"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-16">
                          Entity:
                        </span>
                        <span className="font-body-md text-body-md text-on-surface">
                          Vehicle 1 parked. Person A exited.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-16">
                          Action:
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Driver disembarked, heading East.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 (Flagged Event) */}
              <div className="relative flex gap-4 items-start group">
                <div className="w-14 h-14 rounded-full bg-error-container border-2 border-error flex items-center justify-center z-10 shrink-0 shadow-[0_0_12px_rgba(147,0,10,0.5)]">
                  <span className="material-symbols-outlined text-on-error-container text-[24px]">
                    handshake
                  </span>
                </div>
                <div className="bg-surface-container-low border border-error/50 rounded p-4 flex-1 shadow-[inset_4px_0_0_0_theme('colors.error')]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-label-caps text-label-caps text-error uppercase font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">priority_high</span>
                        Step 3 • Flagged Event
                      </p>
                      <p className="font-body-lg text-body-lg text-on-surface font-semibold">
                        Unauthorized Rendezvous
                      </p>
                    </div>
                    <span className="font-data-mono text-data-mono text-error bg-error-container/20 p-1 rounded border border-error/30">
                      10:11:02
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      onClick={() => onOpenLiveFeed && onOpenLiveFeed('CAM-S12')}
                      className="relative w-48 h-32 rounded bg-background border border-error/50 overflow-hidden shrink-0 cursor-pointer group/img"
                      title="Click to view live sensor telemetry"
                    >
                      <div className="absolute top-0 left-0 right-0 bg-black/60 p-1 flex justify-between z-10 backdrop-blur-xs">
                        <span className="font-data-mono text-[10px] text-white">CAM-S12</span>
                        <span className="font-data-mono text-[10px] text-error flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1 animate-ping" />
                          REC
                        </span>
                      </div>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuiHESaxe7yBTEsiOhbIh8qBl9DwDGVKzhAullAeSeQzRsn4CepfeM_Evw7ou_wMzhiYVFQaKbfDO9WDnFJt6fCwtFxGNpkBJsnrFUNJvmj7wQa65yRx6v5ssPMWDrNt5INNzkQw337zVviv3KVKfwHvvWPRJYWGej6CQm3XS7PpyLtq7p0aHJa0l8PEEm5QUeVNvvTHYGXD8hm4h4rlbSGDQgaXkq9HJCGL6W0oh7WsLOhKVLQGq6wQ"
                        alt="Rendezvous Snapshot"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-2 flex-1">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        Person A (Driver, Vehicle 1) met with Person B (Unknown) in Restricted Zone 4.
                      </p>
                      <div className="mt-2 p-2 bg-surface border border-outline-variant rounded font-data-mono text-[11px] text-on-surface-variant leading-relaxed">
                        &gt; CORRELATION_MATCH_FOUND
                        <br />
                        &gt; RULE_ID: R-449 (PROHIBITED_CONTACT)
                        <br />
                        &gt; DURATION: 00:02:14
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions Bar */}
        <section className="flex flex-col sm:flex-row sm:justify-end gap-3 shrink-0 pt-2 border-t border-outline-variant">
          <button
            id="btn-investigation-dismiss"
            onClick={() => {
              onDismiss();
              showToast('Investigation dismissed and archived to historical audit logs.');
            }}
            className="px-4 py-2 border border-outline-variant rounded text-on-surface font-body-sm text-body-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            id="btn-investigation-mark-known"
            onClick={() => {
              onMarkKnownRelationship();
              showToast('Pairing tagged: Person A + Vehicle 1 added to pending registry review.');
            }}
            className="px-4 py-2 border border-outline-variant rounded text-on-surface font-body-sm text-body-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Mark as Known Relationship
          </button>
          <button
            id="btn-investigation-escalate"
            onClick={() => {
              onEscalate();
              showToast('🚨 Escalate to Security triggered! On-site SecOps dispatch notified.');
            }}
            className="px-4 py-2 bg-primary text-on-primary rounded font-body-sm text-body-sm font-bold hover:bg-primary-container transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">shield</span>
            Escalate to Security
          </button>
        </section>
      </div>

      {/* Right Side Panel: Involved Entities & Topology Graph */}
      <aside className="w-full lg:w-80 flex flex-col gap-container-gap shrink-0 overflow-visible lg:overflow-y-auto">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase px-1 pb-1 border-b border-outline-variant">
          Involved Entities
        </h3>

        {/* Vehicle 1 Card */}
        <div
          id="entity-card-vehicle-1"
          className="bg-surface-container rounded border border-outline-variant p-3 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary">directions_car</span>
            <h4 className="font-body-md text-body-md font-semibold text-on-surface">Vehicle 1</h4>
          </div>
          <div className="space-y-2 text-body-sm font-body-sm">
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Type</span>
              <span className="text-on-surface">SUV, Dark Color</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Plate (LPR)</span>
              <span className="font-data-mono text-secondary">MH01-CV-2023</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Registration</span>
              <span className="text-on-surface">External Contractor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Current Status</span>
              <span className="text-on-surface">Parked (Area B)</span>
            </div>
          </div>
        </div>

        {/* Person A Card */}
        <div
          id="entity-card-person-a"
          className="bg-surface-container rounded border border-outline-variant p-3 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">person</span>
            <h4 className="font-body-md text-body-md font-semibold text-on-surface">Person A</h4>
          </div>
          <div className="space-y-2 text-body-sm font-body-sm">
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Role</span>
              <span className="text-on-surface">Driver (Vehicle 1)</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Face ID Match</span>
              <span className="text-error font-data-mono font-bold">FAILED (Obscured)</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Apparel</span>
              <span className="text-on-surface">Dark Jacket, Cap</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Last Seen</span>
              <span className="font-data-mono text-on-surface">CAM-S12 (10:11)</span>
            </div>
          </div>
        </div>

        {/* Person B Card (Elevated Threat) */}
        <div
          id="entity-card-person-b"
          className="bg-surface-container rounded border border-outline-variant p-3 shadow-[inset_4px_0_0_0_theme('colors.tertiary-container')] hover:border-tertiary/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-tertiary-container">person_search</span>
            <h4 className="font-body-md text-body-md font-semibold text-on-surface">Person B</h4>
          </div>
          <div className="space-y-2 text-body-sm font-body-sm">
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Role</span>
              <span className="text-on-surface">Pedestrian</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Face ID Match</span>
              <span className="text-tertiary font-data-mono font-medium">PENDING ANALYSIS</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant pb-1">
              <span className="text-on-surface-variant">Origin Path</span>
              <span className="text-on-surface">Unknown (Blindspot)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Threat Level</span>
              <span className="text-error font-bold tracking-wider animate-pulse">ELEVATED</span>
            </div>
          </div>
        </div>

        {/* Interactive Network Graph Topology snippet */}
        <div className="mt-auto bg-surface-container rounded border border-outline-variant p-3 h-44 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between z-10 relative">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Network Graph
            </span>
            <span className="font-data-mono text-[10px] text-primary">4 Nodes • 3 Edges</span>
          </div>

          {/* Dotted canvas background */}
          <div
            className="absolute inset-0 top-6 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #adc6ff 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }}
          />

          {/* Interactive Visual Network Topology */}
          <div className="flex-1 relative z-10 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 280 110">
              {/* Connection lines */}
              <line x1="60" y1="55" x2="140" y2="35" stroke="#424754" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="140" y1="35" x2="220" y2="55" stroke="#ffb4ab" strokeWidth="2" />
              <line x1="140" y1="35" x2="140" y2="85" stroke="#adc6ff" strokeWidth="1.5" />

              {/* Node 1: Vehicle 1 */}
              <g className="cursor-pointer">
                <circle cx="60" cy="55" r="16" fill="#1d2027" stroke="#b9c8de" strokeWidth="1.5" />
                <text x="60" y="58" fill="#e1e2ec" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">
                  VEH-1
                </text>
              </g>

              {/* Node 2: Person A */}
              <g className="cursor-pointer">
                <circle cx="140" cy="35" r="18" fill="#1d2027" stroke="#adc6ff" strokeWidth="2" />
                <text x="140" y="38" fill="#adc6ff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="JetBrains Mono">
                  PRS-A
                </text>
              </g>

              {/* Node 3: Person B (Critical) */}
              <g className="cursor-pointer">
                <circle cx="220" cy="55" r="18" fill="#2e1518" stroke="#ffb4ab" strokeWidth="2" />
                <text x="220" y="58" fill="#ffb4ab" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="JetBrains Mono">
                  PRS-B
                </text>
              </g>

              {/* Node 4: Zone 4 */}
              <g className="cursor-pointer">
                <rect x="110" y="75" width="60" height="20" rx="3" fill="#191b23" stroke="#8c909f" strokeWidth="1" />
                <text x="140" y="88" fill="#c2c6d6" fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono">
                  RESTRICTED-Z4
                </text>
              </g>
            </svg>
          </div>
        </div>
      </aside>
    </main>
  );
};
