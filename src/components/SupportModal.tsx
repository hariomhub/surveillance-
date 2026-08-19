import React from 'react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  return (
    <div
      id="support-modal"
      className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div className="bg-surface-container border border-outline-variant rounded-lg max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">help_outline</span>
            <h3 className="font-headline-sm text-on-surface font-bold text-[18px]">
              Sentinel Support & Hotkeys
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface text-[18px]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 font-body-sm text-on-surface">
          <div>
            <h4 className="font-label-caps uppercase text-[11px] text-on-surface-variant mb-2 font-bold">
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Live Alerts</span>
                <span className="text-primary font-bold">1</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Camera Fleet</span>
                <span className="text-primary font-bold">2</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Investigation</span>
                <span className="text-primary font-bold">3</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Rule Builder</span>
                <span className="text-primary font-bold">4</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Relationships</span>
                <span className="text-primary font-bold">5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface border border-outline-variant font-data-mono">
                <span className="text-on-surface-variant">Search Focus</span>
                <span className="text-primary font-bold">/</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-surface border border-outline-variant text-xs space-y-1">
            <p className="font-semibold text-primary">Emergency SecOps Dispatch</p>
            <p className="text-on-surface-variant">
              Direct telemetry radio bridge is connected to Building Operations Tier 1.
              For hardware outages, call extension <span className="font-data-mono text-secondary">#4900</span>.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-outline-variant">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-primary text-on-primary font-bold hover:bg-primary-fixed active:bg-primary-fixed transition-all active:scale-[0.97] cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
