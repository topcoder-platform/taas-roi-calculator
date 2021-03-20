import React, { useEffect, useRef } from 'react';
import PT from 'prop-types';
import * as d3 from 'd3';

import './styles.scss';

const DonutChart = ({
  data, innerRadius, outerRadius, width, height,
}) => {
  const ref = useRef(null);
  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const color = d3.scaleOrdinal().domain(Object.keys(data)).range(['#227681', '#54B4C0', '#2984BD', '#50ADE8']);

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove();

    const dataReady = pie(d3.entries(data));
    const g = d3.select(ref.current);
    g.selectAll('abc').data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.key))
      .attr('stroke-width', '0');
  }, [data]);

  const marginX = width / 2 - outerRadius;
  const marginY = height / 2 - outerRadius;

  return (
    <svg width={width} height={height} styleName="donut">
      <g ref={ref} transform={`translate(${outerRadius + marginX} ${outerRadius + marginY})`} />
    </svg>
  );
};

DonutChart.defaultProps = {
  data: {
    a: 1, b: 1, r: 1, e: 1,
  },
  innerRadius: 82,
  outerRadius: 145,
  width: 296,
  height: 296,
};

DonutChart.propTypes = {
  data: PT.shape({}),
  innerRadius: PT.number,
  outerRadius: PT.number,
  width: PT.number,
  height: PT.number,
};

export default DonutChart;
