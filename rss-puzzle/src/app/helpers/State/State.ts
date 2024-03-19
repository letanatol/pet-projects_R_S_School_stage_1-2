import { EventTypes, WordInterface, StateType } from '@helpers/types';
import wordCollectionLevel1 from '../../data/wordCollectionLevel1.json';
import wordCollectionLevel2 from '../../data/wordCollectionLevel2.json';
import wordCollectionLevel3 from '../../data/wordCollectionLevel3.json';

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
    this.getState();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeRound, { bubbles: true, detail: { round: value } }));
  };

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
  };

  public getLevelCurrent = (): string => this.state.levelData.id.split('_')[0];

  public getRoundCurrent = (): string => this.state.levelData.id.split('_')[1];

  public getRowData = (): WordInterface => this.state.arrayRowsData[this.getRowCurrent()];

  public setWordSource = (): void => {
    this.state.wordGame.wordSource = this.getRowData().textExample.split(' ');
  };

  public setWordUser = (collection: NodeList): void => {
    this.state.wordGame.wordUser = [];
    collection.forEach((element: Node) => {
      const htmlElement = element as HTMLElement;
      const { textContent } = htmlElement;
      if (textContent !== null) {
        this.state.wordGame.wordUser.push(textContent);
      }
    });
    console.log(this.state.wordGame.wordUser);
  };

  public getWordSource = (): string[] => this.state.wordGame.wordSource;

  public getWordUser = (): string[] => this.state.wordGame.wordUser;

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
  };

  public getRowCurrent = (): number => this.state.levelData.rowCurrent;

  public setRowCurrent = (value: number): void => {
    this.state.levelData.rowCurrent = value;
    this.setWordSource();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeRow, { bubbles: true, detail: { round: value } }));
  };

  public getState = (): void => {
    console.log(this.state);
  };
}

const state = new State();

export { state };
