import React from 'react'

const SearchInput = ({title, handleChange}) => {
  return (
    <div>
      <h2 className='text-center'>{title}</h2>
      <input className='border-0 form-control' onChange={handleChange} type="search" />
    </div>
  )
}

export default SearchInput