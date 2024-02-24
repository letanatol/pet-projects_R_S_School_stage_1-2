import { Source } from '../../../helper/types';
import { getElement } from '../../../helper/utils';
import './sources.css';

class Sources {
  draw(data: Source[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = getElement<HTMLTemplateElement>(document.body, '#sourceItemTemp');

    data.forEach((item: Source) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      const itemName = getElement<HTMLSpanElement>(sourceClone, '.source__item-name');
      itemName.textContent = item.name;

      const sourceItem = getElement<HTMLDivElement>(sourceClone, '.source__item');
      sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
