import React, { useEffect, useRef, useState } from 'react';
import "./style.css";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiCamera } from 'react-icons/ci';
import { BsPlusLg} from 'react-icons/bs';
import { RxCross1} from 'react-icons/rx';
import { TfiGallery} from 'react-icons/tfi';
import { FaTelegramPlane} from 'react-icons/fa';
import { MdKeyboardVoice} from 'react-icons/md';
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { BsEmojiSmile } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';
import Lottie from "lottie-react";
import conversation from "../../../src/svg/conversation.json";



import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import moment from 'moment/moment';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getStorage, ref as sref  , uploadBytesResumable, getDownloadURL, uploadString, uploadBytes  } from "firebase/storage";

const Chatting = () => {

const [open,setopen] = useState(false);
const [opencam, setOpenCam] = useState(false);
const [openGal, setOpenGal] = useState(false);
const [msgList, setMsglist] = useState([]);
const [grupmsgList, setGrupMsgList] = useState([]);
const [grpmambers, setGrpMambers] = useState([]);
const [msg, setMsg] = useState("");

const [captureImage, setCaptureImage] = useState("");
const chooseFile = useRef(null);
const scrollMsg = useRef(null);
const [audioUrl, setAudioUrl] = useState("");
const [blob, setBlob] = useState("");
const [showAudio, setShowAudio] = useState(false);
const [showemoji, setShowEmoji] = useState(false);

const activeChatName = useSelector ((active) => active.activechat.active);
const user = useSelector ((users) => users.LogIn.login);
const db = getDatabase();
const storage = getStorage();




// camera capture funtiion

  function handleTakePhoto (dataUri) {

    setCaptureImage(dataUri);

    const storageRef = ref(storage, uuidv4());
    uploadString(storageRef, dataUri, 'data_url').then((snapshot) => {

      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "SingleMsg")), {

          whosendname: user.displayName,
          whosendid : user.uid,
          // whosendprofilepic : user.photoURL,
      
          whorecivername : activeChatName.name,
          whoreciverid : activeChatName.id,
          // whoreciverprofilePicture : item.profilePicture,
        
          img:  downloadURL,
          date :  `${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}  ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,
      
          });
      }).than(()=> {
        opencam(false);
      })
    });
    
  }




  /// send Massege

 const handleSendMsg = () => {
 if (activeChatName?.status == "Single") {
  set(push(ref(db, "SingleMsg")), {

    whosendname: user.displayName,
    whosendid : user.uid,
    // whosendprofilepic : user.photoURL,

    whorecivername : activeChatName?.name,
    whoreciverid : activeChatName?.id,
    // whoreciverprofilePicture : item.profilePicture,
  
    msg :  msg,
    date :  `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}  ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,

    })
 }
 
 else {

  set(push(ref(db, "grupmsg")), {

    whosendname: user.displayName,
    whosendid : user.uid,
    // whosendprofilepic : user.photoURL,

    whorecivername : activeChatName?.name,
    whoreciverid : activeChatName?.id,
    // whoreciverprofilePicture : item.profilePicture,

    adminid : activeChatName?.adminid,
    adminname : activeChatName?.adminname,
  
    msg :  msg,
    date :  `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}  ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,

    })
 }
 };



 
 // get single massgae

 useEffect(() => {
  const starCountRef = ref(db, "SingleMsg/");
  onValue(starCountRef, (snapshot) => {
    let singlemsgArr = [];
    snapshot.forEach((item) => {
    if (item.val().whosendid == user.uid && item.val().whoreciverid == activeChatName.id 
    ||
    item.val().whoreciverid == user.uid && item.val().whosendid == activeChatName.id
    ) {
      singlemsgArr.push(item.val());
    }
    setMsglist(singlemsgArr);
    });
  });
}, [activeChatName?.id]);




 // get grup mamber massgae

 useEffect(() => {
  const starCountRef = ref(db, "groupmembers/");
  onValue(starCountRef, (snapshot) => {
    let membersArr = [];
    snapshot.forEach((item) => {
      membersArr.push(item.val().groupid + item.val().userid)
    });
    setGrpMambers(membersArr);
  });

}, [activeChatName?.id]);



 // get admin grup massgae

 useEffect(() => {
  const starCountRef = ref(db, "grupmsg/");
  onValue(starCountRef, (snapshot) => {
    let grupmsgArr = [];
    snapshot.forEach((item) => {
      grupmsgArr.push(item.val());
    });
    setGrupMsgList(grupmsgArr);
  });
 
}, [activeChatName?.id]);



// fileupload


const handleImageUpload = (e) => {
 
  const storageRef = sref(storage, e.target.files[0].name);

const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress =
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      set(push(ref(db, "SingleMsg")), {

        whosendname: user.displayName,
        whosendid : user.uid,
        // whosendprofilepic : user.photoURL,
    
        whorecivername : activeChatName.name,
        whoreciverid : activeChatName.id,
        // whoreciverprofilePicture : item.profilePicture,
      
        img :  downloadURL,
        date :  `${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}  ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,
    
        });
    });
  }
);
};

