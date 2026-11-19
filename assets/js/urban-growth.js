// Scroll-driven bubble chart for the "Shape of Growth" blog post.
// Expects in the page: #ug-scrolly (with #ug-chart, #ug-year, #ug-legend and
// .ug-step[data-slug] elements), #ug-explore (with #ug-chart2, #ug-legend2,
// #ug-play, #ug-slider, #ug-year2) and window.UG_DATA_URL pointing at the JSON.
// Colours come from the site's CSS variables, so light/dark mode just works.
(function () {
  "use strict";

  var REGION_COLOR = {
    "Northern Africa": "#3b82b8",
    "West Africa": "#d1603d",
    "Central Africa": "#8a6bb8",
    "East Africa": "#2a9d78",
    "Southern Africa": "#d39a2b",
  };
  var REGIONS = Object.keys(REGION_COLOR);
  var HL_SLUGS = ["lagos", "johannesburg", "kinshasa", "al_qahira", "nairobi", "addis_ababa", "kigali", "abuja", "dakar", "hawassa", "tunis", "juba"];
  var fmt = function (v) {
    return d3.format(",.0f")(v);
  };

  var tooltip = document.createElement("div");
  tooltip.className = "ug-tooltip";
  document.body.appendChild(tooltip);
  function showTip(evt, d, year) {
    tooltip.innerHTML =
      "<strong>" +
      d.name +
      "</strong> (" +
      d.iso3 +
      "), " +
      year +
      "<br>Built-up: " +
      fmt(d.area) +
      " km²<br>Population: " +
      fmt(d.pop) +
      "<br>People per km² built-up: " +
      fmt(d.density);
    tooltip.style.left = evt.clientX + 12 + "px";
    tooltip.style.top = evt.clientY + 12 + "px";
    tooltip.style.opacity = 1;
  }
  function hideTip() {
    tooltip.style.opacity = 0;
  }

  // ---------- small multiples: population vs. built-up, indexed 1990 = 100 ----------
  // Expects #ug-multiples with #ug-sm-legend, #ug-sm-grid and #ug-sm-table.
  // Series colours come from the --ug-pop / --ug-land CSS variables (light + dark).
  var SM_PANELS = ["_all", "lagos", "kinshasa", "al_qahira", "addis_ababa", "johannesburg", "dakar", "kigali", "juba"];
  var SM_SERIES = [
    { key: "pop", label: "People", cls: "ug-sm-pop" },
    { key: "land", label: "Built-up land", cls: "ug-sm-land" },
  ];

  function buildMultiples(byCity, RAW) {
    var root = document.getElementById("ug-multiples");
    if (!root) return;

    // Aggregate panel: sum over all cities per epoch.
    var years = RAW.years;
    var agg = years.map(function (yr) {
      var rows = RAW.cities.filter(function (r) {
        return r.year === yr;
      });
      return { year: yr, pop: d3.sum(rows, function (r) { return r.pop; }), area_km2: d3.sum(rows, function (r) { return r.area_km2; }) };
    });

    var panels = SM_PANELS.filter(function (s) {
      return s === "_all" || byCity[s];
    }).map(function (s) {
      var rows = s === "_all" ? agg : byCity[s];
      var p0 = rows[0].pop,
        a0 = rows[0].area_km2;
      var pts = rows.map(function (r) {
        return { year: r.year, pop: (100 * r.pop) / p0, land: (100 * r.area_km2) / a0, popAbs: r.pop, landAbs: r.area_km2 };
      });
      var last = pts[pts.length - 1];
      return { slug: s, name: s === "_all" ? "All 100 cities" : rows[0].name, pts: pts, popX: last.pop / 100, landX: last.land / 100 };
    });

    // Shared log y-scale across panels so cities compare at a glance.
    var maxIdx = d3.max(panels, function (p) {
      return d3.max(p.pts, function (d) {
        return Math.max(d.pop, d.land);
      });
    });
    var W = 230,
      H = 150,
      m = { top: 8, right: 18, bottom: 20, left: 30 };
    var iw = W - m.left - m.right,
      ih = H - m.top - m.bottom;
    var x = d3.scaleLinear().domain([1990, 2025]).range([0, iw]);
    var y = d3.scaleLog().domain([90, maxIdx * 1.08]).range([ih, 0]);
    var yTicks = [100, 200, 400, 800].filter(function (v) {
      return v <= y.domain()[1];
    });
    var mult = function (v) {
      return "×" + v.toFixed(1);
    };

    // Legend (two series → legend always present).
    var lg = document.getElementById("ug-sm-legend");
    if (lg)
      lg.innerHTML = SM_SERIES.map(function (s) {
        return '<span><span class="ug-sm-key ' + s.cls + '"></span>' + s.label + "</span>";
      }).join("");

    var grid = d3.select("#ug-sm-grid");
    grid.selectAll("*").remove();

    panels.forEach(function (p) {
      var cell = grid.append("div").attr("class", "ug-sm-cell");
      cell.append("div").attr("class", "ug-sm-title").text(p.name);
      cell
        .append("div")
        .attr("class", "ug-sm-sub")
        .text("people " + mult(p.popX) + " · built-up land " + mult(p.landX));

      var svg = cell
        .append("svg")
        .attr("class", "ug-svg")
        .attr("viewBox", "0 0 " + W + " " + H)
        .attr("role", "img")
        .attr("aria-label", p.name + ": population grew " + mult(p.popX) + " and built-up land " + mult(p.landX) + " between 1990 and 2025");
      var g = svg.append("g").attr("transform", "translate(" + m.left + "," + m.top + ")");

      g.append("g").attr("class", "ug-grid").selectAll("line").data(yTicks).join("line").attr("x1", 0).attr("x2", iw).attr("y1", y).attr("y2", y);
      g.append("g")
        .attr("class", "ug-axis")
        .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format("d")).tickSize(0).tickPadding(4))
        .call(function (a) {
          a.select(".domain").remove();
        });
      g.append("g")
        .attr("class", "ug-axis")
        .attr("transform", "translate(0," + ih + ")")
        .call(d3.axisBottom(x).tickValues([1990, 2005, 2025]).tickFormat(d3.format("d")).tickSize(3))
        .call(function (a) {
          a.select(".domain").remove();
        });

      SM_SERIES.forEach(function (s) {
        g.append("path")
          .datum(p.pts)
          .attr("class", "ug-sm-line " + s.cls)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.year);
              })
              .y(function (d) {
                return y(d[s.key]);
              })
          );
        g.append("circle")
          .attr("class", "ug-sm-dot " + s.cls)
          .attr("r", 4)
          .attr("cx", x(2025))
          .attr("cy", y(p.pts[p.pts.length - 1][s.key]));
      });

      // Hover: crosshair snapped to the nearest epoch + tooltip with both series.
      var cross = g.append("line").attr("class", "ug-sm-cross").attr("y1", 0).attr("y2", ih).style("opacity", 0);
      g.append("rect")
        .attr("width", iw)
        .attr("height", ih)
        .attr("fill", "transparent")
        .on("mousemove", function (evt) {
          var mx = d3.pointer(evt)[0];
          var d = p.pts.reduce(function (best, q) {
            return Math.abs(x(q.year) - mx) < Math.abs(x(best.year) - mx) ? q : best;
          });
          cross.attr("x1", x(d.year)).attr("x2", x(d.year)).style("opacity", 1);
          tooltip.innerHTML =
            "<strong>" + p.name + "</strong>, " + d.year +
            '<br><span class="ug-sm-key ug-sm-pop"></span>People: ' + fmt(d.popAbs) + " (index " + fmt(d.pop) + ")" +
            '<br><span class="ug-sm-key ug-sm-land"></span>Built-up: ' + fmt(d.landAbs) + " km² (index " + fmt(d.land) + ")";
          tooltip.style.left = evt.clientX + 12 + "px";
          tooltip.style.top = evt.clientY + 12 + "px";
          tooltip.style.opacity = 1;
        })
        .on("mouseleave", function () {
          cross.style("opacity", 0);
          hideTip();
        });
    });

    // Table view (accessibility / exact values).
    var tb = document.getElementById("ug-sm-table");
    if (tb)
      tb.innerHTML =
        "<table><thead><tr><th>City</th><th>People 1990</th><th>People 2025</th><th>Built-up 1990 (km²)</th><th>Built-up 2025 (km²)</th><th>People growth</th><th>Built-up land growth</th></tr></thead><tbody>" +
        panels
          .map(function (p) {
            var a = p.pts[0],
              b = p.pts[p.pts.length - 1];
            return (
              "<tr><td>" + p.name + "</td><td>" + fmt(a.popAbs) + "</td><td>" + fmt(b.popAbs) + "</td><td>" + fmt(a.landAbs) + "</td><td>" + fmt(b.landAbs) +
              "</td><td>" + mult(p.popX) + "</td><td>" + mult(p.landX) + "</td></tr>"
            );
          })
          .join("") +
        "</tbody></table>";
  }

  // ---------- land cover replaced by greenfield built-up, by region ----------
  // Expects #ug-landcover with #ug-lc-legend, #ug-lc-bars and #ug-lc-table, and
  // window.UG_LC_URL pointing at landcover-greenfield.json. 100% segmented bars,
  // one per region; class colours from the --ug-lc-* CSS variables.
  var LC_CLASS = {
    Cropland: "crop",
    Shrubland: "shrub",
    "Tree cover": "tree",
    Grassland: "grass",
    "Bare or sparse": "bare",
    Other: "other",
  };

  function buildLandcover(LC) {
    var root = document.getElementById("ug-landcover");
    if (!root) return;
    var pct = function (s) {
      return Math.round(s * 100) + "%";
    };

    var lg = document.getElementById("ug-lc-legend");
    lg.innerHTML = LC.classes
      .map(function (c) {
        return '<span><span class="ug-lc-sw ug-lc-' + LC_CLASS[c] + '"></span>' + c + "</span>";
      })
      .join("");

    var bars = document.getElementById("ug-lc-bars");
    bars.innerHTML = "";
    LC.regions.forEach(function (reg) {
      var rows = LC.rows.filter(function (r) {
        return r.region === reg;
      });
      if (!rows.length) return;
      var total = d3.sum(rows, function (r) {
        return r.km2;
      });
      var row = document.createElement("div");
      row.className = "ug-lc-row" + (reg === "All cities" ? " ug-lc-all" : "");
      row.innerHTML =
        '<div class="ug-lc-label"><span class="ug-lc-name">' + reg + '</span><span class="ug-lc-meta">' +
        rows[0].n_cities + " cities · " + fmt(total) + " km²</span></div>";
      var bar = document.createElement("div");
      bar.className = "ug-lc-bar";
      bar.setAttribute("role", "img");
      bar.setAttribute(
        "aria-label",
        reg + ": " + rows.filter(function (r) { return r.share > 0; }).map(function (r) { return r.class + " " + pct(r.share); }).join(", ")
      );
      rows.forEach(function (r) {
        if (r.share <= 0) return;
        var seg = document.createElement("div");
        seg.className = "ug-lc-seg ug-lc-" + LC_CLASS[r.class];
        seg.style.flexGrow = r.share;
        seg.innerHTML = "<span>" + pct(r.share) + "</span>";
        seg.addEventListener("mousemove", function (evt) {
          tooltip.innerHTML =
            "<strong>" + reg + "</strong><br>" + r.class + ": " + pct(r.share) + " (" + fmt(r.km2) + " km² of new built-up)";
          tooltip.style.left = evt.clientX + 12 + "px";
          tooltip.style.top = evt.clientY + 12 + "px";
          tooltip.style.opacity = 1;
        });
        seg.addEventListener("mouseleave", hideTip);
        bar.appendChild(seg);
      });
      row.appendChild(bar);
      bars.appendChild(row);
    });

    // Only print a share inside a segment when it fits with padding.
    function fitLabels() {
      bars.querySelectorAll(".ug-lc-seg").forEach(function (seg) {
        var t = seg.querySelector("span");
        t.style.visibility = "visible";
        if (t.offsetWidth + 10 > seg.clientWidth) t.style.visibility = "hidden";
      });
    }
    fitLabels();
    window.addEventListener("resize", fitLabels);

    var tb = document.getElementById("ug-lc-table");
    if (tb)
      tb.innerHTML =
        "<table><thead><tr><th>Region</th>" +
        LC.classes.map(function (c) { return "<th>" + c + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        LC.regions
          .map(function (reg) {
            var rows = LC.rows.filter(function (r) { return r.region === reg; });
            return "<tr><td>" + reg + "</td>" + rows.map(function (r) { return "<td>" + pct(r.share) + "</td>"; }).join("") + "</tr>";
          })
          .join("") +
        "</tbody></table>";
  }

  // ---------- regional medians: LCRPGR and greenfield share ----------
  // Expects #ug-regional with #ug-rg-panels and #ug-rg-table. Computed from the
  // bubble-chart data (first/last epoch per city), so no extra export is needed.
  function median(a) {
    var s = a.slice().sort(function (x, y) { return x - y; });
    var n = s.length;
    return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  }

  function buildRegional(byCity) {
    var root = document.getElementById("ug-regional");
    if (!root) return;

    var cities = Object.keys(byCity).map(function (s) {
      var r = byCity[s],
        a = r[0],
        b = r[r.length - 1];
      return {
        region: a.region,
        lcr: a.lcrpgr != null ? a.lcrpgr : b.pop > a.pop ? Math.log(b.area_km2 / a.area_km2) / Math.log(b.pop / a.pop) : NaN,
        green: a.sprawl_share,
      };
    });
    var groups = ["All cities"].concat(REGIONS).map(function (reg) {
      var cs = cities.filter(function (c) {
        return reg === "All cities" || c.region === reg;
      });
      var l = cs.map(function (c) { return c.lcr; }).filter(isFinite);
      var g = cs.map(function (c) { return c.green; }).filter(function (v) { return v != null && isFinite(v); });
      return {
        region: reg,
        n: cs.length,
        lcr: median(l),
        lcrAbove: l.filter(function (v) { return v > 1; }).length,
        green: median(g),
        greenAbove: g.filter(function (v) { return v > 0.5; }).length,
      };
    });

    // The land-consumption-ratio panel was dropped (2026-11-19): the text doesn't
    // discuss it, and the densification point is made by the small multiples.
    var panels = [
      {
        title: "Where new construction went",
        sub: "Median share of added built-up on greenfield land",
        key: "green",
        max: 1,
        ref: 0.5,
        refLabel: "half",
        fmtV: function (v) { return Math.round(v * 100) + "%"; },
        tip: function (g) { return "Median greenfield share " + Math.round(g.green * 100) + "%<br>" + g.greenAbove + " of " + g.n + " cities above 50%"; },
      },
    ];

    var wrap = document.getElementById("ug-rg-panels");
    wrap.innerHTML = "";
    panels.forEach(function (p) {
      var panel = document.createElement("div");
      panel.className = "ug-rg-panel";
      panel.innerHTML = '<div class="ug-sm-title">' + p.title + '</div><div class="ug-sm-sub">' + p.sub + "</div>";
      var plot = document.createElement("div");
      plot.className = "ug-rg-plot";
      groups.forEach(function (g) {
        var v = g[p.key];
        var row = document.createElement("div");
        row.className = "ug-rg-row" + (g.region === "All cities" ? " ug-rg-all" : "");
        var color = g.region === "All cities" ? "var(--global-text-color-light)" : REGION_COLOR[g.region];
        row.innerHTML =
          '<span class="ug-rg-name">' + g.region.replace(" Africa", "") + "</span>" +
          '<span class="ug-rg-track"><span class="ug-rg-ref" style="left:' + (100 * p.ref) / p.max + '%"></span>' +
          '<span class="ug-rg-bar" style="width:' + (100 * Math.min(v, p.max)) / p.max + "%;background:" + color + '"></span>' +
          '<span class="ug-rg-val" style="left:' + (100 * Math.min(v, p.max)) / p.max + '%">' + p.fmtV(v) + "</span></span>";
        row.setAttribute("aria-label", g.region + ": " + p.fmtV(v));
        row.addEventListener("mousemove", function (evt) {
          tooltip.innerHTML = "<strong>" + g.region + "</strong> (" + g.n + " cities)<br>" + p.tip(g);
          tooltip.style.left = evt.clientX + 12 + "px";
          tooltip.style.top = evt.clientY + 12 + "px";
          tooltip.style.opacity = 1;
        });
        row.addEventListener("mouseleave", hideTip);
        plot.appendChild(row);
      });
      var refRow = document.createElement("div");
      refRow.className = "ug-rg-row ug-rg-refrow";
      refRow.innerHTML =
        '<span class="ug-rg-name"></span><span class="ug-rg-track"><span class="ug-rg-reflabel" style="left:' +
        (100 * p.ref) / p.max + '%">' + p.refLabel + "</span></span>";
      plot.appendChild(refRow);
      panel.appendChild(plot);
      wrap.appendChild(panel);
    });

    var tb = document.getElementById("ug-rg-table");
    if (tb)
      tb.innerHTML =
        "<table><thead><tr><th>Region</th><th>Cities</th><th>Median greenfield share</th><th>Cities above 50%</th></tr></thead><tbody>" +
        groups
          .map(function (g) {
            return "<tr><td>" + g.region + "</td><td>" + g.n + "</td><td>" + Math.round(g.green * 100) + "%</td><td>" + g.greenAbove + "</td></tr>";
          })
          .join("") +
        "</tbody></table>";
  }

  // ---------- dark-or-dim share of built-up area, 2000 vs 2025 (dumbbell) ----------
  // Expects #ug-unlit with #ug-ul-legend, #ug-ul-rows and #ug-ul-table, and
  // window.UG_UL_URL pointing at unlit-share.json ({rows: [{name, country, s2000,
  // s2025, group}]}, already ordered and grouped by export_unlit_blog_data.R).
  function buildUnlit(UL) {
    var root = document.getElementById("ug-unlit");
    if (!root) return;
    var pct = function (s) {
      return Math.round(s * 100) + "%";
    };

    document.getElementById("ug-ul-legend").innerHTML =
      '<span><span class="ug-ul-key ug-ul-k2000"></span>2000</span>' +
      '<span><span class="ug-ul-key ug-ul-k2025"></span>2025</span>';

    var wrap = document.getElementById("ug-ul-rows");
    wrap.innerHTML = "";
    var axis = function () {
      var a = document.createElement("div");
      a.className = "ug-ul-row ug-ul-axisrow";
      a.innerHTML =
        "<div></div><div class=\"ug-ul-axis\">" +
        [0, 25, 50, 75, 100]
          .map(function (t) {
            return '<span style="left:' + t + '%">' + t + "%</span>";
          })
          .join("") +
        "</div>";
      return a;
    };

    var lastGroup = null;
    UL.rows.forEach(function (r) {
      if (r.group !== lastGroup) {
        var h = document.createElement("div");
        h.className = "ug-ul-group";
        h.textContent = r.group;
        wrap.appendChild(h);
        lastGroup = r.group;
      }
      var lo = Math.min(r.s2000, r.s2025),
        hi = Math.max(r.s2000, r.s2025);
      var row = document.createElement("div");
      row.className = "ug-ul-row";
      row.innerHTML =
        '<div class="ug-ul-label"><span class="ug-ul-name">' + r.name + '</span><span class="ug-ul-meta">' + r.country + "</span></div>" +
        '<div class="ug-ul-track" role="img" aria-label="' + r.name + ": " + pct(r.s2000) + " of built-up area dark or dim in 2000, " + pct(r.s2025) + ' in 2025">' +
        '<div class="ug-ul-grid"></div>' +
        '<div class="ug-ul-link" style="left:' + lo * 100 + "%;width:" + (hi - lo) * 100 + '%"></div>' +
        '<div class="ug-ul-dot ug-ul-d2000" style="left:' + r.s2000 * 100 + '%"></div>' +
        '<div class="ug-ul-dot ug-ul-d2025" style="left:' + r.s2025 * 100 + '%"></div>' +
        '<span class="ug-ul-val" style="left:' + r.s2025 * 100 + '%">' + pct(r.s2025) + "</span>" +
        "</div>";
      var track = row.querySelector(".ug-ul-track");
      track.addEventListener("mousemove", function (evt) {
        tooltip.innerHTML =
          "<strong>" + r.name + "</strong>, " + r.country + "<br>Dark or dim share of built-up area<br>2000: " + pct(r.s2000) + " · 2025: " + pct(r.s2025);
        tooltip.style.left = evt.clientX + 12 + "px";
        tooltip.style.top = evt.clientY + 12 + "px";
        tooltip.style.opacity = 1;
      });
      track.addEventListener("mouseleave", hideTip);
      wrap.appendChild(row);
    });
    wrap.appendChild(axis());

    var tb = document.getElementById("ug-ul-table");
    if (tb)
      tb.innerHTML =
        "<table><thead><tr><th>City</th><th>Country</th><th>2000</th><th>2025</th></tr></thead><tbody>" +
        UL.rows
          .map(function (r) {
            return "<tr><td>" + r.name + "</td><td>" + r.country + "</td><td>" + pct(r.s2000) + "</td><td>" + pct(r.s2025) + "</td></tr>";
          })
          .join("") +
        "</tbody></table>";
  }

  function start() {
    if (window.UG_UL_URL && document.getElementById("ug-unlit")) {
      fetch(window.UG_UL_URL)
        .then(function (r) {
          return r.json();
        })
        .then(buildUnlit)
        .catch(function (err) {
          document.getElementById("ug-unlit").innerHTML = "<p><em>The nighttime-lights chart could not be loaded (" + err + ").</em></p>";
        });
    }
    if (window.UG_LC_URL && document.getElementById("ug-landcover")) {
      fetch(window.UG_LC_URL)
        .then(function (r) {
          return r.json();
        })
        .then(buildLandcover)
        .catch(function (err) {
          document.getElementById("ug-landcover").innerHTML = "<p><em>The land-cover chart could not be loaded (" + err + ").</em></p>";
        });
    }
    fetch(window.UG_DATA_URL)
      .then(function (r) {
        return r.json();
      })
      .then(init)
      .catch(function (err) {
        var el = document.getElementById("ug-scrolly");
        if (el) el.innerHTML = "<p><em>The interactive chart could not be loaded (" + err + ").</em></p>";
      });
  }

  function init(RAW) {
    var byCity = {};
    RAW.cities.forEach(function (r) {
      (byCity[r.slug] = byCity[r.slug] || []).push(r);
    });
    Object.keys(byCity).forEach(function (s) {
      byCity[s].sort(function (a, b) {
        return a.year - b.year;
      });
    });
    var allSlugs = Object.keys(byCity);
    var areaExt = d3.extent(RAW.cities, function (d) {
      return d.area_km2;
    });
    var densExt = d3.extent(RAW.cities, function (d) {
      return d.density;
    });
    var popMax = d3.max(RAW.cities, function (d) {
      return d.pop;
    });

    buildMultiples(byCity, RAW);
    buildRegional(byCity);

    // Linear interpolation between the five-year epochs.
    function interp(slug, year) {
      var rows = byCity[slug];
      var i = 0;
      while (i < rows.length - 2 && rows[i + 1].year < year) i++;
      var a = rows[i],
        b = rows[i + 1];
      var t = Math.max(0, Math.min(1, (year - a.year) / (b.year - a.year)));
      return {
        slug: slug,
        name: a.name,
        iso3: a.iso3,
        region: a.region,
        area: a.area_km2 + (b.area_km2 - a.area_km2) * t,
        pop: a.pop + (b.pop - a.pop) * t,
        density: a.density + (b.density - a.density) * t,
      };
    }

    function buildChart(svgSel, opts) {
      var W = 640,
        H = 440;
      var m = { top: 10, right: 84, bottom: 40, left: 64 };
      var iw = W - m.left - m.right,
        ih = H - m.top - m.bottom;
      var x = d3
        .scaleLog()
        .domain([areaExt[0] * 0.85, areaExt[1] * 1.15])
        .range([0, iw]);
      var y = d3
        .scaleLog()
        .domain([densExt[0] * 0.85, densExt[1] * 1.15])
        .range([ih, 0]);
      var r = d3.scaleSqrt().domain([0, popMax]).range([2, 26]);
      var xTicks = [10, 25, 50, 100, 250, 500, 900].filter(function (v) {
        return v >= x.domain()[0] && v <= x.domain()[1];
      });
      var yTicks = [2000, 5000, 10000, 25000, 50000, 100000].filter(function (v) {
        return v >= y.domain()[0] && v <= y.domain()[1];
      });

      var svg = d3
        .select(svgSel)
        .attr("viewBox", "0 0 " + W + " " + H)
        .attr("role", "img");
      svg.selectAll("*").remove();
      var g = svg.append("g").attr("transform", "translate(" + m.left + "," + m.top + ")");

      g.append("g").attr("class", "ug-grid").selectAll("line").data(yTicks).join("line").attr("x1", 0).attr("x2", iw).attr("y1", y).attr("y2", y);
      g.append("g")
        .attr("class", "ug-axis")
        .attr("transform", "translate(0," + ih + ")")
        .call(d3.axisBottom(x).tickValues(xTicks).tickFormat(d3.format(",")).tickSize(4))
        .call(function (a) {
          a.select(".domain").remove();
        });
      g.append("g")
        .attr("class", "ug-axis")
        .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format(",")).tickSize(0).tickPadding(6))
        .call(function (a) {
          a.select(".domain").remove();
        });
      g.append("text")
        .attr("class", "ug-axis-label")
        .attr("x", iw)
        .attr("y", ih + 34)
        .attr("text-anchor", "end")
        .text("Built-up area, km² (log scale)");
      g.append("text")
        .attr("class", "ug-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", -54)
        .attr("text-anchor", "end")
        .text("People per km² (log scale)");

      var trailLayer = g.append("g");
      var mutedLayer = g.append("g");
      var hlLayer = g.append("g");
      var labelLayer = g.append("g");
      var line = d3
        .line()
        .x(function (d) {
          return x(d.area);
        })
        .y(function (d) {
          return y(d.density);
        })
        .curve(d3.curveCatmullRom.alpha(0.6));

      // Push labels apart vertically when they would overlap.
      function placeLabels(hl) {
        var labs = hl
          .map(function (d) {
            var lx = x(d.area) + r(d.pop) + 4;
            return { d: d, x: lx, y: y(d.density) + 4, w: d.name.length * 6.2 };
          })
          .sort(function (a, b) {
            return a.y - b.y;
          });
        for (var i = 1; i < labs.length; i++) {
          for (var j = 0; j < i; j++) {
            var a = labs[j],
              b = labs[i];
            var overlapX = a.x < b.x + b.w && b.x < a.x + a.w;
            if (overlapX && b.y - a.y < 12) b.y = a.y + 12;
          }
        }
        return labs;
      }

      function update(year, spotlight, region) {
        var pts = allSlugs.map(function (s) {
          return interp(s, year);
        });
        var muted = pts.filter(function (d) {
          return HL_SLUGS.indexOf(d.slug) < 0;
        });
        var hl = pts.filter(function (d) {
          return HL_SLUGS.indexOf(d.slug) >= 0;
        });
        var vis = function (d, off) {
          return !region || d.region === region ? 1 : off;
        };
        var shownYear = Math.round(year);

        mutedLayer
          .selectAll("circle")
          .data(muted, function (d) {
            return d.slug;
          })
          .join("circle")
          .attr("class", "ug-dot-muted")
          .attr("cx", function (d) {
            return x(d.area);
          })
          .attr("cy", function (d) {
            return y(d.density);
          })
          .attr("r", function (d) {
            return r(d.pop);
          })
          .style("fill", function (d) {
            return region && d.region === region ? REGION_COLOR[d.region] : null;
          })
          .style("opacity", function (d) {
            return vis(d, 0.1);
          })
          .on("mousemove", function (e, d) {
            showTip(e, d, shownYear);
          })
          .on("mouseleave", hideTip);

        hlLayer
          .selectAll("circle")
          .data(hl, function (d) {
            return d.slug;
          })
          .join("circle")
          .attr("class", function (d) {
            return "ug-dot" + (d.slug === spotlight ? " ug-spot" : "");
          })
          .attr("cx", function (d) {
            return x(d.area);
          })
          .attr("cy", function (d) {
            return y(d.density);
          })
          .attr("r", function (d) {
            return r(d.pop);
          })
          .attr("fill", function (d) {
            return REGION_COLOR[d.region];
          })
          .style("opacity", function (d) {
            return vis(d, 0.15);
          })
          .on("mousemove", function (e, d) {
            showTip(e, d, shownYear);
          })
          .on("mouseleave", hideTip);

        labelLayer
          .selectAll("text")
          .data(placeLabels(hl), function (l) {
            return l.d.slug;
          })
          .join("text")
          .attr("class", function (l) {
            return "ug-label" + (l.d.slug === spotlight ? " ug-spot" : "");
          })
          .attr("x", function (l) {
            return l.x;
          })
          .attr("y", function (l) {
            return l.y;
          })
          .style("opacity", function (l) {
            return vis(l.d, 0.15);
          })
          .text(function (l) {
            return l.d.name;
          });

        if (opts.trails && spotlight) {
          var cur = interp(spotlight, year);
          var trail = byCity[spotlight]
            .filter(function (row) {
              return row.year <= year;
            })
            .map(function (row) {
              return { area: row.area_km2, density: row.density };
            })
            .concat([{ area: cur.area, density: cur.density }]);
          trailLayer.selectAll("path").data([trail]).join("path").attr("class", "ug-trail").attr("stroke", REGION_COLOR[cur.region]).attr("d", line);
        } else {
          trailLayer.selectAll("path").remove();
        }
      }
      return { update: update };
    }

    function legend(container, interactive, onToggle) {
      container.innerHTML = "";
      var active = null;
      REGIONS.forEach(function (region) {
        var el = document.createElement(interactive ? "button" : "span");
        el.innerHTML = '<span class="ug-sw" style="background:' + REGION_COLOR[region] + '"></span>' + region;
        if (interactive) {
          el.type = "button";
          el.addEventListener("click", function () {
            active = active === region ? null : region;
            container.querySelectorAll("button").forEach(function (b, i) {
              b.classList.toggle("ug-dimmed", !!active && REGIONS[i] !== active);
            });
            onToggle(active);
          });
        }
        container.appendChild(el);
      });
      var other = document.createElement("span");
      other.innerHTML = '<span class="ug-sw ug-sw-muted"></span>Other ' + (allSlugs.length - HL_SLUGS.length) + " cities";
      container.appendChild(other);
    }

    // ---------- scroll-driven chart ----------
    var scrolly = document.getElementById("ug-scrolly");
    if (scrolly) {
      var chart1 = buildChart("#ug-chart", { trails: true });
      legend(document.getElementById("ug-legend"), false);
      var yearEl = document.getElementById("ug-year");
      var steps = Array.prototype.slice.call(scrolly.querySelectorAll(".ug-step"));
      var activeSlug = null;

      // Fill in each step's land/people change from the data.
      steps.forEach(function (el) {
        var rows = byCity[el.dataset.slug];
        if (!rows) return;
        var a = rows[0],
          b = rows[rows.length - 1];
        var pct = function (v0, v1) {
          var p = Math.round((v1 / v0 - 1) * 100);
          return (p >= 0 ? "+" : "") + p + "%";
        };
        // SDG 11.3.1 land-consumption ratio: ln(land growth) / ln(population growth).
        var lcr = a.lcrpgr != null ? a.lcrpgr : b.pop > a.pop ? Math.log(b.area_km2 / a.area_km2) / Math.log(b.pop / a.pop) : NaN;
        var lcrTxt = isFinite(lcr)
          ? " · land/people ratio " + lcr.toFixed(2) + (lcr > 1 ? " (more land per resident)" : " (less land per resident)")
          : "";
        var figs = el.querySelector(".ug-figs");
        if (figs) figs.textContent = "1990–2025: land " + pct(a.area_km2, b.area_km2) + ", people " + pct(a.pop, b.pop) + lcrTxt;
      });

      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var rect = scrolly.getBoundingClientRect();
          var total = rect.height - window.innerHeight;
          var p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
          var year = 1990 + p * 35;
          yearEl.textContent = Math.round(year);
          chart1.update(year, activeSlug, null);
          ticking = false;
        });
      }
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            entry.target.classList.toggle("ug-active", entry.isIntersecting);
            if (entry.isIntersecting) activeSlug = entry.target.dataset.slug;
          });
          onScroll();
        },
        { rootMargin: "-72% 0px -12% 0px" }
      );
      steps.forEach(function (el) {
        io.observe(el);
      });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    }

    // ---------- free exploration ----------
    if (document.getElementById("ug-explore")) {
      var chart2 = buildChart("#ug-chart2", { trails: false });
      var slider = document.getElementById("ug-slider");
      var year2 = document.getElementById("ug-year2");
      var playBtn = document.getElementById("ug-play");
      var region = null,
        timer = null;
      function setYear(y) {
        slider.value = y;
        year2.textContent = Math.round(y);
        chart2.update(y, null, region);
      }
      function pause() {
        if (timer) {
          clearInterval(timer);
          timer = null;
          playBtn.textContent = "Play";
        }
      }
      legend(document.getElementById("ug-legend2"), true, function (reg) {
        region = reg;
        chart2.update(+slider.value, null, region);
      });
      slider.addEventListener("input", function () {
        pause();
        setYear(+slider.value);
      });
      playBtn.addEventListener("click", function () {
        if (timer) return pause();
        if (+slider.value >= 2025) setYear(1990);
        playBtn.textContent = "Pause";
        timer = setInterval(function () {
          var y = +slider.value + 0.5;
          if (y >= 2025) {
            setYear(2025);
            return pause();
          }
          setYear(y);
        }, 60);
      });
      setYear(1990);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

// ---------- footprint GIF switcher ----------
// Expects #ug-gif with .ug-gif-tab buttons (data-src, data-alt) and #ug-gif-img.
(function () {
  function initGifs() {
    var fig = document.getElementById("ug-gif");
    if (!fig) return;
    var img = document.getElementById("ug-gif-img");
    var tabs = Array.prototype.slice.call(fig.querySelectorAll(".ug-gif-tab"));
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("ug-active"); t.setAttribute("aria-pressed", "false"); });
        b.classList.add("ug-active");
        b.setAttribute("aria-pressed", "true");
        img.src = b.getAttribute("data-src");
        img.alt = b.getAttribute("data-alt");
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initGifs);
  else initGifs();
})();
