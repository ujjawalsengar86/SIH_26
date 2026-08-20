import { 
  Project, 
  LCAResults, 
  Scenario, 
  AIRecommendation, 
  MaterialPassport, 
  DataQualityRecord, 
  AssumptionItem, 
  AuditLogItem, 
  ReportItem 
} from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-alu-01',
    name: 'Aluminium Smelting & Ingot Optimization',
    organization: 'Vedanta / Hindalco Primary Metals',
    location: 'Odisha Smelter Complex, India',
    description: 'Hall-Héroult reduction cell optimization coupled with 45% post-consumer scrap remelting loop.',
    material: 'Aluminium',
    functionalUnit: '1 tonne',
    systemBoundary: 'Cradle-to-Gate',
    selectedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing'],
    status: 'Active',
    circularityScore: 72,
    ghgIntensity: 8.24, // t CO2e / tonne
    energyIntensity: 14200, // kWh
    waterIntensity: 12.6, // m³
    wasteIntensity: 340, // kg
    lastUpdated: '2026-08-18 14:30',
    createdAt: '2026-06-10',
    dataQualityScore: 84,
    dataSourceBreakdown: {
      groundDataPct: 68,
      referenceDataPct: 22,
      aiEstimatedPct: 10,
    }
  },
  {
    id: 'proj-cu-02',
    name: 'Copper Flash Smelting & Refining Assessment',
    organization: 'Adani Kutch Copper / HCL',
    location: 'Mundra Refinery, Gujarat',
    description: 'Outokumpu flash furnace with solvent extraction-electrowinning (SX-EW) and anode slime precious metal recovery.',
    material: 'Copper',
    functionalUnit: '1 tonne',
    systemBoundary: 'Cradle-to-Grave',
    selectedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing', 'Use', 'End-of-Life'],
    status: 'Validated',
    circularityScore: 79,
    ghgIntensity: 3.82,
    energyIntensity: 5600,
    waterIntensity: 8.4,
    wasteIntensity: 180,
    lastUpdated: '2026-08-17 18:15',
    createdAt: '2026-07-01',
    dataQualityScore: 88,
    dataSourceBreakdown: {
      groundDataPct: 75,
      referenceDataPct: 20,
      aiEstimatedPct: 5,
    }
  },
  {
    id: 'proj-steel-03',
    name: 'Steel Manufacturing Circularity (DRI-EAF)',
    organization: 'Tata Steel Jamshedpur / JSW Vijayanagar',
    location: 'Jharkhand Blast Furnace Cluster',
    description: 'Transition assessment from conventional BF-BOF route to Green Hydrogen Direct Reduced Iron (DRI) and Electric Arc Furnace.',
    material: 'Steel',
    functionalUnit: '1 tonne',
    systemBoundary: 'Cradle-to-Gate',
    selectedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing'],
    status: 'Active',
    circularityScore: 85,
    ghgIntensity: 1.65,
    energyIntensity: 4100,
    waterIntensity: 4.2,
    wasteIntensity: 110,
    lastUpdated: '2026-08-16 09:40',
    createdAt: '2026-05-15',
    dataQualityScore: 91,
    dataSourceBreakdown: {
      groundDataPct: 82,
      referenceDataPct: 14,
      aiEstimatedPct: 4,
    }
  },
  {
    id: 'proj-li-04',
    name: 'Lithium Spodumene Hard-Rock Refining LCA',
    organization: 'Khanij Bidesh India Ltd (KABIL)',
    location: 'Reasi Lithium Exploration Site, J&K',
    description: 'Pyrometallurgical acid-roast vs direct hydrometallurgical lithium hydroxide monohydrate battery-grade extraction.',
    material: 'Lithium',
    functionalUnit: '1 tonne',
    systemBoundary: 'Cradle-to-Gate',
    selectedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing'],
    status: 'Draft',
    circularityScore: 61,
    ghgIntensity: 14.8,
    energyIntensity: 22000,
    waterIntensity: 35.0,
    wasteIntensity: 1200,
    lastUpdated: '2026-08-12 11:20',
    createdAt: '2026-08-01',
    dataQualityScore: 70,
    dataSourceBreakdown: {
      groundDataPct: 45,
      referenceDataPct: 35,
      aiEstimatedPct: 20,
    }
  }
];

