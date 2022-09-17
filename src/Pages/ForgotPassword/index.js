import classNames from "classnames/bind"
import styles from './ForgotPassword.module.scss'
import Button from "../../Components/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../redux/AuthenRedux/action"

const cx = classNames.bind(styles)

// Clear all error message
localStorage.removeItem('errMsg')

function ForgotPassword() {
    const dispatch = useDispatch()
    const authenStore = useSelector(state => state.authen)
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const resetToken = JSON.parse(localStorage.getItem('resetData'))?.resetToken

    const handleSubmitForm = e => {
        e.preventDefault()

        Promise.all([dispatch(resetPassword(resetToken, {password, confirmPassword})), async function () {} ])
            .then(() => {
                const failureObj = JSON.parse(localStorage.getItem('errMsg')) ?? {}

                if (Object.keys(failureObj).length !== 0) {
                    setErrMsg({
                        password: failureObj?.password && failureObj.password[0],
                        confirmPassword: failureObj?.confirmPassword && failureObj.confirmPassword[0]
                    })
                }
            })
    }

    useEffect(() => {
        const resetData = JSON.parse(localStorage.getItem('resetData'))
        const passwordResetExp = new Date(resetData?.data.passwordResetExpires)
        const currentDate = new Date()

        // If reset token expired => redirect to login page
        if (passwordResetExp - currentDate <= 0) {
            navigate('/')
        }

        // If reset password successfully => redirect to home page 
        if (authenStore.loginSuccess) {
            navigate('/home')
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2 className={cx('title')}>Reset Password</h2>
                <form 
                    className={cx('form')} 
                    method="POST"
                    onSubmit={handleSubmitForm}
                >
                    <div className={cx('form-group')}>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input 
                                type="password" 
                                name='password'
                                placeholder='Enter your password'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <p className={cx('err-msg')}>{errMsg?.password && errMsg.password}</p>
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                            <input 
                                type="password" 
                                name='confirmPassword'
                                placeholder='Enter your confirm password'
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />  
                            <p className={cx('err-msg')}>{errMsg?.confirmPassword && errMsg.confirmPassword}</p>
                        </div>  
                    </div>

                    <div className={cx('form-group')}>
                        <Button primary>Reset Password</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
