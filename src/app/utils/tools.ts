import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LockScreenFlag } from '@store/common-store/lock-screen-store.service';
import CryptoJS from 'crypto-js';
import { endOfDay, startOfDay } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { silentEvent } from 'ng-zorro-antd/core/util';
import { v4 as uuidv4 } from 'uuid';

/*Lấy số nguyên ngẫu nhiên trong khoảng từ 1 đến 100 this.randomNum(1, 101)*/
const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  let num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

const fnGetFile = function getFile(url: string, isBlob = false): Promise<NzSafeAny> {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.responseType = isBlob ? 'blob' : '';
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return;
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/');
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        });
      } else {
        reject(new Error(client.statusText));
      }
    };
    client.open('GET', url);
    client.send();
  });
};

const fnCheckForm = function checkForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach(key => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

// Xoá sạch FormArray
const fnClearFormArray = function clearFormArray(formArray: FormArray): void {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

const fnStopMouseEvent = function stopMouseEvent(e: MouseEvent): void {
  silentEvent(e);
  // e.stopPropagation();
  // e.preventDefault();
};

// Loại bỏ trùng lặp trong mảng đối tượng
const fnRemoveDouble = function removeDouble<T>(list: NzSafeAny[], col: NzSafeAny): T {
  const obj = {};
  return list.reduce((cur, next) => {
    // @ts-ignore
    obj[next[col]] ? '' : (obj[next[col]] = true && cur.push(next));
    return cur;
  }, []);
};

// Nhận khóa bộ nhớ cache tái sử dụng đường dẫn, theo định dạng key+param: login{name:xxx}
const getDeepReuseStrategyKeyFn = function (route: ActivatedRouteSnapshot): string {
  let temp = route;
  while (temp.firstChild) {
    temp = temp.firstChild;
  }
  return fnGetReuseStrategyKeyFn(temp);
};

// Nhận khóa, theo định dạng key+param: login{name:xxx}
const fnGetReuseStrategyKeyFn = function getKey(route: ActivatedRouteSnapshot): string {
  const configKey = route.data['key'];
  if (!configKey) {
    return '';
  }
  // Nó là một tham số truy vấn và có các tham số
  if (Object.keys(route.queryParams).length > 0) {
    return configKey + JSON.stringify(route.queryParams);
  } else if (Object.keys(route.params).length > 0) {
    // Đó là một tham số đường dẫn và có các tham số
    return configKey + JSON.stringify(route.params);
  } else {
    // không có tham số tuyến đường
    return `${configKey}{}`;
  }
};

// Nhận đường dẫn không có tham số
const fnGetPathWithoutParam = function getPathWithoutParam(path: string): string {
  const paramIndex = path.indexOf('?');
  if (paramIndex > -1) {
    return path.substring(0, paramIndex);
  }
  return path;
};

// Trả về UUID
const fnGetUUID = function getUUID(): string {
  return uuidv4();
};

const fnGetBase64 = function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// mã hóa
const fnEncrypt = function encrypt(word: NzSafeAny, keyStr: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(word), keyStr).toString();
};

// Giải mã
const fnDecrypt = function decrypt(word: NzSafeAny, keyStr: string): LockScreenFlag {
  const bytes = CryptoJS.AES.decrypt(word, keyStr);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

/*import {endOfDay, startOfDay} from 'date-fns';*/
const fnStartOfDay = function StartOfDay(time: number): number {
  return startOfDay(time).getTime();
};

const fnEndOfDay = function EndOfDay(time: number): number {
  return endOfDay(time).getTime();
};

// weak-theme 转换为 weakTheme
// https://blog.csdn.net/weixin_39238200/article/details/125665052
const fnFormatToHump = function formatToHump(value: string): string {
  return value.replace(/\-(\w)/g, (_, letter) => letter.toUpperCase());
};

export {
  fnFormatToHump,
  fnGetReuseStrategyKeyFn,
  fnDecrypt,
  fnEncrypt,
  fnGetBase64,
  fnGetPathWithoutParam,
  fnGetFile,
  fnClearFormArray,
  fnCheckForm,
  fnStopMouseEvent,
  getDeepReuseStrategyKeyFn,
  fnRemoveDouble,
  fnGetRandomNum,
  fnStartOfDay,
  fnEndOfDay,
  fnGetUUID
};
