import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import {RxCross2} from 'react-icons/rx';
import {MdKeyboardArrowUp} from 'react-icons/md'
import {MdKeyboardArrowDown} from 'react-icons/md'
import { push, ref, update } from "firebase/database";
import { db, storage } from "../Firebase";
import { getDownloadURL, uploadBytes, ref as sRef } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


const Leadform = ({ showSlide,closeLead,profileurl,uid }) => {

  let [showExtra,setshowExtra]=useState(false)

  let [data,setData]=useState({
    name:'',
    email:'',
    phone:'',
    job:'',
    company:'',
    message:''
  })

let [img,setimg]=useState('')

const handleImageChange = (e) => {

  if (e.target.files[0]) {
      setimg(e.target.files[0])

  }
}

// adding data 

const addData = async () => {
  if (data.name) {
      let pushkey = push(ref(db, `Contacts/`), data).key
      update(ref(db, `Contacts/${pushkey}`), { id: pushkey,userid:uid }).then(()=>{
        toast.success('Information submited successfuly')
        setData({
          name:'',
          email:'',
          phone:'',
          job:'',
          company:'',
          message:''
        })
      });
      if (img) {
          let name = new Date().getTime() + img.name;
          const storageRef = sRef(storage, name);
          uploadBytes(storageRef, img).then(() => {
              console.log('img testing')
              getDownloadURL(storageRef).then((URL) => {
                  console.log(URL)
                  update(ref(db, `Contacts/${pushkey}`), { imgUrl: URL }).then(()=>{
                    setimg(null)

                  });
                 

              }).catch((error) => {
                  console.log(error)
              });
          }).catch((error) => {
              console.log(error)
          })
      }
    

      // if (!img) {
      //     setTimeout(() => {
      //         window.location.reload();
      //     }, 3000)
      // }



  }
  else{
    toast.error('Name field should not be empty')

  }
}




  let toggleShowExtra=()=>{
    setshowExtra(!showExtra)
  }

  return (
      <Slide
        in={showSlide}
        direction="up"
        timeout={{ appear: 500, enter: 500, exit: 500 }}
      >
    <div className="  max-w-[420px] w-[100%] bg-[#f5f6fa] z-10 flex justify-center absolute  h-max " style={!showSlide && {display:'none'}}>

        <div class="w-[95%]  flex flex-col items-center">
          <div class="w-[100%] h-[220px] border relative">
            <div class="h-[27px] w-[27px] bg-black rounded-full absolute text-white flex justify-center items-center text-xl top-[10px] right-2 cursor-pointer" onClick={()=>closeLead()}>
              <RxCross2/>
            </div>
            <img
              src="https://placehold.co/400x220"
              alt=""
              class="w-[100%] h-[220px] object-cover shadow-lg"
            />
            <img
              src={profileurl?profileurl:"https://placehold.co/110x110"}
              class="h-[110px] w-[110px] absolute  top-[68%] left-[10px] rounded-full object-cover border-[4px] border-[#ffffff] shadow-lg"
            />
          </div>
          <div class="w-[93%] border mt-[80px] bg-white p-3 rounded-lg shadow-md ">
            <h2 class="font-medium text-lg">Contact me</h2>
            <img
            src={img ? URL.createObjectURL(img) : `https://placehold.co/85x85`}
              alt=""
              class="h-[85px] w-[85px] rounded-full object-cover mt-3 "
            />
            <label for="img">
              <div class="w-[93px] h-[26px] bg-black text-white mt-2 rounded-xl text-sm flex justify-center items-center cursor-pointer">
                Add image
              </div>
              <input
                type="file"
                name="img"
                id="img"
                class="opacity-0 w-[0px] h-[0px]"
                onChange={handleImageChange}
              />
            </label>
            <div class="mt-2">
              <p class="ml-2">Name*</p>
              <input
                type="text"
                placeholder="Enter Name"
                class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                onChange={(e)=>setData({...data,name:e.target.value})}
                value={data.name}
              />
            </div>
            <div class="mt-2">
              <p class="ml-2">Email*</p>
              <input
                type="text"
                placeholder="Enter Email"
                class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                onChange={(e)=>setData({...data,email:e.target.value})}
                value={data.email}
              />
            </div>
            <div class="mt-2">
              <p class="ml-2">Phone Number*</p>
              <input
                type="text"
                placeholder="Enter Phone"
                class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                onChange={(e)=>setData({...data,phone:e.target.value})}
                value={data.phone}
              />
            </div>
            <div class="flex items-center ml-2 mt-2 cursor-pointer">
              More options{" "}
              {showExtra ? <MdKeyboardArrowUp onClick={()=>toggleShowExtra()}/> :<MdKeyboardArrowDown onClick={()=>toggleShowExtra()}/>}
            </div>

            {
              showExtra &&
            
            <div>
              <div class="mt-2">
                <p class="ml-2">Job</p>
                <input
                  type="text"
                  placeholder="Enter Job"
                  class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                  onChange={(e)=>setData({...data,job:e.target.value})}
                value={data.job}
                />
              </div>
              <div class="mt-2">
                <p class="ml-2">Company</p>
                <input
                  type="text"
                  placeholder="Enter Company"
                  class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                  onChange={(e)=>setData({...data,company:e.target.value})}
                value={data.company}
                />
              </div>
              <div class="mt-2">
                <p class="ml-2">Message</p>
                <textarea
                  type="text"
                  placeholder="Enter Message"
                  class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px] h-[200px]"
                  onChange={(e)=>setData({...data,message:e.target.value})}
                value={data.message}
                ></textarea>
              </div>
            </div>
}
            <div class="w-[100%] border rounded-3xl mt-[12px] h-[50px] bg-black flex justify-center items-center text-white cursor-pointer" onClick={()=>addData()}>
              Submit
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
        <ToastContainer position="top-center" autoClose={2000} />

    </div>

      </Slide>
  );
};

export default Leadform;
