import { GeneralInfoResponseInterface } from '../../interfaces/api-responses';

export class GeneralInfo {
  public isPaid = false;
  public maxFileSize = 0;
  public paidMaxFileSize = 0;
  public revision = 0;
  public systemFolders = {};
  public totalSpace = 0;
  public trashSize = 0;
  public unlimitedAutoUploadEnabled = false;
  public usedSpace = 0;

  public setPropsFromResponse(data: GeneralInfoResponseInterface) {
    this.isPaid = data.is_paid;
    this.maxFileSize = data.max_file_size;
    this.paidMaxFileSize = data.paid_max_file_size;
    this.revision = data.revision;
    this.systemFolders = data.system_folders;
    this.totalSpace = data.total_space;
    this.trashSize = data.trash_size;
    this.unlimitedAutoUploadEnabled = data.unlimited_autoupload_enabled;
    this.usedSpace = data.used_space;
  }
}
