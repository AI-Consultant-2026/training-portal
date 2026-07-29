import { config } from "../../config";
import { LocalDiskAdapter } from "./LocalDiskAdapter";
import { StorageAdapter } from "./StorageAdapter";

function buildStorageAdapter(): StorageAdapter {
  if (config.storageDriver === "s3") {
    throw new Error("S3 storage driver is not implemented yet. Set STORAGE_DRIVER=local.");
  }
  return new LocalDiskAdapter(config.uploadRoot);
}

export const storageAdapter: StorageAdapter = buildStorageAdapter();
export type { StorageAdapter } from "./StorageAdapter";
