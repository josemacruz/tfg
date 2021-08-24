import { useState, useEffect } from 'react';

export function useSelector({ get, set, dependencies = [] }) {
  const [state, setState] = useState(get());

  useEffect(() => {
      setState(get());
  }, dependencies);

  const onSet = newValue => set
    ? set(
      { get: () => state, set: setState },
      newValue
    )
    : setState(newValue);

  return [state, onSet];
}

export const useSelectorValue = (get, dependencies) =>
  useSelector({ get, dependencies })[0];

export function selectKey(parent, key, setParent = false) {
  const get = () => parent[key];
  const set = ({ set }, newValue) => {
    set(newValue);
    setParent && setParent({ ...parent, [key]: newValue });
  };
  return { get, set };
}

export function selectProjection(parent, keys, setParent = false) {
  const get = () => keys.reduce(
    (projection, key) =>({ ...projection, [key]: parent[key]})
  , {});
  const set = ({ get, set }, newValue) => {
    const value = { ...get(), ...newValue };
    set(value);
    setParent && setParent({ ...parent, ...value });
  };
  return { get, set };
}
