var psipred =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = parse_hspred;
/* harmony export (immutable) */ __webpack_exports__["i"] = parse_metsite;
/* harmony export (immutable) */ __webpack_exports__["h"] = parse_ffpreds;
/* harmony export (immutable) */ __webpack_exports__["g"] = parse_featcfg;
/* unused harmony export get_memsat_ranges */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse_ss2;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse_pbdat;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse_comb;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse_memsatdata;
/* harmony export (immutable) */ __webpack_exports__["e"] = parse_presult;
/* harmony export (immutable) */ __webpack_exports__["f"] = parse_parseds;
function parse_hspred(ractive, file) {
  let hspred_table = '<br /><h3>Key</h3><table class="small-table table-striped table-bordered"><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Hotspot Residue</td></tr>';
  hspred_table += '<tr><td bgcolor="#ffffff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Non-Hotspot Residue</td></tr>';
  hspred_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Non-interface residue</td></tr></table><br /><br />';
  hspred_table += '<h3>Residue Predictions</h3><table id="hspred_table" class="table table-striped table-bordered"><thead><tr><th>Chain/Residue</th><th>Residue Identity</th><th>Score</th></thead><tbody>';
  let lines = file.split('\n');
  lines.forEach(function (line, i) {
    let entries = line.split(/\s+/);
    if (entries.length === 3) {
      hspred_table += '<tr><td>' + entries[0] + '</td><td>' + entries[1] + '</td><td>' + entries[2] + '</td></tr>';
    }
  });
  hspred_table += '</tbody><tfoot></tfoot><table>';
  ractive.set('hspred_table', hspred_table);
  $('#hspred_table').DataTable({
    'searching': false,
    'pageLength': 50,
    'order': [[2, 'desc']]
  });
}

// parse the small metsite output table
function parse_metsite(ractive, file) {
  let metsite_table = '<br /><h3>Key</h3><table class="small-table table-striped table-bordered"><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Metal Binding Contact</td></tr>';
  metsite_table += '<tr><td bgcolor="#000000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Chain not predicted</td></tr>';
  metsite_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Predicted chain</td></tr></table><br />';
  metsite_table += '<h3>Residue Predictions</h3><table id="metsite_table" class="table small-table table-striped table-bordered"><thead><tr><th>Residue Number</th><th>Raw Neural Network Score</th><th>Residue</th><thead><tbody>';
  let hit_regex = /\d+\s.+?\s\w{3}\d+/g;
  let hit_matches = file.match(hit_regex);
  if (hit_matches) {
    hit_matches.forEach(function (line, i) {
      let entries = line.split(/\s/);
      metsite_table += '<tr><td>' + entries[0] + '</td><td>' + entries[1] + '</td><td>' + entries[2] + '</td></tr>';
    });
  }
  metsite_table += '</tbody><tfoot></tfoot><table>';
  ractive.set('metsite_table', metsite_table);
  $('#metsite_table').DataTable({
    'searching': false,
    'pageLength': 10
  });
}

function parse_ffpreds(ractive, file) {

  let lines = file.split('\n');
  let bp_data = [];
  let mf_data = [];
  let cc_data = [];
  let table_data = '';
  lines.forEach(function (line, i) {
    if (line.startsWith('#')) {
      return;
    }
    let entries = line.split('\t');
    if (entries.length < 4) {
      return;
    }
    if (entries[3] === 'BP') {
      bp_data.push(entries);
    }
    if (entries[3] === 'CC') {
      cc_data.push(entries);
    }
    if (entries[3] === 'MF') {
      mf_data.push(entries);
    }
  });

  table_data += "<b>Biological Process Predictions</b><br />";
  table_data += "<table id='bp_table' class='table small-table table-bordered gen-table'><thead><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr></thead><tbody>";
  bp_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</tbody><tfoot></tfoot></table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Molecular Function Predictions</b><br />";
  table_data += "<table id='mf_table' class='table small-table table-bordered gen-table'><thead><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr></thead><tbody>";
  mf_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</tbody><tfoot></tfoot></table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Cellular Component Predictions</b><br />";
  table_data += "<table id='cc_table' class='table small-table table-bordered gen-table'><thead><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr></thead><tbody>";
  cc_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</tbody><tfoot></tfoot></table><br />';
  table_data += 'These prediction terms represent terms predicted where SVM training includes assigned GO terms across all evidence code types. SVM reliability is regarded as High (H) when MCC, sensitivity, specificity and precision are jointly above a given threshold. otherwise Reliability is indicated as Low (L). <br />';
  ractive.set('function_tables', table_data);
  $('#bp_table').DataTable({
    'searching': false,
    'pageLength': 25,
    'order': [[3, 'asc']]
  });
  $('#mf_table').DataTable({
    'searching': false,
    'pageLength': 25,
    'order': [[3, 'asc']]
  });
  $('#cc_table').DataTable({
    'searching': false,
    'pageLength': 25,
    'order': [[3, 'asc']]
  });
}

function set_aanorm() {
  let hAA_norm = {};
  hAA_norm.A = { val: 0.071783248006309,
    sde: 0.027367661524275 };
  hAA_norm.V = { val: 0.059624595369901,
    sde: 0.020377791528745 };
  hAA_norm.Y = { val: 0.026075068240437,
    sde: 0.014822471531379 };
  hAA_norm.W = { val: 0.014166002612771,
    sde: 0.010471835801996 };
  hAA_norm.T = { val: 0.052593582972714,
    sde: 0.020094793964597 };
  hAA_norm.S = { val: 0.082123241332099,
    sde: 0.028687566081512 };
  hAA_norm.P = { val: 0.065557531322241,
    sde: 0.034239398496736 };
  hAA_norm.F = { val: 0.037103994969002,
    sde: 0.018543423139186 };
  hAA_norm.M = { val: 0.022562818183955,
    sde: 0.011321039662481 };
  hAA_norm.K = { val: 0.054833979269185,
    sde: 0.029264083667157 };
  hAA_norm.L = { val: 0.10010591575906,
    sde: 0.030276808519009 };
  hAA_norm.I = { val: 0.042034526040467,
    sde: 0.020826849262495 };
  hAA_norm.H = { val: 0.027141403537598,
    sde: 0.01550566378985 };
  hAA_norm.G = { val: 0.069179820104536,
    sde: 0.030087562057328 };
  hAA_norm.Q = { val: 0.065920561931801,
    sde: 0.030103091008366 };
  hAA_norm.E = { val: 0.04647846225838,
    sde: 0.019946269461736 };
  hAA_norm.C = { val: 0.024908551872056,
    sde: 0.020822909589504 };
  hAA_norm.D = { val: 0.044337904726041,
    sde: 0.018436677256726 };
  hAA_norm.N = { val: 0.033507020987033,
    sde: 0.016536022288204 };
  hAA_norm.R = { val: 0.05974046903119,
    sde: 0.025165994773384 };
  return hAA_norm;
}

function set_fnorm() {
  let hF_norm = {};
  hF_norm.hydrophobicity = { val: -0.34876828080152,
    sde: 0.75559152769799 };
  hF_norm['percent positive residues'] = { val: 11.457717466948,
    sde: 3.567133341139 };
  hF_norm['aliphatic index'] = { val: 79.911549319099,
    sde: 16.787617978827 };
  hF_norm['isoelectric point'] = { val: 7.6102046383603,
    sde: 1.9716111020088 };
  hF_norm['molecular weight'] = { val: 48668.412839961,
    sde: 37838.324895969 };
  hF_norm.charge = { val: 5.0991763057604,
    sde: 16.83863659025 };
  hF_norm['percent negative residues'] = { val: 11.026190128176,
    sde: 4.0206631680926 };
  hF_norm['molar extinction coefficient'] = { val: 46475.293923926,
    sde: 39299.399848823 };
  return hF_norm;
}

function get_aa_color(val) {
  let ab_val = Math.abs(val);
  if (ab_val >= 2.96) {
    if (val > 0) {
      return "signif1p";
    }
    return "signif1n";
  } else if (ab_val >= 2.24) {
    if (val > 0) {
      return "signif2p";
    }
    return "signif2n";
  } else if (ab_val >= 1.96) {
    if (val > 0) {
      return "signif5p";
    }
    return "signif5n";
  } else if (ab_val >= 1.645) {
    if (val > 0) {
      return "signif10p";
    }
    return "signif10n";
  }
  return "plain";
}

//parse the ffpred featcfo features file
function parse_featcfg(ractive, file) {
  let lines = file.split('\n');
  let SF_data = {};
  let AA_data = {};
  let hF_norm = set_fnorm();
  let hAA_norm = set_aanorm();
  lines.forEach(function (line, i) {
    if (line.startsWith("AA")) {
      let columns = line.split('\t');
      AA_data[columns[1]] = columns[2];
    }
    if (line.startsWith("SF")) {
      let columns = line.split('\t');
      SF_data[columns[1]] = columns[2];
    }
  });

  // build html tables for the feature data
  let class_colour = '';
  let global_features = ractive.get('global_features');
  let feat_table = '<b>Global Features</b><br />';
  feat_table += 'Global features are calculated directly from sequence. Localisation values are predicted by the Psort algorithm and reflect the relative likelihood of the protein occupying different cellular localisations. The bias column is highlighted according to the significance of the feature value calculated from Z score of the feature.<br />';
  feat_table += '<table align="center" class="small-table table-striped table-bordered ffpred-table"><tr><th>Feature Name</th><th>Value</th><th>Bias</th></tr>';

  Object.keys(SF_data).sort().forEach(function (feature_name) {
    let class_colour = '';
    if (feature_name in hF_norm) {
      class_colour = get_aa_color((parseFloat(SF_data[feature_name]) - hF_norm[feature_name].val) / hF_norm[feature_name].sde);
    }
    feat_table += '<tr><td>' + feature_name + '</td><td>' + parseFloat(SF_data[feature_name]).toFixed(2) + '</td><td class="' + class_colour + '">&nbsp;&nbsp;&nbsp;</td></tr>';
  });
  feat_table += '</table>';
  ractive.set('global_features', feat_table);

  //build html table for the AA data
  let aa_composition = ractive.get('aa_composition');
  let aa_table = '<b>Amino Acid Composition (percentages)</b><br />';

  aa_table += '<table width="50%" class="small-table table-striped table-bordered ffpred-table" align="center" ><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    aa_table += '<th width="5%">' + residue + '</th>';
  });
  aa_table += '</tr><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    let class_colour = '';
    class_colour = get_aa_color((parseFloat(AA_data[residue]) - hAA_norm[residue].val) / hAA_norm[residue].sde);
    aa_table += '<td width="5% class="' + class_colour + '">' + (parseFloat(AA_data[residue]) * 100).toFixed(2) + '</td>';
  });
  aa_table += '</tr></table><br />';
  aa_table += '<b>Significance Key</b><br /><br />';
  aa_table += '<table width="50%" class="small-table table-striped table-bordered ffpred-table" align="center">';
  aa_table += '<thead><tr>';
  aa_table += '<th width="9%" align="left"><b>low</b></th>';
  aa_table += '<th colspan="9">&nbsp;</th>';
  aa_table += '<th width="9%" align="right"><b>high</b></th>';
  aa_table += '</tr></thead>';
  aa_table += '<tbody><tr>';
  aa_table += '<td>&nbsp;</td>';
  aa_table += '<td class="signif1n">p &lt; 0.01</td>';
  aa_table += '<td class="signif2n">p &lt; 0.02</td>';
  aa_table += '<td class="signif5n">p &lt; 0.05</td>';
  aa_table += '<td class="signif10n">p &lt; 0.1</td>';
  aa_table += '<td>p &gt;= 0.1</td>';
  aa_table += '<td class="signif10p">p &lt; 0.1</td>';
  aa_table += '<td class="signif5p">p &lt; 0.05</td>';
  aa_table += '<td class="signif2p">p &lt; 0.02</td>';
  aa_table += '<td class="signif1p">p &lt; 0.01</td>';
  aa_table += '<td>&nbsp</td>';
  aa_table += '</tr></tbody>';
  aa_table += '<tfoot><tr>';
  aa_table += '<td colspan="11">Significance p value is calculated using the Z score of the percent amino acid composition</td>';
  aa_table += '</tr><tfoot>';
  aa_table += '</table>';
  ractive.set('aa_composition', aa_table);
}

// for a given memsat data files extract coordinate ranges given some regex
function get_memsat_ranges(regex, data) {
  let match = regex.exec(data);
  if (match[1].includes(',')) {
    let regions = match[1].split(',');
    regions.forEach(function (region, i) {
      regions[i] = region.split('-');
      regions[i][0] = parseInt(regions[i][0]);
      regions[i][1] = parseInt(regions[i][1]);
    });
    return regions;
  } else if (match[1].includes('-')) {
    // console.log(match[1]);
    let seg = match[1].split('-');
    let regions = [[]];
    regions[0][0] = parseInt(seg[0]);
    regions[0][1] = parseInt(seg[1]);
    return regions;
  }
  return match[1];
}

// take and ss2 (file) and parse the details and write the new annotation grid
function parse_ss2(ractive, file) {
  let annotations = ractive.get('annotations');
  let lines = file.split('\n');
  lines.shift();
  lines = lines.filter(Boolean);
  if (annotations.length == lines.length) {
    lines.forEach(function (line, i) {
      let entries = line.split(/\s+/);
      annotations[i].ss = entries[3];
    });
    ractive.set('annotations', annotations);
    let panel_height = (Math.ceil(annotations.length / 50) + 2) * 20 + 8 * 20;
    if (panel_height < 300) {
      panel_height = 300;
    }
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: panel_height, container_height: panel_height });
  } else {
    alert("SS2 annotation length does not match query sequence");
  }
  return annotations;
}

//take the disopred pbdat file, parse it and add the annotations to the annotation grid
function parse_pbdat(ractive, file) {
  let annotations = ractive.get('annotations');
  let lines = file.split('\n');
  lines.shift();lines.shift();lines.shift();lines.shift();lines.shift();
  lines = lines.filter(Boolean);
  if (annotations.length == lines.length) {
    lines.forEach(function (line, i) {
      let entries = line.split(/\s+/);
      if (entries[3] === '-') {
        annotations[i].disopred = 'D';
      }
      if (entries[3] === '^') {
        annotations[i].disopred = 'PB';
      }
    });
    ractive.set('annotations', annotations);
    let panel_height = (Math.ceil(annotations.length / 50) + 2) * 20 + 8 * 20;
    if (panel_height < 300) {
      panel_height = 300;
    }
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: panel_height, container_height: panel_height });
  }
}

//parse the disopred comb file and add it to the annotation grid
function parse_comb(ractive, file) {
  let precision = [];
  let lines = file.split('\n');
  lines.shift();lines.shift();lines.shift();
  lines = lines.filter(Boolean);
  lines.forEach(function (line, i) {
    let entries = line.split(/\s+/);
    precision[i] = {};
    precision[i].pos = entries[1];
    precision[i].precision = entries[4];
  });
  ractive.set('diso_precision', precision);
  biod3.genericxyLineChart(precision, 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
}

//parse the memsat output
function parse_memsatdata(ractive, file) {
  let annotations = ractive.get('annotations');
  let seq = ractive.get('sequence');
  //console.log(file);
  let topo_regions = get_memsat_ranges(/Topology:\s+(.+?)\n/, file);
  let signal_regions = get_memsat_ranges(/Signal\speptide:\s+(.+)\n/, file);
  let reentrant_regions = get_memsat_ranges(/Re-entrant\shelices:\s+(.+?)\n/, file);
  let terminal = get_memsat_ranges(/N-terminal:\s+(.+?)\n/, file);
  //console.log(signal_regions);
  // console.log(reentrant_regions);
  let coil_type = 'CY';
  if (terminal === 'out') {
    coil_type = 'EC';
  }
  let tmp_anno = new Array(seq.length);
  if (topo_regions !== 'Not detected.') {
    let prev_end = 0;
    topo_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('TM', region[0], region[1] + 1);
      if (prev_end > 0) {
        prev_end -= 1;
      }
      tmp_anno = tmp_anno.fill(coil_type, prev_end, region[0]);
      if (coil_type === 'EC') {
        coil_type = 'CY';
      } else {
        coil_type = 'EC';
      }
      prev_end = region[1] + 2;
    });
    tmp_anno = tmp_anno.fill(coil_type, prev_end - 1, seq.length);
  }
  //signal_regions = [[70,83], [102,117]];
  if (signal_regions !== 'Not detected.') {
    signal_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('S', region[0], region[1] + 1);
    });
  }
  //reentrant_regions = [[40,50], [200,218]];
  if (reentrant_regions !== 'Not detected.') {
    reentrant_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('RH', region[0], region[1] + 1);
    });
  }
  tmp_anno.forEach(function (anno, i) {
    annotations[i].memsat = anno;
  });
  ractive.set('annotations', annotations);
  let panel_height = (Math.ceil(annotations.length / 50) + 2) * 20 + 8 * 20;
  if (panel_height < 300) {
    panel_height = 300;
  }
  biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: panel_height, container_height: panel_height });
}

function parse_presult(ractive, file, type) {
  let lines = file.split('\n');
  //console.log(type+'_ann_set');
  let ann_list = ractive.get(type + '_ann_set');
  //console.log(ann_list);
  if (Object.keys(ann_list).length > 0) {
    let pseudo_table = '<table id="' + type + '_table" class="small-table table-striped table-bordered gen-table"><thead>\n';
    pseudo_table += '<tr><th>Conf.</th>';
    pseudo_table += '<th>Net Score</th>';
    pseudo_table += '<th>p-value</th>';
    pseudo_table += '<th>PairE</th>';
    pseudo_table += '<th>SolvE</th>';
    pseudo_table += '<th>Aln Score</th>';
    pseudo_table += '<th>Aln Length</th>';
    pseudo_table += '<th>Target Len</th>';
    pseudo_table += '<th>Query Len</th>';
    if (type === 'dgen') {
      pseudo_table += '<th>Region Start</th>';
      pseudo_table += '<th>Region End</th>';
      pseudo_table += '<th>CATH</th>';
      pseudo_table += '<th>SCOP</th>';
    } else {
      pseudo_table += '<th>Fold</th>';
      pseudo_table += '<th>SCOP</th>';
      pseudo_table += '<th>CATH</th>';
    }
    pseudo_table += '<th>PDBSUM</th>';
    pseudo_table += '<th>Alignment</th>';
    pseudo_table += '<th>MODEL</th>';

    // if MODELLER THINGY
    pseudo_table += '</tr></thead><tbody">\n';
    lines.forEach(function (line, i) {
      //console.log(line);
      if (line.length === 0) {
        return;
      }
      let entries = line.split(/\s+/);
      let table_hit = entries[9];
      if (type === 'dgen') {
        table_hit = entries[11];
      }
      if (table_hit + "_" + i in ann_list) {
        pseudo_table += "<tr>";
        pseudo_table += "<td class='" + entries[0].toLowerCase() + "'>" + entries[0] + "</td>";
        pseudo_table += "<td>" + entries[1] + "</td>";
        pseudo_table += "<td>" + entries[2] + "</td>";
        pseudo_table += "<td>" + entries[3] + "</td>";
        pseudo_table += "<td>" + entries[4] + "</td>";
        pseudo_table += "<td>" + entries[5] + "</td>";
        pseudo_table += "<td>" + entries[6] + "</td>";
        pseudo_table += "<td>" + entries[7] + "</td>";
        pseudo_table += "<td>" + entries[8] + "</td>";
        let pdb = entries[9].substring(0, entries[9].length - 2);
        if (type === 'dgen') {
          pdb = entries[11].substring(0, entries[11].length - 3);
        }
        if (type === 'dgen') {
          pseudo_table += "<td>" + entries[9] + "</td>";
          pseudo_table += "<td>" + entries[10] + "</td>";
          pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/version/latest/domain/" + table_hit + "'>" + table_hit + "</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='View' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"cath_modeller\");' value='Model' /></td>";
        } else {
          pseudo_table += "<td><a target='_blank' href='https://www.rcsb.org/pdb/explore/explore.do?structureId=" + pdb + "'>" + table_hit + "</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/pdb/" + pdb + "'>SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='View' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"pdb_modeller\");' value='Model' /></td>";
        }
        pseudo_table += "</tr>\n";
      }
    });
    pseudo_table += "</tbody><tfoot></tfoot></table>\n";
    ractive.set(type + "_table", pseudo_table);
    $('#' + type + '_table').DataTable({
      'searching': false,
      'pageLength': 50
    });
  } else {
    ractive.set(type + "_table", "<h3>No good hits found. GUESS and LOW confidence hits can be found in the results file</h3>");
  }
}

