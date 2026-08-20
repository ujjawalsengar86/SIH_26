import { 
  Project, 
  LCAResults, 
  Scenario, 
  AIRecommendation, 
  MaterialPassport, 
  DataQualityRecord, 
  AssumptionItem, 
  AuditLogItem, 
  ReportItem,
  AISimulatorState,
  AIPredictionResult
} from '../types';
import { 
  MOCK_PROJECTS, 
  MOCK_LCA_RESULTS, 
  MOCK_SCENARIOS, 
  MOCK_AI_RECOMMENDATIONS, 
  MOCK_MATERIAL_PASSPORT, 
  MOCK_DATA_QUALITY, 
  MOCK_ASSUMPTIONS, 
  MOCK_AUDIT_LOGS, 
  MOCK_REPORTS 
} from '../data/mockData';

// Simulated delay helper for realistic feel
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    await delay(150);
    return [...MOCK_PROJECTS];
  },
  
  getProjectById: async (id: string): Promise<Project | undefined> => {
    await delay(100);
    return MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
  },
  
  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'lastUpdated' | 'dataQualityScore' | 'dataSourceBreakdown'>): Promise<Project> => {
    await delay(400);
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      dataQualityScore: 80,
      dataSourceBreakdown: {
        groundDataPct: 60,
        referenceDataPct: 30,
        aiEstimatedPct: 10,
      }
    };
    MOCK_PROJECTS.unshift(newProj);
    return newProj;
  },

  deleteProject: async (id: string): Promise<boolean> => {
    await delay(300);
    const idx = MOCK_PROJECTS.findIndex(p => p.id === id);
    if (idx !== -1) {
      MOCK_PROJECTS.splice(idx, 1);
      return true;
    }
    return false;
  },

  duplicateProject: async (id: string): Promise<Project> => {
    await delay(300);
    const original = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
    const duplicate: Project = {
      ...original,
      id: `proj-${Date.now()}`,
      name: `${original.name} (Copy)`,
      status: 'Draft',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      createdAt: new Date().toISOString().split('T')[0]
    };
    MOCK_PROJECTS.unshift(duplicate);
    return duplicate;
  }
};

export const lcaService = {
  getResultsByProjectId: async (projectId: string): Promise<LCAResults> => {
    await delay(200);
    if (MOCK_LCA_RESULTS[projectId]) {
      return MOCK_LCA_RESULTS[projectId];
    }
    // Fallback populated result
    return {
      ...MOCK_LCA_RESULTS['proj-alu-01'],
      projectId,
      projectName: MOCK_PROJECTS.find(p => p.id === projectId)?.name || 'Metallurgical Process Assessment'
    };
  },

  calculateLCA: async (inventoryData: any): Promise<LCAResults> => {
    await delay(1200); // Simulate deterministic computation
    return {
      ...MOCK_LCA_RESULTS['proj-alu-01'],
      calculatedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      isDemoResult: true,
    };
  }
};

export const scenarioService = {
  getScenarios: async (): Promise<Scenario[]> => {
    await delay(150);
    return [...MOCK_SCENARIOS];
  },
  
  createScenario: async (scenario: Partial<Scenario>): Promise<Scenario> => {
    await delay(300);
    const newScen: Scenario = {
      id: `scen-${Date.now()}`,
      name: scenario.name || 'Custom Scenario',
      description: scenario.description || 'Simulated metallurgical process variant.',
      isBaseline: false,
      isDemo: true,
      recycledContentPct: scenario.recycledContentPct || 35,
      renewableEnergyPct: scenario.renewableEnergyPct || 40,
      recoveryRatePct: scenario.recoveryRatePct || 70,
      transportDistanceKm: scenario.transportDistanceKm || 500,
      transportMode: scenario.transportMode || 'Rail (Electric Freight)',
      metrics: {
        ghg: 5.4,
        ghgReductionPct: 34.5,
        energy: 3100,
        energyReductionPct: 26.2,
        water: 7.8,
        waterReductionPct: 38.1,
        waste: 190,
        wasteReductionPct: 44.1,
        circularityScore: 82,
        circularityDelta: +10
      }
    };
    MOCK_SCENARIOS.push(newScen);
    return newScen;
  }
};

