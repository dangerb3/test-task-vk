import { useQuery } from '@tanstack/react-query'
import React, { createRef, useEffect } from 'react'
import axios from 'axios'


const First = () => {
  const inputRef = createRef<HTMLInputElement>();

  const { data, isFetching, refetch, isFetched } = useQuery({
    queryKey: ['firstPartReq'],
    enabled: false,
    queryFn: () =>
      axios
        .get('https://catfact.ninja/fact')
        .then((res) => res.data),
  })

  const sendRequest = () => {
    refetch()
  }

  const setCursorPositionAfterFirstWord = () => {
    if (inputRef.current) {
      const firstSpaceIndex = inputRef.current.value.indexOf(' ');

      inputRef.current.onfocus = () => {
        inputRef?.current?.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
      }

      inputRef.current.focus({ preventScroll: true })
    }
  }

  useEffect(() => {
    setCursorPositionAfterFirstWord()
  }, [isFetched, inputRef])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button onClick={sendRequest}>Send request</button>
      {isFetching ?
        <div>Loading...</div>
        :
        <input value={data?.fact} ref={inputRef}></input>
      }
    </div>
  )
}

export default First