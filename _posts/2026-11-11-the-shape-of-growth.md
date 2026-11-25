---
layout: post
title: "The Shape of Growth: Tracing African Urbanisation"
date: 2026-11-11 09:00:00
description: Africa's largest cities more than doubled their population since 1990 but added far less land. An interactive look at how 100 cities grew, using GHSL built-up and population data.
tags: urbanisation africa remote-sensing ghsl interactive
categories: data-stories
related_posts: false
_styles: >
  #ug-scrolly { position: relative; margin: 2rem 0; }
  .ug-sticky { position: sticky; top: 56px; z-index: 2; background: var(--global-bg-color); padding: 0.5rem 0 0.75rem; border-bottom: 1px solid var(--global-divider-color); }
  .ug-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 0.9rem; color: var(--global-text-color-light); }
  .ug-year { font-size: 1.6rem; font-weight: 600; color: var(--global-text-color); font-variant-numeric: tabular-nums; }
  .ug-svg { display: block; width: 100%; height: auto; max-height: min(52vh, 460px); }
  .ug-steps { padding: 4vh 0 35vh; }
  .ug-step { margin: 0 0 32vh; padding: 0.25rem 0 0.25rem 1rem; border-left: 3px solid var(--global-divider-color); color: var(--global-text-color-light); transition: color 0.2s, border-color 0.2s; }
  .ug-step.ug-active { border-left-color: var(--global-theme-color); color: var(--global-text-color); }
  .ug-step p { margin: 0.2rem 0; }
  .ug-step .ug-figs { font-size: 0.85rem; color: var(--global-text-color-light); }
  .ug-legend { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; font-size: 0.8rem; color: var(--global-text-color-light); }
  .ug-legend button { background: none; border: 0; padding: 0; color: inherit; font: inherit; cursor: pointer; }
  .ug-legend button:hover { color: var(--global-text-color); }
  .ug-legend .ug-dimmed { opacity: 0.4; }
  .ug-sw { display: inline-block; width: 0.65rem; height: 0.65rem; border-radius: 50%; margin-right: 0.35rem; vertical-align: baseline; }
  .ug-sw-muted { background: var(--global-text-color-light); opacity: 0.4; }
  .ug-grid line { stroke: var(--global-divider-color); }
  .ug-axis text { fill: var(--global-text-color-light); font-size: 11px; }
  .ug-axis line { stroke: var(--global-text-color-light); }
  .ug-axis-label { fill: var(--global-text-color-light); font-size: 11px; }
  .ug-dot-muted { fill: var(--global-text-color-light); fill-opacity: 0.3; }
  .ug-dot { fill-opacity: 0.85; stroke: var(--global-bg-color); stroke-width: 1; }
  .ug-dot.ug-spot { stroke: var(--global-text-color); stroke-width: 2; }
  .ug-label { fill: var(--global-text-color); font-size: 11px; }
  .ug-label.ug-spot { font-weight: 700; }
  .ug-trail { fill: none; stroke-width: 1.5; stroke-dasharray: 3 3; }
  .ug-controls { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0; }
  .ug-controls button { border: 1px solid var(--global-theme-color); color: var(--global-theme-color); background: none; border-radius: 4px; padding: 0.15rem 0.8rem; font-size: 0.9rem; }
  .ug-controls input { flex: 1; accent-color: var(--global-theme-color); }
  .ug-sm { --ug-pop: #2f6fb3; --ug-land: #c97a1e; margin: 1.5rem 0 2rem; }
  html[data-theme="dark"] .ug-sm, html[data-theme="dark"] .ug-tooltip { --ug-pop: #3f7fc6; --ug-land: #c47a24; }
  .ug-tooltip { --ug-pop: #2f6fb3; --ug-land: #c97a1e; }
  .ug-sm-head { font-size: 0.9rem; color: var(--global-text-color-light); }
  .ug-sm-legend { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--global-text-color-light); margin: 0.25rem 0 0.5rem; }
  .ug-sm-key { display: inline-block; width: 1rem; height: 2px; margin-right: 0.35rem; vertical-align: middle; }
  .ug-sm-key.ug-sm-pop { background: var(--ug-pop); }
  .ug-sm-key.ug-sm-land { background: var(--ug-land); }
  .ug-sm-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem 1.25rem; }
  @media (max-width: 640px) { .ug-sm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .ug-sm-title { font-size: 0.85rem; font-weight: 600; color: var(--global-text-color); }
  .ug-sm-sub { font-size: 0.75rem; color: var(--global-text-color-light); font-variant-numeric: tabular-nums; }
  .ug-sm-line { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
  .ug-sm-line.ug-sm-pop { stroke: var(--ug-pop); }
  .ug-sm-line.ug-sm-land { stroke: var(--ug-land); }
  .ug-sm-dot { stroke: var(--global-bg-color); stroke-width: 2; }
  .ug-sm-dot.ug-sm-pop { fill: var(--ug-pop); }
  .ug-sm-dot.ug-sm-land { fill: var(--ug-land); }
  .ug-sm-cross { stroke: var(--global-text-color-light); stroke-width: 1; }
  .ug-sm-table { font-size: 0.8rem; margin-top: 0.75rem; color: var(--global-text-color-light); }
  .ug-sm-table table { width: 100%; font-variant-numeric: tabular-nums; }
  .ug-sm-table th, .ug-sm-table td { padding: 0.15rem 0.4rem; text-align: right; }
  .ug-sm-table th:first-child, .ug-sm-table td:first-child { text-align: left; }
  .ug-lc { --ug-lc-crop: #eda100; --ug-lc-shrub: #6250d6; --ug-lc-tree: #008300; --ug-lc-grass: #2a78d6; --ug-lc-bare: #eb6834; --ug-lc-other: #b8b8b2; margin: 1.5rem 0 2rem; }
  html[data-theme="dark"] .ug-lc { --ug-lc-crop: #c98500; --ug-lc-shrub: #9085e9; --ug-lc-tree: #0ca30c; --ug-lc-grass: #3987e5; --ug-lc-bare: #d95926; --ug-lc-other: #5e5e5a; }
  .ug-lc-legend { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; font-size: 0.8rem; color: var(--global-text-color-light); margin: 0.25rem 0 0.75rem; }
  .ug-lc-sw { display: inline-block; width: 0.7rem; height: 0.7rem; border-radius: 2px; margin-right: 0.35rem; vertical-align: baseline; }
  .ug-lc-row { display: grid; grid-template-columns: 11rem minmax(0, 1fr); align-items: center; gap: 0.75rem; margin: 0.5rem 0; }
  .ug-lc-row.ug-lc-all { margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--global-divider-color); }
  @media (max-width: 640px) { .ug-lc-row { grid-template-columns: minmax(0, 1fr); gap: 0.2rem; } }
  .ug-lc-name { display: block; font-size: 0.85rem; font-weight: 600; color: var(--global-text-color); }
  .ug-lc-meta { display: block; font-size: 0.75rem; color: var(--global-text-color-light); font-variant-numeric: tabular-nums; }
  .ug-lc-bar { display: flex; gap: 2px; height: 28px; min-width: 0; }
  .ug-lc-seg { flex-basis: 0; min-width: 0; border-radius: 4px; display: flex; align-items: center; padding-left: 6px; overflow: hidden; font-size: 0.75rem; font-weight: 600; color: #fff; }
  .ug-lc-seg span { white-space: nowrap; }
  .ug-lc-crop { background: var(--ug-lc-crop); color: #1a1a19; }
  .ug-lc-shrub { background: var(--ug-lc-shrub); }
  .ug-lc-tree { background: var(--ug-lc-tree); }
  .ug-lc-grass { background: var(--ug-lc-grass); }
  .ug-lc-bare { background: var(--ug-lc-bare); color: #1a1a19; }
  .ug-lc-other { background: var(--ug-lc-other); color: #1a1a19; }
  html[data-theme="dark"] .ug-lc-other { color: #fff; }
  .ug-lc-note { font-size: 0.8rem; color: var(--global-text-color-light); margin-top: 0.5rem; }
  .ug-ul { --ug-ul-2000: #b8b8b2; --ug-ul-2025: #3b3f8f; margin: 1.5rem 0 2rem; }
  html[data-theme="dark"] .ug-ul { --ug-ul-2000: #5e5e5a; --ug-ul-2025: #f2c14e; }
  .ug-ul-legend { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--global-text-color-light); margin: 0.25rem 0 0.5rem; }
  .ug-ul-key { display: inline-block; width: 0.7rem; height: 0.7rem; border-radius: 50%; margin-right: 0.35rem; vertical-align: baseline; }
  .ug-ul-k2000 { background: var(--ug-ul-2000); }
  .ug-ul-k2025 { background: var(--ug-ul-2025); }
  .ug-ul-group { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--global-text-color-light); margin: 0.9rem 0 0.2rem; }
  .ug-ul-row { display: grid; grid-template-columns: 8.5rem minmax(0, 1fr); align-items: center; gap: 0.75rem; margin: 0.15rem 0; }
  .ug-ul-name { display: block; font-size: 0.85rem; font-weight: 600; color: var(--global-text-color); line-height: 1.2; }
  .ug-ul-meta { display: block; font-size: 0.72rem; color: var(--global-text-color-light); line-height: 1.2; }
  .ug-ul-track { position: relative; height: 34px; margin: 0 1.2rem 0 0.8rem; }
  .ug-ul-track > .ug-ul-grid, .ug-ul-track > .ug-ul-link, .ug-ul-track > .ug-ul-dot { top: 22px; }
  .ug-ul-grid { position: absolute; left: 0; right: 0; top: 50%; border-top: 1px solid var(--global-divider-color); }
  .ug-ul-link { position: absolute; top: 50%; height: 3px; transform: translateY(-50%); background: var(--ug-ul-2000); border-radius: 2px; }
  .ug-ul-dot { position: absolute; top: 50%; width: 11px; height: 11px; border-radius: 50%; transform: translate(-50%, -50%); }
  .ug-ul-d2000 { background: var(--ug-ul-2000); }
  .ug-ul-d2025 { background: var(--ug-ul-2025); }
  .ug-ul-val { position: absolute; top: 0; transform: translateX(-50%); font-size: 0.7rem; font-weight: 600; line-height: 1; color: var(--global-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .ug-ul-axisrow { margin-top: 0.2rem; }
  .ug-ul-axis { position: relative; height: 1rem; margin: 0 1.2rem 0 0.8rem; font-size: 0.7rem; color: var(--global-text-color-light); font-variant-numeric: tabular-nums; }
  .ug-ul-axis span { position: absolute; transform: translateX(-50%); }
  @media (max-width: 640px) { .ug-ul-row { grid-template-columns: 6rem minmax(0, 1fr); gap: 0.4rem; } }
  .ug-rg { margin: 1.5rem 0 2rem; }
  .ug-pull { width: 38%; margin: 0.3rem 0 0.8rem; padding: 0.4rem 0; font-size: 1.3rem; line-height: 1.35; font-weight: 400; color: var(--global-theme-color); border-top: 2px solid var(--global-theme-color); border-bottom: 1px solid var(--global-divider-color); }
  .ug-pull-right { float: right; margin-left: 1.5rem; }
  .ug-pull-left { float: left; margin-right: 1.5rem; }
  @media (max-width: 640px) { .ug-pull { float: none; width: auto; margin: 1rem 0; } }
  .ug-sm, .ug-rg, .ug-lc, .ug-ul, #ug-gif, #ug-explore, .ug-caveats, h2 { clear: both; }
  .ug-caveats { margin: 2.2rem 0 1.5rem; border-top: 1px solid var(--global-divider-color); padding-top: 0.75rem; }
  .ug-caveats > summary { cursor: pointer; font-size: 1.25rem; font-weight: 400; color: var(--global-text-color); list-style-position: outside; margin-left: 1rem; }
  .ug-caveats > summary::after { content: " (show)"; font-size: 0.8rem; color: var(--global-text-color-light); }
  .ug-caveats[open] > summary::after { content: " (hide)"; }
  .ug-caveats[open] > summary { margin-bottom: 0.75rem; }
  .ug-rg-panels { display: grid; grid-template-columns: minmax(0, 1fr); max-width: 36rem; gap: 1rem 2rem; margin-top: 0.5rem; }
  @media (max-width: 640px) { .ug-rg-panels { grid-template-columns: minmax(0, 1fr); } }
  .ug-rg-plot { margin-top: 0.6rem; }
  .ug-rg-row { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr); align-items: center; gap: 0.5rem; height: 26px; }
  .ug-rg-row.ug-rg-all { margin-bottom: 6px; border-bottom: 1px solid var(--global-divider-color); padding-bottom: 6px; height: 32px; }
  .ug-rg-name { font-size: 0.8rem; color: var(--global-text-color); }
  .ug-rg-all .ug-rg-name { font-weight: 600; }
  .ug-rg-track { position: relative; height: 100%; margin-right: 2.6rem; }
  .ug-rg-bar { position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 16px; border-radius: 0 4px 4px 0; z-index: 1; }
  .ug-rg-val { position: absolute; top: 50%; transform: translate(4px, -50%); padding: 0 3px; background: var(--global-bg-color); font-size: 0.75rem; color: var(--global-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; z-index: 2; }
  .ug-rg-ref { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--global-text-color-light); z-index: 0; }
  .ug-rg-refrow { height: 18px; }
  .ug-rg-reflabel { position: absolute; top: 0; transform: translateX(-50%); font-size: 0.7rem; color: var(--global-text-color-light); white-space: nowrap; }
  .ug-todo { background: rgba(237, 161, 0, 0.18); color: var(--global-text-color); font-style: italic; font-size: 0.9em; padding: 0 0.25em; border-radius: 3px; }
  .ug-tooltip { position: fixed; pointer-events: none; opacity: 0; z-index: 1050; background: var(--global-card-bg-color); color: var(--global-text-color); border: 1px solid var(--global-divider-color); border-radius: 4px; padding: 0.4rem 0.6rem; font-size: 0.8rem; line-height: 1.4; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
  .ug-gif { margin: 1.5rem 0 2rem; }
  .ug-gif-tabs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.6rem; }
  .ug-gif-tab { font: inherit; font-size: 0.85rem; padding: 0.25rem 0.8rem; border: 1px solid var(--global-divider-color); border-radius: 999px; background: transparent; color: var(--global-text-color-light); cursor: pointer; }
  .ug-gif-tab.ug-active { border-color: var(--global-theme-color); color: var(--global-text-color); font-weight: 500; }
  .ug-gif img { display: block; width: 100%; max-width: 640px; height: auto; margin: 0 auto; border-radius: 4px; }
  .ug-gif figcaption { font-size: 0.8rem; color: var(--global-text-color-light); margin-top: 0.5rem; }
---

Most people outside the continent imagine African life as rural life. That image is inaccurate and outdated, and becoming more so every year. Africa was the last continent to urbanise, but it is now doing so at breakneck speed, faster than any other. Today nearly three-quarters of Africans live in urban or semi-urban settings.[^ft] Over the next three decades Africa's urban population will double, from about 700 million to 1.4 billion with two out of three Africans living in urban areas by 2050, making it the continent with the second-largest urban population after Asia.[^ft] [^oecd].

{% include figure.liquid loading="eager" path="assets/img/buildupexpansion_10km.jpeg" class="img-fluid rounded z-depth-1 d-block mx-auto" max-width="70%" caption="Rapid urbanisation in Africa: change in built-up surface, 2000–2025, aggregated to 10 km cells (log scale)." %}

Is this good news? Well, it depends. City life can improve people's lives materially, change social and political attitudes,[^dorward] and make a less carbon-intensive lifestyle possible.[^delbridge] But whether it does all that depends on the type of urbanisation. So let's take a closer look at the shape of this remarkable growth.

Motivated by [this great piece in the *Financial Times*](https://www.ft.com/content/5203e527-ebdd-45d2-9019-6c440b4c4e93) and World Cities Day, I tracked the growth of built-up land and population in Africa's 100 largest cities between 1990 and 2025, using data from the Global Human Settlement Layer (GHSL), Open Street Map (OSM) and nighttime lights data captured by satelittes.[^ghsl] [^africapolis] For each city I hold its boundary fixed at its 2020 Africapolis outline and measure what happens inside it over time. The sample includes megacities like Lagos, Cairo and Nairobi, but also places like Osogbo, Mwanza and Bafoussam: cities of more than a million people that many outside the continent will never have heard of. Here I only look at the 100 largest cities but it is crucial to keep in mind, that beyond the largest cities, African urbanisation is also characterised by the explosive growth of small towns. Africa has over 1,400 intermediary cities that house over 36 percent of Africa’s total urban population.[^heinrigs]

## What the data show

Between 1990 and 2025, the built-up area of Africa's 100 largest cities grew from about 6,900 to 12,500 km², an increase of 81%. Over the same period their population went from 142 to 370 million, an increase of 161%. By 2025, 89 of these cities had more than a million inhabitants, twice as many million-plus cities as Latin America. The chart below puts each city's population and built-up land on the same scale, both starting at 100 in 1990. Where the people line (blue) ends above the built-up land line (orange), construction did not keep pace with population growth.

<div id="ug-multiples" class="ug-sm">
<div class="ug-sm-head">Population and built-up land, 1990 = 100 (log scale)</div>

<div id="ug-sm-legend" class="ug-sm-legend"></div>

<div id="ug-sm-grid" class="ug-sm-grid"></div>

<details class="ug-sm-table"><summary>Show as a table</summary><div id="ug-sm-table"></div></details>
</div>

<aside class="ug-pull ug-pull-right" aria-hidden="true">In 74 of Africa's 100 largest cities, population grew faster than built-up land.</aside>

So in most of the cities in our sample, 74 of the 100, population has grown faster than urban land. There are exceptions. Kigali, a city that has invested heavily in planned expansion, roads and serviced land under its citywide master plan, is one example. Juba, the capital of South Sudan, is a tragic one, where the civil war has caused major displacement. But in the median city, each million residents now live on 35 km² of built-up land, down from 48 km² in 1990. Within their boundaries, African cities have become markedly denser. But denser does not mean compact. More people per square kilometre of built-up land tells us nothing about where the new buildings went. As we will see, even inside the boundaries most new construction went onto empty land at the edge rather than filling in existing neighbourhoods. And beyond their boundaries, cities have spread further out creating peri-urban zones and satelitte towns.

## The promise of density

Economic historians and political scientists have long pointed out that Africa has historically been held back by its relatively low population densities.[^herbst] [^austin] Ask the economic consultants and they will point to the growth opportunities that come with a growing population. More people, more demand, more growth is the simplified logic. Beyond pure demand, should you ever enter a seminar room full of economists (especially the urban and economic-geography types), make sure "agglomeration economies" is on your bingo card. The idea has a long history in the discipline, running all the way back to Alfred Marshall's *Principles of Economics*, published in 1890.[^marshall] Firms that cluster in cities gain access to a larger labour market, to specialised inputs and to more potential trading partners, and they benefit from knowledge spillovers: Marshall's "ideas in the air". Jane Jacobs later added that it is the sheer variety of activity in cities, not only the concentration of a single industry, that breeds new ideas.[^jacobs] These productivity gains show up in the income gap between cities and the countryside,[^dercon] and the urban wage premium in low- and middle-income countries holds up under careful testing.[^bgt] The "growth miracles" of East Asia are unimaginable without urbanisation: in China, the urban population grew by 700 million people between 1978 and 2009, while GDP per person rose thirteen-fold.[^kh]

## Denser, but spreading out

African cities do produce some of these gains, if modest ones: across 2,600 cities in 34 countries, a 10% increase in population density raises productivity by 0.2–0.5%, with most estimates at the lower end.[^oecd] But these gains depend on good spatial connectivity: workers need to be able to reach jobs, and firms each other. And even inside their boundaries, cities did not grow mainly by filling in. The GHSL data let us distinguish new construction on land that was already partly built up ("infill") from construction on previously empty, greenfield land. Taking all 100 cities together, around 58% of new construction since 1990 went onto greenfield land. Greenfield construction is a lot more common in East (68%) and West Africa (60%) than in Southern (42%) and North African cities (47%), and the same ranking holds for the typical city in each region, shown below.

<div id="ug-regional" class="ug-rg">
<div class="ug-sm-head">Share of new construction on greenfield land: the typical city in each region, 1990–2025</div>

<div id="ug-rg-panels" class="ug-rg-panels"></div>

<details class="ug-sm-table"><summary>Show as a table</summary><div id="ug-rg-table"></div></details>
</div>

Greenfield does not mean empty. Land at the edge of a city is usually already doing something: growing food for the city, or holding trees and bush that shade it, soak up heavy rain and store carbon. So what did all this new construction replace? Matching each newly built pixel to a 1990 land-cover map gives a rough answer.

<div id="ug-landcover" class="ug-lc">
<div class="ug-sm-head">What the new greenfield construction was built on: land cover in 1990, share of built-up added 1990–2025</div>

<div id="ug-lc-legend" class="ug-lc-legend"></div>

<div id="ug-lc-bars"></div>

<p class="ug-lc-note">Land cover from GLC_FCS30D (30 m, 1990). "Tree cover" includes tree-rich farmland and bush as well as forest. "Other" is mostly land the land-cover map already shows as built-up, plus water and wetland.</p>

<details class="ug-sm-table"><summary>Show as a table</summary><div id="ug-lc-table"></div></details>
</div>

Across all cities, almost half of the new greenfield construction went onto tree cover, mostly tree-rich farmland and bush rather than forest, and about a quarter onto cropland. The mix varies by region. In West Africa, two-thirds replaced tree cover. In North Africa, where farmland is scarce, nearly half came out of cropland and most of the rest out of desert. This has implications for cities resilience to ever more frequent climate shocks since forests and grassland provide important ecosystem services to cities. Cutting trees contributes to urban heat island effects with deleterious effects on city-dwellers. Building on farmland can aggravate food insecurity in urban areas.

<aside class="ug-pull ug-pull-left" aria-hidden="true">Building height fell in 99 of the 100 cities. Not one got taller.</aside>

As a result of this outward sprawl, average building height across African cities has actually decreased, not increased: the median city's mean building height slipped from 7.7 m to 7.3 m between 2000 and 2025. In fact, not one city saw an increase. Height fell in 99 of the 100 cities and stayed flat in Lomé.[^height] Sprawl of this kind complicates infrastructure provision, and as a result many African cities are spatially dispersed and lack connectivity, leaving residents cut off from jobs and basic services such water, sanitation and waste management.[^dercon] One World Bank study finds the average African city about 20% more fragmented than cities in Asia, with 37% less exposure to people and jobs.[^lall] What is more, African cities are, perhaps surprisingly, expensive cities. Households face costs about 29% higher than in other countries at similar income levels,[^lall] and housing in sub-Saharan Africa is about 55% more expensive than in other low-income countries.[^nakamura]

## Satellite towns and peri-urbanisation

And all of these numbers count only what happens inside each city's fixed boundary. Step outside it and the sprawl is larger still: cities are consuming an ever-larger footprint of land, much of it beyond their official limits, creating mushrooming peri-urban zones and satelitte towns with poor connectivity and infrastructure access. The animations below show seven examples: Addis Ababa, Ouagadougou and Kigali growing outwards in rings, Cairo adding new towns in the desert, Lagos spreading inland from the coast, Kinshasa pushing east and south-west from a core that was already built up by 1990, and Johannesburg filling in and spreading across a sprawling, many-centred region. In Addis Ababa, roughly 140 km² of new built-up land lies just outside the city's official boundary, about two-thirds as much again as the growth inside it.

<figure id="ug-gif" class="ug-gif">

<div class="ug-gif-tabs">
<button type="button" class="ug-gif-tab ug-active" aria-pressed="true" data-src="{{ '/assets/img/footprint-addis-ababa.gif' | relative_url }}" data-alt="Animated map of Addis Ababa's built-up footprint, 1990 to 2025, growing out from a compact core and along a corridor to the south-east">Addis Ababa</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-ouagadougou.gif' | relative_url }}" data-alt="Animated map of Ouagadougou's built-up footprint, 1990 to 2025, spreading outwards in all directions">Ouagadougou</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-kigali.gif' | relative_url }}" data-alt="Animated map of Kigali's built-up footprint, 1990 to 2025, spreading across the surrounding hills">Kigali</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-cairo.gif' | relative_url }}" data-alt="Animated map of Cairo's built-up footprint, 1990 to 2025, with new towns appearing in the desert east and west of the old city">Cairo</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-lagos.gif' | relative_url }}" data-alt="Animated map of Lagos's built-up footprint, 1990 to 2025, spreading north and east inland from the coast and lagoon">Lagos</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-kinshasa.gif' | relative_url }}" data-alt="Animated map of Kinshasa's built-up footprint, 1990 to 2025, with a large core already built up by 1990 and most new growth after 2010 on the eastern and south-western edges">Kinshasa</button>
<button type="button" class="ug-gif-tab" aria-pressed="false" data-src="{{ '/assets/img/footprint-johannesburg.gif' | relative_url }}" data-alt="Animated map of Johannesburg's built-up footprint, 1990 to 2025, with new patches appearing between and around many older centres across the region">Johannesburg</button>
</div>

<img src="{{ '/assets/img/footprint-addis-ababa.gif' | relative_url }}" alt="Animated map of Addis Ababa's built-up footprint, 1990 to 2025, growing out from a compact core and along a corridor to the south-east" id="ug-gif-img" loading="lazy"/>

<figcaption>Built-up footprint, 1990–2025. Grey areas were already built up in 1990; each later colour marks when an area was first built. The maps show each city and its surroundings, so unlike the figures elsewhere in this post they include growth beyond the official city boundary.</figcaption>

</figure>

A rough test with OpenStreetMap data points the same way. In seven cities where the map coverage is good enough to try (Lagos, Kinshasa, Kampala, Dar es Salaam, Khartoum, Juba and Mogadishu), residents of newly built areas at the edge live farther from the nearest mapped school, clinic or water point than residents of areas that densified: about 20% farther in Lagos, around 60% in Kampala and Mogadishu, and more than twice as far in Kinshasa.[^osm]

## Urbanisation without industrialisation

Moreover, African urbanisation appears to be driven by different forces. Elsewhere, people moved to cities as economies shifted from farming to manufacturing. In Africa, however, urbanisation seems to follow different rules: it is less driven by this kind of structural transformation. Many African countries have urbanised with little growth in manufacturing,[^kh] and unlike China, Africa has urbanised without major increases in agricultural or industrial productivity.[^dercon] Resource-rich countries in particular have produced what Gollin, Jedwab and Vollrath call "consumption cities", where most jobs are in local trade and services rather than in productive, internationally competitive sectors.[^gjv] In fact, much of the growth is not driven by migration at all. Today, most of the increase in Africa's urban population comes from births exceeding deaths in the cities themselves, rather than from people moving in from the countryside.[^jcg] [^mob] [^wb_migration] Cities are growing whether or not the jobs are there. Without the jobs that industrialisation brings, the benefits of density are harder to realise, and the costs of poorly connected sprawl are harder to bear.

## The infrastructure gap

Some basic services appear to be catching up. Nighttime-lights satellite data, admittedly not a perfect proxy, suggests that electrification is spreading fast in most African cities: the dark-or-dim share of built-up area fell from 92% to 5% in Mogadishu, 69% to 2% in Ikorodu, and 82% to 2% in Mwanza between 2000 and 2025, largely in the same fast-growing secondary cities.

<div id="ug-unlit" class="ug-ul">
<div class="ug-sm-head">Share of built-up area that is dark or only dimly lit at night, 2000 and 2025</div>

<div id="ug-ul-legend" class="ug-ul-legend"></div>

<div id="ug-ul-rows"></div>

<p class="ug-lc-note">Corrected DMSP nighttime lights (DN scale): "dark or dim" means no detectable light or a digital number of 10 or below. Share of 100 m built-up cells within each city's Africapolis boundary. Cities whose boundary takes in large rural areas are left out.</p>

<details class="ug-sm-table"><summary>Show as a table</summary><div id="ug-ul-table"></div></details>
</div>

Lights are not the whole story, though. In Afrobarometer's latest surveys across 39 countries, almost all urban neighbourhoods (94%) had an electricity grid, but only 65% of urban residents said their power works most or all of the time.[^ab_elec] Only about half of urban neighbourhoods had a sewage system, half of urban households had no toilet inside the home, and one in five urban residents had repeatedly gone without enough clean water in the past year.[^ab_water]

<aside class="ug-pull ug-pull-right" aria-hidden="true">In Onitsha, 87% of built-up land is still dark or barely lit at night.</aside>

These numbers are indicative and show that a substantial infrastructure gap remains. Where it persists, congestion and pollution rather than ideas will float the air. In 2020, African countries committed only 3.4% of GDP to infrastructure from all sources, about half the rate in South Asia, and more than 30% of what governments budget for infrastructure typically goes unspent.[^oecd] Public investment amounts to around USD 104 per person a year (in PPP), against a global average of USD 822.[^oecd]. And the pressure is likely to grow. Fast growing cities face the highest risks of fragility characterised by inequality, youth unemployment and criminal violence[^muggah]. What is more, Africa is warming slightly faster than the global average, by about 0.3 °C per decade since 1991, and fastest in the north.[^wmo] Many of its largest cities sit on the coast or on river floodplains. The number of Africans exposed to sea-level rise is projected to double from 54 million in 2000 to 108–116 million by 2030, and to reach 190–245 million by 2060; Lagos, Dar es Salaam, Cotonou and Alexandria are among the most exposed.[^ipcc]. 

At the same time, much of the continent's urban fabric does not exist yet: by one estimate, two-thirds of Africa's cities are yet to be built.[^bgt] That makes the choices made now unusually consequential. Cities in developing countries are among the places most exposed to climate change, but they are also the most viable way of managing its impacts.[^delbridge] Density cuts emissions per person from infrastructure and services, and taller buildings are less carbon-intensive, which makes the fall in building height described above all the more worrying. Access to local public goods and services also helps households cope with environmental shocks. And what gets built today will last: urban infrastructure typically stays in use for around 125 years and buildings for around 175, so today's decisions about a city's physical shape will lock in its costs and emissions for generations.[^delbridge]

## What can be done

So, what can be done? A whole suite of recent reports provide answers and insights, in the following I draw heavily on them.[^odi] [^m2b] [^wb] For starters, more money would not hurt. Africa's need for infrastructure investment is estimated at USD 130 - USD 170 billion annually, currently only half of it is committed.[^m2b] Africa urbanises rapidly at historically low income levels, this means that most countries lack the necessary means to make the required investments. As things stand, city governments are poorly placed to close the gap. Municipalities are cash-strapped, with low tax revenues, and they often lack the political discretion and financial autonomy to raise money on financial markets.[^aul] 

In a first instance, municipalities should strengthen efforts to broaden their revenue base. Most African cities operate obsolete property valuation methods inherited from the colonial era.[^jibao] In 2018, under leadership of Yvonne Aki-Sawyerr, Freetown introduced a property tax reform which adopted a simple points-based valuation method to reevaluate properties. After initial resistance from the central government, the reform doubled the register, nearly tripled tax collections and introduced progressive taxation, with around 70% of the increased potential revenue coming from the top quarter of properties (https://www.theigc.org/blogs/reforming-property-tax-valuation-sierra-leone). The model is now being adopted in other cities across Sierra Leone.

A broadened revenue base should also facilitate access to other sources of finance and enable cities to borrow. As Haas and her colleagues show, in most countries, legal frameworks allow for some form of long-term subnational borrowing. And yet, nearly half of these countries have seen no sub-national borrowing activity at all. Where municipal borrowing has occurred, it has been minimal, typically involving just a single city attempting to access the market once.[^m2b] [^haas] One reason might be that in all but four countries for which data was available, subnational borrowing requires approval from a central government authority. At the same time, fiscal transfers from central governments remain crucial but are often too small in volume and their timings too erratic, creating uncertainty for local governments.[^m2b]
Here, Mexico's advances in fiscal devolution and transfer reform in the early 2000s provide important lessons.The reforms allow local governments to leverage predictable intergovernmental transfers as a stable revenue stream against which to borrow and enabled municipalities to raise over USD 4 billion in local currency for infrastructure investment, using domestic capital markets.[^m2b]

But, money isn't everything. Strikingly, many African cities appear to struggle to spend even the limited financing they already have access too. For example, Kisumu, Kenya was only able to spend 32% of its allocated capital investment budget in the financial year 2019/20, and this was without taking on further finance from capital markets.[^m2b] Due to a mix of a lack of integrated infrastructure plans, capacity constraints and issues with procurement processes, many cities find it difficult to deliver a pipeline of projects which are both, bankable and address their most important constraints. In the best cases, these plans are embedded within a compelling narrative showing how these projects contribute to the sustainable development of the city. Linking the infrastructure gap specifically to the need for projects that contribute to the economic, social and environmental progress of its inhabitants opens further avenues for tapping into new sources of financing from ESG-minded investors. After Johannesburg and Cape Town, the city of Tanga's water utility in Tanzania and Lagos state have issued green bonds to finance investments in water provision and drainage, renewable energy generation and waste management. African cities are also increasingly connecting with other cities, through networks such as the C40 cities, t

Another interesting space to watch are urban bature-based solutions (nbs) that address both, mitigation and adaptation. In urban contexts, NbS are particularly valued for their potential to support sustainable
development while enhancing the health and well-being of city dwellers.[^natura]

Dakar is a case in point: in 2015 the city's planned CFA 20 billion (about €30 million) municipal bond, backed by a USAID guarantee and a credit rating, was blocked at the last minute by the national government, amid a long-running political conflict between the city and the state.[^oecd] [^wef_dakar] [^ari] There are signs of change. In 2025 the African Development Bank lent Johannesburg ZAR 2.5 billion (about US$139 million), its first loan to an African city without a national government guarantee.[^afdb_jhb]

Change will take time. In the meantime, African entrepreneurs are already busy finding solutions to pressing infrastructure challenges. Infrahub.africa hosts a collection of 73 initiatives from 27 African countries providing solutions for waste collection and management, sanitation, mobility and many more. There is Yo-Waste, providing household and commercial waste collection services in Uganda or Clean Team Ghana, providing container-based sanitation services in Ghana.Go and check it yourself, here: https://www.infrahub.africa/. 

## Explore all 100 cities

To dig deeper into any of the 100 cities, explore the [**Urban Africa app**](https://tillytales92-urban-africa-app.share.connect.posit.cloud/) I built alongside this post. It has interactive maps of built-up growth and nighttime lights for each city, time series you can compare across cities, and rankings of how they grew.

<details class="ug-caveats" markdown="1">

<summary>Data and caveats</summary>

Built-up area and population come from the Global Human Settlement Layer (GHSL BUILT-S and GHS-POP, release R2023A, European Commission JRC), in five-year epochs from 1990 to 2025. Values between epochs are interpolated linearly for the animation. City boundaries are Africapolis 2020 agglomerations (OECD/SWAC), held fixed at their 2020 extent for all years. Building height is GHSL BUILT-V (volume) divided by BUILT-S (footprint), available 2000–2025. Nighttime-lights figures use a bloom- and top-coding-corrected DMSP series, also read from 2000. In the footprint animations, an area counts as built up if at least 10% of it is covered by buildings.

Two caveats are worth keeping in mind. Because the boundaries are fixed, growth that spills past them is not counted, so land growth is understated for cities that have outgrown their mapped area. Kinshasa and Luanda had already spread beyond theirs by 1990, and Addis Ababa has since (see above). Africapolis defines an agglomeration physically, as at least 10,000 people in a continuous built-up area with less than 200 metres between buildings, so scattered construction beyond that distance falls outside the boundary by design. And for several smaller cities, the large percentage changes partly reflect how the boundary polygon was drawn rather than actual growth. <span class="ug-todo">[TODO: add that the 2025 built-up layer is a model projection rather than an observation, so the final five years likely understate land growth.]</span>

The land-cover breakdown matches each greenfield pixel (GHSL built-up zero in 1990, positive in 2025) to the GLC_FCS30D land-cover map for 1990 (Zhang et al., 30 m resolution), weighted by the built-up surface added. It covers 98 of the 100 cities.[^glc]

</details>

<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>

<script>window.UG_DATA_URL = "{{ '/assets/json/urban-growth.json' | relative_url }}"; window.UG_LC_URL = "{{ '/assets/json/landcover-greenfield.json' | relative_url }}"; window.UG_UL_URL = "{{ '/assets/json/unlit-share.json' | relative_url }}";</script>

<script src="{{ '/assets/js/urban-growth.js' | relative_url }}"></script>

[^ft]: Pilling, D. and Judah, J. (2026), "[Africa's explosive growth in cities](https://www.ft.com/content/5203e527-ebdd-45d2-9019-6c440b4c4e93)", *Financial Times*, 18 October.
[^oecd]: OECD/AfDB/UNOPS-Cities Alliance/UCLG Africa (2025), [*Africa's Urbanisation Dynamics 2025: Planning for Urban Expansion*](https://doi.org/10.1787/2a47845c-en), West African Studies, OECD Publishing, Paris.
[^dorward]: Dorward, N. and Hoelscher, K. (2026), "Urbanisation and the political demography of African cities", *World Development* 202, 107344.
[^delbridge]: Delbridge, V., Harman, O., Oliveira-Cunha, J. and Venables, A. (2022), *Sustainable urbanisation in developing countries: Cities as places to live*, IGC Growth Brief, International Growth Centre.
[^ghsl]: European Commission, Joint Research Centre, Global Human Settlement Layer, release R2023A: built-up surface (GHS-BUILT-S), building volume (GHS-BUILT-V) and population (GHS-POP) grids at 100 m resolution, 1990–2025. [Data download](https://human-settlement.emergency.copernicus.eu/data.php).
[^africapolis]: City boundaries and the ranking of the 100 largest cities (by 2020 population) come from OECD/SWAC, [*Africapolis*](https://africapolis.org), 2020 agglomerations.
[^herbst]: Herbst, J. (2000), *States and Power in Africa: Comparative Lessons in Authority and Control*, Princeton University Press, Princeton.
[^austin]: Austin, G. (2008), "Resources, techniques, and strategies south of the Sahara: revising the factor endowments perspective on African economic development, 1500–2000", *Economic History Review* 61(3), 587–624.
[^marshall]: Marshall, A. (1890), *Principles of Economics*, Macmillan, London.
[^jacobs]: Jacobs, J. (1969), *The Economy of Cities*, Random House, New York.
[^dercon]: Dercon, S., Haas, A., Kriticos, S. and Lippolis, N. (2019), *Can Africa learn from the Chinese urbanisation story?*, Cities that Work Policy Framing Paper, International Growth Centre.
[^bgt]: Bryan, G., Glaeser, E. and Tsivanidis, N. (2024), *Cities*, IGC Evidence Paper, International Growth Centre.
[^kh]: Kriticos, S. and Henderson, J. V. (2019), *The prospects for manufacturing-led growth in Africa's cities*, IGC Growth Brief, International Growth Centre. The China figures are from Hu Angang (2011), as cited there.
[^height]: Own calculation from GHSL data. Mean building height is total building volume (GHS-BUILT-V, m³) divided by total built-up surface (GHS-BUILT-S, m²) within each city's fixed Africapolis boundary, for 2000 and 2025; the "median city" is the median across the 100 cities.
[^lall]: Lall, S. V., Henderson, J. V. and Venables, A. J. (2017), *Africa's Cities: Opening Doors to the World*, World Bank, Washington, DC. Figures as summarised in Dercon et al. (2019).
[^nakamura]: Nakamura, S. et al. (2018), "Is living in African cities expensive?", *Applied Economics Letters* 26(12), 1007–1012. As cited in OECD et al. (2025).
[^osm]: Own calculation, a pilot in seven cities with good OpenStreetMap coverage. Each 100 m cell is classed as newly built since 1990 or as already built in 1990 and denser by 2025; distance is to the nearest school, health facility or drinking-water point mapped in OpenStreetMap, averaged over residents (GHS-POP 2025). Densified vs. newly built areas: Kinshasa 0.44 vs. 1.03 km, Juba 0.35 vs. 0.68 km, Kampala 0.66 vs. 1.06 km, Mogadishu 2.36 vs. 3.79 km, Dar es Salaam 2.16 vs. 3.09 km, Khartoum 1.75 vs. 2.38 km, Lagos 1.22 vs. 1.45 km. Three caveats: new building sits at the edge by definition and services cluster in older areas, so part of the gap is simply distance from the centre rather than an effect of sprawl itself; being near a mapped facility says nothing about whether it works or has capacity; and OpenStreetMap is incomplete even in these cities, which are not a representative sample.
[^gjv]: Gollin, D., Jedwab, R. and Vollrath, D. (2016), "Urbanization with and without industrialization", *Journal of Economic Growth* 21(1), 35–70.
[^jcg]: Jedwab, R., Christiaensen, L. and Gindelsky, M. (2017), "Demography, urbanization and development: Rural push, urban pull and... urban push?", *Journal of Urban Economics* 98, 6–16.
[^mob]: Menashe-Oren, A. and Bocquier, P. (2021), "Urbanization is no longer driven by migration in low- and middle-income countries (1985–2015)", *Population and Development Review* 47(3), 639–663.
[^ab_elec]: Msafiri, D. and Adjadeh, R. (2024), "[Energy gaps: Slight, uneven progress still leaves many Africans without electricity](https://www.afrobarometer.org/wp-content/uploads/2024/04/AD79-PAP13-Slight-and-uneven-progress-still-leaves-many-Africans-without-electricity-Afrobarometer-8april24.pdf)", Afrobarometer Dispatch No. 793, 11 April. Survey round 2021/2023, 39 countries; grid presence is observed by field teams, reliability is self-reported.
[^ab_water]: Ben Saad, M. N., Kayanja, G. W. and Ssevume, S. M. (2024), "[Water and sanitation still major challenges in Africa, especially for rural and poor citizens](https://www.afrobarometer.org/wp-content/uploads/2024/03/AD784-PAP11-Water-and-sanitation-still-major-challenges-across-Africa-Afrobarometer-19march24.pdf)", Afrobarometer Dispatch No. 784, 19 March. Urban averages, 2021/2023, 39 countries: sewage system in 53% of urban enumeration areas, toilet inside the home for 50% of urban households, 20% of urban residents went without enough clean water "many times" or "always".
[^wmo]: World Meteorological Organization (2024), *State of the Climate in Africa 2023*, WMO-No. 1360, Geneva.
[^ipcc]: Trisos, C. H. et al. (2022), "Africa", in *Climate Change 2022: Impacts, Adaptation and Vulnerability*, Contribution of Working Group II to the Sixth Assessment Report of the IPCC, Cambridge University Press, chapter 9.
[^muggah]: Muggah, R. (2016), "[How fragile are our cities?](https://www.weforum.org/stories/resilience-peace-and-security/how-fragile-are-our-cities)", World Economic Forum, 9 February.
[^wef_dakar]: Hill, K. and Muggah, R. (2018), "[Africa's cities will double in population by 2050: here are 4 ways to make sure they thrive](https://www.weforum.org/stories/geographies-in-depth/africa-urbanization-cities-double-population-2050-4-ways-thrive)", World Economic Forum, 27 June.
[^ari]: Africa Research Institute (2016), "[Dakar's municipal bond issue: a tale of two cities](https://africaresearchinstitute.org/briefing-notes/dakars-municipal-bond-issue-a-tale-of-two-cities)", Briefing Note, May.
[^afdb_jhb]: "[AfDB approves R2.5bn loan for City of Joburg](https://www.engineeringnews.co.za/article/afdb-approves-r25bn-loan-for-city-of-joburg-2025-07-02)", *Engineering News*, 2 July 2025. The bank describes it as its first direct loan to a subnational government in Africa without a sovereign guarantee.
[^heinrigs]: Heinrigs, P. (2020), "[Africapolis: understanding the dynamics of urbanization in Africa](https://journals.openedition.org/factsreports/6233)", *Field Actions Science Reports*, Special Issue 22. As cited in Joubert et al. (2026).
[^wb_migration]: East Africa is the only sub-region where rural-to-urban migration is a serious driver of urban growth, at 31% of urban growth over 2020–25 against 11–13% in the other sub-regions. World Bank (2026), [*Sub-Saharan Africa's Urban Awakening: Catalyzing Economic Growth and Job Creation*](https://www.worldbank.org/en/publication/africa-urban-awakening), World Bank, Washington, DC.
[^odi]: Löffler, G. and Haas, A. (2023), [*Bridging Africa's urban infrastructure gap: financial intermediaries for facilitating cities' access to debt finance in Africa*](https://odi.org/en/publications/bridging-africas-urban-infrastructure-gap-financial-intermediaries-for-facilitating-cities-access-to-debt-finance-in-africa), ODI Working Paper, ODI, London.
[^m2b]: Haas, A. R. N., Cartwright, A., Garang, A. and Songwe, V. (2023), *From Millions to Billions: Financing the Development of African Cities*, African Development Bank and Big Win Philanthropy. If you read one of these reports, make it this one: its case studies of ten African cities are really insightful.
[^wb]: World Bank (2026), [*Sub-Saharan Africa's Urban Awakening: Catalyzing Economic Growth and Job Creation*](https://www.worldbank.org/en/publication/africa-urban-awakening), World Bank, Washington, DC.
[^aul]: Lockhart, K. (2025), "[Launching the Africa Urban Lab](https://www.aul.city/blog/launching-the-africa-urban-lab)", Africa Urban Lab, 13 January. Only three of Africa's 55 countries legally allow cities to set their own tax base, collect revenue and access international capital markets.
[^jibao]: Jibao, S. (2017), "Sierra Leone", in Franzsen, R. and McCluskey, W. (eds), *Property Tax in Africa: Status, Challenges, and Prospects*, Lincoln Institute of Land Policy, Cambridge, MA, 364–376. As cited in Grieco, K., Michel, J. and Holliday, D. (2020), "[Reforming property tax valuation in Sierra Leone](https://www.theigc.org/blogs/reforming-property-tax-valuation-sierra-leone)", IGC blog, 21 February.
[^haas]: Haas, A. R. N. (2025), "[The O-Ring Theory of Municipal Finance: Why Every Link in the Chain Matters for African Cities](https://www.aul.city/blog/the-o-ring-theory-of-municipal-finance)", Africa Urban Lab, 5 June. Based on a review of legislation in 41 African countries.
[^natura]: Joubert, I., Anderson, P., Hubbard, E., Dupar, M., Brill, G., Adegun, O., Kirimi, F., Gauld-Angelucci, Z., Diep, L. and McPhearson, T. (2026), [*Africa Roadmap for Urban Nature-Based Solutions*](https://doi.org/10.18574/nyu/9781479850501.0010001), in *NATURA Global Roadmap for Urban Nature-Based Solutions*, NYU Press, New York.
[^glc]: Zhang, X. et al. (2023), "GLC_FCS30D: the first global 30 m land-cover dynamics monitoring product with a fine classification system for the period from 1985 to 2022", *Earth System Science Data*. Accessed through the Google Earth Engine community catalogue.
