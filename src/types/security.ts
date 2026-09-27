export interface EnterprisePermissions {
  readOnlyTelemetryAccess: boolean; // Permission to read physical metrics (QBER, phase noise, packet timing)
  virtualPathRerouting: boolean; // API permission to trigger network routing rules (diverting to Honeypot)
}

export type AttackTier = 'tier1' | 'tier2' | 'tier3' | 'behavioral';

export interface AttackVector {
  id: string;
  name: string;
  tier: AttackTier;
  tierLabel: string;
  concept: string;
  signatureMetrics: {
    qber: number; // baseline 1.4%
    phaseDrift: number; // degrees
    opticalPowerDelta: string; // e.g. "+14.2 dBm"
    entropyDrop: number; // %
    packetTimingDelta: string; // e.g. "+38 ms"
    signatureScore: number; // 0 to 1
  };
  threatScore: number; // 0 to 100
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Baseline';
  xaiReason: string;
  recommendedAction: string;
  isFalsePositiveCandidate?: boolean;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  user: string;
  event: string;
  threatType: string;
  riskScore: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Normal';
  status: 'Verified' | 'Blocked' | 'Diverted' | 'Investigating' | 'Resolved';
  virtualPathRouted?: boolean;
}

export interface DigitalDocSignature {
  id: string;
  fileName: string;
  fileSize: string;
  fileHash: string;
  algorithm: string;
  signatureValue: string;
  createdAt: string;
  user: string;
  isValid: boolean;
  isTampered: boolean;
}

export interface QuantumStateVector {
  alphaReal: number;
  alphaImag: number;
  betaReal: number;
  betaImag: number;
  stateLabel: string;
}

export interface BlochCoordinates {
  x: number;
  y: number;
  z: number;
  theta: number; // polar angle in radians
  phi: number; // azimuthal angle in radians
}
