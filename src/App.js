import './App.scss';
import Header from './partials/Header';
import UniversitiesList from './partials/UniversitiesList';
import { Switch, Route, Redirect } from 'react-router-dom';
import University from './partials/University';
function App() {
  return (
    <div className="App">
      <Header className="App-header" />
      <Switch>
        <Route exact path="/">
          <Redirect to="/universities" />
        </Route>
        <Route path="/universities" component={UniversitiesList} />
        <Route path="/university/:id" component={University} />
      </Switch>
    </div>
  );
}

export default App;
