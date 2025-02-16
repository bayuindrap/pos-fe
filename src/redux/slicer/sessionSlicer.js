// import {createSlice} from '@reduxjs/toolkit'
// // import BlowFish from 'egoroof-blowfish'
// import { Blowfish } from 'egoroof-blowfish';
// import {Base64} from 'js-base64'


// class EncryptBlowfish {
//     constructor(textToEncode,textToDecode) {
//       this.textEncode = textToEncode;
//       this.textDecode = textToDecode;
//       this.bf = new BlowFish('', BlowFish.MODE.ECB, BlowFish.PADDING.NULL)
//       this.bf.setIv('');
//     }
//     encrypt(){
//         const encoded = this.bf.encode(JSON.stringify(this.textEncode));
//         return encoded;
//     }
//     decrypt = ()=>{
//         const decoded =JSON.parse( this.bf.decode(this.textDecode, BlowFish.TYPE.STRING))
//         return decoded;
//     }
//   }


// const INITIAL_STATE = {
//     data:localStorage.getItem("data") == null? null:
//     JSON.parse(new EncryptBlowfish("",Base64.toUint8Array(localStorage.getItem("data"))).decrypt())
// };

// const sessionSlice = createSlice(
//     {
//         name:'session',
//         initialState:INITIAL_STATE,
//         reducers:{
//             addSession:(state,action)=>{
//                 const encryptBlowfishs = new EncryptBlowfish(JSON.stringify(action.payload.data),"").encrypt();
//                 const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
//                 localStorage.setItem('data',encryptBase64);
//                 state.data =JSON.parse(new EncryptBlowfish("",Base64.toUint8Array(localStorage.getItem("data"))).decrypt())  
//                 return state;
//             },
//             logout:(state,action)=>{
//                 localStorage.removeItem('data');
//                 state.data = INITIAL_STATE;
//                 return state;
//             },
//             updateToken:(state,action)=>{
//                 state.data.accessToken = action.payload.accessToken;
//                 const encryptBlowfishs = new EncryptBlowfish(JSON.stringify(state.data),"").encrypt();
//                 const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
//                 localStorage.setItem('data',encryptBase64);
//                 state.data =JSON.parse(new EncryptBlowfish("",Base64.toUint8Array(localStorage.getItem("data"))).decrypt())
//                 return state;
//             }
//         }
//     }
// );

// export const sessionAction = sessionSlice.actions;
// export const sessionSelector = (state) => state.session.data;
// export default sessionSlice

///////////////////////////////////////////////////////////////////111111111111//////////////////////////////

// import { createSlice } from '@reduxjs/toolkit';
// import { Blowfish } from 'egoroof-blowfish';
// import { Base64 } from 'js-base64';

// class EncryptBlowfish {
//   constructor(textToEncode = '', textToDecode = '') {
//     this.textEncode = textToEncode;
//     this.textDecode = textToDecode;
//     this.bf = new Blowfish('my-secret-key', Blowfish.MODE.ECB, Blowfish.PADDING.NULL); 

//     // IV hanya dibutuhkan untuk mode selain ECB
//     if (Blowfish.MODE.ECB !== Blowfish.MODE.ECB) {
//       this.bf.setIv('');
//     }
//   }

//   encrypt() {
//     try {
//       const encoded = this.bf.encode(JSON.stringify(this.textEncode), Blowfish.TYPE.UINT8_ARRAY);
//       return encoded;
//     } catch (error) {
//       console.error('Encryption Error:', error);
//       return null;
//     }
//   }

  

//   decrypt() {
//     try {
//       const decoded = JSON.parse(this.bf.decode(this.textDecode, Blowfish.TYPE.STRING));
//       return decoded;
//     } catch (error) {
//       console.error('Decryption Error:', error);
//       return null;
//     }
//   }
// }

// // Mendapatkan data dari localStorage dengan aman
// const getStoredData = () => {
//   try {
//     const storedData = localStorage.getItem("data");
//     if (!storedData) return null;
//     return JSON.parse(new EncryptBlowfish("", Base64.toUint8Array(storedData)).decrypt());
//   } catch (error) {
//     console.error('Error parsing stored data:', error);
//     return null;
//   }
// };

// const INITIAL_STATE = {
//   data: getStoredData(),
// };

// const sessionSlice = createSlice({
//   name: 'session',
//   initialState: INITIAL_STATE,
//   reducers: {
//     addSession: (state, action) => {
//       try {
//         const encryptBlowfishs = new EncryptBlowfish(JSON.stringify(action.payload.data), "").encrypt();
//         if (!encryptBlowfishs) throw new Error('Encryption failed');

