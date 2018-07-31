import { GET_ALL_TEAMS_SUCCESS, GET_TEAM_SUCCESS } from "../actions/actionTypes";

// /app/redux/reducers/teamReducer.js

export function teams(state = [], action) {
    switch (action.type) {
        case GET_ALL_TEAMS_SUCCESS:
            return action.teams;
        default:
            return state;
    }
}

export function team(state = {}, action) {
    switch (action.type) {
        case GET_TEAM_SUCCESS:
            return action.team;
        default:
            return state;
    }
}