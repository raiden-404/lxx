import React from 'react'
import Cookies from 'js-cookie'
const TokenCheck = () => {
  const token = Cookies.get("jwtToken");
    return (
    <div>{token}</div>
  )
}

export default TokenCheck