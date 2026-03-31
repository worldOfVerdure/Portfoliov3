import "dotenv/config";
import { app } from "./app.js";
const defaultPort = 4000;
const parsedPort = Number.parseInt(process.env.PORT ?? "", 10);
const port = Number.isNaN(parsedPort) ? defaultPort : parsedPort;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map