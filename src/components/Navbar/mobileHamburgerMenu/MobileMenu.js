import React from 'react'
import { MobileNavMenu } from '../../../assets/icons'

export default function MobileHumburgerMenu() {
  return (
    <div className='block md:hidden'>
        <div className='cursor-pointer'>
            <MobileNavMenu />
        </div>
    </div>
  )
}
