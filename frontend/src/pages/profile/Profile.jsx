import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useRedirect from "../../customHook/useRedirect";
import "./Profile.scss";
import { getUserProfile } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";

const Profile = () => {
  useRedirect("/login");

  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getUserData = async () => {
      const data = await getUserProfile();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    };
    getUserData();
  }, [dispatch]);

  return <div>Profile</div>;
};

export default Profile;
