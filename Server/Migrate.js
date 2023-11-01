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
const YAULZ = require('yauzl-promise');
const StreamPromises = require('stream/promises');

(async () => {
    console.log('Reading "Data.zip"...');
    const CompressedFileExists = FileSystem.existsSync('./Data.zip');
    if(CompressedFileExists){
        const ZIP = await YAULZ.open('./Data.zip');
        try{
            for await(const Entry of ZIP){
                console.log('Working with:', Entry.filename);
                if(Entry.filename.endsWith('/')){
                    await FileSystem.promises.mkdir(`./${Entry.filename}`);
                }else{
                    const ReadStream = await Entry.openReadStream();
                    const WriteStream = FileSystem.createWriteStream(`./${Entry.filename}`);
                    await StreamPromises.pipeline(ReadStream, WriteStream);
                }
            }
        }finally{
            console.log('OK: "Data.zip" in "Data/".');
            await ZIP.close();
        }
        console.log('Deleting "Data.zip"...');
        FileSystem.unlinkSync('./Data.zip');
        console.log('"Data.zip" deleted.');
    }else{
        console.log('"Data.zip" not found.');
    }
    console.log('Reading "Data/" directory for migration...');
    const ExistsMigrationFolder = FileSystem.existsSync('./Data/');
    if(!ExistsMigrationFolder){
        console.log('"Data/" directory not found. There is nothing to do.')
        return;
    }
    const MigrationFiles = FileSystem.readdirSync(Path.join(__dirname, 'Data'));
    console.log('Found ' + MigrationFiles.length + ' files.');
    const Database = process.env.DATABASE_HOST.replace('<password>', process.env.DATABASE_PASSWORD);
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