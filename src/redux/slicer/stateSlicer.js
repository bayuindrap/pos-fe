import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    sidebarShow: true,
    sidebarUnfoldable:false
  }

const stateSlicer = createSlice(
    {
        name:'stateSlice',
        initialState:initialState,
        reducers:{
            changeState:(state,action)=>{
                switch (action.payload.type) {
                    case 'setSideBarShow':
                        state.sidebarShow = action.payload.sidebarShow;
                      return state;
                      case 'sidebarUnfoldable':
                        state.sidebarUnfoldable = action.payload.sidebarUnfoldable;
                      return state;
                    default:
                      return state;
                }
            }
        }
    }
);

// const initialState = {
//   sidebarShow: true,  // Pastikan nilai default benar
//   sidebarUnfoldable: false,
// };

// const stateSlicer = createSlice({
//   name: 'stateSlice',
//   initialState,
//   reducers: {
//     changeState: (state, action) => {
//       switch (action.payload.type) {
//         case 'setSideBarShow':
//           console.log("Changing sidebarShow to:", action.payload.sidebarShow)
//           state.sidebarShow = action.payload.sidebarShow;
//           break;
//         case 'sidebarUnfoldable':
//           state.sidebarUnfoldable = action.payload.sidebarUnfoldable;
//           break;
//         default:
//           break;
//       }
//     },
//   },
// });

export const stateAction = stateSlicer.actions;
export default stateSlicer;


// export const stateAction = stateSlicer.actions;
// export default stateSlicer