import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        let token
        // Get token from request headers
        if (authHeader) {
            token = authHeader.split(' ')[1]
        } else {
            return res.status(401).json
        }
        let decodedData
        
        // Validate token
        if (token) {
            decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            // Add the decoded user data to the request object
            req.userId = decodedData?.id
        }

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json('Token not validated')
    }
}

export default auth