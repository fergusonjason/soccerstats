// /app/redux/reducers/staffReducer.js

import { GET_ALL_STAFF, GET_STAFF_MEMEBER } from "../actions/actionTypes";

export function staffMembers(state = [], action) {

    switch (action.type) {
        case GET_ALL_STAFF:
            return action.staffMembers;
        default: 
            return state;
    }
}

export function staffMember(state = {}, action) {

    switch (action.type) {
        case GET_STAFF_MEMEBER:
            return action.staffMember;
        default:
            return state;
    }
}