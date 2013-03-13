function draw(data) {

var i = data.length, j, tempi, tempj;
while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    tempi = data[i];
    tempj = data[j];
    data[i] = tempj;
    data[j] = tempi;
}

var distributions = data.map(function(d) { return d.distribution; });
var votes = data.map(function(d) { return d.votes; });

var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 900)
    .attr("height", 50 * distributions.length);

var x = d3.scale.linear()
    .domain([0, d3.max(votes)])
    .range([0, 900]);

function highlight(i, toggle) {
    if (toggle) 
        d3.select("#" + distributions[i])
            .transition()
            .style('fill', 'slateblue');
    else 
        d3.select("#" + distributions[i])
            .transition()
            .style('fill', '#4e5d85');
}

chart.selectAll("rect")
    .data(votes)
  .enter().append("rect")
    .attr("id", function(d,i) { return distributions[i]; })
    .attr("y", function(d, i) { return i * 50; })
    .attr("width", x)
    .attr("height", 50)
    .on("click", function(d,i) { window.location = "http://search.cpan.org/dist/" + distributions[i]; })
    .on("mouseover", function(d,i) { highlight(i, 1); })
    .on("mouseout", function(d,i) { highlight(i, 0); });

chart.selectAll("text")
    .data(votes)
  .enter().append("text")
    .attr("x", 10)
    .attr("y", function(d, i) { return i * 50 - 50; })
    .attr("dy", "5em")
    .text(function(d, i) { return distributions[i]; })
    .on("mouseover", function(d,i) { highlight(i, 1); })
    .on("mouseout", function(d,i) { highlight(i, 0); });

}
