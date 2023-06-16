import React from 'react'
import './Notfound.css'
import logo from '../imgs/logo.png'
import playstore from '../imgs/playstore.jpeg'
import appstore from '../imgs/appstore.jpeg'
import {AiOutlineLock} from 'react-icons/ai'


const Notfound = () => {
  return (
    <div class="myconatainer">
  <div class="myinnercontainer">
    <img
      src={logo}
      alt="Wajj"
      class="myimg2  bg-black rounded-full"
    />
   <AiOutlineLock className='lockicon'/>
    <div class="p1  font-medium">
      This profile is not activatied or locked by user
    </div>
    <div class=" w-[94%] font-medium  mt-[3px] flex justify-center text-center">
      Use Cliquey free android or ios app to activate &amp; customize your
      profile
    </div>
    <div class="activate_sapid_card_button_div">
      <img
        src={playstore}
        alt="goole"
        style={{height: '45px', width: '45%', cursor: 'pointer'}}
      />
      <img
        src={appstore}
        alt="apple"
        style={{height: '45px', width: '45%', cursor: 'pointer'}}
      />
    </div>
  </div>
  <div class="last-container">
    <img
      src={logo}
      alt="Wajj"
      class="myimg  bg-black rounded-full"
    />
    <p class=" font-medium flex">
      Powerd by <h2 class="font-bold ml-1">Cliquey™</h2>{" "}
    </p>
  </div>
  <br />
</div>

  )
}

export default Notfound