import Preloader from '../../../common/preloader/Preloader';
import style from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';



function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large} />
                ava _ dis
                <ProfileStatus {...props} />
            </div>
        </div>
    );
}

export default ProfileInfo;