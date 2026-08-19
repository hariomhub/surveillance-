import React, { useState } from 'react';
import { RelationshipPairing } from '../types';

interface RelationshipsViewProps {
  relationships: RelationshipPairing[];
  searchQuery: string;
  onAddPairing: (pairing: Omit<RelationshipPairing, 'id' | 'registeredDate' | 'authorizedBy'>) => void;
  onDeletePairing: (id: string) => void;
}

export const RelationshipsView: React.FC<RelationshipsViewProps> = ({
  relationships,
  searchQuery,
  onAddPairing,
  onDeletePairing
}) => {
  // Form fields
  const [primaryEntity, setPrimaryEntity] = useState('');
  const [associatedEntity, setAssociatedEntity] = useState('');
  const [relationshipType, setRelationshipType] = useState<
    'Contractor Access' | 'Facility Manager' | 'Registered Owner' | 'Temporary Visitor' | 'Security Personnel'
  >('Registered Owner');
  const [expirationDate, setExpirationDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleClear = () => {
    setPrimaryEntity('');
    setAssociatedEntity('');
    setRelationshipType('Registered Owner');
    setExpirationDate('');
    setNotes('');
    setFormError(null);
  };

  const handleSavePairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryEntity.trim()) {
      setFormError('Primary Entity name is required.');
      return;
    }
    if (!associatedEntity.trim()) {
      setFormError('Associated Entity (Plate / Asset Tag / Badge) is required.');
      return;
    }

    const isPlate = /^[A-Z0-9-]+$/.test(associatedEntity.trim().toUpperCase());

    onAddPairing({
      entityAName: primaryEntity.trim(),
      entityAInitials: primaryEntity
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      entityBLabel: associatedEntity.trim().toUpperCase(),
      entityBIcon: isPlate ? 'directions_car' : 'badge',
      type: relationshipType,
      expirationDate: expirationDate || undefined,
      notes: notes.trim() || undefined
    });

    handleClear();
    setToastMessage(`Whitelisted association for "${primaryEntity}" saved to registry.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredRelationships = relationships.filter((rel) => {
    if (typeFilter !== 'all' && rel.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rel.entityAName.toLowerCase().includes(q) ||
        rel.entityBLabel.toLowerCase().includes(q) ||
        rel.type.toLowerCase().includes(q) ||
        rel.authorizedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredRelationships.length / itemsPerPage) || 1;
  const paginatedList = filteredRelationships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Entity A,Entity B,Type,Registered,Authorized By,Notes']
        .concat(
          filteredRelationships.map(
            (r) =>
              `"${r.id}","${r.entityAName}","${r.entityBLabel}","${r.type}","${r.registeredDate}","${r.authorizedBy}","${r.notes || ''}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `known_relationships_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="md:ml-64 mt-16 p-margin-page flex-1 flex flex-col lg:flex-row overflow-y-auto lg:h-[calc(100vh-64px)] lg:overflow-hidden gap-margin-page bg-[#0F172A] relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed lg:absolute top-4 right-4 left-4 sm:left-auto sm:right-8 z-50 bg-surface-container border border-primary text-on-surface px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-primary">link</span>
          <span className="font-body-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Left Panel: Data Table */}
      <div className="w-full lg:flex-1 bg-[#1E293B] border border-[#334155] rounded flex flex-col overflow-visible lg:overflow-hidden shadow-sm">
        {/* Table Header Toolbar */}
        <div className="p-4 border-b border-[#334155] flex items-center justify-between bg-surface-container-low">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Known Relationships
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Whitelist associations and access delegations.
            </p>
          </div>
          <div className="flex items-center gap-2 relative">
            {/* Filter */}
            <button
              id="btn-filter-relationships"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`border rounded px-3 py-1.5 font-body-sm flex items-center gap-2 transition-colors cursor-pointer ${
                typeFilter !== 'all'
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-[#334155] text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>

            {showFilterMenu && (
              <div className="absolute right-24 top-10 w-52 bg-surface-container-highest border border-outline-variant rounded shadow-xl p-2 z-30 space-y-1">
                {['all', 'Contractor Access', 'Facility Manager', 'Registered Owner', 'Temporary Visitor'].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTypeFilter(t);
                        setShowFilterMenu(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                        typeFilter === t
                          ? 'bg-primary text-on-primary font-bold'
                          : 'text-on-surface hover:bg-surface-variant'
                      }`}
                    >
                      {t === 'all' ? 'All Types' : t}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Export */}
            <button
              id="btn-export-relationships"
              onClick={handleExport}
              className="border border-[#334155] text-on-surface px-3 py-1.5 rounded font-body-sm flex items-center gap-2 hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="lg:flex-1 overflow-x-auto lg:overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#1E293B] z-10 shadow-[0_1px_0_0_#334155]">
              <tr>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155]">
                  Entity A
                </th>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155]">
                  Entity B
                </th>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155]">
                  Type
                </th>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155]">
                  Registered
                </th>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155]">
                  Authorized By
                </th>
                <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold border-b border-[#334155] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm divide-y divide-[#334155]">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    No relationships found. Use the panel on the right to add a new pairing.
                  </td>
                </tr>
              ) : (
                paginatedList.map((rel) => (
                  <tr
                    key={rel.id}
                    className="hover:bg-[#334155]/60 h-table-row-height transition-colors group relative cursor-pointer"
                  >
                    {/* Entity A */}
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {rel.entityAAvatar ? (
                          <img
                            src={rel.entityAAvatar}
                            alt={rel.entityAName}
                            className="w-6 h-6 rounded-sm border border-[#334155] object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-sm border border-[#334155] bg-surface-container flex items-center justify-center">
                            <span className="font-label-caps text-[10px] text-on-surface-variant">
                              {rel.entityAInitials || rel.entityAName.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-on-surface">{rel.entityAName}</span>
                      </div>
                    </td>

                    {/* Entity B */}
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                          {rel.entityBIcon || 'directions_car'}
                        </span>
                        <span className="font-data-mono text-data-mono text-secondary">
                          {rel.entityBLabel}
                        </span>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="py-2 px-4 whitespace-nowrap">
                      {rel.type === 'Contractor Access' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary-container/10 text-primary border border-primary/20">
                          Contractor Access
                        </span>
                      ) : rel.type === 'Facility Manager' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-tertiary-container/10 text-tertiary border border-tertiary/20">
                          Facility Manager
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-secondary-container/20 text-on-secondary-container border border-secondary/20">
                          {rel.type}
                        </span>
                      )}
                    </td>

                    {/* Registered */}
                    <td className="py-2 px-4 whitespace-nowrap font-data-mono text-data-mono text-on-surface-variant">
                      {rel.registeredDate}
                    </td>

                    {/* Authorized By */}
                    <td className="py-2 px-4 whitespace-nowrap text-on-surface-variant">
                      {rel.authorizedBy}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-2 px-4 whitespace-nowrap text-right relative">
                      <button
                        onClick={() =>
                          setActiveActionMenuId(activeActionMenuId === rel.id ? null : rel.id)
                        }
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1"
                        title="Actions"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>

                      {activeActionMenuId === rel.id && (
                        <div className="absolute right-4 top-8 w-32 bg-surface-container-highest border border-outline-variant rounded shadow-2xl p-1 z-30">
                          <button
                            onClick={() => {
                              onDeletePairing(rel.id);
                              setActiveActionMenuId(null);
                              setToastMessage(`Pairing for ${rel.entityAName} revoked.`);
                            }}
                            className="w-full text-left px-2 py-1.5 text-[11px] text-error hover:bg-error/10 rounded flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            Revoke Access
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-[#334155] bg-surface-container-lowest flex flex-wrap items-center justify-between gap-2 font-body-sm text-on-surface-variant">
          <span>
            Showing {paginatedList.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredRelationships.length)} of{' '}
            {filteredRelationships.length} records
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-surface-container disabled:opacity-40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="px-2 font-data-mono text-data-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-surface-container disabled:opacity-40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Add New Pairing Form */}
      <div className="w-full lg:w-96 bg-[#1E293B] border border-[#334155] rounded flex flex-col overflow-visible lg:overflow-hidden shrink-0 shadow-sm">
        <div className="p-4 border-b border-[#334155] bg-surface-container-low">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_link</span>
            Add New Pairing
          </h3>
        </div>

        <div className="p-4 lg:flex-1 overflow-visible lg:overflow-y-auto">
          <form onSubmit={handleSavePairing} className="space-y-4">
            {formError && (
              <div className="p-2.5 rounded bg-error/10 border border-error/30 text-error font-body-sm text-[12px]">
                {formError}
              </div>
            )}

            {/* Primary Entity */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                Primary Entity
              </label>
              <div className="relative border border-[#334155] focus-within:border-primary rounded bg-[#0F172A] flex items-center transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant ml-2 text-[18px]">
                  person_search
                </span>
                <input
                  id="input-pairing-primary-entity"
                  type="text"
                  value={primaryEntity}
                  onChange={(e) => {
                    setPrimaryEntity(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="Search Person or ID..."
                  className="bg-transparent border-none outline-none text-on-surface w-full font-body-sm py-2 px-2 focus:ring-0"
                />
              </div>
            </div>

            {/* Associated Entity */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                Associated Entity
              </label>
              <div className="relative border border-[#334155] focus-within:border-primary rounded bg-[#0F172A] flex items-center transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant ml-2 text-[18px]">
                  qr_code_scanner
                </span>
                <input
                  id="input-pairing-associated-entity"
                  type="text"
                  value={associatedEntity}
                  onChange={(e) => {
                    setAssociatedEntity(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="Vehicle Plate, Asset Tag..."
                  className="bg-transparent border-none outline-none text-on-surface w-full font-body-sm py-2 px-2 focus:ring-0"
                />
              </div>
            </div>

            {/* Relationship Type */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                Relationship Type
              </label>
              <div className="relative">
                <select
                  id="select-pairing-type"
                  value={relationshipType}
                  onChange={(e) =>
                    setRelationshipType(
                      e.target.value as
                        | 'Contractor Access'
                        | 'Facility Manager'
                        | 'Registered Owner'
                        | 'Temporary Visitor'
                        | 'Security Personnel'
                    )
                  }
                  className="w-full bg-[#0F172A] border border-[#334155] rounded text-on-surface font-body-sm py-2 px-3 focus:border-primary focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Registered Owner">Registered Owner</option>
                  <option value="Contractor Access">Contractor Access</option>
                  <option value="Temporary Visitor">Temporary Visitor</option>
                  <option value="Facility Manager">Facility Manager</option>
                  <option value="Security Personnel">Security Personnel</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Expiration Date */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                Expiration Date (Optional)
              </label>
              <div className="relative border border-[#334155] focus-within:border-primary rounded bg-[#0F172A] flex items-center transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant ml-2 text-[18px]">
                  calendar_today
                </span>
                <input
                  id="input-pairing-expiration"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="bg-transparent border-none outline-none text-on-surface w-full font-body-sm py-2 px-2 focus:ring-0 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Notes / Justification */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                Notes / Justification
              </label>
              <textarea
                id="input-pairing-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter authorization details..."
                rows={3}
                className="w-full bg-[#0F172A] border border-[#334155] rounded text-on-surface font-body-sm py-2 px-3 focus:border-primary focus:outline-none resize-none"
              />
            </div>
          </form>
        </div>

        {/* Form Action Buttons */}
        <div className="p-4 border-t border-[#334155] bg-surface-container-lowest flex items-center justify-end gap-3">
          <button
            id="btn-pairing-clear"
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded border border-[#334155] text-on-surface font-body-sm hover:bg-surface-container transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            id="btn-pairing-save"
            type="button"
            onClick={handleSavePairing}
            className="px-4 py-2 rounded bg-primary text-on-primary font-body-sm font-medium hover:bg-primary-fixed transition-colors cursor-pointer shadow-sm"
          >
            Save Pairing
          </button>
        </div>
      </div>
    </main>
  );
};
