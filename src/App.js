import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Components */
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieList from './components/MovieList';
import Sidebar from './components/Sidebar';
/* Pages */
import HomeComponent from './pages/Home';
import MovieComponent from './pages/Movie';

function App() {

  return (
    <Router>
      <div className="App min-h-screen flex flex-col ">
        <Header />
        <div className="w-full relative h-full flex flex-1 flex-row">
          <div className="w-1/6">
            <Sidebar />
          </div>
          <div className="content-wrapper min-h-full w-full p-4 bg-zinc-800 text-zinc-300">
            <Switch>
              <Route path="/genre/:id" exact render={() => (<MovieList query="genre" />) } />
              <Route path="/lang/:id" exact render={() => (<MovieList query="lang" />)} />
              <Route path="/movie/:id" exact component={MovieComponent} />
              <Route path="/" exact component={HomeComponent} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