function parse_parseds(ractive, file) {
  let prediction_regex = /Domain\sBoundary\slocations\spredicted\sDPS:\s(.+)/;
  let prediction_match = prediction_regex.exec(file);
  if (prediction_match) {
    let details = file.replace("\n", "<br />");
    details = details.replace("\n", "<br />");
    ractive.set("parseds_info", "<h4>" + details + "</h4>");
    let values = [];
    if (prediction_match[1].indexOf(",")) {
      values = prediction_match[1].split(',');
      values.forEach(function (value, i) {
        values[i] = parseInt(value);
      });
    } else {
      values[0] = parseInt(prediction_match[1]);
    }
    //console.log(values);
    let annotations = ractive.get('annotations');
    values.forEach(function (value) {
      annotations[value].dompred = 'B';
    });
    ractive.set('annotations', annotations);
  } else {
    ractive.set("parseds_info", "No ParseDS Domain boundaries predicted");
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = show_panel;
/* harmony export (immutable) */ __webpack_exports__["g"] = clear_settings;
/* harmony export (immutable) */ __webpack_exports__["a"] = prepare_downloads_html;
/* harmony export (immutable) */ __webpack_exports__["b"] = handle_results;
/* harmony export (immutable) */ __webpack_exports__["e"] = display_structure;
/* harmony export (immutable) */ __webpack_exports__["c"] = set_downloads_panel;
/* harmony export (immutable) */ __webpack_exports__["f"] = set_advanced_params;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(2);



function show_panel(value, ractive) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', value);
}

//before a resubmission is sent all variables are reset to the page defaults
function clear_settings(ractive, gear_string, job_list, job_names, zip) {
  ractive.set('results_visible', 1);
  ractive.set('results_panel_visible', 1);
  ractive.set('download_links', '');
  job_list.forEach(function (job_name) {
    ractive.set(job_name + '_waiting_message', '<h2>Please wait for your ' + job_names[job_name] + ' job to process</h2>');
    ractive.set(job_name + '_waiting_icon', gear_string);
    ractive.set(job_name + '_time', '');
  });
  ractive.set('psipred_horiz', null);
  ractive.set('diso_precision');
  ractive.set('memsatsvm_schematic', '');
  ractive.set('memsatsvm_cartoon', '');
  ractive.set('pgen_table', '');
  ractive.set('pgen_set', {});
  ractive.set('gen_table', '');
  ractive.set('gen_set', {});
  ractive.set('parseds_info', null);
  ractive.set('parseds_png', null);
  ractive.set('dgen_table', null);
  ractive.set('dgen_ann_set', {});
  ractive.set('bioserf_model', null);
  ractive.set('domserf_buttons', '');
  ractive.set('domserf_model_uris:', []);
  ractive.set('sch_schematic:', null);
  ractive.set('aa_composition', null);
  ractive.set('global_features', null);
  ractive.set('function_tables', null);
  ractive.set('metapsicov_map', null);
  ractive.set('metsite_table', null);
  ractive.set('hspred_table', null);
  ractive.set('metsite_pdb', null);
  ractive.set('hspred_initial_pdb', null);
  ractive.set('hspred_second_pdb', null);
  ractive.set('tdb_file', null);
  ractive.set('loading_message', 'Loading Data');

  ractive.set('annotations', null);
  ractive.set('batch_uuid', null);
  biod3.clearSelection('div.sequence_plot');
  biod3.clearSelection('div.psipred_cartoon');
  biod3.clearSelection('div.comb_plot');

  zip = new JSZip();
}

//Take a couple of variables and prepare the html strings for the downloads panel
function prepare_downloads_html(data, downloads_info, job_list, job_names) {
  job_list.forEach(function (job_name) {
    if (data.job_name === job_name) {
      downloads_info[job_name] = {};
      downloads_info[job_name].header = "<h5>" + job_names[job_name] + " DOWNLOADS</h5>";
      //EXTRA PANELS FOR SOME JOBS TYPES:
      if (job_name === 'pgenthreader' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'metapsicov' || job_name === 'ffpred' || job_name === 'domserf' || job_name === 'bioserf') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
      }
      if (job_name === 'mempack') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
      }
      if (job_name === 'bioserf') {
        downloads_info.pgenthreader = {};
        downloads_info.pgenthreader.header = "<h5>" + job_names.pgenthreader + " DOWNLOADS</h5>";
        downloads_info.bioserf = {};
        downloads_info.bioserf.header = "<h5>" + job_names.bioserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'domserf') {
        downloads_info.pdomthreader = {};
        downloads_info.pdomthreader.header = "<h5>" + job_names.pdomthreader + " DOWNLOADS</h5>";
        downloads_info.domserf = {};
        downloads_info.domserf.header = "<h5>" + job_names.domserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'ffpred') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
        // downloads_info.disopred = {};
        // downloads_info.disopred.header = "<h5>"+job_names.disopred+" DOWNLOADS</h5>";
        downloads_info.ffpred = {};
        downloads_info.ffpred.header = "<h5>" + job_names.ffpred + " DOWNLOADS</h5>";
      }
    }
  });
}

//take the datablob we've got and loop over the results
function handle_results(ractive, data, file_url, zip, downloads_info, job_names, job_list) {
  let horiz_regex = /\.horiz$/;
  let ss2_regex = /\.ss2$/;
  let png_regex = /\.png$/;
  let memsat_cartoon_regex = /_cartoon_memsat_svm\.png$/;
  let memsat_schematic_regex = /_schematic\.png$/;
  let memsat_data_regex = /memsat_svm$/;
  let mempack_cartoon_regex = /Kamada-Kawai_\d+.png$/;
  let mempack_graph_out = /input_graph.out$/;
  let mempack_contact_res = /CONTACT_DEF1.results$/;
  let mempack_lipid_res = /LIPID_EXPOSURE.results$/;
  let domssea_pred_regex = /\.pred$/;
  let domssea_regex = /\.domssea$/;
  let domserf_regex = /.+_(\d+)_(\d+).*\.pdb/;
  let ffpred_sch_regex = /.+_sch\.png/;
  //let ffpred_svm_regex = /.+_cartoon_memsat_svm_.*\.png/;
  let ffpred_svm_regex = /.+_tm\.png/;
  let ffpred_schematic_regex = /.+_schematic_.*\.png/;
  let ffpred_tm_regex = /.+_tm\.png/;
  let ffpred_featcfg_regex = /\.featcfg/;
  let ffpred_preds_regex = /\.full_raw/;
  let metapsicov_ev_regex = /\.evfold/;
  let metapsicov_psicov_regex = /\.psicov/;
  let metapsicov_ccmpred_regex = /\.ccmpred/;
  let metsite_table_regex = /\.Metpred/;
  let metsite_pdb_regex = /\.MetPred/;
  let hspred_initial_regex = /_initial\.pdb/;
  let hspred_second_regex = /_second\.pdb/;

  let image_regex = '';
  let results = data.results;
  let domain_count = 0;
  let metsite_checkchains_seen = false;
  let hspred_checkchains_seen = false;
  let gentdb_checkchains_seen = false;
  let results_found = {
    psipred: false,
    disopred: false,
    memsatsvm: false,
    pgenthreader: false,
    metapsicov: false,
    mempack: false,
    genthreader: false,
    dompred: false,
    pdomthreader: false,
    bioserf: false,
    domserf: false,
    ffpred: false,
    metsite: false,
    hspred: false,
    memembed: false,
    gentdb: false
  };
  let reformat_domserf_models_found = false;

  //Prepatory loop for information that is needed before results parsing:
  for (let i in results) {
    let result_dict = results[i];
    if (result_dict.name === 'GenAlignmentAnnotation') {
      let ann_set = ractive.get("pgen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("pgen_ann_set", ann_set);
    }
    if (result_dict.name === 'gen_genalignment_annotation') {
      let ann_set = ractive.get("gen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("gen_ann_set", ann_set);
    }
    if (result_dict.name === 'GenAlignmentAnnotation_dom') {
      let ann_set = ractive.get("dgen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("dgen_ann_set", ann_set);
    }
  }
  console.log(results);
  //main results parsing loop
  for (let i in results) {
    let result_dict = results[i];
    //psipred files
    if (result_dict.name == 'psipass2') {
      results_found.psipred = true;
      let match = horiz_regex.exec(result_dict.data_path);
      if (match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'horiz', zip, ractive);
        ractive.set("psipred_waiting_message", '');
        ractive.set("psipred_waiting_icon", '');
        ractive.set("psipred_time", '');
        downloads_info.psipred.horiz = '<a href="' + file_url + result_dict.data_path + '">Horiz Format Output</a><br />';
      }
      let ss2_match = ss2_regex.exec(result_dict.data_path);
      if (ss2_match) {
        downloads_info.psipred.ss2 = '<a href="' + file_url + result_dict.data_path + '">SS2 Format Output</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ss2', zip, ractive);
      }
    }
    //disopred files
    if (result_dict.name === 'diso_format') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'pbdat', zip, ractive);
      results_found.disopred = true;
      ractive.set("disopred_waiting_message", '');
      downloads_info.disopred.pbdat = '<a href="' + file_url + result_dict.data_path + '">PBDAT Format Output</a><br />';
      ractive.set("disopred_waiting_icon", '');
      ractive.set("disopred_time", '');
    }
    if (result_dict.name === 'diso_combine') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'comb', zip, ractive);
      downloads_info.disopred.comb = '<a href="' + file_url + result_dict.data_path + '">COMB NN Output</a><br />';
    }

    //memsat and mempack files
    if (result_dict.name === 'memsatsvm') {
      results_found.memsatsvm = true;
      ractive.set("memsatsvm_waiting_message", '');
      ractive.set("memsatsvm_waiting_icon", '');
      ractive.set("memsatsvm_time", '');
      let scheme_match = memsat_schematic_regex.exec(result_dict.data_path);
      if (scheme_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('memsatsvm_schematic', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.schematic = '<a href="' + file_url + result_dict.data_path + '">Schematic Diagram</a><br />';
      }
      let cartoon_match = memsat_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('memsatsvm_cartoon', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let memsat_match = memsat_data_regex.exec(result_dict.data_path);
      if (memsat_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'memsatdata', zip, ractive);
        downloads_info.memsatsvm.data = '<a href="' + file_url + result_dict.data_path + '">Memsat Output</a><br />';
      }
    }
    //mempack files
    if (result_dict.name === 'mempack_wrapper') {
      //results_found.mempack = true;
      ractive.set("mempack_waiting_message", '');
      ractive.set("mempack_waiting_icon", '');
      ractive.set("mempack_time", '');
      let cartoon_match = mempack_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        results_found.mempack = true;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('mempack_cartoon', '<img width="1000px" src="' + file_url + result_dict.data_path + '" />');
        downloads_info.mempack.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let graph_match = mempack_graph_out.exec(result_dict.data_path);
      if (graph_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.graph_out = '<a href="' + file_url + result_dict.data_path + '">Diagram Data</a><br />';
      }
      let contact_match = mempack_contact_res.exec(result_dict.data_path);
      if (contact_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.contact = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
      }
      let lipid_match = mempack_lipid_res.exec(result_dict.data_path);
      if (lipid_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.lipid_out = '<a href="' + file_url + result_dict.data_path + '">Lipid Exposure Preditions</a><br />';
      }
    }
    //genthreader and pgenthreader
    if (result_dict.name === 'sort_presult') {
      let key_fields = document.getElementsByClassName('modeller-key');
      for (let field of key_fields) {
        console.log("Hello");
        field.style.visibility = "visible";
      }
      results_found.pgenthreader = true;
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'gen_sort_presults') {
      let key_fields = document.getElementsByClassName('modeller-key');
      for (let field of key_fields) {
        console.log("Hello");
        field.style.visibility = "visible";
      }
      results_found.genthreader = true;
      ractive.set("genthreader_waiting_message", '');
      ractive.set("genthreader_waiting_icon", '');
      ractive.set("genthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'gen_presult', zip, ractive);
      downloads_info.genthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'dom_sort_presults') {
      let key_fields = document.getElementsByClassName('modeller-key');
      for (let field of key_fields) {
        console.log("Hello");
        field.style.visibility = "visible";
      }
      results_found.pdomthreader = true;
      ractive.set("pdomthreader_waiting_message", '');
      ractive.set("pdomthreader_waiting_icon", '');
      ractive.set("pdomthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'dom_presult', zip, ractive);
      downloads_info.pdomthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Table</a><br />';
    }

    if (result_dict.name === 'pseudo_bas_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Alignments</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_models') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Alignments</a><br />';
    }

    if (result_dict.name === 'genthreader_pseudo_bas_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.genthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Alignments</a><br />';
    }
    //pdomthreader
    // if(result_dict.name === 'svm_prob_dom')
    // {
    //   pdomthreader_result_found = true;
    //   ractive.set("pdomthreader_waiting_message", '');
    //   ractive.set("pdomthreader_waiting_icon", '');
    //   ractive.set("pdomthreader_time", '');
    //   process_file(file_url, result_dict.data_path, 'dom_presult', zip, ractive);
    //   downloads_info.pdomthreader.table = '<a href="'+file_url+result_dict.data_path+'">'+job_names.pdomthreader+' Table</a><br />';
    // }
    if (result_dict.name === 'pseudo_bas_dom_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pdomthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Alignments</a><br />';
    }
    //dompred files
    if (result_dict.name === 'parseds') {
      results_found.dompred = true;
      ractive.set("dompred_waiting_message", '');
      ractive.set("dompred_waiting_icon", '');
      ractive.set("dompred_time", '');
      let png_match = png_regex.exec(result_dict.data_path);
      if (png_match) {
        downloads_info.dompred.boundary_png = '<a href="' + file_url + result_dict.data_path + '">Boundary PNG</a><br />';
        ractive.set('parseds_png', '<img src="' + file_url + result_dict.data_path + '" />');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      } else {
        downloads_info.dompred.boundary = '<a href="' + file_url + result_dict.data_path + '">Boundary file</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'parseds', zip, ractive);
      }
    }
    if (result_dict.name === 'domssea') {
      let pred_match = domssea_pred_regex.exec(result_dict.data_path);
      if (pred_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.dompred.domsseapred = '<a href="' + file_url + result_dict.data_path + '">DOMSSEA predictions</a><br />';
      }
      let domssea_match = domssea_pred_regex.exec(result_dict.data_path);
      if (domssea_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.dompred.domssea = '<a href="' + file_url + result_dict.data_path + '">DOMSSEA file</a><br />';
      }
    }
    if (result_dict.name === 'runBioserf') {
      results_found.bioserf = true;
      ractive.set("bioserf_waiting_message", '');
      ractive.set("bioserf_waiting_icon", '');
      ractive.set("bioserf_time", '');
      downloads_info.bioserf.model = '<a href="' + file_url + result_dict.data_path + '">Final Homology Model</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      display_structure(file_url + result_dict.data_path, '#bioserf_model', true);
      ractive.set("bioserf_model", file_url + result_dict.data_path);
    }
    if (result_dict.name === 'hhblits_pdb70') {
      downloads_info.bioserf.hhblits = '<a href="' + file_url + result_dict.data_path + '">HHSearch Results</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'pgpblast_pdbaa') {
      downloads_info.bioserf.pdbaa = '<a href="' + file_url + result_dict.data_path + '">PDBaa Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'psiblast_cath') {
      downloads_info.domserf.cathblast = '<a href="' + file_url + result_dict.data_path + '">CATH Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'psiblast_pdbaa') {
      downloads_info.domserf.pdbblast = '<a href="' + file_url + result_dict.data_path + '">PDBaa Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'reformat_domserf_models' || result_dict.name === "parse_pdb_blast") {
      let domserf_match = domserf_regex.exec(result_dict.data_path);
      if (domserf_match) {
        ractive.set("domserf_waiting_message", '');
        ractive.set("domserf_waiting_icon", '');
        ractive.set("domserf_time", '');
        // TO DO ADD REGEX
        domain_count += 1;
        results_found.domserf = true;
        if (downloads_info.domserf.model) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
          downloads_info.domserf.model += '<a href="' + file_url + result_dict.data_path + '">Model ' + domserf_match[1] + '-' + domserf_match[2] + '</a><br />';
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
          downloads_info.domserf.model = '<a href="' + file_url + result_dict.data_path + '">Model ' + domserf_match[1] + '-' + domserf_match[2] + '</a><br />';
        }
        let buttons_tags = ractive.get("domserf_buttons");
        buttons_tags += '<button onClick="psipred.swapDomserf(' + domain_count + ')" type="button" class="btn btn-default">Domain ' + domserf_match[1] + '-' + domserf_match[2] + '</button>';
        ractive.set("domserf_buttons", buttons_tags);
        let paths = ractive.get("domserf_model_uris");
        paths.push(file_url + result_dict.data_path);
        ractive.set("domserf_model_uris", paths);
      }
    }

    if (result_dict.name === 'getSchematic') {
      results_found.ffpred = true;
      ractive.set("ffpred_waiting_message", '');
      ractive.set("ffpred_waiting_icon", '');
      ractive.set("ffpred_time", '');
      let sch_match = ffpred_sch_regex.exec(result_dict.data_path);
      if (sch_match) {
        downloads_info.ffpred.sch = '<a href="' + file_url + result_dict.data_path + '">Feature Schematic PNG</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('sch_schematic', '<b>Sequence Feature Map</b><br />Position dependent feature predictions are mapped onto the sequence schematic shown below. The line height of the Phosphorylation and Glycosylation features reflects the confidence of the residue prediction.<br /><img src="' + file_url + result_dict.data_path + '" />');
      }
      // let cartoon_match =  ffpred_svm_regex.exec(result_dict.data_path);
      // if(cartoon_match)
      // {
      //   console.log("HEY")
      //   downloads_info.ffpred.cartoon = '<a href="'+file_url+result_dict.data_path+'">Memsat PNG</a><br />';
      //   process_file(file_url, result_dict.data_path, 'zip', zip, ractive);
      //   ractive.set('ffpred_cartoon', '<b>Predicted Transmembrane Topology</b><br /><img src="'+file_url+result_dict.data_path+'" />');
      // }
    }

    if (result_dict.name === 'getTmImage') {
      // results_found.ffpred = true;
      // ractive.set("ffpred_waiting_message", '');
      // ractive.set("ffpred_waiting_icon", '');
      // ractive.set("ffpred_time", '');
      // let sch_match =  ffpred_sch_regex.exec(result_dict.data_path);
      // if(sch_match)
      // {
      //   downloads_info.ffpred.sch = '<a href="'+file_url+result_dict.data_path+'">Feature Schematic PNG</a><br />';
      //   process_file(file_url, result_dict.data_path, 'zip', zip, ractive);
      //   ractive.set('sch_schematic', '<b>Sequence Feature Map</b><br />Position dependent feature predictions are mapped onto the sequence schematic shown below. The line height of the Phosphorylation and Glycosylation features reflects the confidence of the residue prediction.<br /><img src="'+file_url+result_dict.data_path+'" />');
      // }
      let cartoon_match = ffpred_svm_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        console.log("HEY");
        downloads_info.ffpred.cartoon = '<a href="' + file_url + result_dict.data_path + '">Memsat PNG</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('ffpred_cartoon', '<b>Predicted Transmembrane Topology</b><br /><img src="' + file_url + result_dict.data_path + '" />');
      }
    }

    if (result_dict.name === 'features') {
      let feat_match = ffpred_featcfg_regex.exec(result_dict.data_path);
      if (feat_match) {
        downloads_info.ffpred.features = '<a href="' + file_url + result_dict.data_path + '">Sequence Feature Summary</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ffpredfeatures', zip, ractive);
      }
    }

    if (result_dict.name === 'ffpred_human' || result_dict.name === 'ffpred_fly') {
      let preds_match = ffpred_preds_regex.exec(result_dict.data_path);
      if (preds_match) {
        downloads_info.ffpred.preds = '<a href="' + file_url + result_dict.data_path + '">GO Predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ffpredpredictions', zip, ractive);
      }
    }

    if (result_dict.name === 'plot_self_contact_map') {
      results_found.metapsicov = true;
      ractive.set("metapsicov_waiting_message", '');
      ractive.set("metapsicov_waiting_icon", '');
      ractive.set("metapsicov_time", '');
      downloads_info.metapsicov.map = '<a href="' + file_url + result_dict.data_path + '">Contact Map</a><br />';
      ractive.set('metapsicov_map', '<b>Contact Map</b><br /><img height="800" width="800" src="' + file_url + result_dict.data_path + '">');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'contact_predictors') {
      // let metapsicov_ev_regex = /\.evfold/;
      // let metapsicov_psicov_regex = /\.psicov/;
      // let metapsicov_ccmpred_regex = /\.ccmpred/;
      let ev_match = metapsicov_ev_regex.exec(result_dict.data_path);
      if (ev_match) {
        downloads_info.metapsicov.freecontact = '<a href="' + file_url + result_dict.data_path + '">FreeContact predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
      let ps_match = metapsicov_psicov_regex.exec(result_dict.data_path);
      if (ps_match) {
        downloads_info.metapsicov.psicov = '<a href="' + file_url + result_dict.data_path + '">PSICOV predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
      let cc_match = metapsicov_ccmpred_regex.exec(result_dict.data_path);
      if (cc_match) {
        downloads_info.metapsicov.ccmpred = '<a href="' + file_url + result_dict.data_path + '">CCMPRED predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
    }
    if (result_dict.name === 'metapsicov_stage2') {
      downloads_info.metapsicov.preds = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }

    if (result_dict.name === 'metsite_checkchains') {
      metsite_checkchains_seen = true;
    }
    if (result_dict.name === 'metpred_wrapper') {
      let table_match = metsite_table_regex.exec(result_dict.data_path);
      let pdb_match = metsite_pdb_regex.exec(result_dict.data_path);
      results_found.metsite = true;
      ractive.set("metsite_waiting_message", '');
      ractive.set("metsite_waiting_icon", '');
      ractive.set("metsite_time", '');
      if (table_match) {
        downloads_info.metsite.table = '<a href="' + file_url + result_dict.data_path + '">Metsite Table</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'metsite', zip, ractive);
      }
      if (pdb_match) {
        downloads_info.metsite.pdb = '<a href="' + file_url + result_dict.data_path + '">Metsite PDB</a><br />';
        ractive.set('metsite_pdb', file_url + result_dict.data_path);
        display_structure(file_url + result_dict.data_path, '#metsite_model', false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
    }
    if (result_dict.name === 'hspred_checkchains') {
      hspred_checkchains_seen = true;
    }
    if (result_dict.name === 'hs_pred') {
      results_found.hspred = true;
      ractive.set("hspred_waiting_message", '');
      ractive.set("hspred_waiting_icon", '');
      ractive.set("hspred_time", '');
      downloads_info.hspred.table = '<a href="' + file_url + result_dict.data_path + '">HSPred Table</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'hspred', zip, ractive);
    }
    if (result_dict.name === 'split_pdb_files') {
      let initial_match = hspred_initial_regex.exec(result_dict.data_path);
      let second_match = hspred_second_regex.exec(result_dict.data_path);
      if (initial_match) {
        downloads_info.hspred.initial = '<a href="' + file_url + result_dict.data_path + '">Initial PDB</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('hspred_initial_pdb', file_url + result_dict.data_path);
        display_structure(file_url + result_dict.data_path, '#hspred_initial_model', false);
      }
      if (second_match) {
        downloads_info.hspred.second = '<a href="' + file_url + result_dict.data_path + '">Second PDB</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('hspred_second_pdb', file_url + result_dict.data_path);
        display_structure(file_url + result_dict.data_path, '#hspred_second_model', false);
      }
    }
    if (result_dict.name === 'check_pdb_tdb') {
      gentdb_checkchains_seen = true;
    }
    if (result_dict.name === 'maketdb') {
      results_found.gentdb = true;
      ractive.set("gentdb_waiting_message", '');
      ractive.set("gentdb_waiting_icon", '');
      ractive.set("gentdb_time", '');
      downloads_info.gentdb.tdb = '<a href="' + file_url + result_dict.data_path + '">TDB File</a>';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      ractive.set('tdb_file', '<h3><a href="' + file_url + result_dict.data_path + '">Click here to download your TDB File</a></h3>');
    }
    if (result_dict.name === 'memembed') {
      results_found.memembed = true;
      ractive.set("memembed_waiting_message", '');
      ractive.set("memembed_waiting_icon", '');
      ractive.set("memembed_time", '');
      downloads_info.memembed.pdb = '<a href="' + file_url + result_dict.data_path + '">Memembed PDB file</a>';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      display_structure(file_url + result_dict.data_path, '#memembed_model', false);
      ractive.set('memembed_pdb', file_url + result_dict.data_path);
    }
  }

  job_list.forEach(function (job_name) {
    if (!results_found[job_name]) {
      ractive.set(job_name + "_waiting_message", 'The job completed succesfully but no prediction was possible for the input data. No ' + job_names[job_name] + ' data generated for this job');
      ractive.set(job_name + "_waiting_icon", '');
      ractive.set(job_name + "_time", '');
    }
  });
  if (!results_found.mempack) {
    ractive.set('mempack_cartoon', '<h3>No packing prediction possible</h3>');
  }
  if (metsite_checkchains_seen && !results_found.metsite) {
    ractive.set("metsite_waiting_message", 'We could not find the PDB Chain ID provided');
  }
  if (hspred_checkchains_seen && !results_found.hspred) {
    ractive.set("hspred_waiting_message", 'We could not find the PDB Chain IDs provided');
  }
  if (gentdb_checkchains_seen && !results_found.gentdb) {
    ractive.set("gentdb_waiting_message", 'PDB provided did not contain a single chain labled as chain A');
  }

  if (results_found.domserf) {
    let paths = ractive.get("domserf_model_uris");
    display_structure(paths[0], '#domserf_model', true);
  }
}

function display_structure(uri, css_id, cartoon) {
  let mol_containers = document.getElementsByClassName('mol-container');
  for (let container of mol_containers) {
    container.style.height = "400px";
  }
  let cartoon_color = function (atom) {
    if (atom.ss === 'h') {
      return '#e353e3';
    }
    if (atom.ss === 's') {
      return '#e5dd55';
    }
    return 'grey';
  };
  let hotspot_color = function (atom) {
    if (atom.b == 1.0) {
      return 'red';
    }
    if (atom.b == 0.5) {
      return 'black';
    }
    if (atom.b == 50) {
      return 'white';
    }
    if (atom.b == 100) {
      return 'red';
    }
    return "blue";
  };
  console.log("LOADING: " + uri);
  let element = $(css_id);
  let config = { backgroundColor: '#ffffff' };
  let viewer = $3Dmol.createViewer(element, config);
  let data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["d" /* get_text */])(uri, "GET", {});
  viewer.addModel(data, "pdb"); /* load data */
  if (cartoon) {
    viewer.setStyle({}, { cartoon: { colorfunc: cartoon_color } }); /* style all atoms */
  } else {
    viewer.setStyle({}, { cartoon: { colorfunc: hotspot_color } }); /* style all atoms */
  }
  if (css_id.startsWith('#memembed')) {
    viewer.addSurface($3Dmol.SurfaceType.VDW, { 'opacity': 0.8, colorscheme: 'whiteCarbon' }, { hetflag: true }, {});
  }
  viewer.zoomTo(); /* set camera */
  viewer.render(); /* render scene */
  viewer.zoom(1.7, 3000);
}

function set_downloads_panel(ractive, downloads_info) {
  //console.log(downloads_info);
  let downloads_string = ractive.get('download_links');
  if ('psipred' in downloads_info) {
    if (downloads_info.psipred.horiz) {
      downloads_string = downloads_string.concat(downloads_info.psipred.header);
      downloads_string = downloads_string.concat(downloads_info.psipred.horiz);
      downloads_string = downloads_string.concat(downloads_info.psipred.ss2);
      downloads_string = downloads_string.concat("<br />");
    }
  }
  if ('dompred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.dompred.header);
    downloads_string = downloads_string.concat(downloads_info.dompred.boundary);
    downloads_string = downloads_string.concat(downloads_info.dompred.boundary_png);
    downloads_string = downloads_string.concat("<br />");
  }

  if ('disopred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.disopred.header);
    downloads_string = downloads_string.concat(downloads_info.disopred.pbdat);
    downloads_string = downloads_string.concat(downloads_info.disopred.comb);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('memsatsvm' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.header);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.data);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.schematic);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.cartoon);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('pgenthreader' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.header);
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.table);
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.align);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('genthreader' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.genthreader.header);
    downloads_string = downloads_string.concat(downloads_info.genthreader.table);
    downloads_string = downloads_string.concat(downloads_info.genthreader.align);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('pdomthreader' in downloads_info) {
    if (downloads_info.pdomthreader.table) {
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.header);
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.table);
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.align);
      downloads_string = downloads_string.concat("<br />");
    }
  }
  if ('mempack' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.mempack.header);
    if (downloads_info.mempack.cartoon) {
      downloads_string = downloads_string.concat(downloads_info.mempack.cartoon);
      downloads_string = downloads_string.concat(downloads_info.mempack.graph_out);
    }
    if (downloads_info.mempack.lipid_out) {
      downloads_string = downloads_string.concat(downloads_info.mempack.contact);
      downloads_string = downloads_string.concat(downloads_info.mempack.lipid_out);
    } else {
      downloads_string = downloads_string.concat("No packing prediction possible<br />");
    }
    downloads_string = downloads_string.concat("<br />");
  }
  if ('bioserf' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.bioserf.header);
    downloads_string = downloads_string.concat(downloads_info.bioserf.model);
    downloads_string = downloads_string.concat(downloads_info.bioserf.hhblits);
    downloads_string = downloads_string.concat(downloads_info.bioserf.pdbaa);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('domserf' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.domserf.header);
    downloads_string = downloads_string.concat(downloads_info.domserf.model);
    downloads_string = downloads_string.concat(downloads_info.domserf.cathblast);
    downloads_string = downloads_string.concat(downloads_info.domserf.pdbblast);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('ffpred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.ffpred.header);
    downloads_string = downloads_string.concat(downloads_info.ffpred.sch);
    downloads_string = downloads_string.concat(downloads_info.ffpred.cartoon);
    downloads_string = downloads_string.concat(downloads_info.ffpred.features);
    downloads_string = downloads_string.concat(downloads_info.ffpred.preds);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('metapsicov' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.metapsicov.header);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.preds);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.map);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.psicov);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.freecontact);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.ccmpred);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('metsite' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.metsite.header);
    downloads_string = downloads_string.concat(downloads_info.metsite.table);
    downloads_string = downloads_string.concat(downloads_info.metsite.pdb);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('hspred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.hspred.header);
    downloads_string = downloads_string.concat(downloads_info.hspred.table);
    downloads_string = downloads_string.concat(downloads_info.hspred.initial);
    downloads_string = downloads_string.concat(downloads_info.hspred.second);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('gentdb' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.gentdb.header);
    downloads_string = downloads_string.concat(downloads_info.gentdb.tdb);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('memembed' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.memembed.header);
    downloads_string = downloads_string.concat(downloads_info.memembed.pdb);
    downloads_string = downloads_string.concat("<br />");
  }

  ractive.set('download_links', downloads_string);
}

