import AddNewPostForm from './AddNewPostForm';
import style from'./MyPosts.module.css';
import Post from './Post/Post';


function MyPosts(props) {

    let postsItems = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} />);

    function addNewPost(values) {
        props.addPost(values.newPostText);
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={addNewPost} />
            <div className={style.posts}>
                <div>{postsItems}</div>
            </div>
        </div>
    );
}

export default MyPosts;