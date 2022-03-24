// Import Liblary
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//--Controller Functions--

// Parse
function parse(dom){
    // Varaibles
    const gallery = [];
    let out = ""

    // Setting selector
    const selector = (attr) => dom.window.document.querySelector(attr);
    const selectorAll = (attr) => dom.window.document.querySelectorAll(attr);

    // Title
    const title = selector("#ayrinti_liste h3").textContent;

    // Image 
    const image = selector(".col-sm-4 .thickbox").href;

    // Date
    const date = selector("img").alt;

    // Text
    const text = selector("p").textContent;

    // Gallery
    for(let index = 0; index < selectorAll("p a img").length; index++){
        gallery.push(selectorAll("p a img")[index].src);
    }

    // Setting Out
    out = {
        title:title,
        image:image,
        date:date,
        text:text,
        gallery:gallery
    }

    // Return
    return out;
}

// Controller
function ArticleController(req,res){
    // Get articlePath
    const articlePath = req.body.articlePath;

    // Get Request
    axios.get('https://saik.meb.k12.tr/'+articlePath)
    .then(response=>{
        // Get html
        const html = response.data;

        // Setting dom
        const dom = new JSDOM(html);

        // Get output
        const output = parse(dom);

        // Send
        res.send(output);
    });
}

// Export
module.exports = ArticleController