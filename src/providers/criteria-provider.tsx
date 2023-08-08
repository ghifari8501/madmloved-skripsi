"use client";

import { Criteria } from "@/types";
import { Category } from "@prisma/client";
import * as React from "react";

export const DEFAULT_CRITERIA_VALUE: Criteria = {
  name: "New Criteria",
  min: 1,
  max: 10,
  weight: 0,
  inputType: "numeric",
  cost: false,
  labels: [],
};

interface CriteriaContextProps {
  criterias: Criteria[];
  addCriteria: (criteria: Partial<Criteria> | undefined) => void;
  removeCriteria: (index: number) => void;
  updateCriteria: (criteria: Criteria, index: number) => void;
  totalWeight: number;
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  nameInput: React.RefObject<HTMLInputElement>;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const CriteriaContext = React.createContext<CriteriaContextProps | null>(null);

export function CriteriaProvider({
  children,
  data = [],
}: {
  children?: React.ReactNode;
  data?: Criteria[];
}) {
  const [criterias, setCriterias] = React.useState<Criteria[]>(data);
  const [totalWeight, setTotalWeight] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<number | null>(null);

  const nameInput = React.useRef<HTMLInputElement>(null);

  function addCriteria(criteria: Partial<Criteria> = {}) {
    setCriterias((prev) => [
      ...prev,
      { ...DEFAULT_CRITERIA_VALUE, ...criteria },
    ]);
    setSelected(criterias.length);
    nameInput.current?.select();
  }

  function removeCriteria(index: number) {
    setCriterias([...criterias.slice(0, index), ...criterias.slice(index + 1)]);
    setSelected(null);
  }

  function validateWeight(index: number, weight: number) {
    const other = criterias
      .map((c, i) => {
        if (i === index) return 0;
        return c.weight;
      })
      .reduce((a, b) => a + b, 0);

    const total = Number((other + weight).toFixed(2));
    const remaining = Number((1 - other).toFixed(2));

    return total > 1 ? remaining : weight;
  }

  function updateCriteria(criteria: Criteria, index: number) {
    const weight = validateWeight(index, criteria.weight);
    const update: Criteria = { ...criteria, weight };

    setCriterias((prev) => [
      ...prev.slice(0, index),
      { ...prev[index], ...update },
      ...prev.slice(index + 1),
    ]);
  }

  function moveUp(index: number) {
    setCriterias((prev) => [
      ...prev.slice(0, index - 1),
      prev[index],
      prev[index - 1],
      ...prev.slice(index + 1),
    ]);
  }

  function moveDown(index: number) {
    setCriterias((prev) => [
      ...prev.slice(0, index),
      prev[index + 1],
      prev[index],
      ...prev.slice(index + 2),
    ]);
  }

  React.useEffect(() => {
    setCriterias(data);
  }, [data]);

  React.useEffect(() => {
    setTotalWeight(criterias.map((c) => c.weight).reduce((a, b) => a + b, 0));
  }, [criterias]);

  const value = React.useMemo(
    () => ({
      criterias,
      totalWeight,
      addCriteria,
      removeCriteria,
      updateCriteria,
      selected,
      setSelected,
      nameInput,
      moveDown,
      moveUp,
    }),
    [criterias, totalWeight, selected]
  );

  return (
    <CriteriaContext.Provider value={value}>
      {children}
    </CriteriaContext.Provider>
  );
}

export function useCriteria() {
  const context = React.useContext(CriteriaContext);

  if (!context) {
    throw new Error("must be used inside criteria providers.");
  }

  return context;
}
