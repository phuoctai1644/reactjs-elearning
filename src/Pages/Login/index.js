import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import className from 'classnames/bind'
import { login } from '../../redux/AuthenRedux/action'
import Button from '../../Components/Button'
import styles from './Login.module.scss'

import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';

const cx = className.bind(styles)

const FORGOT_PASSWORD_URL = '/auth/forgotPassword' 

function ForgotPasswordModal(props) {
    const navigate = useNavigate()
    const [forgotInput, setForgotInput] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [resetBtn, setResetBtn] = useState('Reset Password')

    const handleResetPassword = () => {
        if (forgotInput) {
            setResetBtn('Waiting...')
            
            setTimeout(() => {
                axios.post(FORGOT_PASSWORD_URL, {
                    email: forgotInput
                })
                    .then(res => {
                        const resetData = res.data
        
                        localStorage.setItem('resetData', JSON.stringify(resetData))
                        navigate(`/forgot-password/${resetData.resetToken}`)
                    })  
                    .catch(err=> {
                        setResetBtn('Reset Password')
                        setErrMsg(err.response.data.message)
                    })
    
            }, 1000)
        } else {
            setErrMsg('Forgot Password is empty')
        }
    }

    return (
        <Modal
            {...props}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forgot Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p> If you forgot your password, please enter the email you registered before, we will help you reset your password.</p>
                <input
                    required
                    type="email"
                    className={cx('forgot-input')}
                    placeholder='Enter your email'
                    value={forgotInput}
                    onChange={e => {
                        setForgotInput(e.target.value)
                        setErrMsg('')
                    }}
                    onKeyUp={e => {
                        if (e.key === 'Enter') handleResetPassword()
                    }}
                />
                <p className={cx('forgot-err-msg')}>{errMsg ?? errMsg}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    primary 
                    onClick={handleResetPassword} 
                    className={cx('reset-btn')}
                >{resetBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function Login() {
    // Declare for redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authenStore = useSelector(state => state.authen)

    // Usestate declaration
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [loginBtnContent, setLoginBtnContent] = useState('Login')
    
    const handleChangeEmailInput = e => {
        setEmail(e.target.value)
        setErrMsg('')
    }

    const handleChangePasswordInput = e => {
        setPassword(e.target.value)
        setErrMsg('')
    }

    const handleShowForgotModal = e => {
        e.preventDefault()

        return setModalShow(true)
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        setLoginBtnContent('Waiting...')

        const userInfo = {email, password}

        Promise.all([dispatch(login(userInfo)), async function () {}])
            .then(() => {
                setTimeout(() => {
                    const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token
                    
                    if (!userToken) {
                        setErrMsg('Wrong email or password')
                        setLoginBtnContent('Login')
                    }
                }, 1000);
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
                            type={showPassword ? 'text' : 'password'} 
                            name='password'
                            placeholder='Enter your password'
                            required
                            value={password}
                            onChange={handleChangePasswordInput}
                        />
                        <div 
                            className={cx('toggle-password')} 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i> }
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <a href="/" onClick={handleShowForgotModal}>Forgot Password</a>
                        <Button rounded primary>{loginBtnContent}</Button>
                    </div>
                </form>
            </div>

            <ForgotPasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default Login
