import Preloader from '../../../common/preloader/Preloader';
import style from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/userPhoto.png'
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

function ProfileInfo(props) {
    let [editMode, setEditMode] = useState(false);
    // let [status, setStatus] = useState(props.status);

    if (!props.profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            props.savePhoto(event.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    };

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={style.mainPhoto} />
                {props.isOwner && <input type={'file'} name='myPhoto' onChange={onMainPhotoSelected} />}
                {editMode 
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => setEditMode(true)} profile={props.profile} isOwner={props.isOwner}/>}
                <ProfileStatus {...props} />
            </div>
        </div>
    );
}

function ProfileData({goToEditMode, profile, isOwner}) {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob && 
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}

function Contact({contactTitle, contactValue}) {
    return <div className={style.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;