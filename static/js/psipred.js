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
      results_found.pgenthreader = true;
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'gen_sort_presults') {
      results_found.genthreader = true;
      ractive.set("genthreader_waiting_message", '');
      ractive.set("genthreader_waiting_icon", '');
      ractive.set("genthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'gen_presult', zip, ractive);
      downloads_info.genthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'dom_sort_presults') {
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
    if (job_name === 'domserf') {
      if (ractive.get('domserf_model_uris').length) {
        let paths = ractive.get('domserf_model_uris');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[0], '#domserf_model', true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzE0ZTUwYTk1YjBkNzBkNzQ3ZmIiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJ6aXAiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfc2VlbiIsImhzcHJlZF9jaGVja2NoYWluc19zZWVuIiwiZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4iLCJyZXN1bHRzX2ZvdW5kIiwibWV0YXBzaWNvdiIsIm1lbXBhY2siLCJnZW50aHJlYWRlciIsIm1ldHNpdGUiLCJoc3ByZWQiLCJtZW1lbWJlZCIsImdlbnRkYiIsInJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJhbGlnbiIsInBuZ19tYXRjaCIsImJvdW5kYXJ5X3BuZyIsImJvdW5kYXJ5IiwicHJlZF9tYXRjaCIsImRvbXNzZWFwcmVkIiwiZG9tc3NlYV9tYXRjaCIsImRvbXNzZWEiLCJtb2RlbCIsImRpc3BsYXlfc3RydWN0dXJlIiwiaGhibGl0cyIsInBkYmFhIiwiY2F0aGJsYXN0IiwicGRiYmxhc3QiLCJkb21zZXJmX21hdGNoIiwiYnV0dG9uc190YWdzIiwicGF0aHMiLCJzY2hfbWF0Y2giLCJzY2giLCJmZWF0X21hdGNoIiwiZmVhdHVyZXMiLCJwcmVkc19tYXRjaCIsInByZWRzIiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJpbml0aWFsX21hdGNoIiwic2Vjb25kX21hdGNoIiwiaW5pdGlhbCIsInNlY29uZCIsInRkYiIsInVyaSIsImNzc19pZCIsImNhcnRvb25fY29sb3IiLCJhdG9tIiwiaG90c3BvdF9jb2xvciIsImIiLCJlbGVtZW50IiwiJCIsImNvbmZpZyIsImJhY2tncm91bmRDb2xvciIsInZpZXdlciIsIiQzRG1vbCIsImNyZWF0ZVZpZXdlciIsImdldF90ZXh0IiwiYWRkTW9kZWwiLCJzZXRTdHlsZSIsImNvbG9yZnVuYyIsImFkZFN1cmZhY2UiLCJTdXJmYWNlVHlwZSIsIlZEVyIsImNvbG9yc2NoZW1lIiwiaGV0ZmxhZyIsInpvb21UbyIsInJlbmRlciIsInpvb20iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNldF9hZHZhbmNlZF9wYXJhbXMiLCJvcHRpb25zX2RhdGEiLCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnIiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJiaW9zZXJmX21vZGVsbGVyX2tleSIsImRvbXNlcmZfbW9kZWxsZXJfa2V5IiwiY2hlY2tlZCIsImZmcHJlZF9zZWxlY3Rpb24iLCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluIiwiZXh0cmFjdF9mYXN0YV9jaGFpbiIsInNlZWRTaXRlRmluZF9jaGFpbiIsIm1ldHByZWRfd3JhcHBlcl9jaGFpbiIsInNlZWRTaXRlRmluZF9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9mcHIiLCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zIiwiaHNfcHJlZF9maXJzdF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiIsImhzX3ByZWRfc2Vjb25kX2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiIsIm1lbWVtYmVkX2FsZ29yaXRobSIsIm1lbWVtYmVkX2JhcnJlbCIsIm1lbWVtYmVkX3Rlcm1pbmkiLCJzZW5kX3JlcXVlc3QiLCJ1cmwiLCJzZW5kX2RhdGEiLCJyZXNwb25zZSIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJzdWJtaXNzaW9ucyIsImlucHV0X2ZpbGUiLCJqb2JzIiwic3VibWlzc2lvbiIsInNsaWNlIiwic3VibWlzc2lvbl9uYW1lIiwidXJsX3N0dWIiLCJjdGwiLCJwYXRoX2JpdHMiLCJmb2xkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNJbkFycmF5IiwiYXJyYXkiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtIiwia2V5IiwiZG9jdW1lbnRFbGVtZW50IiwiaW1wb3J0YW50Iiwic3R5bGUiLCJnZXRFbVBpeGVscyIsImV4dHJhQm9keSIsImNyZWF0ZUVsZW1lbnQiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYm9keSIsInRlc3RFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwiY2xpcGJvYXJkIiwiQ2xpcGJvYXJkIiwib24iLCJlbmRwb2ludHNfdXJsIiwiZ2VhcnNfc3ZnIiwibWFpbl91cmwiLCJhcHBfcGF0aCIsInNlcV9qb2JfbGlzdCIsInN0cnVjdF9qb2JfbGlzdCIsImhvc3RuYW1lIiwiaW5pdGlhbGlzYXRpb25fZGF0YSIsInNlcXVlbmNlX2Zvcm1fdmlzaWJsZSIsInN0cnVjdHVyZV9mb3JtX3Zpc2libGUiLCJyZXN1bHRzX3Zpc2libGUiLCJyZXN1Ym1pc3Npb25fdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJiaW9zZXJmX2FkdmFuY2VkIiwiZG9tc2VyZl9hZHZhbmNlZCIsImRvbXByZWRfYWR2YW5jZWQiLCJmZnByZWRfYWR2YW5jZWQiLCJtZXRzaXRlX2FkdmFuY2VkIiwiaHNwcmVkX2FkdmFuY2VkIiwibWVtZW1iYWRfYWR2YW5jZWQiLCJtb2RlbGxlcl9rZXkiLCJkb3dubG9hZF9saW5rcyIsImVycm9yX21lc3NhZ2UiLCJwc2lwcmVkX2hvcml6IiwiZGlzb19wcmVjaXNpb24iLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VuX3RhYmxlIiwicGdlbl9hbm5fc2V0IiwibWVtc2F0cGFja19zY2hlbWF0aWMiLCJtZW1zYXRwYWNrX2NhcnRvb24iLCJnZW5fdGFibGUiLCJnZW5fYW5uX3NldCIsInBhcnNlZHNfaW5mbyIsInBhcnNlZHNfcG5nIiwiZGdlbl90YWJsZSIsImRnZW5fYW5uX3NldCIsImJpb3NlcmZfbW9kZWwiLCJkb21zZXJmX2J1dHRvbnMiLCJkb21zZXJmX21vZGVsX3VyaXMiLCJmZnByZWRfY2FydG9vbiIsInNjaF9zY2hlbWF0aWMiLCJmdW5jdGlvbl90YWJsZXMiLCJtZXRhcHNpY292X21hcCIsIm1ldHNpdGVfcGRiIiwiaHNwcmVkX2luaXRpYWxfcGRiIiwiaHNwcmVkX3NlY29uZF9wZGIiLCJ0ZGJfZmlsZSIsIm1lbWVtYmVkX3BkYiIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF9kYXRhIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwicHNpcHJlZF9jaGVja2VkIiwiUmFjdGl2ZSIsImVsIiwidGVtcGxhdGUiLCJ1dWlkX3JlZ2V4IiwidXVpZF9tYXRjaCIsInNlcV9vYnNlcnZlciIsIm9ic2VydmUiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiaW5pdCIsImRlZmVyIiwic2VxX2xlbmd0aCIsInNlcV9zdGFydCIsInNlcV9zdG9wIiwic2VxX3R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImJhdGNoIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwic3VibWlzc2lvbl9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiZXJyb3JfdGV4dCIsImNvbnRleHQiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiIsImJsb2IiLCJzYXZlQXMiLCJldmVudCIsImFkdiIsInNldHRpbmciLCJtZXRfcGRiIiwiaW5pdGlhbF9wZGIiLCJzZWNvbmRfcGRiIiwic3VibWl0X2pvYiIsInNlcV9jb3VudCIsInRvVXBwZXJDYXNlIiwiY2hlY2tfc3RhdGVzIiwic3RydWN0X3R5cGUiLCJiaW9zZXJmX2NoZWNrZWQiLCJkb21zZXJmX2NoZWNrZWQiLCJiaW9zX21vZGVsbGVyX3Rlc3QiLCJ0ZXN0X21vZGVsbGVyX2tleSIsImRvbXNfbW9kZWxsZXJfdGVzdCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwicGRiRmlsZSIsInBkYkRhdGEiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsInJlYWRBc1RleHQiLCJvbmxvYWQiLCJyZXN1bHQiLCJtZXNzYWdlIiwib3JpZ2luYWwiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0Iiwic3RvcCIsInN1YnNlcXVlbmNlIiwiaW5wdXQiLCJjYW5jZWwiLCJwcmV2aW91c19kYXRhIiwibG9hZE5ld0FsaWdubWVudCIsImFsblVSSSIsImFublVSSSIsInRpdGxlIiwib3BlbiIsImJ1aWxkTW9kZWwiLCJtb2Rfa2V5Iiwic3dhcERvbXNlcmYiLCJ1cmlfbnVtYmVyIiwiam9iX3N0cmluZyIsImNoZWNrX2xpc3QiLCJ2ZXJpZnlfc2VxX2Zvcm0iLCJ2ZXJpZnlfc3RydWN0X2Zvcm0iLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9jaGVja2VkIiwic3Ry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QUNFNlEsb0JBQWdCQSxnQkFBZ0IsZ0ZBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFHcFQsSUFBSWpHLE1BQUosR0FBYSxJQUFoQixFQUNBO0FBQ0VxWixvQkFBZ0JBLGdCQUFnQiw0Q0FBaEM7QUFDRDtBQUNELE1BQUdwVCxJQUFJakcsTUFBSixHQUFhLEVBQWhCLEVBQ0E7QUFDRXFaLG9CQUFnQkEsZ0JBQWdCLDZDQUFoQztBQUNEOztBQUVEO0FBQ0EsTUFBSXdILG1CQUFtQixDQUFDNWEsSUFBSTNGLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q04sTUFBbkU7QUFDQSxNQUFJNmdCLG1CQUFpQjVhLElBQUlqRyxNQUF0QixHQUFnQyxJQUFuQyxFQUNBO0FBQ0VxWixvQkFBZ0JBLGdCQUFnQix3R0FBaEM7QUFDRDtBQUNELE1BQUcsK0JBQStCdUgsSUFBL0IsQ0FBb0MzYSxHQUFwQyxDQUFILEVBQ0E7QUFDRW9ULG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUFwRCxDQUFVLElBQVYsRUFBZ0IwSyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ3RILG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEOztBQUVELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzE0ZTUwYTk1YjBkNzBkNzQ3ZmIiLCJleHBvcnQgZnVuY3Rpb24gcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBoc3ByZWRfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtIb3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjZmZmZmZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLUhvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24taW50ZXJmYWNlIHJlc2lkdWU8L3RkPjwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkNoYWluL1Jlc2lkdWU8L3RoPjx0aD5SZXNpZHVlIElkZW50aXR5PC90aD48dGg+U2NvcmU8L3RoPic7XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAzKXtcbiAgICAgIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9XG4gIH0pO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgaHNwcmVkX3RhYmxlKTtcbn1cblxuLy8gcGFyc2UgdGhlIHNtYWxsIG1ldHNpdGUgb3V0cHV0IHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbWV0c2l0ZV90YWJsZSA9ICc8YnIgLz48dGFibGU+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO01ldGFsIEJpbmRpbmcgQ29udGFjdDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Q2hhaW4gbm90IHByZWRpY3RlZDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7UHJlZGljdGVkIGNoYWluPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+UmVzaWR1ZSBOdW1iZXI8L3RoPjx0aD5SYXcgTmV1cmFsIE5ldHdvcmsgU2NvcmU8L3RoPjx0aD5SZXNpZHVlPC90aD4nO1xuICBsZXQgaGl0X3JlZ2V4ID0gL1xcZCtcXHMuKz9cXHNcXHd7M31cXGQrL2c7XG4gIGxldCBoaXRfbWF0Y2hlcyA9IGZpbGUubWF0Y2goaGl0X3JlZ2V4KTtcbiAgaWYoaGl0X21hdGNoZXMpXG4gIHtcbiAgICBoaXRfbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMvKTtcbiAgICAgIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfSk7XG4gIH1cbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbWV0c2l0ZV90YWJsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZnByZWRzKHJhY3RpdmUsIGZpbGUpe1xuXG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgYnBfZGF0YSA9IFtdO1xuICBsZXQgbWZfZGF0YSA9IFtdO1xuICBsZXQgY2NfZGF0YSA9IFtdO1xuICBsZXQgdGFibGVfZGF0YSA9ICcnO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aCgnIycpKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgaWYoZW50cmllcy5sZW5ndGggPCA0KXtyZXR1cm47fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdCUCcpe2JwX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0NDJyl7Y2NfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnTUYnKXttZl9kYXRhLnB1c2goZW50cmllcyk7fVxuICB9KTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+QmlvbG9naWNhbCBQcm9jZXNzIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBicF9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5Nb2xlY3VsYXIgRnVuY3Rpb24gUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIG1mX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkNlbGx1bGFyIENvbXBvbmVudCBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgY2NfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICB0YWJsZV9kYXRhICs9ICdUaGVzZSBwcmVkaWN0aW9uIHRlcm1zIHJlcHJlc2VudCB0ZXJtcyBwcmVkaWN0ZWQgd2hlcmUgU1ZNIHRyYWluaW5nIGluY2x1ZGVzIGFzc2lnbmVkIEdPIHRlcm1zIGFjcm9zcyBhbGwgZXZpZGVuY2UgY29kZSB0eXBlcy4gU1ZNIHJlbGlhYmlsaXR5IGlzIHJlZ2FyZGVkIGFzIEhpZ2ggKEgpIHdoZW4gTUNDLCBzZW5zaXRpdml0eSwgc3BlY2lmaWNpdHkgYW5kIHByZWNpc2lvbiBhcmUgam9pbnRseSBhYm92ZSBhIGdpdmVuIHRocmVzaG9sZC4gb3RoZXJ3aXNlIFJlbGlhYmlsaXR5IGlzIGluZGljYXRlZCBhcyBMb3cgKEwpLiA8YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbn1cblxuZnVuY3Rpb24gc2V0X2Fhbm9ybSgpe1xuICBsZXQgaEFBX25vcm0gPSB7fTtcbiAgaEFBX25vcm0uQSA9IHsgdmFsOiAwLjA3MTc4MzI0ODAwNjMwOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNzM2NzY2MTUyNDI3NX07XG4gIGhBQV9ub3JtLlYgPSB7IHZhbDogMC4wNTk2MjQ1OTUzNjk5MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAzNzc3OTE1Mjg3NDV9O1xuICBoQUFfbm9ybS5ZID0geyB2YWw6IDAuMDI2MDc1MDY4MjQwNDM3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE0ODIyNDcxNTMxMzc5fTtcbiAgaEFBX25vcm0uVyA9IHsgdmFsOiAwLjAxNDE2NjAwMjYxMjc3MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMDQ3MTgzNTgwMTk5Nn07XG4gIGhBQV9ub3JtLlQgPSB7IHZhbDogMC4wNTI1OTM1ODI5NzI3MTQsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAwOTQ3OTM5NjQ1OTd9O1xuICBoQUFfbm9ybS5TID0geyB2YWw6IDAuMDgyMTIzMjQxMzMyMDk5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI4Njg3NTY2MDgxNTEyfTtcbiAgaEFBX25vcm0uUCA9IHsgdmFsOiAwLjA2NTU1NzUzMTMyMjI0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzNDIzOTM5ODQ5NjczNn07XG4gIGhBQV9ub3JtLkYgPSB7IHZhbDogMC4wMzcxMDM5OTQ5NjkwMDIsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg1NDM0MjMxMzkxODZ9O1xuICBoQUFfbm9ybS5NID0geyB2YWw6IDAuMDIyNTYyODE4MTgzOTU1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDExMzIxMDM5NjYyNDgxfTtcbiAgaEFBX25vcm0uSyA9IHsgdmFsOiAwLjA1NDgzMzk3OTI2OTE4NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyOTI2NDA4MzY2NzE1N307XG4gIGhBQV9ub3JtLkwgPSB7IHZhbDogMC4xMDAxMDU5MTU3NTkwNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDI3NjgwODUxOTAwOX07XG4gIGhBQV9ub3JtLkkgPSB7IHZhbDogMC4wNDIwMzQ1MjYwNDA0NjcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjY4NDkyNjI0OTV9O1xuICBoQUFfbm9ybS5IID0geyB2YWw6IDAuMDI3MTQxNDAzNTM3NTk4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE1NTA1NjYzNzg5ODV9O1xuICBoQUFfbm9ybS5HID0geyB2YWw6IDAuMDY5MTc5ODIwMTA0NTM2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMDg3NTYyMDU3MzI4fTtcbiAgaEFBX25vcm0uUSA9IHsgdmFsOiAwLjA2NTkyMDU2MTkzMTgwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDEwMzA5MTAwODM2Nn07XG4gIGhBQV9ub3JtLkUgPSB7IHZhbDogMC4wNDY0Nzg0NjIyNTgzOCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxOTk0NjI2OTQ2MTczNn07XG4gIGhBQV9ub3JtLkMgPSB7IHZhbDogMC4wMjQ5MDg1NTE4NzIwNTYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjI5MDk1ODk1MDR9O1xuICBoQUFfbm9ybS5EID0geyB2YWw6IDAuMDQ0MzM3OTA0NzI2MDQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NDM2Njc3MjU2NzI2fTtcbiAgaEFBX25vcm0uTiA9IHsgdmFsOiAwLjAzMzUwNzAyMDk4NzAzMyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNjUzNjAyMjI4ODIwNH07XG4gIGhBQV9ub3JtLlIgPSB7IHZhbDogMC4wNTk3NDA0NjkwMzExOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNTE2NTk5NDc3MzM4NH07XG4gIHJldHVybihoQUFfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIHNldF9mbm9ybSgpe1xuICBsZXQgaEZfbm9ybSA9IHt9O1xuICBoRl9ub3JtLmh5ZHJvcGhvYmljaXR5ID0ge3ZhbDogLTAuMzQ4NzY4MjgwODAxNTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAwLjc1NTU5MTUyNzY5Nzk5fTtcbiAgaEZfbm9ybVsncGVyY2VudCBwb3NpdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuNDU3NzE3NDY2OTQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzLjU2NzEzMzM0MTEzOX07XG4gIGhGX25vcm1bJ2FsaXBoYXRpYyBpbmRleCddID0ge3ZhbDogNzkuOTExNTQ5MzE5MDk5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDE2Ljc4NzYxNzk3ODgyN307XG4gIGhGX25vcm1bJ2lzb2VsZWN0cmljIHBvaW50J10gPSB7dmFsOiA3LjYxMDIwNDYzODM2MDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxLjk3MTYxMTEwMjAwODh9O1xuICBoRl9ub3JtWydtb2xlY3VsYXIgd2VpZ2h0J10gPSB7dmFsOiA0ODY2OC40MTI4Mzk5NjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM3ODM4LjMyNDg5NTk2OX07XG4gIGhGX25vcm0uY2hhcmdlID0ge3ZhbDogNS4wOTkxNzYzMDU3NjA0LFxuICAgICAgICAgICAgICAgICAgICBzZGU6IDE2LjgzODYzNjU5MDI1fTtcbiAgaEZfbm9ybVsncGVyY2VudCBuZWdhdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuMDI2MTkwMTI4MTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiA0LjAyMDY2MzE2ODA5MjZ9O1xuICBoRl9ub3JtWydtb2xhciBleHRpbmN0aW9uIGNvZWZmaWNpZW50J10gPSB7dmFsOiA0NjQ3NS4yOTM5MjM5MjYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM5Mjk5LjM5OTg0ODgyM307XG4gIHJldHVybihoRl9ub3JtKTtcbn1cblxuZnVuY3Rpb24gZ2V0X2FhX2NvbG9yKHZhbCl7XG4gICAgbGV0IGFiX3ZhbCA9IE1hdGguYWJzKHZhbCk7XG4gICAgaWYoYWJfdmFsID49IDIuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjFuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDIuMjQpe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYycFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMm5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWY1cFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmNW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS42NDUgKSB7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjEwcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMTBuXCI7XG4gICAgfVxuICAgIHJldHVybiBcInBsYWluXCI7XG59XG5cbi8vcGFyc2UgdGhlIGZmcHJlZCBmZWF0Y2ZvIGZlYXR1cmVzIGZpbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZWF0Y2ZnKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgU0ZfZGF0YSA9IHt9O1xuICBsZXQgQUFfZGF0YSA9IHt9O1xuICBsZXQgaEZfbm9ybSA9c2V0X2Zub3JtKCk7XG4gIGxldCBoQUFfbm9ybT1zZXRfYWFub3JtKCk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiQUFcIikpe1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIEFBX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJTRlwiKSlcbiAgICB7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgU0ZfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICB9KTtcblxuICAvLyBidWlsZCBodG1sIHRhYmxlcyBmb3IgdGhlIGZlYXR1cmUgZGF0YVxuICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gIGxldCBnbG9iYWxfZmVhdHVyZXMgPSByYWN0aXZlLmdldCgnZ2xvYmFsX2ZlYXR1cmVzJyk7XG4gIGxldCBmZWF0X3RhYmxlID0gJzxiPkdsb2JhbCBGZWF0dXJlczwvYj48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICdHbG9iYWwgZmVhdHVyZXMgYXJlIGNhbGN1bGF0ZWQgZGlyZWN0bHkgZnJvbSBzZXF1ZW5jZS4gTG9jYWxpc2F0aW9uIHZhbHVlcyBhcmUgcHJlZGljdGVkIGJ5IHRoZSBQc29ydCBhbGdvcml0aG0gYW5kIHJlZmxlY3QgdGhlIHJlbGF0aXZlIGxpa2VsaWhvb2Qgb2YgdGhlIHByb3RlaW4gb2NjdXB5aW5nIGRpZmZlcmVudCBjZWxsdWxhciBsb2NhbGlzYXRpb25zLiBUaGUgYmlhcyBjb2x1bW4gaXMgaGlnaGxpZ2h0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzaWduaWZpY2FuY2Ugb2YgdGhlIGZlYXR1cmUgdmFsdWUgY2FsY3VsYXRlZCBmcm9tIFogc2NvcmUgb2YgdGhlIGZlYXR1cmUuPGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+RmVhdHVyZSBOYW1lPC90aD48dGg+VmFsdWU8L3RoPjx0aD5CaWFzPC90aD48L3RyPic7XG5cbiAgT2JqZWN0LmtleXMoU0ZfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZV9uYW1lKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgaWYoZmVhdHVyZV9uYW1lIGluIGhGX25vcm0pe1xuICAgICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKCAocGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLWhGX25vcm1bZmVhdHVyZV9uYW1lXS52YWwpIC8gaEZfbm9ybVtmZWF0dXJlX25hbWVdLnNkZSk7XG4gICAgfVxuICAgIGZlYXRfdGFibGUgKz0gJzx0cj48dGQ+JytmZWF0dXJlX25hbWUrJzwvdGQ+PHRkPicrcGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLnRvRml4ZWQoMikrJzwvdGQ+PHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+PC90cj4nO1xuICB9KTtcbiAgZmVhdF90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgZmVhdF90YWJsZSk7XG5cbiAgLy9idWlsZCBodG1sIHRhYmxlIGZvciB0aGUgQUEgZGF0YVxuICBsZXQgYWFfY29tcG9zaXRpb24gPSByYWN0aXZlLmdldCgnYWFfY29tcG9zaXRpb24nKTtcbiAgbGV0IGFhX3RhYmxlID0gJzxiPkFtaW5vIEFjaWQgQ29tcG9zaXRpb24gKHBlcmNlbnRhZ2VzKTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBhYV90YWJsZSArPSAnPHRoPicrcmVzaWR1ZSsnPC90aD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSktaEFBX25vcm1bcmVzaWR1ZV0udmFsKSAvIGhBQV9ub3JtW3Jlc2lkdWVdLnNkZSk7XG4gICAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nKyhwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pKjEwMCkudG9GaXhlZCgyKSsnPC90ZD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPGI+U2lnbmlmaWNhbmNlIEtleTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlIGNsYXNzPVwic2lnbmlma2V5XCIgYWxpZ249XCJjZW50ZXJcIiBjZWxscGFkZGluZz1cIjJcIiBjZWxsc3BhY2luZz1cIjBcIj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PGI+bG93PC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiOVwiPiZuYnNwOzwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBhbGlnbj1cInJpZ2h0XCI+PGI+aGlnaDwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxblwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMm5cIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVuXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMG5cIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPnAgJmd0Oz0gMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBwXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVwXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYycFwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMXBcIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiMTFcIj5TaWduaWZpY2FuY2UgcCB2YWx1ZSBpcyBjYWxjdWxhdGVkIHVzaW5nIHRoZSBaIHNjb3JlIG9mIHRoZSBwZXJjZW50IGFtaW5vIGFjaWQgY29tcG9zaXRpb248L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIGFhX3RhYmxlKTtcbn1cblxuXG4vLyBmb3IgYSBnaXZlbiBtZW1zYXQgZGF0YSBmaWxlcyBleHRyYWN0IGNvb3JkaW5hdGUgcmFuZ2VzIGdpdmVuIHNvbWUgcmVnZXhcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbWVtc2F0X3JhbmdlcyhyZWdleCwgZGF0YSlcbntcbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCcsJykpXG4gICAge1xuICAgICAgbGV0IHJlZ2lvbnMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbiwgaSl7XG4gICAgICAgIHJlZ2lvbnNbaV0gPSByZWdpb24uc3BsaXQoJy0nKTtcbiAgICAgICAgcmVnaW9uc1tpXVswXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMF0pO1xuICAgICAgICByZWdpb25zW2ldWzFdID0gcGFyc2VJbnQocmVnaW9uc1tpXVsxXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZihtYXRjaFsxXS5pbmNsdWRlcygnLScpKVxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hbMV0pO1xuICAgICAgICBsZXQgc2VnID0gbWF0Y2hbMV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbW10sIF07XG4gICAgICAgIHJlZ2lvbnNbMF1bMF0gPSBwYXJzZUludChzZWdbMF0pO1xuICAgICAgICByZWdpb25zWzBdWzFdID0gcGFyc2VJbnQoc2VnWzFdKTtcbiAgICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4obWF0Y2hbMV0pO1xufVxuXG4vLyB0YWtlIGFuZCBzczIgKGZpbGUpIGFuZCBwYXJzZSB0aGUgZGV0YWlscyBhbmQgd3JpdGUgdGhlIG5ldyBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGFubm90YXRpb25zW2ldLnNzID0gZW50cmllc1szXTtcbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG59XG5cbi8vcGFyc2UgdGhlIGRpc29wcmVkIGNvbWIgZmlsZSBhbmQgYWRkIGl0IHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVjaXNpb24gPSBbXTtcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIHByZWNpc2lvbltpXSA9IHt9O1xuICAgIHByZWNpc2lvbltpXS5wb3MgPSBlbnRyaWVzWzFdO1xuICAgIHByZWNpc2lvbltpXS5wcmVjaXNpb24gPSBlbnRyaWVzWzRdO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJywgcHJlY2lzaW9uKTtcbiAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHByZWNpc2lvbiwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG4vL3BhcnNlIHRoZSBtZW1zYXQgb3V0cHV0XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuICBsZXQgdG9wb19yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1RvcG9sb2d5OlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgc2lnbmFsX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvU2lnbmFsXFxzcGVwdGlkZTpcXHMrKC4rKVxcbi8sIGZpbGUpO1xuICBsZXQgcmVlbnRyYW50X3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvUmUtZW50cmFudFxcc2hlbGljZXM6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCB0ZXJtaW5hbCA9IGdldF9tZW1zYXRfcmFuZ2VzKC9OLXRlcm1pbmFsOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICAvL2NvbnNvbGUubG9nKHNpZ25hbF9yZWdpb25zKTtcbiAgLy8gY29uc29sZS5sb2cocmVlbnRyYW50X3JlZ2lvbnMpO1xuICBsZXQgY29pbF90eXBlID0gJ0NZJztcbiAgaWYodGVybWluYWwgPT09ICdvdXQnKVxuICB7XG4gICAgY29pbF90eXBlID0gJ0VDJztcbiAgfVxuICBsZXQgdG1wX2Fubm8gPSBuZXcgQXJyYXkoc2VxLmxlbmd0aCk7XG4gIGlmKHRvcG9fcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKVxuICB7XG4gICAgbGV0IHByZXZfZW5kID0gMDtcbiAgICB0b3BvX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdUTScsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgICAgaWYocHJldl9lbmQgPiAwKXtwcmV2X2VuZCAtPSAxO31cbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLCByZWdpb25bMF0pO1xuICAgICAgaWYoY29pbF90eXBlID09PSAnRUMnKXsgY29pbF90eXBlID0gJ0NZJzt9ZWxzZXtjb2lsX3R5cGUgPSAnRUMnO31cbiAgICAgIHByZXZfZW5kID0gcmVnaW9uWzFdKzI7XG4gICAgfSk7XG4gICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQtMSwgc2VxLmxlbmd0aCk7XG5cbiAgfVxuICAvL3NpZ25hbF9yZWdpb25zID0gW1s3MCw4M10sIFsxMDIsMTE3XV07XG4gIGlmKHNpZ25hbF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHNpZ25hbF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUycsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIC8vcmVlbnRyYW50X3JlZ2lvbnMgPSBbWzQwLDUwXSwgWzIwMCwyMThdXTtcbiAgaWYocmVlbnRyYW50X3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgcmVlbnRyYW50X3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdSSCcsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIHRtcF9hbm5vLmZvckVhY2goZnVuY3Rpb24oYW5ubywgaSl7XG4gICAgYW5ub3RhdGlvbnNbaV0ubWVtc2F0ID0gYW5ubztcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCB0eXBlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgLy9jb25zb2xlLmxvZyh0eXBlKydfYW5uX3NldCcpO1xuICBsZXQgYW5uX2xpc3QgPSByYWN0aXZlLmdldCh0eXBlKydfYW5uX3NldCcpO1xuICAvL2NvbnNvbGUubG9nKGFubl9saXN0KTtcbiAgaWYoT2JqZWN0LmtleXMoYW5uX2xpc3QpLmxlbmd0aCA+IDApe1xuICBsZXQgcHNldWRvX3RhYmxlID0gJzx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj5cXG4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0cj48dGg+Q29uZi48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk5ldCBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+cC12YWx1ZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UGFpckU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlNvbHZFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBMZW5ndGg8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlRhcmdldCBMZW48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlF1ZXJ5IExlbjwvdGg+JztcbiAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gU3RhcnQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIEVuZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5DQVRIIERvbWFpbjwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggU0NPUDwvdGg+JztcbiAgfWVsc2Uge1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkZvbGQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIENBVEg8L3RoPic7XG4gIH1cbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UERCU1VNPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbGlnbm1lbnQ8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk1PREVMPC90aD4nO1xuXG4gIC8vIGlmIE1PREVMTEVSIFRISU5HWVxuICBwc2V1ZG9fdGFibGUgKz0gJzwvdHI+PHRib2R5XCI+XFxuJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAvL2NvbnNvbGUubG9nKGxpbmUpO1xuICAgIGlmKGxpbmUubGVuZ3RoID09PSAwKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGxldCB0YWJsZV9oaXQgPSBlbnRyaWVzWzldO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHRhYmxlX2hpdCA9IGVudHJpZXNbMTFdO31cbiAgICBpZih0YWJsZV9oaXQrXCJfXCIraSBpbiBhbm5fbGlzdClcbiAgICB7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRyPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZCBjbGFzcz0nXCIrZW50cmllc1swXS50b0xvd2VyQ2FzZSgpK1wiJz5cIitlbnRyaWVzWzBdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzNdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s0XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzZdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s3XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOF0rXCI8L3RkPlwiO1xuICAgIGxldCBwZGIgPSBlbnRyaWVzWzldLnN1YnN0cmluZygwLCBlbnRyaWVzWzldLmxlbmd0aC0yKTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyBwZGIgPSBlbnRyaWVzWzExXS5zdWJzdHJpbmcoMCwgZW50cmllc1sxMV0ubGVuZ3RoLTMpO31cbiAgICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOV0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMTBdK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby92ZXJzaW9uL2xhdGVzdC9kb21haW4vXCIrdGFibGVfaGl0K1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNDT1AgU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbiBQREJTVU08L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdEaXNwbGF5IEFsaWdubWVudCcgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcImNhdGhfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3BkYi9cIitwZGIrXCInPkNBVEggU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbiBQREJTVU08L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdEaXNwbGF5IEFsaWdubWVudCcgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcInBkYl9tb2RlbGxlclxcXCIpOycgdmFsdWU9J0J1aWxkIE1vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlZGljdGlvbl9yZWdleCA9IC9Eb21haW5cXHNCb3VuZGFyeVxcc2xvY2F0aW9uc1xcc3ByZWRpY3RlZFxcc0RQUzpcXHMoLispLztcbiAgbGV0IHByZWRpY3Rpb25fbWF0Y2ggPSAgcHJlZGljdGlvbl9yZWdleC5leGVjKGZpbGUpO1xuICBpZihwcmVkaWN0aW9uX21hdGNoKVxuICB7XG4gICAgbGV0IGRldGFpbHMgPSBmaWxlLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICBkZXRhaWxzID0gZGV0YWlscy5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCI8aDQ+XCIrZGV0YWlscytcIjwvaDQ+XCIpO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBpZihwcmVkaWN0aW9uX21hdGNoWzFdLmluZGV4T2YoXCIsXCIpKVxuICAgIHtcbiAgICAgIHZhbHVlcyA9IHByZWRpY3Rpb25fbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludChwcmVkaWN0aW9uX21hdGNoWzFdKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBhbm5vdGF0aW9uc1t2YWx1ZV0uZG9tcHJlZCA9ICdCJztcbiAgICB9KTtcbiAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCJObyBQYXJzZURTIERvbWFpbiBib3VuZGFyaWVzIHByZWRpY3RlZFwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF90ZXh0IH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd19wYW5lbCh2YWx1ZSwgcmFjdGl2ZSlcbntcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgdmFsdWUgKTtcbn1cblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzLCB6aXApe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgbnVsbCk7XG5cblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIgPSBcIjxoNT5Eb21QcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmZmcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzLCBqb2JfbGlzdClcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBwbmdfcmVnZXggPSAvXFwucG5nJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IG1lbXBhY2tfY2FydG9vbl9yZWdleCA9IC9LYW1hZGEtS2F3YWlfXFxkKy5wbmckLztcbiAgbGV0IG1lbXBhY2tfZ3JhcGhfb3V0ID0gL2lucHV0X2dyYXBoLm91dCQvO1xuICBsZXQgbWVtcGFja19jb250YWN0X3JlcyA9IC9DT05UQUNUX0RFRjEucmVzdWx0cyQvO1xuICBsZXQgbWVtcGFja19saXBpZF9yZXMgPSAvTElQSURfRVhQT1NVUkUucmVzdWx0cyQvO1xuICBsZXQgZG9tc3NlYV9wcmVkX3JlZ2V4ID0gL1xcLnByZWQkLztcbiAgbGV0IGRvbXNzZWFfcmVnZXggPSAvXFwuZG9tc3NlYSQvO1xuICBsZXQgZG9tc2VyZl9yZWdleCA9IC8uK18oXFxkKylfKFxcZCspLipcXC5wZGIvO1xuICBsZXQgZmZwcmVkX3NjaF9yZWdleCA9IC8uK19zY2hcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtcFxcLnBuZy87XG4gIGxldCBmZnByZWRfZmVhdGNmZ19yZWdleCA9IC9cXC5mZWF0Y2ZnLztcbiAgbGV0IGZmcHJlZF9wcmVkc19yZWdleCA9IC9cXC5mdWxsX3Jhdy87XG4gIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICBsZXQgbWV0c2l0ZV90YWJsZV9yZWdleCA9IC9cXC5NZXRwcmVkLztcbiAgbGV0IG1ldHNpdGVfcGRiX3JlZ2V4ID0gL1xcLk1ldFByZWQvO1xuICBsZXQgaHNwcmVkX2luaXRpYWxfcmVnZXggPSAvX2luaXRpYWxcXC5wZGIvO1xuICBsZXQgaHNwcmVkX3NlY29uZF9yZWdleCA9IC9fc2Vjb25kXFwucGRiLztcblxuICBsZXQgaW1hZ2VfcmVnZXggPSAnJztcbiAgbGV0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHM7XG4gIGxldCBkb21haW5fY291bnQgPSAwO1xuICBsZXQgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gZmFsc2U7XG4gIGxldCBoc3ByZWRfY2hlY2tjaGFpbnNfc2VlbiA9IGZhbHNlO1xuICBsZXQgZ2VudGRiX2NoZWNrY2hhaW5zX3NlZW4gPSBmYWxzZTtcbiAgbGV0IHJlc3VsdHNfZm91bmQgPSB7XG4gICAgICBwc2lwcmVkOiBmYWxzZSxcbiAgICAgIGRpc29wcmVkOiBmYWxzZSxcbiAgICAgIG1lbXNhdHN2bTogZmFsc2UsXG4gICAgICBwZ2VudGhyZWFkZXI6IGZhbHNlLFxuICAgICAgbWV0YXBzaWNvdjogZmFsc2UsXG4gICAgICBtZW1wYWNrOiBmYWxzZSxcbiAgICAgIGdlbnRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGRvbXByZWQ6IGZhbHNlLFxuICAgICAgcGRvbXRocmVhZGVyOiBmYWxzZSxcbiAgICAgIGJpb3NlcmY6IGZhbHNlLFxuICAgICAgZG9tc2VyZjogZmFsc2UsXG4gICAgICBmZnByZWQ6IGZhbHNlLFxuICAgICAgbWV0c2l0ZTogZmFsc2UsXG4gICAgICBoc3ByZWQ6IGZhbHNlLFxuICAgICAgbWVtZW1iZWQ6IGZhbHNlLFxuICAgICAgZ2VudGRiOiBmYWxzZSxcbiAgfTtcbiAgbGV0IHJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kID0gZmFsc2U7XG5cbiAgLy9QcmVwYXRvcnkgbG9vcCBmb3IgaW5mb3JtYXRpb24gdGhhdCBpcyBuZWVkZWQgYmVmb3JlIHJlc3VsdHMgcGFyc2luZzpcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJwZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcInBnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9nZW5hbGlnbm1lbnRfYW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbl9kb20nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImRnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgLy9tYWluIHJlc3VsdHMgcGFyc2luZyBsb29wXG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICAvL3BzaXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09ICdwc2lwYXNzMicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5wc2lwcmVkID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByZXN1bHRzX2ZvdW5kLmRpc29wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UEJEQVQgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF90aW1lXCIsICcnKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fY29tYmluZScpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdjb21iJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DT01CIE5OIE91dHB1dDwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIC8vbWVtc2F0IGFuZCBtZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXNhdHN2bScpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1zYXRzdm0gPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hlbWVfbWF0Y2ggPSBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaGVtZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2NoZW1hdGljIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gbWVtc2F0X2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBtZW1zYXRfbWF0Y2ggPSBtZW1zYXRfZGF0YV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtZW1zYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZW1zYXRkYXRhJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIC8vbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1wYWNrX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQubWVtcGFjayA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5wZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIHJlc3VsdHNfZm91bmQuZ2VudGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZ2VuX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5wZG9tdGhyZWFkZXIgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgLy9wZG9tdGhyZWFkZXJcbiAgICAvLyBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3ZtX3Byb2JfZG9tJylcbiAgICAvLyB7XG4gICAgLy8gICBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAvLyAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgLy8gICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIC8vICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgLy8gICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAvLyAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgLy8gfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2RvbV9hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL2RvbXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGFyc2VkcycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5kb21wcmVkID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgcG5nX21hdGNoID0gcG5nX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHBuZ19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnkgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBmaWxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGFyc2VkcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21zc2VhJylcbiAgICB7XG4gICAgICBsZXQgcHJlZF9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWFwcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGRvbXNzZWFfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNzZWFfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncnVuQmlvc2VyZicpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5iaW9zZXJmID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5kb21zZXJmID0gdHJ1ZTtcbiAgICAgICAgaWYoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCl7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgKz0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ1dHRvbnNfdGFncyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9idXR0b25zXCIpO1xuICAgICAgICBidXR0b25zX3RhZ3MgKz0gJzxidXR0b24gb25DbGljaz1cInBzaXByZWQuc3dhcERvbXNlcmYoJytkb21haW5fY291bnQrJylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5Eb21haW4gJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2J1dHRvbj4nO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfYnV0dG9uc1wiLCBidXR0b25zX3RhZ3MpO1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICAgICAgcGF0aHMucHVzaChmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiLCBwYXRocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dldFNjaGVtYXRpYycpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5mZnByZWQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF90aW1lXCIsICcnKTtcblxuICAgICAgbGV0IHNjaF9tYXRjaCA9ICBmZnByZWRfc2NoX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZlYXR1cmUgU2NoZW1hdGljIFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljJywgJzxiPlNlcXVlbmNlIEZlYXR1cmUgTWFwPC9iPjxiciAvPlBvc2l0aW9uIGRlcGVuZGVudCBmZWF0dXJlIHByZWRpY3Rpb25zIGFyZSBtYXBwZWQgb250byB0aGUgc2VxdWVuY2Ugc2NoZW1hdGljIHNob3duIGJlbG93LiBUaGUgbGluZSBoZWlnaHQgb2YgdGhlIFBob3NwaG9yeWxhdGlvbiBhbmQgR2x5Y29zeWxhdGlvbiBmZWF0dXJlcyByZWZsZWN0cyB0aGUgY29uZmlkZW5jZSBvZiB0aGUgcmVzaWR1ZSBwcmVkaWN0aW9uLjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBmZnByZWRfc3ZtX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfY2FydG9vbicsICc8Yj5QcmVkaWN0ZWQgVHJhbnNtZW1icmFuZSBUb3BvbG9neTwvYj48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZWF0dXJlcycpXG4gICAge1xuICAgICAgbGV0IGZlYXRfbWF0Y2ggPSBmZnByZWRfZmVhdGNmZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihmZWF0X21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZXF1ZW5jZSBGZWF0dXJlIFN1bW1hcnk8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRmZWF0dXJlcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAge1xuICAgICAgbGV0IHByZWRzX21hdGNoID0gZmZwcmVkX3ByZWRzX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRzX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5HTyBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZHByZWRpY3Rpb25zJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGxvdF9zZWxmX2NvbnRhY3RfbWFwJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLm1ldGFwc2ljb3YgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBNYXA8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsICc8Yj5Db250YWN0IE1hcDwvYj48YnIgLz48aW1nIGhlaWdodD1cIjgwMFwiIHdpZHRoPVwiODAwXCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY29udGFjdF9wcmVkaWN0b3JzJylcbiAgICB7XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICAgICAgICBsZXQgZXZfbWF0Y2ggPSBtZXRhcHNpY292X2V2X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoZXZfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RnJlZUNvbnRhY3QgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBzX21hdGNoID0gbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihwc19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UFNJQ09WIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjY19tYXRjaCA9IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGNjX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0NNUFJFRCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgID09PSAnbWV0YXBzaWNvdl9zdGFnZTInKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHNpdGVfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgICAgbWV0c2l0ZV9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHByZWRfd3JhcHBlcicpXG4gICAge1xuICAgICAgbGV0IHRhYmxlX21hdGNoID0gbWV0c2l0ZV90YWJsZV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgcGRiX21hdGNoID0gbWV0c2l0ZV9wZGJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgcmVzdWx0c19mb3VuZC5tZXRzaXRlID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfdGltZVwiLCAnJyk7XG4gICAgICBpZih0YWJsZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZXRzaXRlJywgemlwLCByYWN0aXZlKTtcblxuICAgICAgfVxuICAgICAgaWYocGRiX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgUERCPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc3ByZWRfY2hlY2tjaGFpbnMnKVxuICAgIHtcbiAgICAgIGhzcHJlZF9jaGVja2NoYWluc19zZWVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hzX3ByZWQnKVxuICAgIHtcbiAgICAgICAgcmVzdWx0c19mb3VuZC5oc3ByZWQgPSB0cnVlO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SFNQcmVkIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaHNwcmVkJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NwbGl0X3BkYl9maWxlcycpXG4gICAge1xuICAgICAgbGV0IGluaXRpYWxfbWF0Y2ggPSBoc3ByZWRfaW5pdGlhbF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgc2Vjb25kX21hdGNoID0gaHNwcmVkX3NlY29uZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihpbml0aWFsX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SW5pdGlhbCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYoc2Vjb25kX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZWNvbmQgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjaGVja19wZGJfdGRiJyl7XG4gICAgICBnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtYWtldGRiJylcbiAgICB7XG4gICAgICByZXN1bHRzX2ZvdW5kLmdlbnRkYiA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGRiLnRkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlREQiBGaWxlPC9hPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCAnPGgzPjxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2xpY2sgaGVyZSB0byBkb3dubG9hZCB5b3VyIFREQiBGaWxlPC9hPjwvaDM+Jyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1lbWJlZCcpXG4gICAge1xuICAgICAgcmVzdWx0c19mb3VuZC5tZW1lbWJlZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbWVtYmVkX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtZW1iZWQgUERCIGZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgIH1cblxuICB9XG5cbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoISByZXN1bHRzX2ZvdW5kW2pvYl9uYW1lXSlcbiAgICB7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfd2FpdGluZ19tZXNzYWdlXCIsICdUaGUgam9iIGNvbXBsZXRlZCBzdWNjZXNmdWwgYnV0IG5vIHByZWRpY3Rpb24gd2FzIHBvc3NpYmxlIGZvciB0aGUgaW5wdXQgZGF0YS4gTm8gJytqb2JfbmFtZXNbam9iX25hbWVdKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrXCJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZStcIl90aW1lXCIsICcnKTtcbiAgICB9XG4gIH0pO1xuICBpZighIHJlc3VsdHNfZm91bmQubWVtcGFjaylcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGgzPk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTwvaDM+Jyk7XG4gIH1cbiAgaWYobWV0c2l0ZV9jaGVja2NoYWluc19zZWVuICYmICEgcmVzdWx0c19mb3VuZC5tZXRzaXRlKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfbWVzc2FnZVwiLCAnV2UgY291bGQgbm90IGZpbmQgdGhlIFBEQiBDaGFpbiBJRCBwcm92aWRlZCcpO1xuXG4gIH1cbiAgaWYoaHNwcmVkX2NoZWNrY2hhaW5zX3NlZW4gJiYgISByZXN1bHRzX2ZvdW5kLmhzcHJlZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnV2UgY291bGQgbm90IGZpbmQgdGhlIFBEQiBDaGFpbiBJRHMgcHJvdmlkZWQnKTtcbiAgfVxuICBpZihnZW50ZGJfY2hlY2tjaGFpbnNfc2VlbiAmJiAhIHJlc3VsdHNfZm91bmQuZ2VudGRiKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19tZXNzYWdlXCIsICdQREIgcHJvdmlkZWQgZGlkIG5vdCBjb250YWluIGEgc2luZ2xlIGNoYWluIGxhYmxlZCBhcyBjaGFpbiBBJyk7XG4gIH1cblxuXG4gIGlmKHJlc3VsdHNfZm91bmQuZG9tc2VyZilcbiAge1xuICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheV9zdHJ1Y3R1cmUodXJpLCBjc3NfaWQsIGNhcnRvb24pXG57XG4gIGxldCBjYXJ0b29uX2NvbG9yID0gZnVuY3Rpb24oYXRvbSkge1xuICAgIGlmKGF0b20uc3MgPT09ICdoJyl7cmV0dXJuICcjZTM1M2UzJzt9XG4gICAgaWYoYXRvbS5zcyA9PT0gJ3MnKXtyZXR1cm4gJyNlNWRkNTUnO31cbiAgICByZXR1cm4oJ2dyZXknKTtcbiAgfTtcbiAgbGV0IGhvdHNwb3RfY29sb3IgPSBmdW5jdGlvbihhdG9tKXtcbiAgICBpZihhdG9tLmIgPT0gMS4wKXtyZXR1cm4gJ3JlZCc7fVxuICAgIGlmKGF0b20uYiA9PSAwLjUpe3JldHVybiAnYmxhY2snO31cbiAgICBpZihhdG9tLmIgPT0gNTApe3JldHVybiAnd2hpdGUnO31cbiAgICBpZihhdG9tLmIgPT0gMTAwKXtyZXR1cm4gJ3JlZCc7fVxuICAgIHJldHVybihcImJsdWVcIik7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgaWYoY2FydG9vbilcbiAge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBlbHNlIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBob3RzcG90X2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgaWYoY3NzX2lkLnN0YXJ0c1dpdGgoJyNtZW1lbWJlZCcpKXtcbiAgICB2aWV3ZXIuYWRkU3VyZmFjZSgkM0Rtb2wuU3VyZmFjZVR5cGUuVkRXLCB7J29wYWNpdHknOjAuOCwgY29sb3JzY2hlbWU6ICd3aGl0ZUNhcmJvbid9LCB7aGV0ZmxhZzp0cnVlfSx7fSk7XG4gIH1cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldHNpdGUnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2hzcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50ZGInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRkYi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbWVtYmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5wZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuXG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsIGRvd25sb2Fkc19zdHJpbmcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYWR2YW5jZWRfcGFyYW1zKClcbntcbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHt9O1xuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX2VfdmFsdWVfY3V0b2ZmXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IFwiMC4wMVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX3BzaWJsYXN0X2l0ZXJhdGlvbnNcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IDU7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaW9zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXNlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmZwcmVkX2ZseVwiKS5jaGVja2VkKVxuICAgIHsgIG9wdGlvbnNfZGF0YS5mZnByZWRfc2VsZWN0aW9uID0gXCJmbHlcIjt9XG4gICAgZWxzZVxuICAgIHtvcHRpb25zX2RhdGEuZmZwcmVkX3NlbGVjdGlvbiA9IFwiaHVtYW5cIjt9XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24gPSBcImh1bWFuXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gXCJDYVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBcIkNhXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2ZwclwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IFwiNVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IFwiQUJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQlwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9hbGdvcml0aG1cIikudmFsdWU7XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9iYXJyZWxfeWVzXCIpLmNoZWNrZWQpe1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdUUlVFJztcbiAgICB9ZWxzZXtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnRkFMU0UnO1xuICAgIH1cbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX3Rlcm1pbmFsX2luXCIpLmNoZWNrZWQpXG4gICAge1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX3Rlcm1pbmkgPSBcImluXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwib3V0XCI7XG4gICAgfVxuICAgIC8vb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYm91bmRhcmllc1wiKTtcbiAgfVxuICBjYXRjaChlcnIpXG4gIHtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ0ZBTFNFJztcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwiaW5cIjtcbiAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtID0gMDtcbiAgfVxuXG4gIHJldHVybihvcHRpb25zX2RhdGEpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMiLCJpbXBvcnQgeyBnZXRfbWVtc2F0X3JhbmdlcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9zczIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGJkYXQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfY29tYiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZW1zYXRkYXRhIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3ByZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGFyc2VkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZWF0Y2ZnIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZmcHJlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWV0c2l0ZSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9oc3ByZWQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG4vL2dpdmVuIGEgdXJsLCBodHRwIHJlcXVlc3QgdHlwZSBhbmQgc29tZSBmb3JtIGRhdGEgbWFrZSBhbiBodHRwIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX3JlcXVlc3QodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG4gIGNvbnNvbGUubG9nKCdTZW5kaW5nIFVSSSByZXF1ZXN0Jyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnNvbGUubG9nKHR5cGUpO1xuICB2YXIgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gc2VuZCBkYXRhXCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIlNlbmRpbmcgSm9iIHRvIFwiK3VybCtcIiBGYWlsZWQuIFwiK2Vycm9yLnJlc3BvbnNlVGV4dCtcIi4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIHdhcyB1bmFibGUgdG8gcHJvY2VzcyB5b3VyIHN1Ym1pc3Npb24uIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpOyByZXR1cm4gbnVsbDtcbiAgfX0pLnJlc3BvbnNlSlNPTjtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuLy9naXZlbiBhIGpvYiBuYW1lIHByZXAgYWxsIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBzZW5kIGFuIGh0dHAgcmVxdWVzdCB0byB0aGVcbi8vYmFja2VuZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfam9iKHJhY3RpdmUsIGpvYl9uYW1lLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIHZhciBmaWxlID0gbnVsbDtcbiAgdHJ5XG4gIHtcbiAgICBmaWxlID0gbmV3IEJsb2IoW3NlcV0pO1xuICB9IGNhdGNoIChlKVxuICB7XG4gICAgYWxlcnQoZSk7XG4gIH1cbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwiaW5wdXRfZGF0YVwiLCBmaWxlLCAnaW5wdXQudHh0Jyk7XG4gIGZkLmFwcGVuZChcImpvYlwiLGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwic3VibWlzc2lvbl9uYW1lXCIsbmFtZSk7XG4gIGZkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcbiAgaWYoam9iX25hbWUuaW5jbHVkZXMoJ2RvbXByZWQnKSl7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSk7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9uc1wiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdtZXRzaXRlJykpe1xuICBmZC5hcHBlbmQoXCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiZXh0cmFjdF9mYXN0YV9jaGFpblwiLCBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9tZXRhbFwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9tZXRhbFwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2ZwclwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2Zwcik7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnaHNwcmVkJykpe1xuICBmZC5hcHBlbmQoXCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zXCIsIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zKTtcbiAgZmQuYXBwZW5kKFwiaHNfcHJlZF9maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfc2Vjb25kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbik7fVxuICBpZihqb2JfbmFtZS5pbmNsdWRlcygnbWVtZW1iZWQnKSl7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfYmFycmVsXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwpO1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF90ZXJtaW5pXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pKTt9XG4gIGlmKGpvYl9uYW1lLmluY2x1ZGVzKCdmZnByZWQnKSl7XG4gIGZkLmFwcGVuZChcImZmcHJlZF9zZWxlY3Rpb25cIiwgb3B0aW9uc19kYXRhLmZmcHJlZF9zZWxlY3Rpb24pO1xuICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgfVxuICBjb25zb2xlLmxvZyhvcHRpb25zX2RhdGEpO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdnZW50ZGInLCAnbWVtZW1iZWQnXS5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnaHNwcmVkJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbn1cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgc2V0X2FkdmFuY2VkX3BhcmFtcyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBjbGVhcl9zZXR0aW5ncyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBwcmVwYXJlX2Rvd25sb2Fkc19odG1sIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGhhbmRsZV9yZXN1bHRzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNldF9kb3dubG9hZHNfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2hvd19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5X3N0cnVjdHVyZSB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcbmxldCBqb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsIFwibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IHNlcV9qb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIixdO1xubGV0IHN0cnVjdF9qb2JfbGlzdCA9IFtcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWJtaXNzaW9uX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG4gICAgZXJyb3JfbWVzc2FnZTogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcbiAgICBtZXRzaXRlX3RhYmxlOiBudWxsLFxuICAgIG1ldHNpdGVfcGRiOiBudWxsLFxuICAgIGhzcHJlZF90YWJsZTogbnVsbCxcbiAgICBoc3ByZWRfaW5pdGlhbF9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3NlY29uZF9wZGI6IG51bGwsXG4gICAgdGRiX2ZpbGU6IG51bGwsXG4gICAgbWVtZW1iZWRfcGRiOiBudWxsLFxuXG4gICAgbWV0YXBzaWNvdl9kYXRhOiBudWxsLFxuICAgIG1ldHNpdGVfZGF0YTogbnVsbCxcbiAgICBoc3ByZWRfZGF0YTogbnVsbCxcbiAgICBtZW1lbWJlZF9kYXRhOiBudWxsLFxuICAgIGdlbnRkYl9kYXRhOiBudWxsLFxuXG4gICAgLy8gU2VxdWVuY2UgYW5kIGpvYiBpbmZvXG4gICAgc2VxdWVuY2U6ICcnLFxuICAgIHNlcXVlbmNlX2xlbmd0aDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdGFydDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdG9wOiAxLFxuICAgIGVtYWlsOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBiYXRjaF91dWlkOiBudWxsLFxuICAgIC8vaG9sZCBhbm5vdGF0aW9ucyB0aGF0IGFyZSByZWFkIGZyb20gZGF0YWZpbGVzXG4gICAgYW5ub3RhdGlvbnM6IG51bGwsXG59O1xuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19jaGVja2VkJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2J1dHRvbiddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19qb2InXSA9IGpvYl9uYW1lKydfam9iJztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZSddID0gJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+JztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbiddID0gZ2Vhcl9zdHJpbmc7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX3RpbWUnXSA9ICdMb2FkaW5nIERhdGEnO1xufSk7XG5pbml0aWFsaXNhdGlvbl9kYXRhLnBzaXByZWRfY2hlY2tlZCA9IHRydWU7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLm1lbWVtYmVkX2FkdmFuY2VkID0gMTtcbi8vIGluaXRpYWxpc2F0aW9uX2RhdGEuc2VxdWVuY2VfZm9ybV92aXNpYmxlID0gMDtcbi8vIGluaXRpYWxpc2F0aW9uX2RhdGEuc3RydWN0dXJlX2Zvcm1fdmlzaWJsZSA9IDE7XG4vLyBERUNMQVJFIFZBUklBQkxFUyBhbmQgaW5pdCByYWN0aXZlIGluc3RhbmNlXG52YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgZWw6ICcjcHNpcHJlZF9zaXRlJyxcbiAgdGVtcGxhdGU6ICcjZm9ybV90ZW1wbGF0ZScsXG4gIGRhdGE6IGluaXRpYWxpc2F0aW9uX2RhdGEsXG59KTtcblxuLy9zZXQgc29tZSB0aGluZ3Mgb24gdGhlIHBhZ2UgZm9yIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXJcbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiKSB7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcsICdkYW5pZWwuYnVjaGFuQHVjbC5hYy51aycpO1xuICByYWN0aXZlLnNldCgnbmFtZScsICd0ZXN0Jyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsICdRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBUycpO1xufVxuXG4vLzRiNmFkNzkyLWVkMWYtMTFlNS04OTg2LTk4OTA5NmMxM2VlNlxubGV0IHV1aWRfcmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xubGV0IHV1aWRfbWF0Y2ggPSB1dWlkX3JlZ2V4LmV4ZWMoZ2V0VXJsVmFycygpLnV1aWQpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy9cbi8vIEFQUExJQ0FUSU9OIEhFUkVcbi8vXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vL0hlcmUgd2VyZSBrZWVwIGFuIGV5ZSBvbiBzb21lIGZvcm0gZWxlbWVudHMgYW5kIHJld3JpdGUgdGhlIG5hbWUgaWYgcGVvcGxlXG4vL2hhdmUgcHJvdmlkZWQgYSBmYXN0YSBmb3JtYXR0ZWQgc2VxXG5sZXQgc2VxX29ic2VydmVyID0gcmFjdGl2ZS5vYnNlcnZlKCdzZXF1ZW5jZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSApIHtcbiAgbGV0IHJlZ2V4ID0gL14+KC4rPylcXHMvO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKG5ld1ZhbHVlKTtcbiAgaWYobWF0Y2gpXG4gIHtcbiAgICB0aGlzLnNldCgnbmFtZScsIG1hdGNoWzFdKTtcbiAgfVxuICAvLyBlbHNlIHtcbiAgLy8gICB0aGlzLnNldCgnbmFtZScsIG51bGwpO1xuICAvLyB9XG5cbiAgfSxcbiAge2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9KTtcblxuLy90aGVzZXMgdHdvIG9ic2VydmVycyBzdG9wIHBlb3BsZSBzZXR0aW5nIHRoZSByZXN1Ym1pc3Npb24gd2lkZ2V0IG91dCBvZiBib3VuZHNcbnJhY3RpdmUub2JzZXJ2ZSggJ3N1YnNlcXVlbmNlX3N0b3AnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX2xlbmd0aCA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZV9sZW5ndGgnKTtcbiAgbGV0IHNlcV9zdGFydCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcpO1xuICBpZih2YWx1ZSA+IHNlcV9sZW5ndGgpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9sZW5ndGgpO1xuICB9XG4gIGlmKHZhbHVlIDw9IHNlcV9zdGFydClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX3N0YXJ0KzEpO1xuICB9XG59KTtcbnJhY3RpdmUub2JzZXJ2ZSggJ3N1YnNlcXVlbmNlX3N0YXJ0JywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9zdG9wID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0b3AnKTtcbiAgaWYodmFsdWUgPCAxKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0JywgMSk7XG4gIH1cbiAgaWYodmFsdWUgPj0gc2VxX3N0b3ApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCBzZXFfc3RvcC0xKTtcbiAgfVxufSk7XG5cbi8vQWZ0ZXIgYSBqb2IgaGFzIGJlZW4gc2VudCBvciBhIFVSTCBhY2NlcHRlZCB0aGlzIHJhY3RpdmUgYmxvY2sgaXMgY2FsbGVkIHRvXG4vL3BvbGwgdGhlIGJhY2tlbmQgdG8gZ2V0IHRoZSByZXN1bHRzXG5yYWN0aXZlLm9uKCdwb2xsX3RyaWdnZXInLCBmdW5jdGlvbihuYW1lLCBzZXFfdHlwZSl7XG4gIGNvbnNvbGUubG9nKFwiUG9sbGluZyBiYWNrZW5kIGZvciByZXN1bHRzXCIpO1xuICBsZXQgdXJsID0gc3VibWl0X3VybCArIHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCBhcHBfcGF0aCsnLyZ1dWlkPScrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKSk7XG4gIGlmKHNlcV90eXBlKXtcbiAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gIH1cbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICBsZXQgYmF0Y2ggPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGRvd25sb2Fkc19pbmZvID0ge307XG5cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0NvbXBsZXRlJylcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlbmRlciByZXN1bHRzXCIpO1xuICAgICAgbGV0IHN1Ym1pc3Npb25zID0gYmF0Y2guc3VibWlzc2lvbnM7XG4gICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpO1xuICAgICAgICAgIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMsIGpvYl9saXN0KTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZScsIG51bGwpO1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIG51bGwpO1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfdGltZScsIG51bGwpO1xuICAgICAgfSk7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgbGV0IGVycm9yX3RleHQgPSBcIjxoMz5QT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkPC9oMz5cIitcbiAgICAgIFwiPGg0PlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhlIGVycm9yIG1lc3NhZ2UgYW5kIGpvYiBJRDpcIityYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpK1wiPC9oND5cIitcbiAgICAgIFwiPGg1PkVycm9yIE1lc3NhZ2U6PGJyIC8+XCIrc3VibWlzc2lvbl9tZXNzYWdlK1wiPC9oNT5cIjtcbiAgICAgIHJhY3RpdmUuc2V0KCdlcnJvcl9tZXNzYWdlJywgZXJyb3JfdGV4dCk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0sIDUwMDApO1xuXG59LHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfVxuKTtcblxuLy8gT24gY2xpY2tpbmcgdGhlIEdldCBaaXAgZmlsZSBsaW5rIHRoaXMgd2F0Y2hlcnMgcHJlcGFyZXMgdGhlIHppcCBhbmQgaGFuZHMgaXQgdG8gdGhlIHVzZXJcbnJhY3RpdmUub24oJ2dldF96aXAnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGxldCB1dWlkID0gcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTpcImJsb2JcIn0pLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgc2F2ZUFzKGJsb2IsIHV1aWQrXCIuemlwXCIpO1xuICAgIH0pO1xufSk7XG5cbnJhY3RpdmUub24oJ3Nob3dfYmlvc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnYmlvc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXNlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21wcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21wcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZmZwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdmZnByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWV0c2l0ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2hzcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnaHNwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21lbWVtYmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbi8vIFRoZXNlIHJlYWN0IHRvIHRoZSBoZWFkZXJzIGJlaW5nIGNsaWNrZWQgdG8gdG9nZ2xlIHRoZSBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdzZXF1ZW5jZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIGxldCBzZXR0aW5nID0gZmFsc2U7XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BzaXByZWQnKXtzZXR0aW5nID0gdHJ1ZTt9XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgc2V0dGluZyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ3N0cnVjdHVyZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBmYWxzZSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHNob3dfcGFuZWwoMSwgcmFjdGl2ZSk7XG59KTtcblxuLy9yZWdpc3RlciBsaXN0ZW5lcnMgZm9yIGVhY2ggcmVzdWx0cyBwYW5lbFxuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSwgaSl7XG4gIGNvbnNvbGUubG9nKFwiYWRkaW5nIGpvYnMgd2F0Y2hlcnNcIik7XG4gIHJhY3RpdmUub24oam9iX25hbWUrJ19hY3RpdmUnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICBzaG93X3BhbmVsKGkrMiwgcmFjdGl2ZSk7XG4gICAgaWYoam9iX25hbWUgPT09IFwicHNpcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gXCJkaXNvcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykpe1xuICAgICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2hzcHJlZCcpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicpKXtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBpbml0aWFsX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKTtcbiAgICAgICAgbGV0IHNlY29uZF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX3NlY29uZF9wZGInKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoaW5pdGlhbF9wZGIsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHNlY29uZF9wZGIsICAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9fVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICAgbGV0IG1lbWVtYmVkX3BkYiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKTtcbiAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1lbWVtYmVkX3BkYiwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbignc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBjb25zb2xlLmxvZyhcIlNVQk1JU1NJT04gQUNUSVZFXCIpO1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuXG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgc3VibWl0X2pvYiA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHNlcV9jb3VudCA9IHNlcS5zcGxpdChcIj5cIikubGVuZ3RoO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGxldCBzdHJ1Y3RfdHlwZSA9IGZhbHNlO1xuICBsZXQgc2VxX3R5cGUgPSBmYWxzZTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzdHJ1Y3Rfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHN0cnVjdF90eXBlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHNlcV9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc2VxX3R5cGUgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICAvL0hBTkRMRSBGRlBSRUQgSk9CIFNFTEVDVElPTi5cbiAgaWYoY2hlY2tfc3RhdGVzLmJpb3NlcmZfY2hlY2tlZCB8fCBjaGVja19zdGF0ZXMuZG9tc2VyZl9jaGVja2VkKVxuICB7XG4gICAgbGV0IGJpb3NfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgbGV0IGRvbXNfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgaWYoYmlvc19tb2RlbGxlcl90ZXN0IHx8IGRvbXNfbW9kZWxsZXJfdGVzdClcbiAgICB7XG4gICAgICBzdWJtaXRfam9iID10cnVlO1xuICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHByb3ZpZGVkIGEgdmFsaWQgTU9ERUxMRVIga2V5LiBDb250YWN0IHRoZSBTYWxpIGxhYiBmb3IgYSBNT0RFTExFUiBsaWNlbmNlLlwiKTtcbiAgICB9XG4gIH1cbiAgZWxzZXtcbiAgICBzdWJtaXRfam9iPXRydWU7XG4gIH1cbiAgaWYoc2VxX3R5cGUgJiYgc3RydWN0X3R5cGUpXG4gIHtcbiAgICBhbGVydChcIllvdSBjYW4gbm90IHN1Ym1pdCBib3RoIHNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYW5hbHlzaXMgam9ic1wiKTtcbiAgICBzdWJtaXRfam9iID0gZmFsc2U7XG4gIH1cbiAgaWYoc2VxX2NvdW50ID4gMSlcbiAge1xuICAgIGFsZXJ0KFwiTVNBIElucHV0IGZvcmJpZGRlblwiKTtcbiAgICBzdWJtaXRfam9iPWZhbHNlO1xuICB9XG4gIGlmKHN1Ym1pdF9qb2IpXG4gIHtcbiAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmdcIik7XG4gICAgaWYoc2VxX3R5cGUpXG4gICAge1xuICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICB9XG4gICAgaWYoc3RydWN0X3R5cGUpXG4gICAge1xuICAgICAgbGV0IHBkYkZpbGUgPSBudWxsO1xuICAgICAgbGV0IHBkYkRhdGEgPSAnJztcbiAgICAgIHRyeXtcbiAgICAgICBwZGJGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZGJGaWxlXCIpO1xuICAgICAgIGxldCBmaWxlID0gcGRiRmlsZS5maWxlc1swXTtcbiAgICAgICBsZXQgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBwZGJEYXRhID0gZnIucmVzdWx0O1xuICAgICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBwZGJEYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGVycikge1xuICAgICAgICBwZGJEYXRhID0gXCJcIjtcbiAgICAgICAgaWYoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJGaWxlUmVhZGVyLnJlYWRBc1RleHQgaXMgbm90IGFuIG9iamVjdFwiKSl7XG4gICAgICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3Qgc2VsZWN0ZWQgYSBQREIgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoK1wiL1wiKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgfSk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcywgemlwKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmZ1bmN0aW9uIHRlc3RfbW9kZWxsZXJfa2V5KGlucHV0KVxue1xuICBpZihpbnB1dCA9PT0gJ01PREVMSVJBTkpFJylcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGxldCBzZXFfdHlwZSA9IHRydWU7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Rpc29wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1wYWNrJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDYpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDcpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGRvbXRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Jpb3NlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdmZnByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50ZGJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE3KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgaWYoc2VxX3R5cGUpXG4gIHtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMSApO1xuICB9XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgZXJyb3JfbWVzc2FnZT1cIkFSR1wiO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zZXFfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoc3RydWN0X3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc3RydWN0X2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChqb2JfbmFtZStcIixcIik7XG4gICAgICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZGlzb3ByZWQnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdiaW9zZXJmJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBnZW50aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGRvbXRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAxICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICAvLyBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICBpZighIC9BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuXG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9mb3Jtcy9mb3Jtc19pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=