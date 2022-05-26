import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {Person} from "../types"
import { Styled_Button_1, Styled_div_2 } from "../styles";


const EDIT_PERSON = gql`
  mutation editPerson($name: String!, $surname: String!, $phone: String!, $email: String!, $email2: String!) {
    editPerson(name: $name, surname: $surname, phone: $phone, email: $email, email2: $email2) {
        email,
    }
  }
`;

const EditPerson: FC<{  setDetail:(persona:Person)=>void, detail:Person, reloadHandler: () => void,  setVisible:(condition:boolean) => void }> = ({detail,setDetail, setVisible,reloadHandler}) => {

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [addEditMutation] = useMutation(EDIT_PERSON);

    return (
        <Styled_div_2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Surname"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Styled_Button_1
                    onClick={() => {
                        if(name == "" || surname == "" || phone == "" || email == ""){
                            alert("Please fill all the fields")
                        }else{   
                            addEditMutation({
                                variables: {
                                    name: name,
                                    surname: surname,
                                    email: detail.email,
                                    email2:email,
                                    phone: phone
                                },
                            }).then(() => {
                                console.log("Edited")
                                setDetail({name:name,surname:surname,email:email,phone:phone})
                                setEmail("");
                                setName("");
                                setSurname("");
                                setPhone("");
                            })
                        }
                    }
                    }
                >
                    <h2>Actualize</h2>
                </Styled_Button_1>
        </Styled_div_2>
    );

};

export default EditPerson;
