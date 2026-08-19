import { AlertItem, CameraNode, InvestigationCase, RelationshipPairing, SurveillanceRule } from '../types';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-10492',
    severity: 'critical',
    feedThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDoSeODC6kxtK3HhuWs6ToUTPtBJNAaCHvThh2yy8whPtQRV5liraNo0xSTsa8_Pgze41vZ8uysjoaxaDbwPhTo5cWDWxqc0uq5xK90NTXSnRVE7P47b3ed63pUvORQ4N9P8G6BXXVXRDZbitNaZuhWIz1CGnlNvpj921BFEnCIszNB__XKwKx-WV4O7TRJKKf900ihti2YOlFvn81xKygAL8hK82y_u1JcDweLEHkWPSsaVUnNtNh2g',
    feedAlt: 'A grainy, low-light security camera feed showing a dark factory perimeter fence line at night. A faint, unauthorized vehicle is partially visible.',
    cameraCode: 'CAM-N01',
    entityType: 'car',
    entityIcon: 'directions_car',
    alertTitle: 'Unidentified Vehicle Entry',
    location: 'Gate 4 - South Perimeter',
    timestamp: '14:22:15',
    status: 'NEW',
    correlationId: 'CR-8841',
    confidence: 94,
    description: 'Black SUV crossed southern perimeter security checkpoint without valid RFID transponder.'
  },
  {
    id: 'ALT-10491',
    severity: 'warning',
    feedThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw8uAOxJWlhOJ4cV3EPNgYKT5sYDtu8GtzfoKlMEc9Xwm2djtTO_zYPZXGNSkpUvNK4AB0Jl_vB-PtZJACNeRfQBZiMSWv-U3n8JZuWS4S7H_dL4Znd0grzWoI6hobDKcezFNy2JzlIHueCs5rVw7sBTnIBglvjLSYBTZGRr5s2gCXGXoUvbOxHynvcaOGGJX3OuuB1FBI9ZYMQqq9aO_Ax_XZbFKuCa7CVH7n_Bw_KRcykt1vVivamg',
    feedAlt: 'A thermal style security camera feed showing an industrial assembly line floor with silhouetted figure in restricted zone.',
    cameraCode: 'CAM-A08',
    entityType: 'person',
    entityIcon: 'person',
    alertTitle: 'Personnel in Prohibited Zone',
    location: 'Assembly Line B - Zone 2',
    timestamp: '14:21:05',
    status: 'ACKNOWLEDGED',
    correlationId: 'CR-8820',
    confidence: 88,
    description: 'Unscheduled operator detected in active robotic arm operating envelope.'
  },
  {
    id: 'ALT-10490',
    severity: 'info',
    feedThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdteINAZakyyuNGYrkjscLqemnujkSEiJTvItAfeRCVEjhr9G7DD5u0CDkhAxvDbjebVbSRu1SDdmbH7LxX6BHnjt9umrCocKwEwg_ASPWnFCYjjDYkaNw4pI2EVQXg_7l7LRu5HG8oObHexXvjtccdQP6yVk3Na-rxprlf-akubzTHLRMH17MfNv35fWzw2WVv2S5NmJLnpzGErNZLKhK6wXiY5jwRrze75jPmBBzkUP_XDcJZN4dpA',
    feedAlt: 'A standard black and white closed-circuit television feed looking down an empty warehouse exterior corridor.',
    cameraCode: 'CAM-W14',
    entityType: 'person',
    entityIcon: 'person',
    alertTitle: 'Loitering Detected',
    location: 'Warehouse Exterior C',
    timestamp: '14:15:30',
    status: 'RESOLVED',
    confidence: 76,
    description: 'Subject remained in exterior camera view for over 4 minutes.'
  },
  {
    id: 'ALT-10489',
    severity: 'info',
    feedThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp8rlzVY4PR7e1l97d_rkwoWvwSmxAL1Pr5cioWkoenXTbECglcFiqY8HywgOhtB2YssOP2XVC2ML8tG5Ns-oK7gbRq5wGalz-VtXxzV34u8qR41iCCYhMkLRplfAjZfzf1PSESh3TvWjWaHc0vlsEg8knaXQK_e_t3ToVmdTiACHONCcKxlFeG75Ae4-mDQVabLcrXq6eYmuggU9uuhHXRqPqlbUmvEkgr0z-u-HYNhqucLFoHSo9YA',
    feedAlt: 'A grainy, overhead view of a factory parking lot from a security camera.',
    cameraCode: 'CAM-D03',
    entityType: 'truck',
    entityIcon: 'local_shipping',
    alertTitle: 'Extended Idle Time',
    location: 'Loading Dock 1',
    timestamp: '14:02:11',
    status: 'RESOLVED',
    confidence: 82,
    description: 'Freight vehicle parked in bay 1 exceeded designated 45-minute staging duration.'
  },
  {
    id: 'ALT-10488',
    severity: 'critical',
    feedThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM0o9hmC7WWPP576zwbBYvURkGlTVx6P7Qlg33uDmdncm5kMM3nZd_e_81uRlcY6tsPJ01Uink5bmzKrX_6c5HeGnJybMjEzof1JO1U2E9EaxXxPKAAq3MBqXFVDAfO_LPVTbI0hBrszK6gmX-zkXuwjIv-Ss75tP1UBFqigKUbdKCpbt0yKIQctgBZvXyT_Qj4hw6XHvZ8_ezKo-pT54qJ5PFav073ut1cnaptybpINjTX8vqWBYBJg',
    feedAlt: 'A distorted digital security feed showing a blurred figure running through a dark, restricted server room corridor.',
    cameraCode: 'CAM-S01',
    entityType: 'badge',
    entityIcon: 'person_alert',
    alertTitle: 'Unauthorized Access - Secure Zone',
    location: 'Server Room Alpha',
    timestamp: '13:58:44',
    status: 'NEW',
    correlationId: 'CR-8841',
    confidence: 96,
    description: 'Physical badge override failure followed by motion detection in Tier 3 datacenter.'
  }
];

