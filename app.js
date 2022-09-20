

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const w = 800;
const h = 600;
const padding = 60;

// const setToolTip = () => {

//     let tool = document.getElementById("tooltip");

//     tool.addEventListener("mouseenter", (item) => {
//         tool.textContent(item[0])
//     })
// }


fetch(url)
          .then(response => response.json())
          .then(gdp => {


                    let data = gdp.data;   

                    let svg = d3.select("svg")
                        svg.attr("width", w)
                        svg.attr("height", h);


                    let  tooltip = d3.select("body")
                                     .append("div")
                                     .attr("id", "tooltip")
                                     .style("visibility", "hidden")
                                     .style("width", "auto")
                                     .style("height", "auto");
                    


                    let yScale = d3.scaleLinear()
                                   .domain([0, d3.max(data, arr => arr[1])])
                                   .range([0, h - (padding * 2)]);

                    let xScale = d3.scaleLinear()
                                   .domain([0, data.length - 1])
                                   .range([padding, w - padding]);


                    let dates = data.map(date => {
                        return new Date(date[0])
                    });



                    let xAxisScale = d3.scaleTime()
                                       .domain([d3.min(dates), d3.max(dates)])
                                       .range([padding, w - padding]);

                    let yAxisScale = d3.scaleLinear()
                                       .domain([0, d3.max(data, arr => arr[1])])
                                       .range([h - padding, padding]);

                    let xAxis = d3.axisBottom(xAxisScale);

                    svg.append("g")
                       .call(xAxis)
                       .attr("id", "x-axis")
                       .attr("transform", `translate(0, ${h - padding})`);


                    let yAxis = d3.axisLeft(yAxisScale)

                    svg.append("g")
                       .call(yAxis)
                       .attr("id", "y-axis")
                       .attr("transform", `translate(${padding}, 0)`);


                    svg.selectAll("rect")
                       .data(data)
                       .enter()
                       .append("rect")
                       .attr("class", "bar")
                       .attr("width", (w - (padding * 2)) / data.length)
                       .attr("height", d => yScale(d[1]))
                       .attr("data-date", d => d[0])
                       .attr("data-gdp", d => d[1])
                       .attr("x", (d, i) => xScale(i))
                       .attr("y", (d) => ((h - padding) - yScale(d[1])))
                       .style("fill", (d, i) => i % 2 === 0 ? "aquamarine" : "pink")
                       .on("mouseover", (d) => {
                           tooltip.transition()
                                  .style("visibility", "visible")
                           tooltip.text(d[0])
                        //    console.log(d[0])

                           document.querySelector('#tooltip').setAttribute('data-date', d[0])

                       })
                       .on('mouseout', () => {
                        tooltip.transition()
                            .style('visibility', 'hidden')
                       })        





                    //    .append("title", "tooltip")
                    //    .attr("id", "tooltip")
                    //    .attr("data-date", d => d[0])
                    //    .text(d=> d[0])

                    // const rect = document.querySelector(".bar");


                    // console.log(rect)

                    // rect.addEventListener("mouseenter", (() => {
                    //     rect.setAttribute("style", "fill: yellow;")
                    // }))



          });



// const rect = document.querySelector(".bar");

// rect.addEventListener("mouseenter", (() => {
//     rect.setAttribute("fill", "yellow")
// }))





