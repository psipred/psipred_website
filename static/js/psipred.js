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
/* unused harmony export get_memsat_ranges */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse_ss2;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse_pbdat;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse_comb;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse_memsatdata;
/* harmony export (immutable) */ __webpack_exports__["e"] = parse_presult;

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

function parse_presult(ractive, file) {
  let lines = file.split('\n');
  let ann_list = ractive.get('pgen_ann_set');
  if (Object.keys(ann_list).length > 0) {
    let pseudo_table = '<table class="small-table table-striped table-bordered">\n';
    pseudo_table += '<tr><th>Conf.</th>';
    pseudo_table += '<th>Net Score</th>';
    pseudo_table += '<th>p-value</th>';
    pseudo_table += '<th>PairE</th>';
    pseudo_table += '<th>SolvE</th>';
    pseudo_table += '<th>Aln Score</th>';
    pseudo_table += '<th>Aln Length</th>';
    pseudo_table += '<th>Str Len</th>';
    pseudo_table += '<th>Seq Len</th>';
    pseudo_table += '<th>Fold</th>';
    pseudo_table += '<th>SEARCH SCOP</th>';
    pseudo_table += '<th>SEARCH CATH</th>';
    pseudo_table += '<th>PDBSUM</th>';
    pseudo_table += '<th>Alignment</th>';
    pseudo_table += '<th>MODEL</th>';

    // if MODELLER THINGY
    pseudo_table += '</tr><tbody">\n';
    lines.forEach(function (line, i) {
      if (line.length === 0) {
        return;
      }
      entries = line.split(/\s+/);
      if (entries[9] + "_" + i in ann_list) {
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
        pseudo_table += "<td><a target='_blank' href='https://www.rcsb.org/pdb/explore/explore.do?structureId=" + pdb + "'>" + entries[9] + "</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/pdb/" + pdb + "'>CATH SEARCH</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
        pseudo_table += "<td><input class='button' type='button' onClick='loadNewAlignment(\"" + ann_list[entries[9] + "_" + i].aln + "\",\"" + ann_list[entries[9] + "_" + i].ann + "\",\"" + (entries[9] + "_" + i) + "\");' value='Display Alignment' /></td>";
        pseudo_table += "<td><input class='button' type='button' onClick='buildModel(\"" + ann_list[entries[9] + "_" + i].aln + "\");' value='Build Model' /></td>";
        pseudo_table += "</tr>\n";
      }
    });
    pseudo_table += "</tbody></table>\n";
    ractive.set("pgen_table", pseudo_table);
  } else {
    ractive.set("pgen_table", "<h3>No good hits found. GUESS and LOW confidence hits can be found in the results file</h3>");
  }
}

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = clear_settings;
/* harmony export (immutable) */ __webpack_exports__["a"] = prepare_downloads_html;
/* harmony export (immutable) */ __webpack_exports__["b"] = handle_results;
/* harmony export (immutable) */ __webpack_exports__["c"] = set_downloads_panel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(3);


//before a resubmission is sent all variables are reset to the page defaults
function clear_settings(geat_string) {
  ractive.set('results_visible', 2);
  ractive.set('results_panel_visible', 1);
  ractive.set('psipred_button', false);
  ractive.set('download_links', '');
  ractive.set('psipred_waiting_message', '<h2>Please wait for your PSIPRED job to process</h2>');
  ractive.set('psipred_waiting_icon', gear_string);
  ractive.set('psipred_time', 'Loading Data');
  ractive.set('psipred_horiz', null);
  ractive.set('disopred_waiting_message', '<h2>Please wait for your DISOPRED job to process</h2>');
  ractive.set('disopred_waiting_icon', gear_string);
  ractive.set('disopred_time', 'Loading Data');
  ractive.set('diso_precision');
  ractive.set('memsatsvm_waiting_message', '<h2>Please wait for your MEMSAT-SVM job to process</h2>');
  ractive.set('memsatsvm_waiting_icon', gear_string);
  ractive.set('memsatsvm_time', 'Loading Data');
  ractive.set('memsatsvm_schematic', '');
  ractive.set('memsatsvm_cartoon', '');
  ractive.set('pgenthreader_waiting_message', '<h2>Please wait for your pGenTHREADER job to process</h2>');
  ractive.set('pgenthreader_waiting_icon', gear_string);
  ractive.set('pgenthreader_time', 'Loading Data');
  ractive.set('pgen_table', '');
  ractive.set('pgen_set', {});

  //ractive.set('diso_precision');
  ractive.set('annotations', null);
  ractive.set('batch_uuid', null);
  biod3.clearSelection('div.sequence_plot');
  biod3.clearSelection('div.psipred_cartoon');
  biod3.clearSelection('div.comb_plot');

  zip = new JSZip();
}

//Take a couple of variables and prepare the html strings for the downloads panel
function prepare_downloads_html(data, downloads_info) {
  if (data.job_name.includes('psipred')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>PSIPRED DOWNLOADS</h5>";
  }
  if (data.job_name.includes('disopred')) {
    downloads_info.disopred = {};
    downloads_info.disopred.header = "<h5>DISOPRED DOWNLOADS</h5>";
  }
  if (data.job_name.includes('memsatsvm')) {
    downloads_info.memsatsvm = {};
    downloads_info.memsatsvm.header = "<h5>MEMSATSVM DOWNLOADS</h5>";
  }
  if (data.job_name.includes('pgenthreader')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>PSIPRED DOWNLOADS</h5>";
    downloads_info.pgenthreader = {};
    downloads_info.pgenthreader.header = "<h5>pGenTHREADER DOWNLOADS</h5>";
  }
}

