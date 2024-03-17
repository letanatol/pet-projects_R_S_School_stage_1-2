import { EventTypes, LevelDataInterface, WordInterface, UiState } from '@helpers/types';
import wordCollectionLevel1 from '../../data/wordCollectionLevel1.json';

type StateType = {
  levelsCount: string;
  levelCurrent: string;
  roundsCount: string;
  levelData: LevelDataInterface;
  roundData: WordInterface[];
  ui: UiState;
};

type Hint = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
};

class State {
  private state: StateType = {
    levelsCount: '6',
    levelCurrent: '1',
    roundsCount: wordCollectionLevel1.roundsCount.toString(),
    levelData: {
      id: '1_01',
      name: 'Stag Hunt',
      imageSrc: 'level1/deerhunt.jpg',
      cutSrc: 'level1/cut/deerhunt.jpg',
      author: 'Niccolò dell',
      year: '1550-52',
      rowCurrent: '01',
    },
    roundData: wordCollectionLevel1.rounds[0].words,
    ui: {
      continueDisabled: false,
      checkDisabled: false,
    },
  };

  public getLevelsCount = (): string => this.state.levelsCount;

  public getLevelCurrent = (): string => this.state.levelCurrent;

  public setLevelCurrent = (value: string): void => {
    this.state.levelCurrent = value;
    this.state.levelData.rowCurrent = '01';
    window.dispatchEvent(
      new CustomEvent(EventTypes.ChangeLevel, { bubbles: true, detail: { level: this.state.levelCurrent } })
    );
  };

  public getRoundsCount = (): string => this.state.roundsCount;

  public getRoundCurrent = (): string => {
    const round = this.state.levelData.id.split('_')[1];
    return round;
  };

  public setIdRoundCurrent = (value: string): void => {
    this.state.levelData.id = `${this.getLevelCurrent()}_${value}`;

    window.dispatchEvent(
      new CustomEvent(EventTypes.ChangeRound, { bubbles: true, detail: { round: this.state.levelData.id } })
    );
  };

  public getRowCurrent = (): string => this.state.levelData.rowCurrent;

  public getRowData = (): WordInterface => this.state.roundData[Number(this.getRowCurrent())];

  public getHint = (): Hint => ({
    audioExample: this.getRowData().audioExample,
    textExample: this.getRowData().textExample,
    textExampleTranslate: this.getRowData().textExampleTranslate,
  });

  public upDateUi = (newState: UiState): void => {
    this.state.ui = { ...this.state.ui, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.ChangeUI, { bubbles: true, detail: {} }));
  };

  public getUiState = (): UiState => this.state.ui;

  public setRowCurrent = (): void => {
    this.state.levelData.rowCurrent += 1;
  };
}

const state = new State();

export { state };
