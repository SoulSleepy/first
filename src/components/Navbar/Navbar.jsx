import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

function classNameActive() {
    return (
        navData => navData.isActive ? style.active : style.item
    );
}

function Navbar() {
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to='/profile' className={classNameActive()}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/messenger' className={classNameActive()}>Messenger</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={classNameActive()}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/news' className={classNameActive()}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' className={classNameActive()}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/settings' className={classNameActive()}>Settings</NavLink>
            </div>
        </nav>
    );
}



export default Navbar;