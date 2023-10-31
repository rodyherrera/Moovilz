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

const Mongoose = require('mongoose');
const TextSearch = require('mongoose-partial-search');
const { Slugify } = require('../Utilities/Runtime');

const CountrySchema = new Mongoose.Schema({
    Name: {
        type: String,
        searchable: true,
        required: [true, 'Agency::Name::Required'],
        trim: true,
        index: true,
        sparse: true,
        unique: true,
        lowercase: true
    },
    Agencies: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    }],
    Lines: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Line'
    }],
    Slug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        unique: true,
        sparse: true
    },
    Cities: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }],
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

CountrySchema.plugin(TextSearch);
CountrySchema.index({ Name: 'text', Slug: 'text' });

CountrySchema.pre('save', function(Next){
    this.Slug = Slugify(this.Name);
    Next();
});

CountrySchema.pre('remove', async function(Next){
    console.log('x');
    await this.model('City').deleteMany({ Country: this._id });
    await this.model('Agency').deleteMany({ Country: this._id });
    await this.model('Line').deleteMany({ Country: this._id });
    await this.model('LineSchedule').deleteMany({ Country: this._id });
    await this.model('LineStop').deleteMany({ Country: this._id });
    Next();
});

const Country = Mongoose.model('Country', CountrySchema);

module.exports = Country;