import React, { useEffect } from "react";
import useGoogleAuthToken from "../hooks/useGoogleAuthToken";
import useGoogleAuthLink from "../hooks/useGoogleAuthLink";
import useProfile from "../hooks/useProfile";

function Login() {
  const { data: profile, refetch: fetchProfile } = useProfile();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl);
    }
  }, [googleAuth]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      mutate({ code, state });
    }
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      fetchProfile();
    }
  }, [isSuccess, fetchProfile]);

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl);
    }
  }, [googleAuth]);

  const handleGoogleLogin = () => {
    fetchGoogleAuth();
  };

  return (
    handleGoogleLogin
  );
}

export default Login;