//take the datablob we've got and loop over the results
function handle_results(ractive, data, file_url, zip, downloads_info) {
  let horiz_regex = /\.horiz$/;
  let ss2_regex = /\.ss2$/;
  let memsat_cartoon_regex = /_cartoon_memsat_svm\.png$/;
  let memsat_schematic_regex = /_schematic\.png$/;
  let memsat_data_regex = /memsat_svm$/;
  let image_regex = '';
  let results = data.results;
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
  }

  for (let i in results) {
    let result_dict = results[i];
    //psipred files
    if (result_dict.name == 'psipass2') {
      let match = horiz_regex.exec(result_dict.data_path);
      if (match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'horiz', zip, ractive);
        ractive.set("psipred_waiting_message", '');
        downloads_info.psipred.horiz = '<a href="' + file_url + result_dict.data_path + '">Horiz Format Output</a><br />';
        ractive.set("psipred_waiting_icon", '');
        ractive.set("psipred_time", '');
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

    if (result_dict.name === 'memsatsvm') {
      ractive.set("memsatsvm_waiting_message", '');
      ractive.set("memsatsvm_waiting_icon", '');
      ractive.set("memsatsvm_time", '');
      let scheme_match = memsat_schematic_regex.exec(result_dict.data_path);
      if (scheme_match) {
        ractive.set('memsatsvm_schematic', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.schematic = '<a href="' + file_url + result_dict.data_path + '">Schematic Diagram</a><br />';
      }
      let cartoon_match = memsat_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        ractive.set('memsatsvm_cartoon', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let memsat_match = memsat_data_regex.exec(result_dict.data_path);
      if (memsat_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'memsatdata', zip, ractive);
        downloads_info.memsatsvm.data = '<a href="' + file_url + result_dict.data_path + '">Memsat Output</a><br />';
      }
    }
    if (result_dict.name === 'sort_presult') {
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">pGenTHREADER Table</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_align') {
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">pGenTHREADER Alignments</a><br />';
    }
  }
}

function set_downloads_panel(ractive, downloads_info) {
  let downloads_string = ractive.get('download_links');
  if ('psipred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.psipred.header);
    downloads_string = downloads_string.concat(downloads_info.psipred.horiz);
    downloads_string = downloads_string.concat(downloads_info.psipred.ss2);
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
  ractive.set('download_links', downloads_string);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = send_request;
/* harmony export (immutable) */ __webpack_exports__["d"] = send_job;
/* harmony export (immutable) */ __webpack_exports__["b"] = get_previous_data;
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
      alert("Sending Job to " + url + " Failed. " + error.responseText + ". The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk");return null;
    }
  }).responseJSON;
  return response;
}

//given a job name prep all the form elements and send an http request to the
//backend
function send_job(ractive, job_name, seq, name, email, submit_url, times_url) {
  //alert(seq);
  console.log("Sending form data");
  var file = null;
  let upper_name = job_name.toUpperCase();
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

  let response_data = send_request(submit_url, "POST", fd);
  if (response_data !== null) {
    let times = send_request(times_url, 'GET', {});
    //alert(JSON.stringify(times));
    if (job_name in times) {
      ractive.set(job_name + '_time', upper_name + " jobs typically take " + times[job_name] + " seconds");
    } else {
      ractive.set(job_name + '_time', "Unable to retrieve average time for " + upper_name + " jobs.");
    }
    for (var k in response_data) {
      if (k == "UUID") {
        ractive.set('batch_uuid', response_data[k]);
        ractive.fire('poll_trigger', job_name);
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
      alert("Gettings results failed. The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk");
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file);
      }
    },
    error: function (error) {
      alert(JSON.stringify(error));
    }
  });
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__ = __webpack_require__(2);
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

