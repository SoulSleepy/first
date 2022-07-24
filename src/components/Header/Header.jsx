import style from './Header.module.css'
import { NavLink } from 'react-router-dom'
import React from 'react'

// type NavDataType = {
//     isActive: boolean
//     active: string
//     item: string
// }

// function classNameActive(navData: NavDataType): string {
//     return (
//         navData => navData.isActive ? style.active : style.item
//     )
// }

function classNameActive() {
    return (
        navData => navData.isActive ? style.active : style.item
    )
}


// type PropsType = {
//     isAuth: boolean
//     login: string | null
//     logout: () => void
// }

const Header = (props) => {
    return (
        <header className={style.header}>
            <p><img src="https://iconape.com/wp-content/files/up/164814/png/ting-avert-moto-logo.png" 
                    alt="logo" />World Around Motorcycle
            </p>
            <div className={style.loginBlock}>
                {props.isAuth 
                    ? <div>{props.login} <button onClick={props.logout}>Logout</button></div> 
                    : <NavLink to='/login' className={classNameActive()} >Login</NavLink> }
            </div>
        </header>
    )
}

export default Header