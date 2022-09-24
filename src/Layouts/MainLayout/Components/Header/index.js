import classNames from "classnames/bind"
import Tippy from '@tippyjs/react/headless';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import {logOut} from '../../../../redux/AuthenRedux/action'
import { Wrapper } from "../../../../Components/Popper";
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const headerMenuIcon = useRef()
    
    const [visible, setVisible] = useState(false);
    const show = () => {
        headerMenuIcon.current.className = 'bi bi-caret-down-fill'
        setVisible(true)
    };
    const hide = () => {
        headerMenuIcon.current.className = 'bi bi-caret-up-fill'
        setVisible(false)
    };

    const handleLogout = e => {
        e.preventDefault()
        dispatch(logOut())
        navigate('/')
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input type="text" />
                <i className="bi bi-search"></i>
            </div>
            <div className={cx('action')}>
                <i className="bi bi-bell"></i>
                <Tippy
                    delay={[0, 500]}
                    interactive
                    placement="bottom-end"
                    onClickOutside={hide}
                    visible={visible}
                    render={attrs => (  
                        <Wrapper>
                            <ul className={cx('header-menu')}>
                                <li><a href="/">My Learning</a></li>
                                <li><Link to="/edit-profile">Edit Profile</Link></li>
                                <li><a href="/">Settings</a></li>
                                <li><a href="/" onClick={handleLogout}>Log out</a></li>
                            </ul>
                        </Wrapper>
                    )}
                >
                    <div className={cx('user-option')} onClick={visible ? hide : show}>
                        <img src="/" alt="User Avatar" />

                        <i ref={headerMenuIcon} className="bi bi-caret-down-fill"></i>
                    </div>
                </Tippy>
            </div>
        </div>
    )
}

export default Header
