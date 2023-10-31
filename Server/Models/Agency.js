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

const AgencySchema = new Mongoose.Schema({
    Name: {
        type: String,
        searchable: true,
        required: [true, 'Agency::Name::Required'],
        trim: true,
        index: true,
        sparse: true
    },
    City: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'Agency::City::Required']
    },
    CitySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'Agency::CitySlug::Required']
    },
    CountrySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'Agency::CountrySlug::Required']
    },
    Country: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'Agency::Country::Required']
    },
    Slug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        unique: true,
        sparse: true
    },
    Lines: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Line'
    }],
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

AgencySchema.plugin(TextSearch);
AgencySchema.index({ Name: 'text', Slug: 'text', CitySlug: 'text', CountrySlug: 'text' });

AgencySchema.pre('save', function(Next){
     this.Slug = Slugify(this.Name);
     Next();
});

AgencySchema.pre('remove', async function(Next){
    await this.model('Line').deleteMany({ Agency: this._id });
    await this.model('LineSchedule').deleteMany({ Agency: this._id });
    await this.model('LineStop').deleteMany({ Agency: this._id });
    Next();
});

const Agency = Mongoose.model('Agency', AgencySchema);

module.exports = Agency;