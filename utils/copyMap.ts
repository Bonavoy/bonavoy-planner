import cloneDeep from 'lodash.clonedeep';

// create a deep copy of a map
export const copyMap = <K, V>(map: Map<K, V>) => {
  const newMap = new Map<K, V>();

  map.forEach((value, key) => {
    newMap.set(key, cloneDeep(value));
  });

  return newMap;
};
