import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [retentionDays, setRetentionDays] = useState(90);
  const [webhookUrl, setWebhookUrl] = useState('https://secops.sentinel.internal/v1/webhook');
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="settings-modal"
      className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div className="bg-surface-container border border-outline-variant rounded-lg max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">settings_suggest</span>
            <h3 className="font-headline-sm text-on-surface font-bold text-[18px]">
              System Engine & Diagnostics
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface text-[18px]"
          >
            ✕
          </button>
        </div>

        {savedMessage && (
          <div className="p-2.5 rounded bg-primary/10 border border-primary/30 text-primary text-xs font-data-mono">
            ✓ Configuration written to Sentinel Core Daemon.
          </div>
        )}

        <div className="space-y-4 font-body-sm">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-on-surface font-medium text-xs">
                AI Correlation Confidence Threshold
              </label>
              <span className="font-data-mono text-primary font-bold text-xs">
                {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={99}
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Events below this threshold are logged as raw telemetry without triggering active alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-on-surface font-medium text-xs mb-1">
                Telemetry Retention (Days)
              </label>
              <input
                type="number"
                value={retentionDays}
                onChange={(e) => setRetentionDays(Number(e.target.value))}
                min={7}
                max={365}
                className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-3 text-on-surface font-data-mono"
              />
            </div>

            <div>
              <label className="block text-on-surface font-medium text-xs mb-1">
                Hardware Ingest Tier
              </label>
              <div className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-3 text-secondary font-data-mono text-xs">
                GPU-ACCEL (4K H.265)
              </div>
            </div>
          </div>

          <div>
            <label className="block text-on-surface font-medium text-xs mb-1">
              SecOps Webhook Endpoint
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-3 text-on-surface font-data-mono text-xs"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-surface border border-outline-variant">
            <div>
              <p className="text-on-surface font-semibold text-xs">
                Auto-Escalate Critical Threats
              </p>
              <p className="text-[11px] text-on-surface-variant">
                Immediately ping mobile radio channels on physical perimeter breach.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoEscalate}
              onChange={(e) => setAutoEscalate(e.target.checked)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded bg-primary text-on-primary font-bold hover:bg-primary-fixed active:bg-primary-fixed transition-all active:scale-[0.97] shadow-sm cursor-pointer"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
