import axios from "axios";
import jwt_decode from "jwt-decode";

export const displayAlert = () => {
  return {
    type: "DISPLAY_ALERT",
  };
};

export const clearAlert = () => {
  setTimeout(() => {
    return {
      type: "CLEAR_ALERT",
    };
  }, 1000);
};

export const registerUser = (currentUser) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "REGISTER_USER_BEGIN" });
      const { data } = await axios.post(
        `http://localhost:7777/auth/register`,
        currentUser
      );
      console.log(data);
      const { user, msg, token } = data;
      console.log(user, msg, token);
      dispatch({ type: "REGISTER_USER_SUCCESS", payload: { user, msg } });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "REGISTER_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
      });
    }, 2000);
  };
};

export const loginUser = (currentUser) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_USER_BEGIN" });
      const { data } = await axios.post(
        `http://localhost:7777/auth/login`,
        currentUser
      );
      console.log(data);
      const { msg, token } = data;
      let { username } = jwt_decode(token);
      console.log(username);
      dispatch({ type: "LOGIN_USER_SUCCESS", payload: { msg, username } });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(username));
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: "LOGIN_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
      });
    }, 1000);
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const updateArtist = (artistName) => {
    return {
        type: "UPDATE ARTIST",
        payload: artistName
    }
}

export const updateArtistSpotifyURI = (artistSpotifyIdentifier) => {
    return {
        type: "UPDATE ARTIST SPOTIFY URI",
        payload: artistSpotifyIdentifier
    }
}

export const updateTrack = (trackName) => {
    return {
        type: "UPDATE TRACK",
        payload: trackName
    }
}

export const updateTrackSpotifyURI = (trackSpotifyIdentifier) => {
    return {
        type: "UPDATE TRACK SPOTIFY URI",
        payload: trackSpotifyIdentifier
    }
}

export const updateGenres = (genres) => {
    return {
        type: "UPDATE GENRES",
        payload: genres
    }
}

export const updateAlbumName = (name) => {
  return {
      type: "UPDATE ALBUM NAME",
      payload: name
  }
}

export const updateAlbumUrl = (url) => {
  return {
      type: "UPDATE ALBUM URL",
      payload: url
  }
}

export const updateFromLanguage = (language) => {
    return {
        type: "UPDATE FROM LANGUAGE",
        payload: language
    }
}

export const updateToLanguage = (language) => {
    return {
        type: "UPDATE TO LANGUAGE",
        payload: language
    }
}



export const loading = (loadingStatus) => {
    return {
        type: "LOADING",
        payload: loadingStatus
    }
}

export const loaded = (loadingStatus) => {
    return {
        type: "LOADED",
        payload: loadingStatus
    }
}

export const errorMesage = (message) => {
    return {
        type: "SET ERROR",
        payload: message
    }
}


export const addToPlaylist = ({ id, title, artist, albumArtUrl, album }) => {
  const newSong = { id, title, artist, albumArtUrl, album };
  return {
    type: "ADD_TO_PLAYLIST",
    payload: newSong,
  };
};

export const removeSong = (id) => {
  return {
    type: "REMOVE_SONG",
    payload: id,
  };
};

export const clearPlaylist = () => {
  return {
    type: "CLEAR_PLAYLIST",
  };
};
