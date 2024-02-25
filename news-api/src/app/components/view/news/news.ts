import './news.css';
import { getElement } from '../../../helper/utils';
import { Article } from 'src/app/helper/types';

class News {
  draw(data: Article[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = getElement<HTMLTemplateElement>(document.body, '#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsMetaPhotoDivElement = getElement<HTMLDivElement>(newsClone, '.news__meta-photo');

      newsMetaPhotoDivElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'
        })`;

      const newsMetaAuthorDivElement = getElement<HTMLLIElement>(newsClone, '.news__meta-author');
      if (newsMetaAuthorDivElement) {
        newsMetaAuthorDivElement.textContent = item.author || (item.source ? item.source.name : '');
      }

      const newsMetaDateDivElement = getElement<HTMLLIElement>(newsClone, '.news__meta-date');
      if (newsMetaDateDivElement && item.publishedAt) {
        const dateParts = item.publishedAt.slice(0, 10).split('-').reverse();
        const formattedDate = dateParts.join('-');
        newsMetaDateDivElement.textContent = formattedDate;
      }

      // const newsMetaDateDivElement = getElement<HTMLLIElement>(newsClone, '.news__meta-date');
      // newsMetaDateDivElement.textContent = item.publishedAt
      //   .slice(0, 10)
      //   .split('-')
      //   .reverse()
      //   .join('-');

      const newsDescriptionTitleElement = getElement<HTMLHeadingElement>(newsClone, '.news__description-title');

      if (newsDescriptionTitleElement) {
        newsDescriptionTitleElement.textContent = item.title || '';
      }

      const newsDescriptionSourceElement = getElement<HTMLHeadingElement>(newsClone, '.news__description-source');
      if (newsDescriptionSourceElement && item.source) {
        newsDescriptionSourceElement.textContent = item.source.name || '';
      }

      const newsDescriptionContentElement = getElement<HTMLParagraphElement>(newsClone, '.news__description-content');
      if (newsDescriptionContentElement) {
        newsDescriptionContentElement.textContent = item.description || '';
      }

      const newsDescriptionReadMoreElement = getElement<HTMLAnchorElement>(newsClone, '.news__read-more a');
      if (newsDescriptionReadMoreElement) {
        newsDescriptionReadMoreElement.setAttribute('href', item.url || '');
      }

      fragment.append(newsClone);
    });
    const newsDivElement = getElement<HTMLTemplateElement>(document.body, '.news');

    newsDivElement.innerHTML = '';
    newsDivElement.appendChild(fragment);
  }
}

export default News;
