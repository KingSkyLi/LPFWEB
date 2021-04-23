const rules = {
    regist: {
        username: ['required', 'string'],
        password: ['required', 'string', 'min:6']
    },
    login: {
        username: ['required', 'string'],
        password: ['required', 'string']
    }
}

module.exports = rules