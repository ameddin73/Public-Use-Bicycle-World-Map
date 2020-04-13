# Public-Use-Bicycle-World-Map
This project is designed to use the data currently found at [bikesharingmap.com](http://bikesharingmap.com) to create a more elegant, consumable, and interactive experience.
Challengingly, the source of truth for this data is stored in a Google Sheet. The client (my dad - this is a Christmas gift) requested no change in workflow. The solution: store data for the site in a database that is updated from the sheet upon request.

## Stack

### Server
- [x] [Node.js](https://nodejs.org/en/)
- [x] [Express.js](https://expressjs.com/)
- [x] [Sequelize](https://sequelize.org/) (MySql)
- [x] [Google Sheets API](https://developers.google.com/sheets/api)

### Client
- [x] [Vue.js](https://vuejs.org/)
- [x] [Mapbox](https://www.mapbox.com/)
- [x] [Google Identity](https://developers.google.com/identity)

### Infrastructure
- [ ] [Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/)
- [ ] [Relational Database Service](https://aws.amazon.com/rds/)
- [ ] [AWS CodePipeline](https://aws.amazon.com/codepipeline/) with GitHub
