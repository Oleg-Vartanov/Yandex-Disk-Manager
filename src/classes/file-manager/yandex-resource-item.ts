import { FileManagerEnum } from '../../enum/file-manager-enum';

export class YandexResourceItem {
  public commentIds = {};
  public created = '';
  public exif = {};
  public modified = '';
  public name = '';
  public path = '';
  public resourceId = '';
  public revision = '';
  public embedded: {
    items: YandexResourceItem[];
    limit: string | number;
    offset: string | number;
    path: string | number;
    sort: string | number;
    total: string | number;
  } = {
    items: [],
    limit: 20,
    offset: 0,
    path: FileManagerEnum.ROOT_PATH,
    sort: '',
    total: 0,
  };

  // constructor() {
  //   //
  // }

  public setPropsFromResponse(data: object) {
    this.commentIds = data.comment_ids ?? this.commentIds;
    this.created = data.created ?? this.created;
    this.exif = data.exif ?? this.exif;
    this.modified = data.modified ?? this.modified;
    this.name = data.name ?? this.name;
    this.path = data.path ?? this.path;
    this.resourceId = data.resource_id ?? this.resourceId;
    this.revision = data.revision ?? this.revision;
    this.embedded = data._embedded ?? this.embedded;
  }
}
