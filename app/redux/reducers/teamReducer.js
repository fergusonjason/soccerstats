import { GET_ALL_TEAMS_SUCCESS, GET_TEAM_SUCCESS, SET_CURRENT_TEAM_ID } from "../actions/actionTypes";

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

export function currentTeamId(state = -1, action) {
    switch (action.type) {
        case SET_CURRENT_TEAM_ID:
            return action.currentTeamId;
        default:
            return state;
    }
}