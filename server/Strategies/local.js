const passport = require('passport')
const { Strategy } = require('passport-local')

const bcrypt = require('bcryptjs')


const { default: mongoose } = require('mongoose')
const { Account, Admin, Student } = require('../databases/accounts')
const { serialize } = require('cookie')

mongoose.connect('mongodb://127.0.0.1:27017/CoursesSite')


passport.serializeUser((user,done) =>{
    // console.log("serializing ...")
    // console.log(user)
    done(null,user)

})
passport.deserializeUser((user,done) => {
    // console.log("deserializing ...")
    // console.log(user)
    done(null,user)
})
passport.use(
    new Strategy({
        usernameField: 'username'
    }, (username, password, done) => {
        // console.log(username)
        // console.log(password)
        Account.findOne({ username: username })
            .then((data) => {
                if (data) {
                    const compareHashingPassword = compareHashing(password, data.password)
                    if (compareHashingPassword) {
                        if (data.role === 'Admin') {
                            Admin.findById(data.dataId)
                                .then(adminData => {
                                    // res.json({ role: data.role })
                                    done(null,adminData)
                                })
                        } else if (data.role === 'Student') {
                            Student.findById(data.dataId)
                                .then(studentData => {
                                    // res.json({ role: data.role })
                                    done(null,studentData)
                                })
                        }
                    } else {
                        // res.sendStatus(401)
                        done(null, false, { message: 'wrong password' })
                    }
                } else {
                    // console.log('wrong in username or password')
                    // res.sendStatus(400)
                    done(null, false, { message: 'there is no account like this !!!' })
                }
            })
        // try {
        // } catch {
        //     done(err,false,null)
        // }

    })
)


function compareHashing(raw, hash) {
    return bcrypt.compareSync(raw, hash)
}