import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseSettingsService {
  localStoragePrefix: string;
  logLevel: string;
  logLevelDict = {
    // Log only to file
    log_only_to_file: 'file', // NOT IN USE
    // Send logs to file and browser console
    log_to_file_and_console: 'file_console', // NOT IN USE
    // Log only to browser console
    log_only_to_console: 'console',
    // No logging. Disable logging
    no_logging: 'none'
  };
  commentKey: string;

  constructor() {
    this.localStoragePrefix = environment.lsPrefix;
    this.logLevel = this.logLevelDict[environment.logLevel];
    this.commentKey = environment.commentKey;
  }
}
