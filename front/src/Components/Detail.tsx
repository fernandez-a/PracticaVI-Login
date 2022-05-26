import { FC, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Modal from "react-modal";
import styled from "@emotion/styled";
import {
  StyledModal,
  Styled_Button_1,
  Styled_Button_2,
  Styled_div_1,
} from "../styles";
import { Person } from "../types";
import EditPerson from "./EditPerson";
import DeleteContact from "./DeleteContact";

const Detail: FC<{
  visible: boolean;
  detail: Person;
  setVisible: (condition: boolean) => void;
  setDetail: (contact: Person) => void;
  reloadHandler: () => void;
}> = ({ detail, visible, setVisible, setDetail, reloadHandler }) => {
  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
      portalClassName="modal"
      ariaHideApp= {false}
      style={{
        overlay: {
          width: "70%",
          height: "80%",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          backgroundColor: "##98DDFF",
        },
        content: {
          padding: "0",
          
        },
      }}
    >
      <Styled_Button_2 onClick={() => setVisible(false)}>X</Styled_Button_2>
      <StyledModal>
        <h1>
          {detail.name} {detail.surname}
        </h1>
        <div>
          <h2>Phone number: </h2> <h3>{detail.phone}</h3>
        </div>
        <div>
          <h2>Email: </h2> <h3>{detail.email}</h3>
        </div>
      </StyledModal>
      <DeleteContact
        detail={detail}
        setVisible={setVisible}
        reloadHandler={reloadHandler}
      ></DeleteContact>
      <EditPerson
        detail={detail}
        setVisible={setVisible}
        setDetail={setDetail}
        reloadHandler={reloadHandler}
      ></EditPerson>
    </Modal>
  );
};

export default Detail;
