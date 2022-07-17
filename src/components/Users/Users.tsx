import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './users.module.css';
import userPhoto from '../../assets/images/userPhoto.png';
import Paginator from '../../helpers/Paginator';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div>
                <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                    currentPage={props.currentPage} onPageChanged={props.onPageChanged} />
            </div>
            {
                props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}><img 
                                src={user.photos.small != null ? user.photos.small : userPhoto} 
                                className={style.userPhoto} /></NavLink>
                        </div>
                        <div>
                            {user.followed
                            ? <button disabled={props.followingInProgress.includes(user.id)}
                                onClick={() => {props.unfollow(user.id)}}>
                                unfollow</button>
                            : <button disabled={props.followingInProgress.includes(user.id)}
                                onClick={() => {props.follow(user.id)}}>
                                follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}


export default Users;