const jwt = require("jsonwebtoken")
const generateAccessToken = async (user) => {
    try {
        return jwt.sign(
            {
                _id: user._id
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: '1d'
            }
        )
    } catch (error) {
        throw error
    }
}
const verifyUser = async (_id) => {
    try {
        return await User.findByIdAndUpdate(_id, { isVerified: true })
    } catch (error) {
        throw error
    }
}
const generateVerificationToken = async (user) => {
    try {
        const token = jwt.sign(
            {
                _id: user._id
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: '15m'
            }
        )

        return token
    } catch (error) {
        throw error
    }
}
const signin = async (payload) => {
    try {
        const user = await User.findOne({
            $and: [{ $or: [{ username: payload.username }, { email: payload.email }] }]
        }).select("+password")
        if (!user) {
            const err = new Error(INVALID_CREDENTIALS)
            err.status = 409
            throw err
        }
        const isPasswordMatch = await user.comparePassword(payload.password)
        if (!isPasswordMatch) {
            const err = new Error(INVALID_CREDENTIALS)
            err.status = 409
            throw err
        }
        user.password = ""
        return user
    } catch (error) {
        throw error
    }
}
module.exports = {
    generateAccessToken,
    generateVerificationToken,
    verifyUser,
    signin   
}