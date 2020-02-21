/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
const storageEventName = 'storage';

const defaultSerialize: Deserialize = text => {
  if (text === null || text === undefined) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export default class StorageService {
  get deserialize() {
    return this._deserialize;
  }

  get serialize() {
    return this._serialize;
  }

  get storage() {
    return this._storage;
  }

  constructor(
    private _storage: Storage,
    private _serialize: (o: unknown) => string = JSON.stringify,
    private _deserialize: Deserialize = defaultSerialize,
  ) {}

  getData = <TData>(key: string) =>
    this.deserialize<TData>(this.storage.getItem(key));

  removeData = (key: string) => {
    this.storage.removeItem(key);
    this.raiseEvent({ key, newValue: '' });
  };

  setData = <TData>(key: string, data: TData) => {
    const newValue = this.serialize(data);
    this.storage.setItem(key, newValue);
    this.raiseEvent({ key, newValue });
  };

  subscribe = (
    handler: (event: {
      storageArea: Storage | null;
      key: string | null;
      newValue: string | null;
    }) => void,
  ) => {
    const listener = ({ storageArea, key, newValue }: StorageEvent) =>
      handler?.({ storageArea, key, newValue });
    window.addEventListener(storageEventName, listener);

    return () => window.removeEventListener(storageEventName, listener);
  };

  private raiseEvent({ key, newValue }: { key: string; newValue: string }) {
    window.dispatchEvent(
      new StorageEvent(storageEventName, {
        key,
        newValue,
        storageArea: this.storage,
      }),
    );
  }
}

export type Deserialize = <TData>(
  text: string | null | undefined,
) => TData | null;
