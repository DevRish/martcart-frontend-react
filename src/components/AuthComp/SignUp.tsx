import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { authSignUp } from '../../api/auth';
import { queryClient } from '../../config/queryClient';
import './AuthComp.css'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../reducers/auth/authActions';

const SignUp = ({ setnavIndex }: any) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [failmsg, setFailMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async () => { 
       if((firstname==='')||(lastname==='')||(username==='')||(phone==='')||(email==='')||(password==='')||(cpassword==='')) 
        setFailMsg('Please fill all the fields');
       else if ( password !== cpassword) setFailMsg('Password and Confirm Password donot match');
       else
       {
           const newUser = {
               firstname: firstname,
               lastname: lastname,
               username: username,
               phone: phone,
               email: email,
               password: password
           };
           const { isSuccess, error, user } = await authSignUp(newUser);
            if(isSuccess) {
                dispatch(loginAction({
                    firstname: user.firstname,
                    lastname: user.lastname,
                }));
                // window.location = '/'; // needed to reload to re render everything before, but now with react-query, not required
                queryClient.invalidateQueries('cart');
                queryClient.invalidateQueries('order');
                navigate('/');
            }
           else setFailMsg(error);
       }
    }

    return (
        <div className="authcomp">
            <h1 className='authTitle'>Welcome aboard!</h1>
            <label htmlFor="fname_signup">First Name</label>
            <input type="text" id="fname_signup" onChange={(e) => { setFirstname(e.target.value) }} required/>
            <label htmlFor="lname_signup">Last Name</label>
            <input type="text" id="lname_signup" onChange={(e) => { setLastname(e.target.value) }} required/>
            <label htmlFor="username_signup">Username</label>
            <input type="text" id="username_signup" onChange={(e) => { setUsername(e.target.value) }} required/>
            <label htmlFor="phone_signup">Phone Number</label>
            <input type="phone" id="phone_signup" onChange={(e) => { setPhone(e.target.value) }} required/>
            <label htmlFor="email_signup">Email</label>
            <input type="email" id="email_signup" onChange={(e) => { setEmail(e.target.value) }} required/>
            <label htmlFor="password_signup">Password</label>
            <input type="password" id="password_signup" onChange={(e) => { setPassword(e.target.value) }} required/>
            <label htmlFor="cpassword_signup">Confirm Password</label>
            <input type="password" id="cpassword_signup" onChange={(e) => { setCPassword(e.target.value) }} required/>
            {
                (failmsg !== '') && <p style={{ color: 'red', fontSize: '1.5rem', marginBottom: '1rem' }}>{failmsg}</p>
            }
            <button className="authbtn" onClick={ handleSignUp }>SignUp</button>
            <div className='authToggle'>
                <p style={{ marginRight: "1rem" }}>Already have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { setnavIndex(1) } }><b> LogIn </b></p>
            </div>
        </div>
    )
}

export default SignUp;