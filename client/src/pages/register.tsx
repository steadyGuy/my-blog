import React from 'react'
import { Auth } from '../components/Auth'
import { Register } from '../components/Auth/Register'

const register = () => {
  return (
    <Auth login={false} render={() => <Register />} />
  )
}

export default register
