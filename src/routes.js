import React from 'react';
import { Route } from 'react-router-dom';

import HomeView from "./containers/HomeView";
import UniversityList from './containers/UniversityListView';
import UniversityDetail from './containers/UniversityDetailView';
import NoticeList from './containers/NoticeListView';
import UniversitySearchList from './containers/SearchResultList';
import CommunityList from './containers/CommunityListView';
import PostDetail from './containers/PostDetail';
import CreatePost from './containers/CreatePost';
import SignUp from './containers/SignUpView';
import Login from './containers/LoginView';
import UpdatePost from './containers/UpdatePost';
import FavoriteUniversitiesView from './containers/FavoriteUniversitiesView';
import MyPostListView from './containers/MyPostListView';


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={HomeView} />
        <Route path='/search' component={UniversitySearchList} />
        <Route exact path='/universities' component={UniversityList} />
        <Route exact path='/universities/:universityID' component={UniversityDetail} />
        <Route exact path='/notices' component={NoticeList} />
        <Route exact path='/posts' component={CommunityList} />
        <Route exact path='/posts/:postID' component={PostDetail} />
        <Route exact path='/create' component={CreatePost} />
        <Route exact path='/posts/:postID/update' component={UpdatePost} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/favorites' component={FavoriteUniversitiesView} />
        <Route exact path='/myposts' component={MyPostListView} />
    </div>
);

export default BaseRouter;