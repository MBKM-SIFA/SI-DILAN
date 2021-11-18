module.exports = executeQueryFromFile = () => {
            
    const listOfQueries =  fs.readFileSync(`${__dirname}/query.sql`).toString().split(';');
    listOfQueries.pop();

    listOfQueries.forEach(query => {
        executeQuery(query)
    });

};