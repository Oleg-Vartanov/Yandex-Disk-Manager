export class YandexDiskGeneralInfo {
  public isPaid = false;
  public maxFileSize: string | number = '';
  public paidMaxFileSize: string | number = '';
  public revision: string | number = '';
  public systemFolders = {};
  public totalSpace: string | number = '';
  public trashSize: string | number = '';
  public unlimitedAutoUploadEnabled = false;
  public usedSpace: string | number = '';

  public setPropsFromResponse(data: object) {
    this.isPaid = data.is_paid ?? this.isPaid;
    this.maxFileSize = data.max_file_size ?? this.maxFileSize;
    this.paidMaxFileSize = data.paid_max_file_size ?? this.isPaid;
    this.revision = data.revision ?? this.revision;
    this.systemFolders = data.system_folders ?? this.systemFolders;
    this.totalSpace = data.total_space ?? this.totalSpace;
    this.trashSize = data.trash_size ?? this.trashSize;
    this.unlimitedAutoUploadEnabled =
      data.unlimited_autoupload_enabled ?? this.unlimitedAutoUploadEnabled;
    this.usedSpace = data.used_space ?? this.usedSpace;
  }
}
