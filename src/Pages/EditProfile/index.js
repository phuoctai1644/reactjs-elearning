import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import classNames from "classnames/bind"
import axios from "../../api/axios"
import Error from "../Error";
import styles from './EditProfile.module.scss'

const cx = classNames.bind(styles)

function ChangePasswordModal(props) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [changeData, setChangeData] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })
    const [errMsg, setErrMsg] = useState({})
    const [changeBtn, setChangeBtn] = useState('Change Password') 
    const [show, setShow] = useState(false);

    const handleChangeInputValue = (e, targetValue) => {
        setChangeData({...changeData, [targetValue]: e.target.value})
        setErrMsg({...errMsg, [targetValue]: ''})
    }

    const handleChangePassword = () => {
        const userToken = userInfo.token
        const passwordObj = {
            currentPassword: changeData.currentPassword,
            password: changeData.password,
            confirmPassword: changeData.confirmPassword
        }

        if (changeData.currentPassword && changeData.password && changeData.confirmPassword) {
            setChangeBtn('Waiting...')
    
            axios.post('/me/changePassword', passwordObj, {
                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(res => {
                    setShow(true)
                    setTimeout(() => {
                        props.onHide()
                    }, 1000)
                    console.log('Change password successfully!!!')
                })
                .catch(err => {
                    setTimeout(() => {
                        let failureObj
                        if (err.response.status === 400) {
                            failureObj = err.response.data.error.errors.validationError
                            if (Object.keys(failureObj).length !== 0) {
                                setErrMsg({
                                    currentPassword: failureObj?.currentPassword && failureObj.currentPassword[0],
                                    password: failureObj?.password && failureObj.password[0],
                                    confirmPassword: failureObj?.confirmPassword &&  failureObj.confirmPassword[0]
                                })
                            }
                        } else if (err.response.status === 401) {
                            failureObj = err.response.data
                            setErrMsg({currentPassword: failureObj.message})
                        }

                        console.log(err.response)
                        setChangeBtn('Change Password')
                    }, 1000)
    
                    console.log('Change password not successfully!!!')
                })
        }
    }

    return (
        <Modal
            {...props}
            size="sm"
            centered
        >   
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Alert show={show} variant="success">
                <Alert.Heading>Change password successfully</Alert.Heading>
            </Alert>    
            <Modal.Body>
                <div>
                    <input
                        className={cx('change-input')}
                        type="password"
                        placeholder="Enter current password"
                        value={changeData.currentPassword}
                        onChange={e => handleChangeInputValue(e, 'currentPassword')}
                    />
                    <p className={cx('err-msg')}>{errMsg?.currentPassword && errMsg.currentPassword}</p>
                </div>
                <div>
                    <input
                        className={cx('change-input')}
                        type="password"
                        placeholder="Enter new password"
                        value={changeData.password}
                        onChange={e => handleChangeInputValue(e, 'password')}
                    />
                    <p className={cx('err-msg')}>{errMsg?.password && errMsg.password}</p>
                </div>
                <div>
                    <input 
                        className={cx('change-input')}
                        type="password"
                        placeholder="Re-type new password"
                        value={changeData.confirmPassword}
                        onChange={e => handleChangeInputValue(e, 'confirmPassword')}
                    />
                    <p className={cx('err-msg')}>{errMsg?.confirmPassword && errMsg.confirmPassword}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={handleChangePassword} 
                    className={cx('save-btn')}
                    disabled={changeData.currentPassword === '' || changeData.password === '' || changeData.confirmPassword === ''} 
                >{changeBtn}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

function EditProfile() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [modalShow, setModalShow] = useState(false)
    const [name, setName] = useState(userInfo?.data?.user?.name)
    const [avatarAddress, setAvatarAdress] = useState('')
    
    if (!localStorage.getItem('userInfo')) {
        return <Error />
    }

    const handleUpdateInfo = e => {
        e.preventDefault()
        const userToken = userInfo.token

        if (name === userInfo.data.user.name) return
        
        axios.patch('/me/info', {name}, {
            headers: { Authorization: `Bearer ${userToken}` }
        })
            .then(res => {
                const newUserInfo = {
                    ...userInfo,
                    data: {
                        user: res.data.data
                    }
                }
                localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
                console.log('Update info successfully')
            })
            .catch(err => {
                console.log('Update info failure!!!')
            })
    }

    const handleShowChangePasswordModal = e => {
        e.preventDefault()

        return setModalShow(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Public profile</h2>
                <p>Add information about yourself</p>
            </div>
            <div className={cx('body')}>
                <form onSubmit={handleUpdateInfo}>
                    <div className={cx('form-wrap')}>
                        <div className={cx('avatar-wrap')}>
                            <img src="https://nguoi-noi-tieng.com/photo/tieu-su-ca-si-suni-ha-linh-5119.jpg" alt="User Avatar" />
                            <label htmlFor="myImage" className={cx('avatar-upload')}><i className="bi bi-camera"></i></label>
                        </div>
                        <input type="file" id="myImage" accept="image/png, image/gif, image/jpeg" hidden/>
                    </div>
                    <div className={cx('form-wrap')}>
                        <label htmlFor="name">Full Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-wrap')}>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" value="tai@gmail.com" disabled />
                    </div>

                    <div className={cx('form-wrap--inline')}>
                        <label htmlFor="role">Role: </label>
                        <div className={cx('radio-wrap')}>
                            <input type="radio" name="role" id='student' value='student' defaultChecked disabled/>
                            <label htmlFor="student">Student</label>
                        </div>
                        <div className={cx('radio-wrap')}>
                            <input type="radio" name="role" id='teacher' value='teacher' disabled/>
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                    </div>

                    <div className={cx('form-wrap')}>
                        <label htmlFor="password">
                            <span>Password</span>
                            <a 
                                href="/" 
                                className={cx('change-passowrd')}
                                onClick={handleShowChangePasswordModal}
                            >Change password</a>
                        </label>
                        <input type="password" name="password" value="Fuck u hehe" disabled/>
                    </div>

                    <button className={cx('save-btn')} disabled={name === userInfo?.data?.user?.name}>Save</button>
                </form>
            </div>

            <ChangePasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default EditProfile
