import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public storage: StorageMap) { }
  /*
  formData: Info = {
    id: null,
    title: '',
    content: '',
    done: false
  };
  */

  
}
