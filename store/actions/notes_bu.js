import {ADD_NOTE, DELETE_NOTE} from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index';
import axios from 'axios';
export const addNote = (noteHeading, noteDescribtion, catagory,eventId) =>{
    return (dispatch, getState) => {
        const state = getState();
        const token = state.auth.token;
        // console.log("I am in"+token)
        var postData = {
            title: noteHeading,
            description: noteDescribtion,
            catagory: catagory,
            eventId: eventId
          };
          
          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': token
            }
          };
          
          axios.post('https://beezdeez-api.voidmod.com/api/v01/notes/create', postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })

        
        // axios.post('https://beezdeez-api.voidmod.com/api/v01/notes/create', 
        // {title: noteHeading, description: noteDescribtion, catagory: catagory, event_id: eventId }, 
        // {
        // headers: {'Authorization': token,'Content-Type': 'application/json'}, 
        // notes: { event_id: 'string', title: 'string', description: 'text', catagory: 'string' }
        // })
        // axios.post("https://beezdeez-api.voidmod.com/api/v01/notes/", {
        //     noteHeading: noteHeading, 
        //     noteDescribtion: noteDescribtion, 
        //     catagory: catagory, 
        //     eventId: eventId 
        // },{headers: {
        //     'Authorization': token
        // }})
        // fetch('https://beezdeez-api.voidmod.com/api/v01/events', {
        //     method: 'POST',
        //     headers: { 'Authorization': 'Bearer ' + token },
        //     body: JSON.stringify({
        //         noteHeading: noteHeading, 
        //         noteDescribtion: noteDescribtion, 
        //         catagory: catagory, 
        //         eventId: eventId 
        //     }),
        //     })
        // .then((response) => {

        //     console.log(response);

        // })
        // .catch((error) => {
        //     console.log(error);
        //     alert(error);
        // });


        // axios.post('https://beezdeez-api.voidmod.com/api/v01/notes', 
        // {noteHeading: noteHeading, noteDescribtion: noteDescribtion, catagory: catagory, eventId: eventId }, 
        // {headers: {'Authorization': token}})
        // axios({
        //     url: 'https://beezdeez-api.voidmod.com/api/v01/notes',
        //     method: 'post',
        //     payload: {
        //     noteHeading: noteHeading,
        //     noteDescribtion: noteDescribtion,
        //     catagory: catagory,
        //     eventId: eventId
        //     },
        //     headers: {
        //         'Authorization': token
        //       }
        //   })
        // .then((response) => {
        //     console.log(response);
        // })
        // .catch((error)=>{
        //     console.log(error.response);
        // });
        // dispatch(uiStopLoading());
    };
    
    // return {
    //     type: ADD_NOTE,
    //     noteHeading: noteHeading,
    //     noteDescribtion: noteDescribtion,
    //     catagory: catagory,
    //     eventId: eventId
    // };
    // axios.post('https://beezdeez-api.voidmod.com/api/v01/notes',{
    //     headers: {'Authorization': token}},{
    //         noteData
    //       })
};
export const deleteNote = () =>{
    return{
        type: DELETE_NOTE,
        noteKey: key
    };
};




        // dispatch(uiStartLoading());
        // fetch("https://us-central1-awesome-places-1511248766522.cloudfunctions.net/storeImage", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         image: image.base64
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        //     alert("Something went wrong, please try again!");
        //     dispatch(uiStopLoading());
        // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     const placeData = {
        //         name: placeName,
        //         location: location,
        //         image: parsedRes.imageUrl
        //     };
        //     return fetch("https://awesome-places-1511248766522.firebaseio.com/places.json", {
        //         method: "POST",
        //         body: JSON.stringify(placeData)
        //     })
        // })  
        // .catch(err => {
        //     console.log(err);
        //     alert("Something went wrong, please try again!");
        //     dispatch(uiStopLoading());
        // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes);
        //     dispatch(uiStopLoading());
        // });