import { useState, useCallback, useEffect } from 'react';
import StorageService from './StorageService';

const createStorageHook = (storageService: StorageService) => {
  const useStorage = <TValue>(
    storageKey: string,
    initialData: TValue | null = null,
  ) => {
    const [data, setData] = useState(
      () => storageService.getData<TValue>(storageKey) ?? initialData,
    );

    const updateStorageData = useCallback(
      (newData: TValue | null) => {
        storageService.setData(storageKey, newData);
      },
      [storageKey],
    );

    useEffect(() => {
      const storageData = storageService.getData(storageKey);

      if (
        initialData !== undefined &&
        initialData !== null &&
        storageData === null
      ) {
        storageService.setData(storageKey, initialData);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    useEffect(() => {
      const unsubscribe = storageService.subscribe(
        ({ key, newValue, storageArea }) => {
          if (storageArea === storageService.storage && key === storageKey) {
            setData(storageService.deserialize<TValue>(newValue));
          }
        },
      );

      return () => unsubscribe();
    }, [storageKey]);

    return [data, updateStorageData] as const;
  };

  return useStorage;
};

export default createStorageHook;
