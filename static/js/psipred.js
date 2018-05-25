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
  console.log(file);
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
    //if(atom.b == 1.0){return 'red';}
    //if(atom.b == 0.5){return 'black';}
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
        if (['metiste', 'hspred', 'maketdb', 'memembed'].includes(job_name)) {
          ractive.fire('poll_trigger', false);
        } else {
          active.fire('poll_trigger', true);
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
initialisation_data.hspred_checked = true;
initialisation_data.hspred_advanced = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNkODA3NWQyYjlhZTkwOTAwMmMiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2hzcHJlZCIsInJhY3RpdmUiLCJmaWxlIiwiaHNwcmVkX3RhYmxlIiwiY29uc29sZSIsImxvZyIsInNldCIsInBhcnNlX21ldHNpdGUiLCJtZXRzaXRlX3RhYmxlIiwiaGl0X3JlZ2V4IiwiaGl0X21hdGNoZXMiLCJtYXRjaCIsImZvckVhY2giLCJsaW5lIiwiaSIsImVudHJpZXMiLCJzcGxpdCIsInBhcnNlX2ZmcHJlZHMiLCJsaW5lcyIsImJwX2RhdGEiLCJtZl9kYXRhIiwiY2NfZGF0YSIsInRhYmxlX2RhdGEiLCJzdGFydHNXaXRoIiwibGVuZ3RoIiwicHVzaCIsImNsYXNzX2NvbG91ciIsInNldF9hYW5vcm0iLCJoQUFfbm9ybSIsIkEiLCJ2YWwiLCJzZGUiLCJWIiwiWSIsIlciLCJUIiwiUyIsIlAiLCJGIiwiTSIsIksiLCJMIiwiSSIsIkgiLCJHIiwiUSIsIkUiLCJDIiwiRCIsIk4iLCJSIiwic2V0X2Zub3JtIiwiaEZfbm9ybSIsImh5ZHJvcGhvYmljaXR5IiwiY2hhcmdlIiwiZ2V0X2FhX2NvbG9yIiwiYWJfdmFsIiwiTWF0aCIsImFicyIsInBhcnNlX2ZlYXRjZmciLCJTRl9kYXRhIiwiQUFfZGF0YSIsImNvbHVtbnMiLCJnbG9iYWxfZmVhdHVyZXMiLCJnZXQiLCJmZWF0X3RhYmxlIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJmZWF0dXJlX25hbWUiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImFhX2NvbXBvc2l0aW9uIiwiYWFfdGFibGUiLCJyZXNpZHVlIiwiZ2V0X21lbXNhdF9yYW5nZXMiLCJyZWdleCIsImRhdGEiLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwicmVnaW9uIiwicGFyc2VJbnQiLCJzZWciLCJwYXJzZV9zczIiLCJhbm5vdGF0aW9ucyIsInNoaWZ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsInNzIiwiYmlvZDMiLCJhbm5vdGF0aW9uR3JpZCIsInBhcmVudCIsIm1hcmdpbl9zY2FsZXIiLCJkZWJ1ZyIsImNvbnRhaW5lcl93aWR0aCIsIndpZHRoIiwiaGVpZ2h0IiwiY29udGFpbmVyX2hlaWdodCIsImFsZXJ0IiwicGFyc2VfcGJkYXQiLCJkaXNvcHJlZCIsInBhcnNlX2NvbWIiLCJwcmVjaXNpb24iLCJwb3MiLCJnZW5lcmljeHlMaW5lQ2hhcnQiLCJjaGFydFR5cGUiLCJ5X2N1dG9mZiIsInBhcnNlX21lbXNhdGRhdGEiLCJzZXEiLCJ0b3BvX3JlZ2lvbnMiLCJzaWduYWxfcmVnaW9ucyIsInJlZW50cmFudF9yZWdpb25zIiwidGVybWluYWwiLCJjb2lsX3R5cGUiLCJ0bXBfYW5ubyIsIkFycmF5IiwicHJldl9lbmQiLCJmaWxsIiwiYW5ubyIsIm1lbXNhdCIsInBhcnNlX3ByZXN1bHQiLCJ0eXBlIiwiYW5uX2xpc3QiLCJwc2V1ZG9fdGFibGUiLCJ0YWJsZV9oaXQiLCJ0b0xvd2VyQ2FzZSIsInBkYiIsInN1YnN0cmluZyIsImFsbiIsImFubiIsInBhcnNlX3BhcnNlZHMiLCJwcmVkaWN0aW9uX3JlZ2V4IiwicHJlZGljdGlvbl9tYXRjaCIsImRldGFpbHMiLCJyZXBsYWNlIiwidmFsdWVzIiwiaW5kZXhPZiIsInZhbHVlIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImhzcHJlZF9pbml0aWFsX3JlZ2V4IiwiaHNwcmVkX3NlY29uZF9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZG9tc2VyZl9yZXN1bHRfZm91bmQiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInBzaXByZWRfcmVzdWx0X2ZvdW5kIiwicGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJtZW1wYWNrIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJnZW50aHJlYWRlciIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtZXRhcHNpY292IiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJtZXRzaXRlIiwiaHNwcmVkIiwiaW5pdGlhbF9tYXRjaCIsInNlY29uZF9tYXRjaCIsImluaXRpYWwiLCJzZWNvbmQiLCJ1cmkiLCJjc3NfaWQiLCJjYXJ0b29uX2NvbG9yIiwiYXRvbSIsImhvdHNwb3RfY29sb3IiLCJlbGVtZW50IiwiJCIsImNvbmZpZyIsImJhY2tncm91bmRDb2xvciIsInZpZXdlciIsIiQzRG1vbCIsImNyZWF0ZVZpZXdlciIsImdldF90ZXh0IiwiYWRkTW9kZWwiLCJzZXRTdHlsZSIsImNvbG9yZnVuYyIsInpvb21UbyIsInJlbmRlciIsInpvb20iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNldF9hZHZhbmNlZF9wYXJhbXMiLCJvcHRpb25zX2RhdGEiLCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnIiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJiaW9zZXJmX21vZGVsbGVyX2tleSIsImRvbXNlcmZfbW9kZWxsZXJfa2V5IiwiZmZwcmVkX3R5cGUiLCJtZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluIiwiZXh0cmFjdF9mYXN0YV9jaGFpbiIsInNlZWRTaXRlRmluZF9jaGFpbiIsIm1ldHByZWRfd3JhcHBlcl9jaGFpbiIsInNlZWRTaXRlRmluZF9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9tZXRhbCIsIm1ldHByZWRfd3JhcHBlcl9mcHIiLCJoc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zIiwiaHNfcHJlZF9maXJzdF9jaGFpbiIsInNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiIsImhzX3ByZWRfc2Vjb25kX2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiIsInNlbmRfcmVxdWVzdCIsInVybCIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiYWpheCIsImNhY2hlIiwiY29udGVudFR5cGUiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJzZW5kX2pvYiIsImVtYWlsIiwic3VibWl0X3VybCIsInRpbWVzX3VybCIsIkJsb2IiLCJlIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlX2RhdGEiLCJ0aW1lcyIsImsiLCJmaXJlIiwiYWN0aXZlIiwiZ2V0X3ByZXZpb3VzX2RhdGEiLCJ1dWlkIiwic3VibWlzc2lvbl9yZXNwb25zZSIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc0luQXJyYXkiLCJhcnJheSIsImRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCIsInJlc2lkdWVzIiwicmVzIiwiZ2V0VXJsVmFycyIsInZhcnMiLCJwYXJ0cyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIm0iLCJrZXkiLCJkb2N1bWVudEVsZW1lbnQiLCJpbXBvcnRhbnQiLCJzdHlsZSIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwic2VxX2pvYl9saXN0Iiwic3RydWN0X2pvYl9saXN0IiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VibWlzc2lvbl92aXNpYmxlIiwicmVzdWx0c19wYW5lbF92aXNpYmxlIiwic3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZSIsImJpb3NlcmZfYWR2YW5jZWQiLCJkb21zZXJmX2FkdmFuY2VkIiwiZG9tcHJlZF9hZHZhbmNlZCIsImZmcHJlZF9hZHZhbmNlZCIsIm1ldHNpdGVfYWR2YW5jZWQiLCJoc3ByZWRfYWR2YW5jZWQiLCJtZW1lbWJhZF9hZHZhbmNlZCIsIm1vZGVsbGVyX2tleSIsImRvd25sb2FkX2xpbmtzIiwicHNpcHJlZF9ob3JpeiIsImRpc29fcHJlY2lzaW9uIiwibWVtc2F0c3ZtX3NjaGVtYXRpYyIsIm1lbXNhdHN2bV9jYXJ0b29uIiwicGdlbl90YWJsZSIsInBnZW5fYW5uX3NldCIsIm1lbXNhdHBhY2tfc2NoZW1hdGljIiwibWVtc2F0cGFja19jYXJ0b29uIiwiZ2VuX3RhYmxlIiwiZ2VuX2Fubl9zZXQiLCJwYXJzZWRzX2luZm8iLCJwYXJzZWRzX3BuZyIsImRnZW5fdGFibGUiLCJkZ2VuX2Fubl9zZXQiLCJiaW9zZXJmX21vZGVsIiwiZG9tc2VyZl9idXR0b25zIiwiZG9tc2VyZl9tb2RlbF91cmlzIiwiZmZwcmVkX2NhcnRvb24iLCJzY2hfc2NoZW1hdGljIiwiZnVuY3Rpb25fdGFibGVzIiwibWV0YXBzaWNvdl9tYXAiLCJtZXRzaXRlX3BkYiIsImhzcHJlZF9pbml0aWFsX3BkYiIsImhzcHJlZF9zZWNvbmRfcGRiIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJoc3ByZWRfY2hlY2tlZCIsIlJhY3RpdmUiLCJlbCIsInRlbXBsYXRlIiwidXVpZF9yZWdleCIsInV1aWRfbWF0Y2giLCJzZXFfb2JzZXJ2ZXIiLCJvYnNlcnZlIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluaXQiLCJkZWZlciIsInNlcV9sZW5ndGgiLCJzZXFfc3RhcnQiLCJzZXFfc3RvcCIsInNlcV90eXBlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiYXRjaCIsInN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsInN1Ym1pc3Npb25fbWVzc2FnZSIsImxhc3RfbWVzc2FnZSIsImNvbnRleHQiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiIsImJsb2IiLCJzYXZlQXMiLCJldmVudCIsImFkdiIsInNldHRpbmciLCJtZXRfcGRiIiwiaW5pdGlhbF9wZGIiLCJzZWNvbmRfcGRiIiwic3VibWl0X2pvYiIsInRvVXBwZXJDYXNlIiwiY2hlY2tfc3RhdGVzIiwic3RydWN0X3R5cGUiLCJiaW9zZXJmX2NoZWNrZWQiLCJkb21zZXJmX2NoZWNrZWQiLCJiaW9zX21vZGVsbGVyX3Rlc3QiLCJ0ZXN0X21vZGVsbGVyX2tleSIsImRvbXNfbW9kZWxsZXJfdGVzdCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwicGRiRmlsZSIsInBkYkRhdGEiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsInJlYWRBc1RleHQiLCJvbmxvYWQiLCJyZXN1bHQiLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJpbnB1dCIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJzd2FwRG9tc2VyZiIsInVyaV9udW1iZXIiLCJlcnJvcl9tZXNzYWdlIiwiam9iX3N0cmluZyIsImNoZWNrX2xpc3QiLCJ2ZXJpZnlfc2VxX2Zvcm0iLCJ2ZXJpZnlfc3RydWN0X2Zvcm0iLCJwc2lwcmVkX2NoZWNrZWQiLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9jaGVja2VkIiwic3RydWN0IiwiY2hlY2tlZF9hcnJheSIsInRlc3QiLCJudWNsZW90aWRlX2NvdW50Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVPLFNBQVNBLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCQyxJQUEvQixFQUNQO0FBQ0UsTUFBSUMsZUFBZSxnS0FBbkI7QUFDQUEsa0JBQWdCLHVKQUFoQjtBQUNBQSxrQkFBZ0IsdUtBQWhCO0FBQ0FBLGtCQUFnQiwwRUFBaEI7QUFDQUMsVUFBUUMsR0FBUixDQUFZSCxJQUFaO0FBQ0FDLGtCQUFnQixTQUFoQjtBQUNBRixVQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QkgsWUFBNUI7QUFDRDs7QUFFRDtBQUNPLFNBQVNJLGFBQVQsQ0FBdUJOLE9BQXZCLEVBQWdDQyxJQUFoQyxFQUNQO0FBQ0UsTUFBSU0sZ0JBQWdCLHNLQUFwQjtBQUNBQSxtQkFBaUIsdUpBQWpCO0FBQ0FBLG1CQUFpQixpS0FBakI7QUFDQUEsbUJBQWlCLHFGQUFqQjtBQUNBLE1BQUlDLFlBQVkscUJBQWhCO0FBQ0EsTUFBSUMsY0FBY1IsS0FBS1MsS0FBTCxDQUFXRixTQUFYLENBQWxCO0FBQ0EsTUFBR0MsV0FBSCxFQUNBO0FBQ0VBLGdCQUFZRSxPQUFaLENBQW9CLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUNuQyxVQUFJQyxVQUFVRixLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFkO0FBQ0FSLHVCQUFpQixhQUFXTyxRQUFRLENBQVIsQ0FBWCxHQUFzQixXQUF0QixHQUFrQ0EsUUFBUSxDQUFSLENBQWxDLEdBQTZDLFdBQTdDLEdBQXlEQSxRQUFRLENBQVIsQ0FBekQsR0FBb0UsWUFBckY7QUFDRCxLQUhEO0FBSUQ7QUFDRFAsbUJBQWlCLFNBQWpCO0FBQ0FQLFVBQVFLLEdBQVIsQ0FBWSxlQUFaLEVBQTZCRSxhQUE3QjtBQUNEOztBQUVNLFNBQVNTLGFBQVQsQ0FBdUJoQixPQUF2QixFQUFnQ0MsSUFBaEMsRUFBcUM7O0FBRTFDLE1BQUlnQixRQUFRaEIsS0FBS2MsS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBLE1BQUlHLFVBQVUsRUFBZDtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBLE1BQUlDLGFBQWEsRUFBakI7QUFDQUosUUFBTU4sT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFHRCxLQUFLVSxVQUFMLENBQWdCLEdBQWhCLENBQUgsRUFBd0I7QUFBQztBQUFRO0FBQ2pDLFFBQUlSLFVBQVVGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQSxRQUFHRCxRQUFRUyxNQUFSLEdBQWlCLENBQXBCLEVBQXNCO0FBQUM7QUFBUTtBQUMvQixRQUFHVCxRQUFRLENBQVIsTUFBZSxJQUFsQixFQUF1QjtBQUFDSSxjQUFRTSxJQUFSLENBQWFWLE9BQWI7QUFBdUI7QUFDL0MsUUFBR0EsUUFBUSxDQUFSLE1BQWUsSUFBbEIsRUFBdUI7QUFBQ00sY0FBUUksSUFBUixDQUFhVixPQUFiO0FBQXVCO0FBQy9DLFFBQUdBLFFBQVEsQ0FBUixNQUFlLElBQWxCLEVBQXVCO0FBQUNLLGNBQVFLLElBQVIsQ0FBYVYsT0FBYjtBQUF1QjtBQUNoRCxHQVBEOztBQVNBTyxnQkFBYyw2Q0FBZDtBQUNBQSxnQkFBYyxvRkFBZDtBQUNBSCxVQUFRUCxPQUFSLENBQWdCLFVBQVNHLE9BQVQsRUFBa0JELENBQWxCLEVBQW9CO0FBQ2xDLFFBQUlZLGVBQWUsTUFBbkI7QUFDQSxRQUFHWCxRQUFRLENBQVIsTUFBYSxHQUFoQixFQUFvQjtBQUFDVyxxQkFBZSxTQUFmO0FBQTBCO0FBQy9DSixrQkFBYyxnQkFBY0ksWUFBZCxHQUEyQixJQUF6QztBQUNBSixrQkFBYyxTQUFPUCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBTyxrQkFBYyxTQUFPUCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBTyxrQkFBYyxTQUFPUCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBTyxrQkFBYyxTQUFPUCxRQUFRLENBQVIsQ0FBUCxHQUFrQixPQUFoQztBQUNBTyxrQkFBYyxPQUFkO0FBRUQsR0FWRDtBQVdBQSxnQkFBYyxnQkFBZDtBQUNBckIsVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCZ0IsVUFBL0I7O0FBRUFBLGdCQUFjLDZDQUFkO0FBQ0FBLGdCQUFjLG9GQUFkO0FBQ0FGLFVBQVFSLE9BQVIsQ0FBZ0IsVUFBU0csT0FBVCxFQUFrQkQsQ0FBbEIsRUFBb0I7QUFDbEMsUUFBSVksZUFBZSxNQUFuQjtBQUNBLFFBQUdYLFFBQVEsQ0FBUixNQUFhLEdBQWhCLEVBQW9CO0FBQUNXLHFCQUFlLFNBQWY7QUFBMEI7QUFDL0NKLGtCQUFjLGdCQUFjSSxZQUFkLEdBQTJCLElBQXpDO0FBQ0FKLGtCQUFjLFNBQU9QLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FPLGtCQUFjLFNBQU9QLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FPLGtCQUFjLFNBQU9QLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FPLGtCQUFjLFNBQU9QLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWhDO0FBQ0FPLGtCQUFjLE9BQWQ7QUFFRCxHQVZEO0FBV0FBLGdCQUFjLGdCQUFkO0FBQ0FyQixVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0JnQixVQUEvQjs7QUFFQUEsZ0JBQWMsNkNBQWQ7QUFDQUEsZ0JBQWMsb0ZBQWQ7QUFDQUQsVUFBUVQsT0FBUixDQUFnQixVQUFTRyxPQUFULEVBQWtCRCxDQUFsQixFQUFvQjtBQUNsQyxRQUFJWSxlQUFlLE1BQW5CO0FBQ0EsUUFBR1gsUUFBUSxDQUFSLE1BQWEsR0FBaEIsRUFBb0I7QUFBQ1cscUJBQWUsU0FBZjtBQUEwQjtBQUMvQ0osa0JBQWMsZ0JBQWNJLFlBQWQsR0FBMkIsSUFBekM7QUFDQUosa0JBQWMsU0FBT1AsUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQU8sa0JBQWMsU0FBT1AsUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQU8sa0JBQWMsU0FBT1AsUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQU8sa0JBQWMsU0FBT1AsUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBaEM7QUFDQU8sa0JBQWMsT0FBZDtBQUNELEdBVEQ7QUFVQUEsZ0JBQWMsZ0JBQWQ7QUFDQUEsZ0JBQWMsb1RBQWQ7QUFDQXJCLFVBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQmdCLFVBQS9CO0FBRUQ7O0FBRUQsU0FBU0ssVUFBVCxHQUFxQjtBQUNuQixNQUFJQyxXQUFXLEVBQWY7QUFDQUEsV0FBU0MsQ0FBVCxHQUFhLEVBQUVDLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNJLENBQVQsR0FBYSxFQUFFRixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTSyxDQUFULEdBQWEsRUFBRUgsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU00sQ0FBVCxHQUFhLEVBQUVKLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNPLENBQVQsR0FBYSxFQUFFTCxLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTUSxDQUFULEdBQWEsRUFBRU4sS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1MsQ0FBVCxHQUFhLEVBQUVQLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNVLENBQVQsR0FBYSxFQUFFUixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTVyxDQUFULEdBQWEsRUFBRVQsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU1ksQ0FBVCxHQUFhLEVBQUVWLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxpQkFEUCxFQUFiO0FBRUFILFdBQVNhLENBQVQsR0FBYSxFQUFFWCxLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTYyxDQUFULEdBQWEsRUFBRVosS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2UsQ0FBVCxHQUFhLEVBQUViLEtBQUssaUJBQVA7QUFDRUMsU0FBSyxnQkFEUCxFQUFiO0FBRUFILFdBQVNnQixDQUFULEdBQWEsRUFBRWQsS0FBSyxpQkFBUDtBQUNFQyxTQUFLLGlCQURQLEVBQWI7QUFFQUgsV0FBU2lCLENBQVQsR0FBYSxFQUFFZixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTa0IsQ0FBVCxHQUFhLEVBQUVoQixLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTbUIsQ0FBVCxHQUFhLEVBQUVqQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTb0IsQ0FBVCxHQUFhLEVBQUVsQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTcUIsQ0FBVCxHQUFhLEVBQUVuQixLQUFLLGlCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBSCxXQUFTc0IsQ0FBVCxHQUFhLEVBQUVwQixLQUFLLGdCQUFQO0FBQ0VDLFNBQUssaUJBRFAsRUFBYjtBQUVBLFNBQU9ILFFBQVA7QUFDRDs7QUFFRCxTQUFTdUIsU0FBVCxHQUFvQjtBQUNsQixNQUFJQyxVQUFVLEVBQWQ7QUFDQUEsVUFBUUMsY0FBUixHQUF5QixFQUFDdkIsS0FBSyxDQUFDLGdCQUFQO0FBQ0NDLFNBQUssZ0JBRE4sRUFBekI7QUFFQXFCLFVBQVEsMkJBQVIsSUFBdUMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGNBRE4sRUFBdkM7QUFFQXFCLFVBQVEsaUJBQVIsSUFBNkIsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBN0I7QUFFQXFCLFVBQVEsbUJBQVIsSUFBK0IsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBL0I7QUFFQXFCLFVBQVEsa0JBQVIsSUFBOEIsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBOUI7QUFFQXFCLFVBQVFFLE1BQVIsR0FBaUIsRUFBQ3hCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGNBRE4sRUFBakI7QUFFQXFCLFVBQVEsMkJBQVIsSUFBdUMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBdkM7QUFFQXFCLFVBQVEsOEJBQVIsSUFBMEMsRUFBQ3RCLEtBQUssZUFBTjtBQUNDQyxTQUFLLGVBRE4sRUFBMUM7QUFFQSxTQUFPcUIsT0FBUDtBQUNEOztBQUVELFNBQVNHLFlBQVQsQ0FBc0J6QixHQUF0QixFQUEwQjtBQUN0QixNQUFJMEIsU0FBU0MsS0FBS0MsR0FBTCxDQUFTNUIsR0FBVCxDQUFiO0FBQ0EsTUFBRzBCLFVBQVUsSUFBYixFQUFtQjtBQUNmLFFBQUcxQixNQUFNLENBQVQsRUFBVztBQUFDLGFBQU8sVUFBUDtBQUFtQjtBQUMvQixXQUFPLFVBQVA7QUFDSCxHQUhELE1BSUssSUFBRzBCLFVBQVUsSUFBYixFQUFrQjtBQUNuQixRQUFHMUIsTUFBTSxDQUFULEVBQVc7QUFBQyxhQUFPLFVBQVA7QUFBbUI7QUFDL0IsV0FBTyxVQUFQO0FBQ0gsR0FISSxNQUlBLElBQUcwQixVQUFVLElBQWIsRUFBbUI7QUFDcEIsUUFBRzFCLE1BQU0sQ0FBVCxFQUFXO0FBQUMsYUFBTyxVQUFQO0FBQW1CO0FBQy9CLFdBQU8sVUFBUDtBQUNILEdBSEksTUFJQSxJQUFHMEIsVUFBVSxLQUFiLEVBQXFCO0FBQ3RCLFFBQUcxQixNQUFNLENBQVQsRUFBVztBQUFDLGFBQU8sV0FBUDtBQUFvQjtBQUNoQyxXQUFPLFdBQVA7QUFDSDtBQUNELFNBQU8sT0FBUDtBQUNIOztBQUVEO0FBQ08sU0FBUzZCLGFBQVQsQ0FBdUIxRCxPQUF2QixFQUFnQ0MsSUFBaEMsRUFDUDtBQUNFLE1BQUlnQixRQUFRaEIsS0FBS2MsS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBLE1BQUk0QyxVQUFVLEVBQWQ7QUFDQSxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJVCxVQUFTRCxXQUFiO0FBQ0EsTUFBSXZCLFdBQVNELFlBQWI7QUFDQVQsUUFBTU4sT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QixRQUFHRCxLQUFLVSxVQUFMLENBQWdCLElBQWhCLENBQUgsRUFBeUI7QUFDdkIsVUFBSXVDLFVBQVVqRCxLQUFLRyxLQUFMLENBQVcsSUFBWCxDQUFkO0FBQ0E2QyxjQUFRQyxRQUFRLENBQVIsQ0FBUixJQUFzQkEsUUFBUSxDQUFSLENBQXRCO0FBQ0Q7QUFDRCxRQUFHakQsS0FBS1UsVUFBTCxDQUFnQixJQUFoQixDQUFILEVBQ0E7QUFDRSxVQUFJdUMsVUFBVWpELEtBQUtHLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQTRDLGNBQVFFLFFBQVEsQ0FBUixDQUFSLElBQXNCQSxRQUFRLENBQVIsQ0FBdEI7QUFDRDtBQUNGLEdBVkQ7O0FBWUE7QUFDQSxNQUFJcEMsZUFBZSxFQUFuQjtBQUNBLE1BQUlxQyxrQkFBa0I5RCxRQUFRK0QsR0FBUixDQUFZLGlCQUFaLENBQXRCO0FBQ0EsTUFBSUMsYUFBYSw4QkFBakI7QUFDQUEsZ0JBQWMsZ1ZBQWQ7QUFDQUEsZ0JBQWMsa0VBQWQ7O0FBRUFDLFNBQU9DLElBQVAsQ0FBWVAsT0FBWixFQUFxQlEsSUFBckIsR0FBNEJ4RCxPQUE1QixDQUFvQyxVQUFTeUQsWUFBVCxFQUFzQjtBQUN4RCxRQUFJM0MsZUFBZSxFQUFuQjtBQUNBLFFBQUcyQyxnQkFBZ0JqQixPQUFuQixFQUEyQjtBQUN6QjFCLHFCQUFlNkIsYUFBYyxDQUFDZSxXQUFXVixRQUFRUyxZQUFSLENBQVgsSUFBa0NqQixRQUFRaUIsWUFBUixFQUFzQnZDLEdBQXpELElBQWdFc0IsUUFBUWlCLFlBQVIsRUFBc0J0QyxHQUFwRyxDQUFmO0FBQ0Q7QUFDRGtDLGtCQUFjLGFBQVdJLFlBQVgsR0FBd0IsV0FBeEIsR0FBb0NDLFdBQVdWLFFBQVFTLFlBQVIsQ0FBWCxFQUFrQ0UsT0FBbEMsQ0FBMEMsQ0FBMUMsQ0FBcEMsR0FBaUYsa0JBQWpGLEdBQW9HN0MsWUFBcEcsR0FBaUgsZ0NBQS9IO0FBQ0QsR0FORDtBQU9BdUMsZ0JBQWMsVUFBZDtBQUNBaEUsVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCMkQsVUFBL0I7O0FBRUE7QUFDQSxNQUFJTyxpQkFBaUJ2RSxRQUFRK0QsR0FBUixDQUFZLGdCQUFaLENBQXJCO0FBQ0EsTUFBSVMsV0FBVyxtREFBZjtBQUNBQSxjQUFZLGFBQVo7QUFDQVAsU0FBT0MsSUFBUCxDQUFZTixPQUFaLEVBQXFCTyxJQUFyQixHQUE0QnhELE9BQTVCLENBQW9DLFVBQVM4RCxPQUFULEVBQWlCO0FBQ25ERCxnQkFBWSxTQUFPQyxPQUFQLEdBQWUsT0FBM0I7QUFDRCxHQUZEO0FBR0FELGNBQVksV0FBWjtBQUNBUCxTQUFPQyxJQUFQLENBQVlOLE9BQVosRUFBcUJPLElBQXJCLEdBQTRCeEQsT0FBNUIsQ0FBb0MsVUFBUzhELE9BQVQsRUFBaUI7QUFDbkQsUUFBSWhELGVBQWUsRUFBbkI7QUFDQUEsbUJBQWU2QixhQUFhLENBQUNlLFdBQVdULFFBQVFhLE9BQVIsQ0FBWCxJQUE2QjlDLFNBQVM4QyxPQUFULEVBQWtCNUMsR0FBaEQsSUFBdURGLFNBQVM4QyxPQUFULEVBQWtCM0MsR0FBdEYsQ0FBZjtBQUNBMEMsZ0JBQVksZ0JBQWMvQyxZQUFkLEdBQTJCLElBQTNCLEdBQWdDLENBQUM0QyxXQUFXVCxRQUFRYSxPQUFSLENBQVgsSUFBNkIsR0FBOUIsRUFBbUNILE9BQW5DLENBQTJDLENBQTNDLENBQWhDLEdBQThFLE9BQTFGO0FBQ0QsR0FKRDtBQUtBRSxjQUFZLHFCQUFaO0FBQ0FBLGNBQVksK0JBQVo7QUFDQUEsY0FBWSwwRUFBWjtBQUNBQSxjQUFZLE1BQVo7QUFDQUEsY0FBWSxxQkFBWjtBQUNBQSxjQUFZLDZCQUFaO0FBQ0FBLGNBQVksb0NBQVo7QUFDQUEsY0FBWSxPQUFaO0FBQ0FBLGNBQVksTUFBWjtBQUNBQSxjQUFZLFdBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHNCQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSx1Q0FBWjtBQUNBQSxjQUFZLHVDQUFaO0FBQ0FBLGNBQVksdUNBQVo7QUFDQUEsY0FBWSxXQUFaO0FBQ0FBLGNBQVksT0FBWjtBQUNBQSxjQUFZLE1BQVo7QUFDQUEsY0FBWSxrSEFBWjtBQUNBQSxjQUFZLE9BQVo7QUFDQUEsY0FBWSxVQUFaO0FBQ0F4RSxVQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEJtRSxRQUE5QjtBQUNEOztBQUdEO0FBQ08sU0FBU0UsaUJBQVQsQ0FBMkJDLEtBQTNCLEVBQWtDQyxJQUFsQyxFQUNQO0FBQ0ksTUFBSWxFLFFBQVFpRSxNQUFNRSxJQUFOLENBQVdELElBQVgsQ0FBWjtBQUNBLE1BQUdsRSxNQUFNLENBQU4sRUFBU29FLFFBQVQsQ0FBa0IsR0FBbEIsQ0FBSCxFQUNBO0FBQ0UsUUFBSUMsVUFBVXJFLE1BQU0sQ0FBTixFQUFTSyxLQUFULENBQWUsR0FBZixDQUFkO0FBQ0FnRSxZQUFRcEUsT0FBUixDQUFnQixVQUFTcUUsTUFBVCxFQUFpQm5FLENBQWpCLEVBQW1CO0FBQ2pDa0UsY0FBUWxFLENBQVIsSUFBYW1FLE9BQU9qRSxLQUFQLENBQWEsR0FBYixDQUFiO0FBQ0FnRSxjQUFRbEUsQ0FBUixFQUFXLENBQVgsSUFBZ0JvRSxTQUFTRixRQUFRbEUsQ0FBUixFQUFXLENBQVgsQ0FBVCxDQUFoQjtBQUNBa0UsY0FBUWxFLENBQVIsRUFBVyxDQUFYLElBQWdCb0UsU0FBU0YsUUFBUWxFLENBQVIsRUFBVyxDQUFYLENBQVQsQ0FBaEI7QUFDRCxLQUpEO0FBS0EsV0FBT2tFLE9BQVA7QUFDRCxHQVRELE1BVUssSUFBR3JFLE1BQU0sQ0FBTixFQUFTb0UsUUFBVCxDQUFrQixHQUFsQixDQUFILEVBQ0w7QUFDSTtBQUNBLFFBQUlJLE1BQU14RSxNQUFNLENBQU4sRUFBU0ssS0FBVCxDQUFlLEdBQWYsQ0FBVjtBQUNBLFFBQUlnRSxVQUFVLENBQUMsRUFBRCxDQUFkO0FBQ0FBLFlBQVEsQ0FBUixFQUFXLENBQVgsSUFBZ0JFLFNBQVNDLElBQUksQ0FBSixDQUFULENBQWhCO0FBQ0FILFlBQVEsQ0FBUixFQUFXLENBQVgsSUFBZ0JFLFNBQVNDLElBQUksQ0FBSixDQUFULENBQWhCO0FBQ0EsV0FBT0gsT0FBUDtBQUNIO0FBQ0QsU0FBT3JFLE1BQU0sQ0FBTixDQUFQO0FBQ0g7O0FBRUQ7QUFDTyxTQUFTeUUsU0FBVCxDQUFtQm5GLE9BQW5CLEVBQTRCQyxJQUE1QixFQUNQO0FBQ0ksTUFBSW1GLGNBQWNwRixRQUFRK0QsR0FBUixDQUFZLGFBQVosQ0FBbEI7QUFDQSxNQUFJOUMsUUFBUWhCLEtBQUtjLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQUUsUUFBTW9FLEtBQU47QUFDQXBFLFVBQVFBLE1BQU1xRSxNQUFOLENBQWFDLE9BQWIsQ0FBUjtBQUNBLE1BQUdILFlBQVk3RCxNQUFaLElBQXNCTixNQUFNTSxNQUEvQixFQUNBO0FBQ0VOLFVBQU1OLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsVUFBSUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBcUUsa0JBQVl2RSxDQUFaLEVBQWUyRSxFQUFmLEdBQW9CMUUsUUFBUSxDQUFSLENBQXBCO0FBQ0QsS0FIRDtBQUlBZCxZQUFRSyxHQUFSLENBQVksYUFBWixFQUEyQitFLFdBQTNCO0FBQ0FLLFVBQU1DLGNBQU4sQ0FBcUJOLFdBQXJCLEVBQWtDLEVBQUNPLFFBQVEsbUJBQVQsRUFBOEJDLGVBQWUsQ0FBN0MsRUFBZ0RDLE9BQU8sS0FBdkQsRUFBOERDLGlCQUFpQixHQUEvRSxFQUFvRkMsT0FBTyxHQUEzRixFQUFnR0MsUUFBUSxHQUF4RyxFQUE2R0Msa0JBQWtCLEdBQS9ILEVBQWxDO0FBQ0QsR0FSRCxNQVVBO0FBQ0VDLFVBQU0scURBQU47QUFDRDtBQUNELFNBQU9kLFdBQVA7QUFDSDs7QUFFRDtBQUNPLFNBQVNlLFdBQVQsQ0FBcUJuRyxPQUFyQixFQUE4QkMsSUFBOUIsRUFDUDtBQUNJLE1BQUltRixjQUFjcEYsUUFBUStELEdBQVIsQ0FBWSxhQUFaLENBQWxCO0FBQ0EsTUFBSTlDLFFBQVFoQixLQUFLYyxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0FFLFFBQU1vRSxLQUFOLEdBQWVwRSxNQUFNb0UsS0FBTixHQUFlcEUsTUFBTW9FLEtBQU4sR0FBZXBFLE1BQU1vRSxLQUFOLEdBQWVwRSxNQUFNb0UsS0FBTjtBQUM1RHBFLFVBQVFBLE1BQU1xRSxNQUFOLENBQWFDLE9BQWIsQ0FBUjtBQUNBLE1BQUdILFlBQVk3RCxNQUFaLElBQXNCTixNQUFNTSxNQUEvQixFQUNBO0FBQ0VOLFVBQU1OLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsVUFBSUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXLEtBQVgsQ0FBZDtBQUNBLFVBQUdELFFBQVEsQ0FBUixNQUFlLEdBQWxCLEVBQXNCO0FBQUNzRSxvQkFBWXZFLENBQVosRUFBZXVGLFFBQWYsR0FBMEIsR0FBMUI7QUFBK0I7QUFDdEQsVUFBR3RGLFFBQVEsQ0FBUixNQUFlLEdBQWxCLEVBQXNCO0FBQUNzRSxvQkFBWXZFLENBQVosRUFBZXVGLFFBQWYsR0FBMEIsSUFBMUI7QUFBZ0M7QUFDeEQsS0FKRDtBQUtBcEcsWUFBUUssR0FBUixDQUFZLGFBQVosRUFBMkIrRSxXQUEzQjtBQUNBSyxVQUFNQyxjQUFOLENBQXFCTixXQUFyQixFQUFrQyxFQUFDTyxRQUFRLG1CQUFULEVBQThCQyxlQUFlLENBQTdDLEVBQWdEQyxPQUFPLEtBQXZELEVBQThEQyxpQkFBaUIsR0FBL0UsRUFBb0ZDLE9BQU8sR0FBM0YsRUFBZ0dDLFFBQVEsR0FBeEcsRUFBNkdDLGtCQUFrQixHQUEvSCxFQUFsQztBQUNEO0FBQ0o7O0FBRUQ7QUFDTyxTQUFTSSxVQUFULENBQW9CckcsT0FBcEIsRUFBNkJDLElBQTdCLEVBQ1A7QUFDRSxNQUFJcUcsWUFBWSxFQUFoQjtBQUNBLE1BQUlyRixRQUFRaEIsS0FBS2MsS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBRSxRQUFNb0UsS0FBTixHQUFlcEUsTUFBTW9FLEtBQU4sR0FBZXBFLE1BQU1vRSxLQUFOO0FBQzlCcEUsVUFBUUEsTUFBTXFFLE1BQU4sQ0FBYUMsT0FBYixDQUFSO0FBQ0F0RSxRQUFNTixPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFlQyxDQUFmLEVBQWlCO0FBQzdCLFFBQUlDLFVBQVVGLEtBQUtHLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQXVGLGNBQVV6RixDQUFWLElBQWUsRUFBZjtBQUNBeUYsY0FBVXpGLENBQVYsRUFBYTBGLEdBQWIsR0FBbUJ6RixRQUFRLENBQVIsQ0FBbkI7QUFDQXdGLGNBQVV6RixDQUFWLEVBQWF5RixTQUFiLEdBQXlCeEYsUUFBUSxDQUFSLENBQXpCO0FBQ0QsR0FMRDtBQU1BZCxVQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEJpRyxTQUE5QjtBQUNBYixRQUFNZSxrQkFBTixDQUF5QkYsU0FBekIsRUFBb0MsS0FBcEMsRUFBMkMsQ0FBQyxXQUFELENBQTNDLEVBQTBELENBQUMsT0FBRCxDQUExRCxFQUFzRSxhQUF0RSxFQUFxRixFQUFDWCxRQUFRLGVBQVQsRUFBMEJjLFdBQVcsTUFBckMsRUFBNkNDLFVBQVUsR0FBdkQsRUFBNERkLGVBQWUsQ0FBM0UsRUFBOEVDLE9BQU8sS0FBckYsRUFBNEZDLGlCQUFpQixHQUE3RyxFQUFrSEMsT0FBTyxHQUF6SCxFQUE4SEMsUUFBUSxHQUF0SSxFQUEySUMsa0JBQWtCLEdBQTdKLEVBQXJGO0FBRUQ7O0FBRUQ7QUFDTyxTQUFTVSxnQkFBVCxDQUEwQjNHLE9BQTFCLEVBQW1DQyxJQUFuQyxFQUNQO0FBQ0UsTUFBSW1GLGNBQWNwRixRQUFRK0QsR0FBUixDQUFZLGFBQVosQ0FBbEI7QUFDQSxNQUFJNkMsTUFBTTVHLFFBQVErRCxHQUFSLENBQVksVUFBWixDQUFWO0FBQ0E7QUFDQSxNQUFJOEMsZUFBZW5DLGtCQUFrQixxQkFBbEIsRUFBeUN6RSxJQUF6QyxDQUFuQjtBQUNBLE1BQUk2RyxpQkFBaUJwQyxrQkFBa0IsMkJBQWxCLEVBQStDekUsSUFBL0MsQ0FBckI7QUFDQSxNQUFJOEcsb0JBQW9CckMsa0JBQWtCLGdDQUFsQixFQUFvRHpFLElBQXBELENBQXhCO0FBQ0EsTUFBSStHLFdBQVd0QyxrQkFBa0IsdUJBQWxCLEVBQTJDekUsSUFBM0MsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxNQUFJZ0gsWUFBWSxJQUFoQjtBQUNBLE1BQUdELGFBQWEsS0FBaEIsRUFDQTtBQUNFQyxnQkFBWSxJQUFaO0FBQ0Q7QUFDRCxNQUFJQyxXQUFXLElBQUlDLEtBQUosQ0FBVVAsSUFBSXJGLE1BQWQsQ0FBZjtBQUNBLE1BQUdzRixpQkFBaUIsZUFBcEIsRUFDQTtBQUNFLFFBQUlPLFdBQVcsQ0FBZjtBQUNBUCxpQkFBYWxHLE9BQWIsQ0FBcUIsVUFBU3FFLE1BQVQsRUFBZ0I7QUFDbkNrQyxpQkFBV0EsU0FBU0csSUFBVCxDQUFjLElBQWQsRUFBb0JyQyxPQUFPLENBQVAsQ0FBcEIsRUFBK0JBLE9BQU8sQ0FBUCxJQUFVLENBQXpDLENBQVg7QUFDQSxVQUFHb0MsV0FBVyxDQUFkLEVBQWdCO0FBQUNBLG9CQUFZLENBQVo7QUFBZTtBQUNoQ0YsaUJBQVdBLFNBQVNHLElBQVQsQ0FBY0osU0FBZCxFQUF5QkcsUUFBekIsRUFBbUNwQyxPQUFPLENBQVAsQ0FBbkMsQ0FBWDtBQUNBLFVBQUdpQyxjQUFjLElBQWpCLEVBQXNCO0FBQUVBLG9CQUFZLElBQVo7QUFBa0IsT0FBMUMsTUFBOEM7QUFBQ0Esb0JBQVksSUFBWjtBQUFrQjtBQUNqRUcsaUJBQVdwQyxPQUFPLENBQVAsSUFBVSxDQUFyQjtBQUNELEtBTkQ7QUFPQWtDLGVBQVdBLFNBQVNHLElBQVQsQ0FBY0osU0FBZCxFQUF5QkcsV0FBUyxDQUFsQyxFQUFxQ1IsSUFBSXJGLE1BQXpDLENBQVg7QUFFRDtBQUNEO0FBQ0EsTUFBR3VGLG1CQUFtQixlQUF0QixFQUFzQztBQUNwQ0EsbUJBQWVuRyxPQUFmLENBQXVCLFVBQVNxRSxNQUFULEVBQWdCO0FBQ3JDa0MsaUJBQVdBLFNBQVNHLElBQVQsQ0FBYyxHQUFkLEVBQW1CckMsT0FBTyxDQUFQLENBQW5CLEVBQThCQSxPQUFPLENBQVAsSUFBVSxDQUF4QyxDQUFYO0FBQ0QsS0FGRDtBQUdEO0FBQ0Q7QUFDQSxNQUFHK0Isc0JBQXNCLGVBQXpCLEVBQXlDO0FBQ3ZDQSxzQkFBa0JwRyxPQUFsQixDQUEwQixVQUFTcUUsTUFBVCxFQUFnQjtBQUN4Q2tDLGlCQUFXQSxTQUFTRyxJQUFULENBQWMsSUFBZCxFQUFvQnJDLE9BQU8sQ0FBUCxDQUFwQixFQUErQkEsT0FBTyxDQUFQLElBQVUsQ0FBekMsQ0FBWDtBQUNELEtBRkQ7QUFHRDtBQUNEa0MsV0FBU3ZHLE9BQVQsQ0FBaUIsVUFBUzJHLElBQVQsRUFBZXpHLENBQWYsRUFBaUI7QUFDaEN1RSxnQkFBWXZFLENBQVosRUFBZTBHLE1BQWYsR0FBd0JELElBQXhCO0FBQ0QsR0FGRDtBQUdBdEgsVUFBUUssR0FBUixDQUFZLGFBQVosRUFBMkIrRSxXQUEzQjtBQUNBSyxRQUFNQyxjQUFOLENBQXFCTixXQUFyQixFQUFrQyxFQUFDTyxRQUFRLG1CQUFULEVBQThCQyxlQUFlLENBQTdDLEVBQWdEQyxPQUFPLEtBQXZELEVBQThEQyxpQkFBaUIsR0FBL0UsRUFBb0ZDLE9BQU8sR0FBM0YsRUFBZ0dDLFFBQVEsR0FBeEcsRUFBNkdDLGtCQUFrQixHQUEvSCxFQUFsQztBQUVEOztBQUVNLFNBQVN1QixhQUFULENBQXVCeEgsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQXNDd0gsSUFBdEMsRUFDUDtBQUNFLE1BQUl4RyxRQUFRaEIsS0FBS2MsS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBO0FBQ0EsTUFBSTJHLFdBQVcxSCxRQUFRK0QsR0FBUixDQUFZMEQsT0FBSyxVQUFqQixDQUFmO0FBQ0E7QUFDQSxNQUFHeEQsT0FBT0MsSUFBUCxDQUFZd0QsUUFBWixFQUFzQm5HLE1BQXRCLEdBQStCLENBQWxDLEVBQW9DO0FBQ3BDLFFBQUlvRyxlQUFlLDREQUFuQjtBQUNBQSxvQkFBZ0Isb0JBQWhCO0FBQ0FBLG9CQUFnQixvQkFBaEI7QUFDQUEsb0JBQWdCLGtCQUFoQjtBQUNBQSxvQkFBZ0IsZ0JBQWhCO0FBQ0FBLG9CQUFnQixnQkFBaEI7QUFDQUEsb0JBQWdCLG9CQUFoQjtBQUNBQSxvQkFBZ0IscUJBQWhCO0FBQ0FBLG9CQUFnQixxQkFBaEI7QUFDQUEsb0JBQWdCLG9CQUFoQjtBQUNBLFFBQUdGLFNBQVMsTUFBWixFQUFtQjtBQUNqQkUsc0JBQWdCLHVCQUFoQjtBQUNBQSxzQkFBZ0IscUJBQWhCO0FBQ0FBLHNCQUFnQixzQkFBaEI7QUFDQUEsc0JBQWdCLHNCQUFoQjtBQUNELEtBTEQsTUFLTTtBQUNKQSxzQkFBZ0IsZUFBaEI7QUFDQUEsc0JBQWdCLHNCQUFoQjtBQUNBQSxzQkFBZ0Isc0JBQWhCO0FBQ0Q7QUFDREEsb0JBQWdCLGlCQUFoQjtBQUNBQSxvQkFBZ0Isb0JBQWhCO0FBQ0FBLG9CQUFnQixnQkFBaEI7O0FBRUE7QUFDQUEsb0JBQWdCLGlCQUFoQjtBQUNBMUcsVUFBTU4sT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFpQjtBQUM3QjtBQUNBLFVBQUdELEtBQUtXLE1BQUwsS0FBZ0IsQ0FBbkIsRUFBcUI7QUFBQztBQUFRO0FBQzlCLFVBQUlULFVBQVVGLEtBQUtHLEtBQUwsQ0FBVyxLQUFYLENBQWQ7QUFDQSxVQUFJNkcsWUFBWTlHLFFBQVEsQ0FBUixDQUFoQjtBQUNBLFVBQUcyRyxTQUFTLE1BQVosRUFBbUI7QUFBRUcsb0JBQVk5RyxRQUFRLEVBQVIsQ0FBWjtBQUF5QjtBQUM5QyxVQUFHOEcsWUFBVSxHQUFWLEdBQWMvRyxDQUFkLElBQW1CNkcsUUFBdEIsRUFDQTtBQUNBQyx3QkFBZ0IsTUFBaEI7QUFDQUEsd0JBQWdCLGdCQUFjN0csUUFBUSxDQUFSLEVBQVcrRyxXQUFYLEVBQWQsR0FBdUMsSUFBdkMsR0FBNEMvRyxRQUFRLENBQVIsQ0FBNUMsR0FBdUQsT0FBdkU7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQTZHLHdCQUFnQixTQUFPN0csUUFBUSxDQUFSLENBQVAsR0FBa0IsT0FBbEM7QUFDQSxZQUFJZ0gsTUFBTWhILFFBQVEsQ0FBUixFQUFXaUgsU0FBWCxDQUFxQixDQUFyQixFQUF3QmpILFFBQVEsQ0FBUixFQUFXUyxNQUFYLEdBQWtCLENBQTFDLENBQVY7QUFDQSxZQUFHa0csU0FBUyxNQUFaLEVBQW1CO0FBQUVLLGdCQUFNaEgsUUFBUSxFQUFSLEVBQVlpSCxTQUFaLENBQXNCLENBQXRCLEVBQXlCakgsUUFBUSxFQUFSLEVBQVlTLE1BQVosR0FBbUIsQ0FBNUMsQ0FBTjtBQUFzRDtBQUMzRSxZQUFHa0csU0FBUyxNQUFaLEVBQW1CO0FBQ2pCRSwwQkFBZ0IsU0FBTzdHLFFBQVEsQ0FBUixDQUFQLEdBQWtCLE9BQWxDO0FBQ0E2RywwQkFBZ0IsU0FBTzdHLFFBQVEsRUFBUixDQUFQLEdBQW1CLE9BQW5DO0FBQ0E2RywwQkFBZ0IsK0VBQTZFQyxTQUE3RSxHQUF1RixJQUF2RixHQUE0RkEsU0FBNUYsR0FBc0csV0FBdEg7QUFDQUQsMEJBQWdCLGlGQUErRUcsR0FBL0UsR0FBbUYsd0JBQW5HO0FBQ0FILDBCQUFnQixnSEFBOEdHLEdBQTlHLEdBQWtILHdCQUFsSTtBQUNBSCwwQkFBZ0IsaUZBQWdGRCxTQUFTRSxZQUFVLEdBQVYsR0FBYy9HLENBQXZCLEVBQTBCbUgsR0FBMUcsR0FBK0csT0FBL0csR0FBd0hOLFNBQVNFLFlBQVUsR0FBVixHQUFjL0csQ0FBdkIsRUFBMEJvSCxHQUFsSixHQUF1SixPQUF2SixJQUFnS0wsWUFBVSxHQUFWLEdBQWMvRyxDQUE5SyxJQUFpTCx5Q0FBak07QUFDQThHLDBCQUFnQiwyRUFBMEVELFNBQVNFLFlBQVUsR0FBVixHQUFjL0csQ0FBdkIsRUFBMEJtSCxHQUFwRyxHQUF5RyxzREFBekg7QUFDRCxTQVJELE1BU0k7QUFDRkwsMEJBQWdCLDBGQUF3RkcsR0FBeEYsR0FBNEYsSUFBNUYsR0FBaUdGLFNBQWpHLEdBQTJHLFdBQTNIO0FBQ0FELDBCQUFnQixpRkFBK0VHLEdBQS9FLEdBQW1GLHdCQUFuRztBQUNBSCwwQkFBZ0IsNkRBQTJERyxHQUEzRCxHQUErRCx3QkFBL0U7QUFDQUgsMEJBQWdCLGdIQUE4R0csR0FBOUcsR0FBa0gsd0JBQWxJO0FBQ0FILDBCQUFnQixpRkFBZ0ZELFNBQVNFLFlBQVUsR0FBVixHQUFjL0csQ0FBdkIsRUFBMEJtSCxHQUExRyxHQUErRyxPQUEvRyxHQUF3SE4sU0FBU0UsWUFBVSxHQUFWLEdBQWMvRyxDQUF2QixFQUEwQm9ILEdBQWxKLEdBQXVKLE9BQXZKLElBQWdLTCxZQUFVLEdBQVYsR0FBYy9HLENBQTlLLElBQWlMLHlDQUFqTTtBQUNBOEcsMEJBQWdCLDJFQUEwRUQsU0FBU0UsWUFBVSxHQUFWLEdBQWMvRyxDQUF2QixFQUEwQm1ILEdBQXBHLEdBQXlHLHFEQUF6SDtBQUNEO0FBQ0RMLHdCQUFnQixTQUFoQjtBQUNDO0FBQ0YsS0F2Q0Q7QUF3Q0FBLG9CQUFnQixvQkFBaEI7QUFDQTNILFlBQVFLLEdBQVIsQ0FBWW9ILE9BQUssUUFBakIsRUFBMkJFLFlBQTNCO0FBQ0MsR0FyRUQsTUFzRUs7QUFDRDNILFlBQVFLLEdBQVIsQ0FBWW9ILE9BQUssUUFBakIsRUFBMkIsNkZBQTNCO0FBQ0g7QUFDRjs7QUFFTSxTQUFTUyxhQUFULENBQXVCbEksT0FBdkIsRUFBZ0NDLElBQWhDLEVBQ1A7QUFDRSxNQUFJa0ksbUJBQW1CLG9EQUF2QjtBQUNBLE1BQUlDLG1CQUFvQkQsaUJBQWlCdEQsSUFBakIsQ0FBc0I1RSxJQUF0QixDQUF4QjtBQUNBLE1BQUdtSSxnQkFBSCxFQUNBO0FBQ0UsUUFBSUMsVUFBVXBJLEtBQUtxSSxPQUFMLENBQWEsSUFBYixFQUFrQixRQUFsQixDQUFkO0FBQ0FELGNBQVVBLFFBQVFDLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBcUIsUUFBckIsQ0FBVjtBQUNBdEksWUFBUUssR0FBUixDQUFZLGNBQVosRUFBNEIsU0FBT2dJLE9BQVAsR0FBZSxPQUEzQztBQUNBLFFBQUlFLFNBQVMsRUFBYjtBQUNBLFFBQUdILGlCQUFpQixDQUFqQixFQUFvQkksT0FBcEIsQ0FBNEIsR0FBNUIsQ0FBSCxFQUNBO0FBQ0VELGVBQVNILGlCQUFpQixDQUFqQixFQUFvQnJILEtBQXBCLENBQTBCLEdBQTFCLENBQVQ7QUFDQXdILGFBQU81SCxPQUFQLENBQWUsVUFBUzhILEtBQVQsRUFBZ0I1SCxDQUFoQixFQUFrQjtBQUMvQjBILGVBQU8xSCxDQUFQLElBQVlvRSxTQUFTd0QsS0FBVCxDQUFaO0FBQ0QsT0FGRDtBQUdELEtBTkQsTUFRQTtBQUNFRixhQUFPLENBQVAsSUFBWXRELFNBQVNtRCxpQkFBaUIsQ0FBakIsQ0FBVCxDQUFaO0FBQ0Q7QUFDRGpJLFlBQVFDLEdBQVIsQ0FBWW1JLE1BQVo7QUFDQSxRQUFJbkQsY0FBY3BGLFFBQVErRCxHQUFSLENBQVksYUFBWixDQUFsQjtBQUNBd0UsV0FBTzVILE9BQVAsQ0FBZSxVQUFTOEgsS0FBVCxFQUFlO0FBQzVCckQsa0JBQVlxRCxLQUFaLEVBQW1CQyxPQUFuQixHQUE2QixHQUE3QjtBQUNELEtBRkQ7QUFHQTFJLFlBQVFLLEdBQVIsQ0FBWSxhQUFaLEVBQTJCK0UsV0FBM0I7QUFDRCxHQXZCRCxNQXlCQTtBQUNFcEYsWUFBUUssR0FBUixDQUFZLGNBQVosRUFBNEIsd0NBQTVCO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7Ozs7QUNqZ0JEO0FBQ0E7O0FBRU8sU0FBU3NJLFVBQVQsQ0FBb0JGLEtBQXBCLEVBQTJCekksT0FBM0IsRUFDUDtBQUNFQSxVQUFRSyxHQUFSLENBQWEsdUJBQWIsRUFBc0MsSUFBdEM7QUFDQUwsVUFBUUssR0FBUixDQUFhLHVCQUFiLEVBQXNDb0ksS0FBdEM7QUFDRDs7QUFFRDtBQUNPLFNBQVNHLGNBQVQsQ0FBd0I1SSxPQUF4QixFQUFpQzZJLFdBQWpDLEVBQThDQyxRQUE5QyxFQUF3REMsU0FBeEQsRUFBa0U7QUFDdkUvSSxVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDQUwsVUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixLQUE5QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsRUFBOUI7QUFDQXlJLFdBQVNuSSxPQUFULENBQWlCLFVBQVNxSSxRQUFULEVBQWtCO0FBQ2pDaEosWUFBUUssR0FBUixDQUFZMkksV0FBUyxrQkFBckIsRUFBeUMsOEJBQTRCRCxVQUFVQyxRQUFWLENBQTVCLEdBQWdELHNCQUF6RjtBQUNBaEosWUFBUUssR0FBUixDQUFZMkksV0FBUyxlQUFyQixFQUFzQ0gsV0FBdEM7QUFDQTdJLFlBQVFLLEdBQVIsQ0FBWTJJLFdBQVMsT0FBckIsRUFBOEIsY0FBOUI7QUFDRCxHQUpEO0FBS0FoSixVQUFRSyxHQUFSLENBQVksZUFBWixFQUE0QixJQUE1QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksZ0JBQVo7QUFDQUwsVUFBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxFQUFqQztBQUNBTCxVQUFRSyxHQUFSLENBQVksWUFBWixFQUEwQixFQUExQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksVUFBWixFQUF3QixFQUF4QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksV0FBWixFQUF5QixFQUF6QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksU0FBWixFQUF1QixFQUF2QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixJQUE1QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksYUFBWixFQUEyQixJQUEzQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksWUFBWixFQUEwQixJQUExQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsRUFBL0I7QUFDQUwsVUFBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxVQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsVUFBUUssR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQUwsVUFBUUssR0FBUixDQUFZLGNBQVosRUFBNEIsSUFBNUI7QUFDQUwsVUFBUUssR0FBUixDQUFZLGFBQVosRUFBMkIsSUFBM0I7QUFDQUwsVUFBUUssR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQzs7QUFFQUwsVUFBUUssR0FBUixDQUFZLGFBQVosRUFBMEIsSUFBMUI7QUFDQUwsVUFBUUssR0FBUixDQUFZLFlBQVosRUFBeUIsSUFBekI7QUFDQW9GLFFBQU13RCxjQUFOLENBQXFCLG1CQUFyQjtBQUNBeEQsUUFBTXdELGNBQU4sQ0FBcUIscUJBQXJCO0FBQ0F4RCxRQUFNd0QsY0FBTixDQUFxQixlQUFyQjs7QUFFQUMsUUFBTSxJQUFJQyxLQUFKLEVBQU47QUFDRDs7QUFFRDtBQUNPLFNBQVNDLHNCQUFULENBQWdDeEUsSUFBaEMsRUFBc0N5RSxjQUF0QyxFQUFzRFAsUUFBdEQsRUFBZ0VDLFNBQWhFLEVBQ1A7QUFDRUQsV0FBU25JLE9BQVQsQ0FBaUIsVUFBU3FJLFFBQVQsRUFBa0I7QUFDakMsUUFBR3BFLEtBQUtvRSxRQUFMLEtBQWtCQSxRQUFyQixFQUNBO0FBQ0VLLHFCQUFlTCxRQUFmLElBQTJCLEVBQTNCO0FBQ0FLLHFCQUFlTCxRQUFmLEVBQXlCTSxNQUF6QixHQUFrQyxTQUFPUCxVQUFVQyxRQUFWLENBQVAsR0FBMkIsaUJBQTdEO0FBQ0E7QUFDQSxVQUFHQSxhQUFhLGNBQWIsSUFBK0JBLGFBQWEsU0FBNUMsSUFDQUEsYUFBYSxjQURiLElBQytCQSxhQUFhLFlBRDVDLElBRUFBLGFBQWEsUUFGaEIsRUFHQTtBQUNFSyx1QkFBZUUsT0FBZixHQUF5QixFQUF6QjtBQUNBRix1QkFBZUUsT0FBZixDQUF1QkQsTUFBdkIsR0FBZ0MsU0FBT1AsVUFBVVEsT0FBakIsR0FBeUIsaUJBQXpEO0FBQ0Q7QUFDRCxVQUFHUCxhQUFhLFNBQWhCLEVBQ0E7QUFDRUssdUJBQWVHLFNBQWYsR0FBMEIsRUFBMUI7QUFDQUgsdUJBQWVHLFNBQWYsQ0FBeUJGLE1BQXpCLEdBQWtDLFNBQU9QLFVBQVVTLFNBQWpCLEdBQTJCLGlCQUE3RDtBQUNEO0FBQ0QsVUFBR1IsYUFBYSxTQUFoQixFQUNBO0FBQ0VLLHVCQUFlRSxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FGLHVCQUFlRSxPQUFmLENBQXVCRCxNQUF2QixHQUFnQyxTQUFPUCxVQUFVUSxPQUFqQixHQUF5QixpQkFBekQ7QUFDQUYsdUJBQWVJLFlBQWYsR0FBNkIsRUFBN0I7QUFDQUosdUJBQWVJLFlBQWYsQ0FBNEJILE1BQTVCLEdBQXFDLFNBQU9QLFVBQVVVLFlBQWpCLEdBQThCLGlCQUFuRTtBQUNBSix1QkFBZUssT0FBZixHQUF5QixFQUF6QjtBQUNBTCx1QkFBZUssT0FBZixDQUF1QkosTUFBdkIsR0FBZ0MsU0FBT1AsVUFBVVcsT0FBakIsR0FBeUIsaUJBQXpEO0FBQ0Q7QUFDRCxVQUFHVixhQUFhLFNBQWhCLEVBQ0E7QUFDRUssdUJBQWVFLE9BQWYsR0FBeUIsRUFBekI7QUFDQUYsdUJBQWVFLE9BQWYsQ0FBdUJELE1BQXZCLEdBQWdDLFNBQU9QLFVBQVVRLE9BQWpCLEdBQXlCLGlCQUF6RDtBQUNBRix1QkFBZU0sWUFBZixHQUE2QixFQUE3QjtBQUNBTix1QkFBZU0sWUFBZixDQUE0QkwsTUFBNUIsR0FBcUMsU0FBT1AsVUFBVVksWUFBakIsR0FBOEIsaUJBQW5FO0FBQ0FOLHVCQUFlTyxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FQLHVCQUFlTyxPQUFmLENBQXVCTixNQUF2QixHQUFnQyxTQUFPUCxVQUFVYSxPQUFqQixHQUF5QixpQkFBekQ7QUFDRDtBQUNELFVBQUdaLGFBQWEsUUFBaEIsRUFDQTtBQUNFSyx1QkFBZUcsU0FBZixHQUEyQixFQUEzQjtBQUNBSCx1QkFBZUcsU0FBZixDQUF5QkYsTUFBekIsR0FBa0MsU0FBT1AsVUFBVVMsU0FBakIsR0FBMkIsaUJBQTdEO0FBQ0FILHVCQUFlRSxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FGLHVCQUFlRSxPQUFmLENBQXVCRCxNQUF2QixHQUFnQyw0QkFBaEM7QUFDQUQsdUJBQWVYLE9BQWYsR0FBd0IsRUFBeEI7QUFDQVcsdUJBQWVYLE9BQWYsQ0FBdUJZLE1BQXZCLEdBQWdDLDRCQUFoQztBQUNBRCx1QkFBZVEsTUFBZixHQUF3QixFQUF4QjtBQUNBUix1QkFBZVEsTUFBZixDQUFzQlAsTUFBdEIsR0FBK0IsU0FBT1AsVUFBVWMsTUFBakIsR0FBd0IsaUJBQXZEO0FBQ0Q7QUFDRjtBQUNGLEdBaEREO0FBaUREOztBQUVEO0FBQ08sU0FBU0MsY0FBVCxDQUF3QjlKLE9BQXhCLEVBQWlDNEUsSUFBakMsRUFBdUNtRixRQUF2QyxFQUFpRGIsR0FBakQsRUFBc0RHLGNBQXRELEVBQXNFTixTQUF0RSxFQUNQO0FBQ0UsTUFBSWlCLGNBQWMsVUFBbEI7QUFDQSxNQUFJQyxZQUFZLFFBQWhCO0FBQ0EsTUFBSUMsWUFBWSxRQUFoQjtBQUNBLE1BQUlDLHVCQUF1QiwyQkFBM0I7QUFDQSxNQUFJQyx5QkFBeUIsa0JBQTdCO0FBQ0EsTUFBSUMsb0JBQW9CLGFBQXhCO0FBQ0EsTUFBSUMsd0JBQXdCLHVCQUE1QjtBQUNBLE1BQUlDLG9CQUFvQixrQkFBeEI7QUFDQSxNQUFJQyxzQkFBc0IsdUJBQTFCO0FBQ0EsTUFBSUMsb0JBQW9CLHlCQUF4QjtBQUNBLE1BQUlDLHFCQUFxQixTQUF6QjtBQUNBLE1BQUlDLGdCQUFnQixZQUFwQjtBQUNBLE1BQUlDLGdCQUFnQix1QkFBcEI7QUFDQSxNQUFJQyxtQkFBbUIsYUFBdkI7QUFDQSxNQUFJQyxtQkFBbUIsK0JBQXZCO0FBQ0EsTUFBSUMseUJBQXlCLHNCQUE3QjtBQUNBLE1BQUlDLGtCQUFrQixhQUF0QjtBQUNBLE1BQUlDLHVCQUF1QixXQUEzQjtBQUNBLE1BQUlDLHFCQUFxQixZQUF6QjtBQUNBLE1BQUlDLHNCQUFzQixVQUExQjtBQUNBLE1BQUlDLDBCQUEwQixVQUE5QjtBQUNBLE1BQUlDLDJCQUEyQixXQUEvQjtBQUNBLE1BQUlDLHNCQUFzQixXQUExQjtBQUNBLE1BQUlDLG9CQUFvQixXQUF4QjtBQUNBLE1BQUlDLHVCQUF1QixlQUEzQjtBQUNBLE1BQUlDLHNCQUFzQixjQUExQjs7QUFFQSxNQUFJQyxjQUFjLEVBQWxCO0FBQ0EsTUFBSUMsVUFBVS9HLEtBQUsrRyxPQUFuQjtBQUNBLE1BQUlDLGVBQWUsQ0FBbkI7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyxnQ0FBZ0MsS0FBcEM7QUFDQSxNQUFJQyx1QkFBdUIsS0FBM0I7QUFDQSxNQUFJQyw0QkFBNEIsS0FBaEM7QUFDQTtBQUNBLE9BQUksSUFBSXBMLENBQVIsSUFBYThLLE9BQWIsRUFDQTtBQUNFLFFBQUlPLGNBQWNQLFFBQVE5SyxDQUFSLENBQWxCO0FBQ0EsUUFBR3FMLFlBQVlDLElBQVosS0FBcUIsd0JBQXhCLEVBQ0E7QUFDSSxVQUFJQyxVQUFVcE0sUUFBUStELEdBQVIsQ0FBWSxjQUFaLENBQWQ7QUFDQSxVQUFJc0ksTUFBTUgsWUFBWUksU0FBdEI7QUFDQSxVQUFJQyxPQUFPRixJQUFJRyxNQUFKLENBQVcsQ0FBWCxFQUFjSCxJQUFJSSxXQUFKLENBQWdCLEdBQWhCLENBQWQsQ0FBWDtBQUNBLFVBQUlDLEtBQUtILEtBQUtDLE1BQUwsQ0FBWUQsS0FBS0UsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFsQyxFQUFxQ0YsS0FBS2hMLE1BQTFDLENBQVQ7QUFDQTZLLGNBQVFNLEVBQVIsSUFBYyxFQUFkO0FBQ0FOLGNBQVFNLEVBQVIsRUFBWXpFLEdBQVosR0FBa0JzRSxPQUFLLE1BQXZCO0FBQ0FILGNBQVFNLEVBQVIsRUFBWTFFLEdBQVosR0FBa0J1RSxPQUFLLE1BQXZCO0FBQ0F2TSxjQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QitMLE9BQTVCO0FBQ0g7QUFDRCxRQUFHRixZQUFZQyxJQUFaLEtBQXFCLDZCQUF4QixFQUNBO0FBQ0ksVUFBSUMsVUFBVXBNLFFBQVErRCxHQUFSLENBQVksYUFBWixDQUFkO0FBQ0EsVUFBSXNJLE1BQU1ILFlBQVlJLFNBQXRCO0FBQ0EsVUFBSUMsT0FBT0YsSUFBSUcsTUFBSixDQUFXLENBQVgsRUFBY0gsSUFBSUksV0FBSixDQUFnQixHQUFoQixDQUFkLENBQVg7QUFDQSxVQUFJQyxLQUFLSCxLQUFLQyxNQUFMLENBQVlELEtBQUtFLFdBQUwsQ0FBaUIsR0FBakIsSUFBc0IsQ0FBbEMsRUFBcUNGLEtBQUtoTCxNQUExQyxDQUFUO0FBQ0E2SyxjQUFRTSxFQUFSLElBQWMsRUFBZDtBQUNBTixjQUFRTSxFQUFSLEVBQVl6RSxHQUFaLEdBQWtCc0UsT0FBSyxNQUF2QjtBQUNBSCxjQUFRTSxFQUFSLEVBQVkxRSxHQUFaLEdBQWtCdUUsT0FBSyxNQUF2QjtBQUNBdk0sY0FBUUssR0FBUixDQUFZLGFBQVosRUFBMkIrTCxPQUEzQjtBQUNIO0FBQ0QsUUFBR0YsWUFBWUMsSUFBWixLQUFxQiw0QkFBeEIsRUFDQTtBQUNJLFVBQUlDLFVBQVVwTSxRQUFRK0QsR0FBUixDQUFZLGNBQVosQ0FBZDtBQUNBLFVBQUlzSSxNQUFNSCxZQUFZSSxTQUF0QjtBQUNBLFVBQUlDLE9BQU9GLElBQUlHLE1BQUosQ0FBVyxDQUFYLEVBQWNILElBQUlJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBZCxDQUFYO0FBQ0EsVUFBSUMsS0FBS0gsS0FBS0MsTUFBTCxDQUFZRCxLQUFLRSxXQUFMLENBQWlCLEdBQWpCLElBQXNCLENBQWxDLEVBQXFDRixLQUFLaEwsTUFBMUMsQ0FBVDtBQUNBNkssY0FBUU0sRUFBUixJQUFjLEVBQWQ7QUFDQU4sY0FBUU0sRUFBUixFQUFZekUsR0FBWixHQUFrQnNFLE9BQUssTUFBdkI7QUFDQUgsY0FBUU0sRUFBUixFQUFZMUUsR0FBWixHQUFrQnVFLE9BQUssTUFBdkI7QUFDQXZNLGNBQVFLLEdBQVIsQ0FBWSxjQUFaLEVBQTRCK0wsT0FBNUI7QUFDSDtBQUNGO0FBQ0RqTSxVQUFRQyxHQUFSLENBQVl1TCxPQUFaO0FBQ0E7QUFDQSxPQUFJLElBQUk5SyxDQUFSLElBQWE4SyxPQUFiLEVBQ0E7QUFDRSxRQUFJTyxjQUFjUCxRQUFROUssQ0FBUixDQUFsQjtBQUNBO0FBQ0EsUUFBR3FMLFlBQVlDLElBQVosSUFBb0IsVUFBdkIsRUFDQTtBQUNFSCw2QkFBdUIsSUFBdkI7QUFDQSxVQUFJdEwsUUFBUXNKLFlBQVluRixJQUFaLENBQWlCcUgsWUFBWUksU0FBN0IsQ0FBWjtBQUNBLFVBQUc1TCxLQUFILEVBQ0E7QUFDRWlNLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsT0FBOUMsRUFBdURwRCxHQUF2RCxFQUE0RGxKLE9BQTVEO0FBQ0FBLGdCQUFRSyxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkM7QUFDQUwsZ0JBQVFLLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBTCxnQkFBUUssR0FBUixDQUFZLGNBQVosRUFBNEIsRUFBNUI7QUFDQWdKLHVCQUFlRSxPQUFmLENBQXVCcUQsS0FBdkIsR0FBK0IsY0FBWTdDLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBMUU7QUFFRDtBQUNELFVBQUlPLFlBQVk1QyxVQUFVcEYsSUFBVixDQUFlcUgsWUFBWUksU0FBM0IsQ0FBaEI7QUFDQSxVQUFHTyxTQUFILEVBQ0E7QUFDRXhELHVCQUFlRSxPQUFmLENBQXVCdUQsR0FBdkIsR0FBNkIsY0FBWS9DLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywrQkFBeEU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixhQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsT0FBOUMsRUFBdURwRCxHQUF2RCxFQUE0RGxKLE9BQTVEO0FBQ0FBLGNBQVFLLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxFQUF4QztBQUNBZ0oscUJBQWVqRCxRQUFmLENBQXdCMkcsS0FBeEIsR0FBZ0MsY0FBWWhELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBM0U7QUFDQXRNLGNBQVFLLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNBTCxjQUFRSyxHQUFSLENBQVksZUFBWixFQUE2QixFQUE3QjtBQUNEO0FBQ0QsUUFBRzZMLFlBQVlDLElBQVosS0FBcUIsY0FBeEIsRUFDQTtBQUNFUSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLE1BQTlDLEVBQXNEcEQsR0FBdEQsRUFBMkRsSixPQUEzRDtBQUNBcUoscUJBQWVqRCxRQUFmLENBQXdCNEcsSUFBeEIsR0FBK0IsY0FBWWpELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw0QkFBMUU7QUFDRDs7QUFFRDtBQUNBLFFBQUdKLFlBQVlDLElBQVosS0FBcUIsV0FBeEIsRUFDQTtBQUNFbk0sY0FBUUssR0FBUixDQUFZLDJCQUFaLEVBQXlDLEVBQXpDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBTCxjQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsRUFBOUI7QUFDQSxVQUFJNE0sZUFBZTdDLHVCQUF1QnZGLElBQXZCLENBQTRCcUgsWUFBWUksU0FBeEMsQ0FBbkI7QUFDQSxVQUFHVyxZQUFILEVBQ0E7QUFDRU4sUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFLLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxlQUFhMEosUUFBYixHQUFzQm1DLFlBQVlJLFNBQWxDLEdBQTRDLE1BQS9FO0FBQ0FqRCx1QkFBZUcsU0FBZixDQUF5QjBELFNBQXpCLEdBQXFDLGNBQVluRCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsK0JBQWhGO0FBQ0Q7QUFDRCxVQUFJYSxnQkFBZ0JoRCxxQkFBcUJ0RixJQUFyQixDQUEwQnFILFlBQVlJLFNBQXRDLENBQXBCO0FBQ0EsVUFBR2EsYUFBSCxFQUNBO0FBQ0VSLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGdCQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUMsZUFBYTBKLFFBQWIsR0FBc0JtQyxZQUFZSSxTQUFsQyxHQUE0QyxNQUE3RTtBQUNBakQsdUJBQWVHLFNBQWYsQ0FBeUI0RCxPQUF6QixHQUFtQyxjQUFZckQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDZCQUE5RTtBQUNEO0FBQ0QsVUFBSWUsZUFBZWhELGtCQUFrQnhGLElBQWxCLENBQXVCcUgsWUFBWUksU0FBbkMsQ0FBbkI7QUFDQSxVQUFHZSxZQUFILEVBQ0E7QUFDRVYsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQTJNLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsWUFBOUMsRUFBNERwRCxHQUE1RCxFQUFpRWxKLE9BQWpFO0FBQ0FxSix1QkFBZUcsU0FBZixDQUF5QjVFLElBQXpCLEdBQWdDLGNBQVltRixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMkJBQTNFO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsUUFBR0osWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFbk0sY0FBUUssR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBTCxjQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUk4TSxnQkFBaUI3QyxzQkFBc0J6RixJQUF0QixDQUEyQnFILFlBQVlJLFNBQXZDLENBQXJCO0FBQ0EsVUFBR2EsYUFBSCxFQUNBO0FBQ0V0QiwrQkFBdUIsSUFBdkI7QUFDQWMsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQiw4QkFBNEIwSixRQUE1QixHQUFxQ21DLFlBQVlJLFNBQWpELEdBQTJELE1BQTFGO0FBQ0FqRCx1QkFBZWlFLE9BQWYsQ0FBdUJGLE9BQXZCLEdBQWlDLGNBQVlyRCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsNkJBQTVFO0FBQ0Q7QUFDRCxVQUFJaUIsY0FBZWhELGtCQUFrQjFGLElBQWxCLENBQXVCcUgsWUFBWUksU0FBbkMsQ0FBbkI7QUFDQSxVQUFHaUIsV0FBSCxFQUNBO0FBQ0VaLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZWlFLE9BQWYsQ0FBdUJFLFNBQXZCLEdBQW1DLGNBQVl6RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQTlFO0FBQ0Q7QUFDRCxVQUFJbUIsZ0JBQWlCakQsb0JBQW9CM0YsSUFBcEIsQ0FBeUJxSCxZQUFZSSxTQUFyQyxDQUFyQjtBQUNBLFVBQUdtQixhQUFILEVBQ0E7QUFDRWQsUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHVCQUFlaUUsT0FBZixDQUF1QkksT0FBdkIsR0FBaUMsY0FBWTNELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBNUU7QUFDRDtBQUNELFVBQUlxQixjQUFlbEQsa0JBQWtCNUYsSUFBbEIsQ0FBdUJxSCxZQUFZSSxTQUFuQyxDQUFuQjtBQUNBLFVBQUdxQixXQUFILEVBQ0E7QUFDRWhCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZWlFLE9BQWYsQ0FBdUJNLFNBQXZCLEdBQW1DLGNBQVk3RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsdUNBQTlFO0FBQ0Q7QUFFRjtBQUNEO0FBQ0EsUUFBR0osWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VuTSxjQUFRSyxHQUFSLENBQVksOEJBQVosRUFBNEMsRUFBNUM7QUFDQUwsY0FBUUssR0FBUixDQUFZLDJCQUFaLEVBQXlDLEVBQXpDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxFQUFqQztBQUNBc00sTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxTQUE5QyxFQUF5RHBELEdBQXpELEVBQThEbEosT0FBOUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCb0UsS0FBNUIsR0FBb0MsY0FBWTlELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLGtCQUEzRztBQUNEO0FBQ0QsUUFBR3lDLFlBQVlDLElBQVosS0FBcUIsbUJBQXhCLEVBQ0E7QUFDRW5NLGNBQVFLLEdBQVIsQ0FBWSw2QkFBWixFQUEyQyxFQUEzQztBQUNBTCxjQUFRSyxHQUFSLENBQVksMEJBQVosRUFBd0MsRUFBeEM7QUFDQUwsY0FBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLEVBQWhDO0FBQ0FzTSxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLGFBQTlDLEVBQTZEcEQsR0FBN0QsRUFBa0VsSixPQUFsRTtBQUNBcUoscUJBQWV5RSxXQUFmLENBQTJCRCxLQUEzQixHQUFtQyxjQUFZOUQsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLElBQTNDLEdBQWdEdkQsVUFBVStFLFdBQTFELEdBQXNFLGtCQUF6RztBQUNEO0FBQ0QsUUFBRzVCLFlBQVlDLElBQVosS0FBcUIsa0JBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCc0UsS0FBNUIsR0FBb0MsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLHVCQUEzRztBQUNEO0FBQ0QsUUFBR3lDLFlBQVlDLElBQVosS0FBcUIsbUJBQXhCLEVBQ0E7QUFDRVEsTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQXFKLHFCQUFlSSxZQUFmLENBQTRCc0UsS0FBNUIsR0FBb0MsY0FBWWhFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxJQUEzQyxHQUFnRHZELFVBQVVVLFlBQTFELEdBQXVFLHVCQUEzRztBQUNEOztBQUVELFFBQUd5QyxZQUFZQyxJQUFaLEtBQXFCLDhCQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSixxQkFBZXlFLFdBQWYsQ0FBMkJDLEtBQTNCLEdBQW1DLGNBQVloRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVK0UsV0FBMUQsR0FBc0UsdUJBQXpHO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFHNUIsWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VGLGtDQUE0QixJQUE1QjtBQUNBak0sY0FBUUssR0FBUixDQUFZLDhCQUFaLEVBQTRDLEVBQTVDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSwyQkFBWixFQUF5QyxFQUF6QztBQUNBTCxjQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUMsRUFBakM7QUFDQXNNLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsYUFBOUMsRUFBNkRwRCxHQUE3RCxFQUFrRWxKLE9BQWxFO0FBQ0FxSixxQkFBZU0sWUFBZixDQUE0QmtFLEtBQTVCLEdBQW9DLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVWSxZQUExRCxHQUF1RSxrQkFBM0c7QUFDRDtBQUNELFFBQUd1QyxZQUFZQyxJQUFaLEtBQXFCLHNCQUF4QixFQUNBO0FBQ0VRLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSixxQkFBZU0sWUFBZixDQUE0Qm9FLEtBQTVCLEdBQW9DLGNBQVloRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsSUFBM0MsR0FBZ0R2RCxVQUFVWSxZQUExRCxHQUF1RSx1QkFBM0c7QUFDRDtBQUNEO0FBQ0EsUUFBR3VDLFlBQVlDLElBQVosS0FBcUIsU0FBeEIsRUFDQTtBQUNFbk0sY0FBUUssR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBTCxjQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUkyTixZQUFZOUQsVUFBVXJGLElBQVYsQ0FBZXFILFlBQVlJLFNBQTNCLENBQWhCO0FBQ0EsVUFBRzBCLFNBQUgsRUFDQTtBQUNFM0UsdUJBQWVYLE9BQWYsQ0FBdUJ1RixZQUF2QixHQUFzQyxjQUFZbEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLDBCQUFqRjtBQUNBdE0sZ0JBQVFLLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLGVBQWEwSixRQUFiLEdBQXNCbUMsWUFBWUksU0FBbEMsR0FBNEMsTUFBdkU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRCxPQUxELE1BTUk7QUFDRnFKLHVCQUFlWCxPQUFmLENBQXVCd0YsUUFBdkIsR0FBa0MsY0FBWW5FLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQywyQkFBN0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxTQUE5QyxFQUF5RHBELEdBQXpELEVBQThEbEosT0FBOUQ7QUFDRDtBQUNGO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsU0FBeEIsRUFDQTtBQUNFLFVBQUlnQyxhQUFjekQsbUJBQW1CN0YsSUFBbkIsQ0FBd0JxSCxZQUFZSSxTQUFwQyxDQUFsQjtBQUNBLFVBQUc2QixVQUFILEVBQ0E7QUFDRXhCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZVgsT0FBZixDQUF1QjBGLFdBQXZCLEdBQXFDLGNBQVlyRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsaUNBQWhGO0FBQ0Q7QUFDRCxVQUFJK0IsZ0JBQWlCM0QsbUJBQW1CN0YsSUFBbkIsQ0FBd0JxSCxZQUFZSSxTQUFwQyxDQUFyQjtBQUNBLFVBQUcrQixhQUFILEVBQ0E7QUFDSTFCLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix1QkFBZVgsT0FBZixDQUF1QjRGLE9BQXZCLEdBQWlDLGNBQVl2RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQTVFO0FBQ0g7QUFDRjtBQUNELFFBQUdKLFlBQVlDLElBQVosS0FBcUIsWUFBeEIsRUFDQTtBQUNFbk0sY0FBUUssR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBTCxjQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBZ0oscUJBQWVLLE9BQWYsQ0FBdUI2RSxLQUF2QixHQUErQixjQUFZeEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLGtDQUExRTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBd08sd0JBQWtCekUsV0FBU21DLFlBQVlJLFNBQXZDLEVBQWtELGdCQUFsRCxFQUFvRSxJQUFwRTtBQUNEO0FBQ0QsUUFBR0osWUFBWUMsSUFBWixLQUFxQixlQUF4QixFQUNBO0FBQ0U5QyxxQkFBZUssT0FBZixDQUF1QitFLE9BQXZCLEdBQWlDLGNBQVkxRSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsOEJBQTVFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixnQkFBeEIsRUFDQTtBQUNFOUMscUJBQWVLLE9BQWYsQ0FBdUJnRixLQUF2QixHQUErQixjQUFZM0UsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUExRTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsZUFBeEIsRUFDQTtBQUNFOUMscUJBQWVPLE9BQWYsQ0FBdUIrRSxTQUF2QixHQUFtQyxjQUFZNUUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHdCQUE5RTtBQUNBSyxNQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsZ0JBQXhCLEVBQ0E7QUFDRTlDLHFCQUFlTyxPQUFmLENBQXVCZ0YsUUFBdkIsR0FBa0MsY0FBWTdFLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx5QkFBN0U7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLHlCQUFyQixJQUFrREQsWUFBWUMsSUFBWixLQUFxQixpQkFBMUUsRUFDQTtBQUNFLFVBQUkwQyxnQkFBZ0JqRSxjQUFjL0YsSUFBZCxDQUFtQnFILFlBQVlJLFNBQS9CLENBQXBCO0FBQ0EsVUFBR3VDLGFBQUgsRUFDQTtBQUNFN08sZ0JBQVFLLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QztBQUNBTCxnQkFBUUssR0FBUixDQUFZLHNCQUFaLEVBQW9DLEVBQXBDO0FBQ0FMLGdCQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBO0FBQ0F1TCx3QkFBYyxDQUFkO0FBQ0FFLCtCQUF1QixJQUF2QjtBQUNBLFlBQUd6QyxlQUFlTyxPQUFmLENBQXVCMkUsS0FBMUIsRUFBZ0M7QUFDOUI1QixVQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBcUoseUJBQWVPLE9BQWYsQ0FBdUIyRSxLQUF2QixJQUFnQyxjQUFZeEUsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLFVBQTNDLEdBQXNEdUMsY0FBYyxDQUFkLENBQXRELEdBQXVFLEdBQXZFLEdBQTJFQSxjQUFjLENBQWQsQ0FBM0UsR0FBNEYsWUFBNUg7QUFDRCxTQUhELE1BSUs7QUFDSGxDLFVBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FxSix5QkFBZU8sT0FBZixDQUF1QjJFLEtBQXZCLEdBQStCLGNBQVl4RSxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsVUFBM0MsR0FBc0R1QyxjQUFjLENBQWQsQ0FBdEQsR0FBdUUsR0FBdkUsR0FBMkVBLGNBQWMsQ0FBZCxDQUEzRSxHQUE0RixZQUEzSDtBQUNEO0FBQ0QsWUFBSUMsZUFBZTlPLFFBQVErRCxHQUFSLENBQVksaUJBQVosQ0FBbkI7QUFDQStLLHdCQUFnQiwwQ0FBd0NsRCxZQUF4QyxHQUFxRCxrREFBckQsR0FBd0dpRCxjQUFjLENBQWQsQ0FBeEcsR0FBeUgsR0FBekgsR0FBNkhBLGNBQWMsQ0FBZCxDQUE3SCxHQUE4SSxXQUE5SjtBQUNBN08sZ0JBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQnlPLFlBQS9CO0FBQ0EsWUFBSUMsUUFBUS9PLFFBQVErRCxHQUFSLENBQVksb0JBQVosQ0FBWjtBQUNBZ0wsY0FBTXZOLElBQU4sQ0FBV3VJLFdBQVNtQyxZQUFZSSxTQUFoQztBQUNBdE0sZ0JBQVFLLEdBQVIsQ0FBWSxvQkFBWixFQUFrQzBPLEtBQWxDO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHN0MsWUFBWUMsSUFBWixLQUFxQixjQUF4QixFQUNBO0FBQ0VuTSxjQUFRSyxHQUFSLENBQVksd0JBQVosRUFBc0MsRUFBdEM7QUFDQUwsY0FBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLEVBQW5DO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEVBQTNCOztBQUVBLFVBQUkyTyxZQUFhbkUsaUJBQWlCaEcsSUFBakIsQ0FBc0JxSCxZQUFZSSxTQUFsQyxDQUFqQjtBQUNBLFVBQUcwQyxTQUFILEVBQ0E7QUFDRTNGLHVCQUFlUSxNQUFmLENBQXNCb0YsR0FBdEIsR0FBNEIsY0FBWWxGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxtQ0FBdkU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFLLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLHFRQUFtUTBKLFFBQW5RLEdBQTRRbUMsWUFBWUksU0FBeFIsR0FBa1MsTUFBL1Q7QUFDRDtBQUNELFVBQUlhLGdCQUFpQnJDLGlCQUFpQmpHLElBQWpCLENBQXNCcUgsWUFBWUksU0FBbEMsQ0FBckI7QUFDQSxVQUFHYSxhQUFILEVBQ0E7QUFDRTlELHVCQUFlUSxNQUFmLENBQXNCdUQsT0FBdEIsR0FBZ0MsY0FBWXJELFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx3QkFBM0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDQUEsZ0JBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4Qiw0REFBMEQwSixRQUExRCxHQUFtRW1DLFlBQVlJLFNBQS9FLEdBQXlGLE1BQXZIO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHSixZQUFZQyxJQUFaLEtBQXFCLFVBQXhCLEVBQ0E7QUFDRSxVQUFJK0MsYUFBYWpFLHFCQUFxQnBHLElBQXJCLENBQTBCcUgsWUFBWUksU0FBdEMsQ0FBakI7QUFDQSxVQUFHNEMsVUFBSCxFQUNBO0FBQ0U3Rix1QkFBZVEsTUFBZixDQUFzQnNGLFFBQXRCLEdBQWlDLGNBQVlwRixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsc0NBQTVFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsZ0JBQTlDLEVBQWdFcEQsR0FBaEUsRUFBcUVsSixPQUFyRTtBQUNEO0FBQ0Y7O0FBRUQsUUFBR2tNLFlBQVlDLElBQVosS0FBcUIsY0FBeEIsRUFDQTtBQUNFLFVBQUlpRCxjQUFjbEUsbUJBQW1CckcsSUFBbkIsQ0FBd0JxSCxZQUFZSSxTQUFwQyxDQUFsQjtBQUNBLFVBQUc4QyxXQUFILEVBQ0E7QUFDRS9GLHVCQUFlUSxNQUFmLENBQXNCd0YsS0FBdEIsR0FBOEIsY0FBWXRGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyw0QkFBekU7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxtQkFBOUMsRUFBbUVwRCxHQUFuRSxFQUF3RWxKLE9BQXhFO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQix1QkFBeEIsRUFDQTtBQUNFbk0sY0FBUUssR0FBUixDQUFZLDRCQUFaLEVBQTBDLEVBQTFDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QztBQUNBTCxjQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsRUFBL0I7QUFDQWdKLHFCQUFlaUcsVUFBZixDQUEwQkMsR0FBMUIsR0FBZ0MsY0FBWXhGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyx5QkFBM0U7QUFDQXRNLGNBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixnRUFBOEQwSixRQUE5RCxHQUF1RW1DLFlBQVlJLFNBQW5GLEdBQTZGLElBQTNIO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixvQkFBeEIsRUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBLFVBQUlxRCxXQUFXckUsb0JBQW9CdEcsSUFBcEIsQ0FBeUJxSCxZQUFZSSxTQUFyQyxDQUFmO0FBQ0EsVUFBR2tELFFBQUgsRUFDQTtBQUNFbkcsdUJBQWVpRyxVQUFmLENBQTBCRyxXQUExQixHQUF3QyxjQUFZMUYsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHFDQUFuRjtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNEO0FBQ0QsVUFBSTBQLFdBQVd0RSx3QkFBd0J2RyxJQUF4QixDQUE2QnFILFlBQVlJLFNBQXpDLENBQWY7QUFDQSxVQUFHb0QsUUFBSCxFQUNBO0FBQ0VyRyx1QkFBZWlHLFVBQWYsQ0FBMEJLLE1BQTFCLEdBQW1DLGNBQVk1RixRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsZ0NBQTlFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRCxVQUFJNFAsV0FBV3ZFLHlCQUF5QnhHLElBQXpCLENBQThCcUgsWUFBWUksU0FBMUMsQ0FBZjtBQUNBLFVBQUdzRCxRQUFILEVBQ0E7QUFDRXZHLHVCQUFlaUcsVUFBZixDQUEwQk8sT0FBMUIsR0FBb0MsY0FBWTlGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBL0U7QUFDQUssUUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDtBQUVKO0FBQ0QsUUFBR2tNLFlBQVlDLElBQVosS0FBc0IsbUJBQXpCLEVBQ0E7QUFDRTlDLHFCQUFlaUcsVUFBZixDQUEwQkQsS0FBMUIsR0FBa0MsY0FBWXRGLFFBQVosR0FBcUJtQyxZQUFZSSxTQUFqQyxHQUEyQyxpQ0FBN0U7QUFDQUssTUFBQSx3R0FBQUEsQ0FBYTVDLFFBQWIsRUFBdUJtQyxZQUFZSSxTQUFuQyxFQUE4QyxLQUE5QyxFQUFxRHBELEdBQXJELEVBQTBEbEosT0FBMUQ7QUFDRDs7QUFFRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFLFVBQUkyRCxjQUFjeEUsb0JBQW9CekcsSUFBcEIsQ0FBeUJxSCxZQUFZSSxTQUFyQyxDQUFsQjtBQUNBLFVBQUl5RCxZQUFZeEUsa0JBQWtCMUcsSUFBbEIsQ0FBdUJxSCxZQUFZSSxTQUFuQyxDQUFoQjtBQUNBdE0sY0FBUUssR0FBUixDQUFZLHlCQUFaLEVBQXVDLEVBQXZDO0FBQ0FMLGNBQVFLLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxFQUFwQztBQUNBTCxjQUFRSyxHQUFSLENBQVksY0FBWixFQUE0QixFQUE1QjtBQUNBLFVBQUd5UCxXQUFILEVBQ0E7QUFDRXpHLHVCQUFlMkcsT0FBZixDQUF1Qm5DLEtBQXZCLEdBQStCLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMkJBQTFFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsU0FBOUMsRUFBeURwRCxHQUF6RCxFQUE4RGxKLE9BQTlEO0FBRUQ7QUFDRCxVQUFHK1AsU0FBSCxFQUNBO0FBQ0UxRyx1QkFBZTJHLE9BQWYsQ0FBdUJsSSxHQUF2QixHQUE2QixjQUFZaUMsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUF4RTtBQUNBdE0sZ0JBQVFLLEdBQVIsQ0FBWSxhQUFaLEVBQTJCMEosV0FBU21DLFlBQVlJLFNBQWhEO0FBQ0FrQywwQkFBa0J6RSxXQUFTbUMsWUFBWUksU0FBdkMsRUFBa0QsZ0JBQWxELEVBQW9FLEtBQXBFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0Q7QUFDRjtBQUNELFFBQUdrTSxZQUFZQyxJQUFaLEtBQXFCLFNBQXhCLEVBQ0E7QUFDSW5NLGNBQVFLLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxFQUF0QztBQUNBTCxjQUFRSyxHQUFSLENBQVkscUJBQVosRUFBbUMsRUFBbkM7QUFDQUwsY0FBUUssR0FBUixDQUFZLGFBQVosRUFBMkIsRUFBM0I7QUFDQWdKLHFCQUFlNEcsTUFBZixDQUFzQnBDLEtBQXRCLEdBQThCLGNBQVk5RCxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsMEJBQXpFO0FBQ0FLLE1BQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsUUFBOUMsRUFBd0RwRCxHQUF4RCxFQUE2RGxKLE9BQTdEO0FBQ0g7QUFDRCxRQUFHa00sWUFBWUMsSUFBWixLQUFxQixpQkFBeEIsRUFDQTtBQUNFLFVBQUkrRCxnQkFBZ0IxRSxxQkFBcUIzRyxJQUFyQixDQUEwQnFILFlBQVlJLFNBQXRDLENBQXBCO0FBQ0EsVUFBSTZELGVBQWUxRSxvQkFBb0I1RyxJQUFwQixDQUF5QnFILFlBQVlJLFNBQXJDLENBQW5CO0FBQ0EsVUFBRzRELGFBQUgsRUFDQTtBQUNJN0csdUJBQWU0RyxNQUFmLENBQXNCRyxPQUF0QixHQUFnQyxjQUFZckcsUUFBWixHQUFxQm1DLFlBQVlJLFNBQWpDLEdBQTJDLHlCQUEzRTtBQUNBSyxRQUFBLHdHQUFBQSxDQUFhNUMsUUFBYixFQUF1Qm1DLFlBQVlJLFNBQW5DLEVBQThDLEtBQTlDLEVBQXFEcEQsR0FBckQsRUFBMERsSixPQUExRDtBQUNBQSxnQkFBUUssR0FBUixDQUFZLG9CQUFaLEVBQWtDMEosV0FBU21DLFlBQVlJLFNBQXZEO0FBQ0FrQywwQkFBa0J6RSxXQUFTbUMsWUFBWUksU0FBdkMsRUFBa0QsdUJBQWxELEVBQTJFLEtBQTNFO0FBQ0g7QUFDRCxVQUFHNkQsWUFBSCxFQUNBO0FBQ0k5Ryx1QkFBZTRHLE1BQWYsQ0FBc0JJLE1BQXRCLEdBQStCLGNBQVl0RyxRQUFaLEdBQXFCbUMsWUFBWUksU0FBakMsR0FBMkMsd0JBQTFFO0FBQ0FLLFFBQUEsd0dBQUFBLENBQWE1QyxRQUFiLEVBQXVCbUMsWUFBWUksU0FBbkMsRUFBOEMsS0FBOUMsRUFBcURwRCxHQUFyRCxFQUEwRGxKLE9BQTFEO0FBQ0FBLGdCQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUMwSixXQUFTbUMsWUFBWUksU0FBdEQ7QUFDQWtDLDBCQUFrQnpFLFdBQVNtQyxZQUFZSSxTQUF2QyxFQUFrRCxzQkFBbEQsRUFBMEUsS0FBMUU7QUFDSDtBQUNGO0FBQ0Y7O0FBRUQ7QUFDQSxNQUFHLENBQUVULG9CQUFMLEVBQ0E7QUFDRTdMLFlBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQix5Q0FBL0I7QUFDRDtBQUNELE1BQUcsQ0FBRTJMLG9CQUFMLEVBQ0E7QUFDRWhNLFlBQVFLLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxRQUFNMEksVUFBVVEsT0FBaEIsR0FBd0IsOEJBQS9EO0FBQ0F2SixZQUFRSyxHQUFSLENBQVksc0JBQVosRUFBb0MsRUFBcEM7QUFDQUwsWUFBUUssR0FBUixDQUFZLGNBQVosRUFBNEIsRUFBNUI7QUFDRDtBQUNELE1BQUcsQ0FBRTRMLHlCQUFMLEVBQ0E7QUFDRWpNLFlBQVFLLEdBQVIsQ0FBWSw4QkFBWixFQUE0QyxRQUFNMEksVUFBVVksWUFBaEIsR0FBNkIsK0JBQXpFO0FBQ0EzSixZQUFRSyxHQUFSLENBQVksMkJBQVosRUFBeUMsRUFBekM7QUFDQUwsWUFBUUssR0FBUixDQUFZLG1CQUFaLEVBQWlDLEVBQWpDO0FBQ0Q7QUFDRCxNQUFHeUwsb0JBQUgsRUFDQTtBQUNFLFFBQUlpRCxRQUFRL08sUUFBUStELEdBQVIsQ0FBWSxvQkFBWixDQUFaO0FBQ0F5SyxzQkFBa0JPLE1BQU0sQ0FBTixDQUFsQixFQUE0QixnQkFBNUIsRUFBOEMsSUFBOUM7QUFDRDtBQUNGOztBQUVNLFNBQVNQLGlCQUFULENBQTJCOEIsR0FBM0IsRUFBZ0NDLE1BQWhDLEVBQXdDbkQsT0FBeEMsRUFDUDtBQUNFLE1BQUlvRCxnQkFBZ0IsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDLFFBQUdBLEtBQUtqTCxFQUFMLEtBQVksR0FBZixFQUFtQjtBQUFDLGFBQU8sU0FBUDtBQUFrQjtBQUN0QyxRQUFHaUwsS0FBS2pMLEVBQUwsS0FBWSxHQUFmLEVBQW1CO0FBQUMsYUFBTyxTQUFQO0FBQWtCO0FBQ3RDLFdBQU8sTUFBUDtBQUNELEdBSkQ7QUFLQSxNQUFJa0wsZ0JBQWdCLFVBQVNELElBQVQsRUFBYztBQUNoQztBQUNBO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDtBQUtBdFEsVUFBUUMsR0FBUixDQUFZLGNBQVlrUSxHQUF4QjtBQUNBLE1BQUlLLFVBQVVDLEVBQUVMLE1BQUYsQ0FBZDtBQUNBLE1BQUlNLFNBQVMsRUFBRUMsaUJBQWlCLFNBQW5CLEVBQWI7QUFDQSxNQUFJQyxTQUFTQyxPQUFPQyxZQUFQLENBQXFCTixPQUFyQixFQUE4QkUsTUFBOUIsQ0FBYjtBQUNBLE1BQUlqTSxPQUFPLG9HQUFBc00sQ0FBU1osR0FBVCxFQUFjLEtBQWQsRUFBcUIsRUFBckIsQ0FBWDtBQUNBUyxTQUFPSSxRQUFQLENBQWlCdk0sSUFBakIsRUFBdUIsS0FBdkIsRUFoQkYsQ0FnQndEO0FBQ3RELE1BQUd3SSxPQUFILEVBQ0E7QUFDRTJELFdBQU9LLFFBQVAsQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBQ2hFLFNBQVMsRUFBQ2lFLFdBQVdiLGFBQVosRUFBVixFQUFwQixFQURGLENBQytEO0FBQzlELEdBSEQsTUFJSztBQUNITyxXQUFPSyxRQUFQLENBQWdCLEVBQWhCLEVBQW9CLEVBQUNoRSxTQUFTLEVBQUNpRSxXQUFXWCxhQUFaLEVBQVYsRUFBcEIsRUFERyxDQUMwRDtBQUM5RDtBQUNESyxTQUFPTyxNQUFQLEdBeEJGLENBd0J3RDtBQUN0RFAsU0FBT1EsTUFBUCxHQXpCRixDQXlCd0Q7QUFDdERSLFNBQU9TLElBQVAsQ0FBWSxHQUFaLEVBQWlCLElBQWpCO0FBQ0Q7O0FBRU0sU0FBU0MsbUJBQVQsQ0FBNkJ6UixPQUE3QixFQUFzQ3FKLGNBQXRDLEVBQ1A7QUFDRTtBQUNBLE1BQUlxSSxtQkFBbUIxUixRQUFRK0QsR0FBUixDQUFZLGdCQUFaLENBQXZCO0FBQ0EsTUFBRyxhQUFhc0YsY0FBaEIsRUFDQTtBQUNFLFFBQUdBLGVBQWVFLE9BQWYsQ0FBdUJxRCxLQUExQixFQUFnQztBQUNoQzhFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVFLE9BQWYsQ0FBdUJELE1BQS9DLENBQW5CO0FBQ0FvSSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlRSxPQUFmLENBQXVCcUQsS0FBL0MsQ0FBbkI7QUFDQThFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVFLE9BQWYsQ0FBdUJ1RCxHQUEvQyxDQUFuQjtBQUNBNEUseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQXNEO0FBQ3ZEO0FBQ0QsTUFBRyxjQUFjdEksY0FBakIsRUFDQTtBQUNFcUksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWpELFFBQWYsQ0FBd0JrRCxNQUFoRCxDQUFuQjtBQUNBb0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWpELFFBQWYsQ0FBd0IyRyxLQUFoRCxDQUFuQjtBQUNBMkUsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWpELFFBQWYsQ0FBd0I0RyxJQUFoRCxDQUFuQjtBQUNBMEUsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGVBQWV0SSxjQUFsQixFQUNBO0FBQ0VxSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlRyxTQUFmLENBQXlCRixNQUFqRCxDQUFuQjtBQUNBb0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZUcsU0FBZixDQUF5QjVFLElBQWpELENBQW5CO0FBQ0E4TSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlRyxTQUFmLENBQXlCMEQsU0FBakQsQ0FBbkI7QUFDQXdFLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVHLFNBQWYsQ0FBeUI0RCxPQUFqRCxDQUFuQjtBQUNBc0UsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGtCQUFrQnRJLGNBQXJCLEVBQ0E7QUFDRXFJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVJLFlBQWYsQ0FBNEJILE1BQXBELENBQW5CO0FBQ0FvSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlSSxZQUFmLENBQTRCb0UsS0FBcEQsQ0FBbkI7QUFDQTZELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVJLFlBQWYsQ0FBNEJzRSxLQUFwRCxDQUFuQjtBQUNBMkQsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGlCQUFpQnRJLGNBQXBCLEVBQ0E7QUFDRXFJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWV5RSxXQUFmLENBQTJCeEUsTUFBbkQsQ0FBbkI7QUFDQW9JLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWV5RSxXQUFmLENBQTJCRCxLQUFuRCxDQUFuQjtBQUNBNkQsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZXlFLFdBQWYsQ0FBMkJDLEtBQW5ELENBQW5CO0FBQ0EyRCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsa0JBQWtCdEksY0FBckIsRUFDQTtBQUNFLFFBQUdBLGVBQWVNLFlBQWYsQ0FBNEJrRSxLQUEvQixFQUFxQztBQUNyQzZELHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVNLFlBQWYsQ0FBNEJMLE1BQXBELENBQW5CO0FBQ0FvSSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlTSxZQUFmLENBQTRCa0UsS0FBcEQsQ0FBbkI7QUFDQTZELHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVNLFlBQWYsQ0FBNEJvRSxLQUFwRCxDQUFuQjtBQUNBMkQseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0M7QUFDRjtBQUNELE1BQUcsYUFBYXRJLGNBQWhCLEVBQ0E7QUFDRXFJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVpRSxPQUFmLENBQXVCaEUsTUFBL0MsQ0FBbkI7QUFDQSxRQUFHRCxlQUFlaUUsT0FBZixDQUF1QkYsT0FBMUIsRUFDQTtBQUNBc0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWlFLE9BQWYsQ0FBdUJGLE9BQS9DLENBQW5CO0FBQ0FzRSx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlaUUsT0FBZixDQUF1QkUsU0FBL0MsQ0FBbkI7QUFDQWtFLHlCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVpRSxPQUFmLENBQXVCSSxPQUEvQyxDQUFuQjtBQUNBZ0UseUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWlFLE9BQWYsQ0FBdUJNLFNBQS9DLENBQW5CO0FBQ0MsS0FORCxNQVFBO0FBQ0U4RCx5QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0Isc0NBQXhCLENBQW5CO0FBQ0Q7QUFDREQsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGFBQWF0SSxjQUFoQixFQUNBO0FBQ0VxSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlSyxPQUFmLENBQXVCSixNQUEvQyxDQUFuQjtBQUNBb0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZUssT0FBZixDQUF1QjZFLEtBQS9DLENBQW5CO0FBQ0FtRCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlSyxPQUFmLENBQXVCK0UsT0FBL0MsQ0FBbkI7QUFDQWlELHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVLLE9BQWYsQ0FBdUJnRixLQUEvQyxDQUFuQjtBQUNBZ0QsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGFBQWF0SSxjQUFoQixFQUNBO0FBQ0VxSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlTyxPQUFmLENBQXVCTixNQUEvQyxDQUFuQjtBQUNBb0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZU8sT0FBZixDQUF1QjJFLEtBQS9DLENBQW5CO0FBQ0FtRCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlTyxPQUFmLENBQXVCK0UsU0FBL0MsQ0FBbkI7QUFDQStDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVPLE9BQWYsQ0FBdUJnRixRQUEvQyxDQUFuQjtBQUNBOEMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLFlBQVl0SSxjQUFmLEVBQ0E7QUFDRXFJLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVRLE1BQWYsQ0FBc0JQLE1BQTlDLENBQW5CO0FBQ0FvSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlUSxNQUFmLENBQXNCb0YsR0FBOUMsQ0FBbkI7QUFDQXlDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVRLE1BQWYsQ0FBc0J1RCxPQUE5QyxDQUFuQjtBQUNBc0UsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZVEsTUFBZixDQUFzQnNGLFFBQTlDLENBQW5CO0FBQ0F1Qyx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlUSxNQUFmLENBQXNCd0YsS0FBOUMsQ0FBbkI7QUFDQXFDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEO0FBQ0QsTUFBRyxnQkFBZ0J0SSxjQUFuQixFQUNBO0FBQ0VxSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlaUcsVUFBZixDQUEwQmhHLE1BQWxELENBQW5CO0FBQ0FvSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlaUcsVUFBZixDQUEwQkQsS0FBbEQsQ0FBbkI7QUFDQXFDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVpRyxVQUFmLENBQTBCQyxHQUFsRCxDQUFuQjtBQUNBbUMsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZWlHLFVBQWYsQ0FBMEJLLE1BQWxELENBQW5CO0FBQ0ErQix1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlaUcsVUFBZixDQUEwQkcsV0FBbEQsQ0FBbkI7QUFDQWlDLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QnRJLGVBQWVpRyxVQUFmLENBQTBCTyxPQUFsRCxDQUFuQjtBQUNBNkIsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCLFFBQXhCLENBQW5CO0FBQ0Q7QUFDRCxNQUFHLGFBQWF0SSxjQUFoQixFQUNBO0FBQ0VxSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlMkcsT0FBZixDQUF1QjFHLE1BQS9DLENBQW5CO0FBQ0FvSSx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlMkcsT0FBZixDQUF1Qm5DLEtBQS9DLENBQW5CO0FBQ0E2RCx1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlMkcsT0FBZixDQUF1QmxJLEdBQS9DLENBQW5CO0FBQ0E0Six1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEIsQ0FBbkI7QUFDRDtBQUNELE1BQUcsWUFBWXRJLGNBQWYsRUFDQTtBQUNFcUksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZTRHLE1BQWYsQ0FBc0IzRyxNQUE5QyxDQUFuQjtBQUNBb0ksdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZTRHLE1BQWYsQ0FBc0JwQyxLQUE5QyxDQUFuQjtBQUNBNkQsdUJBQW1CQSxpQkFBaUJDLE1BQWpCLENBQXdCdEksZUFBZTRHLE1BQWYsQ0FBc0JHLE9BQTlDLENBQW5CO0FBQ0FzQix1QkFBbUJBLGlCQUFpQkMsTUFBakIsQ0FBd0J0SSxlQUFlNEcsTUFBZixDQUFzQkksTUFBOUMsQ0FBbkI7QUFDQXFCLHVCQUFtQkEsaUJBQWlCQyxNQUFqQixDQUF3QixRQUF4QixDQUFuQjtBQUNEOztBQUVEM1IsVUFBUUssR0FBUixDQUFZLGdCQUFaLEVBQThCcVIsZ0JBQTlCO0FBQ0Q7O0FBR00sU0FBU0UsbUJBQVQsR0FDUDtBQUNFLE1BQUlDLGVBQWUsRUFBbkI7QUFDQSxNQUFHO0FBQ0RBLGlCQUFhQyx1QkFBYixHQUF1Q0MsU0FBU0MsY0FBVCxDQUF3Qix3QkFBeEIsRUFBa0R2SixLQUF6RjtBQUNELEdBRkQsQ0FHQSxPQUFNd0osR0FBTixFQUFXO0FBQ1RKLGlCQUFhQyx1QkFBYixHQUF1QyxNQUF2QztBQUNEO0FBQ0QsTUFBRztBQUNERCxpQkFBYUssMkJBQWIsR0FBMkNILFNBQVNDLGNBQVQsQ0FBd0IsNkJBQXhCLEVBQXVEdkosS0FBbEc7QUFDRCxHQUZELENBR0EsT0FBTXdKLEdBQU4sRUFBVztBQUNUSixpQkFBYUssMkJBQWIsR0FBMkMsQ0FBM0M7QUFDRDs7QUFFRCxNQUFHO0FBQ0RMLGlCQUFhTSxvQkFBYixHQUFvQ0osU0FBU0MsY0FBVCxDQUF3QixzQkFBeEIsRUFBZ0R2SixLQUFwRjtBQUNELEdBRkQsQ0FHQSxPQUFNd0osR0FBTixFQUFXO0FBQ1RKLGlCQUFhTSxvQkFBYixHQUFvQyxFQUFwQztBQUNEO0FBQ0QsTUFBRztBQUNETixpQkFBYU8sb0JBQWIsR0FBb0NMLFNBQVNDLGNBQVQsQ0FBd0Isc0JBQXhCLEVBQWdEdkosS0FBcEY7QUFDRCxHQUZELENBR0EsT0FBTXdKLEdBQU4sRUFBVztBQUNUSixpQkFBYU8sb0JBQWIsR0FBb0MsRUFBcEM7QUFDRDtBQUNELE1BQUc7QUFDRFAsaUJBQWFRLFdBQWIsR0FBMkJOLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDdkosS0FBdkU7QUFDRCxHQUZELENBR0EsT0FBTXdKLEdBQU4sRUFBVztBQUNUSixpQkFBYVEsV0FBYixHQUEyQixPQUEzQjtBQUNEOztBQUVELE1BQUc7QUFDRFIsaUJBQWFTLHlCQUFiLEdBQXlDUCxTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q3ZKLEtBQXJGO0FBQ0FvSixpQkFBYVUsbUJBQWIsR0FBbUNSLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDdkosS0FBL0U7QUFDQW9KLGlCQUFhVyxrQkFBYixHQUFrQ1QsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEN2SixLQUE5RTtBQUNBb0osaUJBQWFZLHFCQUFiLEdBQXFDVixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q3ZKLEtBQWpGO0FBQ0QsR0FMRCxDQU1BLE9BQU13SixHQUFOLEVBQVc7QUFDVEosaUJBQWFTLHlCQUFiLEdBQXlDLEdBQXpDO0FBQ0FULGlCQUFhVSxtQkFBYixHQUFtQyxHQUFuQztBQUNBVixpQkFBYVcsa0JBQWIsR0FBa0MsR0FBbEM7QUFDQVgsaUJBQWFZLHFCQUFiLEdBQXFDLEdBQXJDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RaLGlCQUFhYSxrQkFBYixHQUFrQ1gsU0FBU0MsY0FBVCxDQUF3QixvQkFBeEIsRUFBOEN2SixLQUFoRjtBQUNBb0osaUJBQWFjLHFCQUFiLEdBQXFDWixTQUFTQyxjQUFULENBQXdCLG9CQUF4QixFQUE4Q3ZKLEtBQW5GO0FBQ0QsR0FIRCxDQUlBLE9BQU13SixHQUFOLEVBQVc7QUFDVEosaUJBQWFhLGtCQUFiLEdBQWtDLElBQWxDO0FBQ0FiLGlCQUFhYyxxQkFBYixHQUFxQyxJQUFyQztBQUNEO0FBQ0QsTUFBRztBQUNEZCxpQkFBYWUsbUJBQWIsR0FBbUNiLFNBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUN2SixLQUExRTtBQUNELEdBRkQsQ0FHQSxPQUFNd0osR0FBTixFQUFXO0FBQ1RKLGlCQUFhZSxtQkFBYixHQUFtQyxHQUFuQztBQUNEOztBQUVELE1BQUc7QUFDRGYsaUJBQWFnQix5QkFBYixHQUF5Q2QsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEN2SixLQUE1QyxHQUFrRHNKLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDdkosS0FBdkk7QUFDRCxHQUZELENBR0EsT0FBTXdKLEdBQU4sRUFBVztBQUNUSixpQkFBYWdCLHlCQUFiLEdBQXlDLElBQXpDO0FBQ0Q7QUFDRCxNQUFHO0FBQ0RoQixpQkFBYWlCLG1CQUFiLEdBQW1DZixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q3ZKLEtBQS9FO0FBQ0FvSixpQkFBYWtCLDJCQUFiLEdBQTRDaEIsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEN2SixLQUF4RjtBQUNELEdBSEQsQ0FJQSxPQUFNd0osR0FBTixFQUFXO0FBQ1RKLGlCQUFhaUIsbUJBQWIsR0FBbUMsR0FBbkM7QUFDQWpCLGlCQUFha0IsMkJBQWIsR0FBMkMsR0FBM0M7QUFDRDtBQUNELE1BQUc7QUFDRGxCLGlCQUFhbUIsb0JBQWIsR0FBb0NqQixTQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q3ZKLEtBQWhGO0FBQ0FvSixpQkFBYW9CLDRCQUFiLEdBQTRDbEIsU0FBU0MsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEN2SixLQUF4RjtBQUNELEdBSEQsQ0FJQSxPQUFNd0osR0FBTixFQUFXO0FBQ1RKLGlCQUFhaUIsbUJBQWIsR0FBbUMsR0FBbkM7QUFDQWpCLGlCQUFha0IsMkJBQWIsR0FBMkMsR0FBM0M7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQU9sQixZQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7OztBQ3h6QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPLFNBQVNxQixZQUFULENBQXNCQyxHQUF0QixFQUEyQjFMLElBQTNCLEVBQWlDMkwsU0FBakMsRUFDUDtBQUNFalQsVUFBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWStTLEdBQVo7QUFDQWhULFVBQVFDLEdBQVIsQ0FBWXFILElBQVo7QUFDQSxNQUFJNEwsV0FBVyxJQUFmO0FBQ0F6QyxJQUFFMEMsSUFBRixDQUFPO0FBQ0w3TCxVQUFNQSxJQUREO0FBRUw3QyxVQUFNd08sU0FGRDtBQUdMRyxXQUFPLEtBSEY7QUFJTEMsaUJBQWEsS0FKUjtBQUtMQyxpQkFBYSxLQUxSO0FBTUxDLFdBQVMsS0FOSjtBQU9MQyxjQUFVLE1BUEw7QUFRTDtBQUNBUixTQUFLQSxHQVRBO0FBVUxTLGFBQVUsVUFBVWhQLElBQVYsRUFDVjtBQUNFLFVBQUdBLFNBQVMsSUFBWixFQUFpQjtBQUFDc0IsY0FBTSxxQkFBTjtBQUE4QjtBQUNoRG1OLGlCQUFTek8sSUFBVDtBQUNBO0FBQ0QsS0FmSTtBQWdCTGlQLFdBQU8sVUFBVUEsS0FBVixFQUFpQjtBQUFDM04sWUFBTSxvQkFBa0JpTixHQUFsQixHQUFzQixXQUF0QixHQUFrQ1UsTUFBTUMsWUFBeEMsR0FBcUQsNkdBQTNELEVBQTJLLE9BQU8sSUFBUDtBQUNyTSxLQWpCTSxFQUFQLEVBaUJJQyxZQWpCSjtBQWtCQSxTQUFPVixRQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNPLFNBQVNXLFFBQVQsQ0FBa0JoVSxPQUFsQixFQUEyQmdKLFFBQTNCLEVBQXFDcEMsR0FBckMsRUFBMEN1RixJQUExQyxFQUFnRDhILEtBQWhELEVBQXVEQyxVQUF2RCxFQUFtRUMsU0FBbkUsRUFBOEVwTCxTQUE5RSxFQUF5RjhJLFlBQXpGLEVBQ1A7QUFDRTtBQUNBMVIsVUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWTRJLFFBQVo7QUFDQSxNQUFJL0ksT0FBTyxJQUFYO0FBQ0EsTUFDQTtBQUNFQSxXQUFPLElBQUltVSxJQUFKLENBQVMsQ0FBQ3hOLEdBQUQsQ0FBVCxDQUFQO0FBQ0QsR0FIRCxDQUdFLE9BQU95TixDQUFQLEVBQ0Y7QUFDRW5PLFVBQU1tTyxDQUFOO0FBQ0Q7QUFDRCxNQUFJQyxLQUFLLElBQUlDLFFBQUosRUFBVDtBQUNBRCxLQUFHRSxNQUFILENBQVUsWUFBVixFQUF3QnZVLElBQXhCLEVBQThCLFdBQTlCO0FBQ0FxVSxLQUFHRSxNQUFILENBQVUsS0FBVixFQUFnQnhMLFFBQWhCO0FBQ0FzTCxLQUFHRSxNQUFILENBQVUsaUJBQVYsRUFBNEJySSxJQUE1QjtBQUNBbUksS0FBR0UsTUFBSCxDQUFVLE9BQVYsRUFBbUJQLEtBQW5CO0FBQ0FLLEtBQUdFLE1BQUgsQ0FBVSx5QkFBVixFQUFxQzNDLGFBQWFDLHVCQUFsRDtBQUNBd0MsS0FBR0UsTUFBSCxDQUFVLDZCQUFWLEVBQXlDM0MsYUFBYUssMkJBQXREO0FBQ0FvQyxLQUFHRSxNQUFILENBQVUsMkJBQVYsRUFBdUMzQyxhQUFhUyx5QkFBcEQ7QUFDQWdDLEtBQUdFLE1BQUgsQ0FBVSxxQkFBVixFQUFpQzNDLGFBQWFVLG1CQUE5QztBQUNBK0IsS0FBR0UsTUFBSCxDQUFVLG9CQUFWLEVBQWdDM0MsYUFBYWEsa0JBQTdDO0FBQ0E0QixLQUFHRSxNQUFILENBQVUsb0JBQVYsRUFBZ0MzQyxhQUFhVyxrQkFBN0M7QUFDQThCLEtBQUdFLE1BQUgsQ0FBVSx1QkFBVixFQUFtQzNDLGFBQWFZLHFCQUFoRDtBQUNBNkIsS0FBR0UsTUFBSCxDQUFVLHVCQUFWLEVBQW1DM0MsYUFBYWMscUJBQWhEO0FBQ0EyQixLQUFHRSxNQUFILENBQVUscUJBQVYsRUFBaUMzQyxhQUFhZSxtQkFBOUM7QUFDQTBCLEtBQUdFLE1BQUgsQ0FBVSwyQkFBVixFQUF1QzNDLGFBQWFnQix5QkFBcEQ7QUFDQXlCLEtBQUdFLE1BQUgsQ0FBVSxxQkFBVixFQUFpQzNDLGFBQWFpQixtQkFBOUM7QUFDQXdCLEtBQUdFLE1BQUgsQ0FBVSxzQkFBVixFQUFrQzNDLGFBQWFtQixvQkFBL0M7QUFDQXNCLEtBQUdFLE1BQUgsQ0FBVSw2QkFBVixFQUF5QzNDLGFBQWFrQiwyQkFBdEQ7QUFDQXVCLEtBQUdFLE1BQUgsQ0FBVSw4QkFBVixFQUEwQzNDLGFBQWFvQiw0QkFBdkQ7QUFDQSxNQUFJd0IsZ0JBQWdCdkIsYUFBYWdCLFVBQWIsRUFBeUIsTUFBekIsRUFBaUNJLEVBQWpDLENBQXBCO0FBQ0EsTUFBR0csa0JBQWtCLElBQXJCLEVBQ0E7QUFDRSxRQUFJQyxRQUFReEIsYUFBYWlCLFNBQWIsRUFBdUIsS0FBdkIsRUFBNkIsRUFBN0IsQ0FBWjtBQUNBO0FBQ0EsUUFBR25MLFlBQVkwTCxLQUFmLEVBQ0E7QUFDRTFVLGNBQVFLLEdBQVIsQ0FBWTJJLFdBQVMsT0FBckIsRUFBOEJELFVBQVVDLFFBQVYsSUFBb0IsdUJBQXBCLEdBQTRDMEwsTUFBTTFMLFFBQU4sQ0FBNUMsR0FBNEQsVUFBMUY7QUFDRCxLQUhELE1BS0E7QUFDRWhKLGNBQVFLLEdBQVIsQ0FBWTJJLFdBQVMsT0FBckIsRUFBOEIseUNBQXVDRCxVQUFVQyxRQUFWLENBQXZDLEdBQTJELFFBQXpGO0FBQ0Q7QUFDRCxTQUFJLElBQUkyTCxDQUFSLElBQWFGLGFBQWIsRUFDQTtBQUNFLFVBQUdFLEtBQUssTUFBUixFQUNBO0FBQ0UzVSxnQkFBUUssR0FBUixDQUFZLFlBQVosRUFBMEJvVSxjQUFjRSxDQUFkLENBQTFCO0FBQ0EsWUFBRyxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDN1AsUUFBN0MsQ0FBc0RrRSxRQUF0RCxDQUFILEVBQ0E7QUFDRWhKLGtCQUFRNFUsSUFBUixDQUFhLGNBQWIsRUFBNkIsS0FBN0I7QUFDRCxTQUhELE1BS0E7QUFDRUMsaUJBQU9ELElBQVAsQ0FBWSxjQUFaLEVBQTRCLElBQTVCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0EzQkQsTUE2QkE7QUFDRSxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDTyxTQUFTRSxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUNiLFVBQWpDLEVBQTZDbkssUUFBN0MsRUFBdUQvSixPQUF2RCxFQUNQO0FBQ0lHLFVBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNBLE1BQUkrUyxNQUFNZSxhQUFXbFUsUUFBUStELEdBQVIsQ0FBWSxZQUFaLENBQXJCO0FBQ0E7QUFDQSxNQUFJaVIsc0JBQXNCOUIsYUFBYUMsR0FBYixFQUFrQixLQUFsQixFQUF5QixFQUF6QixDQUExQjtBQUNBLE1BQUcsQ0FBRTZCLG1CQUFMLEVBQXlCO0FBQUM5TyxVQUFNLG9CQUFOO0FBQTZCO0FBQ3ZELE1BQUlVLE1BQU1zSyxTQUFTbkgsV0FBU2lMLG9CQUFvQkMsV0FBcEIsQ0FBZ0MsQ0FBaEMsRUFBbUNDLFVBQXJELEVBQWlFLEtBQWpFLEVBQXdFLEVBQXhFLENBQVY7QUFDQSxNQUFJQyxPQUFPLEVBQVg7QUFDQUgsc0JBQW9CQyxXQUFwQixDQUFnQ3RVLE9BQWhDLENBQXdDLFVBQVN5VSxVQUFULEVBQW9CO0FBQzFERCxZQUFRQyxXQUFXcE0sUUFBWCxHQUFvQixHQUE1QjtBQUNELEdBRkQ7QUFHQW1NLFNBQU9BLEtBQUtFLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQVA7QUFDQSxTQUFPLEVBQUMsT0FBT3pPLEdBQVIsRUFBYSxTQUFTb08sb0JBQW9CQyxXQUFwQixDQUFnQyxDQUFoQyxFQUFtQ2hCLEtBQXpELEVBQWdFLFFBQVFlLG9CQUFvQkMsV0FBcEIsQ0FBZ0MsQ0FBaEMsRUFBbUNLLGVBQTNHLEVBQTRILFFBQVFILElBQXBJLEVBQVA7QUFDSDs7QUFHRDtBQUNPLFNBQVNqRSxRQUFULENBQWtCaUMsR0FBbEIsRUFBdUIxTCxJQUF2QixFQUE2QjJMLFNBQTdCLEVBQ1A7O0FBRUMsTUFBSUMsV0FBVyxJQUFmO0FBQ0N6QyxJQUFFMEMsSUFBRixDQUFPO0FBQ0w3TCxVQUFNQSxJQUREO0FBRUw3QyxVQUFNd08sU0FGRDtBQUdMRyxXQUFPLEtBSEY7QUFJTEMsaUJBQWEsS0FKUjtBQUtMQyxpQkFBYSxLQUxSO0FBTUxDLFdBQVMsS0FOSjtBQU9MO0FBQ0E7QUFDQVAsU0FBS0EsR0FUQTtBQVVMUyxhQUFVLFVBQVVoUCxJQUFWLEVBQ1Y7QUFDRSxVQUFHQSxTQUFTLElBQVosRUFBaUI7QUFBQ3NCLGNBQU0sbUNBQU47QUFBNEM7QUFDOURtTixpQkFBU3pPLElBQVQ7QUFDQTtBQUNELEtBZkk7QUFnQkxpUCxXQUFPLFVBQVVBLEtBQVYsRUFBaUI7QUFBQzNOLFlBQU0sb0hBQU47QUFBNkg7QUFoQmpKLEdBQVA7QUFrQkEsU0FBT21OLFFBQVA7QUFDRDs7QUFHRDtBQUNBO0FBQ08sU0FBUzFHLFlBQVQsQ0FBc0I0SSxRQUF0QixFQUFnQ2hKLElBQWhDLEVBQXNDaUosR0FBdEMsRUFBMkN0TSxHQUEzQyxFQUFnRGxKLE9BQWhELEVBQ1A7QUFDRSxNQUFJbVQsTUFBTW9DLFdBQVdoSixJQUFyQjtBQUNBLE1BQUlrSixZQUFZbEosS0FBS3hMLEtBQUwsQ0FBVyxHQUFYLENBQWhCO0FBQ0E7QUFDQTtBQUNBWixVQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxNQUFJaVQsV0FBVyxJQUFmO0FBQ0F6QyxJQUFFMEMsSUFBRixDQUFPO0FBQ0w3TCxVQUFNLEtBREQ7QUFFTGlNLFdBQVMsSUFGSjtBQUdMUCxTQUFLQSxHQUhBO0FBSUxTLGFBQVUsVUFBVTNULElBQVYsRUFDVjtBQUNFaUosVUFBSXdNLE1BQUosQ0FBV0QsVUFBVSxDQUFWLENBQVgsRUFBeUJ4VixJQUF6QixDQUE4QndWLFVBQVUsQ0FBVixDQUE5QixFQUE0Q3hWLElBQTVDO0FBQ0EsVUFBR3VWLFFBQVEsT0FBWCxFQUNBO0FBQ0V4VixnQkFBUUssR0FBUixDQUFZLGVBQVosRUFBNkJKLElBQTdCO0FBQ0F3RixjQUFNOEQsT0FBTixDQUFjdEosSUFBZCxFQUFvQixjQUFwQixFQUFvQyxFQUFDMEYsUUFBUSxxQkFBVCxFQUFnQ0MsZUFBZSxDQUEvQyxFQUFwQztBQUNEO0FBQ0QsVUFBRzRQLFFBQVEsS0FBWCxFQUNBO0FBQ0VyUSxRQUFBLG1HQUFBQSxDQUFVbkYsT0FBVixFQUFtQkMsSUFBbkI7QUFDRDtBQUNELFVBQUd1VixRQUFRLE9BQVgsRUFDQTtBQUNFclAsUUFBQSxxR0FBQUEsQ0FBWW5HLE9BQVosRUFBcUJDLElBQXJCO0FBQ0E7QUFDRDtBQUNELFVBQUd1VixRQUFRLE1BQVgsRUFDQTtBQUNFblAsUUFBQSxvR0FBQUEsQ0FBV3JHLE9BQVgsRUFBb0JDLElBQXBCO0FBQ0Q7QUFDRCxVQUFHdVYsUUFBUSxZQUFYLEVBQ0E7QUFDRTdPLFFBQUEsMEdBQUFBLENBQWlCM0csT0FBakIsRUFBMEJDLElBQTFCO0FBQ0Q7QUFDRCxVQUFHdVYsUUFBUSxTQUFYLEVBQ0E7QUFDRWhPLFFBQUEsdUdBQUFBLENBQWN4SCxPQUFkLEVBQXVCQyxJQUF2QixFQUE2QixNQUE3QjtBQUNEO0FBQ0QsVUFBR3VWLFFBQVEsYUFBWCxFQUNBO0FBQ0VoTyxRQUFBLHVHQUFBQSxDQUFjeEgsT0FBZCxFQUF1QkMsSUFBdkIsRUFBNkIsS0FBN0I7QUFDRDtBQUNELFVBQUd1VixRQUFRLGFBQVgsRUFDQTtBQUNFaE8sUUFBQSx1R0FBQUEsQ0FBY3hILE9BQWQsRUFBdUJDLElBQXZCLEVBQTZCLE1BQTdCO0FBQ0Q7QUFDRCxVQUFHdVYsUUFBUSxTQUFYLEVBQ0E7QUFDRXROLFFBQUEsdUdBQUFBLENBQWNsSSxPQUFkLEVBQXVCQyxJQUF2QjtBQUNEO0FBQ0QsVUFBR3VWLFFBQVEsZ0JBQVgsRUFDQTtBQUNFOVIsUUFBQSx1R0FBQUEsQ0FBYzFELE9BQWQsRUFBdUJDLElBQXZCO0FBQ0Q7QUFDRCxVQUFHdVYsUUFBUSxtQkFBWCxFQUNBO0FBQ0V4VSxRQUFBLHVHQUFBQSxDQUFjaEIsT0FBZCxFQUF1QkMsSUFBdkI7QUFDRDtBQUNELFVBQUd1VixRQUFRLFNBQVgsRUFDQTtBQUNFbFYsUUFBQSx1R0FBQUEsQ0FBY04sT0FBZCxFQUF1QkMsSUFBdkI7QUFDRDtBQUNELFVBQUd1VixRQUFRLFFBQVgsRUFDQTtBQUNFelYsUUFBQSxzR0FBQUEsQ0FBYUMsT0FBYixFQUFzQkMsSUFBdEI7QUFDRDtBQUVGLEtBOURJO0FBK0RMNFQsV0FBTyxVQUFVQSxLQUFWLEVBQWlCO0FBQUMzTixZQUFNeVAsS0FBS0MsU0FBTCxDQUFlL0IsS0FBZixDQUFOO0FBQThCO0FBL0RsRCxHQUFQO0FBaUVELEM7Ozs7Ozs7OztBQ3ZPRDtBQUFBO0FBQ08sU0FBU2dDLFNBQVQsQ0FBbUJwTixLQUFuQixFQUEwQnFOLEtBQTFCLEVBQWlDO0FBQ3RDLE1BQUdBLE1BQU10TixPQUFOLENBQWNDLEtBQWQsSUFBdUIsQ0FBQyxDQUEzQixFQUNBO0FBQ0UsV0FBTyxJQUFQO0FBQ0QsR0FIRCxNQUlLO0FBQ0gsV0FBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBO0FBQ08sU0FBU3NOLDJCQUFULENBQXFDL1YsT0FBckMsRUFBNkM7O0FBRWxELE1BQUk0RyxNQUFNNUcsUUFBUStELEdBQVIsQ0FBWSxVQUFaLENBQVY7QUFDQSxNQUFJaVMsV0FBV3BQLElBQUk3RixLQUFKLENBQVUsRUFBVixDQUFmO0FBQ0EsTUFBSXFFLGNBQWMsRUFBbEI7QUFDQTRRLFdBQVNyVixPQUFULENBQWlCLFVBQVNzVixHQUFULEVBQWE7QUFDNUI3USxnQkFBWTVELElBQVosQ0FBaUIsRUFBQyxPQUFPeVUsR0FBUixFQUFqQjtBQUNELEdBRkQ7QUFHQWpXLFVBQVFLLEdBQVIsQ0FBWSxhQUFaLEVBQTJCK0UsV0FBM0I7QUFDQUssUUFBTUMsY0FBTixDQUFxQjFGLFFBQVErRCxHQUFSLENBQVksYUFBWixDQUFyQixFQUFpRCxFQUFDNEIsUUFBUSxtQkFBVCxFQUE4QkMsZUFBZSxDQUE3QyxFQUFnREMsT0FBTyxLQUF2RCxFQUE4REMsaUJBQWlCLEdBQS9FLEVBQW9GQyxPQUFPLEdBQTNGLEVBQWdHQyxRQUFRLEdBQXhHLEVBQTZHQyxrQkFBa0IsR0FBL0gsRUFBakQ7QUFDRDs7QUFFRDtBQUNPLFNBQVNpUSxVQUFULEdBQXNCO0FBQ3pCLE1BQUlDLE9BQU8sRUFBWDtBQUNBO0FBQ0EsTUFBSUMsUUFBUUMsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJqTyxPQUFyQixDQUE2Qix5QkFBN0IsRUFDWixVQUFTa08sQ0FBVCxFQUFXQyxHQUFYLEVBQWVoTyxLQUFmLEVBQXNCO0FBQ3BCME4sU0FBS00sR0FBTCxJQUFZaE8sS0FBWjtBQUNELEdBSFcsQ0FBWjtBQUlBLFNBQU8wTixJQUFQO0FBQ0Q7O0FBRUg7QUFDQyxXQUFVcEUsUUFBVixFQUFvQjJFLGVBQXBCLEVBQXFDO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBQ0EsTUFBSUMsWUFBWSxhQUFoQjtBQUNBLE1BQUlDLFFBQVEsc0JBQXNCRCxTQUF0QixHQUFrQyxtQkFBbEMsR0FBd0RBLFNBQXhELEdBQW9FLFdBQXBFLEdBQWtGQSxTQUFsRixHQUE4RixlQUE5RixHQUFnSEEsU0FBaEgsR0FBNEgsV0FBNUgsR0FBMElBLFNBQXRKOztBQUVBTixTQUFPUSxXQUFQLEdBQXFCLFVBQVVsRyxPQUFWLEVBQW1COztBQUVwQyxRQUFJbUcsU0FBSjs7QUFFQSxRQUFJLENBQUNuRyxPQUFMLEVBQWM7QUFDVjtBQUNBQSxnQkFBVW1HLFlBQVkvRSxTQUFTZ0YsYUFBVCxDQUF1QixNQUF2QixDQUF0QjtBQUNBRCxnQkFBVUYsS0FBVixDQUFnQkksT0FBaEIsR0FBMEIsa0JBQWtCTCxTQUE1QztBQUNBRCxzQkFBZ0JPLFlBQWhCLENBQTZCSCxTQUE3QixFQUF3Qy9FLFNBQVNtRixJQUFqRDtBQUNIOztBQUVEO0FBQ0EsUUFBSUMsY0FBY3BGLFNBQVNnRixhQUFULENBQXVCLEdBQXZCLENBQWxCO0FBQ0FJLGdCQUFZUCxLQUFaLENBQWtCSSxPQUFsQixHQUE0QkosS0FBNUI7QUFDQWpHLFlBQVF5RyxXQUFSLENBQW9CRCxXQUFwQjs7QUFFQTtBQUNBLFFBQUkxTyxRQUFRME8sWUFBWUUsV0FBeEI7O0FBRUEsUUFBSVAsU0FBSixFQUFlO0FBQ1g7QUFDQUosc0JBQWdCWSxXQUFoQixDQUE0QlIsU0FBNUI7QUFDSCxLQUhELE1BSUs7QUFDRDtBQUNBbkcsY0FBUTJHLFdBQVIsQ0FBb0JILFdBQXBCO0FBQ0g7O0FBRUQ7QUFDQSxXQUFPMU8sS0FBUDtBQUNILEdBOUJEO0FBK0JILENBdkNBLEVBdUNDc0osUUF2Q0QsRUF1Q1dBLFNBQVMyRSxlQXZDcEIsQ0FBRCxDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUlhLFlBQVksSUFBSUMsU0FBSixDQUFjLGFBQWQsQ0FBaEI7QUFDQSxJQUFJdE8sTUFBTSxJQUFJQyxLQUFKLEVBQVY7O0FBRUFvTyxVQUFVRSxFQUFWLENBQWEsU0FBYixFQUF3QixVQUFTcEQsQ0FBVCxFQUFZO0FBQ2hDbFUsVUFBUUMsR0FBUixDQUFZaVUsQ0FBWjtBQUNILENBRkQ7QUFHQWtELFVBQVVFLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFVBQVNwRCxDQUFULEVBQVk7QUFDOUJsVSxVQUFRQyxHQUFSLENBQVlpVSxDQUFaO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBLElBQUlxRCxnQkFBZ0IsSUFBcEI7QUFDQSxJQUFJeEQsYUFBYSxJQUFqQjtBQUNBLElBQUlDLFlBQVksSUFBaEI7QUFDQSxJQUFJd0QsWUFBWSxpRUFBaEI7QUFDQSxJQUFJQyxXQUFXLDRCQUFmO0FBQ0EsSUFBSUMsV0FBVyxlQUFmO0FBQ0EsSUFBSTlOLFdBQVcsRUFBZjtBQUNBLElBQUlsQixjQUFjLGlFQUErRDhPLFNBQS9ELEdBQXlFLGFBQTNGO0FBQ0EsSUFBSTdPLFdBQVcsQ0FBQyxTQUFELEVBQVksY0FBWixFQUE0QixZQUE1QixFQUEwQyxVQUExQyxFQUFzRCxTQUF0RCxFQUNDLFdBREQsRUFDYyxhQURkLEVBQzZCLFNBRDdCLEVBQ3dDLGNBRHhDLEVBQ3dELFNBRHhELEVBRUMsU0FGRCxFQUVZLFFBRlosRUFFc0IsU0FGdEIsRUFFaUMsUUFGakMsRUFFMkMsVUFGM0MsRUFFdUQsUUFGdkQsQ0FBZjtBQUdBLElBQUlnUCxlQUFlLENBQUMsU0FBRCxFQUFZLGNBQVosRUFBNEIsWUFBNUIsRUFBMEMsVUFBMUMsRUFBc0QsU0FBdEQsRUFDQyxXQURELEVBQ2MsYUFEZCxFQUM2QixTQUQ3QixFQUN3QyxjQUR4QyxFQUN3RCxTQUR4RCxFQUVDLFNBRkQsRUFFWSxRQUZaLENBQW5CO0FBR0EsSUFBSUMsa0JBQWtCLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsVUFBdEIsRUFBa0MsUUFBbEMsQ0FBdEI7QUFDQSxJQUFJaFAsWUFBWTtBQUNkLGFBQVcsY0FERztBQUVkLGNBQVksWUFGRTtBQUdkLGVBQWEsWUFIQztBQUlkLGtCQUFnQixjQUpGO0FBS2QsYUFBVyxTQUxHO0FBTWQsaUJBQWUsYUFORDtBQU9kLGFBQVcsU0FQRztBQVFkLGtCQUFnQixjQVJGO0FBU2QsYUFBVyxlQVRHO0FBVWQsYUFBVyxjQVZHO0FBV2QsWUFBVSxVQVhJO0FBWWQsZ0JBQWMsWUFaQTtBQWFkLGFBQVcsU0FiRztBQWNkLFlBQVUsUUFkSTtBQWVkLGNBQVksVUFmRTtBQWdCZCxZQUFVO0FBaEJJLENBQWhCOztBQW1CQSxJQUFHdU4sU0FBUzBCLFFBQVQsS0FBc0IsV0FBdEIsSUFBcUMxQixTQUFTMEIsUUFBVCxLQUFzQixXQUE5RCxFQUNBO0FBQ0VOLGtCQUFnQixzREFBaEI7QUFDQXhELGVBQWEsdURBQWI7QUFDQUMsY0FBWSxxREFBWjtBQUNBMEQsYUFBVyxZQUFYO0FBQ0FELGFBQVcsdUJBQVg7QUFDQUQsY0FBWSw0QkFBWjtBQUNBNU4sYUFBVzZOLFFBQVg7QUFDRCxDQVRELE1BVUssSUFBR3RCLFNBQVMwQixRQUFULEtBQXNCLDJCQUF0QixJQUFxRDFCLFNBQVMwQixRQUFULEtBQXVCLHFCQUE1RSxJQUFxRzFCLFNBQVNDLElBQVQsS0FBbUIsMENBQTNILEVBQXVLO0FBQzFLbUIsa0JBQWdCRSxXQUFTQyxRQUFULEdBQWtCLGlCQUFsQztBQUNBM0QsZUFBYTBELFdBQVNDLFFBQVQsR0FBa0Isa0JBQS9CO0FBQ0ExRCxjQUFZeUQsV0FBU0MsUUFBVCxHQUFrQixnQkFBOUI7QUFDQTlOLGFBQVc2TixXQUFTQyxRQUFULEdBQWtCLE1BQTdCO0FBQ0E7QUFDRCxDQU5JLE1BT0E7QUFDSDNSLFFBQU0sdUNBQU47QUFDQXdSLGtCQUFnQixFQUFoQjtBQUNBeEQsZUFBYSxFQUFiO0FBQ0FDLGNBQVksRUFBWjtBQUNEOztBQUVELElBQUk4RCxzQkFBc0I7QUFDdEJDLHlCQUF1QixDQUREO0FBRXRCQywwQkFBd0IsQ0FGRjtBQUd0QkMsbUJBQWlCLENBSEs7QUFJdEJDLHdCQUFzQixDQUpBO0FBS3RCQyx5QkFBdUIsQ0FMRDtBQU10QkMsNkJBQTJCLENBTkw7QUFPdEJDLG9CQUFrQixDQVBJO0FBUXRCQyxvQkFBa0IsQ0FSSTtBQVN0QkMsb0JBQWtCLENBVEk7QUFVdEJDLG1CQUFpQixDQVZLO0FBV3RCQyxvQkFBa0IsQ0FYSTtBQVl0QkMsbUJBQWlCLENBWks7QUFhdEJDLHFCQUFtQixDQWJHO0FBY3RCQyxnQkFBYyxJQWRRO0FBZXRCQyxrQkFBZ0IsRUFmTTs7QUFpQnRCQyxpQkFBZSxJQWpCTztBQWtCdEJDLGtCQUFnQixJQWxCTTtBQW1CdEJDLHVCQUFxQixFQW5CQztBQW9CdEJDLHFCQUFtQixFQXBCRztBQXFCdEJDLGNBQVksSUFyQlU7QUFzQnRCQyxnQkFBYyxFQXRCUTtBQXVCdEJDLHdCQUFzQixFQXZCQTtBQXdCdEJDLHNCQUFvQixFQXhCRTtBQXlCdEJDLGFBQVcsSUF6Qlc7QUEwQnRCQyxlQUFhLEVBMUJTO0FBMkJ0QkMsZ0JBQWMsSUEzQlE7QUE0QnRCQyxlQUFhLElBNUJTO0FBNkJ0QkMsY0FBWSxJQTdCVTtBQThCdEJDLGdCQUFjLEVBOUJRO0FBK0J0QkMsaUJBQWUsSUEvQk87QUFnQ3RCQyxtQkFBaUIsRUFoQ0s7QUFpQ3RCQyxzQkFBb0IsRUFqQ0U7QUFrQ3RCQyxrQkFBZ0IsSUFsQ007QUFtQ3RCQyxpQkFBZSxJQW5DTztBQW9DdEI1VixrQkFBZ0IsSUFwQ007QUFxQ3RCVCxtQkFBaUIsSUFyQ0s7QUFzQ3RCc1csbUJBQWlCLElBdENLO0FBdUN0QkMsa0JBQWdCLElBdkNNO0FBd0N0QjlaLGlCQUFlLElBeENPO0FBeUN0QitaLGVBQWEsSUF6Q1M7QUEwQ3RCcGEsZ0JBQWMsSUExQ1E7QUEyQ3RCcWEsc0JBQW9CLElBM0NFO0FBNEN0QkMscUJBQW1CLElBNUNHOztBQThDdEJDLG1CQUFpQixJQTlDSztBQStDdEJDLGdCQUFjLElBL0NRO0FBZ0R0QkMsZUFBYSxJQWhEUztBQWlEdEJDLGlCQUFlLElBakRPO0FBa0R0QkMsZUFBYSxJQWxEUzs7QUFvRHRCO0FBQ0FDLFlBQVUsRUFyRFk7QUFzRHRCQyxtQkFBaUIsQ0F0REs7QUF1RHRCQyxxQkFBbUIsQ0F2REc7QUF3RHRCQyxvQkFBa0IsQ0F4REk7QUF5RHRCaEgsU0FBTyxFQXpEZTtBQTBEdEI5SCxRQUFNLEVBMURnQjtBQTJEdEIrTyxjQUFZLElBM0RVO0FBNER0QjtBQUNBOVYsZUFBYTtBQTdEUyxDQUExQjtBQStEQTBELFNBQVNuSSxPQUFULENBQWlCLFVBQVNxSSxRQUFULEVBQWtCO0FBQ2pDaVAsc0JBQW9CalAsV0FBUyxVQUE3QixJQUEyQyxLQUEzQztBQUNBaVAsc0JBQW9CalAsV0FBUyxTQUE3QixJQUEwQyxLQUExQztBQUNBaVAsc0JBQW9CalAsV0FBUyxNQUE3QixJQUF1Q0EsV0FBUyxNQUFoRDtBQUNBaVAsc0JBQW9CalAsV0FBUyxrQkFBN0IsSUFBbUQsOEJBQTRCRCxVQUFVQyxRQUFWLENBQTVCLEdBQWdELHNCQUFuRztBQUNBaVAsc0JBQW9CalAsV0FBUyxlQUE3QixJQUFnREgsV0FBaEQ7QUFDQW9QLHNCQUFvQmpQLFdBQVMsZUFBN0IsSUFBZ0QsY0FBaEQ7QUFDRCxDQVBEO0FBUUFpUCxvQkFBb0JrRCxjQUFwQixHQUFxQyxJQUFyQztBQUNBbEQsb0JBQW9CWSxlQUFwQixHQUFzQyxDQUF0QztBQUNBWixvQkFBb0JDLHFCQUFwQixHQUE0QyxDQUE1QztBQUNBRCxvQkFBb0JFLHNCQUFwQixHQUE2QyxDQUE3QztBQUNBO0FBQ0EsSUFBSW5ZLFVBQVUsSUFBSW9iLE9BQUosQ0FBWTtBQUN4QkMsTUFBSSxlQURvQjtBQUV4QkMsWUFBVSxnQkFGYztBQUd4QjFXLFFBQU1xVDtBQUhrQixDQUFaLENBQWQ7O0FBTUE7QUFDQSxJQUFHM0IsU0FBUzBCLFFBQVQsS0FBc0IsV0FBekIsRUFBc0M7QUFDcENoWSxVQUFRSyxHQUFSLENBQVksT0FBWixFQUFxQix5QkFBckI7QUFDQUwsVUFBUUssR0FBUixDQUFZLE1BQVosRUFBb0IsTUFBcEI7QUFDQUwsVUFBUUssR0FBUixDQUFZLFVBQVosRUFBd0IsdURBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSxJQUFJa2IsYUFBYSw0RUFBakI7QUFDQSxJQUFJQyxhQUFhRCxXQUFXMVcsSUFBWCxDQUFnQixrR0FBQXFSLEdBQWFuQixJQUE3QixDQUFqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTBHLGVBQWV6YixRQUFRMGIsT0FBUixDQUFnQixVQUFoQixFQUE0QixVQUFTQyxRQUFULEVBQW1CQyxRQUFuQixFQUE4Qjs7QUFLMUUsTUFBSWpYLFFBQVEsV0FBWjtBQUNELE1BQUlqRSxRQUFRaUUsTUFBTUUsSUFBTixDQUFXOFcsUUFBWCxDQUFaO0FBQ0EsTUFBR2piLEtBQUgsRUFDQTtBQUNFLFNBQUtMLEdBQUwsQ0FBUyxNQUFULEVBQWlCSyxNQUFNLENBQU4sQ0FBakI7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUVDLENBZmdCLEVBZ0JqQixFQUFDbWIsTUFBTSxLQUFQO0FBQ0NDLFNBQU87QUFEUixDQWhCaUIsQ0FBbkI7O0FBb0JBO0FBQ0E5YixRQUFRMGIsT0FBUixDQUFpQixrQkFBakIsRUFBcUMsVUFBV2pULEtBQVgsRUFBbUI7QUFDdEQsTUFBSXNULGFBQWEvYixRQUFRK0QsR0FBUixDQUFZLGlCQUFaLENBQWpCO0FBQ0EsTUFBSWlZLFlBQVloYyxRQUFRK0QsR0FBUixDQUFZLG1CQUFaLENBQWhCO0FBQ0EsTUFBRzBFLFFBQVFzVCxVQUFYLEVBQ0E7QUFDRS9iLFlBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQzBiLFVBQWhDO0FBQ0Q7QUFDRCxNQUFHdFQsU0FBU3VULFNBQVosRUFDQTtBQUNFaGMsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDMmIsWUFBVSxDQUExQztBQUNEO0FBQ0YsQ0FYRDtBQVlBaGMsUUFBUTBiLE9BQVIsQ0FBaUIsbUJBQWpCLEVBQXNDLFVBQVdqVCxLQUFYLEVBQW1CO0FBQ3ZELE1BQUl3VCxXQUFXamMsUUFBUStELEdBQVIsQ0FBWSxrQkFBWixDQUFmO0FBQ0EsTUFBRzBFLFFBQVEsQ0FBWCxFQUNBO0FBQ0V6SSxZQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUMsQ0FBakM7QUFDRDtBQUNELE1BQUdvSSxTQUFTd1QsUUFBWixFQUNBO0FBQ0VqYyxZQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUM0YixXQUFTLENBQTFDO0FBQ0Q7QUFDRixDQVZEOztBQVlBO0FBQ0E7QUFDQWpjLFFBQVF5WCxFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTdEwsSUFBVCxFQUFlK1AsUUFBZixFQUF3QjtBQUNqRC9iLFVBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBLE1BQUkrUyxNQUFNZSxhQUFhbFUsUUFBUStELEdBQVIsQ0FBWSxZQUFaLENBQXZCO0FBQ0FvWSxVQUFRQyxTQUFSLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCdkUsV0FBUyxTQUFULEdBQW1CN1gsUUFBUStELEdBQVIsQ0FBWSxZQUFaLENBQS9DO0FBQ0EsTUFBR21ZLFFBQUgsRUFBWTtBQUNWbkcsSUFBQSxtSEFBQUEsQ0FBNEIvVixPQUE1QjtBQUNEO0FBQ0QsTUFBSXFjLFdBQVdDLFlBQVksWUFBVTtBQUNuQyxRQUFJQyxRQUFRLHdHQUFBckosQ0FBYUMsR0FBYixFQUFrQixLQUFsQixFQUF5QixFQUF6QixDQUFaO0FBQ0EsUUFBSTlKLGlCQUFpQixFQUFyQjs7QUFFQSxRQUFHa1QsTUFBTUMsS0FBTixLQUFnQixVQUFuQixFQUNBO0FBQ0VyYyxjQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxVQUFJNlUsY0FBY3NILE1BQU10SCxXQUF4QjtBQUNBQSxrQkFBWXRVLE9BQVosQ0FBb0IsVUFBU2lFLElBQVQsRUFBYztBQUM5QjtBQUNBd0UsUUFBQSwwSEFBQUEsQ0FBdUJ4RSxJQUF2QixFQUE2QnlFLGNBQTdCLEVBQTZDUCxRQUE3QyxFQUF1REMsU0FBdkQ7QUFDQWUsUUFBQSxrSEFBQUEsQ0FBZTlKLE9BQWYsRUFBd0I0RSxJQUF4QixFQUE4Qm1GLFFBQTlCLEVBQXdDYixHQUF4QyxFQUE2Q0csY0FBN0MsRUFBNkROLFNBQTdEO0FBRUgsT0FMRDtBQU1BMEksTUFBQSx1SEFBQUEsQ0FBb0J6UixPQUFwQixFQUE2QnFKLGNBQTdCOztBQUVBb1Qsb0JBQWNKLFFBQWQ7QUFDRDtBQUNELFFBQUdFLE1BQU1DLEtBQU4sS0FBZ0IsT0FBaEIsSUFBMkJELE1BQU1DLEtBQU4sS0FBZ0IsT0FBOUMsRUFDQTtBQUNFLFVBQUlFLHFCQUFxQkgsTUFBTXRILFdBQU4sQ0FBa0IsQ0FBbEIsRUFBcUIwSCxZQUE5QztBQUNBelcsWUFBTSxnQ0FDQSxrRkFEQSxHQUNtRndXLGtCQUR6RjtBQUVFRCxvQkFBY0osUUFBZDtBQUNIO0FBQ0YsR0F6QmMsRUF5QlosSUF6QlksQ0FBZjtBQTJCRCxDQWxDRCxFQWtDRSxFQUFDUixNQUFNLEtBQVA7QUFDQ0MsU0FBTztBQURSLENBbENGOztBQXVDQTtBQUNBOWIsUUFBUXlYLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFVBQVVtRixPQUFWLEVBQW1CO0FBQ3JDLE1BQUk3SCxPQUFPL1UsUUFBUStELEdBQVIsQ0FBWSxZQUFaLENBQVg7QUFDQW1GLE1BQUkyVCxhQUFKLENBQWtCLEVBQUNwVixNQUFLLE1BQU4sRUFBbEIsRUFBaUNxVixJQUFqQyxDQUFzQyxVQUFVQyxJQUFWLEVBQWdCO0FBQ2xEQyxXQUFPRCxJQUFQLEVBQWFoSSxPQUFLLE1BQWxCO0FBQ0gsR0FGRDtBQUdILENBTEQ7O0FBT0EvVSxRQUFReVgsRUFBUixDQUFXLGNBQVgsRUFBMkIsVUFBU3dGLEtBQVQsRUFBZ0I7QUFDekMsTUFBSUMsTUFBTWxkLFFBQVErRCxHQUFSLENBQVksa0JBQVosQ0FBVjtBQUNBLE1BQUdtWixHQUFILEVBQU87QUFDTGxkLFlBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNELEdBRkQsTUFJQTtBQUNFTCxZQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRDtBQUNGLENBVEQ7QUFVQUwsUUFBUXlYLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVN3RixLQUFULEVBQWdCO0FBQ3pDLE1BQUlDLE1BQU1sZCxRQUFRK0QsR0FBUixDQUFZLGtCQUFaLENBQVY7QUFDQSxNQUFHbVosR0FBSCxFQUFPO0FBQ0xsZCxZQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRCxHQUZELE1BSUE7QUFDRUwsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0Q7QUFDRixDQVREO0FBVUFMLFFBQVF5WCxFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTd0YsS0FBVCxFQUFnQjtBQUN6QyxNQUFJQyxNQUFNbGQsUUFBUStELEdBQVIsQ0FBWSxrQkFBWixDQUFWO0FBQ0EsTUFBR21aLEdBQUgsRUFBTztBQUNMbGQsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0QsR0FGRCxNQUlBO0FBQ0VMLFlBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNEO0FBQ0YsQ0FURDtBQVVBTCxRQUFReVgsRUFBUixDQUFXLGFBQVgsRUFBMEIsVUFBU3dGLEtBQVQsRUFBZ0I7QUFDeEMsTUFBSUMsTUFBTWxkLFFBQVErRCxHQUFSLENBQVksaUJBQVosQ0FBVjtBQUNBLE1BQUdtWixHQUFILEVBQU87QUFDTGxkLFlBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNELEdBRkQsTUFJQTtBQUNFTCxZQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDRDtBQUNGLENBVEQ7QUFVQUwsUUFBUXlYLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQVN3RixLQUFULEVBQWdCO0FBQ3pDLE1BQUlDLE1BQU1sZCxRQUFRK0QsR0FBUixDQUFZLGtCQUFaLENBQVY7QUFDQSxNQUFHbVosR0FBSCxFQUFPO0FBQ0xsZCxZQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDRCxHQUZELE1BSUE7QUFDRUwsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0Q7QUFDRixDQVREO0FBVUFMLFFBQVF5WCxFQUFSLENBQVcsYUFBWCxFQUEwQixVQUFTd0YsS0FBVCxFQUFnQjtBQUN4QyxNQUFJQyxNQUFNbGQsUUFBUStELEdBQVIsQ0FBWSxpQkFBWixDQUFWO0FBQ0EsTUFBR21aLEdBQUgsRUFBTztBQUNMbGQsWUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0QsR0FGRCxNQUlBO0FBQ0VMLFlBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNEO0FBQ0YsQ0FURDtBQVVBTCxRQUFReVgsRUFBUixDQUFXLGVBQVgsRUFBNEIsVUFBU3dGLEtBQVQsRUFBZ0I7QUFDMUMsTUFBSUMsTUFBTWxkLFFBQVErRCxHQUFSLENBQVksbUJBQVosQ0FBVjtBQUNBLE1BQUdtWixHQUFILEVBQU87QUFDTGxkLFlBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNELEdBRkQsTUFJQTtBQUNFTCxZQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUMsQ0FBakM7QUFDRDtBQUNGLENBVEQ7QUFVQTtBQUNBO0FBQ0FMLFFBQVF5WCxFQUFSLENBQVksaUJBQVosRUFBK0IsVUFBV3dGLEtBQVgsRUFBbUI7QUFDaERqZCxVQUFRSyxHQUFSLENBQWEsd0JBQWIsRUFBdUMsSUFBdkM7QUFDQUwsVUFBUUssR0FBUixDQUFhLHdCQUFiLEVBQXVDLENBQXZDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxDQUFqQztBQUNBTCxVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsQ0FBL0I7QUFDQUwsVUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQUwsVUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBeUksV0FBU25JLE9BQVQsQ0FBaUIsVUFBU3FJLFFBQVQsRUFBa0I7QUFDL0IsUUFBSW1VLFVBQVUsS0FBZDtBQUNBLFFBQUduVSxhQUFhLFNBQWhCLEVBQTBCO0FBQUNtVSxnQkFBVSxJQUFWO0FBQWdCO0FBQzNDbmQsWUFBUUssR0FBUixDQUFhMkksV0FBUyxVQUF0QixFQUFrQ21VLE9BQWxDO0FBQ0gsR0FKRDtBQUtBbmQsVUFBUUssR0FBUixDQUFhLHVCQUFiLEVBQXNDLElBQXRDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxDQUF0QztBQUNELENBakJEOztBQW1CQUwsUUFBUXlYLEVBQVIsQ0FBWSxrQkFBWixFQUFnQyxVQUFXd0YsS0FBWCxFQUFtQjtBQUNqRGpkLFVBQVFLLEdBQVIsQ0FBYSx1QkFBYixFQUFzQyxJQUF0QztBQUNBTCxVQUFRSyxHQUFSLENBQWEsdUJBQWIsRUFBc0MsQ0FBdEM7QUFDQUwsVUFBUUssR0FBUixDQUFZLG1CQUFaLEVBQWlDLENBQWpDO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixDQUEvQjtBQUNBTCxVQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQUwsVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxDQUFoQztBQUNBTCxVQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0MsQ0FBaEM7QUFDQUwsVUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLENBQWhDO0FBQ0V5SSxXQUFTbkksT0FBVCxDQUFpQixVQUFTcUksUUFBVCxFQUFrQjtBQUNqQ2hKLFlBQVFLLEdBQVIsQ0FBYTJJLFdBQVMsVUFBdEIsRUFBa0MsS0FBbEM7QUFDSCxHQUZDO0FBR0ZoSixVQUFRSyxHQUFSLENBQWEsd0JBQWIsRUFBdUMsSUFBdkM7QUFDQUwsVUFBUUssR0FBUixDQUFhLHdCQUFiLEVBQXVDLENBQXZDO0FBQ0QsQ0FmRDs7QUFpQkFMLFFBQVF5WCxFQUFSLENBQVksa0JBQVosRUFBZ0MsVUFBV3dGLEtBQVgsRUFBbUI7QUFDakR0VSxFQUFBLDhHQUFBQSxDQUFXLENBQVgsRUFBYzNJLE9BQWQ7QUFDRCxDQUZEOztBQUlBO0FBQ0E4SSxTQUFTbkksT0FBVCxDQUFpQixVQUFTcUksUUFBVCxFQUFtQm5JLENBQW5CLEVBQXFCO0FBQ3BDVixVQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQUosVUFBUXlYLEVBQVIsQ0FBV3pPLFdBQVMsU0FBcEIsRUFBK0IsVUFBVWlVLEtBQVYsRUFBaUI7QUFDOUN0VSxJQUFBLDhHQUFBQSxDQUFXOUgsSUFBRSxDQUFiLEVBQWdCYixPQUFoQjtBQUNBLFFBQUdnSixhQUFhLFNBQWhCLEVBQ0E7QUFDRSxVQUFHaEosUUFBUStELEdBQVIsQ0FBWSxlQUFaLENBQUgsRUFDQTtBQUNFMEIsY0FBTThELE9BQU4sQ0FBY3ZKLFFBQVErRCxHQUFSLENBQVksZUFBWixDQUFkLEVBQTRDLGNBQTVDLEVBQTRELEVBQUM0QixRQUFRLHFCQUFULEVBQWdDQyxlQUFlLENBQS9DLEVBQTVEO0FBQ0Q7QUFDRjtBQUNELFFBQUdvRCxhQUFhLFVBQWhCLEVBQ0E7QUFDRSxVQUFHaEosUUFBUStELEdBQVIsQ0FBWSxnQkFBWixDQUFILEVBQ0E7QUFDRTBCLGNBQU1lLGtCQUFOLENBQXlCeEcsUUFBUStELEdBQVIsQ0FBWSxnQkFBWixDQUF6QixFQUF3RCxLQUF4RCxFQUErRCxDQUFDLFdBQUQsQ0FBL0QsRUFBOEUsQ0FBQyxPQUFELENBQTlFLEVBQTBGLGFBQTFGLEVBQXlHLEVBQUM0QixRQUFRLGVBQVQsRUFBMEJjLFdBQVcsTUFBckMsRUFBNkNDLFVBQVUsR0FBdkQsRUFBNERkLGVBQWUsQ0FBM0UsRUFBOEVDLE9BQU8sS0FBckYsRUFBNEZDLGlCQUFpQixHQUE3RyxFQUFrSEMsT0FBTyxHQUF6SCxFQUE4SEMsUUFBUSxHQUF0SSxFQUEySUMsa0JBQWtCLEdBQTdKLEVBQXpHO0FBQ0Q7QUFDRjtBQUNELFFBQUcrQyxhQUFhLFNBQWhCLEVBQ0E7QUFDRSxVQUFHaEosUUFBUStELEdBQVIsQ0FBWSxvQkFBWixFQUFrQ3hDLE1BQXJDLEVBQ0E7QUFDRSxZQUFJd04sUUFBUS9PLFFBQVErRCxHQUFSLENBQVksb0JBQVosQ0FBWjtBQUNBeUssUUFBQSxxSEFBQUEsQ0FBa0JPLE1BQU0sQ0FBTixDQUFsQixFQUE0QixnQkFBNUIsRUFBOEMsSUFBOUM7QUFDRDtBQUNGO0FBQ0QsUUFBRy9GLGFBQWEsU0FBaEIsRUFDQTtBQUNFLFVBQUdoSixRQUFRK0QsR0FBUixDQUFZLGFBQVosRUFBMkJ4QyxNQUE5QixFQUNBO0FBQ0UsWUFBSTZiLFVBQVVwZCxRQUFRK0QsR0FBUixDQUFZLGFBQVosQ0FBZDtBQUNBeUssUUFBQSxxSEFBQUEsQ0FBa0I0TyxPQUFsQixFQUEyQixnQkFBM0IsRUFBNkMsS0FBN0M7QUFDRDtBQUNGO0FBQ0QsUUFBR3BVLGFBQWEsUUFBaEIsRUFDQTtBQUNFLFVBQUdoSixRQUFRK0QsR0FBUixDQUFZLG9CQUFaLEVBQWtDeEMsTUFBckMsRUFDQTtBQUNFLFlBQUk4YixjQUFjcmQsUUFBUStELEdBQVIsQ0FBWSxvQkFBWixDQUFsQjtBQUNBLFlBQUl1WixhQUFhdGQsUUFBUStELEdBQVIsQ0FBWSxtQkFBWixDQUFqQjtBQUNBeUssUUFBQSxxSEFBQUEsQ0FBa0I2TyxXQUFsQixFQUErQix1QkFBL0IsRUFBd0QsS0FBeEQ7QUFDQTdPLFFBQUEscUhBQUFBLENBQWtCOE8sVUFBbEIsRUFBK0Isc0JBQS9CLEVBQXVELEtBQXZEO0FBQ0Q7QUFDRjtBQUVGLEdBM0NEO0FBNkNELENBL0NEOztBQWlEQXRkLFFBQVF5WCxFQUFSLENBQVksbUJBQVosRUFBaUMsVUFBV3dGLEtBQVgsRUFBbUI7QUFDbEQ5YyxVQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDQSxNQUFJb2MsUUFBUXhjLFFBQVErRCxHQUFSLENBQVksMkJBQVosQ0FBWjs7QUFFQSxNQUFHeVksVUFBVSxDQUFiLEVBQWU7QUFDYnhjLFlBQVFLLEdBQVIsQ0FBYSwyQkFBYixFQUEwQyxDQUExQztBQUNELEdBRkQsTUFHSTtBQUNGTCxZQUFRSyxHQUFSLENBQWEsMkJBQWIsRUFBMEMsQ0FBMUM7QUFDRDtBQUNGLENBVkQ7O0FBWUE7QUFDQUwsUUFBUXlYLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFVBQVN3RixLQUFULEVBQWdCO0FBQ25DLE1BQUlNLGFBQWEsS0FBakI7QUFDQXBkLFVBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLE1BQUl3RyxNQUFNLEtBQUs3QyxHQUFMLENBQVMsVUFBVCxDQUFWO0FBQ0E2QyxRQUFNQSxJQUFJMEIsT0FBSixDQUFZLFNBQVosRUFBdUIsRUFBdkIsRUFBMkJrVixXQUEzQixFQUFOO0FBQ0E1VyxRQUFNQSxJQUFJMEIsT0FBSixDQUFZLFFBQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBdEksVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCdUcsSUFBSXJGLE1BQW5DO0FBQ0F2QixVQUFRSyxHQUFSLENBQVksa0JBQVosRUFBZ0N1RyxJQUFJckYsTUFBcEM7QUFDQXZCLFVBQVFLLEdBQVIsQ0FBWSxVQUFaLEVBQXdCdUcsR0FBeEI7O0FBRUEsTUFBSXVGLE9BQU8sS0FBS3BJLEdBQUwsQ0FBUyxNQUFULENBQVg7QUFDQSxNQUFJa1EsUUFBUSxLQUFLbFEsR0FBTCxDQUFTLE9BQVQsQ0FBWjtBQUNBLE1BQUkwWixlQUFlLEVBQW5CO0FBQ0EsTUFBSUMsY0FBYyxLQUFsQjtBQUNBLE1BQUl4QixXQUFXLEtBQWY7QUFDQXBULFdBQVNuSSxPQUFULENBQWlCLFVBQVNxSSxRQUFULEVBQWtCO0FBQ2pDeVUsaUJBQWF6VSxXQUFTLE1BQXRCLElBQWdDaEosUUFBUStELEdBQVIsQ0FBWWlGLFdBQVMsTUFBckIsQ0FBaEM7QUFDQXlVLGlCQUFhelUsV0FBUyxVQUF0QixJQUFvQ2hKLFFBQVErRCxHQUFSLENBQVlpRixXQUFTLFVBQXJCLENBQXBDO0FBQ0EsUUFBR3lVLGFBQWF6VSxXQUFTLFVBQXRCLEtBQXFDK08sZ0JBQWdCalQsUUFBaEIsQ0FBeUJrRSxRQUF6QixDQUF4QyxFQUNBO0FBQ0UwVSxvQkFBYyxJQUFkO0FBQ0Q7QUFDRCxRQUFHRCxhQUFhelUsV0FBUyxVQUF0QixLQUFxQzhPLGFBQWFoVCxRQUFiLENBQXNCa0UsUUFBdEIsQ0FBeEMsRUFDQTtBQUNFa1QsaUJBQVcsSUFBWDtBQUNEO0FBRUYsR0FaRDs7QUFjQSxNQUFJckssZUFBZSx1SEFBQUQsRUFBbkI7QUFDQTtBQUNBLE1BQUc2TCxhQUFhRSxlQUFiLElBQWdDRixhQUFhRyxlQUFoRCxFQUNBO0FBQ0UsUUFBSUMscUJBQXFCQyxrQkFBa0JqTSxhQUFhTSxvQkFBL0IsQ0FBekI7QUFDQSxRQUFJNEwscUJBQXFCRCxrQkFBa0JqTSxhQUFhTyxvQkFBL0IsQ0FBekI7QUFDQSxRQUFHeUwsc0JBQXNCRSxrQkFBekIsRUFDQTtBQUNFUixtQkFBWSxJQUFaO0FBQ0gsS0FIQyxNQUlJO0FBQ0ZyWCxZQUFNLDBGQUFOO0FBQ0Q7QUFDRixHQVhELE1BWUk7QUFDRnFYLGlCQUFXLElBQVg7QUFDRDtBQUNELE1BQUdyQixZQUFZd0IsV0FBZixFQUNBO0FBQ0V4WCxVQUFNLDhEQUFOO0FBQ0FxWCxpQkFBYSxLQUFiO0FBQ0Q7QUFDRCxNQUFHQSxVQUFILEVBQ0E7QUFDRXBkLFlBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsUUFBRzhiLFFBQUgsRUFDQTtBQUNFOEIsTUFBQSwwR0FBQUEsQ0FBcUJoZSxPQUFyQixFQUE4QjRHLEdBQTlCLEVBQW1DdUYsSUFBbkMsRUFBeUM4SCxLQUF6QyxFQUFnREMsVUFBaEQsRUFBNERDLFNBQTVELEVBQXVFc0osWUFBdkUsRUFBcUYzVSxRQUFyRixFQUErRkMsU0FBL0YsRUFBMEc4SSxZQUExRyxFQUF3SHFLLFFBQXhILEVBQWtJd0IsV0FBbEk7QUFDRDtBQUNELFFBQUdBLFdBQUgsRUFDQTtBQUNFLFVBQUlPLFVBQVUsSUFBZDtBQUNBLFVBQUlDLFVBQVUsRUFBZDtBQUNBLFVBQUc7QUFDRkQsa0JBQVVsTSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQVY7QUFDQSxZQUFJL1IsT0FBT2dlLFFBQVFFLEtBQVIsQ0FBYyxDQUFkLENBQVg7QUFDQSxZQUFJQyxLQUFLLElBQUlDLFVBQUosRUFBVDtBQUNBRCxXQUFHRSxVQUFILENBQWNyZSxJQUFkO0FBQ0FtZSxXQUFHRyxNQUFILEdBQVksVUFBU2xLLENBQVQsRUFBWTtBQUN2QjZKLG9CQUFVRSxHQUFHSSxNQUFiO0FBQ0FSLFVBQUEsMEdBQUFBLENBQXFCaGUsT0FBckIsRUFBOEJrZSxPQUE5QixFQUF1Qy9SLElBQXZDLEVBQTZDOEgsS0FBN0MsRUFBb0RDLFVBQXBELEVBQWdFQyxTQUFoRSxFQUEyRXNKLFlBQTNFLEVBQXlGM1UsUUFBekYsRUFBbUdDLFNBQW5HLEVBQThHOEksWUFBOUcsRUFBNEhxSyxRQUE1SCxFQUFzSXdCLFdBQXRJO0FBQ0MsU0FIRjtBQUlBLE9BVEQsQ0FVQSxPQUFNekwsR0FBTixFQUFXO0FBQ1RpTSxrQkFBVSxFQUFWO0FBQ0EvZCxnQkFBUUMsR0FBUixDQUFZNlIsR0FBWjtBQUNEO0FBQ0Y7QUFDRjtBQUNEZ0wsUUFBTXdCLFFBQU4sQ0FBZUMsY0FBZjtBQUNELENBL0VEOztBQWlGQTtBQUNBO0FBQ0ExZSxRQUFReVgsRUFBUixDQUFXLFVBQVgsRUFBdUIsVUFBU3dGLEtBQVQsRUFBZ0I7QUFDckM5YyxVQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxNQUFJdWUsUUFBUTNlLFFBQVErRCxHQUFSLENBQVksbUJBQVosQ0FBWjtBQUNBLE1BQUk2YSxPQUFPNWUsUUFBUStELEdBQVIsQ0FBWSxrQkFBWixDQUFYO0FBQ0EsTUFBSStXLFdBQVc5YSxRQUFRK0QsR0FBUixDQUFZLFVBQVosQ0FBZjtBQUNBLE1BQUk4YSxjQUFjL0QsU0FBUy9TLFNBQVQsQ0FBbUI0VyxRQUFNLENBQXpCLEVBQTRCQyxJQUE1QixDQUFsQjtBQUNBLE1BQUl6UyxPQUFPLEtBQUtwSSxHQUFMLENBQVMsTUFBVCxJQUFpQixNQUE1QjtBQUNBLE1BQUlrUSxRQUFRLEtBQUtsUSxHQUFMLENBQVMsT0FBVCxDQUFaO0FBQ0EvRCxVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0J3ZSxZQUFZdGQsTUFBM0M7QUFDQXZCLFVBQVFLLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ3dlLFlBQVl0ZCxNQUE1QztBQUNBdkIsVUFBUUssR0FBUixDQUFZLFVBQVosRUFBd0J3ZSxXQUF4QjtBQUNBN2UsVUFBUUssR0FBUixDQUFZLE1BQVosRUFBb0I4TCxJQUFwQjtBQUNBLE1BQUlzUixlQUFlLEVBQW5CO0FBQ0EzVSxXQUFTbkksT0FBVCxDQUFpQixVQUFTcUksUUFBVCxFQUFrQjtBQUNqQ3lVLGlCQUFhelUsV0FBUyxNQUF0QixJQUFnQ2hKLFFBQVErRCxHQUFSLENBQVlpRixXQUFTLE1BQXJCLENBQWhDO0FBQ0F5VSxpQkFBYXpVLFdBQVMsVUFBdEIsSUFBb0NoSixRQUFRK0QsR0FBUixDQUFZaUYsV0FBUyxVQUFyQixDQUFwQztBQUNELEdBSEQ7QUFJQTtBQUNBSixFQUFBLGtIQUFBQSxDQUFlNUksT0FBZixFQUF3QjZJLFdBQXhCLEVBQXFDQyxRQUFyQyxFQUErQ0MsU0FBL0M7QUFDQTtBQUNBO0FBQ0EsTUFBSThJLGVBQWUsdUhBQUFELEVBQW5CO0FBQ0FvTSxFQUFBLDBHQUFBQSxDQUFxQmhlLE9BQXJCLEVBQThCNmUsV0FBOUIsRUFBMkMxUyxJQUEzQyxFQUFpRDhILEtBQWpELEVBQXdEQyxVQUF4RCxFQUFvRUMsU0FBcEUsRUFBK0VzSixZQUEvRSxFQUE2RjNVLFFBQTdGLEVBQXVHQyxTQUF2RyxFQUFrSCxJQUFsSCxFQUF3SCxLQUF4SDtBQUNBO0FBQ0E7QUFDQWtVLFFBQU13QixRQUFOLENBQWVDLGNBQWY7QUFDRCxDQTFCRDs7QUE0QkEsU0FBU1osaUJBQVQsQ0FBMkJnQixLQUEzQixFQUNBO0FBQ0UsTUFBR0EsVUFBVSxhQUFiLEVBQ0E7QUFDRSxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLGtHQUFBNUksR0FBYW5CLElBQWIsSUFBcUJ5RyxVQUF4QixFQUNBO0FBQ0VyYixVQUFRQyxHQUFSLENBQVkseUJBQVo7QUFDQXFiLGVBQWFzRCxNQUFiO0FBQ0EvZSxVQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0IsRUFIRixDQUd5QztBQUN2Q0wsVUFBUUssR0FBUixDQUFZLGlCQUFaLEVBQStCLENBQS9CO0FBQ0FMLFVBQVFLLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLGtHQUFBNlYsR0FBYW5CLElBQXZDO0FBQ0EsTUFBSWlLLGdCQUFnQiw2R0FBQWxLLENBQWtCLGtHQUFBb0IsR0FBYW5CLElBQS9CLEVBQXFDYixVQUFyQyxFQUFpRG5LLFFBQWpELEVBQTJEL0osT0FBM0QsQ0FBcEI7QUFDQSxNQUFJa2MsV0FBVyxJQUFmO0FBQ0EsTUFBRzhDLGNBQWM3SixJQUFkLENBQW1CclEsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k5RSxZQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixjQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVkscUJBQVosRUFBbUMsSUFBbkM7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixZQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBTCxZQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixVQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQjtBQUNBTCxZQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUMsQ0FBckM7QUFDSDtBQUNELE1BQUcyZSxjQUFjN0osSUFBZCxDQUFtQnJRLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFDQTtBQUNJOUUsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDO0FBQ0FMLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUMsQ0FBckM7QUFDSDtBQUNELE1BQUcyZSxjQUFjN0osSUFBZCxDQUFtQnJRLFFBQW5CLENBQTRCLFdBQTVCLENBQUgsRUFDQTtBQUNJOUUsWUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDO0FBQ0FMLFlBQVFLLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxDQUFyQztBQUNIO0FBQ0QsTUFBRzJlLGNBQWM3SixJQUFkLENBQW1CclEsUUFBbkIsQ0FBNEIsYUFBNUIsQ0FBSCxFQUNBO0FBQ0k5RSxZQUFRSyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEM7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixTQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLENBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixjQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVkscUJBQVosRUFBbUMsSUFBbkM7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixTQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVkscUJBQVosRUFBbUMsSUFBbkM7QUFDQUwsWUFBUUssR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0FMLFlBQVFLLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxFQUFyQztBQUNIO0FBQ0QsTUFBRzJlLGNBQWM3SixJQUFkLENBQW1CclEsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUNBO0FBQ0k5RSxZQUFRSyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQUwsWUFBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FMLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUMsRUFBckM7QUFDSDtBQUNELE1BQUcyZSxjQUFjN0osSUFBZCxDQUFtQnJRLFFBQW5CLENBQTRCLFFBQTVCLENBQUgsRUFDQTtBQUNJOUUsWUFBUUssR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0g7QUFDRCxNQUFHMmUsY0FBYzdKLElBQWQsQ0FBbUJyUSxRQUFuQixDQUE0QixTQUE1QixDQUFILEVBQ0E7QUFDSTlFLFlBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBTCxZQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUMsRUFBckM7QUFDQTZiLGVBQVcsS0FBWDtBQUNIO0FBQ0QsTUFBRzhDLGNBQWM3SixJQUFkLENBQW1CclEsUUFBbkIsQ0FBNEIsUUFBNUIsQ0FBSCxFQUNBO0FBQ0k5RSxZQUFRSyxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3QjtBQUNBTCxZQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUMsRUFBckM7QUFDQTZiLGVBQVcsS0FBWDtBQUNIO0FBQ0QsTUFBRzhDLGNBQWM3SixJQUFkLENBQW1CclEsUUFBbkIsQ0FBNEIsVUFBNUIsQ0FBSCxFQUNBO0FBQ0k5RSxZQUFRSyxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0E2YixlQUFXLEtBQVg7QUFDSDtBQUNELE1BQUc4QyxjQUFjN0osSUFBZCxDQUFtQnJRLFFBQW5CLENBQTRCLFFBQTVCLENBQUgsRUFDQTtBQUNJOUUsWUFBUUssR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0I7QUFDQUwsWUFBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDLEVBQXJDO0FBQ0E2YixlQUFXLEtBQVg7QUFDSDtBQUNEbGMsVUFBUUssR0FBUixDQUFZLFVBQVosRUFBdUIyZSxjQUFjcFksR0FBckM7QUFDQTVHLFVBQVFLLEdBQVIsQ0FBWSxPQUFaLEVBQW9CMmUsY0FBYy9LLEtBQWxDO0FBQ0FqVSxVQUFRSyxHQUFSLENBQVksTUFBWixFQUFtQjJlLGNBQWM3UyxJQUFqQztBQUNBLE1BQUl2RixNQUFNNUcsUUFBUStELEdBQVIsQ0FBWSxVQUFaLENBQVY7QUFDQS9ELFVBQVFLLEdBQVIsQ0FBWSxpQkFBWixFQUErQnVHLElBQUlyRixNQUFuQztBQUNBdkIsVUFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDdUcsSUFBSXJGLE1BQXBDO0FBQ0F2QixVQUFRNFUsSUFBUixDQUFhLGNBQWIsRUFBNkJzSCxRQUE3QjtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ08sU0FBUytDLGdCQUFULENBQTBCQyxNQUExQixFQUFpQ0MsTUFBakMsRUFBd0NDLEtBQXhDLEVBQStDO0FBQ3BELE1BQUlqTSxNQUFNZSxhQUFXbFUsUUFBUStELEdBQVIsQ0FBWSxZQUFaLENBQXJCO0FBQ0FzUyxTQUFPZ0osSUFBUCxDQUFZLE9BQUt4SCxRQUFMLEdBQWMsWUFBZCxHQUEyQjlOLFFBQTNCLEdBQW9Db1YsTUFBcEMsR0FBMkMsT0FBM0MsR0FBbURwVixRQUFuRCxHQUE0RG1WLE1BQXhFLEVBQWdGLEVBQWhGLEVBQW9GLHNCQUFwRjtBQUNEOztBQUVEO0FBQ08sU0FBU0ksVUFBVCxDQUFvQkosTUFBcEIsRUFBNEJ6WCxJQUE1QixFQUFrQzs7QUFFdkMsTUFBSTBMLE1BQU1lLGFBQVdsVSxRQUFRK0QsR0FBUixDQUFZLFlBQVosQ0FBckI7QUFDQSxNQUFJd2IsVUFBVXZmLFFBQVErRCxHQUFSLENBQVksY0FBWixDQUFkO0FBQ0EsTUFBR3diLFlBQVksTUFBSSxHQUFKLEdBQVEsR0FBUixHQUFZLEdBQVosR0FBZ0IsR0FBaEIsR0FBb0IsR0FBcEIsR0FBd0IsR0FBeEIsR0FBNEIsR0FBNUIsR0FBZ0MsR0FBaEMsR0FBb0MsR0FBcEMsR0FBd0MsR0FBdkQsRUFDQTtBQUNFO0FBQ0FsSixXQUFPZ0osSUFBUCxDQUFZLE9BQUt4SCxRQUFMLEdBQWMsbUJBQWQsR0FBa0NwUSxJQUFsQyxHQUF1QyxPQUF2QyxHQUErQ3NDLFFBQS9DLEdBQXdEbVYsTUFBcEUsRUFBNEUsRUFBNUUsRUFBZ0Ysc0JBQWhGO0FBQ0QsR0FKRCxNQU1BO0FBQ0VoWixVQUFNLDZCQUEyQixHQUEzQixHQUErQixHQUEvQixHQUFtQyxHQUFuQyxHQUF1QyxHQUF2QyxHQUEyQyxHQUEzQyxHQUErQyxHQUEvQyxHQUFtRCxlQUF6RDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDTyxTQUFTc1osV0FBVCxDQUFxQkMsVUFBckIsRUFDUDtBQUNFQSxlQUFhQSxhQUFXLENBQXhCO0FBQ0EsTUFBSTFRLFFBQVEvTyxRQUFRK0QsR0FBUixDQUFZLG9CQUFaLENBQVo7QUFDQXlLLEVBQUEscUhBQUFBLENBQWtCTyxNQUFNMFEsVUFBTixDQUFsQixFQUFxQyxnQkFBckMsRUFBdUQsSUFBdkQ7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUM3dEJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ08sU0FBU3pCLG9CQUFULENBQThCaGUsT0FBOUIsRUFBdUM0RSxJQUF2QyxFQUE2Q3VILElBQTdDLEVBQW1EOEgsS0FBbkQsRUFBMERDLFVBQTFELEVBQXNFQyxTQUF0RSxFQUFpRnNKLFlBQWpGLEVBQStGM1UsUUFBL0YsRUFBeUdDLFNBQXpHLEVBQW9IOEksWUFBcEgsRUFBa0lxSyxRQUFsSSxFQUE0SXdCLFdBQTVJLEVBQ1A7QUFDRTtBQUNBLE1BQUlnQyxnQkFBYyxJQUFsQjtBQUNBLE1BQUlDLGFBQWEsRUFBakI7QUFDQTs7QUFFQSxNQUFJQyxhQUFhLEVBQWpCO0FBQ0E5VyxXQUFTbkksT0FBVCxDQUFpQixVQUFTcUksUUFBVCxFQUFrQjtBQUNqQzRXLGVBQVdwZSxJQUFYLENBQWdCaWMsYUFBYXpVLFdBQVMsVUFBdEIsQ0FBaEI7QUFDRCxHQUZEOztBQUlBLE1BQUdrVCxRQUFILEVBQVk7QUFDVndELG9CQUFnQkcsZ0JBQWdCamIsSUFBaEIsRUFBc0J1SCxJQUF0QixFQUE0QjhILEtBQTVCLEVBQW1DMkwsVUFBbkMsQ0FBaEI7QUFDRDtBQUNELE1BQUdsQyxXQUFILEVBQWU7QUFDYmdDLG9CQUFnQkksbUJBQW1CbGIsSUFBbkIsRUFBeUJ1SCxJQUF6QixFQUErQjhILEtBQS9CLEVBQXNDMkwsVUFBdEMsQ0FBaEI7QUFDRDtBQUNELE1BQUdGLGNBQWNuZSxNQUFkLEdBQXVCLENBQTFCLEVBQ0E7QUFDRXZCLFlBQVFLLEdBQVIsQ0FBWSxZQUFaLEVBQTBCcWYsYUFBMUI7QUFDQXhaLFVBQU0sZ0JBQWN3WixhQUFwQjtBQUNELEdBSkQsTUFLSztBQUNIO0FBQ0EsUUFBSXJNLFdBQVcsSUFBZjtBQUNBclQsWUFBUUssR0FBUixDQUFhLGlCQUFiLEVBQWdDLElBQWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0F5SSxhQUFTbkksT0FBVCxDQUFpQixVQUFTcUksUUFBVCxFQUFrQjtBQUMvQixVQUFHeVUsYUFBYXpVLFdBQVMsVUFBdEIsTUFBc0MsSUFBekMsRUFDQTtBQUNJMlcscUJBQWFBLFdBQVdoTyxNQUFYLENBQWtCM0ksV0FBUyxHQUEzQixDQUFiO0FBQ0FoSixnQkFBUUssR0FBUixDQUFZMkksV0FBUyxTQUFyQixFQUFnQyxJQUFoQztBQUNBLFlBQUdBLGFBQWEsY0FBYixJQUErQkEsYUFBYSxVQUE1QyxJQUNBQSxhQUFhLFNBRGIsSUFDMEJBLGFBQWEsY0FEdkMsSUFFQUEsYUFBYSxTQUZiLElBRTBCQSxhQUFhLFNBRnZDLElBR0FBLGFBQWEsWUFIaEIsRUFJQTtBQUNFaEosa0JBQVFLLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBb2QsdUJBQWFzQyxlQUFiLEdBQStCLEtBQS9CO0FBQ0Q7QUFDRCxZQUFHL1csYUFBYSxTQUFoQixFQUNBO0FBQ0VoSixrQkFBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FvZCx1QkFBYXVDLG9CQUFiLEdBQW9DLEtBQXBDO0FBQ0Q7QUFDRCxZQUFHaFgsYUFBYSxTQUFoQixFQUNBO0FBQ0VoSixrQkFBUUssR0FBUixDQUFZLHFCQUFaLEVBQW1DLElBQW5DO0FBQ0FvZCx1QkFBYXdDLG9CQUFiLEdBQW9DLEtBQXBDO0FBQ0Q7QUFDRCxZQUFHalgsYUFBYSxTQUFoQixFQUNBO0FBQ0loSixrQkFBUUssR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDO0FBQ0g7QUFDSjtBQUNKLEtBNUJEOztBQThCQXNmLGlCQUFhQSxXQUFXdEssS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLENBQWI7QUFDQWhDLGVBQVcsb0dBQUFXLENBQVNoVSxPQUFULEVBQWtCMmYsVUFBbEIsRUFBOEIvYSxJQUE5QixFQUFvQ3VILElBQXBDLEVBQTBDOEgsS0FBMUMsRUFBaURDLFVBQWpELEVBQTZEQyxTQUE3RCxFQUF3RXBMLFNBQXhFLEVBQW1GOEksWUFBbkYsQ0FBWDtBQUNBO0FBQ0EsU0FBSyxJQUFJaFIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaUksU0FBU3ZILE1BQTdCLEVBQXFDVixHQUFyQyxFQUNBO0FBQ0UsVUFBSW1JLFdBQVdGLFNBQVNqSSxDQUFULENBQWY7QUFDQSxVQUFHNGMsYUFBYXpVLFdBQVMsVUFBdEIsTUFBc0MsSUFBdEMsSUFBOENxSyxRQUFqRCxFQUNBO0FBQ0VyVCxnQkFBUUssR0FBUixDQUFhLGlCQUFiLEVBQWdDLENBQWhDO0FBQ0FMLGdCQUFRNFUsSUFBUixDQUFjNUwsV0FBUyxTQUF2QjtBQUNBLFlBQUdrVCxRQUFILEVBQVk7QUFDVmxjLGtCQUFRSyxHQUFSLENBQWEsc0JBQWIsRUFBcUMsQ0FBckM7QUFDQTBWLFVBQUEsbUhBQUFBLENBQTRCL1YsT0FBNUI7QUFDRDtBQUNEO0FBQ0Q7QUFDRjs7QUFFRCxRQUFHLENBQUVxVCxRQUFMLEVBQWM7QUFBQ2dELGFBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCRixPQUFPQyxRQUFQLENBQWdCQyxJQUF2QztBQUE2QztBQUM3RDtBQUNGOztBQUVNLFNBQVN1SixrQkFBVCxDQUE0QkksTUFBNUIsRUFBb0NsWCxRQUFwQyxFQUE4Q2lMLEtBQTlDLEVBQXFEa00sYUFBckQsRUFDUDtBQUNFLE1BQUlULGdCQUFnQixFQUFwQjtBQUNBLE1BQUcsQ0FBRSxpQkFBaUJVLElBQWpCLENBQXNCcFgsUUFBdEIsQ0FBTCxFQUNBO0FBQ0UwVyxvQkFBZ0JBLGdCQUFnQixnRkFBaEM7QUFDRDtBQUNEO0FBQ0EsTUFBRyxDQUFFLHVCQUF1QlUsSUFBdkIsQ0FBNEJGLE1BQTVCLENBQUwsRUFBeUM7QUFDckNSLG9CQUFnQkEsZ0JBQWdCLG9IQUFoQztBQUNIO0FBQ0QsTUFBRyxpR0FBQTdKLENBQVUsSUFBVixFQUFnQnNLLGFBQWhCLE1BQW1DLEtBQXRDLEVBQTZDO0FBQzNDVCxvQkFBZ0JBLGdCQUFnQiwrQ0FBaEM7QUFDRDtBQUNELFNBQU9BLGFBQVA7QUFDRDs7QUFFRDtBQUNPLFNBQVNHLGVBQVQsQ0FBeUJqWixHQUF6QixFQUE4Qm9DLFFBQTlCLEVBQXdDaUwsS0FBeEMsRUFBK0NrTSxhQUEvQyxFQUNQO0FBQ0UsTUFBSVQsZ0JBQWdCLEVBQXBCO0FBQ0EsTUFBRyxDQUFFLGlCQUFpQlUsSUFBakIsQ0FBc0JwWCxRQUF0QixDQUFMLEVBQ0E7QUFDRTBXLG9CQUFnQkEsZ0JBQWdCLGdGQUFoQztBQUNEOztBQUVEO0FBQ0EsTUFBRzlZLElBQUlyRixNQUFKLEdBQWEsSUFBaEIsRUFDQTtBQUNFbWUsb0JBQWdCQSxnQkFBZ0IsNENBQWhDO0FBQ0Q7QUFDRCxNQUFHOVksSUFBSXJGLE1BQUosR0FBYSxFQUFoQixFQUNBO0FBQ0VtZSxvQkFBZ0JBLGdCQUFnQiw2Q0FBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUlXLG1CQUFtQixDQUFDelosSUFBSWxHLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q2EsTUFBbkU7QUFDQSxNQUFJOGUsbUJBQWlCelosSUFBSXJGLE1BQXRCLEdBQWdDLElBQW5DLEVBQ0E7QUFDRW1lLG9CQUFnQkEsZ0JBQWdCLHdHQUFoQztBQUNEO0FBQ0QsTUFBRywrQkFBK0JVLElBQS9CLENBQW9DeFosR0FBcEMsQ0FBSCxFQUNBO0FBQ0U4WSxvQkFBZ0JBLGdCQUFnQixpREFBaEM7QUFDRDs7QUFFRCxNQUFHLGlHQUFBN0osQ0FBVSxJQUFWLEVBQWdCc0ssYUFBaEIsTUFBbUMsS0FBdEMsRUFBNkM7QUFDM0NULG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEO0FBQ0QsU0FBT0EsYUFBUDtBQUNELEMiLCJmaWxlIjoicHNpcHJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0Y2Q4MDc1ZDJiOWFlOTA5MDAyYyIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZV9oc3ByZWQocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGhzcHJlZF90YWJsZSA9ICc8YnIgLz48dGFibGU+PHRyPjx0ZCBiZ2NvbG9yPVwiI2ZmMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0hvdHNwb3QgUmVzaWR1ZTwvdGQ+PC90cj4nO1xuICBoc3ByZWRfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiNmZmZmZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtOb24tSG90c3BvdCBSZXNpZHVlPC90ZD48L3RyPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO05vbi1pbnRlcmZhY2UgcmVzaWR1ZTwvdGQ+PC90cj48L3RhYmxlPjxiciAvPic7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRhYmxlPjx0cj48dGg+Q2hhaW4vUmVzaWR1ZTwvdGg+PHRoPlJlc2lkdWUgSWRlbnRpdHk8L3RoPjx0aD5TY29yZTwvdGg+JztcbiAgY29uc29sZS5sb2coZmlsZSk7XG4gIGhzcHJlZF90YWJsZSArPSAnPHRhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGFibGUnLCBoc3ByZWRfdGFibGUpO1xufVxuXG4vLyBwYXJzZSB0aGUgc21hbGwgbWV0c2l0ZSBvdXRwdXQgdGFibGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBtZXRzaXRlX3RhYmxlID0gJzxiciAvPjx0YWJsZT48dHI+PHRkIGJnY29sb3I9XCIjZmYwMDAwXCIgc3R5bGU9XCJib3JkZXItc3R5bGU6c29saWQ7IGJvcmRlci13aWR0aDoxcHg7IGJvcmRlci1jb2xvcjojMDAwMDAwXCI+Jm5ic3A7Jm5ic3A7PC90ZD48dGQ+Jm5ic3A7TWV0YWwgQmluZGluZyBDb250YWN0PC90ZD48L3RyPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtDaGFpbiBub3QgcHJlZGljdGVkPC90ZD48L3RyPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0cj48dGQgYmdjb2xvcj1cIiMwMDAwZmZcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtQcmVkaWN0ZWQgY2hhaW48L3RkPjwvdHI+PC90YWJsZT48YnIgLz4nO1xuICBtZXRzaXRlX3RhYmxlICs9ICc8dGFibGU+PHRyPjx0aD5SZXNpZHVlIE51bWJlcjwvdGg+PHRoPlJhdyBOZXVyYWwgTmV0d29yayBTY29yZTwvdGg+PHRoPlJlc2lkdWU8L3RoPic7XG4gIGxldCBoaXRfcmVnZXggPSAvXFxkK1xccy4rP1xcc1xcd3szfVxcZCsvZztcbiAgbGV0IGhpdF9tYXRjaGVzID0gZmlsZS5tYXRjaChoaXRfcmVnZXgpO1xuICBpZihoaXRfbWF0Y2hlcylcbiAge1xuICAgIGhpdF9tYXRjaGVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccy8pO1xuICAgICAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+PHRkPicrZW50cmllc1sxXSsnPC90ZD48dGQ+JytlbnRyaWVzWzJdKyc8L3RkPjwvdHI+JztcbiAgICB9KTtcbiAgfVxuICBtZXRzaXRlX3RhYmxlICs9ICc8dGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBtZXRzaXRlX3RhYmxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSl7XG5cbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBicF9kYXRhID0gW107XG4gIGxldCBtZl9kYXRhID0gW107XG4gIGxldCBjY19kYXRhID0gW107XG4gIGxldCB0YWJsZV9kYXRhID0gJyc7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKCcjJykpe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA8IDQpe3JldHVybjt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0JQJyl7YnBfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQ0MnKXtjY19kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdNRicpe21mX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gIH0pO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5CaW9sb2dpY2FsIFByb2Nlc3MgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGJwX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPk1vbGVjdWxhciBGdW5jdGlvbiBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgbWZfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+Q2VsbHVsYXIgQ29tcG9uZW50IFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBjY19kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHRhYmxlX2RhdGEgKz0gJ1RoZXNlIHByZWRpY3Rpb24gdGVybXMgcmVwcmVzZW50IHRlcm1zIHByZWRpY3RlZCB3aGVyZSBTVk0gdHJhaW5pbmcgaW5jbHVkZXMgYXNzaWduZWQgR08gdGVybXMgYWNyb3NzIGFsbCBldmlkZW5jZSBjb2RlIHR5cGVzLiBTVk0gcmVsaWFiaWxpdHkgaXMgcmVnYXJkZWQgYXMgSGlnaCAoSCkgd2hlbiBNQ0MsIHNlbnNpdGl2aXR5LCBzcGVjaWZpY2l0eSBhbmQgcHJlY2lzaW9uIGFyZSBqb2ludGx5IGFib3ZlIGEgZ2l2ZW4gdGhyZXNob2xkLiBvdGhlcndpc2UgUmVsaWFiaWxpdHkgaXMgaW5kaWNhdGVkIGFzIExvdyAoTCkuIDxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxufVxuXG5mdW5jdGlvbiBzZXRfYWFub3JtKCl7XG4gIGxldCBoQUFfbm9ybSA9IHt9O1xuICBoQUFfbm9ybS5BID0geyB2YWw6IDAuMDcxNzgzMjQ4MDA2MzA5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI3MzY3NjYxNTI0Mjc1fTtcbiAgaEFBX25vcm0uViA9IHsgdmFsOiAwLjA1OTYyNDU5NTM2OTkwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDM3Nzc5MTUyODc0NX07XG4gIGhBQV9ub3JtLlkgPSB7IHZhbDogMC4wMjYwNzUwNjgyNDA0MzcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTQ4MjI0NzE1MzEzNzl9O1xuICBoQUFfbm9ybS5XID0geyB2YWw6IDAuMDE0MTY2MDAyNjEyNzcxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDEwNDcxODM1ODAxOTk2fTtcbiAgaEFBX25vcm0uVCA9IHsgdmFsOiAwLjA1MjU5MzU4Mjk3MjcxNCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDA5NDc5Mzk2NDU5N307XG4gIGhBQV9ub3JtLlMgPSB7IHZhbDogMC4wODIxMjMyNDEzMzIwOTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjg2ODc1NjYwODE1MTJ9O1xuICBoQUFfbm9ybS5QID0geyB2YWw6IDAuMDY1NTU3NTMxMzIyMjQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDM0MjM5Mzk4NDk2NzM2fTtcbiAgaEFBX25vcm0uRiA9IHsgdmFsOiAwLjAzNzEwMzk5NDk2OTAwMixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODU0MzQyMzEzOTE4Nn07XG4gIGhBQV9ub3JtLk0gPSB7IHZhbDogMC4wMjI1NjI4MTgxODM5NTUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTEzMjEwMzk2NjI0ODF9O1xuICBoQUFfbm9ybS5LID0geyB2YWw6IDAuMDU0ODMzOTc5MjY5MTg1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI5MjY0MDgzNjY3MTU3fTtcbiAgaEFBX25vcm0uTCA9IHsgdmFsOiAwLjEwMDEwNTkxNTc1OTA2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMjc2ODA4NTE5MDA5fTtcbiAgaEFBX25vcm0uSSA9IHsgdmFsOiAwLjA0MjAzNDUyNjA0MDQ2NyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyNjg0OTI2MjQ5NX07XG4gIGhBQV9ub3JtLkggPSB7IHZhbDogMC4wMjcxNDE0MDM1Mzc1OTgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTU1MDU2NjM3ODk4NX07XG4gIGhBQV9ub3JtLkcgPSB7IHZhbDogMC4wNjkxNzk4MjAxMDQ1MzYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAwODc1NjIwNTczMjh9O1xuICBoQUFfbm9ybS5RID0geyB2YWw6IDAuMDY1OTIwNTYxOTMxODAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMTAzMDkxMDA4MzY2fTtcbiAgaEFBX25vcm0uRSA9IHsgdmFsOiAwLjA0NjQ3ODQ2MjI1ODM4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE5OTQ2MjY5NDYxNzM2fTtcbiAgaEFBX25vcm0uQyA9IHsgdmFsOiAwLjAyNDkwODU1MTg3MjA1NixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyMjkwOTU4OTUwNH07XG4gIGhBQV9ub3JtLkQgPSB7IHZhbDogMC4wNDQzMzc5MDQ3MjYwNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg0MzY2NzcyNTY3MjZ9O1xuICBoQUFfbm9ybS5OID0geyB2YWw6IDAuMDMzNTA3MDIwOTg3MDMzLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE2NTM2MDIyMjg4MjA0fTtcbiAgaEFBX25vcm0uUiA9IHsgdmFsOiAwLjA1OTc0MDQ2OTAzMTE5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI1MTY1OTk0NzczMzg0fTtcbiAgcmV0dXJuKGhBQV9ub3JtKTtcbn1cblxuZnVuY3Rpb24gc2V0X2Zub3JtKCl7XG4gIGxldCBoRl9ub3JtID0ge307XG4gIGhGX25vcm0uaHlkcm9waG9iaWNpdHkgPSB7dmFsOiAtMC4zNDg3NjgyODA4MDE1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDAuNzU1NTkxNTI3Njk3OTl9O1xuICBoRl9ub3JtWydwZXJjZW50IHBvc2l0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS40NTc3MTc0NjY5NDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDMuNTY3MTMzMzQxMTM5fTtcbiAgaEZfbm9ybVsnYWxpcGhhdGljIGluZGV4J10gPSB7dmFsOiA3OS45MTE1NDkzMTkwOTksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMTYuNzg3NjE3OTc4ODI3fTtcbiAgaEZfbm9ybVsnaXNvZWxlY3RyaWMgcG9pbnQnXSA9IHt2YWw6IDcuNjEwMjA0NjM4MzYwMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDEuOTcxNjExMTAyMDA4OH07XG4gIGhGX25vcm1bJ21vbGVjdWxhciB3ZWlnaHQnXSA9IHt2YWw6IDQ4NjY4LjQxMjgzOTk2MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzc4MzguMzI0ODk1OTY5fTtcbiAgaEZfbm9ybS5jaGFyZ2UgPSB7dmFsOiA1LjA5OTE3NjMwNTc2MDQsXG4gICAgICAgICAgICAgICAgICAgIHNkZTogMTYuODM4NjM2NTkwMjV9O1xuICBoRl9ub3JtWydwZXJjZW50IG5lZ2F0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS4wMjYxOTAxMjgxNzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDQuMDIwNjYzMTY4MDkyNn07XG4gIGhGX25vcm1bJ21vbGFyIGV4dGluY3Rpb24gY29lZmZpY2llbnQnXSA9IHt2YWw6IDQ2NDc1LjI5MzkyMzkyNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzkyOTkuMzk5ODQ4ODIzfTtcbiAgcmV0dXJuKGhGX25vcm0pO1xufVxuXG5mdW5jdGlvbiBnZXRfYWFfY29sb3IodmFsKXtcbiAgICBsZXQgYWJfdmFsID0gTWF0aC5hYnModmFsKTtcbiAgICBpZihhYl92YWwgPj0gMi45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMi4yNCl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjJwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYyblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjVwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWY1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjY0NSApIHtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMTBwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxMG5cIjtcbiAgICB9XG4gICAgcmV0dXJuIFwicGxhaW5cIjtcbn1cblxuLy9wYXJzZSB0aGUgZmZwcmVkIGZlYXRjZm8gZmVhdHVyZXMgZmlsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBTRl9kYXRhID0ge307XG4gIGxldCBBQV9kYXRhID0ge307XG4gIGxldCBoRl9ub3JtID1zZXRfZm5vcm0oKTtcbiAgbGV0IGhBQV9ub3JtPXNldF9hYW5vcm0oKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJBQVwiKSl7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgQUFfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIlNGXCIpKVxuICAgIHtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBTRl9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGJ1aWxkIGh0bWwgdGFibGVzIGZvciB0aGUgZmVhdHVyZSBkYXRhXG4gIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgbGV0IGdsb2JhbF9mZWF0dXJlcyA9IHJhY3RpdmUuZ2V0KCdnbG9iYWxfZmVhdHVyZXMnKTtcbiAgbGV0IGZlYXRfdGFibGUgPSAnPGI+R2xvYmFsIEZlYXR1cmVzPC9iPjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJ0dsb2JhbCBmZWF0dXJlcyBhcmUgY2FsY3VsYXRlZCBkaXJlY3RseSBmcm9tIHNlcXVlbmNlLiBMb2NhbGlzYXRpb24gdmFsdWVzIGFyZSBwcmVkaWN0ZWQgYnkgdGhlIFBzb3J0IGFsZ29yaXRobSBhbmQgcmVmbGVjdCB0aGUgcmVsYXRpdmUgbGlrZWxpaG9vZCBvZiB0aGUgcHJvdGVpbiBvY2N1cHlpbmcgZGlmZmVyZW50IGNlbGx1bGFyIGxvY2FsaXNhdGlvbnMuIFRoZSBiaWFzIGNvbHVtbiBpcyBoaWdobGlnaHRlZCBhY2NvcmRpbmcgdG8gdGhlIHNpZ25pZmljYW5jZSBvZiB0aGUgZmVhdHVyZSB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gWiBzY29yZSBvZiB0aGUgZmVhdHVyZS48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICc8dGFibGU+PHRyPjx0aD5GZWF0dXJlIE5hbWU8L3RoPjx0aD5WYWx1ZTwvdGg+PHRoPkJpYXM8L3RoPjwvdHI+JztcblxuICBPYmplY3Qua2V5cyhTRl9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlX25hbWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBpZihmZWF0dXJlX25hbWUgaW4gaEZfbm9ybSl7XG4gICAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoIChwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSktaEZfbm9ybVtmZWF0dXJlX25hbWVdLnZhbCkgLyBoRl9ub3JtW2ZlYXR1cmVfbmFtZV0uc2RlKTtcbiAgICB9XG4gICAgZmVhdF90YWJsZSArPSAnPHRyPjx0ZD4nK2ZlYXR1cmVfbmFtZSsnPC90ZD48dGQ+JytwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSkudG9GaXhlZCgyKSsnPC90ZD48dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD48L3RyPic7XG4gIH0pO1xuICBmZWF0X3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBmZWF0X3RhYmxlKTtcblxuICAvL2J1aWxkIGh0bWwgdGFibGUgZm9yIHRoZSBBQSBkYXRhXG4gIGxldCBhYV9jb21wb3NpdGlvbiA9IHJhY3RpdmUuZ2V0KCdhYV9jb21wb3NpdGlvbicpO1xuICBsZXQgYWFfdGFibGUgPSAnPGI+QW1pbm8gQWNpZCBDb21wb3NpdGlvbiAocGVyY2VudGFnZXMpPC9iPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGU+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGFhX3RhYmxlICs9ICc8dGg+JytyZXNpZHVlKyc8L3RoPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvcigocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKS1oQUFfbm9ybVtyZXNpZHVlXS52YWwpIC8gaEFBX25vcm1bcmVzaWR1ZV0uc2RlKTtcbiAgICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPicrKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSkqMTAwKS50b0ZpeGVkKDIpKyc8L3RkPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48L3RhYmxlPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8Yj5TaWduaWZpY2FuY2UgS2V5PC9iPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGUgY2xhc3M9XCJzaWduaWZrZXlcIiBhbGlnbj1cImNlbnRlclwiIGNlbGxwYWRkaW5nPVwiMlwiIGNlbGxzcGFjaW5nPVwiMFwiPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48Yj5sb3c8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCI5XCI+Jm5ic3A7PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGFsaWduPVwicmlnaHRcIj48Yj5oaWdoPC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFuXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYyblwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNW5cIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwblwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+cCAmZ3Q7PSAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMHBcIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNXBcIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJwXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxcFwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCIxMVwiPlNpZ25pZmljYW5jZSBwIHZhbHVlIGlzIGNhbGN1bGF0ZWQgdXNpbmcgdGhlIFogc2NvcmUgb2YgdGhlIHBlcmNlbnQgYW1pbm8gYWNpZCBjb21wb3NpdGlvbjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgYWFfdGFibGUpO1xufVxuXG5cbi8vIGZvciBhIGdpdmVuIG1lbXNhdCBkYXRhIGZpbGVzIGV4dHJhY3QgY29vcmRpbmF0ZSByYW5nZXMgZ2l2ZW4gc29tZSByZWdleFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9tZW1zYXRfcmFuZ2VzKHJlZ2V4LCBkYXRhKVxue1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJywnKSlcbiAgICB7XG4gICAgICBsZXQgcmVnaW9ucyA9IG1hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICByZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uLCBpKXtcbiAgICAgICAgcmVnaW9uc1tpXSA9IHJlZ2lvbi5zcGxpdCgnLScpO1xuICAgICAgICByZWdpb25zW2ldWzBdID0gcGFyc2VJbnQocmVnaW9uc1tpXVswXSk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMV0gPSBwYXJzZUludChyZWdpb25zW2ldWzFdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCctJykpXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaFsxXSk7XG4gICAgICAgIGxldCBzZWcgPSBtYXRjaFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtbXSwgXTtcbiAgICAgICAgcmVnaW9uc1swXVswXSA9IHBhcnNlSW50KHNlZ1swXSk7XG4gICAgICAgIHJlZ2lvbnNbMF1bMV0gPSBwYXJzZUludChzZWdbMV0pO1xuICAgICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgYWxlcnQoXCJTUzIgYW5ub3RhdGlvbiBsZW5ndGggZG9lcyBub3QgbWF0Y2ggcXVlcnkgc2VxdWVuY2VcIik7XG4gICAgfVxuICAgIHJldHVybihhbm5vdGF0aW9ucyk7XG59XG5cbi8vdGFrZSB0aGUgZGlzb3ByZWQgcGJkYXQgZmlsZSwgcGFyc2UgaXQgYW5kIGFkZCB0aGUgYW5ub3RhdGlvbnMgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BiZGF0KHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnLScpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ0QnO31cbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJ14nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdQQic7fVxuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbn1cblxuLy9wYXJzZSB0aGUgZGlzb3ByZWQgY29tYiBmaWxlIGFuZCBhZGQgaXQgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWNpc2lvbiA9IFtdO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgcHJlY2lzaW9uW2ldID0ge307XG4gICAgcHJlY2lzaW9uW2ldLnBvcyA9IGVudHJpZXNbMV07XG4gICAgcHJlY2lzaW9uW2ldLnByZWNpc2lvbiA9IGVudHJpZXNbNF07XG4gIH0pO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nLCBwcmVjaXNpb24pO1xuICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocHJlY2lzaW9uLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbi8vcGFyc2UgdGhlIG1lbXNhdCBvdXRwdXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIC8vY29uc29sZS5sb2coZmlsZSk7XG4gIGxldCB0b3BvX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvVG9wb2xvZ3k6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCBzaWduYWxfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9TaWduYWxcXHNwZXB0aWRlOlxccysoLispXFxuLywgZmlsZSk7XG4gIGxldCByZWVudHJhbnRfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9SZS1lbnRyYW50XFxzaGVsaWNlczpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHRlcm1pbmFsID0gZ2V0X21lbXNhdF9yYW5nZXMoL04tdGVybWluYWw6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIC8vY29uc29sZS5sb2coc2lnbmFsX3JlZ2lvbnMpO1xuICAvLyBjb25zb2xlLmxvZyhyZWVudHJhbnRfcmVnaW9ucyk7XG4gIGxldCBjb2lsX3R5cGUgPSAnQ1knO1xuICBpZih0ZXJtaW5hbCA9PT0gJ291dCcpXG4gIHtcbiAgICBjb2lsX3R5cGUgPSAnRUMnO1xuICB9XG4gIGxldCB0bXBfYW5ubyA9IG5ldyBBcnJheShzZXEubGVuZ3RoKTtcbiAgaWYodG9wb19yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpXG4gIHtcbiAgICBsZXQgcHJldl9lbmQgPSAwO1xuICAgIHRvcG9fcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1RNJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgICBpZihwcmV2X2VuZCA+IDApe3ByZXZfZW5kIC09IDE7fVxuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQsIHJlZ2lvblswXSk7XG4gICAgICBpZihjb2lsX3R5cGUgPT09ICdFQycpeyBjb2lsX3R5cGUgPSAnQ1knO31lbHNle2NvaWxfdHlwZSA9ICdFQyc7fVxuICAgICAgcHJldl9lbmQgPSByZWdpb25bMV0rMjtcbiAgICB9KTtcbiAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZC0xLCBzZXEubGVuZ3RoKTtcblxuICB9XG4gIC8vc2lnbmFsX3JlZ2lvbnMgPSBbWzcwLDgzXSwgWzEwMiwxMTddXTtcbiAgaWYoc2lnbmFsX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgc2lnbmFsX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdTJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgLy9yZWVudHJhbnRfcmVnaW9ucyA9IFtbNDAsNTBdLCBbMjAwLDIxOF1dO1xuICBpZihyZWVudHJhbnRfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICByZWVudHJhbnRfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1JIJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgdG1wX2Fubm8uZm9yRWFjaChmdW5jdGlvbihhbm5vLCBpKXtcbiAgICBhbm5vdGF0aW9uc1tpXS5tZW1zYXQgPSBhbm5vO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsIHR5cGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAvL2NvbnNvbGUubG9nKHR5cGUrJ19hbm5fc2V0Jyk7XG4gIGxldCBhbm5fbGlzdCA9IHJhY3RpdmUuZ2V0KHR5cGUrJ19hbm5fc2V0Jyk7XG4gIC8vY29uc29sZS5sb2coYW5uX2xpc3QpO1xuICBpZihPYmplY3Qua2V5cyhhbm5fbGlzdCkubGVuZ3RoID4gMCl7XG4gIGxldCBwc2V1ZG9fdGFibGUgPSAnPHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+VGFyZ2V0IExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UXVlcnkgTGVuPC90aD4nO1xuICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBTdGFydDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gRW5kPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEggRG9tYWluPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICB9ZWxzZSB7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggU0NPUDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggQ0FUSDwvdGg+JztcbiAgfVxuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QREJTVU08L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsaWdubWVudDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TU9ERUw8L3RoPic7XG5cbiAgLy8gaWYgTU9ERUxMRVIgVEhJTkdZXG4gIHBzZXVkb190YWJsZSArPSAnPC90cj48dGJvZHlcIj5cXG4nO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIC8vY29uc29sZS5sb2cobGluZSk7XG4gICAgaWYobGluZS5sZW5ndGggPT09IDApe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgbGV0IHRhYmxlX2hpdCA9IGVudHJpZXNbOV07XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgdGFibGVfaGl0ID0gZW50cmllc1sxMV07fVxuICAgIGlmKHRhYmxlX2hpdCtcIl9cIitpIGluIGFubl9saXN0KVxuICAgIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkIGNsYXNzPSdcIitlbnRyaWVzWzBdLnRvTG93ZXJDYXNlKCkrXCInPlwiK2VudHJpZXNbMF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzFdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1syXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbM10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzRdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s1XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzddK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s4XStcIjwvdGQ+XCI7XG4gICAgbGV0IHBkYiA9IGVudHJpZXNbOV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbOV0ubGVuZ3RoLTIpO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHBkYiA9IGVudHJpZXNbMTFdLnN1YnN0cmluZygwLCBlbnRyaWVzWzExXS5sZW5ndGgtMyk7fVxuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s5XStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxMF0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3ZlcnNpb24vbGF0ZXN0L2RvbWFpbi9cIit0YWJsZV9oaXQrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuIFBEQlNVTTwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J0Rpc3BsYXkgQWxpZ25tZW50JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwiY2F0aF9tb2RlbGxlclxcXCIpOycgdmFsdWU9J0J1aWxkIE1vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3LnJjc2Iub3JnL3BkYi9leHBsb3JlL2V4cGxvcmUuZG8/c3RydWN0dXJlSWQ9XCIrcGRiK1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNDT1AgU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vcGRiL1wiK3BkYitcIic+Q0FUSCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuIFBEQlNVTTwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J0Rpc3BsYXkgQWxpZ25tZW50JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwicGRiX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPC90cj5cXG5cIjtcbiAgICB9XG4gIH0pO1xuICBwc2V1ZG9fdGFibGUgKz0gXCI8L3Rib2R5PjwvdGFibGU+XFxuXCI7XG4gIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgcHNldWRvX3RhYmxlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAgIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgXCI8aDM+Tm8gZ29vZCBoaXRzIGZvdW5kLiBHVUVTUyBhbmQgTE9XIGNvbmZpZGVuY2UgaGl0cyBjYW4gYmUgZm91bmQgaW4gdGhlIHJlc3VsdHMgZmlsZTwvaDM+XCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYXJzZWRzKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVkaWN0aW9uX3JlZ2V4ID0gL0RvbWFpblxcc0JvdW5kYXJ5XFxzbG9jYXRpb25zXFxzcHJlZGljdGVkXFxzRFBTOlxccyguKykvO1xuICBsZXQgcHJlZGljdGlvbl9tYXRjaCA9ICBwcmVkaWN0aW9uX3JlZ2V4LmV4ZWMoZmlsZSk7XG4gIGlmKHByZWRpY3Rpb25fbWF0Y2gpXG4gIHtcbiAgICBsZXQgZGV0YWlscyA9IGZpbGUucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIGRldGFpbHMgPSBkZXRhaWxzLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIjxoND5cIitkZXRhaWxzK1wiPC9oND5cIik7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGlmKHByZWRpY3Rpb25fbWF0Y2hbMV0uaW5kZXhPZihcIixcIikpXG4gICAge1xuICAgICAgdmFsdWVzID0gcHJlZGljdGlvbl9tYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGkpe1xuICAgICAgICB2YWx1ZXNbaV0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHZhbHVlc1swXSA9IHBhcnNlSW50KHByZWRpY3Rpb25fbWF0Y2hbMV0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGFubm90YXRpb25zW3ZhbHVlXS5kb21wcmVkID0gJ0InO1xuICAgIH0pO1xuICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIk5vIFBhcnNlRFMgRG9tYWluIGJvdW5kYXJpZXMgcHJlZGljdGVkXCIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzIiwiaW1wb3J0IHsgcHJvY2Vzc19maWxlIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3RleHQgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93X3BhbmVsKHZhbHVlLCByYWN0aXZlKVxue1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCB2YWx1ZSApO1xufVxuXG4vL2JlZm9yZSBhIHJlc3VibWlzc2lvbiBpcyBzZW50IGFsbCB2YXJpYWJsZXMgYXJlIHJlc2V0IHRvIHRoZSBwYWdlIGRlZmF1bHRzXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMpe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3NlY29uZF9wZGInLCBudWxsKTtcblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIgPSBcIjxoNT5Eb21QcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmZmcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzKVxue1xuICBsZXQgaG9yaXpfcmVnZXggPSAvXFwuaG9yaXokLztcbiAgbGV0IHNzMl9yZWdleCA9IC9cXC5zczIkLztcbiAgbGV0IHBuZ19yZWdleCA9IC9cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9jYXJ0b29uX3JlZ2V4ID0gL19jYXJ0b29uX21lbXNhdF9zdm1cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXggPSAvX3NjaGVtYXRpY1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2RhdGFfcmVnZXggPSAvbWVtc2F0X3N2bSQvO1xuICBsZXQgbWVtcGFja19jYXJ0b29uX3JlZ2V4ID0gL0thbWFkYS1LYXdhaV9cXGQrLnBuZyQvO1xuICBsZXQgbWVtcGFja19ncmFwaF9vdXQgPSAvaW5wdXRfZ3JhcGgub3V0JC87XG4gIGxldCBtZW1wYWNrX2NvbnRhY3RfcmVzID0gL0NPTlRBQ1RfREVGMS5yZXN1bHRzJC87XG4gIGxldCBtZW1wYWNrX2xpcGlkX3JlcyA9IC9MSVBJRF9FWFBPU1VSRS5yZXN1bHRzJC87XG4gIGxldCBkb21zc2VhX3ByZWRfcmVnZXggPSAvXFwucHJlZCQvO1xuICBsZXQgZG9tc3NlYV9yZWdleCA9IC9cXC5kb21zc2VhJC87XG4gIGxldCBkb21zZXJmX3JlZ2V4ID0gLy4rXyhcXGQrKV8oXFxkKykuKlxcLnBkYi87XG4gIGxldCBmZnByZWRfc2NoX3JlZ2V4ID0gLy4rX3NjaFxcLnBuZy87XG4gIGxldCBmZnByZWRfc3ZtX3JlZ2V4ID0gLy4rX2NhcnRvb25fbWVtc2F0X3N2bV8uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfc2NoZW1hdGljX3JlZ2V4ID0gLy4rX3NjaGVtYXRpY18uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfdG1fcmVnZXggPSAvLitfdG1wXFwucG5nLztcbiAgbGV0IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4ID0gL1xcLmZlYXRjZmcvO1xuICBsZXQgZmZwcmVkX3ByZWRzX3JlZ2V4ID0gL1xcLmZ1bGxfcmF3LztcbiAgbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gIGxldCBtZXRzaXRlX3RhYmxlX3JlZ2V4ID0gL1xcLk1ldHByZWQvO1xuICBsZXQgbWV0c2l0ZV9wZGJfcmVnZXggPSAvXFwuTWV0UHJlZC87XG4gIGxldCBoc3ByZWRfaW5pdGlhbF9yZWdleCA9IC9faW5pdGlhbFxcLnBkYi87XG4gIGxldCBoc3ByZWRfc2Vjb25kX3JlZ2V4ID0gL19zZWNvbmRcXC5wZGIvO1xuXG4gIGxldCBpbWFnZV9yZWdleCA9ICcnO1xuICBsZXQgcmVzdWx0cyA9IGRhdGEucmVzdWx0cztcbiAgbGV0IGRvbWFpbl9jb3VudCA9IDA7XG4gIGxldCBtZW1wYWNrX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwc2lwcmVkX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICAvL1ByZXBhdG9yeSBsb29wIGZvciBpbmZvcm1hdGlvbiB0aGF0IGlzIG5lZWRlZCBiZWZvcmUgcmVzdWx0cyBwYXJzaW5nOlxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX2dlbmFsaWdubWVudF9hbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uX2RvbScpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAvL21haW4gcmVzdWx0cyBwYXJzaW5nIGxvb3BcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIC8vcHNpcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT0gJ3BzaXBhc3MyJylcbiAgICB7XG4gICAgICBwc2lwcmVkX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICBsZXQgbWF0Y2ggPSBob3Jpel9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdob3JpeicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SG9yaXogRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuXG4gICAgICB9XG4gICAgICBsZXQgc3MyX21hdGNoID0gc3MyX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNzMl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TUzIgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3NzMicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZGlzb3ByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19mb3JtYXQnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGJkYXQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QQkRBVCBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19jb21iaW5lJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2NvbWInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNPTUIgTk4gT3V0cHV0PC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9tZW1zYXQgYW5kIG1lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtc2F0c3ZtJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHNjaGVtZV9tYXRjaCA9IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoZW1lX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TY2hlbWF0aWMgRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSBtZW1zYXRfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IG1lbXNhdF9tYXRjaCA9IG1lbXNhdF9kYXRhX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1lbXNhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21lbXNhdGRhdGEnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXBhY2tfd3JhcHBlcicpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja190aW1lXCIsICcnKTtcbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIG1lbXBhY2tfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBtZW1wYWNrX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aW1nIHdpZHRoPVwiMTAwMHB4XCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGdyYXBoX21hdGNoID0gIG1lbXBhY2tfZ3JhcGhfb3V0LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGdyYXBoX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RGlhZ3JhbSBEYXRhPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFjdF9tYXRjaCA9ICBtZW1wYWNrX2NvbnRhY3RfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNvbnRhY3RfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGxpcGlkX21hdGNoID0gIG1lbXBhY2tfbGlwaWRfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGxpcGlkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TGlwaWQgRXhwb3N1cmUgUHJlZGl0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vZ2VudGhyZWFkZXIgYW5kIHBnZW50aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzb3J0X3ByZXN1bHQnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdnZW5fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfbW9kZWxzJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbnRocmVhZGVyX3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9wZG9tdGhyZWFkZXJcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3ZtX3Byb2JfZG9tJylcbiAgICB7XG4gICAgICBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2RvbV9hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL2RvbXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGFyc2VkcycpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIGxldCBwbmdfbWF0Y2ggPSBwbmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocG5nX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5X3BuZyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IFBORzwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IGZpbGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYXJzZWRzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbXNzZWEnKVxuICAgIHtcbiAgICAgIGxldCBwcmVkX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZG9tc3NlYV9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc3NlYV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBmaWxlPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdydW5CaW9zZXJmJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZpbmFsIEhvbW9sb2d5IE1vZGVsPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjYmlvc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaGhibGl0c19wZGI3MCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SEhTZWFyY2ggUmVzdWx0czwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGdwYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfY2F0aCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQVRIIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdyZWZvcm1hdF9kb21zZXJmX21vZGVscycgfHwgcmVzdWx0X2RpY3QubmFtZSA9PT0gXCJwYXJzZV9wZGJfYmxhc3RcIilcbiAgICB7XG4gICAgICBsZXQgZG9tc2VyZl9tYXRjaCA9IGRvbXNlcmZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc2VyZl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfdGltZVwiLCAnJyk7XG4gICAgICAgIC8vIFRPIERPIEFERCBSRUdFWFxuICAgICAgICBkb21haW5fY291bnQrPTE7XG4gICAgICAgIGRvbXNlcmZfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgaWYoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCl7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgKz0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ1dHRvbnNfdGFncyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9idXR0b25zXCIpO1xuICAgICAgICBidXR0b25zX3RhZ3MgKz0gJzxidXR0b24gb25DbGljaz1cInBzaXByZWQuc3dhcERvbXNlcmYoJytkb21haW5fY291bnQrJylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5Eb21haW4gJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2J1dHRvbj4nO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfYnV0dG9uc1wiLCBidXR0b25zX3RhZ3MpO1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICAgICAgcGF0aHMucHVzaChmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiLCBwYXRocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dldFNjaGVtYXRpYycpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF90aW1lXCIsICcnKTtcblxuICAgICAgbGV0IHNjaF9tYXRjaCA9ICBmZnByZWRfc2NoX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZlYXR1cmUgU2NoZW1hdGljIFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljJywgJzxiPlNlcXVlbmNlIEZlYXR1cmUgTWFwPC9iPjxiciAvPlBvc2l0aW9uIGRlcGVuZGVudCBmZWF0dXJlIHByZWRpY3Rpb25zIGFyZSBtYXBwZWQgb250byB0aGUgc2VxdWVuY2Ugc2NoZW1hdGljIHNob3duIGJlbG93LiBUaGUgbGluZSBoZWlnaHQgb2YgdGhlIFBob3NwaG9yeWxhdGlvbiBhbmQgR2x5Y29zeWxhdGlvbiBmZWF0dXJlcyByZWZsZWN0cyB0aGUgY29uZmlkZW5jZSBvZiB0aGUgcmVzaWR1ZSBwcmVkaWN0aW9uLjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBmZnByZWRfc3ZtX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfY2FydG9vbicsICc8Yj5QcmVkaWN0ZWQgVHJhbnNtZW1icmFuZSBUb3BvbG9neTwvYj48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZWF0dXJlcycpXG4gICAge1xuICAgICAgbGV0IGZlYXRfbWF0Y2ggPSBmZnByZWRfZmVhdGNmZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihmZWF0X21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZXF1ZW5jZSBGZWF0dXJlIFN1bW1hcnk8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRmZWF0dXJlcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZmcHJlZF9odW1hbicpXG4gICAge1xuICAgICAgbGV0IHByZWRzX21hdGNoID0gZmZwcmVkX3ByZWRzX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRzX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5HTyBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZHByZWRpY3Rpb25zJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGxvdF9zZWxmX2NvbnRhY3RfbWFwJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5tYXAgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IE1hcDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfbWFwJywgJzxiPkNvbnRhY3QgTWFwPC9iPjxiciAvPjxpbWcgaGVpZ2h0PVwiODAwXCIgd2lkdGg9XCI4MDBcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjb250YWN0X3ByZWRpY3RvcnMnKVxuICAgIHtcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gICAgICAgIGxldCBldl9tYXRjaCA9IG1ldGFwc2ljb3ZfZXZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihldl9tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuZnJlZWNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GcmVlQ29udGFjdCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHNfbWF0Y2ggPSBtZXRhcHNpY292X3BzaWNvdl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKHBzX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QU0lDT1YgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNjX21hdGNoID0gbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoY2NfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQ01QUkVEIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSAgPT09ICdtZXRhcHNpY292X3N0YWdlMicpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWV0cHJlZF93cmFwcGVyJylcbiAgICB7XG4gICAgICBsZXQgdGFibGVfbWF0Y2ggPSBtZXRzaXRlX3RhYmxlX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBwZGJfbWF0Y2ggPSBtZXRzaXRlX3BkYl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3RpbWVcIiwgJycpO1xuICAgICAgaWYodGFibGVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWV0c2l0ZScsIHppcCwgcmFjdGl2ZSk7XG5cbiAgICAgIH1cbiAgICAgIGlmKHBkYl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaHNfcHJlZCcpXG4gICAge1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImhzcHJlZF90aW1lXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SFNQcmVkIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaHNwcmVkJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NwbGl0X3BkYl9maWxlcycpXG4gICAge1xuICAgICAgbGV0IGluaXRpYWxfbWF0Y2ggPSBoc3ByZWRfaW5pdGlhbF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBsZXQgc2Vjb25kX21hdGNoID0gaHNwcmVkX3NlY29uZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihpbml0aWFsX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SW5pdGlhbCBQREI8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9pbml0aWFsX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9pbml0aWFsX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYoc2Vjb25kX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmhzcHJlZC5zZWNvbmQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZWNvbmQgUERCPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfc2Vjb25kX3BkYicsIGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9TZXQgbm8gZm91bmQgc3RhdG1lbnRzIGZvciBzb21lIGpvYnMuXG4gIGlmKCEgbWVtcGFja19yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKCEgcHNpcHJlZF9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wc2lwcmVkKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICB9XG4gIGlmKCEgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnTm8gJytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgdGFibGUgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoZG9tc2VyZl9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkLCBjYXJ0b29uKVxue1xuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgIGlmKGF0b20uc3MgPT09ICdzJyl7cmV0dXJuICcjZTVkZDU1Jzt9XG4gICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGxldCBob3RzcG90X2NvbG9yID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgLy9pZihhdG9tLmIgPT0gMS4wKXtyZXR1cm4gJ3JlZCc7fVxuICAgIC8vaWYoYXRvbS5iID09IDAuNSl7cmV0dXJuICdibGFjayc7fVxuICAgIHJldHVybihcImJsdWVcIik7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgaWYoY2FydG9vbilcbiAge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICBlbHNlIHtcbiAgICB2aWV3ZXIuc2V0U3R5bGUoe30sIHtjYXJ0b29uOiB7Y29sb3JmdW5jOiBob3RzcG90X2NvbG9yfX0pOyAgLyogc3R5bGUgYWxsIGF0b21zICovXG4gIH1cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldHNpdGUnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldHNpdGUucGRiKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2hzcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmhzcHJlZC5pbml0aWFsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uaHNwcmVkLnNlY29uZCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG5cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9hZHZhbmNlZF9wYXJhbXMoKVxue1xuICBsZXQgb3B0aW9uc19kYXRhID0ge307XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfZV92YWx1ZV9jdXRvZmZcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfZXZhbHVlID0gXCIwLjAxXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbXByZWRfcHNpYmxhc3RfaXRlcmF0aW9uc1wiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zID0gNTtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuYmlvc2VyZl9tb2RlbGxlcl9rZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpb3NlcmZfbW9kZWxsZXJfa2V5XCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IFwiXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF90eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZnByZWRfc2VsZWN0aW9uXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5mZnByZWRfdHlwZSA9IFwiaHVtYW5cIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuZXh0cmFjdF9mYXN0YV9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX21ldGFsX3R5cGVcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IFwiQ2FcIjtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX21ldGFsID0gXCJDYVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9mcHJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9mcHIgPSBcIjVcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMVwiKS52YWx1ZStkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMgPSBcIkFCXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9IFwiQVwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzJcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJCXCI7XG4gIH1cblxuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9zZWFyY2hfdHlwZVwiKTtcbiAgLy8gb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYmFycmVsXCIpO1xuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF90ZXJtaW5hbFwiKTtcbiAgLy8gb3B0aW9uc19kYXRhLiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtZW1iZWRfYm91bmRhcmllc1wiKTtcbiAgcmV0dXJuKG9wdGlvbnNfZGF0YSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYXJzZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZlYXRjZmcgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmZwcmVkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZXRzaXRlIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2hzcHJlZCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cbi8vZ2l2ZW4gYSB1cmwsIGh0dHAgcmVxdWVzdCB0eXBlIGFuZCBzb21lIGZvcm0gZGF0YSBtYWtlIGFuIGh0dHAgcmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfcmVxdWVzdCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcbiAgY29uc29sZS5sb2coJ1NlbmRpbmcgVVJJIHJlcXVlc3QnKTtcbiAgY29uc29sZS5sb2codXJsKTtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHZhciByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byBzZW5kIGRhdGFcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiU2VuZGluZyBKb2IgdG8gXCIrdXJsK1wiIEZhaWxlZC4gXCIrZXJyb3IucmVzcG9uc2VUZXh0K1wiLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2Ugd2FzIHVuYWJsZSB0byBwcm9jZXNzIHlvdXIgc3VibWlzc2lvbi4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7IHJldHVybiBudWxsO1xuICB9fSkucmVzcG9uc2VKU09OO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG4vL2dpdmVuIGEgam9iIG5hbWUgcHJlcCBhbGwgdGhlIGZvcm0gZWxlbWVudHMgYW5kIHNlbmQgYW4gaHR0cCByZXF1ZXN0IHRvIHRoZVxuLy9iYWNrZW5kXG5leHBvcnQgZnVuY3Rpb24gc2VuZF9qb2IocmFjdGl2ZSwgam9iX25hbWUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEpXG57XG4gIC8vYWxlcnQoc2VxKTtcbiAgY29uc29sZS5sb2coXCJTZW5kaW5nIGZvcm0gZGF0YVwiKTtcbiAgY29uc29sZS5sb2coam9iX25hbWUpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7XG4gIGZkLmFwcGVuZChcIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJleHRyYWN0X2Zhc3RhX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfZnByXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByKTtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdtYWtldGRiJywgJ21lbWVtYmVkJ10uaW5jbHVkZXMoam9iX25hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnaHNwcmVkJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfaHNwcmVkKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbn1cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgc2V0X2FkdmFuY2VkX3BhcmFtcyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBjbGVhcl9zZXR0aW5ncyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBwcmVwYXJlX2Rvd25sb2Fkc19odG1sIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGhhbmRsZV9yZXN1bHRzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNldF9kb3dubG9hZHNfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2hvd19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5X3N0cnVjdHVyZSB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcbmxldCBqb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsIFwibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IHNlcV9qb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIixdO1xubGV0IHN0cnVjdF9qb2JfbGlzdCA9IFtcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWJtaXNzaW9uX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcbiAgICBtZXRzaXRlX3RhYmxlOiBudWxsLFxuICAgIG1ldHNpdGVfcGRiOiBudWxsLFxuICAgIGhzcHJlZF90YWJsZTogbnVsbCxcbiAgICBoc3ByZWRfaW5pdGlhbF9wZGI6IG51bGwsXG4gICAgaHNwcmVkX3NlY29uZF9wZGI6IG51bGwsXG5cbiAgICBtZXRhcHNpY292X2RhdGE6IG51bGwsXG4gICAgbWV0c2l0ZV9kYXRhOiBudWxsLFxuICAgIGhzcHJlZF9kYXRhOiBudWxsLFxuICAgIG1lbWVtYmVkX2RhdGE6IG51bGwsXG4gICAgZ2VudGRiX2RhdGE6IG51bGwsXG5cbiAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICBzZXF1ZW5jZTogJycsXG4gICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgZW1haWw6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGJhdGNoX3V1aWQ6IG51bGwsXG4gICAgLy9ob2xkIGFubm90YXRpb25zIHRoYXQgYXJlIHJlYWQgZnJvbSBkYXRhZmlsZXNcbiAgICBhbm5vdGF0aW9uczogbnVsbCxcbn07XG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfYnV0dG9uJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2pvYiddID0gam9iX25hbWUrJ19qb2InO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJ10gPSAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ19pY29uJ10gPSBnZWFyX3N0cmluZztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfdGltZSddID0gJ0xvYWRpbmcgRGF0YSc7XG59KTtcbmluaXRpYWxpc2F0aW9uX2RhdGEuaHNwcmVkX2NoZWNrZWQgPSB0cnVlO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5oc3ByZWRfYWR2YW5jZWQgPSAxO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zZXF1ZW5jZV9mb3JtX3Zpc2libGUgPSAwO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zdHJ1Y3R1cmVfZm9ybV92aXNpYmxlID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuXG5cblxuXG4gICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIHNlcV90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgfVxuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgIGxldCBiYXRjaCA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgZG93bmxvYWRzX2luZm8gPSB7fTtcblxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnQ29tcGxldGUnKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyIHJlc3VsdHNcIik7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSBiYXRjaC5zdWJtaXNzaW9ucztcbiAgICAgIHN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gICAgICAgICAgaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcyk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgYWxlcnQoXCJQT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkXFxuXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhpcyBlcnJvciBtZXNzYWdlIGFuZCB5b3VyIGpvYiBJRFxcblwiK3N1Ym1pc3Npb25fbWVzc2FnZSk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxucmFjdGl2ZS5vbignc2hvd19iaW9zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19mZnByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2ZmcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZXRzaXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfaHNwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWVtZW1iZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHBhbmVsXG4vL1xucmFjdGl2ZS5vbiggJ3NlcXVlbmNlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIGZhbHNlKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgc2hvd19wYW5lbCgxLCByYWN0aXZlKTtcbn0pO1xuXG4vL3JlZ2lzdGVyIGxpc3RlbmVycyBmb3IgZWFjaCByZXN1bHRzIHBhbmVsXG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lLCBpKXtcbiAgY29uc29sZS5sb2coXCJhZGRpbmcgam9icyB3YXRjaGVyc1wiKTtcbiAgcmFjdGl2ZS5vbihqb2JfbmFtZSsnX2FjdGl2ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgIHNob3dfcGFuZWwoaSsyLCByYWN0aXZlKTtcbiAgICBpZihqb2JfbmFtZSA9PT0gXCJwc2lwcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSBcImRpc29wcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZXRzaXRlJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBtZXRfcGRiID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdoc3ByZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBpbml0aWFsX3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfaW5pdGlhbF9wZGInKTtcbiAgICAgICAgbGV0IHNlY29uZF9wZGIgPSByYWN0aXZlLmdldCgnaHNwcmVkX3NlY29uZF9wZGInKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUoaW5pdGlhbF9wZGIsICcjaHNwcmVkX2luaXRpYWxfbW9kZWwnLCBmYWxzZSk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHNlY29uZF9wZGIsICAnI2hzcHJlZF9zZWNvbmRfbW9kZWwnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG59KTtcblxucmFjdGl2ZS5vbiggJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgY29uc29sZS5sb2coXCJTVUJNSVNTSU9OIEFDVElWRVwiKTtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcblxuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgbGV0IHN0cnVjdF90eXBlID0gZmFsc2U7XG4gIGxldCBzZXFfdHlwZSA9IGZhbHNlO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHN0cnVjdF9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc3RydWN0X3R5cGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gJiYgc2VxX2pvYl9saXN0LmluY2x1ZGVzKGpvYl9uYW1lKSlcbiAgICB7XG4gICAgICBzZXFfdHlwZSA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIC8vSEFORExFIEZGUFJFRCBKT0IgU0VMRUNUSU9OLlxuICBpZihjaGVja19zdGF0ZXMuYmlvc2VyZl9jaGVja2VkIHx8IGNoZWNrX3N0YXRlcy5kb21zZXJmX2NoZWNrZWQpXG4gIHtcbiAgICBsZXQgYmlvc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBsZXQgZG9tc19tb2RlbGxlcl90ZXN0ID0gdGVzdF9tb2RlbGxlcl9rZXkob3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5KTtcbiAgICBpZihiaW9zX21vZGVsbGVyX3Rlc3QgfHwgZG9tc19tb2RlbGxlcl90ZXN0KVxuICAgIHtcbiAgICAgIHN1Ym1pdF9qb2IgPXRydWU7XG4gIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJZb3UgaGF2ZSBub3QgcHJvdmlkZWQgYSB2YWxpZCBNT0RFTExFUiBrZXkuIENvbnRhY3QgdGhlIFNhbGkgbGFiIGZvciBhIE1PREVMTEVSIGxpY2VuY2UuXCIpO1xuICAgIH1cbiAgfVxuICBlbHNle1xuICAgIHN1Ym1pdF9qb2I9dHJ1ZTtcbiAgfVxuICBpZihzZXFfdHlwZSAmJiBzdHJ1Y3RfdHlwZSlcbiAge1xuICAgIGFsZXJ0KFwiWW91IGNhbiBub3Qgc3VibWl0IGJvdGggc2VxdWVuY2UgYW5kIHN0cnVjdHVyZSBhbmFseXNpcyBqb2JzXCIpO1xuICAgIHN1Ym1pdF9qb2IgPSBmYWxzZTtcbiAgfVxuICBpZihzdWJtaXRfam9iKVxuICB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nXCIpO1xuICAgIGlmKHNlcV90eXBlKVxuICAgIHtcbiAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgfVxuICAgIGlmKHN0cnVjdF90eXBlKVxuICAgIHtcbiAgICAgIGxldCBwZGJGaWxlID0gbnVsbDtcbiAgICAgIGxldCBwZGJEYXRhID0gJyc7XG4gICAgICB0cnl7XG4gICAgICAgcGRiRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGRiRmlsZVwiKTtcbiAgICAgICBsZXQgZmlsZSA9IHBkYkZpbGUuZmlsZXNbMF07XG4gICAgICAgbGV0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcGRiRGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgcGRiRGF0YSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEsIHNlcV90eXBlLCBzdHJ1Y3RfdHlwZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgcGRiRGF0YSA9IFwiXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2FkZCBmb3JtIGRlZmF1bHRzIGJ1dCBudWxsIHRoZSBzdHJ1Y3RlcyBvbmVzIGFzIHdlIGRvbid0IGFsbG93IHN0cnVjdHVyZSBqb2IgcmVzdWJtaXNzaW9uXG4gIGxldCBvcHRpb25zX2RhdGEgPSBzZXRfYWR2YW5jZWRfcGFyYW1zKCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIHRydWUsIGZhbHNlKTtcbiAgLy93cml0ZSBuZXcgYW5ub3RhdGlvbiBkaWFncmFtXG4gIC8vc3VibWl0IHN1YnNlY3Rpb25cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiB0ZXN0X21vZGVsbGVyX2tleShpbnB1dClcbntcbiAgaWYoaW5wdXQgPT09ICdNT0RFTElSQU5KRScpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgcmV0dXJuKGZhbHNlKTtcbn1cblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBsZXQgc2VxX3R5cGUgPSB0cnVlO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0YXBzaWNvdicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkaXNvcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtcGFjaycpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgc2VxX3R5cGUpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpXG57XG4gIC8qdmVyaWZ5IHRoYXQgZXZlcnl0aGluZyBoZXJlIGlzIG9rKi9cbiAgbGV0IGVycm9yX21lc3NhZ2U9bnVsbDtcbiAgbGV0IGpvYl9zdHJpbmcgPSAnJztcbiAgLy9lcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWRdKTtcblxuICBsZXQgY2hlY2tfbGlzdCA9IFtdO1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19saXN0LnB1c2goY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddKTtcbiAgfSk7XG5cbiAgaWYoc2VxX3R5cGUpe1xuICAgIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfc2VxX2Zvcm0oZGF0YSwgbmFtZSwgZW1haWwsIGNoZWNrX2xpc3QpO1xuICB9XG4gIGlmKHN0cnVjdF90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3N0cnVjdF9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihlcnJvcl9tZXNzYWdlLmxlbmd0aCA+IDApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZm9ybV9lcnJvcicsIGVycm9yX21lc3NhZ2UpO1xuICAgIGFsZXJ0KFwiRk9STSBFUlJPUjpcIitlcnJvcl9tZXNzYWdlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2luaXRpYWxpc2UgdGhlIHBhZ2VcbiAgICBsZXQgcmVzcG9uc2UgPSB0cnVlO1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgbnVsbCApO1xuICAgIC8vUG9zdCB0aGUgam9icyBhbmQgaW50aWFsaXNlIHRoZSBhbm5vdGF0aW9ucyBmb3IgZWFjaCBqb2JcbiAgICAvL1dlIGFsc28gZG9uJ3QgcmVkdW5kYW50bHkgc2VuZCBleHRyYSBwc2lwcmVkIGV0Yy4uIGpvYnNcbiAgICAvL2J5dCBkb2luZyB0aGVzZSB0ZXN0IGluIGEgc3BlY2lmaWMgb3JkZXJcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoam9iX25hbWUrXCIsXCIpO1xuICAgICAgICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ19idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2Rpc29wcmVkJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdkb21wcmVkJyB8fCBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnYmlvc2VyZicgfHwgam9iX25hbWUgPT09ICdkb21zZXJmJyB8fFxuICAgICAgICAgICAgICAgam9iX25hbWUgPT09ICdtZXRhcHNpY292JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZ2VudGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2hlY2tfc3RhdGVzLnBkb210aHJlYWRlcl9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIGRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgaWYoc2VxX3R5cGUpe1xuICAgICAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWJtaXNzaW9uX3Zpc2libGUnLCAyICk7XG4gICAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc3RydWN0X2Zvcm0oc3RydWN0LCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cbiAgLy8gVE9ETzogb25lIGRheSB3ZSBzaG91bGQgbGV0IHRoZXNlIHNlcnZpY2VzIHRha2UgeG1sIHBkYiBmaWxlc1xuICBpZighIC9eSEVBREVSfF5BVE9NXFxzK1xcZCsvaS50ZXN0KHN0cnVjdCkpe1xuICAgICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgZmlsZSBkb2VzIG5vdCBsb29rIGxpa2UgYSBwbGFpbiB0ZXh0IGFzY2lpIHBkYiBmaWxlLiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgYWNjZXB0IC5neiBvciB4bWwgZm9ybWF0IHBkYiBmaWxlc1wiO1xuICB9XG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfc2VxX2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9