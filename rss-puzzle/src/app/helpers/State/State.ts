import { EventTypes, WordInterface, UiState, StateType, Hint, WordGame } from '@helpers/types';
import wordCollectionLevel1 from '../../data/wordCollectionLevel1.json';
import wordCollectionLevel2 from '../../data/wordCollectionLevel2.json';
import wordCollectionLevel3 from '../../data/wordCollectionLevel3.json';
import wordCollectionLevel4 from '../../data/wordCollectionLevel4.json';
import wordCollectionLevel5 from '../../data/wordCollectionLevel5.json';
import wordCollectionLevel6 from '../../data/wordCollectionLevel6.json';

const STEP = 1;

class State {
  private state: StateType = {
    levelsCount: '6',
    roundsCount: wordCollectionLevel1.roundsCount.toString(),
    levelData: {
      id: '1_01',
      rowCurrent: 0,
      name: 'Stag Hunt',
      imageSrc: 'level1/deerhunt.jpg',
      cutSrc: 'level1/cut/deerhunt.jpg',
      author: 'Niccolò dell',
      year: '1550-52',
    },
    arrayRowsData: wordCollectionLevel1.rounds[0].words,
    wordGame: {
      wordUser: [],
      wordSource: [],
      wordNoKnow: [],
      wordKnow: [],
    },
    ui: {
      continueHidden: true,
      checkHidden: true,
      noKnowHidden: false,
    },
  };

  public getLevelsCount = (): string => this.state.levelsCount;

  public getRoundsCount = (): string => this.state.roundsCount;

  public setLevelCurrent = (value: string): void => {
    this.state.levelData.id = `${value}_${this.state.levelData.id.split('_')[1]}`;
    this.setRoundsCount();
    this.setRoundCurrent('01');
    this.setArrayRowsData();
    this.setWordSource();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeLevel, { bubbles: true, detail: { level: value } }));
  };

  public setRoundCurrent = (value: string): void => {
    this.state.levelData.id = `${this.state.levelData.id.split('_')[0]}_${value}`;
    this.setArrayRowsData();
    this.setWordSource();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeRound, { bubbles: true, detail: { round: value } }));
  };

  public getLevelRoundCurrent = (): string => this.state.levelData.id;

  public setRoundsCount = (): void => {
    if (this.state.levelData.id.split('_')[0] === '1') {
      this.state.roundsCount = wordCollectionLevel1.roundsCount.toString();
    }
    if (this.state.levelData.id.split('_')[0] === '2') {
      this.state.roundsCount = wordCollectionLevel2.roundsCount.toString();
    }
    if (this.state.levelData.id.split('_')[0] === '3') {
      this.state.roundsCount = wordCollectionLevel3.roundsCount.toString();
    }
    if (this.state.levelData.id.split('_')[0] === '4') {
      this.state.roundsCount = wordCollectionLevel4.roundsCount.toString();
    }
    if (this.state.levelData.id.split('_')[0] === '5') {
      this.state.roundsCount = wordCollectionLevel5.roundsCount.toString();
    }
    if (this.state.levelData.id.split('_')[0] === '6') {
      this.state.roundsCount = wordCollectionLevel6.roundsCount.toString();
    }
  };

  public getLevelCurrent = (): string => this.state.levelData.id.split('_')[0];

  public getRoundCurrent = (): string => this.state.levelData.id.split('_')[1];

  public getRowData = (): WordInterface => this.state.arrayRowsData[this.getRowCurrent()];

  public setWordSource = (): void => {
    this.state.wordGame.wordSource = this.getRowData().textExample.split(' ');
  };

  public setWordUser = (value: string[]): void => {
    this.state.wordGame.wordUser = value;
  };

  public setWordNoKnow = (value: string[]): void => {
    this.state.wordGame.wordNoKnow.push(value);
  };

  public setWordKnow = (value: string[]): void => {
    this.state.wordGame.wordKnow.push(value);
  };

  public clearWords = (wordType: keyof WordGame): void => {
    if (Array.isArray(this.state.wordGame[wordType])) {
      this.state.wordGame[wordType] = [];
    }
  };

  public addWordUser = (word: string): void => {
    this.state.wordGame.wordUser.push(word);
  };

  public removeWordUser = (word: string): void => {
    this.state.wordGame.wordUser = this.state.wordGame.wordUser.filter((item) => item !== word);
  };

  public getWordSource = (): string[] => this.state.wordGame.wordSource;

  public getWordUser = (): string[] => this.state.wordGame.wordUser;

  public getWordKnow = (): string[][] => this.state.wordGame.wordKnow;

  public setArrayRowsData = (): void => {
    if (this.state.levelData.id.split('_')[0] === '1') {
      this.state.arrayRowsData =
        wordCollectionLevel1.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
    if (this.state.levelData.id.split('_')[0] === '2') {
      this.state.arrayRowsData =
        wordCollectionLevel2.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
    if (this.state.levelData.id.split('_')[0] === '3') {
      this.state.arrayRowsData =
        wordCollectionLevel3.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
    if (this.state.levelData.id.split('_')[0] === '4') {
      this.state.arrayRowsData =
        wordCollectionLevel4.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
    if (this.state.levelData.id.split('_')[0] === '5') {
      this.state.arrayRowsData =
        wordCollectionLevel5.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
    if (this.state.levelData.id.split('_')[0] === '6') {
      this.state.arrayRowsData =
        wordCollectionLevel6.rounds[Number(this.state.levelData.id.split('_')[1]) - STEP].words;
    }
  };

  public getRowCurrent = (): number => this.state.levelData.rowCurrent;

  public setRowCurrent = (value: number): void => {
    this.state.levelData.rowCurrent = value;
    this.setWordSource();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeRow, { bubbles: true, detail: { round: value } }));
  };

  public getHint = (): Hint => ({
    audioExample: this.getRowData().audioExample,
    textExample: this.getRowData().textExample,
    textExampleTranslate: this.getRowData().textExampleTranslate,
  });

  public updateUi = (newState: UiState): void => {
    this.state.ui = { ...this.state.ui, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeUI, { bubbles: true, detail: {} }));
  };

  public getUiState = (): UiState => this.state.ui;

  public getState = (): void => {
    console.log(this.state);
  };
}

const state = new State();

export { state };
