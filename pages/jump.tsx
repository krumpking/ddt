import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Main from '../app/components/pages/main';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectPosition } from '../app/store/reducer';



const Jump: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentPosition = useAppSelector(selectPosition);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check Login status here
  })


  const progress = (index: number) => {

    switch (index) {
      case 0:
        return (
          <Main />
        )
        break;
      case 1:
        return (
          <p>Second {currentPosition}</p>
        )
        break;
      default:
        return (
          <Main />
        )
    }


  }


  return (
    <>
      <p>Jump</p>
    </>
  )
}

export default Jump
