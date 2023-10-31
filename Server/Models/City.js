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

const CitySchema = new Mongoose.Schema({
    Name: {
        type: String,
        searchable: true,
        required: [true, 'City::Name::Required'],
        trim: true,
        index: true,
        sparse: true
    },
    Lines: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Line'
    }],
    CountrySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'City::CountrySlug::Required']
    },
    Stops: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'LineStop'
    }],
    Country: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'City::Country::Required']
    },
    Slug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true
    },
    Agencies: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    }],
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

CitySchema.plugin(TextSearch);
CitySchema.index({ Name: 'text', Slug: 'text', CountrySlug: 'text' });

CitySchema.pre('save', function(Next){
    this.Slug = Slugify(this.Name);
    Next();
});

CitySchema.pre('remove', async function(Next){
    await this.model('Agency').deleteMany({ City: this._id });
    await this.model('Line').deleteMany({ City: this._id });
    await this.model('LineSchedule').deleteMany({ City: this._id });
    await this.model('LineStop').deleteMany({ City: this._id });
    Next();
});

const City = Mongoose.model('City', CitySchema);

module.exports = City;