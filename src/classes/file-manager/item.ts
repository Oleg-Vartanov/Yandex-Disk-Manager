import { ItemResponseInterface } from '../../interfaces/api-responses';

export abstract class Item {
  public commentIds = {};
  public created = '';
  public exif = {};
  public modified = '';
  public name = '';
  public path = '';
  public resourceId = '';
  public revision = 0;
  public type = ''; // Media type.

  protected constructor(data?: ItemResponseInterface) {
    if (data) {
      this.setPropsFromResponse(data);
    }
  }

  public setPropsFromResponse(data: ItemResponseInterface) {
    this.commentIds = data.comment_ids;
    this.created = data.created;
    this.exif = data.exif;
    this.modified = data.modified;
    this.name = data.name;
    this.path = data.path;
    this.resourceId = data.resource_id;
    this.revision = data.revision;
    this.type = data.type;
  }

  public hasResourceId(resourceId: string) {
    return this.resourceId === resourceId;
  }
}
