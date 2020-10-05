const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK';
const SET_CURRENT_REVIEWS = 'SET_CURRENT_REVIEWS';
const ADD_CURRENT_REVIEW = 'ADD_CURRENT_REVIEW';
const SET_RECENT_BOOKS = 'SET_RECENT_BOOKS';
const ADD_RECENT_BOOK = 'ADD_RECENT_BOOK';

const setCurrentBook = book => ({ type: SET_CURRENT_BOOK, book })

const setCurrentReviews = reviews => ({ type: SET_CURRENT_REVIEWS, reviews })

const addCurrentReview = review => ({ type: ADD_CURRENT_REVIEW, review })

const setRecentBooks = books => ({ type: SET_RECENT_BOOKS, books})

const addRecentBook = book => ({ type: ADD_RECENT_BOOK, book })

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

const postReview = (content, currentEmail, bookId) => {
    return async dispatch => {
        let usersRes = { ok: false };
        try {
            usersRes = await fetch(`/api/users/`);
        } catch (err){
            console.error(err);
        }
        if(usersRes.ok){
            const {users} = await usersRes.json();
            const currentUser = users.filter(user => user.email === currentEmail)[0];
            const review = {content, userId: currentUser.id, bookId};
            let res = {ok: false};
            try {
                res = await fetch(`/api/books/${bookId}/reviews`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(review)
                });
            } catch (err) {
                console.error(err);
            }
            if (res.ok){
                dispatch(addCurrentReview(review));
            }
        }
    }
}

const retrieveRecentBooks = () => {
    return async dispatch => {
        let res;
        try {
            res = await fetch('/api/books/recent');
        } catch (err) {
            console.error(err);
        }
        if (res.ok) {
            const books = await res.json();
            console.log(books);
            dispatch(setRecentBooks(books));
        } else {
            console.log(res)
        }
    }
}

const postBook = book => {
    return async dispatch => {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        });
        if (!res.ok){
            const newBook = await res.json();
            dispatch(setCurrentBook(newBook));
            dispatch(addRecentBook(newBook));
        } else {
            return await res.json();
        }
    }
}

export const thunks = {
    retrieveBook,
    retrieveReviews,
    postReview,
    retrieveRecentBooks,
    postBook,
}

const initialState = {
    currentBook: { id: 0 },
    currentReviews: [],
    recentBooks: []
};

function reducer(state = initialState, action) {
    switch (action.type){
        case SET_CURRENT_BOOK: {
            return {...state, currentBook: action.book };
        }
        case SET_CURRENT_REVIEWS: {
            return {...state, currentReviews: action.reviews };
        }
        case ADD_CURRENT_REVIEW: {
            return {...state, currentReviews: [...state.currentReviews, action.review]};
        }
        case SET_RECENT_BOOKS: {
            return {...state, recentBooks: action.books}
        }
        case ADD_RECENT_BOOK: {
            return {...state, recentBooks: [...state.recentBooks.slice(1), action.book]};
        }
        default:
            return state;
    }
}

export default reducer;
