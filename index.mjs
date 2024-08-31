import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRouter from "./routes/userRoutes.mjs";
import productRouter from "./routes/productRouter.mjs";
import businessRouter from "./routes/businessRoutes.mjs";
import wishlistRouter from "./routes/wishlistRoutes.mjs";
import ratingRouter from "./routes/ratingRoutes.mjs";
import commentRouter from "./routes/commentRoutes.mjs";
import categoryRouter from "./routes/categoryRoutes.mjs";
import orderRouter from "./routes/orderRoutes.mjs";
// Set up express application
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/fashionista");
mongoose.Promise = global.Promise;

// Set up parser
app.use(bodyParser.json());

// Initialize routes
const apiRouter = express.Router();
apiRouter.use(userRouter);
apiRouter.use(businessRouter);
apiRouter.use(productRouter);
apiRouter.use(wishlistRouter);
apiRouter.use(ratingRouter);
apiRouter.use(commentRouter);
apiRouter.use(categoryRouter);
apiRouter.use(orderRouter);

app.use("/api", apiRouter);

// Error handling
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message });
});

// Setting up the server
app.listen(process.env.port || 4000, function() {
    console.log("Server running at port 4000");
});