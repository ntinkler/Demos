import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    userToken: {type: String, required: true},
    type: {type: String, required: true},
    invitee: {type: String, required: true},
    inviter: {type: String, required: true},
    changedAt: {type: Date, required: true},
    eventAt: {type: Date, required: true},
    name: {type: String, required: true},
    location: {type: String},
    processed: {type: Boolean, default: false, required: true}
});

eventSchema.methods.fromCalendlyEvent = function(event) {
    this.type = event.event == 'invitee.canceled' ? 'cancel' : 'create';
    this.invitee = `${event.payload.invitee.name} (${event.payload.invitee.email})`;
    
    // Note: this doesn't support multiple assigned users.
    this.inviter = `${event.payload.event.extended_assigned_to[0].name} (${event.payload.event.extended_assigned_to[0].email})`;
    this.changedAt = new Date(event.time);
    this.eventAt = new Date(event.payload.event.start_time);
    this.name = event.payload.event_type.name;
    this.location = event.payload.event.location;
    this.processed = false;
}

export default mongoose.model('event', eventSchema)