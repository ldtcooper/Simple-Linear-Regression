// adapted from Michele Weigle's block here: http://bl.ocks.org/weiglemc/6185069
// and from Chris Tuft's block here: https://bl.ocks.org/ctufts/298bfe4b11989960eeeecc9394e9f118
function scatterPlot(data, regressionLine, seriesNames) {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
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

    const titleCase = (text) => `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;

    const midEastRed = '#EABA6B';
    const spiro = '#2DC7FF';

    var svg = d3.select('#regression-plot')
        .attr('class', 'results__chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var tooltip = d3.select('body').append('div')
        .attr('class', 'results__tooltip')
        .style('opacity', 0);

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
        .attr('x', width / 2)
        .attr('y', 30)
        .style('text-anchor', 'center')
        .text(titleCase(seriesNames.x))
        .style('fill', 'black');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', -30)
        .attr('x', -(width / 3))
        .style('text-anchor', 'center')
        .text(titleCase(seriesNames.y))
        .style('fill', 'black');

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
        .style('stroke-width', 1)
        .on('mouseover', (d) => {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);

            tooltip.html(`${titleCase(seriesNames.x)}: ${d.x}<br />${titleCase(seriesNames.y)}: ${d.y}`)
                .style('left', `${(d3.event.pageX + 5)}px`)
                .style('top', `${(d3.event.pageY - 28)}px`);
        })
        .on('mouseout', (d) => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
        });

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


}
