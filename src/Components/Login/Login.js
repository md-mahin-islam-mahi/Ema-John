import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './Login.css'

const Login = () => {

    const navigate = useNavigate();

    const {logIn, loader} = useContext(AuthContext)

    const location = useLocation();
    const from = location.state?.form?.pathname || '/';

    if(loader) {
        return <div>Loading...</div>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset()
            navigate(from, {replace: true})
        })
        .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to Ema John Shoppint? <br /> Please <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;