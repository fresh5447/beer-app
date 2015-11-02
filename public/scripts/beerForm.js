var BeerForm = React.createClass({

  handleSubmit: function(e){

    e.preventDefault();

    var name = React.findDOMNode(this.refs.name).value.trim();
    var image = React.findDOMNode(this.refs.image).value.trim();
    var category = React.findDOMNode(this.refs.category).value.trim();
    var ibu = React.findDOMNode(this.refs.ibu).value.trim();
    var abv = React.findDOMNode(this.refs.abv).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var brewery = React.findDOMNode(this.refs.brewery).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();




    if(!name){
      return;
    }

    var data = ({name: name, image: image, category: category, ibu: ibu, abv: abv, location: location, brewery: brewery, description: description});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: data,
      type:'POST',
      success: function(response){
        console.log("posting data!",data, response)
        document.location='/'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not posting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },


  render: function() {
    return (

     <div className="col-sm-6 col-md-8">
     <h1>Enter New Beers</h1>
     <hr/>
     <form>
     <div className="form-group">
     <label>Beer Name</label>
     <input type="text" className="form-control" ref="name" placeholder="Beer Name"/>
     </div>
     <div className="form-group">
     <label>Image URL</label>
     <input type="text" className="form-control" ref="image" placeholder="Image URL"/>
     </div>

     <div className="form-group">
     <label>Type of Beer </label>
     <input type="author" className="form-control" ref="category" placeholder="Type of Beer"/>
     </div>
     <div className="form-group">
     <label>IBU</label>
     <input className="form-control" ref="ibu" placeholder="IBU"/>
     </div>
     <div className="form-group">
     <label>ABV</label>
     <input className="form-control" ref="abv" placeholder="ABV"/>
     </div><div className="form-group">
     <label>Location</label>
     <input className="form-control" ref="location" placeholder="Location"/>
     </div><div className="form-group">
     <label>Brewery</label>
     <input className="form-control" ref="brewery" placeholder="Brewery"/>
     </div><div className="form-group">
     <label>Description</label>
     <textarea  rows="15" className="form-control" ref="description" placeholder="Description"></textarea>
     </div>
     <button onClick={this.handleSubmit} type="submit" className="btn btn-default"> Submit </button>
     </form>
     </div>

     );
}
});


var OnTapList = React.createClass({

  deleteClick: function(id) {
    var id = id;
    console.log(id);
    alert("Are you sure you want to delete?");

    $.ajax({
      url: this.props.url + id,
      dataType: 'json',
      type:'DELETE',
      success: function(response){
        console.log("Deleting data!", response)
        document.location='/'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not deleting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })

  },
  handleUpdate: function(id){
    
    var id = id;

    var name = React.findDOMNode(this.refs.name).value.trim();
    var image = React.findDOMNode(this.refs.image).value.trim();
    var category = React.findDOMNode(this.refs.category).value.trim();
    var ibu = React.findDOMNode(this.refs.ibu).value.trim();
    var abv = React.findDOMNode(this.refs.abv).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var brewery = React.findDOMNode(this.refs.brewery).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();

    console.log(id);
    if(!name){
      return;
    }

    var data = ({name: name, image: image, category: category, ibu: ibu, abv: abv, location: location, brewery: brewery, description: description});

    $.ajax({
      url: this.props.url + id,
      dataType: 'json',
      data: data,
      type:'PUT',
      success: function(response){
        console.log("posting data!", data, response)
        document.location='/'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not posting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  
  getInitialState: function(){
    return {
      fltr: null
    };
  },

  toggle: function (name) {
    console.log(name);
    this.setState({
      fltr: name
    })
  },
  reToggle: function (id) {
    this.setState({
      fltr: null
    })
  },
  render: function() {

    var that = this;
    
    var updateBeerForm = this.props.data.map(function(beer){
      if (beer.name === this.state.fltr)
       return (
        <div className="col-md-8">
        <form>
        <label>{beer.name}</label>
     <div className="form-group">
     <label>Beer Name</label>
     <input type="text" className="form-control" ref="name" placeholder={beer.name}/>
     </div>
     <div className="form-group">
     <label>Image URL</label>
     <input type="text" className="form-control" ref="image" value={beer.image}/>
     </div>

     <div className="form-group">
     <label>Type of Beer </label>
     <input type="author" className="form-control" ref="category" value={beer.category}/>
     </div>
     <div className="form-group">
     <label>IBU</label>
     <input className="form-control" ref="ibu" value={beer.ibu}/>
     </div>
     <div className="form-group">
     <label>ABV</label>
     <input className="form-control" ref="abv" value={beer.abv}/>
     </div><div className="form-group">
     <label>Location</label>
     <input className="form-control" ref="location" value={beer.location}/>
     </div><div className="form-group">
     <label>Brewery</label>
     <input className="form-control" ref="brewery" value={beer.brewery}/>
     </div><div className="form-group">
     <label>Description</label>
     <textarea  rows="15" className="form-control" ref="description" value={beer.description}></textarea>
     </div>
     <button onClick={that.handleUpdate.bind(this, beer._id)} type="submit" className="btn btn-default"> Submit </button>
     </form>
        </div>

        )
}.bind(this));  

var beerData = this.props.data.map(function(beer){
     return (
       <div>
       {beer.name}
        <button onClick={that.toggle.bind(that, beer.name)}><i className="fa fa-pencil"></i></button>
        <button  onClick={that.deleteClick.bind(this, beer._id)}><i className="fa fa-minus-circle" ></i></button>
       </div>
       )
   });

return (

  <div className="container">
  <div className="row">
  {beerData}
  {updateBeerForm}
  </div>
  </div>
  );
}
});


var App = React.createClass({
  getInitialState: function(){
    return {data: []};
  },

  loadBeers: function(beer) {
    // var beerPost = this.state.data;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log("inside success")
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log("Broken url is " + this.props.url)
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadBeers();
  },


  render: function() {
    return (
      <div>
      <OnTapList data={this.state.data} url="/api/beer/"/>

      </div>
      )
  }
})

React.render(<BeerForm url="/api/beer/"/>, document.getElementById('beerForm'));
React.render(<App url="/api/beer/"/>, document.getElementById('allBeers'));