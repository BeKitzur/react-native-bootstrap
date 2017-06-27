const initialState = {};

export default function User(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
};