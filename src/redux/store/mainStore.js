import {configureStore} from '@reduxjs/toolkit';
import sessionSlice from '../slicer/sessionSlicer';
import stateSlicer from '../slicer/stateSlicer';

const mainStore = configureStore({
    reducer: {session:sessionSlice.reducer,stateSlice:stateSlicer.reducer}
});

export default mainStore;