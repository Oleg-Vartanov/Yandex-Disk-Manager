import { File } from './file';
import { FileResponseInterface } from '../../interfaces/api-responses';

export class AudioFile extends File {
  public currentTime = 0; // Current playback time;
  public duration = 0; // Duration time;

  constructor(data?: FileResponseInterface) {
    super(data);
  }
}
