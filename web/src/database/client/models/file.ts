import { DBModel } from '@/database/client/core/types/db';
import { DB_File, DB_FileSchema } from '@/database/client/schemas/files';
import { nanoid } from '@/utils/uuid';

import { BaseModel } from '../core';

class _FileModel extends BaseModel<'files'> {
  constructor() {
    super('files', DB_FileSchema);
  }

  async create(file: DB_File) {
    const id = nanoid();

    return this._addWithSync(file, `file-${id}`);
  }

  async findById(id: string): Promise<DBModel<DB_File>> {
    return this.table.get(id);
  }

  async delete(id: string) {
    return this.table.delete(id);
  }

  async clear() {
    return this.table.clear();
  }
}

export const FileModel = new _FileModel();