export const MOCK_LCA_RESULTS: Record<string, LCAResults> = {
  'proj-alu-01': {
    projectId: 'proj-alu-01',
    projectName: 'Aluminium Smelting & Ingot Optimization',
    calculatedAt: '2026-08-18 14:30 IST',
    isOfficial: true,
    isDemoResult: true,
    standardsCompliance: ['ISO 14040:2006', 'ISO 14044:2006', 'GHG Protocol Scope 1-3', 'ASI Performance Standard V3'],
    functionalUnitText: '1 tonne Primary/Secondary Aluminium Ingot (6061 Grade)',
    kpis: {
      ghg: { value: 8.24, unit: 't CO₂e', trend: -14.2, source: 'Official Calculated Result' },
      energy: { value: 4200, unit: 'kWh', trend: -8.5, source: 'Official Calculated Result' },
      water: { value: 12.6, unit: 'm³', trend: -3.1, source: 'Official Calculated Result' },
      waste: { value: 340, unit: 'kg', trend: -18.7, source: 'Official Calculated Result' },
      circularity: { value: 72, unit: '/ 100', trend: +12.0, source: 'Calculated' }
    },
    stageImpacts: [
      { stage: 'Extraction', ghg: 2.14, energy: 950, water: 4.8, waste: 210, percentage: 26, source: 'Ground Data' },
      { stage: 'Processing', ghg: 4.28, energy: 2350, water: 5.2, waste: 85, percentage: 52, source: 'Ground Data' },
      { stage: 'Transport', ghg: 0.91, energy: 410, water: 0.4, waste: 12, percentage: 11, source: 'Reference Data' },
      { stage: 'Manufacturing', ghg: 0.66, energy: 380, water: 1.6, waste: 28, percentage: 8, source: 'Ground Data' },
      { stage: 'Use', ghg: 0.08, energy: 40, water: 0.2, waste: 2, percentage: 1, source: 'AI Estimated' },
      { stage: 'End-of-Life', ghg: 0.17, energy: 70, water: 0.4, waste: 3, percentage: 2, source: 'Reference Data' }
    ],
    drivers: [
      {
        name: 'Grid Electricity (Smelting Hall-Héroult)',
        category: 'Scope 2 Energy',
        percentage: 52,
        ghgContribution: 4.28,
        energyContribution: 2184,
        unit: 't CO₂e',
        color: '#047857',
        explanation: 'Electrolytic reduction consumes ~13.5 MWh/t; grid carbon factor at 0.79 kg CO₂/kWh drives 52% of total emissions.'
      },
      {
        name: 'Bauxite Extraction & Bayer Alumina',
        category: 'Scope 1 Raw Material',
        percentage: 29,
        ghgContribution: 2.39,
        energyContribution: 1218,
        unit: 't CO₂e',
        color: '#0d9488',
        explanation: 'High thermal heat required for caustic digestion and calcination of bauxite ore.'
      },
      {
        name: 'Inland Freight Logistics',
        category: 'Scope 3 Transport',
        percentage: 11,
        ghgContribution: 0.91,
        energyContribution: 462,
        unit: 't CO₂e',
        color: '#d97706',
        explanation: 'Long-haul diesel truck movement of alumina and carbon anodes over 650 km.'
      },
      {
        name: 'Anode Baking Natural Gas',
        category: 'Scope 1 Fuel Combustion',
        percentage: 8,
        ghgContribution: 0.66,
        energyContribution: 336,
        unit: 't CO₂e',
        color: '#64748b',
        explanation: 'Prebaked carbon anode consumption and furnace heating during electrolysis.'
      }
    ],
    hotspots: [
      {
        title: 'High Thermal & Electrical Energy Intensity in Smelter Pots',
        stage: 'Processing',
        impactShare: '52% GHG / 56% Energy',
        rootCause: 'Smelter relies on regional coal-heavy grid (0.79 kg CO₂/kWh) without captive solar/hydropower PPA.',
        mitigationHint: 'Switching 35% of power intake to Round-the-Clock (RTC) Renewable PPA reduces GHG by 1.85 t CO₂e/t.'
      },
      {
        title: 'Alumina Transport Logistics Reliance on Heavy Road Freight',
        stage: 'Transport',
        impactShare: '11% GHG',
        rootCause: 'Trucking bauxite and alumina via national highways instead of dedicated electrified railway siding.',
        mitigationHint: 'Modal shift to dedicated Indian Railways rake siding cuts freight emissions by 64%.'
      },
      {
        title: 'Red Mud (Bauxite Residue) Tailings Generation',
        stage: 'Extraction',
        impactShare: '62% of Total Solid Waste',
        rootCause: '1.4 tonnes of highly alkaline bauxite residue per tonne of alumina extracted.',
        mitigationHint: 'Implement neutralization and circular utilization in Portland pozzolanic cement clinker.'
      }
    ]
  }
};

