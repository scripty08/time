import mongoose from 'mongoose';
export const TimesSchema = {
    datum: Date,
    pause: mongoose.Schema.Types.Decimal128,
    start: String,
    stop: String,
    ist: mongoose.Schema.Types.Decimal128,
    krank: Boolean,
    konferenz: Boolean,
    ueberstunden: Boolean,
    urlaub: Boolean
};