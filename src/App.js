import React, { useEffect, useState } from 'react';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';
import { Authenticate } from './components/authenticateUtils/authenticate';
import { Admin } from './components/common/admin'
import { Home } from './components/home/home';
import { Categories } from './components/categoriesUtils/categories';
import { SinglePost } from './components/singlePost/singlePost';
import { SignUp } from './components/adminUtils/signUp';
import { Contact } from './components/contact/contact';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'


function App() {

  const sessionAuth = sessionStorage.getItem('authentication')
  const [auth, setAuth] = useState(sessionAuth);
  const sessionAuthor = sessionStorage.getItem('author')
  const [author, setAuthor] = useState(sessionAuthor)

  const changeAuth = (permission, author) => {
    setAuth(permission);
    setAuthor(author)
    sessionStorage.setItem('authentication', permission)
    sessionStorage.setItem('author', author)
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest} render={() => {
        return (
          auth ? children : <Redirect to={
            {
              pathname: '/login'
            }
          } />
        )
      }} />
    )
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/category/:category'>
          <Categories />
        </Route>
        <Route exact path='/post/:postId'>
          <SinglePost />
        </Route>
        <Route exact path='/login'>
          <Authenticate authStatus={changeAuth} />
        </Route>
        <PrivateRoute exact path='/create'>
          <Admin authStatus={changeAuth} author={author} />
        </PrivateRoute>
        <Route exact path='/signUp'>
          <SignUp />
        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;