export type CriteriaInputType =
  | "numeric"
  | "select"
  | "slider"
  | "currency"
  | "radio";

export type CriteriaLabel = {
  label: string;
  value: string | number;
};

export interface Criteria {
  name: string;
  min: number;
  max: number;
  weight: number;
  cost: boolean;
  inputType: CriteriaInputType;
  labels: CriteriaLabel[];
}

export interface Category {
  id?: string;
  name: string;
  description: string;
  criterias?: Criteria[];
  published?: boolean;
  thumbnail?: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  criterias?: Criteria[];
  published?: boolean;
  thumbnail?: string;
  images?: string[];
}

export interface ApiRequest<T> {
  data: T;
}
