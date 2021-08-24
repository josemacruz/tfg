import { RecoilState } from 'recoil';

export function keySelector<T, K extends keyof T, V extends T[K]>(state: RecoilState<T>, key: K): RecoilState<V>;
export function projection<T, K extends keyof T, P extends Pick<T, K>>(state: RecoilState<T>, keys: K[]): RecoilState<P>;
