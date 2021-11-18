module.exports = {
    redirect : function ( route ){
        return (req, res, next) => {
            res.redirect(route)
        }
    },
    render : function ( view ){
        return (req, res, next) => {
            res.render( view )
        }
    }
}