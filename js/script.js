// VARIABLES
var taille = 1.5;

var margin = {top: 0, right: 0 , bottom: 0, left: 0},
    width = (728 - margin.left - margin.right)*taille,
    height = (428 - margin.top - margin.bottom)*taille,
    padding = 0;

var projection = d3.geo.equirectangular()
    .scale(114*taille)
    .translate([width / 2, height / 2]);

var radius = d3.scale.sqrt()
    .domain([0, .165]) // MAX value ratio OR "d3.max(value)" 
    .range([0, 30]);

var force = d3.layout.force()
    .charge(0)
    .gravity(0)
    .size([width, height]);

var svg = d3.select("#carte").append("svg")
    .attr("width", width)
    .attr("height", height);

var arr = Array();


// FUNCTIONS
function allGraph() {
  var url_json = 'data';
  $.getJSON('centroids/centroid-'+url_json+'.json', function(data) {
    $.each(data.features, function (index, value) {
        arr.push([value.id, value.properties.value]);
    });
    graph();
  });
}

function graph() {
  d3.json("centroids/centroid-country.json", function(error, states) {
    if (error) throw error;

    var nodes = states.features
          .map(function(d) {
            var value = d.properties.value;
            var trueValue = d.properties.value;

            arr.forEach(function (element, index, array) {
                if (d.id == element[0]) {
                    value = element[1]*6 ;
                    trueValue = element[1];
                }
            });

            value+=1;

            var point = projection(d.geometry.coordinates),
                RatioReserve = value/500,
                titre = "id="+d.id+", country="+d.properties.name+", value="+trueValue+"%";

            return {
              x: point[0], y: point[1],
              x0: point[0], y0: point[1],
              r: radius(RatioReserve)*taille,
              titre: titre,
              trueValue: trueValue
            };
            
          });

      force
          .nodes(nodes)
          .on("tick", tick)
          .start();

    var node = svg.selectAll("rect")
        .data(nodes)
      .enter().append("rect")
        .attr("width", function(d) { return (d.r*2);})
        .attr("height", function(d) { return (d.r*2);})
        .each(function(){ 
          d3.select(this).attr("fill",  function(d) {return getColorFromValue(d.trueValue);});
          d3.select(this).attr("title",  function(d) { return d.titre; } );

          //d3.select(this).html("<p>coucou</p>");
        });

    // FUNCTION OF GRAPH()
    function tick(e) {
      node.each(gravity(e.alpha * .1))
          .each(collide(.5))
          .attr("x", function(d) { return (d.x - d.r); })
          .attr("y", function(d) { return (d.y - d.r); });
    }

    function gravity(k) {
      return function(d) {
        d.x += (d.x0 - d.x) * k;
        d.y += (d.y0 - d.y) * k;
      };
    }

    function collide(k) {
      var q = d3.geom.quadtree(nodes);
      return function(node) {
        var nr = node.r + padding,
            nx1 = node.x - nr,
            nx2 = node.x + nr,
            ny1 = node.y - nr,
            ny2 = node.y + nr;
        q.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                lx = Math.abs(x),
                ly = Math.abs(y),
                r = nr + quad.point.r;
            if (lx < r && ly < r) {
              if (lx > ly) {
                lx = (lx - r) * (x < 0 ? -k : k);
                node.x -= lx;
                quad.point.x += lx;
              } else {
                ly = (ly - r) * (y < 0 ? -k : k);
                node.y -= ly;
                quad.point.y += ly;
              }
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }

    function getColorFromValue(value) {
      if (value > 10) {
          return "#B12535";
      } else if (value > 5) {
          return "#D76D43";
      } else if (value > 0) {
          return "#EFC46E";
      } else {
          return "#ECECED";
      }
    }

  });
}