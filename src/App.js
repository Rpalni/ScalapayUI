import React from 'react';
import GetConfiguration from './component/getConfiguration';
import PostOrder from './component/postOrder';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Route exact path="/" component={GetConfiguration} />
      <Route path="/postorder" component={PostOrder} />
    </Router>
  );
}

export default App;
