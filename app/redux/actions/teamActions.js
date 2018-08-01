// /app/redux/actions/teamActions.js

import { EDIT_TEAM_SUCCESS, ADD_TEAM_SUCCESS, GET_TEAM_SUCCESS, GET_ALL_TEAMS_SUCCESS, DELETE_TEAM_SUCCESS } from "./actionTypes";
import {isLoadingData} from "./utilityActions";
import {queryPromise, executePromise} from "./../../util/DbUtils";

export function getAllTeams(divisionId) {

    return (dispatch) => {
        const sql = "SELECT * FROM TEAM WHERE TEAM_DIVISION_ID = ?";
        const params = [divisionId];
        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllTeamsSuccess(queryResults.result));
            });
    }
}

export function getAllTeamsSuccess(teams) {

    return {
        type: GET_ALL_TEAMS_SUCCESS,
        teams: teams
    }
}

//export function getAllTeamsError() {}

export function getTeam(teamId) {

    return (dispatch) => {
        const sql = "SELECT * FROM TEAM WHERE TEAM_ID = ?";
        const params = [teamId];
        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getTeamSuccess(queryResults.result[0]));
            });
    }
}

export function getTeamSuccess(team) {

    return {
        type: GET_TEAM_SUCCESS,
        team: team
    }
}

//export function getTeamError() {}

export function addTeam(teamObj) {

    return (dispatch) => {
        const sql = "INSERT INTO TEAM(TEAM_NAME, TEAM_DIVISION_ID, TEAM_COACH_ID, TEAM_GENDER) " +
            "VALUES (?,?,?,?)";
        const params = [teamObj.TEAM_NAME, teamObj.TEAM_DIVISION_ID, teamObj.TEAM_COACH_ID, teamObj.TEAM_GENDER];
        dispatch(isLoadingData(true));
        executePromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(true));
            }).then(() => {
                dispatch(getAllTeams(teamObj.TEAM_DIVISION_ID));
            })
    }
}

export function addTeamSuccess(teamObj) {

    return {
        type: ADD_TEAM_SUCCESS,
        team: teamObj
    }
}

//export function addTeamError() {}

export function editTeam(teamObj) {

    return (dispatch) => {
        const sql = "UPDATE TEAM SET TEAM_NAME=?, TEAM_DIVISION_ID=?, TEAM_COACH_ID=?, TEAM_GENDER=? WHERE TEAM_ID = ?";
        const params = [teamObj.TEAM_NAME, teamObj.TEAM_DIVISION_ID, teamObj.TEAM_COACH_ID, teamObj.TEAM_GENDER,
            teamObj.TEAM_ID];
        dispatch(isLoadingData(true));
        executePromise(sql, params)
            .then((queryResult) => {
                dispatch(isLoadingData(false));
            }).then(() => {
                dispatch(getAllTeams(teamObj.TEAM_DIVISION_ID));
            })
    }
}

export function editTeamSuccess(teamObj) {

    return {
        type: EDIT_TEAM_SUCCESS,
        team: teamObj
    }
}

//export function editTeamError() {}

export function deleteTeam(teamId, divisionId) {

    return (dispatch) => {
        const sql = "DELETE FROM TEAM WHERE TEAM_ID = ?";
        const params = [teamId];
        dispatch(isLoadingData(true));
        executePromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
            }).then(() => {
                dispatch(getAllTeams(divisionId));
            })
    }
}

export function deleteTeamSuccess(teamId) {
    return {
        type: DELETE_TEAM_SUCCESS,
        teamId: teamId
    }
}

//export function deleteTeamError() {}