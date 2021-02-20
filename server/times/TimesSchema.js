import mongoose from 'mongoose';
export const TimesSchema = {
    kw: String,
    datum: Date,
    pause: Number,
    start: Number,
    stop: Number,
    ist: mongoose.Schema.Types.Decimal128,
    krank: Boolean,
    konferenz: Boolean,
    ueberstunden: Boolean,
    urlaub: Boolean
};