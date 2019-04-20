import {
  FETCH_FACEBOOK_POSTS,
  FETCH_FACEBOOK_POSTS_SUCCESS,
  FETCH_FACEBOOK_POSTS_FAILURE,
} from './types';

const INITIAL_STATE = {
  posts: [],
};

const facebookReducer = (state = INITIAL_STATE, { type, posts, err }) => {
  switch (type) {
    case FETCH_FACEBOOK_POSTS_SUCCESS:
      return {
        posts,
      };
    case FETCH_FACEBOOK_POSTS_FAILURE:
      return {
        posts,
        err,
      };
    case FETCH_FACEBOOK_POSTS:
    default:
      return state;
  }
};

export default facebookReducer;
