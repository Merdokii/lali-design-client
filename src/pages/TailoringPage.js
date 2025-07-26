import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { FaFileUpload } from 'react-icons/fa';

const TailoringPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const onSubmit = (data) => {
    const formData = { ...data, designFile: fileName };
    alert(`Thank you, ${data.name}! Your tailoring request has been submitted. We will contact you at ${data.email}.`);
    console.log("Form Data:", formData);
    reset();
    setFileName('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Tailoring Services</h1>
        <p className="text-lg text-gray-600 mb-8">From simple alterations to custom creations from your own designs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Suit and Dress Alterations</li>
            <li>Custom Garment Creation</li>
            <li>Wedding Dress Fittings</li>
            <li>Zipper and Button Repair</li>
            <li>Resizing and Restyling</li>
          </ul>
           <h2 className="text-2xl font-semibold mb-4 mt-8">How It Works</h2>
           <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Fill out the appointment form.</li>
                <li>Upload an image of your design or the item to be altered (optional).</li>
                <li>We will contact you to confirm details and provide a quote.</li>
           </ol>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Book an Appointment</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ... other inputs ... */}
            <Input id="name" label="Full Name" {...register('name', { required: 'Full name is required' })} />
            {errors.name && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.name.message}</p>}

            <Input id="email" label="Email Address" type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.email.message}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload a Design (Optional)</label>
              <label htmlFor="file-upload" className="w-full flex items-center justify-center px-3 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <FaFileUpload className="mr-2 text-gray-500"/>
                <span className="text-gray-600">{fileName || 'Choose a file...'}</span>
              </label>
              <input id="file-upload" type="file" className="hidden" {...register('design')} onChange={handleFileChange} />
            </div>

            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TailoringPage;