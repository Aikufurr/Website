const express = require('express');
const app = express();
const port = 5001;
const fs = require('fs');

var Sqrl = require('squirrelly')

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));


app.use('/images', express.static(__dirname + '/public/images'));

function render(response, template, data = {}) {
    response.send(Sqrl.Render(fs.readFileSync(`public/${template}`, `utf8`), data))
}


app.get("/", (req, res) => {
    render(res, 'html/index.html')
})

app.get("/projects/:project?/:sub1?/:sub2?/:sub3?", (req, res) => {
    if (req.params.project == null) {
        render(res, 'html/projects.html')
    } else if (req.params.project.toLowerCase() === "discord-bots") {
        if (req.params.sub1 == null) {
            render(res, 'html/projects/discord-bots/index.html')
        } else if (req.params.sub1.toLowerCase() === "foxobot") {
            render(res, 'html/projects/discord-bots/foxobot/index.html')
        }
    } else {
        res.status(404).send('<video preload="auto" autoplay="" loop style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%;" src="/images/404.mp4" type="video/mp4"></video>');
    }
})

app.get('*', function(req, res) {
    res.status(404).send('<video preload="auto" autoplay="" loop style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%;" src="/images/404.mp4" type="video/mp4"></video>');
});

app.listen(port, () => console.log(`app listening on port ${port}!`))