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
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
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
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
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
  biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
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
  biod3.annotationGrid(ractive.get('annotations'), { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGU1NThjYzQ1ODdmNTkxMWEyZGUiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJ6aXAiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiIsImhzcHJlZF9jaGVja2NoYWluc19zZWVuIiwiZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4iLCJyZXN1bHRzX2ZvdW5kIiwibWV0YXBzaWNvdiIsIm1lbXBhY2siLCJnZW50aHJlYWRlciIsIm1ldHNpdGUiLCJoc3ByZWQiLCJtZW1lbWJlZCIsImdlbnRkYiIsInJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsImdyYXBoX21hdGNoIiwiZ3JhcGhfb3V0IiwiY29udGFjdF9tYXRjaCIsImNvbnRhY3QiLCJsaXBpZF9tYXRjaCIsImxpcGlkX291dCIsImtleV9maWVsZHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJmaWVsZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRhYmxlIiwiYWxpZ24iLCJwbmdfbWF0Y2giLCJib3VuZGFyeV9wbmciLCJib3VuZGFyeSIsInByZWRfbWF0Y2giLCJkb21zc2VhcHJlZCIsImRvbXNzZWFfbWF0Y2giLCJkb21zc2VhIiwibW9kZWwiLCJkaXNwbGF5X3N0cnVjdHVyZSIsImhoYmxpdHMiLCJwZGJhYSIsImNhdGhibGFzdCIsInBkYmJsYXN0IiwiZG9tc2VyZl9tYXRjaCIsImJ1dHRvbnNfdGFncyIsInBhdGhzIiwic2NoX21hdGNoIiwic2NoIiwiZmVhdF9tYXRjaCIsImZlYXR1cmVzIiwicHJlZHNfbWF0Y2giLCJwcmVkcyIsIm1hcCIsImV2X21hdGNoIiwiZnJlZWNvbnRhY3QiLCJwc19tYXRjaCIsInBzaWNvdiIsImNjX21hdGNoIiwiY2NtcHJlZCIsInRhYmxlX21hdGNoIiwicGRiX21hdGNoIiwiaW5pdGlhbF9tYXRjaCIsInNlY29uZF9tYXRjaCIsImluaXRpYWwiLCJzZWNvbmQiLCJ0ZGIiLCJ1cmkiLCJjc3NfaWQiLCJtb2xfY29udGFpbmVycyIsImNvbnRhaW5lciIsImNhcnRvb25fY29sb3IiLCJhdG9tIiwiaG90c3BvdF9jb2xvciIsImIiLCJlbGVtZW50IiwiJCIsImNvbmZpZyIsImJhY2tncm91bmRDb2xvciIsInZpZXdlciIsIiQzRG1vbCIsImNyZWF0ZVZpZXdlciIsImdldF90ZXh0IiwiYWRkTW9kZWwiLCJzZXRTdHlsZSIsImNvbG9yZnVuYyIsImFkZFN1cmZhY2UiLCJTdXJmYWNlVHlwZSIsIlZEVyIsImNvbG9yc2NoZW1lIiwiaGV0ZmxhZyIsInpvb21UbyIsInJlbmRlciIsInpvb20iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNldF9hZHZhbmNlZF9wYXJhbXMiLCJvcHRpb25zX2RhdGEiLCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZSIsImdldEVsZW1lbnRCeUlkIiwiZXJyIiwicHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zIiwiYmlvc2VyZl9tb2RlbGxlcl9rZXkiLCJkb21zZXJmX21vZGVsbGVyX2tleSIsImNoZWNrZWQiLCJmZnByZWRfc2VsZWN0aW9uIiwibWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiIsImV4dHJhY3RfZmFzdGFfY2hhaW4iLCJzZWVkU2l0ZUZpbmRfY2hhaW4iLCJtZXRwcmVkX3dyYXBwZXJfY2hhaW4iLCJzZWVkU2l0ZUZpbmRfbWV0YWwiLCJtZXRwcmVkX3dyYXBwZXJfbWV0YWwiLCJtZXRwcmVkX3dyYXBwZXJfZnByIiwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyIsImhzX3ByZWRfZmlyc3RfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4iLCJoc19wcmVkX3NlY29uZF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4iLCJtZW1lbWJlZF9hbGdvcml0aG0iLCJtZW1lbWJlZF9iYXJyZWwiLCJtZW1lbWJlZF90ZXJtaW5pIiwic2VuZF9yZXF1ZXN0IiwidXJsIiwic2VuZF9kYXRhIiwicmVzcG9uc2UiLCJhamF4IiwiY2FjaGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsInNlbmRfam9iIiwiZW1haWwiLCJzdWJtaXRfdXJsIiwidGltZXNfdXJsIiwiQmxvYiIsImUiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2VfZGF0YSIsInRpbWVzIiwiayIsImZpcmUiLCJnZXRfcHJldmlvdXNfZGF0YSIsInV1aWQiLCJzdWJtaXNzaW9uX3Jlc3BvbnNlIiwic3VibWlzc2lvbnMiLCJpbnB1dF9maWxlIiwiam9icyIsInN1Ym1pc3Npb24iLCJzbGljZSIsInN1Ym1pc3Npb25fbmFtZSIsInVybF9zdHViIiwiY3RsIiwicGF0aF9iaXRzIiwiZm9sZGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwic2VxX2pvYl9saXN0Iiwic3RydWN0X2pvYl9saXN0IiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VibWlzc2lvbl92aXNpYmxlIiwicmVzdWx0c19wYW5lbF92aXNpYmxlIiwic3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZSIsImJpb3NlcmZfYWR2YW5jZWQiLCJkb21zZXJmX2FkdmFuY2VkIiwiZG9tcHJlZF9hZHZhbmNlZCIsImZmcHJlZF9hZHZhbmNlZCIsIm1ldHNpdGVfYWR2YW5jZWQiLCJoc3ByZWRfYWR2YW5jZWQiLCJtZW1lbWJhZF9hZHZhbmNlZCIsIm1vZGVsbGVyX2tleSIsImRvd25sb2FkX2xpbmtzIiwiZXJyb3JfbWVzc2FnZSIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfbWFwIiwibWV0c2l0ZV9wZGIiLCJoc3ByZWRfaW5pdGlhbF9wZGIiLCJoc3ByZWRfc2Vjb25kX3BkYiIsInRkYl9maWxlIiwibWVtZW1iZWRfcGRiIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJwc2lwcmVkX2NoZWNrZWQiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJzZXFfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJlcnJvcl90ZXh0IiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50IiwiYWR2Iiwic2V0dGluZyIsIm1ldF9wZGIiLCJpbml0aWFsX3BkYiIsInNlY29uZF9wZGIiLCJzdWJtaXRfam9iIiwic2VxX2NvdW50IiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJzdHJ1Y3RfdHlwZSIsImJpb3NlcmZfY2hlY2tlZCIsImRvbXNlcmZfY2hlY2tlZCIsImJpb3NfbW9kZWxsZXJfdGVzdCIsInRlc3RfbW9kZWxsZXJfa2V5IiwiZG9tc19tb2RlbGxlcl90ZXN0IiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJwZGJGaWxlIiwicGRiRGF0YSIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsInJlc3VsdCIsIm1lc3NhZ2UiLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJpbnB1dCIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJzd2FwRG9tc2VyZiIsInVyaV9udW1iZXIiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9zZXFfZm9ybSIsInZlcmlmeV9zdHJ1Y3RfZm9ybSIsInBnZW50aHJlYWRlcl9jaGVja2VkIiwicGRvbXRocmVhZGVyX2NoZWNrZWQiLCJzdHJ1Y3QiLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRU8sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLElBQS9CLEVBQ1A7QUFDRSxNQUFJQyxlQUFlLDZOQUFuQjtBQUNBQSxrQkFBZ0IsdUpBQWhCO0FBQ0FBLGtCQUFnQiw2S0FBaEI7QUFDQUEsa0JBQWdCLHVKQUFoQjtBQUNBLE1BQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQUQsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFJQyxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0EsUUFBR0ksUUFBUUMsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QlAsc0JBQWdCLGFBQVdNLFFBQVEsQ0FBUixDQUFYLEdBQXNCLFdBQXRCLEdBQWtDQSxRQUFRLENBQVIsQ0FBbEMsR0FBNkMsV0FBN0MsR0FBeURBLFFBQVEsQ0FBUixDQUF6RCxHQUFvRSxZ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QkEsZ0JBQWdCLDRDQUFoQztBQUNEO0FBQ0QsTUFBR3pULElBQUlqRyxNQUFKLEdBQWEsRUFBaEIsRUFDQTtBQUNFMFosb0JBQWdCQSxnQkFBZ0IsNkNBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJd0gsbUJBQW1CLENBQUNqYixJQUFJM0YsS0FBSixDQUFVLDBCQUFWLEtBQXVDLEVBQXhDLEVBQTRDTixNQUFuRTtBQUNBLE1BQUlraEIsbUJBQWlCamIsSUFBSWpHLE1BQXRCLEdBQWdDLElBQW5DLEVBQ0E7QUFDRTBaLG9CQUFnQkEsZ0JBQWdCLHdHQUFoQztBQUNEO0FBQ0QsTUFBRywrQkFBK0J1SCxJQUEvQixDQUFvQ2hiLEdBQXBDLENBQUgsRUFDQTtBQUNFeVQsb0JBQWdCQSxnQkFBZ0IsaURBQWhDO0FBQ0Q7O0FBRUQsTUFBRyxpR0FBQW5ELENBQVUsSUFBVixFQUFnQnlLLGFBQWhCLE1BQW1DLEtBQXRDLEVBQTZDO0FBQzNDdEgsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7O0FBRUQsU0FBT0EsYUFBUDtBQUNELEMiLCJmaWxlIjoicHNpcHJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwZTU1OGNjNDU4N2Y1OTExYTJkZSIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZV9oc3ByZWQocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGhzcHJlZF90YWJsZSA9ICc8YnIgLz48aDM+S2V5PC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0hvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiNmZmZmZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24tSG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1pbnRlcmZhY2UgcmVzaWR1ZTwvdGQ+PC90cj48L3RhYmxlPjxiciAvPjxiciAvPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPGgzPlJlc2lkdWUgUHJlZGljdGlvbnM8L2gzPjx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj48dHI+PHRoPkNoYWluL1Jlc2lkdWU8L3RoPjx0aD5SZXNpZHVlIElkZW50aXR5PC90aD48dGg+U2NvcmU8L3RoPic7XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAzKXtcbiAgICAgIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9XG4gIH0pO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgaHNwcmVkX3RhYmxlKTtcbn1cblxuLy8gcGFyc2UgdGhlIHNtYWxsIG1ldHNpdGUgb3V0cHV0IHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbWV0c2l0ZV90YWJsZSA9ICc8YnIgLz48aDM+S2V5PC9oMz48dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO01ldGFsIEJpbmRpbmcgQ29udGFjdDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Q2hhaW4gbm90IHByZWRpY3RlZDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7UHJlZGljdGVkIGNoYWluPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPGgzPlJlc2lkdWUgUHJlZGljdGlvbnM8L2gzPjx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj48dHI+PHRoPlJlc2lkdWUgTnVtYmVyPC90aD48dGg+UmF3IE5ldXJhbCBOZXR3b3JrIFNjb3JlPC90aD48dGg+UmVzaWR1ZTwvdGg+JztcbiAgbGV0IGhpdF9yZWdleCA9IC9cXGQrXFxzLis/XFxzXFx3ezN9XFxkKy9nO1xuICBsZXQgaGl0X21hdGNoZXMgPSBmaWxlLm1hdGNoKGhpdF9yZWdleCk7XG4gIGlmKGhpdF9tYXRjaGVzKVxuICB7XG4gICAgaGl0X21hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzLyk7XG4gICAgICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH0pO1xuICB9XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG1ldHNpdGVfdGFibGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKXtcblxuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGJwX2RhdGEgPSBbXTtcbiAgbGV0IG1mX2RhdGEgPSBbXTtcbiAgbGV0IGNjX2RhdGEgPSBbXTtcbiAgbGV0IHRhYmxlX2RhdGEgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoJyMnKSl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoIDwgNCl7cmV0dXJuO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQlAnKXticF9kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdDQycpe2NjX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ01GJyl7bWZfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgfSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkJpb2xvZ2ljYWwgUHJvY2VzcyBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZSBjbGFzcz0nc21hbGwtdGFibGUgdGFibGUtYm9yZGVyZWQgZ2VuLXRhYmxlJz48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgYnBfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlIGNsYXNzPSdzbWFsbC10YWJsZSB0YWJsZS1ib3JkZXJlZCBnZW4tdGFibGUnPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGUgY2xhc3M9J3NtYWxsLXRhYmxlIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZSc+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgdGFibGVfZGF0YSArPSAnVGhlc2UgcHJlZGljdGlvbiB0ZXJtcyByZXByZXNlbnQgdGVybXMgcHJlZGljdGVkIHdoZXJlIFNWTSB0cmFpbmluZyBpbmNsdWRlcyBhc3NpZ25lZCBHTyB0ZXJtcyBhY3Jvc3MgYWxsIGV2aWRlbmNlIGNvZGUgdHlwZXMuIFNWTSByZWxpYWJpbGl0eSBpcyByZWdhcmRlZCBhcyBIaWdoIChIKSB3aGVuIE1DQywgc2Vuc2l0aXZpdHksIHNwZWNpZmljaXR5IGFuZCBwcmVjaXNpb24gYXJlIGpvaW50bHkgYWJvdmUgYSBnaXZlbiB0aHJlc2hvbGQuIG90aGVyd2lzZSBSZWxpYWJpbGl0eSBpcyBpbmRpY2F0ZWQgYXMgTG93IChMKS4gPGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG59XG5cbmZ1bmN0aW9uIHNldF9hYW5vcm0oKXtcbiAgbGV0IGhBQV9ub3JtID0ge307XG4gIGhBQV9ub3JtLkEgPSB7IHZhbDogMC4wNzE3ODMyNDgwMDYzMDksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjczNjc2NjE1MjQyNzV9O1xuICBoQUFfbm9ybS5WID0geyB2YWw6IDAuMDU5NjI0NTk1MzY5OTAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMzc3NzkxNTI4NzQ1fTtcbiAgaEFBX25vcm0uWSA9IHsgdmFsOiAwLjAyNjA3NTA2ODI0MDQzNyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNDgyMjQ3MTUzMTM3OX07XG4gIGhBQV9ub3JtLlcgPSB7IHZhbDogMC4wMTQxNjYwMDI2MTI3NzEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTA0NzE4MzU4MDE5OTZ9O1xuICBoQUFfbm9ybS5UID0geyB2YWw6IDAuMDUyNTkzNTgyOTcyNzE0LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMDk0NzkzOTY0NTk3fTtcbiAgaEFBX25vcm0uUyA9IHsgdmFsOiAwLjA4MjEyMzI0MTMzMjA5OSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyODY4NzU2NjA4MTUxMn07XG4gIGhBQV9ub3JtLlAgPSB7IHZhbDogMC4wNjU1NTc1MzEzMjIyNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzQyMzkzOTg0OTY3MzZ9O1xuICBoQUFfbm9ybS5GID0geyB2YWw6IDAuMDM3MTAzOTk0OTY5MDAyLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NTQzNDIzMTM5MTg2fTtcbiAgaEFBX25vcm0uTSA9IHsgdmFsOiAwLjAyMjU2MjgxODE4Mzk1NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMTMyMTAzOTY2MjQ4MX07XG4gIGhBQV9ub3JtLksgPSB7IHZhbDogMC4wNTQ4MzM5NzkyNjkxODUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjkyNjQwODM2NjcxNTd9O1xuICBoQUFfbm9ybS5MID0geyB2YWw6IDAuMTAwMTA1OTE1NzU5MDYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAyNzY4MDg1MTkwMDl9O1xuICBoQUFfbm9ybS5JID0geyB2YWw6IDAuMDQyMDM0NTI2MDQwNDY3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODI2ODQ5MjYyNDk1fTtcbiAgaEFBX25vcm0uSCA9IHsgdmFsOiAwLjAyNzE0MTQwMzUzNzU5OCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNTUwNTY2Mzc4OTg1fTtcbiAgaEFBX25vcm0uRyA9IHsgdmFsOiAwLjA2OTE3OTgyMDEwNDUzNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDA4NzU2MjA1NzMyOH07XG4gIGhBQV9ub3JtLlEgPSB7IHZhbDogMC4wNjU5MjA1NjE5MzE4MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAxMDMwOTEwMDgzNjZ9O1xuICBoQUFfbm9ybS5FID0geyB2YWw6IDAuMDQ2NDc4NDYyMjU4MzgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTk5NDYyNjk0NjE3MzZ9O1xuICBoQUFfbm9ybS5DID0geyB2YWw6IDAuMDI0OTA4NTUxODcyMDU2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODIyOTA5NTg5NTA0fTtcbiAgaEFBX25vcm0uRCA9IHsgdmFsOiAwLjA0NDMzNzkwNDcyNjA0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODQzNjY3NzI1NjcyNn07XG4gIGhBQV9ub3JtLk4gPSB7IHZhbDogMC4wMzM1MDcwMjA5ODcwMzMsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTY1MzYwMjIyODgyMDR9O1xuICBoQUFfbm9ybS5SID0geyB2YWw6IDAuMDU5NzQwNDY5MDMxMTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjUxNjU5OTQ3NzMzODR9O1xuICByZXR1cm4oaEFBX25vcm0pO1xufVxuXG5mdW5jdGlvbiBzZXRfZm5vcm0oKXtcbiAgbGV0IGhGX25vcm0gPSB7fTtcbiAgaEZfbm9ybS5oeWRyb3Bob2JpY2l0eSA9IHt2YWw6IC0wLjM0ODc2ODI4MDgwMTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMC43NTU1OTE1Mjc2OTc5OX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgcG9zaXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjQ1NzcxNzQ2Njk0OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMy41NjcxMzMzNDExMzl9O1xuICBoRl9ub3JtWydhbGlwaGF0aWMgaW5kZXgnXSA9IHt2YWw6IDc5LjkxMTU0OTMxOTA5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi43ODc2MTc5Nzg4Mjd9O1xuICBoRl9ub3JtWydpc29lbGVjdHJpYyBwb2ludCddID0ge3ZhbDogNy42MTAyMDQ2MzgzNjAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMS45NzE2MTExMDIwMDg4fTtcbiAgaEZfbm9ybVsnbW9sZWN1bGFyIHdlaWdodCddID0ge3ZhbDogNDg2NjguNDEyODM5OTYxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzNzgzOC4zMjQ4OTU5Njl9O1xuICBoRl9ub3JtLmNoYXJnZSA9IHt2YWw6IDUuMDk5MTc2MzA1NzYwNCxcbiAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi44Mzg2MzY1OTAyNX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgbmVnYXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjAyNjE5MDEyODE3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogNC4wMjA2NjMxNjgwOTI2fTtcbiAgaEZfbm9ybVsnbW9sYXIgZXh0aW5jdGlvbiBjb2VmZmljaWVudCddID0ge3ZhbDogNDY0NzUuMjkzOTIzOTI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzOTI5OS4zOTk4NDg4MjN9O1xuICByZXR1cm4oaEZfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIGdldF9hYV9jb2xvcih2YWwpe1xuICAgIGxldCBhYl92YWwgPSBNYXRoLmFicyh2YWwpO1xuICAgIGlmKGFiX3ZhbCA+PSAyLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjFwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAyLjI0KXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMnBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjJuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmNXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjVuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuNjQ1ICkge1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxMHBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjEwblwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJwbGFpblwiO1xufVxuXG4vL3BhcnNlIHRoZSBmZnByZWQgZmVhdGNmbyBmZWF0dXJlcyBmaWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IFNGX2RhdGEgPSB7fTtcbiAgbGV0IEFBX2RhdGEgPSB7fTtcbiAgbGV0IGhGX25vcm0gPXNldF9mbm9ybSgpO1xuICBsZXQgaEFBX25vcm09c2V0X2Fhbm9ybSgpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIkFBXCIpKXtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBBQV9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiU0ZcIikpXG4gICAge1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIFNGX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYnVpbGQgaHRtbCB0YWJsZXMgZm9yIHRoZSBmZWF0dXJlIGRhdGFcbiAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICBsZXQgZ2xvYmFsX2ZlYXR1cmVzID0gcmFjdGl2ZS5nZXQoJ2dsb2JhbF9mZWF0dXJlcycpO1xuICBsZXQgZmVhdF90YWJsZSA9ICc8Yj5HbG9iYWwgRmVhdHVyZXM8L2I+PGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnR2xvYmFsIGZlYXR1cmVzIGFyZSBjYWxjdWxhdGVkIGRpcmVjdGx5IGZyb20gc2VxdWVuY2UuIExvY2FsaXNhdGlvbiB2YWx1ZXMgYXJlIHByZWRpY3RlZCBieSB0aGUgUHNvcnQgYWxnb3JpdGhtIGFuZCByZWZsZWN0IHRoZSByZWxhdGl2ZSBsaWtlbGlob29kIG9mIHRoZSBwcm90ZWluIG9jY3VweWluZyBkaWZmZXJlbnQgY2VsbHVsYXIgbG9jYWxpc2F0aW9ucy4gVGhlIGJpYXMgY29sdW1uIGlzIGhpZ2hsaWdodGVkIGFjY29yZGluZyB0byB0aGUgc2lnbmlmaWNhbmNlIG9mIHRoZSBmZWF0dXJlIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBaIHNjb3JlIG9mIHRoZSBmZWF0dXJlLjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJzx0YWJsZSAgYWxpZ249XCJjZW50ZXJcIiAgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIGZmcHJlZC10YWJsZVwiPjx0cj48dGg+RmVhdHVyZSBOYW1lPC90aD48dGg+VmFsdWU8L3RoPjx0aD5CaWFzPC90aD48L3RyPic7XG5cbiAgT2JqZWN0LmtleXMoU0ZfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZV9uYW1lKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgaWYoZmVhdHVyZV9uYW1lIGluIGhGX25vcm0pe1xuICAgICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKCAocGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLWhGX25vcm1bZmVhdHVyZV9uYW1lXS52YWwpIC8gaEZfbm9ybVtmZWF0dXJlX25hbWVdLnNkZSk7XG4gICAgfVxuICAgIGZlYXRfdGFibGUgKz0gJzx0cj48dGQ+JytmZWF0dXJlX25hbWUrJzwvdGQ+PHRkPicrcGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLnRvRml4ZWQoMikrJzwvdGQ+PHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+PC90cj4nO1xuICB9KTtcbiAgZmVhdF90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgZmVhdF90YWJsZSk7XG5cbiAgLy9idWlsZCBodG1sIHRhYmxlIGZvciB0aGUgQUEgZGF0YVxuICBsZXQgYWFfY29tcG9zaXRpb24gPSByYWN0aXZlLmdldCgnYWFfY29tcG9zaXRpb24nKTtcbiAgbGV0IGFhX3RhYmxlID0gJzxiPkFtaW5vIEFjaWQgQ29tcG9zaXRpb24gKHBlcmNlbnRhZ2VzKTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlICBhbGlnbj1cImNlbnRlclwiID48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aD4nK3Jlc2lkdWUrJzwvdGg+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKChwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pLWhBQV9ub3JtW3Jlc2lkdWVdLnZhbCkgLyBoQUFfbm9ybVtyZXNpZHVlXS5zZGUpO1xuICAgIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSBjbGFzcz1cInNpZ25pZmtleVwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIyXCIgY2VsbHNwYWNpbmc9XCIwXCI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjxiPmxvdzwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgYWxpZ249XCJyaWdodFwiPjxiPmhpZ2g8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMW5cIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJuXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1blwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBuXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD5wICZndDs9IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwcFwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1cFwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMnBcIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFwXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBhYV90YWJsZSk7XG59XG5cblxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJy0nKSlcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoWzFdKTtcbiAgICAgICAgbGV0IHNlZyA9IG1hdGNoWzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCByZWdpb25zID0gW1tdLCBdO1xuICAgICAgICByZWdpb25zWzBdWzBdID0gcGFyc2VJbnQoc2VnWzBdKTtcbiAgICAgICAgcmVnaW9uc1swXVsxXSA9IHBhcnNlSW50KHNlZ1sxXSk7XG4gICAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuKG1hdGNoWzFdKTtcbn1cblxuLy8gdGFrZSBhbmQgc3MyIChmaWxlKSBhbmQgcGFyc2UgdGhlIGRldGFpbHMgYW5kIHdyaXRlIHRoZSBuZXcgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBhbm5vdGF0aW9uc1tpXS5zcyA9IGVudHJpZXNbM107XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIGdlbi10YWJsZVwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+VGFyZ2V0IExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UXVlcnkgTGVuPC90aD4nO1xuICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBTdGFydDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gRW5kPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEg8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0NPUDwvdGg+JztcbiAgfWVsc2Uge1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkZvbGQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0NPUDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5DQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcImNhdGhfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5TRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nVmlldycgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcInBkYl9tb2RlbGxlclxcXCIpOycgdmFsdWU9J01vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlZGljdGlvbl9yZWdleCA9IC9Eb21haW5cXHNCb3VuZGFyeVxcc2xvY2F0aW9uc1xcc3ByZWRpY3RlZFxcc0RQUzpcXHMoLispLztcbiAgbGV0IHByZWRpY3Rpb25fbWF0Y2ggPSAgcHJlZGljdGlvbl9yZWdleC5leGVjKGZpbGUpO1xuICBpZihwcmVkaWN0aW9uX21hdGNoKVxuICB7XG4gICAgbGV0IGRldGFpbHMgPSBmaWxlLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICBkZXRhaWxzID0gZGV0YWlscy5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCI8aDQ+XCIrZGV0YWlscytcIjwvaDQ+XCIpO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBpZihwcmVkaWN0aW9uX21hdGNoWzFdLmluZGV4T2YoXCIsXCIpKVxuICAgIHtcbiAgICAgIHZhbHVlcyA9IHByZWRpY3Rpb25fbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludChwcmVkaWN0aW9uX21hdGNoWzFdKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBhbm5vdGF0aW9uc1t2YWx1ZV0uZG9tcHJlZCA9ICdCJztcbiAgICB9KTtcbiAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCJObyBQYXJzZURTIERvbWFpbiBib3VuZGFyaWVzIHByZWRpY3RlZFwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF90ZXh0IH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd19wYW5lbCh2YWx1ZSwgcmFjdGl2ZSlcbntcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgdmFsdWUgKTtcbn1cblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzLCB6aXApe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgbnVsbCk7XG5cblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIgPSBcIjxoNT5Eb21QcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmZmcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdClcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBwbmdfcmVnZXggPSAvXFwucG5nJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IG1lbXBhY2tfY2FydG9vbl9yZWdleCA9IC9LYW1hZGEtS2F3YWlfXFxkKy5wbmckLztcbiAgbGV0IG1lbXBhY2tfZ3JhcGhfb3V0ID0gL2lucHV0X2dyYXBoLm91dCQvO1xuICBsZXQgbWVtcGFja19jb250YWN0X3JlcyA9IC9DT05UQUNUX0RFRjEucmVzdWx0cyQvO1xuICBsZXQgbWVtcGFja19saXBpZF9yZXMgPSAvTElQSURfRVhQT1NVUkUucmVzdWx0cyQvO1xuICBsZXQgZG9tc3NlYV9wcmVkX3JlZ2V4ID0gL1xcLnByZWQkLztcbiAgbGV0IGRvbXNzZWFfcmVnZXggPSAvXFwuZG9tc3NlYSQvO1xuICBsZXQgZG9tc2VyZl9yZWdleCA9IC8uK18oXFxkKylfKFxcZCspLipcXC5wZGIvO1xuICBsZXQgZmZwcmVkX3NjaF9yZWdleCA9IC8uK19zY2hcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtcFxcLnBuZy87XG4gIGxldCBmZnByZWRfZmVhdGNmZ19yZWdleCA9IC9cXC5mZWF0Y2ZnLztcbiAgbGV0IGZmcHJlZF9wcmVkc19yZWdleCA9IC9cXC5mdWxsX3Jhdy87XG4gIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICBsZXQgbWV0c2l0ZV90YWJsZV9yZWdleCA9IC9cXC5NZXRwcmVkLztcbiAgbGV0IG1ldHNpdGVfcGRiX3JlZ2V4ID0gL1xcLk1ldFByZWQvO1xuICBsZXQgaHNwcmVkX2luaXRpYWxfcmVnZXggPSAvX2luaXRpYWxcXC5wZGIvO1xuICBsZXQgaHNwcmVkX3NlY29uZF9yZWdleCA9IC9fc2Vjb25kXFwucGRiLztcblxuICBsZXQgaW1hZ2VfcmVnZXggPSAnJztcbiAgbGV0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHM7XG4gIGxldCBkb21haW5fY291bnQgPSAwO1xuICBsZXQgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCBoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IHJlc3VsdHNfZm91bmQgPSB7XG4gICAgICBwc2lwcmVkOiBmYWxzZSxcbiAgICAgIGRpc29wcmVkOiBmYWxzZSxcbiAgICAgIG1lbXNhdHN2bTogZmFsc2UsXG4gICAgICBwZ2VudGhyZWFkZXI6IGZhbHNlLFxuICAgICAgbWV0YXBzaWNvdjogZmFsc2UsXG4gICAgICBtZW1wYWNrOiBmYWxzZSxcbiAgICAgIGdlbnRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGRvbXByZWQ6IGZhbHNlLFxuICAgICAgcGRvbXRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGJpb3NlcmY6IGZhbHNlLFxuICAgICAgZG9tc2VyZjogZmFsc2UsXG4gICAgICBmZnByZWQ6IGZhbHNlLFxuICAgICAgbWV0c2l0ZTogZmFsc2UsXG4gICAgICBoc3ByZWQ6IGZhbHNlLFxuICAgICAgbWVtZW1iZWQ6IGZhbHNlLFxuICAgICAgZ2VudGRiOiBmYWxzZSxcbiAgfTtcbiAgbGV0IHJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kID0gZmFsc2U7XG5cbiAgLy9QcmVwYXRvcnkgbG9vcCBmb3IgaW5mb3JtYXRpb24gdGhhdCBpcyBuZWVkZWQgYmVmb3JlIHJlc3VsdHMgcGFyc2luZzpcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJwZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcInBnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9nZW5hbGlnbm1lbnRfYW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbl9kb20nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImRnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgLy9tYWluIHJlc3VsdHMgcGFyc2luZyBsb29wXG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICAvL3BzaXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09ICdwc2lwYXNzMicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5wc2lwcmVkID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByZXN1bHRzX2ZvdW5kLmRpc29wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UEJEQVQgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF90aW1lXCIsICcnKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fY29tYmluZScpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdjb21iJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DT01CIE5OIE91dHB1dDwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIC8vbWVtc2F0IGFuZCBtZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXNhdHN2bScpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1zYXRzdm0gPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hlbWVfbWF0Y2ggPSBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaGVtZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2NoZW1hdGljIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gbWVtc2F0X2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBtZW1zYXRfbWF0Y2ggPSBtZW1zYXRfZGF0YV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtZW1zYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZW1zYXRkYXRhJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIC8vbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1wYWNrX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIC8vcmVzdWx0c19mb3VuZC5tZW1wYWNrID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBtZW1wYWNrX2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5tZW1wYWNrID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5wZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIGxldCBrZXlfZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZWxsZXIta2V5Jyk7XG4gICAgICBmb3IobGV0IGZpZWxkIG9mIGtleV9maWVsZHMpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG4gICAgICAgIGZpZWxkLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNfZm91bmQuZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZ2VuX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5wZG9tdGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgLy9wZG9tdGhyZWFkZXJcbiAgICAvLyBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3ZtX3Byb2JfZG9tJylcbiAgICAvLyB7XG4gICAgLy8gICBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgLy8gICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAvLyAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgLy8gfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2RvbV9hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL2RvbXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGFyc2VkcycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5kb21wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgcG5nX21hdGNoID0gcG5nX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHBuZ19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnkgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBmaWxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGFyc2VkcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21zc2VhJylcbiAgICB7XG4gICAgICBsZXQgcHJlZF9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWFwcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGRvbXNzZWFfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNzZWFfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncnVuQmlvc2VyZicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5iaW9zZXJmID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfbW9kZWxcIiwgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hoYmxpdHNfcGRiNzAnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhIU2VhcmNoIFJlc3VsdHM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BncGJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X2NhdGgnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0FUSCBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncmVmb3JtYXRfZG9tc2VyZl9tb2RlbHMnIHx8IHJlc3VsdF9kaWN0Lm5hbWUgPT09IFwicGFyc2VfcGRiX2JsYXN0XCIpXG4gICAge1xuICAgICAgbGV0IGRvbXNlcmZfbWF0Y2ggPSBkb21zZXJmX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNlcmZfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgICAvLyBUTyBETyBBREQgUkVHRVhcbiAgICAgICAgZG9tYWluX2NvdW50Kz0xO1xuICAgICAgICByZXN1bHRzX2ZvdW5kLmRvbXNlcmYgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmZmcHJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2ZseScpXG4gICAge1xuICAgICAgbGV0IHByZWRzX21hdGNoID0gZmZwcmVkX3ByZWRzX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRzX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5HTyBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZHByZWRpY3Rpb25zJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGxvdF9zZWxmX2NvbnRhY3RfbWFwJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1ldGFwc2ljb3YgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBNYXA8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsICc8Yj5Db250YWN0IE1hcDwvYj48YnIgLz48aW1nIGhlaWdodD1cIjgwMFwiIHdpZHRoPVwiODAwXCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY29udGFjdF9wcmVkaWN0b3JzJylcbiAgICB7XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICAgICAgICBsZXQgZXZfbWF0Y2ggPSBtZXRhcHNpY292X2V2X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoZXZfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RnJlZUNvbnRhY3QgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBzX21hdGNoID0gbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihwc19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UFNJQ09WIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjY19tYXRjaCA9IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGNjX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0NNUFJFRCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgID09PSAnbWV0YXBzaWNvdl9zdGFnZTInKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHNpdGVfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgICAgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHByZWRfd3JhcHBlcicpXG4gICAge1xuICAgICAgbGV0IHRhYmxlX21hdGNoID0gbWV0c2l0ZV90YWJsZV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgcGRiX21hdGNoID0gbWV0c2l0ZV9wZGJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgcmVzdWx0c19mb3VuZC5tZXRzaXRlID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfdGltZVwiLCAnJyk7XG4gICAgICBpZih0YWJsZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZXRzaXRlJywgemlwLCByYWN0aXZlKTtcblxuICAgICAgfVxuICAgICAgaWYocGRiX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgUERCPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc3ByZWRfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgIGhzcHJlZF9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hzX3ByZWQnKVxuICAgIHtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5oc3ByZWQgPSB0cnVlO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SFNQcmVkIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaHNwcmVkJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NwbGl0X3BkYl9maWxlcycpXG4gICAge1xuICAgICAgbGV0IGluaXRpYWxfbWF0Y2ggPSBoc3ByZWRfaW5pdGlhbF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgc2Vjb25kX21hdGNoID0gaHNwcmVkX3NlY29uZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihpbml0aWFsX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SW5pdGlhbCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYoc2Vjb25kX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZWNvbmQgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjaGVja19wZGJfdGRiJyl7XG4gICAgICBnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtYWtldGRiJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmdlbnRkYiA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlREQiBGaWxlPC9hPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCAnPGgzPjxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2xpY2sgaGVyZSB0byBkb3dubG9hZCB5b3VyIFREQiBGaWxlPC9hPjwvaDM+Jyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1lbWJlZCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1lbWJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtZW1iZWQgUERCIGZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cblxuICB9XG5cbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoISByZXN1bHRzX2ZvdW5kW2pvYl9uYW1lXSlcbiAgICB7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfd2FpdGluZ19tZXNzYWdlXCIsICdUaGUgam9iIGNvbXBsZXRlZCBzdWNjZXNmdWxseSBidXQgbm8gcHJlZGljdGlvbiB3YXMgcG9zc2libGUgZm9yIHRoZSBpbnB1dCBkYXRhLiBObyAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBkYXRhIGdlbmVyYXRlZCBmb3IgdGhpcyBqb2InKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZStcIl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgfSk7XG4gIGlmKCEgcmVzdWx0c19mb3VuZC5tZW1wYWNrKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aDM+Tm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPC9oMz4nKTtcbiAgfVxuICBpZihtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLm1ldHNpdGUpXG4gIHtcbiAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICdXZSBjb3VsZCBub3QgZmluZCB0aGUgUERCIENoYWluIElEIHByb3ZpZGVkJyk7XG5cbiAgfVxuICBpZihoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQuaHNwcmVkKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdXZSBjb3VsZCBub3QgZmluZCB0aGUgUERCIENoYWluIElEcyBwcm92aWRlZCcpO1xuICB9XG4gIGlmKGdlbnRkYl9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5nZW50ZGIpXG4gIHtcbiAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX21lc3NhZ2VcIiwgJ1BEQiBwcm92aWRlZCBkaWQgbm90IGNvbnRhaW4gYSBzaW5nbGUgY2hhaW4gbGFibGVkIGFzIGNoYWluIEEnKTtcbiAgfVxuXG5cbiAgaWYocmVzdWx0c19mb3VuZC5kb21zZXJmKVxuICB7XG4gICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5X3N0cnVjdHVyZSh1cmksIGNzc19pZCwgY2FydG9vbilcbntcbiAgbGV0IG1vbF9jb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9sLWNvbnRhaW5lcicpO1xuICBmb3IobGV0IGNvbnRhaW5lciBvZiBtb2xfY29udGFpbmVycylcbiAge1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjQwMHB4XCI7XG4gIH1cbiAgbGV0IGNhcnRvb25fY29sb3IgPSBmdW5jdGlvbihhdG9tKSB7XG4gICAgaWYoYXRvbS5zcyA9PT0gJ2gnKXtyZXR1cm4gJyNlMzUzZTMnO31cbiAgICBpZihhdG9tLnNzID09PSAncycpe3JldHVybiAnI2U1ZGQ1NSc7fVxuICAgIHJldHVybignZ3JleScpO1xuICB9O1xuICBsZXQgaG90c3BvdF9jb2xvciA9IGZ1bmN0aW9uKGF0b20pe1xuICAgIGlmKGF0b20uYiA9PSAxLjApe3JldHVybiAncmVkJzt9XG4gICAgaWYoYXRvbS5iID09IDAuNSl7cmV0dXJuICdibGFjayc7fVxuICAgIGlmKGF0b20uYiA9PSA1MCl7cmV0dXJuICd3aGl0ZSc7fVxuICAgIGlmKGF0b20uYiA9PSAxMDApe3JldHVybiAncmVkJzt9XG4gICAgcmV0dXJuKFwiYmx1ZVwiKTtcbiAgfTtcbiAgY29uc29sZS5sb2coXCJMT0FESU5HOiBcIit1cmkpO1xuICBsZXQgZWxlbWVudCA9ICQoY3NzX2lkKTtcbiAgbGV0IGNvbmZpZyA9IHsgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicgfTtcbiAgbGV0IHZpZXdlciA9ICQzRG1vbC5jcmVhdGVWaWV3ZXIoIGVsZW1lbnQsIGNvbmZpZyApO1xuICBsZXQgZGF0YSA9IGdldF90ZXh0KHVyaSwgXCJHRVRcIiwge30pO1xuICB2aWV3ZXIuYWRkTW9kZWwoIGRhdGEsIFwicGRiXCIgKTsgICAgICAgICAgICAgICAgICAgICAgIC8qIGxvYWQgZGF0YSAqL1xuICBpZihjYXJ0b29uKVxuICB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogY2FydG9vbl9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGVsc2Uge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGhvdHNwb3RfY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBpZihjc3NfaWQuc3RhcnRzV2l0aCgnI21lbWVtYmVkJykpe1xuICAgIHZpZXdlci5hZGRTdXJmYWNlKCQzRG1vbC5TdXJmYWNlVHlwZS5WRFcsIHsnb3BhY2l0eSc6MC44LCBjb2xvcnNjaGVtZTogJ3doaXRlQ2FyYm9uJ30sIHtoZXRmbGFnOnRydWV9LHt9KTtcbiAgfVxuICB2aWV3ZXIuem9vbVRvKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBzZXQgY2FtZXJhICovXG4gIHZpZXdlci5yZW5kZXIoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHJlbmRlciBzY2VuZSAqL1xuICB2aWV3ZXIuem9vbSgxLjcsIDMwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbylcbntcbiAgLy9jb25zb2xlLmxvZyhkb3dubG9hZHNfaW5mbyk7XG4gIGxldCBkb3dubG9hZHNfc3RyaW5nID0gcmFjdGl2ZS5nZXQoJ2Rvd25sb2FkX2xpbmtzJyk7XG4gIGlmKCdwc2lwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXope1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXopO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO31cbiAgfVxuICBpZignZG9tcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuXG4gIGlmKCdkaXNvcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXNhdHN2bScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3BnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZG9tdGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICAgIH1cbiAgfVxuICBpZignbWVtcGFjaycgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5oZWFkZXIpO1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbilcbiAgICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiTm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPGJyIC8+XCIpO1xuICAgIH1cbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Jpb3NlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZG9tc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2ZmcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2gpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRhcHNpY292JyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRzaXRlJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdoc3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGRiJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1lbWJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cblxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2FkdmFuY2VkX3BhcmFtcygpXG57XG4gIGxldCBvcHRpb25zX2RhdGEgPSB7fTtcbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBcIjAuMDFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSA1O1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlvc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZmcHJlZF9mbHlcIikuY2hlY2tlZClcbiAgICB7ICBvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiZmx5XCI7fVxuICAgIGVsc2VcbiAgICB7b3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImh1bWFuXCI7fVxuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJodW1hblwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IFwiQ2FcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gXCJDYVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9mcHJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBcIjVcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZStkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBcIkFCXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYWxnb3JpdGhtXCIpLnZhbHVlO1xuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYmFycmVsX3llc1wiKS5jaGVja2VkKXtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnVFJVRSc7XG4gICAgfWVsc2V7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ0ZBTFNFJztcbiAgICB9XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF90ZXJtaW5hbF9pblwiKS5jaGVja2VkKVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJpblwiO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcIm91dFwiO1xuICAgIH1cbiAgICAvL29wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JvdW5kYXJpZXNcIik7XG4gIH1cbiAgY2F0Y2goZXJyKVxuICB7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcImluXCI7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IDA7XG4gIH1cblxuICByZXR1cm4ob3B0aW9uc19kYXRhKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzIiwiaW1wb3J0IHsgZ2V0X21lbXNhdF9yYW5nZXMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2Vfc3MyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BiZGF0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2NvbWIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWVtc2F0ZGF0YSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wcmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BhcnNlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmVhdGNmZyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZnByZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21ldHNpdGUgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfaHNwcmVkIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSlcbntcbiAgLy9hbGVydChzZXEpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgZm9ybSBkYXRhXCIpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zb2xlLmxvZyhqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcImlucHV0X2RhdGFcIiwgZmlsZSwgJ2lucHV0LnR4dCcpO1xuICBmZC5hcHBlbmQoXCJqb2JcIixqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcInN1Ym1pc3Npb25fbmFtZVwiLG5hbWUpO1xuICBmZC5hcHBlbmQoXCJlbWFpbFwiLCBlbWFpbCk7XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdkb21wcmVkJykpe1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnbWV0c2l0ZScpKXtcbiAgZmQuYXBwZW5kKFwibWV0c2l0ZV9jaGVja2NoYWluc19jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbik7XG4gIGZkLmFwcGVuZChcImV4dHJhY3RfZmFzdGFfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfbWV0YWxcIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCk7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfbWV0YWxcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCk7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9mcHJcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIpO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2hzcHJlZCcpKXtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ21lbWVtYmVkJykpe1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF9hbGdvcml0aG1cIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSk7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2JhcnJlbFwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfdGVybWluaVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnZmZwcmVkJykpe1xuICBmZC5hcHBlbmQoXCJmZnByZWRfc2VsZWN0aW9uXCIsIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uKTtcbiAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gIH1cbiAgY29uc29sZS5sb2cob3B0aW9uc19kYXRhKTtcbiAgbGV0IHJlc3BvbnNlX2RhdGEgPSBzZW5kX3JlcXVlc3Qoc3VibWl0X3VybCwgXCJQT1NUXCIsIGZkKTtcbiAgaWYocmVzcG9uc2VfZGF0YSAhPT0gbnVsbClcbiAge1xuICAgIGxldCB0aW1lcyA9IHNlbmRfcmVxdWVzdCh0aW1lc191cmwsJ0dFVCcse30pO1xuICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkodGltZXMpKTtcbiAgICBpZihqb2JfbmFtZSBpbiB0aW1lcylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMgdHlwaWNhbGx5IHRha2UgXCIrdGltZXNbam9iX25hbWVdK1wiIHNlY29uZHNcIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBcIlVuYWJsZSB0byByZXRyaWV2ZSBhdmVyYWdlIHRpbWUgZm9yIFwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icy5cIik7XG4gICAgfVxuICAgIGZvcih2YXIgayBpbiByZXNwb25zZV9kYXRhKVxuICAgIHtcbiAgICAgIGlmKGsgPT0gXCJVVUlEXCIpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJywgcmVzcG9uc2VfZGF0YVtrXSk7XG4gICAgICAgIGlmKFsnbWV0aXN0ZScsICdoc3ByZWQnLCAnZ2VudGRiJywgJ21lbWVtYmVkJ10uaW5jbHVkZXMoam9iX25hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlXG4gIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy91dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgc2VxdWVuY2UgZnJvbSBhIHByZXZpb3VzIHN1Ym1pc3Npb24gaXMgdGhlXG4vL3BhZ2Ugd2FzIGxvYWRlZCB3aXRoIGEgVVVJRFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9wcmV2aW91c19kYXRhKHV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKVxue1xuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0aW5nIGRldGFpbHMgZ2l2ZW4gVVJJJyk7XG4gICAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICAvL2FsZXJ0KHVybCk7XG4gICAgbGV0IHN1Ym1pc3Npb25fcmVzcG9uc2UgPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgaWYoISBzdWJtaXNzaW9uX3Jlc3BvbnNlKXthbGVydChcIk5PIFNVQk1JU1NJT04gREFUQVwiKTt9XG4gICAgbGV0IHNlcSA9IGdldF90ZXh0KGZpbGVfdXJsK3N1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uaW5wdXRfZmlsZSwgXCJHRVRcIiwge30pO1xuICAgIGxldCBqb2JzID0gJyc7XG4gICAgc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHN1Ym1pc3Npb24pe1xuICAgICAgam9icyArPSBzdWJtaXNzaW9uLmpvYl9uYW1lK1wiLFwiO1xuICAgIH0pO1xuICAgIGpvYnMgPSBqb2JzLnNsaWNlKDAsIC0xKTtcbiAgICByZXR1cm4oeydzZXEnOiBzZXEsICdlbWFpbCc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uZW1haWwsICduYW1lJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5zdWJtaXNzaW9uX25hbWUsICdqb2JzJzogam9ic30pO1xufVxuXG5cbi8vZ2V0IHRleHQgY29udGVudHMgZnJvbSBhIHJlc3VsdCBVUklcbmV4cG9ydCBmdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2RvbV9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGFyc2VkcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRmZWF0dXJlcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRwcmVkaWN0aW9ucycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZXRzaXRlJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2hzcHJlZCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cbi8vZ2l2ZW4gYSBVUkwgcmV0dXJuIHRoZSBhdHRhY2hlZCB2YXJpYWJsZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuICAgIGxldCB2YXJzID0ge307XG4gICAgLy9jb25zaWRlciB1c2luZyBsb2NhdGlvbi5zZWFyY2ggaW5zdGVhZCBoZXJlXG4gICAgbGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLFxuICAgIGZ1bmN0aW9uKG0sa2V5LHZhbHVlKSB7XG4gICAgICB2YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4vKiEgZ2V0RW1QaXhlbHMgIHwgQXV0aG9yOiBUeXNvbiBNYXRhbmljaCAoaHR0cDovL21hdGFuaWNoLmNvbSksIDIwMTMgfCBMaWNlbnNlOiBNSVQgKi9cbihmdW5jdGlvbiAoZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCkge1xuICAgIC8vIEVuYWJsZSBzdHJpY3QgbW9kZVxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRm9ybSB0aGUgc3R5bGUgb24gdGhlIGZseSB0byByZXN1bHQgaW4gc21hbGxlciBtaW5pZmllZCBmaWxlXG4gICAgbGV0IGltcG9ydGFudCA9IFwiIWltcG9ydGFudDtcIjtcbiAgICBsZXQgc3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlXCIgKyBpbXBvcnRhbnQgKyBcInZpc2liaWxpdHk6aGlkZGVuXCIgKyBpbXBvcnRhbnQgKyBcIndpZHRoOjFlbVwiICsgaW1wb3J0YW50ICsgXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQgKyBcInBhZGRpbmc6MFwiICsgaW1wb3J0YW50O1xuXG4gICAgd2luZG93LmdldEVtUGl4ZWxzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXh0cmFCb2R5O1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gRW11bGF0ZSB0aGUgZG9jdW1lbnRFbGVtZW50IHRvIGdldCByZW0gdmFsdWUgKGRvY3VtZW50RWxlbWVudCBkb2VzIG5vdCB3b3JrIGluIElFNi03KVxuICAgICAgICAgICAgZWxlbWVudCA9IGV4dHJhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO1xuICAgICAgICAgICAgZXh0cmFCb2R5LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudDtcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZXh0cmFCb2R5LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc3R5bGUgYSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBjbGllbnQgd2lkdGggb2YgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICBpZiAoZXh0cmFCb2R5KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dHJhIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGV4dHJhQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVtIHZhbHVlIGluIHBpeGVsc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0oZG9jdW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IHNldF9hZHZhbmNlZF9wYXJhbXMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNob3dfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgZGlzcGxheV9zdHJ1Y3R1cmUgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuXG52YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmNvcHlCdXR0b24nKTtcbnZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5jbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vIFNFVCBFTkRQT0lOVFMgRk9SIERFViwgU1RBR0lORyBPUiBQUk9EXG5sZXQgZW5kcG9pbnRzX3VybCA9IG51bGw7XG5sZXQgc3VibWl0X3VybCA9IG51bGw7XG5sZXQgdGltZXNfdXJsID0gbnVsbDtcbmxldCBnZWFyc19zdmcgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xubGV0IG1haW5fdXJsID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51a1wiO1xubGV0IGFwcF9wYXRoID0gXCIvcHNpcHJlZF9iZXRhXCI7XG5sZXQgZmlsZV91cmwgPSAnJztcbmxldCBnZWFyX3N0cmluZyA9ICc8b2JqZWN0IHdpZHRoPVwiMTQwXCIgaGVpZ2h0PVwiMTQwXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBkYXRhPVwiJytnZWFyc19zdmcrJ1wiPjwvb2JqZWN0Pic7XG5sZXQgam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLCBcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBzZXFfam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsXTtcbmxldCBzdHJ1Y3Rfam9iX2xpc3QgPSBbXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgam9iX25hbWVzID0ge1xuICAncHNpcHJlZCc6ICdQU0lQUkVEIFY0LjAnLFxuICAnZGlzb3ByZWQnOiAnRElPU1BSRUQgMycsXG4gICdtZW1zYXRzdm0nOiAnTUVNU0FULVNWTScsXG4gICdwZ2VudGhyZWFkZXInOiAncEdlblRIUkVBREVSJyxcbiAgJ21lbXBhY2snOiAnTUVNUEFDSycsXG4gICdnZW50aHJlYWRlcic6ICdHZW5USFJFQURFUicsXG4gICdkb21wcmVkJzogJ0RvbVByZWQnLFxuICAncGRvbXRocmVhZGVyJzogJ3BEb21USFJFQURFUicsXG4gICdiaW9zZXJmJzogJ0Jpb3NTZXJmIHYyLjAnLFxuICAnZG9tc2VyZic6ICdEb21TZXJmIHYyLjEnLFxuICAnZmZwcmVkJzogJ0ZGUHJlZCAzJyxcbiAgJ21ldGFwc2ljb3YnOiAnTWV0YVBTSUNPVicsXG4gICdtZXRzaXRlJzogJ01ldFNpdGUnLFxuICAnaHNwcmVkJzogJ0hTUHJlZCcsXG4gICdtZW1lbWJlZCc6ICdNRU1FTUJFRCcsXG4gICdnZW50ZGInOiAnR2VuZXJhdGUgVERCJyxcbn07XG5cbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKVxue1xuICBlbmRwb2ludHNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2pvYnRpbWVzLyc7XG4gIGFwcF9wYXRoID0gJy9pbnRlcmZhY2UnO1xuICBtYWluX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAnO1xuICBnZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG4gIGZpbGVfdXJsID0gbWFpbl91cmw7XG59XG5lbHNlIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImJpb2luZnN0YWdlMS5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSAgPT09IFwiYmlvaW5mLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhyZWYgID09PSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9cIikge1xuICBlbmRwb2ludHNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2pvYnRpbWVzLyc7XG4gIGZpbGVfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrXCIvYXBpXCI7XG4gIC8vZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xufVxuZWxzZSB7XG4gIGFsZXJ0KCdVTlNFVFRJTkcgRU5EUE9JTlRTIFdBUk5JTkcsIFdBUk5JTkchJyk7XG4gIGVuZHBvaW50c191cmwgPSAnJztcbiAgc3VibWl0X3VybCA9ICcnO1xuICB0aW1lc191cmwgPSAnJztcbn1cblxubGV0IGluaXRpYWxpc2F0aW9uX2RhdGEgPSB7XG4gICAgc2VxdWVuY2VfZm9ybV92aXNpYmxlOiAxLFxuICAgIHN0cnVjdHVyZV9mb3JtX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c192aXNpYmxlOiAxLFxuICAgIHJlc3VibWlzc2lvbl92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfcGFuZWxfdmlzaWJsZTogMSxcbiAgICBzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlOiAwLFxuICAgIGJpb3NlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21wcmVkX2FkdmFuY2VkOiAwLFxuICAgIGZmcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZXRzaXRlX2FkdmFuY2VkOiAwLFxuICAgIGhzcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZW1lbWJhZF9hZHZhbmNlZDogMCxcbiAgICBtb2RlbGxlcl9rZXk6IG51bGwsXG4gICAgZG93bmxvYWRfbGlua3M6ICcnLFxuICAgIGVycm9yX21lc3NhZ2U6ICcnLFxuXG4gICAgcHNpcHJlZF9ob3JpejogbnVsbCxcbiAgICBkaXNvX3ByZWNpc2lvbjogbnVsbCxcbiAgICBtZW1zYXRzdm1fc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRzdm1fY2FydG9vbjogJycsXG4gICAgcGdlbl90YWJsZTogbnVsbCxcbiAgICBwZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIG1lbXNhdHBhY2tfc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRwYWNrX2NhcnRvb246ICcnLFxuICAgIGdlbl90YWJsZTogbnVsbCxcbiAgICBnZW5fYW5uX3NldDoge30sXG4gICAgcGFyc2Vkc19pbmZvOiBudWxsLFxuICAgIHBhcnNlZHNfcG5nOiBudWxsLFxuICAgIGRnZW5fdGFibGU6IG51bGwsXG4gICAgZGdlbl9hbm5fc2V0OiB7fSxcbiAgICBiaW9zZXJmX21vZGVsOiBudWxsLFxuICAgIGRvbXNlcmZfYnV0dG9uczogJycsXG4gICAgZG9tc2VyZl9tb2RlbF91cmlzOiBbXSxcbiAgICBmZnByZWRfY2FydG9vbjogbnVsbCxcbiAgICBzY2hfc2NoZW1hdGljOiBudWxsLFxuICAgIGFhX2NvbXBvc2l0aW9uOiBudWxsLFxuICAgIGdsb2JhbF9mZWF0dXJlczogbnVsbCxcbiAgICBmdW5jdGlvbl90YWJsZXM6IG51bGwsXG4gICAgbWV0YXBzaWNvdl9tYXA6IG51bGwsXG4gICAgbWV0c2l0ZV90YWJsZTogbnVsbCxcbiAgICBtZXRzaXRlX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfdGFibGU6IG51bGwsXG4gICAgaHNwcmVkX2luaXRpYWxfcGRiOiBudWxsLFxuICAgIGhzcHJlZF9zZWNvbmRfcGRiOiBudWxsLFxuICAgIHRkYl9maWxlOiBudWxsLFxuICAgIG1lbWVtYmVkX3BkYjogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19idXR0b24nXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfam9iJ10gPSBqb2JfbmFtZSsnX2pvYic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnXSA9ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX2ljb24nXSA9IGdlYXJfc3RyaW5nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ190aW1lJ10gPSAnTG9hZGluZyBEYXRhJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5wc2lwcmVkX2NoZWNrZWQgPSB0cnVlO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5tZW1lbWJlZF9hZHZhbmNlZCA9IDE7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnNlcXVlbmNlX2Zvcm1fdmlzaWJsZSA9IDA7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnN0cnVjdHVyZV9mb3JtX3Zpc2libGUgPSAxO1xuLy8gREVDTEFSRSBWQVJJQUJMRVMgYW5kIGluaXQgcmFjdGl2ZSBpbnN0YW5jZVxudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gIGVsOiAnI3BzaXByZWRfc2l0ZScsXG4gIHRlbXBsYXRlOiAnI2Zvcm1fdGVtcGxhdGUnLFxuICBkYXRhOiBpbml0aWFsaXNhdGlvbl9kYXRhLFxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG5cbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgc2VxX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICB9XG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdCk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX3RpbWUnLCBudWxsKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHN1Ym1pc3Npb25fbWVzc2FnZSA9IGJhdGNoLnN1Ym1pc3Npb25zWzBdLmxhc3RfbWVzc2FnZTtcbiAgICAgIGxldCBlcnJvcl90ZXh0ID0gXCI8aDM+UE9MTElORyBFUlJPUjogSm9iIEZhaWxlZDwvaDM+XCIrXG4gICAgICBcIjxoND5QbGVhc2UgQ29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51ayBxdW90aW5nIHRoZSBlcnJvciBtZXNzYWdlIGFuZCBqb2IgSUQ6XCIrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKStcIjwvaDQ+XCIrXG4gICAgICBcIjxoNT5FcnJvciBNZXNzYWdlOjxiciAvPlwiK3N1Ym1pc3Npb25fbWVzc2FnZStcIjwvaDU+XCI7XG4gICAgICByYWN0aXZlLnNldCgnZXJyb3JfbWVzc2FnZScsIGVycm9yX3RleHQpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG5yYWN0aXZlLm9uKCdzaG93X2Jpb3NlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2ZmcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZmZwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21ldHNpdGUnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19oc3ByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZW1lbWJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWVtZW1iZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcGFuZWxcbi8vXG5yYWN0aXZlLm9uKCAnc2VxdWVuY2VfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICBsZXQgc2V0dGluZyA9IGZhbHNlO1xuICAgICAgaWYoam9iX25hbWUgPT09ICdwc2lwcmVkJyl7c2V0dGluZyA9IHRydWU7fVxuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIHNldHRpbmcpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdzdHJ1Y3R1cmVfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgZmFsc2UpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ2Rvd25sb2Fkc19hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBzaG93X3BhbmVsKDEsIHJhY3RpdmUpO1xufSk7XG5cbi8vcmVnaXN0ZXIgbGlzdGVuZXJzIGZvciBlYWNoIHJlc3VsdHMgcGFuZWxcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUsIGkpe1xuICBjb25zb2xlLmxvZyhcImFkZGluZyBqb2JzIHdhdGNoZXJzXCIpO1xuICByYWN0aXZlLm9uKGpvYl9uYW1lKydfYWN0aXZlJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgc2hvd19wYW5lbChpKzIsIHJhY3RpdmUpO1xuICAgIGlmKGpvYl9uYW1lID09PSBcInBzaXByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5wc2lwcmVkKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JyksICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09IFwiZGlzb3ByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdiaW9zZXJmX21vZGVsJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnYmlvc2VyZl9tb2RlbCcpLmxlbmd0aClcbiAgICAgICAge1xuICAgICAgICAgIGxldCBiaW9zZXJmX21vZGVsID0gcmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfbW9kZWwnKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShiaW9zZXJmX21vZGVsLCAnI2Jpb3NlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKSl7XG4gICAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJyk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2hzcHJlZCcpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicpKXtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBpbml0aWFsX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKTtcbiAgICAgICAgbGV0IHNlY29uZF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX3NlY29uZF9wZGInKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoaW5pdGlhbF9wZGIsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHNlY29uZF9wZGIsICAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9fVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICAgbGV0IG1lbWVtYmVkX3BkYiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKTtcbiAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1lbWVtYmVkX3BkYiwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8am9iX25hbWUgPT09ICdnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInKVxuICAgIHtcbiAgICAgIGxldCBrZXlfZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZWxsZXIta2V5Jyk7XG4gICAgICBmb3IobGV0IGZpZWxkIG9mIGtleV9maWVsZHMpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG4gICAgICAgIGZpZWxkLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbn0pO1xuXG5yYWN0aXZlLm9uKCdzdWJtaXNzaW9uX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIGNvbnNvbGUubG9nKFwiU1VCTUlTU0lPTiBBQ1RJVkVcIik7XG4gIGxldCBzdGF0ZSA9IHJhY3RpdmUuZ2V0KCdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJyk7XG5cbiAgaWYoc3RhdGUgPT09IDEpe1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDAgKTtcbiAgfVxuICBlbHNle1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDEgKTtcbiAgfVxufSk7XG5cbi8vZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIG1haW4gZm9ybSBhbmQgc2VuZCB0aGUgc2VxdWVuY2UgdG8gdGhlIGJhY2tlbmRcbnJhY3RpdmUub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBzdWJtaXRfam9iID0gZmFsc2U7XG4gIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIGRhdGEnKTtcbiAgbGV0IHNlcSA9IHRoaXMuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgc2VxX2NvdW50ID0gc2VxLnNwbGl0KFwiPlwiKS5sZW5ndGg7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgbGV0IHN0cnVjdF90eXBlID0gZmFsc2U7XG4gIGxldCBzZXFfdHlwZSA9IGZhbHNlO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHN0cnVjdF9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc3RydWN0X3R5cGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc2VxX2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzZXFfdHlwZSA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIC8vSEFORExFIEZGUFJFRCBKT0IgU0VMRUNUSU9OLlxuICBpZihjaGVja19zdGF0ZXMuYmlvc2VyZl9jaGVja2VkIHx8IGNoZWNrX3N0YXRlcy5kb21zZXJmX2NoZWNrZWQpXG4gIHtcbiAgICBsZXQgYmlvc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBsZXQgZG9tc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBpZihiaW9zX21vZGVsbGVyX3Rlc3QgfHwgZG9tc19tb2RlbGxlcl90ZXN0KVxuICAgIHtcbiAgICAgIHN1Ym1pdF9qb2IgPXRydWU7XG4gIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3QgcHJvdmlkZWQgYSB2YWxpZCBNT0RFTExFUiBrZXkuIENvbnRhY3QgdGhlIFNhbGkgbGFiIGZvciBhIE1PREVMTEVSIGxpY2VuY2UuXCIpO1xuICAgIH1cbiAgfVxuICBlbHNle1xuICAgIHN1Ym1pdF9qb2I9dHJ1ZTtcbiAgfVxuICBpZihzZXFfdHlwZSAmJiBzdHJ1Y3RfdHlwZSlcbiAge1xuICAgIGFsZXJ0KFwiWW91IGNhbiBub3Qgc3VibWl0IGJvdGggc2VxdWVuY2UgYW5kIHN0cnVjdHVyZSBhbmFseXNpcyBqb2JzXCIpO1xuICAgIHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgfVxuICBpZihzZXFfY291bnQgPiAxKVxuICB7XG4gICAgYWxlcnQoXCJNU0EgSW5wdXQgZm9yYmlkZGVuXCIpO1xuICAgIHN1Ym1pdF9qb2I9ZmFsc2U7XG4gIH1cbiAgaWYoc3VibWl0X2pvYilcbiAge1xuICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZ1wiKTtcbiAgICBpZihzZXFfdHlwZSlcbiAgICB7XG4gICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpO1xuICAgIH1cbiAgICBpZihzdHJ1Y3RfdHlwZSlcbiAgICB7XG4gICAgICBsZXQgcGRiRmlsZSA9IG51bGw7XG4gICAgICBsZXQgcGRiRGF0YSA9ICcnO1xuICAgICAgdHJ5e1xuICAgICAgIHBkYkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBkYkZpbGVcIik7XG4gICAgICAgbGV0IGZpbGUgPSBwZGJGaWxlLmZpbGVzWzBdO1xuICAgICAgIGxldCBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgZnIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgICBmci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHBkYkRhdGEgPSBmci5yZXN1bHQ7XG4gICAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHBkYkRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIHBkYkRhdGEgPSBcIlwiO1xuICAgICAgICBpZihlcnIubWVzc2FnZS5pbmNsdWRlcyhcIkZpbGVSZWFkZXIucmVhZEFzVGV4dCBpcyBub3QgYW4gb2JqZWN0XCIpKXtcbiAgICAgICAgICBhbGVydChcIllvdSBoYXZlIG5vdCBzZWxlY3RlZCBhIFBEQiBmaWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrXCIvXCIpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzLCB6aXApO1xuICAvL3ZlcmlmeSBmb3JtIGNvbnRlbnRzIGFuZCBwb3N0XG4gIC8vYWRkIGZvcm0gZGVmYXVsdHMgYnV0IG51bGwgdGhlIHN0cnVjdGVzIG9uZXMgYXMgd2UgZG9uJ3QgYWxsb3cgc3RydWN0dXJlIGpvYiByZXN1Ym1pc3Npb25cbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHNldF9hZHZhbmNlZF9wYXJhbXMoKTtcbiAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc3Vic2VxdWVuY2UsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCB0cnVlLCBmYWxzZSk7XG4gIC8vd3JpdGUgbmV3IGFubm90YXRpb24gZGlhZ3JhbVxuICAvL3N1Ym1pdCBzdWJzZWN0aW9uXG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZnVuY3Rpb24gdGVzdF9tb2RlbGxlcl9rZXkoaW5wdXQpXG57XG4gIGlmKGlucHV0ID09PSAnTU9ERUxJUkFOSkUnKVxuICB7XG4gICAgcmV0dXJuKHRydWUpO1xuICB9XG4gIHJldHVybihmYWxzZSk7XG59XG5cbi8vIEhlcmUgaGF2aW5nIHNldCB1cCByYWN0aXZlIGFuZCB0aGUgZnVuY3Rpb25zIHdlIG5lZWQgd2UgdGhlbiBjaGVja1xuLy8gaWYgd2Ugd2VyZSBwcm92aWRlZCBhIFVVSUQsIElmIHRoZSBwYWdlIGlzIGxvYWRlZCB3aXRoIGEgVVVJRCByYXRoZXIgdGhhbiBhXG4vLyBmb3JtIHN1Ym1pdC5cbi8vVE9ETzogSGFuZGxlIGxvYWRpbmcgdGhhdCBwYWdlIHdpdGggdXNlIHRoZSBNRU1TQVQgYW5kIERJU09QUkVEIFVVSURcbi8vXG5pZihnZXRVcmxWYXJzKCkudXVpZCAmJiB1dWlkX21hdGNoKVxue1xuICBjb25zb2xlLmxvZygnQ2F1Z2h0IGFuIGluY29taW5nIFVVSUQnKTtcbiAgc2VxX29ic2VydmVyLmNhbmNlbCgpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgbnVsbCApOyAvLyBzaG91bGQgbWFrZSBhIGdlbmVyaWMgb25lIHZpc2libGUgdW50aWwgcmVzdWx0cyBhcnJpdmUuXG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIHJhY3RpdmUuc2V0KFwiYmF0Y2hfdXVpZFwiLCBnZXRVcmxWYXJzKCkudXVpZCk7XG4gIGxldCBwcmV2aW91c19kYXRhID0gZ2V0X3ByZXZpb3VzX2RhdGEoZ2V0VXJsVmFycygpLnV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKTtcbiAgbGV0IHNlcV90eXBlID0gdHJ1ZTtcbiAgY29uc29sZS5sb2cocHJldmlvdXNfZGF0YS5qb2JzKTtcbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldGFwc2ljb3YnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDQpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA1KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXBhY2snKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtcGFja19idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1zYXRzdm0nKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpICYmICEgcHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGRvbXRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Jpb3NlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdmZnByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50ZGJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE3KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgaWYoc2VxX3R5cGUpXG4gIHtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICB9XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgZXJyb3JfbWVzc2FnZT1cIkFSR1wiO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zZXFfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoc3RydWN0X3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc3RydWN0X2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChqb2JfbmFtZStcIixcIik7XG4gICAgICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZGlzb3ByZWQnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdiaW9zZXJmJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBnZW50aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGRvbXRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAxICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICAvLyBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICBpZighIC9BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuXG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9mb3Jtcy9mb3Jtc19pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=