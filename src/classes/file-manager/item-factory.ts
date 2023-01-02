import { File } from './file';
import { Folder } from './folder';
import { AudioFile } from './audioFile';
import { YandexDiskEnum } from '../../enum/yandex-disk-enum';

export abstract class ItemFactory {
  public static createItemFromResponse(responseData: any) {
    if (responseData.type === YandexDiskEnum.ITEM_TYPE_FOLDER) {
      return new Folder(responseData);
    }

    if (
      'media_type' in responseData &&
      responseData.media_type === YandexDiskEnum.FILE_MEDIA_TYPE_AUDIO
    ) {
      return new AudioFile(responseData);
    }

    return new File(responseData);
  }
}
