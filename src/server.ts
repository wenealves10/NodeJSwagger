import express from "express";
import swaggerUI from "swagger-ui-express";
import { router } from "./routes";

import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/terms", (request, response) =>
	response.status(200).json({
		message: "Termos de Serviço",
	})
);

app.use("/v1", router);

app.listen(3000, () => console.log("Server running on port 3000"));
