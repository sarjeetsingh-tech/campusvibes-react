import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CiCircleRemove } from "react-icons/ci";
import SloganRotator from './SloganRotator';

function CampusDetails() {
  // Array of messages to display when no images are uploaded
  const uploadMessages = [
    "Image upload is not mandatory, but it can greatly enhance the experience for students.",
    "Consider uploading images to make your campus details more appealing to students.",
    "Adding images can provide students with a better understanding of your campus.",
    "Enhance your campus profile by uploading images. It's worth it!",
    "Images can help students visualize your campus better. Give it a try!"
  ];

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    website: '',
    contact: {
      phone: '',
      email: ''
    },
    description: '',
    facilities: [],
    programsOffered: [],
    images: [] // To store the selected images
  });

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...formData.images, ...files];
    setFormData(prevState => ({
      ...prevState,
      images: updatedImages
    }));
  };

  // Function to remove an image from the selected images array
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      images: updatedImages
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/campus/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Campus details submitted successfully');
        const data = await response.json();
        console.log(data.redirectURL);
        if (data.success) {
          window.location.href = '/';
        } else {
          console.error('Redirect URL not provided');
        }
      } else {
        console.error('Failed to submit campus details');
      }
    } catch (error) {
      console.error('Error submitting campus details:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20 flex flex-col md:flex-row h-screen">
      <div className="md:w-1/3 px-8 py-4 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-8">Upload Images</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
        {/* Display upload messages if no images are uploaded */}
        {formData.images.length === 0 && (
          <div className="mt-4">
            <SloganRotator slogans={uploadMessages} size="text-sm" />
          </div>
        )}
        {/* Display selected images */}
        <div className="carousel mt-4">
          {formData.images.map((file, index) => (
            <div key={index} className="relative p-2 mt-2">
              <img
                className="border"
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <button
                className="text-red-600 font-bold absolute top-2 right-2"
                onClick={() => handleRemoveImage(index)}
              >
                <CiCircleRemove className="text-3xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-2/3 px-8 py-4">
        <h2 className="text-3xl font-semibold mb-4">Campus Details</h2>
        <h1 className='text-sm mb-6 text-gray-700'>Take a moment to provide additional details about your campus to enrich the information displayed on your campus details page.</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Campus Name"
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Address"
            variant="standard"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="City"
              variant="standard"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="State"
              variant="standard"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <TextField
            label="Website"
            variant="standard"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            variant="standard"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            variant="standard"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            variant="standard"
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <div className='flex flex-row justify-end mr-2'>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CampusDetails;
