import { selector } from 'recoil';
import { selectKey, selectProjection } from '../.';
import { camelCase } from 'lodash';

export function keySelector(state, key) {
  return selector({
    key: `${key}State`,
    get: ({ get }) => get(state)[key],
    set: ({ get, set }, newValue) => set(state, {
      ...get(state),
      [key]: newValue
    })
  });
}

export function projection(state, keys) {
  const [tailKey, ...headKeys] = [...keys.slice(-1), ...keys.slice(0, -1)];
  const joinedNameByAnd = camelCase([
    ...headKeys.map(key => [key, 'And']).flat(),
    tailKey,
    'State'
  ].join(' '));
  console.log(joinedNameByAnd)
  return selector({
    key: joinedNameByAnd,
    get: ({ get }) => keys.reduce(
      (accumulator, key) => ({ ...accumulator, [key]: get(state)[key] }),
      {}
    ),
    set: ({ get, set }, newValue) => set(
      state,
      keys.reduce((accumulator, key) => ({ ...accumulator, [key]: newValue}), get(state))
    )
  });
}
