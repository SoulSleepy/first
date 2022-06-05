import { NavLink } from 'react-router-dom';
import style from './../Messenger.module.css';

function classNameActive() {
    return (
        navData => navData.isActive ? style.active : style.item
    );
}

function DialogItem(props) {
    let puth = '/messenger/' + props.id;
    return (
        <div className={style.dialog}>
            <NavLink to={puth} className={classNameActive()}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;