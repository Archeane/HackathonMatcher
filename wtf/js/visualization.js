$(document).ready(function(){

	var matches = [];
	for(i = 0; i < allMatches.length; i++){
		matches.push(JSON.parse(allMatches[i]));
	}
	display(matches);
/*

	var allMajors = [];
	var allGradYears = [];
	var allEduLevels = [];
	var allNumOfHacks = [];

	for(i = 0; i < allMatches.length; i++){
		var user = JSON.parse(allMatches[i]);
		if(!(allMajors.includes(user.major))){
			allMajors.push(user.major);
		}
		if(!(allGradYears.includes(user.graduationYear))){
			allGradYears.push(user.graduationYear);
		}
		if(!(allEduLevels.includes(user.educationLevel))){
			allEduLevels.push(user.educationLevel);
		}
		if(!(allNumOfHacks.includes(user.hackathons.length))){
			allNumOfHacks.push(user.hackathons.length);
		}
	}

	var gradFilter = document.querySelector(".gradYear");
	for(g = 0; g < allGradYears.length; g++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allGradYears[g];
		checkBox.value = allGradYears[g];
		checkBox.id = allGradYears[g];

		var label = document.createElement('label');
		label.htmlFor = allGradYears[g];
		label.appendChild(document.createTextNode(allGradYears[g]));
		gradFilter.appendChild(checkBox);
		gradFilter.appendChild(label);
	}
	var eduFilter = document.querySelector(".eduLevel");
	for(m = 0; m < allEduLevels.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allEduLevels[m];
		checkBox.value = allEduLevels[m];
		checkBox.id = allEduLevels[m];

		var label = document.createElement('label');
		label.htmlFor = allEduLevels[m];
		label.appendChild(document.createTextNode(allEduLevels[m]));
		eduFilter.appendChild(checkBox);
		eduFilter.appendChild(label);
	}
	var hacksFilter = document.querySelector(".numOfHacks");
	for(m = 0; m < allNumOfHacks.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allNumOfHacks[m];
		checkBox.value = allNumOfHacks[m];
		checkBox.id = allNumOfHacks[m];

		var label = document.createElement('label');
		label.htmlFor = allNumOfHacks[m];
		label.appendChild(document.createTextNode(allNumOfHacks[m]));
		hacksFilter.appendChild(checkBox);
		hacksFilter.appendChild(label);
	}
	var majorsFilter = document.querySelector(".major");
	for(m = 0; m < allMajors.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allMajors[m];
		checkBox.value = allMajors[m];
		checkBox.id = allMajors[m];

		var label = document.createElement('label');
		label.htmlFor = allMajors[m];
		label.appendChild(document.createTextNode(allMajors[m]));
		majorsFilter.appendChild(checkBox);
		majorsFilter.appendChild(label);
	}


   
	var j = JSON.stringify({'content':'hello','csrfmiddlewaretoken': '{{ csrf_token }}'})
	var filters = [];
	$('#submitFilters').on('click', (event) => {
		//event.preventDefault();
		$('input[type=checkbox]').each(function(){
			if(this.checked == true){
				filters.push(this.value);
			}
		});
		var filtersJSON = JSON.stringify(filters)
		//TODO: replace hardcoded url
		$.ajax(
		    {
		        type: 'POST',
		        url: 'http://localhost:8080/test',
		        data: filtersJSON,
		        success: function(data){
			       console.log(data);
			    },
	            error: function(jqXHR, textStatus, err) {
	                //show error message
	              	console.log('text status '+textStatus+', err '+err)
	            }
		    }
		);
	});
	
	/*
	$(':checkbox').on('change',function(){
		if($(this).prop('checked')){
			filters.push($(this).val());
			console.log(filters);
		}else{
			var index = filters.indexOf($(this).val());
			if (index !== -1) filters.splice(index, 1);
			console.log(filters);
		}
	});
	*/
});


function bubbleChart() {
  var width = 1200;
  var height = 800;

  var center = { x: width / 2, y: height / 2 };
  var damper = 0.102;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }

  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);


  var fillColor = d3.scale.ordinal()
    .domain(['undergraduate', 'graduate', 'PhD'])
    .range(['#d84b2a', '#beccae', '#7aa25c']);

  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 85]);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        radius: radiusScale(+d.score),
        value: d.score,
        name: d.name,
        school: d.school,
        major: d.major,
        graduationYear: d.graduationYear,
        educationLevel: d.educationLevel,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
  	//console.log(rawData);
    var maxAmount = d3.max(rawData, function (d) { return +d.score; });
    radiusScale.domain([0, maxAmount]);

    nodes = createNodes(rawData);
    force.nodes(nodes);

    console.log("nodes", nodes);
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { console.log(d.name); return d.name; });

    bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    groupBubbles();
  };

  function groupBubbles() {

    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }

  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }

  function splitBubbles() {
    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }

  function moveToYears(alpha) {
    return function (d) {
      var target = yearCenters[d.year];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
    };
  }

  function showDetail(d) {
    d3.select(this).attr('stroke', 'black');

    console.log(d);

    var content = '<span class="name">Title: </span><span class="value">' +
                  d.name +
                  '</span><br/>' +
                  '<span class="name">Amount: </span><span class="value">$' +
                  addCommas(d.value) +
                  '</span><br/>' +
                  '<span class="name">Year: </span><span class="value">' +
                  d.year +
                  '</span>';

    //tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    //tooltip.hideTooltip();
  }
  
  // return the chart function from closure.
  return chart;
}


var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(data) {
  myBubbleChart('#vis', data);
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.

//d3.csv('data/gates_money.csv', display);

// setup the buttons.
//setupButtons();
