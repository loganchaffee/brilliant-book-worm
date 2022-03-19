/**
 * Sends user data to server, receives updated user data, passes updated user data to redux reducer
 * Two optional functions to handle page redirects
 * @param {object} formData Modified user object
 * @param {function} setErrorMessage Update errorMessage state in component it was passed from
 * @param {function} navigate useNavigate hook redirects user to a different page
 * @param {string} whereToNavigate page to redirect user to
 * @return {object} Use redux thunk method "dispatch" to return an action object to redux reducer
*/