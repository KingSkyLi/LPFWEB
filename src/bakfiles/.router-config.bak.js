const RouterList = {
    user: [
        { method: 'POST', path: '/regist', functionName: 'regist' },
        { method: 'POST', path: '/login', functionName: 'login1' }
    ],
    project: [
        { method: 'POST', path: '/createproject', functionName: 'createproject' }
    ]
};

module.exports = {
    RouterList
}