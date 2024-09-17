import { CallbackFn, Endpoints } from 'src/app/helper/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources(callback: CallbackFn) {
    super.getResp({ endpoint: Endpoints.sources }, callback);
  }

  public getNews(e: Event, callback: CallbackFn) {
    let target: HTMLElement = e.target as HTMLElement;
    const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId: string = target.getAttribute('data-source-id') || '';

        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp(
            {
              endpoint: Endpoints.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
