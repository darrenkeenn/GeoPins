import React from 'react';

import withRoot from '../withRoot';
import Map from '../components/Map';
import Header from '../components/Header';

const App = () => (
  <>
    <Header />
    <Map />
  </>
);

export default withRoot(App);
