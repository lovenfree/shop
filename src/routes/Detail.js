import {Navbar,Container,Nav,Row,Col} from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {Context1} from './../App.js';
import { addCart } from '../store.js';

let YellowButton = styled.button`
  background: ${props=>props.bg};
  color: black;
  padding: 10px;
`

let Box = styled.div`
  background: ${props=>props.bg};
  color:  ${props=>props.bg=="blue"?"white":"black"};
  padding: 10px;
`

let newBtn = styled.button(Box);  

let state = useSelector((state)=>{return state})
//store.js에 요청을 보낼수 있게 해줌 
let dispatch = useDispatch()


/**
 * 
 * 
 * 리액트의 라이프사이클
 * Detail 컴포넌트 - 마운트 된다.(mount)
 * state 조작시 업데이트 되고(update)
 * 필요 없으면 제거 된다(unmount)
 * 
 * 실행 주기가 변할때 해야 할 일이 있으면 라이프 사이클 중간에 관여하여 코드 실행 가능
 *   //useEffect 사용해서 코드 실행
 *   //re rendering 위해 state 와 state 변경 함수 만든다.
  // let [count,setCount]=useState(0)

 */


let Detail = function Detail(props){

  let [tab,setTab]=useState(2);

  let [count,setCount] = useState(0);
  let [num,setNum] = useState('');
  let [alert,seAlert] = useState(true);
  let {id} = useParams();

  let ctx = useContext(Context1);
  let shoe =props.content.find((shoe)=>{return shoe.id==id});
  
  //function 형 컴포넌트에서 코드 실행 시키는 법
//useEffect 안써도 또 출력되긴 하나 필요한 이유! : 실행 시점이 다르다. 렌더링이 다 되고 난 이후 실행됨
  // useEffect(()=>{
    //mount 와 update 시 실행됨
  //   console.log('hello')
  // })

  //[] dependency [] 안에 값이 변경될때 코드가 실행된다.[]이 빈값이면 업데이트 시 작동되지 않음
  //마운팅시 1회만 수행됨
  useEffect(()=>{
    //변수에 할당해서 사용하면 나중에 clearTimeout 같은걸로 timer 초기화 하는데 사용할 수 있음
    let a=setTimeout(()=>{seAlert(false)}, 2000);
    
    return()=>{
      //unmount시
      //기존 코드를 깨끗히 하는데 많이 사용됨
      console.log("use effect 가 실행되기 전에 수행됨")
    }
  },[]);


  useEffect(()=>{
    if(isNaN(num)){
      alert("Do not that");
    }
  },[num]);
  
  
  return(
    <div className="container">
      {alert==true?
            <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div>
      :null    
      }


      <input onChange={(e)=>{
        setNum(e.target.value);
      }}/>
      <button onClick={()=>{setCount(count+1)}}>button</button>
      {/* 
      styled component
      <Box bg="blue">
        <YellowButton bg="red">button</YellowButton>
      </Box> */}

      
    <div className="row">
      <div className="col-md-6">

      <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="100%"/>
      </div>
      <div className="col-md-6">
        <h4 className="pt-5">{shoe.title}</h4>
        <p>{shoe.content}</p>
        <p>{shoe.price}원</p>
        <button className="btn btn-danger" onClick={()=>{
          dispatch(addCart({id:3,name:'red knit',count:5}))
        }}>주문하기</button> 
      </div>
    </div>

    <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link eventKey="link0" onClick={()=>setTab(0)}>버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link1" onClick={()=>setTab(1)}>버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link2" onClick={()=>setTab(2)}>버튼2 </Nav.Link>
    </Nav.Item>
    </Nav>
    <TabContent tab={tab} shoes={props.content}/>
  </div> 
  )
}

function TabContent({tab,shoes}){
  // if(tab==0){
  //   return <div>내용0</div>
  // }else if(tab==1){
  //   return <div>내용1</div>
  // }else{
  //   return <div>내용2</div>
  // }

  let [fade,setFade]=useState('');
  useEffect(()=>{
    // state 변경 함수들이 한번에 있으면 내부적으로 스테이트 계산 후 브라우저에 한번에 반영하기 때문에 타이머 적용
    setTimeout(()=>{setFade('end')},100)

    return ()=>{
      // cleanup
      setFade('')
    }
  },[tab]);
  return (<div className={'start ' + fade}>{[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][tab]}</div>); 
}




export default Detail;