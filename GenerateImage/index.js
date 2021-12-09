const nodeHtmlToImage = require('node-html-to-image')
const bent = require('bent')

module.exports = async function (context, req) {
    const client = bent('string');
    const html = await client('https://ogimage.blob.core.windows.net/templates/1.html');
    
    console.log('date', req.query.date);

    const img = await nodeHtmlToImage({
        html: html,
        content: {
            title: req.query.title,
            author: req.query.author,
            date: req.query.date
        }
    });
    const data = [];
    data.push(img);

    context.res = {
        setEncoding: 'binary',
        body: Buffer.concat(data),
        headers: {
            'Content-Type': 'image/png'
        }
    };
}