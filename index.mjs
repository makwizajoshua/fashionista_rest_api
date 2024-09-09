import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import authenticationRouter from "./routers/authenticationRouter.mjs";
import userRouter from "./routers/userRouter.mjs";
import businessRouter from "./routers/businessRouter.mjs";
import productRouter from "./routers/productRouter.mjs";
import orderRouter from "./routers/orderRouter.mjs";
import ratingAndCommentRouter from "./routers/ratingsAndCommentsRouter.mjs";
import wishlistRouter from "./routers/wishlistRouter.mjs";
import searchRouter from "./routers/searchRoutes.mjs";

//Loading environmental variables
dotenv.config();

// Set up express application
const app = express();

const apiKey = process.env.api_key;

app.use((req, res, next) => {
    const providedApiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (providedApiKey !== apiKey) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
});


// Set up parser
app.use(bodyParser.json());

// Initialize routes
const apiRouter = express.Router();

apiRouter.use(authenticationRouter);
apiRouter.use(userRouter);
apiRouter.use(businessRouter);
apiRouter.use(productRouter);
apiRouter.use(wishlistRouter);
apiRouter.use(orderRouter);
apiRouter.use(ratingAndCommentRouter);
apiRouter.use(searchRouter);

app.use("/api/", apiRouter);

// Setting up the server
app.listen(process.env.port || 4000, function () {
    console.log("Server running at port " + process.env.port || 4000);
});