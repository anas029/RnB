const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    telNumber: { type: String, required: true },
    password: { type: String, required: true },
    credit: { type: Number, default: 0 },
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true })

userSchema.statics.verify = async function (emailAddress, password) {

    if (!emailAddress || !password)
        throw Error('All fields must be filled')

    const user = await this.findOne({ emailAddress })
    if (!user)
        throw Error('Incorrect email')

    const match = bcrypt.compareSync(password, user.password)
    if (!match)
        throw Error('Incorrect password')

    return user
}

userSchema.statics.isValid = async function ({ firstName, lastName, username, emailAddress, telNumber, password }) {
    //validation
    if (!firstName || !lastName || !username || !emailAddress || !telNumber || !password)
        throw Error('All fields must be filled')
    if (!validator.isEmail(emailAddress))
        throw Error('Email is not valid')
    const userExist = await this.findOne({ username })
    if (userExist)
        throw Error(userExist, 'Username already registered')
    const emailExist = await this.findOne({ emailAddress })
    if (emailExist)
        throw Error('Email already registered')
    if (!validator.isStrongPassword(password))
        throw Error('Password is weak. Password must be 8 character long and contain a lowercase, an uppercase, a number and a symbol')
    const hash = bcrypt.hashSync(password, 10)
    return { firstName, lastName, username, emailAddress, telNumber, password: hash }
}
// exporting User Model
module.exports = mongoose.model('User', userSchema)