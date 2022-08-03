import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BountyProps {
    fid: string;
    description?: string;
    status?: string;
    title?: string;
    triggerPhrase?: string;
    value?: number;
    limit?: number;
    additionalData: any;
}

export interface UpdateBountyProps {
    fid: string;
    bounty: BountyProps;
}

export interface BountiesState {
    bounties: BountyProps[];
    isInitialized: boolean;
}

export const initialBountiesState: BountiesState = {
    bounties: [],
    isInitialized: false,
};

const bountiesSlice = createSlice({
    name: 'bounties',
    initialState: initialBountiesState,
    reducers: {
        setBountiesArray(state, action: PayloadAction<BountyProps[]>) {
            state.bounties = action.payload;
            if (action.payload.length) {
                state.isInitialized = true;
            }
        },
        updateBountyByFid(state, action: PayloadAction<UpdateBountyProps>) {
            const id = state.bounties.findIndex(bounty => bounty.fid == action.payload.fid);
            if (id !== -1) {
                state.bounties[id] = action.payload.bounty;
            }
        },
    },
});

export const { setBountiesArray, updateBountyByFid } = bountiesSlice.actions;
export const bountiesReducer = bountiesSlice.reducer;
export default bountiesSlice.reducer;
