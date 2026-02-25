
/**
 * A native IndexedDB wrapper for large data persistence.
 * Replaces localStorage to avoid the 5MB quota limit.
 */

const DB_NAME = 'KubaruSahelDB';
const DB_VERSION = 1;
const STORES = ['articles', 'videos', 'authors', 'comments'];

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            STORES.forEach(storeName => {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            });
        };

        request.onsuccess = (event: any) => {
            resolve(event.target.result);
        };

        request.onerror = (event: any) => {
            reject("IndexedDB error: " + event.target.errorCode);
        };
    });
};

// Versioning storage keys to handle migrations/resets
export const STORAGE_VERSION = 'v5';

export const saveData = async (storeName: string, data: any, key: string = `current_data_${STORAGE_VERSION}`): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data, key); // We store the entire array under one key

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const loadData = async (storeName: string, key: string = `current_data_${STORAGE_VERSION}`): Promise<any> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

/**
 * Migration helper to move data from localStorage to IndexedDB
 */
export const migrateFromLocalStorage = async (): Promise<void> => {
    for (const storeName of STORES) {
        const localData = localStorage.getItem(storeName);
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                await saveData(storeName, parsed);
                // We keep localStorage for one reload as a backup, then it can be cleared
            } catch (e) {
                console.error(`Migration failed for ${storeName}`, e);
            }
        }
    }
};

export const clearAllData = async (): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES, 'readwrite');
        STORES.forEach(storeName => {
            transaction.objectStore(storeName).clear();
        });
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};
