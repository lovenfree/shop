import {Navbar,Container,Nav,Row,Col} from 'react-bootstrap';
import React, { createContext, useState } from 'react';
import './App.css';
import {data} from "./data.js";
import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js"
import axios from 'axios';
import {Route,Routes,Link, useNavigate,Outlet} from 'react-router-dom'


/**
 * react-router-dom 설치시 라우팅 기능 라이브러리
 */

//contextAPI
export let Context1 = createContext()


function App() {
  let [shoes,setShoes]=useState(data);
  let [btnCnt,setBtnCnt]=useState(0);
  let [amount]=useState([2,5,67]);
  //use... hook
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="black" data-bs-theme="dark">

          <Navbar.Brand href="#home">ShoeShoe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>

      </Navbar>


      <Routes>
      
      <Route path="/" element={
        <>
        <div className='main-bg'></div>
        <Container>
        <Row>
          {shoes.map((s,idx)=>{
            return(
            <Content content={s} idx={idx}></Content>
            )
          })}
        </Row>
      </Container>
      <button onClick={()=>{

        setBtnCnt(btnCnt+1);
        console.log(btnCnt)
        let url;
        if(btnCnt==0){
          url='https://codingapple1.github.io/shop/data2.json'
          axios.get(url)
          .then((results)=>{
            console.log(results.data)
            //state set
            let temp=[...shoes,... results.data]
            setShoes(temp);
  
          }).catch(()=>{
            console.log('failed!!!')
          })
        }else if (btnCnt==1){
          url='https://codingapple1.github.io/shop/data3.json'
          axios.get(url)
          .then((results)=>{
            console.log(results.data)
            //state set
            let temp=[...shoes,... results.data]
            setShoes(temp);
  
          }).catch(()=>{
            console.log('failed!!!')
          })
        }else{
          alert("no more data");
        }


      }}>more</button>
      </>
      }/>
        <Route path="/detail" element={<Detail content={shoes}></Detail>}/>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{shoes,amount}}>
            <Detail content={shoes}/>   
          </Context1.Provider>}/>
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>testtest</div>}/>
          <Route path="location" element={<About/>}/>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>당근첫번째</div>}/>
          <Route path="two" element={<div>단근두번째</div>}/>
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<div>Not Founded</div>}></Route>
      </Routes>

    </div>
  );
}


function Event(props){
  return(
    <div><h4>오늘의 이벤트</h4>
    <Outlet></Outlet>
   </div>
  )
}


function About(props){
  return(
    <div><h4>회사 정보</h4>
    <Outlet></Outlet>
   </div>
  )
}



function Content(props){
  return(
    <Col className='col-md-4'>
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.idx+1)+".jpg"} width="80%"/>
      <h4>{props.content.title}</h4>
      <p>{props.content.content}</p>
    </Col>
  )
}


export default App;
