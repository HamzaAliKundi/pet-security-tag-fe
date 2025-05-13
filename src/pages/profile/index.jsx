import React from 'react'
import { useParams } from 'react-router-dom';
import Profile from '../../components/profile/profile';

const ProfilePage = () => {
  const { id } = useParams();
  return (
    <div>
      <Profile id={id} />
    </div>
  )
}

export default ProfilePage;
