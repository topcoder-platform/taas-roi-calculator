import React, { useEffect, useRef, useState } from 'react';
import PT from 'prop-types';
import _ from 'lodash';
import * as d3 from 'd3';
import * as utils from '../../utils';

import './styles.scss';

const LineChart = ({
  data, width, height,
}) => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const margin = {
    top: 6, left: 40, right: 20, bottom: 30,
  };

  const [variableWidth, setVariableWidth] = useState(width);
  const [innerWidth, setInnerWidth] = useState(width - margin.left - margin.right);
  const innerHeight = height - margin.top - margin.bottom;
  const clientWidth = containerRef.current && containerRef.current.clientWidth;
  if (clientWidth !== variableWidth) {
    setVariableWidth(clientWidth);
    setInnerWidth(clientWidth - margin.left - margin.right);
  }

  const x = d3.scaleLinear()
    .domain([1, 5])
    .range([0, innerWidth]);

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);

  const color = d3.scaleOrdinal().domain(_.uniq(data.map((d) => d.name))).range(['#7F7F7F', '#0AB88A']);

  useEffect(() => {
    const handleResize = _.throttle(() => {
      const newClientWidth = containerRef.current.clientWidth;
      setVariableWidth(newClientWidth);
      setInnerWidth(newClientWidth - margin.left - margin.right);
    }, process.env.GUIKIT.DEBOUNCE_ON_CHANGE_TIME);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove();

    const dataReady = d3.group(data, (d) => d.name);
    const g = d3.select(ref.current);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `Month ${utils.format2DigitsNumber(d)}`));
    g.append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(-10, 0)')
      .call(d3.axisLeft(y).ticks(6).tickFormat((d) => `${d}%`).tickSize(-innerWidth - margin.right - 10));

    g.selectAll()
      .data(dataReady)
      .enter()
      .append('g')
      .attr('fill', (d) => color(d[0]))
      .selectAll()
      .data((d) => d[1])
      .enter()
      .append('circle')
      .attr('r', 3.5)
      .attr('cx', (d) => x(d.month))
      .attr('cy', (d) => y(d.productivity));

    g.selectAll()
      .data(dataReady)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d) => color(d[0]))
      .attr('stroke-width', '2.5')
      .attr('d', (d) => d3.line()
        .x((dd) => x(dd.month))
        .y((dd) => y(dd.productivity))
        .curve(d3.curveBumpX)(d[1]));

    g.select('.x-axis')
      .selectAll('.tick text')
      .call((t) => {
        t.each(function breakWords(d, index) {
          const thiz = d3.select(this);
          const [month, value] = thiz.text().split(' ');
          thiz.text('');
          if (index === 0) {
            thiz.append('tspan')
              .attr('x', '10px')
              .attr('y', '10px')
              .text(month);
            thiz.append('tspan')
              .attr('x', '10px')
              .attr('y', '26px')
              .text(value);
          } else {
            thiz.append('tspan')
              .attr('x', 0)
              .attr('y', '10px')
              .text(month);
            thiz.append('tspan')
              .attr('x', 0)
              .attr('y', '26px')
              .text(value);
          }
        });
      });
  }, [data, innerWidth]);

  return (
    <div styleName="lineChart" ref={containerRef}>
      <svg width={variableWidth} height={height}>
        <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`} />
      </svg>
    </div>
  );
};

LineChart.defaultProps = {
  data: [
    { name: 'Traditional Hiring Process', productivity: 0, month: 1 },
    { name: 'Traditional Hiring Process', productivity: 0, month: 2 },
    { name: 'Traditional Hiring Process', productivity: 40, month: 2.5 },
    { name: 'Traditional Hiring Process', productivity: 80, month: 3.5 },
    { name: 'Traditional Hiring Process', productivity: 100, month: 4 },
    { name: 'Traditional Hiring Process', productivity: 100, month: 12 },
    { name: 'Topcoder TaaS Process', productivity: 0, month: 1 },
    { name: 'Topcoder TaaS Process', productivity: 80, month: 1.8 },
    { name: 'Topcoder TaaS Process', productivity: 100, month: 2.3 },
    { name: 'Topcoder TaaS Process', productivity: 100, month: 12 },
  ],
  width: 590,
  height: 280,
};

LineChart.propTypes = {
  data: PT.arrayOf(PT.shape()),
  width: PT.number,
  height: PT.number,
};

export default LineChart;
