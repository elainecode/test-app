require('dotenv').config();
const random_id = require('uuid/v4');
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE = process.env.BASE;
const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base(BASE);


 module.exports = {


firstTenRecords: async () => {
 let tableRecords = await 
  base('Table 1')
  .select({ maxRecords: 60, view: "Grid view"})
  .firstPage().then(async (records) => {
          return records.map( record => {   
          return {
          url: record.get('URL'),
          title: record.get('Description'),
          uid: random_id(),
          tags: record.get('Tags')
         }
      }) 
})
return tableRecords;
},


allTags: async () => {
  let arrayOfTags = await
  base('Table 1')
  .select({ maxRecords: 10, view: "Grid view", fields: ["Tags"]})
  .firstPage()
  .then(data => {
    return data.map((item) => item['fields']['Tags'])
    .reduce( (a, b) => {return a.concat(b)},[])
   })
    return [...new Set(arrayOfTags)].map( tag => {
    return {tagname: tag}
  })

}, 

fewUsers: () => {
  return [
  { 
    email: "e3e3c33c",
    username: "Wes",
    password: "12244",
    tags: ["mistake..."]
    },
    {
      email: "lnjjwcjc",
      username: "Jules",
      password: "12244",
      tags: ["mistake..."]
    },
     { 
      email: "bcnnew",
      username: "Yana",
      password: "12244",
      tags: ["mistake...will remove you soon"]
    }
  ]
}

}

// const items = async (cb) => {
//   let my_records = await cb()
//    return my_records
// }

