import React from 'react';
import Cropper from "react-cropper";
import { AiOutlineClose } from 'react-icons/ai';
import Button from '@mui/material/Button';


const ImageCropper = ({ image, setImage, setCropper, getCropData }) => {


    return (
        <>

            <div className="cropimage_box">

                <div className="upload_header">
                    <h4>Upload Profile Picture</h4>
                    <div className="close" onClick={() => setImage()}>
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="preview">
                    <div
                        className="img-preview"
                        style={{ width: "100%", float: "left", height: "300px" }}
                    />
                </div>
                <div className="crop_images">
                    <Cropper
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                </div>
                <div className="upload_btn" onClick={getCropData}>
                    <Button variant="contained">Upload Now</Button>
                </div>
            </div>
        </>
    )
}

export default ImageCropper;
