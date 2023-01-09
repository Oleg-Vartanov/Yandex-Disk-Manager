import { FileManagerEnum } from '../../enum/file-manager-enum';
import {
  Embedded,
  FolderResponseInterface,
} from '../../interfaces/api-responses';
import { Item } from './item';
import { ItemFactory } from './item-factory';

export class Folder extends Item {
  public embedded: Embedded = {
    items: [],
    limit: FileManagerEnum.DEFAULT_RESOURCE_LIMIT,
    offset: FileManagerEnum.DEFAULT_RESOURCE_OFFSET,
    path: FileManagerEnum.ROOT_PATH,
    sort: '',
    total: 0,
  };

  constructor(data?: FolderResponseInterface) {
    super(data);
    if (data) {
      this.setEmbeddedFromResponse(data);
    }
  }

  public setEmbeddedFromResponse(data: FolderResponseInterface) {
    // If there are embedded items.
    if ('_embedded' in data && Object.keys(data._embedded).length !== 0) {
      const embeddedItems: any[] = [];

      if (data._embedded.items.length !== 0) {
        data._embedded.items.forEach((itemRaw) => {
          embeddedItems.push(ItemFactory.createItemFromResponse(itemRaw));
        });
      }

      this.embedded = {
        items: embeddedItems,
        limit: data._embedded.limit,
        offset: data._embedded.offset,
        path: data._embedded.path,
        sort: data._embedded.sort,
        total: data._embedded.total,
      };
    }
  }

  public appendEmbeddedItems(embedded: Embedded) {
    if (embedded.items.length !== 0) {
      embedded.items.forEach((itemRaw) => {
        this.embedded.items.push(ItemFactory.createItemFromResponse(itemRaw));
      });

      this.embedded.limit = this.embedded.limit + embedded.limit;
    }
  }
}
