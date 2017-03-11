/**
* @Author: Nay Win Myint <naywinmyint>
* @Date:   2017-03-11T12:32:44+00:00
* @Email:  naywinmyint@me.com
* @Project: Loopback Cloud Whatever Upload
* @Last modified by:   naywinmyint
* @Last modified time: 2017-03-11T19:01:56+00:00
* @Copyright: Nay Win Myint | 2017
*/

'use strict';
module.exports = function(Image) {

    // get the local config
    var local_config = require('../../server/config.local');
    // file operations
    var fs = require('fs');
    // google apis
    var google = require('googleapis');
    var drive = google.drive('v3');
    // middleware multipart
    var multiparty = require('multiparty');

    // /:id/upload
    Image.upload = function(req, res, cb) {

      console.log(local_config);

      var DEFAULT_FOLDER_ID = local_config.google_drive_default_id.DEFAULT_FOLDER_ID;

      new multiparty.Form().parse(req, function(err, fields, files) {
        if (err) console.log(err);

        var file = files['files'][0];
        var file_name	= file.originalFilename;
        var file_ext	= file.originalFilename.split('.')[file.originalFilename.split('.').length - 1];
        var parentId = DEFAULT_FOLDER_ID;

        uploadFile(file_name, file.path, parentId, function(err, fileId) {
              if (err) console.log(err);
              console.log(fileId);
              cb(err, fileId);
        });

        function uploadFile(name, source, parentId, cb) {
          drive.files.create({
             resource: {
               'name': name,
               parents: [ parentId ]
             },
             media: {
               mimeType: 'image/jpeg',
               body: fs.createReadStream(source)
             }
              //fields: 'id'
          }, function(err, file) {
            if(err) console.log(err);

            cb(err, file);
          });
        };


        // // open image from source file and resize in callback
        // lwip.open(fileSource, function(err, image) {
        //     if (err) console.log(err);
        //
        //     resizeImage(image, image_75, 500, 500, function(err, l_75_id) {
        //         ids.l = l_75_id;
        //         resizeImage(image, image_50, 300, 300, function(err, m_50_id) {
        //             ids.m = m_50_id;
        //             resizeImage(image, image_30, 120, 120, function(err, s_30_id) {
        //                 ids.s = s_30_id;
        //                 cb(null, 'success', ids);
        //             });
        //         });
        //     });
        //
        // });
        //
        //
        // function resizeImage(image, fileName, width, height, cb) {
        //   image.clone(function (err, image) {
        //     image.batch()
        //       .resize(width, height)
        //       .writeFile(tempDir + fileName, function(err) {
        //         if (err) console.log(err);
        //         uploadFile(fileName, tempDir + fileName, parentId, function(err, fileId) {
        //           fs.unlink(tempDir + fileName);
        //           cb(err, fileId);
        //         });
        //       });
        //   });
        // }
        //
      });

  };

  Image.remoteMethod('upload', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: [
      {arg: 'status', type: 'string'},
      {arg: 'res', type: 'object'}
    ],
    http: {path:'/:id/upload', verb: 'post'}
  });









    // // image manipulation
    // var lwip = require('lwip');


  //
  //
  // // /tracks/getTag
  // Mediaitem.getTag = function(req, res, cb) {
  //   // music id3 tag
  //   var mm = require('musicmetadata');
  //   var form = new multiparty.Form();
  //
  //   var app = require('../../server/server');
  //   var Genre = app.models.genre;
  //   var Artist = app.models.artist;
  //
  //   form.parse(req, function(err, fields, files) {
  //     if (err) console.log(err);
  //
  //     var file = files['files[]'][0];
  //     var fileSource = file.path;
  //     var albumId = fields['albumId'][0];
  //
  //     //console.log(fields);
  //     // read id3 tag
  //     mm(fs.createReadStream(fileSource), { duration: true }, function (err, metadata) {
  //       if (err) console.log(err);
  //
  //       // get genre and artists
  //       var genre = metadata.genre[0];
  //       var artistsArr = metadata.artist[0].indexOf('၊') ? metadata.artist[0].replace(/\s/g,'').split('၊') : metadata.artist;
  //       var track = {};
  //
  //       // Build up the track object
  //       getGenre(genre, function(err, genreId) {
  //           getArtist(artistsArr, function(err, artistsId) {
  //               track = {
  //                 title: metadata.title,
  //                 //alias: have to added manually
  //                 //releaseDate: will be copied from parent album in beforeSave
  //                 trackNo: metadata.track['no'],
  //                 discNo: metadata.disk['no'] == 0 ? 1 : metadata.disk['no'],
  //                 //image: will also be copied from albumId
  //                 duration: metadata.duration,
  //                 genreId: genreId,
  //                 artistsId: artistsId,
  //                 albumId: albumId,
  //                 created: new Date()
  //               };
  //               console.log(track);
  //               cb(null, "success", track);
  //           });
  //       });
  //     });
  //
  //     // get the matched genreId
  //     function getGenre(name, cb) {
  //       Genre.find({
  //         where: { name: name },
  //         fields: { id: true }
  //       }, function(err, genreId) {
  //           genreId = genreId[0] == undefined ? "": genreId[0].id;
  //           cb(err, genreId);
  //       });
  //     }
  //
  //     // get the matched artistIds
  //     function getArtist(names, cb) {
  //       Artist.find({
  //         where: { name: { inq: names } },
  //         fields: { id: true }
  //       }, function(err, artistsId) {
  //
  //           artistsId = artistsId[0] == undefined ? [] : artistsId.map(function(item) { return item.id });
  //           cb(err, artistsId);
  //       });
  //     }
  //
  //   });
  // };
  //
  // Mediaitem.remoteMethod('getTag', {
  //   accepts: [
  //     {arg: 'req', type: 'object', 'http': {source: 'req'}},
  //     {arg: 'res', type: 'object', 'http': {source: 'res'}}
  //   ],
  //   returns: [
  //     {arg: 'status', type: 'string'},
  //     {arg: 'tag', type: 'object'}
  //   ],
  //   http: {path:'/tracks/getTag', verb: 'post'}
  // });
};
