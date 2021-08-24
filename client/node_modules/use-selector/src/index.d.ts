import { DependencyList, Dispatch, SetStateAction } from 'react';

export function useSelectorValue<T>(
  get: () => T,
  dependencies: DependencyList
): T;

export interface Selector<T> {
  get: () => T;
  set?: (newValue: T) => void;
  dependencies?: DependencyList;
}

export function useSelector<T>(selector: Selector<T>): [T, Dispatch<SetStateAction<T>>];

export function selectKey<T, K extends keyof T, V extends T[K]>(
  parent: T,
  key: K,
  setParent?: false | ((newValue: T) => void)
): Selector<V>;

export function selectProjection<T, K extends keyof T, P extends Pick<T, K>>(
  parent: T,
  keys: K[],
  setParent?: false | ((newValue: Partial<T>) => void)
): Selector<P>;
