import React from 'react'

const FormField = (form) => {
  return (

    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={form.name} className='block text-sm font-medium text-white'>
          {form.labelName}
        </label>
        {form.isSurpriseMe && (
          <button
            type='button'
            className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-black bg-[#ffd900] hover:bg-[#ffd900b2]'
            onClick={form.handleSurpriseMe}
          >
            Surprise Me
          </button>
        )}
      </div>
      <input type={form.type} id={form.name} name={form.name} placeholder={form.placeholder} value={form.value} onChange={form.handleChange} required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ffd900] focus:border-[#ffd900] outline-none block w-full p-3' />
    </div>
  )
}

export default FormField