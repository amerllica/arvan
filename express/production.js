require('@babel/register');
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const assetsDirName = 'assets';
const ClientStatsPath = path.resolve(
  process.cwd(),
  `${assetsDirName}/stats.json`
);
const ServerRendererPath = path.join(
  process.cwd(),
  `${assetsDirName}/js/server.js`
);

const ServerRenderer = require(ServerRendererPath).default; // eslint-disable-line import/no-dynamic-require
const Stats = require(ClientStatsPath); // eslint-disable-line import/no-dynamic-require
const config = require('./../src/utils/config');

const { port } = config;

app.use(
  `/${assetsDirName}`,
  express.static(path.join(__dirname, `../${assetsDirName}`))
);
app.use(ServerRenderer(Stats));

const PORT = port || 3000;

// eslint-disable-next-line consistent-return
app.listen(PORT, error => {
  if (error) {
    return console.error(error);
  }
  console.log(`Production Express server running at http://localhost:${PORT}`);
});
