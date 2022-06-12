import { ElementStates } from "./element-states"

export interface listItemProps {
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  tail?: string;
  head?: string;
  char?: string;
  state: ElementStates;
  extraCircle?: {
    char: string;
  }
}

export interface columnObject {
  num: number;
  state: ElementStates;
}

export type radioState = "selection" | "bubble"