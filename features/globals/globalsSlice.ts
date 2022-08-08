import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalsState {
    isRewardsClaimProcessing: boolean;
    isPhoneOtpCompleted: boolean;
    claimableAmount: number;
    isSessionCookie: boolean;
}

export const initialGlobalsState: GlobalsState = {
    isRewardsClaimProcessing: false,
    isPhoneOtpCompleted: false,
    claimableAmount: 0,
    isSessionCookie: false,
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
        setIsSessionCookie(state, action: PayloadAction<boolean>) {
            state.isSessionCookie = action.payload;
        },
    },
});

export const { setIsRewardsClaimProcessing, setIsPhoneOtpCompleted, setIsSessionCookie } = globalsSlice.actions;
export const globalsReducer = globalsSlice.reducer;
export default globalsSlice.reducer;
