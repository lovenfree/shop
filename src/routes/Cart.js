import { Table } from 'react-bootstrap'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAge } from '../store/userSlice';
import { changeStock } from '../store';
function Cart(){

  //store에 있는 state 들고옴
  //UseSelector 사용법
  //  let a = useSelector((state)=> state.stock)
  let state = useSelector((state)=>{return state})
  //store.js에 요청을 보낼수 있게 해줌 
  let dispatch = useDispatch()

  return(
    <div>
      {state.u}
      <Table>
        {state.user.name} age  {state.user.age}의 장바구니
        <button onClick={()=>{dispatch(changeAge(4))}}>test</button>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
            {
            state.testData.map((d,idx)=>
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.count}</td>
              <td><button onClick={()=>{
                dispatch(changeStock(d.id))
              }}>+</button>
              </td>
            </tr>
            )
          }
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart;