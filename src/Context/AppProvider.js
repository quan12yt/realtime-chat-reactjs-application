import React, { useState } from "react";

import { AuthContext } from "./AuthProvider";
import useFireStore from "./../Hooks/HookFireStore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');


  const { user: { uid },} = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFireStore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFireStore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoom,
        selectedRoomId,
        members,
        setSelectedRoomId,
        isInviteVisible, 
        setIsInviteVisible
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
