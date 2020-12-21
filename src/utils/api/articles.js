import url from '~/utils/api/urls';
import { get } from '~/utils/api';
import { articlesPerPage } from '~/utils/constants';

const getArticleDataPerPage = (perPage, pageNumber) => {
  const getUrl = `${url.articles.list}?limit=${perPage ||
    articlesPerPage}&offset=${pageNumber * (perPage || articlesPerPage)}`;
  return get(getUrl);
};

export default getArticleDataPerPage;