export const aiSimulatorService = {
  predictImpact: (params: AISimulatorState): AIPredictionResult => {
    // Dynamic physics-informed estimation formula for realistic responsiveness
    // Baseline primary smelting: ~11.5 t CO2e / tonne
    // Scrap remelt saves ~95% of direct electrolytic energy
    const scrapFrac = params.recycledFeedstock / 100;
    const reFrac = params.renewableEnergy / 100;
    const recoveryFrac = params.recoveryRate / 100;
    
    // Emissions model
    const virginGhg = 11.2 * (1 - scrapFrac);
    const recycledGhg = 0.55 * scrapFrac;
    const directProcessGhg = virginGhg + recycledGhg;
    
    // Electricity grid intensity reduction
    const powerReduction = 1 - (reFrac * 0.78);
    
    // Logistics component
    const modeMultiplier = params.transportMode === 'Rail' ? 0.03 : params.transportMode === 'Mixed' ? 0.06 : 0.11;
    const transportGhg = (params.transportDistance / 1000) * modeMultiplier;
    
    const rawGhg = (directProcessGhg * powerReduction) + transportGhg;
    const predictedGhg = Math.max(1.2, parseFloat(rawGhg.toFixed(2)));
    
    const baselineGhg = 8.24;
    const ghgReductionPct = parseFloat((((baselineGhg - predictedGhg) / baselineGhg) * 100).toFixed(1));
    
    // Energy prediction (kWh)
    const baseEnergy = 14200;
    const predictedEnergy = Math.round((baseEnergy * (1 - scrapFrac * 0.9)) + (params.transportDistance * 0.4));
    const energyReductionPct = parseFloat((((baseEnergy - predictedEnergy) / baseEnergy) * 100).toFixed(1));
    
    // Circularity estimation
    const predictedCircularity = Math.min(99, Math.round(
      (params.recycledFeedstock * 0.45) +
      (params.recoveryRate * 0.45) +
      (params.renewableEnergy * 0.10)
    ));

    // Dynamic confidence based on parameter extremity
    const confidenceScore = Math.round(92 - (Math.abs(params.recycledFeedstock - 50) * 0.1) - (params.transportDistance > 800 ? 5 : 0));
    
    return {
      predictedGhg,
      ghgUnit: 't CO₂e / tonne',
      ghgReductionPct,
      predictedEnergy,
      energyReductionPct,
      predictedCircularity,
      confidenceScore,
      confidenceLevel: confidenceScore > 85 ? 'High' : confidenceScore > 70 ? 'Medium' : 'Low',
      keyDriver: scrapFrac > 0.5 ? 'Recycled Feedstock Remelt Loop' : reFrac > 0.5 ? 'Renewable Power Shift' : 'Logistics Route Optimization',
      tradeOffWarning: params.recycledFeedstock > 70 ? 'Requires stringent tramp element (Fe/Si) ultrasonic inspection to prevent embrittlement.' : undefined,
      validated: false
    };
  }
};

export const recommendationService = {
  getRecommendations: async (): Promise<AIRecommendation[]> => {
    await delay(150);
    return [...MOCK_AI_RECOMMENDATIONS];
  }
};

export const passportService = {
  getPassport: async (materialId?: string): Promise<MaterialPassport> => {
    await delay(200);
    return { ...MOCK_MATERIAL_PASSPORT };
  }
};

export const dataQualityService = {
  getDataQuality: async (): Promise<DataQualityRecord> => {
    await delay(150);
    return { ...MOCK_DATA_QUALITY };
  }
};

export const assumptionsService = {
  getAssumptions: async (): Promise<AssumptionItem[]> => {
    await delay(150);
    return [...MOCK_ASSUMPTIONS];
  }
};

export const auditService = {
  getAuditLogs: async (): Promise<AuditLogItem[]> => {
    await delay(150);
    return [...MOCK_AUDIT_LOGS];
  }
};

export const reportService = {
  getReports: async (): Promise<ReportItem[]> => {
    await delay(150);
    return [...MOCK_REPORTS];
  },

  generateReport: async (reportType: string, format: 'PDF' | 'CSV' | 'JSON'): Promise<ReportItem> => {
    await delay(800);
    const newRep: ReportItem = {
      id: `rep-${Date.now()}`,
      projectName: 'Aluminium Smelting & Ingot Optimization',
      reportType: reportType as any,
      format,
      generatedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      fileSize: format === 'PDF' ? '3.4 MB' : '420 KB',
      status: 'Ready',
      version: 'v1.0'
    };
    MOCK_REPORTS.unshift(newRep);
    return newRep;
  }
};
