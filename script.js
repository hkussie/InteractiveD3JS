(function () {
	var width = 500;
	var height = 500;

	var svg = d3.select("#chart")
	   .append("svg")
	   .attr("height", height)
	   .attr("width", width)
	   .append("g")
	   .attr("transform", "translate(0, 0)")

	var radiusScale = d3.scaleSqrt().domain([0.6, 16.7]).range([10, 80])   
/*
Use d3 force to initiate movement amoungst the bubbles.
The simulation is a collection of forces, 
which will determine how the circles will move. 
*/
	var simulation = d3.forceSimulation()
	  .force("x", d3.forceX(width / 2).strength(0.05))
	  .force("y", d3.forceY(height / 2).strength(0.05))
	  .force("collide", d3.forceCollide(function(d){
	  	return radiusScale(d.GDP);
	  }))

//To Prevent collision with other data points, use 
//d3 forceCollide()
//use function for forceCollide to return radiusScale(d.GDP)	    

	d3.queue()
	  .defer(d3.csv, "Data.csv")
	  .await(ready)

	function ready(error, datapoints) {

	  var circles = svg.selectAll(".Name")
	    .data(datapoints)
	    .enter().append("circle")
	    .attr("class", "artist")
	    .attr("r", function(d) {
	    	return radiusScale(d.GDP);
	    })
	    .attr("fill", "lightblue")

	  simulation.nodes(datapoints)
	    .on('tick', ticked)
	  
	  function ticked() {
	  	circles
	  	  .attr("cx", function (d) {
	  	  	return d.x
	  	  })
	  	  .attr("cy", function (d) {
	  	  	return d.y
	  	  })
	  }

	}    

})();