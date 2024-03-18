import { EventTypes, WordInterface, StateType } from '@helpers/types';
import wordCollectionLevel1 from '../../data/wordCollectionLevel1.json';
import wordCollectionLevel2 from '../../data/wordCollectionLevel2.json';
import wordCollectionLevel3 from '../../data/wordCollectionLevel3.json';

const COUNT_ROWS = 9;
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

  public setLevelCurrent = (value: string): void => {
    this.state.levelData.id = `${value}_${this.state.levelData.id.split('_')[1]}`;
    this.state.levelData.rowCurrent = 0;
    this.setRoundsCount();
    this.setRoundCurrent('01');
    this.setArrayRowsData();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeLevel, { bubbles: true, detail: { level: value } }));
  };

  public setRoundCurrent = (value: string): void => {
    this.state.levelData.id = `${this.state.levelData.id.split('_')[0]}_${value}`;
    this.state.levelData.rowCurrent = 0;
    this.setArrayRowsData();
    this.setWordSource();
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeRound, { bubbles: true, detail: { round: value } }));
  };

  public getRowData = (): WordInterface => this.state.arrayRowsData[this.getRowCurrent()];

  public setWordSource = (): void => {
    this.state.wordGame.wordSource = this.getRowData().textExample.split(' ');
  };

  public setArrayRowsData = (): void => {
    if (this.state.levelData.id.split('_')[0] === '1') {
      this.state.arrayRowsData = wordCollectionLevel1.rounds[Number(this.state.levelData.id.split('_')[1])].words;
    }
    if (this.state.levelData.id.split('_')[0] === '2') {
      this.state.arrayRowsData = wordCollectionLevel2.rounds[Number(this.state.levelData.id.split('_')[1])].words;
    }
    if (this.state.levelData.id.split('_')[0] === '3') {
      this.state.arrayRowsData = wordCollectionLevel3.rounds[Number(this.state.levelData.id.split('_')[1])].words;
    }
  };

  public getRowCurrent = (): number => this.state.levelData.rowCurrent;

  public setRowCurrent = (): void => {
    if (this.state.levelData.rowCurrent > COUNT_ROWS) {
      if (Number(this.getLevelCurrent()) < Number(this.getLevelsCount())) {
        this.setLevelCurrent((Number(this.getLevelCurrent()) + STEP).toString());
      }
    } else {
      this.state.levelData.rowCurrent += 1;
    }
  };
}

const state = new State();

export { state };
