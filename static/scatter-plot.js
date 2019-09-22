// adapted from Michele Weigle's block here: http://bl.ocks.org/weiglemc/6185069
function scatterPlot(data, regressionLine, seriesNames) {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const height = 400;
    const width = 600;

    const xScale = d3.scaleLinear().range([0, width]);
    const xAxis = d3.axisBottom(xScale);
    const yScale = d3.scaleLinear().range([height, 0]);
    const yAxis = d3.axisLeft(yScale);
    const getX = (d) => d.x;
    const getY = (d) => d.y;
    const posX = (d) => xScale(getX(d));
    const posY = (d) => yScale(getY(d));

    const midEastRed = '#EABA6B';
    const spiro = '#2DC7FF';

    var svg = d3.select('#regression-plot')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xMax = d3.max(data, getX);
    xScale.domain([d3.min(data, getX) - 1, xMax + 1]);
    yScale.domain([d3.min(data, getY) - 1, d3.max(data, getY) + 1]);

    const regressionPoints = {
        x1: xScale(margin.right),
        x2: xScale(xMax),
        y1: yScale(regressionLine.intercept),
        y2: yScale((xMax * regressionLine.slope) + regressionLine.intercept),
    };

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .append('text')
        .attr('class', 'label')
        .attr('x', width)
        .attr('y', -6)
        .style('text-anchor', 'end')
        .text(seriesNames.x);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .style('text-anchor', 'end')
        .text(seriesNames.y);

    svg.append('g')
        .attr('class', 'dots')
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', posX)
        .attr('cy', posY)
        .style('fill', midEastRed)
        .style('stroke', 'black')
        .style('stroke-width', 1);

    svg.append('g')
        .attr('class', 'line')
        .append('line')
        .datum(data)
        .attr('class', 'reg-line')
        .attr('x1', regressionPoints.x1)
        .attr('x2', regressionPoints.x2)
        .attr('y1', regressionPoints.y1)
        .attr('y2', regressionPoints.y2)
        .attr('stroke', 'red')
        .attr('stroke-width', 2);


        // .on('mouseover', function(d) {
        //     tooltip.transition()
        //          .duration(200)
        //          .style('opacity', .9);
        //     tooltip.html(d['Cereal Name'] + '<br/> (' + xValue(d)
  	    //     + ', ' + yValue(d) + ')')
        //          .style('left', (d3.event.pageX + 5) + 'px')
        //          .style('top', (d3.event.pageY - 28) + 'px');
        // })
        // .on('mouseout', function(d) {
        //     tooltip.transition()
        //          .duration(500)
        //          .style('opacity', 0);
        // });
}
