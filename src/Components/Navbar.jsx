import  {AppBar , Toolbar, Typography , makeStyles} from '@material-ui/core';

const styles = makeStyles({
    header: {
        background: 'black'
    }
})

const Navbar =() => {
    const classes = styles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar>
                <Typography component="h1">React Website</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;