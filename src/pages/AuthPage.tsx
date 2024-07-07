import React, { useState } from 'react'
import { loginAsync, signupAsync } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/store'
import { useDispatch } from 'react-redux'
import { UnknownAction } from 'redux'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const requestStatus = useSelector((state: RootState) => state.auth.requestStatus)
    const error = useSelector((state: RootState) => state.auth.error)
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch();
    const onChanged = (setFunction: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => setFunction(event.target.value)
    const onSubmit = () => {
        dispatch(((isLogin) ? loginAsync({ username, password }) : signupAsync({ username, password, email })) as unknown as UnknownAction)
        console.log('called function');
        
    }

    switch (requestStatus) {
        case 'not started':
            return (
                <div className="auth-page">
                    <form>
                        <div className="user-input">
                            <label htmlFor="username">Username:</label>
                            <input name='username' type="text" onChange={onChanged(setUsername)} value={username} />
                        </div>
                        <div className="user-input">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name='password' onChange={onChanged(setPassword)} value={password} />
                        </div>
                        {!isLogin &&
                            <div className="user-input">
                                <label htmlFor="email">Email:</label>
                                <input name='email' type="text" onChange={onChanged(setEmail)} value={email} />
                            </div>
                        }
                        <button type="submit" onClick={e => { e.preventDefault(); onSubmit() }}>{isLogin ? "Login" : "Signup"}</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setIsLogin(!isLogin)
                        }}>{`Switch To ${isLogin ? 'Signup' : 'Login'}`}</button>

                    </form>
                </div>
            )
        case 'error':
            return (
                <h1>Error is {error}</h1>
            )
        case 'completed':
            return <h2>user is {user?.getUsername()} and his id is {user?.getUserId()}</h2>
        case 'loading':
            return <h2>Loading</h2>
    }

}

export default AuthPage