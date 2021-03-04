import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { PostList } from 'ServiceTypes';
import { PostDetailItem } from 'CommonTypes';
import { PostsState } from 'StoreTypes';
import { SagaTypes, SagaAction } from '@Store/reduxActiontTypes';
const { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } = SagaTypes;
const { GET_POST_DETAIL, GET_POST_DETAIL_SUCCESS, GET_POST_DETAIL_FAILURE } = SagaTypes;

// 스토어 init.
const initialState: PostsState = {
    list: {
        pageNumber: 1,
        state: 'idle',
        message: '',
        posts: [],
    },
    detail: {
        slug_title: '',
        state: 'idle',
        message: '',
        info: {},
    },
};

export const PostsSagaReducer = createReducer<PostsState>(initialState, {
    // 글목록 가지고 오기.
    [GET_POSTS]: (state: PostsState) => {
        return produce(state, draft => {
            draft.list.state = 'loading';
        });
    },
    // 글목록 가지고 오기 성공.
    [GET_POSTS_SUCCESS]: (state: PostsState, action: SagaAction<PostList>) => {
        return produce(state, draft => {
            draft.list.state = 'success';
            draft.list.pageNumber = action.payload.current_page;
            draft.list.posts = action.payload.posts;
        });
    },
    // 글목록 가지고 오기 실패.
    [GET_POSTS_FAILURE]: (state: PostsState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.list.state = 'failure';
            draft.list.pageNumber = initialState.list.pageNumber;
            draft.list.posts = initialState.list.posts;
            draft.list.message = action.payload.message;
        });
    },
    // 글정보 가지고 오기
    [GET_POST_DETAIL]: (state: PostsState) => {
        return produce(state, draft => {
            draft.detail.state = 'loading';
        });
    },
    // 글정보 가지고 오기 성공.
    [GET_POST_DETAIL_SUCCESS]: (state: PostsState, action: SagaAction<PostDetailItem>) => {
        return produce(state, draft => {
            draft.detail.state = 'success';
            draft.detail.info = action.payload;
        });
    },
    // 글정보 가지고 오기 실패.
    [GET_POST_DETAIL_FAILURE]: (state: PostsState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.detail.state = 'failure';
            draft.detail.info = initialState.detail.info;
            draft.detail.message = action.payload.message;
        });
    },
});
export default PostsSagaReducer;
