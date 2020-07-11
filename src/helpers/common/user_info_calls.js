import { API } from "../backend";

/**************** User Calls ****************/

// TODO HERE

export const getUserById = (userId) => {
	return fetch(`${API}/username/${userId}`).then((u) => u.json());
};
