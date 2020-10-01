const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK';
const SET_CURRENT_REVIEWS = 'SET_CURRENT_REVIEWS';

const setCurrentBook = book => ({ type: SET_CURRENT_BOOK, book })

const setCurrentReviews = reviews => ({ type: SET_CURRENT_REVIEWS, reviews })


const retrieveBook = id => {
    return async dispatch => {
        const res = await fetch(`/api/books/${id}`);
        const book = await res.json();
        dispatch(setCurrentBook(book));
    }
}

const retrieveReviews = id => {
    return async dispatch => {
        const res = await fetch(`/api/books/${id}/reviews`);
        const reviews = await res.json();
        dispatch(setCurrentReviews(reviews));
    }
}

export const thunks = {
    retrieveBook,
    retrieveReviews,
}

const initialState = {
    currentBook: { id: 0 },
    currentReviews: [],
};

function reducer(state = initialState, action) {
    switch (action.type){
        case SET_CURRENT_BOOK: {
            return {...state, currentBook: action.book };
        }
        case SET_CURRENT_REVIEWS: {
            return {...state, currentReviews: action.reviews };
        }
        default:
            return state;
    }
}

export default reducer;
