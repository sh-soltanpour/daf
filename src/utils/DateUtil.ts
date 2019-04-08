import {StringUtil} from './StringUtil';

class DateUtilClass {
  dateDifference(start: Date, end: Date): DateDifference {
    let difference = end.getTime() - start.getTime();
    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    const secondsDifference = Math.floor(difference / 1000);
    return new DateDifference(daysDifference, hoursDifference, minutesDifference, secondsDifference);
  }
}

class DateDifference {
  day: number = 0;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  constructor(day: number, hour: number, minute: number, second: number) {
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  public toPersianString(): string {
    return StringUtil.convertEngNumbersToPersian(
      `${this.day} روز و ${this.hour} ساعت و ${this.minute} دقیقه و ${this.second} ثانیه`
    );
  }
}
export const DateUtil = new DateUtilClass();
