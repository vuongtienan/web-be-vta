const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const SiteInfor = new Schema({
  siteName: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  contact: { type: Object },
  createDate: { type: Date, default: Date.now },
  //videoID: { type: String, maxLength:1000},
  //videoTitle: { type: String}
})

module.exports = mongoose.model('site_infor', SiteInfor)