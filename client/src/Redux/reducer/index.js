// Import actions:
import {
  CLEAR_MOVIE_DETAIL,
  GET_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_HOME_ALL,
  START_LOADING,
  GET_SERIE_DETAIL,
  CLEAR_SERIE_DETAIL,
  GET_SEASON_DETAIL,
  GET_SEARCH,
  CLEAR_SEARCH,
  CLEAR_MOVIES,
  CLEAR_SERIES,
  CLEAR_GENRES,
  GET_ALL_GENRES,
  GET_MOVIE_GENRE_BY_ID,
  ERROR_FOUND,
  ERROR_CLEAN,
  GET_TV_SHOW_GENRES,
  GET_SERIES_BY_GENRE,
  LOG_IN,
  LOG_OUT,
  GET_COMMENTS_DATA,
  RENT_VIDEO,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  UPGRADE_PLAN,
  CHANGE_NAME,
  DOWNGRADE_PLAN,
  CHANGE_SID,
  UPLOAD_IMG,
  AVATAR_IMG,
  ISLIKE,
  GET_LIKES_FROM_CONTENT,
} from '../actions/const';

// Initial state of global store:
const initialState = {
  carrousels_home: [],
  movies: [],
  series: [],
  search: [],
  movieDetail: [],
  serieDetail: [],
  seasonDetail: [],
  loading: false,
  allgenres: [],
  error: false,
  user: false,
  comments: [],
  isLike: false,
  totalLikes: 0,
};

// Reducer:
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      };
    case GET_TV_SHOWS:
      return {
        ...state,
        series: action.payload,
      };
    case CLEAR_SERIES:
      return {
        ...state,
        series: [],
      };
    case CLEAR_GENRES:
      return {
        ...state,
        allgenres: [],
      };
    case GET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: [],
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case CLEAR_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: [],
      };
    case GET_SERIE_DETAIL:
      return {
        ...state,
        serieDetail: action.payload,
      };
    case CLEAR_SERIE_DETAIL:
      return {
        ...state,
        serieDetail: [],
      };
    case GET_SEASON_DETAIL:
      return {
        ...state,
        seasonDetail: action.payload,
      };
    case GET_HOME_ALL:
      return {
        ...state,
        carrousels_home: action.payload,
        loading: false,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      };
    case GET_MOVIE_GENRE_BY_ID:
      return {
        ...state,
        movies: action.payload,
      };
    case ERROR_FOUND:
      return {
        ...state,
        error: true,
      };
    case ERROR_CLEAN:
      return {
        ...state,
        error: false,
      };
    case GET_TV_SHOW_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      };
    case GET_SERIES_BY_GENRE:
      return {
        ...state,
        series: action.payload,
      };
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: false,
      };
    case GET_COMMENTS_DATA:
      return {
        ...state,
        comments: action.payload,
      };
    case RENT_VIDEO:
      return {
        ...state,
        user: { ...state.user, rented: [...state.user.rented, action.payload] },
      };
    case CHANGE_NAME:
      return {
        ...state,
        user: { ...state.user, username: action.payload },
      };
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          watchList: action.payload,
        },
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          watchList: action.payload,
        },
      };
    case UPGRADE_PLAN:
      return {
        ...state,
        user: { ...state.user, subscription: 2 },
      };
    case UPLOAD_IMG:
      return {
        ...state,
        user: {
          ...state.user,
          avatars: [...state.user.avatars, action.payload],
        },
      };
    case AVATAR_IMG:
      return {
        ...state,
        user: { ...state.user, avatar: action.payload },
      };
    case DOWNGRADE_PLAN:
      return {
        ...state,
        user: { ...state.user, subscription: 1 },
      };
    case CHANGE_SID:
      return {
        ...state,
        user: { ...state.user, stripeId: action.payload },
      };
    case ISLIKE:
      return {
        ...state,
        isLike: action.payload,
      };
    case GET_LIKES_FROM_CONTENT:
      return {
        ...state,
        totalLikes: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
