export type DataSourceType = 
  | 'Calculated' 
  | 'Ground Data' 
  | 'Reference Data' 
  | 'AI Estimated' 
  | 'AI Prediction' 
  | 'Official Calculated Result';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type MaterialType = 'Aluminium' | 'Copper' | 'Steel' | 'Lithium' | 'Nickel' | 'Zinc';

export type SystemBoundary = 'Cradle-to-Gate' | 'Cradle-to-Grave' | 'Gate-to-Gate';

export type FunctionalUnit = '1 kg' | '1 tonne' | 'Custom';

export type LifecycleStage = 
  | 'Extraction' 
  | 'Processing' 
  | 'Transport' 
  | 'Manufacturing' 
  | 'Use' 
  | 'End-of-Life';

export type TransportMode = 'Road (Diesel Heavy Truck)' | 'Rail (Electric Freight)' | 'Mixed (Multimodal)' | 'Inland Waterway' | 'Ocean Freight';

export type ProjectStatus = 'Active' | 'Validated' | 'Draft' | 'Archived';

export interface Project {
  id: string;
  name: string;
  organization: string;
  location: string;
  description: string;
  material: MaterialType;
  functionalUnit: FunctionalUnit;
  customUnitAmount?: number;
  customUnitName?: string;
  systemBoundary: SystemBoundary;
  selectedStages: LifecycleStage[];
  status: ProjectStatus;
  circularityScore: number;
  ghgIntensity: number; // in t CO2e
  energyIntensity: number; // in kWh
  waterIntensity: number; // in m³
  wasteIntensity: number; // in kg
  lastUpdated: string;
  createdAt: string;
  dataQualityScore: number;
  dataSourceBreakdown: {
    groundDataPct: number;
    referenceDataPct: number;
    aiEstimatedPct: number;
  };
}

export interface InventoryField {
  key: string;
  label: string;
  category: 'raw' | 'energy' | 'transport' | 'circularity' | 'output';
  value: number;
  unit: string;
  source: DataSourceType;
  confidence?: ConfidenceLevel;
  notes?: string;
}

export interface LCAInventory {
  rawMaterialQty: InventoryField;
  electricity: InventoryField;
  fuel: InventoryField;
  water: InventoryField;
  processEnergy: InventoryField;
  transportDistance: InventoryField;
  transportMode: { value: TransportMode; source: DataSourceType };
  recycledContent: InventoryField;
  recoveryRate: InventoryField;
  reuse: InventoryField;
  waste: InventoryField;
  materialLoss: InventoryField;
}

export interface StageImpact {
  stage: LifecycleStage;
  ghg: number; // kg CO2e or t CO2e
  energy: number; // MJ or kWh
  water: number; // m³
  waste: number; // kg
  percentage: number;
  source: DataSourceType;
}

export interface ImpactDriver {
  name: string;
  category: string;
  percentage: number;
  ghgContribution: number;
  energyContribution: number;
  unit: string;
  color: string;
  explanation: string;
}

