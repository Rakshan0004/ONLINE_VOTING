import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import { VotingAddress, VotingAddressABI} from './constants';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


const fetchContract = (signerOrProvider) => {
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);
};

export const VotingContext = React.createContext();

export const VotingProvider = ({children}) => {
  const votingTitle = "Test title";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  const [error, setError] = useState('');
  const highestVote = [];

  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);

  //connecting metamask wallet
  const checkIfWalletIsConnected = async () => {
    if(!window.ethereum){
      return setError("Please Install Metamask");
    };
    const account = await window.ethereum.request({method: "eth_accounts"});
    if(account.length){
      setCurrentAccount(account[0]);
    }else{
      setError("Please Install Metamask, Connect and Reload");
    }
  };

  const connectWallet = async () => {
    if(!window.ethereum){
      return setError("Please Install Metamask");
    };
    const account = await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(account[0]);
  };

  // upload to ipfs voter image
  const uploadToIPFS = async (file) => {
    try{
      const added = await client.add({content: file});
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    }catch(error){
      setError("Error uploading to IPFS");
    }
  };

  // create voter

  const createdVoter = async(formInput, fileUrl, router)=>{
    try {
      const {name, address, position} = formInput;
      
      if(!name || !address || !position) 
      return setError("Input data is missing");

      //connecting smart contract 

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      

      const data = JSON.stringify({name, address, position, image: fileUrl});
      const added = await client.add(data);

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      
      const voter = await contract.voterRight(address, name, url, fileUrl);
      voter.wait();

      
      router.push("/voterList");
    } catch(error){
      console.log(error);
    }
  }

  return (
  <VotingContext.Provider value={{votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS,
  }}
  >
    {children}
  </VotingContext.Provider>
  )
};


const voter = () => {
  return (
    <div>
      
    </div>
  )
}