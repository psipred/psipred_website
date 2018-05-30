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
    console.log(downloads_info.gentdb.tdb);
    downloads_string = downloads_string.concat(downloads_info.gentdb.tdb);
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

  // options_data. = document.getElementById("memembed_search_type");
  // options_data. = document.getElementById("memembed_barrel");
  // options_data. = document.getElementById("memembed_terminal");
  // options_data. = document.getElementById("memembed_boundaries");
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
initialisation_data.gentdb_checked = true;
initialisation_data.gentdb_advanced = 1;
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
  if (!/^HEADER|^ATOM\s+\d+/i.test(struct)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWZmMWZlODdmNjQ1MmE3NjY0ZDEiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwibGluZXMiLCJzcGxpdCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJsZW5ndGgiLCJzZXQiLCJwYXJzZV9tZXRzaXRlIiwibWV0c2l0ZV90YWJsZSIsImhpdF9yZWdleCIsImhpdF9tYXRjaGVzIiwibWF0Y2giLCJwYXJzZV9mZnByZWRzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZG9tc2VyZl9yZXN1bHRfZm91bmQiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInBzaXByZWRfcmVzdWx0X2ZvdW5kIiwicGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJtZW1wYWNrIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJnZW50aHJlYWRlciIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtZXRhcHNpY292IiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJtZXRzaXRlIiwiaHNwcmVkIiwiaW5pdGlhbF9tYXRjaCIsInNlY29uZF9tYXRjaCIsImluaXRpYWwiLCJzZWNvbmQiLCJnZW50ZGIiLCJ0ZGIiLCJ1cmkiLCJjc3NfaWQiLCJjYXJ0b29uX2NvbG9yIiwiYXRvbSIsImhvdHNwb3RfY29sb3IiLCJiIiwiZWxlbWVudCIsIiQiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2aWV3ZXIiLCIkM0Rtb2wiLCJjcmVhdGVWaWV3ZXIiLCJnZXRfdGV4dCIsImFkZE1vZGVsIiwic2V0U3R5bGUiLCJjb2xvcmZ1bmMiLCJ6b29tVG8iLCJyZW5kZXIiLCJ6b29tIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZXRfYWR2YW5jZWRfcGFyYW1zIiwib3B0aW9uc19kYXRhIiwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZXJyIiwicHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zIiwiYmlvc2VyZl9tb2RlbGxlcl9rZXkiLCJkb21zZXJmX21vZGVsbGVyX2tleSIsImZmcHJlZF90eXBlIiwibWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiIsImV4dHJhY3RfZmFzdGFfY2hhaW4iLCJzZWVkU2l0ZUZpbmRfY2hhaW4iLCJtZXRwcmVkX3dyYXBwZXJfY2hhaW4iLCJzZWVkU2l0ZUZpbmRfbWV0YWwiLCJtZXRwcmVkX3dyYXBwZXJfbWV0YWwiLCJtZXRwcmVkX3dyYXBwZXJfZnByIiwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyIsImhzX3ByZWRfZmlyc3RfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4iLCJoc19wcmVkX3NlY29uZF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4iLCJzZW5kX3JlcXVlc3QiLCJ1cmwiLCJzZW5kX2RhdGEiLCJyZXNwb25zZSIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJzdWJtaXNzaW9ucyIsImlucHV0X2ZpbGUiLCJqb2JzIiwic3VibWlzc2lvbiIsInNsaWNlIiwic3VibWlzc2lvbl9uYW1lIiwidXJsX3N0dWIiLCJjdGwiLCJwYXRoX2JpdHMiLCJmb2xkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNJbkFycmF5IiwiYXJyYXkiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtIiwia2V5IiwiZG9jdW1lbnRFbGVtZW50IiwiaW1wb3J0YW50Iiwic3R5bGUiLCJnZXRFbVBpeGVscyIsImV4dHJhQm9keSIsImNyZWF0ZUVsZW1lbnQiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYm9keSIsInRlc3RFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwiY2xpcGJvYXJkIiwiQ2xpcGJvYXJkIiwib24iLCJlbmRwb2ludHNfdXJsIiwiZ2VhcnNfc3ZnIiwibWFpbl91cmwiLCJhcHBfcGF0aCIsInNlcV9qb2JfbGlzdCIsInN0cnVjdF9qb2JfbGlzdCIsImhvc3RuYW1lIiwiaW5pdGlhbGlzYXRpb25fZGF0YSIsInNlcXVlbmNlX2Zvcm1fdmlzaWJsZSIsInN0cnVjdHVyZV9mb3JtX3Zpc2libGUiLCJyZXN1bHRzX3Zpc2libGUiLCJyZXN1Ym1pc3Npb25fdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJiaW9zZXJmX2FkdmFuY2VkIiwiZG9tc2VyZl9hZHZhbmNlZCIsImRvbXByZWRfYWR2YW5jZWQiLCJmZnByZWRfYWR2YW5jZWQiLCJtZXRzaXRlX2FkdmFuY2VkIiwiaHNwcmVkX2FkdmFuY2VkIiwibWVtZW1iYWRfYWR2YW5jZWQiLCJtb2RlbGxlcl9rZXkiLCJkb3dubG9hZF9saW5rcyIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfbWFwIiwibWV0c2l0ZV9wZGIiLCJoc3ByZWRfaW5pdGlhbF9wZGIiLCJoc3ByZWRfc2Vjb25kX3BkYiIsInRkYl9maWxlIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJnZW50ZGJfY2hlY2tlZCIsImdlbnRkYl9hZHZhbmNlZCIsIlJhY3RpdmUiLCJlbCIsInRlbXBsYXRlIiwidXVpZF9yZWdleCIsInV1aWRfbWF0Y2giLCJzZXFfb2JzZXJ2ZXIiLCJvYnNlcnZlIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluaXQiLCJkZWZlciIsInNlcV9sZW5ndGgiLCJzZXFfc3RhcnQiLCJzZXFfc3RvcCIsInNlcV90eXBlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiYXRjaCIsInN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsInN1Ym1pc3Npb25fbWVzc2FnZSIsImxhc3RfbWVzc2FnZSIsImNvbnRleHQiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiIsImJsb2IiLCJzYXZlQXMiLCJldmVudCIsImFkdiIsInNldHRpbmciLCJtZXRfcGRiIiwiaW5pdGlhbF9wZGIiLCJzZWNvbmRfcGRiIiwic3VibWl0X2pvYiIsInRvVXBwZXJDYXNlIiwiY2hlY2tfc3RhdGVzIiwic3RydWN0X3R5cGUiLCJiaW9zZXJmX2NoZWNrZWQiLCJkb21zZXJmX2NoZWNrZWQiLCJiaW9zX21vZGVsbGVyX3Rlc3QiLCJ0ZXN0X21vZGVsbGVyX2tleSIsImRvbXNfbW9kZWxsZXJfdGVzdCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwicGRiRmlsZSIsInBkYkRhdGEiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsInJlYWRBc1RleHQiLCJvbmxvYWQiLCJyZXN1bHQiLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJpbnB1dCIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJzd2FwRG9tc2VyZiIsInVyaV9udW1iZXIiLCJlcnJvcl9tZXNzYWdlIiwiam9iX3N0cmluZyIsImNoZWNrX2xpc3QiLCJ2ZXJpZnlfc2VxX2Zvcm0iLCJ2ZXJpZnlfc3RydWN0X2Zvcm0iLCJwc2lwcmVkX2NoZWNrZWQiLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9jaGVja2VkIiwic3RydWN0IiwiY2hlY2tlZF9hcnJheSIsInRlc3QiLCJudWNsZW90aWRlX2NvdW50Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCQyxJQUEvQixFQUNQO0FBQ0UsTUFBSUMsZUFBZSxnS0FBbkI7QUFDQUEsa0JBQWdCLHVKQUFoQjtBQUNBQSxrQkFBZ0IsdUtBQWhCO0FBQ0FBLGtCQUFnQiwwRUFBaEI7QUFDQSxNQUFJQyxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FELFFBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsUUFBSUMsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBLFFBQUdJLFFBQVFDLE1BQVIsS0FBbUIsQ0FBdEIsRUFBd0I7QUFDdEJQLHNCQUFnQixhQUFXTSxRQUFRLENBQVIsQ0FBWCxHQUFzQixXQUF0QixHQUFrQ0EsUUFBUSxDQUFSLENBQWxDLEdBQTZDLFdBQTdDLEdBQXlEQSxRQUFRLENBQVIsQ0FBekQsR0FBb0UsWUFBcEY7QUFDRDtBQUNGLEdBTEQ7QUFNQU4sa0JBQWdCLFNBQWhCO0FBQ0FGLFVBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCUixZQUE1QjtBQUNEOztBQUVEO0FBQ08sU0FBU1MsYUFBVCxDQUF1QlgsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQ1A7QUFDRSxNQUFJVyxnQkFBZ0Isc0tBQXBCO0FBQ0FBLG1CQUFpQix1SkFBakI7QUFDQUEsbUJBQWlCLGlLQUFqQjtBQUNBQSxtQkFBaUIscUZBQWpCO0FBQ0EsTUFBSUMsWUFBWSxxQkFBaEI7QUFDQSxNQUFJQyxjQUFjYixLQUFLYyxLQUFMLENBQVdGLFNBQVgsQ0FBbEI7QUFDQSxNQUFHQyxXQUFILEVBQ0E7QUFDRUEsZ0JBQVlULE9BQVosQ0FBb0IsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQ25DLFVBQUlDLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQVEsdUJBQWlCLGFBQVdKLFFBQVEsQ0FBUixDQUFYLEdBQXNCLFdBQXRCLEdBQWtDQSxRQUFRLENBQVIsQ0FBbEMsR0FBNkMsV0FBN0MsR0FBeURBLFFBQVEsQ0FBUixDQUF6RCxHQUFvRSxZQUFyRjtBQUNELEtBSEQ7QUFJRDtBQUNESSxtQkFBaUIsU0FBakI7QUFDQVosVUFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkJFLGFBQTdCO0FBQ0Q7O0FBRU0sU0FBU0ksYUFBVCxDQUF1QmhCLE9BQXZCLEVBQWdDQyxJQUFoQyxFQUFxQzs7QUFFMUMsTUFBSUUsUUFBUUYsS0FBS0csS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBLE1BQUlhLFVBQVUsRUFBZDtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBLE1BQUlDLGFBQWEsRUFBakI7QUFDQWpCLFFBQU1FLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsUUFBR0QsS0FBS2UsVUFBTCxDQUFnQixHQUFoQixDQUFILEVBQXdCO0FBQUM7QUFBUTtBQUNqQyxRQUFJYixVQUFVRixLQUFLRixLQUFMLENBQVcsSUFBWCxDQUFkO0FBQ0EsUUFBR0ksUUFBUUMsTUFBUixHQUFpQixDQUFwQixFQUFzQjtBQUFDO0FBQVE7QUFDL0IsUUFBR0QsUUFBUSxDQUFSLE1BQWUsSUFBbEIsRUFBdUI7QUFBQ1MsY0FBUUssSUFBUixDQUFhZCxPQUFiO0FBQXVCO0FBQy9DLFFBQUdBLFFBQVEsQ0FBUixNQUFlLElBQWxCLEVBQXVCO0FBQUNXLGNBQVFHLElBQVIsQ0FBYWQsT0FBYjtBQUF1QjtBQUMvQyxRQUFHQSxRQUFRLENBQVIsTUFBZSxJQUFsQixFQUF1QjtBQUFDVSxjQUFRSSxJQUFSLENBQWFkLE9BQWI7QUFBdUI7QUFDaEQsR0FQRDs7QUFTQVksZ0JBQWMsNkNBQWQ7QUFDQUEsZ0JBQWMsb0ZBQWQ7QUFDQUgsVUFBUVosT0FBUixDQUFnQixVQUFTRyxPQUFULEVBQWtCRCxDQUFsQixFQUFvQjtBQUNsQyxRQUFJZ0IsZUFBZSxNQUFuQjtBQUNBLFFBQUdmLFFBQVEsQ0FBUixNQUFhLEdBQWhCLEVBQW9CO0FBQUNlLHFCQUFlLFNBQWY7QUFBMEI7QUFDL0NILGtCQUFjLGdCQUFjRyxZQUFkLEdBQTJCLElBQXpDO0FBQ0FILGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLFNBQU9aLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FZLGtCQUFjLE9BQWQ7QUFFRCxHQVZEO0FBV0FBLGdCQUFjLGdCQUFkO0FBQ0FwQixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JVLFVBQS9COztBQUVBQSxnQkFBYyw2Q0FBZDtBQUNBQSxnQkFBYyxvRkFBZDtBQUNBRixVQUFRYixPQUFSLENBQWdCLFVBQVNHLE9BQVQsRUFBa0JELENBQWxCLEVBQW9CO0FBQ2xDLFFBQUlnQixlQUFlLE1BQW5CO0FBQ0EsUUFBR2YsUUFBUSxDQUFSLE1BQWEsR0FBaEIsRUFBb0I7QUFBQ2UscUJBQWUsU0FBZjtBQUEwQjtBQUMvQ0gsa0JBQWMsZ0JBQWNHLFlBQWQsR0FBMkIsSUFBekM7QUFDQUgsa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsU0FBT1osUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQVksa0JBQWMsT0FBZDtBQUVELEdBVkQ7QUFXQUEsZ0JBQWMsZ0JBQWQ7QUFDQXBCLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQlUsVUFBL0I7O0FBRUFBLGdCQUFjLDZDQUFkO0FBQ0FBLGdCQUFjLG9GQUFkO0FBQ0FELFVBQVFkLE9BQVIsQ0FBZ0IsVUFBU0csT0FBVCxFQUFrQkQsQ0FBbEIsRUFBb0I7QUFDbEMsUUFBSWdCLGVBQWUsTUFBbkI7QUFDQSxRQUFHZixRQUFRLENBQVIsTUFBYSxHQUFoQixFQUFvQjtBQUFDZSxxQkFBZSxTQUFmO0FBQTBCO0FBQy9DSCxrQkFBYyxnQkFBY0csWUFBZCxHQUEyQixJQUF6QztBQUNBSCxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxTQUFPWixRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBWSxrQkFBYyxPQUFkO0FBQ0QsR0FURDtBQVVBQSxnQkFBYyxnQkFBZDtBQUNBQSxnQkFBYyxvVEFBZDtBQUNBcEIsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCVSxVQUEvQjtBQUVEOztBQUVELFNBQVNJLFVBQVQsR0FBcUI7QUFDbkIsTUFBSUMsV0FBVyxFQUFmO0FBQ0FBLFdBQVNDLENBQVQsR0FBYSxFQUFFQyxLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTSSxDQUFULEdBQWEsRUFBRUYsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU0ssQ0FBVCxHQUFhLEVBQUVILEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNNLENBQVQsR0FBYSxFQUFFSixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTTyxDQUFULEdBQWEsRUFBRUwsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1EsQ0FBVCxHQUFhLEVBQUVOLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNTLENBQVQsR0FBYSxFQUFFUCxLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTVSxDQUFULEdBQWEsRUFBRVIsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1csQ0FBVCxHQUFhLEVBQUVULEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNZLENBQVQsR0FBYSxFQUFFVixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTYSxDQUFULEdBQWEsRUFBRVgsS0FBSyxnQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2MsQ0FBVCxHQUFhLEVBQUVaLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNlLENBQVQsR0FBYSxFQUFFYixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssZ0JBRFAsRUFBYjtBQUVBSCxXQUFTZ0IsQ0FBVCxHQUFhLEVBQUVkLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNpQixDQUFULEdBQWEsRUFBRWYsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2tCLENBQVQsR0FBYSxFQUFFaEIsS0FBSyxnQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU21CLENBQVQsR0FBYSxFQUFFakIsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU29CLENBQVQsR0FBYSxFQUFFbEIsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU3FCLENBQVQsR0FBYSxFQUFFbkIsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU3NCLENBQVQsR0FBYSxFQUFFcEIsS0FBSyxnQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQSxTQUFPSCxRQUFQO0FBQ0Q7O0FBRUQsU0FBU3VCLFNBQVQsR0FBb0I7QUFDbEIsTUFBSUMsVUFBVSxFQUFkO0FBQ0FBLFVBQVFDLGNBQVIsR0FBeUIsRUFBQ3ZCLEtBQUssQ0FBQyxnQkFBUDtBQUNDQyxTQUFLLGdCQUROLEVBQXpCO0FBRUFxQixVQUFRLDJCQUFSLElBQXVDLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxjQUROLEVBQXZDO0FBRUFxQixVQUFRLGlCQUFSLElBQTZCLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxlQUROLEVBQTdCO0FBRUFxQixVQUFRLG1CQUFSLElBQStCLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxlQUROLEVBQS9CO0FBRUFxQixVQUFRLGtCQUFSLElBQThCLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxlQUROLEVBQTlCO0FBRUFxQixVQUFRRSxNQUFSLEdBQWlCLEVBQUN4QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxjQUROLEVBQWpCO0FBRUFxQixVQUFRLDJCQUFSLElBQXVDLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxlQUROLEVBQXZDO0FBRUFxQixVQUFRLDhCQUFSLElBQTBDLEVBQUN0QixLQUFLLGVBQU47QUFDQ0MsU0FBSyxlQUROLEVBQTFDO0FBRUEsU0FBT3FCLE9BQVA7QUFDRDs7QUFFRCxTQUFTRyxZQUFULENBQXNCekIsR0FBdEIsRUFBMEI7QUFDdEIsTUFBSTBCLFNBQVNDLEtBQUtDLEdBQUwsQ0FBUzVCLEdBQVQsQ0FBYjtBQUNBLE1BQUcwQixVQUFVLElBQWIsRUFBbUI7QUFDZixRQUFHMUIsTUFBTSxDQUFULEVBQVc7QUFBQyxhQUFPLFVBQVA7QUFBbUI7QUFDL0IsV0FBTyxVQUFQO0FBQ0gsR0FIRCxNQUlLLElBQUcwQixVQUFVLElBQWIsRUFBa0I7QUFDbkIsUUFBRzFCLE1BQU0sQ0FBVCxFQUFXO0FBQUMsYUFBTyxVQUFQO0FBQW1CO0FBQy9CLFdBQU8sVUFBUDtBQUNILEdBSEksTUFJQSxJQUFHMEIsVUFBVSxJQUFiLEVBQW1CO0FBQ3BCLFFBQUcxQixNQUFNLENBQVQsRUFBVztBQUFDLGFBQU8sVUFBUDtBQUFtQjtBQUMvQixXQUFPLFVBQVA7QUFDSCxHQUhJLE1BSUEsSUFBRzBCLFVBQVUsS0FBYixFQUFxQjtBQUN0QixRQUFHMUIsTUFBTSxDQUFULEVBQVc7QUFBQyxhQUFPLFdBQVA7QUFBb0I7QUFDaEMsV0FBTyxXQUFQO0FBQ0g7QUFDRCxTQUFPLE9BQVA7QUFDSDs7QUFFRDtBQUNPLFNBQVM2QixhQUFULENBQXVCeEQsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQ1A7QUFDRSxNQUFJRSxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0EsTUFBSXFELFVBQVUsRUFBZDtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBLE1BQUlULFVBQVNELFdBQWI7QUFDQSxNQUFJdkIsV0FBU0QsWUFBYjtBQUNBckIsUUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFHRCxLQUFLZSxVQUFMLENBQWdCLElBQWhCLENBQUgsRUFBeUI7QUFDdkIsVUFBSXNDLFVBQVVyRCxLQUFLRixLQUFMLENBQVcsSUFBWCxDQUFkO0FBQ0FzRCxjQUFRQyxRQUFRLENBQVIsQ0FBUixJQUFzQkEsUUFBUSxDQUFSLENBQXRCO0FBQ0Q7QUFDRCxRQUFHckQsS0FBS2UsVUFBTCxDQUFnQixJQUFoQixDQUFILEVBQ0E7QUFDRSxVQUFJc0MsVUFBVXJELEtBQUtGLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQXFELGNBQVFFLFFBQVEsQ0FBUixDQUFSLElBQXNCQSxRQUFRLENBQVIsQ0FBdEI7QUFDRDtBQUNGLEdBVkQ7O0FBWUE7QUFDQSxNQUFJcEMsZUFBZSxFQUFuQjtBQUNBLE1BQUlxQyxrQkFBa0I1RCxRQUFRNkQsR0FBUixDQUFZLGlCQUFaLENBQXRCO0FBQ0EsTUFBSUMsYUFBYSw4QkFBakI7QUFDQUEsZ0JBQWMsZ1ZBQWQ7QUFDQUEsZ0JBQWMsa0VBQWQ7O0FBRUFDLFNBQU9DLElBQVAsQ0FBWVAsT0FBWixFQUFxQlEsSUFBckIsR0FBNEI1RCxPQUE1QixDQUFvQyxVQUFTNkQsWUFBVCxFQUFzQjtBQUN4RCxRQUFJM0MsZUFBZSxFQUFuQjtBQUNBLFFBQUcyQyxnQkFBZ0JqQixPQUFuQixFQUEyQjtBQUN6QjFCLHFCQUFlNkIsYUFBYyxDQUFDZSxXQUFXVixRQUFRUyxZQUFSLENBQVgsSUFBa0NqQixRQUFRaUIsWUFBUixFQUFzQnZDLEdBQXpELElBQWdFc0IsUUFBUWlCLFlBQVIsRUFBc0J0QyxHQUFwRyxDQUFmO0FBQ0Q7QUFDRGtDLGtCQUFjLGFBQVdJLFlBQVgsR0FBd0IsV0FBeEIsR0FBb0NDLFdBQVdWLFFBQVFTLFlBQVIsQ0FBWCxFQUFrQ0UsT0FBbEMsQ0FBMEMsQ0FBMUMsQ0FBcEMsR0FBaUYsa0JBQWpGLEdBQW9HN0MsWUFBcEcsR0FBaUgsZ0NBQS9IO0FBQ0QsR0FORDtBQU9BdUMsZ0JBQWMsVUFBZDtBQUNBOUQsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCb0QsVUFBL0I7O0FBRUE7QUFDQSxNQUFJTyxpQkFBaUJyRSxRQUFRNkQsR0FBUixDQUFZLGdCQUFaLENBQXJCO0FBQ0EsTUFBSVMsV0FBVyxtREFBZjtBQUNBQSxjQUFZLGFBQVo7QUFDQVAsU0FBT0MsSUFBUCxDQUFZTixPQUFaLEVBQXFCTyxJQUFyQixHQUE0QjVELE9BQTVCLENBQW9DLFVBQVNrRSxPQUFULEVBQWlCO0FBQ25ERCxnQkFBWSxTQUFPQyxPQUFQLEdBQWUsT0FBM0I7QUFDRCxHQUZEO0FBR0FELGNBQVksV0FBWjtBQUNBUCxTQUFPQyxJQUFQLENBQVlOLE9BQVosRUFBcUJPLElBQXJCLEdBQTRCNUQsT0FBNUIsQ0FBb0MsVUFBU2tFLE9BQVQsRUFBaUI7QUFDbkQsUUFBSWhELGVBQWUsRUFBbkI7QUFDQUEsbUJBQWU2QixhQUFhLENBQUNlLFdBQVdULFFBQVFhLE9BQVIsQ0FBWCxJQUE2QjlDLFNBQVM4QyxPQUFULEVBQWtCNUMsR0FBaEQsSUFBdURGLFNBQVM4QyxPQUFULEVBQWtCM0MsR0FBdEYsQ0FBZjtBQUNBMEMsZ0JBQVksZ0JBQWMvQyxZQUFkLEdBQTJCLElBQTNCLEdBQWdDLENBQUM0QyxXQUFXVCxRQUFRYSxPQUFSLENBQVgsSUFBNkIsR0FBOUIsRUFBbUNILE9BQW5DLENBQTJDLENBQTNDLENBQWhDLEdBQThFLE9BQTFGO0FBQ0QsR0FKRDtBQUtBRSxjQUFZLHFCQUFaO0FBQ0FBLGNBQVksK0JBQVo7QUFDQUEsY0FBWSwwRUFBWjtBQUNBQSxjQUFZLE1BQVo7QUFDQUEsY0FBWSxxQkFBWjtBQUNBQSxjQUFZLDZCQUFaO0FBQ0FBLGNBQVksb0NBQVo7QUFDQUEsY0FBWSxPQUFaO0FBQ0FBLGNBQVksTUFBWjtBQUNBQSxjQUFZLFdBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHNCQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSxXQUFaO0FBQ0FBLGNBQVksT0FBWjtBQUNBQSxjQUFZLE1BQVo7QUFDQUEsY0FBWSxrSEFBWjtBQUNBQSxjQUFZLE9BQVo7QUFDQUEsY0FBWSxVQUFaO0FBQ0F0RSxVQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEI0RCxRQUE5QjtBQUNEOztBQUdEO0FBQ08sU0FBU0UsaUJBQVQsQ0FBMkJDLEtBQTNCLEVBQWtDQyxJQUFsQyxFQUNQO0FBQ0ksTUFBSTNELFFBQVEwRCxNQUFNRSxJQUFOLENBQVdELElBQVgsQ0FBWjtBQUNBLE1BQUczRCxNQUFNLENBQU4sRUFBUzZELFFBQVQsQ0FBa0IsR0FBbEIsQ0FBSCxFQUNBO0FBQ0UsUUFBSUMsVUFBVTlELE1BQU0sQ0FBTixFQUFTWCxLQUFULENBQWUsR0FBZixDQUFkO0FBQ0F5RSxZQUFReEUsT0FBUixDQUFnQixVQUFTeUUsTUFBVCxFQUFpQnZFLENBQWpCLEVBQW1CO0FBQ2pDc0UsY0FBUXRFLENBQVIsSUFBYXVFLE9BQU8xRSxLQUFQLENBQWEsR0FBYixDQUFiO0FBQ0F5RSxjQUFRdEUsQ0FBUixFQUFXLENBQVgsSUFBZ0J3RSxTQUFTRixRQUFRdEUsQ0FBUixFQUFXLENBQVgsQ0FBVCxDQUFoQjtBQUNBc0UsY0FBUXRFLENBQVIsRUFBVyxDQUFYLElBQWdCd0UsU0FBU0YsUUFBUXRFLENBQVIsRUFBVyxDQUFYLENBQVQsQ0FBaEI7QUFDRCxLQUpEO0FBS0EsV0FBT3NFLE9BQVA7QUFDRCxHQVRELE1BVUssSUFBRzlELE1BQU0sQ0FBTixFQUFTNkQsUUFBVCxDQUFrQixHQUFsQixDQUFILEVBQ0w7QUFDSTtBQUNBLFFBQUlJLE1BQU1qRSxNQUFNLENBQU4sRUFBU1gsS0FBVCxDQUFlLEdBQWYsQ0FBVjtBQUNBLFFBQUl5RSxVQUFVLENBQUMsRUFBRCxDQUFkO0FBQ0FBLFlBQVEsQ0FBUixFQUFXLENBQVgsSUFBZ0JFLFNBQVNDLElBQUksQ0FBSixDQUFULENBQWhCO0FBQ0FILFlBQVEsQ0FBUixFQUFXLENBQVgsSUFBZ0JFLFNBQVNDLElBQUksQ0FBSixDQUFULENBQWhCO0FBQ0EsV0FBT0gsT0FBUDtBQUNIO0FBQ0QsU0FBTzlELE1BQU0sQ0FBTixDQUFQO0FBQ0g7O0FBRUQ7QUFDTyxTQUFTa0UsU0FBVCxDQUFtQmpGLE9BQW5CLEVBQTRCQyxJQUE1QixFQUNQO0FBQ0ksTUFBSWlGLGNBQWNsRixRQUFRNkQsR0FBUixDQUFZLGFBQVosQ0FBbEI7QUFDQSxNQUFJMUQsUUFBUUYsS0FBS0csS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBRCxRQUFNZ0YsS0FBTjtBQUNBaEYsVUFBUUEsTUFBTWlGLE1BQU4sQ0FBYUMsT0FBYixDQUFSO0FBQ0EsTUFBR0gsWUFBWXpFLE1BQVosSUFBc0JOLE1BQU1NLE1BQS9CLEVBQ0E7QUFDRU4sVUFBTUUsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixVQUFJQyxVQUFVRixLQUFLRixLQUFMLENBQVcsS0FBWCxDQUFkO0FBQ0E4RSxrQkFBWTNFLENBQVosRUFBZStFLEVBQWYsR0FBb0I5RSxRQUFRLENBQVIsQ0FBcEI7QUFDRCxLQUhEO0FBSUFSLFlBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCd0UsV0FBM0I7QUFDQUssVUFBTUMsY0FBTixDQUFxQk4sV0FBckIsRUFBa0MsRUFBQ08sUUFBUSxtQkFBVCxFQUE4QkMsZUFBZSxDQUE3QyxFQUFnREMsT0FBTyxLQUF2RCxFQUE4REMsaUJBQWlCLEdBQS9FLEVBQW9GQyxPQUFPLEdBQTNGLEVBQWdHQyxRQUFRLEdBQXhHLEVBQTZHQyxrQkFBa0IsR0FBL0gsRUFBbEM7QUFDRCxHQVJELE1BVUE7QUFDRUMsVUFBTSxxREFBTjtBQUNEO0FBQ0QsU0FBT2QsV0FBUDtBQUNIOztBQUVEO0FBQ08sU0FBU2UsV0FBVCxDQUFxQmpHLE9BQXJCLEVBQThCQyxJQUE5QixFQUNQO0FBQ0ksTUFBSWlGLGNBQWNsRixRQUFRNkQsR0FBUixDQUFZLGFBQVosQ0FBbEI7QUFDQSxNQUFJMUQsUUFBUUYsS0FBS0csS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBRCxRQUFNZ0YsS0FBTixHQUFlaEYsTUFBTWdGLEtBQU4sR0FBZWhGLE1BQU1nRixLQUFOLEdBQWVoRixNQUFNZ0YsS0FBTixHQUFlaEYsTUFBTWdGLEtBQU47QUFDNURoRixVQUFRQSxNQUFNaUYsTUFBTixDQUFhQyxPQUFiLENBQVI7QUFDQSxNQUFHSCxZQUFZekUsTUFBWixJQUFzQk4sTUFBTU0sTUFBL0IsRUFDQTtBQUNFTixVQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFVBQUlDLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQSxVQUFHSSxRQUFRLENBQVIsTUFBZSxHQUFsQixFQUFzQjtBQUFDMEUsb0JBQVkzRSxDQUFaLEVBQWUyRixRQUFmLEdBQTBCLEdBQTFCO0FBQStCO0FBQ3RELFVBQUcxRixRQUFRLENBQVIsTUFBZSxHQUFsQixFQUFzQjtBQUFDMEUsb0JBQVkzRSxDQUFaLEVBQWUyRixRQUFmLEdBQTBCLElBQTFCO0FBQWdDO0FBQ3hELEtBSkQ7QUFLQWxHLFlBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCd0UsV0FBM0I7QUFDQUssVUFBTUMsY0FBTixDQUFxQk4sV0FBckIsRUFBa0MsRUFBQ08sUUFBUSxtQkFBVCxFQUE4QkMsZUFBZSxDQUE3QyxFQUFnREMsT0FBTyxLQUF2RCxFQUE4REMsaUJBQWlCLEdBQS9FLEVBQW9GQyxPQUFPLEdBQTNGLEVBQWdHQyxRQUFRLEdBQXhHLEVBQTZHQyxrQkFBa0IsR0FBL0gsRUFBbEM7QUFDRDtBQUNKOztBQUVEO0FBQ08sU0FBU0ksVUFBVCxDQUFvQm5HLE9BQXBCLEVBQTZCQyxJQUE3QixFQUNQO0FBQ0UsTUFBSW1HLFlBQVksRUFBaEI7QUFDQSxNQUFJakcsUUFBUUYsS0FBS0csS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBRCxRQUFNZ0YsS0FBTixHQUFlaEYsTUFBTWdGLEtBQU4sR0FBZWhGLE1BQU1nRixLQUFOO0FBQzlCaEYsVUFBUUEsTUFBTWlGLE1BQU4sQ0FBYUMsT0FBYixDQUFSO0FBQ0FsRixRQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFFBQUlDLFVBQVVGLEtBQUtGLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQWdHLGNBQVU3RixDQUFWLElBQWUsRUFBZjtBQUNBNkYsY0FBVTdGLENBQVYsRUFBYThGLEdBQWIsR0FBbUI3RixRQUFRLENBQVIsQ0FBbkI7QUFDQTRGLGNBQVU3RixDQUFWLEVBQWE2RixTQUFiLEdBQXlCNUYsUUFBUSxDQUFSLENBQXpCO0FBQ0QsR0FMRDtBQU1BUixVQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIwRixTQUE5QjtBQUNBYixRQUFNZSxrQkFBTixDQUF5QkYsU0FBekIsRUFBb0MsS0FBcEMsRUFBMkMsQ0FBQyxXQUFELENBQTNDLEVBQTBELENBQUMsT0FBRCxDQUExRCxFQUFzRSxhQUF0RSxFQUFxRixFQUFDWCxRQUFRLGVBQVQsRUFBMEJjLFdBQVcsTUFBckMsRUFBNkNDLFVBQVUsR0FBdkQsRUFBNERkLGVBQWUsQ0FBM0UsRUFBOEVDLE9BQU8sS0FBckYsRUFBNEZDLGlCQUFpQixHQUE3RyxFQUFrSEMsT0FBTyxHQUF6SCxFQUE4SEMsUUFBUSxHQUF0SSxFQUEySUMsa0JBQWtCLEdBQTdKLEVBQXJGO0FBRUQ7O0FBRUQ7QUFDTyxTQUFTVSxnQkFBVCxDQUEwQnpHLE9BQTFCLEVBQW1DQyxJQUFuQyxFQUNQO0FBQ0UsTUFBSWlGLGNBQWNsRixRQUFRNkQsR0FBUixDQUFZLGFBQVosQ0FBbEI7QUFDQSxNQUFJNkMsTUFBTTFHLFFBQVE2RCxHQUFSLENBQVksVUFBWixDQUFWO0FBQ0E7QUFDQSxNQUFJOEMsZUFBZW5DLGtCQUFrQixxQkFBbEIsRUFBeUN2RSxJQUF6QyxDQUFuQjtBQUNBLE1BQUkyRyxpQkFBaUJwQyxrQkFBa0IsMkJBQWxCLEVBQStDdkUsSUFBL0MsQ0FBckI7QUFDQSxNQUFJNEcsb0JBQW9CckMsa0JBQWtCLGdDQUFsQixFQUFvRHZFLElBQXBELENBQXhCO0FBQ0EsTUFBSTZHLFdBQVd0QyxrQkFBa0IsdUJBQWxCLEVBQTJDdkUsSUFBM0MsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxNQUFJOEcsWUFBWSxJQUFoQjtBQUNBLE1BQUdELGFBQWEsS0FBaEIsRUFDQTtBQUNFQyxnQkFBWSxJQUFaO0FBQ0Q7QUFDRCxNQUFJQyxXQUFXLElBQUlDLEtBQUosQ0FBVVAsSUFBSWpHLE1BQWQsQ0FBZjtBQUNBLE1BQUdrRyxpQkFBaUIsZUFBcEIsRUFDQTtBQUNFLFFBQUlPLFdBQVcsQ0FBZjtBQUNBUCxpQkFBYXRHLE9BQWIsQ0FBcUIsVUFBU3lFLE1BQVQsRUFBZ0I7QUFDbkNrQyxpQkFBV0EsU0FBU0csSUFBVCxDQUFjLElBQWQsRUFBb0JyQyxPQUFPLENBQVAsQ0FBcEIsRUFBK0JBLE9BQU8sQ0FBUCxJQUFVLENBQXpDLENBQVg7QUFDQSxVQUFHb0MsV0FBVyxDQUFkLEVBQWdCO0FBQUNBLG9CQUFZLENBQVo7QUFBZTtBQUNoQ0YsaUJBQVdBLFNBQVNHLElBQVQsQ0FBY0osU0FBZCxFQUF5QkcsUUFBekIsRUFBbUNwQyxPQUFPLENBQVAsQ0FBbkMsQ0FBWDtBQUNBLFVBQUdpQyxjQUFjLElBQWpCLEVBQXNCO0FBQUVBLG9CQUFZLElBQVo7QUFBa0IsT0FBMUMsTUFBOEM7QUFBQ0Esb0JBQVksSUFBWjtBQUFrQjtBQUNqRUcsaUJBQVdwQyxPQUFPLENBQVAsSUFBVSxDQUFyQjtBQUNELEtBTkQ7QUFPQWtDLGVBQVdBLFNBQVNHLElBQVQsQ0FBY0osU0FBZCxFQUF5QkcsV0FBUyxDQUFsQyxFQUFxQ1IsSUFBSWpHLE1BQXpDLENBQVg7QUFFRDtBQUNEO0FBQ0EsTUFBR21HLG1CQUFtQixlQUF0QixFQUFzQztBQUNwQ0EsbUJBQWV2RyxPQUFmLENBQXVCLFVBQVN5RSxNQUFULEVBQWdCO0FBQ3JDa0MsaUJBQVdBLFNBQVNHLElBQVQsQ0FBYyxHQUFkLEVBQW1CckMsT0FBTyxDQUFQLENBQW5CLEVBQThCQSxPQUFPLENBQVAsSUFBVSxDQUF4QyxDQUFYO0FBQ0QsS0FGRDtBQUdEO0FBQ0Q7QUFDQSxNQUFHK0Isc0JBQXNCLGVBQXpCLEVBQXlDO0FBQ3ZDQSxzQkFBa0J4RyxPQUFsQixDQUEwQixVQUFTeUUsTUFBVCxFQUFnQjtBQUN4Q2tDLGlCQUFXQSxTQUFTRyxJQUFULENBQWMsSUFBZCxFQUFvQnJDLE9BQU8sQ0FBUCxDQUFwQixFQUErQkEsT0FBTyxDQUFQLElBQVUsQ0FBekMsQ0FBWDtBQUNELEtBRkQ7QUFHRDtBQUNEa0MsV0FBUzNHLE9BQVQsQ0FBaUIsVUFBUytHLElBQVQsRUFBZTdHLENBQWYsRUFBaUI7QUFDaEMyRSxnQkFBWTNFLENBQVosRUFBZThHLE1BQWYsR0FBd0JELElBQXhCO0FBQ0QsR0FGRDtBQUdBcEgsVUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkJ3RSxXQUEzQjtBQUNBSyxRQUFNQyxjQUFOLENBQXFCTixXQUFyQixFQUFrQyxFQUFDTyxRQUFRLG1CQUFULEVBQThCQyxlQUFlLENBQTdDLEVBQWdEQyxPQUFPLEtBQXZELEVBQThEQyxpQkFBaUIsR0FBL0UsRUFBb0ZDLE9BQU8sR0FBM0YsRUFBZ0dDLFFBQVEsR0FBeEcsRUFBNkdDLGtCQUFrQixHQUEvSCxFQUFsQztBQUVEOztBQUVNLFNBQVN1QixhQUFULENBQXVCdEgsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQXNDc0gsSUFBdEMsRUFDUDtBQUNFLE1BQUlwSCxRQUFRRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0E7QUFDQSxNQUFJb0gsV0FBV3hILFFBQVE2RCxHQUFSLENBQVkwRCxPQUFLLFVBQWpCLENBQWY7QUFDQTtBQUNBLE1BQUd4RCxPQUFPQyxJQUFQLENBQVl3RCxRQUFaLEVBQXNCL0csTUFBdEIsR0FBK0IsQ0FBbEMsRUFBb0M7QUFDcEMsUUFBSWdILGVBQWUsNERBQW5CO0FBQ0FBLG9CQUFnQixvQkFBaEI7QUFDQUEsb0JBQWdCLG9CQUFoQjtBQUNBQSxvQkFBZ0Isa0JBQWhCO0FBQ0FBLG9CQUFnQixnQkFBaEI7QUFDQUEsb0JBQWdCLGdCQUFoQjtBQUNBQSxvQkFBZ0Isb0JBQWhCO0FBQ0FBLG9CQUFnQixxQkFBaEI7QUFDQUEsb0JBQWdCLHFCQUFoQjtBQUNBQSxvQkFBZ0Isb0JBQWhCO0FBQ0EsUUFBR0YsU0FBUyxNQUFaLEVBQW1CO0FBQ2pCRSxzQkFBZ0IsdUJBQWhCO0FBQ0FBLHNCQUFnQixxQkFBaEI7QUFDQUEsc0JBQWdCLHNCQUFoQjtBQUNBQSxzQkFBZ0Isc0JBQWhCO0FBQ0QsS0FMRCxNQUtNO0FBQ0pBLHNCQUFnQixlQUFoQjtBQUNBQSxzQkFBZ0Isc0JBQWhCO0FBQ0FBLHNCQUFnQixzQkFBaEI7QUFDRDtBQUNEQSxvQkFBZ0IsaUJBQWhCO0FBQ0FBLG9CQUFnQixvQkFBaEI7QUFDQUEsb0JBQWdCLGdCQUFoQjs7QUFFQTtBQUNBQSxvQkFBZ0IsaUJBQWhCO0FBQ0F0SCxVQUFNRSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCO0FBQ0EsVUFBR0QsS0FBS0csTUFBTCxLQUFnQixDQUFuQixFQUFxQjtBQUFDO0FBQVE7QUFDOUIsVUFBSUQsVUFBVUYsS0FBS0YsS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBLFVBQUlzSCxZQUFZbEgsUUFBUSxDQUFSLENBQWhCO0FBQ0EsVUFBRytHLFNBQVMsTUFBWixFQUFtQjtBQUFFRyxvQkFBWWxILFFBQVEsRUFBUixDQUFaO0FBQXlCO0FBQzlDLFVBQUdrSCxZQUFVLEdBQVYsR0FBY25ILENBQWQsSUFBbUJpSCxRQUF0QixFQUNBO0FBQ0FDLHdCQUFnQixNQUFoQjtBQUNBQSx3QkFBZ0IsZ0JBQWNqSCxRQUFRLENBQVIsRUFBV21ILFdBQVgsRUFBZCxHQUF1QyxJQUF2QyxHQUE0Q25ILFFBQVEsQ0FBUixDQUE1QyxHQUF1RCxPQUF2RTtBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBaUgsd0JBQWdCLFNBQU9qSCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFsQztBQUNBLFlBQUlvSCxNQUFNcEgsUUFBUSxDQUFSLEVBQVdxSCxTQUFYLENBQXFCLENBQXJCLEVBQXdCckgsUUFBUSxDQUFSLEVBQVdDLE1BQVgsR0FBa0IsQ0FBMUMsQ0FBVjtBQUNBLFlBQUc4RyxTQUFTLE1BQVosRUFBbUI7QUFBRUssZ0JBQU1wSCxRQUFRLEVBQVIsRUFBWXFILFNBQVosQ0FBc0IsQ0FBdEIsRUFBeUJySCxRQUFRLEVBQVIsRUFBWUMsTUFBWixHQUFtQixDQUE1QyxDQUFOO0FBQXNEO0FBQzNFLFlBQUc4RyxTQUFTLE1BQVosRUFBbUI7QUFDakJFLDBCQUFnQixTQUFPakgsUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQWlILDBCQUFnQixTQUFPakgsUUFBUSxFQUFSLENBQVAsR0FBbUIsT0FBbkM7QUFDQWlILDBCQUFnQiwrRUFBNkVDLFNBQTdFLEdBQXVGLElBQXZGLEdBQTRGQSxTQUE1RixHQUFzRyxXQUF0SDtBQUNBRCwwQkFBZ0IsaUZBQStFRyxHQUEvRSxHQUFtRix3QkFBbkc7QUFDQUgsMEJBQWdCLGdIQUE4R0csR0FBOUcsR0FBa0gsd0JBQWxJO0FBQ0FILDBCQUFnQixpRkFBZ0ZELFNBQVNFLFlBQVUsR0FBVixHQUFjbkgsQ0FBdkIsRUFBMEJ1SCxHQUExRyxHQUErRyxPQUEvRyxHQUF3SE4sU0FBU0UsWUFBVSxHQUFWLEdBQWNuSCxDQUF2QixFQUEwQndILEdBQWxKLEdBQXVKLE9BQXZKLElBQWdLTCxZQUFVLEdBQVYsR0FBY25ILENBQTlLLElBQWlMLHlDQUFqTTtBQUNBa0gsMEJBQWdCLDJFQUEwRUQsU0FBU0UsWUFBVSxHQUFWLEdBQWNuSCxDQUF2QixFQUEwQnVILEdBQXBHLEdBQXlHLHNEQUF6SDtBQUNELFNBUkQsTUFTSTtBQUNGTCwwQkFBZ0IsMEZBQXdGRyxHQUF4RixHQUE0RixJQUE1RixHQUFpR0YsU0FBakcsR0FBMkcsV0FBM0g7QUFDQUQsMEJBQWdCLGlGQUErRUcsR0FBL0UsR0FBbUYsd0JBQW5HO0FBQ0FILDBCQUFnQiw2REFBMkRHLEdBQTNELEdBQStELHdCQUEvRTtBQUNBSCwwQkFBZ0IsZ0hBQThHRyxHQUE5RyxHQUFrSCx3QkFBbEk7QUFDQUgsMEJBQWdCLGlGQUFnRkQsU0FBU0UsWUFBVSxHQUFWLEdBQWNuSCxDQUF2QixFQUEwQnVILEdBQTFHLEdBQStHLE9BQS9HLEdBQXdITixTQUFTRSxZQUFVLEdBQVYsR0FBY25ILENBQXZCLEVBQTBCd0gsR0FBbEosR0FBdUosT0FBdkosSUFBZ0tMLFlBQVUsR0FBVixHQUFjbkgsQ0FBOUssSUFBaUwseUNBQWpNO0FBQ0FrSCwwQkFBZ0IsMkVBQTBFRCxTQUFTRSxZQUFVLEdBQVYsR0FBY25ILENBQXZCLEVBQTBCdUgsR0FBcEcsR0FBeUcscURBQXpIO0FBQ0Q7QUFDREwsd0JBQWdCLFNBQWhCO0FBQ0M7QUFDRixLQXZDRDtBQXdDQUEsb0JBQWdCLG9CQUFoQjtBQUNBekgsWUFBUVUsR0FBUixDQUFZNkcsT0FBSyxRQUFqQixFQUEyQkUsWUFBM0I7QUFDQyxHQXJFRCxNQXNFSztBQUNEekgsWUFBUVUsR0FBUixDQUFZNkcsT0FBSyxRQUFqQixFQUEyQiw2RkFBM0I7QUFDSDtBQUNGOztBQUVNLFNBQVNTLGFBQVQsQ0FBdUJoSSxPQUF2QixFQUFnQ0MsSUFBaEMsRUFDUDtBQUNFLE1BQUlnSSxtQkFBbUIsb0RBQXZCO0FBQ0EsTUFBSUMsbUJBQW9CRCxpQkFBaUJ0RCxJQUFqQixDQUFzQjFFLElBQXRCLENBQXhCO0FBQ0EsTUFBR2lJLGdCQUFILEVBQ0E7QUFDRSxRQUFJQyxVQUFVbEksS0FBS21JLE9BQUwsQ0FBYSxJQUFiLEVBQWtCLFFBQWxCLENBQWQ7QUFDQUQsY0FBVUEsUUFBUUMsT0FBUixDQUFnQixJQUFoQixFQUFxQixRQUFyQixDQUFWO0FBQ0FwSSxZQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixTQUFPeUgsT0FBUCxHQUFlLE9BQTNDO0FBQ0EsUUFBSUUsU0FBUyxFQUFiO0FBQ0EsUUFBR0gsaUJBQWlCLENBQWpCLEVBQW9CSSxPQUFwQixDQUE0QixHQUE1QixDQUFILEVBQ0E7QUFDRUQsZUFBU0gsaUJBQWlCLENBQWpCLEVBQW9COUgsS0FBcEIsQ0FBMEIsR0FBMUIsQ0FBVDtBQUNBaUksYUFBT2hJLE9BQVAsQ0FBZSxVQUFTa0ksS0FBVCxFQUFnQmhJLENBQWhCLEVBQWtCO0FBQy9COEgsZUFBTzlILENBQVAsSUFBWXdFLFNBQVN3RCxLQUFULENBQVo7QUFDRCxPQUZEO0FBR0QsS0FORCxNQVFBO0FBQ0VGLGFBQU8sQ0FBUCxJQUFZdEQsU0FBU21ELGlCQUFpQixDQUFqQixDQUFULENBQVo7QUFDRDtBQUNETSxZQUFRQyxHQUFSLENBQVlKLE1BQVo7QUFDQSxRQUFJbkQsY0FBY2xGLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFsQjtBQUNBd0UsV0FBT2hJLE9BQVAsQ0FBZSxVQUFTa0ksS0FBVCxFQUFlO0FBQzVCckQsa0JBQVlxRCxLQUFaLEVBQW1CRyxPQUFuQixHQUE2QixHQUE3QjtBQUNELEtBRkQ7QUFHQTFJLFlBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCd0UsV0FBM0I7QUFDRCxHQXZCRCxNQXlCQTtBQUNFbEYsWUFBUVUsR0FBUixDQUFZLGNBQVosRUFBNEIsd0NBQTVCO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Z0JEO0FBQ0E7O0FBRU8sU0FBU2lJLFVBQVQsQ0FBb0JKLEtBQXBCLEVBQTJCdkksT0FBM0IsRUFDUDtBQUNFQSxVQUFRVSxHQUFSLENBQWEsdUJBQWIsRUFBc0MsSUFBdEM7QUFDQVYsVUFBUVUsR0FBUixDQUFhLHVCQUFiLEVBQXNDNkgsS0FBdEM7QUFDRDs7QUFFRDtBQUNPLFNBQVNLLGNBQVQsQ0FBd0I1SSxPQUF4QixFQUFpQzZJLFdBQWpDLEVBQThDQyxRQUE5QyxFQUF3REMsU0FBeEQsRUFBa0U7QUFDdkUvSSxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixLQUE5QjtBQUNBVixVQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsRUFBOUI7QUFDQW9JLFdBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQWtCO0FBQ2pDaEosWUFBUVUsR0FBUixDQUFZc0ksV0FBUyxrQkFBckIsRUFBeUMsOEJBQTRCRCxVQUFVQyxRQUFWLENBQTVCLEdBQWdELHNCQUF6RjtBQUNBaEosWUFBUVUsR0FBUixDQUFZc0ksV0FBUyxlQUFyQixFQUFzQ0gsV0FBdEM7QUFDQTdJLFlBQVFVLEdBQVIsQ0FBWXNJLFdBQVMsT0FBckIsRUFBOEIsY0FBOUI7QUFDRCxHQUpEO0FBS0FoSixVQUFRVSxHQUFSLENBQVksZUFBWixFQUE0QixJQUE1QjtBQUNBVixVQUFRVSxHQUFSLENBQVksZ0JBQVo7QUFDQVYsVUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxFQUFqQztBQUNBVixVQUFRVSxHQUFSLENBQVksWUFBWixFQUEwQixFQUExQjtBQUNBVixVQUFRVSxHQUFSLENBQVksVUFBWixFQUF3QixFQUF4QjtBQUNBVixVQUFRVSxHQUFSLENBQVksV0FBWixFQUF5QixFQUF6QjtBQUNBVixVQUFRVSxHQUFSLENBQVksU0FBWixFQUF1QixFQUF2QjtBQUNBVixVQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixJQUE1QjtBQUNBVixVQUFRVSxHQUFSLENBQVksYUFBWixFQUEyQixJQUEzQjtBQUNBVixVQUFRVSxHQUFSLENBQVksWUFBWixFQUEwQixJQUExQjtBQUNBVixVQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBVixVQUFRVSxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3QjtBQUNBVixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsRUFBL0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBVixVQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGNBQVosRUFBNEIsSUFBNUI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIsSUFBM0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBVixVQUFRVSxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4Qjs7QUFHQVYsVUFBUVUsR0FBUixDQUFZLGFBQVosRUFBMEIsSUFBMUI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLFlBQVosRUFBeUIsSUFBekI7QUFDQTZFLFFBQU0wRCxjQUFOLENBQXFCLG1CQUFyQjtBQUNBMUQsUUFBTTBELGNBQU4sQ0FBcUIscUJBQXJCO0FBQ0ExRCxRQUFNMEQsY0FBTixDQUFxQixlQUFyQjs7QUFFQUMsUUFBTSxJQUFJQyxLQUFKLEVBQU47QUFDRDs7QUFFRDtBQUNPLFNBQVNDLHNCQUFULENBQWdDMUUsSUFBaEMsRUFBc0MyRSxjQUF0QyxFQUFzRFAsUUFBdEQsRUFBZ0VDLFNBQWhFLEVBQ1A7QUFDRUQsV0FBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDakMsUUFBR3RFLEtBQUtzRSxRQUFMLEtBQWtCQSxRQUFyQixFQUNBO0FBQ0VLLHFCQUFlTCxRQUFmLElBQTJCLEVBQTNCO0FBQ0FLLHFCQUFlTCxRQUFmLEVBQXlCTSxNQUF6QixHQUFrQyxTQUFPUCxVQUFVQyxRQUFWLENBQVAsR0FBMkIsaUJBQTdEO0FBQ0E7QUFDQSxVQUFHQSxhQUFhLGNBQWIsSUFBK0JBLGFBQWEsU0FBNUMsSUFDQUEsYUFBYSxjQURiLElBQytCQSxhQUFhLFlBRDVDLElBRUFBLGFBQWEsUUFGaEIsRUFHQTtBQUNFSyx1QkFBZUUsT0FBZixHQUF5QixFQUF6QjtBQUNBRix1QkFBZUUsT0FBZixDQUF1QkQsTUFBdkIsR0FBZ0MsU0FBT1AsVUFBVVEsT0FBakIsR0FBeUIsaUJBQXpEO0FBQ0Q7QUFDRCxVQUFHUCxhQUFhLFNBQWhCLEVBQ0E7QUFDRUssdUJBQWVHLFNBQWYsR0FBMEIsRUFBMUI7QUFDQUgsdUJBQWVHLFNBQWYsQ0FBeUJGLE1BQXpCLEdBQWtDLFNBQU9QLFVBQVVTLFNBQWpCLEdBQTJCLGlCQUE3RDtBQUNEO0FBQ0QsVUFBR1IsYUFBYSxTQUFoQixFQUNBO0FBQ0VLLHVCQUFlRSxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FGLHVCQUFlRSxPQUFmLENBQXVCRCxNQUF2QixHQUFnQyxTQUFPUCxVQUFVUSxPQUFqQixHQUF5QixpQkFBekQ7QUFDQUYsdUJBQWVJLFlBQWYsR0FBNkIsRUFBN0I7QUFDQUosdUJBQWVJLFlBQWYsQ0FBNEJILE1BQTVCLEdBQXFDLFNBQU9QLFVBQVVVLFlBQWpCLEdBQThCLGlCQUFuRTtBQUNBSix1QkFBZUssT0FBZixHQUF5QixFQUF6QjtBQUNBTCx1QkFBZUssT0FBZixDQUF1QkosTUFBdkIsR0FBZ0MsU0FBT1AsVUFBVVcsT0FBakIsR0FBeUIsaUJBQXpEO0FBQ0Q7QUFDRCxVQUFHVixhQUFhLFNBQWhCLEVBQ0E7QUFDRUssdUJBQWVFLE9BQWYsR0FBeUIsRUFBekI7QUFDQUYsdUJBQWVFLE9BQWYsQ0FBdUJELE1BQXZCLEdBQWdDLFNBQU9QLFVBQVVRLE9BQWpCLEdBQXlCLGlCQUF6RDtBQUNBRix1QkFBZU0sWUFBZixHQUE2QixFQUE3QjtBQUNBTix1QkFBZU0sWUFBZixDQUE0QkwsTUFBNUIsR0FBcUMsU0FBT1AsVUFBVVksWUFBakIsR0FBOEIsaUJBQW5FO0FBQ0FOLHVCQUFlTyxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FQLHVCQUFlTyxPQUFmLENBQXVCTixNQUF2QixHQUFnQyxTQUFPUCxVQUFVYSxPQUFqQixHQUF5QixpQkFBekQ7QUFDRDtBQUNELFVBQUdaLGFBQWEsUUFBaEIsRUFDQTtBQUNFSyx1QkFBZUcsU0FBZixHQUEyQixFQUEzQjtBQUNBSCx1QkFBZUcsU0FBZixDQUF5QkYsTUFBekIsR0FBa0MsU0FBT1AsVUFBVVMsU0FBakIsR0FBMkIsaUJBQTdEO0FBQ0FILHVCQUFlRSxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FGLHVCQUFlRSxPQUFmLENBQXVCRCxNQUF2QixHQUFnQyw0QkFBaEM7QUFDQUQsdUJBQWVYLE9BQWYsR0FBd0IsRUFBeEI7QUFDQVcsdUJBQWVYLE9BQWYsQ0FBdUJZLE1BQXZCLEdBQWdDLDRCQUFoQztBQUNBRCx1QkFBZVEsTUFBZixHQUF3QixFQUF4QjtBQUNBUix1QkFBZVEsTUFBZixDQUFzQlAsTUFBdEIsR0FBK0IsU0FBT1AsVUFBVWMsTUFBakIsR0FBd0IsaUJBQXZEO0FBQ0Q7QUFDRjtBQUNGLEdBaEREO0FBaUREOztBQUVEO0FBQ08sU0FBU0MsY0FBVCxDQUF3QjlKLE9BQXhCLEVBQWlDMEUsSUFBakMsRUFBdUNxRixRQUF2QyxFQUFpRGIsR0FBakQsRUFBc0RHLGNBQXRELEVBQXNFTixTQUF0RSxFQUNQO0FBQ0UsTUFBSWlCLGNBQWMsVUFBbEI7QUFDQSxNQUFJQyxZQUFZLFFBQWhCO0FBQ0EsTUFBSUMsWUFBWSxRQUFoQjtBQUNBLE1BQUlDLHVCQUF1QiwyQkFBM0I7QUFDQSxNQUFJQyx5QkFBeUIsa0JBQTdCO0FBQ0EsTUFBSUMsb0JBQW9CLGFBQXhCO0FBQ0EsTUFBSUMsd0JBQXdCLHVCQUE1QjtBQUNBLE1BQUlDLG9CQUFvQixrQkFBeEI7QUFDQSxNQUFJQyxzQkFBc0IsdUJBQTFCO0FBQ0EsTUFBSUMsb0JBQW9CLHlCQUF4QjtBQUNBLE1BQUlDLHFCQUFxQixTQUF6QjtBQUNBLE1BQUlDLGdCQUFnQixZQUFwQjtBQUNBLE1BQUlDLGdCQUFnQix1QkFBcEI7QUFDQSxNQUFJQyxtQkFBbUIsYUFBdkI7QUFDQSxNQUFJQyxtQkFBbUIsK0JBQXZCO0FBQ0EsTUFBSUMseUJBQXlCLHNCQUE3QjtBQUNBLE1BQUlDLGtCQUFrQixhQUF0QjtBQUNBLE1BQUlDLHVCQUF1QixXQUEzQjtBQUNBLE1BQUlDLHFCQUFxQixZQUF6QjtBQUNBLE1BQUlDLHNCQUFzQixVQUExQjtBQUNBLE1BQUlDLDBCQUEwQixVQUE5QjtBQUNBLE1BQUlDLDJCQUEyQixXQUEvQjtBQUNBLE1BQUlDLHNCQUFzQixXQUExQjtBQUNBLE1BQUlDLG9CQUFvQixXQUF4QjtBQUNBLE1BQUlDLHVCQUF1QixlQUEzQjtBQUNBLE1BQUlDLHNCQUFzQixjQUExQjs7QUFFQSxNQUFJQyxjQUFjLEVBQWxCO0FBQ0EsTUFBSUMsVUFBVWpILEtBQUtpSCxPQUFuQjtBQUNBLE1BQUlDLGVBQWUsQ0FBbkI7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyxnQ0FBZ0MsS0FBcEM7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyw0QkFBNEIsS0FBaEM7QUFDQTtBQUNBLE9BQUksSUFBSTFMLENBQVIsSUFBYW9MLE9BQWIsRUFDQTtBQUNFLFFBQUlPLGNBQWNQLFFBQVFwTCxDQUFSLENBQWxCO0FBQ0EsUUFBRzJMLFlBQVlDLElBQVosS0FBcUIsd0JBQXhCLEVBQ0E7QUFDSSxVQUFJQyxVQUFVcE0sUUFBUTZELEdBQVIsQ0FBWSxjQUFaLENBQWQ7QUFDQSxVQUFJd0ksTUFBTUgsWUFBWUksU0FBdEI7QUFDQSxVQUFJQyxPQUFPRixJQUFJRyxNQUFKLENBQVcsQ0FBWCxFQUFjSCxJQUFJSSxXQUFKLENBQWdCLEdBQWhCLENBQWQsQ0FBWDtBQUNBLFVBQUlDLEtBQUtILEtBQUtDLE1BQUwsQ0FBWUQsS0FBS0UsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFsQyxFQUFxQ0YsS0FBSzlMLE1BQTFDLENBQVQ7QUFDQTJMLGNBQVFNLEVBQVIsSUFBYyxFQUFkO0FBQ0FOLGNBQVFNLEVBQVIsRUFBWTNFLEdBQVosR0FBa0J3RSxPQUFLLE1BQXZCO0FBQ0FILGNBQVFNLEVBQVIsRUFBWTVFLEdBQVosR0FBa0J5RSxPQUFLLE1BQXZCO0FBQ0F2TSxjQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QjBMLE9BQTVCO0FBQ0g7QUFDRCxRQUFHRixZQUFZQyxJQUFaLEtBQXFCLDZCQUF4QixFQUNBO0FBQ0ksVUFBSUMsVUFBVXBNLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFkO0FBQ0EsVUFBSXdJLE1BQU1ILFlBQVlJLFNBQXRCO0FBQ0EsVUFBSUMsT0FBT0YsSUFBSUcsTUFBSixDQUFXLENBQVgsRUFBY0gsSUFBSUksV0FBSixDQUFnQixHQUFoQixDQUFkLENBQVg7QUFDQSxVQUFJQyxLQUFLSCxLQUFLQyxNQUFMLENBQVlELEtBQUtFLFdBQUwsQ0FBaUIsR0FBakIsSUFBc0IsQ0FBbEMsRUFBcUNGLEtBQUs5TCxNQUExQyxDQUFUO0FBQ0EyTCxjQUFRTSxFQUFSLElBQWMsRUFBZDtBQUNBTixjQUFRTSxFQUFSLEVBQVkzRSxHQUFaLEdBQWtCd0UsT0FBSyxNQUF2QjtBQUNBSCxjQUFRTSxFQUFSLEVBQVk1RSxHQUFaLEdBQWtCeUUsT0FBSyxNQUF2QjtBQUNBdk0sY0FBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIwTCxPQUEzQjtBQUNIO0FBQ0QsUUFBR0YsWUFBWUMsSUFBWixLQUFxQiw0QkFBeEIsRUFDQTtBQUNJLFVBQUlDLFVBQVVwTSxRQUFRNkQsR0FBUixDQUFZLGNBQVosQ0FBZDtBQUNBLFVBQUl3SSxNQUFNSCxZQUFZSSxTQUF0QjtBQUNBLFVBQUlDLE9BQU9GLElBQUlHLE1BQUosQ0FBVyxDQUFYLEVBQWNILElBQUlJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBZCxDQUFYO0FBQ0EsVUFBSUMsS0FBS0gsS0FBS0MsTUFBTCxDQUFZRCxLQUFLRSxXQUFMLENBQWlCLEdBQWpCLElBQXNCLENBQWxDLEVBQXFDRixLQUFLOUwsTUFBMUMsQ0FBVDtBQUNBMkwsY0FBUU0sRUFBUixJQUFjLEVBQWQ7QUFDQU4sY0FBUU0sRUFBUixFQUFZM0UsR0FBWixHQUFrQndFLE9BQUssTUFBdkI7QUFDQUgsY0FBUU0sRUFBUixFQUFZNUUsR0FBWixHQUFrQnlFLE9BQUssTUFBdkI7QUFDQXZNLGNBQVFVLEdBQVIsQ0FBWSxjQUFaLEVBQTRCMEwsT0FBNUI7QUFDSDtBQUNGO0FBQ0Q1RCxVQUFRQyxHQUFSLENBQVlrRCxPQUFaO0FBQ0E7QUFDQSxPQUFJLElBQUlwTCxDQUFSLElBQWFvTCxPQUFiLEVBQ0E7QUFDRSxRQUFJTyxjQUFjUCxRQUFRcEwsQ0FBUixDQUFsQjtBQUNBO0FBQ0EsUUFBRzJMLFlBQVlDLElBQVosSUFBb0IsVUFBdkIsRUFDQTtBQUNFSCw2QkFBdUIsSUFBdkI7QUFDQSxVQUFJakwsUUFBUWlKLFlBQVlyRixJQUFaLENBQWlCdUgsWUFBWUksU0FBN0IsQ0FBWjtBQUNBLFVBQUd2TCxLQUFILEVBQ0E7QUFDRTRMLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsT0FBOUMsRUFBdURwRCxHQUF2RCxFQUE0RGxKLE9BQTVEO0FBQ0FBLGdCQUFRVSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQVYsZ0JBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixnQkFBUVUsR0FBUixDQUFZLGNBQVosRUFBNEIsRUFBNUI7QUFDQTJJLHVCQUFlRSxPQUFmLENBQXVCcUQsS0FBdkIsR0FBK0IsY0FBWTdDLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBMUU7QUFFRDtBQUNELFVBQUlPLFlBQVk1QyxVQUFVdEYsSUFBVixDQUFldUgsWUFBWUksU0FBM0IsQ0FBaEI7QUFDQSxVQUFHTyxTQUFILEVBQ0E7QUFDRXhELHVCQUFlRSxPQUFmLENBQXVCdUQsR0FBdkIsR0FBNkIsY0FBWS9DLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywrQkFBeEU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixhQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsT0FBOUMsRUFBdURwRCxHQUF2RCxFQUE0RGxKLE9BQTVEO0FBQ0FBLGNBQVFVLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxFQUF4QztBQUNBMkkscUJBQWVuRCxRQUFmLENBQXdCNkcsS0FBeEIsR0FBZ0MsY0FBWWhELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBM0U7QUFDQXRNLGNBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBVixjQUFRVSxHQUFSLENBQVksZUFBWixFQUE2QixFQUE3QjtBQUNEO0FBQ0QsUUFBR3dMLFlBQVlDLElBQVosS0FBcUIsY0FBeEIsRUFDQTtBQUNFUSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLE1BQTlDLEVBQXNEcEQsR0FBdEQsRUFBMkRsSixPQUEzRDtBQUNBcUoscUJBQWVuRCxRQUFmLENBQXdCOEcsSUFBeEIsR0FBK0IsY0FBWWpELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw0QkFBMUU7QUFDRDs7QUFFRDtBQUNBLFFBQUdKLFlBQVlDLElBQVosS0FBcUIsV0FBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLDJCQUFaLEVBQXlDLEVBQXpDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBVixjQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsRUFBOUI7QUFDQSxVQUFJdU0sZUFBZTdDLHVCQUF1QnpGLElBQXZCLENBQTRCdUgsWUFBWUksU0FBeEMsQ0FBbkI7QUFDQSxVQUFHVyxZQUFILEVBQ0E7QUFDRU4sUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxlQUFhcUosUUFBYixHQUFzQm1DLFlBQVlJLFNBQWxDLEdBQTRDLE1BQS9FO0FBQ0FqRCx1QkFBZUcsU0FBZixDQUF5QjBELFNBQXpCLEdBQXFDLGNBQVluRCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsK0JBQWhGO0FBQ0Q7QUFDRCxVQUFJYSxnQkFBZ0JoRCxxQkFBcUJ4RixJQUFyQixDQUEwQnVILFlBQVlJLFNBQXRDLENBQXBCO0FBQ0EsVUFBR2EsYUFBSCxFQUNBO0FBQ0VSLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGdCQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsZUFBYXFKLFFBQWIsR0FBc0JtQyxZQUFZSSxTQUFsQyxHQUE0QyxNQUE3RTtBQUNBakQsdUJBQWVHLFNBQWYsQ0FBeUI0RCxPQUF6QixHQUFtQyxjQUFZckQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDZCQUE5RTtBQUNEO0FBQ0QsVUFBSWUsZUFBZWhELGtCQUFrQjFGLElBQWxCLENBQXVCdUgsWUFBWUksU0FBbkMsQ0FBbkI7QUFDQSxVQUFHZSxZQUFILEVBQ0E7QUFDRVYsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQTJNLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsWUFBOUMsRUFBNERwRCxHQUE1RCxFQUFpRWxKLE9BQWpFO0FBQ0FxSix1QkFBZUcsU0FBZixDQUF5QjlFLElBQXpCLEdBQWdDLGNBQVlxRixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMkJBQTNFO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsUUFBR0osWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixjQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUl5TSxnQkFBaUI3QyxzQkFBc0IzRixJQUF0QixDQUEyQnVILFlBQVlJLFNBQXZDLENBQXJCO0FBQ0EsVUFBR2EsYUFBSCxFQUNBO0FBQ0V0QiwrQkFBdUIsSUFBdkI7QUFDQWMsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQiw4QkFBNEJxSixRQUE1QixHQUFxQ21DLFlBQVlJLFNBQWpELEdBQTJELE1BQTFGO0FBQ0FqRCx1QkFBZWlFLE9BQWYsQ0FBdUJGLE9BQXZCLEdBQWlDLGNBQVlyRCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsNkJBQTVFO0FBQ0Q7QUFDRCxVQUFJaUIsY0FBZWhELGtCQUFrQjVGLElBQWxCLENBQXVCdUgsWUFBWUksU0FBbkMsQ0FBbkI7QUFDQSxVQUFHaUIsV0FBSCxFQUNBO0FBQ0VaLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZWlFLE9BQWYsQ0FBdUJFLFNBQXZCLEdBQW1DLGNBQVl6RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQTlFO0FBQ0Q7QUFDRCxVQUFJbUIsZ0JBQWlCakQsb0JBQW9CN0YsSUFBcEIsQ0FBeUJ1SCxZQUFZSSxTQUFyQyxDQUFyQjtBQUNBLFVBQUdtQixhQUFILEVBQ0E7QUFDRWQsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlaUUsT0FBZixDQUF1QkksT0FBdkIsR0FBaUMsY0FBWTNELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBNUU7QUFDRDtBQUNELFVBQUlxQixjQUFlbEQsa0JBQWtCOUYsSUFBbEIsQ0FBdUJ1SCxZQUFZSSxTQUFuQyxDQUFuQjtBQUNBLFVBQUdxQixXQUFILEVBQ0E7QUFDRWhCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZWlFLE9BQWYsQ0FBdUJNLFNBQXZCLEdBQW1DLGNBQVk3RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsdUNBQTlFO0FBQ0Q7QUFFRjtBQUNEO0FBQ0EsUUFBR0osWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVksOEJBQVosRUFBNEMsRUFBNUM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLDJCQUFaLEVBQXlDLEVBQXpDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxFQUFqQztBQUNBaU0sTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxTQUE5QyxFQUF5RHBELEdBQXpELEVBQThEbEosT0FBOUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCb0UsS0FBNUIsR0FBb0MsY0FBWTlELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLGtCQUEzRztBQUNEO0FBQ0QsUUFBR3lDLFlBQVlDLElBQVosS0FBcUIsbUJBQXhCLEVBQ0E7QUFDRW5NLGNBQVFVLEdBQVIsQ0FBWSw2QkFBWixFQUEyQyxFQUEzQztBQUNBVixjQUFRVSxHQUFSLENBQVksMEJBQVosRUFBd0MsRUFBeEM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLEVBQWhDO0FBQ0FpTSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLGFBQTlDLEVBQTZEcEQsR0FBN0QsRUFBa0VsSixPQUFsRTtBQUNBcUoscUJBQWV5RSxXQUFmLENBQTJCRCxLQUEzQixHQUFtQyxjQUFZOUQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLElBQTNDLEdBQWdEdkQsVUFBVStFLFdBQTFELEdBQXNFLGtCQUF6RztBQUNEO0FBQ0QsUUFBRzVCLFlBQVlDLElBQVosS0FBcUIsa0JBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCc0UsS0FBNUIsR0FBb0MsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLHVCQUEzRztBQUNEO0FBQ0QsUUFBR3lDLFlBQVlDLElBQVosS0FBcUIsbUJBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCc0UsS0FBNUIsR0FBb0MsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLHVCQUEzRztBQUNEOztBQUVELFFBQUd5QyxZQUFZQyxJQUFaLEtBQXFCLDhCQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSixxQkFBZXlFLFdBQWYsQ0FBMkJDLEtBQTNCLEdBQW1DLGNBQVloRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVK0UsV0FBMUQsR0FBc0UsdUJBQXpHO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFHNUIsWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VGLGtDQUE0QixJQUE1QjtBQUNBak0sY0FBUVUsR0FBUixDQUFZLDhCQUFaLEVBQTRDLEVBQTVDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSwyQkFBWixFQUF5QyxFQUF6QztBQUNBVixjQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsRUFBakM7QUFDQWlNLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsYUFBOUMsRUFBNkRwRCxHQUE3RCxFQUFrRWxKLE9BQWxFO0FBQ0FxSixxQkFBZU0sWUFBZixDQUE0QmtFLEtBQTVCLEdBQW9DLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVWSxZQUExRCxHQUF1RSxrQkFBM0c7QUFDRDtBQUNELFFBQUd1QyxZQUFZQyxJQUFaLEtBQXFCLHNCQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSixxQkFBZU0sWUFBZixDQUE0Qm9FLEtBQTVCLEdBQW9DLGNBQVloRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVWSxZQUExRCxHQUF1RSx1QkFBM0c7QUFDRDtBQUNEO0FBQ0EsUUFBR3VDLFlBQVlDLElBQVosS0FBcUIsU0FBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixjQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUlzTixZQUFZOUQsVUFBVXZGLElBQVYsQ0FBZXVILFlBQVlJLFNBQTNCLENBQWhCO0FBQ0EsVUFBRzBCLFNBQUgsRUFDQTtBQUNFM0UsdUJBQWVYLE9BQWYsQ0FBdUJ1RixZQUF2QixHQUFzQyxjQUFZbEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDBCQUFqRjtBQUNBdE0sZ0JBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLGVBQWFxSixRQUFiLEdBQXNCbUMsWUFBWUksU0FBbEMsR0FBNEMsTUFBdkU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRCxPQUxELE1BTUk7QUFDRnFKLHVCQUFlWCxPQUFmLENBQXVCd0YsUUFBdkIsR0FBa0MsY0FBWW5FLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywyQkFBN0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxTQUE5QyxFQUF5RHBELEdBQXpELEVBQThEbEosT0FBOUQ7QUFDRDtBQUNGO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsU0FBeEIsRUFDQTtBQUNFLFVBQUlnQyxhQUFjekQsbUJBQW1CL0YsSUFBbkIsQ0FBd0J1SCxZQUFZSSxTQUFwQyxDQUFsQjtBQUNBLFVBQUc2QixVQUFILEVBQ0E7QUFDRXhCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZVgsT0FBZixDQUF1QjBGLFdBQXZCLEdBQXFDLGNBQVlyRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsaUNBQWhGO0FBQ0Q7QUFDRCxVQUFJK0IsZ0JBQWlCM0QsbUJBQW1CL0YsSUFBbkIsQ0FBd0J1SCxZQUFZSSxTQUFwQyxDQUFyQjtBQUNBLFVBQUcrQixhQUFILEVBQ0E7QUFDSTFCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZVgsT0FBZixDQUF1QjRGLE9BQXZCLEdBQWlDLGNBQVl2RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQTVFO0FBQ0g7QUFDRjtBQUNELFFBQUdKLFlBQVlDLElBQVosS0FBcUIsWUFBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixjQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBMkkscUJBQWVLLE9BQWYsQ0FBdUI2RSxLQUF2QixHQUErQixjQUFZeEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGtDQUExRTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBd08sd0JBQWtCekUsV0FBU21DLFlBQVlJLFNBQXZDLEVBQWtELGdCQUFsRCxFQUFvRSxJQUFwRTtBQUNEO0FBQ0QsUUFBR0osWUFBWUMsSUFBWixLQUFxQixlQUF4QixFQUNBO0FBQ0U5QyxxQkFBZUssT0FBZixDQUF1QitFLE9BQXZCLEdBQWlDLGNBQVkxRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsOEJBQTVFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixnQkFBeEIsRUFDQTtBQUNFOUMscUJBQWVLLE9BQWYsQ0FBdUJnRixLQUF2QixHQUErQixjQUFZM0UsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUExRTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsZUFBeEIsRUFDQTtBQUNFOUMscUJBQWVPLE9BQWYsQ0FBdUIrRSxTQUF2QixHQUFtQyxjQUFZNUUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHdCQUE5RTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsZ0JBQXhCLEVBQ0E7QUFDRTlDLHFCQUFlTyxPQUFmLENBQXVCZ0YsUUFBdkIsR0FBa0MsY0FBWTdFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx5QkFBN0U7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLHlCQUFyQixJQUFrREQsWUFBWUMsSUFBWixLQUFxQixpQkFBMUUsRUFDQTtBQUNFLFVBQUkwQyxnQkFBZ0JqRSxjQUFjakcsSUFBZCxDQUFtQnVILFlBQVlJLFNBQS9CLENBQXBCO0FBQ0EsVUFBR3VDLGFBQUgsRUFDQTtBQUNFN08sZ0JBQVFVLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QztBQUNBVixnQkFBUVUsR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FWLGdCQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBO0FBQ0FrTCx3QkFBYyxDQUFkO0FBQ0FFLCtCQUF1QixJQUF2QjtBQUNBLFlBQUd6QyxlQUFlTyxPQUFmLENBQXVCMkUsS0FBMUIsRUFBZ0M7QUFDOUI1QixVQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBcUoseUJBQWVPLE9BQWYsQ0FBdUIyRSxLQUF2QixJQUFnQyxjQUFZeEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLFVBQTNDLEdBQXNEdUMsY0FBYyxDQUFkLENBQXRELEdBQXVFLEdBQXZFLEdBQTJFQSxjQUFjLENBQWQsQ0FBM0UsR0FBNEYsWUFBNUg7QUFDRCxTQUhELE1BSUs7QUFDSGxDLFVBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix5QkFBZU8sT0FBZixDQUF1QjJFLEtBQXZCLEdBQStCLGNBQVl4RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsVUFBM0MsR0FBc0R1QyxjQUFjLENBQWQsQ0FBdEQsR0FBdUUsR0FBdkUsR0FBMkVBLGNBQWMsQ0FBZCxDQUEzRSxHQUE0RixZQUEzSDtBQUNEO0FBQ0QsWUFBSUMsZUFBZTlPLFFBQVE2RCxHQUFSLENBQVksaUJBQVosQ0FBbkI7QUFDQWlMLHdCQUFnQiwwQ0FBd0NsRCxZQUF4QyxHQUFxRCxrREFBckQsR0FBd0dpRCxjQUFjLENBQWQsQ0FBeEcsR0FBeUgsR0FBekgsR0FBNkhBLGNBQWMsQ0FBZCxDQUE3SCxHQUE4SSxXQUE5SjtBQUNBN08sZ0JBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQm9PLFlBQS9CO0FBQ0EsWUFBSUMsUUFBUS9PLFFBQVE2RCxHQUFSLENBQVksb0JBQVosQ0FBWjtBQUNBa0wsY0FBTXpOLElBQU4sQ0FBV3lJLFdBQVNtQyxZQUFZSSxTQUFoQztBQUNBdE0sZ0JBQVFVLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ3FPLEtBQWxDO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHN0MsWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVksd0JBQVosRUFBc0MsRUFBdEM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEVBQTNCOztBQUVBLFVBQUlzTyxZQUFhbkUsaUJBQWlCbEcsSUFBakIsQ0FBc0J1SCxZQUFZSSxTQUFsQyxDQUFqQjtBQUNBLFVBQUcwQyxTQUFILEVBQ0E7QUFDRTNGLHVCQUFlUSxNQUFmLENBQXNCb0YsR0FBdEIsR0FBNEIsY0FBWWxGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxtQ0FBdkU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLHFRQUFtUXFKLFFBQW5RLEdBQTRRbUMsWUFBWUksU0FBeFIsR0FBa1MsTUFBL1Q7QUFDRDtBQUNELFVBQUlhLGdCQUFpQnJDLGlCQUFpQm5HLElBQWpCLENBQXNCdUgsWUFBWUksU0FBbEMsQ0FBckI7QUFDQSxVQUFHYSxhQUFILEVBQ0E7QUFDRTlELHVCQUFlUSxNQUFmLENBQXNCdUQsT0FBdEIsR0FBZ0MsY0FBWXJELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx3QkFBM0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4Qiw0REFBMERxSixRQUExRCxHQUFtRW1DLFlBQVlJLFNBQS9FLEdBQXlGLE1BQXZIO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLFVBQXhCLEVBQ0E7QUFDRSxVQUFJK0MsYUFBYWpFLHFCQUFxQnRHLElBQXJCLENBQTBCdUgsWUFBWUksU0FBdEMsQ0FBakI7QUFDQSxVQUFHNEMsVUFBSCxFQUNBO0FBQ0U3Rix1QkFBZVEsTUFBZixDQUFzQnNGLFFBQXRCLEdBQWlDLGNBQVlwRixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsc0NBQTVFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsZ0JBQTlDLEVBQWdFcEQsR0FBaEUsRUFBcUVsSixPQUFyRTtBQUNEO0FBQ0Y7O0FBRUQsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsY0FBeEIsRUFDQTtBQUNFLFVBQUlpRCxjQUFjbEUsbUJBQW1CdkcsSUFBbkIsQ0FBd0J1SCxZQUFZSSxTQUFwQyxDQUFsQjtBQUNBLFVBQUc4QyxXQUFILEVBQ0E7QUFDRS9GLHVCQUFlUSxNQUFmLENBQXNCd0YsS0FBdEIsR0FBOEIsY0FBWXRGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw0QkFBekU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxtQkFBOUMsRUFBbUVwRCxHQUFuRSxFQUF3RWxKLE9BQXhFO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQix1QkFBeEIsRUFDQTtBQUNFbk0sY0FBUVUsR0FBUixDQUFZLDRCQUFaLEVBQTBDLEVBQTFDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QztBQUNBVixjQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsRUFBL0I7QUFDQTJJLHFCQUFlaUcsVUFBZixDQUEwQkMsR0FBMUIsR0FBZ0MsY0FBWXhGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx5QkFBM0U7QUFDQXRNLGNBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixnRUFBOERxSixRQUE5RCxHQUF1RW1DLFlBQVlJLFNBQW5GLEdBQTZGLElBQTNIO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixvQkFBeEIsRUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBLFVBQUlxRCxXQUFXckUsb0JBQW9CeEcsSUFBcEIsQ0FBeUJ1SCxZQUFZSSxTQUFyQyxDQUFmO0FBQ0EsVUFBR2tELFFBQUgsRUFDQTtBQUNFbkcsdUJBQWVpRyxVQUFmLENBQTBCRyxXQUExQixHQUF3QyxjQUFZMUYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHFDQUFuRjtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsVUFBSTBQLFdBQVd0RSx3QkFBd0J6RyxJQUF4QixDQUE2QnVILFlBQVlJLFNBQXpDLENBQWY7QUFDQSxVQUFHb0QsUUFBSCxFQUNBO0FBQ0VyRyx1QkFBZWlHLFVBQWYsQ0FBMEJLLE1BQTFCLEdBQW1DLGNBQVk1RixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsZ0NBQTlFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxVQUFJNFAsV0FBV3ZFLHlCQUF5QjFHLElBQXpCLENBQThCdUgsWUFBWUksU0FBMUMsQ0FBZjtBQUNBLFVBQUdzRCxRQUFILEVBQ0E7QUFDRXZHLHVCQUFlaUcsVUFBZixDQUEwQk8sT0FBMUIsR0FBb0MsY0FBWTlGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBL0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUVKO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBc0IsbUJBQXpCLEVBQ0E7QUFDRTlDLHFCQUFlaUcsVUFBZixDQUEwQkQsS0FBMUIsR0FBa0MsY0FBWXRGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBN0U7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDs7QUFFRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFLFVBQUkyRCxjQUFjeEUsb0JBQW9CM0csSUFBcEIsQ0FBeUJ1SCxZQUFZSSxTQUFyQyxDQUFsQjtBQUNBLFVBQUl5RCxZQUFZeEUsa0JBQWtCNUcsSUFBbEIsQ0FBdUJ1SCxZQUFZSSxTQUFuQyxDQUFoQjtBQUNBdE0sY0FBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixjQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUdvUCxXQUFILEVBQ0E7QUFDRXpHLHVCQUFlMkcsT0FBZixDQUF1Qm5DLEtBQXZCLEdBQStCLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMkJBQTFFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsU0FBOUMsRUFBeURwRCxHQUF6RCxFQUE4RGxKLE9BQTlEO0FBRUQ7QUFDRCxVQUFHK1AsU0FBSCxFQUNBO0FBQ0UxRyx1QkFBZTJHLE9BQWYsQ0FBdUJwSSxHQUF2QixHQUE2QixjQUFZbUMsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUF4RTtBQUNBdE0sZ0JBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCcUosV0FBU21DLFlBQVlJLFNBQWhEO0FBQ0FrQywwQkFBa0J6RSxXQUFTbUMsWUFBWUksU0FBdkMsRUFBa0QsZ0JBQWxELEVBQW9FLEtBQXBFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRjtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLFNBQXhCLEVBQ0E7QUFDSW5NLGNBQVFVLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBVixjQUFRVSxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLGFBQVosRUFBMkIsRUFBM0I7QUFDQTJJLHFCQUFlNEcsTUFBZixDQUFzQnBDLEtBQXRCLEdBQThCLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQXpFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsUUFBOUMsRUFBd0RwRCxHQUF4RCxFQUE2RGxKLE9BQTdEO0FBQ0g7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFLFVBQUkrRCxnQkFBZ0IxRSxxQkFBcUI3RyxJQUFyQixDQUEwQnVILFlBQVlJLFNBQXRDLENBQXBCO0FBQ0EsVUFBSTZELGVBQWUxRSxvQkFBb0I5RyxJQUFwQixDQUF5QnVILFlBQVlJLFNBQXJDLENBQW5CO0FBQ0EsVUFBRzRELGFBQUgsRUFDQTtBQUNJN0csdUJBQWU0RyxNQUFmLENBQXNCRyxPQUF0QixHQUFnQyxjQUFZckcsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUEzRTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUVUsR0FBUixDQUFZLG9CQUFaLEVBQWtDcUosV0FBU21DLFlBQVlJLFNBQXZEO0FBQ0FrQywwQkFBa0J6RSxXQUFTbUMsWUFBWUksU0FBdkMsRUFBa0QsdUJBQWxELEVBQTJFLEtBQTNFO0FBQ0g7QUFDRCxVQUFHNkQsWUFBSCxFQUNBO0FBQ0k5Ryx1QkFBZTRHLE1BQWYsQ0FBc0JJLE1BQXRCLEdBQStCLGNBQVl0RyxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsd0JBQTFFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGdCQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUNxSixXQUFTbUMsWUFBWUksU0FBdEQ7QUFDQWtDLDBCQUFrQnpFLFdBQVNtQyxZQUFZSSxTQUF2QyxFQUFrRCxzQkFBbEQsRUFBMEUsS0FBMUU7QUFDSDtBQUNGO0FBQ0QsUUFBR0osWUFBWUMsSUFBWixLQUFxQixTQUF4QixFQUNBO0FBQ0VuTSxjQUFRVSxHQUFSLENBQVksd0JBQVosRUFBc0MsRUFBdEM7QUFDQVYsY0FBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FWLGNBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEVBQTNCO0FBQ0EySSxxQkFBZWlILE1BQWYsQ0FBc0JDLEdBQXRCLEdBQTRCLGNBQVl4RyxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsZ0JBQXZFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGNBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLGtCQUFnQnFKLFFBQWhCLEdBQXlCbUMsWUFBWUksU0FBckMsR0FBK0MsaURBQXZFO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLE1BQUcsQ0FBRVQsb0JBQUwsRUFDQTtBQUNFN0wsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLHlDQUEvQjtBQUNEO0FBQ0QsTUFBRyxDQUFFc0wsb0JBQUwsRUFDQTtBQUNFaE0sWUFBUVUsR0FBUixDQUFZLHlCQUFaLEVBQXVDLFFBQU1xSSxVQUFVUSxPQUFoQixHQUF3Qiw4QkFBL0Q7QUFDQXZKLFlBQVFVLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBVixZQUFRVSxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNEO0FBQ0QsTUFBRyxDQUFFdUwseUJBQUwsRUFDQTtBQUNFak0sWUFBUVUsR0FBUixDQUFZLDhCQUFaLEVBQTRDLFFBQU1xSSxVQUFVWSxZQUFoQixHQUE2QiwrQkFBekU7QUFDQTNKLFlBQVFVLEdBQVIsQ0FBWSwyQkFBWixFQUF5QyxFQUF6QztBQUNBVixZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsRUFBakM7QUFDRDtBQUNELE1BQUdvTCxvQkFBSCxFQUNBO0FBQ0UsUUFBSWlELFFBQVEvTyxRQUFRNkQsR0FBUixDQUFZLG9CQUFaLENBQVo7QUFDQTJLLHNCQUFrQk8sTUFBTSxDQUFOLENBQWxCLEVBQTRCLGdCQUE1QixFQUE4QyxJQUE5QztBQUNEO0FBQ0Y7O0FBRU0sU0FBU1AsaUJBQVQsQ0FBMkJnQyxHQUEzQixFQUFnQ0MsTUFBaEMsRUFBd0NyRCxPQUF4QyxFQUNQO0FBQ0UsTUFBSXNELGdCQUFnQixVQUFTQyxJQUFULEVBQWU7QUFDakMsUUFBR0EsS0FBS3JMLEVBQUwsS0FBWSxHQUFmLEVBQW1CO0FBQUMsYUFBTyxTQUFQO0FBQWtCO0FBQ3RDLFFBQUdxTCxLQUFLckwsRUFBTCxLQUFZLEdBQWYsRUFBbUI7QUFBQyxhQUFPLFNBQVA7QUFBa0I7QUFDdEMsV0FBTyxNQUFQO0FBQ0QsR0FKRDtBQUtBLE1BQUlzTCxnQkFBZ0IsVUFBU0QsSUFBVCxFQUFjO0FBQ2hDLFFBQUdBLEtBQUtFLENBQUwsSUFBVSxHQUFiLEVBQWlCO0FBQUMsYUFBTyxLQUFQO0FBQWM7QUFDaEMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEdBQWIsRUFBaUI7QUFBQyxhQUFPLE9BQVA7QUFBZ0I7QUFDbEMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEVBQWIsRUFBZ0I7QUFBQyxhQUFPLE9BQVA7QUFBZ0I7QUFDakMsUUFBR0YsS0FBS0UsQ0FBTCxJQUFVLEdBQWIsRUFBaUI7QUFBQyxhQUFPLEtBQVA7QUFBYztBQUNoQyxXQUFPLE1BQVA7QUFDRCxHQU5EO0FBT0FySSxVQUFRQyxHQUFSLENBQVksY0FBWStILEdBQXhCO0FBQ0EsTUFBSU0sVUFBVUMsRUFBRU4sTUFBRixDQUFkO0FBQ0EsTUFBSU8sU0FBUyxFQUFFQyxpQkFBaUIsU0FBbkIsRUFBYjtBQUNBLE1BQUlDLFNBQVNDLE9BQU9DLFlBQVAsQ0FBcUJOLE9BQXJCLEVBQThCRSxNQUE5QixDQUFiO0FBQ0EsTUFBSXRNLE9BQU8sb0dBQUEyTSxDQUFTYixHQUFULEVBQWMsS0FBZCxFQUFxQixFQUFyQixDQUFYO0FBQ0FVLFNBQU9JLFFBQVAsQ0FBaUI1TSxJQUFqQixFQUF1QixLQUF2QixFQWxCRixDQWtCd0Q7QUFDdEQsTUFBRzBJLE9BQUgsRUFDQTtBQUNFOEQsV0FBT0ssUUFBUCxDQUFnQixFQUFoQixFQUFvQixFQUFDbkUsU0FBUyxFQUFDb0UsV0FBV2QsYUFBWixFQUFWLEVBQXBCLEVBREYsQ0FDK0Q7QUFDOUQsR0FIRCxNQUlLO0FBQ0hRLFdBQU9LLFFBQVAsQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBQ25FLFNBQVMsRUFBQ29FLFdBQVdaLGFBQVosRUFBVixFQUFwQixFQURHLENBQzBEO0FBQzlEO0FBQ0RNLFNBQU9PLE1BQVAsR0ExQkYsQ0EwQndEO0FBQ3REUCxTQUFPUSxNQUFQLEdBM0JGLENBMkJ3RDtBQUN0RFIsU0FBT1MsSUFBUCxDQUFZLEdBQVosRUFBaUIsSUFBakI7QUFDRDs7QUFFTSxTQUFTQyxtQkFBVCxDQUE2QjVSLE9BQTdCLEVBQXNDcUosY0FBdEMsRUFDUDtBQUNFO0FBQ0EsTUFBSXdJLG1CQUFtQjdSLFFBQVE2RCxHQUFSLENBQVksZ0JBQVosQ0FBdkI7QUFDQSxNQUFHLGFBQWF3RixjQUFoQixFQUNBO0FBQ0UsUUFBR0EsZUFBZUUsT0FBZixDQUF1QnFELEtBQTFCLEVBQWdDO0FBQ2hDaUYseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUUsT0FBZixDQUF1QkQsTUFBL0MsQ0FBbkI7QUFDQXVJLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVFLE9BQWYsQ0FBdUJxRCxLQUEvQyxDQUFuQjtBQUNBaUYseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUUsT0FBZixDQUF1QnVELEdBQS9DLENBQW5CO0FBQ0ErRSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFBc0Q7QUFDdkQ7QUFDRCxNQUFHLGNBQWN6SSxjQUFqQixFQUNBO0FBQ0V3SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlbkQsUUFBZixDQUF3Qm9ELE1BQWhELENBQW5CO0FBQ0F1SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlbkQsUUFBZixDQUF3QjZHLEtBQWhELENBQW5CO0FBQ0E4RSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlbkQsUUFBZixDQUF3QjhHLElBQWhELENBQW5CO0FBQ0E2RSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsZUFBZXpJLGNBQWxCLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVHLFNBQWYsQ0FBeUJGLE1BQWpELENBQW5CO0FBQ0F1SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlRyxTQUFmLENBQXlCOUUsSUFBakQsQ0FBbkI7QUFDQW1OLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVHLFNBQWYsQ0FBeUIwRCxTQUFqRCxDQUFuQjtBQUNBMkUsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUcsU0FBZixDQUF5QjRELE9BQWpELENBQW5CO0FBQ0F5RSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsa0JBQWtCekksY0FBckIsRUFDQTtBQUNFd0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUksWUFBZixDQUE0QkgsTUFBcEQsQ0FBbkI7QUFDQXVJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVJLFlBQWYsQ0FBNEJvRSxLQUFwRCxDQUFuQjtBQUNBZ0UsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUksWUFBZixDQUE0QnNFLEtBQXBELENBQW5CO0FBQ0E4RCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsaUJBQWlCekksY0FBcEIsRUFDQTtBQUNFd0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZXlFLFdBQWYsQ0FBMkJ4RSxNQUFuRCxDQUFuQjtBQUNBdUksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZXlFLFdBQWYsQ0FBMkJELEtBQW5ELENBQW5CO0FBQ0FnRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFleUUsV0FBZixDQUEyQkMsS0FBbkQsQ0FBbkI7QUFDQThELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEO0FBQ0QsTUFBRyxrQkFBa0J6SSxjQUFyQixFQUNBO0FBQ0UsUUFBR0EsZUFBZU0sWUFBZixDQUE0QmtFLEtBQS9CLEVBQXFDO0FBQ3JDZ0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZU0sWUFBZixDQUE0QkwsTUFBcEQsQ0FBbkI7QUFDQXVJLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVNLFlBQWYsQ0FBNEJrRSxLQUFwRCxDQUFuQjtBQUNBZ0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZU0sWUFBZixDQUE0Qm9FLEtBQXBELENBQW5CO0FBQ0E4RCx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDQztBQUNGO0FBQ0QsTUFBRyxhQUFhekksY0FBaEIsRUFDQTtBQUNFd0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZWlFLE9BQWYsQ0FBdUJoRSxNQUEvQyxDQUFuQjtBQUNBLFFBQUdELGVBQWVpRSxPQUFmLENBQXVCRixPQUExQixFQUNBO0FBQ0F5RSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlaUUsT0FBZixDQUF1QkYsT0FBL0MsQ0FBbkI7QUFDQXlFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpRSxPQUFmLENBQXVCRSxTQUEvQyxDQUFuQjtBQUNBcUUseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZWlFLE9BQWYsQ0FBdUJJLE9BQS9DLENBQW5CO0FBQ0FtRSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlaUUsT0FBZixDQUF1Qk0sU0FBL0MsQ0FBbkI7QUFDQyxLQU5ELE1BUUE7QUFDRWlFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixzQ0FBeEIsQ0FBbkI7QUFDRDtBQUNERCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYXpJLGNBQWhCLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVLLE9BQWYsQ0FBdUJKLE1BQS9DLENBQW5CO0FBQ0F1SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlSyxPQUFmLENBQXVCNkUsS0FBL0MsQ0FBbkI7QUFDQXNELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVLLE9BQWYsQ0FBdUIrRSxPQUEvQyxDQUFuQjtBQUNBb0QsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZUssT0FBZixDQUF1QmdGLEtBQS9DLENBQW5CO0FBQ0FtRCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYXpJLGNBQWhCLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVPLE9BQWYsQ0FBdUJOLE1BQS9DLENBQW5CO0FBQ0F1SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlTyxPQUFmLENBQXVCMkUsS0FBL0MsQ0FBbkI7QUFDQXNELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVPLE9BQWYsQ0FBdUIrRSxTQUEvQyxDQUFuQjtBQUNBa0QsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZU8sT0FBZixDQUF1QmdGLFFBQS9DLENBQW5CO0FBQ0FpRCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsWUFBWXpJLGNBQWYsRUFDQTtBQUNFd0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZVEsTUFBZixDQUFzQlAsTUFBOUMsQ0FBbkI7QUFDQXVJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVRLE1BQWYsQ0FBc0JvRixHQUE5QyxDQUFuQjtBQUNBNEMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZVEsTUFBZixDQUFzQnVELE9BQTlDLENBQW5CO0FBQ0F5RSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlUSxNQUFmLENBQXNCc0YsUUFBOUMsQ0FBbkI7QUFDQTBDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVRLE1BQWYsQ0FBc0J3RixLQUE5QyxDQUFuQjtBQUNBd0MsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGdCQUFnQnpJLGNBQW5CLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpRyxVQUFmLENBQTBCaEcsTUFBbEQsQ0FBbkI7QUFDQXVJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpRyxVQUFmLENBQTBCRCxLQUFsRCxDQUFuQjtBQUNBd0MsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZWlHLFVBQWYsQ0FBMEJDLEdBQWxELENBQW5CO0FBQ0FzQyx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlaUcsVUFBZixDQUEwQkssTUFBbEQsQ0FBbkI7QUFDQWtDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpRyxVQUFmLENBQTBCRyxXQUFsRCxDQUFuQjtBQUNBb0MsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCekksZUFBZWlHLFVBQWYsQ0FBMEJPLE9BQWxELENBQW5CO0FBQ0FnQyx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsYUFBYXpJLGNBQWhCLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWUyRyxPQUFmLENBQXVCMUcsTUFBL0MsQ0FBbkI7QUFDQXVJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWUyRyxPQUFmLENBQXVCbkMsS0FBL0MsQ0FBbkI7QUFDQWdFLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWUyRyxPQUFmLENBQXVCcEksR0FBL0MsQ0FBbkI7QUFDQWlLLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEO0FBQ0QsTUFBRyxZQUFZekksY0FBZixFQUNBO0FBQ0V3SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlNEcsTUFBZixDQUFzQjNHLE1BQTlDLENBQW5CO0FBQ0F1SSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlNEcsTUFBZixDQUFzQnBDLEtBQTlDLENBQW5CO0FBQ0FnRSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J6SSxlQUFlNEcsTUFBZixDQUFzQkcsT0FBOUMsQ0FBbkI7QUFDQXlCLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWU0RyxNQUFmLENBQXNCSSxNQUE5QyxDQUFuQjtBQUNBd0IsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLFlBQVl6SSxjQUFmLEVBQ0E7QUFDRXdJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpSCxNQUFmLENBQXNCaEgsTUFBOUMsQ0FBbkI7QUFDQWQsWUFBUUMsR0FBUixDQUFZWSxlQUFlaUgsTUFBZixDQUFzQkMsR0FBbEM7QUFDQXNCLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnpJLGVBQWVpSCxNQUFmLENBQXNCQyxHQUE5QyxDQUFuQjtBQUNBc0IsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRDlSLFVBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4Qm1SLGdCQUE5QjtBQUNEOztBQUdNLFNBQVNFLG1CQUFULEdBQ1A7QUFDRSxNQUFJQyxlQUFlLEVBQW5CO0FBQ0EsTUFBRztBQUNEQSxpQkFBYUMsdUJBQWIsR0FBdUNDLFNBQVNDLGNBQVQsQ0FBd0Isd0JBQXhCLEVBQWtENUosS0FBekY7QUFDRCxHQUZELENBR0EsT0FBTTZKLEdBQU4sRUFBVztBQUNUSixpQkFBYUMsdUJBQWIsR0FBdUMsTUFBdkM7QUFDRDtBQUNELE1BQUc7QUFDREQsaUJBQWFLLDJCQUFiLEdBQTJDSCxTQUFTQyxjQUFULENBQXdCLDZCQUF4QixFQUF1RDVKLEtBQWxHO0FBQ0QsR0FGRCxDQUdBLE9BQU02SixHQUFOLEVBQVc7QUFDVEosaUJBQWFLLDJCQUFiLEdBQTJDLENBQTNDO0FBQ0Q7O0FBRUQsTUFBRztBQUNETCxpQkFBYU0sb0JBQWIsR0FBb0NKLFNBQVNDLGNBQVQsQ0FBd0Isc0JBQXhCLEVBQWdENUosS0FBcEY7QUFDRCxHQUZELENBR0EsT0FBTTZKLEdBQU4sRUFBVztBQUNUSixpQkFBYU0sb0JBQWIsR0FBb0MsRUFBcEM7QUFDRDtBQUNELE1BQUc7QUFDRE4saUJBQWFPLG9CQUFiLEdBQW9DTCxTQUFTQyxjQUFULENBQXdCLHNCQUF4QixFQUFnRDVKLEtBQXBGO0FBQ0QsR0FGRCxDQUdBLE9BQU02SixHQUFOLEVBQVc7QUFDVEosaUJBQWFPLG9CQUFiLEdBQW9DLEVBQXBDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RQLGlCQUFhUSxXQUFiLEdBQTJCTixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0QzVKLEtBQXZFO0FBQ0QsR0FGRCxDQUdBLE9BQU02SixHQUFOLEVBQVc7QUFDVEosaUJBQWFRLFdBQWIsR0FBMkIsT0FBM0I7QUFDRDs7QUFFRCxNQUFHO0FBQ0RSLGlCQUFhUyx5QkFBYixHQUF5Q1AsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEM1SixLQUFyRjtBQUNBeUosaUJBQWFVLG1CQUFiLEdBQW1DUixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0QzVKLEtBQS9FO0FBQ0F5SixpQkFBYVcsa0JBQWIsR0FBa0NULFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDNUosS0FBOUU7QUFDQXlKLGlCQUFhWSxxQkFBYixHQUFxQ1YsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEM1SixLQUFqRjtBQUNELEdBTEQsQ0FNQSxPQUFNNkosR0FBTixFQUFXO0FBQ1RKLGlCQUFhUyx5QkFBYixHQUF5QyxHQUF6QztBQUNBVCxpQkFBYVUsbUJBQWIsR0FBbUMsR0FBbkM7QUFDQVYsaUJBQWFXLGtCQUFiLEdBQWtDLEdBQWxDO0FBQ0FYLGlCQUFhWSxxQkFBYixHQUFxQyxHQUFyQztBQUNEO0FBQ0QsTUFBRztBQUNEWixpQkFBYWEsa0JBQWIsR0FBa0NYLFNBQVNDLGNBQVQsQ0FBd0Isb0JBQXhCLEVBQThDNUosS0FBaEY7QUFDQXlKLGlCQUFhYyxxQkFBYixHQUFxQ1osU0FBU0MsY0FBVCxDQUF3QixvQkFBeEIsRUFBOEM1SixLQUFuRjtBQUNELEdBSEQsQ0FJQSxPQUFNNkosR0FBTixFQUFXO0FBQ1RKLGlCQUFhYSxrQkFBYixHQUFrQyxJQUFsQztBQUNBYixpQkFBYWMscUJBQWIsR0FBcUMsSUFBckM7QUFDRDtBQUNELE1BQUc7QUFDRGQsaUJBQWFlLG1CQUFiLEdBQW1DYixTQUFTQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDNUosS0FBMUU7QUFDRCxHQUZELENBR0EsT0FBTTZKLEdBQU4sRUFBVztBQUNUSixpQkFBYWUsbUJBQWIsR0FBbUMsR0FBbkM7QUFDRDs7QUFFRCxNQUFHO0FBQ0RmLGlCQUFhZ0IseUJBQWIsR0FBeUNkLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDNUosS0FBNUMsR0FBa0QySixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0QzVKLEtBQXZJO0FBQ0QsR0FGRCxDQUdBLE9BQU02SixHQUFOLEVBQVc7QUFDVEosaUJBQWFnQix5QkFBYixHQUF5QyxJQUF6QztBQUNEO0FBQ0QsTUFBRztBQUNEaEIsaUJBQWFpQixtQkFBYixHQUFtQ2YsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEM1SixLQUEvRTtBQUNBeUosaUJBQWFrQiwyQkFBYixHQUE0Q2hCLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDNUosS0FBeEY7QUFDRCxHQUhELENBSUEsT0FBTTZKLEdBQU4sRUFBVztBQUNUSixpQkFBYWlCLG1CQUFiLEdBQW1DLEdBQW5DO0FBQ0FqQixpQkFBYWtCLDJCQUFiLEdBQTJDLEdBQTNDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RsQixpQkFBYW1CLG9CQUFiLEdBQW9DakIsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEM1SixLQUFoRjtBQUNBeUosaUJBQWFvQiw0QkFBYixHQUE0Q2xCLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDNUosS0FBeEY7QUFDRCxHQUhELENBSUEsT0FBTTZKLEdBQU4sRUFBVztBQUNUSixpQkFBYWlCLG1CQUFiLEdBQW1DLEdBQW5DO0FBQ0FqQixpQkFBYWtCLDJCQUFiLEdBQTJDLEdBQTNDO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFPbEIsWUFBUDtBQUNELEM7Ozs7Ozs7Ozs7Ozs7QUMzMEJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTyxTQUFTcUIsWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkIvTCxJQUEzQixFQUFpQ2dNLFNBQWpDLEVBQ1A7QUFDRS9LLFVBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxVQUFRQyxHQUFSLENBQVk2SyxHQUFaO0FBQ0E5SyxVQUFRQyxHQUFSLENBQVlsQixJQUFaO0FBQ0EsTUFBSWlNLFdBQVcsSUFBZjtBQUNBekMsSUFBRTBDLElBQUYsQ0FBTztBQUNMbE0sVUFBTUEsSUFERDtBQUVMN0MsVUFBTTZPLFNBRkQ7QUFHTEcsV0FBTyxLQUhGO0FBSUxDLGlCQUFhLEtBSlI7QUFLTEMsaUJBQWEsS0FMUjtBQU1MQyxXQUFTLEtBTko7QUFPTEMsY0FBVSxNQVBMO0FBUUw7QUFDQVIsU0FBS0EsR0FUQTtBQVVMUyxhQUFVLFVBQVVyUCxJQUFWLEVBQ1Y7QUFDRSxVQUFHQSxTQUFTLElBQVosRUFBaUI7QUFBQ3NCLGNBQU0scUJBQU47QUFBOEI7QUFDaER3TixpQkFBUzlPLElBQVQ7QUFDQTtBQUNELEtBZkk7QUFnQkxzUCxXQUFPLFVBQVVBLEtBQVYsRUFBaUI7QUFBQ2hPLFlBQU0sb0JBQWtCc04sR0FBbEIsR0FBc0IsV0FBdEIsR0FBa0NVLE1BQU1DLFlBQXhDLEdBQXFELDZHQUEzRCxFQUEySyxPQUFPLElBQVA7QUFDck0sS0FqQk0sRUFBUCxFQWlCSUMsWUFqQko7QUFrQkEsU0FBT1YsUUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDTyxTQUFTVyxRQUFULENBQWtCblUsT0FBbEIsRUFBMkJnSixRQUEzQixFQUFxQ3RDLEdBQXJDLEVBQTBDeUYsSUFBMUMsRUFBZ0RpSSxLQUFoRCxFQUF1REMsVUFBdkQsRUFBbUVDLFNBQW5FLEVBQThFdkwsU0FBOUUsRUFBeUZpSixZQUF6RixFQUNQO0FBQ0U7QUFDQXhKLFVBQVFDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBRCxVQUFRQyxHQUFSLENBQVlPLFFBQVo7QUFDQSxNQUFJL0ksT0FBTyxJQUFYO0FBQ0EsTUFDQTtBQUNFQSxXQUFPLElBQUlzVSxJQUFKLENBQVMsQ0FBQzdOLEdBQUQsQ0FBVCxDQUFQO0FBQ0QsR0FIRCxDQUdFLE9BQU84TixDQUFQLEVBQ0Y7QUFDRXhPLFVBQU13TyxDQUFOO0FBQ0Q7QUFDRCxNQUFJQyxLQUFLLElBQUlDLFFBQUosRUFBVDtBQUNBRCxLQUFHRSxNQUFILENBQVUsWUFBVixFQUF3QjFVLElBQXhCLEVBQThCLFdBQTlCO0FBQ0F3VSxLQUFHRSxNQUFILENBQVUsS0FBVixFQUFnQjNMLFFBQWhCO0FBQ0F5TCxLQUFHRSxNQUFILENBQVUsaUJBQVYsRUFBNEJ4SSxJQUE1QjtBQUNBc0ksS0FBR0UsTUFBSCxDQUFVLE9BQVYsRUFBbUJQLEtBQW5CO0FBQ0FLLEtBQUdFLE1BQUgsQ0FBVSx5QkFBVixFQUFxQzNDLGFBQWFDLHVCQUFsRDtBQUNBd0MsS0FBR0UsTUFBSCxDQUFVLDZCQUFWLEVBQXlDM0MsYUFBYUssMkJBQXREO0FBQ0FvQyxLQUFHRSxNQUFILENBQVUsMkJBQVYsRUFBdUMzQyxhQUFhUyx5QkFBcEQ7QUFDQWdDLEtBQUdFLE1BQUgsQ0FBVSxxQkFBVixFQUFpQzNDLGFBQWFVLG1CQUE5QztBQUNBK0IsS0FBR0UsTUFBSCxDQUFVLG9CQUFWLEVBQWdDM0MsYUFBYWEsa0JBQTdDO0FBQ0E0QixLQUFHRSxNQUFILENBQVUsb0JBQVYsRUFBZ0MzQyxhQUFhVyxrQkFBN0M7QUFDQThCLEtBQUdFLE1BQUgsQ0FBVSx1QkFBVixFQUFtQzNDLGFBQWFZLHFCQUFoRDtBQUNBNkIsS0FBR0UsTUFBSCxDQUFVLHVCQUFWLEVBQW1DM0MsYUFBYWMscUJBQWhEO0FBQ0EyQixLQUFHRSxNQUFILENBQVUscUJBQVYsRUFBaUMzQyxhQUFhZSxtQkFBOUM7QUFDQTBCLEtBQUdFLE1BQUgsQ0FBVSwyQkFBVixFQUF1QzNDLGFBQWFnQix5QkFBcEQ7QUFDQXlCLEtBQUdFLE1BQUgsQ0FBVSxxQkFBVixFQUFpQzNDLGFBQWFpQixtQkFBOUM7QUFDQXdCLEtBQUdFLE1BQUgsQ0FBVSxzQkFBVixFQUFrQzNDLGFBQWFtQixvQkFBL0M7QUFDQXNCLEtBQUdFLE1BQUgsQ0FBVSw2QkFBVixFQUF5QzNDLGFBQWFrQiwyQkFBdEQ7QUFDQXVCLEtBQUdFLE1BQUgsQ0FBVSw4QkFBVixFQUEwQzNDLGFBQWFvQiw0QkFBdkQ7QUFDQSxNQUFJd0IsZ0JBQWdCdkIsYUFBYWdCLFVBQWIsRUFBeUIsTUFBekIsRUFBaUNJLEVBQWpDLENBQXBCO0FBQ0EsTUFBR0csa0JBQWtCLElBQXJCLEVBQ0E7QUFDRSxRQUFJQyxRQUFReEIsYUFBYWlCLFNBQWIsRUFBdUIsS0FBdkIsRUFBNkIsRUFBN0IsQ0FBWjtBQUNBO0FBQ0EsUUFBR3RMLFlBQVk2TCxLQUFmLEVBQ0E7QUFDRTdVLGNBQVFVLEdBQVIsQ0FBWXNJLFdBQVMsT0FBckIsRUFBOEJELFVBQVVDLFFBQVYsSUFBb0IsdUJBQXBCLEdBQTRDNkwsTUFBTTdMLFFBQU4sQ0FBNUMsR0FBNEQsVUFBMUY7QUFDRCxLQUhELE1BS0E7QUFDRWhKLGNBQVFVLEdBQVIsQ0FBWXNJLFdBQVMsT0FBckIsRUFBOEIseUNBQXVDRCxVQUFVQyxRQUFWLENBQXZDLEdBQTJELFFBQXpGO0FBQ0Q7QUFDRCxTQUFJLElBQUk4TCxDQUFSLElBQWFGLGFBQWIsRUFDQTtBQUNFLFVBQUdFLEtBQUssTUFBUixFQUNBO0FBQ0U5VSxnQkFBUVUsR0FBUixDQUFZLFlBQVosRUFBMEJrVSxjQUFjRSxDQUFkLENBQTFCO0FBQ0EsWUFBRyxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFFBQXRCLEVBQWdDLFVBQWhDLEVBQTRDbFEsUUFBNUMsQ0FBcURvRSxRQUFyRCxDQUFILEVBQ0E7QUFDRWhKLGtCQUFRK1UsSUFBUixDQUFhLGNBQWIsRUFBNkIsS0FBN0I7QUFDRCxTQUhELE1BS0E7QUFDRS9VLGtCQUFRK1UsSUFBUixDQUFhLGNBQWIsRUFBNkIsSUFBN0I7QUFDRDtBQUNGO0FBQ0Y7QUFDRixHQTNCRCxNQTZCQTtBQUNFLFdBQU8sSUFBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNPLFNBQVNDLGlCQUFULENBQTJCQyxJQUEzQixFQUFpQ1osVUFBakMsRUFBNkN0SyxRQUE3QyxFQUF1RC9KLE9BQXZELEVBQ1A7QUFDSXdJLFVBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNBLE1BQUk2SyxNQUFNZSxhQUFXclUsUUFBUTZELEdBQVIsQ0FBWSxZQUFaLENBQXJCO0FBQ0E7QUFDQSxNQUFJcVIsc0JBQXNCN0IsYUFBYUMsR0FBYixFQUFrQixLQUFsQixFQUF5QixFQUF6QixDQUExQjtBQUNBLE1BQUcsQ0FBRTRCLG1CQUFMLEVBQXlCO0FBQUNsUCxVQUFNLG9CQUFOO0FBQTZCO0FBQ3ZELE1BQUlVLE1BQU0ySyxTQUFTdEgsV0FBU21MLG9CQUFvQkMsV0FBcEIsQ0FBZ0MsQ0FBaEMsRUFBbUNDLFVBQXJELEVBQWlFLEtBQWpFLEVBQXdFLEVBQXhFLENBQVY7QUFDQSxNQUFJQyxPQUFPLEVBQVg7QUFDQUgsc0JBQW9CQyxXQUFwQixDQUFnQzlVLE9BQWhDLENBQXdDLFVBQVNpVixVQUFULEVBQW9CO0FBQzFERCxZQUFRQyxXQUFXdE0sUUFBWCxHQUFvQixHQUE1QjtBQUNELEdBRkQ7QUFHQXFNLFNBQU9BLEtBQUtFLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQVA7QUFDQSxTQUFPLEVBQUMsT0FBTzdPLEdBQVIsRUFBYSxTQUFTd08sb0JBQW9CQyxXQUFwQixDQUFnQyxDQUFoQyxFQUFtQ2YsS0FBekQsRUFBZ0UsUUFBUWMsb0JBQW9CQyxXQUFwQixDQUFnQyxDQUFoQyxFQUFtQ0ssZUFBM0csRUFBNEgsUUFBUUgsSUFBcEksRUFBUDtBQUNIOztBQUdEO0FBQ08sU0FBU2hFLFFBQVQsQ0FBa0JpQyxHQUFsQixFQUF1Qi9MLElBQXZCLEVBQTZCZ00sU0FBN0IsRUFDUDs7QUFFQyxNQUFJQyxXQUFXLElBQWY7QUFDQ3pDLElBQUUwQyxJQUFGLENBQU87QUFDTGxNLFVBQU1BLElBREQ7QUFFTDdDLFVBQU02TyxTQUZEO0FBR0xHLFdBQU8sS0FIRjtBQUlMQyxpQkFBYSxLQUpSO0FBS0xDLGlCQUFhLEtBTFI7QUFNTEMsV0FBUyxLQU5KO0FBT0w7QUFDQTtBQUNBUCxTQUFLQSxHQVRBO0FBVUxTLGFBQVUsVUFBVXJQLElBQVYsRUFDVjtBQUNFLFVBQUdBLFNBQVMsSUFBWixFQUFpQjtBQUFDc0IsY0FBTSxtQ0FBTjtBQUE0QztBQUM5RHdOLGlCQUFTOU8sSUFBVDtBQUNBO0FBQ0QsS0FmSTtBQWdCTHNQLFdBQU8sVUFBVUEsS0FBVixFQUFpQjtBQUFDaE8sWUFBTSxvSEFBTjtBQUE2SDtBQWhCakosR0FBUDtBQWtCQSxTQUFPd04sUUFBUDtBQUNEOztBQUdEO0FBQ0E7QUFDTyxTQUFTN0csWUFBVCxDQUFzQjhJLFFBQXRCLEVBQWdDbEosSUFBaEMsRUFBc0NtSixHQUF0QyxFQUEyQ3hNLEdBQTNDLEVBQWdEbEosT0FBaEQsRUFDUDtBQUNFLE1BQUlzVCxNQUFNbUMsV0FBV2xKLElBQXJCO0FBQ0EsTUFBSW9KLFlBQVlwSixLQUFLbk0sS0FBTCxDQUFXLEdBQVgsQ0FBaEI7QUFDQTtBQUNBO0FBQ0FvSSxVQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxNQUFJK0ssV0FBVyxJQUFmO0FBQ0F6QyxJQUFFMEMsSUFBRixDQUFPO0FBQ0xsTSxVQUFNLEtBREQ7QUFFTHNNLFdBQVMsSUFGSjtBQUdMUCxTQUFLQSxHQUhBO0FBSUxTLGFBQVUsVUFBVTlULElBQVYsRUFDVjtBQUNFaUosVUFBSTBNLE1BQUosQ0FBV0QsVUFBVSxDQUFWLENBQVgsRUFBeUIxVixJQUF6QixDQUE4QjBWLFVBQVUsQ0FBVixDQUE5QixFQUE0QzFWLElBQTVDO0FBQ0EsVUFBR3lWLFFBQVEsT0FBWCxFQUNBO0FBQ0UxVixnQkFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkJULElBQTdCO0FBQ0FzRixjQUFNZ0UsT0FBTixDQUFjdEosSUFBZCxFQUFvQixjQUFwQixFQUFvQyxFQUFDd0YsUUFBUSxxQkFBVCxFQUFnQ0MsZUFBZSxDQUEvQyxFQUFwQztBQUNEO0FBQ0QsVUFBR2dRLFFBQVEsS0FBWCxFQUNBO0FBQ0V6USxRQUFBLG1HQUFBQSxDQUFVakYsT0FBVixFQUFtQkMsSUFBbkI7QUFDRDtBQUNELFVBQUd5VixRQUFRLE9BQVgsRUFDQTtBQUNFelAsUUFBQSxxR0FBQUEsQ0FBWWpHLE9BQVosRUFBcUJDLElBQXJCO0FBQ0E7QUFDRDtBQUNELFVBQUd5VixRQUFRLE1BQVgsRUFDQTtBQUNFdlAsUUFBQSxvR0FBQUEsQ0FBV25HLE9BQVgsRUFBb0JDLElBQXBCO0FBQ0Q7QUFDRCxVQUFHeVYsUUFBUSxZQUFYLEVBQ0E7QUFDRWpQLFFBQUEsMEdBQUFBLENBQWlCekcsT0FBakIsRUFBMEJDLElBQTFCO0FBQ0Q7QUFDRCxVQUFHeVYsUUFBUSxTQUFYLEVBQ0E7QUFDRXBPLFFBQUEsdUdBQUFBLENBQWN0SCxPQUFkLEVBQXVCQyxJQUF2QixFQUE2QixNQUE3QjtBQUNEO0FBQ0QsVUFBR3lWLFFBQVEsYUFBWCxFQUNBO0FBQ0VwTyxRQUFBLHVHQUFBQSxDQUFjdEgsT0FBZCxFQUF1QkMsSUFBdkIsRUFBNkIsS0FBN0I7QUFDRDtBQUNELFVBQUd5VixRQUFRLGFBQVgsRUFDQTtBQUNFcE8sUUFBQSx1R0FBQUEsQ0FBY3RILE9BQWQsRUFBdUJDLElBQXZCLEVBQTZCLE1BQTdCO0FBQ0Q7QUFDRCxVQUFHeVYsUUFBUSxTQUFYLEVBQ0E7QUFDRTFOLFFBQUEsdUdBQUFBLENBQWNoSSxPQUFkLEVBQXVCQyxJQUF2QjtBQUNEO0FBQ0QsVUFBR3lWLFFBQVEsZ0JBQVgsRUFDQTtBQUNFbFMsUUFBQSx1R0FBQUEsQ0FBY3hELE9BQWQsRUFBdUJDLElBQXZCO0FBQ0Q7QUFDRCxVQUFHeVYsUUFBUSxtQkFBWCxFQUNBO0FBQ0UxVSxRQUFBLHVHQUFBQSxDQUFjaEIsT0FBZCxFQUF1QkMsSUFBdkI7QUFDRDtBQUNELFVBQUd5VixRQUFRLFNBQVgsRUFDQTtBQUNFL1UsUUFBQSx1R0FBQUEsQ0FBY1gsT0FBZCxFQUF1QkMsSUFBdkI7QUFDRDtBQUNELFVBQUd5VixRQUFRLFFBQVgsRUFDQTtBQUNFM1YsUUFBQSxzR0FBQUEsQ0FBYUMsT0FBYixFQUFzQkMsSUFBdEI7QUFDRDtBQUVGLEtBOURJO0FBK0RMK1QsV0FBTyxVQUFVQSxLQUFWLEVBQWlCO0FBQUNoTyxZQUFNNlAsS0FBS0MsU0FBTCxDQUFlOUIsS0FBZixDQUFOO0FBQThCO0FBL0RsRCxHQUFQO0FBaUVELEM7Ozs7Ozs7OztBQ3ZPRDtBQUFBO0FBQ08sU0FBUytCLFNBQVQsQ0FBbUJ4TixLQUFuQixFQUEwQnlOLEtBQTFCLEVBQWlDO0FBQ3RDLE1BQUdBLE1BQU0xTixPQUFOLENBQWNDLEtBQWQsSUFBdUIsQ0FBQyxDQUEzQixFQUNBO0FBQ0UsV0FBTyxJQUFQO0FBQ0QsR0FIRCxNQUlLO0FBQ0gsV0FBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBO0FBQ08sU0FBUzBOLDJCQUFULENBQXFDalcsT0FBckMsRUFBNkM7O0FBRWxELE1BQUkwRyxNQUFNMUcsUUFBUTZELEdBQVIsQ0FBWSxVQUFaLENBQVY7QUFDQSxNQUFJcVMsV0FBV3hQLElBQUl0RyxLQUFKLENBQVUsRUFBVixDQUFmO0FBQ0EsTUFBSThFLGNBQWMsRUFBbEI7QUFDQWdSLFdBQVM3VixPQUFULENBQWlCLFVBQVM4VixHQUFULEVBQWE7QUFDNUJqUixnQkFBWTVELElBQVosQ0FBaUIsRUFBQyxPQUFPNlUsR0FBUixFQUFqQjtBQUNELEdBRkQ7QUFHQW5XLFVBQVFVLEdBQVIsQ0FBWSxhQUFaLEVBQTJCd0UsV0FBM0I7QUFDQUssUUFBTUMsY0FBTixDQUFxQnhGLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFyQixFQUFpRCxFQUFDNEIsUUFBUSxtQkFBVCxFQUE4QkMsZUFBZSxDQUE3QyxFQUFnREMsT0FBTyxLQUF2RCxFQUE4REMsaUJBQWlCLEdBQS9FLEVBQW9GQyxPQUFPLEdBQTNGLEVBQWdHQyxRQUFRLEdBQXhHLEVBQTZHQyxrQkFBa0IsR0FBL0gsRUFBakQ7QUFDRDs7QUFFRDtBQUNPLFNBQVNxUSxVQUFULEdBQXNCO0FBQ3pCLE1BQUlDLE9BQU8sRUFBWDtBQUNBO0FBQ0EsTUFBSUMsUUFBUUMsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJyTyxPQUFyQixDQUE2Qix5QkFBN0IsRUFDWixVQUFTc08sQ0FBVCxFQUFXQyxHQUFYLEVBQWVwTyxLQUFmLEVBQXNCO0FBQ3BCOE4sU0FBS00sR0FBTCxJQUFZcE8sS0FBWjtBQUNELEdBSFcsQ0FBWjtBQUlBLFNBQU84TixJQUFQO0FBQ0Q7O0FBRUg7QUFDQyxXQUFVbkUsUUFBVixFQUFvQjBFLGVBQXBCLEVBQXFDO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBQ0EsTUFBSUMsWUFBWSxhQUFoQjtBQUNBLE1BQUlDLFFBQVEsc0JBQXNCRCxTQUF0QixHQUFrQyxtQkFBbEMsR0FBd0RBLFNBQXhELEdBQW9FLFdBQXBFLEdBQWtGQSxTQUFsRixHQUE4RixlQUE5RixHQUFnSEEsU0FBaEgsR0FBNEgsV0FBNUgsR0FBMElBLFNBQXRKOztBQUVBTixTQUFPUSxXQUFQLEdBQXFCLFVBQVVqRyxPQUFWLEVBQW1COztBQUVwQyxRQUFJa0csU0FBSjs7QUFFQSxRQUFJLENBQUNsRyxPQUFMLEVBQWM7QUFDVjtBQUNBQSxnQkFBVWtHLFlBQVk5RSxTQUFTK0UsYUFBVCxDQUF1QixNQUF2QixDQUF0QjtBQUNBRCxnQkFBVUYsS0FBVixDQUFnQkksT0FBaEIsR0FBMEIsa0JBQWtCTCxTQUE1QztBQUNBRCxzQkFBZ0JPLFlBQWhCLENBQTZCSCxTQUE3QixFQUF3QzlFLFNBQVNrRixJQUFqRDtBQUNIOztBQUVEO0FBQ0EsUUFBSUMsY0FBY25GLFNBQVMrRSxhQUFULENBQXVCLEdBQXZCLENBQWxCO0FBQ0FJLGdCQUFZUCxLQUFaLENBQWtCSSxPQUFsQixHQUE0QkosS0FBNUI7QUFDQWhHLFlBQVF3RyxXQUFSLENBQW9CRCxXQUFwQjs7QUFFQTtBQUNBLFFBQUk5TyxRQUFROE8sWUFBWUUsV0FBeEI7O0FBRUEsUUFBSVAsU0FBSixFQUFlO0FBQ1g7QUFDQUosc0JBQWdCWSxXQUFoQixDQUE0QlIsU0FBNUI7QUFDSCxLQUhELE1BSUs7QUFDRDtBQUNBbEcsY0FBUTBHLFdBQVIsQ0FBb0JILFdBQXBCO0FBQ0g7O0FBRUQ7QUFDQSxXQUFPOU8sS0FBUDtBQUNILEdBOUJEO0FBK0JILENBdkNBLEVBdUNDMkosUUF2Q0QsRUF1Q1dBLFNBQVMwRSxlQXZDcEIsQ0FBRCxDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUlhLFlBQVksSUFBSUMsU0FBSixDQUFjLGFBQWQsQ0FBaEI7QUFDQSxJQUFJeE8sTUFBTSxJQUFJQyxLQUFKLEVBQVY7O0FBRUFzTyxVQUFVRSxFQUFWLENBQWEsU0FBYixFQUF3QixVQUFTbkQsQ0FBVCxFQUFZO0FBQ2hDaE0sVUFBUUMsR0FBUixDQUFZK0wsQ0FBWjtBQUNILENBRkQ7QUFHQWlELFVBQVVFLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFVBQVNuRCxDQUFULEVBQVk7QUFDOUJoTSxVQUFRQyxHQUFSLENBQVkrTCxDQUFaO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBLElBQUlvRCxnQkFBZ0IsSUFBcEI7QUFDQSxJQUFJdkQsYUFBYSxJQUFqQjtBQUNBLElBQUlDLFlBQVksSUFBaEI7QUFDQSxJQUFJdUQsWUFBWSxpRUFBaEI7QUFDQSxJQUFJQyxXQUFXLDRCQUFmO0FBQ0EsSUFBSUMsV0FBVyxlQUFmO0FBQ0EsSUFBSWhPLFdBQVcsRUFBZjtBQUNBLElBQUlsQixjQUFjLGlFQUErRGdQLFNBQS9ELEdBQXlFLGFBQTNGO0FBQ0EsSUFBSS9PLFdBQVcsQ0FBQyxTQUFELEVBQVksY0FBWixFQUE0QixZQUE1QixFQUEwQyxVQUExQyxFQUFzRCxTQUF0RCxFQUNDLFdBREQsRUFDYyxhQURkLEVBQzZCLFNBRDdCLEVBQ3dDLGNBRHhDLEVBQ3dELFNBRHhELEVBRUMsU0FGRCxFQUVZLFFBRlosRUFFc0IsU0FGdEIsRUFFaUMsUUFGakMsRUFFMkMsVUFGM0MsRUFFdUQsUUFGdkQsQ0FBZjtBQUdBLElBQUlrUCxlQUFlLENBQUMsU0FBRCxFQUFZLGNBQVosRUFBNEIsWUFBNUIsRUFBMEMsVUFBMUMsRUFBc0QsU0FBdEQsRUFDQyxXQURELEVBQ2MsYUFEZCxFQUM2QixTQUQ3QixFQUN3QyxjQUR4QyxFQUN3RCxTQUR4RCxFQUVDLFNBRkQsRUFFWSxRQUZaLENBQW5CO0FBR0EsSUFBSUMsa0JBQWtCLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsVUFBdEIsRUFBa0MsUUFBbEMsQ0FBdEI7QUFDQSxJQUFJbFAsWUFBWTtBQUNkLGFBQVcsY0FERztBQUVkLGNBQVksWUFGRTtBQUdkLGVBQWEsWUFIQztBQUlkLGtCQUFnQixjQUpGO0FBS2QsYUFBVyxTQUxHO0FBTWQsaUJBQWUsYUFORDtBQU9kLGFBQVcsU0FQRztBQVFkLGtCQUFnQixjQVJGO0FBU2QsYUFBVyxlQVRHO0FBVWQsYUFBVyxjQVZHO0FBV2QsWUFBVSxVQVhJO0FBWWQsZ0JBQWMsWUFaQTtBQWFkLGFBQVcsU0FiRztBQWNkLFlBQVUsUUFkSTtBQWVkLGNBQVksVUFmRTtBQWdCZCxZQUFVO0FBaEJJLENBQWhCOztBQW1CQSxJQUFHeU4sU0FBUzBCLFFBQVQsS0FBc0IsV0FBdEIsSUFBcUMxQixTQUFTMEIsUUFBVCxLQUFzQixXQUE5RCxFQUNBO0FBQ0VOLGtCQUFnQixzREFBaEI7QUFDQXZELGVBQWEsdURBQWI7QUFDQUMsY0FBWSxxREFBWjtBQUNBeUQsYUFBVyxZQUFYO0FBQ0FELGFBQVcsdUJBQVg7QUFDQUQsY0FBWSw0QkFBWjtBQUNBOU4sYUFBVytOLFFBQVg7QUFDRCxDQVRELE1BVUssSUFBR3RCLFNBQVMwQixRQUFULEtBQXNCLDJCQUF0QixJQUFxRDFCLFNBQVMwQixRQUFULEtBQXVCLHFCQUE1RSxJQUFxRzFCLFNBQVNDLElBQVQsS0FBbUIsMENBQTNILEVBQXVLO0FBQzFLbUIsa0JBQWdCRSxXQUFTQyxRQUFULEdBQWtCLGlCQUFsQztBQUNBMUQsZUFBYXlELFdBQVNDLFFBQVQsR0FBa0Isa0JBQS9CO0FBQ0F6RCxjQUFZd0QsV0FBU0MsUUFBVCxHQUFrQixnQkFBOUI7QUFDQWhPLGFBQVcrTixXQUFTQyxRQUFULEdBQWtCLE1BQTdCO0FBQ0E7QUFDRCxDQU5JLE1BT0E7QUFDSC9SLFFBQU0sdUNBQU47QUFDQTRSLGtCQUFnQixFQUFoQjtBQUNBdkQsZUFBYSxFQUFiO0FBQ0FDLGNBQVksRUFBWjtBQUNEOztBQUVELElBQUk2RCxzQkFBc0I7QUFDdEJDLHlCQUF1QixDQUREO0FBRXRCQywwQkFBd0IsQ0FGRjtBQUd0QkMsbUJBQWlCLENBSEs7QUFJdEJDLHdCQUFzQixDQUpBO0FBS3RCQyx5QkFBdUIsQ0FMRDtBQU10QkMsNkJBQTJCLENBTkw7QUFPdEJDLG9CQUFrQixDQVBJO0FBUXRCQyxvQkFBa0IsQ0FSSTtBQVN0QkMsb0JBQWtCLENBVEk7QUFVdEJDLG1CQUFpQixDQVZLO0FBV3RCQyxvQkFBa0IsQ0FYSTtBQVl0QkMsbUJBQWlCLENBWks7QUFhdEJDLHFCQUFtQixDQWJHO0FBY3RCQyxnQkFBYyxJQWRRO0FBZXRCQyxrQkFBZ0IsRUFmTTs7QUFpQnRCQyxpQkFBZSxJQWpCTztBQWtCdEJDLGtCQUFnQixJQWxCTTtBQW1CdEJDLHVCQUFxQixFQW5CQztBQW9CdEJDLHFCQUFtQixFQXBCRztBQXFCdEJDLGNBQVksSUFyQlU7QUFzQnRCQyxnQkFBYyxFQXRCUTtBQXVCdEJDLHdCQUFzQixFQXZCQTtBQXdCdEJDLHNCQUFvQixFQXhCRTtBQXlCdEJDLGFBQVcsSUF6Qlc7QUEwQnRCQyxlQUFhLEVBMUJTO0FBMkJ0QkMsZ0JBQWMsSUEzQlE7QUE0QnRCQyxlQUFhLElBNUJTO0FBNkJ0QkMsY0FBWSxJQTdCVTtBQThCdEJDLGdCQUFjLEVBOUJRO0FBK0J0QkMsaUJBQWUsSUEvQk87QUFnQ3RCQyxtQkFBaUIsRUFoQ0s7QUFpQ3RCQyxzQkFBb0IsRUFqQ0U7QUFrQ3RCQyxrQkFBZ0IsSUFsQ007QUFtQ3RCQyxpQkFBZSxJQW5DTztBQW9DdEJoVyxrQkFBZ0IsSUFwQ007QUFxQ3RCVCxtQkFBaUIsSUFyQ0s7QUFzQ3RCMFcsbUJBQWlCLElBdENLO0FBdUN0QkMsa0JBQWdCLElBdkNNO0FBd0N0QjNaLGlCQUFlLElBeENPO0FBeUN0QjRaLGVBQWEsSUF6Q1M7QUEwQ3RCdGEsZ0JBQWMsSUExQ1E7QUEyQ3RCdWEsc0JBQW9CLElBM0NFO0FBNEN0QkMscUJBQW1CLElBNUNHO0FBNkN0QkMsWUFBVSxJQTdDWTs7QUErQ3RCQyxtQkFBaUIsSUEvQ0s7QUFnRHRCQyxnQkFBYyxJQWhEUTtBQWlEdEJDLGVBQWEsSUFqRFM7QUFrRHRCQyxpQkFBZSxJQWxETztBQW1EdEJDLGVBQWEsSUFuRFM7O0FBcUR0QjtBQUNBQyxZQUFVLEVBdERZO0FBdUR0QkMsbUJBQWlCLENBdkRLO0FBd0R0QkMscUJBQW1CLENBeERHO0FBeUR0QkMsb0JBQWtCLENBekRJO0FBMER0QmhILFNBQU8sRUExRGU7QUEyRHRCakksUUFBTSxFQTNEZ0I7QUE0RHRCa1AsY0FBWSxJQTVEVTtBQTZEdEI7QUFDQW5XLGVBQWE7QUE5RFMsQ0FBMUI7QUFnRUE0RCxTQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUNqQ21QLHNCQUFvQm5QLFdBQVMsVUFBN0IsSUFBMkMsS0FBM0M7QUFDQW1QLHNCQUFvQm5QLFdBQVMsU0FBN0IsSUFBMEMsS0FBMUM7QUFDQW1QLHNCQUFvQm5QLFdBQVMsTUFBN0IsSUFBdUNBLFdBQVMsTUFBaEQ7QUFDQW1QLHNCQUFvQm5QLFdBQVMsa0JBQTdCLElBQW1ELDhCQUE0QkQsVUFBVUMsUUFBVixDQUE1QixHQUFnRCxzQkFBbkc7QUFDQW1QLHNCQUFvQm5QLFdBQVMsZUFBN0IsSUFBZ0RILFdBQWhEO0FBQ0FzUCxzQkFBb0JuUCxXQUFTLGVBQTdCLElBQWdELGNBQWhEO0FBQ0QsQ0FQRDtBQVFBbVAsb0JBQW9CbUQsY0FBcEIsR0FBcUMsSUFBckM7QUFDQW5ELG9CQUFvQm9ELGVBQXBCLEdBQXNDLENBQXRDO0FBQ0FwRCxvQkFBb0JDLHFCQUFwQixHQUE0QyxDQUE1QztBQUNBRCxvQkFBb0JFLHNCQUFwQixHQUE2QyxDQUE3QztBQUNBO0FBQ0EsSUFBSXJZLFVBQVUsSUFBSXdiLE9BQUosQ0FBWTtBQUN4QkMsTUFBSSxlQURvQjtBQUV4QkMsWUFBVSxnQkFGYztBQUd4QmhYLFFBQU15VDtBQUhrQixDQUFaLENBQWQ7O0FBTUE7QUFDQSxJQUFHM0IsU0FBUzBCLFFBQVQsS0FBc0IsV0FBekIsRUFBc0M7QUFDcENsWSxVQUFRVSxHQUFSLENBQVksT0FBWixFQUFxQix5QkFBckI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLE1BQVosRUFBb0IsTUFBcEI7QUFDQVYsVUFBUVUsR0FBUixDQUFZLFVBQVosRUFBd0IsdURBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSxJQUFJaWIsYUFBYSw0RUFBakI7QUFDQSxJQUFJQyxhQUFhRCxXQUFXaFgsSUFBWCxDQUFnQixrR0FBQXlSLEdBQWFuQixJQUE3QixDQUFqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTRHLGVBQWU3YixRQUFROGIsT0FBUixDQUFnQixVQUFoQixFQUE0QixVQUFTQyxRQUFULEVBQW1CQyxRQUFuQixFQUE4Qjs7QUFLMUUsTUFBSXZYLFFBQVEsV0FBWjtBQUNELE1BQUkxRCxRQUFRMEQsTUFBTUUsSUFBTixDQUFXb1gsUUFBWCxDQUFaO0FBQ0EsTUFBR2hiLEtBQUgsRUFDQTtBQUNFLFNBQUtMLEdBQUwsQ0FBUyxNQUFULEVBQWlCSyxNQUFNLENBQU4sQ0FBakI7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUVDLENBZmdCLEVBZ0JqQixFQUFDa2IsTUFBTSxLQUFQO0FBQ0NDLFNBQU87QUFEUixDQWhCaUIsQ0FBbkI7O0FBb0JBO0FBQ0FsYyxRQUFROGIsT0FBUixDQUFpQixrQkFBakIsRUFBcUMsVUFBV3ZULEtBQVgsRUFBbUI7QUFDdEQsTUFBSTRULGFBQWFuYyxRQUFRNkQsR0FBUixDQUFZLGlCQUFaLENBQWpCO0FBQ0EsTUFBSXVZLFlBQVlwYyxRQUFRNkQsR0FBUixDQUFZLG1CQUFaLENBQWhCO0FBQ0EsTUFBRzBFLFFBQVE0VCxVQUFYLEVBQ0E7QUFDRW5jLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ3liLFVBQWhDO0FBQ0Q7QUFDRCxNQUFHNVQsU0FBUzZULFNBQVosRUFDQTtBQUNFcGMsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDMGIsWUFBVSxDQUExQztBQUNEO0FBQ0YsQ0FYRDtBQVlBcGMsUUFBUThiLE9BQVIsQ0FBaUIsbUJBQWpCLEVBQXNDLFVBQVd2VCxLQUFYLEVBQW1CO0FBQ3ZELE1BQUk4VCxXQUFXcmMsUUFBUTZELEdBQVIsQ0FBWSxrQkFBWixDQUFmO0FBQ0EsTUFBRzBFLFFBQVEsQ0FBWCxFQUNBO0FBQ0V2SSxZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsQ0FBakM7QUFDRDtBQUNELE1BQUc2SCxTQUFTOFQsUUFBWixFQUNBO0FBQ0VyYyxZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMyYixXQUFTLENBQTFDO0FBQ0Q7QUFDRixDQVZEOztBQVlBO0FBQ0E7QUFDQXJjLFFBQVEyWCxFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTeEwsSUFBVCxFQUFlbVEsUUFBZixFQUF3QjtBQUNqRDlULFVBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBLE1BQUk2SyxNQUFNZSxhQUFhclUsUUFBUTZELEdBQVIsQ0FBWSxZQUFaLENBQXZCO0FBQ0EwWSxVQUFRQyxTQUFSLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCekUsV0FBUyxTQUFULEdBQW1CL1gsUUFBUTZELEdBQVIsQ0FBWSxZQUFaLENBQS9DO0FBQ0EsTUFBR3lZLFFBQUgsRUFBWTtBQUNWckcsSUFBQSxtSEFBQUEsQ0FBNEJqVyxPQUE1QjtBQUNEO0FBQ0QsTUFBSXljLFdBQVdDLFlBQVksWUFBVTtBQUNuQyxRQUFJQyxRQUFRLHdHQUFBdEosQ0FBYUMsR0FBYixFQUFrQixLQUFsQixFQUF5QixFQUF6QixDQUFaO0FBQ0EsUUFBSWpLLGlCQUFpQixFQUFyQjs7QUFFQSxRQUFHc1QsTUFBTUMsS0FBTixLQUFnQixVQUFuQixFQUNBO0FBQ0VwVSxjQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxVQUFJME0sY0FBY3dILE1BQU14SCxXQUF4QjtBQUNBQSxrQkFBWTlVLE9BQVosQ0FBb0IsVUFBU3FFLElBQVQsRUFBYztBQUM5QjtBQUNBMEUsUUFBQSwwSEFBQUEsQ0FBdUIxRSxJQUF2QixFQUE2QjJFLGNBQTdCLEVBQTZDUCxRQUE3QyxFQUF1REMsU0FBdkQ7QUFDQWUsUUFBQSxrSEFBQUEsQ0FBZTlKLE9BQWYsRUFBd0IwRSxJQUF4QixFQUE4QnFGLFFBQTlCLEVBQXdDYixHQUF4QyxFQUE2Q0csY0FBN0MsRUFBNkROLFNBQTdEO0FBRUgsT0FMRDtBQU1BNkksTUFBQSx1SEFBQUEsQ0FBb0I1UixPQUFwQixFQUE2QnFKLGNBQTdCOztBQUVBd1Qsb0JBQWNKLFFBQWQ7QUFDRDtBQUNELFFBQUdFLE1BQU1DLEtBQU4sS0FBZ0IsT0FBaEIsSUFBMkJELE1BQU1DLEtBQU4sS0FBZ0IsT0FBOUMsRUFDQTtBQUNFLFVBQUlFLHFCQUFxQkgsTUFBTXhILFdBQU4sQ0FBa0IsQ0FBbEIsRUFBcUI0SCxZQUE5QztBQUNBL1csWUFBTSxnQ0FDQSxrRkFEQSxHQUNtRjhXLGtCQUR6RjtBQUVFRCxvQkFBY0osUUFBZDtBQUNIO0FBQ0YsR0F6QmMsRUF5QlosSUF6QlksQ0FBZjtBQTJCRCxDQWxDRCxFQWtDRSxFQUFDUixNQUFNLEtBQVA7QUFDQ0MsU0FBTztBQURSLENBbENGOztBQXVDQTtBQUNBbGMsUUFBUTJYLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFVBQVVxRixPQUFWLEVBQW1CO0FBQ3JDLE1BQUkvSCxPQUFPalYsUUFBUTZELEdBQVIsQ0FBWSxZQUFaLENBQVg7QUFDQXFGLE1BQUkrVCxhQUFKLENBQWtCLEVBQUMxVixNQUFLLE1BQU4sRUFBbEIsRUFBaUMyVixJQUFqQyxDQUFzQyxVQUFVQyxJQUFWLEVBQWdCO0FBQ2xEQyxXQUFPRCxJQUFQLEVBQWFsSSxPQUFLLE1BQWxCO0FBQ0gsR0FGRDtBQUdILENBTEQ7O0FBT0FqVixRQUFRMlgsRUFBUixDQUFXLGNBQVgsRUFBMkIsVUFBUzBGLEtBQVQsRUFBZ0I7QUFDekMsTUFBSUMsTUFBTXRkLFFBQVE2RCxHQUFSLENBQVksa0JBQVosQ0FBVjtBQUNBLE1BQUd5WixHQUFILEVBQU87QUFDTHRkLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNELEdBRkQsTUFJQTtBQUNFVixZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRDtBQUNGLENBVEQ7QUFVQVYsUUFBUTJYLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVMwRixLQUFULEVBQWdCO0FBQ3pDLE1BQUlDLE1BQU10ZCxRQUFRNkQsR0FBUixDQUFZLGtCQUFaLENBQVY7QUFDQSxNQUFHeVosR0FBSCxFQUFPO0FBQ0x0ZCxZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRCxHQUZELE1BSUE7QUFDRVYsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0Q7QUFDRixDQVREO0FBVUFWLFFBQVEyWCxFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTMEYsS0FBVCxFQUFnQjtBQUN6QyxNQUFJQyxNQUFNdGQsUUFBUTZELEdBQVIsQ0FBWSxrQkFBWixDQUFWO0FBQ0EsTUFBR3laLEdBQUgsRUFBTztBQUNMdGQsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0QsR0FGRCxNQUlBO0FBQ0VWLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNEO0FBQ0YsQ0FURDtBQVVBVixRQUFRMlgsRUFBUixDQUFXLGFBQVgsRUFBMEIsVUFBUzBGLEtBQVQsRUFBZ0I7QUFDeEMsTUFBSUMsTUFBTXRkLFFBQVE2RCxHQUFSLENBQVksaUJBQVosQ0FBVjtBQUNBLE1BQUd5WixHQUFILEVBQU87QUFDTHRkLFlBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNELEdBRkQsTUFJQTtBQUNFVixZQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDRDtBQUNGLENBVEQ7QUFVQVYsUUFBUTJYLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVMwRixLQUFULEVBQWdCO0FBQ3pDLE1BQUlDLE1BQU10ZCxRQUFRNkQsR0FBUixDQUFZLGtCQUFaLENBQVY7QUFDQSxNQUFHeVosR0FBSCxFQUFPO0FBQ0x0ZCxZQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRCxHQUZELE1BSUE7QUFDRVYsWUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0Q7QUFDRixDQVREO0FBVUFWLFFBQVEyWCxFQUFSLENBQVcsYUFBWCxFQUEwQixVQUFTMEYsS0FBVCxFQUFnQjtBQUN4QyxNQUFJQyxNQUFNdGQsUUFBUTZELEdBQVIsQ0FBWSxpQkFBWixDQUFWO0FBQ0EsTUFBR3laLEdBQUgsRUFBTztBQUNMdGQsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0QsR0FGRCxNQUlBO0FBQ0VWLFlBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNEO0FBQ0YsQ0FURDtBQVVBVixRQUFRMlgsRUFBUixDQUFXLGVBQVgsRUFBNEIsVUFBUzBGLEtBQVQsRUFBZ0I7QUFDMUMsTUFBSUMsTUFBTXRkLFFBQVE2RCxHQUFSLENBQVksbUJBQVosQ0FBVjtBQUNBLE1BQUd5WixHQUFILEVBQU87QUFDTHRkLFlBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNELEdBRkQsTUFJQTtBQUNFVixZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsQ0FBakM7QUFDRDtBQUNGLENBVEQ7QUFVQTtBQUNBO0FBQ0FWLFFBQVEyWCxFQUFSLENBQVksaUJBQVosRUFBK0IsVUFBVzBGLEtBQVgsRUFBbUI7QUFDaERyZCxVQUFRVSxHQUFSLENBQWEsd0JBQWIsRUFBdUMsSUFBdkM7QUFDQVYsVUFBUVUsR0FBUixDQUFhLHdCQUFiLEVBQXVDLENBQXZDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNBVixVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBb0ksV0FBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDL0IsUUFBSXVVLFVBQVUsS0FBZDtBQUNBLFFBQUd2VSxhQUFhLFNBQWhCLEVBQTBCO0FBQUN1VSxnQkFBVSxJQUFWO0FBQWdCO0FBQzNDdmQsWUFBUVUsR0FBUixDQUFhc0ksV0FBUyxVQUF0QixFQUFrQ3VVLE9BQWxDO0FBQ0gsR0FKRDtBQUtBdmQsVUFBUVUsR0FBUixDQUFhLHVCQUFiLEVBQXNDLElBQXRDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxDQUF0QztBQUNELENBakJEOztBQW1CQVYsUUFBUTJYLEVBQVIsQ0FBWSxrQkFBWixFQUFnQyxVQUFXMEYsS0FBWCxFQUFtQjtBQUNqRHJkLFVBQVFVLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxJQUF0QztBQUNBVixVQUFRVSxHQUFSLENBQWEsdUJBQWIsRUFBc0MsQ0FBdEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLG1CQUFaLEVBQWlDLENBQWpDO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0FWLFVBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBVixVQUFRVSxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQVYsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0VvSSxXQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFrQjtBQUNqQ2hKLFlBQVFVLEdBQVIsQ0FBYXNJLFdBQVMsVUFBdEIsRUFBa0MsS0FBbEM7QUFDSCxHQUZDO0FBR0ZoSixVQUFRVSxHQUFSLENBQWEsd0JBQWIsRUFBdUMsSUFBdkM7QUFDQVYsVUFBUVUsR0FBUixDQUFhLHdCQUFiLEVBQXVDLENBQXZDO0FBQ0QsQ0FmRDs7QUFpQkFWLFFBQVEyWCxFQUFSLENBQVksa0JBQVosRUFBZ0MsVUFBVzBGLEtBQVgsRUFBbUI7QUFDakQxVSxFQUFBLDhHQUFBQSxDQUFXLENBQVgsRUFBYzNJLE9BQWQ7QUFDRCxDQUZEOztBQUlBO0FBQ0E4SSxTQUFTekksT0FBVCxDQUFpQixVQUFTMkksUUFBVCxFQUFtQnpJLENBQW5CLEVBQXFCO0FBQ3BDaUksVUFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0F6SSxVQUFRMlgsRUFBUixDQUFXM08sV0FBUyxTQUFwQixFQUErQixVQUFVcVUsS0FBVixFQUFpQjtBQUM5QzFVLElBQUEsOEdBQUFBLENBQVdwSSxJQUFFLENBQWIsRUFBZ0JQLE9BQWhCO0FBQ0EsUUFBR2dKLGFBQWEsU0FBaEIsRUFDQTtBQUNFLFVBQUdoSixRQUFRNkQsR0FBUixDQUFZLGVBQVosQ0FBSCxFQUNBO0FBQ0UwQixjQUFNZ0UsT0FBTixDQUFjdkosUUFBUTZELEdBQVIsQ0FBWSxlQUFaLENBQWQsRUFBNEMsY0FBNUMsRUFBNEQsRUFBQzRCLFFBQVEscUJBQVQsRUFBZ0NDLGVBQWUsQ0FBL0MsRUFBNUQ7QUFDRDtBQUNGO0FBQ0QsUUFBR3NELGFBQWEsVUFBaEIsRUFDQTtBQUNFLFVBQUdoSixRQUFRNkQsR0FBUixDQUFZLGdCQUFaLENBQUgsRUFDQTtBQUNFMEIsY0FBTWUsa0JBQU4sQ0FBeUJ0RyxRQUFRNkQsR0FBUixDQUFZLGdCQUFaLENBQXpCLEVBQXdELEtBQXhELEVBQStELENBQUMsV0FBRCxDQUEvRCxFQUE4RSxDQUFDLE9BQUQsQ0FBOUUsRUFBMEYsYUFBMUYsRUFBeUcsRUFBQzRCLFFBQVEsZUFBVCxFQUEwQmMsV0FBVyxNQUFyQyxFQUE2Q0MsVUFBVSxHQUF2RCxFQUE0RGQsZUFBZSxDQUEzRSxFQUE4RUMsT0FBTyxLQUFyRixFQUE0RkMsaUJBQWlCLEdBQTdHLEVBQWtIQyxPQUFPLEdBQXpILEVBQThIQyxRQUFRLEdBQXRJLEVBQTJJQyxrQkFBa0IsR0FBN0osRUFBekc7QUFDRDtBQUNGO0FBQ0QsUUFBR2lELGFBQWEsU0FBaEIsRUFDQTtBQUNFLFVBQUdoSixRQUFRNkQsR0FBUixDQUFZLG9CQUFaLEVBQWtDcEQsTUFBckMsRUFDQTtBQUNFLFlBQUlzTyxRQUFRL08sUUFBUTZELEdBQVIsQ0FBWSxvQkFBWixDQUFaO0FBQ0EySyxRQUFBLHFIQUFBQSxDQUFrQk8sTUFBTSxDQUFOLENBQWxCLEVBQTRCLGdCQUE1QixFQUE4QyxJQUE5QztBQUNEO0FBQ0Y7QUFDRCxRQUFHL0YsYUFBYSxTQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksYUFBWixFQUEyQnBELE1BQTlCLEVBQ0E7QUFDRSxZQUFJK2MsVUFBVXhkLFFBQVE2RCxHQUFSLENBQVksYUFBWixDQUFkO0FBQ0EySyxRQUFBLHFIQUFBQSxDQUFrQmdQLE9BQWxCLEVBQTJCLGdCQUEzQixFQUE2QyxLQUE3QztBQUNEO0FBQ0Y7QUFDRCxRQUFHeFUsYUFBYSxRQUFoQixFQUNBO0FBQ0UsVUFBR2hKLFFBQVE2RCxHQUFSLENBQVksb0JBQVosRUFBa0NwRCxNQUFyQyxFQUNBO0FBQ0UsWUFBSWdkLGNBQWN6ZCxRQUFRNkQsR0FBUixDQUFZLG9CQUFaLENBQWxCO0FBQ0EsWUFBSTZaLGFBQWExZCxRQUFRNkQsR0FBUixDQUFZLG1CQUFaLENBQWpCO0FBQ0EySyxRQUFBLHFIQUFBQSxDQUFrQmlQLFdBQWxCLEVBQStCLHVCQUEvQixFQUF3RCxLQUF4RDtBQUNBalAsUUFBQSxxSEFBQUEsQ0FBa0JrUCxVQUFsQixFQUErQixzQkFBL0IsRUFBdUQsS0FBdkQ7QUFDRDtBQUNGO0FBRUYsR0EzQ0Q7QUE2Q0QsQ0EvQ0Q7O0FBaURBMWQsUUFBUTJYLEVBQVIsQ0FBWSxtQkFBWixFQUFpQyxVQUFXMEYsS0FBWCxFQUFtQjtBQUNsRDdVLFVBQVFDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLE1BQUltVSxRQUFRNWMsUUFBUTZELEdBQVIsQ0FBWSwyQkFBWixDQUFaOztBQUVBLE1BQUcrWSxVQUFVLENBQWIsRUFBZTtBQUNiNWMsWUFBUVUsR0FBUixDQUFhLDJCQUFiLEVBQTBDLENBQTFDO0FBQ0QsR0FGRCxNQUdJO0FBQ0ZWLFlBQVFVLEdBQVIsQ0FBYSwyQkFBYixFQUEwQyxDQUExQztBQUNEO0FBQ0YsQ0FWRDs7QUFZQTtBQUNBVixRQUFRMlgsRUFBUixDQUFXLFFBQVgsRUFBcUIsVUFBUzBGLEtBQVQsRUFBZ0I7QUFDbkMsTUFBSU0sYUFBYSxLQUFqQjtBQUNBblYsVUFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0EsTUFBSS9CLE1BQU0sS0FBSzdDLEdBQUwsQ0FBUyxVQUFULENBQVY7QUFDQTZDLFFBQU1BLElBQUkwQixPQUFKLENBQVksU0FBWixFQUF1QixFQUF2QixFQUEyQndWLFdBQTNCLEVBQU47QUFDQWxYLFFBQU1BLElBQUkwQixPQUFKLENBQVksUUFBWixFQUFxQixFQUFyQixDQUFOO0FBQ0FwSSxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JnRyxJQUFJakcsTUFBbkM7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDZ0csSUFBSWpHLE1BQXBDO0FBQ0FULFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCZ0csR0FBeEI7O0FBRUEsTUFBSXlGLE9BQU8sS0FBS3RJLEdBQUwsQ0FBUyxNQUFULENBQVg7QUFDQSxNQUFJdVEsUUFBUSxLQUFLdlEsR0FBTCxDQUFTLE9BQVQsQ0FBWjtBQUNBLE1BQUlnYSxlQUFlLEVBQW5CO0FBQ0EsTUFBSUMsY0FBYyxLQUFsQjtBQUNBLE1BQUl4QixXQUFXLEtBQWY7QUFDQXhULFdBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQWtCO0FBQ2pDNlUsaUJBQWE3VSxXQUFTLE1BQXRCLElBQWdDaEosUUFBUTZELEdBQVIsQ0FBWW1GLFdBQVMsTUFBckIsQ0FBaEM7QUFDQTZVLGlCQUFhN1UsV0FBUyxVQUF0QixJQUFvQ2hKLFFBQVE2RCxHQUFSLENBQVltRixXQUFTLFVBQXJCLENBQXBDO0FBQ0EsUUFBRzZVLGFBQWE3VSxXQUFTLFVBQXRCLEtBQXFDaVAsZ0JBQWdCclQsUUFBaEIsQ0FBeUJvRSxRQUF6QixDQUF4QyxFQUNBO0FBQ0U4VSxvQkFBYyxJQUFkO0FBQ0Q7QUFDRCxRQUFHRCxhQUFhN1UsV0FBUyxVQUF0QixLQUFxQ2dQLGFBQWFwVCxRQUFiLENBQXNCb0UsUUFBdEIsQ0FBeEMsRUFDQTtBQUNFc1QsaUJBQVcsSUFBWDtBQUNEO0FBRUYsR0FaRDs7QUFjQSxNQUFJdEssZUFBZSx1SEFBQUQsRUFBbkI7QUFDQTtBQUNBLE1BQUc4TCxhQUFhRSxlQUFiLElBQWdDRixhQUFhRyxlQUFoRCxFQUNBO0FBQ0UsUUFBSUMscUJBQXFCQyxrQkFBa0JsTSxhQUFhTSxvQkFBL0IsQ0FBekI7QUFDQSxRQUFJNkwscUJBQXFCRCxrQkFBa0JsTSxhQUFhTyxvQkFBL0IsQ0FBekI7QUFDQSxRQUFHMEwsc0JBQXNCRSxrQkFBekIsRUFDQTtBQUNFUixtQkFBWSxJQUFaO0FBQ0gsS0FIQyxNQUlJO0FBQ0YzWCxZQUFNLDBGQUFOO0FBQ0Q7QUFDRixHQVhELE1BWUk7QUFDRjJYLGlCQUFXLElBQVg7QUFDRDtBQUNELE1BQUdyQixZQUFZd0IsV0FBZixFQUNBO0FBQ0U5WCxVQUFNLDhEQUFOO0FBQ0EyWCxpQkFBYSxLQUFiO0FBQ0Q7QUFDRCxNQUFHQSxVQUFILEVBQ0E7QUFDRW5WLFlBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsUUFBRzZULFFBQUgsRUFDQTtBQUNFOEIsTUFBQSwwR0FBQUEsQ0FBcUJwZSxPQUFyQixFQUE4QjBHLEdBQTlCLEVBQW1DeUYsSUFBbkMsRUFBeUNpSSxLQUF6QyxFQUFnREMsVUFBaEQsRUFBNERDLFNBQTVELEVBQXVFdUosWUFBdkUsRUFBcUYvVSxRQUFyRixFQUErRkMsU0FBL0YsRUFBMEdpSixZQUExRyxFQUF3SHNLLFFBQXhILEVBQWtJd0IsV0FBbEk7QUFDRDtBQUNELFFBQUdBLFdBQUgsRUFDQTtBQUNFLFVBQUlPLFVBQVUsSUFBZDtBQUNBLFVBQUlDLFVBQVUsRUFBZDtBQUNBLFVBQUc7QUFDRkQsa0JBQVVuTSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQVY7QUFDQSxZQUFJbFMsT0FBT29lLFFBQVFFLEtBQVIsQ0FBYyxDQUFkLENBQVg7QUFDQSxZQUFJQyxLQUFLLElBQUlDLFVBQUosRUFBVDtBQUNBRCxXQUFHRSxVQUFILENBQWN6ZSxJQUFkO0FBQ0F1ZSxXQUFHRyxNQUFILEdBQVksVUFBU25LLENBQVQsRUFBWTtBQUN2QjhKLG9CQUFVRSxHQUFHSSxNQUFiO0FBQ0FSLFVBQUEsMEdBQUFBLENBQXFCcGUsT0FBckIsRUFBOEJzZSxPQUE5QixFQUF1Q25TLElBQXZDLEVBQTZDaUksS0FBN0MsRUFBb0RDLFVBQXBELEVBQWdFQyxTQUFoRSxFQUEyRXVKLFlBQTNFLEVBQXlGL1UsUUFBekYsRUFBbUdDLFNBQW5HLEVBQThHaUosWUFBOUcsRUFBNEhzSyxRQUE1SCxFQUFzSXdCLFdBQXRJO0FBQ0MsU0FIRjtBQUlBLE9BVEQsQ0FVQSxPQUFNMUwsR0FBTixFQUFXO0FBQ1RrTSxrQkFBVSxFQUFWO0FBQ0E5VixnQkFBUUMsR0FBUixDQUFZMkosR0FBWjtBQUNEO0FBQ0Y7QUFDRjtBQUNEaUwsUUFBTXdCLFFBQU4sQ0FBZUMsY0FBZjtBQUNELENBL0VEOztBQWlGQTtBQUNBO0FBQ0E5ZSxRQUFRMlgsRUFBUixDQUFXLFVBQVgsRUFBdUIsVUFBUzBGLEtBQVQsRUFBZ0I7QUFDckM3VSxVQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxNQUFJc1csUUFBUS9lLFFBQVE2RCxHQUFSLENBQVksbUJBQVosQ0FBWjtBQUNBLE1BQUltYixPQUFPaGYsUUFBUTZELEdBQVIsQ0FBWSxrQkFBWixDQUFYO0FBQ0EsTUFBSW9YLFdBQVdqYixRQUFRNkQsR0FBUixDQUFZLFVBQVosQ0FBZjtBQUNBLE1BQUlvYixjQUFjaEUsU0FBU3BULFNBQVQsQ0FBbUJrWCxRQUFNLENBQXpCLEVBQTRCQyxJQUE1QixDQUFsQjtBQUNBLE1BQUk3UyxPQUFPLEtBQUt0SSxHQUFMLENBQVMsTUFBVCxJQUFpQixNQUE1QjtBQUNBLE1BQUl1USxRQUFRLEtBQUt2USxHQUFMLENBQVMsT0FBVCxDQUFaO0FBQ0E3RCxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0J1ZSxZQUFZeGUsTUFBM0M7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDdWUsWUFBWXhlLE1BQTVDO0FBQ0FULFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXdCdWUsV0FBeEI7QUFDQWpmLFVBQVFVLEdBQVIsQ0FBWSxNQUFaLEVBQW9CeUwsSUFBcEI7QUFDQSxNQUFJMFIsZUFBZSxFQUFuQjtBQUNBL1UsV0FBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDakM2VSxpQkFBYTdVLFdBQVMsTUFBdEIsSUFBZ0NoSixRQUFRNkQsR0FBUixDQUFZbUYsV0FBUyxNQUFyQixDQUFoQztBQUNBNlUsaUJBQWE3VSxXQUFTLFVBQXRCLElBQW9DaEosUUFBUTZELEdBQVIsQ0FBWW1GLFdBQVMsVUFBckIsQ0FBcEM7QUFDRCxHQUhEO0FBSUE7QUFDQUosRUFBQSxrSEFBQUEsQ0FBZTVJLE9BQWYsRUFBd0I2SSxXQUF4QixFQUFxQ0MsUUFBckMsRUFBK0NDLFNBQS9DO0FBQ0E7QUFDQTtBQUNBLE1BQUlpSixlQUFlLHVIQUFBRCxFQUFuQjtBQUNBcU0sRUFBQSwwR0FBQUEsQ0FBcUJwZSxPQUFyQixFQUE4QmlmLFdBQTlCLEVBQTJDOVMsSUFBM0MsRUFBaURpSSxLQUFqRCxFQUF3REMsVUFBeEQsRUFBb0VDLFNBQXBFLEVBQStFdUosWUFBL0UsRUFBNkYvVSxRQUE3RixFQUF1R0MsU0FBdkcsRUFBa0gsSUFBbEgsRUFBd0gsS0FBeEg7QUFDQTtBQUNBO0FBQ0FzVSxRQUFNd0IsUUFBTixDQUFlQyxjQUFmO0FBQ0QsQ0ExQkQ7O0FBNEJBLFNBQVNaLGlCQUFULENBQTJCZ0IsS0FBM0IsRUFDQTtBQUNFLE1BQUdBLFVBQVUsYUFBYixFQUNBO0FBQ0UsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxrR0FBQTlJLEdBQWFuQixJQUFiLElBQXFCMkcsVUFBeEIsRUFDQTtBQUNFcFQsVUFBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0FvVCxlQUFhc0QsTUFBYjtBQUNBbmYsVUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBSEYsQ0FHeUM7QUFDdkNWLFVBQVFVLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBVixVQUFRVSxHQUFSLENBQVksWUFBWixFQUEwQixrR0FBQTBWLEdBQWFuQixJQUF2QztBQUNBLE1BQUltSyxnQkFBZ0IsNkdBQUFwSyxDQUFrQixrR0FBQW9CLEdBQWFuQixJQUEvQixFQUFxQ1osVUFBckMsRUFBaUR0SyxRQUFqRCxFQUEyRC9KLE9BQTNELENBQXBCO0FBQ0EsTUFBSXNjLFdBQVcsSUFBZjtBQUNBLE1BQUc4QyxjQUFjL0osSUFBZCxDQUFtQnpRLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsY0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsWUFBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBakM7QUFDQVYsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsVUFBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMGUsY0FBYy9KLElBQWQsQ0FBbUJ6USxRQUFuQixDQUE0QixTQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQztBQUNBVixZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMGUsY0FBYy9KLElBQWQsQ0FBbUJ6USxRQUFuQixDQUE0QixXQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQztBQUNBVixZQUFRVSxHQUFSLENBQVksdUJBQVosRUFBcUMsQ0FBckM7QUFDSDtBQUNELE1BQUcwZSxjQUFjL0osSUFBZCxDQUFtQnpRLFFBQW5CLENBQTRCLGFBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsY0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBVixZQUFRVSxHQUFSLENBQVksdUJBQVosRUFBcUMsRUFBckM7QUFDSDtBQUNELE1BQUcwZSxjQUFjL0osSUFBZCxDQUFtQnpRLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxJQUFuQztBQUNBVixZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0g7QUFDRCxNQUFHMGUsY0FBYy9KLElBQWQsQ0FBbUJ6USxRQUFuQixDQUE0QixRQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNIO0FBQ0QsTUFBRzBlLGNBQWMvSixJQUFkLENBQW1CelEsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k1RSxZQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0E0YixlQUFXLEtBQVg7QUFDSDtBQUNELE1BQUc4QyxjQUFjL0osSUFBZCxDQUFtQnpRLFFBQW5CLENBQTRCLFFBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQVYsWUFBUVUsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0E0YixlQUFXLEtBQVg7QUFDSDtBQUNELE1BQUc4QyxjQUFjL0osSUFBZCxDQUFtQnpRLFFBQW5CLENBQTRCLFVBQTVCLENBQUgsRUFDQTtBQUNJNUUsWUFBUVUsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBNGIsZUFBVyxLQUFYO0FBQ0g7QUFDRCxNQUFHOEMsY0FBYy9KLElBQWQsQ0FBbUJ6USxRQUFuQixDQUE0QixRQUE1QixDQUFILEVBQ0E7QUFDSTVFLFlBQVFVLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBQ0FWLFlBQVFVLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBNGIsZUFBVyxLQUFYO0FBQ0g7QUFDRHRjLFVBQVFVLEdBQVIsQ0FBWSxVQUFaLEVBQXVCMGUsY0FBYzFZLEdBQXJDO0FBQ0ExRyxVQUFRVSxHQUFSLENBQVksT0FBWixFQUFvQjBlLGNBQWNoTCxLQUFsQztBQUNBcFUsVUFBUVUsR0FBUixDQUFZLE1BQVosRUFBbUIwZSxjQUFjalQsSUFBakM7QUFDQSxNQUFJekYsTUFBTTFHLFFBQVE2RCxHQUFSLENBQVksVUFBWixDQUFWO0FBQ0E3RCxVQUFRVSxHQUFSLENBQVksaUJBQVosRUFBK0JnRyxJQUFJakcsTUFBbkM7QUFDQVQsVUFBUVUsR0FBUixDQUFZLGtCQUFaLEVBQWdDZ0csSUFBSWpHLE1BQXBDO0FBQ0FULFVBQVErVSxJQUFSLENBQWEsY0FBYixFQUE2QnVILFFBQTdCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDTyxTQUFTK0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWlDQyxNQUFqQyxFQUF3Q0MsS0FBeEMsRUFBK0M7QUFDcEQsTUFBSWxNLE1BQU1lLGFBQVdyVSxRQUFRNkQsR0FBUixDQUFZLFlBQVosQ0FBckI7QUFDQTBTLFNBQU9rSixJQUFQLENBQVksT0FBSzFILFFBQUwsR0FBYyxZQUFkLEdBQTJCaE8sUUFBM0IsR0FBb0N3VixNQUFwQyxHQUEyQyxPQUEzQyxHQUFtRHhWLFFBQW5ELEdBQTREdVYsTUFBeEUsRUFBZ0YsRUFBaEYsRUFBb0Ysc0JBQXBGO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTSSxVQUFULENBQW9CSixNQUFwQixFQUE0Qi9YLElBQTVCLEVBQWtDOztBQUV2QyxNQUFJK0wsTUFBTWUsYUFBV3JVLFFBQVE2RCxHQUFSLENBQVksWUFBWixDQUFyQjtBQUNBLE1BQUk4YixVQUFVM2YsUUFBUTZELEdBQVIsQ0FBWSxjQUFaLENBQWQ7QUFDQSxNQUFHOGIsWUFBWSxNQUFJLEdBQUosR0FBUSxHQUFSLEdBQVksR0FBWixHQUFnQixHQUFoQixHQUFvQixHQUFwQixHQUF3QixHQUF4QixHQUE0QixHQUE1QixHQUFnQyxHQUFoQyxHQUFvQyxHQUFwQyxHQUF3QyxHQUF2RCxFQUNBO0FBQ0U7QUFDQXBKLFdBQU9rSixJQUFQLENBQVksT0FBSzFILFFBQUwsR0FBYyxtQkFBZCxHQUFrQ3hRLElBQWxDLEdBQXVDLE9BQXZDLEdBQStDd0MsUUFBL0MsR0FBd0R1VixNQUFwRSxFQUE0RSxFQUE1RSxFQUFnRixzQkFBaEY7QUFDRCxHQUpELE1BTUE7QUFDRXRaLFVBQU0sNkJBQTJCLEdBQTNCLEdBQStCLEdBQS9CLEdBQW1DLEdBQW5DLEdBQXVDLEdBQXZDLEdBQTJDLEdBQTNDLEdBQStDLEdBQS9DLEdBQW1ELGVBQXpEO0FBQ0Q7QUFDRjs7QUFFRDtBQUNPLFNBQVM0WixXQUFULENBQXFCQyxVQUFyQixFQUNQO0FBQ0VBLGVBQWFBLGFBQVcsQ0FBeEI7QUFDQSxNQUFJOVEsUUFBUS9PLFFBQVE2RCxHQUFSLENBQVksb0JBQVosQ0FBWjtBQUNBMkssRUFBQSxxSEFBQUEsQ0FBa0JPLE1BQU04USxVQUFOLENBQWxCLEVBQXFDLGdCQUFyQyxFQUF1RCxJQUF2RDtBQUNELEM7Ozs7Ozs7Ozs7OztBQzl0QkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTyxTQUFTekIsb0JBQVQsQ0FBOEJwZSxPQUE5QixFQUF1QzBFLElBQXZDLEVBQTZDeUgsSUFBN0MsRUFBbURpSSxLQUFuRCxFQUEwREMsVUFBMUQsRUFBc0VDLFNBQXRFLEVBQWlGdUosWUFBakYsRUFBK0YvVSxRQUEvRixFQUF5R0MsU0FBekcsRUFBb0hpSixZQUFwSCxFQUFrSXNLLFFBQWxJLEVBQTRJd0IsV0FBNUksRUFDUDtBQUNFO0FBQ0EsTUFBSWdDLGdCQUFjLElBQWxCO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBOztBQUVBLE1BQUlDLGFBQWEsRUFBakI7QUFDQWxYLFdBQVN6SSxPQUFULENBQWlCLFVBQVMySSxRQUFULEVBQWtCO0FBQ2pDZ1gsZUFBVzFlLElBQVgsQ0FBZ0J1YyxhQUFhN1UsV0FBUyxVQUF0QixDQUFoQjtBQUNELEdBRkQ7O0FBSUEsTUFBR3NULFFBQUgsRUFBWTtBQUNWd0Qsb0JBQWdCRyxnQkFBZ0J2YixJQUFoQixFQUFzQnlILElBQXRCLEVBQTRCaUksS0FBNUIsRUFBbUM0TCxVQUFuQyxDQUFoQjtBQUNEO0FBQ0QsTUFBR2xDLFdBQUgsRUFBZTtBQUNiZ0Msb0JBQWdCSSxtQkFBbUJ4YixJQUFuQixFQUF5QnlILElBQXpCLEVBQStCaUksS0FBL0IsRUFBc0M0TCxVQUF0QyxDQUFoQjtBQUNEO0FBQ0QsTUFBR0YsY0FBY3JmLE1BQWQsR0FBdUIsQ0FBMUIsRUFDQTtBQUNFVCxZQUFRVSxHQUFSLENBQVksWUFBWixFQUEwQm9mLGFBQTFCO0FBQ0E5WixVQUFNLGdCQUFjOFosYUFBcEI7QUFDRCxHQUpELE1BS0s7QUFDSDtBQUNBLFFBQUl0TSxXQUFXLElBQWY7QUFDQXhULFlBQVFVLEdBQVIsQ0FBYSxpQkFBYixFQUFnQyxJQUFoQztBQUNBO0FBQ0E7QUFDQTtBQUNBb0ksYUFBU3pJLE9BQVQsQ0FBaUIsVUFBUzJJLFFBQVQsRUFBa0I7QUFDL0IsVUFBRzZVLGFBQWE3VSxXQUFTLFVBQXRCLE1BQXNDLElBQXpDLEVBQ0E7QUFDSStXLHFCQUFhQSxXQUFXak8sTUFBWCxDQUFrQjlJLFdBQVMsR0FBM0IsQ0FBYjtBQUNBaEosZ0JBQVFVLEdBQVIsQ0FBWXNJLFdBQVMsU0FBckIsRUFBZ0MsSUFBaEM7QUFDQSxZQUFHQSxhQUFhLGNBQWIsSUFBK0JBLGFBQWEsVUFBNUMsSUFDQUEsYUFBYSxTQURiLElBQzBCQSxhQUFhLGNBRHZDLElBRUFBLGFBQWEsU0FGYixJQUUwQkEsYUFBYSxTQUZ2QyxJQUdBQSxhQUFhLFlBSGhCLEVBSUE7QUFDRWhKLGtCQUFRVSxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQW1kLHVCQUFhc0MsZUFBYixHQUErQixLQUEvQjtBQUNEO0FBQ0QsWUFBR25YLGFBQWEsU0FBaEIsRUFDQTtBQUNFaEosa0JBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxJQUFuQztBQUNBbWQsdUJBQWF1QyxvQkFBYixHQUFvQyxLQUFwQztBQUNEO0FBQ0QsWUFBR3BYLGFBQWEsU0FBaEIsRUFDQTtBQUNFaEosa0JBQVFVLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxJQUFuQztBQUNBbWQsdUJBQWF3QyxvQkFBYixHQUFvQyxLQUFwQztBQUNEO0FBQ0QsWUFBR3JYLGFBQWEsU0FBaEIsRUFDQTtBQUNJaEosa0JBQVFVLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQztBQUNIO0FBQ0o7QUFDSixLQTVCRDs7QUE4QkFxZixpQkFBYUEsV0FBV3hLLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixDQUFiO0FBQ0EvQixlQUFXLG9HQUFBVyxDQUFTblUsT0FBVCxFQUFrQitmLFVBQWxCLEVBQThCcmIsSUFBOUIsRUFBb0N5SCxJQUFwQyxFQUEwQ2lJLEtBQTFDLEVBQWlEQyxVQUFqRCxFQUE2REMsU0FBN0QsRUFBd0V2TCxTQUF4RSxFQUFtRmlKLFlBQW5GLENBQVg7QUFDQTtBQUNBLFNBQUssSUFBSXpSLElBQUksQ0FBYixFQUFnQkEsSUFBSXVJLFNBQVNySSxNQUE3QixFQUFxQ0YsR0FBckMsRUFDQTtBQUNFLFVBQUl5SSxXQUFXRixTQUFTdkksQ0FBVCxDQUFmO0FBQ0EsVUFBR3NkLGFBQWE3VSxXQUFTLFVBQXRCLE1BQXNDLElBQXRDLElBQThDd0ssUUFBakQsRUFDQTtBQUNFeFQsZ0JBQVFVLEdBQVIsQ0FBYSxpQkFBYixFQUFnQyxDQUFoQztBQUNBVixnQkFBUStVLElBQVIsQ0FBYy9MLFdBQVMsU0FBdkI7QUFDQSxZQUFHc1QsUUFBSCxFQUFZO0FBQ1Z0YyxrQkFBUVUsR0FBUixDQUFhLHNCQUFiLEVBQXFDLENBQXJDO0FBQ0F1VixVQUFBLG1IQUFBQSxDQUE0QmpXLE9BQTVCO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Y7O0FBRUQsUUFBRyxDQUFFd1QsUUFBTCxFQUFjO0FBQUMrQyxhQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkYsT0FBT0MsUUFBUCxDQUFnQkMsSUFBdkM7QUFBNkM7QUFDN0Q7QUFDRjs7QUFFTSxTQUFTeUosa0JBQVQsQ0FBNEJJLE1BQTVCLEVBQW9DdFgsUUFBcEMsRUFBOENvTCxLQUE5QyxFQUFxRG1NLGFBQXJELEVBQ1A7QUFDRSxNQUFJVCxnQkFBZ0IsRUFBcEI7QUFDQSxNQUFHLENBQUUsaUJBQWlCVSxJQUFqQixDQUFzQnhYLFFBQXRCLENBQUwsRUFDQTtBQUNFOFcsb0JBQWdCQSxnQkFBZ0IsZ0ZBQWhDO0FBQ0Q7QUFDRDtBQUNBLE1BQUcsQ0FBRSx1QkFBdUJVLElBQXZCLENBQTRCRixNQUE1QixDQUFMLEVBQXlDO0FBQ3JDUixvQkFBZ0JBLGdCQUFnQixvSEFBaEM7QUFDSDtBQUNELE1BQUcsaUdBQUEvSixDQUFVLElBQVYsRUFBZ0J3SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ1Qsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7QUFDRCxTQUFPQSxhQUFQO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTRyxlQUFULENBQXlCdlosR0FBekIsRUFBOEJzQyxRQUE5QixFQUF3Q29MLEtBQXhDLEVBQStDbU0sYUFBL0MsRUFDUDtBQUNFLE1BQUlULGdCQUFnQixFQUFwQjtBQUNBLE1BQUcsQ0FBRSxpQkFBaUJVLElBQWpCLENBQXNCeFgsUUFBdEIsQ0FBTCxFQUNBO0FBQ0U4VyxvQkFBZ0JBLGdCQUFnQixnRkFBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUdwWixJQUFJakcsTUFBSixHQUFhLElBQWhCLEVBQ0E7QUFDRXFmLG9CQUFnQkEsZ0JBQWdCLDRDQUFoQztBQUNEO0FBQ0QsTUFBR3BaLElBQUlqRyxNQUFKLEdBQWEsRUFBaEIsRUFDQTtBQUNFcWYsb0JBQWdCQSxnQkFBZ0IsNkNBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJVyxtQkFBbUIsQ0FBQy9aLElBQUkzRixLQUFKLENBQVUsMEJBQVYsS0FBdUMsRUFBeEMsRUFBNENOLE1BQW5FO0FBQ0EsTUFBSWdnQixtQkFBaUIvWixJQUFJakcsTUFBdEIsR0FBZ0MsSUFBbkMsRUFDQTtBQUNFcWYsb0JBQWdCQSxnQkFBZ0Isd0dBQWhDO0FBQ0Q7QUFDRCxNQUFHLCtCQUErQlUsSUFBL0IsQ0FBb0M5WixHQUFwQyxDQUFILEVBQ0E7QUFDRW9aLG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUEvSixDQUFVLElBQVYsRUFBZ0J3SyxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ1Qsb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7QUFDRCxTQUFPQSxhQUFQO0FBQ0QsQyIsImZpbGUiOiJwc2lwcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFmZjFmZTg3ZjY0NTJhNzY2NGQxIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2hzcHJlZChyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgaHNwcmVkX3RhYmxlID0gJzxiciAvPjx0YWJsZT48dHI+PHRkIGJnY29sb3I9XCIjZmYwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7SG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1Ib3RzcG90IFJlc2lkdWU8L3RkPjwvdHI+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dHI+PHRkIGJnY29sb3I9XCIjMDAwMGZmXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7Tm9uLWludGVyZmFjZSByZXNpZHVlPC90ZD48L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgaHNwcmVkX3RhYmxlICs9ICc8dGFibGU+PHRyPjx0aD5DaGFpbi9SZXNpZHVlPC90aD48dGg+UmVzaWR1ZSBJZGVudGl0eTwvdGg+PHRoPlNjb3JlPC90aD4nO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA9PT0gMyl7XG4gICAgICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQ+JytlbnRyaWVzWzBdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+PHRkPicrZW50cmllc1syXSsnPC90ZD48L3RyPic7XG4gICAgfVxuICB9KTtcbiAgaHNwcmVkX3RhYmxlICs9ICc8dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIGhzcHJlZF90YWJsZSk7XG59XG5cbi8vIHBhcnNlIHRoZSBzbWFsbCBtZXRzaXRlIG91dHB1dCB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21ldHNpdGUocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IG1ldHNpdGVfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtNZXRhbCBCaW5kaW5nIENvbnRhY3Q8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0NoYWluIG5vdCBwcmVkaWN0ZWQ8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO1ByZWRpY3RlZCBjaGFpbjwvdGQ+PC90cj48L3RhYmxlPjxiciAvPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPlJlc2lkdWUgTnVtYmVyPC90aD48dGg+UmF3IE5ldXJhbCBOZXR3b3JrIFNjb3JlPC90aD48dGg+UmVzaWR1ZTwvdGg+JztcbiAgbGV0IGhpdF9yZWdleCA9IC9cXGQrXFxzLis/XFxzXFx3ezN9XFxkKy9nO1xuICBsZXQgaGl0X21hdGNoZXMgPSBmaWxlLm1hdGNoKGhpdF9yZWdleCk7XG4gIGlmKGhpdF9tYXRjaGVzKVxuICB7XG4gICAgaGl0X21hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzLyk7XG4gICAgICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH0pO1xuICB9XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG1ldHNpdGVfdGFibGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKXtcblxuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGJwX2RhdGEgPSBbXTtcbiAgbGV0IG1mX2RhdGEgPSBbXTtcbiAgbGV0IGNjX2RhdGEgPSBbXTtcbiAgbGV0IHRhYmxlX2RhdGEgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoJyMnKSl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoIDwgNCl7cmV0dXJuO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQlAnKXticF9kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdDQycpe2NjX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ01GJyl7bWZfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgfSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkJpb2xvZ2ljYWwgUHJvY2VzcyBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgYnBfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgdGFibGVfZGF0YSArPSAnVGhlc2UgcHJlZGljdGlvbiB0ZXJtcyByZXByZXNlbnQgdGVybXMgcHJlZGljdGVkIHdoZXJlIFNWTSB0cmFpbmluZyBpbmNsdWRlcyBhc3NpZ25lZCBHTyB0ZXJtcyBhY3Jvc3MgYWxsIGV2aWRlbmNlIGNvZGUgdHlwZXMuIFNWTSByZWxpYWJpbGl0eSBpcyByZWdhcmRlZCBhcyBIaWdoIChIKSB3aGVuIE1DQywgc2Vuc2l0aXZpdHksIHNwZWNpZmljaXR5IGFuZCBwcmVjaXNpb24gYXJlIGpvaW50bHkgYWJvdmUgYSBnaXZlbiB0aHJlc2hvbGQuIG90aGVyd2lzZSBSZWxpYWJpbGl0eSBpcyBpbmRpY2F0ZWQgYXMgTG93IChMKS4gPGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG59XG5cbmZ1bmN0aW9uIHNldF9hYW5vcm0oKXtcbiAgbGV0IGhBQV9ub3JtID0ge307XG4gIGhBQV9ub3JtLkEgPSB7IHZhbDogMC4wNzE3ODMyNDgwMDYzMDksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjczNjc2NjE1MjQyNzV9O1xuICBoQUFfbm9ybS5WID0geyB2YWw6IDAuMDU5NjI0NTk1MzY5OTAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMzc3NzkxNTI4NzQ1fTtcbiAgaEFBX25vcm0uWSA9IHsgdmFsOiAwLjAyNjA3NTA2ODI0MDQzNyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNDgyMjQ3MTUzMTM3OX07XG4gIGhBQV9ub3JtLlcgPSB7IHZhbDogMC4wMTQxNjYwMDI2MTI3NzEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTA0NzE4MzU4MDE5OTZ9O1xuICBoQUFfbm9ybS5UID0geyB2YWw6IDAuMDUyNTkzNTgyOTcyNzE0LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMDk0NzkzOTY0NTk3fTtcbiAgaEFBX25vcm0uUyA9IHsgdmFsOiAwLjA4MjEyMzI0MTMzMjA5OSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyODY4NzU2NjA4MTUxMn07XG4gIGhBQV9ub3JtLlAgPSB7IHZhbDogMC4wNjU1NTc1MzEzMjIyNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzQyMzkzOTg0OTY3MzZ9O1xuICBoQUFfbm9ybS5GID0geyB2YWw6IDAuMDM3MTAzOTk0OTY5MDAyLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NTQzNDIzMTM5MTg2fTtcbiAgaEFBX25vcm0uTSA9IHsgdmFsOiAwLjAyMjU2MjgxODE4Mzk1NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMTMyMTAzOTY2MjQ4MX07XG4gIGhBQV9ub3JtLksgPSB7IHZhbDogMC4wNTQ4MzM5NzkyNjkxODUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjkyNjQwODM2NjcxNTd9O1xuICBoQUFfbm9ybS5MID0geyB2YWw6IDAuMTAwMTA1OTE1NzU5MDYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAyNzY4MDg1MTkwMDl9O1xuICBoQUFfbm9ybS5JID0geyB2YWw6IDAuMDQyMDM0NTI2MDQwNDY3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODI2ODQ5MjYyNDk1fTtcbiAgaEFBX25vcm0uSCA9IHsgdmFsOiAwLjAyNzE0MTQwMzUzNzU5OCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNTUwNTY2Mzc4OTg1fTtcbiAgaEFBX25vcm0uRyA9IHsgdmFsOiAwLjA2OTE3OTgyMDEwNDUzNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDA4NzU2MjA1NzMyOH07XG4gIGhBQV9ub3JtLlEgPSB7IHZhbDogMC4wNjU5MjA1NjE5MzE4MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAxMDMwOTEwMDgzNjZ9O1xuICBoQUFfbm9ybS5FID0geyB2YWw6IDAuMDQ2NDc4NDYyMjU4MzgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTk5NDYyNjk0NjE3MzZ9O1xuICBoQUFfbm9ybS5DID0geyB2YWw6IDAuMDI0OTA4NTUxODcyMDU2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODIyOTA5NTg5NTA0fTtcbiAgaEFBX25vcm0uRCA9IHsgdmFsOiAwLjA0NDMzNzkwNDcyNjA0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODQzNjY3NzI1NjcyNn07XG4gIGhBQV9ub3JtLk4gPSB7IHZhbDogMC4wMzM1MDcwMjA5ODcwMzMsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTY1MzYwMjIyODgyMDR9O1xuICBoQUFfbm9ybS5SID0geyB2YWw6IDAuMDU5NzQwNDY5MDMxMTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjUxNjU5OTQ3NzMzODR9O1xuICByZXR1cm4oaEFBX25vcm0pO1xufVxuXG5mdW5jdGlvbiBzZXRfZm5vcm0oKXtcbiAgbGV0IGhGX25vcm0gPSB7fTtcbiAgaEZfbm9ybS5oeWRyb3Bob2JpY2l0eSA9IHt2YWw6IC0wLjM0ODc2ODI4MDgwMTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMC43NTU1OTE1Mjc2OTc5OX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgcG9zaXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjQ1NzcxNzQ2Njk0OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMy41NjcxMzMzNDExMzl9O1xuICBoRl9ub3JtWydhbGlwaGF0aWMgaW5kZXgnXSA9IHt2YWw6IDc5LjkxMTU0OTMxOTA5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi43ODc2MTc5Nzg4Mjd9O1xuICBoRl9ub3JtWydpc29lbGVjdHJpYyBwb2ludCddID0ge3ZhbDogNy42MTAyMDQ2MzgzNjAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMS45NzE2MTExMDIwMDg4fTtcbiAgaEZfbm9ybVsnbW9sZWN1bGFyIHdlaWdodCddID0ge3ZhbDogNDg2NjguNDEyODM5OTYxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzNzgzOC4zMjQ4OTU5Njl9O1xuICBoRl9ub3JtLmNoYXJnZSA9IHt2YWw6IDUuMDk5MTc2MzA1NzYwNCxcbiAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi44Mzg2MzY1OTAyNX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgbmVnYXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjAyNjE5MDEyODE3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogNC4wMjA2NjMxNjgwOTI2fTtcbiAgaEZfbm9ybVsnbW9sYXIgZXh0aW5jdGlvbiBjb2VmZmljaWVudCddID0ge3ZhbDogNDY0NzUuMjkzOTIzOTI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzOTI5OS4zOTk4NDg4MjN9O1xuICByZXR1cm4oaEZfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIGdldF9hYV9jb2xvcih2YWwpe1xuICAgIGxldCBhYl92YWwgPSBNYXRoLmFicyh2YWwpO1xuICAgIGlmKGFiX3ZhbCA+PSAyLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjFwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAyLjI0KXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMnBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjJuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmNXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjVuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuNjQ1ICkge1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxMHBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjEwblwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJwbGFpblwiO1xufVxuXG4vL3BhcnNlIHRoZSBmZnByZWQgZmVhdGNmbyBmZWF0dXJlcyBmaWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IFNGX2RhdGEgPSB7fTtcbiAgbGV0IEFBX2RhdGEgPSB7fTtcbiAgbGV0IGhGX25vcm0gPXNldF9mbm9ybSgpO1xuICBsZXQgaEFBX25vcm09c2V0X2Fhbm9ybSgpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIkFBXCIpKXtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBBQV9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiU0ZcIikpXG4gICAge1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIFNGX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYnVpbGQgaHRtbCB0YWJsZXMgZm9yIHRoZSBmZWF0dXJlIGRhdGFcbiAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICBsZXQgZ2xvYmFsX2ZlYXR1cmVzID0gcmFjdGl2ZS5nZXQoJ2dsb2JhbF9mZWF0dXJlcycpO1xuICBsZXQgZmVhdF90YWJsZSA9ICc8Yj5HbG9iYWwgRmVhdHVyZXM8L2I+PGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnR2xvYmFsIGZlYXR1cmVzIGFyZSBjYWxjdWxhdGVkIGRpcmVjdGx5IGZyb20gc2VxdWVuY2UuIExvY2FsaXNhdGlvbiB2YWx1ZXMgYXJlIHByZWRpY3RlZCBieSB0aGUgUHNvcnQgYWxnb3JpdGhtIGFuZCByZWZsZWN0IHRoZSByZWxhdGl2ZSBsaWtlbGlob29kIG9mIHRoZSBwcm90ZWluIG9jY3VweWluZyBkaWZmZXJlbnQgY2VsbHVsYXIgbG9jYWxpc2F0aW9ucy4gVGhlIGJpYXMgY29sdW1uIGlzIGhpZ2hsaWdodGVkIGFjY29yZGluZyB0byB0aGUgc2lnbmlmaWNhbmNlIG9mIHRoZSBmZWF0dXJlIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBaIHNjb3JlIG9mIHRoZSBmZWF0dXJlLjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkZlYXR1cmUgTmFtZTwvdGg+PHRoPlZhbHVlPC90aD48dGg+QmlhczwvdGg+PC90cj4nO1xuXG4gIE9iamVjdC5rZXlzKFNGX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmVfbmFtZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGlmKGZlYXR1cmVfbmFtZSBpbiBoRl9ub3JtKXtcbiAgICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvciggKHBhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS1oRl9ub3JtW2ZlYXR1cmVfbmFtZV0udmFsKSAvIGhGX25vcm1bZmVhdHVyZV9uYW1lXS5zZGUpO1xuICAgIH1cbiAgICBmZWF0X3RhYmxlICs9ICc8dHI+PHRkPicrZmVhdHVyZV9uYW1lKyc8L3RkPjx0ZD4nK3BhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS50b0ZpeGVkKDIpKyc8L3RkPjx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPjwvdHI+JztcbiAgfSk7XG4gIGZlYXRfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIGZlYXRfdGFibGUpO1xuXG4gIC8vYnVpbGQgaHRtbCB0YWJsZSBmb3IgdGhlIEFBIGRhdGFcbiAgbGV0IGFhX2NvbXBvc2l0aW9uID0gcmFjdGl2ZS5nZXQoJ2FhX2NvbXBvc2l0aW9uJyk7XG4gIGxldCBhYV90YWJsZSA9ICc8Yj5BbWlubyBBY2lkIENvbXBvc2l0aW9uIChwZXJjZW50YWdlcyk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZT48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aD4nK3Jlc2lkdWUrJzwvdGg+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKChwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pLWhBQV9ub3JtW3Jlc2lkdWVdLnZhbCkgLyBoQUFfbm9ybVtyZXNpZHVlXS5zZGUpO1xuICAgIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSBjbGFzcz1cInNpZ25pZmtleVwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIyXCIgY2VsbHNwYWNpbmc9XCIwXCI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjxiPmxvdzwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgYWxpZ249XCJyaWdodFwiPjxiPmhpZ2g8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMW5cIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJuXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1blwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBuXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD5wICZndDs9IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwcFwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1cFwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMnBcIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFwXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBhYV90YWJsZSk7XG59XG5cblxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJy0nKSlcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoWzFdKTtcbiAgICAgICAgbGV0IHNlZyA9IG1hdGNoWzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCByZWdpb25zID0gW1tdLCBdO1xuICAgICAgICByZWdpb25zWzBdWzBdID0gcGFyc2VJbnQoc2VnWzBdKTtcbiAgICAgICAgcmVnaW9uc1swXVsxXSA9IHBhcnNlSW50KHNlZ1sxXSk7XG4gICAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuKG1hdGNoWzFdKTtcbn1cblxuLy8gdGFrZSBhbmQgc3MyIChmaWxlKSBhbmQgcGFyc2UgdGhlIGRldGFpbHMgYW5kIHdyaXRlIHRoZSBuZXcgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBhbm5vdGF0aW9uc1tpXS5zcyA9IGVudHJpZXNbM107XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSCBEb21haW48L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIH1lbHNlIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJjYXRoX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5DQVRIIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJwZGJfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBcIjxoMz5ObyBnb29kIGhpdHMgZm91bmQuIEdVRVNTIGFuZCBMT1cgY29uZmlkZW5jZSBoaXRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmVzdWx0cyBmaWxlPC9oMz5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWRpY3Rpb25fcmVnZXggPSAvRG9tYWluXFxzQm91bmRhcnlcXHNsb2NhdGlvbnNcXHNwcmVkaWN0ZWRcXHNEUFM6XFxzKC4rKS87XG4gIGxldCBwcmVkaWN0aW9uX21hdGNoID0gIHByZWRpY3Rpb25fcmVnZXguZXhlYyhmaWxlKTtcbiAgaWYocHJlZGljdGlvbl9tYXRjaClcbiAge1xuICAgIGxldCBkZXRhaWxzID0gZmlsZS5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgZGV0YWlscyA9IGRldGFpbHMucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiPGg0PlwiK2RldGFpbHMrXCI8L2g0PlwiKTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgaWYocHJlZGljdGlvbl9tYXRjaFsxXS5pbmRleE9mKFwiLFwiKSlcbiAgICB7XG4gICAgICB2YWx1ZXMgPSBwcmVkaWN0aW9uX21hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaSl7XG4gICAgICAgIHZhbHVlc1tpXSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQocHJlZGljdGlvbl9tYXRjaFsxXSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xuICAgICAgYW5ub3RhdGlvbnNbdmFsdWVdLmRvbXByZWQgPSAnQic7XG4gICAgfSk7XG4gICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiTm8gUGFyc2VEUyBEb21haW4gYm91bmRhcmllcyBwcmVkaWN0ZWRcIik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMiLCJpbXBvcnQgeyBwcm9jZXNzX2ZpbGUgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfdGV4dCB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dfcGFuZWwodmFsdWUsIHJhY3RpdmUpXG57XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIHZhbHVlICk7XG59XG5cbi8vYmVmb3JlIGEgcmVzdWJtaXNzaW9uIGlzIHNlbnQgYWxsIHZhcmlhYmxlcyBhcmUgcmVzZXQgdG8gdGhlIHBhZ2UgZGVmYXVsdHNcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcyl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsICcnKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgnZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfaW5mbycsIG51bGwpO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fYW5uX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfbW9kZWwnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9ucycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfbW9kZWxfdXJpczonLCBbXSk7XG4gIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljOicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgndGRiX2ZpbGUnLCBudWxsKTtcblxuXG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJyxudWxsKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5zZXF1ZW5jZV9wbG90Jyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYucHNpcHJlZF9jYXJ0b29uJyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuY29tYl9wbG90Jyk7XG5cbiAgemlwID0gbmV3IEpTWmlwKCk7XG59XG5cbi8vVGFrZSBhIGNvdXBsZSBvZiB2YXJpYWJsZXMgYW5kIHByZXBhcmUgdGhlIGh0bWwgc3RyaW5ncyBmb3IgdGhlIGRvd25sb2FkcyBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpXG57XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKGRhdGEuam9iX25hbWUgPT09IGpvYl9uYW1lKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXSA9IHt9O1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIC8vRVhUUkEgUEFORUxTIEZPUiBTT01FIEpPQlMgVFlQRVM6XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkb21wcmVkJyAgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBnZW50aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmJpb3NlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBkb210aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmRvbXNlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQ9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZmZwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy90YWtlIHRoZSBkYXRhYmxvYiB3ZSd2ZSBnb3QgYW5kIGxvb3Agb3ZlciB0aGUgcmVzdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMpXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgcG5nX3JlZ2V4ID0gL1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IGRvbXNzZWFfcHJlZF9yZWdleCA9IC9cXC5wcmVkJC87XG4gIGxldCBkb21zc2VhX3JlZ2V4ID0gL1xcLmRvbXNzZWEkLztcbiAgbGV0IGRvbXNlcmZfcmVnZXggPSAvLitfKFxcZCspXyhcXGQrKS4qXFwucGRiLztcbiAgbGV0IGZmcHJlZF9zY2hfcmVnZXggPSAvLitfc2NoXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zdm1fcmVnZXggPSAvLitfY2FydG9vbl9tZW1zYXRfc3ZtXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zY2hlbWF0aWNfcmVnZXggPSAvLitfc2NoZW1hdGljXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF90bV9yZWdleCA9IC8uK190bXBcXC5wbmcvO1xuICBsZXQgZmZwcmVkX2ZlYXRjZmdfcmVnZXggPSAvXFwuZmVhdGNmZy87XG4gIGxldCBmZnByZWRfcHJlZHNfcmVnZXggPSAvXFwuZnVsbF9yYXcvO1xuICBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgbGV0IG1ldHNpdGVfdGFibGVfcmVnZXggPSAvXFwuTWV0cHJlZC87XG4gIGxldCBtZXRzaXRlX3BkYl9yZWdleCA9IC9cXC5NZXRQcmVkLztcbiAgbGV0IGhzcHJlZF9pbml0aWFsX3JlZ2V4ID0gL19pbml0aWFsXFwucGRiLztcbiAgbGV0IGhzcHJlZF9zZWNvbmRfcmVnZXggPSAvX3NlY29uZFxcLnBkYi87XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBsZXQgZG9tYWluX2NvdW50ID0gMDtcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBkb21zZXJmX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIC8vUHJlcGF0b3J5IGxvb3AgZm9yIGluZm9ybWF0aW9uIHRoYXQgaXMgbmVlZGVkIGJlZm9yZSByZXN1bHRzIHBhcnNpbmc6XG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwicGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fZ2VuYWxpZ25tZW50X2Fubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb25fZG9tJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJkZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImRnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gIC8vbWFpbiByZXN1bHRzIHBhcnNpbmcgbG9vcFxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL21lbXNhdCBhbmQgbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2dlbl9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIHtcbiAgICAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHBuZ19tYXRjaCA9IHBuZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwbmdfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BhcnNlZHMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tc3NlYScpXG4gICAge1xuICAgICAgbGV0IHByZWRfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBkb21zc2VhX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zc2VhX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIGZpbGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3J1bkJpb3NlcmYnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJylcbiAgICB7XG4gICAgICBsZXQgcHJlZHNfbWF0Y2ggPSBmZnByZWRfcHJlZHNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZHNfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdPIFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkcHJlZGljdGlvbnMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwbG90X3NlbGZfY29udGFjdF9tYXAnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3ZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgTWFwPC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCAnPGI+Q29udGFjdCBNYXA8L2I+PGJyIC8+PGltZyBoZWlnaHQ9XCI4MDBcIiB3aWR0aD1cIjgwMFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NvbnRhY3RfcHJlZGljdG9ycycpXG4gICAge1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgICAgICAgbGV0IGV2X21hdGNoID0gbWV0YXBzaWNvdl9ldl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGV2X21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZyZWVDb250YWN0IHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwc19tYXRjaCA9IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYocHNfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBTSUNPViBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2NfbWF0Y2ggPSBtZXRhcHNpY292X2NjbXByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihjY19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuY2NtcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNDTVBSRUQgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lICA9PT0gJ21ldGFwc2ljb3Zfc3RhZ2UyJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZXRwcmVkX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIGxldCB0YWJsZV9tYXRjaCA9IG1ldHNpdGVfdGFibGVfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgbGV0IHBkYl9tYXRjaCA9IG1ldHNpdGVfcGRiX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfdGltZVwiLCAnJyk7XG4gICAgICBpZih0YWJsZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZXRzaXRlJywgemlwLCByYWN0aXZlKTtcblxuICAgICAgfVxuICAgICAgaWYocGRiX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLnBkYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1ldHNpdGUgUERCPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNtZXRzaXRlX21vZGVsJywgZmFsc2UpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoc19wcmVkJylcbiAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiaHNwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5oc3ByZWQudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5IU1ByZWQgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdoc3ByZWQnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3BsaXRfcGRiX2ZpbGVzJylcbiAgICB7XG4gICAgICBsZXQgaW5pdGlhbF9tYXRjaCA9IGhzcHJlZF9pbml0aWFsX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBzZWNvbmRfbWF0Y2ggPSBoc3ByZWRfc2Vjb25kX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGluaXRpYWxfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLmluaXRpYWwgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Jbml0aWFsIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2luaXRpYWxfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZihzZWNvbmRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlY29uZCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9zZWNvbmRfcGRiJywgZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjaHNwcmVkX3NlY29uZF9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21ha2V0ZGInKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRkYl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJnZW50ZGJfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+VERCIEZpbGU8L2E+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCd0ZGJfZmlsZScsICc8aDM+PGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DbGljayBoZXJlIHRvIGRvd25sb2FkIHlvdXIgVERCIEZpbGU8L2E+PC9oMz4nKTtcbiAgICB9XG4gIH1cblxuICAvL1NldCBubyBmb3VuZCBzdGF0bWVudHMgZm9yIHNvbWUgam9icy5cbiAgaWYoISBtZW1wYWNrX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGgzPk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTwvaDM+Jyk7XG4gIH1cbiAgaWYoISBwc2lwcmVkX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJ05vICcram9iX25hbWVzLnBzaXByZWQrJyBkYXRhIGdlbmVyYXRlZCBmb3IgdGhpcyBqb2InKTtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoISBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyB0YWJsZSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgfVxuICBpZihkb21zZXJmX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheV9zdHJ1Y3R1cmUodXJpLCBjc3NfaWQsIGNhcnRvb24pXG57XG4gIGxldCBjYXJ0b29uX2NvbG9yID0gZnVuY3Rpb24oYXRvbSkge1xuICAgIGlmKGF0b20uc3MgPT09ICdoJyl7cmV0dXJuICcjZTM1M2UzJzt9XG4gICAgaWYoYXRvbS5zcyA9PT0gJ3MnKXtyZXR1cm4gJyNlNWRkNTUnO31cbiAgICByZXR1cm4oJ2dyZXknKTtcbiAgfTtcbiAgbGV0IGhvdHNwb3RfY29sb3IgPSBmdW5jdGlvbihhdG9tKXtcbiAgICBpZihhdG9tLmIgPT0gMS4wKXtyZXR1cm4gJ3JlZCc7fVxuICAgIGlmKGF0b20uYiA9PSAwLjUpe3JldHVybiAnYmxhY2snO31cbiAgICBpZihhdG9tLmIgPT0gNTApe3JldHVybiAnd2hpdGUnO31cbiAgICBpZihhdG9tLmIgPT0gMTAwKXtyZXR1cm4gJ3JlZCc7fVxuICAgIHJldHVybihcImJsdWVcIik7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgaWYoY2FydG9vbilcbiAge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBlbHNlIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBob3RzcG90X2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldHNpdGUnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2hzcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdnZW50ZGInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRkYi5oZWFkZXIpO1xuICAgIGNvbnNvbGUubG9nKGRvd25sb2Fkc19pbmZvLmdlbnRkYi50ZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50ZGIudGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9hZHZhbmNlZF9wYXJhbXMoKVxue1xuICBsZXQgb3B0aW9uc19kYXRhID0ge307XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfZV92YWx1ZV9jdXRvZmZcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gXCIwLjAxXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfcHNpYmxhc3RfaXRlcmF0aW9uc1wiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gNTtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpb3NlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF90eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZnByZWRfc2VsZWN0aW9uXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfdHlwZSA9IFwiaHVtYW5cIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IFwiQ2FcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gXCJDYVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9mcHJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBcIjVcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZStkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBcIkFCXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gIH1cblxuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9zZWFyY2hfdHlwZVwiKTtcbiAgLy8gb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYmFycmVsXCIpO1xuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF90ZXJtaW5hbFwiKTtcbiAgLy8gb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYm91bmRhcmllc1wiKTtcbiAgcmV0dXJuKG9wdGlvbnNfZGF0YSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYXJzZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZlYXRjZmcgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmZwcmVkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZXRzaXRlIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2hzcHJlZCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cbi8vZ2l2ZW4gYSB1cmwsIGh0dHAgcmVxdWVzdCB0eXBlIGFuZCBzb21lIGZvcm0gZGF0YSBtYWtlIGFuIGh0dHAgcmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfcmVxdWVzdCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcbiAgY29uc29sZS5sb2coJ1NlbmRpbmcgVVJJIHJlcXVlc3QnKTtcbiAgY29uc29sZS5sb2codXJsKTtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHZhciByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byBzZW5kIGRhdGFcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiU2VuZGluZyBKb2IgdG8gXCIrdXJsK1wiIEZhaWxlZC4gXCIrZXJyb3IucmVzcG9uc2VUZXh0K1wiLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2Ugd2FzIHVuYWJsZSB0byBwcm9jZXNzIHlvdXIgc3VibWlzc2lvbi4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7IHJldHVybiBudWxsO1xuICB9fSkucmVzcG9uc2VKU09OO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG4vL2dpdmVuIGEgam9iIG5hbWUgcHJlcCBhbGwgdGhlIGZvcm0gZWxlbWVudHMgYW5kIHNlbmQgYW4gaHR0cCByZXF1ZXN0IHRvIHRoZVxuLy9iYWNrZW5kXG5leHBvcnQgZnVuY3Rpb24gc2VuZF9qb2IocmFjdGl2ZSwgam9iX25hbWUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEpXG57XG4gIC8vYWxlcnQoc2VxKTtcbiAgY29uc29sZS5sb2coXCJTZW5kaW5nIGZvcm0gZGF0YVwiKTtcbiAgY29uc29sZS5sb2coam9iX25hbWUpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7XG4gIGZkLmFwcGVuZChcIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJleHRyYWN0X2Zhc3RhX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfZnByXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByKTtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdnZW50ZGInLCAnbWVtZW1iZWQnXS5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnaHNwcmVkJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbn1cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgc2V0X2FkdmFuY2VkX3BhcmFtcyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBjbGVhcl9zZXR0aW5ncyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBwcmVwYXJlX2Rvd25sb2Fkc19odG1sIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGhhbmRsZV9yZXN1bHRzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNldF9kb3dubG9hZHNfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2hvd19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5X3N0cnVjdHVyZSB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcbmxldCBqb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsIFwibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IHNlcV9qb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIixdO1xubGV0IHN0cnVjdF9qb2JfbGlzdCA9IFtcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWJtaXNzaW9uX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcbiAgICBtZXRzaXRlX3RhYmxlOiBudWxsLFxuICAgIG1ldHNpdGVfcGRiOiBudWxsLFxuICAgIGhzcHJlZF90YWJsZTogbnVsbCxcbiAgICBoc3ByZWRfaW5pdGlhbF9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3NlY29uZF9wZGI6IG51bGwsXG4gICAgdGRiX2ZpbGU6IG51bGwsXG5cbiAgICBtZXRhcHNpY292X2RhdGE6IG51bGwsXG4gICAgbWV0c2l0ZV9kYXRhOiBudWxsLFxuICAgIGhzcHJlZF9kYXRhOiBudWxsLFxuICAgIG1lbWVtYmVkX2RhdGE6IG51bGwsXG4gICAgZ2VudGRiX2RhdGE6IG51bGwsXG5cbiAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICBzZXF1ZW5jZTogJycsXG4gICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgZW1haWw6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGJhdGNoX3V1aWQ6IG51bGwsXG4gICAgLy9ob2xkIGFubm90YXRpb25zIHRoYXQgYXJlIHJlYWQgZnJvbSBkYXRhZmlsZXNcbiAgICBhbm5vdGF0aW9uczogbnVsbCxcbn07XG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfYnV0dG9uJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2pvYiddID0gam9iX25hbWUrJ19qb2InO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJ10gPSAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19pY29uJ10gPSBnZWFyX3N0cmluZztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfdGltZSddID0gJ0xvYWRpbmcgRGF0YSc7XG59KTtcbmluaXRpYWxpc2F0aW9uX2RhdGEuZ2VudGRiX2NoZWNrZWQgPSB0cnVlO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5nZW50ZGJfYWR2YW5jZWQgPSAxO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zZXF1ZW5jZV9mb3JtX3Zpc2libGUgPSAwO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zdHJ1Y3R1cmVfZm9ybV92aXNpYmxlID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuXG5cblxuXG4gICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIHNlcV90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgfVxuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgIGxldCBiYXRjaCA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgZG93bmxvYWRzX2luZm8gPSB7fTtcblxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnQ29tcGxldGUnKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyIHJlc3VsdHNcIik7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSBiYXRjaC5zdWJtaXNzaW9ucztcbiAgICAgIHN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gICAgICAgICAgaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcyk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgYWxlcnQoXCJQT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkXFxuXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhpcyBlcnJvciBtZXNzYWdlIGFuZCB5b3VyIGpvYiBJRFxcblwiK3N1Ym1pc3Npb25fbWVzc2FnZSk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxucmFjdGl2ZS5vbignc2hvd19iaW9zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19mZnByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2ZmcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZXRzaXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfaHNwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWVtZW1iZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHBhbmVsXG4vL1xucmFjdGl2ZS5vbiggJ3NlcXVlbmNlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIGZhbHNlKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgc2hvd19wYW5lbCgxLCByYWN0aXZlKTtcbn0pO1xuXG4vL3JlZ2lzdGVyIGxpc3RlbmVycyBmb3IgZWFjaCByZXN1bHRzIHBhbmVsXG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lLCBpKXtcbiAgY29uc29sZS5sb2coXCJhZGRpbmcgam9icyB3YXRjaGVyc1wiKTtcbiAgcmFjdGl2ZS5vbihqb2JfbmFtZSsnX2FjdGl2ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgIHNob3dfcGFuZWwoaSsyLCByYWN0aXZlKTtcbiAgICBpZihqb2JfbmFtZSA9PT0gXCJwc2lwcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSBcImRpc29wcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZXRzaXRlJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBtZXRfcGRiID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdoc3ByZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBpbml0aWFsX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKTtcbiAgICAgICAgbGV0IHNlY29uZF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX3NlY29uZF9wZGInKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoaW5pdGlhbF9wZGIsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHNlY29uZF9wZGIsICAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbiggJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgY29uc29sZS5sb2coXCJTVUJNSVNTSU9OIEFDVElWRVwiKTtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcblxuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgbGV0IHN0cnVjdF90eXBlID0gZmFsc2U7XG4gIGxldCBzZXFfdHlwZSA9IGZhbHNlO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHN0cnVjdF9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc3RydWN0X3R5cGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc2VxX2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzZXFfdHlwZSA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIC8vSEFORExFIEZGUFJFRCBKT0IgU0VMRUNUSU9OLlxuICBpZihjaGVja19zdGF0ZXMuYmlvc2VyZl9jaGVja2VkIHx8IGNoZWNrX3N0YXRlcy5kb21zZXJmX2NoZWNrZWQpXG4gIHtcbiAgICBsZXQgYmlvc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBsZXQgZG9tc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBpZihiaW9zX21vZGVsbGVyX3Rlc3QgfHwgZG9tc19tb2RlbGxlcl90ZXN0KVxuICAgIHtcbiAgICAgIHN1Ym1pdF9qb2IgPXRydWU7XG4gIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3QgcHJvdmlkZWQgYSB2YWxpZCBNT0RFTExFUiBrZXkuIENvbnRhY3QgdGhlIFNhbGkgbGFiIGZvciBhIE1PREVMTEVSIGxpY2VuY2UuXCIpO1xuICAgIH1cbiAgfVxuICBlbHNle1xuICAgIHN1Ym1pdF9qb2I9dHJ1ZTtcbiAgfVxuICBpZihzZXFfdHlwZSAmJiBzdHJ1Y3RfdHlwZSlcbiAge1xuICAgIGFsZXJ0KFwiWW91IGNhbiBub3Qgc3VibWl0IGJvdGggc2VxdWVuY2UgYW5kIHN0cnVjdHVyZSBhbmFseXNpcyBqb2JzXCIpO1xuICAgIHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgfVxuICBpZihzdWJtaXRfam9iKVxuICB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nXCIpO1xuICAgIGlmKHNlcV90eXBlKVxuICAgIHtcbiAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgfVxuICAgIGlmKHN0cnVjdF90eXBlKVxuICAgIHtcbiAgICAgIGxldCBwZGJGaWxlID0gbnVsbDtcbiAgICAgIGxldCBwZGJEYXRhID0gJyc7XG4gICAgICB0cnl7XG4gICAgICAgcGRiRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGRiRmlsZVwiKTtcbiAgICAgICBsZXQgZmlsZSA9IHBkYkZpbGUuZmlsZXNbMF07XG4gICAgICAgbGV0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcGRiRGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgcGRiRGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgcGRiRGF0YSA9IFwiXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHRydWUsIGZhbHNlKTtcbiAgLy93cml0ZSBuZXcgYW5ub3RhdGlvbiBkaWFncmFtXG4gIC8vc3VibWl0IHN1YnNlY3Rpb25cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0X21vZGVsbGVyX2tleShpbnB1dClcbntcbiAgaWYoaW5wdXQgPT09ICdNT0RFTElSQU5KRScpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgcmV0dXJuKGZhbHNlKTtcbn1cblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBsZXQgc2VxX3R5cGUgPSB0cnVlO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0YXBzaWNvdicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkaXNvcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtcGFjaycpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgaWYoc2VxX3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc2VxX2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKHN0cnVjdF90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3N0cnVjdF9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihlcnJvcl9tZXNzYWdlLmxlbmd0aCA+IDApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZm9ybV9lcnJvcicsIGVycm9yX21lc3NhZ2UpO1xuICAgIGFsZXJ0KFwiRk9STSBFUlJPUjpcIitlcnJvcl9tZXNzYWdlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2luaXRpYWxpc2UgdGhlIHBhZ2VcbiAgICBsZXQgcmVzcG9uc2UgPSB0cnVlO1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgbnVsbCApO1xuICAgIC8vUG9zdCB0aGUgam9icyBhbmQgaW50aWFsaXNlIHRoZSBhbm5vdGF0aW9ucyBmb3IgZWFjaCBqb2JcbiAgICAvL1dlIGFsc28gZG9uJ3QgcmVkdW5kYW50bHkgc2VuZCBleHRyYSBwc2lwcmVkIGV0Yy4uIGpvYnNcbiAgICAvL2J5dCBkb2luZyB0aGVzZSB0ZXN0IGluIGEgc3BlY2lmaWMgb3JkZXJcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoam9iX25hbWUrXCIsXCIpO1xuICAgICAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ19idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2Rpc29wcmVkJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdkb21wcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnYmlvc2VyZicgfHwgam9iX25hbWUgPT09ICdkb21zZXJmJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdtZXRhcHNpY292JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZ2VudGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBkb210aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAyICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9