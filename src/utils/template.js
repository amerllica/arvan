import serialize from 'serialize-javascript';

export default ({ appEnvironment, markup, helmet, jss, store }) =>
  `<!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
          <style id="jss-server-side">${jss}</style>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.script.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>
            window.__Store__ = ${serialize(store)};
            window.__Env__ = ${serialize(appEnvironment)};
          </script>
      </body>
    </html>`;
