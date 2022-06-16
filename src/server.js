const {build}= require('./app')

const app = build(
    {logger: true}, 
    {exposeRoute: true, routePrefix: '/docs', swagger: {info:{title: "Fastify API", version: "1.0.0"}}},
    { connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'})

app.listen(3000, function(err, address){
    if(err){
        app.log.console.error(err)
        process.exit(1)
    }
})