function set_advanced_params() {
  let options_data = {};
  try {
    options_data.psiblast_dompred_evalue = document.getElementById("dompred_e_value_cutoff").value;
  } catch (err) {
    options_data.psiblast_dompred_evalue = "0.01";
  }
  try {
    options_data.psiblast_dompred_iterations = document.getElementById("dompred_psiblast_iterations").value;
  } catch (err) {
    options_data.psiblast_dompred_iterations = 5;
  }

  try {
    options_data.bioserf_modeller_key = document.getElementById("bioserf_modeller_key").value;
  } catch (err) {
    options_data.bioserf_modeller_key = "";
  }
  try {
    options_data.domserf_modeller_key = document.getElementById("domserf_modeller_key").value;
  } catch (err) {
    options_data.domserf_modeller_key = "";
  }
  try {
    if (document.getElementById("ffpred_fly").checked) {
      options_data.ffpred_selection = "fly";
    } else {
      options_data.ffpred_selection = "human";
    }
  } catch (err) {
    options_data.ffpred_selection = "human";
  }
  try {
    options_data.metsite_checkchains_chain = document.getElementById("metsite_chain_id").value;
    options_data.extract_fasta_chain = document.getElementById("metsite_chain_id").value;
    options_data.seedSiteFind_chain = document.getElementById("metsite_chain_id").value;
    options_data.metpred_wrapper_chain = document.getElementById("metsite_chain_id").value;
  } catch (err) {
    options_data.metsite_checkchains_chain = "A";
    options_data.extract_fasta_chain = "A";
    options_data.seedSiteFind_chain = "A";
    options_data.metpred_wrapper_chain = "A";
  }
  try {
    options_data.seedSiteFind_metal = document.getElementById("metsite_metal_type").value;
    options_data.metpred_wrapper_metal = document.getElementById("metsite_metal_type").value;
  } catch (err) {
    options_data.seedSiteFind_metal = "Ca";
    options_data.metpred_wrapper_metal = "Ca";
  }
  try {
    options_data.metpred_wrapper_fpr = document.getElementById("metsite_fpr").value;
  } catch (err) {
    options_data.metpred_wrapper_fpr = "5";
  }

  try {
    options_data.hspred_checkchains_chains = document.getElementById("hspred_protein_1").value + document.getElementById("hspred_protein_2").value;
  } catch (err) {
    options_data.hspred_checkchains_chains = "AB";
  }
  try {
    options_data.hs_pred_first_chain = document.getElementById("hspred_protein_1").value;
    options_data.split_pdb_files_first_chain = document.getElementById("hspred_protein_1").value;
  } catch (err) {
    options_data.hs_pred_first_chain = "A";
    options_data.split_pdb_files_first_chain = "A";
  }
  try {
    options_data.hs_pred_second_chain = document.getElementById("hspred_protein_2").value;
    options_data.split_pdb_files_second_chain = document.getElementById("hspred_protein_2").value;
  } catch (err) {
    options_data.hs_pred_first_chain = "B";
    options_data.split_pdb_files_first_chain = "B";
  }

  try {
    options_data.memembed_algorithm = document.getElementById("memembed_algorithm").value;
    if (document.getElementById("memembed_barrel_yes").checked) {
      options_data.memembed_barrel = 'TRUE';
    } else {
      options_data.memembed_barrel = 'FALSE';
    }
    if (document.getElementById("memembed_terminal_in").checked) {
      options_data.memembed_termini = "in";
    } else {
      options_data.memembed_termini = "out";
    }
    //options_data. = document.getElementById("memembed_boundaries");
  } catch (err) {
    options_data.memembed_barrel = 'FALSE';
    options_data.memembed_termini = "in";
    options_data.memembed_algorithm = 0;
  }

  return options_data;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = send_request;
/* harmony export (immutable) */ __webpack_exports__["e"] = send_job;
/* harmony export (immutable) */ __webpack_exports__["b"] = get_previous_data;
/* harmony export (immutable) */ __webpack_exports__["d"] = get_text;
/* harmony export (immutable) */ __webpack_exports__["c"] = process_file;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__ = __webpack_require__(0);












//given a url, http request type and some form data make an http request
function send_request(url, type, send_data) {
  console.log('Sending URI request');
  console.log(url);
  console.log(type);
  var response = null;
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async: false,
    dataType: "json",
    //contentType: "application/json",
    url: url,
    success: function (data) {
      if (data === null) {
        alert("Failed to send data");
      }
      response = data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {
      alert("Sending Job to " + url + " Failed. " + error.responseText + ". The Backend processing service was unable to process your submission. Please contact psipred@cs.ucl.ac.uk");return null;
    } }).responseJSON;
  return response;
}

//given a job name prep all the form elements and send an http request to the
//backend
function send_job(ractive, job_name, seq, name, email, submit_url, times_url, job_names, options_data) {
  //alert(seq);
  console.log("Sending form data");
  var file = null;
  try {
    file = new Blob([seq]);
  } catch (e) {
    alert(e);
  }
  let fd = new FormData();
  console.log(job_name);
  fd.append("input_data", file, 'input.txt');
  fd.append("job", job_name);
  fd.append("submission_name", name);
  fd.append("email", email);
  if (job_name.includes('dompred')) {
    fd.append("psiblast_dompred_evalue", options_data.psiblast_dompred_evalue);
    fd.append("psiblast_dompred_iterations", options_data.psiblast_dompred_iterations);
  }
  if (job_name.includes('metsite')) {
    fd.append("metsite_checkchains_chain", options_data.metsite_checkchains_chain);
    fd.append("extract_fasta_chain", options_data.extract_fasta_chain);
    fd.append("seedSiteFind_metal", options_data.seedSiteFind_metal);
    fd.append("seedSiteFind_chain", options_data.seedSiteFind_chain);
    fd.append("metpred_wrapper_chain", options_data.metpred_wrapper_chain);
    fd.append("metpred_wrapper_metal", options_data.metpred_wrapper_metal);
    fd.append("metpred_wrapper_fpr", options_data.metpred_wrapper_fpr);
  }
  if (job_name.includes('hspred')) {
    fd.append("hspred_checkchains_chains", options_data.hspred_checkchains_chains);
    fd.append("hs_pred_first_chain", options_data.hs_pred_first_chain);
    fd.append("hs_pred_second_chain", options_data.hs_pred_second_chain);
    fd.append("split_pdb_files_first_chain", options_data.split_pdb_files_first_chain);
    fd.append("split_pdb_files_second_chain", options_data.split_pdb_files_second_chain);
  }
  if (job_name.includes('memembed')) {
    fd.append("memembed_algorithm", options_data.memembed_algorithm);
    fd.append("memembed_barrel", options_data.memembed_barrel);
    fd.append("memembed_termini", options_data.memembed_termini);
  }
  if (job_name.includes('ffpred')) {
    fd.append("ffpred_selection", options_data.ffpred_selection);
    console.log("hey");
  }
  console.log(options_data);
  let response_data = send_request(submit_url, "POST", fd);
  if (response_data !== null) {
    let times = send_request(times_url, 'GET', {});
    //alert(JSON.stringify(times));
    if (job_name in times) {
      ractive.set('loading_message', null);
      ractive.set(job_name + '_time', job_names[job_name] + ": " + times[job_name] + " seconds");
    } else {
      ractive.set('loading_message', null);
      ractive.set(job_name + '_time', "Unable to retrieve average time for " + job_names[job_name] + " jobs.");
    }
    for (var k in response_data) {
      if (k == "UUID") {
        ractive.set('batch_uuid', response_data[k]);
        if (['metiste', 'hspred', 'gentdb', 'memembed'].includes(job_name)) {
          ractive.fire('poll_trigger', false);
        } else {
          ractive.fire('poll_trigger', true);
        }
      }
    }
  } else {
    return null;
  }
  return true;
}

//utility function that gets the sequence from a previous submission is the
//page was loaded with a UUID
function get_previous_data(uuid, submit_url, file_url, ractive) {
  console.log('Requesting details given URI');
  let url = submit_url + ractive.get('batch_uuid');
  //alert(url);
  let submission_response = send_request(url, "GET", {});
  if (!submission_response) {
    alert("NO SUBMISSION DATA");
  }
  let seq = get_text(file_url + submission_response.submissions[0].input_file, "GET", {});
  let jobs = '';
  submission_response.submissions.forEach(function (submission) {
    jobs += submission.job_name + ",";
  });
  jobs = jobs.slice(0, -1);
  return { 'seq': seq, 'email': submission_response.submissions[0].email, 'name': submission_response.submissions[0].submission_name, 'jobs': jobs };
}

//get text contents from a result URI
function get_text(url, type, send_data) {

  let response = null;
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async: false,
    //dataType: "txt",
    //contentType: "application/json",
    url: url,
    success: function (data) {
      if (data === null) {
        alert("Failed to request input data text");
      }
      response = data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {
      alert("Gettings results text failed. The Backend processing service is not available. Please contact psipred@cs.ucl.ac.uk");
    }
  });
  return response;
}

//polls the backend to get results and then parses those results to display
//them on the page
function process_file(url_stub, path, ctl, zip, ractive) {
  let url = url_stub + path;
  let path_bits = path.split("/");
  //get a results file and push the data in to the bio3d object
  //alert(url);
  console.log('Getting Results File and processing');
  let response = null;
  $.ajax({
    type: 'GET',
    async: true,
    url: url,
    success: function (file) {
      zip.folder(path_bits[1]).file(path_bits[2], file);
      if (ctl === 'horiz') {
        ractive.set('psipred_horiz', file);
        let count = (file.match(/Conf/g) || []).length;
        //console.log(count);
        let panel_height = 6 * 30 * (count + 1) + 120;
        //console.log(panel_height);
        //if(panel_height < 450){panel_height = 450;}
        // console.log(panel_height);
        biod3.psipred(file, 'psipredChart', { debug: true, parent: 'div.psipred_cartoon', margin_scaler: 2, width: 900, container_width: 900, height: panel_height, container_height: panel_height });
      }
      if (ctl === 'ss2') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["a" /* parse_ss2 */])(ractive, file);
      }
      if (ctl === 'pbdat') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["b" /* parse_pbdat */])(ractive, file);
        //alert('PBDAT process');
      }
      if (ctl === 'comb') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["c" /* parse_comb */])(ractive, file);
      }
      if (ctl === 'memsatdata') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["d" /* parse_memsatdata */])(ractive, file);
      }
      if (ctl === 'presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'pgen');
      }
      if (ctl === 'gen_presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'gen');
      }
      if (ctl === 'dom_presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'dgen');
      }
      if (ctl === 'parseds') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["f" /* parse_parseds */])(ractive, file);
      }
      if (ctl === 'ffpredfeatures') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["g" /* parse_featcfg */])(ractive, file);
      }
      if (ctl === 'ffpredpredictions') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["h" /* parse_ffpreds */])(ractive, file);
      }
      if (ctl === 'metsite') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["i" /* parse_metsite */])(ractive, file);
      }
      if (ctl === 'hspred') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["j" /* parse_hspred */])(ractive, file);
      }
    },
    error: function (error) {
      alert(JSON.stringify(error));
    }
  });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isInArray;
/* harmony export (immutable) */ __webpack_exports__["b"] = draw_empty_annotation_panel;
/* harmony export (immutable) */ __webpack_exports__["a"] = getUrlVars;
//given and array return whether and element is present
function isInArray(value, array) {
  if (array.indexOf(value) > -1) {
    return true;
  } else {
    return false;
  }
}

//when a results page is instantiated and before some annotations have come back
//we draw and empty annotation panel
function draw_empty_annotation_panel(ractive) {

  let seq = ractive.get('sequence');
  let residues = seq.split('');
  let annotations = [];
  residues.forEach(function (res) {
    annotations.push({ 'res': res });
  });
  ractive.set('annotations', annotations);
  // console.log(Math.ceil(residues.length/50));
  let panel_height = (Math.ceil(annotations.length / 50) + 2) * 20 + 8 * 20;
  if (panel_height < 300) {
    panel_height = 300;
  }
  //console.log("INITIAL HEIGHT: "+panel_height);
  biod3.annotationGrid(ractive.get('annotations'), { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: panel_height, container_height: panel_height });
}

//given a URL return the attached variables
function getUrlVars() {
  let vars = {};
  //consider using location.search instead here
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

/*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function (document, documentElement) {
  // Enable strict mode
  "use strict";

  // Form the style on the fly to result in smaller minified file

  let important = "!important;";
  let style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;

  window.getEmPixels = function (element) {

    let extraBody;

    if (!element) {
      // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
      element = extraBody = document.createElement("body");
      extraBody.style.cssText = "font-size:1em" + important;
      documentElement.insertBefore(extraBody, document.body);
    }

    // Create and style a test element
    let testElement = document.createElement("i");
    testElement.style.cssText = style;
    element.appendChild(testElement);

    // Get the client width of the test element
    let value = testElement.clientWidth;

    if (extraBody) {
      // Remove the extra body element
      documentElement.removeChild(extraBody);
    } else {
      // Remove the test element
      element.removeChild(testElement);
    }

    // Return the em value in pixels
    return value;
  };
})(document, document.documentElement);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["loadNewAlignment"] = loadNewAlignment;
/* harmony export (immutable) */ __webpack_exports__["buildModel"] = buildModel;
/* harmony export (immutable) */ __webpack_exports__["swapDomserf"] = swapDomserf;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__ = __webpack_require__(1);
/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/













var clipboard = new Clipboard('.copyButton');
var zip = new JSZip();

clipboard.on('success', function (e) {
  console.log(e);
});
clipboard.on('error', function (e) {
  console.log(e);
});

// SET ENDPOINTS FOR DEV, STAGING OR PROD
let endpoints_url = null;
let submit_url = null;
let times_url = null;
let gears_svg = "http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg";
let main_url = "http://bioinf.cs.ucl.ac.uk";
let app_path = "/psipred_beta";
let file_url = '';
let gear_string = '<object width="140" height="140" type="image/svg+xml" data="' + gears_svg + '"></object>';
let job_list = ["psipred", "pgenthreader", "metapsicov", "disopred", "mempack", "memsatsvm", "genthreader", "dompred", "pdomthreader", "bioserf", "domserf", "ffpred", "metsite", "hspred", "memembed", "gentdb"];
let seq_job_list = ["psipred", "pgenthreader", "metapsicov", "disopred", "mempack", "memsatsvm", "genthreader", "dompred", "pdomthreader", "bioserf", "domserf", "ffpred"];
let struct_job_list = ["metsite", "hspred", "memembed", "gentdb"];
let job_names = {
  'psipred': 'PSIPRED V4.0',
  'disopred': 'DIOSPRED 3',
  'memsatsvm': 'MEMSAT-SVM',
  'pgenthreader': 'pGenTHREADER',
  'mempack': 'MEMPACK',
  'genthreader': 'GenTHREADER',
  'dompred': 'DomPred',
  'pdomthreader': 'pDomTHREADER',
  'bioserf': 'BiosSerf v2.0',
  'domserf': 'DomSerf v2.1',
  'ffpred': 'FFPred 3',
  'metapsicov': 'MetaPSICOV',
  'metsite': 'MetSite',
  'hspred': 'HSPred',
  'memembed': 'MEMEMBED',
  'gentdb': 'Generate TDB'
};

if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
  endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/';
  submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/';
  times_url = 'http://127.0.0.1:8000/analytics_automated/jobtimes/';
  app_path = '/interface';
  main_url = 'http://127.0.0.1:8000';
  gears_svg = "../static/images/gears.svg";
  file_url = main_url;
} else if (location.hostname === "bioinfstage1.cs.ucl.ac.uk" || location.hostname === "bioinf.cs.ucl.ac.uk" || location.href === "http://bioinf.cs.ucl.ac.uk/psipred_beta/") {
  endpoints_url = main_url + app_path + '/api/endpoints/';
  submit_url = main_url + app_path + '/api/submission/';
  times_url = main_url + app_path + '/api/jobtimes/';
  file_url = main_url + app_path + "/api";
  //gears_svg = "../static/images/gears.svg";
} else {
  alert('UNSETTING ENDPOINTS WARNING, WARNING!');
  endpoints_url = '';
  submit_url = '';
  times_url = '';
}

