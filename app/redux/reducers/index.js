// /app/redux/reducers/index.js

import {combineReducers} from "redux";
import {divisions, division, currentDivisionId} from "./divisionReducers";
import {staffMembers, staffMember} from "./staffReducer";
import {teams, team, currentTeamId} from "./teamReducer";
import {coaches, commisioners} from "./utilityReducer";

export default rootReducer = combineReducers({
    divisions,
    division,
    currentDivisionId,
    staffMembers,
    staffMember,
    teams,
    team,
    currentTeamId,
    coaches,
    commisioners
});