export const INITIAL_INVESTIGATION: InvestigationCase = {
  id: 'CR-8841',
  title: 'Unauthorized Personnel Rendezvous',
  confidence: 94,
  isFlagged: true,
  status: 'active',
  steps: [
    {
      stepNumber: 1,
      title: 'Step 1 • Initial Detection',
      subtitle: 'North Gate Entry',
      timestamp: '10:05:22',
      cameraCode: 'CAM-N01',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZdQaRPqIVZH6yTSH9nsBqoWxFLi6h4tozp68TkdBG2Tgr9JRcZETEwq9HrOKw5fFEkHeD9x9H4cksVddSCZr5XJtw8lhGjFC4s3K-som92VkVMREEMp6lCp6lWRvksknxMrbw3EsX6McUk4vhoZ8mzINxNdIeaW-tRWAYgVdv4KvdOn5ERJbhadH97BftAg6dxXfKMLio8L67fIoq3rsNO75zrq6w0vBSk4Vii9lp0woi1b2rk853Q',
      altText: 'A high-contrast black and white security camera snapshot showing a dark SUV passing through a corporate security gate with license plate tracking.',
      entityName: 'Vehicle 1',
      lpr: 'MH01-CV-2023',
      actionText: 'Black SUV entered via Gate 1 without pre-cleared access authorization.'
    },
    {
      stepNumber: 2,
      title: 'Step 2 • Tracked Movement',
      subtitle: 'Staff Parking Area B',
      timestamp: '10:08:45',
      cameraCode: 'CAM-P04',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz7W8bJV_wCYKtCFV5lQ8pUjqBy0XkQUNUp77kKxlW0PhwGaIaoNZSctimChNUW0BJVxrXmSfzioMkki-wM-oMzqKsffeG6nyzpj0Vq2uD0gUKL3zrjY79_8NdGfvxqOUO21h1PDDALE3TaTE5_bKHh9rdgsJjh0ntJLsmHu2EkRCsDFafnzN1Rdx7O0kIwBV71pESPzpVoxetYrmqlGiZpq9h60Cmk2rhbB9ZaOso2tNV5dmeQZuwlg',
      altText: 'A medium-shot security camera still of a dark SUV parked in a corporate parking lot with driver disembarking.',
      entityName: 'Vehicle 1 parked. Person A exited.',
      actionText: 'Driver disembarked, heading East toward restricted perimeter.'
    },
    {
      stepNumber: 3,
      title: 'Step 3 • Flagged Event',
      subtitle: 'Unauthorized Rendezvous',
      timestamp: '10:11:02',
      cameraCode: 'CAM-S12',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuiHESaxe7yBTEsiOhbIh8qBl9DwDGVKzhAullAeSeQzRsn4CepfeM_Evw7ou_wMzhiYVFQaKbfDO9WDnFJt6fCwtFxGNpkBJsnrFUNJvmj7wQa65yRx6v5ssPMWDrNt5INNzkQw337zVviv3KVKfwHvvWPRJYWGej6CQm3XS7PpyLtq7p0aHJa0l8PEEm5QUeVNvvTHYGXD8hm4h4rlbSGDQgaXkq9HJCGL6W0oh7WsLOhKVLQGq6wQ',
      altText: 'A tense low-angle security camera view showing two silhouetted figures meeting near industrial structure.',
      isFlagged: true,
      entityName: 'Person A (Driver, Vehicle 1) met with Person B (Unknown) in Restricted Zone 4.',
      systemLog: `> CORRELATION_MATCH_FOUND\n> RULE_ID: R-449 (PROHIBITED_CONTACT)\n> DURATION: 00:02:14`
    }
  ],
  entities: [
    {
      id: 'ENT-V1',
      name: 'Vehicle 1',
      icon: 'directions_car',
      iconColorClass: 'text-secondary',
      type: 'SUV, Dark Color',
      plate: 'MH01-CV-2023',
      registration: 'External Contractor',
      currentStatus: 'Parked (Area B)'
    },
    {
      id: 'ENT-PA',
      name: 'Person A',
      icon: 'person',
      iconColorClass: 'text-primary',
      role: 'Driver (Vehicle 1)',
      faceIdMatch: 'FAILED (Obscured)',
      faceIdMatchClass: 'text-error font-data-mono',
      apparel: 'Dark Jacket, Cap',
      lastSeen: 'CAM-S12 (10:11)'
    },
    {
      id: 'ENT-PB',
      name: 'Person B',
      icon: 'person_search',
      iconColorClass: 'text-tertiary-container',
      role: 'Pedestrian',
      faceIdMatch: 'PENDING ANALYSIS',
      faceIdMatchClass: 'text-tertiary font-data-mono',
      originPath: 'Unknown (Blindspot)',
      threatLevel: 'ELEVATED',
      threatLevelClass: 'text-error font-bold',
      isHighThreat: true
    }
  ]
};

