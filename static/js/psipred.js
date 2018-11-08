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
    'pageLength': 50,
    'order': [[3, 'desc']]
  });
  $('#mf_table').DataTable({
    'searching': false,
    'pageLength': 50,
    'order': [[3, 'desc']]
  });
  $('#cc_table').DataTable({
    'searching': false,
    'pageLength': 50,
    'order': [[3, 'desc']]
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
    ractive.set(job_name + '_time', 'Loading Data');
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
        // downloads_info.memsatsvm = {};
        // downloads_info.memsatsvm.header = "<h5>"+job_names.memsatsvm+" DOWNLOADS</h5>";
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
      ractive.set(job_name + '_time', job_names[job_name] + " jobs typically take " + times[job_name] + " seconds");
    } else {
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
  initialisation_data[job_name + '_waiting_time'] = 'Loading Data';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYzMDRiZDUwMWJkZTFiOTRjOTYiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCIkIiwiRGF0YVRhYmxlIiwicGFyc2VfbWV0c2l0ZSIsIm1ldHNpdGVfdGFibGUiLCJoaXRfcmVnZXgiLCJoaXRfbWF0Y2hlcyIsIm1hdGNoIiwicGFyc2VfZmZwcmVkcyIsImJwX2RhdGEiLCJtZl9kYXRhIiwiY2NfZGF0YSIsInRhYmxlX2RhdGEiLCJzdGFydHNXaXRoIiwicHVzaCIsImNsYXNzX2NvbG91ciIsInNldF9hYW5vcm0iLCJoQUFfbm9ybSIsIkEiLCJ2YWwiLCJzZGUiLCJWIiwiWSIsIlciLCJUIiwiUyIsIlAiLCJGIiwiTSIsIksiLCJMIiwiSSIsIkgiLCJHIiwiUSIsIkUiLCJDIiwiRCIsIk4iLCJSIiwic2V0X2Zub3JtIiwiaEZfbm9ybSIsImh5ZHJvcGhvYmljaXR5IiwiY2hhcmdlIiwiZ2V0X2FhX2NvbG9yIiwiYWJfdmFsIiwiTWF0aCIsImFicyIsInBhcnNlX2ZlYXRjZmciLCJTRl9kYXRhIiwiQUFfZGF0YSIsImNvbHVtbnMiLCJnbG9iYWxfZmVhdHVyZXMiLCJnZXQiLCJmZWF0X3RhYmxlIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJmZWF0dXJlX25hbWUiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImFhX2NvbXBvc2l0aW9uIiwiYWFfdGFibGUiLCJyZXNpZHVlIiwiZ2V0X21lbXNhdF9yYW5nZXMiLCJyZWdleCIsImRhdGEiLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwicmVnaW9uIiwicGFyc2VJbnQiLCJzZWciLCJwYXJzZV9zczIiLCJhbm5vdGF0aW9ucyIsInNoaWZ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsInNzIiwicGFuZWxfaGVpZ2h0IiwiY2VpbCIsImJpb2QzIiwiYW5ub3RhdGlvbkdyaWQiLCJwYXJlbnQiLCJtYXJnaW5fc2NhbGVyIiwiZGVidWciLCJjb250YWluZXJfd2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhaW5lcl9oZWlnaHQiLCJhbGVydCIsInBhcnNlX3BiZGF0IiwiZGlzb3ByZWQiLCJwYXJzZV9jb21iIiwicHJlY2lzaW9uIiwicG9zIiwiZ2VuZXJpY3h5TGluZUNoYXJ0IiwiY2hhcnRUeXBlIiwieV9jdXRvZmYiLCJwYXJzZV9tZW1zYXRkYXRhIiwic2VxIiwidG9wb19yZWdpb25zIiwic2lnbmFsX3JlZ2lvbnMiLCJyZWVudHJhbnRfcmVnaW9ucyIsInRlcm1pbmFsIiwiY29pbF90eXBlIiwidG1wX2Fubm8iLCJBcnJheSIsInByZXZfZW5kIiwiZmlsbCIsImFubm8iLCJtZW1zYXQiLCJwYXJzZV9wcmVzdWx0IiwidHlwZSIsImFubl9saXN0IiwicHNldWRvX3RhYmxlIiwidGFibGVfaGl0IiwidG9Mb3dlckNhc2UiLCJwZGIiLCJzdWJzdHJpbmciLCJhbG4iLCJhbm4iLCJwYXJzZV9wYXJzZWRzIiwicHJlZGljdGlvbl9yZWdleCIsInByZWRpY3Rpb25fbWF0Y2giLCJkZXRhaWxzIiwicmVwbGFjZSIsInZhbHVlcyIsImluZGV4T2YiLCJ2YWx1ZSIsImRvbXByZWQiLCJzaG93X3BhbmVsIiwiY2xlYXJfc2V0dGluZ3MiLCJnZWFyX3N0cmluZyIsImpvYl9saXN0Iiwiam9iX25hbWVzIiwiemlwIiwiam9iX25hbWUiLCJjbGVhclNlbGVjdGlvbiIsIkpTWmlwIiwicHJlcGFyZV9kb3dubG9hZHNfaHRtbCIsImRvd25sb2Fkc19pbmZvIiwiaGVhZGVyIiwicHNpcHJlZCIsIm1lbXNhdHN2bSIsInBnZW50aHJlYWRlciIsImJpb3NlcmYiLCJwZG9tdGhyZWFkZXIiLCJkb21zZXJmIiwiZmZwcmVkIiwiaGFuZGxlX3Jlc3VsdHMiLCJmaWxlX3VybCIsImhvcml6X3JlZ2V4Iiwic3MyX3JlZ2V4IiwicG5nX3JlZ2V4IiwibWVtc2F0X2NhcnRvb25fcmVnZXgiLCJtZW1zYXRfc2NoZW1hdGljX3JlZ2V4IiwibWVtc2F0X2RhdGFfcmVnZXgiLCJtZW1wYWNrX2NhcnRvb25fcmVnZXgiLCJtZW1wYWNrX2dyYXBoX291dCIsIm1lbXBhY2tfY29udGFjdF9yZXMiLCJtZW1wYWNrX2xpcGlkX3JlcyIsImRvbXNzZWFfcHJlZF9yZWdleCIsImRvbXNzZWFfcmVnZXgiLCJkb21zZXJmX3JlZ2V4IiwiZmZwcmVkX3NjaF9yZWdleCIsImZmcHJlZF9zdm1fcmVnZXgiLCJmZnByZWRfc2NoZW1hdGljX3JlZ2V4IiwiZmZwcmVkX3RtX3JlZ2V4IiwiZmZwcmVkX2ZlYXRjZmdfcmVnZXgiLCJmZnByZWRfcHJlZHNfcmVnZXgiLCJtZXRhcHNpY292X2V2X3JlZ2V4IiwibWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXgiLCJtZXRhcHNpY292X2NjbXByZWRfcmVnZXgiLCJtZXRzaXRlX3RhYmxlX3JlZ2V4IiwibWV0c2l0ZV9wZGJfcmVnZXgiLCJoc3ByZWRfaW5pdGlhbF9yZWdleCIsImhzcHJlZF9zZWNvbmRfcmVnZXgiLCJpbWFnZV9yZWdleCIsInJlc3VsdHMiLCJkb21haW5fY291bnQiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4iLCJoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiIsImdlbnRkYl9jaGVja2NoYWluc19zZWVuIiwicmVzdWx0c19mb3VuZCIsIm1ldGFwc2ljb3YiLCJtZW1wYWNrIiwiZ2VudGhyZWFkZXIiLCJtZXRzaXRlIiwiaHNwcmVkIiwibWVtZW1iZWQiLCJnZW50ZGIiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzX2ZpbGUiLCJob3JpeiIsInNzMl9tYXRjaCIsInNzMiIsInBiZGF0IiwiY29tYiIsInNjaGVtZV9tYXRjaCIsInNjaGVtYXRpYyIsImNhcnRvb25fbWF0Y2giLCJjYXJ0b29uIiwibWVtc2F0X21hdGNoIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0Iiwia2V5X2ZpZWxkcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImZpZWxkIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidGFibGUiLCJhbGlnbiIsInBuZ19tYXRjaCIsImJvdW5kYXJ5X3BuZyIsImJvdW5kYXJ5IiwicHJlZF9tYXRjaCIsImRvbXNzZWFwcmVkIiwiZG9tc3NlYV9tYXRjaCIsImRvbXNzZWEiLCJtb2RlbCIsImRpc3BsYXlfc3RydWN0dXJlIiwiaGhibGl0cyIsInBkYmFhIiwiY2F0aGJsYXN0IiwicGRiYmxhc3QiLCJkb21zZXJmX21hdGNoIiwiYnV0dG9uc190YWdzIiwicGF0aHMiLCJzY2hfbWF0Y2giLCJzY2giLCJmZWF0X21hdGNoIiwiZmVhdHVyZXMiLCJwcmVkc19tYXRjaCIsInByZWRzIiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJpbml0aWFsX21hdGNoIiwic2Vjb25kX21hdGNoIiwiaW5pdGlhbCIsInNlY29uZCIsInRkYiIsInVyaSIsImNzc19pZCIsIm1vbF9jb250YWluZXJzIiwiY29udGFpbmVyIiwiY2FydG9vbl9jb2xvciIsImF0b20iLCJob3RzcG90X2NvbG9yIiwiYiIsImVsZW1lbnQiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2aWV3ZXIiLCIkM0Rtb2wiLCJjcmVhdGVWaWV3ZXIiLCJnZXRfdGV4dCIsImFkZE1vZGVsIiwic2V0U3R5bGUiLCJjb2xvcmZ1bmMiLCJhZGRTdXJmYWNlIiwiU3VyZmFjZVR5cGUiLCJWRFciLCJjb2xvcnNjaGVtZSIsImhldGZsYWciLCJ6b29tVG8iLCJyZW5kZXIiLCJ6b29tIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZXRfYWR2YW5jZWRfcGFyYW1zIiwib3B0aW9uc19kYXRhIiwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImVyciIsInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyIsImJpb3NlcmZfbW9kZWxsZXJfa2V5IiwiZG9tc2VyZl9tb2RlbGxlcl9rZXkiLCJjaGVja2VkIiwiZmZwcmVkX3NlbGVjdGlvbiIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4iLCJleHRyYWN0X2Zhc3RhX2NoYWluIiwic2VlZFNpdGVGaW5kX2NoYWluIiwibWV0cHJlZF93cmFwcGVyX2NoYWluIiwic2VlZFNpdGVGaW5kX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX2ZwciIsImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMiLCJoc19wcmVkX2ZpcnN0X2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluIiwiaHNfcHJlZF9zZWNvbmRfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluIiwibWVtZW1iZWRfYWxnb3JpdGhtIiwibWVtZW1iZWRfYmFycmVsIiwibWVtZW1iZWRfdGVybWluaSIsInNlbmRfcmVxdWVzdCIsInVybCIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiYWpheCIsImNhY2hlIiwiY29udGVudFR5cGUiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJzZW5kX2pvYiIsImVtYWlsIiwic3VibWl0X3VybCIsInRpbWVzX3VybCIsIkJsb2IiLCJlIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlX2RhdGEiLCJ0aW1lcyIsImsiLCJmaXJlIiwiZ2V0X3ByZXZpb3VzX2RhdGEiLCJ1dWlkIiwic3VibWlzc2lvbl9yZXNwb25zZSIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsImNvdW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwic2VxX2pvYl9saXN0Iiwic3RydWN0X2pvYl9saXN0IiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VibWlzc2lvbl92aXNpYmxlIiwicmVzdWx0c19wYW5lbF92aXNpYmxlIiwic3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZSIsImJpb3NlcmZfYWR2YW5jZWQiLCJkb21zZXJmX2FkdmFuY2VkIiwiZG9tcHJlZF9hZHZhbmNlZCIsImZmcHJlZF9hZHZhbmNlZCIsIm1ldHNpdGVfYWR2YW5jZWQiLCJoc3ByZWRfYWR2YW5jZWQiLCJtZW1lbWJhZF9hZHZhbmNlZCIsIm1vZGVsbGVyX2tleSIsImRvd25sb2FkX2xpbmtzIiwiZXJyb3JfbWVzc2FnZSIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfbWFwIiwibWV0c2l0ZV9wZGIiLCJoc3ByZWRfaW5pdGlhbF9wZGIiLCJoc3ByZWRfc2Vjb25kX3BkYiIsInRkYl9maWxlIiwibWVtZW1iZWRfcGRiIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJwc2lwcmVkX2NoZWNrZWQiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJzZXFfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsInJlbW92ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJlcnJvcl90ZXh0IiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50IiwiYWR2Iiwic2V0dGluZyIsIm1ldF9wZGIiLCJpbml0aWFsX3BkYiIsInNlY29uZF9wZGIiLCJzdWJtaXRfam9iIiwic2VxX2NvdW50IiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJzdHJ1Y3RfdHlwZSIsImJpb3NlcmZfY2hlY2tlZCIsImRvbXNlcmZfY2hlY2tlZCIsImJpb3NfbW9kZWxsZXJfdGVzdCIsInRlc3RfbW9kZWxsZXJfa2V5IiwiZG9tc19tb2RlbGxlcl90ZXN0IiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJwZGJGaWxlIiwicGRiRGF0YSIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsInJlc3VsdCIsIm1lc3NhZ2UiLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJpbnB1dCIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJzd2FwRG9tc2VyZiIsInVyaV9udW1iZXIiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9zZXFfZm9ybSIsInZlcmlmeV9zdHJ1Y3RfZm9ybSIsInBnZW50aHJlYWRlcl9jaGVja2VkIiwicGRvbXRocmVhZGVyX2NoZWNrZWQiLCJzdHJ1Y3QiLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRU8sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLElBQS9CLEVBQ1A7QUFDRSxNQUFJQyxlQUFlLDZOQUFuQjtBQUNBQSxrQkFBZ0IsdUpBQWhCO0FBQ0FBLGtCQUFnQiw2S0FBaEI7QUFDQUEsa0JBQWdCLHlMQUFoQjtBQUNBLE1BQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQUQsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFJQyxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0EsUUFBR0ksUUFBUUMsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QlAsc0JBQWdCLGFBQVdNLFFBQVEsQ0FBUixDQUFYLEdBQXNCLFdBQXRCLEdBQWtDQSxRQUFRLENB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QWhCLEVBQ0E7QUFDRThaLG9CQUFnQkEsZ0JBQWdCLDRDQUFoQztBQUNEO0FBQ0QsTUFBR3pULElBQUlyRyxNQUFKLEdBQWEsRUFBaEIsRUFDQTtBQUNFOFosb0JBQWdCQSxnQkFBZ0IsNkNBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJeUgsbUJBQW1CLENBQUNsYixJQUFJN0YsS0FBSixDQUFVLDBCQUFWLEtBQXVDLEVBQXhDLEVBQTRDUixNQUFuRTtBQUNBLE1BQUl1aEIsbUJBQWlCbGIsSUFBSXJHLE1BQXRCLEdBQWdDLElBQW5DLEVBQ0E7QUFDRThaLG9CQUFnQkEsZ0JBQWdCLHdHQUFoQztBQUNEO0FBQ0QsTUFBRywrQkFBK0J3SCxJQUEvQixDQUFvQ2piLEdBQXBDLENBQUgsRUFDQTtBQUNFeVQsb0JBQWdCQSxnQkFBZ0IsaURBQWhDO0FBQ0Q7O0FBRUQsTUFBRyxpR0FBQW5ELENBQVUsSUFBVixFQUFnQjBLLGFBQWhCLE1BQW1DLEtBQXRDLEVBQTZDO0FBQzNDdkgsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7O0FBRUQsU0FBT0EsYUFBUDtBQUNELEMiLCJmaWxlIjoicHNpcHJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNjMwNGJkNTAxYmRlMWI5NGM5NiIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZV9oc3ByZWQocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGhzcHJlZF90YWJsZSA9ICc8YnIgLz48aDM+S2V5PC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0hvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiNmZmZmZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24tSG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1pbnRlcmZhY2UgcmVzaWR1ZTwvdGQ+PC90cj48L3RhYmxlPjxiciAvPjxiciAvPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPGgzPlJlc2lkdWUgUHJlZGljdGlvbnM8L2gzPjx0YWJsZSBpZD1cImhzcHJlZF90YWJsZVwiIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPjx0aGVhZD48dHI+PHRoPkNoYWluL1Jlc2lkdWU8L3RoPjx0aD5SZXNpZHVlIElkZW50aXR5PC90aD48dGg+U2NvcmU8L3RoPjwvdGhlYWQ+PHRib2R5Pic7XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAzKXtcbiAgICAgIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9XG4gIH0pO1xuICBoc3ByZWRfdGFibGUgKz0gJzwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGFibGUnLCBoc3ByZWRfdGFibGUpO1xuICAkKCcjaHNwcmVkX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgJ3BhZ2VMZW5ndGgnOiA1MCxcbiAgICAnb3JkZXInOiBbWzIsICdkZXNjJ10sXVxuICB9KTtcbn1cblxuLy8gcGFyc2UgdGhlIHNtYWxsIG1ldHNpdGUgb3V0cHV0IHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbWV0c2l0ZV90YWJsZSA9ICc8YnIgLz48aDM+S2V5PC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO01ldGFsIEJpbmRpbmcgQ29udGFjdDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Q2hhaW4gbm90IHByZWRpY3RlZDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7UHJlZGljdGVkIGNoYWluPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPGgzPlJlc2lkdWUgUHJlZGljdGlvbnM8L2gzPjx0YWJsZSBpZD1cIm1ldHNpdGVfdGFibGVcIiBjbGFzcz1cInRhYmxlIHNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj48dGhlYWQ+PHRyPjx0aD5SZXNpZHVlIE51bWJlcjwvdGg+PHRoPlJhdyBOZXVyYWwgTmV0d29yayBTY29yZTwvdGg+PHRoPlJlc2lkdWU8L3RoPjx0aGVhZD48dGJvZHk+JztcbiAgbGV0IGhpdF9yZWdleCA9IC9cXGQrXFxzLis/XFxzXFx3ezN9XFxkKy9nO1xuICBsZXQgaGl0X21hdGNoZXMgPSBmaWxlLm1hdGNoKGhpdF9yZWdleCk7XG4gIGlmKGhpdF9tYXRjaGVzKVxuICB7XG4gICAgaGl0X21hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzLyk7XG4gICAgICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH0pO1xuICB9XG4gIG1ldHNpdGVfdGFibGUgKz0gJzwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbWV0c2l0ZV90YWJsZSk7XG4gICQoJyNtZXRzaXRlX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgJ3BhZ2VMZW5ndGgnOiAxMCxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZnByZWRzKHJhY3RpdmUsIGZpbGUpe1xuXG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgYnBfZGF0YSA9IFtdO1xuICBsZXQgbWZfZGF0YSA9IFtdO1xuICBsZXQgY2NfZGF0YSA9IFtdO1xuICBsZXQgdGFibGVfZGF0YSA9ICcnO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aCgnIycpKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgaWYoZW50cmllcy5sZW5ndGggPCA0KXtyZXR1cm47fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdCUCcpe2JwX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0NDJyl7Y2NfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnTUYnKXttZl9kYXRhLnB1c2goZW50cmllcyk7fVxuICB9KTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+QmlvbG9naWNhbCBQcm9jZXNzIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlIGlkPSdicF90YWJsZScgY2xhc3M9J3RhYmxlIHNtYWxsLXRhYmxlIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZSc+PHRoZWFkPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPjwvdGhlYWQ+PHRib2R5PlwiO1xuICBicF9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPk1vbGVjdWxhciBGdW5jdGlvbiBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZSBpZD0nbWZfdGFibGUnIGNsYXNzPSd0YWJsZSBzbWFsbC10YWJsZSB0YWJsZS1ib3JkZXJlZCBnZW4tdGFibGUnPjx0aGVhZD48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj48L3RoZWFkPjx0Ym9keT5cIjtcbiAgbWZfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3Rib2R5Pjx0Zm9vdD48L3Rmb290PjwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGUgaWQ9J2NjX3RhYmxlJyBjbGFzcz0ndGFibGUgc21hbGwtdGFibGUgdGFibGUtYm9yZGVyZWQgZ2VuLXRhYmxlJz48dGhlYWQ+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+PC90aGVhZD48dGJvZHk+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PC90YWJsZT48YnIgLz4nO1xuICB0YWJsZV9kYXRhICs9ICdUaGVzZSBwcmVkaWN0aW9uIHRlcm1zIHJlcHJlc2VudCB0ZXJtcyBwcmVkaWN0ZWQgd2hlcmUgU1ZNIHRyYWluaW5nIGluY2x1ZGVzIGFzc2lnbmVkIEdPIHRlcm1zIGFjcm9zcyBhbGwgZXZpZGVuY2UgY29kZSB0eXBlcy4gU1ZNIHJlbGlhYmlsaXR5IGlzIHJlZ2FyZGVkIGFzIEhpZ2ggKEgpIHdoZW4gTUNDLCBzZW5zaXRpdml0eSwgc3BlY2lmaWNpdHkgYW5kIHByZWNpc2lvbiBhcmUgam9pbnRseSBhYm92ZSBhIGdpdmVuIHRocmVzaG9sZC4gb3RoZXJ3aXNlIFJlbGlhYmlsaXR5IGlzIGluZGljYXRlZCBhcyBMb3cgKEwpLiA8YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG4gICQoJyNicF90YWJsZScpLkRhdGFUYWJsZSh7XG4gICAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgICAncGFnZUxlbmd0aCc6IDUwLFxuICAgICAgJ29yZGVyJzogW1szLCAnZGVzYyddLF1cbiAgICB9KTtcbiAgJCgnI21mX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgJ3BhZ2VMZW5ndGgnOiA1MCxcbiAgICAnb3JkZXInOiBbWzMsICdkZXNjJ10sXVxuICB9KTtcbiAgJCgnI2NjX3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAnc2VhcmNoaW5nJyAgIDogZmFsc2UsXG4gICAgJ3BhZ2VMZW5ndGgnOiA1MCxcbiAgICAnb3JkZXInOiBbWzMsICdkZXNjJ10sXVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0X2Fhbm9ybSgpe1xuICBsZXQgaEFBX25vcm0gPSB7fTtcbiAgaEFBX25vcm0uQSA9IHsgdmFsOiAwLjA3MTc4MzI0ODAwNjMwOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNzM2NzY2MTUyNDI3NX07XG4gIGhBQV9ub3JtLlYgPSB7IHZhbDogMC4wNTk2MjQ1OTUzNjk5MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAzNzc3OTE1Mjg3NDV9O1xuICBoQUFfbm9ybS5ZID0geyB2YWw6IDAuMDI2MDc1MDY4MjQwNDM3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE0ODIyNDcxNTMxMzc5fTtcbiAgaEFBX25vcm0uVyA9IHsgdmFsOiAwLjAxNDE2NjAwMjYxMjc3MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMDQ3MTgzNTgwMTk5Nn07XG4gIGhBQV9ub3JtLlQgPSB7IHZhbDogMC4wNTI1OTM1ODI5NzI3MTQsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAwOTQ3OTM5NjQ1OTd9O1xuICBoQUFfbm9ybS5TID0geyB2YWw6IDAuMDgyMTIzMjQxMzMyMDk5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI4Njg3NTY2MDgxNTEyfTtcbiAgaEFBX25vcm0uUCA9IHsgdmFsOiAwLjA2NTU1NzUzMTMyMjI0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzNDIzOTM5ODQ5NjczNn07XG4gIGhBQV9ub3JtLkYgPSB7IHZhbDogMC4wMzcxMDM5OTQ5NjkwMDIsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg1NDM0MjMxMzkxODZ9O1xuICBoQUFfbm9ybS5NID0geyB2YWw6IDAuMDIyNTYyODE4MTgzOTU1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDExMzIxMDM5NjYyNDgxfTtcbiAgaEFBX25vcm0uSyA9IHsgdmFsOiAwLjA1NDgzMzk3OTI2OTE4NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyOTI2NDA4MzY2NzE1N307XG4gIGhBQV9ub3JtLkwgPSB7IHZhbDogMC4xMDAxMDU5MTU3NTkwNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDI3NjgwODUxOTAwOX07XG4gIGhBQV9ub3JtLkkgPSB7IHZhbDogMC4wNDIwMzQ1MjYwNDA0NjcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjY4NDkyNjI0OTV9O1xuICBoQUFfbm9ybS5IID0geyB2YWw6IDAuMDI3MTQxNDAzNTM3NTk4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE1NTA1NjYzNzg5ODV9O1xuICBoQUFfbm9ybS5HID0geyB2YWw6IDAuMDY5MTc5ODIwMTA0NTM2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMDg3NTYyMDU3MzI4fTtcbiAgaEFBX25vcm0uUSA9IHsgdmFsOiAwLjA2NTkyMDU2MTkzMTgwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDEwMzA5MTAwODM2Nn07XG4gIGhBQV9ub3JtLkUgPSB7IHZhbDogMC4wNDY0Nzg0NjIyNTgzOCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxOTk0NjI2OTQ2MTczNn07XG4gIGhBQV9ub3JtLkMgPSB7IHZhbDogMC4wMjQ5MDg1NTE4NzIwNTYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjI5MDk1ODk1MDR9O1xuICBoQUFfbm9ybS5EID0geyB2YWw6IDAuMDQ0MzM3OTA0NzI2MDQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NDM2Njc3MjU2NzI2fTtcbiAgaEFBX25vcm0uTiA9IHsgdmFsOiAwLjAzMzUwNzAyMDk4NzAzMyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNjUzNjAyMjI4ODIwNH07XG4gIGhBQV9ub3JtLlIgPSB7IHZhbDogMC4wNTk3NDA0NjkwMzExOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNTE2NTk5NDc3MzM4NH07XG4gIHJldHVybihoQUFfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIHNldF9mbm9ybSgpe1xuICBsZXQgaEZfbm9ybSA9IHt9O1xuICBoRl9ub3JtLmh5ZHJvcGhvYmljaXR5ID0ge3ZhbDogLTAuMzQ4NzY4MjgwODAxNTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAwLjc1NTU5MTUyNzY5Nzk5fTtcbiAgaEZfbm9ybVsncGVyY2VudCBwb3NpdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuNDU3NzE3NDY2OTQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzLjU2NzEzMzM0MTEzOX07XG4gIGhGX25vcm1bJ2FsaXBoYXRpYyBpbmRleCddID0ge3ZhbDogNzkuOTExNTQ5MzE5MDk5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDE2Ljc4NzYxNzk3ODgyN307XG4gIGhGX25vcm1bJ2lzb2VsZWN0cmljIHBvaW50J10gPSB7dmFsOiA3LjYxMDIwNDYzODM2MDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxLjk3MTYxMTEwMjAwODh9O1xuICBoRl9ub3JtWydtb2xlY3VsYXIgd2VpZ2h0J10gPSB7dmFsOiA0ODY2OC40MTI4Mzk5NjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM3ODM4LjMyNDg5NTk2OX07XG4gIGhGX25vcm0uY2hhcmdlID0ge3ZhbDogNS4wOTkxNzYzMDU3NjA0LFxuICAgICAgICAgICAgICAgICAgICBzZGU6IDE2LjgzODYzNjU5MDI1fTtcbiAgaEZfbm9ybVsncGVyY2VudCBuZWdhdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuMDI2MTkwMTI4MTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiA0LjAyMDY2MzE2ODA5MjZ9O1xuICBoRl9ub3JtWydtb2xhciBleHRpbmN0aW9uIGNvZWZmaWNpZW50J10gPSB7dmFsOiA0NjQ3NS4yOTM5MjM5MjYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM5Mjk5LjM5OTg0ODgyM307XG4gIHJldHVybihoRl9ub3JtKTtcbn1cblxuZnVuY3Rpb24gZ2V0X2FhX2NvbG9yKHZhbCl7XG4gICAgbGV0IGFiX3ZhbCA9IE1hdGguYWJzKHZhbCk7XG4gICAgaWYoYWJfdmFsID49IDIuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjFuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDIuMjQpe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYycFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMm5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWY1cFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmNW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS42NDUgKSB7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjEwcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMTBuXCI7XG4gICAgfVxuICAgIHJldHVybiBcInBsYWluXCI7XG59XG5cbi8vcGFyc2UgdGhlIGZmcHJlZCBmZWF0Y2ZvIGZlYXR1cmVzIGZpbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZWF0Y2ZnKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgU0ZfZGF0YSA9IHt9O1xuICBsZXQgQUFfZGF0YSA9IHt9O1xuICBsZXQgaEZfbm9ybSA9c2V0X2Zub3JtKCk7XG4gIGxldCBoQUFfbm9ybT1zZXRfYWFub3JtKCk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiQUFcIikpe1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIEFBX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJTRlwiKSlcbiAgICB7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgU0ZfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICB9KTtcblxuICAvLyBidWlsZCBodG1sIHRhYmxlcyBmb3IgdGhlIGZlYXR1cmUgZGF0YVxuICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gIGxldCBnbG9iYWxfZmVhdHVyZXMgPSByYWN0aXZlLmdldCgnZ2xvYmFsX2ZlYXR1cmVzJyk7XG4gIGxldCBmZWF0X3RhYmxlID0gJzxiPkdsb2JhbCBGZWF0dXJlczwvYj48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICdHbG9iYWwgZmVhdHVyZXMgYXJlIGNhbGN1bGF0ZWQgZGlyZWN0bHkgZnJvbSBzZXF1ZW5jZS4gTG9jYWxpc2F0aW9uIHZhbHVlcyBhcmUgcHJlZGljdGVkIGJ5IHRoZSBQc29ydCBhbGdvcml0aG0gYW5kIHJlZmxlY3QgdGhlIHJlbGF0aXZlIGxpa2VsaWhvb2Qgb2YgdGhlIHByb3RlaW4gb2NjdXB5aW5nIGRpZmZlcmVudCBjZWxsdWxhciBsb2NhbGlzYXRpb25zLiBUaGUgYmlhcyBjb2x1bW4gaXMgaGlnaGxpZ2h0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzaWduaWZpY2FuY2Ugb2YgdGhlIGZlYXR1cmUgdmFsdWUgY2FsY3VsYXRlZCBmcm9tIFogc2NvcmUgb2YgdGhlIGZlYXR1cmUuPGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnPHRhYmxlIGFsaWduPVwiY2VudGVyXCIgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIGZmcHJlZC10YWJsZVwiPjx0cj48dGg+RmVhdHVyZSBOYW1lPC90aD48dGg+VmFsdWU8L3RoPjx0aD5CaWFzPC90aD48L3RyPic7XG5cbiAgT2JqZWN0LmtleXMoU0ZfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZV9uYW1lKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgaWYoZmVhdHVyZV9uYW1lIGluIGhGX25vcm0pe1xuICAgICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKCAocGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLWhGX25vcm1bZmVhdHVyZV9uYW1lXS52YWwpIC8gaEZfbm9ybVtmZWF0dXJlX25hbWVdLnNkZSk7XG4gICAgfVxuICAgIGZlYXRfdGFibGUgKz0gJzx0cj48dGQ+JytmZWF0dXJlX25hbWUrJzwvdGQ+PHRkPicrcGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLnRvRml4ZWQoMikrJzwvdGQ+PHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+PC90cj4nO1xuICB9KTtcbiAgZmVhdF90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgZmVhdF90YWJsZSk7XG5cbiAgLy9idWlsZCBodG1sIHRhYmxlIGZvciB0aGUgQUEgZGF0YVxuICBsZXQgYWFfY29tcG9zaXRpb24gPSByYWN0aXZlLmdldCgnYWFfY29tcG9zaXRpb24nKTtcbiAgbGV0IGFhX3RhYmxlID0gJzxiPkFtaW5vIEFjaWQgQ29tcG9zaXRpb24gKHBlcmNlbnRhZ2VzKTwvYj48YnIgLz4nO1xuXG4gIGFhX3RhYmxlICs9ICc8dGFibGUgd2lkdGg9XCI1MCVcIiBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgZmZwcmVkLXRhYmxlXCIgYWxpZ249XCJjZW50ZXJcIiA+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGFhX3RhYmxlICs9ICc8dGggd2lkdGg9XCI1JVwiPicrcmVzaWR1ZSsnPC90aD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSktaEFBX25vcm1bcmVzaWR1ZV0udmFsKSAvIGhBQV9ub3JtW3Jlc2lkdWVdLnNkZSk7XG4gICAgYWFfdGFibGUgKz0gJzx0ZCB3aWR0aD1cIjUlIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPicrKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSkqMTAwKS50b0ZpeGVkKDIpKyc8L3RkPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48L3RhYmxlPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8Yj5TaWduaWZpY2FuY2UgS2V5PC9iPjxiciAvPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGUgd2lkdGg9XCI1MCVcIiBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgZmZwcmVkLXRhYmxlXCIgYWxpZ249XCJjZW50ZXJcIj4nO1xuICBhYV90YWJsZSArPSAnPHRoZWFkPjx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRoIHdpZHRoPVwiOSVcIiBhbGlnbj1cImxlZnRcIj48Yj5sb3c8L2I+PC90aD4nO1xuICBhYV90YWJsZSArPSAnPHRoIGNvbHNwYW49XCI5XCI+Jm5ic3A7PC90aD4nO1xuICBhYV90YWJsZSArPSAnPHRoIHdpZHRoPVwiOSVcIiBhbGlnbj1cInJpZ2h0XCI+PGI+aGlnaDwvYj48L3RoPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGhlYWQ+JztcbiAgYWFfdGFibGUgKz0gJzx0Ym9keT48dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxblwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMm5cIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVuXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMG5cIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPnAgJmd0Oz0gMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBwXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVwXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYycFwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMXBcIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD4mbmJzcDwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+PC90Ym9keT4nO1xuICBhYV90YWJsZSArPSAnPHRmb290Pjx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCIxMVwiPlNpZ25pZmljYW5jZSBwIHZhbHVlIGlzIGNhbGN1bGF0ZWQgdXNpbmcgdGhlIFogc2NvcmUgb2YgdGhlIHBlcmNlbnQgYW1pbm8gYWNpZCBjb21wb3NpdGlvbjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+PHRmb290Pic7XG4gIGFhX3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIGFhX3RhYmxlKTtcbn1cblxuXG4vLyBmb3IgYSBnaXZlbiBtZW1zYXQgZGF0YSBmaWxlcyBleHRyYWN0IGNvb3JkaW5hdGUgcmFuZ2VzIGdpdmVuIHNvbWUgcmVnZXhcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbWVtc2F0X3JhbmdlcyhyZWdleCwgZGF0YSlcbntcbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCcsJykpXG4gICAge1xuICAgICAgbGV0IHJlZ2lvbnMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbiwgaSl7XG4gICAgICAgIHJlZ2lvbnNbaV0gPSByZWdpb24uc3BsaXQoJy0nKTtcbiAgICAgICAgcmVnaW9uc1tpXVswXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMF0pO1xuICAgICAgICByZWdpb25zW2ldWzFdID0gcGFyc2VJbnQocmVnaW9uc1tpXVsxXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZihtYXRjaFsxXS5pbmNsdWRlcygnLScpKVxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hbMV0pO1xuICAgICAgICBsZXQgc2VnID0gbWF0Y2hbMV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbW10sIF07XG4gICAgICAgIHJlZ2lvbnNbMF1bMF0gPSBwYXJzZUludChzZWdbMF0pO1xuICAgICAgICByZWdpb25zWzBdWzFdID0gcGFyc2VJbnQoc2VnWzFdKTtcbiAgICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4obWF0Y2hbMV0pO1xufVxuXG4vLyB0YWtlIGFuZCBzczIgKGZpbGUpIGFuZCBwYXJzZSB0aGUgZGV0YWlscyBhbmQgd3JpdGUgdGhlIG5ldyBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGFubm90YXRpb25zW2ldLnNzID0gZW50cmllc1szXTtcbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgbGV0IHBhbmVsX2hlaWdodCA9ICgoTWF0aC5jZWlsKGFubm90YXRpb25zLmxlbmd0aC81MCkrMikqMjApKyg4KjIwKTtcbiAgICAgIGlmKHBhbmVsX2hlaWdodCA8IDMwMCl7cGFuZWxfaGVpZ2h0ID0gMzAwO31cbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGxldCBwYW5lbF9oZWlnaHQgPSAoKE1hdGguY2VpbChhbm5vdGF0aW9ucy5sZW5ndGgvNTApKzIpKjIwKSsoOCoyMCk7XG4gICAgICBpZihwYW5lbF9oZWlnaHQgPCAzMDApe3BhbmVsX2hlaWdodCA9IDMwMDt9XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiBwYW5lbF9oZWlnaHQsIGNvbnRhaW5lcl9oZWlnaHQ6IHBhbmVsX2hlaWdodH0pO1xuICAgIH1cbn1cblxuLy9wYXJzZSB0aGUgZGlzb3ByZWQgY29tYiBmaWxlIGFuZCBhZGQgaXQgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWNpc2lvbiA9IFtdO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgcHJlY2lzaW9uW2ldID0ge307XG4gICAgcHJlY2lzaW9uW2ldLnBvcyA9IGVudHJpZXNbMV07XG4gICAgcHJlY2lzaW9uW2ldLnByZWNpc2lvbiA9IGVudHJpZXNbNF07XG4gIH0pO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nLCBwcmVjaXNpb24pO1xuICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocHJlY2lzaW9uLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbi8vcGFyc2UgdGhlIG1lbXNhdCBvdXRwdXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIC8vY29uc29sZS5sb2coZmlsZSk7XG4gIGxldCB0b3BvX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvVG9wb2xvZ3k6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCBzaWduYWxfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9TaWduYWxcXHNwZXB0aWRlOlxccysoLispXFxuLywgZmlsZSk7XG4gIGxldCByZWVudHJhbnRfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9SZS1lbnRyYW50XFxzaGVsaWNlczpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHRlcm1pbmFsID0gZ2V0X21lbXNhdF9yYW5nZXMoL04tdGVybWluYWw6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIC8vY29uc29sZS5sb2coc2lnbmFsX3JlZ2lvbnMpO1xuICAvLyBjb25zb2xlLmxvZyhyZWVudHJhbnRfcmVnaW9ucyk7XG4gIGxldCBjb2lsX3R5cGUgPSAnQ1knO1xuICBpZih0ZXJtaW5hbCA9PT0gJ291dCcpXG4gIHtcbiAgICBjb2lsX3R5cGUgPSAnRUMnO1xuICB9XG4gIGxldCB0bXBfYW5ubyA9IG5ldyBBcnJheShzZXEubGVuZ3RoKTtcbiAgaWYodG9wb19yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpXG4gIHtcbiAgICBsZXQgcHJldl9lbmQgPSAwO1xuICAgIHRvcG9fcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1RNJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgICBpZihwcmV2X2VuZCA+IDApe3ByZXZfZW5kIC09IDE7fVxuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQsIHJlZ2lvblswXSk7XG4gICAgICBpZihjb2lsX3R5cGUgPT09ICdFQycpeyBjb2lsX3R5cGUgPSAnQ1knO31lbHNle2NvaWxfdHlwZSA9ICdFQyc7fVxuICAgICAgcHJldl9lbmQgPSByZWdpb25bMV0rMjtcbiAgICB9KTtcbiAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZC0xLCBzZXEubGVuZ3RoKTtcblxuICB9XG4gIC8vc2lnbmFsX3JlZ2lvbnMgPSBbWzcwLDgzXSwgWzEwMiwxMTddXTtcbiAgaWYoc2lnbmFsX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgc2lnbmFsX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdTJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgLy9yZWVudHJhbnRfcmVnaW9ucyA9IFtbNDAsNTBdLCBbMjAwLDIxOF1dO1xuICBpZihyZWVudHJhbnRfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICByZWVudHJhbnRfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1JIJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgdG1wX2Fubm8uZm9yRWFjaChmdW5jdGlvbihhbm5vLCBpKXtcbiAgICBhbm5vdGF0aW9uc1tpXS5tZW1zYXQgPSBhbm5vO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBsZXQgcGFuZWxfaGVpZ2h0ID0gKChNYXRoLmNlaWwoYW5ub3RhdGlvbnMubGVuZ3RoLzUwKSsyKSoyMCkrKDgqMjApO1xuICBpZihwYW5lbF9oZWlnaHQgPCAzMDApe3BhbmVsX2hlaWdodCA9IDMwMDt9XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgaWQ9XCInK3R5cGUrJ190YWJsZVwiIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCBnZW4tdGFibGVcIj48dGhlYWQ+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TQ09QPC90aD4nO1xuICB9ZWxzZSB7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEg8L3RoPic7XG4gIH1cbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UERCU1VNPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbGlnbm1lbnQ8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk1PREVMPC90aD4nO1xuXG4gIC8vIGlmIE1PREVMTEVSIFRISU5HWVxuICBwc2V1ZG9fdGFibGUgKz0gJzwvdHI+PC90aGVhZD48dGJvZHlcIj5cXG4nO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIC8vY29uc29sZS5sb2cobGluZSk7XG4gICAgaWYobGluZS5sZW5ndGggPT09IDApe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgbGV0IHRhYmxlX2hpdCA9IGVudHJpZXNbOV07XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgdGFibGVfaGl0ID0gZW50cmllc1sxMV07fVxuICAgIGlmKHRhYmxlX2hpdCtcIl9cIitpIGluIGFubl9saXN0KVxuICAgIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkIGNsYXNzPSdcIitlbnRyaWVzWzBdLnRvTG93ZXJDYXNlKCkrXCInPlwiK2VudHJpZXNbMF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzFdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1syXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbM10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzRdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s1XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzddK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s4XStcIjwvdGQ+XCI7XG4gICAgbGV0IHBkYiA9IGVudHJpZXNbOV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbOV0ubGVuZ3RoLTIpO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHBkYiA9IGVudHJpZXNbMTFdLnN1YnN0cmluZygwLCBlbnRyaWVzWzExXS5sZW5ndGgtMyk7fVxuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s5XStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxMF0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3ZlcnNpb24vbGF0ZXN0L2RvbWFpbi9cIit0YWJsZV9oaXQrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J1ZpZXcnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJjYXRoX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vcGRiL1wiK3BkYitcIic+U0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J1ZpZXcnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJwZGJfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PHRmb290PjwvdGZvb3Q+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICAkKCcjJyt0eXBlKydfdGFibGUnKS5EYXRhVGFibGUoe1xuICAgICdzZWFyY2hpbmcnICAgOiBmYWxzZSxcbiAgICAncGFnZUxlbmd0aCc6IDUwLFxuICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICAgIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgXCI8aDM+Tm8gZ29vZCBoaXRzIGZvdW5kLiBHVUVTUyBhbmQgTE9XIGNvbmZpZGVuY2UgaGl0cyBjYW4gYmUgZm91bmQgaW4gdGhlIHJlc3VsdHMgZmlsZTwvaDM+XCIpO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWRpY3Rpb25fcmVnZXggPSAvRG9tYWluXFxzQm91bmRhcnlcXHNsb2NhdGlvbnNcXHNwcmVkaWN0ZWRcXHNEUFM6XFxzKC4rKS87XG4gIGxldCBwcmVkaWN0aW9uX21hdGNoID0gIHByZWRpY3Rpb25fcmVnZXguZXhlYyhmaWxlKTtcbiAgaWYocHJlZGljdGlvbl9tYXRjaClcbiAge1xuICAgIGxldCBkZXRhaWxzID0gZmlsZS5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgZGV0YWlscyA9IGRldGFpbHMucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiPGg0PlwiK2RldGFpbHMrXCI8L2g0PlwiKTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgaWYocHJlZGljdGlvbl9tYXRjaFsxXS5pbmRleE9mKFwiLFwiKSlcbiAgICB7XG4gICAgICB2YWx1ZXMgPSBwcmVkaWN0aW9uX21hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaSl7XG4gICAgICAgIHZhbHVlc1tpXSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQocHJlZGljdGlvbl9tYXRjaFsxXSk7XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBhbm5vdGF0aW9uc1t2YWx1ZV0uZG9tcHJlZCA9ICdCJztcbiAgICB9KTtcbiAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCJObyBQYXJzZURTIERvbWFpbiBib3VuZGFyaWVzIHByZWRpY3RlZFwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF90ZXh0IH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd19wYW5lbCh2YWx1ZSwgcmFjdGl2ZSlcbntcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgdmFsdWUgKTtcbn1cblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzLCB6aXApe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMSk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgJycpO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJycpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19pbmZvJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZGdlbl90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZGdlbl9hbm5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9tb2RlbCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b25zJywgJycpO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9tb2RlbF91cmlzOicsIFtdKTtcbiAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWM6JywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfbWFwJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCd0ZGJfZmlsZScsIG51bGwpO1xuXG5cbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLG51bGwpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnNlcXVlbmNlX3Bsb3QnKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5wc2lwcmVkX2NhcnRvb24nKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5jb21iX3Bsb3QnKTtcblxuICB6aXAgPSBuZXcgSlNaaXAoKTtcbn1cblxuLy9UYWtlIGEgY291cGxlIG9mIHZhcmlhYmxlcyBhbmQgcHJlcGFyZSB0aGUgaHRtbCBzdHJpbmdzIGZvciB0aGUgZG93bmxvYWRzIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcylcbntcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoZGF0YS5qb2JfbmFtZSA9PT0gam9iX25hbWUpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdID0ge307XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgLy9FWFRSQSBQQU5FTFMgRk9SIFNPTUUgSk9CUyBUWVBFUzpcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnICB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAnZmZwcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnIHx8IGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucGdlbnRocmVhZGVyK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuYmlvc2VyZitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIC8vIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICAvLyBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICAvLyBkb3dubG9hZHNfaW5mby5kaXNvcHJlZCA9IHt9O1xuICAgICAgICAvLyBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZGlzb3ByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZmZwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy90YWtlIHRoZSBkYXRhYmxvYiB3ZSd2ZSBnb3QgYW5kIGxvb3Agb3ZlciB0aGUgcmVzdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMsIGpvYl9saXN0KVxue1xuICBsZXQgaG9yaXpfcmVnZXggPSAvXFwuaG9yaXokLztcbiAgbGV0IHNzMl9yZWdleCA9IC9cXC5zczIkLztcbiAgbGV0IHBuZ19yZWdleCA9IC9cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9jYXJ0b29uX3JlZ2V4ID0gL19jYXJ0b29uX21lbXNhdF9zdm1cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXggPSAvX3NjaGVtYXRpY1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2RhdGFfcmVnZXggPSAvbWVtc2F0X3N2bSQvO1xuICBsZXQgbWVtcGFja19jYXJ0b29uX3JlZ2V4ID0gL0thbWFkYS1LYXdhaV9cXGQrLnBuZyQvO1xuICBsZXQgbWVtcGFja19ncmFwaF9vdXQgPSAvaW5wdXRfZ3JhcGgub3V0JC87XG4gIGxldCBtZW1wYWNrX2NvbnRhY3RfcmVzID0gL0NPTlRBQ1RfREVGMS5yZXN1bHRzJC87XG4gIGxldCBtZW1wYWNrX2xpcGlkX3JlcyA9IC9MSVBJRF9FWFBPU1VSRS5yZXN1bHRzJC87XG4gIGxldCBkb21zc2VhX3ByZWRfcmVnZXggPSAvXFwucHJlZCQvO1xuICBsZXQgZG9tc3NlYV9yZWdleCA9IC9cXC5kb21zc2VhJC87XG4gIGxldCBkb21zZXJmX3JlZ2V4ID0gLy4rXyhcXGQrKV8oXFxkKykuKlxcLnBkYi87XG4gIGxldCBmZnByZWRfc2NoX3JlZ2V4ID0gLy4rX3NjaFxcLnBuZy87XG4gIC8vbGV0IGZmcHJlZF9zdm1fcmVnZXggPSAvLitfY2FydG9vbl9tZW1zYXRfc3ZtXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zdm1fcmVnZXggPSAvLitfdG1cXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtXFwucG5nLztcbiAgbGV0IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4ID0gL1xcLmZlYXRjZmcvO1xuICBsZXQgZmZwcmVkX3ByZWRzX3JlZ2V4ID0gL1xcLmZ1bGxfcmF3LztcbiAgbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gIGxldCBtZXRzaXRlX3RhYmxlX3JlZ2V4ID0gL1xcLk1ldHByZWQvO1xuICBsZXQgbWV0c2l0ZV9wZGJfcmVnZXggPSAvXFwuTWV0UHJlZC87XG4gIGxldCBoc3ByZWRfaW5pdGlhbF9yZWdleCA9IC9faW5pdGlhbFxcLnBkYi87XG4gIGxldCBoc3ByZWRfc2Vjb25kX3JlZ2V4ID0gL19zZWNvbmRcXC5wZGIvO1xuXG4gIGxldCBpbWFnZV9yZWdleCA9ICcnO1xuICBsZXQgcmVzdWx0cyA9IGRhdGEucmVzdWx0cztcbiAgbGV0IGRvbWFpbl9jb3VudCA9IDA7XG4gIGxldCBtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IGhzcHJlZF9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCBnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgcmVzdWx0c19mb3VuZCA9IHtcbiAgICAgIHBzaXByZWQ6IGZhbHNlLFxuICAgICAgZGlzb3ByZWQ6IGZhbHNlLFxuICAgICAgbWVtc2F0c3ZtOiBmYWxzZSxcbiAgICAgIHBnZW50aHJlYWRlcjogZmFsc2UsXG4gICAgICBtZXRhcHNpY292OiBmYWxzZSxcbiAgICAgIG1lbXBhY2s6IGZhbHNlLFxuICAgICAgZ2VudGhyZWFkZXI6IGZhbHNlLFxuICAgICAgZG9tcHJlZDogZmFsc2UsXG4gICAgICBwZG9tdGhyZWFkZXI6IGZhbHNlLFxuICAgICAgYmlvc2VyZjogZmFsc2UsXG4gICAgICBkb21zZXJmOiBmYWxzZSxcbiAgICAgIGZmcHJlZDogZmFsc2UsXG4gICAgICBtZXRzaXRlOiBmYWxzZSxcbiAgICAgIGhzcHJlZDogZmFsc2UsXG4gICAgICBtZW1lbWJlZDogZmFsc2UsXG4gICAgICBnZW50ZGI6IGZhbHNlLFxuICB9O1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcblxuICAvL1ByZXBhdG9yeSBsb29wIGZvciBpbmZvcm1hdGlvbiB0aGF0IGlzIG5lZWRlZCBiZWZvcmUgcmVzdWx0cyBwYXJzaW5nOlxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX2dlbmFsaWdubWVudF9hbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uX2RvbScpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAvL21haW4gcmVzdWx0cyBwYXJzaW5nIGxvb3BcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIC8vcHNpcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT0gJ3BzaXBhc3MyJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLnBzaXByZWQgPSB0cnVlO1xuICAgICAgbGV0IG1hdGNoID0gaG9yaXpfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaG9yaXonLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3JpeiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhvcml6IEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcblxuICAgICAgfVxuICAgICAgbGV0IHNzMl9tYXRjaCA9IHNzMl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzczJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U1MyIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdzczInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL2Rpc29wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fZm9ybWF0JylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BiZGF0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJlc3VsdHNfZm91bmQuZGlzb3ByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QQkRBVCBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19jb21iaW5lJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2NvbWInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNPTUIgTk4gT3V0cHV0PC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9tZW1zYXQgYW5kIG1lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtc2F0c3ZtJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1lbXNhdHN2bSA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHNjaGVtZV9tYXRjaCA9IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoZW1lX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TY2hlbWF0aWMgRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSBtZW1zYXRfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IG1lbXNhdF9tYXRjaCA9IG1lbXNhdF9kYXRhX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1lbXNhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21lbXNhdGRhdGEnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXBhY2tfd3JhcHBlcicpXG4gICAge1xuICAgICAgLy9yZXN1bHRzX2ZvdW5kLm1lbXBhY2sgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja190aW1lXCIsICcnKTtcbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIG1lbXBhY2tfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICByZXN1bHRzX2ZvdW5kLm1lbXBhY2sgPSB0cnVlO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGltZyB3aWR0aD1cIjEwMDBweFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBncmFwaF9tYXRjaCA9ICBtZW1wYWNrX2dyYXBoX291dC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihncmFwaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRpYWdyYW0gRGF0YTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNvbnRhY3RfbWF0Y2ggPSAgbWVtcGFja19jb250YWN0X3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjb250YWN0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBsaXBpZF9tYXRjaCA9ICBtZW1wYWNrX2xpcGlkX3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihsaXBpZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkxpcGlkIEV4cG9zdXJlIFByZWRpdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cblxuICAgIH1cbiAgICAvL2dlbnRocmVhZGVyIGFuZCBwZ2VudGhyZWFkZXJcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc29ydF9wcmVzdWx0JylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgICByZXN1bHRzX2ZvdW5kLnBnZW50aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5nZW50aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdnZW5fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbV9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgICByZXN1bHRzX2ZvdW5kLnBkb210aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdkb21fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX21vZGVscycpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW50aHJlYWRlcl9wc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIC8vIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIC8vIHtcbiAgICAvLyAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAvLyAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgIC8vICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICAvLyB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmRvbXByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIGxldCBwbmdfbWF0Y2ggPSBwbmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocG5nX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5X3BuZyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IFBORzwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IGZpbGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYXJzZWRzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbXNzZWEnKVxuICAgIHtcbiAgICAgIGxldCBwcmVkX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZG9tc3NlYV9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc3NlYV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBmaWxlPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdydW5CaW9zZXJmJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmJpb3NlcmYgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GaW5hbCBIb21vbG9neSBNb2RlbDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2Jpb3NlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl9tb2RlbFwiLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaGhibGl0c19wZGI3MCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SEhTZWFyY2ggUmVzdWx0czwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGdwYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfY2F0aCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQVRIIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdyZWZvcm1hdF9kb21zZXJmX21vZGVscycgfHwgcmVzdWx0X2RpY3QubmFtZSA9PT0gXCJwYXJzZV9wZGJfYmxhc3RcIilcbiAgICB7XG4gICAgICBsZXQgZG9tc2VyZl9tYXRjaCA9IGRvbXNlcmZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc2VyZl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfdGltZVwiLCAnJyk7XG4gICAgICAgIC8vIFRPIERPIEFERCBSRUdFWFxuICAgICAgICBkb21haW5fY291bnQrPTE7XG4gICAgICAgIHJlc3VsdHNfZm91bmQuZG9tc2VyZiA9IHRydWU7XG4gICAgICAgIGlmKGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpe1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsICs9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBidXR0b25zX3RhZ3MgPSByYWN0aXZlLmdldChcImRvbXNlcmZfYnV0dG9uc1wiKTtcbiAgICAgICAgYnV0dG9uc190YWdzICs9ICc8YnV0dG9uIG9uQ2xpY2s9XCJwc2lwcmVkLnN3YXBEb21zZXJmKCcrZG9tYWluX2NvdW50KycpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+RG9tYWluICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9idXR0b24+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX2J1dHRvbnNcIiwgYnV0dG9uc190YWdzKTtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgICAgIHBhdGhzLnB1c2goZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIiwgcGF0aHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZXRTY2hlbWF0aWMnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuZmZwcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIC8vIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgLy8gaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coXCJIRVlcIilcbiAgICAgIC8vICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAvLyAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIC8vICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dldFRtSW1hZ2UnKVxuICAgIHtcbiAgICAgIC8vIHJlc3VsdHNfZm91bmQuZmZwcmVkID0gdHJ1ZTtcbiAgICAgIC8vIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAvLyByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgLy8gcmFjdGl2ZS5zZXQoXCJmZnByZWRfdGltZVwiLCAnJyk7XG4gICAgICAvLyBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgLy8gaWYoc2NoX21hdGNoKVxuICAgICAgLy8ge1xuICAgICAgLy8gICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAvLyAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIC8vICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIC8vIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIRVlcIilcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmVhdHVyZXMnKVxuICAgIHtcbiAgICAgIGxldCBmZWF0X21hdGNoID0gZmZwcmVkX2ZlYXRjZmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZmVhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2VxdWVuY2UgRmVhdHVyZSBTdW1tYXJ5PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkZmVhdHVyZXMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZnByZWRfaHVtYW4nIHx8IHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZnByZWRfZmx5JylcbiAgICB7XG4gICAgICBsZXQgcHJlZHNfbWF0Y2ggPSBmZnByZWRfcHJlZHNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZHNfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdPIFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkcHJlZGljdGlvbnMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwbG90X3NlbGZfY29udGFjdF9tYXAnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQubWV0YXBzaWNvdiA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5tYXAgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IE1hcDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfbWFwJywgJzxiPkNvbnRhY3QgTWFwPC9iPjxiciAvPjxpbWcgaGVpZ2h0PVwiODAwXCIgd2lkdGg9XCI4MDBcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjb250YWN0X3ByZWRpY3RvcnMnKVxuICAgIHtcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gICAgICAgIGxldCBldl9tYXRjaCA9IG1ldGFwc2ljb3ZfZXZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihldl9tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuZnJlZWNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GcmVlQ29udGFjdCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHNfbWF0Y2ggPSBtZXRhcHNpY292X3BzaWNvdl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKHBzX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QU0lDT1YgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNjX21hdGNoID0gbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoY2NfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQ01QUkVEIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSAgPT09ICdtZXRhcHNpY292X3N0YWdlMicpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWV0c2l0ZV9jaGVja2NoYWlucycpXG4gICAge1xuICAgICAgICBtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWV0cHJlZF93cmFwcGVyJylcbiAgICB7XG4gICAgICBsZXQgdGFibGVfbWF0Y2ggPSBtZXRzaXRlX3RhYmxlX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBwZGJfbWF0Y2ggPSBtZXRzaXRlX3BkYl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1ldHNpdGUgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV90aW1lXCIsICcnKTtcbiAgICAgIGlmKHRhYmxlX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWV0c2l0ZSBUYWJsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21ldHNpdGUnLCB6aXAsIHJhY3RpdmUpO1xuXG4gICAgICB9XG4gICAgICBpZihwZGJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWV0c2l0ZSBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hzcHJlZF9jaGVja2NoYWlucycpXG4gICAge1xuICAgICAgaHNwcmVkX2NoZWNrY2hhaW5zX3NlZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaHNfcHJlZCcpXG4gICAge1xuICAgICAgICByZXN1bHRzX2ZvdW5kLmhzcHJlZCA9IHRydWU7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5IU1ByZWQgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdoc3ByZWQnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3BsaXRfcGRiX2ZpbGVzJylcbiAgICB7XG4gICAgICBsZXQgaW5pdGlhbF9tYXRjaCA9IGhzcHJlZF9pbml0aWFsX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBzZWNvbmRfbWF0Y2ggPSBoc3ByZWRfc2Vjb25kX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGluaXRpYWxfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLmluaXRpYWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Jbml0aWFsIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZihzZWNvbmRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlY29uZCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX3NlY29uZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NoZWNrX3BkYl90ZGInKXtcbiAgICAgIGdlbnRkYl9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ha2V0ZGInKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuZ2VudGRiID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+VERCIEZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCd0ZGJfZmlsZScsICc8aDM+PGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DbGljayBoZXJlIHRvIGRvd25sb2FkIHlvdXIgVERCIEZpbGU8L2E+PC9oMz4nKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1lbWVtYmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1lbWJlZCBQREIgZmlsZTwvYT4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI21lbWVtYmVkX21vZGVsJywgZmFsc2UpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgfVxuXG4gIH1cblxuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZighIHJlc3VsdHNfZm91bmRbam9iX25hbWVdKVxuICAgIHtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZStcIl93YWl0aW5nX21lc3NhZ2VcIiwgJ1RoZSBqb2IgY29tcGxldGVkIHN1Y2Nlc2Z1bGx5IGJ1dCBubyBwcmVkaWN0aW9uIHdhcyBwb3NzaWJsZSBmb3IgdGhlIGlucHV0IGRhdGEuIE5vICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGRhdGEgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfdGltZVwiLCAnJyk7XG4gICAgfVxuICB9KTtcbiAgaWYoISByZXN1bHRzX2ZvdW5kLm1lbXBhY2spXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKG1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQubWV0c2l0ZSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJ1dlIGNvdWxkIG5vdCBmaW5kIHRoZSBQREIgQ2hhaW4gSUQgcHJvdmlkZWQnKTtcblxuICB9XG4gIGlmKGhzcHJlZF9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5oc3ByZWQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJ1dlIGNvdWxkIG5vdCBmaW5kIHRoZSBQREIgQ2hhaW4gSURzIHByb3ZpZGVkJyk7XG4gIH1cbiAgaWYoZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLmdlbnRkYilcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZVwiLCAnUERCIHByb3ZpZGVkIGRpZCBub3QgY29udGFpbiBhIHNpbmdsZSBjaGFpbiBsYWJsZWQgYXMgY2hhaW4gQScpO1xuICB9XG5cblxuICBpZihyZXN1bHRzX2ZvdW5kLmRvbXNlcmYpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkLCBjYXJ0b29uKVxue1xuICBsZXQgbW9sX2NvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2wtY29udGFpbmVyJyk7XG4gIGZvcihsZXQgY29udGFpbmVyIG9mIG1vbF9jb250YWluZXJzKVxuICB7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiNDAwcHhcIjtcbiAgfVxuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgIGlmKGF0b20uc3MgPT09ICdzJyl7cmV0dXJuICcjZTVkZDU1Jzt9XG4gICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGxldCBob3RzcG90X2NvbG9yID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgaWYoYXRvbS5iID09IDEuMCl7cmV0dXJuICdyZWQnO31cbiAgICBpZihhdG9tLmIgPT0gMC41KXtyZXR1cm4gJ2JsYWNrJzt9XG4gICAgaWYoYXRvbS5iID09IDUwKXtyZXR1cm4gJ3doaXRlJzt9XG4gICAgaWYoYXRvbS5iID09IDEwMCl7cmV0dXJuICdyZWQnO31cbiAgICByZXR1cm4oXCJibHVlXCIpO1xuICB9O1xuICBjb25zb2xlLmxvZyhcIkxPQURJTkc6IFwiK3VyaSk7XG4gIGxldCBlbGVtZW50ID0gJChjc3NfaWQpO1xuICBsZXQgY29uZmlnID0geyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyB9O1xuICBsZXQgdmlld2VyID0gJDNEbW9sLmNyZWF0ZVZpZXdlciggZWxlbWVudCwgY29uZmlnICk7XG4gIGxldCBkYXRhID0gZ2V0X3RleHQodXJpLCBcIkdFVFwiLCB7fSk7XG4gIHZpZXdlci5hZGRNb2RlbCggZGF0YSwgXCJwZGJcIiApOyAgICAgICAgICAgICAgICAgICAgICAgLyogbG9hZCBkYXRhICovXG4gIGlmKGNhcnRvb24pXG4gIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBjYXJ0b29uX2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgZWxzZSB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogaG90c3BvdF9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGlmKGNzc19pZC5zdGFydHNXaXRoKCcjbWVtZW1iZWQnKSl7XG4gICAgdmlld2VyLmFkZFN1cmZhY2UoJDNEbW9sLlN1cmZhY2VUeXBlLlZEVywgeydvcGFjaXR5JzowLjgsIGNvbG9yc2NoZW1lOiAnd2hpdGVDYXJib24nfSwge2hldGZsYWc6dHJ1ZX0se30pO1xuICB9XG4gIHZpZXdlci56b29tVG8oKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHNldCBjYW1lcmEgKi9cbiAgdmlld2VyLnJlbmRlcigpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogcmVuZGVyIHNjZW5lICovXG4gIHZpZXdlci56b29tKDEuNywgMzAwMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKVxue1xuICAvL2NvbnNvbGUubG9nKGRvd25sb2Fkc19pbmZvKTtcbiAgbGV0IGRvd25sb2Fkc19zdHJpbmcgPSByYWN0aXZlLmdldCgnZG93bmxvYWRfbGlua3MnKTtcbiAgaWYoJ3BzaXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeil7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7fVxuICB9XG4gIGlmKCdkb21wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnkpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5X3BuZyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG5cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIH1cbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dClcbiAgICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTxiciAvPlwiKTtcbiAgICB9XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdiaW9zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2RvbXNlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdmZnByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWV0YXBzaWNvdicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5tYXApO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuZnJlZWNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWV0c2l0ZScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignaHNwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmluaXRpYWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuc2Vjb25kKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRkYicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGRiLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRkYi50ZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtZW1iZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkLnBkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG5cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9hZHZhbmNlZF9wYXJhbXMoKVxue1xuICBsZXQgb3B0aW9uc19kYXRhID0ge307XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfZV92YWx1ZV9jdXRvZmZcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gXCIwLjAxXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfcHNpYmxhc3RfaXRlcmF0aW9uc1wiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gNTtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpb3NlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZnByZWRfZmx5XCIpLmNoZWNrZWQpXG4gICAgeyAgb3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImZseVwiO31cbiAgICBlbHNlXG4gICAge29wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJodW1hblwiO31cbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiaHVtYW5cIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBcIkNhXCI7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCA9IFwiQ2FcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfZnByXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gXCI1XCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWUrZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gXCJBQlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfc2Vjb25kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQlwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiKS52YWx1ZTtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JhcnJlbF95ZXNcIikuY2hlY2tlZCl7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ1RSVUUnO1xuICAgIH1lbHNle1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgfVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfdGVybWluYWxfaW5cIikuY2hlY2tlZClcbiAgICB7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwiaW5cIjtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJvdXRcIjtcbiAgICB9XG4gICAgLy9vcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9ib3VuZGFyaWVzXCIpO1xuICB9XG4gIGNhdGNoKGVycilcbiAge1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnRkFMU0UnO1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJpblwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0gPSAwO1xuICB9XG5cbiAgcmV0dXJuKG9wdGlvbnNfZGF0YSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYXJzZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZlYXRjZmcgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmZwcmVkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZXRzaXRlIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2hzcHJlZCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cbi8vZ2l2ZW4gYSB1cmwsIGh0dHAgcmVxdWVzdCB0eXBlIGFuZCBzb21lIGZvcm0gZGF0YSBtYWtlIGFuIGh0dHAgcmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfcmVxdWVzdCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcbiAgY29uc29sZS5sb2coJ1NlbmRpbmcgVVJJIHJlcXVlc3QnKTtcbiAgY29uc29sZS5sb2codXJsKTtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHZhciByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byBzZW5kIGRhdGFcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiU2VuZGluZyBKb2IgdG8gXCIrdXJsK1wiIEZhaWxlZC4gXCIrZXJyb3IucmVzcG9uc2VUZXh0K1wiLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2Ugd2FzIHVuYWJsZSB0byBwcm9jZXNzIHlvdXIgc3VibWlzc2lvbi4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7IHJldHVybiBudWxsO1xuICB9fSkucmVzcG9uc2VKU09OO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG4vL2dpdmVuIGEgam9iIG5hbWUgcHJlcCBhbGwgdGhlIGZvcm0gZWxlbWVudHMgYW5kIHNlbmQgYW4gaHR0cCByZXF1ZXN0IHRvIHRoZVxuLy9iYWNrZW5kXG5leHBvcnQgZnVuY3Rpb24gc2VuZF9qb2IocmFjdGl2ZSwgam9iX25hbWUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEpXG57XG4gIC8vYWxlcnQoc2VxKTtcbiAgY29uc29sZS5sb2coXCJTZW5kaW5nIGZvcm0gZGF0YVwiKTtcbiAgdmFyIGZpbGUgPSBudWxsO1xuICB0cnlcbiAge1xuICAgIGZpbGUgPSBuZXcgQmxvYihbc2VxXSk7XG4gIH0gY2F0Y2ggKGUpXG4gIHtcbiAgICBhbGVydChlKTtcbiAgfVxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc29sZS5sb2coam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnZG9tcHJlZCcpKXtcbiAgZmQuYXBwZW5kKFwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWVcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlKTtcbiAgZmQuYXBwZW5kKFwicHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMpO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ21ldHNpdGUnKSl7XG4gIGZkLmFwcGVuZChcIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJleHRyYWN0X2Zhc3RhX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfZnByXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdoc3ByZWQnKSl7XG4gIGZkLmFwcGVuZChcImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnNcIiwgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMpO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX2ZpcnN0X2NoYWluXCIsIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiaHNfcHJlZF9zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfc2Vjb25kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdtZW1lbWJlZCcpKXtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfYWxnb3JpdGhtXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0pO1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF9iYXJyZWxcIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCk7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX3Rlcm1pbmlcIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkpO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2ZmcHJlZCcpKXtcbiAgZmQuYXBwZW5kKFwiZmZwcmVkX3NlbGVjdGlvblwiLCBvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbik7XG4gIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICB9XG4gIGNvbnNvbGUubG9nKG9wdGlvbnNfZGF0YSk7XG4gIGxldCByZXNwb25zZV9kYXRhID0gc2VuZF9yZXF1ZXN0KHN1Ym1pdF91cmwsIFwiUE9TVFwiLCBmZCk7XG4gIGlmKHJlc3BvbnNlX2RhdGEgIT09IG51bGwpXG4gIHtcbiAgICBsZXQgdGltZXMgPSBzZW5kX3JlcXVlc3QodGltZXNfdXJsLCdHRVQnLHt9KTtcbiAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHRpbWVzKSk7XG4gICAgaWYoam9iX25hbWUgaW4gdGltZXMpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgam9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzIHR5cGljYWxseSB0YWtlIFwiK3RpbWVzW2pvYl9uYW1lXStcIiBzZWNvbmRzXCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgXCJVbmFibGUgdG8gcmV0cmlldmUgYXZlcmFnZSB0aW1lIGZvciBcIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMuXCIpO1xuICAgIH1cbiAgICBmb3IodmFyIGsgaW4gcmVzcG9uc2VfZGF0YSlcbiAgICB7XG4gICAgICBpZihrID09IFwiVVVJRFwiKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsIHJlc3BvbnNlX2RhdGFba10pO1xuICAgICAgICBpZihbJ21ldGlzdGUnLCAnaHNwcmVkJywgJ2dlbnRkYicsICdtZW1lbWJlZCddLmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICAgICAge1xuICAgICAgICAgIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHNlcXVlbmNlIGZyb20gYSBwcmV2aW91cyBzdWJtaXNzaW9uIGlzIHRoZVxuLy9wYWdlIHdhcyBsb2FkZWQgd2l0aCBhIFVVSURcbmV4cG9ydCBmdW5jdGlvbiBnZXRfcHJldmlvdXNfZGF0YSh1dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSlcbntcbiAgICBjb25zb2xlLmxvZygnUmVxdWVzdGluZyBkZXRhaWxzIGdpdmVuIFVSSScpO1xuICAgIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgLy9hbGVydCh1cmwpO1xuICAgIGxldCBzdWJtaXNzaW9uX3Jlc3BvbnNlID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGlmKCEgc3VibWlzc2lvbl9yZXNwb25zZSl7YWxlcnQoXCJOTyBTVUJNSVNTSU9OIERBVEFcIik7fVxuICAgIGxldCBzZXEgPSBnZXRfdGV4dChmaWxlX3VybCtzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmlucHV0X2ZpbGUsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgam9icyA9ICcnO1xuICAgIHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihzdWJtaXNzaW9uKXtcbiAgICAgIGpvYnMgKz0gc3VibWlzc2lvbi5qb2JfbmFtZStcIixcIjtcbiAgICB9KTtcbiAgICBqb2JzID0gam9icy5zbGljZSgwLCAtMSk7XG4gICAgcmV0dXJuKHsnc2VxJzogc2VxLCAnZW1haWwnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmVtYWlsLCAnbmFtZSc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uc3VibWlzc2lvbl9uYW1lLCAnam9icyc6IGpvYnN9KTtcbn1cblxuXG4vL2dldCB0ZXh0IGNvbnRlbnRzIGZyb20gYSByZXN1bHQgVVJJXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3RleHQodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG5cbiBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIC8vZGF0YVR5cGU6IFwidHh0XCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHJlcXVlc3QgaW5wdXQgZGF0YSB0ZXh0XCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIkdldHRpbmdzIHJlc3VsdHMgdGV4dCBmYWlsZWQuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTt9XG4gIH0pO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG5cbi8vcG9sbHMgdGhlIGJhY2tlbmQgdG8gZ2V0IHJlc3VsdHMgYW5kIHRoZW4gcGFyc2VzIHRob3NlIHJlc3VsdHMgdG8gZGlzcGxheVxuLy90aGVtIG9uIHRoZSBwYWdlXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc19maWxlKHVybF9zdHViLCBwYXRoLCBjdGwsIHppcCwgcmFjdGl2ZSlcbntcbiAgbGV0IHVybCA9IHVybF9zdHViICsgcGF0aDtcbiAgbGV0IHBhdGhfYml0cyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICAvL2dldCBhIHJlc3VsdHMgZmlsZSBhbmQgcHVzaCB0aGUgZGF0YSBpbiB0byB0aGUgYmlvM2Qgb2JqZWN0XG4gIC8vYWxlcnQodXJsKTtcbiAgY29uc29sZS5sb2coJ0dldHRpbmcgUmVzdWx0cyBGaWxlIGFuZCBwcm9jZXNzaW5nJyk7XG4gIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogJ0dFVCcsXG4gICAgYXN5bmM6ICAgdHJ1ZSxcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGZpbGUpXG4gICAge1xuICAgICAgemlwLmZvbGRlcihwYXRoX2JpdHNbMV0pLmZpbGUocGF0aF9iaXRzWzJdLCBmaWxlKTtcbiAgICAgIGlmKGN0bCA9PT0gJ2hvcml6JylcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLCBmaWxlKTtcbiAgICAgICAgbGV0IGNvdW50ID0gKGZpbGUubWF0Y2goL0NvbmYvZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb3VudCk7XG4gICAgICAgIGxldCBwYW5lbF9oZWlnaHQgPSAoKDYqMzApKihjb3VudCsxKSkrMTIwO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHBhbmVsX2hlaWdodCk7XG4gICAgICAgIC8vaWYocGFuZWxfaGVpZ2h0IDwgNDUwKXtwYW5lbF9oZWlnaHQgPSA0NTA7fVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYW5lbF9oZWlnaHQpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7ZGVidWc6IHRydWUsIHBhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyLCB3aWR0aDogOTAwLCBjb250YWluZXJfd2lkdGg6IDkwMCwgaGVpZ2h0OiBwYW5lbF9oZWlnaHQsIGNvbnRhaW5lcl9oZWlnaHQ6IHBhbmVsX2hlaWdodH0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnaHNwcmVkJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgLy8gY29uc29sZS5sb2coTWF0aC5jZWlsKHJlc2lkdWVzLmxlbmd0aC81MCkpO1xuICBsZXQgcGFuZWxfaGVpZ2h0ID0gKChNYXRoLmNlaWwoYW5ub3RhdGlvbnMubGVuZ3RoLzUwKSsyKSoyMCkrKDgqMjApO1xuICBpZihwYW5lbF9oZWlnaHQgPCAzMDApe3BhbmVsX2hlaWdodCA9IDMwMDt9XG4gIC8vY29uc29sZS5sb2coXCJJTklUSUFMIEhFSUdIVDogXCIrcGFuZWxfaGVpZ2h0KTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogcGFuZWxfaGVpZ2h0LCBjb250YWluZXJfaGVpZ2h0OiBwYW5lbF9oZWlnaHR9KTtcbn1cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgc2V0X2FkdmFuY2VkX3BhcmFtcyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBjbGVhcl9zZXR0aW5ncyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBwcmVwYXJlX2Rvd25sb2Fkc19odG1sIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGhhbmRsZV9yZXN1bHRzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNldF9kb3dubG9hZHNfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2hvd19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5X3N0cnVjdHVyZSB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcbmxldCBqb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsIFwibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IHNlcV9qb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIixdO1xubGV0IHN0cnVjdF9qb2JfbGlzdCA9IFtcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWJtaXNzaW9uX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG4gICAgZXJyb3JfbWVzc2FnZTogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcbiAgICBtZXRzaXRlX3RhYmxlOiBudWxsLFxuICAgIG1ldHNpdGVfcGRiOiBudWxsLFxuICAgIGhzcHJlZF90YWJsZTogbnVsbCxcbiAgICBoc3ByZWRfaW5pdGlhbF9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3NlY29uZF9wZGI6IG51bGwsXG4gICAgdGRiX2ZpbGU6IG51bGwsXG4gICAgbWVtZW1iZWRfcGRiOiBudWxsLFxuXG4gICAgbWV0YXBzaWNvdl9kYXRhOiBudWxsLFxuICAgIG1ldHNpdGVfZGF0YTogbnVsbCxcbiAgICBoc3ByZWRfZGF0YTogbnVsbCxcbiAgICBtZW1lbWJlZF9kYXRhOiBudWxsLFxuICAgIGdlbnRkYl9kYXRhOiBudWxsLFxuXG4gICAgLy8gU2VxdWVuY2UgYW5kIGpvYiBpbmZvXG4gICAgc2VxdWVuY2U6ICcnLFxuICAgIHNlcXVlbmNlX2xlbmd0aDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdGFydDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdG9wOiAxLFxuICAgIGVtYWlsOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBiYXRjaF91dWlkOiBudWxsLFxuICAgIC8vaG9sZCBhbm5vdGF0aW9ucyB0aGF0IGFyZSByZWFkIGZyb20gZGF0YWZpbGVzXG4gICAgYW5ub3RhdGlvbnM6IG51bGwsXG59O1xuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19jaGVja2VkJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2pvYiddID0gam9iX25hbWUrJ19qb2InO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJ10gPSAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19pY29uJ10gPSBnZWFyX3N0cmluZztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfdGltZSddID0gJ0xvYWRpbmcgRGF0YSc7XG59KTtcbmluaXRpYWxpc2F0aW9uX2RhdGEucHNpcHJlZF9jaGVja2VkID0gdHJ1ZTtcbi8vIGluaXRpYWxpc2F0aW9uX2RhdGEubWVtZW1iZWRfYWR2YW5jZWQgPSAxO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5zZXF1ZW5jZV9mb3JtX3Zpc2libGUgPSAwO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5zdHJ1Y3R1cmVfZm9ybV92aXNpYmxlID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIHNlcV90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgfVxuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgIGxldCBiYXRjaCA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgZG93bmxvYWRzX2luZm8gPSB7fTtcblxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnQ29tcGxldGUnKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyIHJlc3VsdHNcIik7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSBiYXRjaC5zdWJtaXNzaW9ucztcbiAgICAgIHN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gICAgICAgICAgaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcywgam9iX2xpc3QpO1xuXG4gICAgICB9KTtcbiAgICAgIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pO1xuICAgICAgJCgnLnByb2Nlc3NpbmcnKS5yZW1vdmUoKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX3RpbWUnLCBudWxsKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHN1Ym1pc3Npb25fbWVzc2FnZSA9IGJhdGNoLnN1Ym1pc3Npb25zWzBdLmxhc3RfbWVzc2FnZTtcbiAgICAgIGxldCBlcnJvcl90ZXh0ID0gXCI8aDM+UE9MTElORyBFUlJPUjogSm9iIEZhaWxlZDwvaDM+XCIrXG4gICAgICBcIjxoND5QbGVhc2UgQ29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51ayBxdW90aW5nIHRoZSBlcnJvciBtZXNzYWdlIGFuZCBqb2IgSUQ6XCIrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKStcIjwvaDQ+XCIrXG4gICAgICBcIjxoNT5FcnJvciBNZXNzYWdlOjxiciAvPlwiK3N1Ym1pc3Npb25fbWVzc2FnZStcIjwvaDU+XCI7XG4gICAgICByYWN0aXZlLnNldCgnZXJyb3JfbWVzc2FnZScsIGVycm9yX3RleHQpO1xuICAgICAgJCgnLnByb2Nlc3NpbmcnKS5yZW1vdmUoKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxucmFjdGl2ZS5vbignc2hvd19iaW9zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19mZnByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2ZmcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZXRzaXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfaHNwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWVtZW1iZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHBhbmVsXG4vL1xucmFjdGl2ZS5vbiggJ3NlcXVlbmNlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIGZhbHNlKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgc2hvd19wYW5lbCgxLCByYWN0aXZlKTtcbn0pO1xuXG4vL3JlZ2lzdGVyIGxpc3RlbmVycyBmb3IgZWFjaCByZXN1bHRzIHBhbmVsXG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lLCBpKXtcbiAgY29uc29sZS5sb2coXCJhZGRpbmcgam9icyB3YXRjaGVyc1wiKTtcbiAgcmFjdGl2ZS5vbihqb2JfbmFtZSsnX2FjdGl2ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgIHNob3dfcGFuZWwoaSsyLCByYWN0aXZlKTtcbiAgICBpZihqb2JfbmFtZSA9PT0gXCJwc2lwcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSBcImRpc29wcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnYmlvc2VyZl9tb2RlbCcpKXtcbiAgICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfbW9kZWwnKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgYmlvc2VyZl9tb2RlbCA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX21vZGVsJyk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoYmlvc2VyZl9tb2RlbCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21ldHNpdGUnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpKXtcbiAgICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IG1ldF9wZGIgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZXRfcGRiLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdoc3ByZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKSl7XG4gICAgICBpZihyYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgaW5pdGlhbF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJyk7XG4gICAgICAgIGxldCBzZWNvbmRfcGRiID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGluaXRpYWxfcGRiLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShzZWNvbmRfcGRiLCAgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfX1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZW1lbWJlZCcpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21lbWVtYmVkX3BkYicpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgIGxldCBtZW1lbWJlZF9wZGIgPSByYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJyk7XG4gICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZW1lbWJlZF9wZGIsICcjbWVtZW1iZWRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fGpvYl9uYW1lID09PSAnZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbignc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBjb25zb2xlLmxvZyhcIlNVQk1JU1NJT04gQUNUSVZFXCIpO1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuXG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgc3VibWl0X2pvYiA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHNlcV9jb3VudCA9IHNlcS5zcGxpdChcIj5cIikubGVuZ3RoO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGxldCBzdHJ1Y3RfdHlwZSA9IGZhbHNlO1xuICBsZXQgc2VxX3R5cGUgPSBmYWxzZTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzdHJ1Y3Rfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHN0cnVjdF90eXBlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHNlcV9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc2VxX3R5cGUgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICAvL0hBTkRMRSBGRlBSRUQgSk9CIFNFTEVDVElPTi5cbiAgaWYoY2hlY2tfc3RhdGVzLmJpb3NlcmZfY2hlY2tlZCB8fCBjaGVja19zdGF0ZXMuZG9tc2VyZl9jaGVja2VkKVxuICB7XG4gICAgbGV0IGJpb3NfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgbGV0IGRvbXNfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgaWYoYmlvc19tb2RlbGxlcl90ZXN0IHx8IGRvbXNfbW9kZWxsZXJfdGVzdClcbiAgICB7XG4gICAgICBzdWJtaXRfam9iID10cnVlO1xuICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHByb3ZpZGVkIGEgdmFsaWQgTU9ERUxMRVIga2V5LiBDb250YWN0IHRoZSBTYWxpIGxhYiBmb3IgYSBNT0RFTExFUiBsaWNlbmNlLlwiKTtcbiAgICB9XG4gIH1cbiAgZWxzZXtcbiAgICBzdWJtaXRfam9iPXRydWU7XG4gIH1cbiAgaWYoc2VxX3R5cGUgJiYgc3RydWN0X3R5cGUpXG4gIHtcbiAgICBhbGVydChcIllvdSBjYW4gbm90IHN1Ym1pdCBib3RoIHNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYW5hbHlzaXMgam9ic1wiKTtcbiAgICBzdWJtaXRfam9iID0gZmFsc2U7XG4gIH1cbiAgaWYoc2VxX2NvdW50ID4gMSlcbiAge1xuICAgIGFsZXJ0KFwiTVNBIElucHV0IGZvcmJpZGRlblwiKTtcbiAgICBzdWJtaXRfam9iPWZhbHNlO1xuICB9XG4gIGlmKHN1Ym1pdF9qb2IpXG4gIHtcbiAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmdcIik7XG4gICAgaWYoc2VxX3R5cGUpXG4gICAge1xuICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICB9XG4gICAgaWYoc3RydWN0X3R5cGUpXG4gICAge1xuICAgICAgbGV0IHBkYkZpbGUgPSBudWxsO1xuICAgICAgbGV0IHBkYkRhdGEgPSAnJztcbiAgICAgIHRyeXtcbiAgICAgICBwZGJGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZGJGaWxlXCIpO1xuICAgICAgIGxldCBmaWxlID0gcGRiRmlsZS5maWxlc1swXTtcbiAgICAgICBsZXQgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBwZGJEYXRhID0gZnIucmVzdWx0O1xuICAgICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBwZGJEYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGVycikge1xuICAgICAgICBwZGJEYXRhID0gXCJcIjtcbiAgICAgICAgaWYoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJGaWxlUmVhZGVyLnJlYWRBc1RleHQgaXMgbm90IGFuIG9iamVjdFwiKSl7XG4gICAgICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3Qgc2VsZWN0ZWQgYSBQREIgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoK1wiL1wiKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgfSk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcywgemlwKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmZ1bmN0aW9uIHRlc3RfbW9kZWxsZXJfa2V5KGlucHV0KVxue1xuICBpZihpbnB1dCA9PT0gJ01PREVMSVJBTkpFJylcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGxldCBzZXFfdHlwZSA9IHRydWU7XG4gIC8vIGNvbnNvbGUubG9nKHByZXZpb3VzX2RhdGEuam9icyk7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAzKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkaXNvcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtcGFjaycpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNik7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpICYmICEgcHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDgpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Jpb3NlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMik7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMyk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDMgKTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE1KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAzICk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE2KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAzICk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMyApO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLHByZXZpb3VzX2RhdGEuc2VxKTtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJyxwcmV2aW91c19kYXRhLmVtYWlsKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLHByZXZpb3VzX2RhdGEubmFtZSk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICBpZihzZXFfdHlwZSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAxICk7XG4gIH1cbiAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBzZXFfdHlwZSk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyBOZXcgUGFubmVsIGZ1bmN0aW9uc1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL1JlbG9hZCBhbGlnbm1lbnRzIGZvciBKYWxWaWV3IGZvciB0aGUgZ2VuVEhSRUFERVIgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTmV3QWxpZ25tZW50KGFsblVSSSxhbm5VUkksdGl0bGUpIHtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21zYS8/YW5uPVwiK2ZpbGVfdXJsK2FublVSSStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTgwMCxoZWlnaHQ9NDAwXCIpO1xufVxuXG4vL1JlbG9hZCBhbGlnbm1lbnRzIGZvciBKYWxWaWV3IGZvciB0aGUgZ2VuVEhSRUFERVIgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKGFsblVSSSwgdHlwZSkge1xuXG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGxldCBtb2Rfa2V5ID0gcmFjdGl2ZS5nZXQoJ21vZGVsbGVyX2tleScpO1xuICBpZihtb2Rfa2V5ID09PSAnTScrJ08nKydEJysnRScrJ0wnKydJJysnUicrJ0EnKydOJysnSicrJ0UnKVxuICB7XG4gICAgLy9hbGVydCh0eXBlKTtcbiAgICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbW9kZWwvcG9zdD90eXBlPVwiK3R5cGUrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD02NzAsaGVpZ2h0PTcwMFwiKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBNJysnTycrJ0QnKydFJysnTCcrJ0wnKydFJysnUiBMaWNlbmNlIEtleScpO1xuICB9XG59XG5cbi8vIFN3YXBzIG91dCB0aGUgZG9tc2VyZiBtb2RlbCB3aGVuIHRob3NlIGJ1dHRvbnMgYXJlIGNsaWNrZWRcbmV4cG9ydCBmdW5jdGlvbiBzd2FwRG9tc2VyZih1cmlfbnVtYmVyKVxue1xuICB1cmlfbnVtYmVyID0gdXJpX251bWJlci0xO1xuICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbdXJpX251bWJlcl0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL21haW4uanMiLCJpbXBvcnQgeyBzZW5kX2pvYiB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGlzSW5BcnJheSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5cbi8vVGFrZXMgdGhlIGRhdGEgbmVlZGVkIHRvIHZlcmlmeSB0aGUgaW5wdXQgZm9ybSBkYXRhLCBlaXRoZXIgdGhlIG1haW4gZm9ybVxuLy9vciB0aGUgc3VibWlzc29uIHdpZGdldCB2ZXJpZmllcyB0aGF0IGRhdGEgYW5kIHRoZW4gcG9zdHMgaXQgdG8gdGhlIGJhY2tlbmQuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgZGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSlcbntcbiAgLyp2ZXJpZnkgdGhhdCBldmVyeXRoaW5nIGhlcmUgaXMgb2sqL1xuICBsZXQgZXJyb3JfbWVzc2FnZT1udWxsO1xuICBsZXQgam9iX3N0cmluZyA9ICcnO1xuICAvL2Vycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLCBbcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLCBtZW1zYXRzdm1fY2hlY2tlZF0pO1xuXG4gIGxldCBjaGVja19saXN0ID0gW107XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX2xpc3QucHVzaChjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10pO1xuICB9KTtcblxuICBlcnJvcl9tZXNzYWdlPVwiQVJHXCI7XG4gIGlmKHNlcV90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3NlcV9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihzdHJ1Y3RfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zdHJ1Y3RfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoZXJyb3JfbWVzc2FnZS5sZW5ndGggPiAwKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Zvcm1fZXJyb3InLCBlcnJvcl9tZXNzYWdlKTtcbiAgICBhbGVydChcIkZPUk0gRVJST1I6XCIrZXJyb3JfbWVzc2FnZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9pbml0aWFsaXNlIHRoZSBwYWdlXG4gICAgbGV0IHJlc3BvbnNlID0gdHJ1ZTtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTtcbiAgICAvL1Bvc3QgdGhlIGpvYnMgYW5kIGludGlhbGlzZSB0aGUgYW5ub3RhdGlvbnMgZm9yIGVhY2ggam9iXG4gICAgLy9XZSBhbHNvIGRvbid0IHJlZHVuZGFudGx5IHNlbmQgZXh0cmEgcHNpcHJlZCBldGMuLiBqb2JzXG4gICAgLy9ieXQgZG9pbmcgdGhlc2UgdGVzdCBpbiBhIHNwZWNpZmljIG9yZGVyXG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KGpvYl9uYW1lK1wiLFwiKTtcbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2Rpc29wcmVkJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdkb21wcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnYmlvc2VyZicgfHwgam9iX25hbWUgPT09ICdkb21zZXJmJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdtZXRhcHNpY292JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBnZW50aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGRvbXRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICBpZihbXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl0uaW5jbHVkZXMoam9iX25hbWUpKXtcbiAgICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDMgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgICB9XG4gICAgICAgIHJhY3RpdmUuZmlyZSggam9iX25hbWUrJ19hY3RpdmUnICk7XG4gICAgICAgIGlmKHNlcV90eXBlKXtcbiAgICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICAgICAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighIHJlc3BvbnNlKXt3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO31cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3N0cnVjdF9mb3JtKHN0cnVjdCwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG4gIC8vIFRPRE86IG9uZSBkYXkgd2Ugc2hvdWxkIGxldCB0aGVzZSBzZXJ2aWNlcyB0YWtlIHhtbCBwZGIgZmlsZXNcbiAgLy8gaWYoISAvXkhFQURFUnxeQVRPTVxccytcXGQrL2kudGVzdChzdHJ1Y3QpKXtcbiAgaWYoISAvQVRPTVxccytcXGQrL2kudGVzdChzdHJ1Y3QpKXtcbiAgICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIGZpbGUgZG9lcyBub3QgbG9vayBsaWtlIGEgcGxhaW4gdGV4dCBhc2NpaSBwZGIgZmlsZS4gVGhpcyBzZXJ2aWNlIGRvZXMgbm90IGFjY2VwdCAuZ3ogb3IgeG1sIGZvcm1hdCBwZGIgZmlsZXNcIjtcbiAgfVxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuLy9UYWtlcyB0aGUgZm9ybSBlbGVtZW50cyBhbmQgY2hlY2tzIHRoZXkgYXJlIHZhbGlkXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3NlcV9mb3JtKHNlcSwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG5cbiAgLyogbGVuZ3RoIGNoZWNrcyAqL1xuICBpZihzZXEubGVuZ3RoID4gMTUwMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBsb25nIHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuICBpZihzZXEubGVuZ3RoIDwgMzApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gc2hvcnQgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG5cbiAgLyogbnVjbGVvdGlkZSBjaGVja3MgKi9cbiAgbGV0IG51Y2xlb3RpZGVfY291bnQgPSAoc2VxLm1hdGNoKC9BfFR8Q3xHfFV8TnxhfHR8Y3xnfHV8bi9nKXx8W10pLmxlbmd0aDtcbiAgaWYoKG51Y2xlb3RpZGVfY291bnQvc2VxLmxlbmd0aCkgPiAwLjk1KVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgYXBwZWFycyB0byBiZSBudWNsZW90aWRlIHNlcXVlbmNlLiBUaGlzIHNlcnZpY2UgcmVxdWlyZXMgcHJvdGVpbiBzZXF1ZW5jZSBhcyBpbnB1dDxiciAvPlwiO1xuICB9XG4gIGlmKC9bXkFDREVGR0hJS0xNTlBRUlNUVldZWF8tXSsvaS50ZXN0KHNlcSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM8YnIgLz5cIjtcbiAgfVxuXG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cblxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9