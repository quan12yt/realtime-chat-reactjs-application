import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModel from './components/Models/AddRoomModel';
import InviteMemberModel from './components/Models/InviteMemberModel';

function App() {
  return <BrowserRouter>
  <AuthProvider>
    <AppProvider>
        <Switch>
          <Route component={Login} path="/login"/>
          <Route component={ChatRoom} path="/chatroom"/>
        </Switch>
        <AddRoomModel></AddRoomModel>
        <InviteMemberModel></InviteMemberModel>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
