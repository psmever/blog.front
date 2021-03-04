import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Stores';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@Helper';
import { getPostDetail } from '@Store/Posts';
import { PostDetailItem, TagItem } from 'CommonTypes';
import { PostDetailBox, Header, HeaderTitle } from '@Style/PostDetailStyles';

interface RouteParams {
    slug_title: string;
}

const initPostInfo = {
    post_title: '',
    detail_created: '',
    tags: [],
    contents_text: '',
};

export default function PostDetail() {
    const dispatch = useDispatch();
    const parmas = useParams<RouteParams>();

    const { detailInfo } = useSelector((store: RootState) => ({
        detailInfo: store.posts.detail.info,
    }));

    const [postInfo, setPostInfo] = useState<{
        post_title: string;
        detail_created: string;
        tags: TagItem[];
        contents_text: string;
    }>(initPostInfo);

    useEffect(() => {
        const getPostDeailtInfo = (slug_title: string) => {
            dispatch(getPostDetail({ slug_title: slug_title }));
        };

        if (!isEmpty(parmas.slug_title)) {
            getPostDeailtInfo(parmas.slug_title);
        }
    }, [parmas]);

    useEffect(() => {
        const dataSetPostInfo = (info: PostDetailItem) => {
            setPostInfo({
                post_title: info.post_title,
                detail_created: info.detail_created,
                tags: info.tags,
                contents_text: info.contents_text,
            });
        };

        if (!isEmpty(detailInfo)) {
            dataSetPostInfo(detailInfo);
        }
    }, [detailInfo]);

    useEffect(() => {
        // console.log('details');
    }, []);

    return (
        <>
            <PostDetailBox>
                <Header>
                    <HeaderTitle>{postInfo.post_title}</HeaderTitle>
                </Header>

                {postInfo.detail_created}
                {postInfo.tags.map((element, index) => {
                    return <div key={index}>{element.text}</div>;
                })}
                {postInfo.contents_text}
            </PostDetailBox>
        </>
    );
}
