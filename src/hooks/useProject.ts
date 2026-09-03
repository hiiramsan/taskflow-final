import { useEffect, useState } from "react";
import { getProjectById } from "../services/projectService";
import type { Project } from "../types";

export function useProject(id: number | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === null) return;

    let cancelled = false;

    async function loadProject() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjectById(id);

        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Failed to load project"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    project,
    loading,
    error,
  };
}