const cheerio = require('cheerio') 
const axios = require('axios');
const url = "https://vnexpress.net/so-hoa/cong-nghe"

const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}


class NewsCtroller {

        getlistNews = async (req, res, next) => {
        const page = req.header("page")
    
        try {
            const content = await fetchData(`${url}-p${page}`)
            const $ =cheerio.load(content)
            const posts=[]
        
        
            $('.item-news.item-news-common').each((i,e)=>{
                const post ={
                    title:'',
                    img:'',
                    href:'',
                    description:'',
                }
                    const title = $(e).find('h2.title-news').text().trim();
                    post.title = title
                    const gif = $(e).find('img').attr('data-src');
                    const img = $(e).find('img').attr('src');
                    if(gif)
                        post.img = gif
                    else post.img = img
                    const href = $(e).find('.thumb-art >a').attr('href');
                    post.href = href
                    const description = $(e).find('.description >a').text().trim();
                    post.description = description
        
                    if(title && href && description)
                        posts.push(post)
        
            })
            res.json({news:posts,total:posts.length})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
       
        }
        getDetailnews = async (req, res, next) => {
            const href = req.header("href")
            try {
                const content = await fetchData(href)
            const $ =cheerio.load(content)
            const post ={
                title:'',
                description:'',
                content:[],
            }
        
            const title =  $('.sidebar-1').find('h1.title-detail').text();
                post.title = title
            const description =  $('.sidebar-1').find('p.description').text();
                post.description = description
            $('article.fck_detail').children().each((i,e)=>{
                if($(e).get(0).tagName === 'p')
                    post.content.push($(e).text())
                if($(e).get(0).tagName === 'figure')
                    post.content.push('img '+$(e).find('meta').attr('content'))
            })
            res.json({news:post})
            } catch (error) {
                return res.status(500).json({msg: error.message})
            }
            
        }
    
    }
    
    const newsCtroller = new NewsCtroller()
    
    module.exports = newsCtroller
    
