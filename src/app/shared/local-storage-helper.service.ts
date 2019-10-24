import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-localstorage';
import {BaseSettingsService} from './base-settings.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelperService {

  constructor(private base: BaseSettingsService, private storage: LocalStorageService) {
  }

  set(key: string, value: any): void {
    const prefix = this.base.localStoragePrefix;
    this.storage.set(key, JSON.stringify(value), prefix);
  }

  get(key: string): string {
    const prefix = this.base.localStoragePrefix;
    const value = this.storage.get(key, prefix);
    return JSON.parse(value);
  }

  delete(key: string): void {
    if (this.get(key)) {
      // const key = 'token';
      const prefix = this.base.localStoragePrefix;
      this.storage.remove(key, prefix);
    }
  }

  clear(): void {
    this.storage.clear();
  }
}
