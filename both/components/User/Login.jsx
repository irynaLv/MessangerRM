Login = React.createClass({
    getInitialState(){
        return {
            userName: null
        };
    },

    onSubmit(e){
        e.preventDefault();
        var form = $(e.target);
        var email = form.find("#email").val();
        var password = form.find("#password").val();
        Meteor.loginWithPassword(email, password,(error)=>{
            if(error){
                Materialize.toast(error.reason, 4000)
            }else{
                this.setState({userName: email})
                FlowRouter.go("/");
            }
        })
    },

    render(){
        return (
            <div className="row">
                <h4 className="text-center"> Login</h4>
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div>
                        <button className="waves-effect waves-light btn">Login</button>
                    </div>
                </form>
            </div>
        )
    }
})