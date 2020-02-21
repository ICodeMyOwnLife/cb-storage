export default class StorageService {
    private _storage;
    private _serialize;
    private _deserialize;
    get deserialize(): Deserialize;
    get serialize(): (o: unknown) => string;
    get storage(): Storage;
    constructor(_storage: Storage, _serialize?: (o: unknown) => string, _deserialize?: Deserialize);
    getData: <TData>(key: string) => TData | null;
    removeData: (key: string) => void;
    setData: <TData>(key: string, data: TData) => void;
    subscribe: (handler: (event: {
        storageArea: Storage | null;
        key: string | null;
        newValue: string | null;
    }) => void) => () => void;
    private raiseEvent;
}
export declare type Deserialize = <TData>(text: string | null | undefined) => TData | null;
