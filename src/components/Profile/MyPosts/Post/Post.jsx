import style from'./Post.module.css'

function Post(props) {
    return (
        <div className={style.item}>
            <img src="https://i.mycdn.me/i?r=AzEOxUXG5QgodWC3x6hM10Ckx0BZLGOfgD6nXhJoLZbA4MAmq-mVtRg1TeCwydjhl-Q&fn=sqr_288" alt="" />
            {props.message}
            <div>
                <span>
                    <img src="https://i.pinimg.com/originals/96/a2/71/96a27139e8352b383677452d7dd6edd2.jpg" alt="like" />
                </span>
                {props.likesCount}
            </div>
        </div>
    );
}

export default Post;