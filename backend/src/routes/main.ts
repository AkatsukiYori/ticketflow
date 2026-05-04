import { Router } from "express";
import routerCategories from "./categories";
import routerUsers from "./users";
import routerTicket from "./ticket";
import routerDocumentation from "./documentation";
import routerAuth from "./auth";
import routerLogs from "./logs";
import routerMembers from "./members";
import routerDepartment from "./department";

const router: Router = Router();

router.use("/categories", routerCategories);
router.use("/users", routerUsers);
router.use("/tickets", routerTicket);
router.use("/documentation", routerDocumentation);
router.use("/auth", routerAuth);
router.use("/logs", routerLogs);
router.use("/members", routerMembers);
router.use("/department", routerDepartment);

export default router;