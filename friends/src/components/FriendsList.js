import React, {useEffect, useState} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";
import Friend from "./Friend";

const FriendsList = (props) => {
    const [friends, setFriends] = useState([]);
    const [id, setId] = useState(null);
    const [newFriend, setNewFriend] = useState({
       name: '',
       age: null,
       email: '@friends.com'
    });

    useEffect(() => {
        axiosWithAuth().get('api/friends/')
            .then((res) => {
                console.log(res);
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const clearStorage = () => {
        localStorage.clear();
        window.location.reload(false);
    };

    const handleChanges = e => {
        // update state with each keystroke
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        });
    };

    const handleIDChanges = e => {
        // update state with each keystroke
        setId(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post('api/friends/', newFriend)
            .then((res) => {
                console.log(res);
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit2 = e => {
        e.preventDefault();
        axiosWithAuth().put('api/friends/' + id, newFriend)
            .then((res) => {
                console.log(res);
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <button onClick={clearStorage}>Logout</button>
            {friends.map(friend => (
                <Friend name={friend.name} age={friend.age} email={friend.email} id={friend.id} setFriends={setFriends}/>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Friend's Name"
                    value={newFriend.name}
                    onChange={handleChanges}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Friend's Age"
                    value={newFriend.age}
                    onChange={handleChanges}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Friend's Email Address"
                    value={newFriend.email}
                    onChange={handleChanges}
                />
                <button>Add New Friend</button>
            </form>
            <form onSubmit={handleSubmit2}>
                <input
                    type="number"
                    name="id"
                    placeholder="Friend's ID"
                    value={id}
                    onChange={handleIDChanges}
                />
                <button>Update Friend</button>
            </form>
        </div>
    )
};

export default FriendsList;