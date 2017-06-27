const initialState = {};

export default function Global(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
};