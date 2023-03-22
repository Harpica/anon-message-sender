import MainView from './views/MainView';
import AuthView from './views/AuthView';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserData } from './utils/types';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserData>({
        id: 0,
        name: 'default',
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/sign-in'
                    element={
                        <AuthView
                            setIsAuth={setIsAuth}
                            setCurrentUser={setCurrentUser}
                        />
                    }
                />
                <Route
                    path='/'
                    element={
                        <ProtectedRoute authKey={isAuth}>
                            <MainView
                                setIsAuth={setIsAuth}
                                currentUser={currentUser}
                            />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
