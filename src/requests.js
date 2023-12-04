const baseUrl = "http://localhost:1809/api/v1"
const users = "users"
const notes = "notes"
const changelogs = "changelogs"
const groups = "groups"
const projects = "projects"
const updates = "updates"

const requests = {
    url: "http://localhost:1809/",
    users: {
        signUp: `${baseUrl}/${users}/signUp`,
        signIn: `${baseUrl}/${users}/signIn`,
        deleteAccount: `${baseUrl}/${users}/deleteAccount`,
        changeEmail: `${baseUrl}/${users}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)}/changeEmail`,
        changePassword: `${baseUrl}/${users}/${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)}/changePassword`,
        profileDetails: `${baseUrl}/${users}/profileDetails`,
        changeProfilePic: (userID) => { return `${baseUrl}/${users}/${userID}/changeProfilePic` }
    },
    notes: {
        list: `${baseUrl}/${notes}`,
        create: `${baseUrl}/${notes}/create`,
        markAsDone: (noteID) => {
            return `${baseUrl}/${notes}/${noteID}/markAsDone`
        },
        markAsToDo: (noteID) => {
            return `${baseUrl}/${notes}/${noteID}/markAsToDo`
        },
        deleteNote: (noteID) => {
            return `${baseUrl}/${notes}/${noteID}/deleteNote`
        }
    },
    changelogs: {
        list: `${baseUrl}/${changelogs}`,
        readChangelog: (changelogID) => { return `${baseUrl}/${changelogs}/${changelogID}/readChangelog` },
        deleteChangelog: (changelogID) => { return `${baseUrl}/${changelogs}/${changelogID}/deleteChangelog` },
    },
    groups: {
        list: `${baseUrl}/${groups}`,
        getOne: (groupID) => { return `${baseUrl}/${groups}/${groupID}` },
        changeMemberRole: (groupID) => { return `${baseUrl}/${groups}/${groupID}/changeMemberRole` },
        removeMember: (groupID) => { return `${baseUrl}/${groups}/${groupID}/removeMember` },
        addMembers: (groupID) => { return `${baseUrl}/${groups}/${groupID}/addMembers` },
        leaveGroup: (groupID) => { return `${baseUrl}/${groups}/${groupID}/leaveGroup` },
        deleteGroup: (groupID) => { return `${baseUrl}/${groups}/${groupID}/deleteGroup` },
        createGroup: `${baseUrl}/${groups}/createGroup`,
        acceptGroupInvitation: (groupID) => { return `${baseUrl}/${groups}/${groupID}/acceptGroupInvitation` },
        declineGroupInvitation: (groupID) => { return `${baseUrl}/${groups}/${groupID}/declineGroupInvitation` }
    },
    projects: {
        addProject: `${baseUrl}/${projects}/addProject`,
        list: `${baseUrl}/${projects}`,
        editProject: (projectID) => { return `${baseUrl}/${projects}/${projectID}/editProject` },
        getOne: (projectID) => { return `${baseUrl}/${projects}/${projectID}` },
        deleteProject: (projectID) => { return `${baseUrl}/${projects}/${projectID}/deleteProject` }
    },
    updates: {
        schedule: (projectID) => { return `${baseUrl}/${projects}/${projectID}/${updates}/schedule` },
        start: (projectID, updateID) => {
            return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/start`
        },
        publish: (projectID, updateID) => {
            return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/publish`
        },
        delete: (projectID, updateID) => {
            return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/delete`
        },
        addChangeNote: (projectID, updateID) => { return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/addChangeNote` },
        deleteChangeNote: (projectID, updateID, noteID) => { return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/notes/${noteID}/deleteChangeNote` },
        markChangeNoteAsDone: (projectID, updateID, noteID) => { return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/notes/${noteID}/markChangeNoteAsDone` },
        markChangeNoteAsToDo: (projectID, updateID, noteID) => { return `${baseUrl}/${projects}/${projectID}/${updates}/${updateID}/notes/${noteID}/markChangeNoteAsToDo` }
    }
}

export default requests;