import { Router } from "express";
import routerCategories from "./categories";
import routerUsers from "./users";
import routerTicket from "./ticket";

const router: Router = Router();

router.use("/categories", routerCategories);
router.use("/users", routerUsers);
router.use("/tickets", routerTicket);

export default router;