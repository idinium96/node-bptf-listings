const SteamID = require('steamid');
const Currencies = require('tf2-currencies');
const SKU = require('tf2-sku-2');

class Listing {
    /**
     * Creates a new instance of the listing class
     * @param {Object} listing A backpack.tf listing object
     * @param {String} listing.id
     * @param {Number} listing.intent
     * @param {Object} listing.item
     * @param {Number} listing.appid
     * @param {Object} listing.currencies
     * @param {Number} listing.offers
     * @param {Number} listing.buyout
     * @param {String} listing.details
     * @param {Number} listing.promoted
     * @param {Number} listing.created
     * @param {Number} listing.bump
     * @param {Object} manager Instance of bptf-listings
     */
    constructor (listing, manager) {
        this.id = listing.id;
        this.steamid = new SteamID(listing.steamid);
        this.intent = listing.intent;
        this.item = listing.item;
        this.appid = listing.appid;
        this.currencies = new Currencies(listing.currencies);
        this.offers = listing.offers === 1;
        this.buyout = listing.buyout === 1;
        this.promoted = listing.promoted;
        this.details = listing.details;
        this.created = listing.created;
        this.bump = listing.bump;

        this._manager = manager;
    }

    /**
     * Gets the sku of the item in the listing
     * @return {String}
     */
    getSKU () {
        if (this.appid !== 440) {
            return null;
        }

        return SKU.fromObject(this.getItem());
    }

    /**
     * Returns the item in the listings
     * @return {Object}
     */
    getItem () {
        if (this.appid !== 440) {
            return this.item;
        }

        const item = {
            defindex: this.item.defindex,
            quality: this.item.quality,
            craftable: this.item.flag_cannot_craft !== true
        };

        // Backpack.tf uses item_name for when making listings, meaning that the defindex in some cases is incorrect

        const schemaItem = this._manager.schema.getItemByDefindex(item.defindex);
        const schemaItemByName = this._manager.schema.raw.schema.items.find((v) => v.name === schemaItem.item_name);

        if (schemaItemByName !== undefined) {
            item.defindex = schemaItemByName.defindex;
        }

        const attributes = this._parseAttributes();

        for (const attribute in attributes) {
            if (!attributes.hasOwnProperty(attribute)) {
                continue;
            }

            item[attribute] = attributes[attribute];
        }

        // TODO: Have the item go through a "fix item" function (maybe not needed?)

        if (this.item.name.includes('Chemistry Set')) {
            if (this.item.name.includes("Collector's Festive") && this.item.name.includes('Chemistry Set')) {
                item.defindex = 20007;
            } else if (this.item.name.includes("Collector's") && this.item.name.includes('Chemistry Set')) {
                item.defindex = 20006;
            } else {
                item.defindex = 20005;
            }
        } else if (this.item.name.includes('Kit Fabricator')) {
            if (this.item.name.includes('Professional Killstreak') && this.item.name.includes('Kit Fabricator')) {
                item.killstreak = 3;
            } else if (this.item.name.includes('Specialized Killstreak') && this.item.name.includes('Kit Fabricator')) {
                item.killstreak = 2;
            }
        }

        // Adds default values
        return SKU.fromString(SKU.fromObject(item));
    }

    /**
     * Returns the name of the item in the listing
     * @return {String}
     */
    getName () {
        if (this.appid !== 440) {
            return null;
        }

        return this._manager.schema.getName(this.getItem());
    }

    /**
     * Changes specific properties and adds the job to the queue
     * @param {Object} properties
     * @param {Object} [properties.currencies]
     * @param {String} [properties.details]
     * @param {Boolean} [properties.offers]
     * @param {Boolean} [properties.buyout]
     */
    update (properties) {
        if (properties.time === undefined) {
            return;
        }

        const listing = {
            time: properties.time,
            intent: this.intent
        };

        if (this.intent === 0) {
            listing.sku = this.getSKU();
            listing.promoted = 0;
        } else {
            listing.id = this.item.id;
            listing.promoted = this.item.promoted;
        }

        ['currencies', 'details', 'offers', 'buyout'].forEach((property) => {
            if (properties[property] === undefined) {
                listing[property] = this[property];
            } else {
                listing[property] = properties[property];
            }
        });

        this._manager.createListing(listing, true);
    }

    /**
     * Enqueues the listing to be removed
     */
    remove () {
        this._manager.removeListing(this.id);
    }

    /**
     * Parses attributes
     * @return {Object}
     */
    _parseAttributes () {
        const attributes = {};

        if (this.item.attributes === undefined) {
            return attributes;
        }

        for (let i = 0; i < this.item.attributes.length; i++) {
            const attribute = this.item.attributes[i];
            if (attribute.defindex == 2025) {
                // Killstreak tier/Killstreak Kit
                attributes.killstreak = attribute.float_value;
            } else if (attribute.defindex == 2027) {
                // Australium
                attributes.australium = true;
            } else if (attribute.defindex == 134) {
                // Unusual effect for cosmetics
                attributes.effect = attribute.float_value;
            } else if (attribute.defindex == 2041) {
                // Unusual effect for Taunt
                attributes.effect = attribute.value;
            } else if (attribute.defindex == 834) {
                // War paint/Skins
                attributes.paintkit = attribute.value;
            } else if (attribute.defindex == 725) {
                // Wear
                attributes.wear = parseInt(parseFloat(attribute.value) * 5);
            } else if (attribute.defindex == 214) {
                // Strange as second quality
                attributes.quality2 = 11;
            } else if (attribute.defindex == 187) {
                // Crates
                attributes.crateseries = attribute.float_value;
            } else if (attribute.defindex == 2012) {
                // Target - Unusualifier/Strangifier/Killstreak Kit
                attributes.target = attribute.float_value;
            } else if (
                    [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007].includes(attribute.defindex) &&
                    attribute.is_output == true
            ) {
                if (attribute.attributes === undefined) {
                    // Chemistry Set Collector's - getting output and outputQuality
                    attributes.output = parseInt(attribute.itemdef);
                    attributes.outputQuality = parseInt(attribute.quality);
                } else {
                    // Chemistry Set Strangifier and Killstreak Fabricator Kit: getting output, outputQuality and target
                    attributes.output = attribute.itemdef;
                    attributes.outputQuality = attribute.quality;

                    const attributes2 = attribute.attributes;
                    for (let i = 0; i < attributes2.length; i++) {
                        const attributes2Element = attributes2[i];
                        if (attributes2Element.defindex == 2012) {
                            const value = attributes2Element.float_value;
                            if (typeof value === 'string') {
                                attributes.target = parseInt(value);
                            } else {
                                attributes.target = value;
                            }
                        }
                    }
                }
            }
        }

        return attributes;
    }
}

module.exports = Listing;
