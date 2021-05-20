import React from 'react';
import Header from "../../components/Header"
import UserView from '../../components/UserView';

//holds the route from which users can view (and only view) other users' content.
const viewUser = (props) => {
    return (
        <div>
            <Header />
            <UserView username={props}/>
        </div>
    );
};

export async function getServerSideProps(context) {
    return {
      props: {
          username: context.query.username
      } 
    }
}

export default viewUser;