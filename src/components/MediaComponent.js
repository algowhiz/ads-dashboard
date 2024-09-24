import React, { useState } from 'react';
import Link from 'next/link';
import SuccessModal from '../utils/SuccessModal';

const MediaComponent = ({ text = "false" }) => {
    const [errors, setErrors] = useState({});
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [formData, setFormData] = useState({
        heading1: '',
        heading2: '',
        description: '',
        landscapeImage: '',
        portraitImage: '',
        squareImage: '',
        videoUrl: '',
        businessName: '',
        buttonLabel: '',
        websiteUrl: '',
    });

    const closeModal = () => {
        setModalVisible(false);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };
        delete newErrors[name];

        if (value === "")
            newErrors[name] = `${name} is required`;

        setErrors(newErrors);
        setFormData({ ...formData, [name]: value });


        const requiredFields = text === "false" ?
            ['heading1', 'heading2', 'description', 'landscapeImage', 'portraitImage', 'squareImage', 'videoUrl', 'businessName', 'buttonLabel', 'websiteUrl'] :
            ['heading1', 'heading2', 'description', 'businessName', 'buttonLabel', 'websiteUrl'];

        const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== "" || newErrors[field]);

        console.log(allFieldsFilled);


        allFieldsFilled ? setAllFieldsFilled(true) : setAllFieldsFilled(false);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };
        if (!value) {
            newErrors[name] = `${name} is required`;
        }
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);

        // getting prev data
        const previousData = JSON.parse(localStorage.getItem('adData')) || [];

        const updatedData = [...previousData, formData];

        localStorage.setItem('adData', JSON.stringify(updatedData));

        setModalVisible(true);

        // console.log('Form submitted:', updatedData);
        setFormData({
            heading1: '',
            heading2: '',
            description: '',
            landscapeImage: '',
            portraitImage: '',
            squareImage: '',
            videoUrl: '',
            businessName: '',
            buttonLabel: '',
            websiteUrl: '',
        });
        setSubmit(false);
        setAllFieldsFilled(false);
    };

    return (
        <div className="animate-slide-in-left container text-black mx-auto font-thin p-8 mt-10 rounded border-[#DADADA] border-2">
            <h1 className="text-2xl mb-6">Create Ads</h1>
            <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col">
                {/* Headings and Description */}
                <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='md:w-1/2'>
                        <div className='md:w-full mb-3'>
                            <label htmlFor="heading1" className="">Heading 01</label>
                            <input
                                type="text"
                                name="heading1"
                                value={formData.heading1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Add a heading that would make users interested"
                                className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.heading1 ? "focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-600" : ""}`}
                            />
                            {errors.heading1 && <span className="text-red-500 text-xs ml-3">This field is required</span>}
                        </div>

                        <div className='md:w-full '>
                            <label htmlFor="heading2" className="mb-3">Heading 02</label>
                            <input
                                type="text"
                                name="heading2"
                                value={formData.heading2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Add a heading that would make users interested"
                                className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.heading2 ? "focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-600" : ""}`}
                            />
                            {errors.heading2 && <span className="text-red-500 text-xs ml-3">This field is required</span>}
                        </div>
                    </div>

                    <div className='md:w-1/2'>
                        <label htmlFor="description" className="mb-3">Description 01</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Add primary text to help users understand more about your products, services, or offers"
                            rows="5"
                            className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.description ? "focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-600" : ""}`}
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-xs ml-3">This field is required</span>}
                    </div>
                </div>

                {/* Image URLs */}
                {text === "false" && (
                    <div className='flex flex-col mt-6'>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className='w-full sm:w-1/3'>
                                <label htmlFor="landscapeImage" className="block mb-3">Landscape Marketing Image (1.9:1)</label>
                                <input
                                    type="text"
                                    name="landscapeImage"
                                    value={formData.landscapeImage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Add the URL of the image you want to use for the ad"
                                    className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.landscapeImage ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                                />
                                {errors.landscapeImage && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                            </div>
                            <div className='w-full sm:w-1/3'>
                                <label htmlFor="portraitImage" className="block mb-3">Portrait Marketing Image (4:5)</label>
                                <input
                                    type="url"
                                    name="portraitImage"
                                    value={formData.portraitImage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Add the URL of the image you want to use for the ad"
                                    className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.portraitImage ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                                />
                                {errors.portraitImage && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                            </div>
                            <div className='w-full sm:w-1/3'>
                                <label htmlFor="squareImage" className="block mb-3">Square Marketing Image (1:1)</label>
                                <input
                                    type="url"
                                    name="squareImage"
                                    value={formData.squareImage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Add the URL of the image you want to use for the ad"
                                    className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.squareImage ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                                />
                                {errors.squareImage && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="videoUrl" className="block mb-3">Video URL</label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Add the URL of the video you want to use for the ad"
                                className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.videoUrl ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                            />
                            {errors.videoUrl && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                        </div>
                    </div>
                )}

                {/* Business Info */}
                <div className='flex flex-col md:flex-row gap-4 mt-6'>
                    <div className='w-full sm:w-1/2'>
                        <label htmlFor="businessName" className="block mb-3">Business Name</label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Add your business name"
                            className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.businessName ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                        />
                        {errors.businessName && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                    </div>
                    <div className='w-full sm:w-1/2'>
                        <label htmlFor="buttonLabel" className="block mb-3">Button Label</label>
                        <input
                            type="text"
                            name="buttonLabel"
                            value={formData.buttonLabel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Add the text for your button"
                            className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.buttonLabel ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                        />
                        {errors.buttonLabel && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                    </div>
                </div>

                <div className='mt-6'>
                    <label htmlFor="websiteUrl" className="block mb-3">Website URL</label>
                    <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Add your website URL"
                        className={`mt-1 w-full border hover:border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md ${errors.websiteUrl ? "border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" : ""}`}
                    />
                    {errors.websiteUrl && <span className="text-red-500 text-xs mt-2">This field is required</span>}
                </div>

                {/*  Button */}
                <div className="flex justify-end gap-6 mt-4">
                    <Link href="/create-ads">
                        <button type="button" className="border-2 border-[#DADADA] text-black py-2 px-12 hover:shadow-lg hover:shadow-gray-300 rounded">
                            Back
                        </button>
                    </Link>
                    <button
                        disabled={!allFieldsFilled}
                        onClick={handleSubmit}
                        type="submit" className={` text-gray-500 py-2 px-12 hover:shadow-lg hover:shadow-gray-300 rounded ${allFieldsFilled ? 'bg-[#0096FF] text-white' : 'bg-[#E0E0E0] cursor-not-allowed text-[#B9B9B9]'}`}>{submit ? "submitting" :"Submit"}</button>
                </div>
            </form>
            {isModalVisible && <SuccessModal
                message="Submission Successful!"
                isVisible={isModalVisible}
                onClose={closeModal}
            />}
        </div>
    );
};

export default MediaComponent;
