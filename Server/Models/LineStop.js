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

const LineStopSchema = new Mongoose.Schema({
    Name: {
        type: String,
        searchable: true,
        required: [true, 'LineStop::Name::Required'],
        trim: true,
        index: true,
        sparse: true
    },
    Coordinates: {
        Latitude: {
            type: Number,
            required: [true, 'LineStop::Coordinates::Latitude::Required']
        },
        Longitude: {
            type: Number,
            required: [true, 'LineStop::Coordinates::Longitude::Required']
        }
    },
    City: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'LineStop::City::Required']
    },
    CitySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineStop::CitySlug::Required']
    },
    Country: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'LineStop::Country::Required']
    },
    CountrySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineStop::CountrySlug::Required']
    },
    Line: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Line',
        required: [true, 'LineStop::Line::Required']
    },
    LineSlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineStop::LineSlug::Required']
    },
    Slug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true
    },
    Order: {
        type: Number,
        required: [true, 'LineStop::Order::Required']
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

LineStopSchema.plugin(TextSearch);
LineStopSchema.index({ Name: 'text', Slug: 'text', CitySlug: 'text', CountrySlug: 'text', LineSlug: 'text' });

LineStopSchema.pre('save', function(Next){
    this.Slug = Slugify(this.Name);
    Next();
});

LineStopSchema.pre('remove', async function(Next){
    await this.model('LineSchedule').deleteMany({ LineStop: this._id });
    Next();
});

const LineStop = Mongoose.model('LineStop', LineStopSchema);

module.exports = LineStop;