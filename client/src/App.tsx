import { Container, CssBaseline } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import { PageRender } from './PageRender';
import { refreshToken } from './redux/actions/AuthActions';
import { getCategories } from './redux/actions/CategoryAction';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getCategories())
  }, [dispatch])

  return (
    <>
      <CssBaseline />
      <Router>
        <Alert />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
