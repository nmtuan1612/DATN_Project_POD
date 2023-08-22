import React, { useContext, useState } from 'react'
import { type CredentialResponse } from '@react-oauth/google'
import { setAccessTokenToLS, setProfileToLS } from 'src/utils/auth'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'

type Props = {
  url: string
}

const useGoogle = ({ url }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const navigate = useNavigate()

  const handleGoogle = async (response: CredentialResponse) => {
    // console.log(response)
    setLoading(true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ credential: response.credential })
    })
      .then((res) => {
        setLoading(false)

        return res.json()
      })
      .then((data) => {
        if (data?.user) {
          //   localStorage.setItem('user', JSON.stringify(data?.user))
          //   window.location.reload()
          const { access_token, user } = data
          setProfileToLS(user)
          setAccessTokenToLS(access_token)
          setProfile(user)
          setIsAuthenticated(true)
          navigate('/')
        }

        throw new Error(data?.message || data)
      })
      .catch((error) => {
        setError(error?.message)
      })
  }
  return { loading, error, handleGoogle }
}

export default useGoogle

// function parseJwt(token: string) {
//   var base64Url = token.split('.')[1]
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   var jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//       })
//       .join('')
//   )
//   return JSON.parse(jsonPayload)
// }
