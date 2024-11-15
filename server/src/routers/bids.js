import { Router } from "express";
import BidsController from "../controllers/bids";

const bidsRouter = Router();

const bidsController = new BidsController();

bidsRouter.get("/bids", bidsController.getAllBids);
bidsRouter.get("/bids/:id", bidsController.getBidById);
bidsRouter.post("/bids", bidsController.createBid);
bidsRouter.put("/bids/:id", bidsController.updateBid);

export default bidsRouter;
