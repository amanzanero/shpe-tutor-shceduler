import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import UserNav from '../components/UserNav';
import { toggleSettingsModal, toggleAddCoursesModal } from '../actions';

export default function Nav({ history, children }) {
  const dispatch = useDispatch();
  const onToggleModal = useCallback(() => dispatch(toggleSettingsModal()), [
    dispatch,
  ]);
  const onToggleAddCourses = useCallback(
    () => dispatch(toggleAddCoursesModal()),
    [dispatch],
  );
  const logOut = () => {
    localStorage.removeItem('id_token');
    history.push('/');
  };

  const navProps = { onToggleModal, logOut, onToggleAddCourses };

  return <UserNav {...navProps}>{children}</UserNav>;
}
