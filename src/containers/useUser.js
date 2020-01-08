import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  setCourses,
} from '../actions';
import { fetchProfile, fetchAllCourses } from '../utils/api';

export default function useUser(props) {
  const dispatch = useDispatch();
  const onSetUser = payload => dispatch(setUser(payload));
  const onGetProfile = () => dispatch(getProfile());
  const onGetProfileSuccess = () => dispatch(getProfileSuccess());
  const onGetProfileError = () => dispatch(getProfileError());
  const onSetCourses = payload => dispatch(setCourses(payload));

  const { isLoading, user, allCourses } = useSelector(
    ({ globalStore, homePage }) => ({
      isLoading: homePage.loading,
      user: globalStore.user,
      allCourses: globalStore.courses,
    }),
  );

  const history = useHistory();

  useEffect(() => {
    const pageLoad = async () => {
      onGetProfile();
      try {
        const usr = await fetchProfile();
        onSetUser(usr);
        onGetProfileSuccess();
      } catch (err) {
        console.log('$$$ERROR:', err.message);
        history.push('/');
        onGetProfileError();
        return;
      }
      if (allCourses.length === 0) {
        try {
          const courses = await fetchAllCourses();
          onSetCourses(courses);
        } catch (err) {
          console.log(err);
        }
      }
    };
    if (!user && !isLoading) pageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { isLoading, user, allCourses };
}
