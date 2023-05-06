import React from 'react';
import { Bars } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen flex-col text-gray-700'>
            <h2 className='text-3xl mb-6 font-semibold'>This is React Demo project (TO DO APP) DRAG AND DROP</h2>
            <Bars
                height="100"
                width="100"
                color="#B91C1C"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loader;