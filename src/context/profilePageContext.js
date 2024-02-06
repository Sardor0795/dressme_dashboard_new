import React, { createContext, useEffect, useState } from "react";
export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileContext, setProfileContext] = useState();

  return (
    <ProfileContext.Provider value={[profileContext, setProfileContext]}>
      {children}
    </ProfileContext.Provider>
  );
}
