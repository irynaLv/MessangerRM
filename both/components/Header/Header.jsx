Header = React.createClass({
    getInitialState(){
        return {
        };
    },

    logOutUser(e){
        Meteor.logout((error)=>{
            if(error){
                Materialize.toast(error.reason, 4000)
            }else{
                this.setState({isLoggedIn: !this.state.isLoggedIn});
                FlowRouter.go("/login");
            }
        }.bind(this));
    },

    render() {
        var navOption;
        if(User.isLoggedIn()){
            navOption = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    <li><a href="/locations">Locations</a></li>
                    <li><a href="/edit"> <i className="small material-icons perm_identity">perm_identity</i></a></li>
                    <li><a onClick={this.logOutUser} href="/logout">Logout</a></li>
                </ul>
            )
        }else{
            navOption = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </ul>
            )
        }

        return (
            <nav className="header-nav-bar">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Messanger</a>
                    {navOption}
                </div>
            </nav>
        );
    }
});