export const INITIAL_CAMERAS: CameraNode[] = [
  {
    id: 'cam-1',
    code: 'CAM-N-402',
    zone: 'North Perimeter',
    zoneCategory: 'Perimeter',
    status: 'ONLINE',
    streams: '2',
    load: 42,
    ingest: 18.5,
    latency: 120,
    resolution: '4K (3840x2160)',
    fps: 30,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDoSeODC6kxtK3HhuWs6ToUTPtBJNAaCHvThh2yy8whPtQRV5liraNo0xSTsa8_Pgze41vZ8uysjoaxaDbwPhTo5cWDWxqc0uq5xK90NTXSnRVE7P47b3ed63pUvORQ4N9P8G6BXXVXRDZbitNaZuhWIz1CGnlNvpj921BFEnCIszNB__XKwKx-WV4O7TRJKKf900ihti2YOlFvn81xKygAL8hK82y_u1JcDweLEHkWPSsaVUnNtNh2g'
  },
  {
    id: 'cam-2',
    code: 'WAREHOUSE-INT-02',
    zone: 'Warehouse A',
    zoneCategory: 'Warehouse A',
    status: 'OFFLINE',
    streams: '--',
    load: null,
    ingest: null,
    latency: null,
    resolution: '1080p (1920x1080)',
    fps: 0,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdteINAZakyyuNGYrkjscLqemnujkSEiJTvItAfeRCVEjhr9G7DD5u0CDkhAxvDbjebVbSRu1SDdmbH7LxX6BHnjt9umrCocKwEwg_ASPWnFCYjjDYkaNw4pI2EVQXg_7l7LRu5HG8oObHexXvjtccdQP6yVk3Na-rxprlf-akubzTHLRMH17MfNv35fWzw2WVv2S5NmJLnpzGErNZLKhK6wXiY5jwRrze75jPmBBzkUP_XDcJZN4dpA'
  },
  {
    id: 'cam-3',
    code: 'DOCK-S-11',
    zone: 'Loading Dock',
    zoneCategory: 'Loading Dock',
    status: 'DEGRADED',
    streams: '1/2',
    load: 98,
    ingest: 8.2,
    latency: 850,
    resolution: '2K (2560x1440)',
    fps: 15,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp8rlzVY4PR7e1l97d_rkwoWvwSmxAL1Pr5cioWkoenXTbECglcFiqY8HywgOhtB2YssOP2XVC2ML8tG5Ns-oK7gbRq5wGalz-VtXxzV34u8qR41iCCYhMkLRplfAjZfzf1PSESh3TvWjWaHc0vlsEg8knaXQK_e_t3ToVmdTiACHONCcKxlFeG75Ae4-mDQVabLcrXq6eYmuggU9uuhHXRqPqlbUmvEkgr0z-u-HYNhqucLFoHSo9YA'
  },
  {
    id: 'cam-4',
    code: 'CAM-N-405',
    zone: 'North Perimeter',
    zoneCategory: 'Perimeter',
    status: 'ONLINE',
    streams: '3',
    load: 65,
    ingest: 22.1,
    latency: 110,
    resolution: '4K (3840x2160)',
    fps: 60,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZdQaRPqIVZH6yTSH9nsBqoWxFLi6h4tozp68TkdBG2Tgr9JRcZETEwq9HrOKw5fFEkHeD9x9H4cksVddSCZr5XJtw8lhGjFC4s3K-som92VkVMREEMp6lCp6lWRvksknxMrbw3EsX6McUk4vhoZ8mzINxNdIeaW-tRWAYgVdv4KvdOn5ERJbhadH97BftAg6dxXfKMLio8L67fIoq3rsNO75zrq6w0vBSk4Vii9lp0woi1b2rk853Q'
  },
  {
    id: 'cam-5',
    code: 'CAM-N-406',
    zone: 'North Perimeter',
    zoneCategory: 'Perimeter',
    status: 'ONLINE',
    streams: '2',
    load: 38,
    ingest: 15.0,
    latency: 115,
    resolution: '4K (3840x2160)',
    fps: 30,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz7W8bJV_wCYKtCFV5lQ8pUjqBy0XkQUNUp77kKxlW0PhwGaIaoNZSctimChNUW0BJVxrXmSfzioMkki-wM-oMzqKsffeG6nyzpj0Vq2uD0gUKL3zrjY79_8NdGfvxqOUO21h1PDDALE3TaTE5_bKHh9rdgsJjh0ntJLsmHu2EkRCsDFafnzN1Rdx7O0kIwBV71pESPzpVoxetYrmqlGiZpq9h60Cmk2rhbB9ZaOso2tNV5dmeQZuwlg'
  },
  {
    id: 'cam-6',
    code: 'SRV-ALPHA-01',
    zone: 'Server Room Alpha',
    zoneCategory: 'Server Room',
    status: 'ONLINE',
    streams: '4',
    load: 54,
    ingest: 31.4,
    latency: 88,
    resolution: '4K (3840x2160)',
    fps: 60,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM0o9hmC7WWPP576zwbBYvURkGlTVx6P7Qlg33uDmdncm5kMM3nZd_e_81uRlcY6tsPJ01Uink5bmzKrX_6c5HeGnJybMjEzof1JO1U2E9EaxXxPKAAq3MBqXFVDAfO_LPVTbI0hBrszK6gmX-zkXuwjIv-Ss75tP1UBFqigKUbdKCpbt0yKIQctgBZvXyT_Qj4hw6XHvZ8_ezKo-pT54qJ5PFav073ut1cnaptybpINjTX8vqWBYBJg'
  },
  {
    id: 'cam-7',
    code: 'ASM-LINE-B02',
    zone: 'Assembly Line B',
    zoneCategory: 'Assembly',
    status: 'ONLINE',
    streams: '2',
    load: 49,
    ingest: 19.8,
    latency: 95,
    resolution: '1080p (1920x1080)',
    fps: 30,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw8uAOxJWlhOJ4cV3EPNgYKT5sYDtu8GtzfoKlMEc9Xwm2djtTO_zYPZXGNSkpUvNK4AB0Jl_vB-PtZJACNeRfQBZiMSWv-U3n8JZuWS4S7H_dL4Znd0grzWoI6hobDKcezFNy2JzlIHueCs5rVw7sBTnIBglvjLSYBTZGRr5s2gCXGXoUvbOxHynvcaOGGJX3OuuB1FBI9ZYMQqq9aO_Ax_XZbFKuCa7CVH7n_Bw_KRcykt1vVivamg'
  },
  {
    id: 'cam-8',
    code: 'DOCK-N-04',
    zone: 'Loading Dock',
    zoneCategory: 'Loading Dock',
    status: 'ONLINE',
    streams: '2',
    load: 40,
    ingest: 16.2,
    latency: 104,
    resolution: '2K (2560x1440)',
    fps: 30,
    feedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp8rlzVY4PR7e1l97d_rkwoWvwSmxAL1Pr5cioWkoenXTbECglcFiqY8HywgOhtB2YssOP2XVC2ML8tG5Ns-oK7gbRq5wGalz-VtXxzV34u8qR41iCCYhMkLRplfAjZfzf1PSESh3TvWjWaHc0vlsEg8knaXQK_e_t3ToVmdTiACHONCcKxlFeG75Ae4-mDQVabLcrXq6eYmuggU9uuhHXRqPqlbUmvEkgr0z-u-HYNhqucLFoHSo9YA'
  }
];

