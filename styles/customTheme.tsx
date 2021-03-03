import theme, { Theme } from '@chakra-ui/theme';
import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  ...theme.styles,
  global: (props) => ({
    ...theme.styles.global,
    'html, body': {
      minHeight: '100vh',
      background:
        'linear-gradient(0deg,rgba(2, 0, 36, 1) 0%,rgba(64, 64, 180, 1) 35%,rgba(0, 212, 255, 1) 100%)',
    },
    '::placeholder, ::-ms-input-placeholder': {
      color: 'brand.500',
      opacity: '.4',
    },
  }),
};

const customTheme = extendTheme({
  // fonts: {
  //   ...theme.fonts,
  //   body: `"Source Sans Pro",${theme.fonts.body}`,
  //   heading: `"Source Sans Pro",${theme.fonts.heading}`,
  // },
  colors: {
    brand: {
      50: '#c0eff8',
      100: 'rgb(80, 220, 248)',
      200: '#189de3',
      300: '#2976d0',
      400: '#4040b4',
      500: '#2b2a83',
      600: '#19185a',
      700: '#020024',
    },
  },

  styles,
});

export default customTheme;
