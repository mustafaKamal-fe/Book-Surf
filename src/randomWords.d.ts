interface Options {
  min?: number;
  max?: number;
  exactly?: number;
  join?: string;
  maxLength?: number;
  wordsPerString?: number;
  seperator?: string;
  formatter?: (word: string, index: number) => string;
}

declare module "random-words" {
  function words(p: number | Options): string;
  export = words;
}
