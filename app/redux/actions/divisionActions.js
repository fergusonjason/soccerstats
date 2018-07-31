// /app/redux/actions/divisionActions.js

import { ADD_DIVISION_SUCCESS, GET_ALL_DIVISIONS_SUCCESS, GET_DIVISION_SUCCESS, EDIT_DIVISION_SUCCESS, DELETE_DIVISION_SUCCESS } from "./actionTypes";
import {queryPromise, executePromise } from "./../../util/DbUtils";
import {isLoadingData} from "./utilityActions";

export function getAllDivisions(programId) {

    //console.log(`Entered getAllDivisions, programId: ${programId}`);

    return (dispatch) => {
        let sql = "SELECT * FROM DIVISION WHERE DIVISION_PROGRAM_ID=?";
        let params = [programId];

        dispatch(isLoadingData(true));

        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllDivisionsSuccess(queryResults.result));
            });
    }
}

export function getAllDivisionsSuccess(divisions) {
    return {
        type: GET_ALL_DIVISIONS_SUCCESS,
        divisions: divisions
    }
}

//export function getAllDivisionsError() {}

export function getDivision(divisionId) {
    return (dispatch) => {
        let sql = "SELECT * FROM DIVISION WHERE DIVISION_ID=?";
        let params = [divisionId];
    }
}

export function getDivisionSuccess(division) {
    return {
        type: GET_DIVISION_SUCCESS,
        division: division
    }
}

//export function getDivisionError() {}

export function addDivision(division) {
    return (dispatch) => {
        let sql = "INSERT INTO DIVISION (DIVISION_NAME) VALUES (?)";
        let params = [];
    }
}

export function addDivisionSuccess(division) {
    return {
        type: ADD_DIVISION_SUCCESS,
        division: division
    }
}

//export function addDivisionError() {}

export function editDivision(division) {
    return (dispatch) => {
        let sql = "UPDATE DIVISION SET DIVISION_ID=? WHERE DIVISION_ID = ?";
        let params = [];
    }
}

export function editDivisionSuccess(division) {
    return {
        type: EDIT_DIVISION_SUCCESS,
        division: division
    }
}

//export function editDivisionError() {}

export function deleteDivision(divisionId) {
    return (dispatch) => {
        let sql = "DELETE FROM DIVISION WHERE DIVISION_ID = ?";
        let params = [divisionId];
    }
}

export function deleteDivisionSuccess(divisionId) {
    return {
        type: DELETE_DIVISION_SUCCESS,
        divisionId: divisionId
    }
}

//export function deleteDivisionError() {}