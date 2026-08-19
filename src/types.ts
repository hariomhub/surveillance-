export type ViewTab = 'alerts' | 'fleet' | 'investigation' | 'rules' | 'relationships';

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  feedThumbnail: string;
  feedAlt: string;
  cameraCode: string;
  entityType: 'car' | 'person' | 'truck' | 'badge';
  entityIcon: string;
  alertTitle: string;
  location: string;
  timestamp: string;
  status: AlertStatus;
  correlationId?: string;
  confidence?: number;
  description?: string;
}

export interface TimelineStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  timestamp: string;
  cameraCode: string;
  thumbnail: string;
  altText: string;
  isFlagged?: boolean;
  entityName: string;
  lpr?: string;
  actionText?: string;
  systemLog?: string;
}

export interface InvolvedEntity {
  id: string;
  name: string;
  icon: string;
  iconColorClass: string;
  type?: string;
  plate?: string;
  registration?: string;
  currentStatus?: string;
  role?: string;
  faceIdMatch?: string;
  faceIdMatchClass?: string;
  apparel?: string;
  lastSeen?: string;
  originPath?: string;
  threatLevel?: string;
  threatLevelClass?: string;
  isHighThreat?: boolean;
}

export interface InvestigationCase {
  id: string; // e.g. CR-8841
  title: string;
  confidence: number;
  isFlagged: boolean;
  status: 'active' | 'escalated' | 'dismissed' | 'resolved';
  steps: TimelineStep[];
  entities: InvolvedEntity[];
}

export type CameraStatus = 'ONLINE' | 'OFFLINE' | 'DEGRADED';

export interface CameraNode {
  id: string;
  code: string;
  zone: string;
  zoneCategory: 'Perimeter' | 'Warehouse A' | 'Loading Dock' | 'Server Room' | 'Assembly';
  status: CameraStatus;
  streams: string;
  load: number | null; // e.g. 42%
  ingest: number | null; // e.g. 18.5 Mbps
  latency: number | null; // e.g. 120ms
  resolution: string;
  fps: number;
  feedUrl: string;
}

export interface LogicCondition {
  id: string;
  type: 'trigger' | 'spatial' | 'relational' | 'temporal';
  operator: 'WHEN' | 'AND' | 'AND NOT' | 'OR';
  title: string;
  chip1Icon: string;
  chip1Text: string;
  actionWord: string;
  chip2Icon: string;
  chip2Text: string;
  duration?: number;
  unit?: string;
}

export interface RuleAction {
  actionName: string;
  actionIcon: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

export interface SurveillanceRule {
  id: string; // RL-8992
  name: string;
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  isActive: boolean;
  lastTriggered: string;
  triggerEntity: string;
  targetEntity: string;
  zone: string;
  timeLimitMinutes: number;
  relationshipCondition: string;
  action: string;
  actionSeverity: string;
}

export interface RelationshipPairing {
  id: string;
  entityAName: string;
  entityAAvatar?: string;
  entityAInitials?: string;
  entityBLabel: string;
  entityBIcon: string;
  type: 'Contractor Access' | 'Facility Manager' | 'Registered Owner' | 'Temporary Visitor' | 'Security Personnel';
  registeredDate: string;
  authorizedBy: string;
  expirationDate?: string;
  notes?: string;
}
