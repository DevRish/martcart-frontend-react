import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../api/user';
import "./Profile.css";
import Spinner from '../../components/Spinner/Spinner';
import { authLogout } from '../../api/auth';
import { IUser } from '../../types/coreTypes';
import { connect } from 'react-redux';
import { logoutAction } from '../../reducers/auth/authActions';

interface IProfileProps {
    // Global State Props
    logoutDispatch: () => void,
}

const Profile = ({ logoutDispatch } : IProfileProps) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [currUser, setCurrUser] = useState<IUser>();
    const navigate = useNavigate();

    const getCurrUserData = async () => {
        try {
            const userFuncRet = await getUserData();
            if(userFuncRet.isSuccess && userFuncRet.user) {
                setCurrUser(userFuncRet.user);
            } else {
                throw new Error("Unable to fetch user data");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getCurrUserData();
    }, []);

    const logout = async () => {
        const authFuncRet = await authLogout();
        if(authFuncRet.isSuccess) {
            logoutDispatch();
            navigate('/');
        }
    }

    return (
        <>
        { (isLoading) && <Spinner /> }
        { 
            (!isLoading && currUser) &&
            <div className="container">
                    <h2 className='profileHeading'>
                        Welcome back {currUser.firstname}!
                    </h2>
                    <p className='profileParagraph'><b>User Since:</b> {currUser.joinDate?.substring(0, 10)} </p>
                    <button className='profileBtn' onClick={logout}>Logout</button>
            </div>
        }
        </>
    )
}

const mapDispatchToProps = {
  logoutDispatch: logoutAction,
}

const ProfileWrapped = connect(null, mapDispatchToProps)(Profile);

export default ProfileWrapped;
