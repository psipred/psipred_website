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
  let hspred_table = '<br /><table><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Hotspot Residue</td></tr>';
  hspred_table += '<tr><td bgcolor="#ffffff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Non-Hotspot Residue</td></tr>';
  hspred_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Non-interface residue</td></tr></table><br />';
  hspred_table += '<table><tr><th>Chain/Residue</th><th>Residue Identity</th><th>Score</th>';
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
  let metsite_table = '<br /><table><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Metal Binding Contact</td></tr>';
  metsite_table += '<tr><td bgcolor="#000000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Chain not predicted</td></tr>';
  metsite_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Predicted chain</td></tr></table><br />';
  metsite_table += '<table><tr><th>Residue Number</th><th>Raw Neural Network Score</th><th>Residue</th>';
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
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
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
  feat_table += '<table><tr><th>Feature Name</th><th>Value</th><th>Bias</th></tr>';

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
  aa_table += '<table><tr>';
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
  aa_table += '<b>Significance Key</b><br />';
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
      results_found.mempack = true;
      ractive.set("mempack_waiting_message", '');
      ractive.set("mempack_waiting_icon", '');
      ractive.set("mempack_time", '');
      let cartoon_match = mempack_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        mempack_result_found = true;
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

    if (result_dict.name === 'ffpred') {
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
      ractive.set(job_name + "_waiting_message", 'The job completed succesful but no prediction was possible for the input data. No ' + job_names[job_name] + ' data generated for this job');
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
  if (previous_data.jobs.includes('genthreader')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmNiMzhmMmM0YzY0MDk5ZjM3YTMiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJ6aXAiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiIsImhzcHJlZF9jaGVja2NoYWluc19zZWVuIiwiZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4iLCJyZXN1bHRzX2ZvdW5kIiwibWV0YXBzaWNvdiIsIm1lbXBhY2siLCJnZW50aHJlYWRlciIsIm1ldHNpdGUiLCJoc3ByZWQiLCJtZW1lbWJlZCIsImdlbnRkYiIsInJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0Iiwia2V5X2ZpZWxkcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImZpZWxkIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidGFibGUiLCJhbGlnbiIsInBuZ19tYXRjaCIsImJvdW5kYXJ5X3BuZyIsImJvdW5kYXJ5IiwicHJlZF9tYXRjaCIsImRvbXNzZWFwcmVkIiwiZG9tc3NlYV9tYXRjaCIsImRvbXNzZWEiLCJtb2RlbCIsImRpc3BsYXlfc3RydWN0dXJlIiwiaGhibGl0cyIsInBkYmFhIiwiY2F0aGJsYXN0IiwicGRiYmxhc3QiLCJkb21zZXJmX21hdGNoIiwiYnV0dG9uc190YWdzIiwicGF0aHMiLCJzY2hfbWF0Y2giLCJzY2giLCJmZWF0X21hdGNoIiwiZmVhdHVyZXMiLCJwcmVkc19tYXRjaCIsInByZWRzIiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJpbml0aWFsX21hdGNoIiwic2Vjb25kX21hdGNoIiwiaW5pdGlhbCIsInNlY29uZCIsInRkYiIsInVyaSIsImNzc19pZCIsIm1vbF9jb250YWluZXJzIiwiY29udGFpbmVyIiwiY2FydG9vbl9jb2xvciIsImF0b20iLCJob3RzcG90X2NvbG9yIiwiYiIsImVsZW1lbnQiLCIkIiwiY29uZmlnIiwiYmFja2dyb3VuZENvbG9yIiwidmlld2VyIiwiJDNEbW9sIiwiY3JlYXRlVmlld2VyIiwiZ2V0X3RleHQiLCJhZGRNb2RlbCIsInNldFN0eWxlIiwiY29sb3JmdW5jIiwiYWRkU3VyZmFjZSIsIlN1cmZhY2VUeXBlIiwiVkRXIiwiY29sb3JzY2hlbWUiLCJoZXRmbGFnIiwiem9vbVRvIiwicmVuZGVyIiwiem9vbSIsInNldF9kb3dubG9hZHNfcGFuZWwiLCJkb3dubG9hZHNfc3RyaW5nIiwiY29uY2F0Iiwic2V0X2FkdmFuY2VkX3BhcmFtcyIsIm9wdGlvbnNfZGF0YSIsInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnIiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJiaW9zZXJmX21vZGVsbGVyX2tleSIsImRvbXNlcmZfbW9kZWxsZXJfa2V5IiwiY2hlY2tlZCIsImZmcHJlZF9zZWxlY3Rpb24iLCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluIiwiZXh0cmFjdF9mYXN0YV9jaGFpbiIsInNlZWRTaXRlRmluZF9jaGFpbiIsIm1ldHByZWRfd3JhcHBlcl9jaGFpbiIsInNlZWRTaXRlRmluZF9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9mcHIiLCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zIiwiaHNfcHJlZF9maXJzdF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiIsImhzX3ByZWRfc2Vjb25kX2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiIsIm1lbWVtYmVkX2FsZ29yaXRobSIsIm1lbWVtYmVkX2JhcnJlbCIsIm1lbWVtYmVkX3Rlcm1pbmkiLCJzZW5kX3JlcXVlc3QiLCJ1cmwiLCJzZW5kX2RhdGEiLCJyZXNwb25zZSIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJzdWJtaXNzaW9ucyIsImlucHV0X2ZpbGUiLCJqb2JzIiwic3VibWlzc2lvbiIsInNsaWNlIiwic3VibWlzc2lvbl9uYW1lIiwidXJsX3N0dWIiLCJjdGwiLCJwYXRoX2JpdHMiLCJmb2xkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNJbkFycmF5IiwiYXJyYXkiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtIiwia2V5IiwiZG9jdW1lbnRFbGVtZW50IiwiaW1wb3J0YW50IiwiZ2V0RW1QaXhlbHMiLCJleHRyYUJvZHkiLCJjcmVhdGVFbGVtZW50IiwiY3NzVGV4dCIsImluc2VydEJlZm9yZSIsImJvZHkiLCJ0ZXN0RWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImNsaXBib2FyZCIsIkNsaXBib2FyZCIsIm9uIiwiZW5kcG9pbnRzX3VybCIsImdlYXJzX3N2ZyIsIm1haW5fdXJsIiwiYXBwX3BhdGgiLCJzZXFfam9iX2xpc3QiLCJzdHJ1Y3Rfam9iX2xpc3QiLCJob3N0bmFtZSIsImluaXRpYWxpc2F0aW9uX2RhdGEiLCJzZXF1ZW5jZV9mb3JtX3Zpc2libGUiLCJzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlIiwicmVzdWx0c192aXNpYmxlIiwicmVzdWJtaXNzaW9uX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwiYmlvc2VyZl9hZHZhbmNlZCIsImRvbXNlcmZfYWR2YW5jZWQiLCJkb21wcmVkX2FkdmFuY2VkIiwiZmZwcmVkX2FkdmFuY2VkIiwibWV0c2l0ZV9hZHZhbmNlZCIsImhzcHJlZF9hZHZhbmNlZCIsIm1lbWVtYmFkX2FkdmFuY2VkIiwibW9kZWxsZXJfa2V5IiwiZG93bmxvYWRfbGlua3MiLCJlcnJvcl9tZXNzYWdlIiwicHNpcHJlZF9ob3JpeiIsImRpc29fcHJlY2lzaW9uIiwibWVtc2F0c3ZtX3NjaGVtYXRpYyIsIm1lbXNhdHN2bV9jYXJ0b29uIiwicGdlbl90YWJsZSIsInBnZW5fYW5uX3NldCIsIm1lbXNhdHBhY2tfc2NoZW1hdGljIiwibWVtc2F0cGFja19jYXJ0b29uIiwiZ2VuX3RhYmxlIiwiZ2VuX2Fubl9zZXQiLCJwYXJzZWRzX2luZm8iLCJwYXJzZWRzX3BuZyIsImRnZW5fdGFibGUiLCJkZ2VuX2Fubl9zZXQiLCJiaW9zZXJmX21vZGVsIiwiZG9tc2VyZl9idXR0b25zIiwiZG9tc2VyZl9tb2RlbF91cmlzIiwiZmZwcmVkX2NhcnRvb24iLCJzY2hfc2NoZW1hdGljIiwiZnVuY3Rpb25fdGFibGVzIiwibWV0YXBzaWNvdl9tYXAiLCJtZXRzaXRlX3BkYiIsImhzcHJlZF9pbml0aWFsX3BkYiIsImhzcHJlZF9zZWNvbmRfcGRiIiwidGRiX2ZpbGUiLCJtZW1lbWJlZF9wZGIiLCJtZXRhcHNpY292X2RhdGEiLCJtZXRzaXRlX2RhdGEiLCJoc3ByZWRfZGF0YSIsIm1lbWVtYmVkX2RhdGEiLCJnZW50ZGJfZGF0YSIsInNlcXVlbmNlIiwic2VxdWVuY2VfbGVuZ3RoIiwic3Vic2VxdWVuY2Vfc3RhcnQiLCJzdWJzZXF1ZW5jZV9zdG9wIiwiYmF0Y2hfdXVpZCIsInBzaXByZWRfY2hlY2tlZCIsIlJhY3RpdmUiLCJlbCIsInRlbXBsYXRlIiwidXVpZF9yZWdleCIsInV1aWRfbWF0Y2giLCJzZXFfb2JzZXJ2ZXIiLCJvYnNlcnZlIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluaXQiLCJkZWZlciIsInNlcV9sZW5ndGgiLCJzZXFfc3RhcnQiLCJzZXFfc3RvcCIsInNlcV90eXBlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiYXRjaCIsInN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsInN1Ym1pc3Npb25fbWVzc2FnZSIsImxhc3RfbWVzc2FnZSIsImVycm9yX3RleHQiLCJjb250ZXh0IiwiZ2VuZXJhdGVBc3luYyIsInRoZW4iLCJibG9iIiwic2F2ZUFzIiwiZXZlbnQiLCJhZHYiLCJzZXR0aW5nIiwibWV0X3BkYiIsImluaXRpYWxfcGRiIiwic2Vjb25kX3BkYiIsInN1Ym1pdF9qb2IiLCJzZXFfY291bnQiLCJ0b1VwcGVyQ2FzZSIsImNoZWNrX3N0YXRlcyIsInN0cnVjdF90eXBlIiwiYmlvc2VyZl9jaGVja2VkIiwiZG9tc2VyZl9jaGVja2VkIiwiYmlvc19tb2RlbGxlcl90ZXN0IiwidGVzdF9tb2RlbGxlcl9rZXkiLCJkb21zX21vZGVsbGVyX3Rlc3QiLCJ2ZXJpZnlfYW5kX3NlbmRfZm9ybSIsInBkYkZpbGUiLCJwZGJEYXRhIiwiZmlsZXMiLCJmciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNUZXh0Iiwib25sb2FkIiwicmVzdWx0IiwibWVzc2FnZSIsIm9yaWdpbmFsIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsInN0b3AiLCJzdWJzZXF1ZW5jZSIsImlucHV0IiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsInN3YXBEb21zZXJmIiwidXJpX251bWJlciIsImpvYl9zdHJpbmciLCJjaGVja19saXN0IiwidmVyaWZ5X3NlcV9mb3JtIiwidmVyaWZ5X3N0cnVjdF9mb3JtIiwicGdlbnRocmVhZGVyX2NoZWNrZWQiLCJwZG9tdGhyZWFkZXJfY2hlY2tlZCIsInN0cnVjdCIsImNoZWNrZWRfYXJyYXkiLCJ0ZXN0IiwibnVjbGVvdGlkZV9jb3VudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFTyxTQUFTQSxZQUFULENBQXNCQyxPQUF0QixFQUErQkMsSUFBL0IsRUFDUDtBQUNFLE1BQUlDLGVBQWUsZ0tBQW5CO0FBQ0FBLGtCQUFnQix1SkFBaEI7QUFDQUEsa0JBQWdCLHVLQUFoQjtBQUNBQSxrQkFBZ0IsMEVBQWhCO0FBQ0EsTUFBSUMsUUFBUUYsS0FBS0csS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBRCxRQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFFBQUlDLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQSxRQUFHSSxRQUFRQyxNQUFSLEtBQW1CLENBQXRCLEVBQXdCO0FBQ3RCUCxzQkFBZ0IsYUFBV00sUUFBUSxDQUFSLENBQVgsR0FBc0IsV0FBdEIsR0FBa0NBLFFBQVEsQ0FBUixDQUFsQyxHQUE2QyxXQUE3QyxHQUF5REEs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QUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEO0FBQ0QsU0FBT0EsYUFBUDtBQUNEOztBQUVEO0FBQ08sU0FBU2lILGVBQVQsQ0FBeUIzYSxHQUF6QixFQUE4QnVDLFFBQTlCLEVBQXdDcU0sS0FBeEMsRUFBK0NvTSxhQUEvQyxFQUNQO0FBQ0UsTUFBSXRILGdCQUFnQixFQUFwQjtBQUNBLE1BQUcsQ0FBRSxpQkFBaUJ1SCxJQUFqQixDQUFzQjFZLFFBQXRCLENBQUwsRUFDQTtBQUNFbVIsb0JBQWdCQSxnQkFBZ0IsZ0ZBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFHMVQsSUFBSWpHLE1BQUosR0FBYSxJQUFoQixFQUNBO0FBQ0UyWixvQkFBZ0JBLGdCQUFnQiw0Q0FBaEM7QUFDRDtBQUNELE1BQUcxVCxJQUFJakcsTUFBSixHQUFhLEVBQWhCLEVBQ0E7QUFDRTJaLG9CQUFnQkEsZ0JBQWdCLDZDQUFoQztBQUNEOztBQUVEO0FBQ0EsTUFBSXdILG1CQUFtQixDQUFDbGIsSUFBSTNGLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q04sTUFBbkU7QUFDQSxNQUFJbWhCLG1CQUFpQmxiLElBQUlqRyxNQUF0QixHQUFnQyxJQUFuQyxFQUNBO0FBQ0UyWixvQkFBZ0JBLGdCQUFnQix3R0FBaEM7QUFDRDtBQUNELE1BQUcsK0JBQStCdUgsSUFBL0IsQ0FBb0NqYixHQUFwQyxDQUFILEVBQ0E7QUFDRTBULG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUFuRCxDQUFVLElBQVYsRUFBZ0J5SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ3RILG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEOztBQUVELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmNiMzhmMmM0YzY0MDk5ZjM3YTMiLCJleHBvcnQgZnVuY3Rpb24gcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBoc3ByZWRfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtIb3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjZmZmZmZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLUhvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24taW50ZXJmYWNlIHJlc2lkdWU8L3RkPjwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkNoYWluL1Jlc2lkdWU8L3RoPjx0aD5SZXNpZHVlIElkZW50aXR5PC90aD48dGg+U2NvcmU8L3RoPic7XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAzKXtcbiAgICAgIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9XG4gIH0pO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgaHNwcmVkX3RhYmxlKTtcbn1cblxuLy8gcGFyc2UgdGhlIHNtYWxsIG1ldHNpdGUgb3V0cHV0IHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbWV0c2l0ZV90YWJsZSA9ICc8YnIgLz48dGFibGU+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO01ldGFsIEJpbmRpbmcgQ29udGFjdDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Q2hhaW4gbm90IHByZWRpY3RlZDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7UHJlZGljdGVkIGNoYWluPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+UmVzaWR1ZSBOdW1iZXI8L3RoPjx0aD5SYXcgTmV1cmFsIE5ldHdvcmsgU2NvcmU8L3RoPjx0aD5SZXNpZHVlPC90aD4nO1xuICBsZXQgaGl0X3JlZ2V4ID0gL1xcZCtcXHMuKz9cXHNcXHd7M31cXGQrL2c7XG4gIGxldCBoaXRfbWF0Y2hlcyA9IGZpbGUubWF0Y2goaGl0X3JlZ2V4KTtcbiAgaWYoaGl0X21hdGNoZXMpXG4gIHtcbiAgICBoaXRfbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMvKTtcbiAgICAgIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfSk7XG4gIH1cbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbWV0c2l0ZV90YWJsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZnByZWRzKHJhY3RpdmUsIGZpbGUpe1xuXG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgYnBfZGF0YSA9IFtdO1xuICBsZXQgbWZfZGF0YSA9IFtdO1xuICBsZXQgY2NfZGF0YSA9IFtdO1xuICBsZXQgdGFibGVfZGF0YSA9ICcnO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aCgnIycpKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgaWYoZW50cmllcy5sZW5ndGggPCA0KXtyZXR1cm47fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdCUCcpe2JwX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0NDJyl7Y2NfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnTUYnKXttZl9kYXRhLnB1c2goZW50cmllcyk7fVxuICB9KTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+QmlvbG9naWNhbCBQcm9jZXNzIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBicF9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5Nb2xlY3VsYXIgRnVuY3Rpb24gUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIG1mX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkNlbGx1bGFyIENvbXBvbmVudCBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgY2NfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICB0YWJsZV9kYXRhICs9ICdUaGVzZSBwcmVkaWN0aW9uIHRlcm1zIHJlcHJlc2VudCB0ZXJtcyBwcmVkaWN0ZWQgd2hlcmUgU1ZNIHRyYWluaW5nIGluY2x1ZGVzIGFzc2lnbmVkIEdPIHRlcm1zIGFjcm9zcyBhbGwgZXZpZGVuY2UgY29kZSB0eXBlcy4gU1ZNIHJlbGlhYmlsaXR5IGlzIHJlZ2FyZGVkIGFzIEhpZ2ggKEgpIHdoZW4gTUNDLCBzZW5zaXRpdml0eSwgc3BlY2lmaWNpdHkgYW5kIHByZWNpc2lvbiBhcmUgam9pbnRseSBhYm92ZSBhIGdpdmVuIHRocmVzaG9sZC4gb3RoZXJ3aXNlIFJlbGlhYmlsaXR5IGlzIGluZGljYXRlZCBhcyBMb3cgKEwpLiA8YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbn1cblxuZnVuY3Rpb24gc2V0X2Fhbm9ybSgpe1xuICBsZXQgaEFBX25vcm0gPSB7fTtcbiAgaEFBX25vcm0uQSA9IHsgdmFsOiAwLjA3MTc4MzI0ODAwNjMwOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNzM2NzY2MTUyNDI3NX07XG4gIGhBQV9ub3JtLlYgPSB7IHZhbDogMC4wNTk2MjQ1OTUzNjk5MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAzNzc3OTE1Mjg3NDV9O1xuICBoQUFfbm9ybS5ZID0geyB2YWw6IDAuMDI2MDc1MDY4MjQwNDM3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE0ODIyNDcxNTMxMzc5fTtcbiAgaEFBX25vcm0uVyA9IHsgdmFsOiAwLjAxNDE2NjAwMjYxMjc3MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMDQ3MTgzNTgwMTk5Nn07XG4gIGhBQV9ub3JtLlQgPSB7IHZhbDogMC4wNTI1OTM1ODI5NzI3MTQsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAwOTQ3OTM5NjQ1OTd9O1xuICBoQUFfbm9ybS5TID0geyB2YWw6IDAuMDgyMTIzMjQxMzMyMDk5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI4Njg3NTY2MDgxNTEyfTtcbiAgaEFBX25vcm0uUCA9IHsgdmFsOiAwLjA2NTU1NzUzMTMyMjI0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzNDIzOTM5ODQ5NjczNn07XG4gIGhBQV9ub3JtLkYgPSB7IHZhbDogMC4wMzcxMDM5OTQ5NjkwMDIsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg1NDM0MjMxMzkxODZ9O1xuICBoQUFfbm9ybS5NID0geyB2YWw6IDAuMDIyNTYyODE4MTgzOTU1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDExMzIxMDM5NjYyNDgxfTtcbiAgaEFBX25vcm0uSyA9IHsgdmFsOiAwLjA1NDgzMzk3OTI2OTE4NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyOTI2NDA4MzY2NzE1N307XG4gIGhBQV9ub3JtLkwgPSB7IHZhbDogMC4xMDAxMDU5MTU3NTkwNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDI3NjgwODUxOTAwOX07XG4gIGhBQV9ub3JtLkkgPSB7IHZhbDogMC4wNDIwMzQ1MjYwNDA0NjcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjY4NDkyNjI0OTV9O1xuICBoQUFfbm9ybS5IID0geyB2YWw6IDAuMDI3MTQxNDAzNTM3NTk4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE1NTA1NjYzNzg5ODV9O1xuICBoQUFfbm9ybS5HID0geyB2YWw6IDAuMDY5MTc5ODIwMTA0NTM2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMDg3NTYyMDU3MzI4fTtcbiAgaEFBX25vcm0uUSA9IHsgdmFsOiAwLjA2NTkyMDU2MTkzMTgwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDEwMzA5MTAwODM2Nn07XG4gIGhBQV9ub3JtLkUgPSB7IHZhbDogMC4wNDY0Nzg0NjIyNTgzOCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxOTk0NjI2OTQ2MTczNn07XG4gIGhBQV9ub3JtLkMgPSB7IHZhbDogMC4wMjQ5MDg1NTE4NzIwNTYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjI5MDk1ODk1MDR9O1xuICBoQUFfbm9ybS5EID0geyB2YWw6IDAuMDQ0MzM3OTA0NzI2MDQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NDM2Njc3MjU2NzI2fTtcbiAgaEFBX25vcm0uTiA9IHsgdmFsOiAwLjAzMzUwNzAyMDk4NzAzMyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNjUzNjAyMjI4ODIwNH07XG4gIGhBQV9ub3JtLlIgPSB7IHZhbDogMC4wNTk3NDA0NjkwMzExOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNTE2NTk5NDc3MzM4NH07XG4gIHJldHVybihoQUFfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIHNldF9mbm9ybSgpe1xuICBsZXQgaEZfbm9ybSA9IHt9O1xuICBoRl9ub3JtLmh5ZHJvcGhvYmljaXR5ID0ge3ZhbDogLTAuMzQ4NzY4MjgwODAxNTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAwLjc1NTU5MTUyNzY5Nzk5fTtcbiAgaEZfbm9ybVsncGVyY2VudCBwb3NpdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuNDU3NzE3NDY2OTQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzLjU2NzEzMzM0MTEzOX07XG4gIGhGX25vcm1bJ2FsaXBoYXRpYyBpbmRleCddID0ge3ZhbDogNzkuOTExNTQ5MzE5MDk5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDE2Ljc4NzYxNzk3ODgyN307XG4gIGhGX25vcm1bJ2lzb2VsZWN0cmljIHBvaW50J10gPSB7dmFsOiA3LjYxMDIwNDYzODM2MDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxLjk3MTYxMTEwMjAwODh9O1xuICBoRl9ub3JtWydtb2xlY3VsYXIgd2VpZ2h0J10gPSB7dmFsOiA0ODY2OC40MTI4Mzk5NjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM3ODM4LjMyNDg5NTk2OX07XG4gIGhGX25vcm0uY2hhcmdlID0ge3ZhbDogNS4wOTkxNzYzMDU3NjA0LFxuICAgICAgICAgICAgICAgICAgICBzZGU6IDE2LjgzODYzNjU5MDI1fTtcbiAgaEZfbm9ybVsncGVyY2VudCBuZWdhdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuMDI2MTkwMTI4MTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiA0LjAyMDY2MzE2ODA5MjZ9O1xuICBoRl9ub3JtWydtb2xhciBleHRpbmN0aW9uIGNvZWZmaWNpZW50J10gPSB7dmFsOiA0NjQ3NS4yOTM5MjM5MjYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM5Mjk5LjM5OTg0ODgyM307XG4gIHJldHVybihoRl9ub3JtKTtcbn1cblxuZnVuY3Rpb24gZ2V0X2FhX2NvbG9yKHZhbCl7XG4gICAgbGV0IGFiX3ZhbCA9IE1hdGguYWJzKHZhbCk7XG4gICAgaWYoYWJfdmFsID49IDIuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjFuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDIuMjQpe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYycFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMm5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWY1cFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmNW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS42NDUgKSB7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjEwcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMTBuXCI7XG4gICAgfVxuICAgIHJldHVybiBcInBsYWluXCI7XG59XG5cbi8vcGFyc2UgdGhlIGZmcHJlZCBmZWF0Y2ZvIGZlYXR1cmVzIGZpbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZWF0Y2ZnKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgU0ZfZGF0YSA9IHt9O1xuICBsZXQgQUFfZGF0YSA9IHt9O1xuICBsZXQgaEZfbm9ybSA9c2V0X2Zub3JtKCk7XG4gIGxldCBoQUFfbm9ybT1zZXRfYWFub3JtKCk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiQUFcIikpe1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIEFBX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJTRlwiKSlcbiAgICB7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgU0ZfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICB9KTtcblxuICAvLyBidWlsZCBodG1sIHRhYmxlcyBmb3IgdGhlIGZlYXR1cmUgZGF0YVxuICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gIGxldCBnbG9iYWxfZmVhdHVyZXMgPSByYWN0aXZlLmdldCgnZ2xvYmFsX2ZlYXR1cmVzJyk7XG4gIGxldCBmZWF0X3RhYmxlID0gJzxiPkdsb2JhbCBGZWF0dXJlczwvYj48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICdHbG9iYWwgZmVhdHVyZXMgYXJlIGNhbGN1bGF0ZWQgZGlyZWN0bHkgZnJvbSBzZXF1ZW5jZS4gTG9jYWxpc2F0aW9uIHZhbHVlcyBhcmUgcHJlZGljdGVkIGJ5IHRoZSBQc29ydCBhbGdvcml0aG0gYW5kIHJlZmxlY3QgdGhlIHJlbGF0aXZlIGxpa2VsaWhvb2Qgb2YgdGhlIHByb3RlaW4gb2NjdXB5aW5nIGRpZmZlcmVudCBjZWxsdWxhciBsb2NhbGlzYXRpb25zLiBUaGUgYmlhcyBjb2x1bW4gaXMgaGlnaGxpZ2h0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzaWduaWZpY2FuY2Ugb2YgdGhlIGZlYXR1cmUgdmFsdWUgY2FsY3VsYXRlZCBmcm9tIFogc2NvcmUgb2YgdGhlIGZlYXR1cmUuPGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+RmVhdHVyZSBOYW1lPC90aD48dGg+VmFsdWU8L3RoPjx0aD5CaWFzPC90aD48L3RyPic7XG5cbiAgT2JqZWN0LmtleXMoU0ZfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZV9uYW1lKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgaWYoZmVhdHVyZV9uYW1lIGluIGhGX25vcm0pe1xuICAgICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKCAocGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLWhGX25vcm1bZmVhdHVyZV9uYW1lXS52YWwpIC8gaEZfbm9ybVtmZWF0dXJlX25hbWVdLnNkZSk7XG4gICAgfVxuICAgIGZlYXRfdGFibGUgKz0gJzx0cj48dGQ+JytmZWF0dXJlX25hbWUrJzwvdGQ+PHRkPicrcGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLnRvRml4ZWQoMikrJzwvdGQ+PHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+PC90cj4nO1xuICB9KTtcbiAgZmVhdF90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgZmVhdF90YWJsZSk7XG5cbiAgLy9idWlsZCBodG1sIHRhYmxlIGZvciB0aGUgQUEgZGF0YVxuICBsZXQgYWFfY29tcG9zaXRpb24gPSByYWN0aXZlLmdldCgnYWFfY29tcG9zaXRpb24nKTtcbiAgbGV0IGFhX3RhYmxlID0gJzxiPkFtaW5vIEFjaWQgQ29tcG9zaXRpb24gKHBlcmNlbnRhZ2VzKTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBhYV90YWJsZSArPSAnPHRoPicrcmVzaWR1ZSsnPC90aD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSktaEFBX25vcm1bcmVzaWR1ZV0udmFsKSAvIGhBQV9ub3JtW3Jlc2lkdWVdLnNkZSk7XG4gICAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nKyhwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pKjEwMCkudG9GaXhlZCgyKSsnPC90ZD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPGI+U2lnbmlmaWNhbmNlIEtleTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlIGNsYXNzPVwic2lnbmlma2V5XCIgYWxpZ249XCJjZW50ZXJcIiBjZWxscGFkZGluZz1cIjJcIiBjZWxsc3BhY2luZz1cIjBcIj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PGI+bG93PC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiOVwiPiZuYnNwOzwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBhbGlnbj1cInJpZ2h0XCI+PGI+aGlnaDwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxblwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMm5cIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVuXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMG5cIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPnAgJmd0Oz0gMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBwXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVwXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYycFwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMXBcIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiMTFcIj5TaWduaWZpY2FuY2UgcCB2YWx1ZSBpcyBjYWxjdWxhdGVkIHVzaW5nIHRoZSBaIHNjb3JlIG9mIHRoZSBwZXJjZW50IGFtaW5vIGFjaWQgY29tcG9zaXRpb248L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIGFhX3RhYmxlKTtcbn1cblxuXG4vLyBmb3IgYSBnaXZlbiBtZW1zYXQgZGF0YSBmaWxlcyBleHRyYWN0IGNvb3JkaW5hdGUgcmFuZ2VzIGdpdmVuIHNvbWUgcmVnZXhcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbWVtc2F0X3JhbmdlcyhyZWdleCwgZGF0YSlcbntcbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCcsJykpXG4gICAge1xuICAgICAgbGV0IHJlZ2lvbnMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbiwgaSl7XG4gICAgICAgIHJlZ2lvbnNbaV0gPSByZWdpb24uc3BsaXQoJy0nKTtcbiAgICAgICAgcmVnaW9uc1tpXVswXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMF0pO1xuICAgICAgICByZWdpb25zW2ldWzFdID0gcGFyc2VJbnQocmVnaW9uc1tpXVsxXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZihtYXRjaFsxXS5pbmNsdWRlcygnLScpKVxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hbMV0pO1xuICAgICAgICBsZXQgc2VnID0gbWF0Y2hbMV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbW10sIF07XG4gICAgICAgIHJlZ2lvbnNbMF1bMF0gPSBwYXJzZUludChzZWdbMF0pO1xuICAgICAgICByZWdpb25zWzBdWzFdID0gcGFyc2VJbnQoc2VnWzFdKTtcbiAgICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4obWF0Y2hbMV0pO1xufVxuXG4vLyB0YWtlIGFuZCBzczIgKGZpbGUpIGFuZCBwYXJzZSB0aGUgZGV0YWlscyBhbmQgd3JpdGUgdGhlIG5ldyBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGFubm90YXRpb25zW2ldLnNzID0gZW50cmllc1szXTtcbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG59XG5cbi8vcGFyc2UgdGhlIGRpc29wcmVkIGNvbWIgZmlsZSBhbmQgYWRkIGl0IHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVjaXNpb24gPSBbXTtcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIHByZWNpc2lvbltpXSA9IHt9O1xuICAgIHByZWNpc2lvbltpXS5wb3MgPSBlbnRyaWVzWzFdO1xuICAgIHByZWNpc2lvbltpXS5wcmVjaXNpb24gPSBlbnRyaWVzWzRdO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJywgcHJlY2lzaW9uKTtcbiAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHByZWNpc2lvbiwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG4vL3BhcnNlIHRoZSBtZW1zYXQgb3V0cHV0XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuICBsZXQgdG9wb19yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1RvcG9sb2d5OlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgc2lnbmFsX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvU2lnbmFsXFxzcGVwdGlkZTpcXHMrKC4rKVxcbi8sIGZpbGUpO1xuICBsZXQgcmVlbnRyYW50X3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvUmUtZW50cmFudFxcc2hlbGljZXM6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCB0ZXJtaW5hbCA9IGdldF9tZW1zYXRfcmFuZ2VzKC9OLXRlcm1pbmFsOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICAvL2NvbnNvbGUubG9nKHNpZ25hbF9yZWdpb25zKTtcbiAgLy8gY29uc29sZS5sb2cocmVlbnRyYW50X3JlZ2lvbnMpO1xuICBsZXQgY29pbF90eXBlID0gJ0NZJztcbiAgaWYodGVybWluYWwgPT09ICdvdXQnKVxuICB7XG4gICAgY29pbF90eXBlID0gJ0VDJztcbiAgfVxuICBsZXQgdG1wX2Fubm8gPSBuZXcgQXJyYXkoc2VxLmxlbmd0aCk7XG4gIGlmKHRvcG9fcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKVxuICB7XG4gICAgbGV0IHByZXZfZW5kID0gMDtcbiAgICB0b3BvX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdUTScsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgICAgaWYocHJldl9lbmQgPiAwKXtwcmV2X2VuZCAtPSAxO31cbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLCByZWdpb25bMF0pO1xuICAgICAgaWYoY29pbF90eXBlID09PSAnRUMnKXsgY29pbF90eXBlID0gJ0NZJzt9ZWxzZXtjb2lsX3R5cGUgPSAnRUMnO31cbiAgICAgIHByZXZfZW5kID0gcmVnaW9uWzFdKzI7XG4gICAgfSk7XG4gICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQtMSwgc2VxLmxlbmd0aCk7XG5cbiAgfVxuICAvL3NpZ25hbF9yZWdpb25zID0gW1s3MCw4M10sIFsxMDIsMTE3XV07XG4gIGlmKHNpZ25hbF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHNpZ25hbF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUycsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIC8vcmVlbnRyYW50X3JlZ2lvbnMgPSBbWzQwLDUwXSwgWzIwMCwyMThdXTtcbiAgaWYocmVlbnRyYW50X3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgcmVlbnRyYW50X3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdSSCcsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIHRtcF9hbm5vLmZvckVhY2goZnVuY3Rpb24oYW5ubywgaSl7XG4gICAgYW5ub3RhdGlvbnNbaV0ubWVtc2F0ID0gYW5ubztcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCB0eXBlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgLy9jb25zb2xlLmxvZyh0eXBlKydfYW5uX3NldCcpO1xuICBsZXQgYW5uX2xpc3QgPSByYWN0aXZlLmdldCh0eXBlKydfYW5uX3NldCcpO1xuICAvL2NvbnNvbGUubG9nKGFubl9saXN0KTtcbiAgaWYoT2JqZWN0LmtleXMoYW5uX2xpc3QpLmxlbmd0aCA+IDApe1xuICBsZXQgcHNldWRvX3RhYmxlID0gJzx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgZ2VuLXRhYmxlXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TQ09QPC90aD4nO1xuICB9ZWxzZSB7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEg8L3RoPic7XG4gIH1cbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UERCU1VNPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbGlnbm1lbnQ8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk1PREVMPC90aD4nO1xuXG4gIC8vIGlmIE1PREVMTEVSIFRISU5HWVxuICBwc2V1ZG9fdGFibGUgKz0gJzwvdHI+PHRib2R5XCI+XFxuJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAvL2NvbnNvbGUubG9nKGxpbmUpO1xuICAgIGlmKGxpbmUubGVuZ3RoID09PSAwKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGxldCB0YWJsZV9oaXQgPSBlbnRyaWVzWzldO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHRhYmxlX2hpdCA9IGVudHJpZXNbMTFdO31cbiAgICBpZih0YWJsZV9oaXQrXCJfXCIraSBpbiBhbm5fbGlzdClcbiAgICB7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRyPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZCBjbGFzcz0nXCIrZW50cmllc1swXS50b0xvd2VyQ2FzZSgpK1wiJz5cIitlbnRyaWVzWzBdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzNdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s0XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzZdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s3XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOF0rXCI8L3RkPlwiO1xuICAgIGxldCBwZGIgPSBlbnRyaWVzWzldLnN1YnN0cmluZygwLCBlbnRyaWVzWzldLmxlbmd0aC0yKTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyBwZGIgPSBlbnRyaWVzWzExXS5zdWJzdHJpbmcoMCwgZW50cmllc1sxMV0ubGVuZ3RoLTMpO31cbiAgICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOV0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMTBdK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby92ZXJzaW9uL2xhdGVzdC9kb21haW4vXCIrdGFibGVfaGl0K1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW48L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdWaWV3JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwiY2F0aF9tb2RlbGxlclxcXCIpOycgdmFsdWU9J01vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3LnJjc2Iub3JnL3BkYi9leHBsb3JlL2V4cGxvcmUuZG8/c3RydWN0dXJlSWQ9XCIrcGRiK1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3BkYi9cIitwZGIrXCInPlNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW48L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdWaWV3JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwicGRiX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPC90cj5cXG5cIjtcbiAgICB9XG4gIH0pO1xuICBwc2V1ZG9fdGFibGUgKz0gXCI8L3Rib2R5PjwvdGFibGU+XFxuXCI7XG4gIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgcHNldWRvX3RhYmxlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAgIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgXCI8aDM+Tm8gZ29vZCBoaXRzIGZvdW5kLiBHVUVTUyBhbmQgTE9XIGNvbmZpZGVuY2UgaGl0cyBjYW4gYmUgZm91bmQgaW4gdGhlIHJlc3VsdHMgZmlsZTwvaDM+XCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYXJzZWRzKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVkaWN0aW9uX3JlZ2V4ID0gL0RvbWFpblxcc0JvdW5kYXJ5XFxzbG9jYXRpb25zXFxzcHJlZGljdGVkXFxzRFBTOlxccyguKykvO1xuICBsZXQgcHJlZGljdGlvbl9tYXRjaCA9ICBwcmVkaWN0aW9uX3JlZ2V4LmV4ZWMoZmlsZSk7XG4gIGlmKHByZWRpY3Rpb25fbWF0Y2gpXG4gIHtcbiAgICBsZXQgZGV0YWlscyA9IGZpbGUucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIGRldGFpbHMgPSBkZXRhaWxzLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIjxoND5cIitkZXRhaWxzK1wiPC9oND5cIik7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGlmKHByZWRpY3Rpb25fbWF0Y2hbMV0uaW5kZXhPZihcIixcIikpXG4gICAge1xuICAgICAgdmFsdWVzID0gcHJlZGljdGlvbl9tYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGkpe1xuICAgICAgICB2YWx1ZXNbaV0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHZhbHVlc1swXSA9IHBhcnNlSW50KHByZWRpY3Rpb25fbWF0Y2hbMV0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGFubm90YXRpb25zW3ZhbHVlXS5kb21wcmVkID0gJ0InO1xuICAgIH0pO1xuICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIk5vIFBhcnNlRFMgRG9tYWluIGJvdW5kYXJpZXMgcHJlZGljdGVkXCIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzIiwiaW1wb3J0IHsgcHJvY2Vzc19maWxlIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3RleHQgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93X3BhbmVsKHZhbHVlLCByYWN0aXZlKVxue1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCB2YWx1ZSApO1xufVxuXG4vL2JlZm9yZSBhIHJlc3VibWlzc2lvbiBpcyBzZW50IGFsbCB2YXJpYWJsZXMgYXJlIHJlc2V0IHRvIHRoZSBwYWdlIGRlZmF1bHRzXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHppcCl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsICcnKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgnZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfaW5mbycsIG51bGwpO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fYW5uX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfbW9kZWwnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9ucycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfbW9kZWxfdXJpczonLCBbXSk7XG4gIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljOicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCBudWxsKTtcblxuXG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJyxudWxsKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5zZXF1ZW5jZV9wbG90Jyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYucHNpcHJlZF9jYXJ0b29uJyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuY29tYl9wbG90Jyk7XG5cbiAgemlwID0gbmV3IEpTWmlwKCk7XG59XG5cbi8vVGFrZSBhIGNvdXBsZSBvZiB2YXJpYWJsZXMgYW5kIHByZXBhcmUgdGhlIGh0bWwgc3RyaW5ncyBmb3IgdGhlIGRvd25sb2FkcyBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpXG57XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKGRhdGEuam9iX25hbWUgPT09IGpvYl9uYW1lKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXSA9IHt9O1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIC8vRVhUUkEgUEFORUxTIEZPUiBTT01FIEpPQlMgVFlQRVM6XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkb21wcmVkJyAgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBnZW50aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmJpb3NlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBkb210aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmRvbXNlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQ9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZmZwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy90YWtlIHRoZSBkYXRhYmxvYiB3ZSd2ZSBnb3QgYW5kIGxvb3Agb3ZlciB0aGUgcmVzdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMsIGpvYl9saXN0KVxue1xuICBsZXQgaG9yaXpfcmVnZXggPSAvXFwuaG9yaXokLztcbiAgbGV0IHNzMl9yZWdleCA9IC9cXC5zczIkLztcbiAgbGV0IHBuZ19yZWdleCA9IC9cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9jYXJ0b29uX3JlZ2V4ID0gL19jYXJ0b29uX21lbXNhdF9zdm1cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXggPSAvX3NjaGVtYXRpY1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2RhdGFfcmVnZXggPSAvbWVtc2F0X3N2bSQvO1xuICBsZXQgbWVtcGFja19jYXJ0b29uX3JlZ2V4ID0gL0thbWFkYS1LYXdhaV9cXGQrLnBuZyQvO1xuICBsZXQgbWVtcGFja19ncmFwaF9vdXQgPSAvaW5wdXRfZ3JhcGgub3V0JC87XG4gIGxldCBtZW1wYWNrX2NvbnRhY3RfcmVzID0gL0NPTlRBQ1RfREVGMS5yZXN1bHRzJC87XG4gIGxldCBtZW1wYWNrX2xpcGlkX3JlcyA9IC9MSVBJRF9FWFBPU1VSRS5yZXN1bHRzJC87XG4gIGxldCBkb21zc2VhX3ByZWRfcmVnZXggPSAvXFwucHJlZCQvO1xuICBsZXQgZG9tc3NlYV9yZWdleCA9IC9cXC5kb21zc2VhJC87XG4gIGxldCBkb21zZXJmX3JlZ2V4ID0gLy4rXyhcXGQrKV8oXFxkKykuKlxcLnBkYi87XG4gIGxldCBmZnByZWRfc2NoX3JlZ2V4ID0gLy4rX3NjaFxcLnBuZy87XG4gIGxldCBmZnByZWRfc3ZtX3JlZ2V4ID0gLy4rX2NhcnRvb25fbWVtc2F0X3N2bV8uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfc2NoZW1hdGljX3JlZ2V4ID0gLy4rX3NjaGVtYXRpY18uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfdG1fcmVnZXggPSAvLitfdG1wXFwucG5nLztcbiAgbGV0IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4ID0gL1xcLmZlYXRjZmcvO1xuICBsZXQgZmZwcmVkX3ByZWRzX3JlZ2V4ID0gL1xcLmZ1bGxfcmF3LztcbiAgbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gIGxldCBtZXRzaXRlX3RhYmxlX3JlZ2V4ID0gL1xcLk1ldHByZWQvO1xuICBsZXQgbWV0c2l0ZV9wZGJfcmVnZXggPSAvXFwuTWV0UHJlZC87XG4gIGxldCBoc3ByZWRfaW5pdGlhbF9yZWdleCA9IC9faW5pdGlhbFxcLnBkYi87XG4gIGxldCBoc3ByZWRfc2Vjb25kX3JlZ2V4ID0gL19zZWNvbmRcXC5wZGIvO1xuXG4gIGxldCBpbWFnZV9yZWdleCA9ICcnO1xuICBsZXQgcmVzdWx0cyA9IGRhdGEucmVzdWx0cztcbiAgbGV0IGRvbWFpbl9jb3VudCA9IDA7XG4gIGxldCBtZXRzaXRlX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IGhzcHJlZF9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCBnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgcmVzdWx0c19mb3VuZCA9IHtcbiAgICAgIHBzaXByZWQ6IGZhbHNlLFxuICAgICAgZGlzb3ByZWQ6IGZhbHNlLFxuICAgICAgbWVtc2F0c3ZtOiBmYWxzZSxcbiAgICAgIHBnZW50aHJlYWRlcjogZmFsc2UsXG4gICAgICBtZXRhcHNpY292OiBmYWxzZSxcbiAgICAgIG1lbXBhY2s6IGZhbHNlLFxuICAgICAgZ2VudGhyZWFkZXI6IGZhbHNlLFxuICAgICAgZG9tcHJlZDogZmFsc2UsXG4gICAgICBwZG9tdGhyZWFkZXI6IGZhbHNlLFxuICAgICAgYmlvc2VyZjogZmFsc2UsXG4gICAgICBkb21zZXJmOiBmYWxzZSxcbiAgICAgIGZmcHJlZDogZmFsc2UsXG4gICAgICBtZXRzaXRlOiBmYWxzZSxcbiAgICAgIGhzcHJlZDogZmFsc2UsXG4gICAgICBtZW1lbWJlZDogZmFsc2UsXG4gICAgICBnZW50ZGI6IGZhbHNlLFxuICB9O1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcblxuICAvL1ByZXBhdG9yeSBsb29wIGZvciBpbmZvcm1hdGlvbiB0aGF0IGlzIG5lZWRlZCBiZWZvcmUgcmVzdWx0cyBwYXJzaW5nOlxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX2dlbmFsaWdubWVudF9hbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uX2RvbScpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAvL21haW4gcmVzdWx0cyBwYXJzaW5nIGxvb3BcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIC8vcHNpcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT0gJ3BzaXBhc3MyJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLnBzaXByZWQgPSB0cnVlO1xuICAgICAgbGV0IG1hdGNoID0gaG9yaXpfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaG9yaXonLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3JpeiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhvcml6IEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcblxuICAgICAgfVxuICAgICAgbGV0IHNzMl9tYXRjaCA9IHNzMl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzczJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U1MyIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdzczInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL2Rpc29wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fZm9ybWF0JylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BiZGF0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJlc3VsdHNfZm91bmQuZGlzb3ByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QQkRBVCBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19jb21iaW5lJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2NvbWInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNPTUIgTk4gT3V0cHV0PC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9tZW1zYXQgYW5kIG1lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtc2F0c3ZtJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1lbXNhdHN2bSA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHNjaGVtZV9tYXRjaCA9IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoZW1lX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TY2hlbWF0aWMgRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSBtZW1zYXRfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IG1lbXNhdF9tYXRjaCA9IG1lbXNhdF9kYXRhX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1lbXNhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21lbXNhdGRhdGEnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXBhY2tfd3JhcHBlcicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1wYWNrID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBtZW1wYWNrX2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgbWVtcGFja19yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGltZyB3aWR0aD1cIjEwMDBweFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBncmFwaF9tYXRjaCA9ICBtZW1wYWNrX2dyYXBoX291dC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihncmFwaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRpYWdyYW0gRGF0YTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNvbnRhY3RfbWF0Y2ggPSAgbWVtcGFja19jb250YWN0X3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjb250YWN0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBsaXBpZF9tYXRjaCA9ICBtZW1wYWNrX2xpcGlkX3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihsaXBpZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkxpcGlkIEV4cG9zdXJlIFByZWRpdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cblxuICAgIH1cbiAgICAvL2dlbnRocmVhZGVyIGFuZCBwZ2VudGhyZWFkZXJcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc29ydF9wcmVzdWx0JylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgICByZXN1bHRzX2ZvdW5kLnBnZW50aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgbGV0IGtleV9maWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlbGxlci1rZXknKTtcbiAgICAgIGZvcihsZXQgZmllbGQgb2Yga2V5X2ZpZWxkcylcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcbiAgICAgICAgZmllbGQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgICAgcmVzdWx0c19mb3VuZC5nZW50aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdnZW5fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbV9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICBsZXQga2V5X2ZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGVsbGVyLWtleScpO1xuICAgICAgZm9yKGxldCBmaWVsZCBvZiBrZXlfZmllbGRzKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuICAgICAgICBmaWVsZC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgICByZXN1bHRzX2ZvdW5kLnBkb210aHJlYWRlciA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdkb21fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX21vZGVscycpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW50aHJlYWRlcl9wc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIC8vIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIC8vIHtcbiAgICAvLyAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAvLyAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgIC8vICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICAvLyB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmRvbXByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIGxldCBwbmdfbWF0Y2ggPSBwbmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocG5nX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5X3BuZyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IFBORzwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IGZpbGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYXJzZWRzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbXNzZWEnKVxuICAgIHtcbiAgICAgIGxldCBwcmVkX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZG9tc3NlYV9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc3NlYV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBmaWxlPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdydW5CaW9zZXJmJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmJpb3NlcmYgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GaW5hbCBIb21vbG9neSBNb2RlbDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2Jpb3NlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl9tb2RlbFwiLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaGhibGl0c19wZGI3MCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SEhTZWFyY2ggUmVzdWx0czwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGdwYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfY2F0aCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQVRIIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdyZWZvcm1hdF9kb21zZXJmX21vZGVscycgfHwgcmVzdWx0X2RpY3QubmFtZSA9PT0gXCJwYXJzZV9wZGJfYmxhc3RcIilcbiAgICB7XG4gICAgICBsZXQgZG9tc2VyZl9tYXRjaCA9IGRvbXNlcmZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc2VyZl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfdGltZVwiLCAnJyk7XG4gICAgICAgIC8vIFRPIERPIEFERCBSRUdFWFxuICAgICAgICBkb21haW5fY291bnQrPTE7XG4gICAgICAgIHJlc3VsdHNfZm91bmQuZG9tc2VyZiA9IHRydWU7XG4gICAgICAgIGlmKGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpe1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsICs9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBidXR0b25zX3RhZ3MgPSByYWN0aXZlLmdldChcImRvbXNlcmZfYnV0dG9uc1wiKTtcbiAgICAgICAgYnV0dG9uc190YWdzICs9ICc8YnV0dG9uIG9uQ2xpY2s9XCJwc2lwcmVkLnN3YXBEb21zZXJmKCcrZG9tYWluX2NvdW50KycpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+RG9tYWluICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9idXR0b24+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX2J1dHRvbnNcIiwgYnV0dG9uc190YWdzKTtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgICAgIHBhdGhzLnB1c2goZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIiwgcGF0aHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZXRTY2hlbWF0aWMnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuZmZwcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfdGltZVwiLCAnJyk7XG5cbiAgICAgIGxldCBzY2hfbWF0Y2ggPSAgZmZwcmVkX3NjaF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2ggPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GZWF0dXJlIFNjaGVtYXRpYyBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYycsICc8Yj5TZXF1ZW5jZSBGZWF0dXJlIE1hcDwvYj48YnIgLz5Qb3NpdGlvbiBkZXBlbmRlbnQgZmVhdHVyZSBwcmVkaWN0aW9ucyBhcmUgbWFwcGVkIG9udG8gdGhlIHNlcXVlbmNlIHNjaGVtYXRpYyBzaG93biBiZWxvdy4gVGhlIGxpbmUgaGVpZ2h0IG9mIHRoZSBQaG9zcGhvcnlsYXRpb24gYW5kIEdseWNvc3lsYXRpb24gZmVhdHVyZXMgcmVmbGVjdHMgdGhlIGNvbmZpZGVuY2Ugb2YgdGhlIHJlc2lkdWUgcHJlZGljdGlvbi48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgZmZwcmVkX3N2bV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnZmZwcmVkX2NhcnRvb24nLCAnPGI+UHJlZGljdGVkIFRyYW5zbWVtYnJhbmUgVG9wb2xvZ3k8L2I+PGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmVhdHVyZXMnKVxuICAgIHtcbiAgICAgIGxldCBmZWF0X21hdGNoID0gZmZwcmVkX2ZlYXRjZmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZmVhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2VxdWVuY2UgRmVhdHVyZSBTdW1tYXJ5PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkZmVhdHVyZXMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZnByZWQnKVxuICAgIHtcbiAgICAgIGxldCBwcmVkc19tYXRjaCA9IGZmcHJlZF9wcmVkc19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkc19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+R08gUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRwcmVkaWN0aW9ucycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3Bsb3Rfc2VsZl9jb250YWN0X21hcCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZXRhcHNpY292ID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3ZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgTWFwPC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCAnPGI+Q29udGFjdCBNYXA8L2I+PGJyIC8+PGltZyBoZWlnaHQ9XCI4MDBcIiB3aWR0aD1cIjgwMFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NvbnRhY3RfcHJlZGljdG9ycycpXG4gICAge1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgICAgICAgbGV0IGV2X21hdGNoID0gbWV0YXBzaWNvdl9ldl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGV2X21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZyZWVDb250YWN0IHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwc19tYXRjaCA9IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYocHNfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBTSUNPViBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2NfbWF0Y2ggPSBtZXRhcHNpY292X2NjbXByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihjY19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNDTVBSRUQgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lICA9PT0gJ21ldGFwc2ljb3Zfc3RhZ2UyJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRzaXRlX2NoZWNrY2hhaW5zJylcbiAgICB7XG4gICAgICAgIG1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRwcmVkX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIGxldCB0YWJsZV9tYXRjaCA9IG1ldHNpdGVfdGFibGVfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHBkYl9tYXRjaCA9IG1ldHNpdGVfcGRiX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIHJlc3VsdHNfZm91bmQubWV0c2l0ZSA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3RpbWVcIiwgJycpO1xuICAgICAgaWYodGFibGVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWV0c2l0ZScsIHppcCwgcmFjdGl2ZSk7XG5cbiAgICAgIH1cbiAgICAgIGlmKHBkYl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaHNwcmVkX2NoZWNrY2hhaW5zJylcbiAgICB7XG4gICAgICBoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc19wcmVkJylcbiAgICB7XG4gICAgICAgIHJlc3VsdHNfZm91bmQuaHNwcmVkID0gdHJ1ZTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhTUHJlZCBUYWJsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hzcHJlZCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzcGxpdF9wZGJfZmlsZXMnKVxuICAgIHtcbiAgICAgIGxldCBpbml0aWFsX21hdGNoID0gaHNwcmVkX2luaXRpYWxfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHNlY29uZF9tYXRjaCA9IGhzcHJlZF9zZWNvbmRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoaW5pdGlhbF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkluaXRpYWwgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfaW5pdGlhbF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmKHNlY29uZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuc2Vjb25kID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2Vjb25kIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY2hlY2tfcGRiX3RkYicpe1xuICAgICAgZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWFrZXRkYicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5nZW50ZGIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRkYi50ZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5UREIgRmlsZTwvYT4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgJzxoMz48YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNsaWNrIGhlcmUgdG8gZG93bmxvYWQgeW91ciBUREIgRmlsZTwvYT48L2gzPicpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtZW1iZWQnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQubWVtZW1iZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1lbWJlZF90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbWVtYmVkIFBEQiBmaWxlPC9hPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWVtZW1iZWRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKCEgcmVzdWx0c19mb3VuZFtqb2JfbmFtZV0pXG4gICAge1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3dhaXRpbmdfbWVzc2FnZVwiLCAnVGhlIGpvYiBjb21wbGV0ZWQgc3VjY2VzZnVsIGJ1dCBubyBwcmVkaWN0aW9uIHdhcyBwb3NzaWJsZSBmb3IgdGhlIGlucHV0IGRhdGEuIE5vICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGRhdGEgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lK1wiX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfdGltZVwiLCAnJyk7XG4gICAgfVxuICB9KTtcbiAgaWYoISByZXN1bHRzX2ZvdW5kLm1lbXBhY2spXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKG1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQubWV0c2l0ZSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJ1dlIGNvdWxkIG5vdCBmaW5kIHRoZSBQREIgQ2hhaW4gSUQgcHJvdmlkZWQnKTtcblxuICB9XG4gIGlmKGhzcHJlZF9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5oc3ByZWQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJ1dlIGNvdWxkIG5vdCBmaW5kIHRoZSBQREIgQ2hhaW4gSURzIHByb3ZpZGVkJyk7XG4gIH1cbiAgaWYoZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLmdlbnRkYilcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZVwiLCAnUERCIHByb3ZpZGVkIGRpZCBub3QgY29udGFpbiBhIHNpbmdsZSBjaGFpbiBsYWJsZWQgYXMgY2hhaW4gQScpO1xuICB9XG5cblxuICBpZihyZXN1bHRzX2ZvdW5kLmRvbXNlcmYpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkLCBjYXJ0b29uKVxue1xuICBsZXQgbW9sX2NvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2wtY29udGFpbmVyJyk7XG4gIGZvcihsZXQgY29udGFpbmVyIG9mIG1vbF9jb250YWluZXJzKVxuICB7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiNDAwcHhcIjtcbiAgfVxuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgIGlmKGF0b20uc3MgPT09ICdzJyl7cmV0dXJuICcjZTVkZDU1Jzt9XG4gICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGxldCBob3RzcG90X2NvbG9yID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgaWYoYXRvbS5iID09IDEuMCl7cmV0dXJuICdyZWQnO31cbiAgICBpZihhdG9tLmIgPT0gMC41KXtyZXR1cm4gJ2JsYWNrJzt9XG4gICAgaWYoYXRvbS5iID09IDUwKXtyZXR1cm4gJ3doaXRlJzt9XG4gICAgaWYoYXRvbS5iID09IDEwMCl7cmV0dXJuICdyZWQnO31cbiAgICByZXR1cm4oXCJibHVlXCIpO1xuICB9O1xuICBjb25zb2xlLmxvZyhcIkxPQURJTkc6IFwiK3VyaSk7XG4gIGxldCBlbGVtZW50ID0gJChjc3NfaWQpO1xuICBsZXQgY29uZmlnID0geyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyB9O1xuICBsZXQgdmlld2VyID0gJDNEbW9sLmNyZWF0ZVZpZXdlciggZWxlbWVudCwgY29uZmlnICk7XG4gIGxldCBkYXRhID0gZ2V0X3RleHQodXJpLCBcIkdFVFwiLCB7fSk7XG4gIHZpZXdlci5hZGRNb2RlbCggZGF0YSwgXCJwZGJcIiApOyAgICAgICAgICAgICAgICAgICAgICAgLyogbG9hZCBkYXRhICovXG4gIGlmKGNhcnRvb24pXG4gIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBjYXJ0b29uX2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgZWxzZSB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogaG90c3BvdF9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGlmKGNzc19pZC5zdGFydHNXaXRoKCcjbWVtZW1iZWQnKSl7XG4gICAgdmlld2VyLmFkZFN1cmZhY2UoJDNEbW9sLlN1cmZhY2VUeXBlLlZEVywgeydvcGFjaXR5JzowLjgsIGNvbG9yc2NoZW1lOiAnd2hpdGVDYXJib24nfSwge2hldGZsYWc6dHJ1ZX0se30pO1xuICB9XG4gIHZpZXdlci56b29tVG8oKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHNldCBjYW1lcmEgKi9cbiAgdmlld2VyLnJlbmRlcigpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogcmVuZGVyIHNjZW5lICovXG4gIHZpZXdlci56b29tKDEuNywgMzAwMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKVxue1xuICAvL2NvbnNvbGUubG9nKGRvd25sb2Fkc19pbmZvKTtcbiAgbGV0IGRvd25sb2Fkc19zdHJpbmcgPSByYWN0aXZlLmdldCgnZG93bmxvYWRfbGlua3MnKTtcbiAgaWYoJ3BzaXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeil7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7fVxuICB9XG4gIGlmKCdkaXNvcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXNhdHN2bScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3BnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZG9tdGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICAgIH1cbiAgfVxuICBpZignbWVtcGFjaycgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5oZWFkZXIpO1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbilcbiAgICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiTm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPGJyIC8+XCIpO1xuICAgIH1cbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Jpb3NlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZG9tc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2ZmcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2gpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRhcHNpY292JyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRzaXRlJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdoc3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGRiJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1lbWJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cblxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2FkdmFuY2VkX3BhcmFtcygpXG57XG4gIGxldCBvcHRpb25zX2RhdGEgPSB7fTtcbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBcIjAuMDFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSA1O1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlvc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZmcHJlZF9mbHlcIikuY2hlY2tlZClcbiAgICB7ICBvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiZmx5XCI7fVxuICAgIGVsc2VcbiAgICB7b3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImh1bWFuXCI7fVxuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJodW1hblwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IFwiQ2FcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gXCJDYVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9mcHJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBcIjVcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZStkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBcIkFCXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYWxnb3JpdGhtXCIpLnZhbHVlO1xuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYmFycmVsX3llc1wiKS5jaGVja2VkKXtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnVFJVRSc7XG4gICAgfWVsc2V7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ0ZBTFNFJztcbiAgICB9XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF90ZXJtaW5hbF9pblwiKS5jaGVja2VkKVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJpblwiO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcIm91dFwiO1xuICAgIH1cbiAgICAvL29wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JvdW5kYXJpZXNcIik7XG4gIH1cbiAgY2F0Y2goZXJyKVxuICB7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcImluXCI7XG4gICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSA9IDA7XG4gIH1cblxuICByZXR1cm4ob3B0aW9uc19kYXRhKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzIiwiaW1wb3J0IHsgZ2V0X21lbXNhdF9yYW5nZXMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2Vfc3MyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BiZGF0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2NvbWIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWVtc2F0ZGF0YSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wcmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BhcnNlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmVhdGNmZyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZnByZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21ldHNpdGUgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfaHNwcmVkIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSlcbntcbiAgLy9hbGVydChzZXEpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgZm9ybSBkYXRhXCIpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zb2xlLmxvZyhqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcImlucHV0X2RhdGFcIiwgZmlsZSwgJ2lucHV0LnR4dCcpO1xuICBmZC5hcHBlbmQoXCJqb2JcIixqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcInN1Ym1pc3Npb25fbmFtZVwiLG5hbWUpO1xuICBmZC5hcHBlbmQoXCJlbWFpbFwiLCBlbWFpbCk7XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdkb21wcmVkJykpe1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnbWV0c2l0ZScpKXtcbiAgZmQuYXBwZW5kKFwibWV0c2l0ZV9jaGVja2NoYWluc19jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbik7XG4gIGZkLmFwcGVuZChcImV4dHJhY3RfZmFzdGFfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfbWV0YWxcIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCk7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfbWV0YWxcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCk7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9mcHJcIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIpO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2hzcHJlZCcpKXtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO31cbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ21lbWVtYmVkJykpe1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF9hbGdvcml0aG1cIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2FsZ29yaXRobSk7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2JhcnJlbFwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfdGVybWluaVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSk7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnZmZwcmVkJykpe1xuICBmZC5hcHBlbmQoXCJmZnByZWRfc2VsZWN0aW9uXCIsIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uKTtcbiAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gIH1cbiAgY29uc29sZS5sb2cob3B0aW9uc19kYXRhKTtcbiAgbGV0IHJlc3BvbnNlX2RhdGEgPSBzZW5kX3JlcXVlc3Qoc3VibWl0X3VybCwgXCJQT1NUXCIsIGZkKTtcbiAgaWYocmVzcG9uc2VfZGF0YSAhPT0gbnVsbClcbiAge1xuICAgIGxldCB0aW1lcyA9IHNlbmRfcmVxdWVzdCh0aW1lc191cmwsJ0dFVCcse30pO1xuICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkodGltZXMpKTtcbiAgICBpZihqb2JfbmFtZSBpbiB0aW1lcylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMgdHlwaWNhbGx5IHRha2UgXCIrdGltZXNbam9iX25hbWVdK1wiIHNlY29uZHNcIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBcIlVuYWJsZSB0byByZXRyaWV2ZSBhdmVyYWdlIHRpbWUgZm9yIFwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icy5cIik7XG4gICAgfVxuICAgIGZvcih2YXIgayBpbiByZXNwb25zZV9kYXRhKVxuICAgIHtcbiAgICAgIGlmKGsgPT0gXCJVVUlEXCIpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJywgcmVzcG9uc2VfZGF0YVtrXSk7XG4gICAgICAgIGlmKFsnbWV0aXN0ZScsICdoc3ByZWQnLCAnZ2VudGRiJywgJ21lbWVtYmVkJ10uaW5jbHVkZXMoam9iX25hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlXG4gIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy91dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgc2VxdWVuY2UgZnJvbSBhIHByZXZpb3VzIHN1Ym1pc3Npb24gaXMgdGhlXG4vL3BhZ2Ugd2FzIGxvYWRlZCB3aXRoIGEgVVVJRFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9wcmV2aW91c19kYXRhKHV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKVxue1xuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0aW5nIGRldGFpbHMgZ2l2ZW4gVVJJJyk7XG4gICAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICAvL2FsZXJ0KHVybCk7XG4gICAgbGV0IHN1Ym1pc3Npb25fcmVzcG9uc2UgPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgaWYoISBzdWJtaXNzaW9uX3Jlc3BvbnNlKXthbGVydChcIk5PIFNVQk1JU1NJT04gREFUQVwiKTt9XG4gICAgbGV0IHNlcSA9IGdldF90ZXh0KGZpbGVfdXJsK3N1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uaW5wdXRfZmlsZSwgXCJHRVRcIiwge30pO1xuICAgIGxldCBqb2JzID0gJyc7XG4gICAgc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHN1Ym1pc3Npb24pe1xuICAgICAgam9icyArPSBzdWJtaXNzaW9uLmpvYl9uYW1lK1wiLFwiO1xuICAgIH0pO1xuICAgIGpvYnMgPSBqb2JzLnNsaWNlKDAsIC0xKTtcbiAgICByZXR1cm4oeydzZXEnOiBzZXEsICdlbWFpbCc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uZW1haWwsICduYW1lJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5zdWJtaXNzaW9uX25hbWUsICdqb2JzJzogam9ic30pO1xufVxuXG5cbi8vZ2V0IHRleHQgY29udGVudHMgZnJvbSBhIHJlc3VsdCBVUklcbmV4cG9ydCBmdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2RvbV9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGFyc2VkcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRmZWF0dXJlcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRwcmVkaWN0aW9ucycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZXRzaXRlJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2hzcHJlZCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cbi8vZ2l2ZW4gYSBVUkwgcmV0dXJuIHRoZSBhdHRhY2hlZCB2YXJpYWJsZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuICAgIGxldCB2YXJzID0ge307XG4gICAgLy9jb25zaWRlciB1c2luZyBsb2NhdGlvbi5zZWFyY2ggaW5zdGVhZCBoZXJlXG4gICAgbGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLFxuICAgIGZ1bmN0aW9uKG0sa2V5LHZhbHVlKSB7XG4gICAgICB2YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4vKiEgZ2V0RW1QaXhlbHMgIHwgQXV0aG9yOiBUeXNvbiBNYXRhbmljaCAoaHR0cDovL21hdGFuaWNoLmNvbSksIDIwMTMgfCBMaWNlbnNlOiBNSVQgKi9cbihmdW5jdGlvbiAoZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCkge1xuICAgIC8vIEVuYWJsZSBzdHJpY3QgbW9kZVxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRm9ybSB0aGUgc3R5bGUgb24gdGhlIGZseSB0byByZXN1bHQgaW4gc21hbGxlciBtaW5pZmllZCBmaWxlXG4gICAgbGV0IGltcG9ydGFudCA9IFwiIWltcG9ydGFudDtcIjtcbiAgICBsZXQgc3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlXCIgKyBpbXBvcnRhbnQgKyBcInZpc2liaWxpdHk6aGlkZGVuXCIgKyBpbXBvcnRhbnQgKyBcIndpZHRoOjFlbVwiICsgaW1wb3J0YW50ICsgXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQgKyBcInBhZGRpbmc6MFwiICsgaW1wb3J0YW50O1xuXG4gICAgd2luZG93LmdldEVtUGl4ZWxzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXh0cmFCb2R5O1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gRW11bGF0ZSB0aGUgZG9jdW1lbnRFbGVtZW50IHRvIGdldCByZW0gdmFsdWUgKGRvY3VtZW50RWxlbWVudCBkb2VzIG5vdCB3b3JrIGluIElFNi03KVxuICAgICAgICAgICAgZWxlbWVudCA9IGV4dHJhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO1xuICAgICAgICAgICAgZXh0cmFCb2R5LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudDtcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZXh0cmFCb2R5LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc3R5bGUgYSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBjbGllbnQgd2lkdGggb2YgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICBpZiAoZXh0cmFCb2R5KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dHJhIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGV4dHJhQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVtIHZhbHVlIGluIHBpeGVsc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0oZG9jdW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IHNldF9hZHZhbmNlZF9wYXJhbXMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNob3dfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgZGlzcGxheV9zdHJ1Y3R1cmUgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuXG52YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmNvcHlCdXR0b24nKTtcbnZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5jbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vIFNFVCBFTkRQT0lOVFMgRk9SIERFViwgU1RBR0lORyBPUiBQUk9EXG5sZXQgZW5kcG9pbnRzX3VybCA9IG51bGw7XG5sZXQgc3VibWl0X3VybCA9IG51bGw7XG5sZXQgdGltZXNfdXJsID0gbnVsbDtcbmxldCBnZWFyc19zdmcgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xubGV0IG1haW5fdXJsID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51a1wiO1xubGV0IGFwcF9wYXRoID0gXCIvcHNpcHJlZF9iZXRhXCI7XG5sZXQgZmlsZV91cmwgPSAnJztcbmxldCBnZWFyX3N0cmluZyA9ICc8b2JqZWN0IHdpZHRoPVwiMTQwXCIgaGVpZ2h0PVwiMTQwXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBkYXRhPVwiJytnZWFyc19zdmcrJ1wiPjwvb2JqZWN0Pic7XG5sZXQgam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLCBcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBzZXFfam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsXTtcbmxldCBzdHJ1Y3Rfam9iX2xpc3QgPSBbXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgam9iX25hbWVzID0ge1xuICAncHNpcHJlZCc6ICdQU0lQUkVEIFY0LjAnLFxuICAnZGlzb3ByZWQnOiAnRElPU1BSRUQgMycsXG4gICdtZW1zYXRzdm0nOiAnTUVNU0FULVNWTScsXG4gICdwZ2VudGhyZWFkZXInOiAncEdlblRIUkVBREVSJyxcbiAgJ21lbXBhY2snOiAnTUVNUEFDSycsXG4gICdnZW50aHJlYWRlcic6ICdHZW5USFJFQURFUicsXG4gICdkb21wcmVkJzogJ0RvbVByZWQnLFxuICAncGRvbXRocmVhZGVyJzogJ3BEb21USFJFQURFUicsXG4gICdiaW9zZXJmJzogJ0Jpb3NTZXJmIHYyLjAnLFxuICAnZG9tc2VyZic6ICdEb21TZXJmIHYyLjEnLFxuICAnZmZwcmVkJzogJ0ZGUHJlZCAzJyxcbiAgJ21ldGFwc2ljb3YnOiAnTWV0YVBTSUNPVicsXG4gICdtZXRzaXRlJzogJ01ldFNpdGUnLFxuICAnaHNwcmVkJzogJ0hTUHJlZCcsXG4gICdtZW1lbWJlZCc6ICdNRU1FTUJFRCcsXG4gICdnZW50ZGInOiAnR2VuZXJhdGUgVERCJyxcbn07XG5cbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKVxue1xuICBlbmRwb2ludHNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2pvYnRpbWVzLyc7XG4gIGFwcF9wYXRoID0gJy9pbnRlcmZhY2UnO1xuICBtYWluX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAnO1xuICBnZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG4gIGZpbGVfdXJsID0gbWFpbl91cmw7XG59XG5lbHNlIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImJpb2luZnN0YWdlMS5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSAgPT09IFwiYmlvaW5mLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhyZWYgID09PSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9cIikge1xuICBlbmRwb2ludHNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2pvYnRpbWVzLyc7XG4gIGZpbGVfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrXCIvYXBpXCI7XG4gIC8vZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xufVxuZWxzZSB7XG4gIGFsZXJ0KCdVTlNFVFRJTkcgRU5EUE9JTlRTIFdBUk5JTkcsIFdBUk5JTkchJyk7XG4gIGVuZHBvaW50c191cmwgPSAnJztcbiAgc3VibWl0X3VybCA9ICcnO1xuICB0aW1lc191cmwgPSAnJztcbn1cblxubGV0IGluaXRpYWxpc2F0aW9uX2RhdGEgPSB7XG4gICAgc2VxdWVuY2VfZm9ybV92aXNpYmxlOiAxLFxuICAgIHN0cnVjdHVyZV9mb3JtX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c192aXNpYmxlOiAxLFxuICAgIHJlc3VibWlzc2lvbl92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfcGFuZWxfdmlzaWJsZTogMSxcbiAgICBzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlOiAwLFxuICAgIGJpb3NlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21wcmVkX2FkdmFuY2VkOiAwLFxuICAgIGZmcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZXRzaXRlX2FkdmFuY2VkOiAwLFxuICAgIGhzcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZW1lbWJhZF9hZHZhbmNlZDogMCxcbiAgICBtb2RlbGxlcl9rZXk6IG51bGwsXG4gICAgZG93bmxvYWRfbGlua3M6ICcnLFxuICAgIGVycm9yX21lc3NhZ2U6ICcnLFxuXG4gICAgcHNpcHJlZF9ob3JpejogbnVsbCxcbiAgICBkaXNvX3ByZWNpc2lvbjogbnVsbCxcbiAgICBtZW1zYXRzdm1fc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRzdm1fY2FydG9vbjogJycsXG4gICAgcGdlbl90YWJsZTogbnVsbCxcbiAgICBwZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIG1lbXNhdHBhY2tfc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRwYWNrX2NhcnRvb246ICcnLFxuICAgIGdlbl90YWJsZTogbnVsbCxcbiAgICBnZW5fYW5uX3NldDoge30sXG4gICAgcGFyc2Vkc19pbmZvOiBudWxsLFxuICAgIHBhcnNlZHNfcG5nOiBudWxsLFxuICAgIGRnZW5fdGFibGU6IG51bGwsXG4gICAgZGdlbl9hbm5fc2V0OiB7fSxcbiAgICBiaW9zZXJmX21vZGVsOiBudWxsLFxuICAgIGRvbXNlcmZfYnV0dG9uczogJycsXG4gICAgZG9tc2VyZl9tb2RlbF91cmlzOiBbXSxcbiAgICBmZnByZWRfY2FydG9vbjogbnVsbCxcbiAgICBzY2hfc2NoZW1hdGljOiBudWxsLFxuICAgIGFhX2NvbXBvc2l0aW9uOiBudWxsLFxuICAgIGdsb2JhbF9mZWF0dXJlczogbnVsbCxcbiAgICBmdW5jdGlvbl90YWJsZXM6IG51bGwsXG4gICAgbWV0YXBzaWNvdl9tYXA6IG51bGwsXG4gICAgbWV0c2l0ZV90YWJsZTogbnVsbCxcbiAgICBtZXRzaXRlX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfdGFibGU6IG51bGwsXG4gICAgaHNwcmVkX2luaXRpYWxfcGRiOiBudWxsLFxuICAgIGhzcHJlZF9zZWNvbmRfcGRiOiBudWxsLFxuICAgIHRkYl9maWxlOiBudWxsLFxuICAgIG1lbWVtYmVkX3BkYjogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19idXR0b24nXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfam9iJ10gPSBqb2JfbmFtZSsnX2pvYic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnXSA9ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX2ljb24nXSA9IGdlYXJfc3RyaW5nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ190aW1lJ10gPSAnTG9hZGluZyBEYXRhJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5wc2lwcmVkX2NoZWNrZWQgPSB0cnVlO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5tZW1lbWJlZF9hZHZhbmNlZCA9IDE7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnNlcXVlbmNlX2Zvcm1fdmlzaWJsZSA9IDA7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnN0cnVjdHVyZV9mb3JtX3Zpc2libGUgPSAxO1xuLy8gREVDTEFSRSBWQVJJQUJMRVMgYW5kIGluaXQgcmFjdGl2ZSBpbnN0YW5jZVxudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gIGVsOiAnI3BzaXByZWRfc2l0ZScsXG4gIHRlbXBsYXRlOiAnI2Zvcm1fdGVtcGxhdGUnLFxuICBkYXRhOiBpbml0aWFsaXNhdGlvbl9kYXRhLFxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG5cbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgc2VxX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICB9XG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdCk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBudWxsKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX3RpbWUnLCBudWxsKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHN1Ym1pc3Npb25fbWVzc2FnZSA9IGJhdGNoLnN1Ym1pc3Npb25zWzBdLmxhc3RfbWVzc2FnZTtcbiAgICAgIGxldCBlcnJvcl90ZXh0ID0gXCI8aDM+UE9MTElORyBFUlJPUjogSm9iIEZhaWxlZDwvaDM+XCIrXG4gICAgICBcIjxoND5QbGVhc2UgQ29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51ayBxdW90aW5nIHRoZSBlcnJvciBtZXNzYWdlIGFuZCBqb2IgSUQ6XCIrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKStcIjwvaDQ+XCIrXG4gICAgICBcIjxoNT5FcnJvciBNZXNzYWdlOjxiciAvPlwiK3N1Ym1pc3Npb25fbWVzc2FnZStcIjwvaDU+XCI7XG4gICAgICByYWN0aXZlLnNldCgnZXJyb3JfbWVzc2FnZScsIGVycm9yX3RleHQpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG5yYWN0aXZlLm9uKCdzaG93X2Jpb3NlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2ZmcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZmZwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21ldHNpdGUnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19oc3ByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZW1lbWJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWVtZW1iZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcGFuZWxcbi8vXG5yYWN0aXZlLm9uKCAnc2VxdWVuY2VfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICBsZXQgc2V0dGluZyA9IGZhbHNlO1xuICAgICAgaWYoam9iX25hbWUgPT09ICdwc2lwcmVkJyl7c2V0dGluZyA9IHRydWU7fVxuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIHNldHRpbmcpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdzdHJ1Y3R1cmVfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgZmFsc2UpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ2Rvd25sb2Fkc19hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBzaG93X3BhbmVsKDEsIHJhY3RpdmUpO1xufSk7XG5cbi8vcmVnaXN0ZXIgbGlzdGVuZXJzIGZvciBlYWNoIHJlc3VsdHMgcGFuZWxcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUsIGkpe1xuICBjb25zb2xlLmxvZyhcImFkZGluZyBqb2JzIHdhdGNoZXJzXCIpO1xuICByYWN0aXZlLm9uKGpvYl9uYW1lKydfYWN0aXZlJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgc2hvd19wYW5lbChpKzIsIHJhY3RpdmUpO1xuICAgIGlmKGpvYl9uYW1lID09PSBcInBzaXByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5wc2lwcmVkKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JyksICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09IFwiZGlzb3ByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdiaW9zZXJmX21vZGVsJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnYmlvc2VyZl9tb2RlbCcpLmxlbmd0aClcbiAgICAgICAge1xuICAgICAgICAgIGxldCBiaW9zZXJmX21vZGVsID0gcmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfbW9kZWwnKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShiaW9zZXJmX21vZGVsLCAnI2Jpb3NlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKSl7XG4gICAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJyk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2hzcHJlZCcpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicpKXtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBpbml0aWFsX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKTtcbiAgICAgICAgbGV0IHNlY29uZF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX3NlY29uZF9wZGInKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoaW5pdGlhbF9wZGIsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHNlY29uZF9wZGIsICAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9fVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICAgbGV0IG1lbWVtYmVkX3BkYiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKTtcbiAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1lbWVtYmVkX3BkYiwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbignc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBjb25zb2xlLmxvZyhcIlNVQk1JU1NJT04gQUNUSVZFXCIpO1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuXG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgc3VibWl0X2pvYiA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHNlcV9jb3VudCA9IHNlcS5zcGxpdChcIj5cIikubGVuZ3RoO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGxldCBzdHJ1Y3RfdHlwZSA9IGZhbHNlO1xuICBsZXQgc2VxX3R5cGUgPSBmYWxzZTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzdHJ1Y3Rfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHN0cnVjdF90eXBlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHNlcV9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc2VxX3R5cGUgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICAvL0hBTkRMRSBGRlBSRUQgSk9CIFNFTEVDVElPTi5cbiAgaWYoY2hlY2tfc3RhdGVzLmJpb3NlcmZfY2hlY2tlZCB8fCBjaGVja19zdGF0ZXMuZG9tc2VyZl9jaGVja2VkKVxuICB7XG4gICAgbGV0IGJpb3NfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgbGV0IGRvbXNfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgaWYoYmlvc19tb2RlbGxlcl90ZXN0IHx8IGRvbXNfbW9kZWxsZXJfdGVzdClcbiAgICB7XG4gICAgICBzdWJtaXRfam9iID10cnVlO1xuICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHByb3ZpZGVkIGEgdmFsaWQgTU9ERUxMRVIga2V5LiBDb250YWN0IHRoZSBTYWxpIGxhYiBmb3IgYSBNT0RFTExFUiBsaWNlbmNlLlwiKTtcbiAgICB9XG4gIH1cbiAgZWxzZXtcbiAgICBzdWJtaXRfam9iPXRydWU7XG4gIH1cbiAgaWYoc2VxX3R5cGUgJiYgc3RydWN0X3R5cGUpXG4gIHtcbiAgICBhbGVydChcIllvdSBjYW4gbm90IHN1Ym1pdCBib3RoIHNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYW5hbHlzaXMgam9ic1wiKTtcbiAgICBzdWJtaXRfam9iID0gZmFsc2U7XG4gIH1cbiAgaWYoc2VxX2NvdW50ID4gMSlcbiAge1xuICAgIGFsZXJ0KFwiTVNBIElucHV0IGZvcmJpZGRlblwiKTtcbiAgICBzdWJtaXRfam9iPWZhbHNlO1xuICB9XG4gIGlmKHN1Ym1pdF9qb2IpXG4gIHtcbiAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmdcIik7XG4gICAgaWYoc2VxX3R5cGUpXG4gICAge1xuICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICB9XG4gICAgaWYoc3RydWN0X3R5cGUpXG4gICAge1xuICAgICAgbGV0IHBkYkZpbGUgPSBudWxsO1xuICAgICAgbGV0IHBkYkRhdGEgPSAnJztcbiAgICAgIHRyeXtcbiAgICAgICBwZGJGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZGJGaWxlXCIpO1xuICAgICAgIGxldCBmaWxlID0gcGRiRmlsZS5maWxlc1swXTtcbiAgICAgICBsZXQgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBwZGJEYXRhID0gZnIucmVzdWx0O1xuICAgICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBwZGJEYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGVycikge1xuICAgICAgICBwZGJEYXRhID0gXCJcIjtcbiAgICAgICAgaWYoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJGaWxlUmVhZGVyLnJlYWRBc1RleHQgaXMgbm90IGFuIG9iamVjdFwiKSl7XG4gICAgICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3Qgc2VsZWN0ZWQgYSBQREIgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoK1wiL1wiKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgfSk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcywgemlwKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmZ1bmN0aW9uIHRlc3RfbW9kZWxsZXJfa2V5KGlucHV0KVxue1xuICBpZihpbnB1dCA9PT0gJ01PREVMSVJBTkpFJylcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGxldCBzZXFfdHlwZSA9IHRydWU7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Rpc29wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1wYWNrJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDYpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDcpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGRvbXRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Jpb3NlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdmZnByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50ZGJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE3KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgaWYoc2VxX3R5cGUpXG4gIHtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICB9XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgZXJyb3JfbWVzc2FnZT1cIkFSR1wiO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zZXFfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoc3RydWN0X3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc3RydWN0X2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChqb2JfbmFtZStcIixcIik7XG4gICAgICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZGlzb3ByZWQnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdiaW9zZXJmJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBnZW50aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGRvbXRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAxICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICAvLyBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICBpZighIC9BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuXG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9mb3Jtcy9mb3Jtc19pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=