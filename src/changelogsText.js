const changelogsText = (changelog) => {
    const key = changelog.changelog_event
    const group = changelog.group
    const project = changelog.project
    const extraContent = changelog.extraContent
    var entityName;
    if (group) {
        entityName = group.name
    } else if (project) {
        entityName = project.name
    }
    // eslint-disable-next-line default-case
    switch (key) {
        case "INVITED_GROUP":
            return "You have been invited to join in the " + entityName + " group";
        case "JOINED_GROUP":
            return "You joined in the " + entityName + " group";
        case "ROLE_CHANGED":
            var article = "a";
            if (extraContent === "ADMIN")
                article = "an";
            return "You became " + article + " " + extraContent + " in the " + entityName + " group";
        case "LEFT_GROUP":
            return "You left from the " + entityName + " group";
        case "GROUP_DELETED":
            return "The " + entityName + " group has been deleted";
        case "PROJECT_ADDED":
            return "The project " + entityName + " has been added";
        case "PROJECT_DELETED":
            return "The project " + entityName + " has been deleted";
        case "UPDATE_SCHEDULED":
            return "A new update for " + entityName + "'s project has been scheduled [v. " + extraContent + "]";
        case "UPDATE_STARTED":
            return "The [v. " + extraContent + "] update of " + entityName + "'s project has been started";
        case "UPDATE_PUBLISHED":
            return "The [v. " + extraContent + "] update of " + entityName + "'s project has been published";
        case "UPDATE_DELETED":
            return "The [v. " + extraContent + "] update of " + entityName + "'s project has been deleted";
    }
}

export default changelogsText;