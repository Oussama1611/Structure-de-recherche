const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());


const db = require('./models')

//Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const contactRouter = require("./routes/Contacts");
app.use("/contact", contactRouter);

const labosRouter = require("./routes/Labos");
app.use("/labos", labosRouter);

const teamsRouter = require("./routes/Teams");
app.use("/teams", teamsRouter);

const membersRouter = require("./routes/Members");
app.use("/members", membersRouter);

const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);
//



db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
});