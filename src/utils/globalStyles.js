import { createStyles } from '~/utils/helpers';

const globalStyles = ({ palette }) =>
  createStyles({
    '@global': {
      '#root': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      body: {
        height: '100%',
      },
      html: {
        height: '100%',
      },
      span: {
        '& > svg': {
          color: palette.arvanGrey,
        },
      },
    },
  });

export default globalStyles;
