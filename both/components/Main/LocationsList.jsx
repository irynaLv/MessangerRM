LocationsList = React.createClass({
    getInitialState(){
        var me = this;
        return {
             locations: Meteor.call("getLocations", {}, function(e, arr){
                 me.setState({locations : arr});
             })
        };
    },

    render(){

        if(!this.state.locations){
            return  <div></div>
        }
        return(
            <ul className="collection">
                {this.state.locations.map(function(listValue){
                    return <li key={listValue._id} className="collection-item">{listValue.name}</li>;
                })}
            </ul>
        )
    }
})