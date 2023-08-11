import React, { useState } from 'react'
import { getRandomPrompt } from '../utils'
import { useNavigate } from 'react-router-dom'
import { FormField, Loader } from '../components';
import { preview } from '../assets';
import axios from 'axios';
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post('http://localhost:3000/api/v1/g-image', { prompt: form.prompt }).catch(err => alert(err));
        setform({ ...form, photo: `data:image/jpeg;base64,${response.data.photo}` })
      }
      catch (err) {
        alert(err);
      }
      finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { name, prompt, photo } = form;
      if (name && prompt && photo) {
        const post = await axios.post('https://ai-image-generation-app-one.vercel.app/api/v1/posts', { name, prompt, photo }).catch(err => alert(err));
        if (post) {
          navigate('/');
        }
      }
    }catch(error){
      alert(error);
    }finally{
      setLoading(false);
    }
   }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const handleSurpriseMe = () => {
    const prompt = getRandomPrompt();
    setform({ ...form, prompt });
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#ffd900] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#ffffff] text-[14px] max-w[500px]'>Create imaginative and visually stunning images through G-Image AI</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="You Name"
            type="text"
            name="name"
            placeholder="Fahad Zahid"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Generate a picture of Pakistan in 2050."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[#ffd90082] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImg} className='text-black bg-green-50 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg ? 'Generating' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          {/* <p className='mt-2 text-[#ffffff] text-[14px]'>Save to Collections</p> */}
          <button type='submit' className='mt-3 text-black bg-[#ffd900] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Saving...' : "Save To Collection"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost