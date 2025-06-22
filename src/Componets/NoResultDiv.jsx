import React from 'react'

export const NoResultDiv = () => {
    return (
        <div className='px-20'>
            <img src="icons/no-result.svg" alt="" 
            className='mx-auto w-55 h-55'/>
            <h3
            className='text-center text-2xl mb-5'
            >Something went wrong</h3>

            <p
            className='text-center text-lg pb-15'
            >We&rsquo;re unable to retrieve the weather details. Ensure you&rsquo;ve entered a valid city or try again later.</p>
        </div>
    )
}
