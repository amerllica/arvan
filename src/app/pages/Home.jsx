import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSnackBar } from 'material-snackbar-supplier';
import { createStyles, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getArticlesList } from '~/redux/actions';
import {
  BaseLayout,
  Grid,
  Typography,
  Table,
  Pagination,
} from '~/app/components';
import { tableBodyNormalizer } from '~/utils/helpers';
import {
  articlesPerPage,
  articlesFailed,
  unknownError,
} from '~/utils/constants';

const tableHead = [
  { key: 'number', title: '#' },
  { key: 'title', title: 'Title' },
  { key: 'author', render: author => author.username, title: 'Author' },
  {
    key: 'tagList',
    render: tags =>
      tags.length ? (
        <Grid style={{ flexWrap: 'wrap', width: 200 }}>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                backgroundColor: 'rgba(10,183,255,0.25)',
                borderRadius: 4,
                fontSize: 12,
                marginBottom: 2,
                marginRight: 2,
                padding: '1px 4px',
              }}
            >
              {tag}
            </span>
          ))}
        </Grid>
      ) : (
        '-'
      ),
    title: 'Tags',
  },
  { key: 'description', title: 'Excerpt' },
  {
    key: 'createdAt',
    render: date => new Date(date).toDateString(),
    title: 'Created',
  },
  { key: 'actions', render: () => <span>A</span>, title: '' },
];

const Home = ({
  classes,
  getArticles,
  articles: { articles, articlesCount, pageNumber, error, errorMessage },
  showSnackBar,
}) => {
  useEffect(() => {
    getArticles(articlesPerPage);
  }, []);
  useEffect(
    () =>
      error &&
      Object.entries(errorMessage || {}).forEach(err =>
        showSnackBar({
          message:
            (
              <span className={classes.snackBarErrorText}>
                <b>{articlesFailed}</b>
                {` ${err[0]} ${err[1]}`}
              </span>
            ) || unknownError,
          variant: 'error',
        })
      ),
    [error]
  );
  return (
    <>
      <Helmet title="home" />
      <BaseLayout>
        <Grid className={classes.root}>
          <Grid className={classes.pageTitle}>
            <Typography variant="h4">All Posts</Typography>
          </Grid>
          <Grid className={classes.pageContent}>
            {!!articlesCount && (
              <Table
                head={tableHead}
                body={tableBodyNormalizer(articles, pageNumber)}
              />
            )}
          </Grid>
          <Grid className={classes.paginationWrapper}>
            {!!articlesCount && (
              <Pagination
                onPageChange={pageNo => getArticles(articlesPerPage, pageNo)}
                size={articlesPerPage}
                total={articlesCount}
              />
            )}
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
};

Home.propTypes = {
  articles: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.object),
    articlesCount: PropTypes.number,
    error: PropTypes.bool,
    errorMessage: PropTypes.objectOf(PropTypes.string),
    pageNumber: PropTypes.number,
  }),
  classes: PropTypes.instanceOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  showSnackBar: PropTypes.func.isRequired,
};

Home.defaultProps = {
  articles: {
    articles: [],
    articlesCount: undefined,
    error: undefined,
    errorMessage: {},
    pageNumber: 0,
  },
};

const styles = ({ spacing, palette }) =>
  createStyles({
    pageContent: {
      overflow: 'hidden',
      padding: [[0, spacing(2), spacing(2)]],
    },
    pageTitle: {
      padding: spacing(2),
    },
    paginationWrapper: {
      justifyContent: 'center',
      marginBottom: spacing(2),
      marginTop: 'auto',
    },
    root: {
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    },
    snackBarErrorText: {
      color: palette.error.contrastText,
    },
  });

const mapStateToProps = ({ articles, articlesCount, pageNumber }) => ({
  articles,
  articlesCount,
  pageNumber,
});

const mapDispatchToProps = dispatch => ({
  getArticles: (perPage, pageNumber = 0) =>
    dispatch(getArticlesList(perPage, pageNumber)),
});

export default compose(
  memo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSnackBar,
  withStyles(styles)
)(Home);
