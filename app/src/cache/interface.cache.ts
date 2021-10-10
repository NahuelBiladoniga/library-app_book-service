export abstract class MemoryDBInterface {
    public abstract setValue(key: string, value: string): Promise<void>;

    public abstract getValue(key: string);

    public abstract setValueWithTTL(key: string, value: string, ttlInMinutes: number): Promise<void>;

    public abstract getTTL(key: string);
}
