import React, { FC, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {Person} from "../types"
import styled from "@emotion/styled";
import { Styled_Button, Styled_div } from "../styles";


const ContractsOrder: FC<{ setOrder: (order:boolean) => void }> = ({setOrder}) => {

  return (
    <Styled_div>
      <Styled_Button onClick={() => setOrder(true)}><h2>Alphabetical Order</h2></Styled_Button>
      <Styled_Button onClick={() => setOrder(false)}><h2>Reverse Alphabetical Order</h2></Styled_Button> 
    </Styled_div>
  );
};

export default ContractsOrder;


