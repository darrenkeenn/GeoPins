const user = {
    _id: '1',
    name: 'Darren',
    email: 'email@mail.com',
    picture: 'https://cloudinary.com/asdf'
}

module.exports = {
    Query: {
        me: () => user
    }
}