import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './account/Login';
import { oktaAuthConfig, oktaSignInConfig } from './config';
import PostDetail from './post-pages/PostDetail';
import CreatePost from './post-pages/CreatePost';
import EditPost from './post-pages/EditPost';
import AdvPostsBody from './home-components/AdvPostsBody';
import UserPostsBody from './home-components/UserPostsBody';
import Header from './home-components/Header';
import { ToastContainer } from 'react-toastify';
import SearchPage from './home-components/SearchPage';

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        try {
            history.replace(toRelativeUrl(originalUri, window.location.origin));
        } catch (error) {
            
        }
    };

    return (
        <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}>
        <Header />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} rtl={false}
                newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
        <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
            <Route path='/login/callback' component={LoginCallback} />
            <Route path='/user/:name' exact component={UserPostsBody} />
            <Route path='/blog/:id' exact component={PostDetail} />
            <SecureRoute path='/blogs/new' exact component={CreatePost} />
            <SecureRoute path='/blog/:id/edit' exact component={EditPost} />
            <Route path='/custom' exact component={AdvPostsBody} />
            <Route path='/search' exact component={SearchPage} />
        </Switch>
        </Security>
    );
};
export default AppWithRouterAccess;
