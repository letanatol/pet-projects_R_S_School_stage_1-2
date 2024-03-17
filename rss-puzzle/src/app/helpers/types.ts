export type UserType = {
  name: string;
  surname: string;
};

export enum EventTypes {
  ChangeSentence = 'changeSentence',
  ChangeLevel = 'changeLevel',
  ChangeRound = 'changeRound',
  ChangeUI = 'ChangeUI',
}
