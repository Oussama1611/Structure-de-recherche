const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use('../Client/public',express.static('Photos'));
app.use(express.static('PDFs'));
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

const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);

const userUpload =require("./routes/UploadPic");
app.use("/user", userUpload);
//



db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
});