const baseUrl = "http://192.168.11.81:1809/api/v1"
const users = "users"
const notes = "notes"
const changelogs = "changelogs"
const groups = "groups"
const projects = "projects"

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
        editProject: (projectID) => { return `${baseUrl}/${projects}/${projectID}/editProject` }
    }
}

export default requests;