//         const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
//         localStorage.setItem('data', encryptBase64);
        
//         state.data = JSON.parse(new EncryptBlowfish("", Base64.toUint8Array(encryptBase64)).decrypt());
//       } catch (error) {
//         console.error('Error in addSession:', error);
//       }
//     },
    
//     logout: (state) => {
//       localStorage.removeItem('data');
//       state.data = null;
//     },
    
//     updateToken: (state, action) => {
//       try {
//         if (state.data) {
//           state.data.accessToken = action.payload.accessToken;
          
//           const encryptBlowfishs = new EncryptBlowfish(JSON.stringify(state.data), "").encrypt();
//           if (!encryptBlowfishs) throw new Error('Encryption failed');

//           const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
//           localStorage.setItem('data', encryptBase64);

//           state.data = JSON.parse(new EncryptBlowfish("", Base64.toUint8Array(encryptBase64)).decrypt());
//         }
//       } catch (error) {
//         console.error('Error in updateToken:', error);
//       }
//     }
//   }
// });

// export const sessionAction = sessionSlice.actions;
// export const sessionSelector = (state) => state.session.data;
// export default sessionSlice;

import { createSlice } from '@reduxjs/toolkit';
import { Blowfish } from 'egoroof-blowfish';
import { Base64 } from 'js-base64';

class EncryptBlowfish {
  constructor(textToEncode = '', textToDecode = '') {
    this.textEncode = textToEncode;
    this.textDecode = textToDecode;
    this.bf = new Blowfish('my-secret-key', Blowfish.MODE.ECB, Blowfish.PADDING.SPACE); // Ganti padding ke SPACE agar tidak NULL

    // IV hanya dibutuhkan untuk mode selain ECB
    if (Blowfish.MODE.ECB !== Blowfish.MODE.ECB) {
      this.bf.setIv('');
    }
  }

  encrypt() {
    try {
      const encoded = this.bf.encode(JSON.stringify(this.textEncode), Blowfish.TYPE.UINT8_ARRAY);
      if (!encoded) throw new Error('Encryption failed');

      // console.log('Encrypted Uint8Array:', encoded);
      return encoded;
    } catch (error) {
      // console.error('Encryption Error:', error);
      return null;
    }
  }

  decrypt() {
    try {
      const decodedString = this.bf.decode(this.textDecode, Blowfish.TYPE.STRING);
      if (!decodedString) throw new Error('Decryption returned empty result');

      // console.log('Decrypted String:', decodedString);

      return JSON.parse(decodedString);
    } catch (error) {
      console.error('Decryption Error:', error);
      return null;
    }
  }
}

// Mendapatkan data dari localStorage dengan aman
const getStoredData = () => {
  try {
    const storedData = localStorage.getItem("data");
    if (!storedData) return null;

    // console.log('Stored Base64 Data:', storedData);

    const decryptedData = new EncryptBlowfish("", Base64.toUint8Array(storedData)).decrypt();
    // console.log('Decrypted JSON Data:', decryptedData);

    return decryptedData;
  } catch (error) {
    console.error('Error parsing stored data:', error);
    return null;
  }
};

const INITIAL_STATE = {
  data: getStoredData(),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_STATE,
  reducers: {
    addSession: (state, action) => {
      try {
        const encryptBlowfishs = new EncryptBlowfish(action.payload.data, "").encrypt();
        if (!encryptBlowfishs) throw new Error('Encryption failed');

        const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
        // console.log('Encrypted Base64:', encryptBase64);

        localStorage.setItem('data', encryptBase64);

        state.data = new EncryptBlowfish("", Base64.toUint8Array(encryptBase64)).decrypt();
      } catch (error) {
        console.error('Error in addSession:', error);
      }
    },
    
    logout: (state) => {
      localStorage.removeItem('data');
      state.data = null;
    },
    
    updateToken: (state, action) => {
      try {
        if (state.data) {
          state.data.accessToken = action.payload.accessToken;

          const encryptBlowfishs = new EncryptBlowfish(state.data, "").encrypt();
          if (!encryptBlowfishs) throw new Error('Encryption failed');

          const encryptBase64 = Base64.fromUint8Array(encryptBlowfishs, true);
          console.log('Updated Encrypted Base64:', encryptBase64);

          localStorage.setItem('data', encryptBase64);

          state.data = new EncryptBlowfish("", Base64.toUint8Array(encryptBase64)).decrypt();
        }
      } catch (error) {
        console.error('Error in updateToken:', error);
      }
    }
  }
});

export const sessionAction = sessionSlice.actions;
export const sessionSelector = (state) => state.session.data;
export default sessionSlice;

