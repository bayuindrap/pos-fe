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

export const stateAction = stateSlicer.actions;
export default stateSlicer;