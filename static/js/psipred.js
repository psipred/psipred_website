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
  hspred_table += '<h3>Residue Predictions</h3><table class="small-table table-striped table-bordered"><tr><th>Chain/Residue</th><th>Residue Identity</th><th>Score</th>';
  let lines = file.split('\n');
  lines.forEach(function (line, i) {
    let entries = line.split(/\s+/);
    if (entries.length === 3) {
      hspred_table += '<tr><td>' + entries[0] + '</td><td>' + entries[1] + '</td><td>' + entries[2] + '</td></tr>';
    }
  });
  hspred_table += '<table>';
  ractive.set('hspred_table', hspred_table);
}

// parse the small metsite output table
function parse_metsite(ractive, file) {
  let metsite_table = '<br /><h3>Key</h3><table class="small-table table-striped table-bordered"><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Metal Binding Contact</td></tr>';
  metsite_table += '<tr><td bgcolor="#000000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Chain not predicted</td></tr>';
  metsite_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Predicted chain</td></tr></table><br />';
  metsite_table += '<h3>Residue Predictions</h3><table class="small-table table-striped table-bordered"><tr><th>Residue Number</th><th>Raw Neural Network Score</th><th>Residue</th>';
  let hit_regex = /\d+\s.+?\s\w{3}\d+/g;
  let hit_matches = file.match(hit_regex);
  if (hit_matches) {
    hit_matches.forEach(function (line, i) {
      let entries = line.split(/\s/);
      metsite_table += '<tr><td>' + entries[0] + '</td><td>' + entries[1] + '</td><td>' + entries[2] + '</td></tr>';
    });
  }
  metsite_table += '<table>';
  ractive.set('metsite_table', metsite_table);
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
  table_data += "<table class='small-table table-bordered gen-table'><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  table_data += '</table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Molecular Function Predictions</b><br />";
  table_data += "<table class='small-table table-bordered gen-table'><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  table_data += '</table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Cellular Component Predictions</b><br />";
  table_data += "<table class='small-table table-bordered gen-table'><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  table_data += '</table><br />';
  table_data += 'These prediction terms represent terms predicted where SVM training includes assigned GO terms across all evidence code types. SVM reliability is regarded as High (H) when MCC, sensitivity, specificity and precision are jointly above a given threshold. otherwise Reliability is indicated as Low (L). <br />';
  ractive.set('function_tables', table_data);
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
  feat_table += '<table  align="center"  class="small-table table-striped table-bordered ffpred-table"><tr><th>Feature Name</th><th>Value</th><th>Bias</th></tr>';

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
  aa_table += '<table  align="center" ><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    aa_table += '<th>' + residue + '</th>';
  });
  aa_table += '</tr><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    let class_colour = '';
    class_colour = get_aa_color((parseFloat(AA_data[residue]) - hAA_norm[residue].val) / hAA_norm[residue].sde);
    aa_table += '<td class="' + class_colour + '">' + (parseFloat(AA_data[residue]) * 100).toFixed(2) + '</td>';
  });
  aa_table += '</tr></table><br />';
  aa_table += '<b>Significance Key</b><br /><br />';
  aa_table += '<table class="signifkey" align="center" cellpadding="2" cellspacing="0">';
  aa_table += '<tr>';
  aa_table += '<td><b>low</b></td>';
  aa_table += '<td colspan="9">&nbsp;</td>';
  aa_table += '<td align="right"><b>high</b></td>';
  aa_table += '</tr>';
  aa_table += '<tr>';
  aa_table += '<td></td>';
  aa_table += '<td class="signif1n">p &lt; 0.01</td>';
  aa_table += '<td class="signif2n">p &lt; 0.02</td>';
  aa_table += '<td class="signif5n">p &lt; 0.05</td>';
  aa_table += '<td class="signif10n">p &lt; 0.1</td>';
  aa_table += '<td>p &gt;= 0.1</td>';
  aa_table += '<td class="signif10p">p &lt; 0.1</td>';
  aa_table += '<td class="signif5p">p &lt; 0.05</td>';
  aa_table += '<td class="signif2p">p &lt; 0.02</td>';
  aa_table += '<td class="signif1p">p &lt; 0.01</td>';
  aa_table += '<td></td>';
  aa_table += '</tr>';
  aa_table += '<tr>';
  aa_table += '<td colspan="11">Significance p value is calculated using the Z score of the percent amino acid composition</td>';
  aa_table += '</tr>';
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
  biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: panel_height, container_height: panel_height });
}

