'use strict';
var path = require('path');
var junitReportBuilder = require('junit-report-builder');

/**
 * Converts a file system path to a relative path. If the url is not a file system path, it is not modified.
 * @param {String} url - an file system path or an web url
 * @return {String}
 */
function toRelativePath(url) {
    var isOnFileSystem = url.search(/^file:\/\/|^\\/) !== -1;
    if (isOnFileSystem) {
        var pathToFile = path.resolve(url.replace(/^file:\/\/|^\\/, ''));
        return path.relative(process.cwd(), pathToFile);
    } else {
        return url;
    }
}

/**
 *
 * @param {String} url - url of the audited file
 * @param {Object} audit - an object containing audit results
 * @param {Number} endTimestamp - timestamp of the end audit execution
 * @param {Number} duration - duration (in ms) of the audit execution
 */
function generateJUnitReport(url, audit, endTimestamp, duration) {
    var builder = junitReportBuilder.newBuilder();

    var fileName = toRelativePath(url);

    var suite = builder.testSuite()
        .name(fileName)
        .timestamp(endTimestamp)
        .time(duration);
    audit.forEach(function (result) {
        var name = result.code;
        if (result.result === 'FAIL') {
            var failure = result.heading + ' (' + result.url + ')\n';

            var stacktrace = 'Severity: ' + result.severity + '\n\n' +
                'Target:\n' +
                result.elements.replace(/\n/g, '\n    \u2022 ');

            suite.testCase()
                .name(name)
                .failure(failure)
                .stacktrace(stacktrace);
        }
        if (result.result === 'PASS' || result.result === 'NA') {
            suite.testCase()
                .name(name);
        }
    });

    return builder.build();
}

module.exports.generateJUnitReport = generateJUnitReport;
module.exports.toRelativePath = toRelativePath;
