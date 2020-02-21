import { SetStateAction } from 'react';
import StorageService from './StorageService';
declare const createStorageHook: (storageService: StorageService) => <TValue>(storageKey: string, initialData?: TValue | null) => readonly [TValue | null, (setStateAction: SetStateAction<TValue | null>) => void];
export default createStorageHook;
