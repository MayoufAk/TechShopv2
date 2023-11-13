export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}
export const updateCart=(state)=>{
     //Calculate items price 
state.itemsPrice=addDecimals (state.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
//Calculate shipping price (if order over 100 then free then 10$ shipping)
state.shippingPrice=addDecimals(state.itemsPrice>100?0:10)
//Caclculate tax price (15%tax)
state.taxPrice=addDecimals(Number((0.015*state.itemsPrice).toFixed(2)))
//Calculate total price 
state.totalPrice=(Number(state.itemsPrice)+Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2)
//we wanna save it in localStorage 
localStorage.setItem("cart",JSON.stringify(state))
//in  Order to use it we need to export it as an action 
 
return state
}