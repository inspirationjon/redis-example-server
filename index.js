const express = require('express')
const redis = require('redis')

const app = express()

const rc = redis.createClient({
    password: 'qwerty12345',
})

app.get('/', (req, res) => {
    rc.get('users', (err, data) => {
        res.send(JSON.parse(data))
    })
})

const users = []

for (let i = 0; i < 100; i++) {
    let user = {
        fullname: `sha${i}`,
        age: i,
    }

    users.push(user)
}

rc.set('users', JSON.stringify(users))

app.listen(4000, () => console.log(4000))
