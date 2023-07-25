import { ProductContext } from '@/context/Product'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'

const List = () => {

  const{state,dispatch} = useContext(ProductContext) as any

  useEffect(()=>{
    const FETCH_ALL = async () =>{
      try {
        const {data} =  await axios.get('http://localhost:3000/products')
        dispatch({type:"FETCH_ALL",payload:data})
      } catch (error) {
        
      }
    };
    FETCH_ALL()
  },[])
  const addProduct = async (product:any) =>{
    try {
      const {data} =  await axios.post('http://localhost:3000/products',product)
      dispatch({type:"ADD",payload:data})
    } catch (error) {
      
    }
  }
  const updateProduct = async (product:any) =>{
    try {
      const {data} =  await axios.put(`http://localhost:3000/products/${product.id}`,product)
      dispatch({type:"UPDATE",payload:data})
    } catch (error) {
      
    }
  }
  const removeProduct = async (id:any) =>{
    try {
       await axios.delete(`http://localhost:3000/products/${id}`,id)
      dispatch({type:"REMOVE",payload:id})
    } catch (error) {
      
    }
  }
  return (
    <div>
      <button onClick={()=>addProduct({name:"dataaaaaaaaaaa"})} className='w-[80px] h-8 bg-blue-500 rounded-lg hover:bg-blue-700 hover:cursor-pointer'>ADD</button>
      {state?.products.map((item:any)=>{
        return(
          <div key={item.id}>
              <h1>{item.name}</h1>
          </div>
        )
      })}
      <button onClick={()=>removeProduct(16)} className='w-[80px] h-8 bg-red-500 rounded-lg hover:bg-red-700 hover:cursor-pointer'>REmove</button>    
       <button onClick={()=>updateProduct({name:"update ne",id:23})} className='w-[80px] h-8 bg-green-500 rounded-lg hover:bg-green-700 hover:cursor-pointer'>UPDATE</button>
    </div>
  )
}

export default List
