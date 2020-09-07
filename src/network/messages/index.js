import firebase from '../../firebase/config';

export const senderMsg = async(msgValue, currentUserId, guestUserId, img) => {
    try {
        return await firebase.
        database()
        .ref('messages/'+currentUserId)
        .child(guestUserId)
        .push({
            message:{
                sender:currentUserId,
                reciever:guestUserId,
                msg:msgValue,
                img:img
            }
        });
    } catch (error) {
        return error;
    }
}

export const recieverMsg = async(msgValue, currentUserId, guestUserId, img) => {
    try {
        return await firebase.
        database()
        .ref('messages/'+guestUserId)
        .child(currentUserId)
        .push({
            message:{
                sender:currentUserId,
                reciever:guestUserId,
                msg:msgValue,
                img:img
            }
        });
    } catch (error) {
        return error;
    }
}