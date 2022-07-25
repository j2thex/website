import { api } from '../../app/api';

export const transactionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchSingleTransaction: builder.mutation<
            { transaction: any },
            { bountyID: string; account: string }
        >({
            query(props) {
                return `/private/tx/bounty?bountyID=${props.bountyID}&&account=${props.account}`;
            },
        }),
        fetchReferralTransaction: builder.mutation<
            { transaction: any },
            { referralToken: string; account: string }
        >({
            query(props) {
                return `/private/tx/referral?token=${props.referralToken}&account=${props.account}`;
            },
        }),
        fetchMultipleTransactions: builder.mutation<
            { transaction: any },
            { bountyIDs: string[]; account: string }
        >({
            query(props) {
                return `/private/tx/bountyAll?bountyIDs=${props.bountyIDs}&account=${props.account}`;
            },
        }),
    }),
});

export const {
    useFetchSingleTransactionMutation,
    useFetchReferralTransactionMutation,
    useFetchMultipleTransactionsMutation,
} = transactionApi;
