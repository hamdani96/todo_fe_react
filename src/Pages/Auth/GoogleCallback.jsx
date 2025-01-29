import {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { AppContext } from '../../Context/AppContext';

function GoogleCallback() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const { setToken, user} = useContext(AppContext);
    const location = useLocation();

    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {

        fetch(`/api/auth/callback${location.search}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                setLoading(false);
                localStorage.setItem("token", data.token);
                setToken(data.token);
                return navigate('/')
            });
    }, []);

    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call

    if (loading) {
        return <DisplayLoading/>
    } else {
        if (user != null) {
            return navigate('/')
        }
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

export default GoogleCallback;