
let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export enum Stores {
  Movies = 'movies',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('KPMG');
    request.onupgradeneeded = () => {
      db = request && request.result

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Movies)) {
        db.createObjectStore(Stores.Movies, { keyPath: 'id' });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request && request.result
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
}

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('KPMG', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const getAll = <T>(storeName: string): Promise<Array<T> | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('KPMG', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const response = store.getAll();

      response.onsuccess = (query: any) => {
        resolve(query.srcElement.result)
      }
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const removeData = (storeName: string, id: number): Promise<void | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('KPMG', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.delete(id);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
}

export const updateData = <T>(storeName: string, data: T): Promise<void | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('KPMG', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
}