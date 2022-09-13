import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import className from 'classnames/bind'
import { login } from '../../redux/AuthenRedux/action'
import Button from '../../Components/Button'
import styles from './Login.module.scss'

const cx = className.bind(styles)

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authenStore = useSelector(state => state.authen)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    
    const handleChangeEmailInput = e => {
        setEmail(e.target.value)
        setErrMsg('')
    }

    const handleChangePasswordInput = e => {
        setPassword(e.target.value)
        setErrMsg('')
    }

    const checkErrMsg = async () => {}

    const handleSubmitForm = e => {
        e.preventDefault()

        const userInfo = {email, password}

        Promise.all([dispatch(login(userInfo)), checkErrMsg()])
            .then(() => {
                setTimeout(() => {
                    const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token
                    
                    if (!userToken) {
                        setErrMsg('Wrong email or password')
                    }
                }, 2000);
            })
            .catch(err => {})
    }

    useEffect(() => {
        document.title = 'Login'

        if (authenStore.loginSuccess) {
            navigate('/home')
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2 className={cx('title')}>Login</h2>
                <span className={cx('err-msg')}>{errMsg && errMsg}</span>
                <form className={cx('form')} onSubmit={handleSubmitForm}>
                    <div className={cx('form-group')}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name='email'
                            placeholder='Enter your email'
                            required
                            value={email}
                            onChange={handleChangeEmailInput}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="username">Password</label>
                        <input 
                            type="password" 
                            name='password'
                            placeholder='Enter your password'
                            required
                            value={password}
                            onChange={handleChangePasswordInput}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <a href="/">Forgot password</a>
                        <Button rounded primary>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
