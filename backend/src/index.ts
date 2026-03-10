import "dotenv/config";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import cors from "cors";

const app = Express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(Express.json());
app.use("/api", router);


app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:3000`);
});