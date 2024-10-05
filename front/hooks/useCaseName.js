import { useEffect, useState } from "react";
import { show } from "../actions/projects";

const useCaseName = (caseId) => {
  const [caseName, setCaseName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseName = async () => {
      try {
        if (caseId) {
          const project = await show(caseId);
          setCaseName(project.name);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching case name:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseName();
  }, [caseId]);

  return { caseName, loading, error };
};

export default useCaseName;
