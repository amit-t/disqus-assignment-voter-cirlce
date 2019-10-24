import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BaseSettingsService} from './base-settings.service';

@Injectable({
  providedIn: 'root'
})
export class FileLoggerService {
  // Name of the log file for each session
  LOG_FILE_NAME: string;
  // Directory path where log file will be stored on phone
  LOG_FILE_DIR_PATH: string;
  // Level of Logging Defined in Base settings
  FILE_LOG_LEVEL: string;

  // WriteOptions interface is this:
  // interface WriteOptions {
  // 	replace?: boolean;
  // 	append?: boolean;
  // 	truncate?: number;
  // }
  write_options = {
    replace: false,
    append: true,
    truncate: 0
  };
  log_queue: Array<{ log: string }> = [];

  constructor(private base_settings: BaseSettingsService) {
    this.FILE_LOG_LEVEL = this.base_settings.logLevel;
  }

  info(log: any, add_timestamp: boolean = true) {
    // The final log message will be stored in this variable
    let log_text;
    // The final log message will be stored in this variable
    let console_text;
    let console_title = null;
    // Timestamp of each message
    const timestamp = moment().format('Do MMM YYYY hh:mm:ss A');
    // Choose if a timestamp needs to be added to the log message
    if (add_timestamp) {
      log_text = `${timestamp} - ${log}\n`;
      if (typeof log === 'string') {
        console_text = `${timestamp} - ${log.toUpperCase()}`;
      }
      if (typeof log !== 'string') {
        console_text = log;
        console_title = timestamp;
      }
    } else {
      log_text = `${log}\n`;
      console_text = log;
      console_title = null;
    }

    switch (this.FILE_LOG_LEVEL) {
      case 'file':
        // Add to Log Queue
        // env.prepLogQueue(log_text);
        break;
      case 'file_console':
        // Add to Log Queue
        // env.prepLogQueue(log_text);
        // Print to Console
        console_title ? console.log(console_title, console_text) : console.log(console_text);
        break;
      case 'console':
        // Print to Console
        console_title ? console.log(console_title, console_text) : console.log(console_text);
        break;
      case 'none':
        break;
    }
  }

  debug(log: any, data: any, add_timestamp: boolean = true) {
    // The final log message will be stored in this variable
    // let log_text;
    // The final log message will be stored in this variable
    let console_text;
    let console_title = null;
    // Timestamp of each message
    const timestamp = moment().format('Do MMM YYYY hh:mm:ss A');
    // Choose if a timestamp needs to be added to the log message
    if (add_timestamp) {
      // log_text = `${timestamp} - ${log}\n`;
      if (typeof log === 'string') {
        console_text = `${timestamp} - ${log.toUpperCase()}`;
      }
      if (typeof log !== 'string') {
        console_text = log;
        console_title = timestamp;
      }
    } else {
      // log_text = `${log}\n`;
      console_text = log;
      console_title = null;
    }

    switch (this.FILE_LOG_LEVEL) {
      case 'file':
        // Add to Log Queue
        // env.prepLogQueue(log_text);
        break;
      case 'file_console':
        // Add to Log Queue
        // env.prepLogQueue(log_text);
        // Print to Console
        console.log(console_text, data);
        break;
      case 'console':
        // Print to Console
        console.log(console_text, data);
        break;
      case 'none':
        break;
    }
  }

  // prepLogQueue(log_text: string) {
  //   const log_queue_object = {
  //     log: log_text
  //   };
  //   /**
  //    * Push an object of log into the log queue.
  //    *
  //    * If log queue length is 1, the process queue operation will begin.
  //    *
  //    * In the meantime the log queue can be updated and more items can
  //    * be pushed in the queue.
  //    *
  //    * The processLogQueue method will one by one pick each item in the
  //    * LogQueue and write it into the file one after another
  //    */
  //   this.log_queue.push(log_queue_object);
  //   if (this.log_queue.length == 1) {
  //     this.processLogQueue(0);
  //   }
  // }

  /**
   * processLogQueue takes one index of the logQueue and writes the
   * log into the log file.
   *
   * upon Promise resolving of one log write to log file, method will check if
   * any more items have been added to log queue, if yes it will
   * run as a recursive method and write each log of the queue to the file
   * one by one
   */
  // processLogQueue(index: number) {
  //   const env = this;
  //   const log_text = this.log_queue[index].log;
  //
  //   env.file.writeFile(env.LOG_FILE_DIR_PATH, env.LOG_FILE_NAME, log_text, this.write_options).then(
  //     () => {
  //       env.log_queue.splice(index, 1);
  //       if (env.log_queue.length > 0) {
  //         env.processLogQueue(0);
  //       }
  //     },
  //     (err) => {
  //       // File Writing Error Logging to console
  //       const timestamp = moment().format('Do MMM YYYY hh:mm:ss A');
  //       const log_text = timestamp + ' - Error writing to Log File';
  //       console.log(log_text, err);
  //     }
  //   );
  // }
}
