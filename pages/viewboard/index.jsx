import React from 'react';
import Header from "../../components/Header"
import View from '../../components/BlogView';

//holds the home route, which takes the header, addrestaurant, and list components (delete and update are within list).
const viewboard = () => {
    return (
        <div>
            <Header />
            <View />
        </div>
    );
};

export default viewboard;