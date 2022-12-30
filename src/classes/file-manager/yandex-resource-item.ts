import { FileManagerEnum } from '../../enum/file-manager-enum';
import { yandexResourceItemResponseInterface } from '../../interfaces/api-responses';

export class YandexResourceItem {
  public commentIds = {};
  public created = '';
  public exif = {};
  public modified = '';
  public name = '';
  public path = '';
  public resourceId = '';
  public revision = 0;
  public type = '';
  public embedded: {
    items: YandexResourceItem[];
    limit: number;
    offset: number;
    path: string;
    sort: string;
    total: number;
  } = {
    items: [],
    limit: 20,
    offset: 0,
    path: FileManagerEnum.ROOT_PATH,
    sort: '',
    total: 0,
  };

  public setPropsFromResponse(data: yandexResourceItemResponseInterface) {
    this.commentIds = data.comment_ids;
    this.created = data.created;
    this.exif = data.exif;
    this.modified = data.modified;
    this.name = data.name;
    this.path = data.path;
    this.resourceId = data.resource_id;
    this.revision = data.revision;
    this.type = data.type;
    this.embedded = data._embedded;
  }
}