const handleEnterPress = (e) =>  {
 if ( e.key == "Enter") {
  handleSendMsg ();
 }
}

// for Audio 

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  setAudioUrl(url);
  setBlob(blob);
  // const audio = document.createElement("audio");
  // audio.src = url;
  // audio.controls = true;
  // document.body.appendChild(audio);
};

const handleAUdioUpload = () => {
  
  const audiostorageRef = sref(storage, audioUrl);
// 'file' comes from the Blob or File API
uploadBytes(audiostorageRef, blob).then((snapshot) => {
  getDownloadURL(audiostorageRef).then((downloadURL) => {

    set(push(ref(db, "SingleMsg")), {

      whosendname: user.displayName,
      whosendid : user.uid,
      // whosendprofilepic : user.photoURL,
  
      whorecivername : activeChatName.name,
      whoreciverid : activeChatName.id,
      // whoreciverprofilePicture : item.profilePicture,
    
      audio :  downloadURL,
      date :  `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}  ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,
  
      }).then(()=>{
        setAudioUrl("")
      })

})
});
}

 
// Emoji Selete 

const handleEmojiSelect = (emoji) => {
  setMsg(msg + emoji.emoji )
} 

// scrolmsg

useEffect (()=>{
  scrollMsg?.current?.scrollIntoView({ behavior: "smooth"});
},[msgList]);




  return (
    <>
    
    <div className='chatting_box'>

   

 <div className='active_user_status'>
    <div className="user_img">
        <div className="img"></div>
        <div className="info">
            <h4>{activeChatName?.name}</h4>
            <span>Online</span>
        </div>
    </div>
    <div className='info_bar'>
        <BsThreeDotsVertical/>
    </div>
</div> 


<div className="scroll  ">


<div className='message'>

{
  activeChatName?.status == "Single" ? 
  
  msgList.map((item,i)=>(
    
    <div ref={scrollMsg} key={i} >
      {
        item.whosendid == user.uid ? 

        item.msg ? 
        
        <>
        <div className='right_msg' key={i}>
            <div className="right_text">
             <p>{item.msg}</p>
              </div>
              <span>
              {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
              </span>
            </div>
        </>
    
        : 
    
       item.img ?
    
       <div className='right_msg'>
       <div className='right_img'>
       <ModalImage small={item.img} large={item.img}/>
       </div>
           <span>{moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}</span>
         </div>
     :
    
     <div className='right_msg'>
    <audio controls src={item.audio}></audio>
              <span>{moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}</span>
            </div>
        
        : item.msg?
    
            <div className='left_msg' key={i}>
            <div className="left_text">
             <p>{item.msg}</p>
              </div>
              <span>
              {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
              </span>
            </div>
    
        :
    
       item.img? 
    
       <div className='left_msg'>
       <div className='left_img'>
       <ModalImage small={item.img} large={item.img}/>
       </div>
           <span>{moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}</span>
         </div>
    
         :
    
          <div className='right_msg'>
    <audio controls src={item.audio}></audio>
              <span>{moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}</span>
            </div>
      }
    </div>
    
 
  ))


  : 

// {/* <div>
// <Lottie animationData={conversation} />
// </div> */}

user?.uid == activeChatName?.adminid || grpmambers.includes(activeChatName?.id + user.uid)

?  

grupmsgList.map((item, i) => (

<div key={i}>

{
    item.whosendid == user.uid
    ?  item.whoreciverid == activeChatName?.id && 

    <div className='right_msg'>
    <div className="right_text">
     <p>{item.msg}</p>
      </div>
      <span>
      {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
      </span>
    </div>

    : 

    item.whoreciverid == activeChatName?.id && 

    <div className='left_msg' key={i}>
    <div className="left_text">
     <p>{item.msg}</p>
      </div>
      <span>
      {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
      </span>
    </div>
    
    
}

</div>

))

:
"nai"

}

    {/* left Message start */}
    {/* <div className='left_msg'>
        <div className="left_text">
         <p> Hlw Brother How Are You!</p>
          </div>
          <span>Today, 2:01pm</span>
        </div>  */}
  {/* left Message End */}


  {/* Right Message start */}
      {/* <div className='right_msg'>
        <div className="right_text">
         <p>I'm Fine Thank You. What About You?</p>
          </div>
          <span>Today, 2:10pm</span>
        </div>  */}
   {/* Right Message End */}


  {/* left Message start */}
      {/* <div className='left_msg'>
      <div className='left_img'>
      <ModalImage
  small={"/img/demochatimg.jpg"}
  large={"/img/demochatimg.jpg"}
  // alt="Hello World!"
/>
      </div>
          <span>Today, 3:01pm</span>
        </div>  */}
  {/* left Message End */}


{/* Right Message start */}
{/* <div className='right_msg'>
<div className='right_img'>
  
<ModalImage
  small={"/img/demochatimg.jpg"}
  large={"/img/demochatimg.jpg"}
  // alt="Hello World!"
/>
  
      </div>
          <span>Today, 4:10pm</span>
        </div>  */}
   {/* Right Message End */}


{/* Right Message start */}
{/* <div className='right_msg'>
<audio controls></audio>
          <span>Today, 4:10pm</span>
        </div>  */}
   {/* Right Message End */}

  {/* left Message start */}
  {/* <div className='left_msg'>
  <video controls></video>
          <span>Today, 3:01pm</span>
        </div>  */}
  {/* left Message End */}

</div>

{

  activeChatName?.status == "Single"
  
  ?  
  
  <div className="message_inputs">
   
   {
     !showAudio && !audioUrl && 
   
   <div className="text_inputs">
   
   <input type="text" onKeyUp={handleEnterPress} onChange={(e) => setMsg(e.target.value)} value={msg} />
   
   <div className="emoji" onClick={()=>setShowEmoji(!showemoji)}>
     <BsEmojiSmile/>
   </div>
   
   {
     showemoji && 
   
   <div className="emoji_picker">
   <EmojiPicker onEmojiClick={handleEmojiSelect}  />
   </div>
   }
   
   <div className="options" >
   
    <div className='options_icon'>
    <div onClick={()=>setopen(!open)}><BsPlusLg /></div>
    </div>
   
   
   
     {
   
       open && <div className="more">
   
       <div className='camera'>
   <div onClick={()=> setOpenCam(true)}><CiCamera/></div>
   </div>
   
   <div className='gal' onClick={()=> chooseFile.current.click()}>
   <div >
     <TfiGallery/>
      </div>
      <input hidden type='file' ref={chooseFile} onChange={handleImageUpload} />
   </div>
   
   
       <div className='voice_rec'>
   <div>
     <MdKeyboardVoice/>
     
      </div>
      
   </div>
   
   
       </div>
     }
     
     </div> 
   </div>
   
   }
   
   {
     audioUrl && 
   (
     <>
     <div className='audio_wrapper'>
     <audio controls src={audioUrl}></audio>
   
     <div className='send_audio' onClick={handleAUdioUpload}>
     <Button  variant="contained">Send</Button>
   
     </div>
   
     <div className='delete_audio' onClick={() => setAudioUrl("")}>
     <Button  variant="contained">Delete</Button>
     </div>
   
     </div>
     </>
   )
   }
   
   
   <div className='recoder_btn' onClick={()=>setShowAudio(!showAudio)}>
   <AudioRecorder onRecordingComplete={(blob) => addAudioElement(blob) }/>
   </div>
   
    {
     !showAudio && !audioUrl && 
   
     <Button variant="contained" onClick={handleSendMsg}><FaTelegramPlane /></Button>
    }
   
   </div> 

  : 
  
 user?.uid == activeChatName?.adminid || grpmambers.includes(activeChatName?.id + user.uid)

?

<div className="message_inputs">
   
   {
     !showAudio && !audioUrl && 
   
   <div className="text_inputs">
   
   <input type="text" onKeyUp={handleEnterPress} onChange={(e) => setMsg(e.target.value)} value={msg} />
   
   <div className="emoji" onClick={()=>setShowEmoji(!showemoji)}>
     <BsEmojiSmile/>
   </div>
   
   {
     showemoji && 
   
   <div className="emoji_picker">
   <EmojiPicker onEmojiClick={handleEmojiSelect}  />
   </div>
   }
   
   <div className="options" >
   
    <div className='options_icon'>
    <div onClick={()=>setopen(!open)}><BsPlusLg /></div>
    </div>
   
   
   
     {
   
       open && <div className="more">
   
       <div className='camera'>
   <div onClick={()=> setOpenCam(true)}><CiCamera/></div>
   </div>
   
   <div className='gal' onClick={()=> chooseFile.current.click()}>
   <div >
     <TfiGallery/>
      </div>
      <input hidden type='file' ref={chooseFile} onChange={handleImageUpload} />
   </div>
   
   
       <div className='voice_rec'>
   <div>
     <MdKeyboardVoice/>
     
      </div>
      
   </div>
   
   
       </div>
     }
     
     </div> 
   </div>
   
   }
   
   {
     audioUrl && 
   (
     <>
     <div className='audio_wrapper'>
     <audio controls src={audioUrl}></audio>
   
     <div className='send_audio' onClick={handleAUdioUpload}>
     <Button  variant="contained">Send</Button>
   
     </div>
   
     <div className='delete_audio' onClick={() => setAudioUrl("")}>
     <Button  variant="contained">Delete</Button>
     </div>
   
     </div>
     </>
   )
   }
   
   
   <div className='recoder_btn' onClick={()=>setShowAudio(!showAudio)}>
   <AudioRecorder onRecordingComplete={(blob) => addAudioElement(blob) }/>
   </div>
   
    {
     !showAudio && !audioUrl && 
   
     <Button variant="contained" onClick={handleSendMsg}><FaTelegramPlane /></Button>
    }
   
   </div> 


:

"NAI"

}




</div>







{
    opencam && 
    <div className='capture_image'>
      <div className="close" onClick={()=> setOpenCam(false)}><RxCross1/></div>
      <Camera
    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    isFullscreen = {false}
  />
    </div>
  }
    
    </div>
    </>
    
  )
}

export default Chatting;