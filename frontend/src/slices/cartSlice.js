import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


//localStorage can only hold  string and format if an object 
//the items are stored in localStorage because when we leave the site and cone back
// the items still in the cart so we gonna check the item in storage 1st of all  

const initialState=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{cartItems:[]}

const cartSlice=createSlice({
     name:"cart",
     initialState,
reducers:{          //as long as reducer function it will take 2 argument state and action 
addToCart:(state,action)=>{
    const item =action.payload
    //check if the item in the cart 
    const existItem=state.cartItems.find((x)=>x._id===item._id)
    if(existItem){
    state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x )
    }else{
        state.cartItems=[...state.cartItems,item]
    }
       return updateCart(state)

},
removeFromCart:(state,action)=>{
    state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload)
    return updateCart(state)
}
},      //has any function to deal with cart

})
export default cartSlice.reducer
//any action we created we need to export it as an action 
export const {addToCart,removeFromCart}=cartSlice.actions 