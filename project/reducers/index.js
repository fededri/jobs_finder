import {combineReducers} from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';
import location from './geolocation_reducer';


export default ({
  auth, jobs, likedJobs, location
});