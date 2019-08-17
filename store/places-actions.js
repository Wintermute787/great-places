export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy Address",
        15.6,
        12.3
      );
      console.log(dbResult);
    } catch (err) {
      console.log(err);
      throw err;
    }
    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insert.id, title: title, image: newPath }
    });
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbresult = await fetchPlaces();
      console.log(dbresult);
      dispatch({ type: SET_PLACES, places: dbresult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
