import { Article, Data, Source } from '../../helper/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news = new News();

  private sources = new Sources();

  drawNews(data: Data) {
    const values: Article[] = data?.articles ?? [];
    this.news.draw(values);
  }

  drawSources(data: Data) {
    const values: Source[] = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;