export const INITIAL_RULES: SurveillanceRule[] = [
  {
    id: 'RL-8992',
    name: 'Suspicious Loitering - Zone B',
    description: 'Triggers when an unrecognized person lingers near high-value storage without authorized vehicle context.',
    severity: 'CRITICAL',
    isActive: true,
    lastTriggered: '2m ago',
    triggerEntity: 'Entity: Person',
    targetEntity: 'Entity: Vehicle',
    zone: 'Warehouse Area A',
    timeLimitMinutes: 2,
    relationshipCondition: 'Known Relationships',
    action: 'Alert Administrator',
    actionSeverity: 'Warning'
  },
  {
    id: 'RL-8419',
    name: 'After Hours Perimeter Breach',
    description: 'Triggers on motion or entity tracking along fence lines between 22:00 and 06:00.',
    severity: 'WARNING',
    isActive: true,
    lastTriggered: '1h ago',
    triggerEntity: 'Entity: Person',
    targetEntity: 'Entity: Fence Boundary',
    zone: 'North Perimeter',
    timeLimitMinutes: 1,
    relationshipCondition: 'Security Cleared',
    action: 'Lockdown Gate & Siren',
    actionSeverity: 'Critical'
  },
  {
    id: 'RL-7033',
    name: 'Unauthorized Tailgating',
    description: 'Flags multiple pedestrians or vehicles passing turnstiles or gates on single badge scan.',
    severity: 'INFO',
    isActive: false,
    lastTriggered: 'Inactive',
    triggerEntity: 'Entity: Person',
    targetEntity: 'Entity: Turnstile',
    zone: 'Main Lobby Turnstiles',
    timeLimitMinutes: 1,
    relationshipCondition: 'Single Badge Holder',
    action: 'Log Flag & Snapshot',
    actionSeverity: 'Info'
  },
  {
    id: 'RL-6502',
    name: 'Unescorted Contractor in Datacenter',
    description: 'Alerts when visitor or contractor badge enters server halls without designated employee proximity.',
    severity: 'CRITICAL',
    isActive: true,
    lastTriggered: '5h ago',
    triggerEntity: 'Entity: Contractor',
    targetEntity: 'Entity: Employee Escort',
    zone: 'Server Room Alpha',
    timeLimitMinutes: 3,
    relationshipCondition: 'Escorted Access',
    action: 'Notify SecOps Team',
    actionSeverity: 'Critical'
  }
];

