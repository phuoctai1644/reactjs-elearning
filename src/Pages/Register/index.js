import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import className from 'classnames/bind'
import { register } from '../../redux/AuthenRedux/action'
import styles from './Register.module.scss'
import Button from '../../Components/Button'

const cx = className.bind(styles)

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authenStore = useSelector(state => state.authen)
    const [errMsg, setErrMsg] = useState({})
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    })
    const [registerBtn, setRegisterBtn] = useState('Register')

    const handleChangeUserInfo = (e, targetAttr) => {
        setUserInfo({...userInfo, [targetAttr]: e.target.value})
        setErrMsg({...errMsg, [targetAttr]: ''})
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        setRegisterBtn('Waiting...')

        Promise.all([dispatch(register(userInfo)), async function() {}])
            .then(() => {
                setTimeout(() => {
                    const failureObj = JSON.parse(localStorage.getItem('errMsg')) ?? {}

                    if (Object.keys(failureObj).length !== 0) {
                        setErrMsg({
                            name: failureObj?.name && failureObj.name[0],
                            email: failureObj?.email && failureObj.email[0],
                            password: failureObj?.password &&  failureObj.password[0],
                            confirmPassword: failureObj?.confirmPassword &&  failureObj.confirmPassword[0]
                        })
                        setRegisterBtn('Register')
                    }
                }, 1000)
            })


    }

    useEffect(() => {
        document.title = 'Register'

        if (authenStore.registerSuccess) {
            navigate('/')
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2 className={cx('title')}>Register</h2>
                <form className={cx('form')} onSubmit={handleSubmitForm}>
                    <div className={cx('form-wrap')}>
                        <label htmlFor="name">Fullname</label>
                        <div>
                            <input 
                                required
                                type="text"
                                name="name"
                                placeholder="Fullname"
                                value={userInfo.name}
                                onChange={e => handleChangeUserInfo(e, 'name')}
                            />
                            <p className={cx('err-msg')}>{errMsg?.name ?? errMsg.name}</p>
                        </div>
                    </div>

                    <div className={cx('form-wrap')}>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input 
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userInfo.email}
                                onChange={e => handleChangeUserInfo(e, 'email')}
                            />
                            <p className={cx('err-msg')}>{errMsg?.email ?? errMsg.email}</p>
                        </div>
                    </div>

                    <div className={cx('form-wrap')}>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input 
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userInfo.password}
                                onChange={e => handleChangeUserInfo(e, 'password')}
                            />
                            <p className={cx('err-msg')}>{errMsg?.password ?? errMsg.password}</p>
                        </div>
                    </div>

                    <div className={cx('form-wrap')}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                            <input 
                                required
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={userInfo.confirmPassword}
                                onChange={e => handleChangeUserInfo(e, 'confirmPassword')}
                            />
                            <p className={cx('err-msg')}>{errMsg?.confirmPassword ?? errMsg.confirmPassword}</p>
                        </div>
                    </div>

                    <div 
                        className={cx('form-wrap')} 
                        onChange={e => setUserInfo({...userInfo, role: e.target.value})}
                    >
                        <label htmlFor="role">Role</label>
                        <div className={cx('radio-wrap')}>
                            <input type="radio" name="role" id='student' value='student' defaultChecked />
                            <label htmlFor="student">Student</label>
                        </div>
                        <div className={cx('radio-wrap')}>
                            <input type="radio" name="role" id='teacher' value='teacher' />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                    </div>

                    <div className={cx('btn-wrap')}>
                        <Button primary rounded>{registerBtn}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
