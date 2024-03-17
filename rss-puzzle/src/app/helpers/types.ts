export type UserType = {
  name: string;
  surname: string;
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
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
  rowCurrent: string;
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
}

export type UiState = {
  continueDisabled?: boolean;
  checkDisabled?: boolean;
};
