import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        let decodedData

        if (token) {
            decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            console.log(decodedData)

            req.userId = decodedData?.id
        }

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json('Token not validated')
    }
}

export default auth