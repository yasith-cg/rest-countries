import { BrowserRouter as Router, Switch, Route } from'react-router-dom';

// Import custom components
import Login from './components/entry/login';
import NavigationBar from './components/navigation/navigationBar';
import Distance from './components/application/distance';
import Closest from './components/application/closest';
import Timezone from './components/application/timezone';
import Search from './components/application/search';

// Import stylesheets
import './style/app.css';

function App() {
  const navFocusDistance = {"route": "distance"};
  const navFocusClosest = {"route": "closest"};
  const navFocusTimezone = {"route": "timezone"};
  const navFocusSearch = {"route": "search"};

  return (
    // Routes
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/distance">
          <NavigationBar {...navFocusDistance} />
          <Distance />
        </Route>
        <Route exact path="/closest">
          <NavigationBar {...navFocusClosest} />
          <Closest />
        </Route>
        <Route exact path="/timezone">
          <NavigationBar {...navFocusTimezone} />
          <Timezone />
        </Route>
        <Route exact path="/search">
          <NavigationBar {...navFocusSearch} />
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
