import { useState } from "react";

const useHeaderLink = (initialLink=[]) => {
  const [headerLink, setHeaderLink] = useState(initialLink);

  const loginHeader = () =>
    setHeaderLink([["Write New Post", '/post/new'], ["Profile", `/user`]])
  const logoutHeader = () =>
    setHeaderLink([["Create Account", "/register"], ["Log In", "/login"]])


  return [headerLink, {loginHeader, logoutHeader}];
}

export default useHeaderLink;