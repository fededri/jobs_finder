import axios from 'axios';
import {
    FETCH_JOBS,
    LIKE_JOB

} from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';


const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};


export const fetchJobs = (region, callback) => async (dispatch)=>{
    try{
    console.log('creating action fetch jobs');    
    let zip = await reverseGeocode(region);
    let url = buildJobsUrl(zip);
    let {data} = await axios.get(url);
    console.log(`response: ${String(data)}`);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
    }catch(err){
        console.log(`error ${err} `)
    }
};


const buildJobsUrl = (zip) => {
    const query  = qs.stringify({...JOB_QUERY_PARAMS, l: zip})
    return `${JOB_ROOT_URL}${query}`

};  


export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
};

