function plot_sequence(seq, grid_wrap, svg_class)
{
  seq_array = seq.split("")
  var number_of_lines = Math.ceil(seq_array.length/grid_wrap);
  var unitSize = getEmSize(svg_class);
  var width = grid_wrap*unitSize+(unitSize*4);
  var height = (number_of_lines*unitSize)+(unitSize*4);
  var margin = {top: unitSize*2, right: unitSize*2, bottom: unitSize*2, left: unitSize*2};

  var xTop = d3.scale.linear()
      .domain([5, grid_wrap])
      .range([unitSize*5-(unitSize/2), width-(unitSize*5)+(unitSize/2)]);

  var lower_offset = Math.floor(seq_array.length/grid_wrap)*grid_wrap
  var xBottom = d3.scale.linear()
      .domain([lower_offset+5, lower_offset+grid_wrap])
      .range([unitSize*5-(unitSize/2), width-(unitSize*5)+(unitSize/2)]);

  var xAxisTop = d3.svg.axis()
    .scale(xTop)
    .orient("top");

  var xAxisBottom = d3.svg.axis()
    .scale(xBottom)
    .orient("bottom");

  var left_domain = new Array(number_of_lines);
  for(var i=0;i<left_domain.length;i++){
    left_domain[i] = (i*50) + 1;
  }
  left_domain.reverse();
  var yLeft = d3.scale.ordinal()
      .domain(left_domain)
      .rangePoints([unitSize*(number_of_lines-1), 1]);
  var yAxisLeft = d3.svg.axis()
    .scale(yLeft)
    .ticks(number_of_lines)
    .tickSize(0)
    .orient("left");

  var right_domain = left_domain;
  for(var i=0;i<right_domain.length;i++){
    right_domain[i] = right_domain[i]+49;
  }
  var yRight = d3.scale.ordinal()
      .domain(right_domain)
      .rangePoints([unitSize*(number_of_lines-1), 1]);
  var yAxisRight = d3.svg.axis()
    .scale(yRight)
    .ticks(number_of_lines)
    .tickSize(0)
    .orient("right");

  var chart = d3.select("."+svg_class)
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,0)")
    .attr("font-size", (unitSize/2))
    .attr("font-family", "sans-serif")
    .call(xAxisTop);

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+unitSize*number_of_lines+")")
    .attr("font-size", (unitSize/2))
    .attr("font-family", "sans-serif")
    .call(xAxisBottom);

  chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,"+unitSize*0.5+")")
      .attr("font-size", (unitSize/2))
      .attr("font-family", "sans-serif")
      .call(yAxisLeft);

  chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+unitSize*grid_wrap+","+unitSize*0.4+")")
      .attr("font-size", (unitSize/2))
      .attr("font-family", "sans-serif")
      .call(yAxisRight);

  var sequence = chart.selectAll(".item")
      .data(seq_array)
    .enter().append("g")
      .attr("transform", function(d, i) {
        var row_idx = Math.floor(i/grid_wrap);
        x_offset = (i * unitSize) - (row_idx * grid_wrap * unitSize)
        y_offset = row_idx * unitSize
        return("translate("+x_offset+","+y_offset+")")
      });

  sequence.append("rect")
      .attr("width", unitSize)
      .attr("height", unitSize)
      .attr("class", "unknown")
      .attr("id", function(d, i){return("pos_"+i)});

  sequence.append("text")
      .attr("x", function(d) { return unitSize - (unitSize/3); })
      .attr("y", (unitSize / 2)-(unitSize/100))
      .attr("font-size", (unitSize/2))
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  return(chart)
}

function getEmSize(el) {
    var tag = document.getElementById(el);
    return Number(getComputedStyle(tag, "").fontSize.match(/(\d+(\.\d*)?)px/)[1]);
}