export const MOCK_SCENARIOS: Scenario[] = [
  {
    id: 'scen-baseline',
    name: 'Current Baseline (15% Scrap)',
    description: 'Existing smelter operation with 15% in-house runaround scrap and standard grid electricity mix.',
    isBaseline: true,
    isDemo: true,
    recycledContentPct: 15,
    renewableEnergyPct: 12,
    recoveryRatePct: 62,
    transportDistanceKm: 650,
    transportMode: 'Road (Diesel Heavy Truck)',
    metrics: {
      ghg: 8.24,
      ghgReductionPct: 0,
      energy: 4200,
      energyReductionPct: 0,
      water: 12.6,
      waterReductionPct: 0,
      waste: 340,
      wasteReductionPct: 0,
      circularityScore: 72,
      circularityDelta: 0,
    }
  },
  {
    id: 'scen-virgin',
    name: '100% Virgin Material (Worst Case)',
    description: 'All primary bauxite mining with zero secondary scrap intake and 100% thermal grid power.',
    isBaseline: false,
    isDemo: true,
    recycledContentPct: 0,
    renewableEnergyPct: 5,
    recoveryRatePct: 40,
    transportDistanceKm: 800,
    transportMode: 'Road (Diesel Heavy Truck)',
    metrics: {
      ghg: 11.45,
      ghgReductionPct: -38.9,
      energy: 5800,
      energyReductionPct: -38.1,
      water: 18.2,
      waterReductionPct: -44.4,
      waste: 490,
      wasteReductionPct: -44.1,
      circularityScore: 42,
      circularityDelta: -30,
    }
  },
  {
    id: 'scen-recycled-30',
    name: '30% Recycled Feedstock Loop',
    description: 'Introducing organized industrial scrap sorting and reverberatory clean remelting furnace.',
    isBaseline: false,
    isDemo: true,
    recycledContentPct: 30,
    renewableEnergyPct: 25,
    recoveryRatePct: 75,
    transportDistanceKm: 550,
    transportMode: 'Mixed (Multimodal)',
    metrics: {
      ghg: 6.85,
      ghgReductionPct: 16.9,
      energy: 3650,
      energyReductionPct: 13.1,
      water: 10.4,
      waterReductionPct: 17.5,
      waste: 275,
      wasteReductionPct: 19.1,
      circularityScore: 78,
      circularityDelta: +6,
    }
  },
  {
    id: 'scen-recycled-60',
    name: '60% Circular Closed-Loop',
    description: 'Automated post-consumer eddy current sorting + 50% captive solar/wind PPA + electrified rail logistics.',
    isBaseline: false,
    isDemo: true,
    recycledContentPct: 60,
    renewableEnergyPct: 50,
    recoveryRatePct: 88,
    transportDistanceKm: 400,
    transportMode: 'Rail (Electric Freight)',
    metrics: {
      ghg: 4.35,
      ghgReductionPct: 47.2,
      energy: 2450,
      energyReductionPct: 41.7,
      water: 6.8,
      waterReductionPct: 46.0,
      waste: 165,
      wasteReductionPct: 51.5,
      circularityScore: 89,
      circularityDelta: +17,
    }
  },
  {
    id: 'scen-recycled-80',
    name: '80% High-Circularity Green Metal',
    description: 'Ultra-low carbon metallurgy: 80% secondary alloy, 100% green hydrogen dross recovery, zero liquid discharge.',
    isBaseline: false,
    isDemo: true,
    recycledContentPct: 80,
    renewableEnergyPct: 85,
    recoveryRatePct: 96,
    transportDistanceKm: 250,
    transportMode: 'Rail (Electric Freight)',
    metrics: {
      ghg: 2.15,
      ghgReductionPct: 73.9,
      energy: 1350,
      energyReductionPct: 67.8,
      water: 3.1,
      waterReductionPct: 75.4,
      waste: 78,
      wasteReductionPct: 77.0,
      circularityScore: 96,
      circularityDelta: +24,
    }
  }
];

