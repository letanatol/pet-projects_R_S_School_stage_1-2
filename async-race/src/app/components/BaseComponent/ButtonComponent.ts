// import BaseComponent from './Component';

// type HTMLElementType = {
//   tagName: keyof HTMLElementTagNameMap;
//   classNames?: string[];
//   textContent?: string;
// };

// const EMPTY_ARRAY = 0;

// export class ButtonComponent extends BaseComponent {
//   public draw<T extends keyof HTMLElementTagNameMap>(value: HTMLElementType): HTMLElementTagNameMap[T] {
//     const { tagName, classNames, textContent } = value;
//     const element = document.createElement(tagName);
//     if (classNames) {
//       if (classNames.length > EMPTY_ARRAY) {
//         element.classList.add(...classNames);
//       }
//     }

//     if (textContent) {
//       element.innerHTML = textContent;
//     }

//     return element as HTMLElementTagNameMap[T];
//   }

//   public init(): void {
//     console.log('Add Button listener');
//     // buttonToGarage.addEventListener('click', () => {
//     //   const uiState = state.getUiState();
//     //   if (uiState.garageHidden) {
//     //     state.updateUi({ garageHidden: false, winnersHidden: true });
//     //   } else {
//     //     state.updateUi({ garageHidden: true, winnersHidden: false });
//     //   }
//     // });
//   }
// }