function parse_presult(ractive, file, type) {
  let lines = file.split('\n');
  //console.log(type+'_ann_set');
  let ann_list = ractive.get(type + '_ann_set');
  //console.log(ann_list);
  if (Object.keys(ann_list).length > 0) {
    let pseudo_table = '<table class="small-table table-striped table-bordered gen-table">\n';
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
    pseudo_table += '</tr><tbody">\n';
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
    pseudo_table += "</tbody></table>\n";
    ractive.set(type + "_table", pseudo_table);
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
    console.log(values);
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
  ractive.set('results_visible', 2);
  ractive.set('results_panel_visible', 1);
  ractive.set('psipred_button', false);
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
      if (job_name === 'pgenthreader' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'metapsicov' || job_name === 'ffpred') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
      }
      if (job_name === 'mempack') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
      }
      if (job_name === 'bioserf') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
        downloads_info.pgenthreader = {};
        downloads_info.pgenthreader.header = "<h5>" + job_names.pgenthreader + " DOWNLOADS</h5>";
        downloads_info.bioserf = {};
        downloads_info.bioserf.header = "<h5>" + job_names.bioserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'domserf') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
        downloads_info.pdomthreader = {};
        downloads_info.pdomthreader.header = "<h5>" + job_names.pdomthreader + " DOWNLOADS</h5>";
        downloads_info.domserf = {};
        downloads_info.domserf.header = "<h5>" + job_names.domserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'ffpred') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
        downloads_info.dompred = {};
        downloads_info.dompred.header = "<h5>DomPred DOWNLOADS</h5>";
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
  let ffpred_svm_regex = /.+_cartoon_memsat_svm_.*\.png/;
  let ffpred_schematic_regex = /.+_schematic_.*\.png/;
  let ffpred_tm_regex = /.+_tmp\.png/;
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
      let cartoon_match = ffpred_svm_regex.exec(result_dict.data_path);
      if (cartoon_match) {
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
        biod3.psipred(file, 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
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
  console.log(Math.ceil(residues.length / 50));
  let panel_height = (Math.ceil(annotations.length / 50) + 2) * 20 + 8 * 20;
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
  initialisation_data[job_name + '_button'] = false;
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
        console.log("Hello");
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
  ractive.set('results_visible', 2);
  ractive.set("batch_uuid", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid);
  let previous_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["b" /* get_previous_data */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid, submit_url, file_url, ractive);
  let seq_type = true;
  console.log(previous_data.jobs);
  if (previous_data.jobs.includes('psipred')) {
    ractive.set('psipred_button', true);
    ractive.set('results_panel_visible', 2);
  }
  if (previous_data.jobs.includes('pgenthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('results_panel_visible', 3);
  }
  if (previous_data.jobs.includes('metapsicov')) {
    ractive.set('metapsicov_button', true);
    ractive.set('psipred_button', true);
    ractive.set('results_panel_visible', 4);
  }
  if (previous_data.jobs.includes('disopred')) {
    ractive.set('disopred_button', true);
    ractive.set('results_panel_visible', 5);
  }
  if (previous_data.jobs.includes('mempack')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('mempack_button', true);
    ractive.set('results_panel_visible', 6);
  }
  if (previous_data.jobs.includes('memsatsvm')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('results_panel_visible', 7);
  }
  if (previous_data.jobs.includes('genthreader') && !previous_data.jobs.includes('pgenthreader')) {
    ractive.set('genthreader_button', true);
    ractive.set('results_panel_visible', 8);
  }
  if (previous_data.jobs.includes('dompred')) {
    ractive.set('psipred_button', true);
    ractive.set('dompred_button', true);
    ractive.set('results_panel_visible', 9);
  }
  if (previous_data.jobs.includes('pdomthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('results_panel_visible', 10);
  }
  if (previous_data.jobs.includes('bioserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('bioserf_button', true);
    ractive.set('results_panel_visible', 11);
  }
  if (previous_data.jobs.includes('domserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('domserf_button', true);
    ractive.set('results_panel_visible', 12);
  }
  if (previous_data.jobs.includes('ffpred')) {
    ractive.set('ffpred_button', true);
    ractive.set('results_panel_visible', 13);
  }
  if (previous_data.jobs.includes('metsite')) {
    ractive.set('metsite_button', true);
    ractive.set('results_panel_visible', 14);
    seq_type = false;
  }
  if (previous_data.jobs.includes('hspred')) {
    ractive.set('hspred_button', true);
    ractive.set('results_panel_visible', 15);
    seq_type = false;
  }
  if (previous_data.jobs.includes('memembed')) {
    ractive.set('memembed_button', true);
    ractive.set('results_panel_visible', 16);
    seq_type = false;
  }
  if (previous_data.jobs.includes('gentdb')) {
    ractive.set('gentdb_button', true);
    ractive.set('results_panel_visible', 17);
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
        ractive.set(job_name + '_button', true);
        if (job_name === 'pgenthreader' || job_name === 'disopred' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'bioserf' || job_name === 'domserf' || job_name === 'metapsicov') {
          ractive.set('psipred_button', true);
          check_states.psipred_checked = false;
        }
        if (job_name === 'bioserf') {
          ractive.set('pgenthreader_button', true);
          check_states.pgenthreader_checked = false;
        }
        if (job_name === 'domserf') {
          ractive.set('pdomthreader_button', true);
          check_states.pdomthreader_checked = false;
        }
        if (job_name === 'mempack') {
          ractive.set('memsatsvm_button', true);
        }
      }
    });
    job_string = job_string.slice(0, -1);
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["e" /* send_job */])(ractive, job_string, data, name, email, submit_url, times_url, job_names, options_data);
    //set visibility and render panel once
    for (let i = 0; i < job_list.length; i++) {
      let job_name = job_list[i];
      if (check_states[job_name + '_checked'] === true && response) {
        ractive.set('results_visible', 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDE3ZTkwOTk2MGQ3YjBmMDJmZmMiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJwYW5lbF9oZWlnaHQiLCJjZWlsIiwiYmlvZDMiLCJhbm5vdGF0aW9uR3JpZCIsInBhcmVudCIsIm1hcmdpbl9zY2FsZXIiLCJkZWJ1ZyIsImNvbnRhaW5lcl93aWR0aCIsIndpZHRoIiwiaGVpZ2h0IiwiY29udGFpbmVyX2hlaWdodCIsImFsZXJ0IiwicGFyc2VfcGJkYXQiLCJkaXNvcHJlZCIsInBhcnNlX2NvbWIiLCJwcmVjaXNpb24iLCJwb3MiLCJnZW5lcmljeHlMaW5lQ2hhcnQiLCJjaGFydFR5cGUiLCJ5X2N1dG9mZiIsInBhcnNlX21lbXNhdGRhdGEiLCJzZXEiLCJ0b3BvX3JlZ2lvbnMiLCJzaWduYWxfcmVnaW9ucyIsInJlZW50cmFudF9yZWdpb25zIiwidGVybWluYWwiLCJjb2lsX3R5cGUiLCJ0bXBfYW5ubyIsIkFycmF5IiwicHJldl9lbmQiLCJmaWxsIiwiYW5ubyIsIm1lbXNhdCIsInBhcnNlX3ByZXN1bHQiLCJ0eXBlIiwiYW5uX2xpc3QiLCJwc2V1ZG9fdGFibGUiLCJ0YWJsZV9oaXQiLCJ0b0xvd2VyQ2FzZSIsInBkYiIsInN1YnN0cmluZyIsImFsbiIsImFubiIsInBhcnNlX3BhcnNlZHMiLCJwcmVkaWN0aW9uX3JlZ2V4IiwicHJlZGljdGlvbl9tYXRjaCIsImRldGFpbHMiLCJyZXBsYWNlIiwidmFsdWVzIiwiaW5kZXhPZiIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsImRvbXByZWQiLCJzaG93X3BhbmVsIiwiY2xlYXJfc2V0dGluZ3MiLCJnZWFyX3N0cmluZyIsImpvYl9saXN0Iiwiam9iX25hbWVzIiwiemlwIiwiam9iX25hbWUiLCJjbGVhclNlbGVjdGlvbiIsIkpTWmlwIiwicHJlcGFyZV9kb3dubG9hZHNfaHRtbCIsImRvd25sb2Fkc19pbmZvIiwiaGVhZGVyIiwicHNpcHJlZCIsIm1lbXNhdHN2bSIsInBnZW50aHJlYWRlciIsImJpb3NlcmYiLCJwZG9tdGhyZWFkZXIiLCJkb21zZXJmIiwiZmZwcmVkIiwiaGFuZGxlX3Jlc3VsdHMiLCJmaWxlX3VybCIsImhvcml6X3JlZ2V4Iiwic3MyX3JlZ2V4IiwicG5nX3JlZ2V4IiwibWVtc2F0X2NhcnRvb25fcmVnZXgiLCJtZW1zYXRfc2NoZW1hdGljX3JlZ2V4IiwibWVtc2F0X2RhdGFfcmVnZXgiLCJtZW1wYWNrX2NhcnRvb25fcmVnZXgiLCJtZW1wYWNrX2dyYXBoX291dCIsIm1lbXBhY2tfY29udGFjdF9yZXMiLCJtZW1wYWNrX2xpcGlkX3JlcyIsImRvbXNzZWFfcHJlZF9yZWdleCIsImRvbXNzZWFfcmVnZXgiLCJkb21zZXJmX3JlZ2V4IiwiZmZwcmVkX3NjaF9yZWdleCIsImZmcHJlZF9zdm1fcmVnZXgiLCJmZnByZWRfc2NoZW1hdGljX3JlZ2V4IiwiZmZwcmVkX3RtX3JlZ2V4IiwiZmZwcmVkX2ZlYXRjZmdfcmVnZXgiLCJmZnByZWRfcHJlZHNfcmVnZXgiLCJtZXRhcHNpY292X2V2X3JlZ2V4IiwibWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXgiLCJtZXRhcHNpY292X2NjbXByZWRfcmVnZXgiLCJtZXRzaXRlX3RhYmxlX3JlZ2V4IiwibWV0c2l0ZV9wZGJfcmVnZXgiLCJoc3ByZWRfaW5pdGlhbF9yZWdleCIsImhzcHJlZF9zZWNvbmRfcmVnZXgiLCJpbWFnZV9yZWdleCIsInJlc3VsdHMiLCJkb21haW5fY291bnQiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4iLCJoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiIsImdlbnRkYl9jaGVja2NoYWluc19zZWVuIiwicmVzdWx0c19mb3VuZCIsIm1ldGFwc2ljb3YiLCJtZW1wYWNrIiwiZ2VudGhyZWFkZXIiLCJtZXRzaXRlIiwiaHNwcmVkIiwibWVtZW1iZWQiLCJnZW50ZGIiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJncmFwaF9tYXRjaCIsImdyYXBoX291dCIsImNvbnRhY3RfbWF0Y2giLCJjb250YWN0IiwibGlwaWRfbWF0Y2giLCJsaXBpZF9vdXQiLCJrZXlfZmllbGRzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZmllbGQiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJ0YWJsZSIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtYXAiLCJldl9tYXRjaCIsImZyZWVjb250YWN0IiwicHNfbWF0Y2giLCJwc2ljb3YiLCJjY19tYXRjaCIsImNjbXByZWQiLCJ0YWJsZV9tYXRjaCIsInBkYl9tYXRjaCIsImluaXRpYWxfbWF0Y2giLCJzZWNvbmRfbWF0Y2giLCJpbml0aWFsIiwic2Vjb25kIiwidGRiIiwidXJpIiwiY3NzX2lkIiwibW9sX2NvbnRhaW5lcnMiLCJjb250YWluZXIiLCJjYXJ0b29uX2NvbG9yIiwiYXRvbSIsImhvdHNwb3RfY29sb3IiLCJiIiwiZWxlbWVudCIsIiQiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2aWV3ZXIiLCIkM0Rtb2wiLCJjcmVhdGVWaWV3ZXIiLCJnZXRfdGV4dCIsImFkZE1vZGVsIiwic2V0U3R5bGUiLCJjb2xvcmZ1bmMiLCJhZGRTdXJmYWNlIiwiU3VyZmFjZVR5cGUiLCJWRFciLCJjb2xvcnNjaGVtZSIsImhldGZsYWciLCJ6b29tVG8iLCJyZW5kZXIiLCJ6b29tIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZXRfYWR2YW5jZWRfcGFyYW1zIiwib3B0aW9uc19kYXRhIiwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImVyciIsInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyIsImJpb3NlcmZfbW9kZWxsZXJfa2V5IiwiZG9tc2VyZl9tb2RlbGxlcl9rZXkiLCJjaGVja2VkIiwiZmZwcmVkX3NlbGVjdGlvbiIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4iLCJleHRyYWN0X2Zhc3RhX2NoYWluIiwic2VlZFNpdGVGaW5kX2NoYWluIiwibWV0cHJlZF93cmFwcGVyX2NoYWluIiwic2VlZFNpdGVGaW5kX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX2ZwciIsImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMiLCJoc19wcmVkX2ZpcnN0X2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluIiwiaHNfcHJlZF9zZWNvbmRfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluIiwibWVtZW1iZWRfYWxnb3JpdGhtIiwibWVtZW1iZWRfYmFycmVsIiwibWVtZW1iZWRfdGVybWluaSIsInNlbmRfcmVxdWVzdCIsInVybCIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiYWpheCIsImNhY2hlIiwiY29udGVudFR5cGUiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJzZW5kX2pvYiIsImVtYWlsIiwic3VibWl0X3VybCIsInRpbWVzX3VybCIsIkJsb2IiLCJlIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlX2RhdGEiLCJ0aW1lcyIsImsiLCJmaXJlIiwiZ2V0X3ByZXZpb3VzX2RhdGEiLCJ1dWlkIiwic3VibWlzc2lvbl9yZXNwb25zZSIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc0luQXJyYXkiLCJhcnJheSIsImRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCIsInJlc2lkdWVzIiwicmVzIiwiZ2V0VXJsVmFycyIsInZhcnMiLCJwYXJ0cyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIm0iLCJrZXkiLCJkb2N1bWVudEVsZW1lbnQiLCJpbXBvcnRhbnQiLCJnZXRFbVBpeGVscyIsImV4dHJhQm9keSIsImNyZWF0ZUVsZW1lbnQiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYm9keSIsInRlc3RFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwiY2xpcGJvYXJkIiwiQ2xpcGJvYXJkIiwib24iLCJlbmRwb2ludHNfdXJsIiwiZ2VhcnNfc3ZnIiwibWFpbl91cmwiLCJhcHBfcGF0aCIsInNlcV9qb2JfbGlzdCIsInN0cnVjdF9qb2JfbGlzdCIsImhvc3RuYW1lIiwiaW5pdGlhbGlzYXRpb25fZGF0YSIsInNlcXVlbmNlX2Zvcm1fdmlzaWJsZSIsInN0cnVjdHVyZV9mb3JtX3Zpc2libGUiLCJyZXN1bHRzX3Zpc2libGUiLCJyZXN1Ym1pc3Npb25fdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJiaW9zZXJmX2FkdmFuY2VkIiwiZG9tc2VyZl9hZHZhbmNlZCIsImRvbXByZWRfYWR2YW5jZWQiLCJmZnByZWRfYWR2YW5jZWQiLCJtZXRzaXRlX2FkdmFuY2VkIiwiaHNwcmVkX2FkdmFuY2VkIiwibWVtZW1iYWRfYWR2YW5jZWQiLCJtb2RlbGxlcl9rZXkiLCJkb3dubG9hZF9saW5rcyIsImVycm9yX21lc3NhZ2UiLCJwc2lwcmVkX2hvcml6IiwiZGlzb19wcmVjaXNpb24iLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VuX3RhYmxlIiwicGdlbl9hbm5fc2V0IiwibWVtc2F0cGFja19zY2hlbWF0aWMiLCJtZW1zYXRwYWNrX2NhcnRvb24iLCJnZW5fdGFibGUiLCJnZW5fYW5uX3NldCIsInBhcnNlZHNfaW5mbyIsInBhcnNlZHNfcG5nIiwiZGdlbl90YWJsZSIsImRnZW5fYW5uX3NldCIsImJpb3NlcmZfbW9kZWwiLCJkb21zZXJmX2J1dHRvbnMiLCJkb21zZXJmX21vZGVsX3VyaXMiLCJmZnByZWRfY2FydG9vbiIsInNjaF9zY2hlbWF0aWMiLCJmdW5jdGlvbl90YWJsZXMiLCJtZXRhcHNpY292X21hcCIsIm1ldHNpdGVfcGRiIiwiaHNwcmVkX2luaXRpYWxfcGRiIiwiaHNwcmVkX3NlY29uZF9wZGIiLCJ0ZGJfZmlsZSIsIm1lbWVtYmVkX3BkYiIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF9kYXRhIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwicHNpcHJlZF9jaGVja2VkIiwiUmFjdGl2ZSIsImVsIiwidGVtcGxhdGUiLCJ1dWlkX3JlZ2V4IiwidXVpZF9tYXRjaCIsInNlcV9vYnNlcnZlciIsIm9ic2VydmUiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiaW5pdCIsImRlZmVyIiwic2VxX2xlbmd0aCIsInNlcV9zdGFydCIsInNlcV9zdG9wIiwic2VxX3R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImJhdGNoIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwic3VibWlzc2lvbl9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiZXJyb3JfdGV4dCIsImNvbnRleHQiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiIsImJsb2IiLCJzYXZlQXMiLCJldmVudCIsImFkdiIsInNldHRpbmciLCJtZXRfcGRiIiwiaW5pdGlhbF9wZGIiLCJzZWNvbmRfcGRiIiwic3VibWl0X2pvYiIsInNlcV9jb3VudCIsInRvVXBwZXJDYXNlIiwiY2hlY2tfc3RhdGVzIiwic3RydWN0X3R5cGUiLCJiaW9zZXJmX2NoZWNrZWQiLCJkb21zZXJmX2NoZWNrZWQiLCJiaW9zX21vZGVsbGVyX3Rlc3QiLCJ0ZXN0X21vZGVsbGVyX2tleSIsImRvbXNfbW9kZWxsZXJfdGVzdCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwicGRiRmlsZSIsInBkYkRhdGEiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsInJlYWRBc1RleHQiLCJvbmxvYWQiLCJyZXN1bHQiLCJtZXNzYWdlIiwib3JpZ2luYWwiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0Iiwic3RvcCIsInN1YnNlcXVlbmNlIiwiaW5wdXQiLCJjYW5jZWwiLCJwcmV2aW91c19kYXRhIiwibG9hZE5ld0FsaWdubWVudCIsImFsblVSSSIsImFublVSSSIsInRpdGxlIiwib3BlbiIsImJ1aWxkTW9kZWwiLCJtb2Rfa2V5Iiwic3dhcERvbXNlcmYiLCJ1cmlfbnVtYmVyIiwiam9iX3N0cmluZyIsImNoZWNrX2xpc3QiLCJ2ZXJpZnlfc2VxX2Zvcm0iLCJ2ZXJpZnlfc3RydWN0X2Zvcm0iLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9jaGVja2VkIiwic3RydWN0IiwiY2hlY2tlZF9hcnJheSIsInRlc3QiLCJudWNsZW90aWRlX2NvdW50Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCQyxJQUEvQixFQUNQO0FBQ0UsTUFBSUMsZUFBZSw2TkFBbkI7QUFDQUEsa0JBQWdCLHVKQUFoQjtBQUNBQSxrQkFBZ0IsNktBQWhCO0FBQ0FBLGtCQUFnQix1SkFBaEI7QUFDQSxNQUFJQyxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FELFFBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsUUFBSUMsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBLFFBQUdJLFFBQVFDLE1BQVIsS0FBbUIsQ0FBdEIsRUFBd0I7QUFDdEJQLHNCQUFnQixhQUFXTSxRQUFRLENBQVIsQ0FBWCxHQUFzQixXQUF0QixHQUFrQ0EsUUFBUSxDQUFSLENBQWxDLEdBQTZDLFdBQTdDLEdBQXlEQSxR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QyxDQUFILEVBQ0E7QUFDRXlULG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUFuRCxDQUFVLElBQVYsRUFBZ0J5SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ3RILG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEOztBQUVELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDE3ZTkwOTk2MGQ3YjBmMDJmZmMiLCJleHBvcnQgZnVuY3Rpb24gcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBoc3ByZWRfdGFibGUgPSAnPGJyIC8+PGgzPktleTwvaDM+PHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtIb3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjZmZmZmZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLUhvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24taW50ZXJmYWNlIHJlc2lkdWU8L3RkPjwvdHI+PC90YWJsZT48YnIgLz48YnIgLz4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzxoMz5SZXNpZHVlIFByZWRpY3Rpb25zPC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0aD5DaGFpbi9SZXNpZHVlPC90aD48dGg+UmVzaWR1ZSBJZGVudGl0eTwvdGg+PHRoPlNjb3JlPC90aD4nO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA9PT0gMyl7XG4gICAgICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfVxuICB9KTtcbiAgaHNwcmVkX3RhYmxlICs9ICc8dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIGhzcHJlZF90YWJsZSk7XG59XG5cbi8vIHBhcnNlIHRoZSBzbWFsbCBtZXRzaXRlIG91dHB1dCB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21ldHNpdGUocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IG1ldHNpdGVfdGFibGUgPSAnPGJyIC8+PGgzPktleTwvaDM+PHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtNZXRhbCBCaW5kaW5nIENvbnRhY3Q8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0NoYWluIG5vdCBwcmVkaWN0ZWQ8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO1ByZWRpY3RlZCBjaGFpbjwvdGQ+PC90cj48L3RhYmxlPjxiciAvPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzxoMz5SZXNpZHVlIFByZWRpY3Rpb25zPC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0aD5SZXNpZHVlIE51bWJlcjwvdGg+PHRoPlJhdyBOZXVyYWwgTmV0d29yayBTY29yZTwvdGg+PHRoPlJlc2lkdWU8L3RoPic7XG4gIGxldCBoaXRfcmVnZXggPSAvXFxkK1xccy4rP1xcc1xcd3szfVxcZCsvZztcbiAgbGV0IGhpdF9tYXRjaGVzID0gZmlsZS5tYXRjaChoaXRfcmVnZXgpO1xuICBpZihoaXRfbWF0Y2hlcylcbiAge1xuICAgIGhpdF9tYXRjaGVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccy8pO1xuICAgICAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9KTtcbiAgfVxuICBtZXRzaXRlX3RhYmxlICs9ICc8dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBtZXRzaXRlX3RhYmxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSl7XG5cbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBicF9kYXRhID0gW107XG4gIGxldCBtZl9kYXRhID0gW107XG4gIGxldCBjY19kYXRhID0gW107XG4gIGxldCB0YWJsZV9kYXRhID0gJyc7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKCcjJykpe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA8IDQpe3JldHVybjt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0JQJyl7YnBfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQ0MnKXtjY19kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdNRicpe21mX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gIH0pO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5CaW9sb2dpY2FsIFByb2Nlc3MgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGUgY2xhc3M9J3NtYWxsLXRhYmxlIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZSc+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGJwX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPk1vbGVjdWxhciBGdW5jdGlvbiBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZSBjbGFzcz0nc21hbGwtdGFibGUgdGFibGUtYm9yZGVyZWQgZ2VuLXRhYmxlJz48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgbWZfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+Q2VsbHVsYXIgQ29tcG9uZW50IFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlIGNsYXNzPSdzbWFsbC10YWJsZSB0YWJsZS1ib3JkZXJlZCBnZW4tdGFibGUnPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBjY19kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHRhYmxlX2RhdGEgKz0gJ1RoZXNlIHByZWRpY3Rpb24gdGVybXMgcmVwcmVzZW50IHRlcm1zIHByZWRpY3RlZCB3aGVyZSBTVk0gdHJhaW5pbmcgaW5jbHVkZXMgYXNzaWduZWQgR08gdGVybXMgYWNyb3NzIGFsbCBldmlkZW5jZSBjb2RlIHR5cGVzLiBTVk0gcmVsaWFiaWxpdHkgaXMgcmVnYXJkZWQgYXMgSGlnaCAoSCkgd2hlbiBNQ0MsIHNlbnNpdGl2aXR5LCBzcGVjaWZpY2l0eSBhbmQgcHJlY2lzaW9uIGFyZSBqb2ludGx5IGFib3ZlIGEgZ2l2ZW4gdGhyZXNob2xkLiBvdGhlcndpc2UgUmVsaWFiaWxpdHkgaXMgaW5kaWNhdGVkIGFzIExvdyAoTCkuIDxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxufVxuXG5mdW5jdGlvbiBzZXRfYWFub3JtKCl7XG4gIGxldCBoQUFfbm9ybSA9IHt9O1xuICBoQUFfbm9ybS5BID0geyB2YWw6IDAuMDcxNzgzMjQ4MDA2MzA5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI3MzY3NjYxNTI0Mjc1fTtcbiAgaEFBX25vcm0uViA9IHsgdmFsOiAwLjA1OTYyNDU5NTM2OTkwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDM3Nzc5MTUyODc0NX07XG4gIGhBQV9ub3JtLlkgPSB7IHZhbDogMC4wMjYwNzUwNjgyNDA0MzcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTQ4MjI0NzE1MzEzNzl9O1xuICBoQUFfbm9ybS5XID0geyB2YWw6IDAuMDE0MTY2MDAyNjEyNzcxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDEwNDcxODM1ODAxOTk2fTtcbiAgaEFBX25vcm0uVCA9IHsgdmFsOiAwLjA1MjU5MzU4Mjk3MjcxNCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDA5NDc5Mzk2NDU5N307XG4gIGhBQV9ub3JtLlMgPSB7IHZhbDogMC4wODIxMjMyNDEzMzIwOTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjg2ODc1NjYwODE1MTJ9O1xuICBoQUFfbm9ybS5QID0geyB2YWw6IDAuMDY1NTU3NTMxMzIyMjQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDM0MjM5Mzk4NDk2NzM2fTtcbiAgaEFBX25vcm0uRiA9IHsgdmFsOiAwLjAzNzEwMzk5NDk2OTAwMixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODU0MzQyMzEzOTE4Nn07XG4gIGhBQV9ub3JtLk0gPSB7IHZhbDogMC4wMjI1NjI4MTgxODM5NTUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTEzMjEwMzk2NjI0ODF9O1xuICBoQUFfbm9ybS5LID0geyB2YWw6IDAuMDU0ODMzOTc5MjY5MTg1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI5MjY0MDgzNjY3MTU3fTtcbiAgaEFBX25vcm0uTCA9IHsgdmFsOiAwLjEwMDEwNTkxNTc1OTA2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMjc2ODA4NTE5MDA5fTtcbiAgaEFBX25vcm0uSSA9IHsgdmFsOiAwLjA0MjAzNDUyNjA0MDQ2NyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyNjg0OTI2MjQ5NX07XG4gIGhBQV9ub3JtLkggPSB7IHZhbDogMC4wMjcxNDE0MDM1Mzc1OTgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTU1MDU2NjM3ODk4NX07XG4gIGhBQV9ub3JtLkcgPSB7IHZhbDogMC4wNjkxNzk4MjAxMDQ1MzYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAwODc1NjIwNTczMjh9O1xuICBoQUFfbm9ybS5RID0geyB2YWw6IDAuMDY1OTIwNTYxOTMxODAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMTAzMDkxMDA4MzY2fTtcbiAgaEFBX25vcm0uRSA9IHsgdmFsOiAwLjA0NjQ3ODQ2MjI1ODM4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE5OTQ2MjY5NDYxNzM2fTtcbiAgaEFBX25vcm0uQyA9IHsgdmFsOiAwLjAyNDkwODU1MTg3MjA1NixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyMjkwOTU4OTUwNH07XG4gIGhBQV9ub3JtLkQgPSB7IHZhbDogMC4wNDQzMzc5MDQ3MjYwNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg0MzY2NzcyNTY3MjZ9O1xuICBoQUFfbm9ybS5OID0geyB2YWw6IDAuMDMzNTA3MDIwOTg3MDMzLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE2NTM2MDIyMjg4MjA0fTtcbiAgaEFBX25vcm0uUiA9IHsgdmFsOiAwLjA1OTc0MDQ2OTAzMTE5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI1MTY1OTk0NzczMzg0fTtcbiAgcmV0dXJuKGhBQV9ub3JtKTtcbn1cblxuZnVuY3Rpb24gc2V0X2Zub3JtKCl7XG4gIGxldCBoRl9ub3JtID0ge307XG4gIGhGX25vcm0uaHlkcm9waG9iaWNpdHkgPSB7dmFsOiAtMC4zNDg3NjgyODA4MDE1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDAuNzU1NTkxNTI3Njk3OTl9O1xuICBoRl9ub3JtWydwZXJjZW50IHBvc2l0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS40NTc3MTc0NjY5NDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDMuNTY3MTMzMzQxMTM5fTtcbiAgaEZfbm9ybVsnYWxpcGhhdGljIGluZGV4J10gPSB7dmFsOiA3OS45MTE1NDkzMTkwOTksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMTYuNzg3NjE3OTc4ODI3fTtcbiAgaEZfbm9ybVsnaXNvZWxlY3RyaWMgcG9pbnQnXSA9IHt2YWw6IDcuNjEwMjA0NjM4MzYwMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDEuOTcxNjExMTAyMDA4OH07XG4gIGhGX25vcm1bJ21vbGVjdWxhciB3ZWlnaHQnXSA9IHt2YWw6IDQ4NjY4LjQxMjgzOTk2MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzc4MzguMzI0ODk1OTY5fTtcbiAgaEZfbm9ybS5jaGFyZ2UgPSB7dmFsOiA1LjA5OTE3NjMwNTc2MDQsXG4gICAgICAgICAgICAgICAgICAgIHNkZTogMTYuODM4NjM2NTkwMjV9O1xuICBoRl9ub3JtWydwZXJjZW50IG5lZ2F0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS4wMjYxOTAxMjgxNzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDQuMDIwNjYzMTY4MDkyNn07XG4gIGhGX25vcm1bJ21vbGFyIGV4dGluY3Rpb24gY29lZmZpY2llbnQnXSA9IHt2YWw6IDQ2NDc1LjI5MzkyMzkyNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzkyOTkuMzk5ODQ4ODIzfTtcbiAgcmV0dXJuKGhGX25vcm0pO1xufVxuXG5mdW5jdGlvbiBnZXRfYWFfY29sb3IodmFsKXtcbiAgICBsZXQgYWJfdmFsID0gTWF0aC5hYnModmFsKTtcbiAgICBpZihhYl92YWwgPj0gMi45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMi4yNCl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjJwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYyblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjVwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWY1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjY0NSApIHtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMTBwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxMG5cIjtcbiAgICB9XG4gICAgcmV0dXJuIFwicGxhaW5cIjtcbn1cblxuLy9wYXJzZSB0aGUgZmZwcmVkIGZlYXRjZm8gZmVhdHVyZXMgZmlsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBTRl9kYXRhID0ge307XG4gIGxldCBBQV9kYXRhID0ge307XG4gIGxldCBoRl9ub3JtID1zZXRfZm5vcm0oKTtcbiAgbGV0IGhBQV9ub3JtPXNldF9hYW5vcm0oKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJBQVwiKSl7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgQUFfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIlNGXCIpKVxuICAgIHtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBTRl9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGJ1aWxkIGh0bWwgdGFibGVzIGZvciB0aGUgZmVhdHVyZSBkYXRhXG4gIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgbGV0IGdsb2JhbF9mZWF0dXJlcyA9IHJhY3RpdmUuZ2V0KCdnbG9iYWxfZmVhdHVyZXMnKTtcbiAgbGV0IGZlYXRfdGFibGUgPSAnPGI+R2xvYmFsIEZlYXR1cmVzPC9iPjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJ0dsb2JhbCBmZWF0dXJlcyBhcmUgY2FsY3VsYXRlZCBkaXJlY3RseSBmcm9tIHNlcXVlbmNlLiBMb2NhbGlzYXRpb24gdmFsdWVzIGFyZSBwcmVkaWN0ZWQgYnkgdGhlIFBzb3J0IGFsZ29yaXRobSBhbmQgcmVmbGVjdCB0aGUgcmVsYXRpdmUgbGlrZWxpaG9vZCBvZiB0aGUgcHJvdGVpbiBvY2N1cHlpbmcgZGlmZmVyZW50IGNlbGx1bGFyIGxvY2FsaXNhdGlvbnMuIFRoZSBiaWFzIGNvbHVtbiBpcyBoaWdobGlnaHRlZCBhY2NvcmRpbmcgdG8gdGhlIHNpZ25pZmljYW5jZSBvZiB0aGUgZmVhdHVyZSB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gWiBzY29yZSBvZiB0aGUgZmVhdHVyZS48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICc8dGFibGUgIGFsaWduPVwiY2VudGVyXCIgIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCBmZnByZWQtdGFibGVcIj48dHI+PHRoPkZlYXR1cmUgTmFtZTwvdGg+PHRoPlZhbHVlPC90aD48dGg+QmlhczwvdGg+PC90cj4nO1xuXG4gIE9iamVjdC5rZXlzKFNGX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmVfbmFtZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGlmKGZlYXR1cmVfbmFtZSBpbiBoRl9ub3JtKXtcbiAgICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvciggKHBhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS1oRl9ub3JtW2ZlYXR1cmVfbmFtZV0udmFsKSAvIGhGX25vcm1bZmVhdHVyZV9uYW1lXS5zZGUpO1xuICAgIH1cbiAgICBmZWF0X3RhYmxlICs9ICc8dHI+PHRkPicrZmVhdHVyZV9uYW1lKyc8L3RkPjx0ZD4nK3BhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS50b0ZpeGVkKDIpKyc8L3RkPjx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPjwvdHI+JztcbiAgfSk7XG4gIGZlYXRfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIGZlYXRfdGFibGUpO1xuXG4gIC8vYnVpbGQgaHRtbCB0YWJsZSBmb3IgdGhlIEFBIGRhdGFcbiAgbGV0IGFhX2NvbXBvc2l0aW9uID0gcmFjdGl2ZS5nZXQoJ2FhX2NvbXBvc2l0aW9uJyk7XG4gIGxldCBhYV90YWJsZSA9ICc8Yj5BbWlubyBBY2lkIENvbXBvc2l0aW9uIChwZXJjZW50YWdlcyk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSAgYWxpZ249XCJjZW50ZXJcIiA+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGFhX3RhYmxlICs9ICc8dGg+JytyZXNpZHVlKyc8L3RoPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvcigocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKS1oQUFfbm9ybVtyZXNpZHVlXS52YWwpIC8gaEFBX25vcm1bcmVzaWR1ZV0uc2RlKTtcbiAgICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPicrKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSkqMTAwKS50b0ZpeGVkKDIpKyc8L3RkPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48L3RhYmxlPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8Yj5TaWduaWZpY2FuY2UgS2V5PC9iPjxiciAvPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGUgY2xhc3M9XCJzaWduaWZrZXlcIiBhbGlnbj1cImNlbnRlclwiIGNlbGxwYWRkaW5nPVwiMlwiIGNlbGxzcGFjaW5nPVwiMFwiPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48Yj5sb3c8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCI5XCI+Jm5ic3A7PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGFsaWduPVwicmlnaHRcIj48Yj5oaWdoPC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFuXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYyblwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNW5cIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwblwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+cCAmZ3Q7PSAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMHBcIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNXBcIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJwXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxcFwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCIxMVwiPlNpZ25pZmljYW5jZSBwIHZhbHVlIGlzIGNhbGN1bGF0ZWQgdXNpbmcgdGhlIFogc2NvcmUgb2YgdGhlIHBlcmNlbnQgYW1pbm8gYWNpZCBjb21wb3NpdGlvbjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgYWFfdGFibGUpO1xufVxuXG5cbi8vIGZvciBhIGdpdmVuIG1lbXNhdCBkYXRhIGZpbGVzIGV4dHJhY3QgY29vcmRpbmF0ZSByYW5nZXMgZ2l2ZW4gc29tZSByZWdleFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9tZW1zYXRfcmFuZ2VzKHJlZ2V4LCBkYXRhKVxue1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJywnKSlcbiAgICB7XG4gICAgICBsZXQgcmVnaW9ucyA9IG1hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICByZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uLCBpKXtcbiAgICAgICAgcmVnaW9uc1tpXSA9IHJlZ2lvbi5zcGxpdCgnLScpO1xuICAgICAgICByZWdpb25zW2ldWzBdID0gcGFyc2VJbnQocmVnaW9uc1tpXVswXSk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMV0gPSBwYXJzZUludChyZWdpb25zW2ldWzFdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCctJykpXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaFsxXSk7XG4gICAgICAgIGxldCBzZWcgPSBtYXRjaFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtbXSwgXTtcbiAgICAgICAgcmVnaW9uc1swXVswXSA9IHBhcnNlSW50KHNlZ1swXSk7XG4gICAgICAgIHJlZ2lvbnNbMF1bMV0gPSBwYXJzZUludChzZWdbMV0pO1xuICAgICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBsZXQgcGFuZWxfaGVpZ2h0ID0gKChNYXRoLmNlaWwoYW5ub3RhdGlvbnMubGVuZ3RoLzUwKSsyKSoyMCkrKDgqMjApO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogcGFuZWxfaGVpZ2h0LCBjb250YWluZXJfaGVpZ2h0OiBwYW5lbF9oZWlnaHR9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgbGV0IHBhbmVsX2hlaWdodCA9ICgoTWF0aC5jZWlsKGFubm90YXRpb25zLmxlbmd0aC81MCkrMikqMjApKyg4KjIwKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGxldCBwYW5lbF9oZWlnaHQgPSAoKE1hdGguY2VpbChhbm5vdGF0aW9ucy5sZW5ndGgvNTApKzIpKjIwKSsoOCoyMCk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IHBhbmVsX2hlaWdodCwgY29udGFpbmVyX2hlaWdodDogcGFuZWxfaGVpZ2h0fSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZVwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+VGFyZ2V0IExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UXVlcnkgTGVuPC90aD4nO1xuICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBTdGFydDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gRW5kPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEg8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0NPUDwvdGg+JztcbiAgfWVsc2Uge1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkZvbGQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0NPUDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5DQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcImNhdGhfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcInBkYl9tb2RlbGxlclxcXCIpOycgdmFsdWU9J01vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlZGljdGlvbl9yZWdleCA9IC9Eb21haW5cXHNCb3VuZGFyeVxcc2xvY2F0aW9uc1xcc3ByZWRpY3RlZFxcc0RQUzpcXHMoLispLztcbiAgbGV0IHByZWRpY3Rpb25fbWF0Y2ggPSAgcHJlZGljdGlvbl9yZWdleC5leGVjKGZpbGUpO1xuICBpZihwcmVkaWN0aW9uX21hdGNoKVxuICB7XG4gICAgbGV0IGRldGFpbHMgPSBmaWxlLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICBkZXRhaWxzID0gZGV0YWlscy5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCI8aDQ+XCIrZGV0YWlscytcIjwvaDQ+XCIpO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBpZihwcmVkaWN0aW9uX21hdGNoWzFdLmluZGV4T2YoXCIsXCIpKVxuICAgIHtcbiAgICAgIHZhbHVlcyA9IHByZWRpY3Rpb25fbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludChwcmVkaWN0aW9uX21hdGNoWzFdKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBhbm5vdGF0aW9uc1t2YWx1ZV0uZG9tcHJlZCA9ICdCJztcbiAgICB9KTtcbiAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCJObyBQYXJzZURTIERvbWFpbiBib3VuZGFyaWVzIHByZWRpY3RlZFwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF90ZXh0IH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd19wYW5lbCh2YWx1ZSwgcmFjdGl2ZSlcbntcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgdmFsdWUgKTtcbn1cblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzLCB6aXApe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgbnVsbCk7XG5cblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIgPSBcIjxoNT5Eb21QcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmZmcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdClcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBwbmdfcmVnZXggPSAvXFwucG5nJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IG1lbXBhY2tfY2FydG9vbl9yZWdleCA9IC9LYW1hZGEtS2F3YWlfXFxkKy5wbmckLztcbiAgbGV0IG1lbXBhY2tfZ3JhcGhfb3V0ID0gL2lucHV0X2dyYXBoLm91dCQvO1xuICBsZXQgbWVtcGFja19jb250YWN0X3JlcyA9IC9DT05UQUNUX0RFRjEucmVzdWx0cyQvO1xuICBsZXQgbWVtcGFja19saXBpZF9yZXMgPSAvTElQSURfRVhQT1NVUkUucmVzdWx0cyQvO1xuICBsZXQgZG9tc3NlYV9wcmVkX3JlZ2V4ID0gL1xcLnByZWQkLztcbiAgbGV0IGRvbXNzZWFfcmVnZXggPSAvXFwuZG9tc3NlYSQvO1xuICBsZXQgZG9tc2VyZl9yZWdleCA9IC8uK18oXFxkKylfKFxcZCspLipcXC5wZGIvO1xuICBsZXQgZmZwcmVkX3NjaF9yZWdleCA9IC8uK19zY2hcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtcFxcLnBuZy87XG4gIGxldCBmZnByZWRfZmVhdGNmZ19yZWdleCA9IC9cXC5mZWF0Y2ZnLztcbiAgbGV0IGZmcHJlZF9wcmVkc19yZWdleCA9IC9cXC5mdWxsX3Jhdy87XG4gIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICBsZXQgbWV0c2l0ZV90YWJsZV9yZWdleCA9IC9cXC5NZXRwcmVkLztcbiAgbGV0IG1ldHNpdGVfcGRiX3JlZ2V4ID0gL1xcLk1ldFByZWQvO1xuICBsZXQgaHNwcmVkX2luaXRpYWxfcmVnZXggPSAvX2luaXRpYWxcXC5wZGIvO1xuICBsZXQgaHNwcmVkX3NlY29uZF9yZWdleCA9IC9fc2Vjb25kXFwucGRiLztcblxuICBsZXQgaW1hZ2VfcmVnZXggPSAnJztcbiAgbGV0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHM7XG4gIGxldCBkb21haW5fY291bnQgPSAwO1xuICBsZXQgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCBoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IHJlc3VsdHNfZm91bmQgPSB7XG4gICAgICBwc2lwcmVkOiBmYWxzZSxcbiAgICAgIGRpc29wcmVkOiBmYWxzZSxcbiAgICAgIG1lbXNhdHN2bTogZmFsc2UsXG4gICAgICBwZ2VudGhyZWFkZXI6IGZhbHNlLFxuICAgICAgbWV0YXBzaWNvdjogZmFsc2UsXG4gICAgICBtZW1wYWNrOiBmYWxzZSxcbiAgICAgIGdlbnRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGRvbXByZWQ6IGZhbHNlLFxuICAgICAgcGRvbXRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGJpb3NlcmY6IGZhbHNlLFxuICAgICAgZG9tc2VyZjogZmFsc2UsXG4gICAgICBmZnByZWQ6IGZhbHNlLFxuICAgICAgbWV0c2l0ZTogZmFsc2UsXG4gICAgICBoc3ByZWQ6IGZhbHNlLFxuICAgICAgbWVtZW1iZWQ6IGZhbHNlLFxuICAgICAgZ2VudGRiOiBmYWxzZSxcbiAgfTtcbiAgbGV0IHJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kID0gZmFsc2U7XG5cbiAgLy9QcmVwYXRvcnkgbG9vcCBmb3IgaW5mb3JtYXRpb24gdGhhdCBpcyBuZWVkZWQgYmVmb3JlIHJlc3VsdHMgcGFyc2luZzpcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJwZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcInBnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9nZW5hbGlnbm1lbnRfYW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbl9kb20nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImRnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgLy9tYWluIHJlc3VsdHMgcGFyc2luZyBsb29wXG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICAvL3BzaXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09ICdwc2lwYXNzMicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5wc2lwcmVkID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByZXN1bHRzX2ZvdW5kLmRpc29wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UEJEQVQgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF90aW1lXCIsICcnKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fY29tYmluZScpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdjb21iJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DT01CIE5OIE91dHB1dDwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIC8vbWVtc2F0IGFuZCBtZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXNhdHN2bScpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1zYXRzdm0gPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hlbWVfbWF0Y2ggPSBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaGVtZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2NoZW1hdGljIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gbWVtc2F0X2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBtZW1zYXRfbWF0Y2ggPSBtZW1zYXRfZGF0YV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtZW1zYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZW1zYXRkYXRhJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIC8vbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1wYWNrX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIC8vcmVzdWx0c19mb3VuZC5tZW1wYWNrID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBtZW1wYWNrX2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5tZW1wYWNrID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5wZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIGxldCBrZXlfZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZWxsZXIta2V5Jyk7XG4gICAgICBmb3IobGV0IGZpZWxkIG9mIGtleV9maWVsZHMpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG4gICAgICAgIGZpZWxkLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNfZm91bmQuZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZ2VuX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5wZG9tdGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgLy9wZG9tdGhyZWFkZXJcbiAgICAvLyBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3ZtX3Byb2JfZG9tJylcbiAgICAvLyB7XG4gICAgLy8gICBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgLy8gICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAvLyAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgLy8gfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2RvbV9hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL2RvbXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGFyc2VkcycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5kb21wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgcG5nX21hdGNoID0gcG5nX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHBuZ19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnkgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBmaWxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGFyc2VkcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21zc2VhJylcbiAgICB7XG4gICAgICBsZXQgcHJlZF9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWFwcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGRvbXNzZWFfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNzZWFfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncnVuQmlvc2VyZicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5iaW9zZXJmID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfbW9kZWxcIiwgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hoYmxpdHNfcGRiNzAnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhIU2VhcmNoIFJlc3VsdHM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BncGJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X2NhdGgnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0FUSCBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncmVmb3JtYXRfZG9tc2VyZl9tb2RlbHMnIHx8IHJlc3VsdF9kaWN0Lm5hbWUgPT09IFwicGFyc2VfcGRiX2JsYXN0XCIpXG4gICAge1xuICAgICAgbGV0IGRvbXNlcmZfbWF0Y2ggPSBkb21zZXJmX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNlcmZfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgICAvLyBUTyBETyBBREQgUkVHRVhcbiAgICAgICAgZG9tYWluX2NvdW50Kz0xO1xuICAgICAgICByZXN1bHRzX2ZvdW5kLmRvbXNlcmYgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmZmcHJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2ZseScpXG4gICAge1xuICAgICAgbGV0IHByZWRzX21hdGNoID0gZmZwcmVkX3ByZWRzX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRzX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5HTyBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZHByZWRpY3Rpb25zJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGxvdF9zZWxmX2NvbnRhY3RfbWFwJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1ldGFwc2ljb3YgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBNYXA8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsICc8Yj5Db250YWN0IE1hcDwvYj48YnIgLz48aW1nIGhlaWdodD1cIjgwMFwiIHdpZHRoPVwiODAwXCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY29udGFjdF9wcmVkaWN0b3JzJylcbiAgICB7XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICAgICAgICBsZXQgZXZfbWF0Y2ggPSBtZXRhcHNpY292X2V2X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoZXZfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RnJlZUNvbnRhY3QgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBzX21hdGNoID0gbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihwc19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UFNJQ09WIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjY19tYXRjaCA9IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGNjX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0NNUFJFRCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgID09PSAnbWV0YXBzaWNvdl9zdGFnZTInKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHNpdGVfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgICAgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHByZWRfd3JhcHBlcicpXG4gICAge1xuICAgICAgbGV0IHRhYmxlX21hdGNoID0gbWV0c2l0ZV90YWJsZV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgcGRiX21hdGNoID0gbWV0c2l0ZV9wZGJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgcmVzdWx0c19mb3VuZC5tZXRzaXRlID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfdGltZVwiLCAnJyk7XG4gICAgICBpZih0YWJsZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZXRzaXRlJywgemlwLCByYWN0aXZlKTtcblxuICAgICAgfVxuICAgICAgaWYocGRiX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgUERCPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc3ByZWRfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgIGhzcHJlZF9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hzX3ByZWQnKVxuICAgIHtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5oc3ByZWQgPSB0cnVlO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SFNQcmVkIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaHNwcmVkJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NwbGl0X3BkYl9maWxlcycpXG4gICAge1xuICAgICAgbGV0IGluaXRpYWxfbWF0Y2ggPSBoc3ByZWRfaW5pdGlhbF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgc2Vjb25kX21hdGNoID0gaHNwcmVkX3NlY29uZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihpbml0aWFsX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SW5pdGlhbCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYoc2Vjb25kX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZWNvbmQgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjaGVja19wZGJfdGRiJyl7XG4gICAgICBnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtYWtldGRiJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmdlbnRkYiA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlREQiBGaWxlPC9hPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCAnPGgzPjxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2xpY2sgaGVyZSB0byBkb3dubG9hZCB5b3VyIFREQiBGaWxlPC9hPjwvaDM+Jyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1lbWJlZCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1lbWJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtZW1iZWQgUERCIGZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cblxuICB9XG5cbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoISByZXN1bHRzX2ZvdW5kW2pvYl9uYW1lXSlcbiAgICB7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfd2FpdGluZ19tZXNzYWdlXCIsICdUaGUgam9iIGNvbXBsZXRlZCBzdWNjZXNmdWxseSBidXQgbm8gcHJlZGljdGlvbiB3YXMgcG9zc2libGUgZm9yIHRoZSBpbnB1dCBkYXRhLiBObyAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBkYXRhIGdlbmVyYXRlZCBmb3IgdGhpcyBqb2InKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZStcIl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgfSk7XG4gIGlmKCEgcmVzdWx0c19mb3VuZC5tZW1wYWNrKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aDM+Tm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPC9oMz4nKTtcbiAgfVxuICBpZihtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLm1ldHNpdGUpXG4gIHtcbiAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICdXZSBjb3VsZCBub3QgZmluZCB0aGUgUERCIENoYWluIElEIHByb3ZpZGVkJyk7XG5cbiAgfVxuICBpZihoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQuaHNwcmVkKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdXZSBjb3VsZCBub3QgZmluZCB0aGUgUERCIENoYWluIElEcyBwcm92aWRlZCcpO1xuICB9XG4gIGlmKGdlbnRkYl9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5nZW50ZGIpXG4gIHtcbiAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX21lc3NhZ2VcIiwgJ1BEQiBwcm92aWRlZCBkaWQgbm90IGNvbnRhaW4gYSBzaW5nbGUgY2hhaW4gbGFibGVkIGFzIGNoYWluIEEnKTtcbiAgfVxuXG5cbiAgaWYocmVzdWx0c19mb3VuZC5kb21zZXJmKVxuICB7XG4gICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5X3N0cnVjdHVyZSh1cmksIGNzc19pZCwgY2FydG9vbilcbntcbiAgbGV0IG1vbF9jb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9sLWNvbnRhaW5lcicpO1xuICBmb3IobGV0IGNvbnRhaW5lciBvZiBtb2xfY29udGFpbmVycylcbiAge1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjQwMHB4XCI7XG4gIH1cbiAgbGV0IGNhcnRvb25fY29sb3IgPSBmdW5jdGlvbihhdG9tKSB7XG4gICAgaWYoYXRvbS5zcyA9PT0gJ2gnKXtyZXR1cm4gJyNlMzUzZTMnO31cbiAgICBpZihhdG9tLnNzID09PSAncycpe3JldHVybiAnI2U1ZGQ1NSc7fVxuICAgIHJldHVybignZ3JleScpO1xuICB9O1xuICBsZXQgaG90c3BvdF9jb2xvciA9IGZ1bmN0aW9uKGF0b20pe1xuICAgIGlmKGF0b20uYiA9PSAxLjApe3JldHVybiAncmVkJzt9XG4gICAgaWYoYXRvbS5iID09IDAuNSl7cmV0dXJuICdibGFjayc7fVxuICAgIGlmKGF0b20uYiA9PSA1MCl7cmV0dXJuICd3aGl0ZSc7fVxuICAgIGlmKGF0b20uYiA9PSAxMDApe3JldHVybiAncmVkJzt9XG4gICAgcmV0dXJuKFwiYmx1ZVwiKTtcbiAgfTtcbiAgY29uc29sZS5sb2coXCJMT0FESU5HOiBcIit1cmkpO1xuICBsZXQgZWxlbWVudCA9ICQoY3NzX2lkKTtcbiAgbGV0IGNvbmZpZyA9IHsgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicgfTtcbiAgbGV0IHZpZXdlciA9ICQzRG1vbC5jcmVhdGVWaWV3ZXIoIGVsZW1lbnQsIGNvbmZpZyApO1xuICBsZXQgZGF0YSA9IGdldF90ZXh0KHVyaSwgXCJHRVRcIiwge30pO1xuICB2aWV3ZXIuYWRkTW9kZWwoIGRhdGEsIFwicGRiXCIgKTsgICAgICAgICAgICAgICAgICAgICAgIC8qIGxvYWQgZGF0YSAqL1xuICBpZihjYXJ0b29uKVxuICB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogY2FydG9vbl9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGVsc2Uge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGhvdHNwb3RfY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBpZihjc3NfaWQuc3RhcnRzV2l0aCgnI21lbWVtYmVkJykpe1xuICAgIHZpZXdlci5hZGRTdXJmYWNlKCQzRG1vbC5TdXJmYWNlVHlwZS5WRFcsIHsnb3BhY2l0eSc6MC44LCBjb2xvcnNjaGVtZTogJ3doaXRlQ2FyYm9uJ30sIHtoZXRmbGFnOnRydWV9LHt9KTtcbiAgfVxuICB2aWV3ZXIuem9vbVRvKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBzZXQgY2FtZXJhICovXG4gIHZpZXdlci5yZW5kZXIoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHJlbmRlciBzY2VuZSAqL1xuICB2aWV3ZXIuem9vbSgxLjcsIDMwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbylcbntcbiAgLy9jb25zb2xlLmxvZyhkb3dubG9hZHNfaW5mbyk7XG4gIGxldCBkb3dubG9hZHNfc3RyaW5nID0gcmFjdGl2ZS5nZXQoJ2Rvd25sb2FkX2xpbmtzJyk7XG4gIGlmKCdwc2lwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXope1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXopO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO31cbiAgfVxuICBpZignZG9tcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuXG4gIGlmKCdkaXNvcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXNhdHN2bScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3BnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZG9tdGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICAgIH1cbiAgfVxuICBpZignbWVtcGFjaycgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5oZWFkZXIpO1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbilcbiAgICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0KTtcbiAgICB9XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQpXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldHNpdGUnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2hzcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50ZGInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRkYi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbWVtYmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5wZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuXG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsIGRvd25sb2Fkc19zdHJpbmcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYWR2YW5jZWRfcGFyYW1zKClcbntcbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHt9O1xuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX2VfdmFsdWVfY3V0b2ZmXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IFwiMC4wMVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX3BzaWJsYXN0X2l0ZXJhdGlvbnNcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IDU7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaW9zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXNlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmZwcmVkX2ZseVwiKS5jaGVja2VkKVxuICAgIHsgIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJmbHlcIjt9XG4gICAgZWxzZVxuICAgIHtvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiaHVtYW5cIjt9XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImh1bWFuXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gXCJDYVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBcIkNhXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2ZwclwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IFwiNVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IFwiQUJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQlwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9hbGdvcml0aG1cIikudmFsdWU7XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9iYXJyZWxfeWVzXCIpLmNoZWNrZWQpe1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdUUlVFJztcbiAgICB9ZWxzZXtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnRkFMU0UnO1xuICAgIH1cbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX3Rlcm1pbmFsX2luXCIpLmNoZWNrZWQpXG4gICAge1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcImluXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwib3V0XCI7XG4gICAgfVxuICAgIC8vb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYm91bmRhcmllc1wiKTtcbiAgfVxuICBjYXRjaChlcnIpXG4gIHtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ0ZBTFNFJztcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwiaW5cIjtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtID0gMDtcbiAgfVxuXG4gIHJldHVybihvcHRpb25zX2RhdGEpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMiLCJpbXBvcnQgeyBnZXRfbWVtc2F0X3JhbmdlcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9zczIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGJkYXQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfY29tYiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZW1zYXRkYXRhIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3ByZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGFyc2VkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZWF0Y2ZnIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZmcHJlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWV0c2l0ZSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9oc3ByZWQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG4vL2dpdmVuIGEgdXJsLCBodHRwIHJlcXVlc3QgdHlwZSBhbmQgc29tZSBmb3JtIGRhdGEgbWFrZSBhbiBodHRwIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX3JlcXVlc3QodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG4gIGNvbnNvbGUubG9nKCdTZW5kaW5nIFVSSSByZXF1ZXN0Jyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnNvbGUubG9nKHR5cGUpO1xuICB2YXIgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gc2VuZCBkYXRhXCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIlNlbmRpbmcgSm9iIHRvIFwiK3VybCtcIiBGYWlsZWQuIFwiK2Vycm9yLnJlc3BvbnNlVGV4dCtcIi4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIHdhcyB1bmFibGUgdG8gcHJvY2VzcyB5b3VyIHN1Ym1pc3Npb24uIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpOyByZXR1cm4gbnVsbDtcbiAgfX0pLnJlc3BvbnNlSlNPTjtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuLy9naXZlbiBhIGpvYiBuYW1lIHByZXAgYWxsIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBzZW5kIGFuIGh0dHAgcmVxdWVzdCB0byB0aGVcbi8vYmFja2VuZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfam9iKHJhY3RpdmUsIGpvYl9uYW1lLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIHZhciBmaWxlID0gbnVsbDtcbiAgdHJ5XG4gIHtcbiAgICBmaWxlID0gbmV3IEJsb2IoW3NlcV0pO1xuICB9IGNhdGNoIChlKVxuICB7XG4gICAgYWxlcnQoZSk7XG4gIH1cbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwiaW5wdXRfZGF0YVwiLCBmaWxlLCAnaW5wdXQudHh0Jyk7XG4gIGZkLmFwcGVuZChcImpvYlwiLGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwic3VibWlzc2lvbl9uYW1lXCIsbmFtZSk7XG4gIGZkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2RvbXByZWQnKSl7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSk7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9uc1wiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdtZXRzaXRlJykpe1xuICBmZC5hcHBlbmQoXCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiZXh0cmFjdF9mYXN0YV9jaGFpblwiLCBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9tZXRhbFwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9tZXRhbFwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2ZwclwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2Zwcik7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnaHNwcmVkJykpe1xuICBmZC5hcHBlbmQoXCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zXCIsIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zKTtcbiAgZmQuYXBwZW5kKFwiaHNfcHJlZF9maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfc2Vjb25kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbik7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnbWVtZW1iZWQnKSl7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfYmFycmVsXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwpO1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF90ZXJtaW5pXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdmZnByZWQnKSl7XG4gIGZkLmFwcGVuZChcImZmcHJlZF9zZWxlY3Rpb25cIiwgb3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24pO1xuICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgfVxuICBjb25zb2xlLmxvZyhvcHRpb25zX2RhdGEpO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdnZW50ZGInLCAnbWVtZW1iZWQnXS5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnaHNwcmVkJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgY29uc29sZS5sb2coTWF0aC5jZWlsKHJlc2lkdWVzLmxlbmd0aC81MCkpO1xuICBsZXQgcGFuZWxfaGVpZ2h0ID0gKChNYXRoLmNlaWwoYW5ub3RhdGlvbnMubGVuZ3RoLzUwKSsyKSoyMCkrKDgqMjApO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChyYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKSwge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiBwYW5lbF9oZWlnaHQsIGNvbnRhaW5lcl9oZWlnaHQ6IHBhbmVsX2hlaWdodH0pO1xufVxuXG4vL2dpdmVuIGEgVVJMIHJldHVybiB0aGUgYXR0YWNoZWQgdmFyaWFibGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJsVmFycygpIHtcbiAgICBsZXQgdmFycyA9IHt9O1xuICAgIC8vY29uc2lkZXIgdXNpbmcgbG9jYXRpb24uc2VhcmNoIGluc3RlYWQgaGVyZVxuICAgIGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSxcbiAgICBmdW5jdGlvbihtLGtleSx2YWx1ZSkge1xuICAgICAgdmFyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhcnM7XG4gIH1cblxuLyohIGdldEVtUGl4ZWxzICB8IEF1dGhvcjogVHlzb24gTWF0YW5pY2ggKGh0dHA6Ly9tYXRhbmljaC5jb20pLCAyMDEzIHwgTGljZW5zZTogTUlUICovXG4oZnVuY3Rpb24gKGRvY3VtZW50LCBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAvLyBFbmFibGUgc3RyaWN0IG1vZGVcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIEZvcm0gdGhlIHN0eWxlIG9uIHRoZSBmbHkgdG8gcmVzdWx0IGluIHNtYWxsZXIgbWluaWZpZWQgZmlsZVxuICAgIGxldCBpbXBvcnRhbnQgPSBcIiFpbXBvcnRhbnQ7XCI7XG4gICAgbGV0IHN0eWxlID0gXCJwb3NpdGlvbjphYnNvbHV0ZVwiICsgaW1wb3J0YW50ICsgXCJ2aXNpYmlsaXR5OmhpZGRlblwiICsgaW1wb3J0YW50ICsgXCJ3aWR0aDoxZW1cIiArIGltcG9ydGFudCArIFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50ICsgXCJwYWRkaW5nOjBcIiArIGltcG9ydGFudDtcblxuICAgIHdpbmRvdy5nZXRFbVBpeGVscyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICAgICAgbGV0IGV4dHJhQm9keTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEVtdWxhdGUgdGhlIGRvY3VtZW50RWxlbWVudCB0byBnZXQgcmVtIHZhbHVlIChkb2N1bWVudEVsZW1lbnQgZG9lcyBub3Qgd29yayBpbiBJRTYtNylcbiAgICAgICAgICAgIGVsZW1lbnQgPSBleHRyYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYm9keVwiKTtcbiAgICAgICAgICAgIGV4dHJhQm9keS5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQ7XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGV4dHJhQm9keSwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYW5kIHN0eWxlIGEgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGU7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgY2xpZW50IHdpZHRoIG9mIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHZhbHVlID0gdGVzdEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgaWYgKGV4dHJhQm9keSkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBleHRyYSBib2R5IGVsZW1lbnRcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChleHRyYUJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlbSB2YWx1ZSBpbiBwaXhlbHNcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KGRvY3VtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9jb21tb24vY29tbW9uX2luZGV4LmpzIiwiLyogMS4gQ2F0Y2ggZm9ybSBpbnB1dFxuICAgICAyLiBWZXJpZnkgZm9ybVxuICAgICAzLiBJZiBnb29kIHRoZW4gbWFrZSBmaWxlIGZyb20gZGF0YSBhbmQgcGFzcyB0byBiYWNrZW5kXG4gICAgIDQuIHNocmluayBmb3JtIGF3YXlcbiAgICAgNS4gT3BlbiBzZXEgcGFuZWxcbiAgICAgNi4gU2hvdyBwcm9jZXNzaW5nIGFuaW1hdGlvblxuICAgICA3LiBsaXN0ZW4gZm9yIHJlc3VsdFxuKi9cbmltcG9ydCB7IHZlcmlmeV9hbmRfc2VuZF9mb3JtIH0gZnJvbSAnLi9mb3Jtcy9mb3Jtc19pbmRleC5qcyc7XG5pbXBvcnQgeyBzZW5kX3JlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF9wcmV2aW91c19kYXRhIH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0VXJsVmFycyB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBzZXRfYWR2YW5jZWRfcGFyYW1zIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGNsZWFyX3NldHRpbmdzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHByZXBhcmVfZG93bmxvYWRzX2h0bWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgaGFuZGxlX3Jlc3VsdHMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2V0X2Rvd25sb2Fkc19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzaG93X3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGRpc3BsYXlfc3RydWN0dXJlIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcblxudmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJy5jb3B5QnV0dG9uJyk7XG52YXIgemlwID0gbmV3IEpTWmlwKCk7XG5cbmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuXG4vLyBTRVQgRU5EUE9JTlRTIEZPUiBERVYsIFNUQUdJTkcgT1IgUFJPRFxubGV0IGVuZHBvaW50c191cmwgPSBudWxsO1xubGV0IHN1Ym1pdF91cmwgPSBudWxsO1xubGV0IHRpbWVzX3VybCA9IG51bGw7XG5sZXQgZ2VhcnNfc3ZnID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbmxldCBtYWluX3VybCA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWtcIjtcbmxldCBhcHBfcGF0aCA9IFwiL3BzaXByZWRfYmV0YVwiO1xubGV0IGZpbGVfdXJsID0gJyc7XG5sZXQgZ2Vhcl9zdHJpbmcgPSAnPG9iamVjdCB3aWR0aD1cIjE0MFwiIGhlaWdodD1cIjE0MFwiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCIgZGF0YT1cIicrZ2VhcnNfc3ZnKydcIj48L29iamVjdD4nO1xubGV0IGpvYl9saXN0ID0gW1wicHNpcHJlZFwiLCBcInBnZW50aHJlYWRlclwiLCBcIm1ldGFwc2ljb3ZcIiwgXCJkaXNvcHJlZFwiLCBcIm1lbXBhY2tcIixcbiAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIiwgXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgc2VxX2pvYl9saXN0ID0gW1wicHNpcHJlZFwiLCBcInBnZW50aHJlYWRlclwiLCBcIm1ldGFwc2ljb3ZcIiwgXCJkaXNvcHJlZFwiLCBcIm1lbXBhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLF07XG5sZXQgc3RydWN0X2pvYl9saXN0ID0gW1wibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IGpvYl9uYW1lcyA9IHtcbiAgJ3BzaXByZWQnOiAnUFNJUFJFRCBWNC4wJyxcbiAgJ2Rpc29wcmVkJzogJ0RJT1NQUkVEIDMnLFxuICAnbWVtc2F0c3ZtJzogJ01FTVNBVC1TVk0nLFxuICAncGdlbnRocmVhZGVyJzogJ3BHZW5USFJFQURFUicsXG4gICdtZW1wYWNrJzogJ01FTVBBQ0snLFxuICAnZ2VudGhyZWFkZXInOiAnR2VuVEhSRUFERVInLFxuICAnZG9tcHJlZCc6ICdEb21QcmVkJyxcbiAgJ3Bkb210aHJlYWRlcic6ICdwRG9tVEhSRUFERVInLFxuICAnYmlvc2VyZic6ICdCaW9zU2VyZiB2Mi4wJyxcbiAgJ2RvbXNlcmYnOiAnRG9tU2VyZiB2Mi4xJyxcbiAgJ2ZmcHJlZCc6ICdGRlByZWQgMycsXG4gICdtZXRhcHNpY292JzogJ01ldGFQU0lDT1YnLFxuICAnbWV0c2l0ZSc6ICdNZXRTaXRlJyxcbiAgJ2hzcHJlZCc6ICdIU1ByZWQnLFxuICAnbWVtZW1iZWQnOiAnTUVNRU1CRUQnLFxuICAnZ2VudGRiJzogJ0dlbmVyYXRlIFREQicsXG59O1xuXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIilcbntcbiAgZW5kcG9pbnRzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9qb2J0aW1lcy8nO1xuICBhcHBfcGF0aCA9ICcvaW50ZXJmYWNlJztcbiAgbWFpbl91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwJztcbiAgZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xuICBmaWxlX3VybCA9IG1haW5fdXJsO1xufVxuZWxzZSBpZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJiaW9pbmZzdGFnZTEuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgID09PSBcImJpb2luZi5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ocmVmICA9PT0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvXCIpIHtcbiAgZW5kcG9pbnRzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9qb2J0aW1lcy8nO1xuICBmaWxlX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoK1wiL2FwaVwiO1xuICAvL2dlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbn1cbmVsc2Uge1xuICBhbGVydCgnVU5TRVRUSU5HIEVORFBPSU5UUyBXQVJOSU5HLCBXQVJOSU5HIScpO1xuICBlbmRwb2ludHNfdXJsID0gJyc7XG4gIHN1Ym1pdF91cmwgPSAnJztcbiAgdGltZXNfdXJsID0gJyc7XG59XG5cbmxldCBpbml0aWFsaXNhdGlvbl9kYXRhID0ge1xuICAgIHNlcXVlbmNlX2Zvcm1fdmlzaWJsZTogMSxcbiAgICBzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfdmlzaWJsZTogMSxcbiAgICByZXN1Ym1pc3Npb25fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3BhbmVsX3Zpc2libGU6IDEsXG4gICAgc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZTogMCxcbiAgICBiaW9zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXNlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tcHJlZF9hZHZhbmNlZDogMCxcbiAgICBmZnByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWV0c2l0ZV9hZHZhbmNlZDogMCxcbiAgICBoc3ByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWVtZW1iYWRfYWR2YW5jZWQ6IDAsXG4gICAgbW9kZWxsZXJfa2V5OiBudWxsLFxuICAgIGRvd25sb2FkX2xpbmtzOiAnJyxcbiAgICBlcnJvcl9tZXNzYWdlOiAnJyxcblxuICAgIHBzaXByZWRfaG9yaXo6IG51bGwsXG4gICAgZGlzb19wcmVjaXNpb246IG51bGwsXG4gICAgbWVtc2F0c3ZtX3NjaGVtYXRpYzogJycsXG4gICAgbWVtc2F0c3ZtX2NhcnRvb246ICcnLFxuICAgIHBnZW5fdGFibGU6IG51bGwsXG4gICAgcGdlbl9hbm5fc2V0OiB7fSxcbiAgICBtZW1zYXRwYWNrX3NjaGVtYXRpYzogJycsXG4gICAgbWVtc2F0cGFja19jYXJ0b29uOiAnJyxcbiAgICBnZW5fdGFibGU6IG51bGwsXG4gICAgZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIHBhcnNlZHNfaW5mbzogbnVsbCxcbiAgICBwYXJzZWRzX3BuZzogbnVsbCxcbiAgICBkZ2VuX3RhYmxlOiBudWxsLFxuICAgIGRnZW5fYW5uX3NldDoge30sXG4gICAgYmlvc2VyZl9tb2RlbDogbnVsbCxcbiAgICBkb21zZXJmX2J1dHRvbnM6ICcnLFxuICAgIGRvbXNlcmZfbW9kZWxfdXJpczogW10sXG4gICAgZmZwcmVkX2NhcnRvb246IG51bGwsXG4gICAgc2NoX3NjaGVtYXRpYzogbnVsbCxcbiAgICBhYV9jb21wb3NpdGlvbjogbnVsbCxcbiAgICBnbG9iYWxfZmVhdHVyZXM6IG51bGwsXG4gICAgZnVuY3Rpb25fdGFibGVzOiBudWxsLFxuICAgIG1ldGFwc2ljb3ZfbWFwOiBudWxsLFxuICAgIG1ldHNpdGVfdGFibGU6IG51bGwsXG4gICAgbWV0c2l0ZV9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3RhYmxlOiBudWxsLFxuICAgIGhzcHJlZF9pbml0aWFsX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfc2Vjb25kX3BkYjogbnVsbCxcbiAgICB0ZGJfZmlsZTogbnVsbCxcbiAgICBtZW1lbWJlZF9wZGI6IG51bGwsXG5cbiAgICBtZXRhcHNpY292X2RhdGE6IG51bGwsXG4gICAgbWV0c2l0ZV9kYXRhOiBudWxsLFxuICAgIGhzcHJlZF9kYXRhOiBudWxsLFxuICAgIG1lbWVtYmVkX2RhdGE6IG51bGwsXG4gICAgZ2VudGRiX2RhdGE6IG51bGwsXG5cbiAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICBzZXF1ZW5jZTogJycsXG4gICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgZW1haWw6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGJhdGNoX3V1aWQ6IG51bGwsXG4gICAgLy9ob2xkIGFubm90YXRpb25zIHRoYXQgYXJlIHJlYWQgZnJvbSBkYXRhZmlsZXNcbiAgICBhbm5vdGF0aW9uczogbnVsbCxcbn07XG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfYnV0dG9uJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2pvYiddID0gam9iX25hbWUrJ19qb2InO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJ10gPSAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19pY29uJ10gPSBnZWFyX3N0cmluZztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfdGltZSddID0gJ0xvYWRpbmcgRGF0YSc7XG59KTtcbmluaXRpYWxpc2F0aW9uX2RhdGEucHNpcHJlZF9jaGVja2VkID0gdHJ1ZTtcbi8vIGluaXRpYWxpc2F0aW9uX2RhdGEubWVtZW1iZWRfYWR2YW5jZWQgPSAxO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5zZXF1ZW5jZV9mb3JtX3Zpc2libGUgPSAwO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5zdHJ1Y3R1cmVfZm9ybV92aXNpYmxlID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIHNlcV90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgfVxuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgIGxldCBiYXRjaCA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgZG93bmxvYWRzX2luZm8gPSB7fTtcblxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnQ29tcGxldGUnKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyIHJlc3VsdHNcIik7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSBiYXRjaC5zdWJtaXNzaW9ucztcbiAgICAgIHN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gICAgICAgICAgaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcywgam9iX2xpc3QpO1xuXG4gICAgICB9KTtcbiAgICAgIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pO1xuXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdFcnJvcicgfHwgYmF0Y2guc3RhdGUgPT09ICdDcmFzaCcpXG4gICAge1xuICAgICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgbnVsbCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19pY29uJywgbnVsbCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ190aW1lJywgbnVsbCk7XG4gICAgICB9KTtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBsZXQgZXJyb3JfdGV4dCA9IFwiPGgzPlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWQ8L2gzPlwiK1xuICAgICAgXCI8aDQ+UGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGUgZXJyb3IgbWVzc2FnZSBhbmQgam9iIElEOlwiK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykrXCI8L2g0PlwiK1xuICAgICAgXCI8aDU+RXJyb3IgTWVzc2FnZTo8YnIgLz5cIitzdWJtaXNzaW9uX21lc3NhZ2UrXCI8L2g1PlwiO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Vycm9yX21lc3NhZ2UnLCBlcnJvcl90ZXh0KTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxucmFjdGl2ZS5vbignc2hvd19iaW9zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19mZnByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2ZmcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZXRzaXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfaHNwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWVtZW1iZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHBhbmVsXG4vL1xucmFjdGl2ZS5vbiggJ3NlcXVlbmNlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIGZhbHNlKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgc2hvd19wYW5lbCgxLCByYWN0aXZlKTtcbn0pO1xuXG4vL3JlZ2lzdGVyIGxpc3RlbmVycyBmb3IgZWFjaCByZXN1bHRzIHBhbmVsXG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lLCBpKXtcbiAgY29uc29sZS5sb2coXCJhZGRpbmcgam9icyB3YXRjaGVyc1wiKTtcbiAgcmFjdGl2ZS5vbihqb2JfbmFtZSsnX2FjdGl2ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgIHNob3dfcGFuZWwoaSsyLCByYWN0aXZlKTtcbiAgICBpZihqb2JfbmFtZSA9PT0gXCJwc2lwcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSBcImRpc29wcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnYmlvc2VyZl9tb2RlbCcpKXtcbiAgICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfbW9kZWwnKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgYmlvc2VyZl9tb2RlbCA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX21vZGVsJyk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoYmlvc2VyZl9tb2RlbCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21ldHNpdGUnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpKXtcbiAgICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IG1ldF9wZGIgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZXRfcGRiLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdoc3ByZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKSl7XG4gICAgICBpZihyYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgaW5pdGlhbF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJyk7XG4gICAgICAgIGxldCBzZWNvbmRfcGRiID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGluaXRpYWxfcGRiLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShzZWNvbmRfcGRiLCAgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfX1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZW1lbWJlZCcpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21lbWVtYmVkX3BkYicpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgIGxldCBtZW1lbWJlZF9wZGIgPSByYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJyk7XG4gICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZW1lbWJlZF9wZGIsICcjbWVtZW1iZWRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fGpvYl9uYW1lID09PSAnZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbignc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBjb25zb2xlLmxvZyhcIlNVQk1JU1NJT04gQUNUSVZFXCIpO1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuXG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgc3VibWl0X2pvYiA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHNlcV9jb3VudCA9IHNlcS5zcGxpdChcIj5cIikubGVuZ3RoO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGxldCBzdHJ1Y3RfdHlwZSA9IGZhbHNlO1xuICBsZXQgc2VxX3R5cGUgPSBmYWxzZTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzdHJ1Y3Rfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHN0cnVjdF90eXBlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHNlcV9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc2VxX3R5cGUgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICAvL0hBTkRMRSBGRlBSRUQgSk9CIFNFTEVDVElPTi5cbiAgaWYoY2hlY2tfc3RhdGVzLmJpb3NlcmZfY2hlY2tlZCB8fCBjaGVja19zdGF0ZXMuZG9tc2VyZl9jaGVja2VkKVxuICB7XG4gICAgbGV0IGJpb3NfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgbGV0IGRvbXNfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgaWYoYmlvc19tb2RlbGxlcl90ZXN0IHx8IGRvbXNfbW9kZWxsZXJfdGVzdClcbiAgICB7XG4gICAgICBzdWJtaXRfam9iID10cnVlO1xuICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHByb3ZpZGVkIGEgdmFsaWQgTU9ERUxMRVIga2V5LiBDb250YWN0IHRoZSBTYWxpIGxhYiBmb3IgYSBNT0RFTExFUiBsaWNlbmNlLlwiKTtcbiAgICB9XG4gIH1cbiAgZWxzZXtcbiAgICBzdWJtaXRfam9iPXRydWU7XG4gIH1cbiAgaWYoc2VxX3R5cGUgJiYgc3RydWN0X3R5cGUpXG4gIHtcbiAgICBhbGVydChcIllvdSBjYW4gbm90IHN1Ym1pdCBib3RoIHNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYW5hbHlzaXMgam9ic1wiKTtcbiAgICBzdWJtaXRfam9iID0gZmFsc2U7XG4gIH1cbiAgaWYoc2VxX2NvdW50ID4gMSlcbiAge1xuICAgIGFsZXJ0KFwiTVNBIElucHV0IGZvcmJpZGRlblwiKTtcbiAgICBzdWJtaXRfam9iPWZhbHNlO1xuICB9XG4gIGlmKHN1Ym1pdF9qb2IpXG4gIHtcbiAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmdcIik7XG4gICAgaWYoc2VxX3R5cGUpXG4gICAge1xuICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICB9XG4gICAgaWYoc3RydWN0X3R5cGUpXG4gICAge1xuICAgICAgbGV0IHBkYkZpbGUgPSBudWxsO1xuICAgICAgbGV0IHBkYkRhdGEgPSAnJztcbiAgICAgIHRyeXtcbiAgICAgICBwZGJGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZGJGaWxlXCIpO1xuICAgICAgIGxldCBmaWxlID0gcGRiRmlsZS5maWxlc1swXTtcbiAgICAgICBsZXQgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBwZGJEYXRhID0gZnIucmVzdWx0O1xuICAgICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBwZGJEYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGVycikge1xuICAgICAgICBwZGJEYXRhID0gXCJcIjtcbiAgICAgICAgaWYoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJGaWxlUmVhZGVyLnJlYWRBc1RleHQgaXMgbm90IGFuIG9iamVjdFwiKSl7XG4gICAgICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3Qgc2VsZWN0ZWQgYSBQREIgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoK1wiL1wiKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgfSk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcywgemlwKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmZ1bmN0aW9uIHRlc3RfbW9kZWxsZXJfa2V5KGlucHV0KVxue1xuICBpZihpbnB1dCA9PT0gJ01PREVMSVJBTkpFJylcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGxldCBzZXFfdHlwZSA9IHRydWU7XG4gIGNvbnNvbGUubG9nKHByZXZpb3VzX2RhdGEuam9icyk7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Rpc29wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1wYWNrJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDYpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDcpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSAmJiAhIHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIGlmKHNlcV90eXBlKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1Ym1pc3Npb25fdmlzaWJsZScsIDEgKTtcbiAgfVxuICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHNlcV90eXBlKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIE5ldyBQYW5uZWwgZnVuY3Rpb25zXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWROZXdBbGlnbm1lbnQoYWxuVVJJLGFublVSSSx0aXRsZSkge1xuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbXNhLz9hbm49XCIrZmlsZV91cmwrYW5uVVJJK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9ODAwLGhlaWdodD00MDBcIik7XG59XG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWwoYWxuVVJJLCB0eXBlKSB7XG5cbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgbGV0IG1vZF9rZXkgPSByYWN0aXZlLmdldCgnbW9kZWxsZXJfa2V5Jyk7XG4gIGlmKG1vZF9rZXkgPT09ICdNJysnTycrJ0QnKydFJysnTCcrJ0knKydSJysnQScrJ04nKydKJysnRScpXG4gIHtcbiAgICAvL2FsZXJ0KHR5cGUpO1xuICAgIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tb2RlbC9wb3N0P3R5cGU9XCIrdHlwZStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTY3MCxoZWlnaHQ9NzAwXCIpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIE0nKydPJysnRCcrJ0UnKydMJysnTCcrJ0UnKydSIExpY2VuY2UgS2V5Jyk7XG4gIH1cbn1cblxuLy8gU3dhcHMgb3V0IHRoZSBkb21zZXJmIG1vZGVsIHdoZW4gdGhvc2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxuZXhwb3J0IGZ1bmN0aW9uIHN3YXBEb21zZXJmKHVyaV9udW1iZXIpXG57XG4gIHVyaV9udW1iZXIgPSB1cmlfbnVtYmVyLTE7XG4gIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1t1cmlfbnVtYmVyXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImltcG9ydCB7IHNlbmRfam9iIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgaXNJbkFycmF5IH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcblxuLy9UYWtlcyB0aGUgZGF0YSBuZWVkZWQgdG8gdmVyaWZ5IHRoZSBpbnB1dCBmb3JtIGRhdGEsIGVpdGhlciB0aGUgbWFpbiBmb3JtXG4vL29yIHRoZSBzdWJtaXNzb24gd2lkZ2V0IHZlcmlmaWVzIHRoYXQgZGF0YSBhbmQgdGhlbiBwb3N0cyBpdCB0byB0aGUgYmFja2VuZC5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBkYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKVxue1xuICAvKnZlcmlmeSB0aGF0IGV2ZXJ5dGhpbmcgaGVyZSBpcyBvayovXG4gIGxldCBlcnJvcl9tZXNzYWdlPW51bGw7XG4gIGxldCBqb2Jfc3RyaW5nID0gJyc7XG4gIC8vZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsIFtwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkXSk7XG5cbiAgbGV0IGNoZWNrX2xpc3QgPSBbXTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfbGlzdC5wdXNoKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSk7XG4gIH0pO1xuXG4gIGVycm9yX21lc3NhZ2U9XCJBUkdcIjtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc2VxX2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKHN0cnVjdF90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3N0cnVjdF9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihlcnJvcl9tZXNzYWdlLmxlbmd0aCA+IDApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZm9ybV9lcnJvcicsIGVycm9yX21lc3NhZ2UpO1xuICAgIGFsZXJ0KFwiRk9STSBFUlJPUjpcIitlcnJvcl9tZXNzYWdlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2luaXRpYWxpc2UgdGhlIHBhZ2VcbiAgICBsZXQgcmVzcG9uc2UgPSB0cnVlO1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgbnVsbCApO1xuICAgIC8vUG9zdCB0aGUgam9icyBhbmQgaW50aWFsaXNlIHRoZSBhbm5vdGF0aW9ucyBmb3IgZWFjaCBqb2JcbiAgICAvL1dlIGFsc28gZG9uJ3QgcmVkdW5kYW50bHkgc2VuZCBleHRyYSBwc2lwcmVkIGV0Yy4uIGpvYnNcbiAgICAvL2J5dCBkb2luZyB0aGVzZSB0ZXN0IGluIGEgc3BlY2lmaWMgb3JkZXJcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoam9iX25hbWUrXCIsXCIpO1xuICAgICAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ19idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2Rpc29wcmVkJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdkb21wcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnYmlvc2VyZicgfHwgam9iX25hbWUgPT09ICdkb21zZXJmJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdtZXRhcHNpY292JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZ2VudGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBkb210aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBkYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSk7XG4gICAgLy9zZXQgdmlzaWJpbGl0eSBhbmQgcmVuZGVyIHBhbmVsIG9uY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYl9saXN0Lmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGxldCBqb2JfbmFtZSA9IGpvYl9saXN0W2ldO1xuICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlICYmIHJlc3BvbnNlIClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICAgIHJhY3RpdmUuZmlyZSggam9iX25hbWUrJ19hY3RpdmUnICk7XG4gICAgICAgIGlmKHNlcV90eXBlKXtcbiAgICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICAgICAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighIHJlc3BvbnNlKXt3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO31cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3N0cnVjdF9mb3JtKHN0cnVjdCwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG4gIC8vIFRPRE86IG9uZSBkYXkgd2Ugc2hvdWxkIGxldCB0aGVzZSBzZXJ2aWNlcyB0YWtlIHhtbCBwZGIgZmlsZXNcbiAgLy8gaWYoISAvXkhFQURFUnxeQVRPTVxccytcXGQrL2kudGVzdChzdHJ1Y3QpKXtcbiAgaWYoISAvQVRPTVxccytcXGQrL2kudGVzdChzdHJ1Y3QpKXtcbiAgICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIGZpbGUgZG9lcyBub3QgbG9vayBsaWtlIGEgcGxhaW4gdGV4dCBhc2NpaSBwZGIgZmlsZS4gVGhpcyBzZXJ2aWNlIGRvZXMgbm90IGFjY2VwdCAuZ3ogb3IgeG1sIGZvcm1hdCBwZGIgZmlsZXNcIjtcbiAgfVxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuLy9UYWtlcyB0aGUgZm9ybSBlbGVtZW50cyBhbmQgY2hlY2tzIHRoZXkgYXJlIHZhbGlkXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3NlcV9mb3JtKHNlcSwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG5cbiAgLyogbGVuZ3RoIGNoZWNrcyAqL1xuICBpZihzZXEubGVuZ3RoID4gMTUwMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBsb25nIHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuICBpZihzZXEubGVuZ3RoIDwgMzApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gc2hvcnQgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG5cbiAgLyogbnVjbGVvdGlkZSBjaGVja3MgKi9cbiAgbGV0IG51Y2xlb3RpZGVfY291bnQgPSAoc2VxLm1hdGNoKC9BfFR8Q3xHfFV8TnxhfHR8Y3xnfHV8bi9nKXx8W10pLmxlbmd0aDtcbiAgaWYoKG51Y2xlb3RpZGVfY291bnQvc2VxLmxlbmd0aCkgPiAwLjk1KVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgYXBwZWFycyB0byBiZSBudWNsZW90aWRlIHNlcXVlbmNlLiBUaGlzIHNlcnZpY2UgcmVxdWlyZXMgcHJvdGVpbiBzZXF1ZW5jZSBhcyBpbnB1dDxiciAvPlwiO1xuICB9XG4gIGlmKC9bXkFDREVGR0hJS0xNTlBRUlNUVldZWF8tXSsvaS50ZXN0KHNlcSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM8YnIgLz5cIjtcbiAgfVxuXG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cblxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9