let initialisation_data = {
  sequence_form_visible: 1,
  structure_form_visible: 0,
  results_visible: 1,
  resubmission_visible: 0,
  results_panel_visible: 1,
  submission_widget_visible: 0,
  time_visible: 1,
  bioserf_advanced: 0,
  domserf_advanced: 0,
  dompred_advanced: 0,
  ffpred_advanced: 0,
  metsite_advanced: 0,
  hspred_advanced: 0,
  memembad_advanced: 0,
  modeller_key: null,
  download_links: '',
  error_message: '',
  loading_message: 'Loading Data',

  psipred_horiz: null,
  diso_precision: null,
  memsatsvm_schematic: '',
  memsatsvm_cartoon: '',
  pgen_table: null,
  pgen_ann_set: {},
  memsatpack_schematic: '',
  memsatpack_cartoon: '',
  gen_table: null,
  gen_ann_set: {},
  parseds_info: null,
  parseds_png: null,
  dgen_table: null,
  dgen_ann_set: {},
  bioserf_model: null,
  domserf_buttons: '',
  domserf_model_uris: [],
  ffpred_cartoon: null,
  sch_schematic: null,
  aa_composition: null,
  global_features: null,
  function_tables: null,
  metapsicov_map: null,
  metsite_table: null,
  metsite_pdb: null,
  hspred_table: null,
  hspred_initial_pdb: null,
  hspred_second_pdb: null,
  tdb_file: null,
  memembed_pdb: null,

  metapsicov_data: null,
  metsite_data: null,
  hspred_data: null,
  memembed_data: null,
  gentdb_data: null,

  // Sequence and job info
  sequence: '',
  sequence_length: 1,
  subsequence_start: 1,
  subsequence_stop: 1,
  email: '',
  name: '',
  batch_uuid: null,
  //hold annotations that are read from datafiles
  annotations: null
};
job_list.forEach(function (job_name) {
  initialisation_data[job_name + '_checked'] = false;
  initialisation_data[job_name + '_job'] = job_name + '_job';
  initialisation_data[job_name + '_waiting_message'] = '<h2>Please wait for your ' + job_names[job_name] + ' job to process</h2>';
  initialisation_data[job_name + '_waiting_icon'] = gear_string;
  initialisation_data[job_name + '_time'] = '';
});
initialisation_data.psipred_checked = true;
// initialisation_data.memembed_advanced = 1;
// initialisation_data.sequence_form_visible = 0;
// initialisation_data.structure_form_visible = 1;
// DECLARE VARIABLES and init ractive instance
var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: initialisation_data
});

//set some things on the page for the development server
if (location.hostname === "127.0.0.1") {
  ractive.set('email', 'daniel.buchan@ucl.ac.uk');
  ractive.set('name', 'test');
  ractive.set('sequence', 'QWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEAS');
}

//4b6ad792-ed1f-11e5-8986-989096c13ee6
let uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let uuid_match = uuid_regex.exec(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid);

///////////////////////////////////////////////////////////////////////////////
//
//
// APPLICATION HERE
//
//
///////////////////////////////////////////////////////////////////////////////

//Here were keep an eye on some form elements and rewrite the name if people
//have provided a fasta formatted seq
let seq_observer = ractive.observe('sequence', function (newValue, oldValue) {
  let regex = /^>(.+?)\s/;
  let match = regex.exec(newValue);
  if (match) {
    this.set('name', match[1]);
  }
  // else {
  //   this.set('name', null);
  // }
}, { init: false,
  defer: true
});

//theses two observers stop people setting the resubmission widget out of bounds
ractive.observe('subsequence_stop', function (value) {
  let seq_length = ractive.get('sequence_length');
  let seq_start = ractive.get('subsequence_start');
  if (value > seq_length) {
    ractive.set('subsequence_stop', seq_length);
  }
  if (value <= seq_start) {
    ractive.set('subsequence_stop', seq_start + 1);
  }
});
ractive.observe('subsequence_start', function (value) {
  let seq_stop = ractive.get('subsequence_stop');
  if (value < 1) {
    ractive.set('subsequence_start', 1);
  }
  if (value >= seq_stop) {
    ractive.set('subsequence_start', seq_stop - 1);
  }
});

//After a job has been sent or a URL accepted this ractive block is called to
//poll the backend to get the results
ractive.on('poll_trigger', function (name, seq_type) {
  console.log("Polling backend for results");
  let url = submit_url + ractive.get('batch_uuid');
  history.pushState(null, '', app_path + '/&uuid=' + ractive.get('batch_uuid'));
  if (seq_type) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
  }
  let interval = setInterval(function () {
    let batch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["a" /* send_request */])(url, "GET", {});
    let downloads_info = {};

    if (batch.state === 'Complete') {
      console.log("Render results");
      let submissions = batch.submissions;
      submissions.forEach(function (data) {
        // console.log(data);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["a" /* prepare_downloads_html */])(data, downloads_info, job_list, job_names);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info, job_names, job_list);
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["c" /* set_downloads_panel */])(ractive, downloads_info);
      $('.processing').remove();
      ractive.set('time_visible', 0);
      ractive.set('loading_message', null);

      clearInterval(interval);
    }
    if (batch.state === 'Error' || batch.state === 'Crash') {
      job_list.forEach(function (job_name) {
        ractive.set(job_name + '_waiting_message', null);
        ractive.set(job_name + '_waiting_icon', null);
        ractive.set(job_name + '_waiting_time', null);
      });
      let submission_message = batch.submissions[0].last_message;
      let error_text = "<h3>POLLING ERROR: Job Failed</h3>" + "<h4>Please Contact psipred@cs.ucl.ac.uk quoting the error message and job ID:" + ractive.get('batch_uuid') + "</h4>" + "<h5>Error Message:<br />" + submission_message + "</h5>";
      ractive.set('error_message', error_text);
      $('.processing').remove();
      ractive.set('time_visible', 0);
      ractive.set('loading_message', null);
      clearInterval(interval);
    }
  }, 5000);
}, { init: false,
  defer: true
});

// On clicking the Get Zip file link this watchers prepares the zip and hands it to the user
ractive.on('get_zip', function (context) {
  let uuid = ractive.get('batch_uuid');
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, uuid + ".zip");
  });
});

ractive.on('show_bioserf', function (event) {
  let adv = ractive.get('bioserf_advanced');
  if (adv) {
    ractive.set('bioserf_advanced', 0);
  } else {
    ractive.set('bioserf_advanced', 1);
  }
});
ractive.on('show_domserf', function (event) {
  let adv = ractive.get('domserf_advanced');
  if (adv) {
    ractive.set('domserf_advanced', 0);
  } else {
    ractive.set('domserf_advanced', 1);
  }
});
ractive.on('show_dompred', function (event) {
  let adv = ractive.get('dompred_advanced');
  if (adv) {
    ractive.set('dompred_advanced', 0);
  } else {
    ractive.set('dompred_advanced', 1);
  }
});
ractive.on('show_ffpred', function (event) {
  let adv = ractive.get('ffpred_advanced');
  if (adv) {
    ractive.set('ffpred_advanced', 0);
  } else {
    ractive.set('ffpred_advanced', 1);
  }
});
ractive.on('show_metsite', function (event) {
  let adv = ractive.get('metsite_advanced');
  if (adv) {
    ractive.set('metsite_advanced', 0);
  } else {
    ractive.set('metsite_advanced', 1);
  }
});
ractive.on('show_hspred', function (event) {
  let adv = ractive.get('hspred_advanced');
  if (adv) {
    ractive.set('hspred_advanced', 0);
  } else {
    ractive.set('hspred_advanced', 1);
  }
});
ractive.on('show_memembed', function (event) {
  let adv = ractive.get('memembed_advanced');
  if (adv) {
    ractive.set('memembed_advanced', 0);
  } else {
    ractive.set('memembed_advanced', 1);
  }
});
// These react to the headers being clicked to toggle the panel
//
ractive.on('sequence_active', function (event) {
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 0);
  ractive.set('memembed_advanced', 0);
  ractive.set('hspred_advanced', 0);
  ractive.set('metsite_advanced', 0);
  ractive.set('ffpred_advanced', 0);
  ractive.set('dompred_advanced', 0);
  ractive.set('domserf_advanced', 0);
  ractive.set('bioserf_advanced', 0);
  job_list.forEach(function (job_name) {
    let setting = false;
    if (job_name === 'psipred') {
      setting = true;
    }
    ractive.set(job_name + '_checked', setting);
  });
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 1);
});

ractive.on('structure_active', function (event) {
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 0);
  ractive.set('memembed_advanced', 0);
  ractive.set('hspred_advanced', 0);
  ractive.set('metsite_advanced', 0);
  ractive.set('ffpred_advanced', 0);
  ractive.set('dompred_advanced', 0);
  ractive.set('domserf_advanced', 0);
  ractive.set('bioserf_advanced', 0);
  job_list.forEach(function (job_name) {
    ractive.set(job_name + '_checked', false);
  });
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 1);
});

ractive.on('downloads_active', function (event) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* show_panel */])(1, ractive);
});

//register listeners for each results panel
job_list.forEach(function (job_name, i) {
  console.log("adding jobs watchers");
  ractive.on(job_name + '_active', function (event) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* show_panel */])(i + 2, ractive);
    if (job_name === "psipred") {
      if (ractive.get('psipred_horiz')) {
        biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
      }
    }
    if (job_name === "disopred") {
      if (ractive.get('diso_precision')) {
        biod3.genericxyLineChart(ractive.get('diso_precision'), 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
      }
    }
    if (job_name === 'bioserf') {
      if (ractive.get('bioserf_model')) {
        if (ractive.get('bioserf_model').length) {
          let bioserf_model = ractive.get('bioserf_model');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(bioserf_model, '#bioserf_model', true);
        }
      }
    }
    if (job_name === 'domserf') {
      if (ractive.get('domserf_model_uris')) {
        if (ractive.get('domserf_model_uris').length) {
          let paths = ractive.get('domserf_model_uris');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[0], '#domserf_model', true);
        }
      }
    }
    if (job_name === 'metsite') {
      if (ractive.get('metsite_pdb')) {
        if (ractive.get('metsite_pdb').length) {
          let met_pdb = ractive.get('metsite_pdb');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(met_pdb, '#metsite_model', false);
        }
      }
    }
    if (job_name === 'hspred') {
      if (ractive.get('hspred_initial_pdb')) {
        if (ractive.get('hspred_initial_pdb').length) {
          let initial_pdb = ractive.get('hspred_initial_pdb');
          let second_pdb = ractive.get('hspred_second_pdb');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(initial_pdb, '#hspred_initial_model', false);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(second_pdb, '#hspred_second_model', false);
        }
      }
    }
    if (job_name === 'memembed') {
      if (ractive.get('memembed_pdb').length) {
        let memembed_pdb = ractive.get('memembed_pdb');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(memembed_pdb, '#memembed_model', false);
      }
    }
    if (job_name === 'pgenthreader' || job_name === 'genthreader' || job_name === 'pdomthreader') {
      let key_fields = document.getElementsByClassName('modeller-key');
      for (let field of key_fields) {
        // console.log("Hello");
        field.style.visibility = "visible";
      }
    }
  });
});

ractive.on('submission_active', function (event) {
  console.log("SUBMISSION ACTIVE");
  let state = ractive.get('submission_widget_visible');

  if (state === 1) {
    ractive.set('submission_widget_visible', 0);
  } else {
    ractive.set('submission_widget_visible', 1);
  }
});

//grab the submit event from the main form and send the sequence to the backend
ractive.on('submit', function (event) {
  let submit_job = false;
  console.log('Submitting data');
  let seq = this.get('sequence');
  let seq_count = seq.split(">").length;
  seq = seq.replace(/^>.+$/mg, "").toUpperCase();
  seq = seq.replace(/\n|\s/g, "");
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.set('sequence', seq);

  let name = this.get('name');
  let email = this.get('email');
  let check_states = {};
  let struct_type = false;
  let seq_type = false;
  job_list.forEach(function (job_name) {
    check_states[job_name + '_job'] = ractive.get(job_name + '_job');
    check_states[job_name + '_checked'] = ractive.get(job_name + '_checked');
    if (check_states[job_name + '_checked'] && struct_job_list.includes(job_name)) {
      struct_type = true;
    }
    if (check_states[job_name + '_checked'] && seq_job_list.includes(job_name)) {
      seq_type = true;
    }
  });

  let options_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* set_advanced_params */])();
  //HANDLE FFPRED JOB SELECTION.
  if (check_states.bioserf_checked || check_states.domserf_checked) {
    let bios_modeller_test = test_modeller_key(options_data.bioserf_modeller_key);
    let doms_modeller_test = test_modeller_key(options_data.domserf_modeller_key);
    if (bios_modeller_test || doms_modeller_test) {
      submit_job = true;
    } else {
      alert("You have not provided a valid MODELLER key. Contact the Sali lab for a MODELLER licence.");
    }
  } else {
    submit_job = true;
  }
  if (seq_type && struct_type) {
    alert("You can not submit both sequence and structure analysis jobs");
    submit_job = false;
  }
  if (seq_count > 1) {
    alert("MSA Input forbidden");
    submit_job = false;
  }
  if (submit_job) {
    console.log("Submitting");
    if (seq_type) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type);
    }
    if (struct_type) {
      let pdbFile = null;
      let pdbData = '';
      try {
        pdbFile = document.getElementById("pdbFile");
        let file = pdbFile.files[0];
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function (e) {
          pdbData = fr.result;
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, pdbData, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type);
        };
      } catch (err) {
        pdbData = "";
        if (err.message.includes("FileReader.readAsText is not an object")) {
          alert("You have not selected a PDB file");
        }
        console.log(err);
      }
    }
  }
  event.original.preventDefault();
});

// grab the submit event from the Resubmission widget, truncate the sequence
// and send a new job
ractive.on('resubmit', function (event) {
  console.log('Resubmitting segment');
  history.pushState(null, '', app_path + "/");
  let start = ractive.get("subsequence_start");
  let stop = ractive.get("subsequence_stop");
  let sequence = ractive.get("sequence");
  let subsequence = sequence.substring(start - 1, stop);
  let name = this.get('name') + "_seg";
  let email = this.get('email');
  ractive.set('sequence_length', subsequence.length);
  ractive.set('subsequence_stop', subsequence.length);
  ractive.set('sequence', subsequence);
  ractive.set('name', name);
  let check_states = {};
  job_list.forEach(function (job_name) {
    check_states[job_name + '_job'] = ractive.get(job_name + '_job');
    check_states[job_name + '_checked'] = ractive.get(job_name + '_checked');
  });
  //clear what we have previously written
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["g" /* clear_settings */])(ractive, gear_string, job_list, job_names, zip);
  //verify form contents and post
  //add form defaults but null the structes ones as we don't allow structure job resubmission
  let options_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* set_advanced_params */])();
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, true, false);
  //write new annotation diagram
  //submit subsection
  event.original.preventDefault();
});

function test_modeller_key(input) {
  if (input === 'MODELIRANJE') {
    return true;
  }
  return false;
}

// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, If the page is loaded with a UUID rather than a
// form submit.
//TODO: Handle loading that page with use the MEMSAT and DISOPRED UUID
//
if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid && uuid_match) {
  console.log('Caught an incoming UUID');
  seq_observer.cancel();
  ractive.set('results_visible', null); // should make a generic one visible until results arrive.
  ractive.set("batch_uuid", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid);
  let previous_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["b" /* get_previous_data */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid, submit_url, file_url, ractive);
  let seq_type = true;
  // console.log(previous_data.jobs);
  if (previous_data.jobs.includes('psipred')) {
    ractive.set('results_panel_visible', 2);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('pgenthreader')) {
    ractive.set('results_panel_visible', 3);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('metapsicov')) {
    ractive.set('results_panel_visible', 4);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('disopred')) {
    ractive.set('results_panel_visible', 5);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('mempack')) {
    ractive.set('results_panel_visible', 6);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('memsatsvm')) {
    ractive.set('results_panel_visible', 7);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('genthreader') && !previous_data.jobs.includes('pgenthreader')) {
    ractive.set('results_panel_visible', 8);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('dompred')) {
    ractive.set('results_panel_visible', 9);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('pdomthreader')) {
    ractive.set('results_panel_visible', 10);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('bioserf')) {
    ractive.set('results_panel_visible', 11);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('domserf')) {
    ractive.set('results_panel_visible', 12);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('ffpred')) {
    ractive.set('results_panel_visible', 13);
    ractive.set('results_visible', 2);
  }
  if (previous_data.jobs.includes('metsite')) {
    ractive.set('results_panel_visible', 14);
    ractive.set('results_visible', 3);
    seq_type = false;
  }
  if (previous_data.jobs.includes('hspred')) {
    ractive.set('results_panel_visible', 15);
    ractive.set('results_visible', 3);
    seq_type = false;
  }
  if (previous_data.jobs.includes('memembed')) {
    ractive.set('results_panel_visible', 16);
    ractive.set('results_visible', 3);
    seq_type = false;
  }
  if (previous_data.jobs.includes('gentdb')) {
    ractive.set('results_panel_visible', 17);
    ractive.set('results_visible', 3);
    seq_type = false;
  }
  ractive.set('sequence', previous_data.seq);
  ractive.set('email', previous_data.email);
  ractive.set('name', previous_data.name);
  let seq = ractive.get('sequence');
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  if (seq_type) {
    ractive.set('resubmission_visible', 1);
  }
  ractive.fire('poll_trigger', seq_type);
}

///////////////////////////////////////////////////////////////////////////////
//
// New Pannel functions
//
///////////////////////////////////////////////////////////////////////////////


//Reload alignments for JalView for the genTHREADER table
function loadNewAlignment(alnURI, annURI, title) {
  let url = submit_url + ractive.get('batch_uuid');
  window.open(".." + app_path + "/msa/?ann=" + file_url + annURI + "&aln=" + file_url + alnURI, "", "width=800,height=400");
}

//Reload alignments for JalView for the genTHREADER table
function buildModel(alnURI, type) {

  let url = submit_url + ractive.get('batch_uuid');
  let mod_key = ractive.get('modeller_key');
  if (mod_key === 'M' + 'O' + 'D' + 'E' + 'L' + 'I' + 'R' + 'A' + 'N' + 'J' + 'E') {
    //alert(type);
    window.open(".." + app_path + "/model/post?type=" + type + "&aln=" + file_url + alnURI, "", "width=670,height=700");
  } else {
    alert('Please provide a valid M' + 'O' + 'D' + 'E' + 'L' + 'L' + 'E' + 'R Licence Key');
  }
}

// Swaps out the domserf model when those buttons are clicked
function swapDomserf(uri_number) {
  uri_number = uri_number - 1;
  let paths = ractive.get("domserf_model_uris");
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[uri_number], '#domserf_model', true);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verify_and_send_form;
/* unused harmony export verify_struct_form */
/* unused harmony export verify_seq_form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_index_js__ = __webpack_require__(3);




//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(ractive, data, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type) {
  /*verify that everything here is ok*/
  let error_message = null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);

  let check_list = [];
  job_list.forEach(function (job_name) {
    check_list.push(check_states[job_name + '_checked']);
  });

  error_message = "ARG";
  if (seq_type) {
    error_message = verify_seq_form(data, name, email, check_list);
  }
  if (struct_type) {
    error_message = verify_struct_form(data, name, email, check_list);
  }
  if (error_message.length > 0) {
    ractive.set('form_error', error_message);
    alert("FORM ERROR:" + error_message);
  } else {
    //initialise the page
    let response = true;
    ractive.set('results_visible', null);
    //Post the jobs and intialise the annotations for each job
    //We also don't redundantly send extra psipred etc.. jobs
    //byt doing these test in a specific order
    job_list.forEach(function (job_name) {
      if (check_states[job_name + '_checked'] === true) {
        job_string = job_string.concat(job_name + ",");
        if (job_name === 'pgenthreader' || job_name === 'disopred' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'bioserf' || job_name === 'domserf' || job_name === 'metapsicov') {
          check_states.psipred_checked = false;
        }
        if (job_name === 'bioserf') {
          check_states.pgenthreader_checked = false;
        }
        if (job_name === 'domserf') {
          check_states.pdomthreader_checked = false;
        }
      }
    });
    job_string = job_string.slice(0, -1);
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["e" /* send_job */])(ractive, job_string, data, name, email, submit_url, times_url, job_names, options_data);
    //set visibility and render panel once
    for (let i = 0; i < job_list.length; i++) {
      let job_name = job_list[i];
      if (check_states[job_name + '_checked'] === true && response) {
        if (["metsite", "hspred", "memembed", "gentdb"].includes(job_name)) {
          ractive.set('results_visible', 3);
        } else {
          ractive.set('results_visible', 2);
        }
        ractive.fire(job_name + '_active');
        if (seq_type) {
          ractive.set('resubmission_visible', 1);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
        }
        break;
      }
    }

    if (!response) {
      window.location.href = window.location.href;
    }
  }
}

function verify_struct_form(struct, job_name, email, checked_array) {
  let error_message = "";
  if (!/^[\x00-\x7F]+$/.test(job_name)) {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />";
  }
  // TODO: one day we should let these services take xml pdb files
  // if(! /^HEADER|^ATOM\s+\d+/i.test(struct)){
  if (!/ATOM\s+\d+/i.test(struct)) {
    error_message = error_message + "Your file does not look like a plain text ascii pdb file. This service does not accept .gz or xml format pdb files";
  }
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["c" /* isInArray */])(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program";
  }
  return error_message;
}

