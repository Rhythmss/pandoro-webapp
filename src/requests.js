const baseUrl = "http://192.168.182.213:8081/api/v1"
const users = "users"
const notes = "notes"

const requests = {
    users: {
        signUp: `${baseUrl}/${users}/signUp`,
        signIn: `${baseUrl}/${users}/signIn`,
        deleteAccount: `${baseUrl}/${users}/deleteAccount`,
        changeEmail: `${baseUrl}/${users}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)}/changeEmail`,
        changePassword: `${baseUrl}/${users}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)}/changePassword`,
        profileDetails: `${baseUrl}/${users}/profileDetails`,
    },
    notes: {
        list: `${baseUrl}/${notes}`,
        create: `${baseUrl}/${notes}/create`,
        markAsDone: `${baseUrl}/${notes}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NOTE_ID)}/markAsDone`,
        markAsToDo: `${baseUrl}/${notes}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NOTE_ID)}/markAsToDo`,
        deleteNote: `${baseUrl}/${notes}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NOTE_ID)}/deleteNote`
    }
}

export default requests;