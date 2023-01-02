import { File } from './file';
import { FileResponseInterface } from '../../interfaces/api-responses';
import Formatter from '../../services/formatter';

export class AudioFile extends File {
  public currentTime = 0; // Current playback time;
  public duration = 0; // Duration time;

  constructor(data?: FileResponseInterface) {
    super(data);
  }

  public getFormattedCurrentTime() {
    return Formatter.formatTimeByOverallDuration(
      this.currentTime,
      this.duration
    );
  }

  public getFormattedDuration() {
    return Formatter.formatTimeByOverallDuration(this.duration, this.duration);
  }
}
