import React from 'react';
import { Outlet } from 'react-router';

const UserLaout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default UserLaout;