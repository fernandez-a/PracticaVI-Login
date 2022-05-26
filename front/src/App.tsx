import './App.css';
import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import React,{useState} from 'react';
import PersonsList from './Components/PersonList';
import AddPerson from './Components/AddPerson';
import ContractsOrder from './Components/Contactsorder';
import { Person } from './types';
import Detail from './Components/Detail';
import Home from './Components/Home';

function App() {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
  });
  
  const [reload,setReload] = useState<boolean>(true);
  const [order,setOrder] = useState<boolean>(true);
  const [detail,setDetail] = useState<Person>({ name: "", surname: "", phone: "", email: ""});
  const [visible,setVisible] = useState<boolean>(false);
  const reloadHandler = () => {
    setReload(!reload)
  }

  return (
    <ApolloProvider client={client}>
      <Home></Home>
      {/* <PersonsList order={order} setVisible={setVisible} setDetail={setDetail}></PersonsList>
      <ContractsOrder setOrder={setOrder}></ContractsOrder>
      <AddPerson reloadHandler={reloadHandler}></AddPerson>
      <Detail visible = {visible} setVisible={setVisible} detail={detail} setDetail={setDetail} reloadHandler = {reloadHandler}></Detail> */}
    </ApolloProvider>
  );
}

export default App;
