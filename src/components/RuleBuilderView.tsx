import React, { useState } from 'react';
import { SurveillanceRule } from '../types';

interface RuleBuilderViewProps {
  rules: SurveillanceRule[];
  onToggleRule: (ruleId: string) => void;
  onSaveRule: (updatedRule: SurveillanceRule) => void;
}

export const RuleBuilderView: React.FC<RuleBuilderViewProps> = ({
  rules,
  onToggleRule,
  onSaveRule
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(rules[0]?.id || 'RL-8992');
  const [searchFilter, setSearchFilter] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active selected rule
  const activeRule = rules.find((r) => r.id === selectedRuleId) || rules[0];

  // Local editable state for current rule
  const [ruleName, setRuleName] = useState(activeRule.name);
  const [ruleDesc, setRuleDesc] = useState(activeRule.description);
  const [triggerEntity, setTriggerEntity] = useState(activeRule.triggerEntity);
  const [targetEntity, setTargetEntity] = useState(activeRule.targetEntity);
  const [zone, setZone] = useState(activeRule.zone);
  const [timeLimit, setTimeLimit] = useState(activeRule.timeLimitMinutes);
  const [relationCondition, setRelationCondition] = useState(activeRule.relationshipCondition);
  const [actionName, setActionName] = useState(activeRule.action);
  const [actionSeverity, setActionSeverity] = useState(activeRule.actionSeverity);

  // Sync state when selected rule changes
  const handleSelectRule = (rule: SurveillanceRule) => {
    setSelectedRuleId(rule.id);
    setRuleName(rule.name);
    setRuleDesc(rule.description);
    setTriggerEntity(rule.triggerEntity);
    setTargetEntity(rule.targetEntity);
    setZone(rule.zone);
    setTimeLimit(rule.timeLimitMinutes);
    setRelationCondition(rule.relationshipCondition);
    setActionName(rule.action);
    setActionSeverity(rule.actionSeverity);
  };

  const handleSave = () => {
    const updated: SurveillanceRule = {
      ...activeRule,
      name: ruleName,
      description: ruleDesc,
      triggerEntity,
      targetEntity,
      zone,
      timeLimitMinutes: Number(timeLimit) || 2,
      relationshipCondition: relationCondition,
      action: actionName,
      actionSeverity
    };
    onSaveRule(updated);
    setToastMessage(`Rule ${updated.id} saved successfully! Engine updated.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDiscard = () => {
    handleSelectRule(activeRule);
    setToastMessage('Draft changes discarded.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult('Ingesting mock stream feeds and testing spatial-temporal bounds...');
    setTimeout(() => {
      setSimulationResult(
        `✓ SIMULATION SUCCESSFUL (Latency 14ms)\n• Evaluated 120 mock telemetry vectors\n• 2 synthetic rule matches triggered against [${zone}]\n• Action [${actionName} - ${actionSeverity}] queued.`
      );
    }, 1200);
  };

  const filteredRules = rules.filter((r) =>
    r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <main className="md:ml-64 pt-16 flex-1 lg:h-screen overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row bg-background relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed lg:absolute top-20 right-4 left-4 sm:left-auto sm:right-8 z-50 bg-surface-container border border-primary text-on-surface px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <span className="font-body-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Inner Sidebar: Rules List */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-dim flex flex-col lg:h-full shrink-0">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface">
          <h2 className="font-body-md text-body-md font-semibold text-on-surface">
            Active Rules ({rules.length})
          </h2>
          <button className="text-primary hover:text-primary-fixed cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>

        <div className="p-2 border-b border-outline-variant bg-surface-container-lowest">
          <div className="relative flex items-center w-full h-8 rounded bg-surface-container border border-outline-variant focus-within:border-primary transition-colors px-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[16px] mr-2">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search rules..."
              className="bg-transparent border-none text-on-surface font-body-sm text-body-sm w-full focus:ring-0 p-0 placeholder:text-on-surface-variant focus:outline-none"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="text-on-surface-variant hover:text-on-surface text-[12px]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[45vh] lg:max-h-none lg:flex-1 overflow-y-auto p-2 space-y-1">
          {filteredRules.map((rule) => {
            const isSelected = rule.id === selectedRuleId;

            return (
              <div
                key={rule.id}
                onClick={() => handleSelectRule(rule)}
                className={`p-3 rounded border transition-colors cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-primary bg-surface-container-high'
                    : 'border-outline-variant bg-surface-container hover:bg-surface-variant'
                } ${!rule.isActive ? 'opacity-70' : ''}`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}

                <div className="flex justify-between items-start mb-2">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface block pr-8 truncate">
                    {rule.name}
                  </span>

                  {/* Toggle switch */}
                  <div
                    className="absolute right-3 top-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRule(rule.id);
                    }}
                  >
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.isActive}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-7 h-4 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {rule.severity === 'CRITICAL' ? (
                    <span className="px-1.5 py-0.5 rounded-sm bg-error-container/20 border border-error-container text-error font-data-mono text-[10px]">
                      CRITICAL
                    </span>
                  ) : rule.severity === 'WARNING' ? (
                    <span className="px-1.5 py-0.5 rounded-sm bg-tertiary-container/20 border border-tertiary-container text-tertiary font-data-mono text-[10px]">
                      WARNING
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-sm bg-surface-variant border border-outline-variant text-on-surface-variant font-data-mono text-[10px]">
                      INFO
                    </span>
                  )}

                  <span className="text-on-surface-variant font-body-sm text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {rule.lastTriggered}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Panel */}
      <div className="flex-1 flex flex-col lg:h-full overflow-visible lg:overflow-hidden relative">
        {/* Background dotted pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Editor Header */}
        <div className="px-margin-page py-4 border-b border-outline-variant bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
          <div className="flex-1 max-w-2xl min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <input
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="font-headline-sm text-headline-sm font-semibold text-on-surface m-0 p-0 bg-transparent border-b border-transparent hover:border-outline-variant focus:border-primary focus:outline-none transition-colors w-full max-w-md"
              />
              <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-data-mono text-[11px] shrink-0">
                ID: {activeRule.id}
              </span>
            </div>
            <input
              type="text"
              value={ruleDesc}
              onChange={(e) => setRuleDesc(e.target.value)}
              className="font-body-sm text-body-sm text-on-surface-variant bg-transparent border-b border-transparent hover:border-outline-variant focus:border-primary focus:outline-none transition-colors w-full"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              id="btn-discard-rule-draft"
              onClick={handleDiscard}
              className="px-3 py-1.5 rounded border border-outline-variant bg-transparent hover:bg-surface-variant text-on-surface font-body-sm text-body-sm transition-colors cursor-pointer"
            >
              Discard Draft
            </button>
            <button
              id="btn-save-rule-draft"
              onClick={handleSave}
              className="px-3 py-1.5 rounded border border-primary bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:bg-primary-fixed transition-colors cursor-pointer shadow-sm"
            >
              Save Rule
            </button>
          </div>
        </div>

        {/* Visual Logic Canvas */}
        <div className="flex-1 overflow-y-auto p-margin-page z-10">
          <div className="max-w-4xl mx-auto space-y-4 pb-4 lg:pb-28">
            {/* Logic Block: WHEN */}
            <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
              <div className="px-4 py-2 border-b border-outline-variant bg-surface-variant/50 flex items-center gap-2">
                <span className="font-data-mono text-primary font-bold text-sm">WHEN</span>
                <span className="text-on-surface-variant text-xs">Trigger Condition</span>
              </div>
              <div className="p-4 flex flex-wrap items-center gap-2">
                {/* Trigger entity dropdown chip */}
                <div className="inline-flex items-center h-8 rounded border border-outline-variant bg-surface hover:border-primary transition-colors px-2 group relative">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] mr-1.5 group-hover:text-primary">
                    person
                  </span>
                  <select
                    value={triggerEntity}
                    onChange={(e) => setTriggerEntity(e.target.value)}
                    className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Entity: Person" className="bg-surface text-on-surface">
                      Entity: Person
                    </option>
                    <option value="Entity: Contractor" className="bg-surface text-on-surface">
                      Entity: Contractor
                    </option>
                    <option value="Entity: Vehicle" className="bg-surface text-on-surface">
                      Entity: Vehicle
                    </option>
                    <option value="Entity: Turnstile" className="bg-surface text-on-surface">
                      Entity: Turnstile
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>

                <span className="font-data-mono text-on-surface-variant text-xs px-1 font-bold">
                  EXITS
                </span>

                {/* Target entity dropdown chip */}
                <div className="inline-flex items-center h-8 rounded border border-outline-variant bg-surface hover:border-primary transition-colors px-2 group relative">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] mr-1.5 group-hover:text-primary">
                    directions_car
                  </span>
                  <select
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Entity: Vehicle" className="bg-surface text-on-surface">
                      Entity: Vehicle
                    </option>
                    <option value="Entity: Fence Boundary" className="bg-surface text-on-surface">
                      Entity: Fence Boundary
                    </option>
                    <option value="Entity: Turnstile" className="bg-surface text-on-surface">
                      Entity: Turnstile
                    </option>
                    <option value="Entity: Employee Escort" className="bg-surface text-on-surface">
                      Entity: Employee Escort
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>

                <button
                  onClick={() => setToastMessage('Sub-condition added to trigger scope.')}
                  className="w-8 h-8 rounded border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors ml-1 cursor-pointer"
                  title="Add sub-condition"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            {/* Logic Block: AND (Spatial Context) */}
            <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden relative">
              <div className="absolute -top-4 left-6 w-px h-4 bg-outline-variant" />
              <div className="px-4 py-2 border-b border-outline-variant bg-surface-variant/50 flex items-center gap-2">
                <span className="font-data-mono text-secondary font-bold text-sm">AND</span>
                <span className="text-on-surface-variant text-xs">Spatial Context</span>
              </div>
              <div className="p-4 flex flex-wrap items-center gap-2">
                <span className="font-data-mono text-on-surface-variant text-xs px-1 font-bold">
                  ENTERS
                </span>

                {/* Zone dropdown */}
                <div className="inline-flex items-center h-8 rounded border border-outline-variant bg-surface hover:border-primary transition-colors px-2 group relative">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] mr-1.5 group-hover:text-primary">
                    location_on
                  </span>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Warehouse Area A" className="bg-surface text-on-surface">
                      Zone: Warehouse Area A
                    </option>
                    <option value="North Perimeter" className="bg-surface text-on-surface">
                      Zone: North Perimeter
                    </option>
                    <option value="Server Room Alpha" className="bg-surface text-on-surface">
                      Zone: Server Room Alpha
                    </option>
                    <option value="Main Lobby Turnstiles" className="bg-surface text-on-surface">
                      Zone: Main Lobby Turnstiles
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>

                <span className="font-data-mono text-on-surface-variant text-xs px-1">within</span>

                {/* Time Limit Input */}
                <div className="inline-flex items-center h-8 rounded border border-outline-variant bg-surface hover:border-primary focus-within:border-primary transition-colors px-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] mr-1.5">
                    timer
                  </span>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    min={1}
                    max={60}
                    className="w-8 bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:ring-0 p-0 text-center font-data-mono focus:outline-none"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface ml-1 mr-2">
                    minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Logic Block: AND Relational Logic */}
            <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden relative">
              <div className="absolute -top-4 left-6 w-px h-4 bg-outline-variant" />
              <div className="px-4 py-2 border-b border-outline-variant bg-surface-variant/50 flex items-center gap-2">
                <span className="font-data-mono text-secondary font-bold text-sm">AND</span>
                <span className="text-on-surface-variant text-xs">Relational Logic</span>
              </div>
              <div className="p-4 flex flex-wrap items-center gap-2">
                <span className="font-data-mono text-on-surface-variant text-xs px-1">pairing</span>
                <span className="font-data-mono text-error font-bold text-xs px-1">NOT IN</span>

                {/* Relationship Condition */}
                <div className="inline-flex items-center h-8 rounded border border-outline-variant bg-surface hover:border-primary transition-colors px-2 group relative">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] mr-1.5 group-hover:text-primary">
                    hub
                  </span>
                  <select
                    value={relationCondition}
                    onChange={(e) => setRelationCondition(e.target.value)}
                    className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Known Relationships" className="bg-surface text-on-surface">
                      Known Relationships
                    </option>
                    <option value="Security Cleared" className="bg-surface text-on-surface">
                      Security Cleared
                    </option>
                    <option value="Single Badge Holder" className="bg-surface text-on-surface">
                      Single Badge Holder
                    </option>
                    <option value="Escorted Access" className="bg-surface text-on-surface">
                      Escorted Access
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>
              </div>
            </div>

            {/* Add Condition Button */}
            <div className="relative py-2 pl-8">
              <div className="absolute top-0 bottom-0 left-6 w-px border-l border-dashed border-outline-variant" />
              <button
                onClick={() => setToastMessage('New relational condition slot attached.')}
                className="bg-surface-variant hover:bg-outline-variant text-on-surface-variant text-xs font-data-mono py-1 px-3 rounded border border-outline-variant transition-colors flex items-center gap-1 z-10 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span> ADD CONDITION
              </button>
            </div>

            {/* Logic Block: THEN Action Execution */}
            <div className="bg-surface-container-high rounded-lg border border-primary/30 shadow-sm overflow-hidden relative mt-2">
              <div className="absolute -top-6 left-6 w-px h-6 bg-primary/30" />
              <div className="px-4 py-2 border-b border-primary/20 bg-primary/5 flex items-center gap-2">
                <span className="font-data-mono text-primary font-bold text-sm">THEN</span>
                <span className="text-primary/70 text-xs font-medium">Action Execution</span>
              </div>
              <div className="p-4 flex flex-wrap items-center gap-2">
                {/* Action dropdown chip */}
                <div className="inline-flex items-center h-8 rounded border border-primary/40 bg-surface hover:border-primary transition-colors px-2 group relative">
                  <span className="material-symbols-outlined text-primary text-[14px] mr-1.5">
                    notifications_active
                  </span>
                  <select
                    value={actionName}
                    onChange={(e) => setActionName(e.target.value)}
                    className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Alert Administrator" className="bg-surface text-on-surface">
                      Alert Administrator
                    </option>
                    <option value="Lockdown Gate & Siren" className="bg-surface text-on-surface">
                      Lockdown Gate & Siren
                    </option>
                    <option value="Notify SecOps Team" className="bg-surface text-on-surface">
                      Notify SecOps Team
                    </option>
                    <option value="Log Flag & Snapshot" className="bg-surface text-on-surface">
                      Log Flag & Snapshot
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>

                <span className="font-data-mono text-on-surface-variant text-xs px-1">
                  with severity
                </span>

                {/* Severity dropdown chip */}
                <div className="inline-flex items-center h-8 rounded border border-tertiary-container/50 bg-tertiary-container/10 hover:border-tertiary-container transition-colors px-2 group relative">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      actionSeverity === 'Critical'
                        ? 'bg-error'
                        : actionSeverity === 'Warning'
                        ? 'bg-tertiary'
                        : 'bg-primary'
                    }`}
                  />
                  <select
                    value={actionSeverity}
                    onChange={(e) => setActionSeverity(e.target.value)}
                    className="bg-transparent border-none text-tertiary font-body-sm text-body-sm font-medium focus:outline-none appearance-none pr-4 cursor-pointer"
                  >
                    <option value="Critical" className="bg-surface text-error">
                      Critical
                    </option>
                    <option value="Warning" className="bg-surface text-tertiary">
                      Warning
                    </option>
                    <option value="Info" className="bg-surface text-primary">
                      Info
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-tertiary/70 text-[16px] pointer-events-none absolute right-1">
                    arrow_drop_down
                  </span>
                </div>

                <button
                  onClick={() => setToastMessage('Secondary webhook action appended.')}
                  className="w-8 h-8 rounded border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors ml-1 cursor-pointer"
                  title="Add secondary action"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar (Testing / Engine Active) */}
        <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 p-4 border-t border-outline-variant bg-surface/90 backdrop-blur-xs z-20 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-data-mono text-xs text-on-surface-variant">
              Rule Engine Active
            </span>
          </div>
          <button
            id="btn-run-rule-simulation"
            onClick={handleRunSimulation}
            className="px-4 py-1.5 rounded border border-outline-variant bg-surface-variant hover:bg-outline-variant text-on-surface font-body-sm text-body-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Run Simulation
          </button>
        </div>
      </div>

      {/* Simulation Result Dialog */}
      {isSimulating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container border border-outline-variant rounded-lg max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">developer_board</span>
                <h3 className="font-headline-sm text-on-surface font-bold">
                  Rule Simulation Harness
                </h3>
              </div>
              <button
                onClick={() => setIsSimulating(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded border border-outline-variant font-data-mono text-[12px] text-primary whitespace-pre-wrap leading-relaxed">
              {simulationResult}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsSimulating(false)}
                className="px-4 py-2 bg-primary text-on-primary rounded font-body-sm font-bold hover:bg-primary-fixed"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
