import axios from 'axios';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../Components/AuthContext/firebase.js';

// Import variables of actions:

import {
  DOWNGRADE_PLAN,
  GET_MOVIE_DETAIL,
  CLEAR_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_SEARCH,
  GET_HOME_ALL,
  START_LOADING,
  GET_SERIE_DETAIL,
  CLEAR_SERIE_DETAIL,
  GET_SEASON_DETAIL,
  CLEAR_SEARCH,
  CLEAR_MOVIES,
  CLEAR_SERIES,
  GET_ALL_GENRES,
  GET_MOVIE_GENRE_BY_ID,
  ERROR_FOUND,
  ERROR_CLEAN,
  GET_TV_SHOW_GENRES,
  GET_SERIES_BY_GENRE,
  LOG_IN,
  LOG_OUT,
  GET_COMMENTS_DATA,
  POST_COMMENT,
  RENT_VIDEO,
  DELETE_COMMENT,
  UPGRADE_PLAN,
  CLEAR_GENRES,
  ADD_TO_WATCHLIST,
  CHANGE_NAME,
  REMOVE_FROM_WATCHLIST,
  CHANGE_SID,
  UPLOAD_IMG,
  AVATAR_IMG,
  LIKE,
  DISLIKE,
  ISLIKE,
  GET_LIKES_FROM_CONTENT,
  GET_LIKES_FROM_USER,
} from './const';

// Actions functions

// Add to watchlist:
export const addToWatchlist = (toBeAdd, user) => async (dispatch) => {
  try {
    const watchListMovieAdded = {
      id: toBeAdd.id,
      posterImg: `https://image.tmdb.org/t/p/original${toBeAdd.poster}`,
      title: toBeAdd.title,
      ...(toBeAdd.serie && { serie: true }),
    };

    const userRef = doc(firestore, 'users', user.uid);
    await updateDoc(userRef, {
      watchList: [...user.watchList, watchListMovieAdded],
    });
    dispatch({
      type: ADD_TO_WATCHLIST,
      payload: [...user.watchList, watchListMovieAdded],
    });
  } catch (error) {
    return dispatch({
      type: ERROR_FOUND,
    });
  }
};

// Remove from watchlist:
export const removeFromWatchlist = (user, toBeRemove) => async (dispatch) => {
  try {
    const userRef = doc(firestore, 'users', user.uid);
    await updateDoc(userRef, {
      watchList: user.watchList.filter((movie) => movie.id !== toBeRemove.id),
    });
    dispatch({
      type: REMOVE_FROM_WATCHLIST,
      payload: user.watchList.filter((movie) => movie.id !== toBeRemove.id),
    });
  } catch (error) {
    return dispatch({
      type: ERROR_FOUND,
    });
  }
};

// Get movie detail:
export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/movies/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearMovieDetail = () => ({ type: CLEAR_MOVIE_DETAIL });

export function getHomeAll() {
  return async function (dispatch) {
    dispatch({ type: START_LOADING });
    dispatch({ type: ERROR_CLEAN });
    try {
      var json = await axios.get('/home');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_HOME_ALL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

// Get movies:
export function getMovies(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/home/movies/?page=' + page);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearMovies() {
  return {
    type: CLEAR_MOVIES,
  };
}

// Get tvShows:
export function getTvShows(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/home/series/?page=' + page);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOWS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearTvShows() {
  return {
    type: CLEAR_SERIES,
  };
}

//searchQuery Actions:
export function getSearchByQuery(name, page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        '/home/search/?page=' + page + '&name=' + name
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEARCH,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearSearchByQuery() {
  return {
    type: CLEAR_SEARCH,
  };
}

// TVShowDetail Actions:
export function getSerieDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('/tv/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearSerieDetail = () => ({ type: CLEAR_SERIE_DETAIL });

// TVShowSeasonDetail Actions:
export function getSeasonDetail(id, season_number) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/season/${id}/${season_number}`);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEASON_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const getAllGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get('/home/genres/movies');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_ALL_GENRES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export default function cleanError() {
  return {
    type: ERROR_CLEAN,
  };
}

export function clearGenres() {
  return {
    type: CLEAR_GENRES,
  };
}

export const getMovieGenreByID = (id, page) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/movies_by_genre?page=${page}&id=${id}`);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_GENRE_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const getTVShowGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get('/genres');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOW_GENRES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const getSeriesByGenre = (genre, page) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        // '/home/series_by_genre?genre=' + genre + '&page=' + page
        `/home/series_by_genre?genre=${genre}&page=${page}`
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIES_BY_GENRE,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const loadUserData = (id) => {
  return async function (dispatch) {
    try {
      const docRef = doc(firestore, `/users/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        data.uid = id;
        return dispatch({
          type: LOG_IN,
          payload: data,
        });
      }
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const logOutUser = () => {
  return {
    type: LOG_OUT,
  };
};

export const upgradePlan = () => {
  return {
    type: UPGRADE_PLAN,
  };
};

export const changeSID = (id) => {
  return {
    type: CHANGE_SID,
    payload: id,
  };
};

export const downgradePlan = () => {
  return {
    type: DOWNGRADE_PLAN,
  };
};

export const uploadImg = (data) => {
  return {
    type: UPLOAD_IMG,
    payload: data,
  };
};

export const avatarImg = (data) => {
  return {
    type: AVATAR_IMG,
    payload: data,
  };
};

export const getCommentsData = (id) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/comments/${id}`);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_COMMENTS_DATA,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const postNewComment = (userId, content, date, idReference) => {
  return async function (dispatch) {
    try {
      var json = await axios.post(`/comments`, {
        userId,
        content,
        date,
        idReference,
      });
      return dispatch({
        type: POST_COMMENT,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const deleteComment = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/comments/${id}`);
      return dispatch({
        type: DELETE_COMMENT,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const rentVideo = (payload) => ({ type: RENT_VIDEO, payload });

export const changeNameUser = (payload) => ({ type: CHANGE_NAME, payload });

export const putLike = (user, content) => {
  return async function (dispatch) {
    try {
      var json = await axios.post(`/like/?idUser=${user}&idContent=${content}`);
      return dispatch({
        type: LIKE,
        payload: { user, content },
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const dislike = (user, content) => {
  return async function (dispatch) {
    try {
      var json = await axios.post(
        `/dislike/?idUser=${user}&idContent=${content}`
      );
      return dispatch({
        type: DISLIKE,
        payload: { user, content },
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const getLikesFromContent = (content) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/likes_from/${content}`);
      return dispatch({
        type: GET_LIKES_FROM_CONTENT,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const getLikesFromUser = (user) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/likes_from_user/${user}`);
      return dispatch({
        type: GET_LIKES_FROM_USER,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export const isLike = (user, content) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `/islike/?idUser=${user}&idContent=${content}`
      );
      if (json.data === null) {
        return dispatch({
          type: ISLIKE,
          payload: false,
        });
      } else {
        return dispatch({
          type: ISLIKE,
          payload: true,
        });
      }
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

//Get all content for admin panel:
export const getAllContent = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/panelAdmin`);
      return json.data;
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};
