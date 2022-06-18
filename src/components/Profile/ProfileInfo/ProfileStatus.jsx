import React, { useEffect, useState } from 'react';
import style from'./ProfileStatus.module.css';


function ProfileStatus(props) {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    function activateEditMode() {
        setEditMode(true);
    }
    function deactivateEditMode() {
        setEditMode(false);
        props.updateUserStatus(status)
    }
    function onStatusChange(event) {
        setStatus(event.currentTarget.value)
    }
    
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Your status'}</span>
                </div>
            }
            {editMode && 
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}  value={status}/>
                </div>
            }
            <hr className={style.hrProfile} />
        </div>
    );
}

export default ProfileStatus;