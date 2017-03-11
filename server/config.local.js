/**
* @Author: Nay Win Myint <naywinmyint>
* @Date:   2017-03-11T12:22:15+00:00
* @Email:  naywinmyint@me.com
* @Project: Loopback Cloud Whatever Upload
* @Last modified by:   naywinmyint
* @Last modified time: 2017-03-11T19:00:46+00:00
* @Copyright: Nay Win Myint | 2017
*/


/*
 * NODE env based configuration
 */
'use strict';
// file operations
var fs = require('fs');
var path = require('path');

// NODE environment
var env = (process.env.NODE_ENV || 'development');
var isDevEnv = env === 'development' || env === 'test';
process.env['TMP'] = path.join(path.dirname(fs.realpathSync(__filename)), '/../../server/tmp/')

if (!isDevEnv) {
  // Default drive folder for production
  var GOOGLE_DRIVE_DEFAULT_ID = {
    DEFAULT_FOLDER_ID : "0B_MqJuOsB21WbmVrM3dGTWd1RlU"
  }

} else {

  // Default drive folder for production
  var GOOGLE_DRIVE_DEFAULT_ID = {
    DEFAULT_FOLDER_ID  : "0B_MqJuOsB21WUnJSSHVzeFVxS0k"
  }
};

module.exports = {
  google_drive_default_id: GOOGLE_DRIVE_DEFAULT_ID
};
