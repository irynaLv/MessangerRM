// Reaktor API:  https://github.com/kadirahq/meteor-reaktor
// Router API:   https://github.com/meteorhacks/flow-router

// NOTE see flow-router branch for the vanilla router

Reaktor.init(
    <Router>
        <Route path="/" content={Home} layout={MainLayout} triggersEnter={isLoggedOut}/>
        <Route path="/login" content={Login} layout={MainLayout} triggersEnter={isLoggedIn}/>
        <Route path="/register" content={Register} layout={MainLayout} triggersEnter={isLoggedIn} />
        <Route path="/logout" content={Login} layout={MainLayout} triggersEnter={isLoggedOut}/>
        <Route path="/edit" content={Edit} layout={MainLayout} triggersEnter={isLoggedOut}/>
        <Route path="/locations" content={Locations} layout={MainLayout} triggersEnter={isLoggedOut}/>
        <Route path="/changePassword" content={ChangePassword} layout={MainLayout} triggersEnter={isLoggedOut}/>
    </Router>
);

function isLoggedIn(context, doRedirect){
    if(User.isLoggedIn()){
        doRedirect("/")
    }
}

function isLoggedOut(context, doRedirect){
    if(User.isLoggedOut()){
        doRedirect("/login")
    }
}

// Reaktor doensn't have a notFound component yet
FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};
