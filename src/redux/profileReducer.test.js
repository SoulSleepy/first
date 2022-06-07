import profileReducer, { addPost, deletePost } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It is my first post', likesCount: 2}
    ]
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPost('it-true');

    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPost('it-true');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts[2].message).toBe('it-true');
});

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(1);
});

it('after deleting length should not be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(100);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(2);
});