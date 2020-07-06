import { EventEmitter } from '@angular/core';


export class GlobalEvents {

  private static emmitters: {
    [eventName: string]: EventEmitter<any>,
  } = {};

  static get(eventName: string): EventEmitter<any> {
    if (!this.emmitters[eventName]) {
      this.emmitters[eventName] = new EventEmitter<any>();
    }
    return this.emmitters[eventName];
  }

}
