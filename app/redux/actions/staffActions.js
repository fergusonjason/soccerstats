// /app/redux/actions/staffActions.js

import {queryPromise, executePromise } from "./../../util/DbUtils";
import {isLoadingData} from "./utilityActions";
import { DELETE_STAFF_MEMBER, EDIT_STAFF_MEMBER, ADD_STAFF_MEMBER, GET_STAFF_MEMEBER, GET_ALL_STAFF } from "./actionTypes";

export function getAllStaffMembers() {

    return (dispatch) => {

        let sql = "SELECT * FROM STAFF";
        let params = [];

        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllStaffMembersSuccess(queryResults.result));
            })

    }
}

export function getAllStaffMembersSuccess(staffMembers) {

    return {
        type: GET_ALL_STAFF,
        staffMembers: staffMembers
    }
}

//export function getAllStaffMembersError() {}

export function getStaffMemberById(staffId) {

    return (dispatch) => {

        let sql = "SELECT * FROM STAFF WHERE STAFF_ID = ?";
        let params = [staffId];

        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                console.log(`query results: ${JSON.stringify(queryResults)}`);
                dispatch(getStaffMembersByIdSuccess(queryResults.result[0]));
            });

    }
}

export function getStaffMembersByIdSuccess(staffMember) {

    return {
        type: GET_STAFF_MEMEBER,
        staffMember: staffMember
    }
}

//export function getStaffMembersByIdError() {}

export function addStaffMember(staffMember) {

    return (dispatch) => {

        let sql = "INSERT INTO STAFF(STAFF_LAST_NAME, STAFF_FIRST_NAME, STAFF_EMAIL, STAFF_CELL) VALUES (?,?,?,?)";
        let params = [staffMember.STAFF_LAST_NAME, staffMember.STAFF_FIRST_NAME, 
            staffMember.STAFF_EMAIL, staffMember.STAFF_CELL];

        dispatch(isLoadingData(true));

        executePromise(sql, params) 
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllStaffMembers());
            })
    }
}

export function addStaffMemberSuccess(staffMember) {

    return {
        type: ADD_STAFF_MEMBER,
        staffMember: staffMember
    }
}

//export function addStaffMemberError() {}

export function editStaffMember(staffMember) {

    return (dispatch) =>{
        const sql = "UPDATE STAFF SET STAFF_LAST_NAME = ?, STAFF_FIRST_NAME = ?, STAFF_EMAIL = ?, STAFF_CELL = ? WHERE STAFF_ID = ?";
        let params = [staffMember.STAFF_LAST_NAME, staffMember.STAFF_FIRST_NAME, staffMember.STAFF_EMAIL, 
            staffMember.STAFF_CELL, staffMember.STAFF_ID];
        
        dispatch(isLoadingData(true));

        executePromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllStaffMembers());
            })


    }
}

export function editStaffMemberSuccess(staffMember) {

    return {
        type: EDIT_STAFF_MEMBER,
        staffMember: staffMember
    }
}

//export function editStaffMemberError() {}

export function deleteStaffMember(memberId) {

    return (dispatch) => {

        const sql = "DELETE FROM STAFF WHERE STAFF_ID = ?";
        let params = [memberId];

        dispatch(isLoadingData(true));
        executePromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
            }).then(() => {
                dispatch(getAllStaffMembers());
            })
    }
}

export function deleteStaffMemberSuccess(memberId) {

    return {
        type: DELETE_STAFF_MEMBER,
        memberId: memberId
    }
}

//export function deleteStaffMemberError() {}