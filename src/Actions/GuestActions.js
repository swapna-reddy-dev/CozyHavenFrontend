import axios from 'axios'

export const startSetGuest = (id, queryParams) =>{
    return async(dispatch)=>{
        try{
            const guests = await axios.get(`http://localhost:3055/api/${id}/guests?${String(queryParams)}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(setGuest(guests.data))
        }catch(err){
            console.log(err)
            dispatch(setServerErrors('Server Error Occured'))
        }
    }
}

const setGuest = (guestData) =>{
    return {
        type:'SET_GUESTS',
        payload:guestData
    }
}

export const startRemoveGuest = (id, buildingid) =>{
    const token = localStorage.getItem('token')
    console.log(token)
    return async(dispatch)=>{
        try{
            const guest = await axios.put(`http://localhost:3055/api/${buildingid}/guests/${id}`,{stay:false},{
                headers:{
                    Authorization:token
                }
        })
        console.log("removing the guest", guest.data )
        dispatch(removeGuest(guest.data))
        }catch(err){
            console.log(err)
            dispatch(setServerErrors('Server Error Occured'))

        }
    }
}

const removeGuest = (guestData)=>{
    return{
        type:'REMOVE_GUEST',
        payload:guestData
    }
}


export const setServerErrors = (errors)=>{
    return{
        type:'SET_SERVERERROR',
        payload:errors
    }
}
