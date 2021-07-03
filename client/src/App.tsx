import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import { PageRender } from './PageRender';
import { refreshToken } from './redux/actions/AuthActions';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch])

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
