import './App.scss';
import React, { useState } from 'react';
import HomePage from './partials/HomePage';
import { Switch, Route, Redirect } from 'react-router-dom';
import University from './partials/University';
import { RecomContextProvide } from './context/recommondationsContext';
function App() {
  const [recommondationFilters, setRecommondationFilters] = useState(null);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/universities" />
        </Route>
        <RecomContextProvide>
          <Route path="/universities" component={HomePage} />
          <Route path="/university/:id" component={University} />
        </RecomContextProvide>
      </Switch>
    </div>
  );
}

export default App;
