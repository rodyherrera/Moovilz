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

const LineScheduleSchema = new Mongoose.Schema({
    Country: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'LineSchedule::Country::Required']
    },
    CountrySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineSchedule::CountrySlug::Required']
    },
    City: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'LineSchedule::City::Required']
    },
    CitySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineSchedule::CitySlug::Required']
    },
    Agency: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: [true, 'LineSchedule::Agency::Required']
    },
    AgencySlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineSchedule::AgencySlug::Required']
    },
    Line: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Line',
        required: [true, 'LineSchedule::Line::Required']
    },
    LineSlug: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        sparse: true,
        required: [true, 'LineSchedule::LineSlug::Required']
    },
    Day: {
        type: String,
        searchable: true,
        trim: true,
        required: [true, 'LineSchedule::Day::Required'],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    StartOperationHour: {
        type: String,
        required: [true, 'LineSchedule::StartOperationHour::Required'],
    },
    EndOperationHour: {
        type: String,
        required: [true, 'LineSchedule::EndOperationHour::Required'],
    },
    FrequencyInMins: {
        type: String,
        required: [true, 'LineSchedule::Frequency::Required'],
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

LineScheduleSchema.plugin(TextSearch);
LineScheduleSchema.index({ LineSlug: 'text', AgencySlug: 'text', CitySlug: 'text', CountrySlug: 'text' });

LineScheduleSchema.pre('remove', async function(Next){
    await this.model('Line').deleteMany({ LineSchedule: this._id });
    await this.model('LineStop').deleteMany({ LineSchedule: this._id });
    Next();
});

const LineSchedule = Mongoose.model('LineSchedule', LineScheduleSchema);

module.exports = LineSchedule;