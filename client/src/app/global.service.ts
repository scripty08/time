import { Injectable, Inject } from '@angular/core';
import { WINDOW } from './window.providers';

@Injectable()
export class GlobalService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  getHostname() : string {
    return this.window.location.hostname;
  }

  getHref() : string {
    return this.window.location.href;
  }

  getPort() : string {
    return this.window.location.port;
  }

  getFullHostname(): string {
    if (this.window.location.port) {
      return this.window.location.protocol + '//' + this.window.location.hostname + ':' + this.window.location.port;
    }
    return this.window.location.hostname;
  }
}
