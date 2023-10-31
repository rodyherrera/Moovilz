/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/CodeWithRodi/Moovilz/
 * 
 * :: https://moovilz.codewithrodi.com/
 * :: https://moovilz-backend.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

require('dotenv').config({ path: './.env' });
const Util = require('util');
const Execute = Util.promisify(require('child_process').exec);
const FileSystem = require('fs');
const Path = require('path');

(async () => {
    console.log('Reading "Data/" directory for migration...');
    const MigrationFiles = FileSystem.readdirSync(Path.join(__dirname, 'Data'));
    console.log('Found ' + MigrationFiles.length + ' files.');
    for(const File of MigrationFiles){
        const FilePath = Path.join(__dirname, 'Data', File);
        const CollectionName = File.split('.')[0];
        console.log('Migrating ' + FilePath + '...');
        const Command = `mongoimport --uri "${Database}" --collection ${CollectionName} --file "${FilePath}" --authenticationDatabase admin`;
        try{
            await Execute(Command);
            console.log('Migration of ' + FilePath + ' successful.');
        }catch(Error){
            console.log('Migration of ' + FilePath + ' failed.');
            console.log(Error);
        }
    }
    console.log('Migration complete.');
})();