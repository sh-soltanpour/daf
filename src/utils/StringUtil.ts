class StringUtilClass {
  convertEngNumbersToPersian(theText: string): string {
    const engNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const perNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.stringReplaceBulk(theText, engNumbers, perNumbers);
  }

  stringReplaceBulk(str: string, findArray: string[], replaceArray: any[] | string[]): string {
    if (!str) return '';
    let i: number;
    let regex: any[] = [];
    let map: { [key: string]: string } = {};
    for (i = 0; i < findArray.length; i++) {
      regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
      map[findArray[i]] = replaceArray[i];
    }
    let regexStr = regex.join('|');
    str = str.replace(new RegExp(regexStr, 'g'), function(matched) {
      return map[matched];
    });
    return str;
  }

  searchStringInArray<T>(array: T[], _term: string, valueFunc: (x: T) => string | undefined): T[] {
    let term = _term ? _term.toLowerCase().replace(/\s+/g, ' ') : '';
    return array.filter(item =>
      (valueFunc(item) || '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .includes(term)
    );
  }
}

export const StringUtil = new StringUtilClass();
