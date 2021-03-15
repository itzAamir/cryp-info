const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../", "my-app", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));
});
// }
app.listen(port, () => console.log(`Server started at PORT: ${port}`))