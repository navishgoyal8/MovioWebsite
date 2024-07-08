import React from 'react'
import { mobileNavigate } from '../contants/navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {

  return (
    <section className='lg:hidden h-16 w-full bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 z-40'>
      <div className='flex pt-2 items-center justify-between h-full text-neutral-400'>
        {
            mobileNavigate.map((nav,index) => {
                return (
                    <NavLink 
                        key={nav.label+"mobilenavigation"}
                        to={nav.href}
                        className={({isActive}) => `px-3 flex flex-col items-center h-full ${isActive && 'text-neutral-100'}`}    
                        >
                        <div className='text-2xl'>
                            {nav.icon}
                        </div>
                        <p className='text-sm'>{nav.label}</p>
                    </NavLink>
                )
            })
        }
      </div>
    </section>
  )
}

export default MobileNavigation
