module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || '76fb3de821e0ae1bb3414986fe3ba7fc1b020c5b5eec13dd27de7b0c5573e714',
    },
}