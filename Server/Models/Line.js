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

const LineSchema = new Mongoose.Schema({
    Stops: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'LineStop'
    }],
    Schedules: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'LineSchedule'
    }],
    Type: {
        type: String,
        enum: ['CAB', 'BUS']
    },
    Slug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        unique: true,
        sparse: true
    },
    Name: {
        type: String,
        searchable: true,
        required: [true, 'Line::Name::Required'],
        index: true,
        trim: true,
        sparse: true
    },
    CitySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'Line::CitySlug::Required']
    },
    CountrySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'Line::CountrySlug::Required']
    },
    AgencySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'Line::AgencySlug::Required']
    },
    City: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'Line::City::Required']
    },
    Country: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'Line::Country::Required']
    },
    Agency: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: [true, 'Line::Agency::Required']
    },
    Line: {
        type: String,
        searchable: true,
        required: [true, 'Line::Line::Required'],
        index: true,
        sparse: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

LineSchema.index({ Name: 'text', Line: 'text', Slug: 'text', CitySlug: 'text', CountrySlug: 'text', AgencySlug: 'text' });

LineSchema.pre('save', function(Next){
    this.Slug = Slugify(this.Name);
    Next();
});

LineSchema.pre('remove', async function(Next){
    await this.model('LineStop').deleteMany({ Line: this._id });
    await this.model('LineSchedule').deleteMany({ Line: this._id });
    Next();
});

LineSchema.plugin(TextSearch);

const Line = Mongoose.model('Line', LineSchema);

module.exports = Line;