export const MOCK_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-01',
    title: 'Increase Recycled Feedstock via Sensor-Based Scrap Sorting',
    category: 'Feedstock',
    description: 'Upgrading pre-sorting with Laser-Induced Breakdown Spectroscopy (LIBS) enables blending 55% secondary scrap without compromising alloy 6061 tensile strength specifications.',
    expectedGhgImprovementPct: 24.2,
    feasibility: 'High',
    confidencePct: 89,
    confidenceLevel: 'High',
    estimatedRoiMonths: 14,
    capexRequirement: 'Medium',
    priority: 'Immediate',
    actionItems: [
      'Install LIBS robotic sorter in raw material receiving yard',
      'Establish scrap take-back contracts with certified tier-1 auto stampers',
      'Calibrate salt flux dosing to reduce dross formation by 18%'
    ],
    source: 'AI Prediction'
  },
  {
    id: 'rec-02',
    title: 'Shift Smelting Potline Electricity to 50MW Solar-Wind Hybrid PPA',
    category: 'Energy Transition',
    description: 'Replace thermal captive power plant share with a contracted Round-the-Clock (RTC) renewable energy tariff to eliminate Scope 2 smelting emissions.',
    expectedGhgImprovementPct: 32.5,
    feasibility: 'High',
    confidencePct: 94,
    confidenceLevel: 'High',
    estimatedRoiMonths: 22,
    capexRequirement: 'High',
    priority: 'Immediate',
    actionItems: [
      'Execute open-access interstate green energy transmission filing',
      'Deploy 10MWh battery energy storage for potline frequency stabilization',
      'Verify Renewable Energy Certificates (RECs) for ISO 14064 verification'
    ],
    source: 'AI Prediction'
  },
  {
    id: 'rec-03',
    title: 'Implement Hydrometallurgical Dross & Spent Pot Lining (SPL) Recovery',
    category: 'Process Metallurgy',
    description: 'Extract soluble fluorides and refractory alumina from hazardous first-cut SPL waste instead of landfilling, recovering 92% fluoride value.',
    expectedGhgImprovementPct: 8.4,
    feasibility: 'Medium',
    confidencePct: 82,
    confidenceLevel: 'Medium',
    estimatedRoiMonths: 18,
    capexRequirement: 'Medium',
    priority: 'Medium-term',
    actionItems: [
      'Commission pilot alkaline leaching circuit for cyanide destruction',
      'Recycle recovered cryolite back to electrolysis baths',
      'Integrate refractory carbon aggregate into cement kiln co-processing'
    ],
    source: 'AI Prediction'
  },
  {
    id: 'rec-04',
    title: 'Shift Logistics from Heavy Road Trucking to Dedicated Railway Siding',
    category: 'Logistics',
    description: 'Electrified rail transport for alumina and green coke over 450 km corridor reduces logistics carbon footprint by 64%.',
    expectedGhgImprovementPct: 7.1,
    feasibility: 'High',
    confidencePct: 91,
    confidenceLevel: 'High',
    estimatedRoiMonths: 8,
    capexRequirement: 'Low',
    priority: 'Immediate',
    actionItems: [
      'Finalize private freight terminal (PFT) siding agreement with Indian Railways',
      'Deploy covered aluminum container hoppers for zero spillage loss'
    ],
    source: 'AI Prediction'
  }
];

