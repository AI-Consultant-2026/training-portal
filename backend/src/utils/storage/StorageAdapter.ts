export interface SaveFileParams {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  keyPrefix: string;
}

export interface SaveFileResult {
  storagePath: string;
  sizeBytes: number;
}

export interface StorageAdapter {
  save(params: SaveFileParams): Promise<SaveFileResult>;
  getReadStream(storagePath: string): NodeJS.ReadableStream;
  delete(storagePath: string): Promise<void>;
}
