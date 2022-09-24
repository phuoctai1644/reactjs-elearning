import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from './Status.module.scss'

import Tippy from "@tippyjs/react/headless"

const cx = classNames.bind(styles)

function Status() {
    const userInfo = useSelector(state => state.authen.userInfo)
    const [time, setTime] = useState('')

    const findTime = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) {
          return setTime('Morning');
        }
        if (hrs === 1 || hrs < 17) {
          return setTime('Afternoon');
        }
        else {
          return setTime('Evening');
        }
    };
    useEffect(() => {
        findTime();
    }, []);

    // const imgPath = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Suni_H%E1%BA%A1_Linh.jpg/1200px-Suni_H%E1%BA%A1_Linh.jpg`

    return (
        <div className={cx("wrapper")}>
            <div className={cx('text')}>
                <h3>Hello {userInfo?.data?.user?.name}</h3>
                <p>Good {time}</p>
            </div>
            <img src='' alt="User avatar" />
            {/* <Avatar medium text='T' /> */}
        </div>   
    )
}

export default Status
