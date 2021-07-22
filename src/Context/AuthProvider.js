import React, { useState } from 'react';
import { auth } from '../Firebase/config';
import { useHistory } from 'react-router-dom';
import {Spin} from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if(user){
                const {displayName, email, uid, photoURL} = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                setIsLoading(false);
                history.push('/chatroom');
                return;
            }
            setIsLoading(false);
            history.push('/login');
        });

        return () => {
            unsubscibed();
        }
    }, [history]);
    console.log({ user });
    console.log({ isLoading });

    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
} 
