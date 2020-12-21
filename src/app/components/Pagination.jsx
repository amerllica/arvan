/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  ChevronLeft,
  ChevronRight,
  IconButton,
  Grid,
  MoreHoriz,
} from '~/app/components';
import { createStyles, withStyles } from '~/utils/helpers';

class Pagination extends PureComponent {
  constructor() {
    super();

    this.state = {
      pageNumber: 0,
    };

    this.sendTheChangedPage = this.sendTheChangedPage.bind(this);
  }

  get lastPage() {
    const { total, size } = this.props;
    const floor = Math.floor(total / (size || 0.0001));
    const ceil = Math.ceil(total / (size || 0.0001));
    return floor === ceil ? floor - 1 : floor;
  }

  get pages() {
    const { pageNumber } = this.state;
    const aroundCurrent = Array.from(
      { length: 5 },
      (_, i) => i + pageNumber - 2
    ).filter(p => p >= 0 && p <= this.lastPage);
    const lowerAroundCurrent = aroundCurrent[0];
    const lowerBand =
      lowerAroundCurrent <= 2
        ? [0, 1].filter(p => p < lowerAroundCurrent)
        : [0, NaN];

    const higherAroundCurrent = aroundCurrent[aroundCurrent.length - 1];
    const upperBand =
      higherAroundCurrent >= this.lastPage - 2
        ? [this.lastPage - 1, this.lastPage].filter(
            p => p > higherAroundCurrent
          )
        : [NaN, this.lastPage];

    return [...lowerBand, ...aroundCurrent, ...upperBand];
  }

  get prev() {
    const { pageNumber: p } = this.state;
    const { classes } = this.props;

    return (
      <IconButton
        disabled={p < 1}
        className={classes.button}
        color="inherit"
        onClick={() =>
          this.setState(
            ({ pageNumber }) => ({ pageNumber: pageNumber - 1 }),
            this.sendTheChangedPage
          )
        }
      >
        <ChevronLeft />
      </IconButton>
    );
  }

  get next() {
    const { pageNumber: p } = this.state;
    const { classes } = this.props;

    return (
      <IconButton
        disabled={p === this.lastPage}
        className={classes.button}
        color="inherit"
        onClick={() =>
          this.setState(
            ({ pageNumber }) => ({ pageNumber: pageNumber + 1 }),
            this.sendTheChangedPage
          )
        }
      >
        <ChevronRight />
      </IconButton>
    );
  }

  get pager() {
    const { pageNumber } = this.state;
    const { classes } = this.props;

    return (
      <Grid className={classes.pager}>
        {this.pages.map((p, i) =>
          !Number.isNaN(parseFloat(p)) ? (
            <IconButton
              name={`page-${p}`}
              color="inherit"
              onClick={() =>
                this.setState({ pageNumber: p }, this.sendTheChangedPage)
              }
              className={cn(classes.page, p === pageNumber && classes.current)}
              key={`${p}-${i}`}
            >
              {p + 1}
            </IconButton>
          ) : (
            <IconButton className={classes.page} disabled key={`${p}-${i}`}>
              <MoreHoriz />
            </IconButton>
          )
        )}
      </Grid>
    );
  }

  sendTheChangedPage() {
    const { pageNumber } = this.state;
    const { onPageChange } = this.props;
    onPageChange(pageNumber);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root}>
        <Grid className={classes.prev}>{this.prev}</Grid>
        {this.pager}
        <Grid className={classes.next}>{this.next}</Grid>
      </Grid>
    );
  }
}

Pagination.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  total: PropTypes.number,
};

Pagination.defaultProps = {
  size: 1,
  total: 1,
};

const styles = ({ spacing, palette }) =>
  createStyles({
    button: {
      borderRadius: 0,
    },
    current: {
      color: palette.primary.main,
      pointerEvents: 'none',
    },
    next: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    page: {
      borderRadius: 0,
      fontSize: 20,
      height: spacing(6),
      width: spacing(6),
    },
    pager: {
      '& > span': {
        borderRight: [[1, 'solid', palette.formHeader]],
      },
      borderLeft: [[1, 'solid', palette.formHeader]],
    },
    prev: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      border: [[1, 'solid', palette.formHeader]],
      borderRadius: 4,
      justifyContent: 'space-between',
    },
  });

export default withStyles(styles)(Pagination);
