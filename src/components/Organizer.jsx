import React from 'react';

const sulu = '/co-org/sulunew.png'; // Update with your image path\
const fu = '/co-org/FU.jpeg'; // Update with your image path
const pcerp = '/co-org/PCERP.jpeg'; // Update with your image path
const putp = '/co-org/PUTP.jpeg'; // Update with your image path
const isufst = '/co-org/isufst.jpeg'; // Update with your image path
const asu = '/co-org/asu.jpeg'; // Update with your image path
function Organizer() {
  return (
    <section className="bg-[#edf6e1] rounded-xl p-8 text-center shadow-lg max-w-7xl mx-auto my-8 px-2">
      <h2 className="text-5xl font-semibold mb-6 text-slate-900 ">
        Our <span className='bg-[#1a2e1a]/90 drop-shadow-2xl text-transparent bg-clip-text'>Organizing Partner</span>
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-6 gap-1'>

        <img
          src={sulu}
          alt="Organizing Partner Logo"
          className=" w-auto h-[140px] rounded-lg   p-2 mx-auto"
        />
          <img
          src={putp}
          alt="Organizing Partner Logo"
          className="w-auto h-[140px] rounded-lg   p-2 mx-auto"
        />
          <img
            src={asu}
            alt="Organizing Partner Logo"
            className=" w-auto h-[140px] rounded-lg   p-2 mx-auto"
          />
        <img
          src={fu}
          alt="Organizing Partner Logo"
          className=" w-auto h-[140px] rounded-lg   p-2 mx-auto "
        />
        <img
          src={pcerp}
          alt="Organizing Partner Logo"
          className=" w-auto h-[140px] rounded-lg   p-2  mx-auto"
          />
        <img
          src={isufst}
          alt="Organizing Partner Logo"
          className=" w-auto h-[140px] rounded-lg   p-2 mx-auto"
        />
      </div>
    </section>
  );
}

export default Organizer;
