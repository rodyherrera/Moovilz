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

const APIFeatures = require('../Utilities/APIFeatures');
const { CatchAsync, RuntimeError, FilterObject, CheckIfSlugOrID } = require('../Utilities/Runtime');

module.exports = class HandlerFactory{
    constructor({ Model, Fields = [] }){
        this.Model = Model;
        this.Fields = Fields;
    }

    // ! The DeleteOne method deletes a single record from 
    // ! the database based on its ID or slug. It first checks 
    // ! if the record exists, and if it does, it removes it 
    // ! from the database and returns a JSON response with a 
    // ! Status property set to 'Success' and a Data property set 
    // ! to the deleted record.
    DeleteOne = () => CatchAsync(async (Request, Response, Next) => {
        const DatabaseRecord = await this.Model.findOneAndDelete(CheckIfSlugOrID(Request.params.Identifier));
        if(!DatabaseRecord)
            return Next(new RuntimeError('Core::Record::InvalidID', 404));
        await DatabaseRecord.remove();
        Response.status(200).json({
            Status: 'Success',
            Data: DatabaseRecord
        })
    });

    // ! The UpdateOne method updates a single record in the 
    // ! database based on its ID or slug. It first builds a 
    // ! query filter object from the request body and the 
    // ! Fields property, and then uses Mongoose's findOneAndUpdate 
    // ! method to update the record. If the record exists, it returns
    // ! a JSON response with a Status property set to 'Success' 
    // ! and a Data property set to the updated record.
    UpdateOne = () => CatchAsync(async (Request, Response, Next) => {
        const QueryFilter = { ...FilterObject(Request.body), ...this.Fields };
        const DatabaseRecord = await this.Model.findOneAndUpdate(CheckIfSlugOrID(Request.params.Identifier), 
            QueryFilter, { new: true, runValidators: true });
        if(!DatabaseRecord)
            return Next(new RuntimeError('Core::Record::InvalidID', 404));
        Response.status(200).json({ Status: 'Success', Data: DatabaseRecord });
    });

    // ! The CreateOne method creates a new record in the database 
    // ! based on the request body and the Fields property. It uses 
    // ! Mongoose's create method to create the record, and then returns 
    // ! a JSON response with a Status property set to 'Success' and a 
    // ! Data property set to the created record.
    CreateOne = () => CatchAsync(async (Request, Response) => {
        const FilterQuery = { ...FilterObject(Request.body), ...this.Fields };
        const DatabaseRecord = await this.Model.create(FilterQuery);
        Response.status(201).json({ Status: 'Success', Data: DatabaseRecord });
    });

    GetPopulateFromRequest = (RequestQuery) => {
        if(!RequestQuery?.Populate)
            return null;
        const IsObject = RequestQuery.Populate.startsWith('{') && RequestQuery.Populate.endsWith('}');
        const Populate = (IsObject) ? JSON.parse(RequestQuery.Populate) : RequestQuery.Populate.split(',').join(' ');
        return Populate;
    };

    // ! The GetAll method retrieves multiple records from the 
    // ! database based on the request query parameters. It 
    // ! first extracts the Populate parameter from the query, which 
    // ! specifies which fields to populate in the returned records. It 
    // ! then uses an instance of the APIFeatures class to build a chain 
    // ! of operations based on the query parameters, including pagination, 
    // ! filtering, searching, sorting, and limiting fields. Finally, it 
    // ! returns a JSON response with a Status property set to 'Success',
    // ! a Page property with information about the current page and 
    // ! total pages, a Results property with information about the 
    // ! skipped results, total results, and paginated results, and a 
    // ! Data property with an array of records.
    GetAll = () => CatchAsync(async (Request, Response) => {
        const Populate = this.GetPopulateFromRequest(Request.query);
        const Operations = (await new APIFeatures({
            RequestQueryString: Request.query,
            Model: this.Model,
            Populate
        }).Paginate())
            .Filter()
            .Search()
            .Sort()
            .LimitFields();
        const { Records, SkippedResults, TotalResults, Page, Limit, TotalPages } = await Operations.Perform();
        Response.status(200).json({
            Status: 'Success',
            Page: {
                Current: Page,
                Total: TotalPages
            },
            Results: {
                Skipped: SkippedResults,
                Total: TotalResults,
                Paginated: Limit
            },
            Data: Records
        })
    });

    // ! The GetOne method retrieves a single record from 
    // ! the database based on its ID or slug. It first extracts 
    // ! the Populate parameter from the query, which specifies which 
    // ! fields to populate in the returned record. It then uses 
    // ! Mongoose's findOne method to find the record, and if it 
    // ! exists, it returns a JSON response with a Status property 
    // ! set to 'Success' and a Data property set to the found record.
    GetOne = () => CatchAsync(async (Request, Response, Next) => {
        const Populate = this.GetPopulateFromRequest(Request.query);
        let DatabaseRecord = this.Model.findOne(CheckIfSlugOrID(Request.params.Identifier));
        if(Populate)
            DatabaseRecord = DatabaseRecord.populate(Populate);
        DatabaseRecord = await DatabaseRecord;
        if(!DatabaseRecord)
            return Next(new RuntimeError('Core::Invalid::RecordID', 404));
        Response.status(200).json({
            Status: 'Success',
            Data: DatabaseRecord
        });
    });
};