export const MOCK_MATERIAL_PASSPORT: MaterialPassport = {
  id: 'pass-alu-6061-001',
  passportNumber: 'DPP-MET-2026-IN-ALU6061-892A',
  materialName: 'Structural Extrusion Aluminium Alloy',
  grade: 'AA 6061-T6 Low-Carbon Circular Ingot',
  facility: 'Odisha Primary Smelter & Remelt Unit #4',
  countryOfOrigin: 'India (IND)',
  productionDate: '2026-08-15',
  blockchainVerificationHash: '0x7f9a2b84c01d98e35fa692c10db4e815a77cd56e987412f8a12903bcde654321',
  virginContentPct: 40,
  recycledContentPct: 60,
  recoverabilityPct: 86,
  materialLossPct: 9,
  recyclingPotential: 'VERY HIGH',
  reusePotential: 'HIGH',
  circularityScore: 84,
  carbonIntensity: 3.2, // t CO2e / tonne
  waterIntensity: 4.8, // m³ / tonne
  embodiedEnergy: 42.5, // GJ / tonne
  disassemblyIndex: 92,
  chemicalComposition: [
    { element: 'Aluminium', symbol: 'Al', percentage: 97.2 },
    { element: 'Magnesium', symbol: 'Mg', percentage: 1.0 },
    { element: 'Silicon', symbol: 'Si', percentage: 0.6 },
    { element: 'Iron', symbol: 'Fe', percentage: 0.4 },
    { element: 'Copper', symbol: 'Cu', percentage: 0.3 },
    { element: 'Chromium', symbol: 'Cr', percentage: 0.2 },
    { element: 'Zinc', symbol: 'Zn', percentage: 0.1 },
    { element: 'Titanium', symbol: 'Ti', percentage: 0.05 },
    { element: 'Others', symbol: 'Misc', percentage: 0.15 }
  ],
  complianceCertifications: [
    'ISO 14040/14044 LCA Verified',
    'EU CBAM Ready Declared',
    'Aluminium Stewardship Initiative (ASI) CoC',
    'BEE PAT Scheme Compliance',
    'RoHS & REACH Article 33 Compliant'
  ],
  endOfLifeScenarios: [
    { route: 'Closed-Loop Remelt Extrusions', sharePct: 65, yieldPct: 96 },
    { route: 'Secondary Foundry Die-Casting', sharePct: 22, yieldPct: 91 },
    { route: 'Steel Deoxidation Additive', sharePct: 7, yieldPct: 98 },
    { route: 'Unrecovered Landfill / Loss', sharePct: 6, yieldPct: 0 }
  ]
};

