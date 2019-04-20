import request from 'services/http';
import {
  FETCH_FACEBOOK_POSTS,
  FETCH_FACEBOOK_POSTS_SUCCESS,
  FETCH_FACEBOOK_POSTS_FAILURE,
} from './types';

const listFacebookPosts = () => (dispatch) => {
  dispatch({ type: FETCH_FACEBOOK_POSTS });

  return request.get('/facebook/posts')
    .then(res => dispatch({
      type: FETCH_FACEBOOK_POSTS_SUCCESS,
      posts: res.body,
    }))
    .catch(err => dispatch({
      type: FETCH_FACEBOOK_POSTS_FAILURE,
      message: 'Une erreur est survenue, merci de réessayer plus tard.',
      err,
    }));
};

export default {
  listFacebookPosts,
};
