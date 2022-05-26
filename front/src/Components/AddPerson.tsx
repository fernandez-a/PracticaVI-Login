import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Styled_Button_1, Styled_div_1 } from "../styles";

const ADD_PERSON = gql`
  mutation addPerson($name: String!, $surname: String!, $email: String!, $phone: String!) {
    addPerson(name: $name, surname: $surname, email: $email, phone: $phone) {
      _id
    }
  }
`;

const AddPerson: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");


  const [addPersonMutation] = useMutation(ADD_PERSON);
  return (
    <Styled_div_1>
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
        onClick={() =>{
          if(name == "" || surname == "" || phone == "" || email == ""){
            alert("Please fill all the fields")
          }else{
            addPersonMutation({
              variables: {
                name,
                surname,
                email,
                phone
              },
            }).then(() => {
              
            reloadHandler();
            setEmail("");
            setName("");
            setSurname("");
            setPhone("");
            })
          }
        }
        }
      >
        <h2>Add</h2>
      </Styled_Button_1>
    </Styled_div_1>
  );
};

export default AddPerson;
