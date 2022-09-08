import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Btn from "../Btn";
import "../../pages/DashboardPage/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadingSpinner from '../LoadingSpinner';
import {
  updateArtist,
  updateGenres,
  updateTrack,
  updateArtistSpotifyURI,
  updateTrackSpotifyURI,
  updateFromLanguage,
  updateToLanguage,
  updateAlbumName,
  updateAlbumUrl,
  loading
} from "../../actions";


const SearchForm = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const songNameInput = useRef();
  const artistNameInput = useRef();
  const fromLanguage = useRef();
  const toLanguage = useRef();

  const test = async (e) => {
    e.preventDefault();
    if (songNameInput.current.value === "") {
      return alert("Please input a song name to search");
    } else if (artistNameInput.current.value === "") {
      return alert("Please input an artist name to search");
    } else if (fromLanguage.current.value === toLanguage.current.value) {
      return alert("Please ensure you have selected two different languages");
    }
    try {
      const { data } = await axios.post(
        "https://fast-gorge-25731.herokuapp.com/spotify/",
        {
          songName: songNameInput.current.value,
          artistName: artistNameInput.current.value,
          fromLanguage: fromLanguage.current.value,
          toLanguage: toLanguage.current.value,
        }
      );
      const artistSpotifyId = data[0];
      const trackSpotifyId = data[1];
      const genres = data[2];
      const albumName = data[3];
      const albumUrl = data[4];
      console.log(artistSpotifyId, trackSpotifyId, genres);
      dispatch(updateArtist(artistNameInput.current.value));
      dispatch(updateTrack(songNameInput.current.value));
      dispatch(updateGenres(genres));
      dispatch(updateArtistSpotifyURI(artistSpotifyId));
      dispatch(updateTrackSpotifyURI(trackSpotifyId));
      dispatch(updateFromLanguage(fromLanguage.current.value));
      dispatch(updateToLanguage(toLanguage.current.value));
      dispatch(updateAlbumName(albumName));
      dispatch(updateAlbumUrl(albumUrl));
      dispatch(loading(true))
      let newString = "";
      newString += songNameInput.current.value;
      newString += artistNameInput.current.value;
      const urlencode = encodeURIComponent(newString);
      navigator(`../room/${urlencode}`, { replace: true });
    } catch (err) {
      alert(err);
      dispatch(loading(false))
    }
  };

  return (
    <div className="dashForm">
      <form>
        <div id="search-feature-display">
          {/* <label htmlFor='songName'>Song Name:</label> */}
          <input
            ref={songNameInput}
            type="text"
            id="songName"
            name="songName"
            placeholder="Enter Song Name Here"
          />

          {/* <label htmlFor='artistName'>Artist Name:</label> */}
          <input
            ref={artistNameInput}
            type="text"
            id="songName"
            name="songName"
            placeholder="Enter Artist Name Here"
          />
        </div>
        <div className="chooselang">
          <label className="fromTolabel" htmlFor="fromLanguage">
            From
          </label>
          <select ref={fromLanguage} name="fromLanguage" id="fromLanguage">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
          <label className="tolabel" htmlFor="toLanguage">
            To
          </label>
          <select ref={toLanguage} name="toLanguage" id="toLanguage">
            <option value="Spanish">Spanish</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="btn-div">
          <Btn text="Submit" handleClick={test} />
        </div>
      </form>
    </div>
  );
};
export default SearchForm;