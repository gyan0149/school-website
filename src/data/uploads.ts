// Demo storage for school uploads: kept in this browser's IndexedDB only.
// Swap these functions for Firebase (Firestore + Storage) to make uploads visible to everyone.
import { useCallback, useEffect, useMemo, useState } from "react";

export type UploadKind = "notice" | "result" | "download" | "photo";

export interface UploadItem {
  id: string;
  udise: string;
  kind: UploadKind;
  title: string;
  date: string; // YYYY-MM-DD
  details?: string;
  file?: Blob;
  fileName?: string;
  createdAt: number;
}

const DB_NAME = "school-uploads";
const STORE = "items";
const CHANGED = "school-uploads-changed";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const store = req.result.createObjectStore(STORE, { keyPath: "id" });
      store.createIndex("udise", "udise");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function listUploads(udise: string, kind?: UploadKind): Promise<UploadItem[]> {
  const all = await run<UploadItem[]>("readonly", (s) => s.index("udise").getAll(udise));
  return all
    .filter((i) => !kind || i.kind === kind)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
}

export async function addUpload(item: Omit<UploadItem, "id" | "createdAt">): Promise<void> {
  await run("readwrite", (s) => s.add({ ...item, id: crypto.randomUUID(), createdAt: Date.now() }));
  window.dispatchEvent(new Event(CHANGED));
}

export async function deleteUpload(id: string): Promise<void> {
  await run("readwrite", (s) => s.delete(id));
  window.dispatchEvent(new Event(CHANGED));
}

// Live list of a school's uploads; re-reads whenever anything is added or deleted.
export function useUploads(udise: string, kind?: UploadKind): UploadItem[] {
  const [items, setItems] = useState<UploadItem[]>([]);
  const load = useCallback(() => {
    listUploads(udise, kind).then(setItems, () => setItems([]));
  }, [udise, kind]);
  useEffect(() => {
    load();
    window.addEventListener(CHANGED, load);
    return () => window.removeEventListener(CHANGED, load);
  }, [load]);
  return items;
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function fileSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Object URL for an item's file, released when the item leaves the screen.
export function useFileUrl(item: UploadItem): string | undefined {
  const url = useMemo(() => (item.file ? URL.createObjectURL(item.file) : undefined), [item.file]);
  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);
  return url;
}
