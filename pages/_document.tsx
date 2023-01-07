import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '@styles/createEmotionCache';
import { DEFAULT_FONT } from '@styles/themes/defaultTheme';
import Document from 'next/document';
import { Head as DocumentHead, Html, Main, NextScript } from 'next/document';

/**
 * The structure of this file and integration with emotion is based on the recommendation:
 * @link https://github.com/mui/material-ui/blob/612db95ec47fdd9e30f9cb33b99df3af5a972542/examples/nextjs-with-typescript/pages/_document.tsx
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/unbound-method -- mui recommendation */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={DEFAULT_FONT.className}>
        <DocumentHead>
          <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/manifest/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/manifest/favicon-16x16.png" />
          <link rel="manifest" href="/manifest/site.webmanifest" />
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </DocumentHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (context) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = context.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(properties) {
          return <App emotionCache={cache} {...properties} />;
        },
    });

  const initialProperties = await Document.getInitialProps(context);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProperties.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- MUI recommendation
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger -- MUI recommendation
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProperties,
    emotionStyleTags,
  };
};

export default MyDocument;
