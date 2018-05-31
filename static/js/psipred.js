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
  if (job_name === 'dompred') {
    fd.append("psiblast_dompred_evalue", options_data.psiblast_dompred_evalue);
    fd.append("psiblast_dompred_iterations", options_data.psiblast_dompred_iterations);
  }
  if (job_name === 'metsite') {
    fd.append("metsite_checkchains_chain", options_data.metsite_checkchains_chain);
    fd.append("extract_fasta_chain", options_data.extract_fasta_chain);
    fd.append("seedSiteFind_metal", options_data.seedSiteFind_metal);
    fd.append("seedSiteFind_chain", options_data.seedSiteFind_chain);
    fd.append("metpred_wrapper_chain", options_data.metpred_wrapper_chain);
    fd.append("metpred_wrapper_metal", options_data.metpred_wrapper_metal);
    fd.append("metpred_wrapper_fpr", options_data.metpred_wrapper_fpr);
  }
  if (job_name === 'hspred') {
    fd.append("hspred_checkchains_chains", options_data.hspred_checkchains_chains);
    fd.append("hs_pred_first_chain", options_data.hs_pred_first_chain);
    fd.append("hs_pred_second_chain", options_data.hs_pred_second_chain);
    fd.append("split_pdb_files_first_chain", options_data.split_pdb_files_first_chain);
    fd.append("split_pdb_files_second_chain", options_data.split_pdb_files_second_chain);
  }
  if (job_name === 'memembed') {
    fd.append("memembed_algorithm", options_data.memembed_algorithm);
    fd.append("memembed_barrel", options_data.memembed_barrel);
    fd.append("memembed_termini", options_data.memembed_termini);
  }

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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info, job_names);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGUzNzE5MGJhODRmYzY0MjRjOTciLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZG9tc2VyZl9yZXN1bHRfZm91bmQiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInBzaXByZWRfcmVzdWx0X2ZvdW5kIiwicGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJtZW1wYWNrIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJnZW50aHJlYWRlciIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtZXRhcHNpY292IiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJtZXRzaXRlIiwiaHNwcmVkIiwiaW5pdGlhbF9tYXRjaCIsInNlY29uZF9tYXRjaCIsImluaXRpYWwiLCJzZWNvbmQiLCJnZW50ZGIiLCJ0ZGIiLCJtZW1lbWJlZCIsInVyaSIsImNzc19pZCIsImNhcnRvb25fY29sb3IiLCJhdG9tIiwiaG90c3BvdF9jb2xvciIsImIiLCJlbGVtZW50IiwiJCIsImNvbmZpZyIsImJhY2tncm91bmRDb2xvciIsInZpZXdlciIsIiQzRG1vbCIsImNyZWF0ZVZpZXdlciIsImdldF90ZXh0IiwiYWRkTW9kZWwiLCJzZXRTdHlsZSIsImNvbG9yZnVuYyIsImFkZFN1cmZhY2UiLCJTdXJmYWNlVHlwZSIsIlZEVyIsImNvbG9yc2NoZW1lIiwiaGV0ZmxhZyIsInpvb21UbyIsInJlbmRlciIsInpvb20iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNldF9hZHZhbmNlZF9wYXJhbXMiLCJvcHRpb25zX2RhdGEiLCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnIiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJiaW9zZXJmX21vZGVsbGVyX2tleSIsImRvbXNlcmZfbW9kZWxsZXJfa2V5IiwiZmZwcmVkX3R5cGUiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluIiwiZXh0cmFjdF9mYXN0YV9jaGFpbiIsInNlZWRTaXRlRmluZF9jaGFpbiIsIm1ldHByZWRfd3JhcHBlcl9jaGFpbiIsInNlZWRTaXRlRmluZF9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9mcHIiLCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zIiwiaHNfcHJlZF9maXJzdF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiIsImhzX3ByZWRfc2Vjb25kX2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiIsIm1lbWVtYmVkX2FsZ29yaXRobSIsImNoZWNrZWQiLCJtZW1lbWJlZF9iYXJyZWwiLCJtZW1lbWJlZF90ZXJtaW5pIiwic2VuZF9yZXF1ZXN0IiwidXJsIiwic2VuZF9kYXRhIiwicmVzcG9uc2UiLCJhamF4IiwiY2FjaGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsInNlbmRfam9iIiwiZW1haWwiLCJzdWJtaXRfdXJsIiwidGltZXNfdXJsIiwiQmxvYiIsImUiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2VfZGF0YSIsInRpbWVzIiwiayIsImZpcmUiLCJnZXRfcHJldmlvdXNfZGF0YSIsInV1aWQiLCJzdWJtaXNzaW9uX3Jlc3BvbnNlIiwic3VibWlzc2lvbnMiLCJpbnB1dF9maWxlIiwiam9icyIsInN1Ym1pc3Npb24iLCJzbGljZSIsInN1Ym1pc3Npb25fbmFtZSIsInVybF9zdHViIiwiY3RsIiwicGF0aF9iaXRzIiwiZm9sZGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsInN0eWxlIiwiZ2V0RW1QaXhlbHMiLCJleHRyYUJvZHkiLCJjcmVhdGVFbGVtZW50IiwiY3NzVGV4dCIsImluc2VydEJlZm9yZSIsImJvZHkiLCJ0ZXN0RWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImNsaXBib2FyZCIsIkNsaXBib2FyZCIsIm9uIiwiZW5kcG9pbnRzX3VybCIsImdlYXJzX3N2ZyIsIm1haW5fdXJsIiwiYXBwX3BhdGgiLCJzZXFfam9iX2xpc3QiLCJzdHJ1Y3Rfam9iX2xpc3QiLCJob3N0bmFtZSIsImluaXRpYWxpc2F0aW9uX2RhdGEiLCJzZXF1ZW5jZV9mb3JtX3Zpc2libGUiLCJzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlIiwicmVzdWx0c192aXNpYmxlIiwicmVzdWJtaXNzaW9uX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwiYmlvc2VyZl9hZHZhbmNlZCIsImRvbXNlcmZfYWR2YW5jZWQiLCJkb21wcmVkX2FkdmFuY2VkIiwiZmZwcmVkX2FkdmFuY2VkIiwibWV0c2l0ZV9hZHZhbmNlZCIsImhzcHJlZF9hZHZhbmNlZCIsIm1lbWVtYmFkX2FkdmFuY2VkIiwibW9kZWxsZXJfa2V5IiwiZG93bmxvYWRfbGlua3MiLCJlcnJvcl9tZXNzYWdlIiwicHNpcHJlZF9ob3JpeiIsImRpc29fcHJlY2lzaW9uIiwibWVtc2F0c3ZtX3NjaGVtYXRpYyIsIm1lbXNhdHN2bV9jYXJ0b29uIiwicGdlbl90YWJsZSIsInBnZW5fYW5uX3NldCIsIm1lbXNhdHBhY2tfc2NoZW1hdGljIiwibWVtc2F0cGFja19jYXJ0b29uIiwiZ2VuX3RhYmxlIiwiZ2VuX2Fubl9zZXQiLCJwYXJzZWRzX2luZm8iLCJwYXJzZWRzX3BuZyIsImRnZW5fdGFibGUiLCJkZ2VuX2Fubl9zZXQiLCJiaW9zZXJmX21vZGVsIiwiZG9tc2VyZl9idXR0b25zIiwiZG9tc2VyZl9tb2RlbF91cmlzIiwiZmZwcmVkX2NhcnRvb24iLCJzY2hfc2NoZW1hdGljIiwiZnVuY3Rpb25fdGFibGVzIiwibWV0YXBzaWNvdl9tYXAiLCJtZXRzaXRlX3BkYiIsImhzcHJlZF9pbml0aWFsX3BkYiIsImhzcHJlZF9zZWNvbmRfcGRiIiwidGRiX2ZpbGUiLCJtZW1lbWJlZF9wZGIiLCJtZXRhcHNpY292X2RhdGEiLCJtZXRzaXRlX2RhdGEiLCJoc3ByZWRfZGF0YSIsIm1lbWVtYmVkX2RhdGEiLCJnZW50ZGJfZGF0YSIsInNlcXVlbmNlIiwic2VxdWVuY2VfbGVuZ3RoIiwic3Vic2VxdWVuY2Vfc3RhcnQiLCJzdWJzZXF1ZW5jZV9zdG9wIiwiYmF0Y2hfdXVpZCIsInBzaXByZWRfY2hlY2tlZCIsIlJhY3RpdmUiLCJlbCIsInRlbXBsYXRlIiwidXVpZF9yZWdleCIsInV1aWRfbWF0Y2giLCJzZXFfb2JzZXJ2ZXIiLCJvYnNlcnZlIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluaXQiLCJkZWZlciIsInNlcV9sZW5ndGgiLCJzZXFfc3RhcnQiLCJzZXFfc3RvcCIsInNlcV90eXBlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiYXRjaCIsInN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsInN1Ym1pc3Npb25fbWVzc2FnZSIsImxhc3RfbWVzc2FnZSIsImVycm9yX3RleHQiLCJjb250ZXh0IiwiZ2VuZXJhdGVBc3luYyIsInRoZW4iLCJibG9iIiwic2F2ZUFzIiwiZXZlbnQiLCJhZHYiLCJzZXR0aW5nIiwibWV0X3BkYiIsImluaXRpYWxfcGRiIiwic2Vjb25kX3BkYiIsInN1Ym1pdF9qb2IiLCJ0b1VwcGVyQ2FzZSIsImNoZWNrX3N0YXRlcyIsInN0cnVjdF90eXBlIiwiYmlvc2VyZl9jaGVja2VkIiwiZG9tc2VyZl9jaGVja2VkIiwiYmlvc19tb2RlbGxlcl90ZXN0IiwidGVzdF9tb2RlbGxlcl9rZXkiLCJkb21zX21vZGVsbGVyX3Rlc3QiLCJ2ZXJpZnlfYW5kX3NlbmRfZm9ybSIsInBkYkZpbGUiLCJwZGJEYXRhIiwiZmlsZXMiLCJmciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNUZXh0Iiwib25sb2FkIiwicmVzdWx0IiwibWVzc2FnZSIsIm9yaWdpbmFsIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsInN0b3AiLCJzdWJzZXF1ZW5jZSIsImlucHV0IiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsInN3YXBEb21zZXJmIiwidXJpX251bWJlciIsImpvYl9zdHJpbmciLCJjaGVja19saXN0IiwidmVyaWZ5X3NlcV9mb3JtIiwidmVyaWZ5X3N0cnVjdF9mb3JtIiwicGdlbnRocmVhZGVyX2NoZWNrZWQiLCJwZG9tdGhyZWFkZXJfY2hlY2tlZCIsInN0cnVjdCIsImNoZWNrZWRfYXJyYXkiLCJ0ZXN0IiwibnVjbGVvdGlk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QkFBZ0JBLGdCQUFnQiw2Q0FBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUl1SCxtQkFBbUIsQ0FBQzFhLElBQUkzRixLQUFKLENBQVUsMEJBQVYsS0FBdUMsRUFBeEMsRUFBNENOLE1BQW5FO0FBQ0EsTUFBSTJnQixtQkFBaUIxYSxJQUFJakcsTUFBdEIsR0FBZ0MsSUFBbkMsRUFDQTtBQUNFb1osb0JBQWdCQSxnQkFBZ0Isd0dBQWhDO0FBQ0Q7QUFDRCxNQUFHLCtCQUErQnNILElBQS9CLENBQW9DemEsR0FBcEMsQ0FBSCxFQUNBO0FBQ0VtVCxvQkFBZ0JBLGdCQUFnQixpREFBaEM7QUFDRDs7QUFFRCxNQUFHLGlHQUFBcEQsQ0FBVSxJQUFWLEVBQWdCeUssYUFBaEIsTUFBbUMsS0FBdEMsRUFBNkM7QUFDM0NySCxvQkFBZ0JBLGdCQUFnQiwrQ0FBaEM7QUFDRDtBQUNELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGUzNzE5MGJhODRmYzY0MjRjOTciLCJleHBvcnQgZnVuY3Rpb24gcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBoc3ByZWRfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtIb3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjZmZmZmZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLUhvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24taW50ZXJmYWNlIHJlc2lkdWU8L3RkPjwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkNoYWluL1Jlc2lkdWU8L3RoPjx0aD5SZXNpZHVlIElkZW50aXR5PC90aD48dGg+U2NvcmU8L3RoPic7XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAzKXtcbiAgICAgIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9XG4gIH0pO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgaHNwcmVkX3RhYmxlKTtcbn1cblxuLy8gcGFyc2UgdGhlIHNtYWxsIG1ldHNpdGUgb3V0cHV0IHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbWV0c2l0ZV90YWJsZSA9ICc8YnIgLz48dGFibGU+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO01ldGFsIEJpbmRpbmcgQ29udGFjdDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Q2hhaW4gbm90IHByZWRpY3RlZDwvdGQ+PC90cj4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7UHJlZGljdGVkIGNoYWluPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+UmVzaWR1ZSBOdW1iZXI8L3RoPjx0aD5SYXcgTmV1cmFsIE5ldHdvcmsgU2NvcmU8L3RoPjx0aD5SZXNpZHVlPC90aD4nO1xuICBsZXQgaGl0X3JlZ2V4ID0gL1xcZCtcXHMuKz9cXHNcXHd7M31cXGQrL2c7XG4gIGxldCBoaXRfbWF0Y2hlcyA9IGZpbGUubWF0Y2goaGl0X3JlZ2V4KTtcbiAgaWYoaGl0X21hdGNoZXMpXG4gIHtcbiAgICBoaXRfbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMvKTtcbiAgICAgIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfSk7XG4gIH1cbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbWV0c2l0ZV90YWJsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZnByZWRzKHJhY3RpdmUsIGZpbGUpe1xuXG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgYnBfZGF0YSA9IFtdO1xuICBsZXQgbWZfZGF0YSA9IFtdO1xuICBsZXQgY2NfZGF0YSA9IFtdO1xuICBsZXQgdGFibGVfZGF0YSA9ICcnO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aCgnIycpKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgaWYoZW50cmllcy5sZW5ndGggPCA0KXtyZXR1cm47fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdCUCcpe2JwX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0NDJyl7Y2NfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnTUYnKXttZl9kYXRhLnB1c2goZW50cmllcyk7fVxuICB9KTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+QmlvbG9naWNhbCBQcm9jZXNzIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBicF9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5Nb2xlY3VsYXIgRnVuY3Rpb24gUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIG1mX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkNlbGx1bGFyIENvbXBvbmVudCBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgY2NfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICB0YWJsZV9kYXRhICs9ICdUaGVzZSBwcmVkaWN0aW9uIHRlcm1zIHJlcHJlc2VudCB0ZXJtcyBwcmVkaWN0ZWQgd2hlcmUgU1ZNIHRyYWluaW5nIGluY2x1ZGVzIGFzc2lnbmVkIEdPIHRlcm1zIGFjcm9zcyBhbGwgZXZpZGVuY2UgY29kZSB0eXBlcy4gU1ZNIHJlbGlhYmlsaXR5IGlzIHJlZ2FyZGVkIGFzIEhpZ2ggKEgpIHdoZW4gTUNDLCBzZW5zaXRpdml0eSwgc3BlY2lmaWNpdHkgYW5kIHByZWNpc2lvbiBhcmUgam9pbnRseSBhYm92ZSBhIGdpdmVuIHRocmVzaG9sZC4gb3RoZXJ3aXNlIFJlbGlhYmlsaXR5IGlzIGluZGljYXRlZCBhcyBMb3cgKEwpLiA8YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbn1cblxuZnVuY3Rpb24gc2V0X2Fhbm9ybSgpe1xuICBsZXQgaEFBX25vcm0gPSB7fTtcbiAgaEFBX25vcm0uQSA9IHsgdmFsOiAwLjA3MTc4MzI0ODAwNjMwOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNzM2NzY2MTUyNDI3NX07XG4gIGhBQV9ub3JtLlYgPSB7IHZhbDogMC4wNTk2MjQ1OTUzNjk5MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAzNzc3OTE1Mjg3NDV9O1xuICBoQUFfbm9ybS5ZID0geyB2YWw6IDAuMDI2MDc1MDY4MjQwNDM3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE0ODIyNDcxNTMxMzc5fTtcbiAgaEFBX25vcm0uVyA9IHsgdmFsOiAwLjAxNDE2NjAwMjYxMjc3MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMDQ3MTgzNTgwMTk5Nn07XG4gIGhBQV9ub3JtLlQgPSB7IHZhbDogMC4wNTI1OTM1ODI5NzI3MTQsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjAwOTQ3OTM5NjQ1OTd9O1xuICBoQUFfbm9ybS5TID0geyB2YWw6IDAuMDgyMTIzMjQxMzMyMDk5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI4Njg3NTY2MDgxNTEyfTtcbiAgaEFBX25vcm0uUCA9IHsgdmFsOiAwLjA2NTU1NzUzMTMyMjI0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzNDIzOTM5ODQ5NjczNn07XG4gIGhBQV9ub3JtLkYgPSB7IHZhbDogMC4wMzcxMDM5OTQ5NjkwMDIsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg1NDM0MjMxMzkxODZ9O1xuICBoQUFfbm9ybS5NID0geyB2YWw6IDAuMDIyNTYyODE4MTgzOTU1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDExMzIxMDM5NjYyNDgxfTtcbiAgaEFBX25vcm0uSyA9IHsgdmFsOiAwLjA1NDgzMzk3OTI2OTE4NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyOTI2NDA4MzY2NzE1N307XG4gIGhBQV9ub3JtLkwgPSB7IHZhbDogMC4xMDAxMDU5MTU3NTkwNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDI3NjgwODUxOTAwOX07XG4gIGhBQV9ub3JtLkkgPSB7IHZhbDogMC4wNDIwMzQ1MjYwNDA0NjcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjY4NDkyNjI0OTV9O1xuICBoQUFfbm9ybS5IID0geyB2YWw6IDAuMDI3MTQxNDAzNTM3NTk4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE1NTA1NjYzNzg5ODV9O1xuICBoQUFfbm9ybS5HID0geyB2YWw6IDAuMDY5MTc5ODIwMTA0NTM2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMDg3NTYyMDU3MzI4fTtcbiAgaEFBX25vcm0uUSA9IHsgdmFsOiAwLjA2NTkyMDU2MTkzMTgwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDEwMzA5MTAwODM2Nn07XG4gIGhBQV9ub3JtLkUgPSB7IHZhbDogMC4wNDY0Nzg0NjIyNTgzOCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxOTk0NjI2OTQ2MTczNn07XG4gIGhBQV9ub3JtLkMgPSB7IHZhbDogMC4wMjQ5MDg1NTE4NzIwNTYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjA4MjI5MDk1ODk1MDR9O1xuICBoQUFfbm9ybS5EID0geyB2YWw6IDAuMDQ0MzM3OTA0NzI2MDQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NDM2Njc3MjU2NzI2fTtcbiAgaEFBX25vcm0uTiA9IHsgdmFsOiAwLjAzMzUwNzAyMDk4NzAzMyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNjUzNjAyMjI4ODIwNH07XG4gIGhBQV9ub3JtLlIgPSB7IHZhbDogMC4wNTk3NDA0NjkwMzExOSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyNTE2NTk5NDc3MzM4NH07XG4gIHJldHVybihoQUFfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIHNldF9mbm9ybSgpe1xuICBsZXQgaEZfbm9ybSA9IHt9O1xuICBoRl9ub3JtLmh5ZHJvcGhvYmljaXR5ID0ge3ZhbDogLTAuMzQ4NzY4MjgwODAxNTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAwLjc1NTU5MTUyNzY5Nzk5fTtcbiAgaEZfbm9ybVsncGVyY2VudCBwb3NpdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuNDU3NzE3NDY2OTQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzLjU2NzEzMzM0MTEzOX07XG4gIGhGX25vcm1bJ2FsaXBoYXRpYyBpbmRleCddID0ge3ZhbDogNzkuOTExNTQ5MzE5MDk5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDE2Ljc4NzYxNzk3ODgyN307XG4gIGhGX25vcm1bJ2lzb2VsZWN0cmljIHBvaW50J10gPSB7dmFsOiA3LjYxMDIwNDYzODM2MDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxLjk3MTYxMTEwMjAwODh9O1xuICBoRl9ub3JtWydtb2xlY3VsYXIgd2VpZ2h0J10gPSB7dmFsOiA0ODY2OC40MTI4Mzk5NjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM3ODM4LjMyNDg5NTk2OX07XG4gIGhGX25vcm0uY2hhcmdlID0ge3ZhbDogNS4wOTkxNzYzMDU3NjA0LFxuICAgICAgICAgICAgICAgICAgICBzZGU6IDE2LjgzODYzNjU5MDI1fTtcbiAgaEZfbm9ybVsncGVyY2VudCBuZWdhdGl2ZSByZXNpZHVlcyddID0ge3ZhbDogMTEuMDI2MTkwMTI4MTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiA0LjAyMDY2MzE2ODA5MjZ9O1xuICBoRl9ub3JtWydtb2xhciBleHRpbmN0aW9uIGNvZWZmaWNpZW50J10gPSB7dmFsOiA0NjQ3NS4yOTM5MjM5MjYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDM5Mjk5LjM5OTg0ODgyM307XG4gIHJldHVybihoRl9ub3JtKTtcbn1cblxuZnVuY3Rpb24gZ2V0X2FhX2NvbG9yKHZhbCl7XG4gICAgbGV0IGFiX3ZhbCA9IE1hdGguYWJzKHZhbCk7XG4gICAgaWYoYWJfdmFsID49IDIuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjFuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDIuMjQpe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYycFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMm5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWY1cFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmNW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMS42NDUgKSB7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjEwcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMTBuXCI7XG4gICAgfVxuICAgIHJldHVybiBcInBsYWluXCI7XG59XG5cbi8vcGFyc2UgdGhlIGZmcHJlZCBmZWF0Y2ZvIGZlYXR1cmVzIGZpbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9mZWF0Y2ZnKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgU0ZfZGF0YSA9IHt9O1xuICBsZXQgQUFfZGF0YSA9IHt9O1xuICBsZXQgaEZfbm9ybSA9c2V0X2Zub3JtKCk7XG4gIGxldCBoQUFfbm9ybT1zZXRfYWFub3JtKCk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiQUFcIikpe1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIEFBX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJTRlwiKSlcbiAgICB7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgU0ZfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICB9KTtcblxuICAvLyBidWlsZCBodG1sIHRhYmxlcyBmb3IgdGhlIGZlYXR1cmUgZGF0YVxuICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gIGxldCBnbG9iYWxfZmVhdHVyZXMgPSByYWN0aXZlLmdldCgnZ2xvYmFsX2ZlYXR1cmVzJyk7XG4gIGxldCBmZWF0X3RhYmxlID0gJzxiPkdsb2JhbCBGZWF0dXJlczwvYj48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICdHbG9iYWwgZmVhdHVyZXMgYXJlIGNhbGN1bGF0ZWQgZGlyZWN0bHkgZnJvbSBzZXF1ZW5jZS4gTG9jYWxpc2F0aW9uIHZhbHVlcyBhcmUgcHJlZGljdGVkIGJ5IHRoZSBQc29ydCBhbGdvcml0aG0gYW5kIHJlZmxlY3QgdGhlIHJlbGF0aXZlIGxpa2VsaWhvb2Qgb2YgdGhlIHByb3RlaW4gb2NjdXB5aW5nIGRpZmZlcmVudCBjZWxsdWxhciBsb2NhbGlzYXRpb25zLiBUaGUgYmlhcyBjb2x1bW4gaXMgaGlnaGxpZ2h0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzaWduaWZpY2FuY2Ugb2YgdGhlIGZlYXR1cmUgdmFsdWUgY2FsY3VsYXRlZCBmcm9tIFogc2NvcmUgb2YgdGhlIGZlYXR1cmUuPGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+RmVhdHVyZSBOYW1lPC90aD48dGg+VmFsdWU8L3RoPjx0aD5CaWFzPC90aD48L3RyPic7XG5cbiAgT2JqZWN0LmtleXMoU0ZfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZV9uYW1lKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgaWYoZmVhdHVyZV9uYW1lIGluIGhGX25vcm0pe1xuICAgICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKCAocGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLWhGX25vcm1bZmVhdHVyZV9uYW1lXS52YWwpIC8gaEZfbm9ybVtmZWF0dXJlX25hbWVdLnNkZSk7XG4gICAgfVxuICAgIGZlYXRfdGFibGUgKz0gJzx0cj48dGQ+JytmZWF0dXJlX25hbWUrJzwvdGQ+PHRkPicrcGFyc2VGbG9hdChTRl9kYXRhW2ZlYXR1cmVfbmFtZV0pLnRvRml4ZWQoMikrJzwvdGQ+PHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+PC90cj4nO1xuICB9KTtcbiAgZmVhdF90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgZmVhdF90YWJsZSk7XG5cbiAgLy9idWlsZCBodG1sIHRhYmxlIGZvciB0aGUgQUEgZGF0YVxuICBsZXQgYWFfY29tcG9zaXRpb24gPSByYWN0aXZlLmdldCgnYWFfY29tcG9zaXRpb24nKTtcbiAgbGV0IGFhX3RhYmxlID0gJzxiPkFtaW5vIEFjaWQgQ29tcG9zaXRpb24gKHBlcmNlbnRhZ2VzKTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBhYV90YWJsZSArPSAnPHRoPicrcmVzaWR1ZSsnPC90aD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSktaEFBX25vcm1bcmVzaWR1ZV0udmFsKSAvIGhBQV9ub3JtW3Jlc2lkdWVdLnNkZSk7XG4gICAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nKyhwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pKjEwMCkudG9GaXhlZCgyKSsnPC90ZD4nO1xuICB9KTtcbiAgYWFfdGFibGUgKz0gJzwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPGI+U2lnbmlmaWNhbmNlIEtleTwvYj48YnIgLz4nO1xuICBhYV90YWJsZSArPSAnPHRhYmxlIGNsYXNzPVwic2lnbmlma2V5XCIgYWxpZ249XCJjZW50ZXJcIiBjZWxscGFkZGluZz1cIjJcIiBjZWxsc3BhY2luZz1cIjBcIj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PGI+bG93PC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiOVwiPiZuYnNwOzwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBhbGlnbj1cInJpZ2h0XCI+PGI+aGlnaDwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxblwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMm5cIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVuXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMG5cIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPnAgJmd0Oz0gMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBwXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjVwXCI+cCAmbHQ7IDAuMDU8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYycFwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMXBcIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjb2xzcGFuPVwiMTFcIj5TaWduaWZpY2FuY2UgcCB2YWx1ZSBpcyBjYWxjdWxhdGVkIHVzaW5nIHRoZSBaIHNjb3JlIG9mIHRoZSBwZXJjZW50IGFtaW5vIGFjaWQgY29tcG9zaXRpb248L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8L3RyPic7XG4gIGFhX3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIGFhX3RhYmxlKTtcbn1cblxuXG4vLyBmb3IgYSBnaXZlbiBtZW1zYXQgZGF0YSBmaWxlcyBleHRyYWN0IGNvb3JkaW5hdGUgcmFuZ2VzIGdpdmVuIHNvbWUgcmVnZXhcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbWVtc2F0X3JhbmdlcyhyZWdleCwgZGF0YSlcbntcbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCcsJykpXG4gICAge1xuICAgICAgbGV0IHJlZ2lvbnMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbiwgaSl7XG4gICAgICAgIHJlZ2lvbnNbaV0gPSByZWdpb24uc3BsaXQoJy0nKTtcbiAgICAgICAgcmVnaW9uc1tpXVswXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMF0pO1xuICAgICAgICByZWdpb25zW2ldWzFdID0gcGFyc2VJbnQocmVnaW9uc1tpXVsxXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZihtYXRjaFsxXS5pbmNsdWRlcygnLScpKVxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hbMV0pO1xuICAgICAgICBsZXQgc2VnID0gbWF0Y2hbMV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbW10sIF07XG4gICAgICAgIHJlZ2lvbnNbMF1bMF0gPSBwYXJzZUludChzZWdbMF0pO1xuICAgICAgICByZWdpb25zWzBdWzFdID0gcGFyc2VJbnQoc2VnWzFdKTtcbiAgICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4obWF0Y2hbMV0pO1xufVxuXG4vLyB0YWtlIGFuZCBzczIgKGZpbGUpIGFuZCBwYXJzZSB0aGUgZGV0YWlscyBhbmQgd3JpdGUgdGhlIG5ldyBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGFubm90YXRpb25zW2ldLnNzID0gZW50cmllc1szXTtcbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG59XG5cbi8vcGFyc2UgdGhlIGRpc29wcmVkIGNvbWIgZmlsZSBhbmQgYWRkIGl0IHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVjaXNpb24gPSBbXTtcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIHByZWNpc2lvbltpXSA9IHt9O1xuICAgIHByZWNpc2lvbltpXS5wb3MgPSBlbnRyaWVzWzFdO1xuICAgIHByZWNpc2lvbltpXS5wcmVjaXNpb24gPSBlbnRyaWVzWzRdO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJywgcHJlY2lzaW9uKTtcbiAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHByZWNpc2lvbiwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG4vL3BhcnNlIHRoZSBtZW1zYXQgb3V0cHV0XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuICBsZXQgdG9wb19yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1RvcG9sb2d5OlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgc2lnbmFsX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvU2lnbmFsXFxzcGVwdGlkZTpcXHMrKC4rKVxcbi8sIGZpbGUpO1xuICBsZXQgcmVlbnRyYW50X3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvUmUtZW50cmFudFxcc2hlbGljZXM6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCB0ZXJtaW5hbCA9IGdldF9tZW1zYXRfcmFuZ2VzKC9OLXRlcm1pbmFsOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICAvL2NvbnNvbGUubG9nKHNpZ25hbF9yZWdpb25zKTtcbiAgLy8gY29uc29sZS5sb2cocmVlbnRyYW50X3JlZ2lvbnMpO1xuICBsZXQgY29pbF90eXBlID0gJ0NZJztcbiAgaWYodGVybWluYWwgPT09ICdvdXQnKVxuICB7XG4gICAgY29pbF90eXBlID0gJ0VDJztcbiAgfVxuICBsZXQgdG1wX2Fubm8gPSBuZXcgQXJyYXkoc2VxLmxlbmd0aCk7XG4gIGlmKHRvcG9fcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKVxuICB7XG4gICAgbGV0IHByZXZfZW5kID0gMDtcbiAgICB0b3BvX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdUTScsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgICAgaWYocHJldl9lbmQgPiAwKXtwcmV2X2VuZCAtPSAxO31cbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLCByZWdpb25bMF0pO1xuICAgICAgaWYoY29pbF90eXBlID09PSAnRUMnKXsgY29pbF90eXBlID0gJ0NZJzt9ZWxzZXtjb2lsX3R5cGUgPSAnRUMnO31cbiAgICAgIHByZXZfZW5kID0gcmVnaW9uWzFdKzI7XG4gICAgfSk7XG4gICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQtMSwgc2VxLmxlbmd0aCk7XG5cbiAgfVxuICAvL3NpZ25hbF9yZWdpb25zID0gW1s3MCw4M10sIFsxMDIsMTE3XV07XG4gIGlmKHNpZ25hbF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHNpZ25hbF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUycsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIC8vcmVlbnRyYW50X3JlZ2lvbnMgPSBbWzQwLDUwXSwgWzIwMCwyMThdXTtcbiAgaWYocmVlbnRyYW50X3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgcmVlbnRyYW50X3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdSSCcsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIHRtcF9hbm5vLmZvckVhY2goZnVuY3Rpb24oYW5ubywgaSl7XG4gICAgYW5ub3RhdGlvbnNbaV0ubWVtc2F0ID0gYW5ubztcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCB0eXBlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgLy9jb25zb2xlLmxvZyh0eXBlKydfYW5uX3NldCcpO1xuICBsZXQgYW5uX2xpc3QgPSByYWN0aXZlLmdldCh0eXBlKydfYW5uX3NldCcpO1xuICAvL2NvbnNvbGUubG9nKGFubl9saXN0KTtcbiAgaWYoT2JqZWN0LmtleXMoYW5uX2xpc3QpLmxlbmd0aCA+IDApe1xuICBsZXQgcHNldWRvX3RhYmxlID0gJzx0YWJsZSBjbGFzcz1cInNtYWxsLXRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWRcIj5cXG4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0cj48dGg+Q29uZi48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk5ldCBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+cC12YWx1ZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UGFpckU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlNvbHZFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBMZW5ndGg8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlRhcmdldCBMZW48L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlF1ZXJ5IExlbjwvdGg+JztcbiAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gU3RhcnQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIEVuZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5DQVRIIERvbWFpbjwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggU0NPUDwvdGg+JztcbiAgfWVsc2Uge1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkZvbGQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIENBVEg8L3RoPic7XG4gIH1cbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UERCU1VNPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbGlnbm1lbnQ8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPk1PREVMPC90aD4nO1xuXG4gIC8vIGlmIE1PREVMTEVSIFRISU5HWVxuICBwc2V1ZG9fdGFibGUgKz0gJzwvdHI+PHRib2R5XCI+XFxuJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAvL2NvbnNvbGUubG9nKGxpbmUpO1xuICAgIGlmKGxpbmUubGVuZ3RoID09PSAwKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGxldCB0YWJsZV9oaXQgPSBlbnRyaWVzWzldO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHRhYmxlX2hpdCA9IGVudHJpZXNbMTFdO31cbiAgICBpZih0YWJsZV9oaXQrXCJfXCIraSBpbiBhbm5fbGlzdClcbiAgICB7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRyPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZCBjbGFzcz0nXCIrZW50cmllc1swXS50b0xvd2VyQ2FzZSgpK1wiJz5cIitlbnRyaWVzWzBdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzNdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s0XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzZdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s3XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOF0rXCI8L3RkPlwiO1xuICAgIGxldCBwZGIgPSBlbnRyaWVzWzldLnN1YnN0cmluZygwLCBlbnRyaWVzWzldLmxlbmd0aC0yKTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyBwZGIgPSBlbnRyaWVzWzExXS5zdWJzdHJpbmcoMCwgZW50cmllc1sxMV0ubGVuZ3RoLTMpO31cbiAgICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOV0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMTBdK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby92ZXJzaW9uL2xhdGVzdC9kb21haW4vXCIrdGFibGVfaGl0K1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNDT1AgU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbiBQREJTVU08L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdEaXNwbGF5IEFsaWdubWVudCcgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcImNhdGhfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3BkYi9cIitwZGIrXCInPkNBVEggU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbiBQREJTVU08L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmxvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyh0YWJsZV9oaXQrXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdEaXNwbGF5IEFsaWdubWVudCcgLz48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQuYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIiwgXFxcInBkYl9tb2RlbGxlclxcXCIpOycgdmFsdWU9J0J1aWxkIE1vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlZGljdGlvbl9yZWdleCA9IC9Eb21haW5cXHNCb3VuZGFyeVxcc2xvY2F0aW9uc1xcc3ByZWRpY3RlZFxcc0RQUzpcXHMoLispLztcbiAgbGV0IHByZWRpY3Rpb25fbWF0Y2ggPSAgcHJlZGljdGlvbl9yZWdleC5leGVjKGZpbGUpO1xuICBpZihwcmVkaWN0aW9uX21hdGNoKVxuICB7XG4gICAgbGV0IGRldGFpbHMgPSBmaWxlLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICBkZXRhaWxzID0gZGV0YWlscy5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCI8aDQ+XCIrZGV0YWlscytcIjwvaDQ+XCIpO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBpZihwcmVkaWN0aW9uX21hdGNoWzFdLmluZGV4T2YoXCIsXCIpKVxuICAgIHtcbiAgICAgIHZhbHVlcyA9IHByZWRpY3Rpb25fbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludChwcmVkaWN0aW9uX21hdGNoWzFdKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBhbm5vdGF0aW9uc1t2YWx1ZV0uZG9tcHJlZCA9ICdCJztcbiAgICB9KTtcbiAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwYXJzZWRzX2luZm9cIiwgXCJObyBQYXJzZURTIERvbWFpbiBib3VuZGFyaWVzIHByZWRpY3RlZFwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGdldF90ZXh0IH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd19wYW5lbCh2YWx1ZSwgcmFjdGl2ZSlcbntcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgdmFsdWUgKTtcbn1cblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzKXtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMSk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgJycpO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJycpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19pbmZvJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZGdlbl90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZGdlbl9hbm5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9tb2RlbCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b25zJywgJycpO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9tb2RlbF91cmlzOicsIFtdKTtcbiAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWM6JywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdhYV9jb21wb3NpdGlvbicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZ2xvYmFsX2ZlYXR1cmVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfbWFwJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCd0ZGJfZmlsZScsIG51bGwpO1xuXG5cbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLG51bGwpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnNlcXVlbmNlX3Bsb3QnKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5wc2lwcmVkX2NhcnRvb24nKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5jb21iX3Bsb3QnKTtcblxuICB6aXAgPSBuZXcgSlNaaXAoKTtcbn1cblxuLy9UYWtlIGEgY291cGxlIG9mIHZhcmlhYmxlcyBhbmQgcHJlcGFyZSB0aGUgaHRtbCBzdHJpbmdzIGZvciB0aGUgZG93bmxvYWRzIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcylcbntcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoZGF0YS5qb2JfbmFtZSA9PT0gam9iX25hbWUpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdID0ge307XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgLy9FWFRSQSBQQU5FTFMgRk9SIFNPTUUgSk9CUyBUWVBFUzpcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnICB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm09IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucGdlbnRocmVhZGVyK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuYmlvc2VyZitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucGRvbXRocmVhZGVyK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZG9tc2VyZitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0gPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZD0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuaGVhZGVyID0gXCI8aDU+RG9tUHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5mZnByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vL3Rha2UgdGhlIGRhdGFibG9iIHdlJ3ZlIGdvdCBhbmQgbG9vcCBvdmVyIHRoZSByZXN1bHRzXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcylcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBwbmdfcmVnZXggPSAvXFwucG5nJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IG1lbXBhY2tfY2FydG9vbl9yZWdleCA9IC9LYW1hZGEtS2F3YWlfXFxkKy5wbmckLztcbiAgbGV0IG1lbXBhY2tfZ3JhcGhfb3V0ID0gL2lucHV0X2dyYXBoLm91dCQvO1xuICBsZXQgbWVtcGFja19jb250YWN0X3JlcyA9IC9DT05UQUNUX0RFRjEucmVzdWx0cyQvO1xuICBsZXQgbWVtcGFja19saXBpZF9yZXMgPSAvTElQSURfRVhQT1NVUkUucmVzdWx0cyQvO1xuICBsZXQgZG9tc3NlYV9wcmVkX3JlZ2V4ID0gL1xcLnByZWQkLztcbiAgbGV0IGRvbXNzZWFfcmVnZXggPSAvXFwuZG9tc3NlYSQvO1xuICBsZXQgZG9tc2VyZl9yZWdleCA9IC8uK18oXFxkKylfKFxcZCspLipcXC5wZGIvO1xuICBsZXQgZmZwcmVkX3NjaF9yZWdleCA9IC8uK19zY2hcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtcFxcLnBuZy87XG4gIGxldCBmZnByZWRfZmVhdGNmZ19yZWdleCA9IC9cXC5mZWF0Y2ZnLztcbiAgbGV0IGZmcHJlZF9wcmVkc19yZWdleCA9IC9cXC5mdWxsX3Jhdy87XG4gIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICBsZXQgbWV0c2l0ZV90YWJsZV9yZWdleCA9IC9cXC5NZXRwcmVkLztcbiAgbGV0IG1ldHNpdGVfcGRiX3JlZ2V4ID0gL1xcLk1ldFByZWQvO1xuICBsZXQgaHNwcmVkX2luaXRpYWxfcmVnZXggPSAvX2luaXRpYWxcXC5wZGIvO1xuICBsZXQgaHNwcmVkX3NlY29uZF9yZWdleCA9IC9fc2Vjb25kXFwucGRiLztcblxuICBsZXQgaW1hZ2VfcmVnZXggPSAnJztcbiAgbGV0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHM7XG4gIGxldCBkb21haW5fY291bnQgPSAwO1xuICBsZXQgbWVtcGFja19yZXN1bHRfZm91bmQgPSBmYWxzZTtcbiAgbGV0IGRvbXNlcmZfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCByZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCA9IGZhbHNlO1xuICBsZXQgcHNpcHJlZF9yZXN1bHRfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSBmYWxzZTtcbiAgLy9QcmVwYXRvcnkgbG9vcCBmb3IgaW5mb3JtYXRpb24gdGhhdCBpcyBuZWVkZWQgYmVmb3JlIHJlc3VsdHMgcGFyc2luZzpcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJwZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcInBnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9nZW5hbGlnbm1lbnRfYW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbl9kb20nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImRnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgLy9tYWluIHJlc3VsdHMgcGFyc2luZyBsb29wXG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICAvL3BzaXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09ICdwc2lwYXNzMicpXG4gICAge1xuICAgICAgcHNpcHJlZF9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgbGV0IG1hdGNoID0gaG9yaXpfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaG9yaXonLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3JpeiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhvcml6IEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcblxuICAgICAgfVxuICAgICAgbGV0IHNzMl9tYXRjaCA9IHNzMl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzczJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U1MyIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdzczInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL2Rpc29wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fZm9ybWF0JylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BiZGF0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UEJEQVQgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF90aW1lXCIsICcnKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fY29tYmluZScpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdjb21iJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DT01CIE5OIE91dHB1dDwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIC8vbWVtc2F0IGFuZCBtZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXNhdHN2bScpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hlbWVfbWF0Y2ggPSBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaGVtZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2NoZW1hdGljIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gbWVtc2F0X2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBtZW1zYXRfbWF0Y2ggPSBtZW1zYXRfZGF0YV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtZW1zYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZW1zYXRkYXRhJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIC8vbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1wYWNrX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBtZW1wYWNrX2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgbWVtcGFja19yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGltZyB3aWR0aD1cIjEwMDBweFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBncmFwaF9tYXRjaCA9ICBtZW1wYWNrX2dyYXBoX291dC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihncmFwaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRpYWdyYW0gRGF0YTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNvbnRhY3RfbWF0Y2ggPSAgbWVtcGFja19jb250YWN0X3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjb250YWN0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBsaXBpZF9tYXRjaCA9ICBtZW1wYWNrX2xpcGlkX3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihsaXBpZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkxpcGlkIEV4cG9zdXJlIFByZWRpdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cblxuICAgIH1cbiAgICAvL2dlbnRocmVhZGVyIGFuZCBwZ2VudGhyZWFkZXJcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc29ydF9wcmVzdWx0JylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fc29ydF9wcmVzdWx0cycpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZ2VuX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX21vZGVscycpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW50aHJlYWRlcl9wc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIC8vcGRvbXRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3N2bV9wcm9iX2RvbScpXG4gICAge1xuICAgICAgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdkb21fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19kb21fYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgLy9kb21wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BhcnNlZHMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgcG5nX21hdGNoID0gcG5nX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHBuZ19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeV9wbmcgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnkgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Cb3VuZGFyeSBmaWxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGFyc2VkcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkb21zc2VhJylcbiAgICB7XG4gICAgICBsZXQgcHJlZF9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWFwcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGRvbXNzZWFfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNzZWFfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncnVuQmlvc2VyZicpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GaW5hbCBIb21vbG9neSBNb2RlbDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2Jpb3NlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hoYmxpdHNfcGRiNzAnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGhibGl0cyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhIU2VhcmNoIFJlc3VsdHM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BncGJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X2NhdGgnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0FUSCBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncmVmb3JtYXRfZG9tc2VyZl9tb2RlbHMnIHx8IHJlc3VsdF9kaWN0Lm5hbWUgPT09IFwicGFyc2VfcGRiX2JsYXN0XCIpXG4gICAge1xuICAgICAgbGV0IGRvbXNlcmZfbWF0Y2ggPSBkb21zZXJmX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGRvbXNlcmZfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgICAvLyBUTyBETyBBREQgUkVHRVhcbiAgICAgICAgZG9tYWluX2NvdW50Kz0xO1xuICAgICAgICBkb21zZXJmX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICAgIGlmKGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpe1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsICs9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBidXR0b25zX3RhZ3MgPSByYWN0aXZlLmdldChcImRvbXNlcmZfYnV0dG9uc1wiKTtcbiAgICAgICAgYnV0dG9uc190YWdzICs9ICc8YnV0dG9uIG9uQ2xpY2s9XCJwc2lwcmVkLnN3YXBEb21zZXJmKCcrZG9tYWluX2NvdW50KycpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+RG9tYWluICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9idXR0b24+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX2J1dHRvbnNcIiwgYnV0dG9uc190YWdzKTtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgICAgIHBhdGhzLnB1c2goZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIiwgcGF0aHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZXRTY2hlbWF0aWMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfdGltZVwiLCAnJyk7XG5cbiAgICAgIGxldCBzY2hfbWF0Y2ggPSAgZmZwcmVkX3NjaF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5zY2ggPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GZWF0dXJlIFNjaGVtYXRpYyBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYycsICc8Yj5TZXF1ZW5jZSBGZWF0dXJlIE1hcDwvYj48YnIgLz5Qb3NpdGlvbiBkZXBlbmRlbnQgZmVhdHVyZSBwcmVkaWN0aW9ucyBhcmUgbWFwcGVkIG9udG8gdGhlIHNlcXVlbmNlIHNjaGVtYXRpYyBzaG93biBiZWxvdy4gVGhlIGxpbmUgaGVpZ2h0IG9mIHRoZSBQaG9zcGhvcnlsYXRpb24gYW5kIEdseWNvc3lsYXRpb24gZmVhdHVyZXMgcmVmbGVjdHMgdGhlIGNvbmZpZGVuY2Ugb2YgdGhlIHJlc2lkdWUgcHJlZGljdGlvbi48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgZmZwcmVkX3N2bV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBQTkc8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnZmZwcmVkX2NhcnRvb24nLCAnPGI+UHJlZGljdGVkIFRyYW5zbWVtYnJhbmUgVG9wb2xvZ3k8L2I+PGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmVhdHVyZXMnKVxuICAgIHtcbiAgICAgIGxldCBmZWF0X21hdGNoID0gZmZwcmVkX2ZlYXRjZmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZmVhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2VxdWVuY2UgRmVhdHVyZSBTdW1tYXJ5PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkZmVhdHVyZXMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZnByZWRfaHVtYW4nKVxuICAgIHtcbiAgICAgIGxldCBwcmVkc19tYXRjaCA9IGZmcHJlZF9wcmVkc19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkc19tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+R08gUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRwcmVkaWN0aW9ucycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3Bsb3Rfc2VsZl9jb250YWN0X21hcCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBNYXA8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsICc8Yj5Db250YWN0IE1hcDwvYj48YnIgLz48aW1nIGhlaWdodD1cIjgwMFwiIHdpZHRoPVwiODAwXCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnY29udGFjdF9wcmVkaWN0b3JzJylcbiAgICB7XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2V2X3JlZ2V4ID0gL1xcLmV2Zm9sZC87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X3BzaWNvdl9yZWdleCA9IC9cXC5wc2ljb3YvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4ID0gL1xcLmNjbXByZWQvO1xuICAgICAgICBsZXQgZXZfbWF0Y2ggPSBtZXRhcHNpY292X2V2X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoZXZfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RnJlZUNvbnRhY3QgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBzX21hdGNoID0gbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihwc19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UFNJQ09WIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjY19tYXRjaCA9IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGNjX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q0NNUFJFRCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgID09PSAnbWV0YXBzaWNvdl9zdGFnZTInKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ldHByZWRfd3JhcHBlcicpXG4gICAge1xuICAgICAgbGV0IHRhYmxlX21hdGNoID0gbWV0c2l0ZV90YWJsZV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgcGRiX21hdGNoID0gbWV0c2l0ZV9wZGJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV90aW1lXCIsICcnKTtcbiAgICAgIGlmKHRhYmxlX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWV0c2l0ZSBUYWJsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21ldHNpdGUnLCB6aXAsIHJhY3RpdmUpO1xuXG4gICAgICB9XG4gICAgICBpZihwZGJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWV0c2l0ZSBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2hzX3ByZWQnKVxuICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJoc3ByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhTUHJlZCBUYWJsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hzcHJlZCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzcGxpdF9wZGJfZmlsZXMnKVxuICAgIHtcbiAgICAgIGxldCBpbml0aWFsX21hdGNoID0gaHNwcmVkX2luaXRpYWxfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHNlY29uZF9tYXRjaCA9IGhzcHJlZF9zZWNvbmRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoaW5pdGlhbF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuaW5pdGlhbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkluaXRpYWwgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfaW5pdGlhbF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmKHNlY29uZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQuc2Vjb25kID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2Vjb25kIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWFrZXRkYicpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl90aW1lXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRkYi50ZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5UREIgRmlsZTwvYT4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3RkYl9maWxlJywgJzxoMz48YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNsaWNrIGhlcmUgdG8gZG93bmxvYWQgeW91ciBUREIgRmlsZTwvYT48L2gzPicpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtZW1iZWQnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtZW1iZWRfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1lbWJlZCBQREIgZmlsZTwvYT4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI21lbWVtYmVkX21vZGVsJywgZmFsc2UpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgfVxuXG4gIH1cblxuICAvL1NldCBubyBmb3VuZCBzdGF0bWVudHMgZm9yIHNvbWUgam9icy5cbiAgaWYoISBtZW1wYWNrX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGgzPk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTwvaDM+Jyk7XG4gIH1cbiAgaWYoISBwc2lwcmVkX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJ05vICcram9iX25hbWVzLnBzaXByZWQrJyBkYXRhIGdlbmVyYXRlZCBmb3IgdGhpcyBqb2InKTtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoISBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyB0YWJsZSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgfVxuICBpZihkb21zZXJmX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheV9zdHJ1Y3R1cmUodXJpLCBjc3NfaWQsIGNhcnRvb24pXG57XG4gIGxldCBjYXJ0b29uX2NvbG9yID0gZnVuY3Rpb24oYXRvbSkge1xuICAgIGlmKGF0b20uc3MgPT09ICdoJyl7cmV0dXJuICcjZTM1M2UzJzt9XG4gICAgaWYoYXRvbS5zcyA9PT0gJ3MnKXtyZXR1cm4gJyNlNWRkNTUnO31cbiAgICByZXR1cm4oJ2dyZXknKTtcbiAgfTtcbiAgbGV0IGhvdHNwb3RfY29sb3IgPSBmdW5jdGlvbihhdG9tKXtcbiAgICBpZihhdG9tLmIgPT0gMS4wKXtyZXR1cm4gJ3JlZCc7fVxuICAgIGlmKGF0b20uYiA9PSAwLjUpe3JldHVybiAnYmxhY2snO31cbiAgICBpZihhdG9tLmIgPT0gNTApe3JldHVybiAnd2hpdGUnO31cbiAgICBpZihhdG9tLmIgPT0gMTAwKXtyZXR1cm4gJ3JlZCc7fVxuICAgIHJldHVybihcImJsdWVcIik7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgaWYoY2FydG9vbilcbiAge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBlbHNlIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBob3RzcG90X2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgaWYoY3NzX2lkLnN0YXJ0c1dpdGgoJyNtZW1lbWJlZCcpKXtcbiAgICB2aWV3ZXIuYWRkU3VyZmFjZSgkM0Rtb2wuU3VyZmFjZVR5cGUuVkRXLCB7J29wYWNpdHknOjAuOCwgY29sb3JzY2hlbWU6ICd3aGl0ZUNhcmJvbid9LCB7aGV0ZmxhZzp0cnVlfSx7fSk7XG4gIH1cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldHNpdGUnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2hzcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50ZGInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRkYi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbWVtYmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1lbWJlZC5wZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuXG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsIGRvd25sb2Fkc19zdHJpbmcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYWR2YW5jZWRfcGFyYW1zKClcbntcbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHt9O1xuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX2VfdmFsdWVfY3V0b2ZmXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IFwiMC4wMVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21wcmVkX3BzaWJsYXN0X2l0ZXJhdGlvbnNcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IDU7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaW9zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXNlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfdHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmZwcmVkX3NlbGVjdGlvblwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZmZwcmVkX3R5cGUgPSBcImh1bWFuXCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLmV4dHJhY3RfZmFzdGFfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBcIkNhXCI7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9tZXRhbCA9IFwiQ2FcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfZnByXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gXCI1XCI7XG4gIH1cblxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWUrZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gXCJBQlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfc2Vjb25kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8yXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQlwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiKS52YWx1ZTtcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX2JhcnJlbF95ZXNcIikuY2hlY2tlZCl7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfYmFycmVsID0gJ1RSVUUnO1xuICAgIH1lbHNle1xuICAgICAgb3B0aW9uc19kYXRhLm1lbWVtYmVkX2JhcnJlbCA9ICdGQUxTRSc7XG4gICAgfVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfdGVybWluYWxfaW5cIikuY2hlY2tlZClcbiAgICB7XG4gICAgICBvcHRpb25zX2RhdGEubWVtZW1iZWRfdGVybWluaSA9IFwiaW5cIjtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJvdXRcIjtcbiAgICB9XG4gICAgLy9vcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9ib3VuZGFyaWVzXCIpO1xuICB9XG4gIGNhdGNoKGVycilcbiAge1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwgPSAnRkFMU0UnO1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pID0gXCJpblwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9hbGdvcml0aG0gPSAwO1xuICB9XG4gIHJldHVybihvcHRpb25zX2RhdGEpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMiLCJpbXBvcnQgeyBnZXRfbWVtc2F0X3JhbmdlcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9zczIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGJkYXQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfY29tYiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZW1zYXRkYXRhIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3ByZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGFyc2VkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZWF0Y2ZnIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZmcHJlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWV0c2l0ZSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9oc3ByZWQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG4vL2dpdmVuIGEgdXJsLCBodHRwIHJlcXVlc3QgdHlwZSBhbmQgc29tZSBmb3JtIGRhdGEgbWFrZSBhbiBodHRwIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX3JlcXVlc3QodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG4gIGNvbnNvbGUubG9nKCdTZW5kaW5nIFVSSSByZXF1ZXN0Jyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnNvbGUubG9nKHR5cGUpO1xuICB2YXIgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gc2VuZCBkYXRhXCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIlNlbmRpbmcgSm9iIHRvIFwiK3VybCtcIiBGYWlsZWQuIFwiK2Vycm9yLnJlc3BvbnNlVGV4dCtcIi4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIHdhcyB1bmFibGUgdG8gcHJvY2VzcyB5b3VyIHN1Ym1pc3Npb24uIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpOyByZXR1cm4gbnVsbDtcbiAgfX0pLnJlc3BvbnNlSlNPTjtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuLy9naXZlbiBhIGpvYiBuYW1lIHByZXAgYWxsIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBzZW5kIGFuIGh0dHAgcmVxdWVzdCB0byB0aGVcbi8vYmFja2VuZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfam9iKHJhY3RpdmUsIGpvYl9uYW1lLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgdmFyIGZpbGUgPSBudWxsO1xuICB0cnlcbiAge1xuICAgIGZpbGUgPSBuZXcgQmxvYihbc2VxXSk7XG4gIH0gY2F0Y2ggKGUpXG4gIHtcbiAgICBhbGVydChlKTtcbiAgfVxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgZmQuYXBwZW5kKFwiaW5wdXRfZGF0YVwiLCBmaWxlLCAnaW5wdXQudHh0Jyk7XG4gIGZkLmFwcGVuZChcImpvYlwiLGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwic3VibWlzc2lvbl9uYW1lXCIsbmFtZSk7XG4gIGZkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcbiAgaWYoam9iX25hbWUgPT09ICdkb21wcmVkJyl7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSk7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9uc1wiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zKTt9XG4gIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpe1xuICBmZC5hcHBlbmQoXCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwiZXh0cmFjdF9mYXN0YV9jaGFpblwiLCBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNlZWRTaXRlRmluZF9tZXRhbFwiLCBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9tZXRhbFwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX2ZwclwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2Zwcik7fVxuICBpZihqb2JfbmFtZSA9PT0gJ2hzcHJlZCcpe1xuICBmZC5hcHBlbmQoXCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zXCIsIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zKTtcbiAgZmQuYXBwZW5kKFwiaHNfcHJlZF9maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfc2Vjb25kX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbik7fVxuICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJyl7XG4gIGZkLmFwcGVuZChcIm1lbWVtYmVkX2FsZ29yaXRobVwiLCBvcHRpb25zX2RhdGEubWVtZW1iZWRfYWxnb3JpdGhtKTtcbiAgZmQuYXBwZW5kKFwibWVtZW1iZWRfYmFycmVsXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF9iYXJyZWwpO1xuICBmZC5hcHBlbmQoXCJtZW1lbWJlZF90ZXJtaW5pXCIsIG9wdGlvbnNfZGF0YS5tZW1lbWJlZF90ZXJtaW5pKTt9XG5cbiAgbGV0IHJlc3BvbnNlX2RhdGEgPSBzZW5kX3JlcXVlc3Qoc3VibWl0X3VybCwgXCJQT1NUXCIsIGZkKTtcbiAgaWYocmVzcG9uc2VfZGF0YSAhPT0gbnVsbClcbiAge1xuICAgIGxldCB0aW1lcyA9IHNlbmRfcmVxdWVzdCh0aW1lc191cmwsJ0dFVCcse30pO1xuICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkodGltZXMpKTtcbiAgICBpZihqb2JfbmFtZSBpbiB0aW1lcylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMgdHlwaWNhbGx5IHRha2UgXCIrdGltZXNbam9iX25hbWVdK1wiIHNlY29uZHNcIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBcIlVuYWJsZSB0byByZXRyaWV2ZSBhdmVyYWdlIHRpbWUgZm9yIFwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icy5cIik7XG4gICAgfVxuICAgIGZvcih2YXIgayBpbiByZXNwb25zZV9kYXRhKVxuICAgIHtcbiAgICAgIGlmKGsgPT0gXCJVVUlEXCIpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJywgcmVzcG9uc2VfZGF0YVtrXSk7XG4gICAgICAgIGlmKFsnbWV0aXN0ZScsICdoc3ByZWQnLCAnZ2VudGRiJywgJ21lbWVtYmVkJ10uaW5jbHVkZXMoam9iX25hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlXG4gIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy91dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgc2VxdWVuY2UgZnJvbSBhIHByZXZpb3VzIHN1Ym1pc3Npb24gaXMgdGhlXG4vL3BhZ2Ugd2FzIGxvYWRlZCB3aXRoIGEgVVVJRFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9wcmV2aW91c19kYXRhKHV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKVxue1xuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0aW5nIGRldGFpbHMgZ2l2ZW4gVVJJJyk7XG4gICAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICAvL2FsZXJ0KHVybCk7XG4gICAgbGV0IHN1Ym1pc3Npb25fcmVzcG9uc2UgPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgaWYoISBzdWJtaXNzaW9uX3Jlc3BvbnNlKXthbGVydChcIk5PIFNVQk1JU1NJT04gREFUQVwiKTt9XG4gICAgbGV0IHNlcSA9IGdldF90ZXh0KGZpbGVfdXJsK3N1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uaW5wdXRfZmlsZSwgXCJHRVRcIiwge30pO1xuICAgIGxldCBqb2JzID0gJyc7XG4gICAgc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHN1Ym1pc3Npb24pe1xuICAgICAgam9icyArPSBzdWJtaXNzaW9uLmpvYl9uYW1lK1wiLFwiO1xuICAgIH0pO1xuICAgIGpvYnMgPSBqb2JzLnNsaWNlKDAsIC0xKTtcbiAgICByZXR1cm4oeydzZXEnOiBzZXEsICdlbWFpbCc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uZW1haWwsICduYW1lJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5zdWJtaXNzaW9uX25hbWUsICdqb2JzJzogam9ic30pO1xufVxuXG5cbi8vZ2V0IHRleHQgY29udGVudHMgZnJvbSBhIHJlc3VsdCBVUklcbmV4cG9ydCBmdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2RvbV9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGFyc2VkcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRmZWF0dXJlcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRwcmVkaWN0aW9ucycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZXRzaXRlJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWV0c2l0ZShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2hzcHJlZCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cbi8vZ2l2ZW4gYSBVUkwgcmV0dXJuIHRoZSBhdHRhY2hlZCB2YXJpYWJsZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuICAgIGxldCB2YXJzID0ge307XG4gICAgLy9jb25zaWRlciB1c2luZyBsb2NhdGlvbi5zZWFyY2ggaW5zdGVhZCBoZXJlXG4gICAgbGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLFxuICAgIGZ1bmN0aW9uKG0sa2V5LHZhbHVlKSB7XG4gICAgICB2YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4vKiEgZ2V0RW1QaXhlbHMgIHwgQXV0aG9yOiBUeXNvbiBNYXRhbmljaCAoaHR0cDovL21hdGFuaWNoLmNvbSksIDIwMTMgfCBMaWNlbnNlOiBNSVQgKi9cbihmdW5jdGlvbiAoZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCkge1xuICAgIC8vIEVuYWJsZSBzdHJpY3QgbW9kZVxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRm9ybSB0aGUgc3R5bGUgb24gdGhlIGZseSB0byByZXN1bHQgaW4gc21hbGxlciBtaW5pZmllZCBmaWxlXG4gICAgbGV0IGltcG9ydGFudCA9IFwiIWltcG9ydGFudDtcIjtcbiAgICBsZXQgc3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlXCIgKyBpbXBvcnRhbnQgKyBcInZpc2liaWxpdHk6aGlkZGVuXCIgKyBpbXBvcnRhbnQgKyBcIndpZHRoOjFlbVwiICsgaW1wb3J0YW50ICsgXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQgKyBcInBhZGRpbmc6MFwiICsgaW1wb3J0YW50O1xuXG4gICAgd2luZG93LmdldEVtUGl4ZWxzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXh0cmFCb2R5O1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gRW11bGF0ZSB0aGUgZG9jdW1lbnRFbGVtZW50IHRvIGdldCByZW0gdmFsdWUgKGRvY3VtZW50RWxlbWVudCBkb2VzIG5vdCB3b3JrIGluIElFNi03KVxuICAgICAgICAgICAgZWxlbWVudCA9IGV4dHJhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO1xuICAgICAgICAgICAgZXh0cmFCb2R5LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudDtcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZXh0cmFCb2R5LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc3R5bGUgYSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBjbGllbnQgd2lkdGggb2YgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICBpZiAoZXh0cmFCb2R5KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dHJhIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGV4dHJhQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVtIHZhbHVlIGluIHBpeGVsc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0oZG9jdW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IHNldF9hZHZhbmNlZF9wYXJhbXMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNob3dfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgZGlzcGxheV9zdHJ1Y3R1cmUgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuXG52YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmNvcHlCdXR0b24nKTtcbnZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5jbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vIFNFVCBFTkRQT0lOVFMgRk9SIERFViwgU1RBR0lORyBPUiBQUk9EXG5sZXQgZW5kcG9pbnRzX3VybCA9IG51bGw7XG5sZXQgc3VibWl0X3VybCA9IG51bGw7XG5sZXQgdGltZXNfdXJsID0gbnVsbDtcbmxldCBnZWFyc19zdmcgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xubGV0IG1haW5fdXJsID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51a1wiO1xubGV0IGFwcF9wYXRoID0gXCIvcHNpcHJlZF9iZXRhXCI7XG5sZXQgZmlsZV91cmwgPSAnJztcbmxldCBnZWFyX3N0cmluZyA9ICc8b2JqZWN0IHdpZHRoPVwiMTQwXCIgaGVpZ2h0PVwiMTQwXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBkYXRhPVwiJytnZWFyc19zdmcrJ1wiPjwvb2JqZWN0Pic7XG5sZXQgam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLCBcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBzZXFfam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsXTtcbmxldCBzdHJ1Y3Rfam9iX2xpc3QgPSBbXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgam9iX25hbWVzID0ge1xuICAncHNpcHJlZCc6ICdQU0lQUkVEIFY0LjAnLFxuICAnZGlzb3ByZWQnOiAnRElPU1BSRUQgMycsXG4gICdtZW1zYXRzdm0nOiAnTUVNU0FULVNWTScsXG4gICdwZ2VudGhyZWFkZXInOiAncEdlblRIUkVBREVSJyxcbiAgJ21lbXBhY2snOiAnTUVNUEFDSycsXG4gICdnZW50aHJlYWRlcic6ICdHZW5USFJFQURFUicsXG4gICdkb21wcmVkJzogJ0RvbVByZWQnLFxuICAncGRvbXRocmVhZGVyJzogJ3BEb21USFJFQURFUicsXG4gICdiaW9zZXJmJzogJ0Jpb3NTZXJmIHYyLjAnLFxuICAnZG9tc2VyZic6ICdEb21TZXJmIHYyLjEnLFxuICAnZmZwcmVkJzogJ0ZGUHJlZCAzJyxcbiAgJ21ldGFwc2ljb3YnOiAnTWV0YVBTSUNPVicsXG4gICdtZXRzaXRlJzogJ01ldFNpdGUnLFxuICAnaHNwcmVkJzogJ0hTUHJlZCcsXG4gICdtZW1lbWJlZCc6ICdNRU1FTUJFRCcsXG4gICdnZW50ZGInOiAnR2VuZXJhdGUgVERCJyxcbn07XG5cbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKVxue1xuICBlbmRwb2ludHNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2pvYnRpbWVzLyc7XG4gIGFwcF9wYXRoID0gJy9pbnRlcmZhY2UnO1xuICBtYWluX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAnO1xuICBnZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG4gIGZpbGVfdXJsID0gbWFpbl91cmw7XG59XG5lbHNlIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImJpb2luZnN0YWdlMS5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSAgPT09IFwiYmlvaW5mLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhyZWYgID09PSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9cIikge1xuICBlbmRwb2ludHNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2pvYnRpbWVzLyc7XG4gIGZpbGVfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrXCIvYXBpXCI7XG4gIC8vZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xufVxuZWxzZSB7XG4gIGFsZXJ0KCdVTlNFVFRJTkcgRU5EUE9JTlRTIFdBUk5JTkcsIFdBUk5JTkchJyk7XG4gIGVuZHBvaW50c191cmwgPSAnJztcbiAgc3VibWl0X3VybCA9ICcnO1xuICB0aW1lc191cmwgPSAnJztcbn1cblxubGV0IGluaXRpYWxpc2F0aW9uX2RhdGEgPSB7XG4gICAgc2VxdWVuY2VfZm9ybV92aXNpYmxlOiAxLFxuICAgIHN0cnVjdHVyZV9mb3JtX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c192aXNpYmxlOiAxLFxuICAgIHJlc3VibWlzc2lvbl92aXNpYmxlOiAwLFxuICAgIHJlc3VsdHNfcGFuZWxfdmlzaWJsZTogMSxcbiAgICBzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlOiAwLFxuICAgIGJpb3NlcmZfYWR2YW5jZWQ6IDAsXG4gICAgZG9tc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21wcmVkX2FkdmFuY2VkOiAwLFxuICAgIGZmcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZXRzaXRlX2FkdmFuY2VkOiAwLFxuICAgIGhzcHJlZF9hZHZhbmNlZDogMCxcbiAgICBtZW1lbWJhZF9hZHZhbmNlZDogMCxcbiAgICBtb2RlbGxlcl9rZXk6IG51bGwsXG4gICAgZG93bmxvYWRfbGlua3M6ICcnLFxuICAgIGVycm9yX21lc3NhZ2U6ICcnLFxuXG4gICAgcHNpcHJlZF9ob3JpejogbnVsbCxcbiAgICBkaXNvX3ByZWNpc2lvbjogbnVsbCxcbiAgICBtZW1zYXRzdm1fc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRzdm1fY2FydG9vbjogJycsXG4gICAgcGdlbl90YWJsZTogbnVsbCxcbiAgICBwZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIG1lbXNhdHBhY2tfc2NoZW1hdGljOiAnJyxcbiAgICBtZW1zYXRwYWNrX2NhcnRvb246ICcnLFxuICAgIGdlbl90YWJsZTogbnVsbCxcbiAgICBnZW5fYW5uX3NldDoge30sXG4gICAgcGFyc2Vkc19pbmZvOiBudWxsLFxuICAgIHBhcnNlZHNfcG5nOiBudWxsLFxuICAgIGRnZW5fdGFibGU6IG51bGwsXG4gICAgZGdlbl9hbm5fc2V0OiB7fSxcbiAgICBiaW9zZXJmX21vZGVsOiBudWxsLFxuICAgIGRvbXNlcmZfYnV0dG9uczogJycsXG4gICAgZG9tc2VyZl9tb2RlbF91cmlzOiBbXSxcbiAgICBmZnByZWRfY2FydG9vbjogbnVsbCxcbiAgICBzY2hfc2NoZW1hdGljOiBudWxsLFxuICAgIGFhX2NvbXBvc2l0aW9uOiBudWxsLFxuICAgIGdsb2JhbF9mZWF0dXJlczogbnVsbCxcbiAgICBmdW5jdGlvbl90YWJsZXM6IG51bGwsXG4gICAgbWV0YXBzaWNvdl9tYXA6IG51bGwsXG4gICAgbWV0c2l0ZV90YWJsZTogbnVsbCxcbiAgICBtZXRzaXRlX3BkYjogbnVsbCxcbiAgICBoc3ByZWRfdGFibGU6IG51bGwsXG4gICAgaHNwcmVkX2luaXRpYWxfcGRiOiBudWxsLFxuICAgIGhzcHJlZF9zZWNvbmRfcGRiOiBudWxsLFxuICAgIHRkYl9maWxlOiBudWxsLFxuICAgIG1lbWVtYmVkX3BkYjogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19idXR0b24nXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfam9iJ10gPSBqb2JfbmFtZSsnX2pvYic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnXSA9ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX2ljb24nXSA9IGdlYXJfc3RyaW5nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ190aW1lJ10gPSAnTG9hZGluZyBEYXRhJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5wc2lwcmVkX2NoZWNrZWQgPSB0cnVlO1xuLy8gaW5pdGlhbGlzYXRpb25fZGF0YS5tZW1lbWJlZF9hZHZhbmNlZCA9IDE7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnNlcXVlbmNlX2Zvcm1fdmlzaWJsZSA9IDA7XG4vLyBpbml0aWFsaXNhdGlvbl9kYXRhLnN0cnVjdHVyZV9mb3JtX3Zpc2libGUgPSAxO1xuLy8gREVDTEFSRSBWQVJJQUJMRVMgYW5kIGluaXQgcmFjdGl2ZSBpbnN0YW5jZVxudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gIGVsOiAnI3BzaXByZWRfc2l0ZScsXG4gIHRlbXBsYXRlOiAnI2Zvcm1fdGVtcGxhdGUnLFxuICBkYXRhOiBpbml0aWFsaXNhdGlvbl9kYXRhLFxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG5cbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgc2VxX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBpZihzZXFfdHlwZSl7XG4gICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICB9XG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzKTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZScsIG51bGwpO1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIG51bGwpO1xuICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfdGltZScsIG51bGwpO1xuICAgICAgfSk7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgbGV0IGVycm9yX3RleHQgPSBcIjxoMz5QT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkPC9oMz5cIitcbiAgICAgIFwiPGg0PlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhlIGVycm9yIG1lc3NhZ2UgYW5kIGpvYiBJRDpcIityYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpK1wiPC9oND5cIitcbiAgICAgIFwiPGg1PkVycm9yIE1lc3NhZ2U6PGJyIC8+XCIrc3VibWlzc2lvbl9tZXNzYWdlK1wiPC9oNT5cIjtcbiAgICAgIHJhY3RpdmUuc2V0KCdlcnJvcl9tZXNzYWdlJywgZXJyb3JfdGV4dCk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0sIDUwMDApO1xuXG59LHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfVxuKTtcblxuLy8gT24gY2xpY2tpbmcgdGhlIEdldCBaaXAgZmlsZSBsaW5rIHRoaXMgd2F0Y2hlcnMgcHJlcGFyZXMgdGhlIHppcCBhbmQgaGFuZHMgaXQgdG8gdGhlIHVzZXJcbnJhY3RpdmUub24oJ2dldF96aXAnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGxldCB1dWlkID0gcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTpcImJsb2JcIn0pLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgc2F2ZUFzKGJsb2IsIHV1aWQrXCIuemlwXCIpO1xuICAgIH0pO1xufSk7XG5cbnJhY3RpdmUub24oJ3Nob3dfYmlvc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnYmlvc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXNlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21wcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21wcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZmZwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdmZnByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWV0c2l0ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWV0c2l0ZV9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2hzcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnaHNwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21lbWVtYmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbi8vIFRoZXNlIHJlYWN0IHRvIHRoZSBoZWFkZXJzIGJlaW5nIGNsaWNrZWQgdG8gdG9nZ2xlIHRoZSBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdzZXF1ZW5jZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIGxldCBzZXR0aW5nID0gZmFsc2U7XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BzaXByZWQnKXtzZXR0aW5nID0gdHJ1ZTt9XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgc2V0dGluZyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ3N0cnVjdHVyZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBmYWxzZSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHNob3dfcGFuZWwoMSwgcmFjdGl2ZSk7XG59KTtcblxuLy9yZWdpc3RlciBsaXN0ZW5lcnMgZm9yIGVhY2ggcmVzdWx0cyBwYW5lbFxuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSwgaSl7XG4gIGNvbnNvbGUubG9nKFwiYWRkaW5nIGpvYnMgd2F0Y2hlcnNcIik7XG4gIHJhY3RpdmUub24oam9iX25hbWUrJ19hY3RpdmUnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICBzaG93X3BhbmVsKGkrMiwgcmFjdGl2ZSk7XG4gICAgaWYoam9iX25hbWUgPT09IFwicHNpcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gXCJkaXNvcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnbWV0c2l0ZScpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX3BkYicpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShtZXRfcGRiLCAnI21ldHNpdGVfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnaHNwcmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgaW5pdGlhbF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX2luaXRpYWxfcGRiJyk7XG4gICAgICAgIGxldCBzZWNvbmRfcGRiID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGluaXRpYWxfcGRiLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShzZWNvbmRfcGRiLCAgJyNoc3ByZWRfc2Vjb25kX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ21lbWVtYmVkJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWVtZW1iZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICAgbGV0IG1lbWVtYmVkX3BkYiA9IHJhY3RpdmUuZ2V0KCdtZW1lbWJlZF9wZGInKTtcbiAgICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1lbWVtYmVkX3BkYiwgJyNtZW1lbWJlZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbiggJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgY29uc29sZS5sb2coXCJTVUJNSVNTSU9OIEFDVElWRVwiKTtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcblxuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgbGV0IHN0cnVjdF90eXBlID0gZmFsc2U7XG4gIGxldCBzZXFfdHlwZSA9IGZhbHNlO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHN0cnVjdF9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc3RydWN0X3R5cGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc2VxX2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzZXFfdHlwZSA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIC8vSEFORExFIEZGUFJFRCBKT0IgU0VMRUNUSU9OLlxuICBpZihjaGVja19zdGF0ZXMuYmlvc2VyZl9jaGVja2VkIHx8IGNoZWNrX3N0YXRlcy5kb21zZXJmX2NoZWNrZWQpXG4gIHtcbiAgICBsZXQgYmlvc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBsZXQgZG9tc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBpZihiaW9zX21vZGVsbGVyX3Rlc3QgfHwgZG9tc19tb2RlbGxlcl90ZXN0KVxuICAgIHtcbiAgICAgIHN1Ym1pdF9qb2IgPXRydWU7XG4gIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3QgcHJvdmlkZWQgYSB2YWxpZCBNT0RFTExFUiBrZXkuIENvbnRhY3QgdGhlIFNhbGkgbGFiIGZvciBhIE1PREVMTEVSIGxpY2VuY2UuXCIpO1xuICAgIH1cbiAgfVxuICBlbHNle1xuICAgIHN1Ym1pdF9qb2I9dHJ1ZTtcbiAgfVxuICBpZihzZXFfdHlwZSAmJiBzdHJ1Y3RfdHlwZSlcbiAge1xuICAgIGFsZXJ0KFwiWW91IGNhbiBub3Qgc3VibWl0IGJvdGggc2VxdWVuY2UgYW5kIHN0cnVjdHVyZSBhbmFseXNpcyBqb2JzXCIpO1xuICAgIHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgfVxuICBpZihzdWJtaXRfam9iKVxuICB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nXCIpO1xuICAgIGlmKHNlcV90eXBlKVxuICAgIHtcbiAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgfVxuICAgIGlmKHN0cnVjdF90eXBlKVxuICAgIHtcbiAgICAgIGxldCBwZGJGaWxlID0gbnVsbDtcbiAgICAgIGxldCBwZGJEYXRhID0gJyc7XG4gICAgICB0cnl7XG4gICAgICAgcGRiRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGRiRmlsZVwiKTtcbiAgICAgICBsZXQgZmlsZSA9IHBkYkZpbGUuZmlsZXNbMF07XG4gICAgICAgbGV0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcGRiRGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgcGRiRGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgcGRiRGF0YSA9IFwiXCI7XG4gICAgICAgIGlmKGVyci5tZXNzYWdlLmluY2x1ZGVzKFwiRmlsZVJlYWRlci5yZWFkQXNUZXh0IGlzIG5vdCBhbiBvYmplY3RcIikpe1xuICAgICAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHNlbGVjdGVkIGEgUERCIGZpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgUmVzdWJtaXNzaW9uIHdpZGdldCwgdHJ1bmNhdGUgdGhlIHNlcXVlbmNlXG4vLyBhbmQgc2VuZCBhIG5ldyBqb2JcbnJhY3RpdmUub24oJ3Jlc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1Jlc3VibWl0dGluZyBzZWdtZW50Jyk7XG4gIGxldCBzdGFydCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RhcnRcIik7XG4gIGxldCBzdG9wID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdG9wXCIpO1xuICBsZXQgc2VxdWVuY2UgPSByYWN0aXZlLmdldChcInNlcXVlbmNlXCIpO1xuICBsZXQgc3Vic2VxdWVuY2UgPSBzZXF1ZW5jZS5zdWJzdHJpbmcoc3RhcnQtMSwgc3RvcCk7XG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKStcIl9zZWdcIjtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHN1YnNlcXVlbmNlKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCBuYW1lKTtcbiAgbGV0IGNoZWNrX3N0YXRlcyA9IHt9O1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gIH0pO1xuICAvL2NsZWFyIHdoYXQgd2UgaGF2ZSBwcmV2aW91c2x5IHdyaXR0ZW5cbiAgY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMpO1xuICAvL3ZlcmlmeSBmb3JtIGNvbnRlbnRzIGFuZCBwb3N0XG4gIC8vYWRkIGZvcm0gZGVmYXVsdHMgYnV0IG51bGwgdGhlIHN0cnVjdGVzIG9uZXMgYXMgd2UgZG9uJ3QgYWxsb3cgc3RydWN0dXJlIGpvYiByZXN1Ym1pc3Npb25cbiAgbGV0IG9wdGlvbnNfZGF0YSA9IHNldF9hZHZhbmNlZF9wYXJhbXMoKTtcbiAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc3Vic2VxdWVuY2UsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgdHJ1ZSwgZmFsc2UpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmZ1bmN0aW9uIHRlc3RfbW9kZWxsZXJfa2V5KGlucHV0KVxue1xuICBpZihpbnB1dCA9PT0gJ01PREVMSVJBTkpFJylcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGxldCBzZXFfdHlwZSA9IHRydWU7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Rpc29wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1wYWNrJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDYpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDcpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGRvbXRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Jpb3NlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdmZnByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50ZGJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE3KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBzZXFfdHlwZSk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyBOZXcgUGFubmVsIGZ1bmN0aW9uc1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL1JlbG9hZCBhbGlnbm1lbnRzIGZvciBKYWxWaWV3IGZvciB0aGUgZ2VuVEhSRUFERVIgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTmV3QWxpZ25tZW50KGFsblVSSSxhbm5VUkksdGl0bGUpIHtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21zYS8/YW5uPVwiK2ZpbGVfdXJsK2FublVSSStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTgwMCxoZWlnaHQ9NDAwXCIpO1xufVxuXG4vL1JlbG9hZCBhbGlnbm1lbnRzIGZvciBKYWxWaWV3IGZvciB0aGUgZ2VuVEhSRUFERVIgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKGFsblVSSSwgdHlwZSkge1xuXG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGxldCBtb2Rfa2V5ID0gcmFjdGl2ZS5nZXQoJ21vZGVsbGVyX2tleScpO1xuICBpZihtb2Rfa2V5ID09PSAnTScrJ08nKydEJysnRScrJ0wnKydJJysnUicrJ0EnKydOJysnSicrJ0UnKVxuICB7XG4gICAgLy9hbGVydCh0eXBlKTtcbiAgICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbW9kZWwvcG9zdD90eXBlPVwiK3R5cGUrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD02NzAsaGVpZ2h0PTcwMFwiKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBNJysnTycrJ0QnKydFJysnTCcrJ0wnKydFJysnUiBMaWNlbmNlIEtleScpO1xuICB9XG59XG5cbi8vIFN3YXBzIG91dCB0aGUgZG9tc2VyZiBtb2RlbCB3aGVuIHRob3NlIGJ1dHRvbnMgYXJlIGNsaWNrZWRcbmV4cG9ydCBmdW5jdGlvbiBzd2FwRG9tc2VyZih1cmlfbnVtYmVyKVxue1xuICB1cmlfbnVtYmVyID0gdXJpX251bWJlci0xO1xuICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbdXJpX251bWJlcl0sICcjZG9tc2VyZl9tb2RlbCcsIHRydWUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL21haW4uanMiLCJpbXBvcnQgeyBzZW5kX2pvYiB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGlzSW5BcnJheSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5cbi8vVGFrZXMgdGhlIGRhdGEgbmVlZGVkIHRvIHZlcmlmeSB0aGUgaW5wdXQgZm9ybSBkYXRhLCBlaXRoZXIgdGhlIG1haW4gZm9ybVxuLy9vciB0aGUgc3VibWlzc29uIHdpZGdldCB2ZXJpZmllcyB0aGF0IGRhdGEgYW5kIHRoZW4gcG9zdHMgaXQgdG8gdGhlIGJhY2tlbmQuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgZGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSlcbntcbiAgLyp2ZXJpZnkgdGhhdCBldmVyeXRoaW5nIGhlcmUgaXMgb2sqL1xuICBsZXQgZXJyb3JfbWVzc2FnZT1udWxsO1xuICBsZXQgam9iX3N0cmluZyA9ICcnO1xuICAvL2Vycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLCBbcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLCBtZW1zYXRzdm1fY2hlY2tlZF0pO1xuXG4gIGxldCBjaGVja19saXN0ID0gW107XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX2xpc3QucHVzaChjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10pO1xuICB9KTtcblxuICBpZihzZXFfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zZXFfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoc3RydWN0X3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc3RydWN0X2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChqb2JfbmFtZStcIixcIik7XG4gICAgICAgICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZGlzb3ByZWQnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnIHx8IGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdiaW9zZXJmJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBnZW50aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGRvbXRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAyICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICAvLyBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICBpZighIC9BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9