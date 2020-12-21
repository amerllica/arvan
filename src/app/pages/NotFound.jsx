import React, {memo} from 'react';
import Helmet from 'react-helmet';

const NotFound = () => (
  <div>
    <Helmet title="not found"/>
    <h1>not found 404</h1>
  </div>
);

export default memo(NotFound);
