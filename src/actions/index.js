import jsonPlaceholder from '../apis/jasonPlaceHolder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())
  const userIds = _.uniq(_.map(getState().posts, 'userId'))
  console.log(userIds)
  userIds.forEach(id => dispatch(fetchUser(id)))
}

export const fetchPosts = () => async dispatch => {
  const responce = await jsonPlaceholder.get('/posts');
  dispatch({
    type: 'FETCH_POSTS', payload: responce.data
  })
}

export const fetchUser = id => async dispatch => {
  const responce = await jsonPlaceholder.get(`/users/${id}`)
  dispatch({
    type: 'FETCH_USER', payload: responce.data
  })
}