import { useQuery } from '@tanstack/react-query'
import React, { createRef, useEffect, useState } from 'react'
import axios from 'axios'

const Second = () => {
  const inputRef = createRef<HTMLInputElement>();

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [name, setName] = useState('')

  const { data, isFetching, refetch, isFetched, } = useQuery({
    queryKey: ['secondPartReq', name],
    enabled: !!name.length,
    refetchOnMount: false,
    queryFn: async ({ signal }) => {
      await timeout(3000);

      const { data } = await axios.get('https://api.agify.io/', { params: { name }, signal })

      return data
    },
  })

  const sendRequest = () => {
    if (inputRef.current) setName(inputRef.current?.value)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input ref={inputRef} /* value={name} onChange={(e) => setName(e.target.value)} */ />

      <button onClick={sendRequest}>SendRequest</button>

      {data?.age}

      {isFetching && <div>Loading...</div>}
    </div>
  )
}

export default Second