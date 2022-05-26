import React, { FC, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {Person} from "../types"
import styled from '@emotion/styled'
import { Styled_Contact, Styled_List } from "../styles";

const GET_PERSONS = gql`
  query getPersons {
    getPersons {
      _id
      name
      surname
      email
      phone
    }
  }
`;

const PersonsList: FC<{ order: boolean, setVisible:(condition:boolean) => void , setDetail:(persona:Person)=>void}> = ({order, setVisible,setDetail}) => {

  const { loading, error, data } = useQuery<{ getPersons: Person[] }>(
    GET_PERSONS,
    {
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <Styled_List>Loading...</Styled_List>;
  if (error) {
    if(error.message === "Unauthorized"){
      localStorage.removeItem("token");
      // reRender();
    }
    return <Styled_List>Error</Styled_List>;
  }
  const sortedData = (order)?data?.getPersons.sort((a, b) => a.name.localeCompare(b.name)):data?.getPersons.sort((a, b) => b.name.localeCompare(a.name));

  if(sortedData){
    return (
      <Styled_List>
        {sortedData.map((contact, index: number) => {
          return <Styled_Contact key={index} onClick={() => {setVisible(true);setDetail(contact)}}>
            {contact.name}  
          </Styled_Contact>
        })}
      </Styled_List>
    );
  }else{
    return <Styled_List></Styled_List>
  }
};

export default PersonsList;



