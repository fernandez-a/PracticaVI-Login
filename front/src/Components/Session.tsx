import React, { FC, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
    mutation login($user: String!, $password: String!) {
        login(user: $user, password: $password)
    }

`

const Session:FC<{reRender: () => void}> = ({reRender}) => {

    const [user,setUser] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [login,{loading,error}] = useMutation(LOGIN, {
        //cuando se completa la mutacion guardaremos la cookie
        onCompleted(data) {
            localStorage.setItem("token", data.login);
            reRender();
        },
        //en caso de error, mostramos el error y borramos la cookie
        onError(error) {
            console.log(error);
            localStorage.removeItem("token");
        }

    });
    return (
        <div>
            <input value={user}  onChange={(e) => setUser(e.target.value)} type="username" placeholder="username" /><br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" /><br />
            <button onClick={() => {
                login({ variables: { user, password } })
                }}>Login</button>
        </div>
    )
}

export default Session