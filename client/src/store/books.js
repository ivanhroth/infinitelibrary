const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK';

const setCurrentBook = book => ({ type: SET_CURRENT_BOOK, book })


const retrieveBook = id => {
    return async dispatch => {
        const res = await fetch(`/api/books/${id}`);
        const book = await res.json();
        dispatch(setCurrentBook(book));
    }
}

export const thunks = {
    retrieveBook,
}

const initialState = {
    currentBook: { id: 0 }
};

function reducer(state = initialState, action) {
    switch (action.type){
        case SET_CURRENT_BOOK: {
            return {...state, currentBook: action.book }
        }
        default:
            return state;
    }
}

export default reducer;
