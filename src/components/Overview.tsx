import React from "react";

type OverviewProps = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Overview: React.FC<OverviewProps> = ({ setState }) => {
  return (
    <div className='px-8 py-10'>
      <div className='space-x-2 mb-8'>
        <button className='rounded-full bg-gray-800 text-white border-2 border-gray-800 px-6 py-1 font-semibold text-lg'>
          Overview
        </button>
        <button
          onClick={() => setState(false)}
          className='rounded-full bg-transparent text-gray-800 border-2 border-gray-800 px-6 py-1 font-semibold text-lg hover:bg-gray-800 hover:text-white duration-150'>
          General Information
        </button>
      </div>
      <h2 className='text-gray-800 font-bold text-xl mb-2'>Description</h2>
      <p className='text-gray-600 font-medium text-md text-justify mb-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
        voluptatibus ut atque eos quasi asperiores officiis quaerat architecto
        accusamus id nisi minus blanditiis tempora unde itaque inventore, illum
        exercitationem laboriosam?{/*description*/}
      </p>
      <h2 className='text-gray-800 font-bold text-xl mb-2'>History</h2>
      <p className='text-gray-600 font-medium text-md text-justify'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
        voluptatibus ut atque eos quasi asperiores officiis quaerat architecto
        accusamus id nisi minus blanditiis tempora unde itaque inventore, illum
        exercitationem laboriosam?{/*history*/}
      </p>
    </div>
  );
};

export default Overview;
