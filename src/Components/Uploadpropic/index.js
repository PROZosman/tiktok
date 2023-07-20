import React, { useRef, useState } from 'react'
import "./style.css"
import { BsImages } from 'react-icons/bs'
import ImageCropper from './ImageCropper'
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { LogingUser } from '../../features/counter/UserSlice';



const Uploadpropic = ({ setOpen }) => {


    const auth = getAuth();
    const users = useSelector((user) => user.LogIn.login);

    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const choosefile = useRef(null);
    const storage = getStorage();
    const storageRef = ref(storage, users.uid);
    const dispatch = useDispatch();



    const handleUploadpropic = (e) => {

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            const message4 = (cropper.getCroppedCanvas().toDataURL());
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {

                getDownloadURL(storageRef).then((downloadURL) => {

                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    }).then(() => {
                        setOpen(false);
                        dispatch(LogingUser({ ...users, photoURL: downloadURL }))
                        localStorage.setItem("users", JSON.stringify({ ...users, photoURL: downloadURL }));
                    });
                });
            });
        }

    };

    return (
        <>
            <div className="Upload_box">

                <input type="file" hidden ref={choosefile} onChange={handleUploadpropic} />

                <div className="upload" onClick={() => choosefile.current.click()}>
                    <div className="upload_icon">
                        <BsImages />
                    </div>
                    <p>Upload Photo</p>
                </div>
                {
                    image && <ImageCropper image={image} setImage={setImage} setCropper={setCropper} getCropData={getCropData} />
                }
            </div>
        </>
    )
}

export default Uploadpropic;
