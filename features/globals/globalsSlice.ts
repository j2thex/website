import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalsState {
    isRewardsClaimProcessing: boolean;
    isPhoneOtpCompleted: boolean;
    claimableAmount: number;
}

export const initialGlobalsState: GlobalsState = {
    isRewardsClaimProcessing: false,
    isPhoneOtpCompleted: false,
    claimableAmount: 0,
};

const globalsSlice = createSlice({
    name: 'alerts',
    initialState: initialGlobalsState,
    reducers: {
        setIsRewardsClaimProcessing(state, action: PayloadAction<boolean>) {
            state.isRewardsClaimProcessing = action.payload;
        },
        setIsPhoneOtpCompleted(state, action: PayloadAction<boolean>) {
            state.isPhoneOtpCompleted = action.payload;
        },
        setClaimableAmount(state, action: PayloadAction<number>) {
            state.claimableAmount = action.payload;
        },
    },
});

export const { setIsRewardsClaimProcessing, setIsPhoneOtpCompleted } = globalsSlice.actions;
export const globalsReducer = globalsSlice.reducer;
export default globalsSlice.reducer;