// DECLARE VARIABLES and init ractive instance
var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
    results_visible: 1,
    results_panel_visible: 1,
    submission_widget_visible: 0,
    modeller_key: null,

    psipred_checked: true,
    psipred_button: false,
    disopred_checked: false,
    disopred_button: false,
    memsatsvm_checked: false,
    memsatsvm_button: false,
    pgenthreader_checked: false,
    pgenthreader_button: false,

    // pgenthreader_checked: false,
    // pdomthreader_checked: false,
    // dompred_checked: false,
    // mempack_checked: false,
    // ffpred_checked: false,
    // bioserf_checked: false,
    // domserf_checked: false,
    download_links: '',
    psipred_job: 'psipred_job',
    disopred_job: 'disopred_job',
    memsatsvm_job: 'memsatsvm_job',
    pgenthreader_job: 'pgenthreader_job',

    psipred_waiting_message: '<h2>Please wait for your PSIPRED job to process</h2>',
    psipred_waiting_icon: gear_string,
    psipred_time: 'Loading Data',
    psipred_horiz: null,

    disopred_waiting_message: '<h2>Please wait for your DISOPRED job to process</h2>',
    disopred_waiting_icon: gear_string,
    disopred_time: 'Loading Data',
    diso_precision: null,

    memsatsvm_waiting_message: '<h2>Please wait for your MEMSAT-SVM job to process</h2>',
    memsatsvm_waiting_icon: gear_string,
    memsatsvm_time: 'Loading Data',
    memsatsvm_schematic: '',
    memsatsvm_cartoon: '',

    pgenthreader_waiting_message: '<h2>Please wait for your pGenTHREADER job to process</h2>',
    pgenthreader_waiting_icon: gear_string,
    pgenthreader_time: 'Loading Data',
    pgen_table: null,
    pgen_ann_set: {},

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
  }
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
ractive.on('poll_trigger', function (name, job_type) {
  console.log("Polling backend for results");
  let url = submit_url + ractive.get('batch_uuid');
  history.pushState(null, '', app_path + '/&uuid=' + ractive.get('batch_uuid'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);

  let interval = setInterval(function () {
    let batch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["a" /* send_request */])(url, "GET", {});
    let downloads_info = {};

    if (batch.state === 'Complete') {
      console.log("Render results");
      let submissions = batch.submissions;
      submissions.forEach(function (data) {
        // console.log(data);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["a" /* prepare_downloads_html */])(data, downloads_info);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info);
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

// These react to the headers being clicked to toggle the results panel
//
ractive.on('downloads_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 11);
});
ractive.on('psipred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 1);
  if (ractive.get('psipred_horiz')) {
    biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
  }
});
ractive.on('disopred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 4);
  if (ractive.get('diso_precision')) {
    biod3.genericxyLineChart(ractive.get('diso_precision'), 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
  }
});
ractive.on('memsatsvm_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 6);
});
ractive.on('pgenthreader_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 2);
});
ractive.on('submission_active', function (event) {
  let state = ractive.get('submission_widget_visible');
  if (state === 1) {
    ractive.set('submission_widget_visible', 0);
  } else {
    ractive.set('submission_widget_visible', 1);
  }
});

//grab the submit event from the main form and send the sequence to the backend
ractive.on('submit', function (event) {
  console.log('Submitting data');
  let seq = this.get('sequence');
  seq = seq.replace(/^>.+$/mg, "").toUpperCase();
  seq = seq.replace(/\n|\s/g, "");
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.set('sequence', seq);

  let name = this.get('name');
  let email = this.get('email');
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');
  let pgenthreader_job = this.get('pgenthreader_job');
  let pgenthreader_checked = this.get('pgenthreader_checked');
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked);
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
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');
  let pgenthreader_job = this.get('pgenthreader_job');
  let pgenthreader_checked = this.get('pgenthreader_checked');

  //clear what we have previously written
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* clear_settings */])(gear_string);
  //verify form contents and post
  //console.log(name);
  //console.log(email);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked);
  //write new annotation diagram
  //submit subsection
  event.original.preventDefault();
});

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
  if (previous_data.jobs.includes('psipred')) {
    ractive.set('psipred_button', true);
    ractive.set('results_panel_visible', 1);
  }
  if (previous_data.jobs.includes('disopred')) {
    ractive.set('disopred_button', true);
    ractive.set('results_panel_visible', 4);
  }
  if (previous_data.jobs.includes('memsatsvm')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('results_panel_visible', 6);
  }
  if (previous_data.jobs.includes('pgenthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('results_panel_visible', 2);
  }

  ractive.set('sequence', previous_data.seq);
  ractive.set('email', previous_data.email);
  ractive.set('name', previous_data.name);
  let seq = ractive.get('sequence');
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.fire('poll_trigger', 'psipred');
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
function buildModel(alnURI) {

  let url = submit_url + ractive.get('batch_uuid');
  let mod_key = ractive.get('modeller_key');
  if (mod_key === 'M' + 'O' + 'D' + 'E' + 'L' + 'I' + 'R' + 'A' + 'N' + 'J' + 'E') {
    window.open(".." + app_path + "/model/post?aln=" + file_url + alnURI, "", "width=670,height=700");
  } else {
    alert('Please provide a valid M' + 'O' + 'D' + 'E' + 'L' + 'L' + 'E' + 'R Licence Key');
  }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verify_and_send_form;
/* unused harmony export verify_form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_index_js__ = __webpack_require__(1);




//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(ractive, seq, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked) {
  /*verify that everything here is ok*/
  let error_message = null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);

  error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked]);
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
    if (pgenthreader_checked === true) {
      job_string = job_string.concat("pgenthreader,");
      ractive.set('pgenthreader_button', true);
      ractive.set('psipred_button', true);
      psipred_checked = false;
    }
    if (disopred_checked === true) {
      job_string = job_string.concat("disopred,");
      ractive.set('disopred_button', true);
      ractive.set('psipred_button', true);
      psipred_checked = false;
    }
    if (psipred_checked === true) {
      job_string = job_string.concat("psipred,");
      ractive.set('psipred_button', true);
    }
    if (memsatsvm_checked === true) {
      job_string = job_string.concat("memsatsvm,");
      ractive.set('memsatsvm_button', true);
    }

    job_string = job_string.slice(0, -1);
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["d" /* send_job */])(ractive, job_string, seq, name, email, submit_url, times_url);
    //set visibility and render panel once
    if (psipred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('psipred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
      // parse sequence and make seq plot
    } else if (disopred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('disopred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (memsatsvm_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('memsatsvm_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (pgenthreader_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('pgenthreader_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    }

    if (!response) {
      window.location.href = window.location.href;
    }
  }
}

//Takes the form elements and checks they are valid
function verify_form(seq, job_name, email, checked_array) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTBlMDAyN2NjYmE3MjIxYWQ5N2YiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbImdldF9tZW1zYXRfcmFuZ2VzIiwicmVnZXgiLCJkYXRhIiwibWF0Y2giLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwic3BsaXQiLCJmb3JFYWNoIiwicmVnaW9uIiwiaSIsInBhcnNlSW50IiwicGFyc2Vfc3MyIiwicmFjdGl2ZSIsImZpbGUiLCJhbm5vdGF0aW9ucyIsImdldCIsImxpbmVzIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwibGVuZ3RoIiwibGluZSIsImVudHJpZXMiLCJzcyIsInNldCIsImJpb2QzIiwiYW5ub3RhdGlvbkdyaWQiLCJwYXJlbnQiLCJtYXJnaW5fc2NhbGVyIiwiZGVidWciLCJjb250YWluZXJfd2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhaW5lcl9oZWlnaHQiLCJhbGVydCIsInBhcnNlX3BiZGF0IiwiZGlzb3ByZWQiLCJwYXJzZV9jb21iIiwicHJlY2lzaW9uIiwicG9zIiwiZ2VuZXJpY3h5TGluZUNoYXJ0IiwiY2hhcnRUeXBlIiwieV9jdXRvZmYiLCJwYXJzZV9tZW1zYXRkYXRhIiwic2VxIiwidG9wb19yZWdpb25zIiwic2lnbmFsX3JlZ2lvbnMiLCJyZWVudHJhbnRfcmVnaW9ucyIsInRlcm1pbmFsIiwiY29pbF90eXBlIiwidG1wX2Fubm8iLCJBcnJheSIsInByZXZfZW5kIiwiZmlsbCIsImFubm8iLCJtZW1zYXQiLCJwYXJzZV9wcmVzdWx0IiwiYW5uX2xpc3QiLCJPYmplY3QiLCJrZXlzIiwicHNldWRvX3RhYmxlIiwidG9Mb3dlckNhc2UiLCJwZGIiLCJzdWJzdHJpbmciLCJhbG4iLCJhbm4iLCJpc0luQXJyYXkiLCJ2YWx1ZSIsImFycmF5IiwiaW5kZXhPZiIsImRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCIsInJlc2lkdWVzIiwicmVzIiwicHVzaCIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlIiwibSIsImtleSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiaW1wb3J0YW50Iiwic3R5bGUiLCJnZXRFbVBpeGVscyIsImVsZW1lbnQiLCJleHRyYUJvZHkiLCJjcmVhdGVFbGVtZW50IiwiY3NzVGV4dCIsImluc2VydEJlZm9yZSIsImJvZHkiLCJ0ZXN0RWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImNsZWFyX3NldHRpbmdzIiwiZ2VhdF9zdHJpbmciLCJnZWFyX3N0cmluZyIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJqb2JfbmFtZSIsInBzaXByZWQiLCJoZWFkZXIiLCJtZW1zYXRzdm0iLCJwZ2VudGhyZWFkZXIiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJ0YWJsZSIsImFsaWduIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZW5kX3JlcXVlc3QiLCJ1cmwiLCJ0eXBlIiwic2VuZF9kYXRhIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiJCIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJ1cHBlcl9uYW1lIiwidG9VcHBlckNhc2UiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJnZXRfdGV4dCIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwiaG9zdG5hbWUiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJtb2RlbGxlcl9rZXkiLCJwc2lwcmVkX2NoZWNrZWQiLCJwc2lwcmVkX2J1dHRvbiIsImRpc29wcmVkX2NoZWNrZWQiLCJkaXNvcHJlZF9idXR0b24iLCJtZW1zYXRzdm1fY2hlY2tlZCIsIm1lbXNhdHN2bV9idXR0b24iLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBnZW50aHJlYWRlcl9idXR0b24iLCJkb3dubG9hZF9saW5rcyIsInBzaXByZWRfam9iIiwiZGlzb3ByZWRfam9iIiwibWVtc2F0c3ZtX2pvYiIsInBnZW50aHJlYWRlcl9qb2IiLCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZSIsInBzaXByZWRfd2FpdGluZ19pY29uIiwicHNpcHJlZF90aW1lIiwicHNpcHJlZF9ob3JpeiIsImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZSIsImRpc29wcmVkX3dhaXRpbmdfaWNvbiIsImRpc29wcmVkX3RpbWUiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2UiLCJtZW1zYXRzdm1fd2FpdGluZ19pY29uIiwibWVtc2F0c3ZtX3RpbWUiLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlIiwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvbiIsInBnZW50aHJlYWRlcl90aW1lIiwicGdlbl90YWJsZSIsInBnZW5fYW5uX3NldCIsInNlcXVlbmNlIiwic2VxdWVuY2VfbGVuZ3RoIiwic3Vic2VxdWVuY2Vfc3RhcnQiLCJzdWJzZXF1ZW5jZV9zdG9wIiwiYmF0Y2hfdXVpZCIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJqb2JfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJjb250ZXh0IiwiZ2VuZXJhdGVBc3luYyIsInRoZW4iLCJibG9iIiwic2F2ZUFzIiwiZXZlbnQiLCJ2ZXJpZnlfYW5kX3NlbmRfZm9ybSIsIm9yaWdpbmFsIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsInN0b3AiLCJzdWJzZXF1ZW5jZSIsImNhbmNlbCIsInByZXZpb3VzX2RhdGEiLCJsb2FkTmV3QWxpZ25tZW50IiwiYWxuVVJJIiwiYW5uVVJJIiwidGl0bGUiLCJvcGVuIiwiYnVpbGRNb2RlbCIsIm1vZF9rZXkiLCJlcnJvcl9tZXNzYWdlIiwiam9iX3N0cmluZyIsInZlcmlmeV9mb3JtIiwiY2hlY2tlZF9hcnJheSIsInRlc3QiLCJudWNsZW90aWRlX2NvdW50Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvREE7QUFDTyxTQUFTQSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NDLElBQWxDLEVBQ1A7QUFDSSxNQUFJQyxRQUFRRixNQUFNRyxJQUFOLENBQVdGLElBQVgsQ0FBWjtBQUNBLE1BQUdDLE1BQU0sQ0FBTixFQUFTRSxRQUFULENBQWtCLEdBQWxCLENBQUgsRUFD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LEdBQXJCLEVBQTBCOEQsUUFBMUIsRUFBb0MwRCxLQUFwQyxFQUEyQzhILGFBQTNDLEVBQ1A7QUFDRSxNQUFJSCxnQkFBZ0IsRUFBcEI7QUFDQSxNQUFHLENBQUUsaUJBQWlCSSxJQUFqQixDQUFzQnpMLFFBQXRCLENBQUwsRUFDQTtBQUNFcUwsb0JBQWdCQSxnQkFBZ0IsZ0ZBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFHblAsSUFBSXhCLE1BQUosR0FBYSxJQUFoQixFQUNBO0FBQ0UyUSxvQkFBZ0JBLGdCQUFnQiw0Q0FBaEM7QUFDRDtBQUNELE1BQUduUCxJQUFJeEIsTUFBSixHQUFhLEVBQWhCLEVBQ0E7QUFDRTJRLG9CQUFnQkEsZ0JBQWdCLDZDQUFoQztBQUNEOztBQUVEO0FBQ0EsTUFBSUssbUJBQW1CLENBQUN4UCxJQUFJMUMsS0FBSixDQUFVLDBCQUFWLEtBQXVDLEVBQXhDLEVBQTRDa0IsTUFBbkU7QUFDQSxNQUFJZ1IsbUJBQWlCeFAsSUFBSXhCLE1BQXRCLEdBQWdDLElBQW5DLEVBQ0E7QUFDRTJRLG9CQUFnQkEsZ0JBQWdCLHdHQUFoQztBQUNEO0FBQ0QsTUFBRywrQkFBK0JJLElBQS9CLENBQW9DdlAsR0FBcEMsQ0FBSCxFQUNBO0FBQ0VtUCxvQkFBZ0JBLGdCQUFnQixpREFBaEM7QUFDRDs7QUFFRCxNQUFHLGlHQUFBN04sQ0FBVSxJQUFWLEVBQWdCZ08sYUFBaEIsTUFBbUMsS0FBdEMsRUFBNkM7QUFDM0NILG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEO0FBQ0QsU0FBT0EsYUFBUDtBQUNELEMiLCJmaWxlIjoicHNpcHJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMGUwMDI3Y2NiYTcyMjFhZDk3ZiIsIlxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgYWxlcnQoXCJTUzIgYW5ub3RhdGlvbiBsZW5ndGggZG9lcyBub3QgbWF0Y2ggcXVlcnkgc2VxdWVuY2VcIik7XG4gICAgfVxuICAgIHJldHVybihhbm5vdGF0aW9ucyk7XG59XG5cbi8vdGFrZSB0aGUgZGlzb3ByZWQgcGJkYXQgZmlsZSwgcGFyc2UgaXQgYW5kIGFkZCB0aGUgYW5ub3RhdGlvbnMgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BiZGF0KHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnLScpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ0QnO31cbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJ14nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdQQic7fVxuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbn1cblxuLy9wYXJzZSB0aGUgZGlzb3ByZWQgY29tYiBmaWxlIGFuZCBhZGQgaXQgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWNpc2lvbiA9IFtdO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgcHJlY2lzaW9uW2ldID0ge307XG4gICAgcHJlY2lzaW9uW2ldLnBvcyA9IGVudHJpZXNbMV07XG4gICAgcHJlY2lzaW9uW2ldLnByZWNpc2lvbiA9IGVudHJpZXNbNF07XG4gIH0pO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nLCBwcmVjaXNpb24pO1xuICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocHJlY2lzaW9uLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbi8vcGFyc2UgdGhlIG1lbXNhdCBvdXRwdXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIGxldCB0b3BvX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvVG9wb2xvZ3k6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCBzaWduYWxfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9TaWduYWxcXHNwZXB0aWRlOlxccysoLispXFxuLywgZmlsZSk7XG4gIGxldCByZWVudHJhbnRfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9SZS1lbnRyYW50XFxzaGVsaWNlczpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHRlcm1pbmFsID0gZ2V0X21lbXNhdF9yYW5nZXMoL04tdGVybWluYWw6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIC8vY29uc29sZS5sb2coc2lnbmFsX3JlZ2lvbnMpO1xuICAvLyBjb25zb2xlLmxvZyhyZWVudHJhbnRfcmVnaW9ucyk7XG4gIGxldCBjb2lsX3R5cGUgPSAnQ1knO1xuICBpZih0ZXJtaW5hbCA9PT0gJ291dCcpXG4gIHtcbiAgICBjb2lsX3R5cGUgPSAnRUMnO1xuICB9XG4gIGxldCB0bXBfYW5ubyA9IG5ldyBBcnJheShzZXEubGVuZ3RoKTtcbiAgaWYodG9wb19yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpXG4gIHtcbiAgICBsZXQgcHJldl9lbmQgPSAwO1xuICAgIHRvcG9fcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1RNJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgICBpZihwcmV2X2VuZCA+IDApe3ByZXZfZW5kIC09IDE7fVxuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQsIHJlZ2lvblswXSk7XG4gICAgICBpZihjb2lsX3R5cGUgPT09ICdFQycpeyBjb2lsX3R5cGUgPSAnQ1knO31lbHNle2NvaWxfdHlwZSA9ICdFQyc7fVxuICAgICAgcHJldl9lbmQgPSByZWdpb25bMV0rMjtcbiAgICB9KTtcbiAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZC0xLCBzZXEubGVuZ3RoKTtcblxuICB9XG4gIC8vc2lnbmFsX3JlZ2lvbnMgPSBbWzcwLDgzXSwgWzEwMiwxMTddXTtcbiAgaWYoc2lnbmFsX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgc2lnbmFsX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdTJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgLy9yZWVudHJhbnRfcmVnaW9ucyA9IFtbNDAsNTBdLCBbMjAwLDIxOF1dO1xuICBpZihyZWVudHJhbnRfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICByZWVudHJhbnRfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1JIJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgdG1wX2Fubm8uZm9yRWFjaChmdW5jdGlvbihhbm5vLCBpKXtcbiAgICBhbm5vdGF0aW9uc1tpXS5tZW1zYXQgPSBhbm5vO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsZXQgYW5uX2xpc3QgPSByYWN0aXZlLmdldCgncGdlbl9hbm5fc2V0Jyk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TdHIgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TZXEgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggU0NPUDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIENBVEg8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5sZW5ndGggPT09IDApe3JldHVybjt9XG4gICAgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZihlbnRyaWVzWzldK1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5yY3NiLm9yZy9wZGIvZXhwbG9yZS9leHBsb3JlLmRvP3N0cnVjdHVyZUlkPVwiK3BkYitcIic+XCIrZW50cmllc1s5XStcIjwvYT48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNDT1AgU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3BkYi9cIitwZGIrXCInPkNBVEggU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J2xvYWROZXdBbGlnbm1lbnQoXFxcIlwiKyhhbm5fbGlzdFtlbnRyaWVzWzldK1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbZW50cmllc1s5XStcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKGVudHJpZXNbOV0rXCJfXCIraSkrXCJcXFwiKTsnIHZhbHVlPSdEaXNwbGF5IEFsaWdubWVudCcgLz48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdidWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbZW50cmllc1s5XStcIl9cIitpXS5hbG4pK1wiXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQoXCJwZ2VuX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldChcInBnZW5fdGFibGVcIiwgXCI8aDM+Tm8gZ29vZCBoaXRzIGZvdW5kLiBHVUVTUyBhbmQgTE9XIGNvbmZpZGVuY2UgaGl0cyBjYW4gYmUgZm91bmQgaW4gdGhlIHJlc3VsdHMgZmlsZTwvaDM+XCIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbn1cblxuXG4vL2dpdmVuIGEgVVJMIHJldHVybiB0aGUgYXR0YWNoZWQgdmFyaWFibGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJsVmFycygpIHtcbiAgICBsZXQgdmFycyA9IHt9O1xuICAgIC8vY29uc2lkZXIgdXNpbmcgbG9jYXRpb24uc2VhcmNoIGluc3RlYWQgaGVyZVxuICAgIGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSxcbiAgICBmdW5jdGlvbihtLGtleSx2YWx1ZSkge1xuICAgICAgdmFyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhcnM7XG4gIH1cblxuLyohIGdldEVtUGl4ZWxzICB8IEF1dGhvcjogVHlzb24gTWF0YW5pY2ggKGh0dHA6Ly9tYXRhbmljaC5jb20pLCAyMDEzIHwgTGljZW5zZTogTUlUICovXG4oZnVuY3Rpb24gKGRvY3VtZW50LCBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAvLyBFbmFibGUgc3RyaWN0IG1vZGVcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIEZvcm0gdGhlIHN0eWxlIG9uIHRoZSBmbHkgdG8gcmVzdWx0IGluIHNtYWxsZXIgbWluaWZpZWQgZmlsZVxuICAgIGxldCBpbXBvcnRhbnQgPSBcIiFpbXBvcnRhbnQ7XCI7XG4gICAgbGV0IHN0eWxlID0gXCJwb3NpdGlvbjphYnNvbHV0ZVwiICsgaW1wb3J0YW50ICsgXCJ2aXNpYmlsaXR5OmhpZGRlblwiICsgaW1wb3J0YW50ICsgXCJ3aWR0aDoxZW1cIiArIGltcG9ydGFudCArIFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50ICsgXCJwYWRkaW5nOjBcIiArIGltcG9ydGFudDtcblxuICAgIHdpbmRvdy5nZXRFbVBpeGVscyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICAgICAgbGV0IGV4dHJhQm9keTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEVtdWxhdGUgdGhlIGRvY3VtZW50RWxlbWVudCB0byBnZXQgcmVtIHZhbHVlIChkb2N1bWVudEVsZW1lbnQgZG9lcyBub3Qgd29yayBpbiBJRTYtNylcbiAgICAgICAgICAgIGVsZW1lbnQgPSBleHRyYUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYm9keVwiKTtcbiAgICAgICAgICAgIGV4dHJhQm9keS5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQ7XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGV4dHJhQm9keSwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYW5kIHN0eWxlIGEgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGU7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgY2xpZW50IHdpZHRoIG9mIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHZhbHVlID0gdGVzdEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgaWYgKGV4dHJhQm9keSkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBleHRyYSBib2R5IGVsZW1lbnRcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChleHRyYUJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlbSB2YWx1ZSBpbiBwaXhlbHNcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KGRvY3VtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9jb21tb24vY29tbW9uX2luZGV4LmpzIiwiaW1wb3J0IHsgcHJvY2Vzc19maWxlIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuXG4vL2JlZm9yZSBhIHJlc3VibWlzc2lvbiBpcyBzZW50IGFsbCB2YXJpYWJsZXMgYXJlIHJlc2V0IHRvIHRoZSBwYWdlIGRlZmF1bHRzXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJfc2V0dGluZ3MoZ2VhdF9zdHJpbmcpe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgUFNJUFJFRCBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBESVNPUFJFRCBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIE1FTVNBVC1TVk0gam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgcEdlblRIUkVBREVSIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcblxuICAvL3JhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvKVxue1xuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5QU0lQUkVEIERPV05MT0FEUzwvaDU+XCI7XG4gIH1cbiAgaWYoZGF0YS5qb2JfbmFtZS5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyID0gXCI8aDU+RElTT1BSRUQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZW1zYXRzdm0nKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1Pk1FTVNBVFNWTSBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UFNJUFJFRCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBHZW5USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbylcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuXG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICAvL3BzaXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09ICdwc2lwYXNzMicpXG4gICAge1xuICAgICAgbGV0IG1hdGNoID0gaG9yaXpfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnaG9yaXonLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3JpeiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkhvcml6IEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtc2F0c3ZtJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHNjaGVtZV9tYXRjaCA9IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoZW1lX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U2NoZW1hdGljIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gbWVtc2F0X2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21lbXNhdGRhdGEnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5wR2VuVEhSRUFERVIgVGFibGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+cEdlblRIUkVBREVSIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIGxldCBkb3dubG9hZHNfc3RyaW5nID0gcmFjdGl2ZS5nZXQoJ2Rvd25sb2FkX2xpbmtzJyk7XG4gIGlmKCdwc2lwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXopO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkaXNvcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXNhdHN2bScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3BnZW50aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsIGRvd25sb2Fkc19zdHJpbmcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMiLCJpbXBvcnQgeyBnZXRfbWVtc2F0X3JhbmdlcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9zczIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcGJkYXQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfY29tYiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9tZW1zYXRkYXRhIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3ByZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG5cbi8vZ2l2ZW4gYSB1cmwsIGh0dHAgcmVxdWVzdCB0eXBlIGFuZCBzb21lIGZvcm0gZGF0YSBtYWtlIGFuIGh0dHAgcmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfcmVxdWVzdCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcbiAgY29uc29sZS5sb2coJ1NlbmRpbmcgVVJJIHJlcXVlc3QnKTtcbiAgY29uc29sZS5sb2codXJsKTtcbiAgY29uc29sZS5sb2codHlwZSk7XG5cbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSBpcyBub3QgYXZhaWxhYmxlLiBTb21ldGhpbmcgQ2F0YXN0cm9waGljIGhhcyBnb25lIHdyb25nLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7fVxuICB9KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIHZhciBmaWxlID0gbnVsbDtcbiAgbGV0IHVwcGVyX25hbWUgPSBqb2JfbmFtZS50b1VwcGVyQ2FzZSgpO1xuICB0cnlcbiAge1xuICAgIGZpbGUgPSBuZXcgQmxvYihbc2VxXSk7XG4gIH0gY2F0Y2ggKGUpXG4gIHtcbiAgICBhbGVydChlKTtcbiAgfVxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgZmQuYXBwZW5kKFwiaW5wdXRfZGF0YVwiLCBmaWxlLCAnaW5wdXQudHh0Jyk7XG4gIGZkLmFwcGVuZChcImpvYlwiLGpvYl9uYW1lKTtcbiAgZmQuYXBwZW5kKFwic3VibWlzc2lvbl9uYW1lXCIsbmFtZSk7XG4gIGZkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcblxuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIHVwcGVyX25hbWUrXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIrdXBwZXJfbmFtZStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBqb2JfbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZnVuY3Rpb24gZ2V0X3RleHQodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG5cbiBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIC8vZGF0YVR5cGU6IFwidHh0XCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHJlcXVlc3QgaW5wdXQgZGF0YSB0ZXh0XCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIkdldHRpbmdzIHJlc3VsdHMgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gU29tZXRoaW5nIENhdGFzdHJvcGhpYyBoYXMgZ29uZSB3cm9uZy4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcblxudmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJy5jb3B5QnV0dG9uJyk7XG52YXIgemlwID0gbmV3IEpTWmlwKCk7XG5cbmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuXG4vLyBTRVQgRU5EUE9JTlRTIEZPUiBERVYsIFNUQUdJTkcgT1IgUFJPRFxubGV0IGVuZHBvaW50c191cmwgPSBudWxsO1xubGV0IHN1Ym1pdF91cmwgPSBudWxsO1xubGV0IHRpbWVzX3VybCA9IG51bGw7XG5sZXQgZ2VhcnNfc3ZnID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbmxldCBtYWluX3VybCA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWtcIjtcbmxldCBhcHBfcGF0aCA9IFwiL3BzaXByZWRfYmV0YVwiO1xubGV0IGZpbGVfdXJsID0gJyc7XG5sZXQgZ2Vhcl9zdHJpbmcgPSAnPG9iamVjdCB3aWR0aD1cIjE0MFwiIGhlaWdodD1cIjE0MFwiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCIgZGF0YT1cIicrZ2VhcnNfc3ZnKydcIj48L29iamVjdD4nO1xuXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIilcbntcbiAgZW5kcG9pbnRzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYW5hbHl0aWNzX2F1dG9tYXRlZC9qb2J0aW1lcy8nO1xuICBhcHBfcGF0aCA9ICcvaW50ZXJmYWNlJztcbiAgbWFpbl91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwJztcbiAgZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xuICBmaWxlX3VybCA9IG1haW5fdXJsO1xufVxuZWxzZSBpZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJiaW9pbmZzdGFnZTEuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgID09PSBcImJpb2luZi5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ocmVmICA9PT0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvXCIpIHtcbiAgZW5kcG9pbnRzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9qb2J0aW1lcy8nO1xuICBmaWxlX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoK1wiL2FwaVwiO1xuICAvL2dlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbn1cbmVsc2Uge1xuICBhbGVydCgnVU5TRVRUSU5HIEVORFBPSU5UUyBXQVJOSU5HLCBXQVJOSU5HIScpO1xuICBlbmRwb2ludHNfdXJsID0gJyc7XG4gIHN1Ym1pdF91cmwgPSAnJztcbiAgdGltZXNfdXJsID0gJyc7XG59XG5cbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YToge1xuICAgICAgICAgIHJlc3VsdHNfdmlzaWJsZTogMSxcbiAgICAgICAgICByZXN1bHRzX3BhbmVsX3Zpc2libGU6IDEsXG4gICAgICAgICAgc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZTogMCxcbiAgICAgICAgICBtb2RlbGxlcl9rZXk6IG51bGwsXG5cbiAgICAgICAgICBwc2lwcmVkX2NoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgcHNpcHJlZF9idXR0b246IGZhbHNlLFxuICAgICAgICAgIGRpc29wcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIGRpc29wcmVkX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgbWVtc2F0c3ZtX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIG1lbXNhdHN2bV9idXR0b246IGZhbHNlLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBwZ2VudGhyZWFkZXJfYnV0dG9uOiBmYWxzZSxcblxuXG4gICAgICAgICAgLy8gcGdlbnRocmVhZGVyX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIHBkb210aHJlYWRlcl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAvLyBkb21wcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIG1lbXBhY2tfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgLy8gZmZwcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIGJpb3NlcmZfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgLy8gZG9tc2VyZl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZF9saW5rczogJycsXG4gICAgICAgICAgcHNpcHJlZF9qb2I6ICdwc2lwcmVkX2pvYicsXG4gICAgICAgICAgZGlzb3ByZWRfam9iOiAnZGlzb3ByZWRfam9iJyxcbiAgICAgICAgICBtZW1zYXRzdm1fam9iOiAnbWVtc2F0c3ZtX2pvYicsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX2pvYjogJ3BnZW50aHJlYWRlcl9qb2InLFxuXG4gICAgICAgICAgcHNpcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgUFNJUFJFRCBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBwc2lwcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgcHNpcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuXG4gICAgICAgICAgZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERJU09QUkVEIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGRpc29wcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZGlzb3ByZWRfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZGlzb19wcmVjaXNpb246IG51bGwsXG5cbiAgICAgICAgICBtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIE1FTVNBVC1TVk0gam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgbWVtc2F0c3ZtX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgbWVtc2F0c3ZtX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgICAgICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcblxuICAgICAgICAgIHBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgcEdlblRIUkVBREVSIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgICAgICAgIHBnZW5fYW5uX3NldDoge30sXG5cbiAgICAgICAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICAgICAgICBzZXF1ZW5jZTogJycsXG4gICAgICAgICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgICAgICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgICAgICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgIGJhdGNoX3V1aWQ6IG51bGwsXG5cbiAgICAgICAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgICAgICAgIGFubm90YXRpb25zOiBudWxsLFxuICAgICAgICB9XG59KTtcblxuLy9zZXQgc29tZSB0aGluZ3Mgb24gdGhlIHBhZ2UgZm9yIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXJcbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiKSB7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcsICdkYW5pZWwuYnVjaGFuQHVjbC5hYy51aycpO1xuICByYWN0aXZlLnNldCgnbmFtZScsICd0ZXN0Jyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsICdRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBUycpO1xufVxuXG4vLzRiNmFkNzkyLWVkMWYtMTFlNS04OTg2LTk4OTA5NmMxM2VlNlxubGV0IHV1aWRfcmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xubGV0IHV1aWRfbWF0Y2ggPSB1dWlkX3JlZ2V4LmV4ZWMoZ2V0VXJsVmFycygpLnV1aWQpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy9cbi8vIEFQUExJQ0FUSU9OIEhFUkVcbi8vXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vL0hlcmUgd2VyZSBrZWVwIGFuIGV5ZSBvbiBzb21lIGZvcm0gZWxlbWVudHMgYW5kIHJld3JpdGUgdGhlIG5hbWUgaWYgcGVvcGxlXG4vL2hhdmUgcHJvdmlkZWQgYSBmYXN0YSBmb3JtYXR0ZWQgc2VxXG5sZXQgc2VxX29ic2VydmVyID0gcmFjdGl2ZS5vYnNlcnZlKCdzZXF1ZW5jZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSApIHtcbiAgbGV0IHJlZ2V4ID0gL14+KC4rPylcXHMvO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKG5ld1ZhbHVlKTtcbiAgaWYobWF0Y2gpXG4gIHtcbiAgICB0aGlzLnNldCgnbmFtZScsIG1hdGNoWzFdKTtcbiAgfVxuICAvLyBlbHNlIHtcbiAgLy8gICB0aGlzLnNldCgnbmFtZScsIG51bGwpO1xuICAvLyB9XG5cbiAgfSxcbiAge2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9KTtcbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgam9iX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG5cbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICBsZXQgYmF0Y2ggPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGRvd25sb2Fkc19pbmZvID0ge307XG5cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0NvbXBsZXRlJylcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlbmRlciByZXN1bHRzXCIpO1xuICAgICAgbGV0IHN1Ym1pc3Npb25zID0gYmF0Y2guc3VibWlzc2lvbnM7XG4gICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8pO1xuICAgICAgICAgIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBhbGVydChcIlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWRcXG5cIitcbiAgICAgICAgICAgIFwiUGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGlzIGVycm9yIG1lc3NhZ2UgYW5kIHlvdXIgam9iIElEXFxuXCIrc3VibWlzc2lvbl9tZXNzYWdlKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcmVzdWx0cyBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ3BzaXByZWRfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMSApO1xuICBpZihyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpKVxuICB7XG4gICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbiggJ2Rpc29wcmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDQgKTtcbiAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gIHtcbiAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbiggJ21lbXNhdHN2bV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2ICk7XG59KTtcbnJhY3RpdmUub24oICdwZ2VudGhyZWFkZXJfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMiApO1xufSk7XG5yYWN0aXZlLm9uKCAnc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBwc2lwcmVkX2pvYiA9IHRoaXMuZ2V0KCdwc2lwcmVkX2pvYicpO1xuICBsZXQgcHNpcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ3BzaXByZWRfY2hlY2tlZCcpO1xuICBsZXQgZGlzb3ByZWRfam9iID0gdGhpcy5nZXQoJ2Rpc29wcmVkX2pvYicpO1xuICBsZXQgZGlzb3ByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdkaXNvcHJlZF9jaGVja2VkJyk7XG4gIGxldCBtZW1zYXRzdm1fam9iID0gdGhpcy5nZXQoJ21lbXNhdHN2bV9qb2InKTtcbiAgbGV0IG1lbXNhdHN2bV9jaGVja2VkID0gdGhpcy5nZXQoJ21lbXNhdHN2bV9jaGVja2VkJyk7XG4gIGxldCBwZ2VudGhyZWFkZXJfam9iID0gdGhpcy5nZXQoJ3BnZW50aHJlYWRlcl9qb2InKTtcbiAgbGV0IHBnZW50aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ3BnZW50aHJlYWRlcl9jaGVja2VkJyk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZCwgcGdlbnRocmVhZGVyX2NoZWNrZWQpO1xuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgcHNpcHJlZF9qb2IgPSB0aGlzLmdldCgncHNpcHJlZF9qb2InKTtcbiAgbGV0IHBzaXByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdwc2lwcmVkX2NoZWNrZWQnKTtcbiAgbGV0IGRpc29wcmVkX2pvYiA9IHRoaXMuZ2V0KCdkaXNvcHJlZF9qb2InKTtcbiAgbGV0IGRpc29wcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZGlzb3ByZWRfY2hlY2tlZCcpO1xuICBsZXQgbWVtc2F0c3ZtX2pvYiA9IHRoaXMuZ2V0KCdtZW1zYXRzdm1fam9iJyk7XG4gIGxldCBtZW1zYXRzdm1fY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZW1zYXRzdm1fY2hlY2tlZCcpO1xuICBsZXQgcGdlbnRocmVhZGVyX2pvYiA9IHRoaXMuZ2V0KCdwZ2VudGhyZWFkZXJfam9iJyk7XG4gIGxldCBwZ2VudGhyZWFkZXJfY2hlY2tlZCA9IHRoaXMuZ2V0KCdwZ2VudGhyZWFkZXJfY2hlY2tlZCcpO1xuXG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhnZWFyX3N0cmluZyk7XG4gIC8vdmVyaWZ5IGZvcm0gY29udGVudHMgYW5kIHBvc3RcbiAgLy9jb25zb2xlLmxvZyhuYW1lKTtcbiAgLy9jb25zb2xlLmxvZyhlbWFpbCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIG1lbXNhdHN2bV9jaGVja2VkLCBwZ2VudGhyZWFkZXJfY2hlY2tlZCk7XG4gIC8vd3JpdGUgbmV3IGFubm90YXRpb24gZGlhZ3JhbVxuICAvL3N1Ym1pdCBzdWJzZWN0aW9uXG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAyKTtcbiAgfVxuXG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgJ3BzaXByZWQnKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIE5ldyBQYW5uZWwgZnVuY3Rpb25zXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5mdW5jdGlvbiBidWlsZE1vZGVsKGFsblVSSSkge1xuXG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGxldCBtb2Rfa2V5ID0gcmFjdGl2ZS5nZXQoJ21vZGVsbGVyX2tleScpO1xuICBpZihtb2Rfa2V5ID09PSAnTScrJ08nKydEJysnRScrJ0wnKydJJysnUicrJ0EnKydOJysnSicrJ0UnKVxuICB7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/YWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD02NzAsaGVpZ2h0PTcwMFwiKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBNJysnTycrJ0QnKydFJysnTCcrJ0wnKydFJysnUiBMaWNlbmNlIEtleScpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImltcG9ydCB7IHNlbmRfam9iIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgaXNJbkFycmF5IH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcblxuLy9UYWtlcyB0aGUgZGF0YSBuZWVkZWQgdG8gdmVyaWZ5IHRoZSBpbnB1dCBmb3JtIGRhdGEsIGVpdGhlciB0aGUgbWFpbiBmb3JtXG4vL29yIHRoZSBzdWJtaXNzb24gd2lkZ2V0IHZlcmlmaWVzIHRoYXQgZGF0YSBhbmQgdGhlbiBwb3N0cyBpdCB0byB0aGUgYmFja2VuZC5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIHBzaXByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkLCBwZ2VudGhyZWFkZXJfY2hlY2tlZClcbntcbiAgLyp2ZXJpZnkgdGhhdCBldmVyeXRoaW5nIGhlcmUgaXMgb2sqL1xuICBsZXQgZXJyb3JfbWVzc2FnZT1udWxsO1xuICBsZXQgam9iX3N0cmluZyA9ICcnO1xuICAvL2Vycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLCBbcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLCBtZW1zYXRzdm1fY2hlY2tlZF0pO1xuXG4gIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZCwgcGdlbnRocmVhZGVyX2NoZWNrZWRdKTtcbiAgaWYoZXJyb3JfbWVzc2FnZS5sZW5ndGggPiAwKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Zvcm1fZXJyb3InLCBlcnJvcl9tZXNzYWdlKTtcbiAgICBhbGVydChcIkZPUk0gRVJST1I6XCIrZXJyb3JfbWVzc2FnZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9pbml0aWFsaXNlIHRoZSBwYWdlXG4gICAgbGV0IHJlc3BvbnNlID0gdHJ1ZTtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTtcbiAgICAvL1Bvc3QgdGhlIGpvYnMgYW5kIGludGlhbGlzZSB0aGUgYW5ub3RhdGlvbnMgZm9yIGVhY2ggam9iXG4gICAgLy9XZSBhbHNvIGRvbid0IHJlZHVuZGFudGx5IHNlbmQgZXh0cmEgcHNpcHJlZCBldGMuLiBqb2JzXG4gICAgLy9ieXQgZG9pbmcgdGhlc2UgdGVzdCBpbiBhIHNwZWNpZmljIG9yZGVyXG4gICAgaWYocGdlbnRocmVhZGVyX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwicGdlbnRocmVhZGVyLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgIHBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZihkaXNvcHJlZF9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcImRpc29wcmVkLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgcHNpcHJlZF9jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmKHBzaXByZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJwc2lwcmVkLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihtZW1zYXRzdm1fY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJtZW1zYXRzdm0sXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwpO1xuICAgIC8vc2V0IHZpc2liaWxpdHkgYW5kIHJlbmRlciBwYW5lbCBvbmNlXG4gICAgaWYgKHBzaXByZWRfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ3BzaXByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgLy8gcGFyc2Ugc2VxdWVuY2UgYW5kIG1ha2Ugc2VxIHBsb3RcbiAgICB9XG4gICAgZWxzZSBpZihkaXNvcHJlZF9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnZGlzb3ByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1lbXNhdHN2bV9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWVtc2F0c3ZtX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9XG4gICAgZWxzZSBpZihwZ2VudGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ3BnZW50aHJlYWRlcl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYoISByZXNwb25zZSl7d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjt9XG4gIH1cbn1cblxuLy9UYWtlcyB0aGUgZm9ybSBlbGVtZW50cyBhbmQgY2hlY2tzIHRoZXkgYXJlIHZhbGlkXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9