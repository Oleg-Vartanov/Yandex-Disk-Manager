import { FormatterEnum } from '../enum/formatter-enum';

export default {
  formatTime(seconds: number, format: number = FormatterEnum.MM_SS) {
    if (format === FormatterEnum.HH_MM_SS) {
      return new Date(seconds * 1000).toISOString().substring(11, 19);
    }
    return new Date(seconds * 1000).toISOString().substring(14, 19);
  },
  formatTimeByOverallDuration(seconds: number, overallDurationSeconds: number) {
    if (overallDurationSeconds > 3600) {
      return this.formatTime(seconds, FormatterEnum.HH_MM_SS);
    }
    return this.formatTime(seconds);
  },
};
