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
    let pseudo_table = '<table class="small-table table-striped table-bordered">\n';
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
      pseudo_table += '<th>CATH Domain</th>';
      pseudo_table += '<th>SEARCH SCOP</th>';
    } else {
      pseudo_table += '<th>Fold</th>';
      pseudo_table += '<th>SEARCH SCOP</th>';
      pseudo_table += '<th>SEARCH CATH</th>';
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
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='Display Alignment' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"cath_modeller\");' value='Build Model' /></td>";
        } else {
          pseudo_table += "<td><a target='_blank' href='https://www.rcsb.org/pdb/explore/explore.do?structureId=" + pdb + "'>" + table_hit + "</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/pdb/" + pdb + "'>CATH SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='Display Alignment' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"pdb_modeller\");' value='Build Model' /></td>";
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
function clear_settings(ractive, gear_string, job_list, job_names) {
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
function handle_results(ractive, data, file_url, zip, downloads_info, job_names) {
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
  let mempack_result_found = false;
  let domserf_result_found = false;
  let reformat_domserf_models_found = false;
  let psipred_result_found = false;
  let pdomthreader_result_found = false;
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
      psipred_result_found = true;
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
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'gen_sort_presults') {
      ractive.set("genthreader_waiting_message", '');
      ractive.set("genthreader_waiting_icon", '');
      ractive.set("genthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'gen_presult', zip, ractive);
      downloads_info.genthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Table</a><br />';
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
    if (result_dict.name === 'svm_prob_dom') {
      pdomthreader_result_found = true;
      ractive.set("pdomthreader_waiting_message", '');
      ractive.set("pdomthreader_waiting_icon", '');
      ractive.set("pdomthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'dom_presult', zip, ractive);
      downloads_info.pdomthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_dom_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pdomthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Alignments</a><br />';
    }
    //dompred files
    if (result_dict.name === 'parseds') {
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
      ractive.set("bioserf_waiting_message", '');
      ractive.set("bioserf_waiting_icon", '');
      ractive.set("bioserf_time", '');
      downloads_info.bioserf.model = '<a href="' + file_url + result_dict.data_path + '">Final Homology Model</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      display_structure(file_url + result_dict.data_path, '#bioserf_model', true);
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
        domserf_result_found = true;
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

    if (result_dict.name === 'ffpred_human') {
      let preds_match = ffpred_preds_regex.exec(result_dict.data_path);
      if (preds_match) {
        downloads_info.ffpred.preds = '<a href="' + file_url + result_dict.data_path + '">GO Predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ffpredpredictions', zip, ractive);
      }
    }

    if (result_dict.name === 'plot_self_contact_map') {
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

    if (result_dict.name === 'metpred_wrapper') {
      let table_match = metsite_table_regex.exec(result_dict.data_path);
      let pdb_match = metsite_pdb_regex.exec(result_dict.data_path);
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
    if (result_dict.name === 'hs_pred') {
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
    if (result_dict.name === 'maketdb') {
      ractive.set("gentdb_waiting_message", '');
      ractive.set("gentdb_waiting_icon", '');
      ractive.set("gentdb_time", '');
      downloads_info.gentdb.tdb = '<a href="' + file_url + result_dict.data_path + '">TDB File</a>';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      ractive.set('tdb_file', '<h3><a href="' + file_url + result_dict.data_path + '">Click here to download your TDB File</a></h3>');
    }
    if (result_dict.name === 'memembed') {
      ractive.set("memembed_waiting_message", '');
      ractive.set("memembed_waiting_icon", '');
      ractive.set("memembed_time", '');
      downloads_info.memembed.pdb = '<a href="' + file_url + result_dict.data_path + '">Memembed PDB file</a>';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      display_structure(file_url + result_dict.data_path, '#memembed_model', false);
      ractive.set('memembed_pdb', file_url + result_dict.data_path);
    }
  }

  //Set no found statments for some jobs.
  if (!mempack_result_found) {
    ractive.set('mempack_cartoon', '<h3>No packing prediction possible</h3>');
  }
  if (!psipred_result_found) {
    ractive.set("psipred_waiting_message", 'No ' + job_names.psipred + ' data generated for this job');
    ractive.set("psipred_waiting_icon", '');
    ractive.set("psipred_time", '');
  }
  if (!pdomthreader_result_found) {
    ractive.set("pdomthreader_waiting_message", 'No ' + job_names.pdomthreader + ' table generated for this job');
    ractive.set("pdomthreader_waiting_icon", '');
    ractive.set("pdomthreader_time", '');
  }
  if (domserf_result_found) {
    let paths = ractive.get("domserf_model_uris");
    display_structure(paths[0], '#domserf_model', true);
  }
}

function display_structure(uri, css_id, cartoon) {
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
  console.log(css_id);
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
    options_data.ffpred_type = document.getElementById("ffpred_selection").value;
  } catch (err) {
    options_data.ffpred_type = "human";
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

  //  try{
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
  // }
  // catch(err){}
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
  console.log(job_name);
  var file = null;
  try {
    file = new Blob([seq]);
  } catch (e) {
    alert(e);
  }
  let fd = new FormData();
  fd.append("input_data", file, 'input.txt');
  fd.append("job", job_name);
  fd.append("submission_name", name);
  fd.append("email", email);
  fd.append("psiblast_dompred_evalue", options_data.psiblast_dompred_evalue);
  fd.append("psiblast_dompred_iterations", options_data.psiblast_dompred_iterations);
  fd.append("metsite_checkchains_chain", options_data.metsite_checkchains_chain);
  fd.append("extract_fasta_chain", options_data.extract_fasta_chain);
  fd.append("seedSiteFind_metal", options_data.seedSiteFind_metal);
  fd.append("seedSiteFind_chain", options_data.seedSiteFind_chain);
  fd.append("metpred_wrapper_chain", options_data.metpred_wrapper_chain);
  fd.append("metpred_wrapper_metal", options_data.metpred_wrapper_metal);
  fd.append("metpred_wrapper_fpr", options_data.metpred_wrapper_fpr);
  fd.append("hspred_checkchains_chains", options_data.hspred_checkchains_chains);
  fd.append("hs_pred_first_chain", options_data.hs_pred_first_chain);
  fd.append("hs_pred_second_chain", options_data.hs_pred_second_chain);
  fd.append("split_pdb_files_first_chain", options_data.split_pdb_files_first_chain);
  fd.append("split_pdb_files_second_chain", options_data.split_pdb_files_second_chain);
  fd.append("memembed_algorithm", options_data.memembed_algorithm);
  fd.append("memembed_barrel", options_data.memembed_barrel);
  fd.append("memembed_termini", options_data.memembed_termini);

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
initialisation_data.memembed_checked = true;
initialisation_data.memembed_advanced = 1;
initialisation_data.sequence_form_visible = 0;
initialisation_data.structure_form_visible = 1;
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info, job_names);
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["c" /* set_downloads_panel */])(ractive, downloads_info);

      clearInterval(interval);
    }
    if (batch.state === 'Error' || batch.state === 'Crash') {
      let submission_message = batch.submissions[0].last_message;
      alert("POLLING ERROR: Job Failed\n" + "Please Contact psipred@cs.ucl.ac.uk quoting this error message and your job ID\n" + submission_message);
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
    if (job_name === 'domserf') {
      if (ractive.get('domserf_model_uris').length) {
        let paths = ractive.get('domserf_model_uris');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[0], '#domserf_model', true);
      }
    }
    if (job_name === 'metsite') {
      if (ractive.get('metsite_pdb').length) {
        let met_pdb = ractive.get('metsite_pdb');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(met_pdb, '#metsite_model', false);
      }
    }
    if (job_name === 'hspred') {
      if (ractive.get('hspred_initial_pdb').length) {
        let initial_pdb = ractive.get('hspred_initial_pdb');
        let second_pdb = ractive.get('hspred_second_pdb');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(initial_pdb, '#hspred_initial_model', false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(second_pdb, '#hspred_second_model', false);
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
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["g" /* clear_settings */])(ractive, gear_string, job_list, job_names);
  //verify form contents and post
  //add form defaults but null the structes ones as we don't allow structure job resubmission
  let options_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* set_advanced_params */])();
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, check_states, job_list, job_names, true, false);
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
          ractive.set('resubmission_visible', 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTliMDg1NzNhNzY4OTAxODc5MjMiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZG9tc2VyZl9yZXN1bHRfZm91bmQiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInBzaXByZWRfcmVzdWx0X2ZvdW5kIiwicGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJtZW1wYWNrIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJnZW50aHJlYWRlciIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtZXRhcHNpY292IiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJtZXRzaXRlIiwiaHNwcmVkIiwiaW5pdGlhbF9tYXRjaCIsInNlY29uZF9tYXRjaCIsImluaXRpYWwiLCJzZWNvbmQiLCJnZW50ZGIiLCJ0ZGIiLCJtZW1lbWJlZCIsInVyaSIsImNzc19pZCIsImNhcnRvb25fY29sb3IiLCJhdG9tIiwiaG90c3BvdF9jb2xvciIsImIiLCJlbGVtZW50IiwiJCIsImNvbmZpZyIsImJhY2tncm91bmRDb2xvciIsInZpZXdlciIsIiQzRG1vbCIsImNyZWF0ZVZpZXdlciIsImdldF90ZXh0IiwiYWRkTW9kZWwiLCJzZXRTdHlsZSIsImNvbG9yZnVuYyIsImFkZFN1cmZhY2UiLCJTdXJmYWNlVHlwZSIsIlZEVyIsImNvbG9yc2NoZW1lIiwiaGV0ZmxhZyIsInpvb21UbyIsInJlbmRlciIsInpvb20iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNldF9hZHZhbmNlZF9wYXJhbXMiLCJvcHRpb25zX2RhdGEiLCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnIiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJiaW9zZXJmX21vZGVsbGVyX2tleSIsImRvbXNlcmZfbW9kZWxsZXJfa2V5IiwiZmZwcmVkX3R5cGUiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluIiwiZXh0cmFjdF9mYXN0YV9jaGFpbiIsInNlZWRTaXRlRmluZF9jaGFpbiIsIm1ldHByZWRfd3JhcHBlcl9jaGFpbiIsInNlZWRTaXRlRmluZF9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9mcHIiLCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zIiwiaHNfcHJlZF9maXJzdF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiIsImhzX3ByZWRfc2Vjb25kX2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiIsIm1lbWVtYmVkX2FsZ29yaXRobSIsImNoZWNrZWQiLCJtZW1lbWJlZF9iYXJyZWwiLCJtZW1lbWJlZF90ZXJtaW5pIiwic2VuZF9yZXF1ZXN0IiwidXJsIiwic2VuZF9kYXRhIiwicmVzcG9uc2UiLCJhamF4IiwiY2FjaGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsInNlbmRfam9iIiwiZW1haWwiLCJzdWJtaXRfdXJsIiwidGltZXNfdXJsIiwiQmxvYiIsImUiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2VfZGF0YSIsInRpbWVzIiwiayIsImZpcmUiLCJnZXRfcHJldmlvdXNfZGF0YSIsInV1aWQiLCJzdWJtaXNzaW9uX3Jlc3BvbnNlIiwic3VibWlzc2lvbnMiLCJpbnB1dF9maWxlIiwiam9icyIsInN1Ym1pc3Npb24iLCJzbGljZSIsInN1Ym1pc3Npb25fbmFtZSIsInVybF9zdHViIiwiY3RsIiwicGF0aF9iaXRzIiwiZm9sZGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsInN0eWxlIiwiZ2V0RW1QaXhlbHMiLCJleHRyYUJvZHkiLCJjcmVhdGVFbGVtZW50IiwiY3NzVGV4dCIsImluc2VydEJlZm9yZSIsImJvZHkiLCJ0ZXN0RWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImNsaXBib2FyZCIsIkNsaXBib2FyZCIsIm9uIiwiZW5kcG9pbnRzX3VybCIsImdlYXJzX3N2ZyIsIm1haW5fdXJsIiwiYXBwX3BhdGgiLCJzZXFfam9iX2xpc3QiLCJzdHJ1Y3Rfam9iX2xpc3QiLCJob3N0bmFtZSIsImluaXRpYWxpc2F0aW9uX2RhdGEiLCJzZXF1ZW5jZV9mb3JtX3Zpc2libGUiLCJzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlIiwicmVzdWx0c192aXNpYmxlIiwicmVzdWJtaXNzaW9uX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwiYmlvc2VyZl9hZHZhbmNlZCIsImRvbXNlcmZfYWR2YW5jZWQiLCJkb21wcmVkX2FkdmFuY2VkIiwiZmZwcmVkX2FkdmFuY2VkIiwibWV0c2l0ZV9hZHZhbmNlZCIsImhzcHJlZF9hZHZhbmNlZCIsIm1lbWVtYmFkX2FkdmFuY2VkIiwibW9kZWxsZXJfa2V5IiwiZG93bmxvYWRfbGlua3MiLCJwc2lwcmVkX2hvcml6IiwiZGlzb19wcmVjaXNpb24iLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VuX3RhYmxlIiwicGdlbl9hbm5fc2V0IiwibWVtc2F0cGFja19zY2hlbWF0aWMiLCJtZW1zYXRwYWNrX2NhcnRvb24iLCJnZW5fdGFibGUiLCJnZW5fYW5uX3NldCIsInBhcnNlZHNfaW5mbyIsInBhcnNlZHNfcG5nIiwiZGdlbl90YWJsZSIsImRnZW5fYW5uX3NldCIsImJpb3NlcmZfbW9kZWwiLCJkb21zZXJmX2J1dHRvbnMiLCJkb21zZXJmX21vZGVsX3VyaXMiLCJmZnByZWRfY2FydG9vbiIsInNjaF9zY2hlbWF0aWMiLCJmdW5jdGlvbl90YWJsZXMiLCJtZXRhcHNpY292X21hcCIsIm1ldHNpdGVfcGRiIiwiaHNwcmVkX2luaXRpYWxfcGRiIiwiaHNwcmVkX3NlY29uZF9wZGIiLCJ0ZGJfZmlsZSIsIm1lbWVtYmVkX3BkYiIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF9kYXRhIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwibWVtZW1iZWRfY2hlY2tlZCIsIm1lbWVtYmVkX2FkdmFuY2VkIiwiUmFjdGl2ZSIsImVsIiwidGVtcGxhdGUiLCJ1dWlkX3JlZ2V4IiwidXVpZF9tYXRjaCIsInNlcV9vYnNlcnZlciIsIm9ic2VydmUiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiaW5pdCIsImRlZmVyIiwic2VxX2xlbmd0aCIsInNlcV9zdGFydCIsInNlcV9zdG9wIiwic2VxX3R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImJhdGNoIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwic3VibWlzc2lvbl9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50IiwiYWR2Iiwic2V0dGluZyIsIm1ldF9wZGIiLCJpbml0aWFsX3BkYiIsInNlY29uZF9wZGIiLCJzdWJtaXRfam9iIiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJzdHJ1Y3RfdHlwZSIsImJpb3NlcmZfY2hlY2tlZCIsImRvbXNlcmZfY2hlY2tlZCIsImJpb3NfbW9kZWxsZXJfdGVzdCIsInRlc3RfbW9kZWxsZXJfa2V5IiwiZG9tc19tb2RlbGxlcl90ZXN0IiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJwZGJGaWxlIiwicGRiRGF0YSIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsInJlc3VsdCIsIm9yaWdpbmFsIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsInN0b3AiLCJzdWJzZXF1ZW5jZSIsImlucHV0IiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsInN3YXBEb21zZXJmIiwidXJpX251bWJlciIsImVycm9yX21lc3NhZ2UiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9zZXFfZm9ybSIsInZlcmlmeV9zdHJ1Y3RfZm9ybSIsInBzaXByZWRfY2hlY2tlZCIsInBnZW50aHJlYWRlcl9jaGVja2VkIiwicGRvbXRocmVhZGVyX2NoZWNrZWQiLCJzdHJ1Y3QiLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRU8sU0FBU0EsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLElBQS9CLEVBQ1A7QUFDRSxNQUFJQyxlQUFlLGdLQUFuQjtBQUNBQSxrQkFBZ0IsdUpBQWhCO0FBQ0FBLGtCQUFnQix1S0FBaEI7QUFDQUEsa0JBQWdCLDBFQUFoQjtBQUNBLE1BQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQUQsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFJQyxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0EsUUFBR0ksUUFBUUMsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QlAsc0JBQWdCLGFBQVdNLFFBQVEsQ0FBUixDQUFYLEdBQXNCLFdBQXRCLEdBQWtDQSxRQUFRLENBQVIsQ0FBbEMsR0FBNkMsV0FBN0MsR0FBeURBLFFBQVEsQ0FBUixDQUF6RCxHQUFvRSxZQUFwRjtBQUNEO0FBQ0YsR0FMRDtBQU1BTixrQkFBZ0IsU0FBaEI7QUFDQUYsVUFBUVUsR0FBUixDQUFZLGNBQVosRUFBNEJSLFlBQTVCO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTUyxhQUFULENBQXVCWCxPQUF2QixFQUFnQ0MsSUFBaEMsRUFDUDtBQUNFLE1BQUlXLGdCQUFnQixzS0FBcEI7QUFDQUEsbUJBQWlCLHVKQUFqQjtBQUNBQSxtQkFBaUIsaUtBQWpCO0FBQ0FBLG1CQUFpQixxRkFBakI7QUFDQSxNQUFJQyxZQUFZLHFCQUFoQjtBQUNBLE1BQUlDLGNBQWNiLEtBQUtjLEtBQUwsQ0FBV0YsU0FBWCxDQUFsQjtBQUNBLE1BQUdDLFdBQUgsRUFDQTtBQUNFQSxnQkFBWVQsT0FBWixDQUFvQixVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDbkMsVUFBSUMsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLElBQVgsQ0FBZDtBQUNBUSx1QkFBaUIsYUFBV0osUUFBUSxDQUFSLENBQVgsR0FBc0IsV0FBdEIsR0FBa0NBLFFBQVEsQ0FBUixDQUFsQyxHQUE2QyxXQUE3QyxHQUF5REEsUUFBUSxDQUFSLENBQXpELEdBQW9FLFlBQXJGO0FBQ0QsS0FIRDtBQUlEO0FBQ0RJLG1CQUFpQixTQUFqQjtBQUNBWixVQUFRVSxHQUFSLENBQVksZUFBWixFQUE2QkUsYUFBN0I7QUFDRDs7QUFFTSxTQUFTSSxhQUFULENBQXVCaEIsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQXFDOztBQUUxQyxNQUFJRSxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0EsTUFBSWEsVUFBVSxFQUFkO0FBQ0EsTUFBSUMsVUFBVSxFQUFkO0FBQ0EsTUFBSUMsVUFBVSxFQUFkO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBakIsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFHRCxLQUFLZSxVQUFMLENBQWdCLEdBQWhCLENBQUgsRUFBd0I7QUFBQztBQUFRO0FBQ2pDLFFBQUliLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQSxRQUFHSSxRQUFRQyxNQUFSLEdBQWlCLENBQXBCLEVBQXNCO0FBQUM7QUFBUTtBQUMvQixRQUFHRCxRQUFRLENBQVIsTUFBZSxJQUFsQixFQUF1QjtBQUFDUyxjQUFRSyxJQUFSLENBQWFkLE9BQWI7QUFBdUI7QUFDL0MsUUFBR0EsUUFBUSxDQUFSLE1BQWUsSUFBbEIsRUFBdUI7QUFBQ1csY0FBUUcsSUFBUixDQUFhZCxPQUFiO0FBQXVCO0FBQy9DLFFBQUdBLFFBQVEsQ0FBUixNQUFlLElBQWxCLEVBQXVCO0FBQUNVLGNBQVFJLElBQVIsQ0FBYWQsT0FBYjtBQUF1QjtBQUNoRCxHQVBEOztBQVNBWSxnQkFBYyw2Q0FBZDtBQUNBQSxnQkFBYyxvRkFBZDtBQUNBSCxVQUFRWixPQUFSLENBQWdCLFVBQVNHLE9BQVQsRUFBa0JELENBQWxCLEVBQW9CO0FBQ2xDLFFBQUlnQixlQUFlLE1BQW5CO0FBQ0EsUUFBR2YsUUFBUSxDQUFSLE1BQWEsR0FBaEIsRUFBb0I7QUFBQ2UscUJBQWUsU0FBZjtBQUEwQjtBQUMvQ0gsa0JBQWMsZ0JBQWNHLFlBQWQsR0FBMkIsSUFBekM7QUFDQUgsa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsT0FBZDtBQUVELEdBVkQ7QUFXQUEsZ0JBQWMsZ0JBQWQ7QUFDQXBCLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQlUsVUFBL0I7O0FBRUFBLGdCQUFjLDZDQUFkO0FBQ0FBLGdCQUFjLG9GQUFkO0FBQ0FGLFVBQVFiLE9BQVIsQ0FBZ0IsVUFBU0csT0FBVCxFQUFrQkQsQ0FBbEIsRUFBb0I7QUFDbEMsUUFBSWdCLGVBQWUsTUFBbkI7QUFDQSxRQUFHZixRQUFRLENBQVIsTUFBYSxHQUFoQixFQUFvQjtBQUFDZSxxQkFBZSxTQUFmO0FBQTBCO0FBQy9DSCxrQkFBYyxnQkFBY0csWUFBZCxHQUEyQixJQUF6QztBQUNBSCxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxPQUFkO0FBRUQsR0FWRDtBQVdBQSxnQkFBYyxnQkFBZDtBQUNBcEIsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCVSxVQUEvQjs7QUFFQUEsZ0JBQWMsNkNBQWQ7QUFDQUEsZ0JBQWMsb0ZBQWQ7QUFDQUQsVUFBUWQsT0FBUixDQUFnQixVQUFTRyxPQUFULEVBQWtCRCxDQUFsQixFQUFvQjtBQUNsQyxRQUFJZ0IsZUFBZSxNQUFuQjtBQUNBLFFBQUdmLFFBQVEsQ0FBUixNQUFhLEdBQWhCLEVBQW9CO0FBQUNlLHFCQUFlLFNBQWY7QUFBMEI7QUFDL0NILGtCQUFjLGdCQUFjRyxZQUFkLEdBQTJCLElBQXpDO0FBQ0FILGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLE9BQWQ7QUFDRCxHQVREO0FBVUFBLGdCQUFjLGdCQUFkO0FBQ0FBLGdCQUFjLG9UQUFkO0FBQ0FwQixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JVLFVBQS9CO0FBRUQ7O0FBRUQsU0FBU0ksVUFBVCxHQUFxQjtBQUNuQixNQUFJQyxXQUFXLEVBQWY7QUFDQUEsV0FBU0MsQ0FBVCxHQUFhLEVBQUVDLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNJLENBQVQsR0FBYSxFQUFFRixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTSyxDQUFULEdBQWEsRUFBRUgsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU00sQ0FBVCxHQUFhLEVBQUVKLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNPLENBQVQsR0FBYSxFQUFFTCxLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTUSxDQUFULEdBQWEsRUFBRU4sS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1MsQ0FBVCxHQUFhLEVBQUVQLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNVLENBQVQsR0FBYSxFQUFFUixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTVyxDQUFULEdBQWEsRUFBRVQsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1ksQ0FBVCxHQUFhLEVBQUVWLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNhLENBQVQsR0FBYSxFQUFFWCxLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTYyxDQUFULEdBQWEsRUFBRVosS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2UsQ0FBVCxHQUFhLEVBQUViLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxnQkFEUCxFQUFiO0FBRUFILFdBQVNnQixDQUFULEdBQWEsRUFBRWQsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2lCLENBQVQsR0FBYSxFQUFFZixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTa0IsQ0FBVCxHQUFhLEVBQUVoQixLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTbUIsQ0FBVCxHQUFhLEVBQUVqQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTb0IsQ0FBVCxHQUFhLEVBQUVsQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTcUIsQ0FBVCxHQUFhLEVBQUVuQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTc0IsQ0FBVCxHQUFhLEVBQUVwQixLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBLFNBQU9ILFFBQVA7QUFDRDs7QUFFRCxTQUFTdUIsU0FBVCxHQUFvQjtBQUNsQixNQUFJQyxVQUFVLEVBQWQ7QUFDQUEsVUFBUUMsY0FBUixHQUF5QixFQUFDdkIsS0FBSyxDQUFDLGdCQUFQO0FBQ0NDLFNBQUssZ0JBRE4sRUFBekI7QUFFQXFCLFVBQVEsMkJBQVIsSUFBdUMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGNBRE4sRUFBdkM7QUFFQXFCLFVBQVEsaUJBQVIsSUFBNkIsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBN0I7QUFFQXFCLFVBQVEsbUJBQVIsSUFBK0IsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBL0I7QUFFQXFCLFVBQVEsa0JBQVIsSUFBOEIsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBOUI7QUFFQXFCLFVBQVFFLE1BQVIsR0FBaUIsRUFBQ3hCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGNBRE4sRUFBakI7QUFFQXFCLFVBQVEsMkJBQVIsSUFBdUMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBdkM7QUFFQXFCLFVBQVEsOEJBQVIsSUFBMEMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBMUM7QUFFQSxTQUFPcUIsT0FBUDtBQUNEOztBQUVELFNBQVNHLFlBQVQsQ0FBc0J6QixHQUF0QixFQUEwQjtBQUN0QixNQUFJMEIsU0FBU0MsS0FBS0MsR0FBTCxDQUFTNUIsR0FBVCxDQUFiO0FBQ0EsTUFBRzBCLFVBQVUsSUFBYixFQUFtQjtBQUNmLFFBQUcxQixNQUFNLENBQVQsRUFBVztBQUFDLGFBQU8sVUFBUDtBQUFtQjtBQUMvQixXQUFPLFVBQVA7QUFDSCxHQUhELE1BSUssSUFBRzBCLFVBQVUsSUFBYixFQUFrQjtBQUNuQixRQUFHMUIsTUFBTSxDQUFULEVBQVc7QUFBQyxhQUFPLFVBQVA7QUFBbUI7QUFDL0IsV0FBTyxVQUFQO0FBQ0gsR0FISSxNQUlBLElBQUcwQixVQUFVLElBQWIsRUFBbUI7QUFDcEIsUUFBRzFCLE1BQU0sQ0FBVCxFQUFXO0FBQUMsYUFBTyxVQUFQO0FBQW1CO0FBQy9CLFdBQU8sVUFBUDtBQUNILEdBSEksTUFJQSxJQUFHMEIsVUFBVSxLQUFiLEVBQXFCO0FBQ3RCLFFBQUcxQixNQUFNLENBQVQsRUFBVztBQUFDLGFBQU8sV0FBUDtBQUFvQjtBQUNoQyxXQUFPLFdBQVA7QUFDSDtBQUNELFNBQU8sT0FBUDtBQUNIOztBQUVEO0FBQ08sU0FBUzZCLGFBQVQsQ0FBdUJ4RCxPQUF2QixFQUFnQ0MsSUFBaEMsRUFDUDtBQUNFLE1BQUlFLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQSxNQUFJcUQsVUFBVSxFQUFkO0FBQ0EsTUFBSUMsVUFBVSxFQUFkO0FBQ0EsTUFBSVQsVUFBU0QsV0FBYjtBQUNBLE1BQUl2QixXQUFTRCxZQUFiO0FBQ0FyQixRQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFFBQUdELEtBQUtlLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBSCxFQUF5QjtBQUN2QixVQUFJc0MsVUFBVXJELEtBQUtGLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQXNELGNBQVFDLFFBQVEsQ0FBUixDQUFSLElBQXNCQSxRQUFRLENBQVIsQ0FBdEI7QUFDRDtBQUNELFFBQUdyRCxLQUFLZSxVQUFMLENBQWdCLElBQWhCLENBQUgsRUFDQTtBQUNFLFVBQUlzQyxVQUFVckQsS0FBS0YsS0FBTCxDQUFXLElBQVgsQ0FBZDtBQUNBcUQsY0FBUUUsUUFBUSxDQUFSLENBQVIsSUFBc0JBLFFBQVEsQ0FBUixDQUF0QjtBQUNEO0FBQ0YsR0FWRDs7QUFZQTtBQUNBLE1BQUlwQyxlQUFlLEVBQW5CO0FBQ0EsTUFBSXFDLGtCQUFrQjVELFFBQVE2RCxHQUFSLENBQVksaUJBQVosQ0FBdEI7QUFDQSxNQUFJQyxhQUFhLDhCQUFqQjtBQUNBQSxnQkFBYyxnVkFBZDtBQUNBQSxnQkFBYyxrRUFBZDs7QUFFQUMsU0FBT0MsSUFBUCxDQUFZUCxPQUFaLEVBQXFCUSxJQUFyQixHQUE0QjVELE9BQTVCLENBQW9DLFVBQVM2RCxZQUFULEVBQXNCO0FBQ3hELFFBQUkzQyxlQUFlLEVBQW5CO0FBQ0EsUUFBRzJDLGdCQUFnQmpCLE9BQW5CLEVBQTJCO0FBQ3pCMUIscUJBQWU2QixhQUFjLENBQUNlLFdBQVdWLFFBQVFTLFlBQVIsQ0FBWCxJQUFrQ2pCLFFBQVFpQixZQUFSLEVBQXNCdkMsR0FBekQsSUFBZ0VzQixRQUFRaUIsWUFBUixFQUFzQnRDLEdBQXBHLENBQWY7QUFDRDtBQUNEa0Msa0JBQWMsYUFBV0ksWUFBWCxHQUF3QixXQUF4QixHQUFvQ0MsV0FBV1YsUUFBUVMsWUFBUixDQUFYLEVBQWtDRSxPQUFsQyxDQUEwQyxDQUExQyxDQUFwQyxHQUFpRixrQkFBakYsR0FBb0c3QyxZQUFwRyxHQUFpSCxnQ0FBL0g7QUFDRCxHQU5EO0FBT0F1QyxnQkFBYyxVQUFkO0FBQ0E5RCxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JvRCxVQUEvQjs7QUFFQTtBQUNBLE1BQUlPLGlCQUFpQnJFLFFBQVE2RCxHQUFSLENBQVksZ0JBQVosQ0FBckI7QUFDQSxNQUFJUyxXQUFXLG1EQUFmO0FBQ0FBLGNBQVksYUFBWjtBQUNBUCxTQUFPQyxJQUFQLENBQVlOLE9BQVosRUFBcUJPLElBQXJCLEdBQTRCNUQsT0FBNUIsQ0FBb0MsVUFBU2tFLE9BQVQsRUFBaUI7QUFDbkRELGdCQUFZLFNBQU9DLE9BQVAsR0FBZSxPQUEzQjtBQUNELEdBRkQ7QUFHQUQsY0FBWSxXQUFaO0FBQ0FQLFNBQU9DLElBQVAsQ0FBWU4sT0FBWixFQUFxQk8sSUFBckIsR0FBNEI1RCxPQUE1QixDQUFvQyxVQUFTa0UsT0FBVCxFQUFpQjtBQUNuRCxRQUFJaEQsZUFBZSxFQUFuQjtBQUNBQSxtQkFBZTZCLGFBQWEsQ0FBQ2UsV0FBV1QsUUFBUWEsT0FBUixDQUFYLElBQTZCOUMsU0FBUzhDLE9BQVQsRUFBa0I1QyxHQUFoRCxJQUF1REYsU0FBUzhDLE9BQVQsRUFBa0IzQyxHQUF0RixDQUFmO0FBQ0EwQyxnQkFBWSxnQkFBYy9DLFlBQWQsR0FBMkIsSUFBM0IsR0FBZ0MsQ0FBQzRDLFdBQVdULFFBQVFhLE9BQVIsQ0FBWCxJQUE2QixHQUE5QixFQUFtQ0gsT0FBbkMsQ0FBMkMsQ0FBM0MsQ0FBaEMsR0FBOEUsT0FBMUY7QUFDRCxHQUpEO0FBS0FFLGNBQVkscUJBQVo7QUFDQUEsY0FBWSwrQkFBWjtBQUNBQSxjQUFZLDBFQUFaO0FBQ0FBLGNBQVksTUFBWjtBQUNBQSxjQUFZLHFCQUFaO0FBQ0FBLGNBQVksNkJBQVo7QUFDQUEsY0FBWSxvQ0FBWjtBQUNBQSxjQUFZLE9BQVo7QUFDQUEsY0FBWSxNQUFaO0FBQ0FBLGNBQVksV0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksc0JBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLFdBQVo7QUFDQUEsY0FBWSxPQUFaO0FBQ0FBLGNBQVksTUFBWjtBQUNBQSxjQUFZLGtIQUFaO0FBQ0FBLGNBQVksT0FBWjtBQUNBQSxjQUFZLFVBQVo7QUFDQXRFLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QjRELFFBQTlCO0FBQ0Q7O0FBR0Q7QUFDTyxTQUFTRSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NDLElBQWxDLEVBQ1A7QUFDSSxNQUFJM0QsUUFBUTBELE1BQU1FLElBQU4sQ0FBV0QsSUFBWCxDQUFaO0FBQ0EsTUFBRzNELE1BQU0sQ0FBTixFQUFTNkQsUUFBVCxDQUFrQixHQUFsQixDQUFILEVBQ0E7QUFDRSxRQUFJQyxVQUFVOUQsTUFBTSxDQUFOLEVBQVNYLEtBQVQsQ0FBZSxHQUFmLENBQWQ7QUFDQXlFLFlBQVF4RSxPQUFSLENBQWdCLFVBQVN5RSxNQUFULEVBQWlCdkUsQ0FBakIsRUFBbUI7QUFDakNzRSxjQUFRdEUsQ0FBUixJQUFhdUUsT0FBTzFFLEtBQVAsQ0FBYSxHQUFiLENBQWI7QUFDQXlFLGNBQVF0RSxDQUFSLEVBQVcsQ0FBWCxJQUFnQndFLFNBQVNGLFFBQVF0RSxDQUFSLEVBQVcsQ0FBWCxDQUFULENBQWhCO0FBQ0FzRSxjQUFRdEUsQ0FBUixFQUFXLENBQVgsSUFBZ0J3RSxTQUFTRixRQUFRdEUsQ0FBUixFQUFXLENBQVgsQ0FBVCxDQUFoQjtBQUNELEtBSkQ7QUFLQSxXQUFPc0UsT0FBUDtBQUNELEdBVEQsTUFVSyxJQUFHOUQsTUFBTSxDQUFOLEVBQVM2RCxRQUFULENBQWtCLEdBQWxCLENBQUgsRUFDTDtBQUNJO0FBQ0EsUUFBSUksTUFBTWpFLE1BQU0sQ0FBTixFQUFTWCxLQUFULENBQWUsR0FBZixDQUFWO0FBQ0EsUUFBSXlFLFVBQVUsQ0FBQyxFQUFELENBQWQ7QUFDQUEsWUFBUSxDQUFSLEVBQVcsQ0FBWCxJQUFnQkUsU0FBU0MsSUFBSSxDQUFKLENBQVQsQ0FBaEI7QUFDQUgsWUFBUSxDQUFSLEVBQVcsQ0FBWCxJQUFnQkUsU0FBU0MsSUFBSSxDQUFKLENBQVQsQ0FBaEI7QUFDQSxXQUFPSCxPQUFQO0FBQ0g7QUFDRCxTQUFPOUQsTUFBTSxDQUFOLENBQVA7QUFDSDs7QUFFRDtBQUNPLFNBQVNrRSxTQUFULENBQW1CakYsT0FBbkIsRUFBNEJDLElBQTVCLEVBQ1A7QUFDSSxNQUFJaUYsY0FBY2xGLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFsQjtBQUNBLE1BQUkxRCxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FELFFBQU1nRixLQUFOO0FBQ0FoRixVQUFRQSxNQUFNaUYsTUFBTixDQUFhQyxPQUFiLENBQVI7QUFDQSxNQUFHSCxZQUFZekUsTUFBWixJQUFzQk4sTUFBTU0sTUFBL0IsRUFDQTtBQUNFTixVQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFVBQUlDLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQThFLGtCQUFZM0UsQ0FBWixFQUFlK0UsRUFBZixHQUFvQjlFLFFBQVEsQ0FBUixDQUFwQjtBQUNELEtBSEQ7QUFJQVIsWUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkJ3RSxXQUEzQjtBQUNBSyxVQUFNQyxjQUFOLENBQXFCTixXQUFyQixFQUFrQyxFQUFDTyxRQUFRLG1CQUFULEVBQThCQyxlQUFlLENBQTdDLEVBQWdEQyxPQUFPLEtBQXZELEVBQThEQyxpQkFBaUIsR0FBL0UsRUFBb0ZDLE9BQU8sR0FBM0YsRUFBZ0dDLFFBQVEsR0FBeEcsRUFBNkdDLGtCQUFrQixHQUEvSCxFQUFsQztBQUNELEdBUkQsTUFVQTtBQUNFQyxVQUFNLHFEQUFOO0FBQ0Q7QUFDRCxTQUFPZCxXQUFQO0FBQ0g7O0FBRUQ7QUFDTyxTQUFTZSxXQUFULENBQXFCakcsT0FBckIsRUFBOEJDLElBQTlCLEVBQ1A7QUFDSSxNQUFJaUYsY0FBY2xGLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFsQjtBQUNBLE1BQUkxRCxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FELFFBQU1nRixLQUFOLEdBQWVoRixNQUFNZ0YsS0FBTixHQUFlaEYsTUFBTWdGLEtBQU4sR0FBZWhGLE1BQU1nRixLQUFOLEdBQWVoRixNQUFNZ0YsS0FBTjtBQUM1RGhGLFVBQVFBLE1BQU1pRixNQUFOLENBQWFDLE9BQWIsQ0FBUjtBQUNBLE1BQUdILFlBQVl6RSxNQUFaLElBQXNCTixNQUFNTSxNQUEvQixFQUNBO0FBQ0VOLFVBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsVUFBSUMsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBLFVBQUdJLFFBQVEsQ0FBUixNQUFlLEdBQWxCLEVBQXNCO0FBQUMwRSxvQkFBWTNFLENBQVosRUFBZTJGLFFBQWYsR0FBMEIsR0FBMUI7QUFBK0I7QUFDdEQsVUFBRzFGLFFBQVEsQ0FBUixNQUFlLEdBQWxCLEVBQXNCO0FBQUMwRSxvQkFBWTNFLENBQVosRUFBZTJGLFFBQWYsR0FBMEIsSUFBMUI7QUFBZ0M7QUFDeEQsS0FKRDtBQUtBbEcsWUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkJ3RSxXQUEzQjtBQUNBSyxVQUFNQyxjQUFOLENBQXFCTixXQUFyQixFQUFrQyxFQUFDTyxRQUFRLG1CQUFULEVBQThCQyxlQUFlLENBQTdDLEVBQWdEQyxPQUFPLEtBQXZELEVBQThEQyxpQkFBaUIsR0FBL0UsRUFBb0ZDLE9BQU8sR0FBM0YsRUFBZ0dDLFFBQVEsR0FBeEcsRUFBNkdDLGtCQUFrQixHQUEvSCxFQUFsQztBQUNEO0FBQ0o7O0FBRUQ7QUFDTyxTQUFTSSxVQUFULENBQW9CbkcsT0FBcEIsRUFBNkJDLElBQTdCLEVBQ1A7QUFDRSxNQUFJbUcsWUFBWSxFQUFoQjtBQUNBLE1BQUlqRyxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FELFFBQU1nRixLQUFOLEdBQWVoRixNQUFNZ0YsS0FBTixHQUFlaEYsTUFBTWdGLEtBQU47QUFDOUJoRixVQUFRQSxNQUFNaUYsTUFBTixDQUFhQyxPQUFiLENBQVI7QUFDQWxGLFFBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsUUFBSUMsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBZ0csY0FBVTdGLENBQVYsSUFBZSxFQUFmO0FBQ0E2RixjQUFVN0YsQ0FBVixFQUFhOEYsR0FBYixHQUFtQjdGLFFBQVEsQ0FBUixDQUFuQjtBQUNBNEYsY0FBVTdGLENBQVYsRUFBYTZGLFNBQWIsR0FBeUI1RixRQUFRLENBQVIsQ0FBekI7QUFDRCxHQUxEO0FBTUFSLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QjBGLFNBQTlCO0FBQ0FiLFFBQU1lLGtCQUFOLENBQXlCRixTQUF6QixFQUFvQyxLQUFwQyxFQUEyQyxDQUFDLFdBQUQsQ0FBM0MsRUFBMEQsQ0FBQyxPQUFELENBQTFELEVBQXNFLGFBQXRFLEVBQXFGLEVBQUNYLFFBQVEsZUFBVCxFQUEwQmMsV0FBVyxNQUFyQyxFQUE2Q0MsVUFBVSxHQUF2RCxFQUE0RGQsZUFBZSxDQUEzRSxFQUE4RUMsT0FBTyxLQUFyRixFQUE0RkMsaUJBQWlCLEdBQTdHLEVBQWtIQyxPQUFPLEdBQXpILEVBQThIQyxRQUFRLEdBQXRJLEVBQTJJQyxrQkFBa0IsR0FBN0osRUFBckY7QUFFRDs7QUFFRDtBQUNPLFNBQVNVLGdCQUFULENBQTBCekcsT0FBMUIsRUFBbUNDLElBQW5DLEVBQ1A7QUFDRSxNQUFJaUYsY0FBY2xGLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFsQjtBQUNBLE1BQUk2QyxNQUFNMUcsUUFBUTZELEdBQVIsQ0FBWSxVQUFaLENBQVY7QUFDQTtBQUNBLE1BQUk4QyxlQUFlbkMsa0JBQWtCLHFCQUFsQixFQUF5Q3ZFLElBQXpDLENBQW5CO0FBQ0EsTUFBSTJHLGlCQUFpQnBDLGtCQUFrQiwyQkFBbEIsRUFBK0N2RSxJQUEvQyxDQUFyQjtBQUNBLE1BQUk0RyxvQkFBb0JyQyxrQkFBa0IsZ0NBQWxCLEVBQW9EdkUsSUFBcEQsQ0FBeEI7QUFDQSxNQUFJNkcsV0FBV3RDLGtCQUFrQix1QkFBbEIsRUFBMkN2RSxJQUEzQyxDQUFmO0FBQ0E7QUFDQTtBQUNBLE1BQUk4RyxZQUFZLElBQWhCO0FBQ0EsTUFBR0QsYUFBYSxLQUFoQixFQUNBO0FBQ0VDLGdCQUFZLElBQVo7QUFDRDtBQUNELE1BQUlDLFdBQVcsSUFBSUMsS0FBSixDQUFVUCxJQUFJakcsTUFBZCxDQUFmO0FBQ0EsTUFBR2tHLGlCQUFpQixlQUFwQixFQUNBO0FBQ0UsUUFBSU8sV0FBVyxDQUFmO0FBQ0FQLGlCQUFhdEcsT0FBYixDQUFxQixVQUFTeUUsTUFBVCxFQUFnQjtBQUNuQ2tDLGlCQUFXQSxTQUFTRyxJQUFULENBQWMsSUFBZCxFQUFvQnJDLE9BQU8sQ0FBUCxDQUFwQixFQUErQkEsT0FBTyxDQUFQLElBQVUsQ0FBekMsQ0FBWDtBQUNBLFVBQUdvQyxXQUFXLENBQWQsRUFBZ0I7QUFBQ0Esb0JBQVksQ0FBWjtBQUFlO0FBQ2hDRixpQkFBV0EsU0FBU0csSUFBVCxDQUFjSixTQUFkLEVBQXlCRyxRQUF6QixFQUFtQ3BDLE9BQU8sQ0FBUCxDQUFuQyxDQUFYO0FBQ0EsVUFBR2lDLGNBQWMsSUFBakIsRUFBc0I7QUFBRUEsb0JBQVksSUFBWjtBQUFrQixPQUExQyxNQUE4QztBQUFDQSxvQkFBWSxJQUFaO0FBQWtCO0FBQ2pFRyxpQkFBV3BDLE9BQU8sQ0FBUCxJQUFVLENBQXJCO0FBQ0QsS0FORDtBQU9Ba0MsZUFBV0EsU0FBU0csSUFBVCxDQUFjSixTQUFkLEVBQXlCRyxXQUFTLENBQWxDLEVBQXFDUixJQUFJakcsTUFBekMsQ0FBWDtBQUVEO0FBQ0Q7QUFDQSxNQUFHbUcsbUJBQW1CLGVBQXRCLEVBQXNDO0FBQ3BDQSxtQkFBZXZHLE9BQWYsQ0FBdUIsVUFBU3lFLE1BQVQsRUFBZ0I7QUFDckNrQyxpQkFBV0EsU0FBU0csSUFBVCxDQUFjLEdBQWQsRUFBbUJyQyxPQUFPLENBQVAsQ0FBbkIsRUFBOEJBLE9BQU8sQ0FBUCxJQUFVLENBQXhDLENBQVg7QUFDRCxLQUZEO0FBR0Q7QUFDRDtBQUNBLE1BQUcrQixzQkFBc0IsZUFBekIsRUFBeUM7QUFDdkNBLHNCQUFrQnhHLE9BQWxCLENBQTBCLFVBQVN5RSxNQUFULEVBQWdCO0FBQ3hDa0MsaUJBQVdBLFNBQVNHLElBQVQsQ0FBYyxJQUFkLEVBQW9CckMsT0FBTyxDQUFQLENBQXBCLEVBQStCQSxPQUFPLENBQVAsSUFBVSxDQUF6QyxDQUFYO0FBQ0QsS0FGRDtBQUdEO0FBQ0RrQyxXQUFTM0csT0FBVCxDQUFpQixVQUFTK0csSUFBVCxFQUFlN0csQ0FBZixFQUFpQjtBQUNoQzJFLGdCQUFZM0UsQ0FBWixFQUFlOEcsTUFBZixHQUF3QkQsSUFBeEI7QUFDRCxHQUZEO0FBR0FwSCxVQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQndFLFdBQTNCO0FBQ0FLLFFBQU1DLGNBQU4sQ0FBcUJOLFdBQXJCLEVBQWtDLEVBQUNPLFFBQVEsbUJBQVQsRUFBOEJDLGVBQWUsQ0FBN0MsRUFBZ0RDLE9BQU8sS0FBdkQsRUFBOERDLGlCQUFpQixHQUEvRSxFQUFvRkMsT0FBTyxHQUEzRixFQUFnR0MsUUFBUSxHQUF4RyxFQUE2R0Msa0JBQWtCLEdBQS9ILEVBQWxDO0FBRUQ7O0FBRU0sU0FBU3VCLGFBQVQsQ0FBdUJ0SCxPQUF2QixFQUFnQ0MsSUFBaEMsRUFBc0NzSCxJQUF0QyxFQUNQO0FBQ0UsTUFBSXBILFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQTtBQUNBLE1BQUlvSCxXQUFXeEgsUUFBUTZELEdBQVIsQ0FBWTBELE9BQUssVUFBakIsQ0FBZjtBQUNBO0FBQ0EsTUFBR3hELE9BQU9DLElBQVAsQ0FBWXdELFFBQVosRUFBc0IvRyxNQUF0QixHQUErQixDQUFsQyxFQUFvQztBQUNwQyxRQUFJZ0gsZUFBZSw0REFBbkI7QUFDQUEsb0JBQWdCLG9CQUFoQjtBQUNBQSxvQkFBZ0Isb0JBQWhCO0FBQ0FBLG9CQUFnQixrQkFBaEI7QUFDQUEsb0JBQWdCLGdCQUFoQjtBQUNBQSxvQkFBZ0IsZ0JBQWhCO0FBQ0FBLG9CQUFnQixvQkFBaEI7QUFDQUEsb0JBQWdCLHFCQUFoQjtBQUNBQSxvQkFBZ0IscUJBQWhCO0FBQ0FBLG9CQUFnQixvQkFBaEI7QUFDQSxRQUFHRixTQUFTLE1BQVosRUFBbUI7QUFDakJFLHNCQUFnQix1QkFBaEI7QUFDQUEsc0JBQWdCLHFCQUFoQjtBQUNBQSxzQkFBZ0Isc0JBQWhCO0FBQ0FBLHNCQUFnQixzQkFBaEI7QUFDRCxLQUxELE1BS007QUFDSkEsc0JBQWdCLGVBQWhCO0FBQ0FBLHNCQUFnQixzQkFBaEI7QUFDQUEsc0JBQWdCLHNCQUFoQjtBQUNEO0FBQ0RBLG9CQUFnQixpQkFBaEI7QUFDQUEsb0JBQWdCLG9CQUFoQjtBQUNBQSxvQkFBZ0IsZ0JBQWhCOztBQUVBO0FBQ0FBLG9CQUFnQixpQkFBaEI7QUFDQXRILFVBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0I7QUFDQSxVQUFHRCxLQUFLRyxNQUFMLEtBQWdCLENBQW5CLEVBQXFCO0FBQUM7QUFBUTtBQUM5QixVQUFJRCxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0EsVUFBSXNILFlBQVlsSCxRQUFRLENBQVIsQ0FBaEI7QUFDQSxVQUFHK0csU0FBUyxNQUFaLEVBQW1CO0FBQUVHLG9CQUFZbEgsUUFBUSxFQUFSLENBQVo7QUFBeUI7QUFDOUMsVUFBR2tILFlBQVUsR0FBVixHQUFjbkgsQ0FBZCxJQUFtQmlILFFBQXRCLEVBQ0E7QUFDQUMsd0JBQWdCLE1BQWhCO0FBQ0FBLHdCQUFnQixnQkFBY2pILFFBQVEsQ0FBUixFQUFXbUgsV0FBWCxFQUFkLEdBQXVDLElBQXZDLEdBQTRDbkgsUUFBUSxDQUFSLENBQTVDLEdBQXVELE9BQXZFO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0FpSCx3QkFBZ0IsU0FBT2pILFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0EsWUFBSW9ILE1BQU1wSCxRQUFRLENBQVIsRUFBV3FILFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0JySCxRQUFRLENBQVIsRUFBV0MsTUFBWCxHQUFrQixDQUExQyxDQUFWO0FBQ0EsWUFBRzhHLFNBQVMsTUFBWixFQUFtQjtBQUFFSyxnQkFBTXBILFFBQVEsRUFBUixFQUFZcUgsU0FBWixDQUFzQixDQUF0QixFQUF5QnJILFFBQVEsRUFBUixFQUFZQyxNQUFaLEdBQW1CLENBQTVDLENBQU47QUFBc0Q7QUFDM0UsWUFBRzhHLFNBQVMsTUFBWixFQUFtQjtBQUNqQkUsMEJBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsMEJBQWdCLFNBQU9qSCxRQUFRLEVBQVIsQ0FBUCxHQUFtQixPQUFuQztBQUNBaUgsMEJBQWdCLCtFQUE2RUMsU0FBN0UsR0FBdUYsSUFBdkYsR0FBNEZBLFNBQTVGLEdBQXNHLFdBQXRIO0FBQ0FELDBCQUFnQixpRkFBK0VHLEdBQS9FLEdBQW1GLHdCQUFuRztBQUNBSCwwQkFBZ0IsZ0hBQThHRyxHQUE5RyxHQUFrSCx3QkFBbEk7QUFDQUgsMEJBQWdCLGlGQUFnRkQsU0FBU0UsWUFBVSxHQUFWLEdBQWNuSCxDQUF2QixFQUEwQnVILEdBQTFHLEdBQStHLE9BQS9HLEdBQXdITixTQUFTRSxZQUFVLEdBQVYsR0FBY25ILENBQXZCLEVBQTBCd0gsR0FBbEosR0FBdUosT0FBdkosSUFBZ0tMLFlBQVUsR0FBVixHQUFjbkgsQ0FBOUssSUFBaUwseUNBQWpNO0FBQ0FrSCwwQkFBZ0IsMkVBQTBFRCxTQUFTRSxZQUFVLEdBQVYsR0FBY25ILENBQXZCLEVBQTBCdUgsR0FBcEcsR0FBeUcsc0RBQXpIO0FBQ0QsU0FSRCxNQVNJO0FBQ0ZMLDBCQUFnQiwwRkFBd0ZHLEdBQXhGLEdBQTRGLElBQTVGLEdBQWlHRixTQUFqRyxHQUEyRyxXQUEzSDtBQUNBRCwwQkFBZ0IsaUZBQStFRyxHQUEvRSxHQUFtRix3QkFBbkc7QUFDQUgsMEJBQWdCLDZEQUEyREcsR0FBM0QsR0FBK0Qsd0JBQS9FO0FBQ0FILDBCQUFnQixnSEFBOEdHLEdBQTlHLEdBQWtILHdCQUFsSTtBQUNBSCwwQkFBZ0IsaUZBQWdGRCxTQUFTRSxZQUFVLEdBQVYsR0FBY25ILENBQXZCLEVBQTBCdUgsR0FBMUcsR0FBK0csT0FBL0csR0FBd0hOLFNBQVNFLFlBQVUsR0FBVixHQUFjbkgsQ0FBdkIsRUFBMEJ3SCxHQUFsSixHQUF1SixPQUF2SixJQUFnS0wsWUFBVSxHQUFWLEdBQWNuSCxDQUE5SyxJQUFpTCx5Q0FBak07QUFDQWtILDBCQUFnQiwyRUFBMEVELFNBQVNFLFlBQVUsR0FBVixHQUFjbkgsQ0FBdkIsRUFBMEJ1SCxHQUFwRyxHQUF5RyxxREFBekg7QUFDRDtBQUNETCx3QkFBZ0IsU0FBaEI7QUFDQztBQUNGLEtBdkNEO0FBd0NBQSxvQkFBZ0Isb0JBQWhCO0FBQ0F6SCxZQUFRVSxHQUFSLENBQVk2RyxPQUFLLFFBQWpCLEVBQTJCRSxZQUEzQjtBQUNDLEdBckVELE1Bc0VLO0FBQ0R6SCxZQUFRVSxHQUFSLENBQVk2RyxPQUFLLFFBQWpCLEVBQTJCLDZGQUEzQjtBQUNIO0FBQ0Y7O0FBRU0sU0FBU1MsYUFBVCxDQUF1QmhJLE9BQXZCLEVBQWdDQyxJQUFoQyxFQUNQO0FBQ0UsTUFBSWdJLG1CQUFtQixvREFBdkI7QUFDQSxNQUFJQyxtQkFBb0JELGlCQUFpQnRELElBQWpCLENBQXNCMUUsSUFBdEIsQ0FBeEI7QUFDQSxNQUFHaUksZ0JBQUgsRUFDQTtBQUNFLFFBQUlDLFVBQVVsSSxLQUFLbUksT0FBTCxDQUFhLElBQWIsRUFBa0IsUUFBbEIsQ0FBZDtBQUNBRCxjQUFVQSxRQUFRQyxPQUFSLENBQWdCLElBQWhCLEVBQXFCLFFBQXJCLENBQVY7QUFDQXBJLFlBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLFNBQU95SCxPQUFQLEdBQWUsT0FBM0M7QUFDQSxRQUFJRSxTQUFTLEVBQWI7QUFDQSxRQUFHSCxpQkFBaUIsQ0FBakIsRUFBb0JJLE9BQXBCLENBQTRCLEdBQTVCLENBQUgsRUFDQTtBQUNFRCxlQUFTSCxpQkFBaUIsQ0FBakIsRUFBb0I5SCxLQUFwQixDQUEwQixHQUExQixDQUFUO0FBQ0FpSSxhQUFPaEksT0FBUCxDQUFlLFVBQVNrSSxLQUFULEVBQWdCaEksQ0FBaEIsRUFBa0I7QUFDL0I4SCxlQUFPOUgsQ0FBUCxJQUFZd0UsU0FBU3dELEtBQVQsQ0FBWjtBQUNELE9BRkQ7QUFHRCxLQU5ELE1BUUE7QUFDRUYsYUFBTyxDQUFQLElBQVl0RCxTQUFTbUQsaUJBQWlCLENBQWpCLENBQVQsQ0FBWjtBQUNEO0FBQ0RNLFlBQVFDLEdBQVIsQ0FBWUosTUFBWjtBQUNBLFFBQUluRCxjQUFjbEYsUUFBUTZELEdBQVIsQ0FBWSxhQUFaLENBQWxCO0FBQ0F3RSxXQUFPaEksT0FBUCxDQUFlLFVBQVNrSSxLQUFULEVBQWU7QUFDNUJyRCxrQkFBWXFELEtBQVosRUFBbUJHLE9BQW5CLEdBQTZCLEdBQTdCO0FBQ0QsS0FGRDtBQUdBMUksWUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkJ3RSxXQUEzQjtBQUNELEdBdkJELE1BeUJBO0FBQ0VsRixZQUFRVSxHQUFSLENBQVksY0FBWixFQUE0Qix3Q0FBNUI7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZnQkQ7QUFDQTs7QUFFTyxTQUFTaUksVUFBVCxDQUFvQkosS0FBcEIsRUFBMkJ2SSxPQUEzQixFQUNQO0FBQ0VBLFVBQVFVLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxJQUF0QztBQUNBVixVQUFRVSxHQUFSLENBQWEsdUJBQWIsRUFBc0M2SCxLQUF0QztBQUNEOztBQUVEO0FBQ08sU0FBU0ssY0FBVCxDQUF3QjVJLE9BQXhCLEVBQWlDNkksV0FBakMsRUFBOENDLFFBQTlDLEVBQXdEQyxTQUF4RCxFQUFrRTtBQUN2RS9JLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksdUJBQVosRUFBcUMsQ0FBckM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLEtBQTlCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixFQUE5QjtBQUNBb0ksV0FBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDakNoSixZQUFRVSxHQUFSLENBQVlzSSxXQUFTLGtCQUFyQixFQUF5Qyw4QkFBNEJELFVBQVVDLFFBQVYsQ0FBNUIsR0FBZ0Qsc0JBQXpGO0FBQ0FoSixZQUFRVSxHQUFSLENBQVlzSSxXQUFTLGVBQXJCLEVBQXNDSCxXQUF0QztBQUNBN0ksWUFBUVUsR0FBUixDQUFZc0ksV0FBUyxPQUFyQixFQUE4QixjQUE5QjtBQUNELEdBSkQ7QUFLQWhKLFVBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTRCLElBQTVCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWjtBQUNBVixVQUFRVSxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEVBQWpDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLEVBQTFCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLEVBQXhCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEVBQXpCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQXZCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLElBQTVCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLElBQTNCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLElBQTFCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixFQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBVixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBVixVQUFRVSxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3QjtBQUNBVixVQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixJQUE1QjtBQUNBVixVQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQixJQUEzQjtBQUNBVixVQUFRVSxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQWpDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCOztBQUdBVixVQUFRVSxHQUFSLENBQVksYUFBWixFQUEwQixJQUExQjtBQUNBVixVQUFRVSxHQUFSLENBQVksWUFBWixFQUF5QixJQUF6QjtBQUNBNkUsUUFBTTBELGNBQU4sQ0FBcUIsbUJBQXJCO0FBQ0ExRCxRQUFNMEQsY0FBTixDQUFxQixxQkFBckI7QUFDQTFELFFBQU0wRCxjQUFOLENBQXFCLGVBQXJCOztBQUVBQyxRQUFNLElBQUlDLEtBQUosRUFBTjtBQUNEOztBQUVEO0FBQ08sU0FBU0Msc0JBQVQsQ0FBZ0MxRSxJQUFoQyxFQUFzQzJFLGNBQXRDLEVBQXNEUCxRQUF0RCxFQUFnRUMsU0FBaEUsRUFDUDtBQUNFRCxXQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUNqQyxRQUFHdEUsS0FBS3NFLFFBQUwsS0FBa0JBLFFBQXJCLEVBQ0E7QUFDRUsscUJBQWVMLFFBQWYsSUFBMkIsRUFBM0I7QUFDQUsscUJBQWVMLFFBQWYsRUFBeUJNLE1BQXpCLEdBQWtDLFNBQU9QLFVBQVVDLFFBQVYsQ0FBUCxHQUEyQixpQkFBN0Q7QUFDQTtBQUNBLFVBQUdBLGFBQWEsY0FBYixJQUErQkEsYUFBYSxTQUE1QyxJQUNBQSxhQUFhLGNBRGIsSUFDK0JBLGFBQWEsWUFENUMsSUFFQUEsYUFBYSxRQUZoQixFQUdBO0FBQ0VLLHVCQUFlRSxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FGLHVCQUFlRSxPQUFmLENBQXVCRCxNQUF2QixHQUFnQyxTQUFPUCxVQUFVUSxPQUFqQixHQUF5QixpQkFBekQ7QUFDRDtBQUNELFVBQUdQLGFBQWEsU0FBaEIsRUFDQTtBQUNFSyx1QkFBZUcsU0FBZixHQUEwQixFQUExQjtBQUNBSCx1QkFBZUcsU0FBZixDQUF5QkYsTUFBekIsR0FBa0MsU0FBT1AsVUFBVVMsU0FBakIsR0FBMkIsaUJBQTdEO0FBQ0Q7QUFDRCxVQUFHUixhQUFhLFNBQWhCLEVBQ0E7QUFDRUssdUJBQWVFLE9BQWYsR0FBeUIsRUFBekI7QUFDQUYsdUJBQWVFLE9BQWYsQ0FBdUJELE1BQXZCLEdBQWdDLFNBQU9QLFVBQVVRLE9BQWpCLEdBQXlCLGlCQUF6RDtBQUNBRix1QkFBZUksWUFBZixHQUE2QixFQUE3QjtBQUNBSix1QkFBZUksWUFBZixDQUE0QkgsTUFBNUIsR0FBcUMsU0FBT1AsVUFBVVUsWUFBakIsR0FBOEIsaUJBQW5FO0FBQ0FKLHVCQUFlSyxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FMLHVCQUFlSyxPQUFmLENBQXVCSixNQUF2QixHQUFnQyxTQUFPUCxVQUFVVyxPQUFqQixHQUF5QixpQkFBekQ7QUFDRDtBQUNELFVBQUdWLGFBQWEsU0FBaEIsRUFDQTtBQUNFSyx1QkFBZUUsT0FBZixHQUF5QixFQUF6QjtBQUNBRix1QkFBZUUsT0FBZixDQUF1QkQsTUFBdkIsR0FBZ0MsU0FBT1AsVUFBVVEsT0FBakIsR0FBeUIsaUJBQXpEO0FBQ0FGLHVCQUFlTSxZQUFmLEdBQTZCLEVBQTdCO0FBQ0FOLHVCQUFlTSxZQUFmLENBQTRCTCxNQUE1QixHQUFxQyxTQUFPUCxVQUFVWSxZQUFqQixHQUE4QixpQkFBbkU7QUFDQU4sdUJBQWVPLE9BQWYsR0FBeUIsRUFBekI7QUFDQVAsdUJBQWVPLE9BQWYsQ0FBdUJOLE1BQXZCLEdBQWdDLFNBQU9QLFVBQVVhLE9BQWpCLEdBQXlCLGlCQUF6RDtBQUNEO0FBQ0QsVUFBR1osYUFBYSxRQUFoQixFQUNBO0FBQ0VLLHVCQUFlRyxTQUFmLEdBQTJCLEVBQTNCO0FBQ0FILHVCQUFlRyxTQUFmLENBQXlCRixNQUF6QixHQUFrQyxTQUFPUCxVQUFVUyxTQUFqQixHQUEyQixpQkFBN0Q7QUFDQUgsdUJBQWVFLE9BQWYsR0FBeUIsRUFBekI7QUFDQUYsdUJBQWVFLE9BQWYsQ0FBdUJELE1BQXZCLEdBQWdDLDRCQUFoQztBQUNBRCx1QkFBZVgsT0FBZixHQUF3QixFQUF4QjtBQUNBVyx1QkFBZVgsT0FBZixDQUF1QlksTUFBdkIsR0FBZ0MsNEJBQWhDO0FBQ0FELHVCQUFlUSxNQUFmLEdBQXdCLEVBQXhCO0FBQ0FSLHVCQUFlUSxNQUFmLENBQXNCUCxNQUF0QixHQUErQixTQUFPUCxVQUFVYyxNQUFqQixHQUF3QixpQkFBdkQ7QUFDRDtBQUNGO0FBQ0YsR0FoREQ7QUFpREQ7O0FBRUQ7QUFDTyxTQUFTQyxjQUFULENBQXdCOUosT0FBeEIsRUFBaUMwRSxJQUFqQyxFQUF1Q3FGLFFBQXZDLEVBQWlEYixHQUFqRCxFQUFzREcsY0FBdEQsRUFBc0VOLFNBQXRFLEVBQ1A7QUFDRSxNQUFJaUIsY0FBYyxVQUFsQjtBQUNBLE1BQUlDLFlBQVksUUFBaEI7QUFDQSxNQUFJQyxZQUFZLFFBQWhCO0FBQ0EsTUFBSUMsdUJBQXVCLDJCQUEzQjtBQUNBLE1BQUlDLHlCQUF5QixrQkFBN0I7QUFDQSxNQUFJQyxvQkFBb0IsYUFBeEI7QUFDQSxNQUFJQyx3QkFBd0IsdUJBQTVCO0FBQ0EsTUFBSUMsb0JBQW9CLGtCQUF4QjtBQUNBLE1BQUlDLHNCQUFzQix1QkFBMUI7QUFDQSxNQUFJQyxvQkFBb0IseUJBQXhCO0FBQ0EsTUFBSUMscUJBQXFCLFNBQXpCO0FBQ0EsTUFBSUMsZ0JBQWdCLFlBQXBCO0FBQ0EsTUFBSUMsZ0JBQWdCLHVCQUFwQjtBQUNBLE1BQUlDLG1CQUFtQixhQUF2QjtBQUNBLE1BQUlDLG1CQUFtQiwrQkFBdkI7QUFDQSxNQUFJQyx5QkFBeUIsc0JBQTdCO0FBQ0EsTUFBSUMsa0JBQWtCLGFBQXRCO0FBQ0EsTUFBSUMsdUJBQXVCLFdBQTNCO0FBQ0EsTUFBSUMscUJBQXFCLFlBQXpCO0FBQ0EsTUFBSUMsc0JBQXNCLFVBQTFCO0FBQ0EsTUFBSUMsMEJBQTBCLFVBQTlCO0FBQ0EsTUFBSUMsMkJBQTJCLFdBQS9CO0FBQ0EsTUFBSUMsc0JBQXNCLFdBQTFCO0FBQ0EsTUFBSUMsb0JBQW9CLFdBQXhCO0FBQ0EsTUFBSUMsdUJBQXVCLGVBQTNCO0FBQ0EsTUFBSUMsc0JBQXNCLGNBQTFCOztBQUVBLE1BQUlDLGNBQWMsRUFBbEI7QUFDQSxNQUFJQyxVQUFVakgsS0FBS2lILE9BQW5CO0FBQ0EsTUFBSUMsZUFBZSxDQUFuQjtBQUNBLE1BQUlDLHVCQUF1QixLQUEzQjtBQUNBLE1BQUlDLHVCQUF1QixLQUEzQjtBQUNBLE1BQUlDLGdDQUFnQyxLQUFwQztBQUNBLE1BQUlDLHVCQUF1QixLQUEzQjtBQUNBLE1BQUlDLDRCQUE0QixLQUFoQztBQUNBO0FBQ0EsT0FBSSxJQUFJMUwsQ0FBUixJQUFhb0wsT0FBYixFQUNBO0FBQ0UsUUFBSU8sY0FBY1AsUUFBUXBMLENBQVIsQ0FBbEI7QUFDQSxRQUFHMkwsWUFBWUMsSUFBWixLQUFxQix3QkFBeEIsRUFDQTtBQUNJLFVBQUlDLFVBQVVwTSxRQUFRNkQsR0FBUixDQUFZLGNBQVosQ0FBZDtBQUNBLFVBQUl3SSxNQUFNSCxZQUFZSSxTQUF0QjtBQUNBLFVBQUlDLE9BQU9GLElBQUlHLE1BQUosQ0FBVyxDQUFYLEVBQWNILElBQUlJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBZCxDQUFYO0FBQ0EsVUFBSUMsS0FBS0gsS0FBS0MsTUFBTCxDQUFZRCxLQUFLRSxXQUFMLENBQWlCLEdBQWpCLElBQXNCLENBQWxDLEVBQXFDRixLQUFLOUwsTUFBMUMsQ0FBVDtBQUNBMkwsY0FBUU0sRUFBUixJQUFjLEVBQWQ7QUFDQU4sY0FBUU0sRUFBUixFQUFZM0UsR0FBWixHQUFrQndFLE9BQUssTUFBdkI7QUFDQUgsY0FBUU0sRUFBUixFQUFZNUUsR0FBWixHQUFrQnlFLE9BQUssTUFBdkI7QUFDQXZNLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCMEwsT0FBNUI7QUFDSDtBQUNELFFBQUdGLFlBQVlDLElBQVosS0FBcUIsNkJBQXhCLEVBQ0E7QUFDSSxVQUFJQyxVQUFVcE0sUUFBUTZELEdBQVIsQ0FBWSxhQUFaLENBQWQ7QUFDQSxVQUFJd0ksTUFBTUgsWUFBWUksU0FBdEI7QUFDQSxVQUFJQyxPQUFPRixJQUFJRyxNQUFKLENBQVcsQ0FBWCxFQUFjSCxJQUFJSSxXQUFKLENBQWdCLEdBQWhCLENBQWQsQ0FBWDtBQUNBLFVBQUlDLEtBQUtILEtBQUtDLE1BQUwsQ0FBWUQsS0FBS0UsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFsQyxFQUFxQ0YsS0FBSzlMLE1BQTFDLENBQVQ7QUFDQTJMLGNBQVFNLEVBQVIsSUFBYyxFQUFkO0FBQ0FOLGNBQVFNLEVBQVIsRUFBWTNFLEdBQVosR0FBa0J3RSxPQUFLLE1BQXZCO0FBQ0FILGNBQVFNLEVBQVIsRUFBWTVFLEdBQVosR0FBa0J5RSxPQUFLLE1BQXZCO0FBQ0F2TSxjQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQjBMLE9BQTNCO0FBQ0g7QUFDRCxRQUFHRixZQUFZQyxJQUFaLEtBQXFCLDRCQUF4QixFQUNBO0FBQ0ksVUFBSUMsVUFBVXBNLFFBQVE2RCxHQUFSLENBQVksY0FBWixDQUFkO0FBQ0EsVUFBSXdJLE1BQU1ILFlBQVlJLFNBQXRCO0FBQ0EsVUFBSUMsT0FBT0YsSUFBSUcsTUFBSixDQUFXLENBQVgsRUFBY0gsSUFBSUksV0FBSixDQUFnQixHQUFoQixDQUFkLENBQVg7QUFDQSxVQUFJQyxLQUFLSCxLQUFLQyxNQUFMLENBQVlELEtBQUtFLFdBQUwsQ0FBaUIsR0FBakIsSUFBc0IsQ0FBbEMsRUFBcUNGLEtBQUs5TCxNQUExQyxDQUFUO0FBQ0EyTCxjQUFRTSxFQUFSLElBQWMsRUFBZDtBQUNBTixjQUFRTSxFQUFSLEVBQVkzRSxHQUFaLEdBQWtCd0UsT0FBSyxNQUF2QjtBQUNBSCxjQUFRTSxFQUFSLEVBQVk1RSxHQUFaLEdBQWtCeUUsT0FBSyxNQUF2QjtBQUNBdk0sY0FBUVUsR0FBUixDQUFZLGNBQVosRUFBNEIwTCxPQUE1QjtBQUNIO0FBQ0Y7QUFDRDVELFVBQVFDLEdBQVIsQ0FBWWtELE9BQVo7QUFDQTtBQUNBLE9BQUksSUFBSXBMLENBQVIsSUFBYW9MLE9BQWIsRUFDQTtBQUNFLFFBQUlPLGNBQWNQLFFBQVFwTCxDQUFSLENBQWxCO0FBQ0E7QUFDQSxRQUFHMkwsWUFBWUMsSUFBWixJQUFvQixVQUF2QixFQUNBO0FBQ0VILDZCQUF1QixJQUF2QjtBQUNBLFVBQUlqTCxRQUFRaUosWUFBWXJGLElBQVosQ0FBaUJ1SCxZQUFZSSxTQUE3QixDQUFaO0FBQ0EsVUFBR3ZMLEtBQUgsRUFDQTtBQUNFNEwsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxPQUE5QyxFQUF1RHBELEdBQXZELEVBQTREbEosT0FBNUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QztBQUNBVixnQkFBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGdCQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBMkksdUJBQWVFLE9BQWYsQ0FBdUJxRCxLQUF2QixHQUErQixjQUFZN0MsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGlDQUExRTtBQUVEO0FBQ0QsVUFBSU8sWUFBWTVDLFVBQVV0RixJQUFWLENBQWV1SCxZQUFZSSxTQUEzQixDQUFoQjtBQUNBLFVBQUdPLFNBQUgsRUFDQTtBQUNFeEQsdUJBQWVFLE9BQWYsQ0FBdUJ1RCxHQUF2QixHQUE2QixjQUFZL0MsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLCtCQUF4RTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0Y7QUFDRDtBQUNBLFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLGFBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxPQUE5QyxFQUF1RHBELEdBQXZELEVBQTREbEosT0FBNUQ7QUFDQUEsY0FBUVUsR0FBUixDQUFZLDBCQUFaLEVBQXdDLEVBQXhDO0FBQ0EySSxxQkFBZW5ELFFBQWYsQ0FBd0I2RyxLQUF4QixHQUFnQyxjQUFZaEQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGlDQUEzRTtBQUNBdE0sY0FBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLEVBQTdCO0FBQ0Q7QUFDRCxRQUFHd0wsWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsTUFBOUMsRUFBc0RwRCxHQUF0RCxFQUEyRGxKLE9BQTNEO0FBQ0FxSixxQkFBZW5ELFFBQWYsQ0FBd0I4RyxJQUF4QixHQUErQixjQUFZakQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDRCQUExRTtBQUNEOztBQUVEO0FBQ0EsUUFBR0osWUFBWUMsSUFBWixLQUFxQixXQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVksMkJBQVosRUFBeUMsRUFBekM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHdCQUFaLEVBQXNDLEVBQXRDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixFQUE5QjtBQUNBLFVBQUl1TSxlQUFlN0MsdUJBQXVCekYsSUFBdkIsQ0FBNEJ1SCxZQUFZSSxTQUF4QyxDQUFuQjtBQUNBLFVBQUdXLFlBQUgsRUFDQTtBQUNFTixRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLGVBQWFxSixRQUFiLEdBQXNCbUMsWUFBWUksU0FBbEMsR0FBNEMsTUFBL0U7QUFDQWpELHVCQUFlRyxTQUFmLENBQXlCMEQsU0FBekIsR0FBcUMsY0FBWW5ELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywrQkFBaEY7QUFDRDtBQUNELFVBQUlhLGdCQUFnQmhELHFCQUFxQnhGLElBQXJCLENBQTBCdUgsWUFBWUksU0FBdEMsQ0FBcEI7QUFDQSxVQUFHYSxhQUFILEVBQ0E7QUFDRVIsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxlQUFhcUosUUFBYixHQUFzQm1DLFlBQVlJLFNBQWxDLEdBQTRDLE1BQTdFO0FBQ0FqRCx1QkFBZUcsU0FBZixDQUF5QjRELE9BQXpCLEdBQW1DLGNBQVlyRCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsNkJBQTlFO0FBQ0Q7QUFDRCxVQUFJZSxlQUFlaEQsa0JBQWtCMUYsSUFBbEIsQ0FBdUJ1SCxZQUFZSSxTQUFuQyxDQUFuQjtBQUNBLFVBQUdlLFlBQUgsRUFDQTtBQUNFVixRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBMk0sUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxZQUE5QyxFQUE0RHBELEdBQTVELEVBQWlFbEosT0FBakU7QUFDQXFKLHVCQUFlRyxTQUFmLENBQXlCOUUsSUFBekIsR0FBZ0MsY0FBWXFGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywyQkFBM0U7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLGlCQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0EsVUFBSXlNLGdCQUFpQjdDLHNCQUFzQjNGLElBQXRCLENBQTJCdUgsWUFBWUksU0FBdkMsQ0FBckI7QUFDQSxVQUFHYSxhQUFILEVBQ0E7QUFDRXRCLCtCQUF1QixJQUF2QjtBQUNBYyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLDhCQUE0QnFKLFFBQTVCLEdBQXFDbUMsWUFBWUksU0FBakQsR0FBMkQsTUFBMUY7QUFDQWpELHVCQUFlaUUsT0FBZixDQUF1QkYsT0FBdkIsR0FBaUMsY0FBWXJELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw2QkFBNUU7QUFDRDtBQUNELFVBQUlpQixjQUFlaEQsa0JBQWtCNUYsSUFBbEIsQ0FBdUJ1SCxZQUFZSSxTQUFuQyxDQUFuQjtBQUNBLFVBQUdpQixXQUFILEVBQ0E7QUFDRVosUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlaUUsT0FBZixDQUF1QkUsU0FBdkIsR0FBbUMsY0FBWXpELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywwQkFBOUU7QUFDRDtBQUNELFVBQUltQixnQkFBaUJqRCxvQkFBb0I3RixJQUFwQixDQUF5QnVILFlBQVlJLFNBQXJDLENBQXJCO0FBQ0EsVUFBR21CLGFBQUgsRUFDQTtBQUNFZCxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBcUosdUJBQWVpRSxPQUFmLENBQXVCSSxPQUF2QixHQUFpQyxjQUFZM0QsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGlDQUE1RTtBQUNEO0FBQ0QsVUFBSXFCLGNBQWVsRCxrQkFBa0I5RixJQUFsQixDQUF1QnVILFlBQVlJLFNBQW5DLENBQW5CO0FBQ0EsVUFBR3FCLFdBQUgsRUFDQTtBQUNFaEIsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlaUUsT0FBZixDQUF1Qk0sU0FBdkIsR0FBbUMsY0FBWTdELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx1Q0FBOUU7QUFDRDtBQUVGO0FBQ0Q7QUFDQSxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLGNBQXhCLEVBQ0E7QUFDRW5NLGNBQVFVLEdBQVIsQ0FBWSw4QkFBWixFQUE0QyxFQUE1QztBQUNBVixjQUFRVSxHQUFSLENBQVksMkJBQVosRUFBeUMsRUFBekM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEVBQWpDO0FBQ0FpTSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLFNBQTlDLEVBQXlEcEQsR0FBekQsRUFBOERsSixPQUE5RDtBQUNBcUoscUJBQWVJLFlBQWYsQ0FBNEJvRSxLQUE1QixHQUFvQyxjQUFZOUQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLElBQTNDLEdBQWdEdkQsVUFBVVUsWUFBMUQsR0FBdUUsa0JBQTNHO0FBQ0Q7QUFDRCxRQUFHeUMsWUFBWUMsSUFBWixLQUFxQixtQkFBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLDZCQUFaLEVBQTJDLEVBQTNDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxFQUF4QztBQUNBVixjQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsRUFBaEM7QUFDQWlNLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsYUFBOUMsRUFBNkRwRCxHQUE3RCxFQUFrRWxKLE9BQWxFO0FBQ0FxSixxQkFBZXlFLFdBQWYsQ0FBMkJELEtBQTNCLEdBQW1DLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVK0UsV0FBMUQsR0FBc0Usa0JBQXpHO0FBQ0Q7QUFDRCxRQUFHNUIsWUFBWUMsSUFBWixLQUFxQixrQkFBeEIsRUFDQTtBQUNFUSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBcUoscUJBQWVJLFlBQWYsQ0FBNEJzRSxLQUE1QixHQUFvQyxjQUFZaEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLElBQTNDLEdBQWdEdkQsVUFBVVUsWUFBMUQsR0FBdUUsdUJBQTNHO0FBQ0Q7QUFDRCxRQUFHeUMsWUFBWUMsSUFBWixLQUFxQixtQkFBeEIsRUFDQTtBQUNFUSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBcUoscUJBQWVJLFlBQWYsQ0FBNEJzRSxLQUE1QixHQUFvQyxjQUFZaEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLElBQTNDLEdBQWdEdkQsVUFBVVUsWUFBMUQsR0FBdUUsdUJBQTNHO0FBQ0Q7O0FBRUQsUUFBR3lDLFlBQVlDLElBQVosS0FBcUIsOEJBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFleUUsV0FBZixDQUEyQkMsS0FBM0IsR0FBbUMsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVUrRSxXQUExRCxHQUFzRSx1QkFBekc7QUFDRDs7QUFFRDtBQUNBLFFBQUc1QixZQUFZQyxJQUFaLEtBQXFCLGNBQXhCLEVBQ0E7QUFDRUYsa0NBQTRCLElBQTVCO0FBQ0FqTSxjQUFRVSxHQUFSLENBQVksOEJBQVosRUFBNEMsRUFBNUM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLDJCQUFaLEVBQXlDLEVBQXpDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxFQUFqQztBQUNBaU0sTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxhQUE5QyxFQUE2RHBELEdBQTdELEVBQWtFbEosT0FBbEU7QUFDQXFKLHFCQUFlTSxZQUFmLENBQTRCa0UsS0FBNUIsR0FBb0MsY0FBWTlELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVZLFlBQTFELEdBQXVFLGtCQUEzRztBQUNEO0FBQ0QsUUFBR3VDLFlBQVlDLElBQVosS0FBcUIsc0JBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFlTSxZQUFmLENBQTRCb0UsS0FBNUIsR0FBb0MsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVZLFlBQTFELEdBQXVFLHVCQUEzRztBQUNEO0FBQ0Q7QUFDQSxRQUFHdUMsWUFBWUMsSUFBWixLQUFxQixTQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0EsVUFBSXNOLFlBQVk5RCxVQUFVdkYsSUFBVixDQUFldUgsWUFBWUksU0FBM0IsQ0FBaEI7QUFDQSxVQUFHMEIsU0FBSCxFQUNBO0FBQ0UzRSx1QkFBZVgsT0FBZixDQUF1QnVGLFlBQXZCLEdBQXNDLGNBQVlsRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQWpGO0FBQ0F0TSxnQkFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIsZUFBYXFKLFFBQWIsR0FBc0JtQyxZQUFZSSxTQUFsQyxHQUE0QyxNQUF2RTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNELE9BTEQsTUFNSTtBQUNGcUosdUJBQWVYLE9BQWYsQ0FBdUJ3RixRQUF2QixHQUFrQyxjQUFZbkUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDJCQUE3RTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLFNBQTlDLEVBQXlEcEQsR0FBekQsRUFBOERsSixPQUE5RDtBQUNEO0FBQ0Y7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixTQUF4QixFQUNBO0FBQ0UsVUFBSWdDLGFBQWN6RCxtQkFBbUIvRixJQUFuQixDQUF3QnVILFlBQVlJLFNBQXBDLENBQWxCO0FBQ0EsVUFBRzZCLFVBQUgsRUFDQTtBQUNFeEIsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlWCxPQUFmLENBQXVCMEYsV0FBdkIsR0FBcUMsY0FBWXJFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBaEY7QUFDRDtBQUNELFVBQUkrQixnQkFBaUIzRCxtQkFBbUIvRixJQUFuQixDQUF3QnVILFlBQVlJLFNBQXBDLENBQXJCO0FBQ0EsVUFBRytCLGFBQUgsRUFDQTtBQUNJMUIsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlWCxPQUFmLENBQXVCNEYsT0FBdkIsR0FBaUMsY0FBWXZFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywwQkFBNUU7QUFDSDtBQUNGO0FBQ0QsUUFBR0osWUFBWUMsSUFBWixLQUFxQixZQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0EySSxxQkFBZUssT0FBZixDQUF1QjZFLEtBQXZCLEdBQStCLGNBQVl4RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsa0NBQTFFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0F3Tyx3QkFBa0J6RSxXQUFTbUMsWUFBWUksU0FBdkMsRUFBa0QsZ0JBQWxELEVBQW9FLElBQXBFO0FBQ0Q7QUFDRCxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLGVBQXhCLEVBQ0E7QUFDRTlDLHFCQUFlSyxPQUFmLENBQXVCK0UsT0FBdkIsR0FBaUMsY0FBWTFFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw4QkFBNUU7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLGdCQUF4QixFQUNBO0FBQ0U5QyxxQkFBZUssT0FBZixDQUF1QmdGLEtBQXZCLEdBQStCLGNBQVkzRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMseUJBQTFFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixlQUF4QixFQUNBO0FBQ0U5QyxxQkFBZU8sT0FBZixDQUF1QitFLFNBQXZCLEdBQW1DLGNBQVk1RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsd0JBQTlFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixnQkFBeEIsRUFDQTtBQUNFOUMscUJBQWVPLE9BQWYsQ0FBdUJnRixRQUF2QixHQUFrQyxjQUFZN0UsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUE3RTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIseUJBQXJCLElBQWtERCxZQUFZQyxJQUFaLEtBQXFCLGlCQUExRSxFQUNBO0FBQ0UsVUFBSTBDLGdCQUFnQmpFLGNBQWNqRyxJQUFkLENBQW1CdUgsWUFBWUksU0FBL0IsQ0FBcEI7QUFDQSxVQUFHdUMsYUFBSCxFQUNBO0FBQ0U3TyxnQkFBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGdCQUFRVSxHQUFSLENBQVksc0JBQVosRUFBb0MsRUFBcEM7QUFDQVYsZ0JBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0E7QUFDQWtMLHdCQUFjLENBQWQ7QUFDQUUsK0JBQXVCLElBQXZCO0FBQ0EsWUFBR3pDLGVBQWVPLE9BQWYsQ0FBdUIyRSxLQUExQixFQUFnQztBQUM5QjVCLFVBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix5QkFBZU8sT0FBZixDQUF1QjJFLEtBQXZCLElBQWdDLGNBQVl4RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsVUFBM0MsR0FBc0R1QyxjQUFjLENBQWQsQ0FBdEQsR0FBdUUsR0FBdkUsR0FBMkVBLGNBQWMsQ0FBZCxDQUEzRSxHQUE0RixZQUE1SDtBQUNELFNBSEQsTUFJSztBQUNIbEMsVUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHlCQUFlTyxPQUFmLENBQXVCMkUsS0FBdkIsR0FBK0IsY0FBWXhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxVQUEzQyxHQUFzRHVDLGNBQWMsQ0FBZCxDQUF0RCxHQUF1RSxHQUF2RSxHQUEyRUEsY0FBYyxDQUFkLENBQTNFLEdBQTRGLFlBQTNIO0FBQ0Q7QUFDRCxZQUFJQyxlQUFlOU8sUUFBUTZELEdBQVIsQ0FBWSxpQkFBWixDQUFuQjtBQUNBaUwsd0JBQWdCLDBDQUF3Q2xELFlBQXhDLEdBQXFELGtEQUFyRCxHQUF3R2lELGNBQWMsQ0FBZCxDQUF4RyxHQUF5SCxHQUF6SCxHQUE2SEEsY0FBYyxDQUFkLENBQTdILEdBQThJLFdBQTlKO0FBQ0E3TyxnQkFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCb08sWUFBL0I7QUFDQSxZQUFJQyxRQUFRL08sUUFBUTZELEdBQVIsQ0FBWSxvQkFBWixDQUFaO0FBQ0FrTCxjQUFNek4sSUFBTixDQUFXeUksV0FBU21DLFlBQVlJLFNBQWhDO0FBQ0F0TSxnQkFBUVUsR0FBUixDQUFZLG9CQUFaLEVBQWtDcU8sS0FBbEM7QUFDRDtBQUNGOztBQUVELFFBQUc3QyxZQUFZQyxJQUFaLEtBQXFCLGNBQXhCLEVBQ0E7QUFDRW5NLGNBQVFVLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBVixjQUFRVSxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIsRUFBM0I7O0FBRUEsVUFBSXNPLFlBQWFuRSxpQkFBaUJsRyxJQUFqQixDQUFzQnVILFlBQVlJLFNBQWxDLENBQWpCO0FBQ0EsVUFBRzBDLFNBQUgsRUFDQTtBQUNFM0YsdUJBQWVRLE1BQWYsQ0FBc0JvRixHQUF0QixHQUE0QixjQUFZbEYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLG1DQUF2RTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkIscVFBQW1RcUosUUFBblEsR0FBNFFtQyxZQUFZSSxTQUF4UixHQUFrUyxNQUEvVDtBQUNEO0FBQ0QsVUFBSWEsZ0JBQWlCckMsaUJBQWlCbkcsSUFBakIsQ0FBc0J1SCxZQUFZSSxTQUFsQyxDQUFyQjtBQUNBLFVBQUdhLGFBQUgsRUFDQTtBQUNFOUQsdUJBQWVRLE1BQWYsQ0FBc0J1RCxPQUF0QixHQUFnQyxjQUFZckQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHdCQUEzRTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLDREQUEwRHFKLFFBQTFELEdBQW1FbUMsWUFBWUksU0FBL0UsR0FBeUYsTUFBdkg7QUFDRDtBQUNGOztBQUVELFFBQUdKLFlBQVlDLElBQVosS0FBcUIsVUFBeEIsRUFDQTtBQUNFLFVBQUkrQyxhQUFhakUscUJBQXFCdEcsSUFBckIsQ0FBMEJ1SCxZQUFZSSxTQUF0QyxDQUFqQjtBQUNBLFVBQUc0QyxVQUFILEVBQ0E7QUFDRTdGLHVCQUFlUSxNQUFmLENBQXNCc0YsUUFBdEIsR0FBaUMsY0FBWXBGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxzQ0FBNUU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxnQkFBOUMsRUFBZ0VwRCxHQUFoRSxFQUFxRWxKLE9BQXJFO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0UsVUFBSWlELGNBQWNsRSxtQkFBbUJ2RyxJQUFuQixDQUF3QnVILFlBQVlJLFNBQXBDLENBQWxCO0FBQ0EsVUFBRzhDLFdBQUgsRUFDQTtBQUNFL0YsdUJBQWVRLE1BQWYsQ0FBc0J3RixLQUF0QixHQUE4QixjQUFZdEYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDRCQUF6RTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLG1CQUE5QyxFQUFtRXBELEdBQW5FLEVBQXdFbEosT0FBeEU7QUFDRDtBQUNGOztBQUVELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLHVCQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVksNEJBQVosRUFBMEMsRUFBMUM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixFQUEvQjtBQUNBMkkscUJBQWVpRyxVQUFmLENBQTBCQyxHQUExQixHQUFnQyxjQUFZeEYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUEzRTtBQUNBdE0sY0FBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLGdFQUE4RHFKLFFBQTlELEdBQXVFbUMsWUFBWUksU0FBbkYsR0FBNkYsSUFBM0g7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLG9CQUF4QixFQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0EsVUFBSXFELFdBQVdyRSxvQkFBb0J4RyxJQUFwQixDQUF5QnVILFlBQVlJLFNBQXJDLENBQWY7QUFDQSxVQUFHa0QsUUFBSCxFQUNBO0FBQ0VuRyx1QkFBZWlHLFVBQWYsQ0FBMEJHLFdBQTFCLEdBQXdDLGNBQVkxRixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMscUNBQW5GO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxVQUFJMFAsV0FBV3RFLHdCQUF3QnpHLElBQXhCLENBQTZCdUgsWUFBWUksU0FBekMsQ0FBZjtBQUNBLFVBQUdvRCxRQUFILEVBQ0E7QUFDRXJHLHVCQUFlaUcsVUFBZixDQUEwQkssTUFBMUIsR0FBbUMsY0FBWTVGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxnQ0FBOUU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNELFVBQUk0UCxXQUFXdkUseUJBQXlCMUcsSUFBekIsQ0FBOEJ1SCxZQUFZSSxTQUExQyxDQUFmO0FBQ0EsVUFBR3NELFFBQUgsRUFDQTtBQUNFdkcsdUJBQWVpRyxVQUFmLENBQTBCTyxPQUExQixHQUFvQyxjQUFZOUYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGlDQUEvRTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBRUo7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFzQixtQkFBekIsRUFDQTtBQUNFOUMscUJBQWVpRyxVQUFmLENBQTBCRCxLQUExQixHQUFrQyxjQUFZdEYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGlDQUE3RTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEOztBQUVELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLGlCQUF4QixFQUNBO0FBQ0UsVUFBSTJELGNBQWN4RSxvQkFBb0IzRyxJQUFwQixDQUF5QnVILFlBQVlJLFNBQXJDLENBQWxCO0FBQ0EsVUFBSXlELFlBQVl4RSxrQkFBa0I1RyxJQUFsQixDQUF1QnVILFlBQVlJLFNBQW5DLENBQWhCO0FBQ0F0TSxjQUFRVSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLEVBQTVCO0FBQ0EsVUFBR29QLFdBQUgsRUFDQTtBQUNFekcsdUJBQWUyRyxPQUFmLENBQXVCbkMsS0FBdkIsR0FBK0IsY0FBWTlELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywyQkFBMUU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxTQUE5QyxFQUF5RHBELEdBQXpELEVBQThEbEosT0FBOUQ7QUFFRDtBQUNELFVBQUcrUCxTQUFILEVBQ0E7QUFDRTFHLHVCQUFlMkcsT0FBZixDQUF1QnBJLEdBQXZCLEdBQTZCLGNBQVltQyxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMseUJBQXhFO0FBQ0F0TSxnQkFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkJxSixXQUFTbUMsWUFBWUksU0FBaEQ7QUFDQWtDLDBCQUFrQnpFLFdBQVNtQyxZQUFZSSxTQUF2QyxFQUFrRCxnQkFBbEQsRUFBb0UsS0FBcEU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNGO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsU0FBeEIsRUFDQTtBQUNJbk0sY0FBUVUsR0FBUixDQUFZLHdCQUFaLEVBQXNDLEVBQXRDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxFQUFuQztBQUNBVixjQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQixFQUEzQjtBQUNBMkkscUJBQWU0RyxNQUFmLENBQXNCcEMsS0FBdEIsR0FBOEIsY0FBWTlELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywwQkFBekU7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxRQUE5QyxFQUF3RHBELEdBQXhELEVBQTZEbEosT0FBN0Q7QUFDSDtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLGlCQUF4QixFQUNBO0FBQ0UsVUFBSStELGdCQUFnQjFFLHFCQUFxQjdHLElBQXJCLENBQTBCdUgsWUFBWUksU0FBdEMsQ0FBcEI7QUFDQSxVQUFJNkQsZUFBZTFFLG9CQUFvQjlHLElBQXBCLENBQXlCdUgsWUFBWUksU0FBckMsQ0FBbkI7QUFDQSxVQUFHNEQsYUFBSCxFQUNBO0FBQ0k3Ryx1QkFBZTRHLE1BQWYsQ0FBc0JHLE9BQXRCLEdBQWdDLGNBQVlyRyxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMseUJBQTNFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGdCQUFRVSxHQUFSLENBQVksb0JBQVosRUFBa0NxSixXQUFTbUMsWUFBWUksU0FBdkQ7QUFDQWtDLDBCQUFrQnpFLFdBQVNtQyxZQUFZSSxTQUF2QyxFQUFrRCx1QkFBbEQsRUFBMkUsS0FBM0U7QUFDSDtBQUNELFVBQUc2RCxZQUFILEVBQ0E7QUFDSTlHLHVCQUFlNEcsTUFBZixDQUFzQkksTUFBdEIsR0FBK0IsY0FBWXRHLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx3QkFBMUU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ3FKLFdBQVNtQyxZQUFZSSxTQUF0RDtBQUNBa0MsMEJBQWtCekUsV0FBU21DLFlBQVlJLFNBQXZDLEVBQWtELHNCQUFsRCxFQUEwRSxLQUExRTtBQUNIO0FBQ0Y7QUFDRCxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLFNBQXhCLEVBQ0E7QUFDRW5NLGNBQVFVLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBVixjQUFRVSxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIsRUFBM0I7QUFDQTJJLHFCQUFlaUgsTUFBZixDQUFzQkMsR0FBdEIsR0FBNEIsY0FBWXhHLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxnQkFBdkU7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsY0FBUVUsR0FBUixDQUFZLFVBQVosRUFBd0Isa0JBQWdCcUosUUFBaEIsR0FBeUJtQyxZQUFZSSxTQUFyQyxHQUErQyxpREFBdkU7QUFDRDtBQUNELFFBQUdKLFlBQVlDLElBQVosS0FBcUIsVUFBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLDBCQUFaLEVBQXdDLEVBQXhDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBVixjQUFRVSxHQUFSLENBQVksZUFBWixFQUE2QixFQUE3QjtBQUNBMkkscUJBQWVtSCxRQUFmLENBQXdCNUksR0FBeEIsR0FBOEIsY0FBWW1DLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx5QkFBekU7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXdPLHdCQUFrQnpFLFdBQVNtQyxZQUFZSSxTQUF2QyxFQUFrRCxpQkFBbEQsRUFBcUUsS0FBckU7QUFDQXRNLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCcUosV0FBU21DLFlBQVlJLFNBQWpEO0FBQ0Q7QUFFRjs7QUFFRDtBQUNBLE1BQUcsQ0FBRVQsb0JBQUwsRUFDQTtBQUNFN0wsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLHlDQUEvQjtBQUNEO0FBQ0QsTUFBRyxDQUFFc0wsb0JBQUwsRUFDQTtBQUNFaE0sWUFBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLFFBQU1xSSxVQUFVUSxPQUFoQixHQUF3Qiw4QkFBL0Q7QUFDQXZKLFlBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixZQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNEO0FBQ0QsTUFBRyxDQUFFdUwseUJBQUwsRUFDQTtBQUNFak0sWUFBUVUsR0FBUixDQUFZLDhCQUFaLEVBQTRDLFFBQU1xSSxVQUFVWSxZQUFoQixHQUE2QiwrQkFBekU7QUFDQTNKLFlBQVFVLEdBQVIsQ0FBWSwyQkFBWixFQUF5QyxFQUF6QztBQUNBVixZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsRUFBakM7QUFDRDtBQUNELE1BQUdvTCxvQkFBSCxFQUNBO0FBQ0UsUUFBSWlELFFBQVEvTyxRQUFRNkQsR0FBUixDQUFZLG9CQUFaLENBQVo7QUFDQTJLLHNCQUFrQk8sTUFBTSxDQUFOLENBQWxCLEVBQTRCLGdCQUE1QixFQUE4QyxJQUE5QztBQUNEO0FBQ0Y7O0FBRU0sU0FBU1AsaUJBQVQsQ0FBMkJpQyxHQUEzQixFQUFnQ0MsTUFBaEMsRUFBd0N0RCxPQUF4QyxFQUNQO0FBQ0UsTUFBSXVELGdCQUFnQixVQUFTQyxJQUFULEVBQWU7QUFDakMsUUFBR0EsS0FBS3RMLEVBQUwsS0FBWSxHQUFmLEVBQW1CO0FBQUMsYUFBTyxTQUFQO0FBQWtCO0FBQ3RDLFFBQUdzTCxLQUFLdEwsRUFBTCxLQUFZLEdBQWYsRUFBbUI7QUFBQyxhQUFPLFNBQVA7QUFBa0I7QUFDdEMsV0FBTyxNQUFQO0FBQ0QsR0FKRDtBQUtBLE1BQUl1TCxnQkFBZ0IsVUFBU0QsSUFBVCxFQUFjO0FBQ2hDLFFBQUdBLEtBQUtFLENBQUwsSUFBVSxHQUFiLEVBQWlCO0FBQUMsYUFBTyxLQUFQO0FBQWM7QUFDaEMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEdBQWIsRUFBaUI7QUFBQyxhQUFPLE9BQVA7QUFBZ0I7QUFDbEMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEVBQWIsRUFBZ0I7QUFBQyxhQUFPLE9BQVA7QUFBZ0I7QUFDakMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEdBQWIsRUFBaUI7QUFBQyxhQUFPLEtBQVA7QUFBYztBQUNoQyxXQUFPLE1BQVA7QUFDRCxHQU5EO0FBT0F0SSxVQUFRQyxHQUFSLENBQVksY0FBWWdJLEdBQXhCO0FBQ0EsTUFBSU0sVUFBVUMsRUFBRU4sTUFBRixDQUFkO0FBQ0EsTUFBSU8sU0FBUyxFQUFFQyxpQkFBaUIsU0FBbkIsRUFBYjtBQUNBLE1BQUlDLFNBQVNDLE9BQU9DLFlBQVAsQ0FBcUJOLE9BQXJCLEVBQThCRSxNQUE5QixDQUFiO0FBQ0EsTUFBSXZNLE9BQU8sb0dBQUE0TSxDQUFTYixHQUFULEVBQWMsS0FBZCxFQUFxQixFQUFyQixDQUFYO0FBQ0FVLFNBQU9JLFFBQVAsQ0FBaUI3TSxJQUFqQixFQUF1QixLQUF2QixFQWxCRixDQWtCd0Q7QUFDdEQsTUFBRzBJLE9BQUgsRUFDQTtBQUNFK0QsV0FBT0ssUUFBUCxDQUFnQixFQUFoQixFQUFvQixFQUFDcEUsU0FBUyxFQUFDcUUsV0FBV2QsYUFBWixFQUFWLEVBQXBCLEVBREYsQ0FDK0Q7QUFDOUQsR0FIRCxNQUlLO0FBQ0hRLFdBQU9LLFFBQVAsQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBQ3BFLFNBQVMsRUFBQ3FFLFdBQVdaLGFBQVosRUFBVixFQUFwQixFQURHLENBQzBEO0FBQzlEO0FBQ0RySSxVQUFRQyxHQUFSLENBQVlpSSxNQUFaO0FBQ0EsTUFBR0EsT0FBT3JQLFVBQVAsQ0FBa0IsV0FBbEIsQ0FBSCxFQUFrQztBQUNoQzhQLFdBQU9PLFVBQVAsQ0FBa0JOLE9BQU9PLFdBQVAsQ0FBbUJDLEdBQXJDLEVBQTBDLEVBQUMsV0FBVSxHQUFYLEVBQWdCQyxhQUFhLGFBQTdCLEVBQTFDLEVBQXVGLEVBQUNDLFNBQVEsSUFBVCxFQUF2RixFQUFzRyxFQUF0RztBQUNEO0FBQ0RYLFNBQU9ZLE1BQVAsR0E5QkYsQ0E4QndEO0FBQ3REWixTQUFPYSxNQUFQLEdBL0JGLENBK0J3RDtBQUN0RGIsU0FBT2MsSUFBUCxDQUFZLEdBQVosRUFBaUIsSUFBakI7QUFDRDs7QUFFTSxTQUFTQyxtQkFBVCxDQUE2QmxTLE9BQTdCLEVBQXNDcUosY0FBdEMsRUFDUDtBQUNFO0FBQ0EsTUFBSThJLG1CQUFtQm5TLFFBQVE2RCxHQUFSLENBQVksZ0JBQVosQ0FBdkI7QUFDQSxNQUFHLGFBQWF3RixjQUFoQixFQUNBO0FBQ0UsUUFBR0EsZUFBZUUsT0FBZixDQUF1QnFELEtBQTFCLEVBQWdDO0FBQ2hDdUYseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUUsT0FBZixDQUF1QkQsTUFBL0MsQ0FBbkI7QUFDQTZJLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVFLE9BQWYsQ0FBdUJxRCxLQUEvQyxDQUFuQjtBQUNBdUYseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUUsT0FBZixDQUF1QnVELEdBQS9DLENBQW5CO0FBQ0FxRix5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFBc0Q7QUFDdkQ7QUFDRCxNQUFHLGNBQWMvSSxjQUFqQixFQUNBO0FBQ0U4SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlbkQsUUFBZixDQUF3Qm9ELE1BQWhELENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlbkQsUUFBZixDQUF3QjZHLEtBQWhELENBQW5CO0FBQ0FvRix1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlbkQsUUFBZixDQUF3QjhHLElBQWhELENBQW5CO0FBQ0FtRix1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsZUFBZS9JLGNBQWxCLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVHLFNBQWYsQ0FBeUJGLE1BQWpELENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlRyxTQUFmLENBQXlCOUUsSUFBakQsQ0FBbkI7QUFDQXlOLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVHLFNBQWYsQ0FBeUIwRCxTQUFqRCxDQUFuQjtBQUNBaUYsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUcsU0FBZixDQUF5QjRELE9BQWpELENBQW5CO0FBQ0ErRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsa0JBQWtCL0ksY0FBckIsRUFDQTtBQUNFOEksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUksWUFBZixDQUE0QkgsTUFBcEQsQ0FBbkI7QUFDQTZJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVJLFlBQWYsQ0FBNEJvRSxLQUFwRCxDQUFuQjtBQUNBc0UsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUksWUFBZixDQUE0QnNFLEtBQXBELENBQW5CO0FBQ0FvRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsaUJBQWlCL0ksY0FBcEIsRUFDQTtBQUNFOEksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZXlFLFdBQWYsQ0FBMkJ4RSxNQUFuRCxDQUFuQjtBQUNBNkksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZXlFLFdBQWYsQ0FBMkJELEtBQW5ELENBQW5CO0FBQ0FzRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFleUUsV0FBZixDQUEyQkMsS0FBbkQsQ0FBbkI7QUFDQW9FLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEO0FBQ0QsTUFBRyxrQkFBa0IvSSxjQUFyQixFQUNBO0FBQ0UsUUFBR0EsZUFBZU0sWUFBZixDQUE0QmtFLEtBQS9CLEVBQXFDO0FBQ3JDc0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZU0sWUFBZixDQUE0QkwsTUFBcEQsQ0FBbkI7QUFDQTZJLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVNLFlBQWYsQ0FBNEJrRSxLQUFwRCxDQUFuQjtBQUNBc0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZU0sWUFBZixDQUE0Qm9FLEtBQXBELENBQW5CO0FBQ0FvRSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDQztBQUNGO0FBQ0QsTUFBRyxhQUFhL0ksY0FBaEIsRUFDQTtBQUNFOEksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZWlFLE9BQWYsQ0FBdUJoRSxNQUEvQyxDQUFuQjtBQUNBLFFBQUdELGVBQWVpRSxPQUFmLENBQXVCRixPQUExQixFQUNBO0FBQ0ErRSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlaUUsT0FBZixDQUF1QkYsT0FBL0MsQ0FBbkI7QUFDQStFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpRSxPQUFmLENBQXVCRSxTQUEvQyxDQUFuQjtBQUNBMkUseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZWlFLE9BQWYsQ0FBdUJJLE9BQS9DLENBQW5CO0FBQ0F5RSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlaUUsT0FBZixDQUF1Qk0sU0FBL0MsQ0FBbkI7QUFDQyxLQU5ELE1BUUE7QUFDRXVFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixzQ0FBeEIsQ0FBbkI7QUFDRDtBQUNERCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYS9JLGNBQWhCLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVLLE9BQWYsQ0FBdUJKLE1BQS9DLENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlSyxPQUFmLENBQXVCNkUsS0FBL0MsQ0FBbkI7QUFDQTRELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVLLE9BQWYsQ0FBdUIrRSxPQUEvQyxDQUFuQjtBQUNBMEQsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZUssT0FBZixDQUF1QmdGLEtBQS9DLENBQW5CO0FBQ0F5RCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYS9JLGNBQWhCLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVPLE9BQWYsQ0FBdUJOLE1BQS9DLENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlTyxPQUFmLENBQXVCMkUsS0FBL0MsQ0FBbkI7QUFDQTRELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVPLE9BQWYsQ0FBdUIrRSxTQUEvQyxDQUFuQjtBQUNBd0QsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZU8sT0FBZixDQUF1QmdGLFFBQS9DLENBQW5CO0FBQ0F1RCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsWUFBWS9JLGNBQWYsRUFDQTtBQUNFOEksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZVEsTUFBZixDQUFzQlAsTUFBOUMsQ0FBbkI7QUFDQTZJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVRLE1BQWYsQ0FBc0JvRixHQUE5QyxDQUFuQjtBQUNBa0QsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZVEsTUFBZixDQUFzQnVELE9BQTlDLENBQW5CO0FBQ0ErRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlUSxNQUFmLENBQXNCc0YsUUFBOUMsQ0FBbkI7QUFDQWdELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVRLE1BQWYsQ0FBc0J3RixLQUE5QyxDQUFuQjtBQUNBOEMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGdCQUFnQi9JLGNBQW5CLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpRyxVQUFmLENBQTBCaEcsTUFBbEQsQ0FBbkI7QUFDQTZJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpRyxVQUFmLENBQTBCRCxLQUFsRCxDQUFuQjtBQUNBOEMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZWlHLFVBQWYsQ0FBMEJDLEdBQWxELENBQW5CO0FBQ0E0Qyx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlaUcsVUFBZixDQUEwQkssTUFBbEQsQ0FBbkI7QUFDQXdDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpRyxVQUFmLENBQTBCRyxXQUFsRCxDQUFuQjtBQUNBMEMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCL0ksZUFBZWlHLFVBQWYsQ0FBMEJPLE9BQWxELENBQW5CO0FBQ0FzQyx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYS9JLGNBQWhCLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWUyRyxPQUFmLENBQXVCMUcsTUFBL0MsQ0FBbkI7QUFDQTZJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWUyRyxPQUFmLENBQXVCbkMsS0FBL0MsQ0FBbkI7QUFDQXNFLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWUyRyxPQUFmLENBQXVCcEksR0FBL0MsQ0FBbkI7QUFDQXVLLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEO0FBQ0QsTUFBRyxZQUFZL0ksY0FBZixFQUNBO0FBQ0U4SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlNEcsTUFBZixDQUFzQjNHLE1BQTlDLENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlNEcsTUFBZixDQUFzQnBDLEtBQTlDLENBQW5CO0FBQ0FzRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlNEcsTUFBZixDQUFzQkcsT0FBOUMsQ0FBbkI7QUFDQStCLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWU0RyxNQUFmLENBQXNCSSxNQUE5QyxDQUFuQjtBQUNBOEIsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLFlBQVkvSSxjQUFmLEVBQ0E7QUFDRThJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpSCxNQUFmLENBQXNCaEgsTUFBOUMsQ0FBbkI7QUFDQTZJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3Qi9JLGVBQWVpSCxNQUFmLENBQXNCQyxHQUE5QyxDQUFuQjtBQUNBNEIsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGNBQWMvSSxjQUFqQixFQUNBO0FBQ0U4SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlbUgsUUFBZixDQUF3QmxILE1BQWhELENBQW5CO0FBQ0E2SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IvSSxlQUFlbUgsUUFBZixDQUF3QjVJLEdBQWhELENBQW5CO0FBQ0F1Syx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDs7QUFFRHBTLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QnlSLGdCQUE5QjtBQUNEOztBQUdNLFNBQVNFLG1CQUFULEdBQ1A7QUFDRSxNQUFJQyxlQUFlLEVBQW5CO0FBQ0EsTUFBRztBQUNEQSxpQkFBYUMsdUJBQWIsR0FBdUNDLFNBQVNDLGNBQVQsQ0FBd0Isd0JBQXhCLEVBQWtEbEssS0FBekY7QUFDRCxHQUZELENBR0EsT0FBTW1LLEdBQU4sRUFBVztBQUNUSixpQkFBYUMsdUJBQWIsR0FBdUMsTUFBdkM7QUFDRDtBQUNELE1BQUc7QUFDREQsaUJBQWFLLDJCQUFiLEdBQTJDSCxTQUFTQyxjQUFULENBQXdCLDZCQUF4QixFQUF1RGxLLEtBQWxHO0FBQ0QsR0FGRCxDQUdBLE9BQU1tSyxHQUFOLEVBQVc7QUFDVEosaUJBQWFLLDJCQUFiLEdBQTJDLENBQTNDO0FBQ0Q7O0FBRUQsTUFBRztBQUNETCxpQkFBYU0sb0JBQWIsR0FBb0NKLFNBQVNDLGNBQVQsQ0FBd0Isc0JBQXhCLEVBQWdEbEssS0FBcEY7QUFDRCxHQUZELENBR0EsT0FBTW1LLEdBQU4sRUFBVztBQUNUSixpQkFBYU0sb0JBQWIsR0FBb0MsRUFBcEM7QUFDRDtBQUNELE1BQUc7QUFDRE4saUJBQWFPLG9CQUFiLEdBQW9DTCxTQUFTQyxjQUFULENBQXdCLHNCQUF4QixFQUFnRGxLLEtBQXBGO0FBQ0QsR0FGRCxDQUdBLE9BQU1tSyxHQUFOLEVBQVc7QUFDVEosaUJBQWFPLG9CQUFiLEdBQW9DLEVBQXBDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RQLGlCQUFhUSxXQUFiLEdBQTJCTixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q2xLLEtBQXZFO0FBQ0QsR0FGRCxDQUdBLE9BQU1tSyxHQUFOLEVBQVc7QUFDVEosaUJBQWFRLFdBQWIsR0FBMkIsT0FBM0I7QUFDRDs7QUFFRCxNQUFHO0FBQ0RSLGlCQUFhUyx5QkFBYixHQUF5Q1AsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNENsSyxLQUFyRjtBQUNBK0osaUJBQWFVLG1CQUFiLEdBQW1DUixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q2xLLEtBQS9FO0FBQ0ErSixpQkFBYVcsa0JBQWIsR0FBa0NULFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDbEssS0FBOUU7QUFDQStKLGlCQUFhWSxxQkFBYixHQUFxQ1YsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNENsSyxLQUFqRjtBQUNELEdBTEQsQ0FNQSxPQUFNbUssR0FBTixFQUFXO0FBQ1RKLGlCQUFhUyx5QkFBYixHQUF5QyxHQUF6QztBQUNBVCxpQkFBYVUsbUJBQWIsR0FBbUMsR0FBbkM7QUFDQVYsaUJBQWFXLGtCQUFiLEdBQWtDLEdBQWxDO0FBQ0FYLGlCQUFhWSxxQkFBYixHQUFxQyxHQUFyQztBQUNEO0FBQ0QsTUFBRztBQUNEWixpQkFBYWEsa0JBQWIsR0FBa0NYLFNBQVNDLGNBQVQsQ0FBd0Isb0JBQXhCLEVBQThDbEssS0FBaEY7QUFDQStKLGlCQUFhYyxxQkFBYixHQUFxQ1osU0FBU0MsY0FBVCxDQUF3QixvQkFBeEIsRUFBOENsSyxLQUFuRjtBQUNELEdBSEQsQ0FJQSxPQUFNbUssR0FBTixFQUFXO0FBQ1RKLGlCQUFhYSxrQkFBYixHQUFrQyxJQUFsQztBQUNBYixpQkFBYWMscUJBQWIsR0FBcUMsSUFBckM7QUFDRDtBQUNELE1BQUc7QUFDRGQsaUJBQWFlLG1CQUFiLEdBQW1DYixTQUFTQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDbEssS0FBMUU7QUFDRCxHQUZELENBR0EsT0FBTW1LLEdBQU4sRUFBVztBQUNUSixpQkFBYWUsbUJBQWIsR0FBbUMsR0FBbkM7QUFDRDs7QUFFRCxNQUFHO0FBQ0RmLGlCQUFhZ0IseUJBQWIsR0FBeUNkLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDbEssS0FBNUMsR0FBa0RpSyxTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q2xLLEtBQXZJO0FBQ0QsR0FGRCxDQUdBLE9BQU1tSyxHQUFOLEVBQVc7QUFDVEosaUJBQWFnQix5QkFBYixHQUF5QyxJQUF6QztBQUNEO0FBQ0QsTUFBRztBQUNEaEIsaUJBQWFpQixtQkFBYixHQUFtQ2YsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNENsSyxLQUEvRTtBQUNBK0osaUJBQWFrQiwyQkFBYixHQUE0Q2hCLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDbEssS0FBeEY7QUFDRCxHQUhELENBSUEsT0FBTW1LLEdBQU4sRUFBVztBQUNUSixpQkFBYWlCLG1CQUFiLEdBQW1DLEdBQW5DO0FBQ0FqQixpQkFBYWtCLDJCQUFiLEdBQTJDLEdBQTNDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RsQixpQkFBYW1CLG9CQUFiLEdBQW9DakIsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNENsSyxLQUFoRjtBQUNBK0osaUJBQWFvQiw0QkFBYixHQUE0Q2xCLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDbEssS0FBeEY7QUFDRCxHQUhELENBSUEsT0FBTW1LLEdBQU4sRUFBVztBQUNUSixpQkFBYWlCLG1CQUFiLEdBQW1DLEdBQW5DO0FBQ0FqQixpQkFBYWtCLDJCQUFiLEdBQTJDLEdBQTNDO0FBQ0Q7O0FBRUg7QUFDSWxCLGVBQWFxQixrQkFBYixHQUFrQ25CLFNBQVNDLGNBQVQsQ0FBd0Isb0JBQXhCLEVBQThDbEssS0FBaEY7QUFDQSxNQUFHaUssU0FBU0MsY0FBVCxDQUF3QixxQkFBeEIsRUFBK0NtQixPQUFsRCxFQUEwRDtBQUN4RHRCLGlCQUFhdUIsZUFBYixHQUErQixNQUEvQjtBQUNELEdBRkQsTUFFSztBQUNIdkIsaUJBQWF1QixlQUFiLEdBQStCLE9BQS9CO0FBQ0Q7QUFDRCxNQUFHckIsU0FBU0MsY0FBVCxDQUF3QixzQkFBeEIsRUFBZ0RtQixPQUFuRCxFQUNBO0FBQ0V0QixpQkFBYXdCLGdCQUFiLEdBQWdDLElBQWhDO0FBQ0QsR0FIRCxNQUtBO0FBQ0V4QixpQkFBYXdCLGdCQUFiLEdBQWdDLEtBQWhDO0FBQ0Q7O0FBRUQ7QUFDRjtBQUNBO0FBQ0EsU0FBT3hCLFlBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7O0FDLzJCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ08sU0FBU3lCLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCek0sSUFBM0IsRUFBaUMwTSxTQUFqQyxFQUNQO0FBQ0V6TCxVQUFRQyxHQUFSLENBQVkscUJBQVo7QUFDQUQsVUFBUUMsR0FBUixDQUFZdUwsR0FBWjtBQUNBeEwsVUFBUUMsR0FBUixDQUFZbEIsSUFBWjtBQUNBLE1BQUkyTSxXQUFXLElBQWY7QUFDQWxELElBQUVtRCxJQUFGLENBQU87QUFDTDVNLFVBQU1BLElBREQ7QUFFTDdDLFVBQU11UCxTQUZEO0FBR0xHLFdBQU8sS0FIRjtBQUlMQyxpQkFBYSxLQUpSO0FBS0xDLGlCQUFhLEtBTFI7QUFNTEMsV0FBUyxLQU5KO0FBT0xDLGNBQVUsTUFQTDtBQVFMO0FBQ0FSLFNBQUtBLEdBVEE7QUFVTFMsYUFBVSxVQUFVL1AsSUFBVixFQUNWO0FBQ0UsVUFBR0EsU0FBUyxJQUFaLEVBQWlCO0FBQUNzQixjQUFNLHFCQUFOO0FBQThCO0FBQ2hEa08saUJBQVN4UCxJQUFUO0FBQ0E7QUFDRCxLQWZJO0FBZ0JMZ1EsV0FBTyxVQUFVQSxLQUFWLEVBQWlCO0FBQUMxTyxZQUFNLG9CQUFrQmdPLEdBQWxCLEdBQXNCLFdBQXRCLEdBQWtDVSxNQUFNQyxZQUF4QyxHQUFxRCw2R0FBM0QsRUFBMkssT0FBTyxJQUFQO0FBQ3JNLEtBakJNLEVBQVAsRUFpQklDLFlBakJKO0FBa0JBLFNBQU9WLFFBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ08sU0FBU1csUUFBVCxDQUFrQjdVLE9BQWxCLEVBQTJCZ0osUUFBM0IsRUFBcUN0QyxHQUFyQyxFQUEwQ3lGLElBQTFDLEVBQWdEMkksS0FBaEQsRUFBdURDLFVBQXZELEVBQW1FQyxTQUFuRSxFQUE4RWpNLFNBQTlFLEVBQXlGdUosWUFBekYsRUFDUDtBQUNFO0FBQ0E5SixVQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDQUQsVUFBUUMsR0FBUixDQUFZTyxRQUFaO0FBQ0EsTUFBSS9JLE9BQU8sSUFBWDtBQUNBLE1BQ0E7QUFDRUEsV0FBTyxJQUFJZ1YsSUFBSixDQUFTLENBQUN2TyxHQUFELENBQVQsQ0FBUDtBQUNELEdBSEQsQ0FHRSxPQUFPd08sQ0FBUCxFQUNGO0FBQ0VsUCxVQUFNa1AsQ0FBTjtBQUNEO0FBQ0QsTUFBSUMsS0FBSyxJQUFJQyxRQUFKLEVBQVQ7QUFDQUQsS0FBR0UsTUFBSCxDQUFVLFlBQVYsRUFBd0JwVixJQUF4QixFQUE4QixXQUE5QjtBQUNBa1YsS0FBR0UsTUFBSCxDQUFVLEtBQVYsRUFBZ0JyTSxRQUFoQjtBQUNBbU0sS0FBR0UsTUFBSCxDQUFVLGlCQUFWLEVBQTRCbEosSUFBNUI7QUFDQWdKLEtBQUdFLE1BQUgsQ0FBVSxPQUFWLEVBQW1CUCxLQUFuQjtBQUNBSyxLQUFHRSxNQUFILENBQVUseUJBQVYsRUFBcUMvQyxhQUFhQyx1QkFBbEQ7QUFDQTRDLEtBQUdFLE1BQUgsQ0FBVSw2QkFBVixFQUF5Qy9DLGFBQWFLLDJCQUF0RDtBQUNBd0MsS0FBR0UsTUFBSCxDQUFVLDJCQUFWLEVBQXVDL0MsYUFBYVMseUJBQXBEO0FBQ0FvQyxLQUFHRSxNQUFILENBQVUscUJBQVYsRUFBaUMvQyxhQUFhVSxtQkFBOUM7QUFDQW1DLEtBQUdFLE1BQUgsQ0FBVSxvQkFBVixFQUFnQy9DLGFBQWFhLGtCQUE3QztBQUNBZ0MsS0FBR0UsTUFBSCxDQUFVLG9CQUFWLEVBQWdDL0MsYUFBYVcsa0JBQTdDO0FBQ0FrQyxLQUFHRSxNQUFILENBQVUsdUJBQVYsRUFBbUMvQyxhQUFhWSxxQkFBaEQ7QUFDQWlDLEtBQUdFLE1BQUgsQ0FBVSx1QkFBVixFQUFtQy9DLGFBQWFjLHFCQUFoRDtBQUNBK0IsS0FBR0UsTUFBSCxDQUFVLHFCQUFWLEVBQWlDL0MsYUFBYWUsbUJBQTlDO0FBQ0E4QixLQUFHRSxNQUFILENBQVUsMkJBQVYsRUFBdUMvQyxhQUFhZ0IseUJBQXBEO0FBQ0E2QixLQUFHRSxNQUFILENBQVUscUJBQVYsRUFBaUMvQyxhQUFhaUIsbUJBQTlDO0FBQ0E0QixLQUFHRSxNQUFILENBQVUsc0JBQVYsRUFBa0MvQyxhQUFhbUIsb0JBQS9DO0FBQ0EwQixLQUFHRSxNQUFILENBQVUsNkJBQVYsRUFBeUMvQyxhQUFha0IsMkJBQXREO0FBQ0EyQixLQUFHRSxNQUFILENBQVUsOEJBQVYsRUFBMEMvQyxhQUFhb0IsNEJBQXZEO0FBQ0F5QixLQUFHRSxNQUFILENBQVUsb0JBQVYsRUFBZ0MvQyxhQUFhcUIsa0JBQTdDO0FBQ0F3QixLQUFHRSxNQUFILENBQVUsaUJBQVYsRUFBNkIvQyxhQUFhdUIsZUFBMUM7QUFDQXNCLEtBQUdFLE1BQUgsQ0FBVSxrQkFBVixFQUE4Qi9DLGFBQWF3QixnQkFBM0M7O0FBRUF0TCxVQUFRQyxHQUFSLENBQVk2SixZQUFaO0FBQ0EsTUFBSWdELGdCQUFnQnZCLGFBQWFnQixVQUFiLEVBQXlCLE1BQXpCLEVBQWlDSSxFQUFqQyxDQUFwQjtBQUNBLE1BQUdHLGtCQUFrQixJQUFyQixFQUNBO0FBQ0UsUUFBSUMsUUFBUXhCLGFBQWFpQixTQUFiLEVBQXVCLEtBQXZCLEVBQTZCLEVBQTdCLENBQVo7QUFDQTtBQUNBLFFBQUdoTSxZQUFZdU0sS0FBZixFQUNBO0FBQ0V2VixjQUFRVSxHQUFSLENBQVlzSSxXQUFTLE9BQXJCLEVBQThCRCxVQUFVQyxRQUFWLElBQW9CLHVCQUFwQixHQUE0Q3VNLE1BQU12TSxRQUFOLENBQTVDLEdBQTRELFVBQTFGO0FBQ0QsS0FIRCxNQUtBO0FBQ0VoSixjQUFRVSxHQUFSLENBQVlzSSxXQUFTLE9BQXJCLEVBQThCLHlDQUF1Q0QsVUFBVUMsUUFBVixDQUF2QyxHQUEyRCxRQUF6RjtBQUNEO0FBQ0QsU0FBSSxJQUFJd00sQ0FBUixJQUFhRixhQUFiLEVBQ0E7QUFDRSxVQUFHRSxLQUFLLE1BQVIsRUFDQTtBQUNFeFYsZ0JBQVFVLEdBQVIsQ0FBWSxZQUFaLEVBQTBCNFUsY0FBY0UsQ0FBZCxDQUExQjtBQUNBLFlBQUcsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixRQUF0QixFQUFnQyxVQUFoQyxFQUE0QzVRLFFBQTVDLENBQXFEb0UsUUFBckQsQ0FBSCxFQUNBO0FBQ0VoSixrQkFBUXlWLElBQVIsQ0FBYSxjQUFiLEVBQTZCLEtBQTdCO0FBQ0QsU0FIRCxNQUtBO0FBQ0V6VixrQkFBUXlWLElBQVIsQ0FBYSxjQUFiLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0EzQkQsTUE2QkE7QUFDRSxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDTyxTQUFTQyxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUNaLFVBQWpDLEVBQTZDaEwsUUFBN0MsRUFBdUQvSixPQUF2RCxFQUNQO0FBQ0l3SSxVQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDQSxNQUFJdUwsTUFBTWUsYUFBVy9VLFFBQVE2RCxHQUFSLENBQVksWUFBWixDQUFyQjtBQUNBO0FBQ0EsTUFBSStSLHNCQUFzQjdCLGFBQWFDLEdBQWIsRUFBa0IsS0FBbEIsRUFBeUIsRUFBekIsQ0FBMUI7QUFDQSxNQUFHLENBQUU0QixtQkFBTCxFQUF5QjtBQUFDNVAsVUFBTSxvQkFBTjtBQUE2QjtBQUN2RCxNQUFJVSxNQUFNNEssU0FBU3ZILFdBQVM2TCxvQkFBb0JDLFdBQXBCLENBQWdDLENBQWhDLEVBQW1DQyxVQUFyRCxFQUFpRSxLQUFqRSxFQUF3RSxFQUF4RSxDQUFWO0FBQ0EsTUFBSUMsT0FBTyxFQUFYO0FBQ0FILHNCQUFvQkMsV0FBcEIsQ0FBZ0N4VixPQUFoQyxDQUF3QyxVQUFTMlYsVUFBVCxFQUFvQjtBQUMxREQsWUFBUUMsV0FBV2hOLFFBQVgsR0FBb0IsR0FBNUI7QUFDRCxHQUZEO0FBR0ErTSxTQUFPQSxLQUFLRSxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFQO0FBQ0EsU0FBTyxFQUFDLE9BQU92UCxHQUFSLEVBQWEsU0FBU2tQLG9CQUFvQkMsV0FBcEIsQ0FBZ0MsQ0FBaEMsRUFBbUNmLEtBQXpELEVBQWdFLFFBQVFjLG9CQUFvQkMsV0FBcEIsQ0FBZ0MsQ0FBaEMsRUFBbUNLLGVBQTNHLEVBQTRILFFBQVFILElBQXBJLEVBQVA7QUFDSDs7QUFHRDtBQUNPLFNBQVN6RSxRQUFULENBQWtCMEMsR0FBbEIsRUFBdUJ6TSxJQUF2QixFQUE2QjBNLFNBQTdCLEVBQ1A7O0FBRUMsTUFBSUMsV0FBVyxJQUFmO0FBQ0NsRCxJQUFFbUQsSUFBRixDQUFPO0FBQ0w1TSxVQUFNQSxJQUREO0FBRUw3QyxVQUFNdVAsU0FGRDtBQUdMRyxXQUFPLEtBSEY7QUFJTEMsaUJBQWEsS0FKUjtBQUtMQyxpQkFBYSxLQUxSO0FBTUxDLFdBQVMsS0FOSjtBQU9MO0FBQ0E7QUFDQVAsU0FBS0EsR0FUQTtBQVVMUyxhQUFVLFVBQVUvUCxJQUFWLEVBQ1Y7QUFDRSxVQUFHQSxTQUFTLElBQVosRUFBaUI7QUFBQ3NCLGNBQU0sbUNBQU47QUFBNEM7QUFDOURrTyxpQkFBU3hQLElBQVQ7QUFDQTtBQUNELEtBZkk7QUFnQkxnUSxXQUFPLFVBQVVBLEtBQVYsRUFBaUI7QUFBQzFPLFlBQU0sb0hBQU47QUFBNkg7QUFoQmpKLEdBQVA7QUFrQkEsU0FBT2tPLFFBQVA7QUFDRDs7QUFHRDtBQUNBO0FBQ08sU0FBU3ZILFlBQVQsQ0FBc0J3SixRQUF0QixFQUFnQzVKLElBQWhDLEVBQXNDNkosR0FBdEMsRUFBMkNsTixHQUEzQyxFQUFnRGxKLE9BQWhELEVBQ1A7QUFDRSxNQUFJZ1UsTUFBTW1DLFdBQVc1SixJQUFyQjtBQUNBLE1BQUk4SixZQUFZOUosS0FBS25NLEtBQUwsQ0FBVyxHQUFYLENBQWhCO0FBQ0E7QUFDQTtBQUNBb0ksVUFBUUMsR0FBUixDQUFZLHFDQUFaO0FBQ0EsTUFBSXlMLFdBQVcsSUFBZjtBQUNBbEQsSUFBRW1ELElBQUYsQ0FBTztBQUNMNU0sVUFBTSxLQUREO0FBRUxnTixXQUFTLElBRko7QUFHTFAsU0FBS0EsR0FIQTtBQUlMUyxhQUFVLFVBQVV4VSxJQUFWLEVBQ1Y7QUFDRWlKLFVBQUlvTixNQUFKLENBQVdELFVBQVUsQ0FBVixDQUFYLEVBQXlCcFcsSUFBekIsQ0FBOEJvVyxVQUFVLENBQVYsQ0FBOUIsRUFBNENwVyxJQUE1QztBQUNBLFVBQUdtVyxRQUFRLE9BQVgsRUFDQTtBQUNFcFcsZ0JBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCVCxJQUE3QjtBQUNBc0YsY0FBTWdFLE9BQU4sQ0FBY3RKLElBQWQsRUFBb0IsY0FBcEIsRUFBb0MsRUFBQ3dGLFFBQVEscUJBQVQsRUFBZ0NDLGVBQWUsQ0FBL0MsRUFBcEM7QUFDRDtBQUNELFVBQUcwUSxRQUFRLEtBQVgsRUFDQTtBQUNFblIsUUFBQSxtR0FBQUEsQ0FBVWpGLE9BQVYsRUFBbUJDLElBQW5CO0FBQ0Q7QUFDRCxVQUFHbVcsUUFBUSxPQUFYLEVBQ0E7QUFDRW5RLFFBQUEscUdBQUFBLENBQVlqRyxPQUFaLEVBQXFCQyxJQUFyQjtBQUNBO0FBQ0Q7QUFDRCxVQUFHbVcsUUFBUSxNQUFYLEVBQ0E7QUFDRWpRLFFBQUEsb0dBQUFBLENBQVduRyxPQUFYLEVBQW9CQyxJQUFwQjtBQUNEO0FBQ0QsVUFBR21XLFFBQVEsWUFBWCxFQUNBO0FBQ0UzUCxRQUFBLDBHQUFBQSxDQUFpQnpHLE9BQWpCLEVBQTBCQyxJQUExQjtBQUNEO0FBQ0QsVUFBR21XLFFBQVEsU0FBWCxFQUNBO0FBQ0U5TyxRQUFBLHVHQUFBQSxDQUFjdEgsT0FBZCxFQUF1QkMsSUFBdkIsRUFBNkIsTUFBN0I7QUFDRDtBQUNELFVBQUdtVyxRQUFRLGFBQVgsRUFDQTtBQUNFOU8sUUFBQSx1R0FBQUEsQ0FBY3RILE9BQWQsRUFBdUJDLElBQXZCLEVBQTZCLEtBQTdCO0FBQ0Q7QUFDRCxVQUFHbVcsUUFBUSxhQUFYLEVBQ0E7QUFDRTlPLFFBQUEsdUdBQUFBLENBQWN0SCxPQUFkLEVBQXVCQyxJQUF2QixFQUE2QixNQUE3QjtBQUNEO0FBQ0QsVUFBR21XLFFBQVEsU0FBWCxFQUNBO0FBQ0VwTyxRQUFBLHVHQUFBQSxDQUFjaEksT0FBZCxFQUF1QkMsSUFBdkI7QUFDRDtBQUNELFVBQUdtVyxRQUFRLGdCQUFYLEVBQ0E7QUFDRTVTLFFBQUEsdUdBQUFBLENBQWN4RCxPQUFkLEVBQXVCQyxJQUF2QjtBQUNEO0FBQ0QsVUFBR21XLFFBQVEsbUJBQVgsRUFDQTtBQUNFcFYsUUFBQSx1R0FBQUEsQ0FBY2hCLE9BQWQsRUFBdUJDLElBQXZCO0FBQ0Q7QUFDRCxVQUFHbVcsUUFBUSxTQUFYLEVBQ0E7QUFDRXpWLFFBQUEsdUdBQUFBLENBQWNYLE9BQWQsRUFBdUJDLElBQXZCO0FBQ0Q7QUFDRCxVQUFHbVcsUUFBUSxRQUFYLEVBQ0E7QUFDRXJXLFFBQUEsc0dBQUFBLENBQWFDLE9BQWIsRUFBc0JDLElBQXRCO0FBQ0Q7QUFFRixLQTlESTtBQStETHlVLFdBQU8sVUFBVUEsS0FBVixFQUFpQjtBQUFDMU8sWUFBTXVRLEtBQUtDLFNBQUwsQ0FBZTlCLEtBQWYsQ0FBTjtBQUE4QjtBQS9EbEQsR0FBUDtBQWlFRCxDOzs7Ozs7Ozs7QUM1T0Q7QUFBQTtBQUNPLFNBQVMrQixTQUFULENBQW1CbE8sS0FBbkIsRUFBMEJtTyxLQUExQixFQUFpQztBQUN0QyxNQUFHQSxNQUFNcE8sT0FBTixDQUFjQyxLQUFkLElBQXVCLENBQUMsQ0FBM0IsRUFDQTtBQUNFLFdBQU8sSUFBUDtBQUNELEdBSEQsTUFJSztBQUNILFdBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNPLFNBQVNvTywyQkFBVCxDQUFxQzNXLE9BQXJDLEVBQTZDOztBQUVsRCxNQUFJMEcsTUFBTTFHLFFBQVE2RCxHQUFSLENBQVksVUFBWixDQUFWO0FBQ0EsTUFBSStTLFdBQVdsUSxJQUFJdEcsS0FBSixDQUFVLEVBQVYsQ0FBZjtBQUNBLE1BQUk4RSxjQUFjLEVBQWxCO0FBQ0EwUixXQUFTdlcsT0FBVCxDQUFpQixVQUFTd1csR0FBVCxFQUFhO0FBQzVCM1IsZ0JBQVk1RCxJQUFaLENBQWlCLEVBQUMsT0FBT3VWLEdBQVIsRUFBakI7QUFDRCxHQUZEO0FBR0E3VyxVQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQndFLFdBQTNCO0FBQ0FLLFFBQU1DLGNBQU4sQ0FBcUJ4RixRQUFRNkQsR0FBUixDQUFZLGFBQVosQ0FBckIsRUFBaUQsRUFBQzRCLFFBQVEsbUJBQVQsRUFBOEJDLGVBQWUsQ0FBN0MsRUFBZ0RDLE9BQU8sS0FBdkQsRUFBOERDLGlCQUFpQixHQUEvRSxFQUFvRkMsT0FBTyxHQUEzRixFQUFnR0MsUUFBUSxHQUF4RyxFQUE2R0Msa0JBQWtCLEdBQS9ILEVBQWpEO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTK1EsVUFBVCxHQUFzQjtBQUN6QixNQUFJQyxPQUFPLEVBQVg7QUFDQTtBQUNBLE1BQUlDLFFBQVFDLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCL08sT0FBckIsQ0FBNkIseUJBQTdCLEVBQ1osVUFBU2dQLENBQVQsRUFBV0MsR0FBWCxFQUFlOU8sS0FBZixFQUFzQjtBQUNwQndPLFNBQUtNLEdBQUwsSUFBWTlPLEtBQVo7QUFDRCxHQUhXLENBQVo7QUFJQSxTQUFPd08sSUFBUDtBQUNEOztBQUVIO0FBQ0MsV0FBVXZFLFFBQVYsRUFBb0I4RSxlQUFwQixFQUFxQztBQUNsQztBQUNBOztBQUVBOztBQUNBLE1BQUlDLFlBQVksYUFBaEI7QUFDQSxNQUFJQyxRQUFRLHNCQUFzQkQsU0FBdEIsR0FBa0MsbUJBQWxDLEdBQXdEQSxTQUF4RCxHQUFvRSxXQUFwRSxHQUFrRkEsU0FBbEYsR0FBOEYsZUFBOUYsR0FBZ0hBLFNBQWhILEdBQTRILFdBQTVILEdBQTBJQSxTQUF0Sjs7QUFFQU4sU0FBT1EsV0FBUCxHQUFxQixVQUFVMUcsT0FBVixFQUFtQjs7QUFFcEMsUUFBSTJHLFNBQUo7O0FBRUEsUUFBSSxDQUFDM0csT0FBTCxFQUFjO0FBQ1Y7QUFDQUEsZ0JBQVUyRyxZQUFZbEYsU0FBU21GLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBdEI7QUFDQUQsZ0JBQVVGLEtBQVYsQ0FBZ0JJLE9BQWhCLEdBQTBCLGtCQUFrQkwsU0FBNUM7QUFDQUQsc0JBQWdCTyxZQUFoQixDQUE2QkgsU0FBN0IsRUFBd0NsRixTQUFTc0YsSUFBakQ7QUFDSDs7QUFFRDtBQUNBLFFBQUlDLGNBQWN2RixTQUFTbUYsYUFBVCxDQUF1QixHQUF2QixDQUFsQjtBQUNBSSxnQkFBWVAsS0FBWixDQUFrQkksT0FBbEIsR0FBNEJKLEtBQTVCO0FBQ0F6RyxZQUFRaUgsV0FBUixDQUFvQkQsV0FBcEI7O0FBRUE7QUFDQSxRQUFJeFAsUUFBUXdQLFlBQVlFLFdBQXhCOztBQUVBLFFBQUlQLFNBQUosRUFBZTtBQUNYO0FBQ0FKLHNCQUFnQlksV0FBaEIsQ0FBNEJSLFNBQTVCO0FBQ0gsS0FIRCxNQUlLO0FBQ0Q7QUFDQTNHLGNBQVFtSCxXQUFSLENBQW9CSCxXQUFwQjtBQUNIOztBQUVEO0FBQ0EsV0FBT3hQLEtBQVA7QUFDSCxHQTlCRDtBQStCSCxDQXZDQSxFQXVDQ2lLLFFBdkNELEVBdUNXQSxTQUFTOEUsZUF2Q3BCLENBQUQsQzs7Ozs7Ozs7Ozs7Ozs7O0FDckNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJYSxZQUFZLElBQUlDLFNBQUosQ0FBYyxhQUFkLENBQWhCO0FBQ0EsSUFBSWxQLE1BQU0sSUFBSUMsS0FBSixFQUFWOztBQUVBZ1AsVUFBVUUsRUFBVixDQUFhLFNBQWIsRUFBd0IsVUFBU25ELENBQVQsRUFBWTtBQUNoQzFNLFVBQVFDLEdBQVIsQ0FBWXlNLENBQVo7QUFDSCxDQUZEO0FBR0FpRCxVQUFVRSxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFTbkQsQ0FBVCxFQUFZO0FBQzlCMU0sVUFBUUMsR0FBUixDQUFZeU0sQ0FBWjtBQUNILENBRkQ7O0FBSUE7QUFDQSxJQUFJb0QsZ0JBQWdCLElBQXBCO0FBQ0EsSUFBSXZELGFBQWEsSUFBakI7QUFDQSxJQUFJQyxZQUFZLElBQWhCO0FBQ0EsSUFBSXVELFlBQVksaUVBQWhCO0FBQ0EsSUFBSUMsV0FBVyw0QkFBZjtBQUNBLElBQUlDLFdBQVcsZUFBZjtBQUNBLElBQUkxTyxXQUFXLEVBQWY7QUFDQSxJQUFJbEIsY0FBYyxpRUFBK0QwUCxTQUEvRCxHQUF5RSxhQUEzRjtBQUNBLElBQUl6UCxXQUFXLENBQUMsU0FBRCxFQUFZLGNBQVosRUFBNEIsWUFBNUIsRUFBMEMsVUFBMUMsRUFBc0QsU0FBdEQsRUFDQyxXQURELEVBQ2MsYUFEZCxFQUM2QixTQUQ3QixFQUN3QyxjQUR4QyxFQUN3RCxTQUR4RCxFQUVDLFNBRkQsRUFFWSxRQUZaLEVBRXNCLFNBRnRCLEVBRWlDLFFBRmpDLEVBRTJDLFVBRjNDLEVBRXVELFFBRnZELENBQWY7QUFHQSxJQUFJNFAsZUFBZSxDQUFDLFNBQUQsRUFBWSxjQUFaLEVBQTRCLFlBQTVCLEVBQTBDLFVBQTFDLEVBQXNELFNBQXRELEVBQ0MsV0FERCxFQUNjLGFBRGQsRUFDNkIsU0FEN0IsRUFDd0MsY0FEeEMsRUFDd0QsU0FEeEQsRUFFQyxTQUZELEVBRVksUUFGWixDQUFuQjtBQUdBLElBQUlDLGtCQUFrQixDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFVBQXRCLEVBQWtDLFFBQWxDLENBQXRCO0FBQ0EsSUFBSTVQLFlBQVk7QUFDZCxhQUFXLGNBREc7QUFFZCxjQUFZLFlBRkU7QUFHZCxlQUFhLFlBSEM7QUFJZCxrQkFBZ0IsY0FKRjtBQUtkLGFBQVcsU0FMRztBQU1kLGlCQUFlLGFBTkQ7QUFPZCxhQUFXLFNBUEc7QUFRZCxrQkFBZ0IsY0FSRjtBQVNkLGFBQVcsZUFURztBQVVkLGFBQVcsY0FWRztBQVdkLFlBQVUsVUFYSTtBQVlkLGdCQUFjLFlBWkE7QUFhZCxhQUFXLFNBYkc7QUFjZCxZQUFVLFFBZEk7QUFlZCxjQUFZLFVBZkU7QUFnQmQsWUFBVTtBQWhCSSxDQUFoQjs7QUFtQkEsSUFBR21PLFNBQVMwQixRQUFULEtBQXNCLFdBQXRCLElBQXFDMUIsU0FBUzBCLFFBQVQsS0FBc0IsV0FBOUQsRUFDQTtBQUNFTixrQkFBZ0Isc0RBQWhCO0FBQ0F2RCxlQUFhLHVEQUFiO0FBQ0FDLGNBQVkscURBQVo7QUFDQXlELGFBQVcsWUFBWDtBQUNBRCxhQUFXLHVCQUFYO0FBQ0FELGNBQVksNEJBQVo7QUFDQXhPLGFBQVd5TyxRQUFYO0FBQ0QsQ0FURCxNQVVLLElBQUd0QixTQUFTMEIsUUFBVCxLQUFzQiwyQkFBdEIsSUFBcUQxQixTQUFTMEIsUUFBVCxLQUF1QixxQkFBNUUsSUFBcUcxQixTQUFTQyxJQUFULEtBQW1CLDBDQUEzSCxFQUF1SztBQUMxS21CLGtCQUFnQkUsV0FBU0MsUUFBVCxHQUFrQixpQkFBbEM7QUFDQTFELGVBQWF5RCxXQUFTQyxRQUFULEdBQWtCLGtCQUEvQjtBQUNBekQsY0FBWXdELFdBQVNDLFFBQVQsR0FBa0IsZ0JBQTlCO0FBQ0ExTyxhQUFXeU8sV0FBU0MsUUFBVCxHQUFrQixNQUE3QjtBQUNBO0FBQ0QsQ0FOSSxNQU9BO0FBQ0h6UyxRQUFNLHVDQUFOO0FBQ0FzUyxrQkFBZ0IsRUFBaEI7QUFDQXZELGVBQWEsRUFBYjtBQUNBQyxjQUFZLEVBQVo7QUFDRDs7QUFFRCxJQUFJNkQsc0JBQXNCO0FBQ3RCQyx5QkFBdUIsQ0FERDtBQUV0QkMsMEJBQXdCLENBRkY7QUFHdEJDLG1CQUFpQixDQUhLO0FBSXRCQyx3QkFBc0IsQ0FKQTtBQUt0QkMseUJBQXVCLENBTEQ7QUFNdEJDLDZCQUEyQixDQU5MO0FBT3RCQyxvQkFBa0IsQ0FQSTtBQVF0QkMsb0JBQWtCLENBUkk7QUFTdEJDLG9CQUFrQixDQVRJO0FBVXRCQyxtQkFBaUIsQ0FWSztBQVd0QkMsb0JBQWtCLENBWEk7QUFZdEJDLG1CQUFpQixDQVpLO0FBYXRCQyxxQkFBbUIsQ0FiRztBQWN0QkMsZ0JBQWMsSUFkUTtBQWV0QkMsa0JBQWdCLEVBZk07O0FBaUJ0QkMsaUJBQWUsSUFqQk87QUFrQnRCQyxrQkFBZ0IsSUFsQk07QUFtQnRCQyx1QkFBcUIsRUFuQkM7QUFvQnRCQyxxQkFBbUIsRUFwQkc7QUFxQnRCQyxjQUFZLElBckJVO0FBc0J0QkMsZ0JBQWMsRUF0QlE7QUF1QnRCQyx3QkFBc0IsRUF2QkE7QUF3QnRCQyxzQkFBb0IsRUF4QkU7QUF5QnRCQyxhQUFXLElBekJXO0FBMEJ0QkMsZUFBYSxFQTFCUztBQTJCdEJDLGdCQUFjLElBM0JRO0FBNEJ0QkMsZUFBYSxJQTVCUztBQTZCdEJDLGNBQVksSUE3QlU7QUE4QnRCQyxnQkFBYyxFQTlCUTtBQStCdEJDLGlCQUFlLElBL0JPO0FBZ0N0QkMsbUJBQWlCLEVBaENLO0FBaUN0QkMsc0JBQW9CLEVBakNFO0FBa0N0QkMsa0JBQWdCLElBbENNO0FBbUN0QkMsaUJBQWUsSUFuQ087QUFvQ3RCMVcsa0JBQWdCLElBcENNO0FBcUN0QlQsbUJBQWlCLElBckNLO0FBc0N0Qm9YLG1CQUFpQixJQXRDSztBQXVDdEJDLGtCQUFnQixJQXZDTTtBQXdDdEJyYSxpQkFBZSxJQXhDTztBQXlDdEJzYSxlQUFhLElBekNTO0FBMEN0QmhiLGdCQUFjLElBMUNRO0FBMkN0QmliLHNCQUFvQixJQTNDRTtBQTRDdEJDLHFCQUFtQixJQTVDRztBQTZDdEJDLFlBQVUsSUE3Q1k7QUE4Q3RCQyxnQkFBYyxJQTlDUTs7QUFnRHRCQyxtQkFBaUIsSUFoREs7QUFpRHRCQyxnQkFBYyxJQWpEUTtBQWtEdEJDLGVBQWEsSUFsRFM7QUFtRHRCQyxpQkFBZSxJQW5ETztBQW9EdEJDLGVBQWEsSUFwRFM7O0FBc0R0QjtBQUNBQyxZQUFVLEVBdkRZO0FBd0R0QkMsbUJBQWlCLENBeERLO0FBeUR0QkMscUJBQW1CLENBekRHO0FBMER0QkMsb0JBQWtCLENBMURJO0FBMkR0QmpILFNBQU8sRUEzRGU7QUE0RHRCM0ksUUFBTSxFQTVEZ0I7QUE2RHRCNlAsY0FBWSxJQTdEVTtBQThEdEI7QUFDQTlXLGVBQWE7QUEvRFMsQ0FBMUI7QUFpRUE0RCxTQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUNqQzZQLHNCQUFvQjdQLFdBQVMsVUFBN0IsSUFBMkMsS0FBM0M7QUFDQTZQLHNCQUFvQjdQLFdBQVMsU0FBN0IsSUFBMEMsS0FBMUM7QUFDQTZQLHNCQUFvQjdQLFdBQVMsTUFBN0IsSUFBdUNBLFdBQVMsTUFBaEQ7QUFDQTZQLHNCQUFvQjdQLFdBQVMsa0JBQTdCLElBQW1ELDhCQUE0QkQsVUFBVUMsUUFBVixDQUE1QixHQUFnRCxzQkFBbkc7QUFDQTZQLHNCQUFvQjdQLFdBQVMsZUFBN0IsSUFBZ0RILFdBQWhEO0FBQ0FnUSxzQkFBb0I3UCxXQUFTLGVBQTdCLElBQWdELGNBQWhEO0FBQ0QsQ0FQRDtBQVFBNlAsb0JBQW9Cb0QsZ0JBQXBCLEdBQXVDLElBQXZDO0FBQ0FwRCxvQkFBb0JxRCxpQkFBcEIsR0FBd0MsQ0FBeEM7QUFDQXJELG9CQUFvQkMscUJBQXBCLEdBQTRDLENBQTVDO0FBQ0FELG9CQUFvQkUsc0JBQXBCLEdBQTZDLENBQTdDO0FBQ0E7QUFDQSxJQUFJL1ksVUFBVSxJQUFJbWMsT0FBSixDQUFZO0FBQ3hCQyxNQUFJLGVBRG9CO0FBRXhCQyxZQUFVLGdCQUZjO0FBR3hCM1gsUUFBTW1VO0FBSGtCLENBQVosQ0FBZDs7QUFNQTtBQUNBLElBQUczQixTQUFTMEIsUUFBVCxLQUFzQixXQUF6QixFQUFzQztBQUNwQzVZLFVBQVFVLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLHlCQUFyQjtBQUNBVixVQUFRVSxHQUFSLENBQVksTUFBWixFQUFvQixNQUFwQjtBQUNBVixVQUFRVSxHQUFSLENBQVksVUFBWixFQUF3Qix1REFBeEI7QUFDRDs7QUFFRDtBQUNBLElBQUk0YixhQUFhLDRFQUFqQjtBQUNBLElBQUlDLGFBQWFELFdBQVczWCxJQUFYLENBQWdCLGtHQUFBbVMsR0FBYW5CLElBQTdCLENBQWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJNkcsZUFBZXhjLFFBQVF5YyxPQUFSLENBQWdCLFVBQWhCLEVBQTRCLFVBQVNDLFFBQVQsRUFBbUJDLFFBQW5CLEVBQThCOztBQUsxRSxNQUFJbFksUUFBUSxXQUFaO0FBQ0QsTUFBSTFELFFBQVEwRCxNQUFNRSxJQUFOLENBQVcrWCxRQUFYLENBQVo7QUFDQSxNQUFHM2IsS0FBSCxFQUNBO0FBQ0UsU0FBS0wsR0FBTCxDQUFTLE1BQVQsRUFBaUJLLE1BQU0sQ0FBTixDQUFqQjtBQUNEO0FBQ0Q7QUFDQTtBQUNBO0FBRUMsQ0FmZ0IsRUFnQmpCLEVBQUM2YixNQUFNLEtBQVA7QUFDQ0MsU0FBTztBQURSLENBaEJpQixDQUFuQjs7QUFvQkE7QUFDQTdjLFFBQVF5YyxPQUFSLENBQWlCLGtCQUFqQixFQUFxQyxVQUFXbFUsS0FBWCxFQUFtQjtBQUN0RCxNQUFJdVUsYUFBYTljLFFBQVE2RCxHQUFSLENBQVksaUJBQVosQ0FBakI7QUFDQSxNQUFJa1osWUFBWS9jLFFBQVE2RCxHQUFSLENBQVksbUJBQVosQ0FBaEI7QUFDQSxNQUFHMEUsUUFBUXVVLFVBQVgsRUFDQTtBQUNFOWMsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDb2MsVUFBaEM7QUFDRDtBQUNELE1BQUd2VSxTQUFTd1UsU0FBWixFQUNBO0FBQ0UvYyxZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0NxYyxZQUFVLENBQTFDO0FBQ0Q7QUFDRixDQVhEO0FBWUEvYyxRQUFReWMsT0FBUixDQUFpQixtQkFBakIsRUFBc0MsVUFBV2xVLEtBQVgsRUFBbUI7QUFDdkQsTUFBSXlVLFdBQVdoZCxRQUFRNkQsR0FBUixDQUFZLGtCQUFaLENBQWY7QUFDQSxNQUFHMEUsUUFBUSxDQUFYLEVBQ0E7QUFDRXZJLFlBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNEO0FBQ0QsTUFBRzZILFNBQVN5VSxRQUFaLEVBQ0E7QUFDRWhkLFlBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ3NjLFdBQVMsQ0FBMUM7QUFDRDtBQUNGLENBVkQ7O0FBWUE7QUFDQTtBQUNBaGQsUUFBUXFZLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVNsTSxJQUFULEVBQWU4USxRQUFmLEVBQXdCO0FBQ2pEelUsVUFBUUMsR0FBUixDQUFZLDZCQUFaO0FBQ0EsTUFBSXVMLE1BQU1lLGFBQWEvVSxRQUFRNkQsR0FBUixDQUFZLFlBQVosQ0FBdkI7QUFDQXFaLFVBQVFDLFNBQVIsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEIsRUFBNEIxRSxXQUFTLFNBQVQsR0FBbUJ6WSxRQUFRNkQsR0FBUixDQUFZLFlBQVosQ0FBL0M7QUFDQSxNQUFHb1osUUFBSCxFQUFZO0FBQ1Z0RyxJQUFBLG1IQUFBQSxDQUE0QjNXLE9BQTVCO0FBQ0Q7QUFDRCxNQUFJb2QsV0FBV0MsWUFBWSxZQUFVO0FBQ25DLFFBQUlDLFFBQVEsd0dBQUF2SixDQUFhQyxHQUFiLEVBQWtCLEtBQWxCLEVBQXlCLEVBQXpCLENBQVo7QUFDQSxRQUFJM0ssaUJBQWlCLEVBQXJCOztBQUVBLFFBQUdpVSxNQUFNQyxLQUFOLEtBQWdCLFVBQW5CLEVBQ0E7QUFDRS9VLGNBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLFVBQUlvTixjQUFjeUgsTUFBTXpILFdBQXhCO0FBQ0FBLGtCQUFZeFYsT0FBWixDQUFvQixVQUFTcUUsSUFBVCxFQUFjO0FBQzlCO0FBQ0EwRSxRQUFBLDBIQUFBQSxDQUF1QjFFLElBQXZCLEVBQTZCMkUsY0FBN0IsRUFBNkNQLFFBQTdDLEVBQXVEQyxTQUF2RDtBQUNBZSxRQUFBLGtIQUFBQSxDQUFlOUosT0FBZixFQUF3QjBFLElBQXhCLEVBQThCcUYsUUFBOUIsRUFBd0NiLEdBQXhDLEVBQTZDRyxjQUE3QyxFQUE2RE4sU0FBN0Q7QUFFSCxPQUxEO0FBTUFtSixNQUFBLHVIQUFBQSxDQUFvQmxTLE9BQXBCLEVBQTZCcUosY0FBN0I7O0FBRUFtVSxvQkFBY0osUUFBZDtBQUNEO0FBQ0QsUUFBR0UsTUFBTUMsS0FBTixLQUFnQixPQUFoQixJQUEyQkQsTUFBTUMsS0FBTixLQUFnQixPQUE5QyxFQUNBO0FBQ0UsVUFBSUUscUJBQXFCSCxNQUFNekgsV0FBTixDQUFrQixDQUFsQixFQUFxQjZILFlBQTlDO0FBQ0ExWCxZQUFNLGdDQUNBLGtGQURBLEdBQ21GeVgsa0JBRHpGO0FBRUVELG9CQUFjSixRQUFkO0FBQ0g7QUFDRixHQXpCYyxFQXlCWixJQXpCWSxDQUFmO0FBMkJELENBbENELEVBa0NFLEVBQUNSLE1BQU0sS0FBUDtBQUNDQyxTQUFPO0FBRFIsQ0FsQ0Y7O0FBdUNBO0FBQ0E3YyxRQUFRcVksRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBVXNGLE9BQVYsRUFBbUI7QUFDckMsTUFBSWhJLE9BQU8zVixRQUFRNkQsR0FBUixDQUFZLFlBQVosQ0FBWDtBQUNBcUYsTUFBSTBVLGFBQUosQ0FBa0IsRUFBQ3JXLE1BQUssTUFBTixFQUFsQixFQUFpQ3NXLElBQWpDLENBQXNDLFVBQVVDLElBQVYsRUFBZ0I7QUFDbERDLFdBQU9ELElBQVAsRUFBYW5JLE9BQUssTUFBbEI7QUFDSCxHQUZEO0FBR0gsQ0FMRDs7QUFPQTNWLFFBQVFxWSxFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTMkYsS0FBVCxFQUFnQjtBQUN6QyxNQUFJQyxNQUFNamUsUUFBUTZELEdBQVIsQ0FBWSxrQkFBWixDQUFWO0FBQ0EsTUFBR29hLEdBQUgsRUFBTztBQUNMamUsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0QsR0FGRCxNQUlBO0FBQ0VWLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNEO0FBQ0YsQ0FURDtBQVVBVixRQUFRcVksRUFBUixDQUFXLGNBQVgsRUFBMkIsVUFBUzJGLEtBQVQsRUFBZ0I7QUFDekMsTUFBSUMsTUFBTWplLFFBQVE2RCxHQUFSLENBQVksa0JBQVosQ0FBVjtBQUNBLE1BQUdvYSxHQUFILEVBQU87QUFDTGplLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNELEdBRkQsTUFJQTtBQUNFVixZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRDtBQUNGLENBVEQ7QUFVQVYsUUFBUXFZLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVMyRixLQUFULEVBQWdCO0FBQ3pDLE1BQUlDLE1BQU1qZSxRQUFRNkQsR0FBUixDQUFZLGtCQUFaLENBQVY7QUFDQSxNQUFHb2EsR0FBSCxFQUFPO0FBQ0xqZSxZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRCxHQUZELE1BSUE7QUFDRVYsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0Q7QUFDRixDQVREO0FBVUFWLFFBQVFxWSxFQUFSLENBQVcsYUFBWCxFQUEwQixVQUFTMkYsS0FBVCxFQUFnQjtBQUN4QyxNQUFJQyxNQUFNamUsUUFBUTZELEdBQVIsQ0FBWSxpQkFBWixDQUFWO0FBQ0EsTUFBR29hLEdBQUgsRUFBTztBQUNMamUsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0QsR0FGRCxNQUlBO0FBQ0VWLFlBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNEO0FBQ0YsQ0FURDtBQVVBVixRQUFRcVksRUFBUixDQUFXLGNBQVgsRUFBMkIsVUFBUzJGLEtBQVQsRUFBZ0I7QUFDekMsTUFBSUMsTUFBTWplLFFBQVE2RCxHQUFSLENBQVksa0JBQVosQ0FBVjtBQUNBLE1BQUdvYSxHQUFILEVBQU87QUFDTGplLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNELEdBRkQsTUFJQTtBQUNFVixZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRDtBQUNGLENBVEQ7QUFVQVYsUUFBUXFZLEVBQVIsQ0FBVyxhQUFYLEVBQTBCLFVBQVMyRixLQUFULEVBQWdCO0FBQ3hDLE1BQUlDLE1BQU1qZSxRQUFRNkQsR0FBUixDQUFZLGlCQUFaLENBQVY7QUFDQSxNQUFHb2EsR0FBSCxFQUFPO0FBQ0xqZSxZQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDRCxHQUZELE1BSUE7QUFDRVYsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0Q7QUFDRixDQVREO0FBVUFWLFFBQVFxWSxFQUFSLENBQVcsZUFBWCxFQUE0QixVQUFTMkYsS0FBVCxFQUFnQjtBQUMxQyxNQUFJQyxNQUFNamUsUUFBUTZELEdBQVIsQ0FBWSxtQkFBWixDQUFWO0FBQ0EsTUFBR29hLEdBQUgsRUFBTztBQUNMamUsWUFBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLENBQWpDO0FBQ0QsR0FGRCxNQUlBO0FBQ0VWLFlBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNEO0FBQ0YsQ0FURDtBQVVBO0FBQ0E7QUFDQVYsUUFBUXFZLEVBQVIsQ0FBWSxpQkFBWixFQUErQixVQUFXMkYsS0FBWCxFQUFtQjtBQUNoRGhlLFVBQVFVLEdBQVIsQ0FBYSx3QkFBYixFQUF1QyxJQUF2QztBQUNBVixVQUFRVSxHQUFSLENBQWEsd0JBQWIsRUFBdUMsQ0FBdkM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLENBQWpDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FvSSxXQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUMvQixRQUFJa1YsVUFBVSxLQUFkO0FBQ0EsUUFBR2xWLGFBQWEsU0FBaEIsRUFBMEI7QUFBQ2tWLGdCQUFVLElBQVY7QUFBZ0I7QUFDM0NsZSxZQUFRVSxHQUFSLENBQWFzSSxXQUFTLFVBQXRCLEVBQWtDa1YsT0FBbEM7QUFDSCxHQUpEO0FBS0FsZSxVQUFRVSxHQUFSLENBQWEsdUJBQWIsRUFBc0MsSUFBdEM7QUFDQVYsVUFBUVUsR0FBUixDQUFhLHVCQUFiLEVBQXNDLENBQXRDO0FBQ0QsQ0FqQkQ7O0FBbUJBVixRQUFRcVksRUFBUixDQUFZLGtCQUFaLEVBQWdDLFVBQVcyRixLQUFYLEVBQW1CO0FBQ2pEaGUsVUFBUVUsR0FBUixDQUFhLHVCQUFiLEVBQXNDLElBQXRDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxDQUF0QztBQUNBVixVQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsQ0FBakM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBVixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRW9JLFdBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQWtCO0FBQ2pDaEosWUFBUVUsR0FBUixDQUFhc0ksV0FBUyxVQUF0QixFQUFrQyxLQUFsQztBQUNILEdBRkM7QUFHRmhKLFVBQVFVLEdBQVIsQ0FBYSx3QkFBYixFQUF1QyxJQUF2QztBQUNBVixVQUFRVSxHQUFSLENBQWEsd0JBQWIsRUFBdUMsQ0FBdkM7QUFDRCxDQWZEOztBQWlCQVYsUUFBUXFZLEVBQVIsQ0FBWSxrQkFBWixFQUFnQyxVQUFXMkYsS0FBWCxFQUFtQjtBQUNqRHJWLEVBQUEsOEdBQUFBLENBQVcsQ0FBWCxFQUFjM0ksT0FBZDtBQUNELENBRkQ7O0FBSUE7QUFDQThJLFNBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQW1CekksQ0FBbkIsRUFBcUI7QUFDcENpSSxVQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQXpJLFVBQVFxWSxFQUFSLENBQVdyUCxXQUFTLFNBQXBCLEVBQStCLFVBQVVnVixLQUFWLEVBQWlCO0FBQzlDclYsSUFBQSw4R0FBQUEsQ0FBV3BJLElBQUUsQ0FBYixFQUFnQlAsT0FBaEI7QUFDQSxRQUFHZ0osYUFBYSxTQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksZUFBWixDQUFILEVBQ0E7QUFDRTBCLGNBQU1nRSxPQUFOLENBQWN2SixRQUFRNkQsR0FBUixDQUFZLGVBQVosQ0FBZCxFQUE0QyxjQUE1QyxFQUE0RCxFQUFDNEIsUUFBUSxxQkFBVCxFQUFnQ0MsZUFBZSxDQUEvQyxFQUE1RDtBQUNEO0FBQ0Y7QUFDRCxRQUFHc0QsYUFBYSxVQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksZ0JBQVosQ0FBSCxFQUNBO0FBQ0UwQixjQUFNZSxrQkFBTixDQUF5QnRHLFFBQVE2RCxHQUFSLENBQVksZ0JBQVosQ0FBekIsRUFBd0QsS0FBeEQsRUFBK0QsQ0FBQyxXQUFELENBQS9ELEVBQThFLENBQUMsT0FBRCxDQUE5RSxFQUEwRixhQUExRixFQUF5RyxFQUFDNEIsUUFBUSxlQUFULEVBQTBCYyxXQUFXLE1BQXJDLEVBQTZDQyxVQUFVLEdBQXZELEVBQTREZCxlQUFlLENBQTNFLEVBQThFQyxPQUFPLEtBQXJGLEVBQTRGQyxpQkFBaUIsR0FBN0csRUFBa0hDLE9BQU8sR0FBekgsRUFBOEhDLFFBQVEsR0FBdEksRUFBMklDLGtCQUFrQixHQUE3SixFQUF6RztBQUNEO0FBQ0Y7QUFDRCxRQUFHaUQsYUFBYSxTQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksb0JBQVosRUFBa0NwRCxNQUFyQyxFQUNBO0FBQ0UsWUFBSXNPLFFBQVEvTyxRQUFRNkQsR0FBUixDQUFZLG9CQUFaLENBQVo7QUFDQTJLLFFBQUEscUhBQUFBLENBQWtCTyxNQUFNLENBQU4sQ0FBbEIsRUFBNEIsZ0JBQTVCLEVBQThDLElBQTlDO0FBQ0Q7QUFDRjtBQUNELFFBQUcvRixhQUFhLFNBQWhCLEVBQ0E7QUFDRSxVQUFHaEosUUFBUTZELEdBQVIsQ0FBWSxhQUFaLEVBQTJCcEQsTUFBOUIsRUFDQTtBQUNFLFlBQUkwZCxVQUFVbmUsUUFBUTZELEdBQVIsQ0FBWSxhQUFaLENBQWQ7QUFDQTJLLFFBQUEscUhBQUFBLENBQWtCMlAsT0FBbEIsRUFBMkIsZ0JBQTNCLEVBQTZDLEtBQTdDO0FBQ0Q7QUFDRjtBQUNELFFBQUduVixhQUFhLFFBQWhCLEVBQ0E7QUFDRSxVQUFHaEosUUFBUTZELEdBQVIsQ0FBWSxvQkFBWixFQUFrQ3BELE1BQXJDLEVBQ0E7QUFDRSxZQUFJMmQsY0FBY3BlLFFBQVE2RCxHQUFSLENBQVksb0JBQVosQ0FBbEI7QUFDQSxZQUFJd2EsYUFBYXJlLFFBQVE2RCxHQUFSLENBQVksbUJBQVosQ0FBakI7QUFDQTJLLFFBQUEscUhBQUFBLENBQWtCNFAsV0FBbEIsRUFBK0IsdUJBQS9CLEVBQXdELEtBQXhEO0FBQ0E1UCxRQUFBLHFIQUFBQSxDQUFrQjZQLFVBQWxCLEVBQStCLHNCQUEvQixFQUF1RCxLQUF2RDtBQUNEO0FBQ0Y7QUFDRCxRQUFHclYsYUFBYSxVQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksY0FBWixFQUE0QnBELE1BQS9CLEVBQ0E7QUFDRyxZQUFJNmEsZUFBZXRiLFFBQVE2RCxHQUFSLENBQVksY0FBWixDQUFuQjtBQUNBMkssUUFBQSxxSEFBQUEsQ0FBa0I4TSxZQUFsQixFQUFnQyxpQkFBaEMsRUFBbUQsS0FBbkQ7QUFDRjtBQUNGO0FBQ0YsR0FsREQ7QUFvREQsQ0F0REQ7O0FBd0RBdGIsUUFBUXFZLEVBQVIsQ0FBWSxtQkFBWixFQUFpQyxVQUFXMkYsS0FBWCxFQUFtQjtBQUNsRHhWLFVBQVFDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLE1BQUk4VSxRQUFRdmQsUUFBUTZELEdBQVIsQ0FBWSwyQkFBWixDQUFaOztBQUVBLE1BQUcwWixVQUFVLENBQWIsRUFBZTtBQUNidmQsWUFBUVUsR0FBUixDQUFhLDJCQUFiLEVBQTBDLENBQTFDO0FBQ0QsR0FGRCxNQUdJO0FBQ0ZWLFlBQVFVLEdBQVIsQ0FBYSwyQkFBYixFQUEwQyxDQUExQztBQUNEO0FBQ0YsQ0FWRDs7QUFZQTtBQUNBVixRQUFRcVksRUFBUixDQUFXLFFBQVgsRUFBcUIsVUFBUzJGLEtBQVQsRUFBZ0I7QUFDbkMsTUFBSU0sYUFBYSxLQUFqQjtBQUNBOVYsVUFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0EsTUFBSS9CLE1BQU0sS0FBSzdDLEdBQUwsQ0FBUyxVQUFULENBQVY7QUFDQTZDLFFBQU1BLElBQUkwQixPQUFKLENBQVksU0FBWixFQUF1QixFQUF2QixFQUEyQm1XLFdBQTNCLEVBQU47QUFDQTdYLFFBQU1BLElBQUkwQixPQUFKLENBQVksUUFBWixFQUFxQixFQUFyQixDQUFOO0FBQ0FwSSxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JnRyxJQUFJakcsTUFBbkM7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDZ0csSUFBSWpHLE1BQXBDO0FBQ0FULFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCZ0csR0FBeEI7O0FBRUEsTUFBSXlGLE9BQU8sS0FBS3RJLEdBQUwsQ0FBUyxNQUFULENBQVg7QUFDQSxNQUFJaVIsUUFBUSxLQUFLalIsR0FBTCxDQUFTLE9BQVQsQ0FBWjtBQUNBLE1BQUkyYSxlQUFlLEVBQW5CO0FBQ0EsTUFBSUMsY0FBYyxLQUFsQjtBQUNBLE1BQUl4QixXQUFXLEtBQWY7QUFDQW5VLFdBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQWtCO0FBQ2pDd1YsaUJBQWF4VixXQUFTLE1BQXRCLElBQWdDaEosUUFBUTZELEdBQVIsQ0FBWW1GLFdBQVMsTUFBckIsQ0FBaEM7QUFDQXdWLGlCQUFheFYsV0FBUyxVQUF0QixJQUFvQ2hKLFFBQVE2RCxHQUFSLENBQVltRixXQUFTLFVBQXJCLENBQXBDO0FBQ0EsUUFBR3dWLGFBQWF4VixXQUFTLFVBQXRCLEtBQXFDMlAsZ0JBQWdCL1QsUUFBaEIsQ0FBeUJvRSxRQUF6QixDQUF4QyxFQUNBO0FBQ0V5VixvQkFBYyxJQUFkO0FBQ0Q7QUFDRCxRQUFHRCxhQUFheFYsV0FBUyxVQUF0QixLQUFxQzBQLGFBQWE5VCxRQUFiLENBQXNCb0UsUUFBdEIsQ0FBeEMsRUFDQTtBQUNFaVUsaUJBQVcsSUFBWDtBQUNEO0FBRUYsR0FaRDs7QUFjQSxNQUFJM0ssZUFBZSx1SEFBQUQsRUFBbkI7QUFDQTtBQUNBLE1BQUdtTSxhQUFhRSxlQUFiLElBQWdDRixhQUFhRyxlQUFoRCxFQUNBO0FBQ0UsUUFBSUMscUJBQXFCQyxrQkFBa0J2TSxhQUFhTSxvQkFBL0IsQ0FBekI7QUFDQSxRQUFJa00scUJBQXFCRCxrQkFBa0J2TSxhQUFhTyxvQkFBL0IsQ0FBekI7QUFDQSxRQUFHK0wsc0JBQXNCRSxrQkFBekIsRUFDQTtBQUNFUixtQkFBWSxJQUFaO0FBQ0gsS0FIQyxNQUlJO0FBQ0Z0WSxZQUFNLDBGQUFOO0FBQ0Q7QUFDRixHQVhELE1BWUk7QUFDRnNZLGlCQUFXLElBQVg7QUFDRDtBQUNELE1BQUdyQixZQUFZd0IsV0FBZixFQUNBO0FBQ0V6WSxVQUFNLDhEQUFOO0FBQ0FzWSxpQkFBYSxLQUFiO0FBQ0Q7QUFDRCxNQUFHQSxVQUFILEVBQ0E7QUFDRTlWLFlBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsUUFBR3dVLFFBQUgsRUFDQTtBQUNFOEIsTUFBQSwwR0FBQUEsQ0FBcUIvZSxPQUFyQixFQUE4QjBHLEdBQTlCLEVBQW1DeUYsSUFBbkMsRUFBeUMySSxLQUF6QyxFQUFnREMsVUFBaEQsRUFBNERDLFNBQTVELEVBQXVFd0osWUFBdkUsRUFBcUYxVixRQUFyRixFQUErRkMsU0FBL0YsRUFBMEd1SixZQUExRyxFQUF3SDJLLFFBQXhILEVBQWtJd0IsV0FBbEk7QUFDRDtBQUNELFFBQUdBLFdBQUgsRUFDQTtBQUNFLFVBQUlPLFVBQVUsSUFBZDtBQUNBLFVBQUlDLFVBQVUsRUFBZDtBQUNBLFVBQUc7QUFDRkQsa0JBQVV4TSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQVY7QUFDQSxZQUFJeFMsT0FBTytlLFFBQVFFLEtBQVIsQ0FBYyxDQUFkLENBQVg7QUFDQSxZQUFJQyxLQUFLLElBQUlDLFVBQUosRUFBVDtBQUNBRCxXQUFHRSxVQUFILENBQWNwZixJQUFkO0FBQ0FrZixXQUFHRyxNQUFILEdBQVksVUFBU3BLLENBQVQsRUFBWTtBQUN2QitKLG9CQUFVRSxHQUFHSSxNQUFiO0FBQ0FSLFVBQUEsMEdBQUFBLENBQXFCL2UsT0FBckIsRUFBOEJpZixPQUE5QixFQUF1QzlTLElBQXZDLEVBQTZDMkksS0FBN0MsRUFBb0RDLFVBQXBELEVBQWdFQyxTQUFoRSxFQUEyRXdKLFlBQTNFLEVBQXlGMVYsUUFBekYsRUFBbUdDLFNBQW5HLEVBQThHdUosWUFBOUcsRUFBNEgySyxRQUE1SCxFQUFzSXdCLFdBQXRJO0FBQ0MsU0FIRjtBQUlBLE9BVEQsQ0FVQSxPQUFNL0wsR0FBTixFQUFXO0FBQ1R1TSxrQkFBVSxFQUFWO0FBQ0F6VyxnQkFBUUMsR0FBUixDQUFZaUssR0FBWjtBQUNEO0FBQ0Y7QUFDRjtBQUNEc0wsUUFBTXdCLFFBQU4sQ0FBZUMsY0FBZjtBQUNELENBL0VEOztBQWlGQTtBQUNBO0FBQ0F6ZixRQUFRcVksRUFBUixDQUFXLFVBQVgsRUFBdUIsVUFBUzJGLEtBQVQsRUFBZ0I7QUFDckN4VixVQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxNQUFJaVgsUUFBUTFmLFFBQVE2RCxHQUFSLENBQVksbUJBQVosQ0FBWjtBQUNBLE1BQUk4YixPQUFPM2YsUUFBUTZELEdBQVIsQ0FBWSxrQkFBWixDQUFYO0FBQ0EsTUFBSStYLFdBQVc1YixRQUFRNkQsR0FBUixDQUFZLFVBQVosQ0FBZjtBQUNBLE1BQUkrYixjQUFjaEUsU0FBUy9ULFNBQVQsQ0FBbUI2WCxRQUFNLENBQXpCLEVBQTRCQyxJQUE1QixDQUFsQjtBQUNBLE1BQUl4VCxPQUFPLEtBQUt0SSxHQUFMLENBQVMsTUFBVCxJQUFpQixNQUE1QjtBQUNBLE1BQUlpUixRQUFRLEtBQUtqUixHQUFMLENBQVMsT0FBVCxDQUFaO0FBQ0E3RCxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JrZixZQUFZbmYsTUFBM0M7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDa2YsWUFBWW5mLE1BQTVDO0FBQ0FULFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCa2YsV0FBeEI7QUFDQTVmLFVBQVFVLEdBQVIsQ0FBWSxNQUFaLEVBQW9CeUwsSUFBcEI7QUFDQSxNQUFJcVMsZUFBZSxFQUFuQjtBQUNBMVYsV0FBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDakN3VixpQkFBYXhWLFdBQVMsTUFBdEIsSUFBZ0NoSixRQUFRNkQsR0FBUixDQUFZbUYsV0FBUyxNQUFyQixDQUFoQztBQUNBd1YsaUJBQWF4VixXQUFTLFVBQXRCLElBQW9DaEosUUFBUTZELEdBQVIsQ0FBWW1GLFdBQVMsVUFBckIsQ0FBcEM7QUFDRCxHQUhEO0FBSUE7QUFDQUosRUFBQSxrSEFBQUEsQ0FBZTVJLE9BQWYsRUFBd0I2SSxXQUF4QixFQUFxQ0MsUUFBckMsRUFBK0NDLFNBQS9DO0FBQ0E7QUFDQTtBQUNBLE1BQUl1SixlQUFlLHVIQUFBRCxFQUFuQjtBQUNBME0sRUFBQSwwR0FBQUEsQ0FBcUIvZSxPQUFyQixFQUE4QjRmLFdBQTlCLEVBQTJDelQsSUFBM0MsRUFBaUQySSxLQUFqRCxFQUF3REMsVUFBeEQsRUFBb0VDLFNBQXBFLEVBQStFd0osWUFBL0UsRUFBNkYxVixRQUE3RixFQUF1R0MsU0FBdkcsRUFBa0gsSUFBbEgsRUFBd0gsS0FBeEg7QUFDQTtBQUNBO0FBQ0FpVixRQUFNd0IsUUFBTixDQUFlQyxjQUFmO0FBQ0QsQ0ExQkQ7O0FBNEJBLFNBQVNaLGlCQUFULENBQTJCZ0IsS0FBM0IsRUFDQTtBQUNFLE1BQUdBLFVBQVUsYUFBYixFQUNBO0FBQ0UsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxrR0FBQS9JLEdBQWFuQixJQUFiLElBQXFCNEcsVUFBeEIsRUFDQTtBQUNFL1QsVUFBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0ErVCxlQUFhc0QsTUFBYjtBQUNBOWYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBSEYsQ0FHeUM7QUFDdkNWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksWUFBWixFQUEwQixrR0FBQW9XLEdBQWFuQixJQUF2QztBQUNBLE1BQUlvSyxnQkFBZ0IsNkdBQUFySyxDQUFrQixrR0FBQW9CLEdBQWFuQixJQUEvQixFQUFxQ1osVUFBckMsRUFBaURoTCxRQUFqRCxFQUEyRC9KLE9BQTNELENBQXBCO0FBQ0EsTUFBSWlkLFdBQVcsSUFBZjtBQUNBLE1BQUc4QyxjQUFjaEssSUFBZCxDQUFtQm5SLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsY0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsWUFBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBakM7QUFDQVYsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsVUFBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHcWYsY0FBY2hLLElBQWQsQ0FBbUJuUixRQUFuQixDQUE0QixTQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQztBQUNBVixZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHcWYsY0FBY2hLLElBQWQsQ0FBbUJuUixRQUFuQixDQUE0QixXQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQztBQUNBVixZQUFRVSxHQUFSLENBQVksdUJBQVosRUFBcUMsQ0FBckM7QUFDSDtBQUNELE1BQUdxZixjQUFjaEssSUFBZCxDQUFtQm5SLFFBQW5CLENBQTRCLGFBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsY0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBVixZQUFRVSxHQUFSLENBQVksdUJBQVosRUFBcUMsRUFBckM7QUFDSDtBQUNELE1BQUdxZixjQUFjaEssSUFBZCxDQUFtQm5SLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxJQUFuQztBQUNBVixZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0g7QUFDRCxNQUFHcWYsY0FBY2hLLElBQWQsQ0FBbUJuUixRQUFuQixDQUE0QixRQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNIO0FBQ0QsTUFBR3FmLGNBQWNoSyxJQUFkLENBQW1CblIsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0F1YyxlQUFXLEtBQVg7QUFDSDtBQUNELE1BQUc4QyxjQUFjaEssSUFBZCxDQUFtQm5SLFFBQW5CLENBQTRCLFFBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0F1YyxlQUFXLEtBQVg7QUFDSDtBQUNELE1BQUc4QyxjQUFjaEssSUFBZCxDQUFtQm5SLFFBQW5CLENBQTRCLFVBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBdWMsZUFBVyxLQUFYO0FBQ0g7QUFDRCxNQUFHOEMsY0FBY2hLLElBQWQsQ0FBbUJuUixRQUFuQixDQUE0QixRQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBdWMsZUFBVyxLQUFYO0FBQ0g7QUFDRGpkLFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXVCcWYsY0FBY3JaLEdBQXJDO0FBQ0ExRyxVQUFRVSxHQUFSLENBQVksT0FBWixFQUFvQnFmLGNBQWNqTCxLQUFsQztBQUNBOVUsVUFBUVUsR0FBUixDQUFZLE1BQVosRUFBbUJxZixjQUFjNVQsSUFBakM7QUFDQSxNQUFJekYsTUFBTTFHLFFBQVE2RCxHQUFSLENBQVksVUFBWixDQUFWO0FBQ0E3RCxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JnRyxJQUFJakcsTUFBbkM7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDZ0csSUFBSWpHLE1BQXBDO0FBQ0FULFVBQVF5VixJQUFSLENBQWEsY0FBYixFQUE2QndILFFBQTdCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDTyxTQUFTK0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWlDQyxNQUFqQyxFQUF3Q0MsS0FBeEMsRUFBK0M7QUFDcEQsTUFBSW5NLE1BQU1lLGFBQVcvVSxRQUFRNkQsR0FBUixDQUFZLFlBQVosQ0FBckI7QUFDQW9ULFNBQU9tSixJQUFQLENBQVksT0FBSzNILFFBQUwsR0FBYyxZQUFkLEdBQTJCMU8sUUFBM0IsR0FBb0NtVyxNQUFwQyxHQUEyQyxPQUEzQyxHQUFtRG5XLFFBQW5ELEdBQTREa1csTUFBeEUsRUFBZ0YsRUFBaEYsRUFBb0Ysc0JBQXBGO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTSSxVQUFULENBQW9CSixNQUFwQixFQUE0QjFZLElBQTVCLEVBQWtDOztBQUV2QyxNQUFJeU0sTUFBTWUsYUFBVy9VLFFBQVE2RCxHQUFSLENBQVksWUFBWixDQUFyQjtBQUNBLE1BQUl5YyxVQUFVdGdCLFFBQVE2RCxHQUFSLENBQVksY0FBWixDQUFkO0FBQ0EsTUFBR3ljLFlBQVksTUFBSSxHQUFKLEdBQVEsR0FBUixHQUFZLEdBQVosR0FBZ0IsR0FBaEIsR0FBb0IsR0FBcEIsR0FBd0IsR0FBeEIsR0FBNEIsR0FBNUIsR0FBZ0MsR0FBaEMsR0FBb0MsR0FBcEMsR0FBd0MsR0FBdkQsRUFDQTtBQUNFO0FBQ0FySixXQUFPbUosSUFBUCxDQUFZLE9BQUszSCxRQUFMLEdBQWMsbUJBQWQsR0FBa0NsUixJQUFsQyxHQUF1QyxPQUF2QyxHQUErQ3dDLFFBQS9DLEdBQXdEa1csTUFBcEUsRUFBNEUsRUFBNUUsRUFBZ0Ysc0JBQWhGO0FBQ0QsR0FKRCxNQU1BO0FBQ0VqYSxVQUFNLDZCQUEyQixHQUEzQixHQUErQixHQUEvQixHQUFtQyxHQUFuQyxHQUF1QyxHQUF2QyxHQUEyQyxHQUEzQyxHQUErQyxHQUEvQyxHQUFtRCxlQUF6RDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDTyxTQUFTdWEsV0FBVCxDQUFxQkMsVUFBckIsRUFDUDtBQUNFQSxlQUFhQSxhQUFXLENBQXhCO0FBQ0EsTUFBSXpSLFFBQVEvTyxRQUFRNkQsR0FBUixDQUFZLG9CQUFaLENBQVo7QUFDQTJLLEVBQUEscUhBQUFBLENBQWtCTyxNQUFNeVIsVUFBTixDQUFsQixFQUFxQyxnQkFBckMsRUFBdUQsSUFBdkQ7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUN0dUJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ08sU0FBU3pCLG9CQUFULENBQThCL2UsT0FBOUIsRUFBdUMwRSxJQUF2QyxFQUE2Q3lILElBQTdDLEVBQW1EMkksS0FBbkQsRUFBMERDLFVBQTFELEVBQXNFQyxTQUF0RSxFQUFpRndKLFlBQWpGLEVBQStGMVYsUUFBL0YsRUFBeUdDLFNBQXpHLEVBQW9IdUosWUFBcEgsRUFBa0kySyxRQUFsSSxFQUE0SXdCLFdBQTVJLEVBQ1A7QUFDRTtBQUNBLE1BQUlnQyxnQkFBYyxJQUFsQjtBQUNBLE1BQUlDLGFBQWEsRUFBakI7QUFDQTs7QUFFQSxNQUFJQyxhQUFhLEVBQWpCO0FBQ0E3WCxXQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUNqQzJYLGVBQVdyZixJQUFYLENBQWdCa2QsYUFBYXhWLFdBQVMsVUFBdEIsQ0FBaEI7QUFDRCxHQUZEOztBQUlBLE1BQUdpVSxRQUFILEVBQVk7QUFDVndELG9CQUFnQkcsZ0JBQWdCbGMsSUFBaEIsRUFBc0J5SCxJQUF0QixFQUE0QjJJLEtBQTVCLEVBQW1DNkwsVUFBbkMsQ0FBaEI7QUFDRDtBQUNELE1BQUdsQyxXQUFILEVBQWU7QUFDYmdDLG9CQUFnQkksbUJBQW1CbmMsSUFBbkIsRUFBeUJ5SCxJQUF6QixFQUErQjJJLEtBQS9CLEVBQXNDNkwsVUFBdEMsQ0FBaEI7QUFDRDtBQUNELE1BQUdGLGNBQWNoZ0IsTUFBZCxHQUF1QixDQUExQixFQUNBO0FBQ0VULFlBQVFVLEdBQVIsQ0FBWSxZQUFaLEVBQTBCK2YsYUFBMUI7QUFDQXphLFVBQU0sZ0JBQWN5YSxhQUFwQjtBQUNELEdBSkQsTUFLSztBQUNIO0FBQ0EsUUFBSXZNLFdBQVcsSUFBZjtBQUNBbFUsWUFBUVUsR0FBUixDQUFhLGlCQUFiLEVBQWdDLElBQWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0FvSSxhQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUMvQixVQUFHd1YsYUFBYXhWLFdBQVMsVUFBdEIsTUFBc0MsSUFBekMsRUFDQTtBQUNJMFgscUJBQWFBLFdBQVd0TyxNQUFYLENBQWtCcEosV0FBUyxHQUEzQixDQUFiO0FBQ0FoSixnQkFBUVUsR0FBUixDQUFZc0ksV0FBUyxTQUFyQixFQUFnQyxJQUFoQztBQUNBLFlBQUdBLGFBQWEsY0FBYixJQUErQkEsYUFBYSxVQUE1QyxJQUNBQSxhQUFhLFNBRGIsSUFDMEJBLGFBQWEsY0FEdkMsSUFFQUEsYUFBYSxTQUZiLElBRTBCQSxhQUFhLFNBRnZDLElBR0FBLGFBQWEsWUFIaEIsRUFJQTtBQUNFaEosa0JBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBOGQsdUJBQWFzQyxlQUFiLEdBQStCLEtBQS9CO0FBQ0Q7QUFDRCxZQUFHOVgsYUFBYSxTQUFoQixFQUNBO0FBQ0VoSixrQkFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0E4ZCx1QkFBYXVDLG9CQUFiLEdBQW9DLEtBQXBDO0FBQ0Q7QUFDRCxZQUFHL1gsYUFBYSxTQUFoQixFQUNBO0FBQ0VoSixrQkFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0E4ZCx1QkFBYXdDLG9CQUFiLEdBQW9DLEtBQXBDO0FBQ0Q7QUFDRCxZQUFHaFksYUFBYSxTQUFoQixFQUNBO0FBQ0loSixrQkFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDO0FBQ0g7QUFDSjtBQUNKLEtBNUJEOztBQThCQWdnQixpQkFBYUEsV0FBV3pLLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixDQUFiO0FBQ0EvQixlQUFXLG9HQUFBVyxDQUFTN1UsT0FBVCxFQUFrQjBnQixVQUFsQixFQUE4QmhjLElBQTlCLEVBQW9DeUgsSUFBcEMsRUFBMEMySSxLQUExQyxFQUFpREMsVUFBakQsRUFBNkRDLFNBQTdELEVBQXdFak0sU0FBeEUsRUFBbUZ1SixZQUFuRixDQUFYO0FBQ0E7QUFDQSxTQUFLLElBQUkvUixJQUFJLENBQWIsRUFBZ0JBLElBQUl1SSxTQUFTckksTUFBN0IsRUFBcUNGLEdBQXJDLEVBQ0E7QUFDRSxVQUFJeUksV0FBV0YsU0FBU3ZJLENBQVQsQ0FBZjtBQUNBLFVBQUdpZSxhQUFheFYsV0FBUyxVQUF0QixNQUFzQyxJQUF0QyxJQUE4Q2tMLFFBQWpELEVBQ0E7QUFDRWxVLGdCQUFRVSxHQUFSLENBQWEsaUJBQWIsRUFBZ0MsQ0FBaEM7QUFDQVYsZ0JBQVF5VixJQUFSLENBQWN6TSxXQUFTLFNBQXZCO0FBQ0EsWUFBR2lVLFFBQUgsRUFBWTtBQUNWamQsa0JBQVFVLEdBQVIsQ0FBYSxzQkFBYixFQUFxQyxDQUFyQztBQUNBaVcsVUFBQSxtSEFBQUEsQ0FBNEIzVyxPQUE1QjtBQUNEO0FBQ0Q7QUFDRDtBQUNGOztBQUVELFFBQUcsQ0FBRWtVLFFBQUwsRUFBYztBQUFDK0MsYUFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUJGLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQXZDO0FBQTZDO0FBQzdEO0FBQ0Y7O0FBRU0sU0FBUzBKLGtCQUFULENBQTRCSSxNQUE1QixFQUFvQ2pZLFFBQXBDLEVBQThDOEwsS0FBOUMsRUFBcURvTSxhQUFyRCxFQUNQO0FBQ0UsTUFBSVQsZ0JBQWdCLEVBQXBCO0FBQ0EsTUFBRyxDQUFFLGlCQUFpQlUsSUFBakIsQ0FBc0JuWSxRQUF0QixDQUFMLEVBQ0E7QUFDRXlYLG9CQUFnQkEsZ0JBQWdCLGdGQUFoQztBQUNEO0FBQ0Q7QUFDQTtBQUNBLE1BQUcsQ0FBRSxjQUFjVSxJQUFkLENBQW1CRixNQUFuQixDQUFMLEVBQWdDO0FBQzVCUixvQkFBZ0JBLGdCQUFnQixvSEFBaEM7QUFDSDtBQUNELE1BQUcsaUdBQUFoSyxDQUFVLElBQVYsRUFBZ0J5SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ1Qsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7QUFDRCxTQUFPQSxhQUFQO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTRyxlQUFULENBQXlCbGEsR0FBekIsRUFBOEJzQyxRQUE5QixFQUF3QzhMLEtBQXhDLEVBQStDb00sYUFBL0MsRUFDUDtBQUNFLE1BQUlULGdCQUFnQixFQUFwQjtBQUNBLE1BQUcsQ0FBRSxpQkFBaUJVLElBQWpCLENBQXNCblksUUFBdEIsQ0FBTCxFQUNBO0FBQ0V5WCxvQkFBZ0JBLGdCQUFnQixnRkFBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUcvWixJQUFJakcsTUFBSixHQUFhLElBQWhCLEVBQ0E7QUFDRWdnQixvQkFBZ0JBLGdCQUFnQiw0Q0FBaEM7QUFDRDtBQUNELE1BQUcvWixJQUFJakcsTUFBSixHQUFhLEVBQWhCLEVBQ0E7QUFDRWdnQixvQkFBZ0JBLGdCQUFnQiw2Q0FBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUlXLG1CQUFtQixDQUFDMWEsSUFBSTNGLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q04sTUFBbkU7QUFDQSxNQUFJMmdCLG1CQUFpQjFhLElBQUlqRyxNQUF0QixHQUFnQyxJQUFuQyxFQUNBO0FBQ0VnZ0Isb0JBQWdCQSxnQkFBZ0Isd0dBQWhDO0FBQ0Q7QUFDRCxNQUFHLCtCQUErQlUsSUFBL0IsQ0FBb0N6YSxHQUFwQyxDQUFILEVBQ0E7QUFDRStaLG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUFoSyxDQUFVLElBQVYsRUFBZ0J5SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ1Qsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7QUFDRCxTQUFPQSxhQUFQO0FBQ0QsQyIsImZpbGUiOiJwc2lwcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk5YjA4NTczYTc2ODkwMTg3OTIzIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgaHNwcmVkX3RhYmxlID0gJzxiciAvPjx0YWJsZT48dHI+PHRkIGJnY29sb3I9XCIjZmYwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7SG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1Ib3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLWludGVyZmFjZSByZXNpZHVlPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dGFibGU+PHRyPjx0aD5DaGFpbi9SZXNpZHVlPC90aD48dGg+UmVzaWR1ZSBJZGVudGl0eTwvdGg+PHRoPlNjb3JlPC90aD4nO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA9PT0gMyl7XG4gICAgICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfVxuICB9KTtcbiAgaHNwcmVkX3RhYmxlICs9ICc8dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIGhzcHJlZF90YWJsZSk7XG59XG5cbi8vIHBhcnNlIHRoZSBzbWFsbCBtZXRzaXRlIG91dHB1dCB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21ldHNpdGUocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IG1ldHNpdGVfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtNZXRhbCBCaW5kaW5nIENvbnRhY3Q8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0NoYWluIG5vdCBwcmVkaWN0ZWQ8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO1ByZWRpY3RlZCBjaGFpbjwvdGQ+PC90cj48L3RhYmxlPjxiciAvPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPlJlc2lkdWUgTnVtYmVyPC90aD48dGg+UmF3IE5ldXJhbCBOZXR3b3JrIFNjb3JlPC90aD48dGg+UmVzaWR1ZTwvdGg+JztcbiAgbGV0IGhpdF9yZWdleCA9IC9cXGQrXFxzLis/XFxzXFx3ezN9XFxkKy9nO1xuICBsZXQgaGl0X21hdGNoZXMgPSBmaWxlLm1hdGNoKGhpdF9yZWdleCk7XG4gIGlmKGhpdF9tYXRjaGVzKVxuICB7XG4gICAgaGl0X21hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzLyk7XG4gICAgICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH0pO1xuICB9XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG1ldHNpdGVfdGFibGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKXtcblxuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGJwX2RhdGEgPSBbXTtcbiAgbGV0IG1mX2RhdGEgPSBbXTtcbiAgbGV0IGNjX2RhdGEgPSBbXTtcbiAgbGV0IHRhYmxlX2RhdGEgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoJyMnKSl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoIDwgNCl7cmV0dXJuO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQlAnKXticF9kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdDQycpe2NjX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ01GJyl7bWZfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgfSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkJpb2xvZ2ljYWwgUHJvY2VzcyBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgYnBfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgdGFibGVfZGF0YSArPSAnVGhlc2UgcHJlZGljdGlvbiB0ZXJtcyByZXByZXNlbnQgdGVybXMgcHJlZGljdGVkIHdoZXJlIFNWTSB0cmFpbmluZyBpbmNsdWRlcyBhc3NpZ25lZCBHTyB0ZXJtcyBhY3Jvc3MgYWxsIGV2aWRlbmNlIGNvZGUgdHlwZXMuIFNWTSByZWxpYWJpbGl0eSBpcyByZWdhcmRlZCBhcyBIaWdoIChIKSB3aGVuIE1DQywgc2Vuc2l0aXZpdHksIHNwZWNpZmljaXR5IGFuZCBwcmVjaXNpb24gYXJlIGpvaW50bHkgYWJvdmUgYSBnaXZlbiB0aHJlc2hvbGQuIG90aGVyd2lzZSBSZWxpYWJpbGl0eSBpcyBpbmRpY2F0ZWQgYXMgTG93IChMKS4gPGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG59XG5cbmZ1bmN0aW9uIHNldF9hYW5vcm0oKXtcbiAgbGV0IGhBQV9ub3JtID0ge307XG4gIGhBQV9ub3JtLkEgPSB7IHZhbDogMC4wNzE3ODMyNDgwMDYzMDksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjczNjc2NjE1MjQyNzV9O1xuICBoQUFfbm9ybS5WID0geyB2YWw6IDAuMDU5NjI0NTk1MzY5OTAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMzc3NzkxNTI4NzQ1fTtcbiAgaEFBX25vcm0uWSA9IHsgdmFsOiAwLjAyNjA3NTA2ODI0MDQzNyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNDgyMjQ3MTUzMTM3OX07XG4gIGhBQV9ub3JtLlcgPSB7IHZhbDogMC4wMTQxNjYwMDI2MTI3NzEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTA0NzE4MzU4MDE5OTZ9O1xuICBoQUFfbm9ybS5UID0geyB2YWw6IDAuMDUyNTkzNTgyOTcyNzE0LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMDk0NzkzOTY0NTk3fTtcbiAgaEFBX25vcm0uUyA9IHsgdmFsOiAwLjA4MjEyMzI0MTMzMjA5OSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyODY4NzU2NjA4MTUxMn07XG4gIGhBQV9ub3JtLlAgPSB7IHZhbDogMC4wNjU1NTc1MzEzMjIyNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzQyMzkzOTg0OTY3MzZ9O1xuICBoQUFfbm9ybS5GID0geyB2YWw6IDAuMDM3MTAzOTk0OTY5MDAyLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NTQzNDIzMTM5MTg2fTtcbiAgaEFBX25vcm0uTSA9IHsgdmFsOiAwLjAyMjU2MjgxODE4Mzk1NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMTMyMTAzOTY2MjQ4MX07XG4gIGhBQV9ub3JtLksgPSB7IHZhbDogMC4wNTQ4MzM5NzkyNjkxODUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjkyNjQwODM2NjcxNTd9O1xuICBoQUFfbm9ybS5MID0geyB2YWw6IDAuMTAwMTA1OTE1NzU5MDYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAyNzY4MDg1MTkwMDl9O1xuICBoQUFfbm9ybS5JID0geyB2YWw6IDAuMDQyMDM0NTI2MDQwNDY3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODI2ODQ5MjYyNDk1fTtcbiAgaEFBX25vcm0uSCA9IHsgdmFsOiAwLjAyNzE0MTQwMzUzNzU5OCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNTUwNTY2Mzc4OTg1fTtcbiAgaEFBX25vcm0uRyA9IHsgdmFsOiAwLjA2OTE3OTgyMDEwNDUzNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDA4NzU2MjA1NzMyOH07XG4gIGhBQV9ub3JtLlEgPSB7IHZhbDogMC4wNjU5MjA1NjE5MzE4MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAxMDMwOTEwMDgzNjZ9O1xuICBoQUFfbm9ybS5FID0geyB2YWw6IDAuMDQ2NDc4NDYyMjU4MzgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTk5NDYyNjk0NjE3MzZ9O1xuICBoQUFfbm9ybS5DID0geyB2YWw6IDAuMDI0OTA4NTUxODcyMDU2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODIyOTA5NTg5NTA0fTtcbiAgaEFBX25vcm0uRCA9IHsgdmFsOiAwLjA0NDMzNzkwNDcyNjA0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODQzNjY3NzI1NjcyNn07XG4gIGhBQV9ub3JtLk4gPSB7IHZhbDogMC4wMzM1MDcwMjA5ODcwMzMsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTY1MzYwMjIyODgyMDR9O1xuICBoQUFfbm9ybS5SID0geyB2YWw6IDAuMDU5NzQwNDY5MDMxMTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjUxNjU5OTQ3NzMzODR9O1xuICByZXR1cm4oaEFBX25vcm0pO1xufVxuXG5mdW5jdGlvbiBzZXRfZm5vcm0oKXtcbiAgbGV0IGhGX25vcm0gPSB7fTtcbiAgaEZfbm9ybS5oeWRyb3Bob2JpY2l0eSA9IHt2YWw6IC0wLjM0ODc2ODI4MDgwMTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMC43NTU1OTE1Mjc2OTc5OX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgcG9zaXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjQ1NzcxNzQ2Njk0OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMy41NjcxMzMzNDExMzl9O1xuICBoRl9ub3JtWydhbGlwaGF0aWMgaW5kZXgnXSA9IHt2YWw6IDc5LjkxMTU0OTMxOTA5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi43ODc2MTc5Nzg4Mjd9O1xuICBoRl9ub3JtWydpc29lbGVjdHJpYyBwb2ludCddID0ge3ZhbDogNy42MTAyMDQ2MzgzNjAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMS45NzE2MTExMDIwMDg4fTtcbiAgaEZfbm9ybVsnbW9sZWN1bGFyIHdlaWdodCddID0ge3ZhbDogNDg2NjguNDEyODM5OTYxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzNzgzOC4zMjQ4OTU5Njl9O1xuICBoRl9ub3JtLmNoYXJnZSA9IHt2YWw6IDUuMDk5MTc2MzA1NzYwNCxcbiAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi44Mzg2MzY1OTAyNX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgbmVnYXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjAyNjE5MDEyODE3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogNC4wMjA2NjMxNjgwOTI2fTtcbiAgaEZfbm9ybVsnbW9sYXIgZXh0aW5jdGlvbiBjb2VmZmljaWVudCddID0ge3ZhbDogNDY0NzUuMjkzOTIzOTI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzOTI5OS4zOTk4NDg4MjN9O1xuICByZXR1cm4oaEZfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIGdldF9hYV9jb2xvcih2YWwpe1xuICAgIGxldCBhYl92YWwgPSBNYXRoLmFicyh2YWwpO1xuICAgIGlmKGFiX3ZhbCA+PSAyLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjFwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAyLjI0KXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMnBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjJuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmNXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjVuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuNjQ1ICkge1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxMHBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjEwblwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJwbGFpblwiO1xufVxuXG4vL3BhcnNlIHRoZSBmZnByZWQgZmVhdGNmbyBmZWF0dXJlcyBmaWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IFNGX2RhdGEgPSB7fTtcbiAgbGV0IEFBX2RhdGEgPSB7fTtcbiAgbGV0IGhGX25vcm0gPXNldF9mbm9ybSgpO1xuICBsZXQgaEFBX25vcm09c2V0X2Fhbm9ybSgpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIkFBXCIpKXtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBBQV9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiU0ZcIikpXG4gICAge1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIFNGX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYnVpbGQgaHRtbCB0YWJsZXMgZm9yIHRoZSBmZWF0dXJlIGRhdGFcbiAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICBsZXQgZ2xvYmFsX2ZlYXR1cmVzID0gcmFjdGl2ZS5nZXQoJ2dsb2JhbF9mZWF0dXJlcycpO1xuICBsZXQgZmVhdF90YWJsZSA9ICc8Yj5HbG9iYWwgRmVhdHVyZXM8L2I+PGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnR2xvYmFsIGZlYXR1cmVzIGFyZSBjYWxjdWxhdGVkIGRpcmVjdGx5IGZyb20gc2VxdWVuY2UuIExvY2FsaXNhdGlvbiB2YWx1ZXMgYXJlIHByZWRpY3RlZCBieSB0aGUgUHNvcnQgYWxnb3JpdGhtIGFuZCByZWZsZWN0IHRoZSByZWxhdGl2ZSBsaWtlbGlob29kIG9mIHRoZSBwcm90ZWluIG9jY3VweWluZyBkaWZmZXJlbnQgY2VsbHVsYXIgbG9jYWxpc2F0aW9ucy4gVGhlIGJpYXMgY29sdW1uIGlzIGhpZ2hsaWdodGVkIGFjY29yZGluZyB0byB0aGUgc2lnbmlmaWNhbmNlIG9mIHRoZSBmZWF0dXJlIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBaIHNjb3JlIG9mIHRoZSBmZWF0dXJlLjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkZlYXR1cmUgTmFtZTwvdGg+PHRoPlZhbHVlPC90aD48dGg+QmlhczwvdGg+PC90cj4nO1xuXG4gIE9iamVjdC5rZXlzKFNGX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmVfbmFtZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGlmKGZlYXR1cmVfbmFtZSBpbiBoRl9ub3JtKXtcbiAgICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvciggKHBhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS1oRl9ub3JtW2ZlYXR1cmVfbmFtZV0udmFsKSAvIGhGX25vcm1bZmVhdHVyZV9uYW1lXS5zZGUpO1xuICAgIH1cbiAgICBmZWF0X3RhYmxlICs9ICc8dHI+PHRkPicrZmVhdHVyZV9uYW1lKyc8L3RkPjx0ZD4nK3BhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS50b0ZpeGVkKDIpKyc8L3RkPjx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPjwvdHI+JztcbiAgfSk7XG4gIGZlYXRfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIGZlYXRfdGFibGUpO1xuXG4gIC8vYnVpbGQgaHRtbCB0YWJsZSBmb3IgdGhlIEFBIGRhdGFcbiAgbGV0IGFhX2NvbXBvc2l0aW9uID0gcmFjdGl2ZS5nZXQoJ2FhX2NvbXBvc2l0aW9uJyk7XG4gIGxldCBhYV90YWJsZSA9ICc8Yj5BbWlubyBBY2lkIENvbXBvc2l0aW9uIChwZXJjZW50YWdlcyk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZT48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aD4nK3Jlc2lkdWUrJzwvdGg+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKChwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pLWhBQV9ub3JtW3Jlc2lkdWVdLnZhbCkgLyBoQUFfbm9ybVtyZXNpZHVlXS5zZGUpO1xuICAgIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSBjbGFzcz1cInNpZ25pZmtleVwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIyXCIgY2VsbHNwYWNpbmc9XCIwXCI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjxiPmxvdzwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgYWxpZ249XCJyaWdodFwiPjxiPmhpZ2g8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMW5cIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJuXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1blwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBuXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD5wICZndDs9IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwcFwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1cFwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMnBcIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFwXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBhYV90YWJsZSk7XG59XG5cblxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJy0nKSlcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoWzFdKTtcbiAgICAgICAgbGV0IHNlZyA9IG1hdGNoWzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCByZWdpb25zID0gW1tdLCBdO1xuICAgICAgICByZWdpb25zWzBdWzBdID0gcGFyc2VJbnQoc2VnWzBdKTtcbiAgICAgICAgcmVnaW9uc1swXVsxXSA9IHBhcnNlSW50KHNlZ1sxXSk7XG4gICAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuKG1hdGNoWzFdKTtcbn1cblxuLy8gdGFrZSBhbmQgc3MyIChmaWxlKSBhbmQgcGFyc2UgdGhlIGRldGFpbHMgYW5kIHdyaXRlIHRoZSBuZXcgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBhbm5vdGF0aW9uc1tpXS5zcyA9IGVudHJpZXNbM107XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSCBEb21haW48L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIH1lbHNlIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJjYXRoX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5DQVRIIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJwZGJfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBcIjxoMz5ObyBnb29kIGhpdHMgZm91bmQuIEdVRVNTIGFuZCBMT1cgY29uZmlkZW5jZSBoaXRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmVzdWx0cyBmaWxlPC9oMz5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWRpY3Rpb25fcmVnZXggPSAvRG9tYWluXFxzQm91bmRhcnlcXHNsb2NhdGlvbnNcXHNwcmVkaWN0ZWRcXHNEUFM6XFxzKC4rKS87XG4gIGxldCBwcmVkaWN0aW9uX21hdGNoID0gIHByZWRpY3Rpb25fcmVnZXguZXhlYyhmaWxlKTtcbiAgaWYocHJlZGljdGlvbl9tYXRjaClcbiAge1xuICAgIGxldCBkZXRhaWxzID0gZmlsZS5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgZGV0YWlscyA9IGRldGFpbHMucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiPGg0PlwiK2RldGFpbHMrXCI8L2g0PlwiKTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgaWYocHJlZGljdGlvbl9tYXRjaFsxXS5pbmRleE9mKFwiLFwiKSlcbiAgICB7XG4gICAgICB2YWx1ZXMgPSBwcmVkaWN0aW9uX21hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaSl7XG4gICAgICAgIHZhbHVlc1tpXSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQocHJlZGljdGlvbl9tYXRjaFsxXSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xuICAgICAgYW5ub3RhdGlvbnNbdmFsdWVdLmRvbXByZWQgPSAnQic7XG4gICAgfSk7XG4gICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiTm8gUGFyc2VEUyBEb21haW4gYm91bmRhcmllcyBwcmVkaWN0ZWRcIik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMiLCJpbXBvcnQgeyBwcm9jZXNzX2ZpbGUgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfdGV4dCB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dfcGFuZWwodmFsdWUsIHJhY3RpdmUpXG57XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIHZhbHVlICk7XG59XG5cbi8vYmVmb3JlIGEgcmVzdWJtaXNzaW9uIGlzIHNlbnQgYWxsIHZhcmlhYmxlcyBhcmUgcmVzZXQgdG8gdGhlIHBhZ2UgZGVmYXVsdHNcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcyl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsICcnKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgnZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfaW5mbycsIG51bGwpO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fYW5uX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfbW9kZWwnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9ucycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfbW9kZWxfdXJpczonLCBbXSk7XG4gIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljOicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCBudWxsKTtcblxuXG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJyxudWxsKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5zZXF1ZW5jZV9wbG90Jyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYucHNpcHJlZF9jYXJ0b29uJyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuY29tYl9wbG90Jyk7XG5cbiAgemlwID0gbmV3IEpTWmlwKCk7XG59XG5cbi8vVGFrZSBhIGNvdXBsZSBvZiB2YXJpYWJsZXMgYW5kIHByZXBhcmUgdGhlIGh0bWwgc3RyaW5ncyBmb3IgdGhlIGRvd25sb2FkcyBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpXG57XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKGRhdGEuam9iX25hbWUgPT09IGpvYl9uYW1lKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXSA9IHt9O1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIC8vRVhUUkEgUEFORUxTIEZPUiBTT01FIEpPQlMgVFlQRVM6XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkb21wcmVkJyAgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBnZW50aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmJpb3NlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBkb210aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmRvbXNlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQ9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZmZwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy90YWtlIHRoZSBkYXRhYmxvYiB3ZSd2ZSBnb3QgYW5kIGxvb3Agb3ZlciB0aGUgcmVzdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMpXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgcG5nX3JlZ2V4ID0gL1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IGRvbXNzZWFfcHJlZF9yZWdleCA9IC9cXC5wcmVkJC87XG4gIGxldCBkb21zc2VhX3JlZ2V4ID0gL1xcLmRvbXNzZWEkLztcbiAgbGV0IGRvbXNlcmZfcmVnZXggPSAvLitfKFxcZCspXyhcXGQrKS4qXFwucGRiLztcbiAgbGV0IGZmcHJlZF9zY2hfcmVnZXggPSAvLitfc2NoXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zdm1fcmVnZXggPSAvLitfY2FydG9vbl9tZW1zYXRfc3ZtXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zY2hlbWF0aWNfcmVnZXggPSAvLitfc2NoZW1hdGljXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF90bV9yZWdleCA9IC8uK190bXBcXC5wbmcvO1xuICBsZXQgZmZwcmVkX2ZlYXRjZmdfcmVnZXggPSAvXFwuZmVhdGNmZy87XG4gIGxldCBmZnByZWRfcHJlZHNfcmVnZXggPSAvXFwuZnVsbF9yYXcvO1xuICBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgbGV0IG1ldHNpdGVfdGFibGVfcmVnZXggPSAvXFwuTWV0cHJlZC87XG4gIGxldCBtZXRzaXRlX3BkYl9yZWdleCA9IC9cXC5NZXRQcmVkLztcbiAgbGV0IGhzcHJlZF9pbml0aWFsX3JlZ2V4ID0gL19pbml0aWFsXFwucGRiLztcbiAgbGV0IGhzcHJlZF9zZWNvbmRfcmVnZXggPSAvX3NlY29uZFxcLnBkYi87XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBsZXQgZG9tYWluX2NvdW50ID0gMDtcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBkb21zZXJmX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIC8vUHJlcGF0b3J5IGxvb3AgZm9yIGluZm9ybWF0aW9uIHRoYXQgaXMgbmVlZGVkIGJlZm9yZSByZXN1bHRzIHBhcnNpbmc6XG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwicGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fZ2VuYWxpZ25tZW50X2Fubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb25fZG9tJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJkZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImRnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gIC8vbWFpbiByZXN1bHRzIHBhcnNpbmcgbG9vcFxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL21lbXNhdCBhbmQgbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2dlbl9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIHtcbiAgICAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHBuZ19tYXRjaCA9IHBuZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwbmdfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BhcnNlZHMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tc3NlYScpXG4gICAge1xuICAgICAgbGV0IHByZWRfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBkb21zc2VhX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zc2VhX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIGZpbGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3J1bkJpb3NlcmYnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJylcbiAgICB7XG4gICAgICBsZXQgcHJlZHNfbWF0Y2ggPSBmZnByZWRfcHJlZHNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZHNfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdPIFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkcHJlZGljdGlvbnMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwbG90X3NlbGZfY29udGFjdF9tYXAnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3ZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgTWFwPC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCAnPGI+Q29udGFjdCBNYXA8L2I+PGJyIC8+PGltZyBoZWlnaHQ9XCI4MDBcIiB3aWR0aD1cIjgwMFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NvbnRhY3RfcHJlZGljdG9ycycpXG4gICAge1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgICAgICAgbGV0IGV2X21hdGNoID0gbWV0YXBzaWNvdl9ldl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGV2X21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZyZWVDb250YWN0IHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwc19tYXRjaCA9IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYocHNfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBTSUNPViBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2NfbWF0Y2ggPSBtZXRhcHNpY292X2NjbXByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihjY19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNDTVBSRUQgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lICA9PT0gJ21ldGFwc2ljb3Zfc3RhZ2UyJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRwcmVkX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIGxldCB0YWJsZV9tYXRjaCA9IG1ldHNpdGVfdGFibGVfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHBkYl9tYXRjaCA9IG1ldHNpdGVfcGRiX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfdGltZVwiLCAnJyk7XG4gICAgICBpZih0YWJsZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZXRzaXRlJywgemlwLCByYWN0aXZlKTtcblxuICAgICAgfVxuICAgICAgaWYocGRiX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgUERCPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc19wcmVkJylcbiAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5IU1ByZWQgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdoc3ByZWQnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3BsaXRfcGRiX2ZpbGVzJylcbiAgICB7XG4gICAgICBsZXQgaW5pdGlhbF9tYXRjaCA9IGhzcHJlZF9pbml0aWFsX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBzZWNvbmRfbWF0Y2ggPSBoc3ByZWRfc2Vjb25kX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGluaXRpYWxfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLmluaXRpYWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Jbml0aWFsIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZihzZWNvbmRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlY29uZCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX3NlY29uZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ha2V0ZGInKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+VERCIEZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCd0ZGJfZmlsZScsICc8aDM+PGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DbGljayBoZXJlIHRvIGRvd25sb2FkIHlvdXIgVERCIEZpbGU8L2E+PC9oMz4nKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtZW1iZWQgUERCIGZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cblxuICB9XG5cbiAgLy9TZXQgbm8gZm91bmQgc3RhdG1lbnRzIGZvciBzb21lIGpvYnMuXG4gIGlmKCEgbWVtcGFja19yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKCEgcHNpcHJlZF9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wc2lwcmVkKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICB9XG4gIGlmKCEgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnTm8gJytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgdGFibGUgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoZG9tc2VyZl9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkLCBjYXJ0b29uKVxue1xuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgIGlmKGF0b20uc3MgPT09ICdzJyl7cmV0dXJuICcjZTVkZDU1Jzt9XG4gICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGxldCBob3RzcG90X2NvbG9yID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgaWYoYXRvbS5iID09IDEuMCl7cmV0dXJuICdyZWQnO31cbiAgICBpZihhdG9tLmIgPT0gMC41KXtyZXR1cm4gJ2JsYWNrJzt9XG4gICAgaWYoYXRvbS5iID09IDUwKXtyZXR1cm4gJ3doaXRlJzt9XG4gICAgaWYoYXRvbS5iID09IDEwMCl7cmV0dXJuICdyZWQnO31cbiAgICByZXR1cm4oXCJibHVlXCIpO1xuICB9O1xuICBjb25zb2xlLmxvZyhcIkxPQURJTkc6IFwiK3VyaSk7XG4gIGxldCBlbGVtZW50ID0gJChjc3NfaWQpO1xuICBsZXQgY29uZmlnID0geyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyB9O1xuICBsZXQgdmlld2VyID0gJDNEbW9sLmNyZWF0ZVZpZXdlciggZWxlbWVudCwgY29uZmlnICk7XG4gIGxldCBkYXRhID0gZ2V0X3RleHQodXJpLCBcIkdFVFwiLCB7fSk7XG4gIHZpZXdlci5hZGRNb2RlbCggZGF0YSwgXCJwZGJcIiApOyAgICAgICAgICAgICAgICAgICAgICAgLyogbG9hZCBkYXRhICovXG4gIGlmKGNhcnRvb24pXG4gIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBjYXJ0b29uX2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgZWxzZSB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogaG90c3BvdF9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGNvbnNvbGUubG9nKGNzc19pZCk7XG4gIGlmKGNzc19pZC5zdGFydHNXaXRoKCcjbWVtZW1iZWQnKSl7XG4gICAgdmlld2VyLmFkZFN1cmZhY2UoJDNEbW9sLlN1cmZhY2VUeXBlLlZEVywgeydvcGFjaXR5JzowLjgsIGNvbG9yc2NoZW1lOiAnd2hpdGVDYXJib24nfSwge2hldGZsYWc6dHJ1ZX0se30pO1xuICB9XG4gIHZpZXdlci56b29tVG8oKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHNldCBjYW1lcmEgKi9cbiAgdmlld2VyLnJlbmRlcigpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogcmVuZGVyIHNjZW5lICovXG4gIHZpZXdlci56b29tKDEuNywgMzAwMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKVxue1xuICAvL2NvbnNvbGUubG9nKGRvd25sb2Fkc19pbmZvKTtcbiAgbGV0IGRvd25sb2Fkc19zdHJpbmcgPSByYWN0aXZlLmdldCgnZG93bmxvYWRfbGlua3MnKTtcbiAgaWYoJ3BzaXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeil7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7fVxuICB9XG4gIGlmKCdkaXNvcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXNhdHN2bScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3BnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZG9tdGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICAgIH1cbiAgfVxuICBpZignbWVtcGFjaycgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5oZWFkZXIpO1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbilcbiAgICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiTm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPGJyIC8+XCIpO1xuICAgIH1cbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Jpb3NlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZG9tc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2ZmcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2gpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRhcHNpY292JyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZXRzaXRlJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdoc3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGRiJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1lbWJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cblxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2FkdmFuY2VkX3BhcmFtcygpXG57XG4gIGxldCBvcHRpb25zX2RhdGEgPSB7fTtcbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBcIjAuMDFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSA1O1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlvc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuZmZwcmVkX3R5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZmcHJlZF9zZWxlY3Rpb25cIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF90eXBlID0gXCJodW1hblwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gXCJDYVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBcIkNhXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2ZwclwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IFwiNVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IFwiQUJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQlwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgfVxuXG4vLyAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiKS52YWx1ZTtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JhcnJlbF95ZXNcIikuY2hlY2tlZCl7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ1RSVUUnO1xuICAgIH1lbHNle1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgfVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfdGVybWluYWxfaW5cIikuY2hlY2tlZClcbiAgICB7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwiaW5cIjtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJvdXRcIjtcbiAgICB9XG5cbiAgICAvL29wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JvdW5kYXJpZXNcIik7XG4gIC8vIH1cbiAgLy8gY2F0Y2goZXJyKXt9XG4gIHJldHVybihvcHRpb25zX2RhdGEpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMiLCJpbXBvcnQgeyBnZXRfbWVtc2F0X3JhbmdlcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9zczIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGJkYXQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfY29tYiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZW1zYXRkYXRhIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3ByZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGFyc2VkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZWF0Y2ZnIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZmcHJlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWV0c2l0ZSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9oc3ByZWQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG4vL2dpdmVuIGEgdXJsLCBodHRwIHJlcXVlc3QgdHlwZSBhbmQgc29tZSBmb3JtIGRhdGEgbWFrZSBhbiBodHRwIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX3JlcXVlc3QodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG4gIGNvbnNvbGUubG9nKCdTZW5kaW5nIFVSSSByZXF1ZXN0Jyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnNvbGUubG9nKHR5cGUpO1xuICB2YXIgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gc2VuZCBkYXRhXCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIlNlbmRpbmcgSm9iIHRvIFwiK3VybCtcIiBGYWlsZWQuIFwiK2Vycm9yLnJlc3BvbnNlVGV4dCtcIi4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIHdhcyB1bmFibGUgdG8gcHJvY2VzcyB5b3VyIHN1Ym1pc3Npb24uIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpOyByZXR1cm4gbnVsbDtcbiAgfX0pLnJlc3BvbnNlSlNPTjtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuLy9naXZlbiBhIGpvYiBuYW1lIHByZXAgYWxsIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBzZW5kIGFuIGh0dHAgcmVxdWVzdCB0byB0aGVcbi8vYmFja2VuZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfam9iKHJhY3RpdmUsIGpvYl9uYW1lLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgdmFyIGZpbGUgPSBudWxsO1xuICB0cnlcbiAge1xuICAgIGZpbGUgPSBuZXcgQmxvYihbc2VxXSk7XG4gIH0gY2F0Y2ggKGUpXG4gIHtcbiAgICBhbGVydChlKTtcbiAgfVxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgZmQuYXBwZW5kKFwiaW5wdXRfZGF0YVwiLCBmaWxlLCAnaW5wdXQudHh0Jyk7XG4gIGZkLmFwcGVuZChcImpvYlwiLGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwic3VibWlzc2lvbl9uYW1lXCIsbmFtZSk7XG4gIGZkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcbiAgZmQuYXBwZW5kKFwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWVcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlKTtcbiAgZmQuYXBwZW5kKFwicHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMpO1xuICBmZC5hcHBlbmQoXCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiZXh0cmFjdF9mYXN0YV9jaGFpblwiLCBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9tZXRhbFwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9tZXRhbFwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2ZwclwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2Zwcik7XG4gIGZkLmFwcGVuZChcImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnNcIiwgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMpO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX2ZpcnN0X2NoYWluXCIsIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiaHNfcHJlZF9zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfc2Vjb25kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfYWxnb3JpdGhtXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0pO1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF9iYXJyZWxcIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCk7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX3Rlcm1pbmlcIiwgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkpO1xuXG4gIGNvbnNvbGUubG9nKG9wdGlvbnNfZGF0YSk7XG4gIGxldCByZXNwb25zZV9kYXRhID0gc2VuZF9yZXF1ZXN0KHN1Ym1pdF91cmwsIFwiUE9TVFwiLCBmZCk7XG4gIGlmKHJlc3BvbnNlX2RhdGEgIT09IG51bGwpXG4gIHtcbiAgICBsZXQgdGltZXMgPSBzZW5kX3JlcXVlc3QodGltZXNfdXJsLCdHRVQnLHt9KTtcbiAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHRpbWVzKSk7XG4gICAgaWYoam9iX25hbWUgaW4gdGltZXMpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgam9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzIHR5cGljYWxseSB0YWtlIFwiK3RpbWVzW2pvYl9uYW1lXStcIiBzZWNvbmRzXCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgXCJVbmFibGUgdG8gcmV0cmlldmUgYXZlcmFnZSB0aW1lIGZvciBcIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMuXCIpO1xuICAgIH1cbiAgICBmb3IodmFyIGsgaW4gcmVzcG9uc2VfZGF0YSlcbiAgICB7XG4gICAgICBpZihrID09IFwiVVVJRFwiKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsIHJlc3BvbnNlX2RhdGFba10pO1xuICAgICAgICBpZihbJ21ldGlzdGUnLCAnaHNwcmVkJywgJ2dlbnRkYicsICdtZW1lbWJlZCddLmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICAgICAge1xuICAgICAgICAgIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHNlcXVlbmNlIGZyb20gYSBwcmV2aW91cyBzdWJtaXNzaW9uIGlzIHRoZVxuLy9wYWdlIHdhcyBsb2FkZWQgd2l0aCBhIFVVSURcbmV4cG9ydCBmdW5jdGlvbiBnZXRfcHJldmlvdXNfZGF0YSh1dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSlcbntcbiAgICBjb25zb2xlLmxvZygnUmVxdWVzdGluZyBkZXRhaWxzIGdpdmVuIFVSSScpO1xuICAgIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgLy9hbGVydCh1cmwpO1xuICAgIGxldCBzdWJtaXNzaW9uX3Jlc3BvbnNlID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGlmKCEgc3VibWlzc2lvbl9yZXNwb25zZSl7YWxlcnQoXCJOTyBTVUJNSVNTSU9OIERBVEFcIik7fVxuICAgIGxldCBzZXEgPSBnZXRfdGV4dChmaWxlX3VybCtzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmlucHV0X2ZpbGUsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgam9icyA9ICcnO1xuICAgIHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihzdWJtaXNzaW9uKXtcbiAgICAgIGpvYnMgKz0gc3VibWlzc2lvbi5qb2JfbmFtZStcIixcIjtcbiAgICB9KTtcbiAgICBqb2JzID0gam9icy5zbGljZSgwLCAtMSk7XG4gICAgcmV0dXJuKHsnc2VxJzogc2VxLCAnZW1haWwnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmVtYWlsLCAnbmFtZSc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uc3VibWlzc2lvbl9uYW1lLCAnam9icyc6IGpvYnN9KTtcbn1cblxuXG4vL2dldCB0ZXh0IGNvbnRlbnRzIGZyb20gYSByZXN1bHQgVVJJXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3RleHQodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG5cbiBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIC8vZGF0YVR5cGU6IFwidHh0XCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHJlcXVlc3QgaW5wdXQgZGF0YSB0ZXh0XCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIkdldHRpbmdzIHJlc3VsdHMgdGV4dCBmYWlsZWQuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTt9XG4gIH0pO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG5cbi8vcG9sbHMgdGhlIGJhY2tlbmQgdG8gZ2V0IHJlc3VsdHMgYW5kIHRoZW4gcGFyc2VzIHRob3NlIHJlc3VsdHMgdG8gZGlzcGxheVxuLy90aGVtIG9uIHRoZSBwYWdlXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc19maWxlKHVybF9zdHViLCBwYXRoLCBjdGwsIHppcCwgcmFjdGl2ZSlcbntcbiAgbGV0IHVybCA9IHVybF9zdHViICsgcGF0aDtcbiAgbGV0IHBhdGhfYml0cyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICAvL2dldCBhIHJlc3VsdHMgZmlsZSBhbmQgcHVzaCB0aGUgZGF0YSBpbiB0byB0aGUgYmlvM2Qgb2JqZWN0XG4gIC8vYWxlcnQodXJsKTtcbiAgY29uc29sZS5sb2coJ0dldHRpbmcgUmVzdWx0cyBGaWxlIGFuZCBwcm9jZXNzaW5nJyk7XG4gIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogJ0dFVCcsXG4gICAgYXN5bmM6ICAgdHJ1ZSxcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGZpbGUpXG4gICAge1xuICAgICAgemlwLmZvbGRlcihwYXRoX2JpdHNbMV0pLmZpbGUocGF0aF9iaXRzWzJdLCBmaWxlKTtcbiAgICAgIGlmKGN0bCA9PT0gJ2hvcml6JylcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLCBmaWxlKTtcbiAgICAgICAgYmlvZDMucHNpcHJlZChmaWxlLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdzczInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYmRhdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BiZGF0KHJhY3RpdmUsIGZpbGUpO1xuICAgICAgICAvL2FsZXJ0KCdQQkRBVCBwcm9jZXNzJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdjb21iJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21lbXNhdGRhdGEnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ3BnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2dlbl9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdkb21fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2RnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BhcnNlZHMnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYXJzZWRzKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZmZwcmVkZmVhdHVyZXMnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9mZWF0Y2ZnKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZmZwcmVkcHJlZGljdGlvbnMnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9mZnByZWRzKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWV0c2l0ZScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21ldHNpdGUocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdoc3ByZWQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9oc3ByZWQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChKU09OLnN0cmluZ2lmeShlcnJvcikpO31cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCIvL2dpdmVuIGFuZCBhcnJheSByZXR1cm4gd2hldGhlciBhbmQgZWxlbWVudCBpcyBwcmVzZW50XG5leHBvcnQgZnVuY3Rpb24gaXNJbkFycmF5KHZhbHVlLCBhcnJheSkge1xuICBpZihhcnJheS5pbmRleE9mKHZhbHVlKSA+IC0xKVxuICB7XG4gICAgcmV0dXJuKHRydWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybihmYWxzZSk7XG4gIH1cbn1cblxuLy93aGVuIGEgcmVzdWx0cyBwYWdlIGlzIGluc3RhbnRpYXRlZCBhbmQgYmVmb3JlIHNvbWUgYW5ub3RhdGlvbnMgaGF2ZSBjb21lIGJhY2tcbi8vd2UgZHJhdyBhbmQgZW1wdHkgYW5ub3RhdGlvbiBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKXtcblxuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIGxldCByZXNpZHVlcyA9IHNlcS5zcGxpdCgnJyk7XG4gIGxldCBhbm5vdGF0aW9ucyA9IFtdO1xuICByZXNpZHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlcyl7XG4gICAgYW5ub3RhdGlvbnMucHVzaCh7J3Jlcyc6IHJlc30pO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChyYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKSwge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xufVxuXG4vL2dpdmVuIGEgVVJMIHJldHVybiB0aGUgYXR0YWNoZWQgdmFyaWFibGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJsVmFycygpIHtcbiAgICBsZXQgdmFycyA9IHt9O1xuICAgIC8vY29uc2lkZXIgdXNpbmcgbG9jYXRpb24uc2VhcmNoIGluc3RlYWQgaGVyZVxuICAgIGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSxcbiAgICBmdW5jdGlvbihtLGtleSx2YWx1ZSkge1xuICAgICAgdmFyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhcnM7XG4gIH1cblxuLyohIGdldEVtUGl4ZWxzICB8IEF1dGhvcjogVHlzb24gTWF0YW5pY2ggKGh0dHA6Ly9tYXRhbmljaC5jb20pLCAyMDEzIHwgTGljZW5zZTogTUlUICovXG4oZnVuY3Rpb24gKGRvY3VtZW50LCBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAvLyBFbmFibGUgc3RyaWN0IG1vZGVcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIEZvcm0gdGhlIHN0eWxlIG9uIHRoZSBmbHkgdG8gcmVzdWx0IGluIHNtYWxsZXIgbWluaWZpZWQgZmlsZVxuICAgIGxldCBpbXBvcnRhbnQgPSBcIiFpbXBvcnRhbnQ7XCI7XG4gICAgbGV0IHN0eWxlID0gXCJwb3NpdGlvbjphYnNvbHV0ZVwiICsgaW1wb3J0YW50ICsgXCJ2aXNpYmlsaXR5OmhpZGRlblwiICsgaW1wb3J0YW50ICsgXCJ3aWR0aDoxZW1cIiArIGltcG9ydGFudCArIFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50ICsgXCJwYWRkaW5nOjBcIiArIGltcG9ydGFudDtcblxuICAgIHdpbmRvdy5nZXRFbVBpeGVscyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICAgICAgbGV0IGV4dHJhQm9keTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEVtdWxhdGUgdGhlIGRvY3VtZW50RWxlbWVudCB0byBnZXQgcmVtIHZhbHVlIChkb2N1bWVudEVsZW1lbnQgZG9lcyBub3Qgd29yayBpbiBJRTYtNylcbiAgICAgICAgICAgIGVsZW1lbnQgPSBleHRyYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYm9keVwiKTtcbiAgICAgICAgICAgIGV4dHJhQm9keS5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQ7XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGV4dHJhQm9keSwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYW5kIHN0eWxlIGEgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGU7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgY2xpZW50IHdpZHRoIG9mIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHZhbHVlID0gdGVzdEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgaWYgKGV4dHJhQm9keSkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBleHRyYSBib2R5IGVsZW1lbnRcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChleHRyYUJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlbSB2YWx1ZSBpbiBwaXhlbHNcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KGRvY3VtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9jb21tb24vY29tbW9uX2luZGV4LmpzIiwiLyogMS4gQ2F0Y2ggZm9ybSBpbnB1dFxuICAgICAyLiBWZXJpZnkgZm9ybVxuICAgICAzLiBJZiBnb29kIHRoZW4gbWFrZSBmaWxlIGZyb20gZGF0YSBhbmQgcGFzcyB0byBiYWNrZW5kXG4gICAgIDQuIHNocmluayBmb3JtIGF3YXlcbiAgICAgNS4gT3BlbiBzZXEgcGFuZWxcbiAgICAgNi4gU2hvdyBwcm9jZXNzaW5nIGFuaW1hdGlvblxuICAgICA3LiBsaXN0ZW4gZm9yIHJlc3VsdFxuKi9cbmltcG9ydCB7IHZlcmlmeV9hbmRfc2VuZF9mb3JtIH0gZnJvbSAnLi9mb3Jtcy9mb3Jtc19pbmRleC5qcyc7XG5pbXBvcnQgeyBzZW5kX3JlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF9wcmV2aW91c19kYXRhIH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0VXJsVmFycyB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBzZXRfYWR2YW5jZWRfcGFyYW1zIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGNsZWFyX3NldHRpbmdzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHByZXBhcmVfZG93bmxvYWRzX2h0bWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgaGFuZGxlX3Jlc3VsdHMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2V0X2Rvd25sb2Fkc19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzaG93X3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGRpc3BsYXlfc3RydWN0dXJlIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcblxudmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJy5jb3B5QnV0dG9uJyk7XG52YXIgemlwID0gbmV3IEpTWmlwKCk7XG5cbmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuXG4vLyBTRVQgRU5EUE9JTlRTIEZPUiBERVYsIFNUQUdJTkcgT1IgUFJPRFxubGV0IGVuZHBvaW50c191cmwgPSBudWxsO1xubGV0IHN1Ym1pdF91cmwgPSBudWxsO1xubGV0IHRpbWVzX3VybCA9IG51bGw7XG5sZXQgZ2VhcnNfc3ZnID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbmxldCBtYWluX3VybCA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWtcIjtcbmxldCBhcHBfcGF0aCA9IFwiL3BzaXByZWRfYmV0YVwiO1xubGV0IGZpbGVfdXJsID0gJyc7XG5sZXQgZ2Vhcl9zdHJpbmcgPSAnPG9iamVjdCB3aWR0aD1cIjE0MFwiIGhlaWdodD1cIjE0MFwiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCIgZGF0YT1cIicrZ2VhcnNfc3ZnKydcIj48L29iamVjdD4nO1xubGV0IGpvYl9saXN0ID0gW1wicHNpcHJlZFwiLCBcInBnZW50aHJlYWRlclwiLCBcIm1ldGFwc2ljb3ZcIiwgXCJkaXNvcHJlZFwiLCBcIm1lbXBhY2tcIixcbiAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIiwgXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgc2VxX2pvYl9saXN0ID0gW1wicHNpcHJlZFwiLCBcInBnZW50aHJlYWRlclwiLCBcIm1ldGFwc2ljb3ZcIiwgXCJkaXNvcHJlZFwiLCBcIm1lbXBhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLF07XG5sZXQgc3RydWN0X2pvYl9saXN0ID0gW1wibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IGpvYl9uYW1lcyA9IHtcbiAgJ3BzaXByZWQnOiAnUFNJUFJFRCBWNC4wJyxcbiAgJ2Rpc29wcmVkJzogJ0RJT1NQUkVEIDMnLFxuICAnbWVtc2F0c3ZtJzogJ01FTVNBVC1TVk0nLFxuICAncGdlbnRocmVhZGVyJzogJ3BHZW5USFJFQURFUicsXG4gICdtZW1wYWNrJzogJ01FTVBBQ0snLFxuICAnZ2VudGhyZWFkZXInOiAnR2VuVEhSRUFERVInLFxuICAnZG9tcHJlZCc6ICdEb21QcmVkJyxcbiAgJ3Bkb210aHJlYWRlcic6ICdwRG9tVEhSRUFERVInLFxuICAnYmlvc2VyZic6ICdCaW9zU2VyZiB2Mi4wJyxcbiAgJ2RvbXNlcmYnOiAnRG9tU2VyZiB2Mi4xJyxcbiAgJ2ZmcHJlZCc6ICdGRlByZWQgMycsXG4gICdtZXRhcHNpY292JzogJ01ldGFQU0lDT1YnLFxuICAnbWV0c2l0ZSc6ICdNZXRTaXRlJyxcbiAgJ2hzcHJlZCc6ICdIU1ByZWQnLFxuICAnbWVtZW1iZWQnOiAnTUVNRU1CRUQnLFxuICAnZ2VudGRiJzogJ0dlbmVyYXRlIFREQicsXG59O1xuXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIilcbntcbiAgZW5kcG9pbnRzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9qb2J0aW1lcy8nO1xuICBhcHBfcGF0aCA9ICcvaW50ZXJmYWNlJztcbiAgbWFpbl91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwJztcbiAgZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xuICBmaWxlX3VybCA9IG1haW5fdXJsO1xufVxuZWxzZSBpZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJiaW9pbmZzdGFnZTEuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgID09PSBcImJpb2luZi5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ocmVmICA9PT0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvXCIpIHtcbiAgZW5kcG9pbnRzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9qb2J0aW1lcy8nO1xuICBmaWxlX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoK1wiL2FwaVwiO1xuICAvL2dlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbn1cbmVsc2Uge1xuICBhbGVydCgnVU5TRVRUSU5HIEVORFBPSU5UUyBXQVJOSU5HLCBXQVJOSU5HIScpO1xuICBlbmRwb2ludHNfdXJsID0gJyc7XG4gIHN1Ym1pdF91cmwgPSAnJztcbiAgdGltZXNfdXJsID0gJyc7XG59XG5cbmxldCBpbml0aWFsaXNhdGlvbl9kYXRhID0ge1xuICAgIHNlcXVlbmNlX2Zvcm1fdmlzaWJsZTogMSxcbiAgICBzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfdmlzaWJsZTogMSxcbiAgICByZXN1Ym1pc3Npb25fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3BhbmVsX3Zpc2libGU6IDEsXG4gICAgc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZTogMCxcbiAgICBiaW9zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXNlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tcHJlZF9hZHZhbmNlZDogMCxcbiAgICBmZnByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWV0c2l0ZV9hZHZhbmNlZDogMCxcbiAgICBoc3ByZWRfYWR2YW5jZWQ6IDAsXG4gICAgbWVtZW1iYWRfYWR2YW5jZWQ6IDAsXG4gICAgbW9kZWxsZXJfa2V5OiBudWxsLFxuICAgIGRvd25sb2FkX2xpbmtzOiAnJyxcblxuICAgIHBzaXByZWRfaG9yaXo6IG51bGwsXG4gICAgZGlzb19wcmVjaXNpb246IG51bGwsXG4gICAgbWVtc2F0c3ZtX3NjaGVtYXRpYzogJycsXG4gICAgbWVtc2F0c3ZtX2NhcnRvb246ICcnLFxuICAgIHBnZW5fdGFibGU6IG51bGwsXG4gICAgcGdlbl9hbm5fc2V0OiB7fSxcbiAgICBtZW1zYXRwYWNrX3NjaGVtYXRpYzogJycsXG4gICAgbWVtc2F0cGFja19jYXJ0b29uOiAnJyxcbiAgICBnZW5fdGFibGU6IG51bGwsXG4gICAgZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIHBhcnNlZHNfaW5mbzogbnVsbCxcbiAgICBwYXJzZWRzX3BuZzogbnVsbCxcbiAgICBkZ2VuX3RhYmxlOiBudWxsLFxuICAgIGRnZW5fYW5uX3NldDoge30sXG4gICAgYmlvc2VyZl9tb2RlbDogbnVsbCxcbiAgICBkb21zZXJmX2J1dHRvbnM6ICcnLFxuICAgIGRvbXNlcmZfbW9kZWxfdXJpczogW10sXG4gICAgZmZwcmVkX2NhcnRvb246IG51bGwsXG4gICAgc2NoX3NjaGVtYXRpYzogbnVsbCxcbiAgICBhYV9jb21wb3NpdGlvbjogbnVsbCxcbiAgICBnbG9iYWxfZmVhdHVyZXM6IG51bGwsXG4gICAgZnVuY3Rpb25fdGFibGVzOiBudWxsLFxuICAgIG1ldGFwc2ljb3ZfbWFwOiBudWxsLFxuICAgIG1ldHNpdGVfdGFibGU6IG51bGwsXG4gICAgbWV0c2l0ZV9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3RhYmxlOiBudWxsLFxuICAgIGhzcHJlZF9pbml0aWFsX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfc2Vjb25kX3BkYjogbnVsbCxcbiAgICB0ZGJfZmlsZTogbnVsbCxcbiAgICBtZW1lbWJlZF9wZGI6IG51bGwsXG5cbiAgICBtZXRhcHNpY292X2RhdGE6IG51bGwsXG4gICAgbWV0c2l0ZV9kYXRhOiBudWxsLFxuICAgIGhzcHJlZF9kYXRhOiBudWxsLFxuICAgIG1lbWVtYmVkX2RhdGE6IG51bGwsXG4gICAgZ2VudGRiX2RhdGE6IG51bGwsXG5cbiAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICBzZXF1ZW5jZTogJycsXG4gICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgZW1haWw6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGJhdGNoX3V1aWQ6IG51bGwsXG4gICAgLy9ob2xkIGFubm90YXRpb25zIHRoYXQgYXJlIHJlYWQgZnJvbSBkYXRhZmlsZXNcbiAgICBhbm5vdGF0aW9uczogbnVsbCxcbn07XG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfYnV0dG9uJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2pvYiddID0gam9iX25hbWUrJ19qb2InO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJ10gPSAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19pY29uJ10gPSBnZWFyX3N0cmluZztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfdGltZSddID0gJ0xvYWRpbmcgRGF0YSc7XG59KTtcbmluaXRpYWxpc2F0aW9uX2RhdGEubWVtZW1iZWRfY2hlY2tlZCA9IHRydWU7XG5pbml0aWFsaXNhdGlvbl9kYXRhLm1lbWVtYmVkX2FkdmFuY2VkID0gMTtcbmluaXRpYWxpc2F0aW9uX2RhdGEuc2VxdWVuY2VfZm9ybV92aXNpYmxlID0gMDtcbmluaXRpYWxpc2F0aW9uX2RhdGEuc3RydWN0dXJlX2Zvcm1fdmlzaWJsZSA9IDE7XG4vLyBERUNMQVJFIFZBUklBQkxFUyBhbmQgaW5pdCByYWN0aXZlIGluc3RhbmNlXG52YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgZWw6ICcjcHNpcHJlZF9zaXRlJyxcbiAgdGVtcGxhdGU6ICcjZm9ybV90ZW1wbGF0ZScsXG4gIGRhdGE6IGluaXRpYWxpc2F0aW9uX2RhdGEsXG59KTtcblxuLy9zZXQgc29tZSB0aGluZ3Mgb24gdGhlIHBhZ2UgZm9yIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXJcbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiKSB7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcsICdkYW5pZWwuYnVjaGFuQHVjbC5hYy51aycpO1xuICByYWN0aXZlLnNldCgnbmFtZScsICd0ZXN0Jyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsICdRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBUycpO1xufVxuXG4vLzRiNmFkNzkyLWVkMWYtMTFlNS04OTg2LTk4OTA5NmMxM2VlNlxubGV0IHV1aWRfcmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xubGV0IHV1aWRfbWF0Y2ggPSB1dWlkX3JlZ2V4LmV4ZWMoZ2V0VXJsVmFycygpLnV1aWQpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy9cbi8vIEFQUExJQ0FUSU9OIEhFUkVcbi8vXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vL0hlcmUgd2VyZSBrZWVwIGFuIGV5ZSBvbiBzb21lIGZvcm0gZWxlbWVudHMgYW5kIHJld3JpdGUgdGhlIG5hbWUgaWYgcGVvcGxlXG4vL2hhdmUgcHJvdmlkZWQgYSBmYXN0YSBmb3JtYXR0ZWQgc2VxXG5sZXQgc2VxX29ic2VydmVyID0gcmFjdGl2ZS5vYnNlcnZlKCdzZXF1ZW5jZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSApIHtcblxuXG5cblxuICAgbGV0IHJlZ2V4ID0gL14+KC4rPylcXHMvO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKG5ld1ZhbHVlKTtcbiAgaWYobWF0Y2gpXG4gIHtcbiAgICB0aGlzLnNldCgnbmFtZScsIG1hdGNoWzFdKTtcbiAgfVxuICAvLyBlbHNlIHtcbiAgLy8gICB0aGlzLnNldCgnbmFtZScsIG51bGwpO1xuICAvLyB9XG5cbiAgfSxcbiAge2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9KTtcblxuLy90aGVzZXMgdHdvIG9ic2VydmVycyBzdG9wIHBlb3BsZSBzZXR0aW5nIHRoZSByZXN1Ym1pc3Npb24gd2lkZ2V0IG91dCBvZiBib3VuZHNcbnJhY3RpdmUub2JzZXJ2ZSggJ3N1YnNlcXVlbmNlX3N0b3AnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX2xlbmd0aCA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZV9sZW5ndGgnKTtcbiAgbGV0IHNlcV9zdGFydCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcpO1xuICBpZih2YWx1ZSA+IHNlcV9sZW5ndGgpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9sZW5ndGgpO1xuICB9XG4gIGlmKHZhbHVlIDw9IHNlcV9zdGFydClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX3N0YXJ0KzEpO1xuICB9XG59KTtcbnJhY3RpdmUub2JzZXJ2ZSggJ3N1YnNlcXVlbmNlX3N0YXJ0JywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9zdG9wID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0b3AnKTtcbiAgaWYodmFsdWUgPCAxKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0JywgMSk7XG4gIH1cbiAgaWYodmFsdWUgPj0gc2VxX3N0b3ApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCBzZXFfc3RvcC0xKTtcbiAgfVxufSk7XG5cbi8vQWZ0ZXIgYSBqb2IgaGFzIGJlZW4gc2VudCBvciBhIFVSTCBhY2NlcHRlZCB0aGlzIHJhY3RpdmUgYmxvY2sgaXMgY2FsbGVkIHRvXG4vL3BvbGwgdGhlIGJhY2tlbmQgdG8gZ2V0IHRoZSByZXN1bHRzXG5yYWN0aXZlLm9uKCdwb2xsX3RyaWdnZXInLCBmdW5jdGlvbihuYW1lLCBzZXFfdHlwZSl7XG4gIGNvbnNvbGUubG9nKFwiUG9sbGluZyBiYWNrZW5kIGZvciByZXN1bHRzXCIpO1xuICBsZXQgdXJsID0gc3VibWl0X3VybCArIHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCBhcHBfcGF0aCsnLyZ1dWlkPScrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKSk7XG4gIGlmKHNlcV90eXBlKXtcbiAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gIH1cbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICBsZXQgYmF0Y2ggPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGRvd25sb2Fkc19pbmZvID0ge307XG5cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0NvbXBsZXRlJylcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlbmRlciByZXN1bHRzXCIpO1xuICAgICAgbGV0IHN1Ym1pc3Npb25zID0gYmF0Y2guc3VibWlzc2lvbnM7XG4gICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpO1xuICAgICAgICAgIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMpO1xuXG4gICAgICB9KTtcbiAgICAgIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pO1xuXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdFcnJvcicgfHwgYmF0Y2guc3RhdGUgPT09ICdDcmFzaCcpXG4gICAge1xuICAgICAgbGV0IHN1Ym1pc3Npb25fbWVzc2FnZSA9IGJhdGNoLnN1Ym1pc3Npb25zWzBdLmxhc3RfbWVzc2FnZTtcbiAgICAgIGFsZXJ0KFwiUE9MTElORyBFUlJPUjogSm9iIEZhaWxlZFxcblwiK1xuICAgICAgICAgICAgXCJQbGVhc2UgQ29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51ayBxdW90aW5nIHRoaXMgZXJyb3IgbWVzc2FnZSBhbmQgeW91ciBqb2IgSURcXG5cIitzdWJtaXNzaW9uX21lc3NhZ2UpO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0sIDUwMDApO1xuXG59LHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfVxuKTtcblxuLy8gT24gY2xpY2tpbmcgdGhlIEdldCBaaXAgZmlsZSBsaW5rIHRoaXMgd2F0Y2hlcnMgcHJlcGFyZXMgdGhlIHppcCBhbmQgaGFuZHMgaXQgdG8gdGhlIHVzZXJcbnJhY3RpdmUub24oJ2dldF96aXAnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGxldCB1dWlkID0gcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTpcImJsb2JcIn0pLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgc2F2ZUFzKGJsb2IsIHV1aWQrXCIuemlwXCIpO1xuICAgIH0pO1xufSk7XG5cbnJhY3RpdmUub24oJ3Nob3dfYmlvc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnYmlvc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXNlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21wcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21wcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZmZwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdmZnByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWV0c2l0ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2hzcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnaHNwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21lbWVtYmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbi8vIFRoZXNlIHJlYWN0IHRvIHRoZSBoZWFkZXJzIGJlaW5nIGNsaWNrZWQgdG8gdG9nZ2xlIHRoZSBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdzZXF1ZW5jZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIGxldCBzZXR0aW5nID0gZmFsc2U7XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BzaXByZWQnKXtzZXR0aW5nID0gdHJ1ZTt9XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgc2V0dGluZyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ3N0cnVjdHVyZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBmYWxzZSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHNob3dfcGFuZWwoMSwgcmFjdGl2ZSk7XG59KTtcblxuLy9yZWdpc3RlciBsaXN0ZW5lcnMgZm9yIGVhY2ggcmVzdWx0cyBwYW5lbFxuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSwgaSl7XG4gIGNvbnNvbGUubG9nKFwiYWRkaW5nIGpvYnMgd2F0Y2hlcnNcIik7XG4gIHJhY3RpdmUub24oam9iX25hbWUrJ19hY3RpdmUnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICBzaG93X3BhbmVsKGkrMiwgcmFjdGl2ZSk7XG4gICAgaWYoam9iX25hbWUgPT09IFwicHNpcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gXCJkaXNvcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZXRfcGRiLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnaHNwcmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgaW5pdGlhbF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJyk7XG4gICAgICAgIGxldCBzZWNvbmRfcGRiID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGluaXRpYWxfcGRiLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShzZWNvbmRfcGRiLCAgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICAgbGV0IG1lbWVtYmVkX3BkYiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKTtcbiAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1lbWVtYmVkX3BkYiwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbiggJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgY29uc29sZS5sb2coXCJTVUJNSVNTSU9OIEFDVElWRVwiKTtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcblxuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgbGV0IHN0cnVjdF90eXBlID0gZmFsc2U7XG4gIGxldCBzZXFfdHlwZSA9IGZhbHNlO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHN0cnVjdF9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc3RydWN0X3R5cGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc2VxX2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzZXFfdHlwZSA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIC8vSEFORExFIEZGUFJFRCBKT0IgU0VMRUNUSU9OLlxuICBpZihjaGVja19zdGF0ZXMuYmlvc2VyZl9jaGVja2VkIHx8IGNoZWNrX3N0YXRlcy5kb21zZXJmX2NoZWNrZWQpXG4gIHtcbiAgICBsZXQgYmlvc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBsZXQgZG9tc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBpZihiaW9zX21vZGVsbGVyX3Rlc3QgfHwgZG9tc19tb2RlbGxlcl90ZXN0KVxuICAgIHtcbiAgICAgIHN1Ym1pdF9qb2IgPXRydWU7XG4gIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3QgcHJvdmlkZWQgYSB2YWxpZCBNT0RFTExFUiBrZXkuIENvbnRhY3QgdGhlIFNhbGkgbGFiIGZvciBhIE1PREVMTEVSIGxpY2VuY2UuXCIpO1xuICAgIH1cbiAgfVxuICBlbHNle1xuICAgIHN1Ym1pdF9qb2I9dHJ1ZTtcbiAgfVxuICBpZihzZXFfdHlwZSAmJiBzdHJ1Y3RfdHlwZSlcbiAge1xuICAgIGFsZXJ0KFwiWW91IGNhbiBub3Qgc3VibWl0IGJvdGggc2VxdWVuY2UgYW5kIHN0cnVjdHVyZSBhbmFseXNpcyBqb2JzXCIpO1xuICAgIHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgfVxuICBpZihzdWJtaXRfam9iKVxuICB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nXCIpO1xuICAgIGlmKHNlcV90eXBlKVxuICAgIHtcbiAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgfVxuICAgIGlmKHN0cnVjdF90eXBlKVxuICAgIHtcbiAgICAgIGxldCBwZGJGaWxlID0gbnVsbDtcbiAgICAgIGxldCBwZGJEYXRhID0gJyc7XG4gICAgICB0cnl7XG4gICAgICAgcGRiRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGRiRmlsZVwiKTtcbiAgICAgICBsZXQgZmlsZSA9IHBkYkZpbGUuZmlsZXNbMF07XG4gICAgICAgbGV0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcGRiRGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgcGRiRGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgcGRiRGF0YSA9IFwiXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHRydWUsIGZhbHNlKTtcbiAgLy93cml0ZSBuZXcgYW5ub3RhdGlvbiBkaWFncmFtXG4gIC8vc3VibWl0IHN1YnNlY3Rpb25cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0X21vZGVsbGVyX2tleShpbnB1dClcbntcbiAgaWYoaW5wdXQgPT09ICdNT0RFTElSQU5KRScpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgcmV0dXJuKGZhbHNlKTtcbn1cblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBsZXQgc2VxX3R5cGUgPSB0cnVlO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0YXBzaWNvdicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkaXNvcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtcGFjaycpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgaWYoc2VxX3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc2VxX2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKHN0cnVjdF90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3N0cnVjdF9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihlcnJvcl9tZXNzYWdlLmxlbmd0aCA+IDApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZm9ybV9lcnJvcicsIGVycm9yX21lc3NhZ2UpO1xuICAgIGFsZXJ0KFwiRk9STSBFUlJPUjpcIitlcnJvcl9tZXNzYWdlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2luaXRpYWxpc2UgdGhlIHBhZ2VcbiAgICBsZXQgcmVzcG9uc2UgPSB0cnVlO1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgbnVsbCApO1xuICAgIC8vUG9zdCB0aGUgam9icyBhbmQgaW50aWFsaXNlIHRoZSBhbm5vdGF0aW9ucyBmb3IgZWFjaCBqb2JcbiAgICAvL1dlIGFsc28gZG9uJ3QgcmVkdW5kYW50bHkgc2VuZCBleHRyYSBwc2lwcmVkIGV0Yy4uIGpvYnNcbiAgICAvL2J5dCBkb2luZyB0aGVzZSB0ZXN0IGluIGEgc3BlY2lmaWMgb3JkZXJcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoam9iX25hbWUrXCIsXCIpO1xuICAgICAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ19idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2Rpc29wcmVkJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdkb21wcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnYmlvc2VyZicgfHwgam9iX25hbWUgPT09ICdkb21zZXJmJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdtZXRhcHNpY292JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZ2VudGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBkb210aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAyICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICAvLyBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICBpZighIC9BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9