//Takes the form elements and checks they are valid
function verify_seq_form(seq, job_name, email, checked_array) {
  let error_message = "";
  if (!/^[\x00-\x7F]+$/.test(job_name)) {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />";
  }

  /* length checks */
  if (seq.length > 1500) {
    error_message = error_message + "Your sequence is too long to process<br />";
  }
  if (seq.length < 30) {
    error_message = error_message + "Your sequence is too short to process<br />";
  }

  /* nucleotide checks */
  let nucleotide_count = (seq.match(/A|T|C|G|U|N|a|t|c|g|u|n/g) || []).length;
  if (nucleotide_count / seq.length > 0.95) {
    error_message = error_message + "Your sequence appears to be nucleotide sequence. This service requires protein sequence as input<br />";
  }
  if (/[^ACDEFGHIKLMNPQRSTVWYX_-]+/i.test(seq)) {
    error_message = error_message + "Your sequence contains invalid characters<br />";
  }

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["c" /* isInArray */])(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program";
  }

  return error_message;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQ2NGViOWU4OWM1MzYxNTY3ZmQiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCIkIiwiRGF0YVRhYmxlIiwicGFyc2VfbWV0c2l0ZSIsIm1ldHNpdGVfdGFibGUiLCJoaXRfcmVnZXgiLCJoaXRfbWF0Y2hlcyIsIm1hdGNoIiwicGFyc2VfZmZwcmVkcyIsImJwX2RhdGEiLCJtZl9kYXRhIiwiY2NfZGF0YSIsInRhYmxlX2RhdGEiLCJzdGFydHNXaXRoIiwicHVzaCIsImNsYXNzX2NvbG91ciIsInNldF9hYW5vcm0iLCJoQUFfbm9ybSIsIkEiLCJ2YWwiLCJzZGUiLCJWIiwiWSIsIlciLCJUIiwiUyIsIlAiLCJGIiwiTSIsIksiLCJMIiwiSSIsIkgiLCJHIiwiUSIsIkUiLCJDIiwiRCIsIk4iLCJSIiwic2V0X2Zub3JtIiwiaEZfbm9ybSIsImh5ZHJvcGhvYmljaXR5IiwiY2hhcmdlIiwiZ2V0X2FhX2NvbG9yIiwiYWJfdmFsIiwiTWF0aCIsImFicyIsInBhcnNlX2ZlYXRjZmciLCJTRl9kYXRhIiwiQUFfZGF0YSIsImNvbHVtbnMiLCJnbG9iYWxfZmVhdHVyZXMiLCJnZXQiLCJmZWF0X3RhYmxlIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJmZWF0dXJlX25hbWUiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImFhX2NvbXBvc2l0aW9uIiwiYWFfdGFibGUiLCJyZXNpZHVlIiwiZ2V0X21lbXNhdF9yYW5nZXMiLCJyZWdleCIsImRhdGEiLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwicmVnaW9uIiwicGFyc2VJbnQiLCJzZWciLCJwYXJzZV9zczIiLCJhbm5vdGF0aW9ucyIsInNoaWZ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsInNzIiwicGFuZWxfaGVpZ2h0IiwiY2VpbCIsImJpb2QzIiwiYW5ub3RhdGlvbkdyaWQiLCJwYXJlbnQiLCJtYXJnaW5fc2NhbGVyIiwiZGVidWciLCJjb250YWluZXJfd2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhaW5lcl9oZWlnaHQiLCJhbGVydCIsInBhcnNlX3BiZGF0IiwiZGlzb3ByZWQiLCJwYXJzZV9jb21iIiwicHJlY2lzaW9uIiwicG9zIiwiZ2VuZXJpY3h5TGluZUNoYXJ0IiwiY2hhcnRUeXBlIiwieV9jdXRvZmYiLCJwYXJzZV9tZW1zYXRkYXRhIiwic2VxIiwidG9wb19yZWdpb25zIiwic2lnbmFsX3JlZ2lvbnMiLCJyZWVudHJhbnRfcmVnaW9ucyIsInRlcm1pbmFsIiwiY29pbF90eXBlIiwidG1wX2Fubm8iLCJBcnJheSIsInByZXZfZW5kIiwiZmlsbCIsImFubm8iLCJtZW1zYXQiLCJwYXJzZV9wcmVzdWx0IiwidHlwZSIsImFubl9saXN0IiwicHNldWRvX3RhYmxlIiwidGFibGVfaGl0IiwidG9Mb3dlckNhc2UiLCJwZGIiLCJzdWJzdHJpbmciLCJhbG4iLCJhbm4iLCJwYXJzZV9wYXJzZWRzIiwicHJlZGljdGlvbl9yZWdleCIsInByZWRpY3Rpb25fbWF0Y2giLCJkZXRhaWxzIiwicmVwbGFjZSIsInZhbHVlcyIsImluZGV4T2YiLCJ2YWx1ZSIsImRvbXByZWQiLCJzaG93X3BhbmVsIiwiY2xlYXJfc2V0dGluZ3MiLCJnZWFyX3N0cmluZyIsImpvYl9saXN0Iiwiam9iX25hbWVzIiwiemlwIiwiam9iX25hbWUiLCJjbGVhclNlbGVjdGlvbiIsIkpTWmlwIiwicHJlcGFyZV9kb3dubG9hZHNfaHRtbCIsImRvd25sb2Fkc19pbmZvIiwiaGVhZGVyIiwicHNpcHJlZCIsIm1lbXNhdHN2bSIsInBnZW50aHJlYWRlciIsImJpb3NlcmYiLCJwZG9tdGhyZWFkZXIiLCJkb21zZXJmIiwiZmZwcmVkIiwiaGFuZGxlX3Jlc3VsdHMiLCJmaWxlX3VybCIsImhvcml6X3JlZ2V4Iiwic3MyX3JlZ2V4IiwicG5nX3JlZ2V4IiwibWVtc2F0X2NhcnRvb25fcmVnZXgiLCJtZW1zYXRfc2NoZW1hdGljX3JlZ2V4IiwibWVtc2F0X2RhdGFfcmVnZXgiLCJtZW1wYWNrX2NhcnRvb25fcmVnZXgiLCJtZW1wYWNrX2dyYXBoX291dCIsIm1lbXBhY2tfY29udGFjdF9yZXMiLCJtZW1wYWNrX2xpcGlkX3JlcyIsImRvbXNzZWFfcHJlZF9yZWdleCIsImRvbXNzZWFfcmVnZXgiLCJkb21zZXJmX3JlZ2V4IiwiZmZwcmVkX3NjaF9yZWdleCIsImZmcHJlZF9zdm1fcmVnZXgiLCJmZnByZWRfc2NoZW1hdGljX3JlZ2V4IiwiZmZwcmVkX3RtX3JlZ2V4IiwiZmZwcmVkX2ZlYXRjZmdfcmVnZXgiLCJmZnByZWRfcHJlZHNfcmVnZXgiLCJtZXRhcHNpY292X2V2X3JlZ2V4IiwibWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXgiLCJtZXRhcHNpY292X2NjbXByZWRfcmVnZXgiLCJtZXRzaXRlX3RhYmxlX3JlZ2V4IiwibWV0c2l0ZV9wZGJfcmVnZXgiLCJoc3ByZWRfaW5pdGlhbF9yZWdleCIsImhzcHJlZF9zZWNvbmRfcmVnZXgiLCJpbWFnZV9yZWdleCIsInJlc3VsdHMiLCJkb21haW5fY291bnQiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4iLCJoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiIsImdlbnRkYl9jaGVja2NoYWluc19zZWVuIiwicmVzdWx0c19mb3VuZCIsIm1ldGFwc2ljb3YiLCJtZW1wYWNrIiwiZ2VudGhyZWFkZXIiLCJtZXRzaXRlIiwiaHNwcmVkIiwibWVtZW1iZWQiLCJnZW50ZGIiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzX2ZpbGUiLCJob3JpeiIsInNzMl9tYXRjaCIsInNzMiIsInBiZGF0IiwiY29tYiIsInNjaGVtZV9tYXRjaCIsInNjaGVtYXRpYyIsImNhcnRvb25fbWF0Y2giLCJjYXJ0b29uIiwibWVtc2F0X21hdGNoIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0Iiwia2V5X2ZpZWxkcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImZpZWxkIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidGFibGUiLCJhbGlnbiIsInBuZ19tYXRjaCIsImJvdW5kYXJ5X3BuZyIsImJvdW5kYXJ5IiwicHJlZF9tYXRjaCIsImRvbXNzZWFwcmVkIiwiZG9tc3NlYV9tYXRjaCIsImRvbXNzZWEiLCJtb2RlbCIsImRpc3BsYXlfc3RydWN0dXJlIiwiaGhibGl0cyIsInBkYmFhIiwiY2F0aGJsYXN0IiwicGRiYmxhc3QiLCJkb21zZXJmX21hdGNoIiwiYnV0dG9uc190YWdzIiwicGF0aHMiLCJzY2hfbWF0Y2giLCJzY2giLCJmZWF0X21hdGNoIiwiZmVhdHVyZXMiLCJwcmVkc19tYXRjaCIsInByZWRzIiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJpbml0aWFsX21hdGNoIiwic2Vjb25kX21hdGNoIiwiaW5pdGlhbCIsInNlY29uZCIsInRkYiIsInVyaSIsImNzc19pZCIsIm1vbF9jb250YWluZXJzIiwiY29udGFpbmVyIiwiY2FydG9vbl9jb2xvciIsImF0b20iLCJob3RzcG90X2NvbG9yIiwiYiIsImVsZW1lbnQiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2aWV3ZXIiLCIkM0Rtb2wiLCJjcmVhdGVWaWV3ZXIiLCJnZXRfdGV4dCIsImFkZE1vZGVsIiwic2V0U3R5bGUiLCJjb2xvcmZ1bmMiLCJhZGRTdXJmYWNlIiwiU3VyZmFjZVR5cGUiLCJWRFciLCJjb2xvcnNjaGVtZSIsImhldGZsYWciLCJ6b29tVG8iLCJyZW5kZXIiLCJ6b29tIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZXRfYWR2YW5jZWRfcGFyYW1zIiwib3B0aW9uc19kYXRhIiwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImVyciIsInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyIsImJpb3NlcmZfbW9kZWxsZXJfa2V5IiwiZG9tc2VyZl9tb2RlbGxlcl9rZXkiLCJjaGVja2VkIiwiZmZwcmVkX3NlbGVjdGlvbiIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4iLCJleHRyYWN0X2Zhc3RhX2NoYWluIiwic2VlZFNpdGVGaW5kX2NoYWluIiwibWV0cHJlZF93cmFwcGVyX2NoYWluIiwic2VlZFNpdGVGaW5kX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX2ZwciIsImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMiLCJoc19wcmVkX2ZpcnN0X2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluIiwiaHNfcHJlZF9zZWNvbmRfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluIiwibWVtZW1iZWRfYWxnb3JpdGhtIiwibWVtZW1iZWRfYmFycmVsIiwibWVtZW1iZWRfdGVybWluaSIsInNlbmRfcmVxdWVzdCIsInVybCIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiYWpheCIsImNhY2hlIiwiY29udGVudFR5cGUiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJzZW5kX2pvYiIsImVtYWlsIiwic3VibWl0X3VybCIsInRpbWVzX3VybCIsIkJsb2IiLCJlIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlX2RhdGEiLCJ0aW1lcyIsImsiLCJmaXJlIiwiZ2V0X3ByZXZpb3VzX2RhdGEiLCJ1dWlkIiwic3VibWlzc2lvbl9yZXNwb25zZSIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsImNvdW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwic2VxX2pvYl9saXN0Iiwic3RydWN0X2pvYl9saXN0IiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VibWlzc2lvbl92aXNpYmxlIiwicmVzdWx0c19wYW5lbF92aXNpYmxlIiwic3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZSIsInRpbWVfdmlzaWJsZSIsImJpb3NlcmZfYWR2YW5jZWQiLCJkb21zZXJmX2FkdmFuY2VkIiwiZG9tcHJlZF9hZHZhbmNlZCIsImZmcHJlZF9hZHZhbmNlZCIsIm1ldHNpdGVfYWR2YW5jZWQiLCJoc3ByZWRfYWR2YW5jZWQiLCJtZW1lbWJhZF9hZHZhbmNlZCIsIm1vZGVsbGVyX2tleSIsImRvd25sb2FkX2xpbmtzIiwiZXJyb3JfbWVzc2FnZSIsImxvYWRpbmdfbWVzc2FnZSIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfbWFwIiwibWV0c2l0ZV9wZGIiLCJoc3ByZWRfaW5pdGlhbF9wZGIiLCJoc3ByZWRfc2Vjb25kX3BkYiIsInRkYl9maWxlIiwibWVtZW1iZWRfcGRiIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJwc2lwcmVkX2NoZWNrZWQiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJzZXFfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsInJlbW92ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJlcnJvcl90ZXh0IiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50IiwiYWR2Iiwic2V0dGluZyIsIm1ldF9wZGIiLCJpbml0aWFsX3BkYiIsInNlY29uZF9wZGIiLCJzdWJtaXRfam9iIiwic2VxX2NvdW50IiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJzdHJ1Y3RfdHlwZSIsImJpb3NlcmZfY2hlY2tlZCIsImRvbXNlcmZfY2hlY2tlZCIsImJpb3NfbW9kZWxsZXJfdGVzdCIsInRlc3RfbW9kZWxsZXJfa2V5IiwiZG9tc19tb2RlbGxlcl90ZXN0IiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJwZGJGaWxlIiwicGRiRGF0YSIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsInJlc3VsdCIsIm1lc3NhZ2UiLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJpbnB1dCIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJzd2FwRG9tc2VyZiIsInVyaV9udW1iZXIiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9zZXFfZm9ybSIsInZlcmlmeV9zdHJ1Y3RfZm9ybSIsInBnZW50aHJlYWRlcl9jaGVja2VkIiwicGRvbXRocmVhZGVyX2NoZWNrZWQiLCJzdHJ1Y3QiLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRU8sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLElBQS9CLEVBQ1A7QUFDRSxNQUFJQyxlQUFlLDZOQUFuQjtBQUNBQSxrQkFBZ0IsdUpBQWhCO0FBQ0FBLGtCQUFnQiw2S0FBaEI7QUFDQUEsa0JBQWdCLHlMQUFoQjtBQUNBLE1BQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQUQsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFJQyxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0EsUUFBR0ksUUFBUUMsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QlAsc0JBQWdCLGFBQVdNLFFBQVEsQ0FB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aEM7QUFDRDs7QUFFRCxTQUFPQSxhQUFQO0FBQ0QsQyIsImZpbGUiOiJwc2lwcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0NjRlYjllODljNTM2MTU2N2ZkIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgaHNwcmVkX3RhYmxlID0gJzxiciAvPjxoMz5LZXk8L2gzPjx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj48dHI+PHRkIGJnY29sb3I9XCIjZmYwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7SG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1Ib3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLWludGVyZmFjZSByZXNpZHVlPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+PGJyIC8+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8aDM+UmVzaWR1ZSBQcmVkaWN0aW9uczwvaDM+PHRhYmxlIGlkPVwiaHNwcmVkX3RhYmxlXCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRoZWFkPjx0cj48dGg+Q2hhaW4vUmVzaWR1ZTwvdGg+PHRoPlJlc2lkdWUgSWRlbnRpdHk8L3RoPjx0aD5TY29yZTwvdGg+PC90aGVhZD48dGJvZHk+JztcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgaWYoZW50cmllcy5sZW5ndGggPT09IDMpe1xuICAgICAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH1cbiAgfSk7XG4gIGhzcHJlZF90YWJsZSArPSAnPC90Ym9keT48dGZvb3Q+PC90Zm9vdD48dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIGhzcHJlZF90YWJsZSk7XG4gICQoJyNoc3ByZWRfdGFibGUnKS5EYXRhVGFibGUoe1xuICAgICdzZWFyY2hpbmcnICAgOiBmYWxzZSxcbiAgICAncGFnZUxlbmd0aCc6IDUwLFxuICAgICdvcmRlcic6IFtbMiwgJ2Rlc2MnXSxdXG4gIH0pO1xufVxuXG4vLyBwYXJzZSB0aGUgc21hbGwgbWV0c2l0ZSBvdXRwdXQgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBtZXRzaXRlX3RhYmxlID0gJzxiciAvPjxoMz5LZXk8L2gzPjx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj48dHI+PHRkIGJnY29sb3I9XCIjZmYwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7TWV0YWwgQmluZGluZyBDb250YWN0PC90ZD48L3RyPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtDaGFpbiBub3QgcHJlZGljdGVkPC90ZD48L3RyPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtQcmVkaWN0ZWQgY2hhaW48L3RkPjwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8aDM+UmVzaWR1ZSBQcmVkaWN0aW9uczwvaDM+PHRhYmxlIGlkPVwibWV0c2l0ZV90YWJsZVwiIGNsYXNzPVwidGFibGUgc21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPjx0aGVhZD48dHI+PHRoPlJlc2lkdWUgTnVtYmVyPC90aD48dGg+UmF3IE5ldXJhbCBOZXR3b3JrIFNjb3JlPC90aD48dGg+UmVzaWR1ZTwvdGg+PHRoZWFkPjx0Ym9keT4nO1xuICBsZXQgaGl0X3JlZ2V4ID0gL1xcZCtcXHMuKz9cXHNcXHd7M31cXGQrL2c7XG4gIGxldCBoaXRfbWF0Y2hlcyA9IGZpbGUubWF0Y2goaGl0X3JlZ2V4KTtcbiAgaWYoaGl0X21hdGNoZXMpXG4gIHtcbiAgICBoaXRfbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMvKTtcbiAgICAgIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfSk7XG4gIH1cbiAgbWV0c2l0ZV90YWJsZSArPSAnPC90Ym9keT48dGZvb3Q+PC90Zm9vdD48dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBtZXRzaXRlX3RhYmxlKTtcbiAgJCgnI21ldHNpdGVfdGFibGUnKS5EYXRhVGFibGUoe1xuICAgICdzZWFyY2hpbmcnICAgOiBmYWxzZSxcbiAgICAncGFnZUxlbmd0aCc6IDEwLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSl7XG5cbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBicF9kYXRhID0gW107XG4gIGxldCBtZl9kYXRhID0gW107XG4gIGxldCBjY19kYXRhID0gW107XG4gIGxldCB0YWJsZV9kYXRhID0gJyc7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKCcjJykpe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA8IDQpe3JldHVybjt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0JQJyl7YnBfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQ0MnKXtjY19kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdNRicpe21mX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gIH0pO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5CaW9sb2dpY2FsIFByb2Nlc3MgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGUgaWQ9J2JwX3RhYmxlJyBjbGFzcz0ndGFibGUgc21hbGwtdGFibGUgdGFibGUtYm9yZGVyZWQgZ2VuLXRhYmxlJz48dGhlYWQ+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+PC90aGVhZD48dGJvZHk+XCI7XG4gIGJwX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90Ym9keT48dGZvb3Q+PC90Zm9vdD48L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlIGlkPSdtZl90YWJsZScgY2xhc3M9J3RhYmxlIHNtYWxsLXRhYmxlIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZSc+PHRoZWFkPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPjwvdGhlYWQ+PHRib2R5PlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkNlbGx1bGFyIENvbXBvbmVudCBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZSBpZD0nY2NfdGFibGUnIGNsYXNzPSd0YWJsZSBzbWFsbC10YWJsZSB0YWJsZS1ib3JkZXJlZCBnZW4tdGFibGUnPjx0aGVhZD48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj48L3RoZWFkPjx0Ym9keT5cIjtcbiAgY2NfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90Ym9keT48dGZvb3Q+PC90Zm9vdD48L3RhYmxlPjxiciAvPic7XG4gIHRhYmxlX2RhdGEgKz0gJ1RoZXNlIHByZWRpY3Rpb24gdGVybXMgcmVwcmVzZW50IHRlcm1zIHByZWRpY3RlZCB3aGVyZSBTVk0gdHJhaW5pbmcgaW5jbHVkZXMgYXNzaWduZWQgR08gdGVybXMgYWNyb3NzIGFsbCBldmlkZW5jZSBjb2RlIHR5cGVzLiBTVk0gcmVsaWFiaWxpdHkgaXMgcmVnYXJkZWQgYXMgSGlnaCAoSCkgd2hlbiBNQ0MsIHNlbnNpdGl2aXR5LCBzcGVjaWZpY2l0eSBhbmQgcHJlY2lzaW9uIGFyZSBqb2ludGx5IGFib3ZlIGEgZ2l2ZW4gdGhyZXNob2xkLiBvdGhlcndpc2UgUmVsaWFiaWxpdHkgaXMgaW5kaWNhdGVkIGFzIExvdyAoTCkuIDxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcbiAgJCgnI2JwX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAgICdzZWFyY2hpbmcnICAgOiBmYWxzZSxcbiAgICAgICdwYWdlTGVuZ3RoJzogMjUsXG4gICAgICAnb3JkZXInOiBbWzMsICdhc2MnXSxdXG4gICAgfSk7XG4gICQoJyNtZl90YWJsZScpLkRhdGFUYWJsZSh7XG4gICAgJ3NlYXJjaGluZycgICA6IGZhbHNlLFxuICAgICdwYWdlTGVuZ3RoJzogMjUsXG4gICAgJ29yZGVyJzogW1szLCAnYXNjJ10sXVxuICB9KTtcbiAgJCgnI2NjX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgJ3BhZ2VMZW5ndGgnOiAyNSxcbiAgICAnb3JkZXInOiBbWzMsICdhc2MnXSxdXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRfYWFub3JtKCl7XG4gIGxldCBoQUFfbm9ybSA9IHt9O1xuICBoQUFfbm9ybS5BID0geyB2YWw6IDAuMDcxNzgzMjQ4MDA2MzA5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI3MzY3NjYxNTI0Mjc1fTtcbiAgaEFBX25vcm0uViA9IHsgdmFsOiAwLjA1OTYyNDU5NTM2OTkwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDM3Nzc5MTUyODc0NX07XG4gIGhBQV9ub3JtLlkgPSB7IHZhbDogMC4wMjYwNzUwNjgyNDA0MzcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTQ4MjI0NzE1MzEzNzl9O1xuICBoQUFfbm9ybS5XID0geyB2YWw6IDAuMDE0MTY2MDAyNjEyNzcxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDEwNDcxODM1ODAxOTk2fTtcbiAgaEFBX25vcm0uVCA9IHsgdmFsOiAwLjA1MjU5MzU4Mjk3MjcxNCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDA5NDc5Mzk2NDU5N307XG4gIGhBQV9ub3JtLlMgPSB7IHZhbDogMC4wODIxMjMyNDEzMzIwOTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjg2ODc1NjYwODE1MTJ9O1xuICBoQUFfbm9ybS5QID0geyB2YWw6IDAuMDY1NTU3NTMxMzIyMjQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDM0MjM5Mzk4NDk2NzM2fTtcbiAgaEFBX25vcm0uRiA9IHsgdmFsOiAwLjAzNzEwMzk5NDk2OTAwMixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODU0MzQyMzEzOTE4Nn07XG4gIGhBQV9ub3JtLk0gPSB7IHZhbDogMC4wMjI1NjI4MTgxODM5NTUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTEzMjEwMzk2NjI0ODF9O1xuICBoQUFfbm9ybS5LID0geyB2YWw6IDAuMDU0ODMzOTc5MjY5MTg1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI5MjY0MDgzNjY3MTU3fTtcbiAgaEFBX25vcm0uTCA9IHsgdmFsOiAwLjEwMDEwNTkxNTc1OTA2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMjc2ODA4NTE5MDA5fTtcbiAgaEFBX25vcm0uSSA9IHsgdmFsOiAwLjA0MjAzNDUyNjA0MDQ2NyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyNjg0OTI2MjQ5NX07XG4gIGhBQV9ub3JtLkggPSB7IHZhbDogMC4wMjcxNDE0MDM1Mzc1OTgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTU1MDU2NjM3ODk4NX07XG4gIGhBQV9ub3JtLkcgPSB7IHZhbDogMC4wNjkxNzk4MjAxMDQ1MzYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAwODc1NjIwNTczMjh9O1xuICBoQUFfbm9ybS5RID0geyB2YWw6IDAuMDY1OTIwNTYxOTMxODAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMTAzMDkxMDA4MzY2fTtcbiAgaEFBX25vcm0uRSA9IHsgdmFsOiAwLjA0NjQ3ODQ2MjI1ODM4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE5OTQ2MjY5NDYxNzM2fTtcbiAgaEFBX25vcm0uQyA9IHsgdmFsOiAwLjAyNDkwODU1MTg3MjA1NixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyMjkwOTU4OTUwNH07XG4gIGhBQV9ub3JtLkQgPSB7IHZhbDogMC4wNDQzMzc5MDQ3MjYwNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg0MzY2NzcyNTY3MjZ9O1xuICBoQUFfbm9ybS5OID0geyB2YWw6IDAuMDMzNTA3MDIwOTg3MDMzLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE2NTM2MDIyMjg4MjA0fTtcbiAgaEFBX25vcm0uUiA9IHsgdmFsOiAwLjA1OTc0MDQ2OTAzMTE5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI1MTY1OTk0NzczMzg0fTtcbiAgcmV0dXJuKGhBQV9ub3JtKTtcbn1cblxuZnVuY3Rpb24gc2V0X2Zub3JtKCl7XG4gIGxldCBoRl9ub3JtID0ge307XG4gIGhGX25vcm0uaHlkcm9waG9iaWNpdHkgPSB7dmFsOiAtMC4zNDg3NjgyODA4MDE1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDAuNzU1NTkxNTI3Njk3OTl9O1xuICBoRl9ub3JtWydwZXJjZW50IHBvc2l0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS40NTc3MTc0NjY5NDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDMuNTY3MTMzMzQxMTM5fTtcbiAgaEZfbm9ybVsnYWxpcGhhdGljIGluZGV4J10gPSB7dmFsOiA3OS45MTE1NDkzMTkwOTksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMTYuNzg3NjE3OTc4ODI3fTtcbiAgaEZfbm9ybVsnaXNvZWxlY3RyaWMgcG9pbnQnXSA9IHt2YWw6IDcuNjEwMjA0NjM4MzYwMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDEuOTcxNjExMTAyMDA4OH07XG4gIGhGX25vcm1bJ21vbGVjdWxhciB3ZWlnaHQnXSA9IHt2YWw6IDQ4NjY4LjQxMjgzOTk2MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzc4MzguMzI0ODk1OTY5fTtcbiAgaEZfbm9ybS5jaGFyZ2UgPSB7dmFsOiA1LjA5OTE3NjMwNTc2MDQsXG4gICAgICAgICAgICAgICAgICAgIHNkZTogMTYuODM4NjM2NTkwMjV9O1xuICBoRl9ub3JtWydwZXJjZW50IG5lZ2F0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS4wMjYxOTAxMjgxNzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDQuMDIwNjYzMTY4MDkyNn07XG4gIGhGX25vcm1bJ21vbGFyIGV4dGluY3Rpb24gY29lZmZpY2llbnQnXSA9IHt2YWw6IDQ2NDc1LjI5MzkyMzkyNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzkyOTkuMzk5ODQ4ODIzfTtcbiAgcmV0dXJuKGhGX25vcm0pO1xufVxuXG5mdW5jdGlvbiBnZXRfYWFfY29sb3IodmFsKXtcbiAgICBsZXQgYWJfdmFsID0gTWF0aC5hYnModmFsKTtcbiAgICBpZihhYl92YWwgPj0gMi45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMi4yNCl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjJwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYyblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjVwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWY1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjY0NSApIHtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMTBwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxMG5cIjtcbiAgICB9XG4gICAgcmV0dXJuIFwicGxhaW5cIjtcbn1cblxuLy9wYXJzZSB0aGUgZmZwcmVkIGZlYXRjZm8gZmVhdHVyZXMgZmlsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBTRl9kYXRhID0ge307XG4gIGxldCBBQV9kYXRhID0ge307XG4gIGxldCBoRl9ub3JtID1zZXRfZm5vcm0oKTtcbiAgbGV0IGhBQV9ub3JtPXNldF9hYW5vcm0oKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJBQVwiKSl7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgQUFfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIlNGXCIpKVxuICAgIHtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBTRl9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGJ1aWxkIGh0bWwgdGFibGVzIGZvciB0aGUgZmVhdHVyZSBkYXRhXG4gIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgbGV0IGdsb2JhbF9mZWF0dXJlcyA9IHJhY3RpdmUuZ2V0KCdnbG9iYWxfZmVhdHVyZXMnKTtcbiAgbGV0IGZlYXRfdGFibGUgPSAnPGI+R2xvYmFsIEZlYXR1cmVzPC9iPjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJ0dsb2JhbCBmZWF0dXJlcyBhcmUgY2FsY3VsYXRlZCBkaXJlY3RseSBmcm9tIHNlcXVlbmNlLiBMb2NhbGlzYXRpb24gdmFsdWVzIGFyZSBwcmVkaWN0ZWQgYnkgdGhlIFBzb3J0IGFsZ29yaXRobSBhbmQgcmVmbGVjdCB0aGUgcmVsYXRpdmUgbGlrZWxpaG9vZCBvZiB0aGUgcHJvdGVpbiBvY2N1cHlpbmcgZGlmZmVyZW50IGNlbGx1bGFyIGxvY2FsaXNhdGlvbnMuIFRoZSBiaWFzIGNvbHVtbiBpcyBoaWdobGlnaHRlZCBhY2NvcmRpbmcgdG8gdGhlIHNpZ25pZmljYW5jZSBvZiB0aGUgZmVhdHVyZSB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gWiBzY29yZSBvZiB0aGUgZmVhdHVyZS48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICc8dGFibGUgYWxpZ249XCJjZW50ZXJcIiBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgZmZwcmVkLXRhYmxlXCI+PHRyPjx0aD5GZWF0dXJlIE5hbWU8L3RoPjx0aD5WYWx1ZTwvdGg+PHRoPkJpYXM8L3RoPjwvdHI+JztcblxuICBPYmplY3Qua2V5cyhTRl9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlX25hbWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBpZihmZWF0dXJlX25hbWUgaW4gaEZfbm9ybSl7XG4gICAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoIChwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSktaEZfbm9ybVtmZWF0dXJlX25hbWVdLnZhbCkgLyBoRl9ub3JtW2ZlYXR1cmVfbmFtZV0uc2RlKTtcbiAgICB9XG4gICAgZmVhdF90YWJsZSArPSAnPHRyPjx0ZD4nK2ZlYXR1cmVfbmFtZSsnPC90ZD48dGQ+JytwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSkudG9GaXhlZCgyKSsnPC90ZD48dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD48L3RyPic7XG4gIH0pO1xuICBmZWF0X3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBmZWF0X3RhYmxlKTtcblxuICAvL2J1aWxkIGh0bWwgdGFibGUgZm9yIHRoZSBBQSBkYXRhXG4gIGxldCBhYV9jb21wb3NpdGlvbiA9IHJhY3RpdmUuZ2V0KCdhYV9jb21wb3NpdGlvbicpO1xuICBsZXQgYWFfdGFibGUgPSAnPGI+QW1pbm8gQWNpZCBDb21wb3NpdGlvbiAocGVyY2VudGFnZXMpPC9iPjxiciAvPic7XG5cbiAgYWFfdGFibGUgKz0gJzx0YWJsZSB3aWR0aD1cIjUwJVwiIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCBmZnByZWQtdGFibGVcIiBhbGlnbj1cImNlbnRlclwiID48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aCB3aWR0aD1cIjUlXCI+JytyZXNpZHVlKyc8L3RoPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvcigocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKS1oQUFfbm9ybVtyZXNpZHVlXS52YWwpIC8gaEFBX25vcm1bcmVzaWR1ZV0uc2RlKTtcbiAgICBhYV90YWJsZSArPSAnPHRkIHdpZHRoPVwiNSUgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSB3aWR0aD1cIjUwJVwiIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCBmZnByZWQtdGFibGVcIiBhbGlnbj1cImNlbnRlclwiPic7XG4gIGFhX3RhYmxlICs9ICc8dGhlYWQ+PHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGggd2lkdGg9XCI5JVwiIGFsaWduPVwibGVmdFwiPjxiPmxvdzwvYj48L3RoPic7XG4gIGFhX3RhYmxlICs9ICc8dGggY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RoPic7XG4gIGFhX3RhYmxlICs9ICc8dGggd2lkdGg9XCI5JVwiIGFsaWduPVwicmlnaHRcIj48Yj5oaWdoPC9iPjwvdGg+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+PC90aGVhZD4nO1xuICBhYV90YWJsZSArPSAnPHRib2R5Pjx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPiZuYnNwOzwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFuXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYyblwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNW5cIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwblwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+cCAmZ3Q7PSAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMHBcIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNXBcIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJwXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxcFwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPiZuYnNwPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj48L3Rib2R5Pic7XG4gIGFhX3RhYmxlICs9ICc8dGZvb3Q+PHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj48dGZvb3Q+JztcbiAgYWFfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgYWFfdGFibGUpO1xufVxuXG5cbi8vIGZvciBhIGdpdmVuIG1lbXNhdCBkYXRhIGZpbGVzIGV4dHJhY3QgY29vcmRpbmF0ZSByYW5nZXMgZ2l2ZW4gc29tZSByZWdleFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9tZW1zYXRfcmFuZ2VzKHJlZ2V4LCBkYXRhKVxue1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJywnKSlcbiAgICB7XG4gICAgICBsZXQgcmVnaW9ucyA9IG1hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICByZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uLCBpKXtcbiAgICAgICAgcmVnaW9uc1tpXSA9IHJlZ2lvbi5zcGxpdCgnLScpO1xuICAgICAgICByZWdpb25zW2ldWzBdID0gcGFyc2VJbnQocmVnaW9uc1tpXVswXSk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMV0gPSBwYXJzZUludChyZWdpb25zW2ldWzFdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCctJykpXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaFsxXSk7XG4gICAgICAgIGxldCBzZWcgPSBtYXRjaFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtbXSwgXTtcbiAgICAgICAgcmVnaW9uc1swXVswXSA9IHBhcnNlSW50KHNlZ1swXSk7XG4gICAgICAgIHJlZ2lvbnNbMF1bMV0gPSBwYXJzZUludChzZWdbMV0pO1xuICAgICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBsZXQgcGFuZWxfaGVpZ2h0ID0gKChNYXRoLmNlaWwoYW5ub3RhdGlvbnMubGVuZ3RoLzUwKSsyKSoyMCkrKDgqMjApO1xuICAgICAgaWYocGFuZWxfaGVpZ2h0IDwgMzAwKXtwYW5lbF9oZWlnaHQgPSAzMDA7fVxuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogcGFuZWxfaGVpZ2h0LCBjb250YWluZXJfaGVpZ2h0OiBwYW5lbF9oZWlnaHR9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgbGV0IHBhbmVsX2hlaWdodCA9ICgoTWF0aC5jZWlsKGFubm90YXRpb25zLmxlbmd0aC81MCkrMikqMjApKyg4KjIwKTtcbiAgICAgIGlmKHBhbmVsX2hlaWdodCA8IDMwMCl7cGFuZWxfaGVpZ2h0ID0gMzAwO31cbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGxldCBwYW5lbF9oZWlnaHQgPSAoKE1hdGguY2VpbChhbm5vdGF0aW9ucy5sZW5ndGgvNTApKzIpKjIwKSsoOCoyMCk7XG4gIGlmKHBhbmVsX2hlaWdodCA8IDMwMCl7cGFuZWxfaGVpZ2h0ID0gMzAwO31cbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogcGFuZWxfaGVpZ2h0LCBjb250YWluZXJfaGVpZ2h0OiBwYW5lbF9oZWlnaHR9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCB0eXBlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgLy9jb25zb2xlLmxvZyh0eXBlKydfYW5uX3NldCcpO1xuICBsZXQgYW5uX2xpc3QgPSByYWN0aXZlLmdldCh0eXBlKydfYW5uX3NldCcpO1xuICAvL2NvbnNvbGUubG9nKGFubl9saXN0KTtcbiAgaWYoT2JqZWN0LmtleXMoYW5uX2xpc3QpLmxlbmd0aCA+IDApe1xuICBsZXQgcHNldWRvX3RhYmxlID0gJzx0YWJsZSBpZD1cIicrdHlwZSsnX3RhYmxlXCIgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZVwiPjx0aGVhZD5cXG4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0cj48dGg+Q29uZi48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk5ldCBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+cC12YWx1ZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UGFpckU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlNvbHZFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBMZW5ndGg8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlRhcmdldCBMZW48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlF1ZXJ5IExlbjwvdGg+JztcbiAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gU3RhcnQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIEVuZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5DQVRIPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNDT1A8L3RoPic7XG4gIH1lbHNlIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNDT1A8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSDwvdGg+JztcbiAgfVxuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QREJTVU08L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsaWdubWVudDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TU9ERUw8L3RoPic7XG5cbiAgLy8gaWYgTU9ERUxMRVIgVEhJTkdZXG4gIHBzZXVkb190YWJsZSArPSAnPC90cj48L3RoZWFkPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcImNhdGhfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcInBkYl9tb2RlbGxlclxcXCIpOycgdmFsdWU9J01vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48dGZvb3Q+PC90Zm9vdD48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gICQoJyMnK3R5cGUrJ190YWJsZScpLkRhdGFUYWJsZSh7XG4gICAgJ3NlYXJjaGluZycgICA6IGZhbHNlLFxuICAgICdwYWdlTGVuZ3RoJzogNTAsXG4gIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBcIjxoMz5ObyBnb29kIGhpdHMgZm91bmQuIEdVRVNTIGFuZCBMT1cgY29uZmlkZW5jZSBoaXRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmVzdWx0cyBmaWxlPC9oMz5cIik7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlZGljdGlvbl9yZWdleCA9IC9Eb21haW5cXHNCb3VuZGFyeVxcc2xvY2F0aW9uc1xcc3ByZWRpY3RlZFxcc0RQUzpcXHMoLispLztcbiAgbGV0IHByZWRpY3Rpb25fbWF0Y2ggPSAgcHJlZGljdGlvbl9yZWdleC5leGVjKGZpbGUpO1xuICBpZihwcmVkaWN0aW9uX21hdGNoKVxuICB7XG4gICAgbGV0IGRldGFpbHMgPSBmaWxlLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICBkZXRhaWxzID0gZGV0YWlscy5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCI8aDQ+XCIrZGV0YWlscytcIjwvaDQ+XCIpO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBpZihwcmVkaWN0aW9uX21hdGNoWzFdLmluZGV4T2YoXCIsXCIpKVxuICAgIHtcbiAgICAgIHZhbHVlcyA9IHByZWRpY3Rpb25fbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludChwcmVkaWN0aW9uX21hdGNoWzFdKTtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGFubm90YXRpb25zW3ZhbHVlXS5kb21wcmVkID0gJ0InO1xuICAgIH0pO1xuICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIk5vIFBhcnNlRFMgRG9tYWluIGJvdW5kYXJpZXMgcHJlZGljdGVkXCIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzIiwiaW1wb3J0IHsgcHJvY2Vzc19maWxlIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3RleHQgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93X3BhbmVsKHZhbHVlLCByYWN0aXZlKVxue1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCB2YWx1ZSApO1xufVxuXG4vL2JlZm9yZSBhIHJlc3VibWlzc2lvbiBpcyBzZW50IGFsbCB2YXJpYWJsZXMgYXJlIHJlc2V0IHRvIHRoZSBwYWdlIGRlZmF1bHRzXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHppcCl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJycpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdsb2FkaW5nX21lc3NhZ2UnLCAnTG9hZGluZyBEYXRhJyk7XG5cblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnIHx8IGpvYl9uYW1lID09PSAnZG9tc2VyZicgfHwgam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm09IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBkb210aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmRvbXNlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIC8vIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkID0ge307XG4gICAgICAgIC8vIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kaXNvcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5mZnByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vL3Rha2UgdGhlIGRhdGFibG9iIHdlJ3ZlIGdvdCBhbmQgbG9vcCBvdmVyIHRoZSByZXN1bHRzXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcywgam9iX2xpc3QpXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgcG5nX3JlZ2V4ID0gL1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IGRvbXNzZWFfcHJlZF9yZWdleCA9IC9cXC5wcmVkJC87XG4gIGxldCBkb21zc2VhX3JlZ2V4ID0gL1xcLmRvbXNzZWEkLztcbiAgbGV0IGRvbXNlcmZfcmVnZXggPSAvLitfKFxcZCspXyhcXGQrKS4qXFwucGRiLztcbiAgbGV0IGZmcHJlZF9zY2hfcmVnZXggPSAvLitfc2NoXFwucG5nLztcbiAgLy9sZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK190bVxcLnBuZy87XG4gIGxldCBmZnByZWRfc2NoZW1hdGljX3JlZ2V4ID0gLy4rX3NjaGVtYXRpY18uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfdG1fcmVnZXggPSAvLitfdG1cXC5wbmcvO1xuICBsZXQgZmZwcmVkX2ZlYXRjZmdfcmVnZXggPSAvXFwuZmVhdGNmZy87XG4gIGxldCBmZnByZWRfcHJlZHNfcmVnZXggPSAvXFwuZnVsbF9yYXcvO1xuICBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgbGV0IG1ldHNpdGVfdGFibGVfcmVnZXggPSAvXFwuTWV0cHJlZC87XG4gIGxldCBtZXRzaXRlX3BkYl9yZWdleCA9IC9cXC5NZXRQcmVkLztcbiAgbGV0IGhzcHJlZF9pbml0aWFsX3JlZ2V4ID0gL19pbml0aWFsXFwucGRiLztcbiAgbGV0IGhzcHJlZF9zZWNvbmRfcmVnZXggPSAvX3NlY29uZFxcLnBkYi87XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBsZXQgZG9tYWluX2NvdW50ID0gMDtcbiAgbGV0IG1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgaHNwcmVkX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IGdlbnRkYl9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCByZXN1bHRzX2ZvdW5kID0ge1xuICAgICAgcHNpcHJlZDogZmFsc2UsXG4gICAgICBkaXNvcHJlZDogZmFsc2UsXG4gICAgICBtZW1zYXRzdm06IGZhbHNlLFxuICAgICAgcGdlbnRocmVhZGVyOiBmYWxzZSxcbiAgICAgIG1ldGFwc2ljb3Y6IGZhbHNlLFxuICAgICAgbWVtcGFjazogZmFsc2UsXG4gICAgICBnZW50aHJlYWRlcjogZmFsc2UsXG4gICAgICBkb21wcmVkOiBmYWxzZSxcbiAgICAgIHBkb210aHJlYWRlcjogZmFsc2UsXG4gICAgICBiaW9zZXJmOiBmYWxzZSxcbiAgICAgIGRvbXNlcmY6IGZhbHNlLFxuICAgICAgZmZwcmVkOiBmYWxzZSxcbiAgICAgIG1ldHNpdGU6IGZhbHNlLFxuICAgICAgaHNwcmVkOiBmYWxzZSxcbiAgICAgIG1lbWVtYmVkOiBmYWxzZSxcbiAgICAgIGdlbnRkYjogZmFsc2UsXG4gIH07XG4gIGxldCByZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCA9IGZhbHNlO1xuXG4gIC8vUHJlcGF0b3J5IGxvb3AgZm9yIGluZm9ybWF0aW9uIHRoYXQgaXMgbmVlZGVkIGJlZm9yZSByZXN1bHRzIHBhcnNpbmc6XG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwicGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fZ2VuYWxpZ25tZW50X2Fubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb25fZG9tJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJkZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImRnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gIC8vbWFpbiByZXN1bHRzIHBhcnNpbmcgbG9vcFxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQucHNpcHJlZCA9IHRydWU7XG4gICAgICBsZXQgbWF0Y2ggPSBob3Jpel9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdob3JpeicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SG9yaXogRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuXG4gICAgICB9XG4gICAgICBsZXQgc3MyX21hdGNoID0gc3MyX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNzMl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TUzIgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3NzMicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZGlzb3ByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19mb3JtYXQnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGJkYXQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmVzdWx0c19mb3VuZC5kaXNvcHJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL21lbXNhdCBhbmQgbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQubWVtc2F0c3ZtID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICAvL3Jlc3VsdHNfZm91bmQubWVtcGFjayA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdHNfZm91bmQubWVtcGFjayA9IHRydWU7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aW1nIHdpZHRoPVwiMTAwMHB4XCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGdyYXBoX21hdGNoID0gIG1lbXBhY2tfZ3JhcGhfb3V0LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGdyYXBoX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RGlhZ3JhbSBEYXRhPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFjdF9tYXRjaCA9ICBtZW1wYWNrX2NvbnRhY3RfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNvbnRhY3RfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGxpcGlkX21hdGNoID0gIG1lbXBhY2tfbGlwaWRfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGxpcGlkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TGlwaWQgRXhwb3N1cmUgUHJlZGl0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vZ2VudGhyZWFkZXIgYW5kIHBnZW50aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzb3J0X3ByZXN1bHQnKVxuICAgIHtcbiAgICAgIGxldCBrZXlfZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZWxsZXIta2V5Jyk7XG4gICAgICBmb3IobGV0IGZpZWxkIG9mIGtleV9maWVsZHMpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG4gICAgICAgIGZpZWxkLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNfZm91bmQucGdlbnRocmVhZGVyID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgICByZXN1bHRzX2ZvdW5kLmdlbnRocmVhZGVyID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2dlbl9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIGxldCBrZXlfZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZWxsZXIta2V5Jyk7XG4gICAgICBmb3IobGV0IGZpZWxkIG9mIGtleV9maWVsZHMpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG4gICAgICAgIGZpZWxkLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNfZm91bmQucGRvbXRocmVhZGVyID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfbW9kZWxzJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbnRocmVhZGVyX3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vcGRvbXRocmVhZGVyXG4gICAgLy8gaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3N2bV9wcm9iX2RvbScpXG4gICAgLy8ge1xuICAgIC8vICAgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgIC8vICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdkb21fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgLy8gICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIC8vIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19kb21fYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgLy9kb21wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BhcnNlZHMnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuZG9tcHJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHBuZ19tYXRjaCA9IHBuZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwbmdfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BhcnNlZHMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tc3NlYScpXG4gICAge1xuICAgICAgbGV0IHByZWRfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBkb21zc2VhX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zc2VhX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIGZpbGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3J1bkJpb3NlcmYnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuYmlvc2VyZiA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZpbmFsIEhvbW9sb2d5IE1vZGVsPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjYmlvc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX21vZGVsXCIsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5kb21zZXJmID0gdHJ1ZTtcbiAgICAgICAgaWYoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCl7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgKz0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ1dHRvbnNfdGFncyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9idXR0b25zXCIpO1xuICAgICAgICBidXR0b25zX3RhZ3MgKz0gJzxidXR0b24gb25DbGljaz1cInBzaXByZWQuc3dhcERvbXNlcmYoJytkb21haW5fY291bnQrJylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5Eb21haW4gJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2J1dHRvbj4nO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfYnV0dG9uc1wiLCBidXR0b25zX3RhZ3MpO1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICAgICAgcGF0aHMucHVzaChmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiLCBwYXRocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dldFNjaGVtYXRpYycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5mZnByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hfbWF0Y2ggPSAgZmZwcmVkX3NjaF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2ggPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GZWF0dXJlIFNjaGVtYXRpYyBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYycsICc8Yj5TZXF1ZW5jZSBGZWF0dXJlIE1hcDwvYj48YnIgLz5Qb3NpdGlvbiBkZXBlbmRlbnQgZmVhdHVyZSBwcmVkaWN0aW9ucyBhcmUgbWFwcGVkIG9udG8gdGhlIHNlcXVlbmNlIHNjaGVtYXRpYyBzaG93biBiZWxvdy4gVGhlIGxpbmUgaGVpZ2h0IG9mIHRoZSBQaG9zcGhvcnlsYXRpb24gYW5kIEdseWNvc3lsYXRpb24gZmVhdHVyZXMgcmVmbGVjdHMgdGhlIGNvbmZpZGVuY2Ugb2YgdGhlIHJlc2lkdWUgcHJlZGljdGlvbi48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgICAgLy8gbGV0IGNhcnRvb25fbWF0Y2ggPSAgZmZwcmVkX3N2bV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAvLyBpZihjYXJ0b29uX21hdGNoKVxuICAgICAgLy8ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkhFWVwiKVxuICAgICAgLy8gICBkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBQTkc8L2E+PGJyIC8+JztcbiAgICAgIC8vICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgLy8gICByYWN0aXZlLnNldCgnZmZwcmVkX2NhcnRvb24nLCAnPGI+UHJlZGljdGVkIFRyYW5zbWVtYnJhbmUgVG9wb2xvZ3k8L2I+PGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0VG1JbWFnZScpXG4gICAge1xuICAgICAgLy8gcmVzdWx0c19mb3VuZC5mZnByZWQgPSB0cnVlO1xuICAgICAgLy8gcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIC8vIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAvLyByYWN0aXZlLnNldChcImZmcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIC8vIGxldCBzY2hfbWF0Y2ggPSAgZmZwcmVkX3NjaF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAvLyBpZihzY2hfbWF0Y2gpXG4gICAgICAvLyB7XG4gICAgICAvLyAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2ggPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GZWF0dXJlIFNjaGVtYXRpYyBQTkc8L2E+PGJyIC8+JztcbiAgICAgIC8vICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgLy8gICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYycsICc8Yj5TZXF1ZW5jZSBGZWF0dXJlIE1hcDwvYj48YnIgLz5Qb3NpdGlvbiBkZXBlbmRlbnQgZmVhdHVyZSBwcmVkaWN0aW9ucyBhcmUgbWFwcGVkIG9udG8gdGhlIHNlcXVlbmNlIHNjaGVtYXRpYyBzaG93biBiZWxvdy4gVGhlIGxpbmUgaGVpZ2h0IG9mIHRoZSBQaG9zcGhvcnlsYXRpb24gYW5kIEdseWNvc3lsYXRpb24gZmVhdHVyZXMgcmVmbGVjdHMgdGhlIGNvbmZpZGVuY2Ugb2YgdGhlIHJlc2lkdWUgcHJlZGljdGlvbi48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgLy8gfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgZmZwcmVkX3N2bV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhFWVwiKVxuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnZmZwcmVkX2NhcnRvb24nLCAnPGI+UHJlZGljdGVkIFRyYW5zbWVtYnJhbmUgVG9wb2xvZ3k8L2I+PGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZWF0dXJlcycpXG4gICAge1xuICAgICAgbGV0IGZlYXRfbWF0Y2ggPSBmZnByZWRfZmVhdGNmZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihmZWF0X21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZXF1ZW5jZSBGZWF0dXJlIFN1bW1hcnk8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRmZWF0dXJlcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZmcHJlZF9odW1hbicgfHwgcmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZmcHJlZF9mbHknKVxuICAgIHtcbiAgICAgIGxldCBwcmVkc19tYXRjaCA9IGZmcHJlZF9wcmVkc19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkc19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+R08gUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRwcmVkaWN0aW9ucycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3Bsb3Rfc2VsZl9jb250YWN0X21hcCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZXRhcHNpY292ID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3ZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgTWFwPC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCAnPGI+Q29udGFjdCBNYXA8L2I+PGJyIC8+PGltZyBoZWlnaHQ9XCI4MDBcIiB3aWR0aD1cIjgwMFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NvbnRhY3RfcHJlZGljdG9ycycpXG4gICAge1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgICAgICAgbGV0IGV2X21hdGNoID0gbWV0YXBzaWNvdl9ldl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGV2X21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZyZWVDb250YWN0IHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwc19tYXRjaCA9IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYocHNfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBTSUNPViBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2NfbWF0Y2ggPSBtZXRhcHNpY292X2NjbXByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihjY19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNDTVBSRUQgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lICA9PT0gJ21ldGFwc2ljb3Zfc3RhZ2UyJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRzaXRlX2NoZWNrY2hhaW5zJylcbiAgICB7XG4gICAgICAgIG1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRwcmVkX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIGxldCB0YWJsZV9tYXRjaCA9IG1ldHNpdGVfdGFibGVfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHBkYl9tYXRjaCA9IG1ldHNpdGVfcGRiX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIHJlc3VsdHNfZm91bmQubWV0c2l0ZSA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3RpbWVcIiwgJycpO1xuICAgICAgaWYodGFibGVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWV0c2l0ZScsIHppcCwgcmFjdGl2ZSk7XG5cbiAgICAgIH1cbiAgICAgIGlmKHBkYl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaHNwcmVkX2NoZWNrY2hhaW5zJylcbiAgICB7XG4gICAgICBoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc19wcmVkJylcbiAgICB7XG4gICAgICAgIHJlc3VsdHNfZm91bmQuaHNwcmVkID0gdHJ1ZTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhTUHJlZCBUYWJsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hzcHJlZCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzcGxpdF9wZGJfZmlsZXMnKVxuICAgIHtcbiAgICAgIGxldCBpbml0aWFsX21hdGNoID0gaHNwcmVkX2luaXRpYWxfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHNlY29uZF9tYXRjaCA9IGhzcHJlZF9zZWNvbmRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoaW5pdGlhbF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkluaXRpYWwgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfaW5pdGlhbF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmKHNlY29uZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuc2Vjb25kID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2Vjb25kIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY2hlY2tfcGRiX3RkYicpe1xuICAgICAgZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWFrZXRkYicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5nZW50ZGIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRkYi50ZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5UREIgRmlsZTwvYT4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgJzxoMz48YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNsaWNrIGhlcmUgdG8gZG93bmxvYWQgeW91ciBUREIgRmlsZTwvYT48L2gzPicpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtZW1iZWQnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQubWVtZW1iZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbWVtYmVkIFBEQiBmaWxlPC9hPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWVtZW1iZWRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKCEgcmVzdWx0c19mb3VuZFtqb2JfbmFtZV0pXG4gICAge1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3dhaXRpbmdfbWVzc2FnZVwiLCAnVGhlIGpvYiBjb21wbGV0ZWQgc3VjY2VzZnVsbHkgYnV0IG5vIHByZWRpY3Rpb24gd2FzIHBvc3NpYmxlIGZvciB0aGUgaW5wdXQgZGF0YS4gTm8gJytqb2JfbmFtZXNbam9iX25hbWVdKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZStcIl90aW1lXCIsICcnKTtcbiAgICB9XG4gIH0pO1xuICBpZighIHJlc3VsdHNfZm91bmQubWVtcGFjaylcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGgzPk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTwvaDM+Jyk7XG4gIH1cbiAgaWYobWV0c2l0ZV9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5tZXRzaXRlKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfbWVzc2FnZVwiLCAnV2UgY291bGQgbm90IGZpbmQgdGhlIFBEQiBDaGFpbiBJRCBwcm92aWRlZCcpO1xuXG4gIH1cbiAgaWYoaHNwcmVkX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLmhzcHJlZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnV2UgY291bGQgbm90IGZpbmQgdGhlIFBEQiBDaGFpbiBJRHMgcHJvdmlkZWQnKTtcbiAgfVxuICBpZihnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQuZ2VudGRiKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19tZXNzYWdlXCIsICdQREIgcHJvdmlkZWQgZGlkIG5vdCBjb250YWluIGEgc2luZ2xlIGNoYWluIGxhYmxlZCBhcyBjaGFpbiBBJyk7XG4gIH1cblxuXG4gIGlmKHJlc3VsdHNfZm91bmQuZG9tc2VyZilcbiAge1xuICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheV9zdHJ1Y3R1cmUodXJpLCBjc3NfaWQsIGNhcnRvb24pXG57XG4gIGxldCBtb2xfY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vbC1jb250YWluZXInKTtcbiAgZm9yKGxldCBjb250YWluZXIgb2YgbW9sX2NvbnRhaW5lcnMpXG4gIHtcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCI0MDBweFwiO1xuICB9XG4gIGxldCBjYXJ0b29uX2NvbG9yID0gZnVuY3Rpb24oYXRvbSkge1xuICAgIGlmKGF0b20uc3MgPT09ICdoJyl7cmV0dXJuICcjZTM1M2UzJzt9XG4gICAgaWYoYXRvbS5zcyA9PT0gJ3MnKXtyZXR1cm4gJyNlNWRkNTUnO31cbiAgICByZXR1cm4oJ2dyZXknKTtcbiAgfTtcbiAgbGV0IGhvdHNwb3RfY29sb3IgPSBmdW5jdGlvbihhdG9tKXtcbiAgICBpZihhdG9tLmIgPT0gMS4wKXtyZXR1cm4gJ3JlZCc7fVxuICAgIGlmKGF0b20uYiA9PSAwLjUpe3JldHVybiAnYmxhY2snO31cbiAgICBpZihhdG9tLmIgPT0gNTApe3JldHVybiAnd2hpdGUnO31cbiAgICBpZihhdG9tLmIgPT0gMTAwKXtyZXR1cm4gJ3JlZCc7fVxuICAgIHJldHVybihcImJsdWVcIik7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgaWYoY2FydG9vbilcbiAge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBlbHNlIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBob3RzcG90X2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgaWYoY3NzX2lkLnN0YXJ0c1dpdGgoJyNtZW1lbWJlZCcpKXtcbiAgICB2aWV3ZXIuYWRkU3VyZmFjZSgkM0Rtb2wuU3VyZmFjZVR5cGUuVkRXLCB7J29wYWNpdHknOjAuOCwgY29sb3JzY2hlbWU6ICd3aGl0ZUNhcmJvbid9LCB7aGV0ZmxhZzp0cnVlfSx7fSk7XG4gIH1cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2RvbXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cblxuICBpZignZGlzb3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1zYXRzdm0nIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGRvbXRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSl7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgICB9XG4gIH1cbiAgaWYoJ21lbXBhY2snIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suaGVhZGVyKTtcbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCk7XG4gICAgfVxuICAgIGlmKGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiTm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPGJyIC8+XCIpO1xuICAgIH1cbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Jpb3NlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZG9tc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2ZmcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2gpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRhcHNpY292JyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRzaXRlJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdoc3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGRiJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1lbWJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cblxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2FkdmFuY2VkX3BhcmFtcygpXG57XG4gIGxldCBvcHRpb25zX2RhdGEgPSB7fTtcbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBcIjAuMDFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSA1O1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlvc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZmcHJlZF9mbHlcIikuY2hlY2tlZClcbiAgICB7ICBvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiZmx5XCI7fVxuICAgIGVsc2VcbiAgICB7b3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImh1bWFuXCI7fVxuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJodW1hblwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IFwiQ2FcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gXCJDYVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9mcHJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBcIjVcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZStkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBcIkFCXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYWxnb3JpdGhtXCIpLnZhbHVlO1xuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYmFycmVsX3llc1wiKS5jaGVja2VkKXtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnVFJVRSc7XG4gICAgfWVsc2V7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ0ZBTFNFJztcbiAgICB9XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF90ZXJtaW5hbF9pblwiKS5jaGVja2VkKVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJpblwiO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcIm91dFwiO1xuICAgIH1cbiAgICAvL29wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JvdW5kYXJpZXNcIik7XG4gIH1cbiAgY2F0Y2goZXJyKVxuICB7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcImluXCI7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IDA7XG4gIH1cblxuICByZXR1cm4ob3B0aW9uc19kYXRhKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzIiwiaW1wb3J0IHsgZ2V0X21lbXNhdF9yYW5nZXMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2Vfc3MyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BiZGF0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2NvbWIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWVtc2F0ZGF0YSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wcmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BhcnNlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmVhdGNmZyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZnByZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21ldHNpdGUgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfaHNwcmVkIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSlcbntcbiAgLy9hbGVydChzZXEpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgZm9ybSBkYXRhXCIpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zb2xlLmxvZyhqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcImlucHV0X2RhdGFcIiwgZmlsZSwgJ2lucHV0LnR4dCcpO1xuICBmZC5hcHBlbmQoXCJqb2JcIixqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcInN1Ym1pc3Npb25fbmFtZVwiLG5hbWUpO1xuICBmZC5hcHBlbmQoXCJlbWFpbFwiLCBlbWFpbCk7XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdkb21wcmVkJykpe1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnbWV0c2l0ZScpKXtcbiAgZmQuYXBwZW5kKFwibWV0c2l0ZV9jaGVja2NoYWluc19jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbik7XG4gIGZkLmFwcGVuZChcImV4dHJhY3RfZmFzdGFfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfbWV0YWxcIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCk7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfbWV0YWxcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCk7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9mcHJcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIpO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2hzcHJlZCcpKXtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ21lbWVtYmVkJykpe1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF9hbGdvcml0aG1cIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSk7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2JhcnJlbFwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfdGVybWluaVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnZmZwcmVkJykpe1xuICBmZC5hcHBlbmQoXCJmZnByZWRfc2VsZWN0aW9uXCIsIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uKTtcbiAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gIH1cbiAgY29uc29sZS5sb2cob3B0aW9uc19kYXRhKTtcbiAgbGV0IHJlc3BvbnNlX2RhdGEgPSBzZW5kX3JlcXVlc3Qoc3VibWl0X3VybCwgXCJQT1NUXCIsIGZkKTtcbiAgaWYocmVzcG9uc2VfZGF0YSAhPT0gbnVsbClcbiAge1xuICAgIGxldCB0aW1lcyA9IHNlbmRfcmVxdWVzdCh0aW1lc191cmwsJ0dFVCcse30pO1xuICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkodGltZXMpKTtcbiAgICBpZihqb2JfbmFtZSBpbiB0aW1lcylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCgnbG9hZGluZ19tZXNzYWdlJywgbnVsbCk7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBqb2JfbmFtZXNbam9iX25hbWVdK1wiOiBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdsb2FkaW5nX21lc3NhZ2UnLCBudWxsKTtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdnZW50ZGInLCAnbWVtZW1iZWQnXS5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGxldCBjb3VudCA9IChmaWxlLm1hdGNoKC9Db25mL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIC8vY29uc29sZS5sb2coY291bnQpO1xuICAgICAgICBsZXQgcGFuZWxfaGVpZ2h0ID0gKCg2KjMwKSooY291bnQrMSkpKzEyMDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwYW5lbF9oZWlnaHQpO1xuICAgICAgICAvL2lmKHBhbmVsX2hlaWdodCA8IDQ1MCl7cGFuZWxfaGVpZ2h0ID0gNDUwO31cbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFuZWxfaGVpZ2h0KTtcbiAgICAgICAgYmlvZDMucHNpcHJlZChmaWxlLCAncHNpcHJlZENoYXJ0Jywge2RlYnVnOiB0cnVlLCBwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMiwgd2lkdGg6IDkwMCwgY29udGFpbmVyX3dpZHRoOiA5MDAsIGhlaWdodDogcGFuZWxfaGVpZ2h0LCBjb250YWluZXJfaGVpZ2h0OiBwYW5lbF9oZWlnaHR9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2RvbV9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGFyc2VkcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRmZWF0dXJlcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRwcmVkaWN0aW9ucycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZXRzaXRlJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2hzcHJlZCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKE1hdGguY2VpbChyZXNpZHVlcy5sZW5ndGgvNTApKTtcbiAgbGV0IHBhbmVsX2hlaWdodCA9ICgoTWF0aC5jZWlsKGFubm90YXRpb25zLmxlbmd0aC81MCkrMikqMjApKyg4KjIwKTtcbiAgaWYocGFuZWxfaGVpZ2h0IDwgMzAwKXtwYW5lbF9oZWlnaHQgPSAzMDA7fVxuICAvL2NvbnNvbGUubG9nKFwiSU5JVElBTCBIRUlHSFQ6IFwiK3BhbmVsX2hlaWdodCk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG59XG5cbi8vZ2l2ZW4gYSBVUkwgcmV0dXJuIHRoZSBhdHRhY2hlZCB2YXJpYWJsZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuICAgIGxldCB2YXJzID0ge307XG4gICAgLy9jb25zaWRlciB1c2luZyBsb2NhdGlvbi5zZWFyY2ggaW5zdGVhZCBoZXJlXG4gICAgbGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLFxuICAgIGZ1bmN0aW9uKG0sa2V5LHZhbHVlKSB7XG4gICAgICB2YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4vKiEgZ2V0RW1QaXhlbHMgIHwgQXV0aG9yOiBUeXNvbiBNYXRhbmljaCAoaHR0cDovL21hdGFuaWNoLmNvbSksIDIwMTMgfCBMaWNlbnNlOiBNSVQgKi9cbihmdW5jdGlvbiAoZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCkge1xuICAgIC8vIEVuYWJsZSBzdHJpY3QgbW9kZVxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRm9ybSB0aGUgc3R5bGUgb24gdGhlIGZseSB0byByZXN1bHQgaW4gc21hbGxlciBtaW5pZmllZCBmaWxlXG4gICAgbGV0IGltcG9ydGFudCA9IFwiIWltcG9ydGFudDtcIjtcbiAgICBsZXQgc3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlXCIgKyBpbXBvcnRhbnQgKyBcInZpc2liaWxpdHk6aGlkZGVuXCIgKyBpbXBvcnRhbnQgKyBcIndpZHRoOjFlbVwiICsgaW1wb3J0YW50ICsgXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQgKyBcInBhZGRpbmc6MFwiICsgaW1wb3J0YW50O1xuXG4gICAgd2luZG93LmdldEVtUGl4ZWxzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXh0cmFCb2R5O1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gRW11bGF0ZSB0aGUgZG9jdW1lbnRFbGVtZW50IHRvIGdldCByZW0gdmFsdWUgKGRvY3VtZW50RWxlbWVudCBkb2VzIG5vdCB3b3JrIGluIElFNi03KVxuICAgICAgICAgICAgZWxlbWVudCA9IGV4dHJhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO1xuICAgICAgICAgICAgZXh0cmFCb2R5LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudDtcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZXh0cmFCb2R5LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc3R5bGUgYSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBjbGllbnQgd2lkdGggb2YgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICBpZiAoZXh0cmFCb2R5KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dHJhIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGV4dHJhQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVtIHZhbHVlIGluIHBpeGVsc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0oZG9jdW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IHNldF9hZHZhbmNlZF9wYXJhbXMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNob3dfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgZGlzcGxheV9zdHJ1Y3R1cmUgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuXG52YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmNvcHlCdXR0b24nKTtcbnZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5jbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vIFNFVCBFTkRQT0lOVFMgRk9SIERFViwgU1RBR0lORyBPUiBQUk9EXG5sZXQgZW5kcG9pbnRzX3VybCA9IG51bGw7XG5sZXQgc3VibWl0X3VybCA9IG51bGw7XG5sZXQgdGltZXNfdXJsID0gbnVsbDtcbmxldCBnZWFyc19zdmcgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xubGV0IG1haW5fdXJsID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51a1wiO1xubGV0IGFwcF9wYXRoID0gXCIvcHNpcHJlZF9iZXRhXCI7XG5sZXQgZmlsZV91cmwgPSAnJztcbmxldCBnZWFyX3N0cmluZyA9ICc8b2JqZWN0IHdpZHRoPVwiMTQwXCIgaGVpZ2h0PVwiMTQwXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBkYXRhPVwiJytnZWFyc19zdmcrJ1wiPjwvb2JqZWN0Pic7XG5sZXQgam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLCBcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBzZXFfam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsXTtcbmxldCBzdHJ1Y3Rfam9iX2xpc3QgPSBbXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgam9iX25hbWVzID0ge1xuICAncHNpcHJlZCc6ICdQU0lQUkVEIFY0LjAnLFxuICAnZGlzb3ByZWQnOiAnRElPU1BSRUQgMycsXG4gICdtZW1zYXRzdm0nOiAnTUVNU0FULVNWTScsXG4gICdwZ2VudGhyZWFkZXInOiAncEdlblRIUkVBREVSJyxcbiAgJ21lbXBhY2snOiAnTUVNUEFDSycsXG4gICdnZW50aHJlYWRlcic6ICdHZW5USFJFQURFUicsXG4gICdkb21wcmVkJzogJ0RvbVByZWQnLFxuICAncGRvbXRocmVhZGVyJzogJ3BEb21USFJFQURFUicsXG4gICdiaW9zZXJmJzogJ0Jpb3NTZXJmIHYyLjAnLFxuICAnZG9tc2VyZic6ICdEb21TZXJmIHYyLjEnLFxuICAnZmZwcmVkJzogJ0ZGUHJlZCAzJyxcbiAgJ21ldGFwc2ljb3YnOiAnTWV0YVBTSUNPVicsXG4gICdtZXRzaXRlJzogJ01ldFNpdGUnLFxuICAnaHNwcmVkJzogJ0hTUHJlZCcsXG4gICdtZW1lbWJlZCc6ICdNRU1FTUJFRCcsXG4gICdnZW50ZGInOiAnR2VuZXJhdGUgVERCJyxcbn07XG5cbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKVxue1xuICBlbmRwb2ludHNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2pvYnRpbWVzLyc7XG4gIGFwcF9wYXRoID0gJy9pbnRlcmZhY2UnO1xuICBtYWluX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAnO1xuICBnZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG4gIGZpbGVfdXJsID0gbWFpbl91cmw7XG59XG5lbHNlIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImJpb2luZnN0YWdlMS5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSAgPT09IFwiYmlvaW5mLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhyZWYgID09PSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9cIikge1xuICBlbmRwb2ludHNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2pvYnRpbWVzLyc7XG4gIGZpbGVfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrXCIvYXBpXCI7XG4gIC8vZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xufVxuZWxzZSB7XG4gIGFsZXJ0KCdVTlNFVFRJTkcgRU5EUE9JTlRTIFdBUk5JTkcsIFdBUk5JTkchJyk7XG4gIGVuZHBvaW50c191cmwgPSAnJztcbiAgc3VibWl0X3VybCA9ICcnO1xuICB0aW1lc191cmwgPSAnJztcbn1cblxubGV0IGluaXRpYWxpc2F0aW9uX2RhdGEgPSB7XG4gICAgc2VxdWVuY2VfZm9ybV92aXNpYmxlOiAxLFxuICAgIHN0cnVjdHVyZV9mb3JtX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c192aXNpYmxlOiAxLFxuICAgIHJlc3VibWlzc2lvbl92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfcGFuZWxfdmlzaWJsZTogMSxcbiAgICBzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlOiAwLFxuICAgIHRpbWVfdmlzaWJsZTogMSxcbiAgICBiaW9zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXNlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tcHJlZF9hZHZhbmNlZDogMCxcbiAgICBmZnByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWV0c2l0ZV9hZHZhbmNlZDogMCxcbiAgICBoc3ByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWVtZW1iYWRfYWR2YW5jZWQ6IDAsXG4gICAgbW9kZWxsZXJfa2V5OiBudWxsLFxuICAgIGRvd25sb2FkX2xpbmtzOiAnJyxcbiAgICBlcnJvcl9tZXNzYWdlOiAnJyxcbiAgICBsb2FkaW5nX21lc3NhZ2U6ICdMb2FkaW5nIERhdGEnLFxuXG4gICAgcHNpcHJlZF9ob3JpejogbnVsbCxcbiAgICBkaXNvX3ByZWNpc2lvbjogbnVsbCxcbiAgICBtZW1zYXRzdm1fc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRzdm1fY2FydG9vbjogJycsXG4gICAgcGdlbl90YWJsZTogbnVsbCxcbiAgICBwZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIG1lbXNhdHBhY2tfc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRwYWNrX2NhcnRvb246ICcnLFxuICAgIGdlbl90YWJsZTogbnVsbCxcbiAgICBnZW5fYW5uX3NldDoge30sXG4gICAgcGFyc2Vkc19pbmZvOiBudWxsLFxuICAgIHBhcnNlZHNfcG5nOiBudWxsLFxuICAgIGRnZW5fdGFibGU6IG51bGwsXG4gICAgZGdlbl9hbm5fc2V0OiB7fSxcbiAgICBiaW9zZXJmX21vZGVsOiBudWxsLFxuICAgIGRvbXNlcmZfYnV0dG9uczogJycsXG4gICAgZG9tc2VyZl9tb2RlbF91cmlzOiBbXSxcbiAgICBmZnByZWRfY2FydG9vbjogbnVsbCxcbiAgICBzY2hfc2NoZW1hdGljOiBudWxsLFxuICAgIGFhX2NvbXBvc2l0aW9uOiBudWxsLFxuICAgIGdsb2JhbF9mZWF0dXJlczogbnVsbCxcbiAgICBmdW5jdGlvbl90YWJsZXM6IG51bGwsXG4gICAgbWV0YXBzaWNvdl9tYXA6IG51bGwsXG4gICAgbWV0c2l0ZV90YWJsZTogbnVsbCxcbiAgICBtZXRzaXRlX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfdGFibGU6IG51bGwsXG4gICAgaHNwcmVkX2luaXRpYWxfcGRiOiBudWxsLFxuICAgIGhzcHJlZF9zZWNvbmRfcGRiOiBudWxsLFxuICAgIHRkYl9maWxlOiBudWxsLFxuICAgIG1lbWVtYmVkX3BkYjogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19qb2InXSA9IGpvYl9uYW1lKydfam9iJztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZSddID0gJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+JztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbiddID0gZ2Vhcl9zdHJpbmc7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ190aW1lJ10gPSAnJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5wc2lwcmVkX2NoZWNrZWQgPSB0cnVlO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5tZW1lbWJlZF9hZHZhbmNlZCA9IDE7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnNlcXVlbmNlX2Zvcm1fdmlzaWJsZSA9IDA7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnN0cnVjdHVyZV9mb3JtX3Zpc2libGUgPSAxO1xuLy8gREVDTEFSRSBWQVJJQUJMRVMgYW5kIGluaXQgcmFjdGl2ZSBpbnN0YW5jZVxudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gIGVsOiAnI3BzaXByZWRfc2l0ZScsXG4gIHRlbXBsYXRlOiAnI2Zvcm1fdGVtcGxhdGUnLFxuICBkYXRhOiBpbml0aWFsaXNhdGlvbl9kYXRhLFxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG5cbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgc2VxX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICB9XG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdCk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG4gICAgICAkKCcucHJvY2Vzc2luZycpLnJlbW92ZSgpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3RpbWVfdmlzaWJsZScsIDApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2xvYWRpbmdfbWVzc2FnZScsIG51bGwpO1xuXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdFcnJvcicgfHwgYmF0Y2guc3RhdGUgPT09ICdDcmFzaCcpXG4gICAge1xuICAgICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgbnVsbCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19pY29uJywgbnVsbCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ190aW1lJywgbnVsbCk7XG4gICAgICB9KTtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBsZXQgZXJyb3JfdGV4dCA9IFwiPGgzPlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWQ8L2gzPlwiK1xuICAgICAgXCI8aDQ+UGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGUgZXJyb3IgbWVzc2FnZSBhbmQgam9iIElEOlwiK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykrXCI8L2g0PlwiK1xuICAgICAgXCI8aDU+RXJyb3IgTWVzc2FnZTo8YnIgLz5cIitzdWJtaXNzaW9uX21lc3NhZ2UrXCI8L2g1PlwiO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Vycm9yX21lc3NhZ2UnLCBlcnJvcl90ZXh0KTtcbiAgICAgICQoJy5wcm9jZXNzaW5nJykucmVtb3ZlKCk7XG4gICAgICByYWN0aXZlLnNldCgndGltZV92aXNpYmxlJywgMCk7XG4gICAgICByYWN0aXZlLnNldCgnbG9hZGluZ19tZXNzYWdlJywgbnVsbCk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0sIDUwMDApO1xuXG59LHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfVxuKTtcblxuLy8gT24gY2xpY2tpbmcgdGhlIEdldCBaaXAgZmlsZSBsaW5rIHRoaXMgd2F0Y2hlcnMgcHJlcGFyZXMgdGhlIHppcCBhbmQgaGFuZHMgaXQgdG8gdGhlIHVzZXJcbnJhY3RpdmUub24oJ2dldF96aXAnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGxldCB1dWlkID0gcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTpcImJsb2JcIn0pLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgc2F2ZUFzKGJsb2IsIHV1aWQrXCIuemlwXCIpO1xuICAgIH0pO1xufSk7XG5cbnJhY3RpdmUub24oJ3Nob3dfYmlvc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnYmlvc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXNlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21wcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21wcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZmZwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdmZnByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWV0c2l0ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2hzcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnaHNwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21lbWVtYmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbi8vIFRoZXNlIHJlYWN0IHRvIHRoZSBoZWFkZXJzIGJlaW5nIGNsaWNrZWQgdG8gdG9nZ2xlIHRoZSBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdzZXF1ZW5jZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIGxldCBzZXR0aW5nID0gZmFsc2U7XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BzaXByZWQnKXtzZXR0aW5nID0gdHJ1ZTt9XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgc2V0dGluZyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ3N0cnVjdHVyZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBmYWxzZSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHNob3dfcGFuZWwoMSwgcmFjdGl2ZSk7XG59KTtcblxuLy9yZWdpc3RlciBsaXN0ZW5lcnMgZm9yIGVhY2ggcmVzdWx0cyBwYW5lbFxuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSwgaSl7XG4gIGNvbnNvbGUubG9nKFwiYWRkaW5nIGpvYnMgd2F0Y2hlcnNcIik7XG4gIHJhY3RpdmUub24oam9iX25hbWUrJ19hY3RpdmUnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICBzaG93X3BhbmVsKGkrMiwgcmFjdGl2ZSk7XG4gICAgaWYoam9iX25hbWUgPT09IFwicHNpcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gXCJkaXNvcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfbW9kZWwnKSl7XG4gICAgICAgIGlmKHJhY3RpdmUuZ2V0KCdiaW9zZXJmX21vZGVsJykubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IGJpb3NlcmZfbW9kZWwgPSByYWN0aXZlLmdldCgnYmlvc2VyZl9tb2RlbCcpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGJpb3NlcmZfbW9kZWwsICcjYmlvc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpKXtcbiAgICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpLmxlbmd0aClcbiAgICAgICAge1xuICAgICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZXRzaXRlJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKSl7XG4gICAgICAgIGlmKHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpLmxlbmd0aClcbiAgICAgICAge1xuICAgICAgICAgIGxldCBtZXRfcGRiID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJyk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUobWV0X3BkYiwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnaHNwcmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJykpe1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbGV0IGluaXRpYWxfcGRiID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicpO1xuICAgICAgICBsZXQgc2Vjb25kX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfc2Vjb25kX3BkYicpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShpbml0aWFsX3BkYiwgJyNoc3ByZWRfaW5pdGlhbF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoc2Vjb25kX3BkYiwgICcjaHNwcmVkX3NlY29uZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH19XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWVtZW1iZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgICBsZXQgbWVtZW1iZWRfcGRiID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX3BkYicpO1xuICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUobWVtZW1iZWRfcGRiLCAnI21lbWVtYmVkX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHxqb2JfbmFtZSA9PT0gJ2dlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH1cblxuICB9KTtcblxufSk7XG5cbnJhY3RpdmUub24oJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgY29uc29sZS5sb2coXCJTVUJNSVNTSU9OIEFDVElWRVwiKTtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcblxuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIGxldCBzZXFfY291bnQgPSBzZXEuc3BsaXQoXCI+XCIpLmxlbmd0aDtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL14+LiskL21nLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXFxufFxccy9nLFwiXCIpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHNlcSk7XG5cbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgbGV0IGNoZWNrX3N0YXRlcyA9IHt9O1xuICBsZXQgc3RydWN0X3R5cGUgPSBmYWxzZTtcbiAgbGV0IHNlcV90eXBlID0gZmFsc2U7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc3RydWN0X2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzdHJ1Y3RfdHlwZSA9IHRydWU7XG4gICAgfVxuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzZXFfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHNlcV90eXBlID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHNldF9hZHZhbmNlZF9wYXJhbXMoKTtcbiAgLy9IQU5ETEUgRkZQUkVEIEpPQiBTRUxFQ1RJT04uXG4gIGlmKGNoZWNrX3N0YXRlcy5iaW9zZXJmX2NoZWNrZWQgfHwgY2hlY2tfc3RhdGVzLmRvbXNlcmZfY2hlY2tlZClcbiAge1xuICAgIGxldCBiaW9zX21vZGVsbGVyX3Rlc3QgPSB0ZXN0X21vZGVsbGVyX2tleShvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkpO1xuICAgIGxldCBkb21zX21vZGVsbGVyX3Rlc3QgPSB0ZXN0X21vZGVsbGVyX2tleShvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkpO1xuICAgIGlmKGJpb3NfbW9kZWxsZXJfdGVzdCB8fCBkb21zX21vZGVsbGVyX3Rlc3QpXG4gICAge1xuICAgICAgc3VibWl0X2pvYiA9dHJ1ZTtcbiAgfVxuICAgIGVsc2V7XG4gICAgICBhbGVydChcIllvdSBoYXZlIG5vdCBwcm92aWRlZCBhIHZhbGlkIE1PREVMTEVSIGtleS4gQ29udGFjdCB0aGUgU2FsaSBsYWIgZm9yIGEgTU9ERUxMRVIgbGljZW5jZS5cIik7XG4gICAgfVxuICB9XG4gIGVsc2V7XG4gICAgc3VibWl0X2pvYj10cnVlO1xuICB9XG4gIGlmKHNlcV90eXBlICYmIHN0cnVjdF90eXBlKVxuICB7XG4gICAgYWxlcnQoXCJZb3UgY2FuIG5vdCBzdWJtaXQgYm90aCBzZXF1ZW5jZSBhbmQgc3RydWN0dXJlIGFuYWx5c2lzIGpvYnNcIik7XG4gICAgc3VibWl0X2pvYiA9IGZhbHNlO1xuICB9XG4gIGlmKHNlcV9jb3VudCA+IDEpXG4gIHtcbiAgICBhbGVydChcIk1TQSBJbnB1dCBmb3JiaWRkZW5cIik7XG4gICAgc3VibWl0X2pvYj1mYWxzZTtcbiAgfVxuICBpZihzdWJtaXRfam9iKVxuICB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nXCIpO1xuICAgIGlmKHNlcV90eXBlKVxuICAgIHtcbiAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgfVxuICAgIGlmKHN0cnVjdF90eXBlKVxuICAgIHtcbiAgICAgIGxldCBwZGJGaWxlID0gbnVsbDtcbiAgICAgIGxldCBwZGJEYXRhID0gJyc7XG4gICAgICB0cnl7XG4gICAgICAgcGRiRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGRiRmlsZVwiKTtcbiAgICAgICBsZXQgZmlsZSA9IHBkYkZpbGUuZmlsZXNbMF07XG4gICAgICAgbGV0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcGRiRGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgcGRiRGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgcGRiRGF0YSA9IFwiXCI7XG4gICAgICAgIGlmKGVyci5tZXNzYWdlLmluY2x1ZGVzKFwiRmlsZVJlYWRlci5yZWFkQXNUZXh0IGlzIG5vdCBhbiBvYmplY3RcIikpe1xuICAgICAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHNlbGVjdGVkIGEgUERCIGZpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgUmVzdWJtaXNzaW9uIHdpZGdldCwgdHJ1bmNhdGUgdGhlIHNlcXVlbmNlXG4vLyBhbmQgc2VuZCBhIG5ldyBqb2JcbnJhY3RpdmUub24oJ3Jlc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1Jlc3VibWl0dGluZyBzZWdtZW50Jyk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCBhcHBfcGF0aCtcIi9cIik7XG4gIGxldCBzdGFydCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RhcnRcIik7XG4gIGxldCBzdG9wID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdG9wXCIpO1xuICBsZXQgc2VxdWVuY2UgPSByYWN0aXZlLmdldChcInNlcXVlbmNlXCIpO1xuICBsZXQgc3Vic2VxdWVuY2UgPSBzZXF1ZW5jZS5zdWJzdHJpbmcoc3RhcnQtMSwgc3RvcCk7XG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKStcIl9zZWdcIjtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHN1YnNlcXVlbmNlKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCBuYW1lKTtcbiAgbGV0IGNoZWNrX3N0YXRlcyA9IHt9O1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gIH0pO1xuICAvL2NsZWFyIHdoYXQgd2UgaGF2ZSBwcmV2aW91c2x5IHdyaXR0ZW5cbiAgY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHppcCk7XG4gIC8vdmVyaWZ5IGZvcm0gY29udGVudHMgYW5kIHBvc3RcbiAgLy9hZGQgZm9ybSBkZWZhdWx0cyBidXQgbnVsbCB0aGUgc3RydWN0ZXMgb25lcyBhcyB3ZSBkb24ndCBhbGxvdyBzdHJ1Y3R1cmUgam9iIHJlc3VibWlzc2lvblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzdWJzZXF1ZW5jZSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHRydWUsIGZhbHNlKTtcbiAgLy93cml0ZSBuZXcgYW5ub3RhdGlvbiBkaWFncmFtXG4gIC8vc3VibWl0IHN1YnNlY3Rpb25cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0X21vZGVsbGVyX2tleShpbnB1dClcbntcbiAgaWYoaW5wdXQgPT09ICdNT0RFTElSQU5KRScpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgcmV0dXJuKGZhbHNlKTtcbn1cblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBsZXQgc2VxX3R5cGUgPSB0cnVlO1xuICAvLyBjb25zb2xlLmxvZyhwcmV2aW91c19kYXRhLmpvYnMpO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0YXBzaWNvdicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXBhY2snKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDYpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNyk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSAmJiAhIHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMSk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2ZmcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAzICk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnaHNwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMyApO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMyApO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTcpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDMgKTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgaWYoc2VxX3R5cGUpXG4gIHtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICB9XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgZXJyb3JfbWVzc2FnZT1cIkFSR1wiO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zZXFfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoc3RydWN0X3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc3RydWN0X2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChqb2JfbmFtZStcIixcIik7XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkaXNvcHJlZCcgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnZG9tcHJlZCcgfHwgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnIHx8IGpvYl9uYW1lID09PSAnZG9tc2VyZicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZ2VudGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBkb210aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBkYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSk7XG4gICAgLy9zZXQgdmlzaWJpbGl0eSBhbmQgcmVuZGVyIHBhbmVsIG9uY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYl9saXN0Lmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGxldCBqb2JfbmFtZSA9IGpvYl9saXN0W2ldO1xuICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlICYmIHJlc3BvbnNlIClcbiAgICAgIHtcbiAgICAgICAgaWYoW1wibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdLmluY2x1ZGVzKGpvYl9uYW1lKSl7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAzICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgfVxuICAgICAgICByYWN0aXZlLmZpcmUoIGpvYl9uYW1lKydfYWN0aXZlJyApO1xuICAgICAgICBpZihzZXFfdHlwZSl7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1Ym1pc3Npb25fdmlzaWJsZScsIDEgKTtcbiAgICAgICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoISByZXNwb25zZSl7d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjt9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9zdHJ1Y3RfZm9ybShzdHJ1Y3QsIGpvYl9uYW1lLCBlbWFpbCwgY2hlY2tlZF9hcnJheSlcbntcbiAgbGV0IGVycm9yX21lc3NhZ2UgPSBcIlwiO1xuICBpZighIC9eW1xceDAwLVxceDdGXSskLy50ZXN0KGpvYl9uYW1lKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJQbGVhc2UgcmVzdHJpY3QgSm9iIE5hbWVzIHRvIHZhbGlkIGxldHRlcnMgbnVtYmVycyBhbmQgYmFzaWMgcHVuY3R1YXRpb248YnIgLz5cIjtcbiAgfVxuICAvLyBUT0RPOiBvbmUgZGF5IHdlIHNob3VsZCBsZXQgdGhlc2Ugc2VydmljZXMgdGFrZSB4bWwgcGRiIGZpbGVzXG4gIC8vIGlmKCEgL15IRUFERVJ8XkFUT01cXHMrXFxkKy9pLnRlc3Qoc3RydWN0KSl7XG4gIGlmKCEgL0FUT01cXHMrXFxkKy9pLnRlc3Qoc3RydWN0KSl7XG4gICAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBmaWxlIGRvZXMgbm90IGxvb2sgbGlrZSBhIHBsYWluIHRleHQgYXNjaWkgcGRiIGZpbGUuIFRoaXMgc2VydmljZSBkb2VzIG5vdCBhY2NlcHQgLmd6IG9yIHhtbCBmb3JtYXQgcGRiIGZpbGVzXCI7XG4gIH1cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cbi8vVGFrZXMgdGhlIGZvcm0gZWxlbWVudHMgYW5kIGNoZWNrcyB0aGV5IGFyZSB2YWxpZFxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9zZXFfZm9ybShzZXEsIGpvYl9uYW1lLCBlbWFpbCwgY2hlY2tlZF9hcnJheSlcbntcbiAgbGV0IGVycm9yX21lc3NhZ2UgPSBcIlwiO1xuICBpZighIC9eW1xceDAwLVxceDdGXSskLy50ZXN0KGpvYl9uYW1lKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJQbGVhc2UgcmVzdHJpY3QgSm9iIE5hbWVzIHRvIHZhbGlkIGxldHRlcnMgbnVtYmVycyBhbmQgYmFzaWMgcHVuY3R1YXRpb248YnIgLz5cIjtcbiAgfVxuXG4gIC8qIGxlbmd0aCBjaGVja3MgKi9cbiAgaWYoc2VxLmxlbmd0aCA+IDE1MDApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gbG9uZyB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cbiAgaWYoc2VxLmxlbmd0aCA8IDMwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIHNob3J0IHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuXG4gIC8qIG51Y2xlb3RpZGUgY2hlY2tzICovXG4gIGxldCBudWNsZW90aWRlX2NvdW50ID0gKHNlcS5tYXRjaCgvQXxUfEN8R3xVfE58YXx0fGN8Z3x1fG4vZyl8fFtdKS5sZW5ndGg7XG4gIGlmKChudWNsZW90aWRlX2NvdW50L3NlcS5sZW5ndGgpID4gMC45NSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGFwcGVhcnMgdG8gYmUgbnVjbGVvdGlkZSBzZXF1ZW5jZS4gVGhpcyBzZXJ2aWNlIHJlcXVpcmVzIHByb3RlaW4gc2VxdWVuY2UgYXMgaW5wdXQ8YnIgLz5cIjtcbiAgfVxuICBpZigvW15BQ0RFRkdISUtMTU5QUVJTVFZXWVhfLV0rL2kudGVzdChzZXEpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzPGJyIC8+XCI7XG4gIH1cblxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG5cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==