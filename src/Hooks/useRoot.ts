import { useState, useEffect } from 'react';
import { checkServerAction } from '@Store/App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Stores';
import { COLORLOG } from '@Helper';
import _Alert_ from '@_Alert_';

export default function useLogin() {
    const dispatch = useDispatch();
    const { loading, serverCheck, errorStatus, errorMessage } = useSelector((store: RootState) => ({
        loading: store.app.loading,
        serverCheck: store.app.serverCheck,
        errorStatus: store.app.error.status,
        errorMessage: store.app.error.message,
    }));

    // 체크 상태.
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false);

    // 최초 로딩시 서버 체크.
    useEffect(() => {
        const appStart = async () => {
            COLORLOG(':: App Start :: ', 'info');
            dispatch(checkServerAction());
        };

        appStart();
    }, []);

    // 체크시 에러 발생 하면 얼럿 창.
    useEffect(() => {
        const serverCheckError = () => {
            _Alert_.serverStatusError({ text: errorMessage });
        };

        if (errorStatus === true) {
            serverCheckError();
        }
    }, [errorStatus]);

    // 체크 정상이면 앱 start
    useEffect(() => {
        if (loading === false && serverCheck === true) {
            COLORLOG(':: Server Check Success :: ', 'success');
            setAppBaseCheckState(true);
        }
    }, [serverCheck, loading]);

    return {
        AppBaseCheckState,
    };
}