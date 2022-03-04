import React, { useEffect, useRef, useState} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import './App.css'

import TopNavbar from './components/TopNavbar/TopNavbar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import CurrentlyReading from './components/CurrentlyReading/CurrentlyReading';
import Library from './components/Library/Library'
import Challenge from './components/Challenge/Challenge'
import Feed from './components/Feed/Feed'
import AddBookForm from './components/CurrentlyReading/AddBookForm/AddBookForm';
import EditBookForm from './components/CurrentlyReading/EditBookForm/EditBookForm';
import LibraryForm from './components/Library/LibraryForm/LibraryForm';
import Profile from './components/Profile/Profile';
import Auth from './Auth/Auth';
import ReadingSpeedTest from './components/Challenge/ReadingSpeedTest/ReadingSpeedTest';
import ReadingSpeedTestCompletion from './components/Challenge/ReadingSpeedTest/ReadingSpeedTestCompletion/ReadingSpeedTestCompletion';


import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './actions/auth';

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    
    // The user data is stored in the redux store, but the boolean of isLoggedIn is stored here
    // In the main app component so that we can conditionally render the authentication form or the home page.
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    // Check for token in local storage and request user details
    useEffect(() => {
        if (!user) {
            if (JSON.parse(localStorage.getItem('user'))) {
                dispatch(getUserInfo(navigate, setIsLoggedIn))
            } else {
                setIsLoggedIn(false)
                navigate('/auth')
            }
        } else {
            setIsLoggedIn(true)
        }
    }, [user])
    
    return (
        <div id='App'>
            <Container className="main-container" xs={12}>
                { isLoggedIn && <><TopNavbar /><div style={{height: '60px'}}/></>}

                <Routes >
                    {/* Authentication */}
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/profile' element={<Profile />} />
                    
                    {/* Currently Reading */}
                    <Route path='/' element={<CurrentlyReading />} />
                    <Route path='/add-book' element={<AddBookForm />} />
                    <Route path='/edit-book' element={<EditBookForm />} />

                    {/* Library */}
                    <Route path='/library' exact element={<Library />} />
                    <Route path='/library-form' exact element={<LibraryForm />} />

                    {/* Challenge */}
                    <Route path='/challenge' element={<Challenge />} />
                    <Route path='/reading-speed-test' element={<ReadingSpeedTest />} />
                    <Route path='/reading-speed-test-completion' element={<ReadingSpeedTestCompletion />} />

                    {/* News Feed */}
                    <Route path='/feed' element={<Feed />} />
                </Routes>

                { isLoggedIn && <><div style={{height: '100px'}}/><BottomNavbar /></> }
            </Container>
        </div>
    );
};

export default App;
