import { setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import videosContext from '../context/videos/videosContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

export const ModalFeedbackForm = () => {
    const router = useRouter();
    const { showFeedBackFrom, setshowFeedBackFrom } = useContext(videosContext);
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setmessage('');
        setloading(true);

        const formData = new FormData();
        const form = event.target; // Reference to the form element

        // Get form data
        const issueType = form['issue-type'].value;
        const email = form['email'].value;
        const messageText = form['message'].value;
        const file = form['file'].files[0]; // Get the file object

        if (file) {
            formData.append('file', file);
        }

        // Append other form data as JSON
        formData.append('issueType', issueType);
        formData.append('email', email);
        formData.append('message', messageText);

        try {
            const rawResponse = await fetch(`/api/FeedbackSubmit`, {
                method: 'POST',
                body: formData,
            });

            const res = await rawResponse.json();

            if (res.message === 'Form submitted successfully!') {
                setmessage('Form Submitted!');
                form.reset(); // Reset the form fields
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-30 ${showFeedBackFrom ? "" : "hidden"} flex items-center justify-center`}>
            {/* Background overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${showFeedBackFrom ? "opacity-50" : "opacity-0"}`}
                onClick={() => setshowFeedBackFrom(false)}
            >
            </div>
            {/* Modal content */}
            <div className="relative bg-semiblack rounded-lg p-6 bg-orange-100   mx-auto">
                <IoIosCloseCircleOutline onClick={() => { setshowFeedBackFrom(false) }} className="cursor-pointer absolute text-semiblack text-[32px] lg:text-[34px] right-4 top-4 p-1" />
                <div className="flex flex-col justify-center">
                    <p className='mb-2 font-inter text-semiblack text-center font-dancing text-2xl'>Contact Us</p>
                    <div>
                        <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="issue-type" className="text-sm font-medium leading-6 text-semiblack pl-1">Subject</label>
                                <div className="mt-1">
                                    <select
                                        id="issue-type"
                                        name="issue-type"
                                        required
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    >
                                        <option value="DMCA / Copyright Infringement">DMCA / Copyright Infringement</option>
                                        <option value="Technical problems">Technical problems</option>
                                        <option value="Inappropriate content">Inappropriate content</option>
                                        <option value="Support request">Support request</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium leading-6 text-semiblack pl-1">Email for reply</label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder='Email'
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="text-sm font-medium leading-6 text-semiblack pl-1">Message</label>
                                <div className="mt-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        placeholder='Your message here'
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="file" className="text-sm font-medium leading-6 text-semiblack pl-1">Upload File</label>
                                <div className="">
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx" // Add text files and additional types as needed
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="relative mt-[20px] flex w-full h-[40px] justify-center items-center space-x-1 rounded-md bg-orange-800 px-3 py-1.5 shadow-sm">
                                {loading &&
                                    <div className='w-fit absolute top-2'>
                                        <ClipLoader color="#ffffff" size={25} />
                                    </div>
                                }
                                {!loading && <p className=" text-sm font-inter leading-6 text-white font-inter font-semibold mt-1">Submit</p>}
                            </button>
                            <p className="text-red-500 font-inter text-xs text-center min-h-4">{message}</p>
                        </form>
                        <div className=''>
                            <p className='text-xs text-center text-semiblack font-inter whitespace-nowrap overflow-hidden text-ellipsis'>
                                Contact us by mail: <a href="mailto:support@example.com" className='text-theme_yellow hover:underline text-orange-800'>ukdevelopers007@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
