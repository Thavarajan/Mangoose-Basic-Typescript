import * as M from 'mongoose';

export function basePlugin(schema: M.Schema, options?: any) {
    schema.add({ createdat: Date });
    schema.add({ createdby: { type: M.Schema.Types.ObjectId, ref: 'User', required: false } });
    schema.add({ modifiedat: Date });
    schema.add({ modifiedby: { type: M.Schema.Types.ObjectId, ref: 'User', required: false } });

    schema.pre('save', function (next) {
        let mdoc: M.Document = this;
        if (mdoc.isNew) {
            this.createdat = new Date();
        }
        next();
    });
    schema.pre('findOneAndUpdate', function (next) {
        let mdoc: M.Query<any> = this;
        this._update.modifiedat = new Date();
        next();
    })

    if (options && options.index) {
        schema.path('createdby').index(options.index);
        schema.path('modifiedby').index(options.index);
    }
}