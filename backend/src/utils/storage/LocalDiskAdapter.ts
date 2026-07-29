import crypto from "crypto";
import fs from "fs";
import path from "path";
import { SaveFileParams, SaveFileResult, StorageAdapter } from "./StorageAdapter";

const SAFE_EXTENSION_REGEX = /^\.[a-zA-Z0-9]{1,10}$/;

function sanitizedExtension(originalName: string): string {
  const ext = path.extname(originalName);
  return SAFE_EXTENSION_REGEX.test(ext) ? ext.toLowerCase() : "";
}

export class LocalDiskAdapter implements StorageAdapter {
  constructor(private readonly rootDir: string) {}

  async save({ buffer, originalName, keyPrefix }: SaveFileParams): Promise<SaveFileResult> {
    const fileName = `${crypto.randomUUID()}${sanitizedExtension(originalName)}`;
    const relativePath = path.posix.join(keyPrefix, fileName);
    const absolutePath = path.join(this.rootDir, relativePath);

    await fs.promises.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.promises.writeFile(absolutePath, buffer);

    return { storagePath: relativePath, sizeBytes: buffer.length };
  }

  getReadStream(storagePath: string): NodeJS.ReadableStream {
    return fs.createReadStream(path.join(this.rootDir, storagePath));
  }

  async delete(storagePath: string): Promise<void> {
    await fs.promises.rm(path.join(this.rootDir, storagePath), { force: true });
  }
}
