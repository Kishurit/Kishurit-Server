import mongoose, { Document, Model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongooseAutoPopulate from "mongoose-autopopulate";

type tel = { tel: string; owner?: string };
type Location = "" | "north" | "south" | "center" | "yosh" | "website";

export type Snif = {
  name?: String;
  tel: tel[];
  whatsapp?: tel[];
  email?: string[];
  location: Location;
  city: string;
  address: string;
};

export interface Orgs extends Document {
  catRefId: Types.ObjectId;
  subCatRefId: Types.ObjectId;
  org_name: string;
  desc?: string;
  web_link: string[];
  facebook_link: string[];
  linkedIn_link?: string[];
  instagram_link?: string[];
  email: string[];
  tel?: tel[];
  whatsapp?: tel[];
  location: Location;
  address?: String;
  snifim?: Snif[];
  active: Boolean;
}

const telSchema = new Schema<tel>({
  tel: { type: String, required: true },
  owner: { type: String, required: false },
})

const snifSchema = new Schema<Snif>({
  name: { type: String },
  tel: [telSchema],
  whatsapp: [telSchema],
  email: [String],
  location: { type: String, enum: ["", "north", "south", "center", "yosh", "website"], default: "", required: true },
  city: { type: String, required: true },
  address: { type: String, required: true }
});

const orgSchema = new Schema<Orgs>({
  catRefId: { type: Schema.Types.ObjectId, required: true, ref: "Categry" },
  subCatRefId: { type: Schema.Types.ObjectId, required: true, ref: "SubCategory" },
  org_name: { type: String, required: true },
  desc: { type: String, required: false },
  web_link: { type: [String], default: [], required: false },
  facebook_link: { type: [String], default: [], required: false },
  linkedIn_link: { type: [String], default: [], required: false },
  instagram_link: { type: [String], default: [], required: false },
  email: { type: [String], required: false },
  tel: { type: [telSchema], required: false },
  whatsapp: { type: [telSchema], required: false },
  location: { type: String, enum: ["", "north", "south", "center", "yosh", "website"], default: "", required: true },
  address: { type: String, required: false },
  snifim: [
    {
      type: [snifSchema],
      required: false,
    },
  ],
  active: { type: Boolean, required: true, default: false },
});

orgSchema.plugin(uniqueValidator, "Error, expected {PATH} to be unique.");
orgSchema.plugin(mongooseAutoPopulate);

const orgsModel: Model<Orgs> = mongoose.model<Orgs>("Org", orgSchema);

export default orgsModel;
