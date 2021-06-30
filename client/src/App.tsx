import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import { PageRender } from './PageRender';
function App() {
  return (
    <>
      <Router>
        <Alert />
        <Header />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
