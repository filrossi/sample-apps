import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full rounded-2xl bg-cover text-black'>
            <div className="backdrop-blur-sm bg-white/30 border-dotted rounded-lg border-2 border-gray-300 p-1 sm:p-5 md:p-12 md:max-w-[90%]">
                <h1 className="text-sm sm:text-xl md:text-4xl font-medium sm:font-normal mb-10">Welcome to ARK-ASSIS!</h1>
                <p className="text-xs md:text-base text-gray-700 text-pretty">
                Revolutionize your design process with our AI assistant, expertly trained on Dutch building regulations and sustainability standards.
                </p>
                <div className='flex flex-row gap-5 items-center'>
                    <Link href='/workspace/default' className="text-xs bg-[#1C17FF] p-2 px-4 rounded-md md:text-base text-white hover:opacity-65 focus:outline-none flex items-center justify-center mt-10">
                        Chat with workspace
                    </Link>
                    <Link href='/workspace/new'>
                        <div className="text-xs md:text-base text-[#1C17FF] hover:opacity-65 focus:outline-none flex items-center justify-center mt-10">
                            Create your own
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