export const INITIAL_RELATIONSHIPS: RelationshipPairing[] = [
  {
    id: 'rel-1',
    entityAName: 'Rajesh Kumar',
    entityAAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMDkm4glEQjCWBYCBfVtK0pM1HUH9RHQw1BMWyDUb_ngnGwIA2SXXLN7swCMNyiMCrlI3Pt99o3jIupqogcEWELymT7Fsl_2F4HRlyfGPWiPdS3Kcot7aV2FsF6sRAuRxb31ZstgttFNSX-6q4AoNyvIGYHusi2xpFUs39NuaJ9phviiMq9uWdUb_draI22cA8nhaV5jUmYt_taxH4zsWA6-OHoad6qGYtVB1kWdOKVcRlwlGOajG-Jg',
    entityBLabel: 'MH12-BT-9988',
    entityBIcon: 'directions_car',
    type: 'Contractor Access',
    registeredDate: '2023-10-24',
    authorizedBy: 'S. Gupta (Admin)',
    expirationDate: '2027-12-31',
    notes: 'Approved for loading dock and contractor parking lot access.'
  },
  {
    id: 'rel-2',
    entityAName: 'Elena Rostova',
    entityAInitials: 'EL',
    entityBLabel: 'ZONE-A-KEYCARD',
    entityBIcon: 'badge',
    type: 'Facility Manager',
    registeredDate: '2023-09-12',
    authorizedBy: 'System Auto',
    expirationDate: '2028-06-30',
    notes: 'Universal facility maintenance keycard token.'
  },
  {
    id: 'rel-3',
    entityAName: 'Sarah Jenkins',
    entityAAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6i5YDT_K8r75dG-BGL0gIF8yzV4J6qJHeO9QML_5CLaPuK75ekPXpN9uZNwRBTXxHfyy7d7oKZF8raKora9FD2QIeFGr6A5vBC1ybnvNAmEK7BRNzuBW9v9Gj7ogJvGi0-JlErpq0EhlYdam7t3LqBjpvaKhFkhEzl6gyYmO0Bw5zMLvFseKE_j25gdV6HEXrs6PictGxgoA-sG_3fkZbNchW-dg5R4vvCXhXCsS0Da_J0UkWEmuC0Q',
    entityBLabel: 'CA-778-XYZ',
    entityBIcon: 'directions_car',
    type: 'Registered Owner',
    registeredDate: '2023-08-05',
    authorizedBy: 'M. Davis (HR)',
    expirationDate: '2029-01-01',
    notes: 'Executive priority parking bay 04 assignment.'
  },
  {
    id: 'rel-4',
    entityAName: 'David Chen',
    entityAInitials: 'DC',
    entityBLabel: 'SRV-ROOM-KEY-08',
    entityBIcon: 'vpn_key',
    type: 'Facility Manager',
    registeredDate: '2024-01-15',
    authorizedBy: 'K. Vance (SecOps)',
    expirationDate: '2026-12-31',
    notes: 'Hardware infrastructure team lead authorized access.'
  }
];
