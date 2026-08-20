import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, LCAResults, Scenario } from '../types';
import { projectService, lcaService, scenarioService } from '../services';

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  activeLcaResults: LCAResults | null;
  scenarios: Scenario[];
  isLoading: boolean;
  setActiveProjectId: (id: string) => void;
  refreshProjects: () => Promise<void>;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'lastUpdated' | 'dataQualityScore' | 'dataSourceBreakdown'>) => Promise<Project>;
  deleteProject: (id: string) => Promise<boolean>;
  duplicateProject: (id: string) => Promise<Project>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectIdState] = useState<string>('proj-alu-01');
  const [activeLcaResults, setActiveLcaResults] = useState<LCAResults | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const projs = await projectService.getProjects();
      setProjects(projs);
      
      const currentId = activeProjectId || projs[0]?.id;
      if (currentId) {
        const lca = await lcaService.getResultsByProjectId(currentId);
        setActiveLcaResults(lca);
      }
      
      const scens = await scenarioService.getScenarios();
      setScenarios(scens);
    } catch (err) {
      console.error('Failed to load project state', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const setActiveProjectId = async (id: string) => {
    setActiveProjectIdState(id);
    setIsLoading(true);
    try {
      const lca = await lcaService.getResultsByProjectId(id);
      setActiveLcaResults(lca);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (data: Omit<Project, 'id' | 'createdAt' | 'lastUpdated' | 'dataQualityScore' | 'dataSourceBreakdown'>) => {
    const created = await projectService.createProject(data);
    await refreshProjects();
    setActiveProjectIdState(created.id);
    return created;
  };

  const deleteProject = async (id: string) => {
    const success = await projectService.deleteProject(id);
    if (success) {
      await refreshProjects();
      if (activeProjectId === id) {
        const remaining = projects.filter(p => p.id !== id);
        if (remaining.length > 0) {
          setActiveProjectId(remaining[0].id);
        }
      }
    }
    return success;
  };

  const duplicateProject = async (id: string) => {
    const duplicated = await projectService.duplicateProject(id);
    await refreshProjects();
    return duplicated;
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        activeLcaResults,
        scenarios,
        isLoading,
        setActiveProjectId,
        refreshProjects,
        createProject,
        deleteProject,
        duplicateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
