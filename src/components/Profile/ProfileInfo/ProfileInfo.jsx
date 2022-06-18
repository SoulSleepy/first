import Preloader from '../../../common/preloader/Preloader';
import style from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/userPhoto.png'

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }

    let onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            props.savePhoto(event.target.files[0]);
        }
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={style.mainPhoto} />
                {props.isOwner && <input type={'file'} name='myPhoto' onChange={onMainPhotoSelected} />}
                <ProfileStatus {...props} />
            </div>
        </div>
    );
}

export default ProfileInfo;