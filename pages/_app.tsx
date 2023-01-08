import { MainLayout } from '@domains/shared/components/MainLayout/MainLayout';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '@styles/createEmotionCache';
import { DEFAULT_THEME } from '@styles/themes/defaultTheme';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

interface MyAppProperties extends AppProps {
  emotionCache?: EmotionCache;
}

// Create styles in the right order
// @link https://mui.com/material-ui/guides/interoperability/#css-injection-order-2
const clientSideEmotionCache = createEmotionCache();

const Application = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProperties) => {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </NextHead>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={DEFAULT_THEME}>
          {/* Base reset styles - @link https://mui.com/material-ui/react-css-baseline/ */}
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default Application;
