// Import Liblary
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Controller Functions
function parse(dom){
    // Varaibles
    const titles = [];
    const dates = [];
    const images = [];
    const urls = [];
    const out = [];

    // Setting selector
    const selector = (attr) => dom.window.document.querySelectorAll(attr);

    // Parse 
    for(let index = 0; index < selector(".liste_baslik a").length; index++){

        // Title
        titles.push(selector(".liste_baslik a")[index].textContent);

        // Date
        dates.push(selector(".tarih .gun time")[index].dateTime);

        // Image
        images.push(selector(".thumb_image_list .img-thumbnail")[index].src);

        // Url
        urls.push(selector(".liste_baslik a")[index].href);

        // Setting Out
        out.push({
            title:titles[index],
            date:dates[index],
            image:images[index],
            url:urls[index]
        })
    }

    // Return
    return out;
}

function ListController(req,res){
    // Get Request
    axios.get(req.originalUrl == "/news"?"https://saik.meb.k12.tr/tema/icerik.php?KATEGORINO=100821&git=1":"https://saik.meb.k12.tr/tema/icerik.php?KATEGORINO=100822")
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
module.exports = ListController;