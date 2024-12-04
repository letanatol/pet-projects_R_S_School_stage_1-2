export type UserType = {
  name: string;
  surname: string;
};

export type StateType = {
  levelsCount: string;
  roundsCount: string;
  levelData: LevelDataInterface;
  arrayRowsData: WordInterface[];
  wordGame: WordGame;
  ui: UiState;
};

export type WordGame = {
  wordUser: string[];
  wordSource: string[];
  wordNoKnow: string[][];
  wordKnow: string[][];
};

export type Hint = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
};

export interface WordInterface {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id?: number;
  word?: string;
  wordTranslate?: string;
}

export interface LevelDataInterface {
  id: string;
  rowCurrent: number;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Round {
  levelData: LevelDataInterface;
  words: WordInterface[];
}

export interface WordCollectionLevelInterface {
  rounds: Round[];
}

export enum EventTypes {
  ChangeSentence = 'changeSentence',
  ChangeLevel = 'changeLevel',
  ChangeRound = 'changeRound',
  ChangeUI = 'ChangeUI',
  ChangeRow = 'ChangeRow',
}

export type UiState = {
  continueHidden?: boolean;
  checkHidden?: boolean;
  noKnowHidden?: boolean;
};
