import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {

    // const location = useLocation<LocationState<OtherProps>>();
    // const message = location.state?.message;
    return (
        <div>
            이것은 에러랑께요
        </div>
    );
};

export default ErrorPage;