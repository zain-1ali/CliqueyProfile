import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { db, storage } from "../Firebase";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref as storagref } from "firebase/storage";
import ReactPlayer from "react-player/youtube";
import custom from "../imgs/customi.png";
import booksy from "../imgs/booksy.png";
import eventbrite from "../imgs/eventbrite.png";
import styleseat from "../imgs/styleseat.png";
import cashApp from "../imgs/cashApp.png";
import VCard from "vcard-creator";
import Leadform from "../components/Leadform";
import { QRCode } from 'react-qrcode-logo';
import Loader from "../components/Loader";
import Notfound from "./Notfound";
import vcard from 'vcards-js'
import axios from 'axios'


const Home = () => {
  let { userid } = useParams();
  let [userdata, setuserdata] = useState(null);
  let [sociallink, setsociallink] = useState([]);
  let [loading, setloading] = useState(true);
  let [YtLink, setYtLink] = useState([]);

  console.log(sociallink);

  // ------------------getting Data--------------------
  let [usersdata, setusersdata] = useState(null);

  useEffect(() => {
    console.log("test1");
    const starCountRef = ref(db, `User/`);
    onValue(starCountRef, async (snapshot) => {
      console.log(snapshot.val());
      const data = await snapshot.val();
      setusersdata(Object.values(data));

      // if (data.links) {
      //     setsociallink(Object.values(data.links))

      // }
    });
  }, []);

  console.log(usersdata);

  let [notfound, setnotfound] = useState(false);
  let [endpoint, setendpoint] = useState("");
  let [showSlide, setshowSlide] = useState(false);
  let openLead = () => {
    setshowSlide(true);
  };

  let closeLead = () => {
    setshowSlide(false);
  };

  useEffect(() => {
    if (usersdata) {
      let checklist = usersdata?.some((elm) => {
        return userid === elm?.id || userid === elm?.username;
      });
      console.log(checklist);
      if (checklist) {
        console.log("true");
        usersdata?.map((elm) => {
          if (userid === elm?.id || userid === elm?.username) {
            console.log(elm);
            setuserdata(elm);
            setshowSlide(elm?.leadMode)
            // if (elm.links) {
            //     console.log(elm)
            // setsociallink(Object.values(elm?.links ))
            setsociallink(elm?.links);

            // }
            setloading(false);
          }
          // else if (elm?.tagUid?.some((el) => { return userid == el?.id })) {
          //     setuserdata(elm)
          //     setsociallink(elm?.links)
          //     setloading(false)
          // }
        });
      } else {
        setloading(false);
        setnotfound(true);
      }
    }
  }, [usersdata]);

  console.log(userdata);

  // getting profile url

  let [profileurl, setprofileurl] = useState("");
  useEffect(() => {
    if (userdata?.profileUrl) {
      // const storage = getStorage();
      const fileRef = storagref(storage, userdata?.profileUrl);
      // console.log(loginUserData.profileUrl);

      getDownloadURL(fileRef)
        .then((URL) => {
          console.log(URL);
          setprofileurl(URL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userdata?.profileUrl]);

  // getting logo img

  let [logourl, setlogourl] = useState("");
  useEffect(() => {
    if (userdata?.logoUrl) {
      // const storage = getStorage();
      const fileRef = storagref(storage, userdata?.logoUrl);
      // console.log(loginUserData.profileUrl);

      getDownloadURL(fileRef)
        .then((URL) => {
          console.log(URL);
          setlogourl(URL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userdata?.logoUrl]);

  useEffect(() => {
    let yturl = sociallink?.filter((elm) => {
      return elm?.name === "YouTube";
    });
    setYtLink(yturl);
  }, [sociallink]);

  console.log(YtLink);

  // return social icon

  let returnIcons = (name) => {
    if (name === "Phone") {
      return "https://profile.f1rst-business.com/images/phone.png";
    } else if (name === "Whatsapp") {
      return "https://profile.f1rst-business.com/images/whatsapp.png";
    } else if (name === "Email") {
      return "https://profile.f1rst-business.com/images/email.png";
    } else if (name === "Snapchat") {
      return "https://profile.f1rst-business.com/images/snapchat.png";
    } else if (name === "Facebook") {
      return "https://profile.f1rst-business.com/images/facebook.png";
    } else if (name === "Instagram") {
      return "https://profile.f1rst-business.com/images/instagram.png";
    } else if (name === "Twitter") {
      return "https://profile.f1rst-business.com/images/twitter.png";
    }
    // else if (name==='Twitch') {
    //     return twitch
    // }
    // else if (name==='Youtube') {
    //     return youtube
    // }
    else if (name === "Telegram") {
      return "https://profile.f1rst-business.com/images/telegram.png";
    } else if (name === "Pinterest") {
      return "https://profile.f1rst-business.com/images/pinterest.png";
    } else if (name === "TikTok") {
      return "https://profile.f1rst-business.com/images/tiktok.png";
    } else if (name === "LinkedIn") {
      return "https://profile.f1rst-business.com/images/linkedin.png";
    } else if (name === "Website") {
      return "https://profile.f1rst-business.com/images/website.png";
    } else if (name === "PayPal") {
      return "https://profile.f1rst-business.com/images/paypal.png";
    } else if (name === "Vimeo") {
      return "https://profile.f1rst-business.com/images/vimeo.png";
    } else if (name === "Cash App") {
      return cashApp;
    } else if (name === "Spotify") {
      return "https://profile.f1rst-business.com/images/spotify.png";
    } else if (name === "Reddit") {
      return "https://profile.f1rst-business.com/images/reddit.png";
    } else if (name === "Calendly") {
      return "https://profile.f1rst-business.com/images/calendly.png";
    } else if (name === "Booksy") {
      return booksy;
    } else if (name === "StyleSeat") {
      return styleseat;
    }else if (name === "Event Brite") {
      return eventbrite;
    }
     else if (name === "Custom Link") {
      return custom;
    }
  };

  //   return url

  let returnSocialUrl = (name, url) => {
    if (name === "Instagram") {
      return `https://www.instagram.com/${url}/`;
    } else if (name === "LinkedIn") {
      return url;
    } else if (name === "Email") {
      return `mailto:${url}`;
    } else if (name === "Whatsapp") {
      return `https://wa.me/${url}`;
    }
    // else if (name === 'Website') {
    //     return url
    // }
    else if (name === "Phone") {
      return `tel:${url}`;
    } else if (name === "Snapchat") {
      return `https://www.snapchat.com/add/${url}`;
    } else if (name === "Youtube") {
      return url;
    } else if (name === "Pinterest") {
      return url;
    } 
    else if (name === "Facebook") {
      return url;
    } 
    else if (name === "Twitter") {
      return `https://www.Twitter.com/${url}`;
    } else if (name === "TikTok") {
      return `https://tiktok.com/@${url}`;
    } else {
      if (url?.includes("https://")) {
        return url;
      } else {
        return `https://${url}`;
      }
    }
  };

  // To base64

  let [base64img, setbase64img] = useState("");
  useEffect(() => {
    let cnvrtTo64 = async () => {
      const base64 = await fetch(profileurl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((res) => {
            reader.onloadend = () => {
              res(reader.result);
            };
          });
        });
      setbase64img(base64);
    };
    cnvrtTo64();
  }, [profileurl]);

  // console.log(base64img)

  // Download Vcf file


// console.log(base64img.slice(37))



  let downloadVcf = async () => {
    // Define a new vCard
    const myVCard = new VCard();

    // Some variables
    const lastname = userdata?.name;
    const firstname = "";
    const additional = "";
    const prefix = "";
    const suffix = "";

    myVCard
      .addName(lastname, firstname, additional, prefix, suffix)
      .addJobtitle(userdata?.job)
      .addEmail(userdata?.email)
      .addPhoneNumber(userdata?.phone)
      .addPhoto(base64img.slice(37), 'jpeg')
      .addAddress('', '', '', userdata?.address, '', '', '')
    sociallink?.map((link) => {
      myVCard.addSocial(link?.value,link?.name,link?.name);
    });

    const vcardData = myVCard.toString();
    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "myvcard.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


// --------------------------------------------------------------------



//         const myVCard = new vcard();

//     myVCard.firstName = userdata?.name;
// myVCard.middleName = '';
// myVCard.lastName = '';
// myVCard.workPhone = userdata?.phone;
// myVCard.title = userdata?.job;
// myVCard.email = userdata?.email
// myVCard.photo.attachFromUrl(profileurl, 'JPEG');
//  sociallink?.map((link) => {
//       myVCard.socialUrls[link?.name?.toLowerCase()] = link?.value;
//     });




  // Generate the vCard file content
  // const vCardContent = myVCard.getFormattedString();

  // Create a Blob with the vCard content
  // const blob = new Blob([vCardContent], { type: 'text/vcard' });

  // Create a download URL for the Blob
  // const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  // const link = document.createElement('a');
  // link.href = url;
  // link.setAttribute('download', 'contact.vcf');

  // Simulate a click event on the link to start the download
  // link.click();

  // Clean up the URL and link
  // URL.revokeObjectURL(url);
  // link.remove();


// ----------------------------------------------------------------------------



// axios.post('http://localhost:6001/api/convertVcf', {userdata,sociallink,img:profileurl})
//   .then((response) => {
//     // Create a download link for the vCard
//     const downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(new Blob([response.data]));
//     downloadLink.download = 'contact.vcf';
//     downloadLink.click();
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

  };

 
  return (
    <>
    {loading ? <Loader /> :

   <>
   {notfound || userdata?.profileOn===0 ? <Notfound /> :
   userdata.directMode===false ?
    <div class="min-h-[100vh] max-w-[420px] w-[100%] flex flex-col items-center rounded-md shadow-lg relative">
      <Leadform
        showSlide={showSlide}
        uid={userdata?.id}
        closeLead={closeLead}
        profileurl={profileurl}
      />
      <div class="w-[93%]  ">
        <div class="h-[167px] w-[100%] mt-3 border rounded-xl flex shadow-md">
          <div class="w-[50%] h-[100%] object-cover rounded-l-xl">
            <img
              src={profileurl ? profileurl : `https://placehold.co/200x175`}
              alt=""
              class="w-[100%] h-[100%]  rounded-l-xl "
            />
          </div>
          <div class="w-[50%] h-[100%] bg-black rounded-r-xl flex flex-col justify-center relative">
            <h2
              class="text-white  font-[600] break-all w-[90%] ml-[15px] "
              //   style="font-size: 1.3rem;"
            >
              {userdata?.name}
            </h2>
            <h2
              class="text-white  font-[600]  w-[90%] ml-[15px] "
              //   style="font-size: 0.9rem;"
            >
              {userdata?.job}
            </h2>
            <div class="h-[73px] w-[100%] object-cover absolute bottom-[-32px] flex justify-center items-center">
              <img
                src={logourl ? logourl : `https://placehold.co/73x73`}
                alt="logo"
                class=" h-[73px] w-[73px] rounded-full shadow-md"
                // style="border: 3px solid rgb(198, 198, 199);"
                style={{ border: "3px solid rgb(198, 198, 199)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}

      <div class="w-[93%] flex justify-between items-center mt-[45px]">
        <div
          class="h-[40px] w-[48%] bg-white text-black flex justify-center items-center rounded-md border-black border-[1px] text-sm font-medium cursor-pointer"
          onClick={() => openLead()}
        >
          EXCHANGE CONTACT
        </div>
        <div
          class="h-[40px] w-[48%] bg-black text-white flex justify-center items-center rounded-md text-sm font-medium cursor-pointer"
          onClick={() => downloadVcf()}
        >
          ADD TO CONTACT
        </div>
      </div>

      {/* Location  */}

      <div class="flex mt-6 items-center w-[94%]">
        <MdLocationPin class="text-[0.9rem]" />
        <h3 class="text-[#5b6061] text-[0.9rem] font-medium ml-1">
          {userdata?.address}
        </h3>
      </div>

      {/* About  */}
      <div class="mt-5  w-[94%] ">
        <h2 class=" text-[1.2rem] font-[600]">ABOUT</h2>
      </div>

      <div class="mt-2  w-[94%] text-[0.9rem] text-[#5b6061]">
        {userdata?.bio}
      </div>

      {/* video  */}

      <div class="w-[94%] border-black border-b mt-8"></div>

      <div class="mt-4 w-[94%] flex justify-center ">
        <div style={{ height: "210px", width: "94%" }}>
          <div style={{ height: "100%", width: "100%" }}>
            {YtLink ? (
              <ReactPlayer url={YtLink[0]?.value} height="100%" width="100%" />
            ) : (
              <div className="h-[100%] w-[100%] flex justify-center items-center">
                <h2>No video found!</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <div class="w-[92%] border-black border-b mt-4"></div>

      {/* Social icons  */}

      <div className="flex justify-center w-[100%]">
        <div className="w-[90%] border-black  mt-8 grid grid-cols-3 gap-x-4">
          {sociallink?.map((elm) => {
            return (
              <>
                <a
                  target="_blank"
                  href={returnSocialUrl(elm?.name, elm?.value)}
                  class="h-[130px] w-[100px] flex flex-col  items-center mt-2 "
                  style={elm?.name === "YouTube" ? { display: "none" } : null}
                >
                  <img
                    src={returnIcons(elm?.name)}
                    alt="img"
                    class={` ${
                     "h-[70] w-[70px]"
                    }`}
                    // elm?.name === "Calendly" || elm?.name === "Event Brite" || elm?.name === "StyleSeat" || elm?.name === "Booksy"
                    // ? "h-[65px] w-[65px] rounded-[10px] shadow-md"
                    // : 
                    // style={elm?.name==='Calendly'? {borderRadius:'10px'}:null}
                  />
                  <h2   class={` ${
                      "font-medium text-sm mt-4"
                    }`}>{elm?.name}</h2>
                    {/* elm?.name === "Calendly" || elm?.name === "Event Brite" || elm?.name === "StyleSeat" || elm?.name === "Booksy"
                        ? "font-medium text-sm mt-[22px]"
                        :  */}
                </a>
              </>
            );
          })}
        </div>
      </div>

      <div class="w-[94%] flex justify-center mt-10 text-[1.4rem] font-medium">
        MY QR CODE
      </div>

      <div class="w-[94%] flex justify-center mt-8 ">
      <QRCode value={window.location.href} size='100'/>
      </div>
      <br />
<br />
    </div>
    : window.open(returnSocialUrl(userdata?.direct?.name, userdata?.direct?.value))
}
    </>
}
    </>
  );
};

export default Home;
