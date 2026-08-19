import React, { useState } from 'react';
import { SurveillanceRule } from '../types';

interface NewRuleModalProps {
  onClose: () => void;
  onAddRule: (rule: SurveillanceRule) => void;
}

export const NewRuleModal: React.FC<NewRuleModalProps> = ({ onClose, onAddRule }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'CRITICAL' | 'WARNING' | 'INFO'>('CRITICAL');
  const [triggerEntity, setTriggerEntity] = useState('Entity: Person');
  const [targetEntity, setTargetEntity] = useState('Entity: Vehicle');
  const [zone, setZone] = useState('Warehouse Area A');
  const [timeLimit, setTimeLimit] = useState(2);
  const [action, setAction] = useState('Alert Administrator');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Rule name is required.');
      return;
    }

    const newRule: SurveillanceRule = {
      id: `RL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      description: description.trim() || 'Custom correlation policy created via Sentinel Rule Engine.',
      severity,
      isActive: true,
      lastTriggered: 'Just now',
      triggerEntity,
      targetEntity,
      zone,
      timeLimitMinutes: timeLimit || 2,
      relationshipCondition: 'Known Relationships',
      action,
      actionSeverity: severity === 'CRITICAL' ? 'Critical' : severity === 'WARNING' ? 'Warning' : 'Info'
    };

    onAddRule(newRule);
    onClose();
  };

  return (
    <div
      id="new-rule-modal"
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div className="bg-surface-container border border-outline-variant rounded-lg max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            <h3 className="font-headline-sm text-on-surface font-bold text-[18px]">
              Create Surveillance Rule
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface text-[18px]"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded bg-error/10 border border-error/30 text-error text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-body-sm">
          <div>
            <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
              Rule Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="e.g. Unauthorized Zone Entry"
              className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-3 text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Trigger rationale and operational parameters..."
              rows={2}
              className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-3 text-on-surface focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
                Target Zone
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-2 text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="Warehouse Area A">Warehouse Area A</option>
                <option value="North Perimeter">North Perimeter</option>
                <option value="Server Room Alpha">Server Room Alpha</option>
                <option value="Main Lobby Turnstiles">Main Lobby Turnstiles</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) =>
                  setSeverity(e.target.value as 'CRITICAL' | 'WARNING' | 'INFO')
                }
                className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-2 text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="WARNING">WARNING</option>
                <option value="INFO">INFO</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
                Trigger Entity
              </label>
              <select
                value={triggerEntity}
                onChange={(e) => setTriggerEntity(e.target.value)}
                className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-2 text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="Entity: Person">Entity: Person</option>
                <option value="Entity: Contractor">Entity: Contractor</option>
                <option value="Entity: Vehicle">Entity: Vehicle</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant font-label-caps uppercase text-[11px] mb-1">
                Automated Action
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full bg-[#0F172A] border border-outline-variant rounded py-1.5 px-2 text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="Alert Administrator">Alert Administrator</option>
                <option value="Lockdown Gate & Siren">Lockdown Gate & Siren</option>
                <option value="Notify SecOps Team">Notify SecOps Team</option>
                <option value="Log Flag & Snapshot">Log Flag & Snapshot</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-primary text-on-primary font-bold hover:bg-primary-fixed transition-colors shadow-sm"
            >
              Deploy Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
