import { Item } from './item';
import { FileResponseInterface } from '../../interfaces/api-responses';

export class File extends Item {
  public file = ''; // A src link.
  public md5 = '';
  public media_type = '';
  public mime_type = '';
  public sha256 = '';
  public size = 0;

  constructor(data?: FileResponseInterface) {
    super(data);
    if (data) {
      this.file = data.file;
      this.md5 = data.md5;
      this.media_type = data.media_type;
      this.mime_type = data.mime_type;
      this.sha256 = data.sha256;
      this.size = data.size;
    }
  }
}
