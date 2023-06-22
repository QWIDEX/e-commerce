import React from 'react'
import HeadingPathSect from '../components/Reusable/HeadingPathSect'
import BenefitsBlock from '../components/BenefitsBlock/BenefitsBlock'
import CartSect from '../components/CartSect/CartSect'
import { Toaster } from 'react-hot-toast'

const CartPage = () => {
  return (
    <>
     <HeadingPathSect />
     <CartSect />
     <BenefitsBlock /> 
     <Toaster />
    </>
  )
}

export default CartPage
