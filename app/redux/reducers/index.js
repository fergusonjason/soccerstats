// /app/redux/reducers/index.js

import {combineReducers} from "redux";
import {divisions, division} from "./divisionReducers";
import {staffMembers, staffMember} from "./staffReducer";
import {teams, team} from "./teamReducer";

export default rootReducer = combineReducers({
    divisions,
    division,
    staffMembers,
    staffMember,
    teams,
    team
});