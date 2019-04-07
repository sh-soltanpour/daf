class SearchUtilClass {
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

export const SearchUtil = new SearchUtilClass();
