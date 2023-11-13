//the paremt to other api slices 
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react" //fetchBaseQuery its the fuction 
                               //that allows us to make reqwuest to our backend API 
import { BASE_URL } from "../constants"
 

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})


export const apiSlice=createApi({
    baseQuery, 
    tagTypes:["Product","Order","User"],
    endpoints:(builder)=>({}),
})