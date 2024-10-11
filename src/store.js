import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'




let stock = createSlice({
  name:'stock',
  initialState: [10,23]
})



let testData = createSlice({
  name: 'testData',
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers:{
    changeStock(state,action){
      state.map((s)=>{ 
        console.log(s)
        if(s.id == action.payload){
          s.count = s.count+1
        }
      })
      return state
    },
    addCart(state,action){

    }
  }
})

export let {changeStock, addCart} = testData.actions

export default configureStore({
  reducer: { 
    user:user.reducer,
    testData:testData.reducer
  }
}) 