export const MOCK_DATA_QUALITY: DataQualityRecord = {
  overallScore: 82,
  confidence: 'High',
  groundDataPct: 68,
  referenceDataPct: 22,
  aiEstimatedPct: 10,
  anomaliesDetected: 2,
  pedigreeMatrix: [
    { parameter: 'Smelter Electricity Consumption (MWh/t)', reliability: 5, completeness: 5, temporalCorrelation: 5, geographicCorrelation: 5, technologicalCorrelation: 5, overallDQ: 98 },
    { parameter: 'Bauxite Mining Fuel & Explosives', reliability: 4, completeness: 4, temporalCorrelation: 4, geographicCorrelation: 5, technologicalCorrelation: 4, overallDQ: 86 },
    { parameter: 'Caustic Soda (NaOH) Upstream Footprint', reliability: 3, completeness: 4, temporalCorrelation: 4, geographicCorrelation: 3, technologicalCorrelation: 4, overallDQ: 74 },
    { parameter: 'Heavy Transport Logistics (Diesel Freight)', reliability: 4, completeness: 4, temporalCorrelation: 5, geographicCorrelation: 4, technologicalCorrelation: 4, overallDQ: 84 },
    { parameter: 'Direct Fluoride (PFC CF4/C2F6) Fugitive Emissions', reliability: 4, completeness: 3, temporalCorrelation: 4, geographicCorrelation: 4, technologicalCorrelation: 4, overallDQ: 78 },
    { parameter: 'End-of-Life Collection Yield in Domestic Sector', reliability: 2, completeness: 3, temporalCorrelation: 3, geographicCorrelation: 2, technologicalCorrelation: 3, overallDQ: 58 }
  ],
  anomalies: [
    {
      id: 'anom-01',
      parameter: 'Water Consumption in Hydrometallurgical Wash',
      reportedValue: '18.4 m³/t',
      expectedRange: '8.0 - 13.5 m³/t',
      stage: 'Processing',
      severity: 'Medium',
      resolutionRecommendation: 'Verify whether cooling tower blowdown was double-counted in the raw intake meter telemetry.',
      status: 'Flagged'
    },
    {
      id: 'anom-02',
      parameter: 'Scrap Moisture & Oil Tare Loss',
      reportedValue: '7.8%',
      expectedRange: '1.5 - 3.5%',
      stage: 'Processing',
      severity: 'High',
      resolutionRecommendation: 'Recalibrate weighbridge moisture sensor for inbound turnings batch #B-902.',
      status: 'Flagged'
    }
  ]
};

export const MOCK_ASSUMPTIONS: AssumptionItem[] = [
  {
    id: 'asm-01',
    assumptionName: 'Regional Grid Electricity Emission Factor',
    value: '0.79 kg CO₂e / kWh',
    sourceDataset: 'CEA India CO₂ Baseline Database v19',
    sourceType: 'Site Specific',
    impactArea: 'GHG',
    version: 'v2025.1',
    effectiveDate: '2026-01-01',
    sensitivity: 'High'
  },
  {
    id: 'asm-02',
    assumptionName: 'Heavy Duty Diesel Truck Emission Intensity',
    value: '0.112 kg CO₂e / t-km',
    sourceDataset: 'Ecoinvent 3.9.1 (Transport, freight, lorry >32t)',
    sourceType: 'Ecoinvent 3.9',
    impactArea: 'Transport',
    version: 'v3.9.1',
    effectiveDate: '2025-06-15',
    sensitivity: 'Medium'
  },
  {
    id: 'asm-03',
    assumptionName: 'Natural Gas Net Calorific Value & Oxidation Factor',
    value: '56.1 kg CO₂e / GJ (99.5% oxidation)',
    sourceDataset: 'IPCC Guidelines for National GHG Inventories 2006 (Vol 2)',
    sourceType: 'IPCC AR6',
    impactArea: 'Energy',
    version: 'AR6-2023',
    effectiveDate: '2024-11-20',
    sensitivity: 'Medium'
  },
  {
    id: 'asm-04',
    assumptionName: 'Aluminium Post-Consumer Remelt Energy Savings',
    value: '95% reduction vs Primary Bauxite smelting',
    sourceDataset: 'International Aluminium Institute (IAI) Global Footprint',
    sourceType: 'Industry Average (IAI)',
    impactArea: 'Energy',
    version: 'v2024',
    effectiveDate: '2025-03-10',
    sensitivity: 'High'
  },
  {
    id: 'asm-05',
    assumptionName: 'Water Stress Characterization Factor (AWARE)',
    value: '3.42 m³ world-eq / m³ consumed',
    sourceDataset: 'WULCA AWARE Model (India Mahanadi Basin)',
    sourceType: 'Site Specific',
    impactArea: 'Water',
    version: 'v1.4',
    effectiveDate: '2025-08-01',
    sensitivity: 'Low'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-101',
    timestamp: '2026-08-18 14:30:22 IST',
    userName: 'Dr. Aris Thorne',
    userRole: 'Lead Metallurgical LCA Specialist',
    action: 'Calculation Execution',
    entityType: 'Calculation',
    details: 'Triggered deterministic ISO 14044 baseline impact assessment for Odisha Potline #4.',
    hash: '0xa4c7e891b2390fca...'
  },
  {
    id: 'aud-102',
    timestamp: '2026-08-18 13:15:40 IST',
    userName: 'Priya Sharma',
    userRole: 'Process Engineer',
    action: 'Inventory Update',
    entityType: 'Inventory',
    details: 'Updated auxiliary potline electricity consumption from 4,100 kWh to 4,200 kWh per tonne.',
    changeDiff: {
      field: 'Electricity Consumption',
      oldValue: '4,100 kWh / t',
      newValue: '4,200 kWh / t'
    },
    hash: '0x889df01ca92376bb...'
  },
  {
    id: 'aud-103',
    timestamp: '2026-08-18 11:45:10 IST',
    userName: 'System AI Engine',
    userRole: 'Autonomous ML Agent',
    action: 'Scenario Validation',
    entityType: 'Scenario',
    details: 'Completed Monte Carlo simulation & sensitivity validation for "60% Circular Closed-Loop" scenario.',
    hash: '0x12bc900fe334ab51...'
  },
  {
    id: 'aud-104',
    timestamp: '2026-08-17 16:20:00 IST',
    userName: 'Vikram Mehta',
    userRole: 'ESG Compliance Director',
    action: 'Report Generation',
    entityType: 'Report',
    details: 'Generated and signed official CBAM & BRSR Core ESG compliance dossier #REP-2026-0817.',
    hash: '0x55ee9812cc9801dd...'
  },
  {
    id: 'aud-105',
    timestamp: '2026-08-16 10:05:18 IST',
    userName: 'Dr. Aris Thorne',
    userRole: 'Lead Metallurgical LCA Specialist',
    action: 'Assumption Calibration',
    entityType: 'Setting',
    details: 'Updated regional grid emission factor from 0.82 to 0.79 kg CO₂e/kWh reflecting fresh CEA 2026 release.',
    changeDiff: {
      field: 'CEA Grid Factor',
      oldValue: '0.82 kg CO₂e/kWh',
      newValue: '0.79 kg CO₂e/kWh'
    },
    hash: '0x3344aa1109ffbb82...'
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'rep-01',
    projectName: 'Aluminium Smelting & Ingot Optimization',
    reportType: 'ISO 14040/14044 Full LCA',
    format: 'PDF',
    generatedDate: '2026-08-18 14:35',
    fileSize: '4.8 MB',
    status: 'Ready',
    version: 'v2.4'
  },
  {
    id: 'rep-02',
    projectName: 'Aluminium Smelting & Ingot Optimization',
    reportType: 'CBAM Carbon Footprint',
    format: 'PDF',
    generatedDate: '2026-08-17 16:22',
    fileSize: '2.1 MB',
    status: 'Ready',
    version: 'v1.1'
  },
  {
    id: 'rep-03',
    projectName: 'Steel Manufacturing Circularity (DRI-EAF)',
    reportType: 'ESG BRSR Core Report',
    format: 'PDF',
    generatedDate: '2026-08-16 11:15',
    fileSize: '6.3 MB',
    status: 'Ready',
    version: 'v3.0'
  },
  {
    id: 'rep-04',
    projectName: 'Copper Flash Smelting & Refining Assessment',
    reportType: 'Circular Economy Passport',
    format: 'JSON',
    generatedDate: '2026-08-15 09:30',
    fileSize: '840 KB',
    status: 'Ready',
    version: 'v1.0'
  },
  {
    id: 'rep-05',
    projectName: 'Lithium Spodumene Hard-Rock Refining LCA',
    reportType: 'Executive Sustainability Summary',
    format: 'PDF',
    generatedDate: '2026-08-12 11:25',
    fileSize: '1.9 MB',
    status: 'Ready',
    version: 'v0.9'
  }
];
