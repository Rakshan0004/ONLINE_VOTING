import React, {useState, useEffect, useCallback, useContext} from 'react'
import { useRouter } from 'next/router';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';
import { VotingContext } from '@/context/voter';
import Style from '@/styles/allowedVoters.module.css';
//import images from '@/assets';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';


const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const {uploadToIPFS, createVoter} = useContext(VotingContext);

  // voter image drop
  const onDrop = useCallback(async (acceptedFile)=>{
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  })

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });



  // starting jsx part
  return (
    <div className={Style.createVoter}>
      <div>
      {fileUrl && (
        <div className={Style.voterInfo}>
          <img src={fileUrl} alt="Voter Image" />
          <div className={Style.voterInfo_paragraph}>
            <p>
              Name: <span>&nbps; {formInput.name}</span>
            </p>
            <p>
              Address: &nbps; <span>{formInput.address.slice(0, 20)}</span>
            </p>
            <p>
              Position: &nbps; <span>\{formInput.position}</span>
            </p>
            
          </div>
        </div>
        
      )}
      {
        !fileUrl && (
          <div className={Style.sideInfo}>
          <div className={Style.sideInfo_box}>
            <h4>Create candidate for Voting</h4>
            <p>
              Blockchain voting organization, provide ethereum eco system
            </p>
            <p className={Style.sideInfo_para}>Contract Candidate</p>
          </div>
      
          <div className={Style.car}>
            {voterArray.map((ei, i) => (
              <div key={i + 1} className={Style.card_box}>
                <div className={Style.image}>
                  <img src="" alt= "Profile photo"/>
                </div>
                <div className={Style.card_info}>
                  <p>Name</p>
                  <p>Address</p>
                  <p>Details</p>
                </div>
                </div>
            ))}
            </div> 
          </div>
          )}
            </div> 
      <div className={StyleRegistry.voter}>
        <div className={Style.voter__container}>
          <h1>Create Ndw Voter </h1>
          <div className={Style.voter__container__box}>
          <div className={Style.voter__container__box__div}>
            <div {...getRootProps()}>
              <input {...getInputProps()}/>

              <div className={Style.voter__container__box__div__info}>
                <p>Upload file: JPG, PNG, GIF, WEBM Max 10MB </p>

                <div className={Style.voter__container__box__div__image}>
                  <Image src={Image.upload} width={150} height={150} objectFit="containt" alt="File upload"
                  />
                </div>
                <p>Drag & Drop File</p>
                <p>or browse Media on you device</p>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className={Style.input__container}>
          <Input 
          inputType="text" 
          title= "Name" 
          placeholder = "Voter Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input 
          inputType="text" 
          title= "Address" 
          placeholder = "Voter Address"
          handleClick={(e) =>
            setFormInput({ ...formInput, address: e.target.value })
          }
        />
        <Input 
          inputType="text" 
          title= "Position" 
          placeholder = "Voter Position"
          handleClick={(e) =>
            setFormInput({ ...formInput, position: e.target.value })
          }
        />

        <div className={Style.Button}>
          <Button btnName = "Authorized Voter" 
          handleClick={() => createVoter(formInput, fileUrl, router)} />
        </div>
        </div> 
        </div> 

      {/*/////////////*/}
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>
          <Image src={ImageResponse.creator} alt="user Profile" />
          <p>Notice For Users</p>
          <p>
            Organizer <span>0x939939..</span>
          </p>
          <p>
            only organizer of the voting contract can create voter for voting election
          </p>
        </div>
      </div>
    </div>
  )
};

export default allowedVoters;
