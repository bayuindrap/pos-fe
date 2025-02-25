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
    this.bf = new Blowfish('my-secret-key', Blowfish.MODE.ECB, Blowfish.PADDING.SPACE); 


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
      return null;
    }
  }

  decrypt() {
    try {
      const decodedString = this.bf.decode(this.textDecode, Blowfish.TYPE.STRING);
      if (!decodedString) throw new Error('Decryption returned empty result');

    

      return JSON.parse(decodedString);
    } catch (error) {
      console.error('Decryption Error:', error);
      return null;
    }
  }
}


const getStoredData = () => {
  try {
    const storedData = localStorage.getItem("data");
    if (!storedData) return null;


    const decryptedData = new EncryptBlowfish("", Base64.toUint8Array(storedData)).decrypt();
   
    return decryptedData;
  } catch (error) {
    console.error('Error parsing stored data:', error);
    return null;
  }
};

const getStoredToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
};

const getStoredRefreshToken = () => {
  try {
    return localStorage.getItem('refreshToken') || null;
  } catch (error) {
    console.error('Error getting stored refreshToken:', error);
    return null;
  }
};

const INITIAL_STATE = {
  data: getStoredData(),
  token: getStoredToken(),
  refreshToken: getStoredRefreshToken()
};


const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_STATE,
  reducers: {
    addSession: (state, action) => {
      try {
        const { data, token, refreshToken } = action.payload;
    
        const encryptBlowfish = new EncryptBlowfish(data, "").encrypt();
        if (!encryptBlowfish) throw new Error('Encryption failed');

        const encryptBase64 = Base64.fromUint8Array(encryptBlowfish, true);
        localStorage.setItem('data', encryptBase64);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        state.data = new EncryptBlowfish("", Base64.toUint8Array(encryptBase64)).decrypt();
        state.token = token;
        state.refreshToken = refreshToken;

      } catch (error) {
        console.error('Error in addSession:', error);
      }
    },
    
    logout: (state) => {
      localStorage.removeItem('data');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.data = null;
      state.token = null;
      state.refreshToken = null;
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
export const sessionToken = (state) => state.session.token;
export default sessionSlice;

