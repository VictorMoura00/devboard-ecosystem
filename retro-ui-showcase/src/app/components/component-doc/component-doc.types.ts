export interface ComponentDocExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentDocVariant {
  name: string;
  description: string;
  code?: string;
}

export interface ComponentDocState {
  name: string;
  description: string;
}

export interface ComponentDocApiRow {
  name: string;
  type: string;
  default?: string;
  desc: string;
  required?: boolean;
}

export interface ComponentDocApi {
  inputs?: ComponentDocApiRow[];
  outputs?: ComponentDocApiRow[];
  methods?: ComponentDocApiRow[];
  slots?: { name: string; desc: string }[];
  cva?: string[];
}

export interface ComponentDocConfig {
  id: string;
  name: string;
  selector: string;
  description: string;
  category: string;
  badges: string[];
  importExample: string;
  basicUsage: { code: string; description?: string };
  examples: ComponentDocExample[];
  variants: ComponentDocVariant[];
  states: ComponentDocState[];
  formsCva?: { description: string; code: string };
  accessibility: string[];
  api: ComponentDocApi;
  customization: string[];
  bestPractices: { do: string[]; dont: string[] };
  relatedTokens?: string[];
}
