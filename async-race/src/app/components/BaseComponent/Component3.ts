// type HTMLElementType = {
//   tagName: keyof HTMLElementTagNameMap;
//   classNames?: string[];
//   textContent?: string;
// };

// interface BaseComponentInterface {
//   initialize<T extends keyof HTMLElementTagNameMap>(value: HTMLElementType): HTMLElementTagNameMap[T];
// }

// export abstract class BaseComponent implements BaseComponentInterface {
//   public initialize<T extends keyof HTMLElementTagNameMap>(value: HTMLElementType): HTMLElementTagNameMap[T] {
//     this.draw(value);
//     this.init();
//     return value as HTMLElementTagNameMap[T];
//   }

//   public abstract draw<T extends keyof HTMLElementTagNameMap>(value: HTMLElementType): HTMLElementTagNameMap[T];

//   public abstract init(): void;
// }
