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

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  },

  padTo2Digits(number: number) {
    return number.toString().padStart(2, '0');
  },

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  },
};