export interface LCAResults {
  projectId: string;
  projectName: string;
  calculatedAt: string;
  isOfficial: boolean;
  isDemoResult: boolean;
  standardsCompliance: string[]; // ISO 14040, ISO 14044, GHG Protocol
  functionalUnitText: string;
  kpis: {
    ghg: { value: number; unit: string; trend: number; source: DataSourceType };
    energy: { value: number; unit: string; trend: number; source: DataSourceType };
    water: { value: number; unit: string; trend: number; source: DataSourceType };
    waste: { value: number; unit: string; trend: number; source: DataSourceType };
    circularity: { value: number; unit: string; trend: number; source: DataSourceType };
  };
  stageImpacts: StageImpact[];
  drivers: ImpactDriver[];
  hotspots: {
    title: string;
    stage: LifecycleStage;
    impactShare: string;
    rootCause: string;
    mitigationHint: string;
  }[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  isBaseline: boolean;
  isDemo: boolean;
  recycledContentPct: number;
  renewableEnergyPct: number;
  recoveryRatePct: number;
  transportDistanceKm: number;
  transportMode: TransportMode;
  metrics: {
    ghg: number;
    ghgReductionPct: number;
    energy: number;
    energyReductionPct: number;
    water: number;
    waterReductionPct: number;
    waste: number;
    wasteReductionPct: number;
    circularityScore: number;
    circularityDelta: number;
  };
}

export interface AISimulatorState {
  recycledFeedstock: number; // 20-80%
  renewableEnergy: number; // 0-100%
  recoveryRate: number; // 50-100%
  transportDistance: number; // 100-1000 km
  transportMode: 'Road' | 'Rail' | 'Mixed';
}

export interface AIPredictionResult {
  predictedGhg: number;
  ghgUnit: string;
  ghgReductionPct: number;
  predictedEnergy: number;
  energyReductionPct: number;
  predictedCircularity: number;
  confidenceScore: number; // 0-100%
  confidenceLevel: ConfidenceLevel;
  keyDriver: string;
  tradeOffWarning?: string;
  validated: boolean;
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Feedstock' | 'Energy Transition' | 'Process Metallurgy' | 'Logistics' | 'Circularity';
  description: string;
  expectedGhgImprovementPct: number;
  feasibility: 'High' | 'Medium' | 'Low';
  confidencePct: number;
  confidenceLevel: ConfidenceLevel;
  estimatedRoiMonths: number;
  capexRequirement: 'Low' | 'Medium' | 'High';
  priority: 'Immediate' | 'Medium-term' | 'Long-term';
  actionItems: string[];
  source: DataSourceType;
}

export interface MaterialPassport {
  id: string;
  passportNumber: string;
  materialName: string;
  grade: string;
  facility: string;
  countryOfOrigin: string;
  productionDate: string;
  qrCodeUrl?: string;
  blockchainVerificationHash: string;
  virginContentPct: number;
  recycledContentPct: number;
  recoverabilityPct: number;
  materialLossPct: number;
  recyclingPotential: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  reusePotential: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  circularityScore: number;
  carbonIntensity: number; // t CO2e / tonne
  waterIntensity: number; // m³ / tonne
  embodiedEnergy: number; // GJ / tonne
  chemicalComposition: { element: string; symbol: string; percentage: number }[];
  complianceCertifications: string[];
  disassemblyIndex: number;
  endOfLifeScenarios: { route: string; sharePct: number; yieldPct: number }[];
}

export interface DataQualityRecord {
  overallScore: number;
  confidence: ConfidenceLevel;
  groundDataPct: number;
  referenceDataPct: number;
  aiEstimatedPct: number;
  anomaliesDetected: number;
  pedigreeMatrix: {
    parameter: string;
    reliability: number; // 1-5
    completeness: number; // 1-5
    temporalCorrelation: number; // 1-5
    geographicCorrelation: number; // 1-5
    technologicalCorrelation: number; // 1-5
    overallDQ: number;
  }[];
  anomalies: {
    id: string;
    parameter: string;
    reportedValue: string;
    expectedRange: string;
    stage: LifecycleStage;
    severity: 'High' | 'Medium' | 'Low';
    resolutionRecommendation: string;
    status: 'Flagged' | 'Reviewed' | 'Ignored';
  }[];
}

export interface AssumptionItem {
  id: string;
  assumptionName: string;
  value: string;
  sourceDataset: string;
  sourceType: 'Ecoinvent 3.9' | 'GREET 2023' | 'Industry Average (IAI)' | 'Site Specific' | 'IPCC AR6';
  impactArea: 'GHG' | 'Energy' | 'Water' | 'Transport' | 'Land Use';
  version: string;
  effectiveDate: string;
  sensitivity: 'High' | 'Medium' | 'Low';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  action: string;
  entityType: 'Inventory' | 'Scenario' | 'Calculation' | 'Report' | 'Setting';
  details: string;
  changeDiff?: {
    field: string;
    oldValue: string;
    newValue: string;
  };
  hash: string;
}

export interface ReportItem {
  id: string;
  projectName: string;
  reportType: 'Executive Sustainability Summary' | 'ISO 14040/14044 Full LCA' | 'ESG BRSR Core Report' | 'CBAM Carbon Footprint' | 'Circular Economy Passport';
  format: 'PDF' | 'CSV' | 'JSON';
  generatedDate: string;
  fileSize: string;
  status: 'Ready' | 'Generating' | 'Failed';
  version: string;
}
