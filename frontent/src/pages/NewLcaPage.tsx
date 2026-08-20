import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useNotification } from '../context/NotificationContext';
import { WizardStep1Info } from '../components/wizard/WizardStep1Info';
import { WizardStep2Unit } from '../components/wizard/WizardStep2Unit';
import { WizardStep3Boundary } from '../components/wizard/WizardStep3Boundary';
import { WizardStep4Stages } from '../components/wizard/WizardStep4Stages';
import { WizardStep5Inventory, InventoryDataState } from '../components/wizard/WizardStep5Inventory';
import { WizardStep6Review } from '../components/wizard/WizardStep6Review';
import { WizardStep7Calculate } from '../components/wizard/WizardStep7Calculate';
import { MaterialType, FunctionalUnit, SystemBoundary, LifecycleStage, DataSourceType, TransportMode } from '../types';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NewLcaPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useProject();
  const { showNotification } = useNotification();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Odisha Primary Smelter & Extrusion Assessment',
    organization: 'Vedanta / Hindalco Metals Ltd.',
    location: 'Jharsuguda Smelter Complex, Odisha, India',
    description: 'Cradle-to-gate LCA assessing 40% post-consumer scrap integration in Hall-Héroult potline.',
    material: 'Aluminium' as MaterialType,
    functionalUnit: '1 tonne' as FunctionalUnit,
    customUnitAmount: 1,
    customUnitName: '1 Ingot Batch',
    systemBoundary: 'Cradle-to-Gate' as SystemBoundary,
    selectedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing'] as LifecycleStage[],
  });

  // Detailed Inventory State
  const [inventory, setInventory] = useState<InventoryDataState>({
    rawMaterialQty: { value: 1850, unit: 'kg / tonne', source: 'Ground Data' as DataSourceType },
    electricity: { value: 13800, unit: 'kWh / tonne', source: 'Ground Data' as DataSourceType },
    fuel: { value: 85, unit: 'Nm³ / tonne', source: 'Ground Data' as DataSourceType },
    water: { value: 12.6, unit: 'm³ / tonne', source: 'Ground Data' as DataSourceType },
    processEnergy: { value: 24.5, unit: 'GJ / tonne', source: 'Reference Data' as DataSourceType },
    transportDistance: { value: 450, unit: 'km', source: 'Reference Data' as DataSourceType },
    transportMode: { value: 'Road (Diesel Heavy Truck)' as TransportMode, source: 'Reference Data' as DataSourceType },
    recycledContent: { value: 40, unit: '% by mass', source: 'Ground Data' as DataSourceType },
    recoveryRate: { value: 86, unit: '% yield', source: 'Ground Data' as DataSourceType },
    reuse: { value: 15, unit: '% reused', source: 'Reference Data' as DataSourceType },
    waste: { value: 340, unit: 'kg / tonne', source: 'Ground Data' as DataSourceType },
    materialLoss: { value: 9.0, unit: '% tare loss', source: 'AI Estimated' as DataSourceType },
  });

  const steps = [
    { number: 1, title: 'Project Info', subtitle: 'Target metal & site' },
    { number: 2, title: 'Functional Unit', subtitle: 'Mass reference basis' },
    { number: 3, title: 'System Boundary', subtitle: 'Cut-off scope' },
    { number: 4, title: 'Lifecycle Stages', subtitle: 'Included processes' },
    { number: 5, title: 'Inventory Data', subtitle: 'LCI & data source' },
    { number: 6, title: 'Review', subtitle: 'Data quality checks' },
    { number: 7, title: 'Calculate', subtitle: 'ISO characterization' },
  ];

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const updateInventoryField = (key: keyof InventoryDataState, updates: any) => {
    setInventory(prev => ({
      ...prev,
      [key]: { ...prev[key], ...updates }
    }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Step-by-Step Guided Setup
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-mono">ISO 14040/14044 Workflow</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              New Metallurgical LCA Assessment
            </h1>
          </div>

          <div className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            Step {currentStep} of 7
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="hidden lg:grid grid-cols-7 gap-2">
          {steps.map(s => {
            const isPassed = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            return (
              <div
                key={s.number}
                onClick={() => isPassed && setCurrentStep(s.number)}
                className={`p-2.5 rounded-xl border transition-all text-left ${
                  isPassed
                    ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 cursor-pointer'
                    : isCurrent
                    ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isPassed
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {isPassed ? <Check className="w-2.5 h-2.5" /> : s.number}
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                    {s.title}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 block truncate">{s.subtitle}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Body */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs min-h-[420px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <WizardStep1Info key="step1" formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <WizardStep2Unit
              key="step2"
              functionalUnit={formData.functionalUnit}
              customUnitAmount={formData.customUnitAmount}
              customUnitName={formData.customUnitName}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <WizardStep3Boundary key="step3" systemBoundary={formData.systemBoundary} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <WizardStep4Stages key="step4" selectedStages={formData.selectedStages} updateFormData={updateFormData} />
          )}
          {currentStep === 5 && (
            <WizardStep5Inventory
              key="step5"
              inventory={inventory}
              updateInventoryField={updateInventoryField}
            />
          )}
          {currentStep === 6 && (
            <WizardStep6Review key="step6" formData={formData} inventory={inventory} />
          )}
          {currentStep === 7 && (
            <WizardStep7Calculate key="step7" />
          )}
        </AnimatePresence>

        {/* Wizard Footer Controls */}
        {currentStep < 7 && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 dark:bg-slate-800'
                  : 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <span>{currentStep === 6 ? 'Proceed to Calculation' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
