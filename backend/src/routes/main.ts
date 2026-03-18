import { Router } from "express";
import routerCategories from "./categories";
import routerUsers from "./users";
import routerTicket from "./ticket";
import routerDocumentation from "./documentation";

const router: Router = Router();

router.use("/categories", routerCategories);
router.use("/users", routerUsers);
router.use("/tickets", routerTicket);
router.use("/documentation", routerDocumentation);

export default router;