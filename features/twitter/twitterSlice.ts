import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchIsUserSubscribedOnTwitter = createAsyncThunk<boolean, string>(
    'twitter/isSubscribedOnYellow',
    async (accountLink) => {
        const res = await fetch(
            `/api/v2/public/socials/twitter/isSubscribedOnYellow?accountLink=${accountLink}`
        ).then((data) => data.json());
        return res;
    }
);

export interface TwiiterState {
    isUserSubscribedOnYellow: boolean;
}

export const initialTwitterState: TwiiterState = {
    isUserSubscribedOnYellow: false,
};

const twitterSlice = createSlice({
    name: 'twitter',
    initialState: initialTwitterState,
    reducers: {
        setIsUserSubscribedOnYellow(state, action: PayloadAction<boolean>) {
            state.isUserSubscribedOnYellow = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchIsUserSubscribedOnTwitter.fulfilled,
            (state, action) => {
                state.isUserSubscribedOnYellow = action.payload;
            }
        );
    },
});

export const { setIsUserSubscribedOnYellow } = twitterSlice.actions;
export const twitterReducer = twitterSlice.reducer;
export default twitterSlice.reducer;
