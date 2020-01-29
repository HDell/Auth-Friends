import React, {useState} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Friend = (props) => {

    const getDetails = e => {
        e.preventDefault();
        axiosWithAuth().get('api/friends/'+props.id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    const removeFriend = e => {
        e.preventDefault();
        axiosWithAuth().delete('api/friends/'+props.id)
            .then((res) => {
                props.setFriends(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div>
                <h2 className="friend-name" onClick={getDetails}>Name: {props.name}</h2>
                <p>Age: {props.age}</p>
                <p>Email: {props.email}</p>
                <p>ID: {props.id}</p>
                <button onClick={removeFriend}>REMOVE</button>
            </div>
        </div>
    )
};

export default Friend;